-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT DEFAULT '',
ALTER COLUMN "name" DROP NOT NULL;
