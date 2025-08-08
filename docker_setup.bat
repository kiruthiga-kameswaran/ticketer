@echo off
REM Create Docker network
docker network create my-app-network

REM Create Docker volume
docker volume create pgdata

REM Run Postgres DB container
docker run -d ^
  --name postgres-container ^
  --network my-app-network ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=thisshonrobert ^
  -e POSTGRES_DB=mydb ^
  -v pgdata:/var/lib/postgresql/data ^
  -p 5432:5432 ^
  postgres

REM Build the Next.js app image
docker build -t next-app .

REM Run Prisma migration
docker run --rm ^
  --network my-app-network ^
  -e DATABASE_URL="postgresql://postgres:thisshonrobert@postgres-container:5432/mydb" ^
  -v "%cd%":/app ^
  -w /app ^
  node:18 ^
  sh -c "npm install && npx prisma migrate deploy"

REM Run the app container
docker run -d ^
  --network my-app-network ^
  --name next-app-container ^
  -e DATABASE_URL="postgresql://postgres:thisshonrobert@postgres-container:5432/mydb" ^
  -p 3000:3000 ^
  next-app

echo All Docker containers are up and running.
pause
