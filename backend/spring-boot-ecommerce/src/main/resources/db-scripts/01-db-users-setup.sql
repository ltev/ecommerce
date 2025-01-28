#			ECOMMERCE DB - FULL STACK ANGULAR AND SPRING BOOT

DROP DATABASE IF EXISTS `full-stack-ecommerce`;
DROP USER IF EXISTS `ecommerceadmin`@`%`;
DROP USER IF EXISTS `ecommerceuser`@`%`;

CREATE DATABASE IF NOT EXISTS `full-stack-ecommerce` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS `ecommerceadmin`@`%` IDENTIFIED WITH mysql_native_password BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, REFERENCES, INDEX, ALTER, EXECUTE, CREATE VIEW, SHOW VIEW,
CREATE ROUTINE, ALTER ROUTINE, EVENT, TRIGGER ON `full-stack-ecommerce`.* TO `ecommerceadmin`@`%`;

CREATE USER IF NOT EXISTS `ecommerceuser`@`%` IDENTIFIED WITH mysql_native_password BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE, SHOW VIEW ON `full-stack-ecommerce`.* TO `ecommerceuser`@`%`;

FLUSH PRIVILEGES;