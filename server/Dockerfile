FROM node:22 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile

FROM node:22 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate
RUN npm run build

FROM node:22 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
RUN npm install --only=production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 8080

CMD [ "node", "dist/src/main.js" ]
