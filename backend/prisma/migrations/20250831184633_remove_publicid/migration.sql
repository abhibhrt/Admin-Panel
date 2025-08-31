/*
  Warnings:

  - You are about to drop the column `publicId` on the `ProductImage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_mobNo_key";

-- AlterTable
ALTER TABLE "public"."ProductImage" DROP COLUMN "publicId";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "mobNo" DROP NOT NULL;
