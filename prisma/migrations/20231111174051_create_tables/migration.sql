-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `short_urls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalUrl` VARCHAR(191) NOT NULL,
    `shortUrl` VARCHAR(191) NOT NULL,
    `infosUrl` VARCHAR(191) NOT NULL,
    `clicksQuantity` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `short_urls_shortUrl_key`(`shortUrl`),
    UNIQUE INDEX `short_urls_infosUrl_key`(`infosUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `short_urls` ADD CONSTRAINT `short_urls_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
