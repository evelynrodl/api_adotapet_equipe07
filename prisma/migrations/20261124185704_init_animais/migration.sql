-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "porte" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "capa" TEXT NOT NULL DEFAULT 'https://placehold.co/300x450?text=No+Cover',

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);
