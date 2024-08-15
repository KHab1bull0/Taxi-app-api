/*
  Warnings:

  - Added the required column `currentorder_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrentOrder" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "currentorder_id" TEXT NOT NULL;
