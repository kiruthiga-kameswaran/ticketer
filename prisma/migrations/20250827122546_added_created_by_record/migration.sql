/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `TicketSchema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."TicketSchema" DROP COLUMN "updatedAt",
ADD COLUMN     "createdById" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."TicketSchema" ADD CONSTRAINT "TicketSchema_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."Assignee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
