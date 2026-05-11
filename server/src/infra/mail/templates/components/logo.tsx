import { Column, Heading, Img, Row, Section } from '@react-email/components';
import React from 'react';

interface LogoProps {
	logoUrl: string;
}

const Logo = ({ logoUrl }: LogoProps) => {
	return (
		<Section className="py-1 w-full">
			<Row>
				<Column align="left">
					<table
						align="left"
						border={0}
						cellPadding="0"
						cellSpacing="0"
						role="presentation"
					>
						<tbody>
							<tr>
								<td className="bg-white rounded-full p-2 align-middle">
									<Img
										src={logoUrl}
										alt="SiteStatus Logo"
										width={32}
										height={32}
										className="block"
									/>
								</td>
								<td className="pl-3 align-middle">
									<Heading className="text-white text-3xl font-bold m-0 p-0 leading-8 text-left">
										SiteStatus
									</Heading>
								</td>
							</tr>
						</tbody>
					</table>
				</Column>
			</Row>
		</Section>
	);
};

export default Logo;
