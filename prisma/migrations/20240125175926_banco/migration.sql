-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "synopsis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "fk_id_book" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "fk_id_book" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "fk_id_book" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finances" (
    "id" TEXT NOT NULL,
    "payments" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "fk_id_book" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "fk_id_book" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_authors" (
    "fk_id_author" TEXT NOT NULL,
    "fk_id_book" TEXT NOT NULL,

    CONSTRAINT "books_authors_pkey" PRIMARY KEY ("fk_id_author","fk_id_book")
);

-- CreateTable
CREATE TABLE "books_tags" (
    "fk_id_tag" TEXT NOT NULL,
    "fk_id_book" TEXT NOT NULL,

    CONSTRAINT "books_tags_pkey" PRIMARY KEY ("fk_id_tag","fk_id_book")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_fk_id_book_key" ON "favorites"("fk_id_book");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_fk_id_user_key" ON "favorites"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "comments_fk_id_book_key" ON "comments"("fk_id_book");

-- CreateIndex
CREATE UNIQUE INDEX "comments_fk_id_user_key" ON "comments"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_fk_id_book_key" ON "reservations"("fk_id_book");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_fk_id_user_key" ON "reservations"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "finances_fk_id_book_key" ON "finances"("fk_id_book");

-- CreateIndex
CREATE UNIQUE INDEX "finances_fk_id_user_key" ON "finances"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "stock_fk_id_book_key" ON "stock"("fk_id_book");

-- CreateIndex
CREATE UNIQUE INDEX "books_authors_fk_id_author_key" ON "books_authors"("fk_id_author");

-- CreateIndex
CREATE UNIQUE INDEX "books_authors_fk_id_book_key" ON "books_authors"("fk_id_book");

-- CreateIndex
CREATE UNIQUE INDEX "books_tags_fk_id_tag_key" ON "books_tags"("fk_id_tag");

-- CreateIndex
CREATE UNIQUE INDEX "books_tags_fk_id_book_key" ON "books_tags"("fk_id_book");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finances" ADD CONSTRAINT "finances_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finances" ADD CONSTRAINT "finances_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_authors" ADD CONSTRAINT "books_authors_fk_id_author_fkey" FOREIGN KEY ("fk_id_author") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_authors" ADD CONSTRAINT "books_authors_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_tags" ADD CONSTRAINT "books_tags_fk_id_tag_fkey" FOREIGN KEY ("fk_id_tag") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_tags" ADD CONSTRAINT "books_tags_fk_id_book_fkey" FOREIGN KEY ("fk_id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
