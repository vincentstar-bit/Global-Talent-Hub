#!/bin/sh
set -e
pnpm install --frozen-lockfile
pnpm --filter @workspace/db run push
