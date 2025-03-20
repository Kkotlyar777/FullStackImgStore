-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nick_name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nick_name_key" ON "User"("nick_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
