# ---- Build stage ----
FROM node:20-alpine AS builder

RUN npm install -g pnpm@9

WORKDIR /app

# Copy workspace config for dependency resolution
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy all package.json files so pnpm can resolve the workspace graph
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY lib/db/package.json ./lib/db/
COPY lib/api-zod/package.json ./lib/api-zod/
COPY lib/api-spec/package.json ./lib/api-spec/
COPY lib/api-client-react/package.json ./lib/api-client-react/

# Install all workspace dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source files
COPY artifacts/api-server/ ./artifacts/api-server/
COPY lib/ ./lib/

# Build — esbuild bundles everything into a single dist/index.mjs
RUN pnpm --filter @workspace/api-server run build

# ---- Runtime stage ----
FROM node:20-alpine AS runtime

WORKDIR /app

# Only copy the built output — no source or node_modules needed
COPY --from=builder /app/artifacts/api-server/dist ./dist

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
