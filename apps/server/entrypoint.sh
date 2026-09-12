#!/bin/sh 
# ^ sets interpreter to sh
set -e # set exit script on failure

echo "Running prisma migrate deploy..."
pnpm --filter @trickcal-bug-tracker/server run db:deploy

echo "Starting server..."
exec node dist/server.js