/*
  Warnings:

  - You are about to drop the column `classId` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,courseId]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_classId_fkey";

-- DropIndex
DROP INDEX "Membership_userId_classId_key";

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "classId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Class";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_courseId_key" ON "Membership"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
