FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG POSTGRES_URI="postgresql://dummy"
ARG ENGINE_DATABASE_URI="postgresql://dummy"

ENV POSTGRES_URI=$POSTGRES_URI
ENV ENGINE_DATABASE_URI=$ENGINE_DATABASE_URI

RUN npm run prisma:generate
RUN npm run build
RUN npm prune --production

FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

RUN apk add --no-cache openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/package.json ./

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/generated ./generated

USER nestjs

EXPOSE 8080

CMD [ "node", "dist/src/main.js" ]
