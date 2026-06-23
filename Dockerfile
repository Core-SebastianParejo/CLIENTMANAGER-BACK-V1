FROM node:24-alpine AS builder
WORKDIR /app


COPY package.json pnpm-lock.yaml ./


RUN npm install -g pnpm


RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm rebuild @prisma/engines bcrypt esbuild prisma


COPY . .


RUN pnpm dlx prisma generate
RUN pnpm run build

# ---

FROM node:24-alpine AS production
WORKDIR /app

RUN npm install -g pnpm


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/pnpm-workspace.yaml ./

RUN pnpm install --prod --frozen-lockfile --ignore-scripts
RUN pnpm rebuild @prisma/engines bcrypt prisma


RUN pnpm dlx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "echo DATABASE_URL=$DATABASE_URL > .env && pnpm dlx prisma migrate deploy && node dist/server.js"]