/*
  Warnings:

  - Added the required column `transactionDate` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL;
