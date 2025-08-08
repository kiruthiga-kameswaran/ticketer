-- CreateEnum
CREATE TYPE "public"."PriorityType" AS ENUM ('Urgent', 'Mid', 'Low');

-- CreateEnum
CREATE TYPE "public"."StatusType" AS ENUM ('Done', 'Incomplete', 'Assigned');

-- CreateEnum
CREATE TYPE "public"."ActiveType" AS ENUM ('Yes', 'No');

-- CreateTable
CREATE TABLE "public"."TicketSchema" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "priority" "public"."PriorityType",
    "progress" INTEGER,
    "status" "public"."StatusType",
    "active" "public"."ActiveType",
    "assigneeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Assignee" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "Assignee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assignee_email_key" ON "public"."Assignee"("email");

-- AddForeignKey
ALTER TABLE "public"."TicketSchema" ADD CONSTRAINT "TicketSchema_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."Assignee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
