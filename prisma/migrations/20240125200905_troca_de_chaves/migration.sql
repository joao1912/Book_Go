/*
  Warnings:

  - You are about to drop the column `fk_id_contact` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fk_id_user]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_id_user` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_fk_id_user_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_fk_id_contact_fkey";

-- DropIndex
DROP INDEX "users_fk_id_contact_key";

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "fk_id_user" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "fk_id_contact";

-- CreateIndex
CREATE UNIQUE INDEX "contacts_fk_id_user_key" ON "contacts"("fk_id_user");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
