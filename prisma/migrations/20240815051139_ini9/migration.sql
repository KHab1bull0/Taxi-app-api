/*
  Warnings:

  - You are about to drop the `CurrentOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurrentOrder" DROP CONSTRAINT "CurrentOrder_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_driver_id_fkey";

-- DropTable
DROP TABLE "CurrentOrder";

-- DropTable
DROP TABLE "Wallet";

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currentorders" (
    "id" TEXT NOT NULL,
    "start_dir" TEXT NOT NULL,
    "end_dir" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "currency" "Currency" NOT NULL DEFAULT 'uzs',

    CONSTRAINT "currentorders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currentorders" ADD CONSTRAINT "currentorders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
