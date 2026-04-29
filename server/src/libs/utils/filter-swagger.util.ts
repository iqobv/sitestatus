import { OpenAPIObject } from '@nestjs/swagger';

const findSchemaRefs = (
	data: unknown,
	refs: Set<string> = new Set(),
): Set<string> => {
	if (!data || typeof data !== 'object') {
		return refs;
	}

	if (Array.isArray(data)) {
		for (const item of data) {
			findSchemaRefs(item, refs);
		}
		return refs;
	}

	const record = data as Record<string, unknown>;

	if (
		typeof record['$ref'] === 'string' &&
		record['$ref'].startsWith('#/components/schemas/')
	) {
		refs.add(record['$ref'].replace('#/components/schemas/', ''));
	}

	for (const key in record) {
		if (Object.prototype.hasOwnProperty.call(record, key)) {
			findSchemaRefs(record[key], refs);
		}
	}

	return refs;
};

export const filterSwaggerDocument = (
	document: OpenAPIObject,
	isPublicDocs: boolean,
	specificConfig: Omit<OpenAPIObject, 'paths'>,
): OpenAPIObject => {
	const filteredDocument: OpenAPIObject = JSON.parse(
		JSON.stringify(document),
	) as OpenAPIObject;

	filteredDocument.info = specificConfig.info;

	for (const pathKey in filteredDocument.paths) {
		if (Object.prototype.hasOwnProperty.call(filteredDocument.paths, pathKey)) {
			const pathItem = filteredDocument.paths[pathKey];

			if (pathItem) {
				for (const methodKey in pathItem) {
					if (Object.prototype.hasOwnProperty.call(pathItem, methodKey)) {
						const operation = pathItem[methodKey as keyof typeof pathItem];

						if (
							operation &&
							typeof operation === 'object' &&
							!Array.isArray(operation)
						) {
							const operationRecord = operation as unknown as Record<
								string,
								unknown
							>;
							const isMarkedPublic = operationRecord['x-public'] === true;

							if (isPublicDocs && !isMarkedPublic) {
								delete pathItem[methodKey as keyof typeof pathItem];
							} else if (!isPublicDocs && isMarkedPublic) {
								delete pathItem[methodKey as keyof typeof pathItem];
							}
						}
					}
				}

				if (Object.keys(pathItem).length === 0) {
					delete filteredDocument.paths[pathKey];
				}
			}
		}
	}

	if (filteredDocument.components && filteredDocument.components.schemas) {
		const usedSchemas = findSchemaRefs(filteredDocument.paths);
		let hasNewReferences = true;

		while (hasNewReferences) {
			hasNewReferences = false;
			const currentSchemas = Array.from(usedSchemas);

			for (const schemaName of currentSchemas) {
				const schemaDef = filteredDocument.components.schemas[schemaName];
				if (schemaDef) {
					const nestedRefs = findSchemaRefs(schemaDef);
					for (const nestedRef of nestedRefs) {
						if (!usedSchemas.has(nestedRef)) {
							usedSchemas.add(nestedRef);
							hasNewReferences = true;
						}
					}
				}
			}
		}

		for (const schemaKey in filteredDocument.components.schemas) {
			if (
				Object.prototype.hasOwnProperty.call(
					filteredDocument.components.schemas,
					schemaKey,
				)
			) {
				if (!usedSchemas.has(schemaKey)) {
					delete filteredDocument.components.schemas[schemaKey];
				}
			}
		}
	}

	return filteredDocument;
};
