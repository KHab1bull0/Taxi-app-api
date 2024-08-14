/*
  Warnings:

  - You are about to drop the column `createdAt` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `drivers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "CurrentOrder" (
    "id" TEXT NOT NULL,
    "start_dir" TEXT NOT NULL,
    "end_dir" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'uzs',

    CONSTRAINT "CurrentOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CurrentOrder" ADD CONSTRAINT "CurrentOrder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
