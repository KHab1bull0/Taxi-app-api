/*
  Warnings:

  - You are about to drop the column `payment_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `rating_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `trip_id` on the `orders` table. All the data in the column will be lost.
  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ratings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'accepted', 'cenceled', 'completed');

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_rating_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_trip_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment_id",
DROP COLUMN "rating_id",
DROP COLUMN "trip_id",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'uzs',
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'accepted';

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "ratings";

-- DropTable
DROP TABLE "trips";
