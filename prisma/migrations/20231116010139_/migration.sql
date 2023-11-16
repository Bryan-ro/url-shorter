/*
  Warnings:

  - You are about to drop the column `infosUrl` on the `short_urls` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `short_urls_infosUrl_key` ON `short_urls`;

-- AlterTable
ALTER TABLE `short_urls` DROP COLUMN `infosUrl`;
