/*
  Warnings:

  - You are about to drop the column `currentorder_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `currento_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "currentorder_id",
ADD COLUMN     "currento_id" TEXT NOT NULL;
