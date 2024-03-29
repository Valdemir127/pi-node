-- CreateTable
CREATE TABLE "cliente_contato" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cliente_contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidato" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "curriculo" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_contato_email_key" ON "cliente_contato"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidato_email_key" ON "candidato"("email");
