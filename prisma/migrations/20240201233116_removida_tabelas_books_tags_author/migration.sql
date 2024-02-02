/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `books_authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `books_tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AuthorToBook" DROP CONSTRAINT "_AuthorToBook_B_fkey";

-- DropForeignKey
ALTER TABLE "_BookToTag" DROP CONSTRAINT "_BookToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "books_authors" DROP CONSTRAINT "books_authors_fk_id_author_fkey";

-- DropForeignKey
ALTER TABLE "books_authors" DROP CONSTRAINT "books_authors_fk_id_book_fkey";

-- DropForeignKey
ALTER TABLE "books_tags" DROP CONSTRAINT "books_tags_fk_id_book_fkey";

-- DropForeignKey
ALTER TABLE "books_tags" DROP CONSTRAINT "books_tags_fk_id_tag_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_fk_id_book_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_fk_id_book_fkey";

-- DropForeignKey
ALTER TABLE "finances" DROP CONSTRAINT "finances_fk_id_book_fkey";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_fk_id_book_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_fk_id_book_fkey";

-- DropIndex
DROP INDEX "favorites_fk_id_book_key";

-- DropIndex
DROP INDEX "favorites_fk_id_user_key";

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "books_authors";

-- DropTable
DROP TABLE "books_tags";

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "synopsis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finances" ADD CONSTRAINT "finances_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToTag" ADD CONSTRAINT "_BookToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
