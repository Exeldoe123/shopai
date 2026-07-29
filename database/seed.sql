-- ============================================================
-- ShopAI — Jeu de données de démonstration (à jouer APRÈS schema.sql)
-- Comptes : admin@shopai.ma / Admin123!  ·  client@shopai.ma / Client123!
-- 24 produits · 5 catégories · 12 commandes réparties sur 6 mois
-- ============================================================
USE shopai;
SET FOREIGN_KEY_CHECKS = 0;
/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: shopai
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `ActivityLogs`
--

LOCK TABLES `ActivityLogs` WRITE;
/*!40000 ALTER TABLE `ActivityLogs` DISABLE KEYS */;
INSERT INTO `ActivityLogs` (`id`, `userId`, `action`, `ip`, `userAgent`, `details`, `createdAt`) VALUES ('191e4148-8a29-44db-8fbc-b2711a0f918f',NULL,'LOGIN_FAILED','196.75.16.26','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Tentative échouée pour admin@shopai.ma','2026-07-10 10:00:00'),
('35f639f4-1e1f-4539-9ee5-2a6bc5b277fe','43985d25-6270-42b2-b828-dc5578202cec','USER_UPDATE','196.75.17.27','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Compte \"compte.bloque@shopai.ma\" désactivé','2026-07-07 10:00:00'),
('4719ec64-d385-42e0-a61a-922cd1de6fa4','244ffbf3-42f9-4bda-8186-a930aceb37f7','LOGIN','196.75.15.25','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Connexion client','2026-07-13 10:00:00'),
('a45fba02-1076-4368-b392-01f5a0dbdea2','43985d25-6270-42b2-b828-dc5578202cec','PRODUCT_CREATE','196.75.11.21','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Création du produit \"Manette Gaming Pro\"','2026-07-25 10:00:00'),
('aeff1ffa-c5c6-4039-ade2-a63459e98819','68cf00dd-1739-46a6-8a1e-1210ba49355d','ORDER_CREATE','196.75.14.24','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Nouvelle commande passée','2026-07-16 10:00:00'),
('b583a1a2-4482-4575-9b19-0930adcaf62e','43985d25-6270-42b2-b828-dc5578202cec','ORDER_UPDATE','196.75.12.22','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Statut de commande passé à \"shipped\"','2026-07-22 10:00:00'),
('dd32faa8-7bc5-4471-8f35-278a1a8d66c9','68cf00dd-1739-46a6-8a1e-1210ba49355d','LOGIN','196.75.13.23','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Connexion client','2026-07-19 10:00:00'),
('e9c873ac-11ee-4b50-9555-2317966d2109','43985d25-6270-42b2-b828-dc5578202cec','LOGIN','196.75.10.20','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Connexion administrateur','2026-07-28 10:00:00');
/*!40000 ALTER TABLE `ActivityLogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Addresses`
--

LOCK TABLES `Addresses` WRITE;
/*!40000 ALTER TABLE `Addresses` DISABLE KEYS */;
INSERT INTO `Addresses` (`id`, `userId`, `street`, `city`, `postalCode`, `country`, `createdAt`, `updatedAt`) VALUES ('2b3c607f-74f8-4cbe-8ec3-d4e09793d226','3942b189-d884-4337-bf69-a7ed72886c78','8 Rue de la Liberté','Marrakech','40000','Maroc','2026-07-29 02:29:58','2026-07-29 02:29:58'),
('676855e1-d54e-47f2-be79-2b41af99aa19','0cf2c418-802a-4e55-9670-6bc15b2b9a01','77 Av. des FAR','Agadir','80000','Maroc','2026-07-29 02:29:58','2026-07-29 02:29:58'),
('6bd6e821-5455-4c78-b165-046efda8f765','244ffbf3-42f9-4bda-8186-a930aceb37f7','45 Av. Hassan II','Rabat','10000','Maroc','2026-07-29 02:29:58','2026-07-29 02:29:58'),
('82a4bba8-c9ad-47f1-8c77-fe1b362cbfbe','c5f7b070-591a-4260-8c75-f8a14f3cc3f9','23 Bd Zerktouni','Tanger','90000','Maroc','2026-07-29 02:29:58','2026-07-29 02:29:58'),
('a88aeb2a-75c7-48d5-a828-6ca734698c5a','68cf00dd-1739-46a6-8a1e-1210ba49355d','12 Bd Mohammed V','Casablanca','20000','Maroc','2026-07-29 02:29:58','2026-07-29 02:29:58');
/*!40000 ALTER TABLE `Addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `CartItems`
--

LOCK TABLES `CartItems` WRITE;
/*!40000 ALTER TABLE `CartItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `CartItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Carts`
--

LOCK TABLES `Carts` WRITE;
/*!40000 ALTER TABLE `Carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` (`id`, `name`, `slug`, `description`, `parentId`, `createdAt`, `updatedAt`) VALUES ('7ceb82dd-7fbf-4328-8c80-6da65ccf6637','Maison Connectée','maison-connectee','Catégorie Maison Connectée',NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('7f85c1cd-fdc6-4d2a-b296-a9483a19c90a','Mode & Accessoires','mode-accessoires','Catégorie Mode & Accessoires',NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('8188f4e6-839f-4431-a6a6-6e0796e3ddb7','Gaming','gaming','Catégorie Gaming',NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('83c1bf66-929e-4d45-9474-5d2ce4344389','High-Tech','high-tech','Catégorie High-Tech',NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('8726d9bd-e823-4961-8f16-43aecacae48f','Sport & Santé','sport-sante','Catégorie Sport & Santé',NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `OrderItems`
--

LOCK TABLES `OrderItems` WRITE;
/*!40000 ALTER TABLE `OrderItems` DISABLE KEYS */;
INSERT INTO `OrderItems` (`id`, `orderId`, `productId`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES ('02b10993-7866-49b5-8751-9453e6f73fc2','ecee1b27-df9c-4fb5-8f8d-049c52613161','edb1796b-6fc0-438a-bd31-0dbe11999132',2,24.99,'2026-03-06 10:00:00','2026-03-06 10:00:00'),
('06405fb6-1050-4406-9550-0fc43eb00cec','836e99b0-6fbc-4187-895b-8baddf928d53','85f9a61d-abb2-4c41-b12d-df28b195c1b1',1,69.99,'2026-04-10 10:00:00','2026-04-10 10:00:00'),
('13fb25dc-1465-4b87-86e2-998a1a5d5750','dd2692ab-545d-49b6-90d8-f972900add5f','edfd37b4-7142-40bd-a087-930828ca1bea',1,149.99,'2026-04-09 10:00:00','2026-04-09 10:00:00'),
('1d7f9a5e-373a-41de-951f-7dec56452743','c78ecac4-8a68-4fcd-a96b-1a78e76cb66a','780a55d4-481f-4ece-9791-12cc331157cd',1,129.99,'2026-05-12 10:00:00','2026-05-12 10:00:00'),
('2ac07aa1-4ee8-44ad-b312-348c59fb6eac','10ee65c8-c6ee-43a5-babe-3822cf8477a8','e55cad48-5bde-44ca-bca1-e422d3e61112',1,159.99,'2026-07-16 10:00:00','2026-07-16 10:00:00'),
('2c116d73-adf2-4b4c-8a87-54b2087e25a4','38dbab40-c11b-4770-bfd7-967adaa660ee','7555cd94-03c5-4129-8226-5293b1a0b9d1',1,69.99,'2026-07-15 10:00:00','2026-07-15 10:00:00'),
('2f22b904-6964-47c8-80c5-5d6b1324aa25','c78ecac4-8a68-4fcd-a96b-1a78e76cb66a','a5f8755b-3c45-4de9-8727-3c7f79e145ba',3,19.99,'2026-05-12 10:00:00','2026-05-12 10:00:00'),
('30587382-7bfd-4c12-8431-135c22769e6d','dd2692ab-545d-49b6-90d8-f972900add5f','004c96ca-f306-4a87-9cac-f0010475b945',1,34.99,'2026-04-09 10:00:00','2026-04-09 10:00:00'),
('4ce163e0-eb01-4886-987f-92838761bf19','6a6aae87-df99-4d1b-a20d-bac396acd692','1bf95de4-2839-4947-b6aa-268849ec6e05',1,39.99,'2026-06-13 10:00:00','2026-06-13 10:00:00'),
('54529cf8-df5e-4186-a822-963087d6fab7','d7b92536-e04e-4d3e-9116-8397fe530034','b5db8701-3789-4608-89c4-7835a73ed691',1,299.99,'2026-03-05 10:00:00','2026-03-05 10:00:00'),
('5a6739ba-6b5a-4a7e-86ee-cd6ed5281fea','38dbab40-c11b-4770-bfd7-967adaa660ee','b5db8701-3789-4608-89c4-7835a73ed691',1,299.99,'2026-07-15 10:00:00','2026-07-15 10:00:00'),
('5c47b87a-2a8e-4f40-8888-12e63a5b648c','370976ef-37a9-4e3e-b95e-0ec9febdd51f','e5777107-1ae3-4447-9c10-6a4fe4e03e5a',1,89.99,'2026-03-07 10:00:00','2026-03-07 10:00:00'),
('6a4efd27-92ed-41f1-997d-0c0a7b340a47','836e99b0-6fbc-4187-895b-8baddf928d53','51d95aac-9028-4187-ab2a-395c8287d974',1,119.99,'2026-04-10 10:00:00','2026-04-10 10:00:00'),
('74801183-63e9-4bf1-9344-fb4976e4ee12','3c896a0e-8b37-4891-9505-2e45739b94cc','8c81b3cf-664c-4305-aa5b-ac2b2b995309',1,349.99,'2026-03-08 10:00:00','2026-03-08 10:00:00'),
('93e42736-9c3b-4cc4-9a0a-84b0db98bd9a','6a6aae87-df99-4d1b-a20d-bac396acd692','ccb4b74c-b067-47b0-bd64-11027388398a',2,199.99,'2026-06-13 10:00:00','2026-06-13 10:00:00'),
('ba321a34-869c-482e-89bf-81b48e4434a5','3b5b8dcf-78b0-43f1-a08d-83e6349f6118','db9455fb-5f1b-4f56-8654-77a6dddf6932',1,189.99,'2026-05-11 10:00:00','2026-05-11 10:00:00'),
('c3181be3-606b-4734-8997-cd4b560cc178','ecee1b27-df9c-4fb5-8f8d-049c52613161','8958803f-dad4-48d8-9187-7940dafac44b',1,129.99,'2026-03-06 10:00:00','2026-03-06 10:00:00'),
('e3789832-b460-42dd-878a-91da75a52e8b','370976ef-37a9-4e3e-b95e-0ec9febdd51f','6ef16916-12b5-44ab-b09e-61279bdc176d',1,49.99,'2026-03-07 10:00:00','2026-03-07 10:00:00'),
('f28b32e0-53fc-49ac-b65f-f84bc95b3a3d','370976ef-37a9-4e3e-b95e-0ec9febdd51f','21f4fd02-3a5a-4c48-901e-d83228652b18',2,39.99,'2026-03-07 10:00:00','2026-03-07 10:00:00'),
('f426a59f-dcea-4cf3-8a3f-9ca1c14a8314','6786758f-978e-488a-ab77-c14fe313d2af','f4163e79-298c-4e70-84a8-0f51d6b37a26',1,59.99,'2026-06-14 10:00:00','2026-06-14 10:00:00'),
('f7ae5dfc-56e8-4192-850e-cac623a64b65','10ee65c8-c6ee-43a5-babe-3822cf8477a8','7ad43ba8-99a4-40ef-b0ea-6bb75b0e2f15',2,44.99,'2026-07-16 10:00:00','2026-07-16 10:00:00'),
('fecbcb87-0a92-48bd-9a6b-e7fdab891d47','d7b92536-e04e-4d3e-9116-8397fe530034','ccb4b74c-b067-47b0-bd64-11027388398a',1,199.99,'2026-03-05 10:00:00','2026-03-05 10:00:00');
/*!40000 ALTER TABLE `OrderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` (`id`, `userId`, `status`, `totalAmount`, `addressId`, `createdAt`, `updatedAt`) VALUES ('10ee65c8-c6ee-43a5-babe-3822cf8477a8','244ffbf3-42f9-4bda-8186-a930aceb37f7','cancelled',249.97,'6bd6e821-5455-4c78-b165-046efda8f765','2026-07-16 10:00:00','2026-07-16 10:00:00'),
('370976ef-37a9-4e3e-b95e-0ec9febdd51f','3942b189-d884-4337-bf69-a7ed72886c78','shipped',219.96,'2b3c607f-74f8-4cbe-8ec3-d4e09793d226','2026-03-07 10:00:00','2026-03-07 10:00:00'),
('38dbab40-c11b-4770-bfd7-967adaa660ee','68cf00dd-1739-46a6-8a1e-1210ba49355d','pending',369.98,'a88aeb2a-75c7-48d5-a828-6ca734698c5a','2026-07-15 10:00:00','2026-07-15 10:00:00'),
('3b5b8dcf-78b0-43f1-a08d-83e6349f6118','244ffbf3-42f9-4bda-8186-a930aceb37f7','delivered',189.99,'6bd6e821-5455-4c78-b165-046efda8f765','2026-05-11 10:00:00','2026-05-11 10:00:00'),
('3c896a0e-8b37-4891-9505-2e45739b94cc','c5f7b070-591a-4260-8c75-f8a14f3cc3f9','confirmed',349.99,'82a4bba8-c9ad-47f1-8c77-fe1b362cbfbe','2026-03-08 10:00:00','2026-03-08 10:00:00'),
('6786758f-978e-488a-ab77-c14fe313d2af','0cf2c418-802a-4e55-9670-6bc15b2b9a01','confirmed',59.99,'676855e1-d54e-47f2-be79-2b41af99aa19','2026-06-14 10:00:00','2026-06-14 10:00:00'),
('6a6aae87-df99-4d1b-a20d-bac396acd692','c5f7b070-591a-4260-8c75-f8a14f3cc3f9','shipped',439.97,'82a4bba8-c9ad-47f1-8c77-fe1b362cbfbe','2026-06-13 10:00:00','2026-06-13 10:00:00'),
('836e99b0-6fbc-4187-895b-8baddf928d53','68cf00dd-1739-46a6-8a1e-1210ba49355d','cancelled',189.98,'a88aeb2a-75c7-48d5-a828-6ca734698c5a','2026-04-10 10:00:00','2026-04-10 10:00:00'),
('c78ecac4-8a68-4fcd-a96b-1a78e76cb66a','3942b189-d884-4337-bf69-a7ed72886c78','delivered',189.96,'2b3c607f-74f8-4cbe-8ec3-d4e09793d226','2026-05-12 10:00:00','2026-05-12 10:00:00'),
('d7b92536-e04e-4d3e-9116-8397fe530034','68cf00dd-1739-46a6-8a1e-1210ba49355d','delivered',499.98,'a88aeb2a-75c7-48d5-a828-6ca734698c5a','2026-03-05 10:00:00','2026-03-05 10:00:00'),
('dd2692ab-545d-49b6-90d8-f972900add5f','0cf2c418-802a-4e55-9670-6bc15b2b9a01','pending',184.98,'676855e1-d54e-47f2-be79-2b41af99aa19','2026-04-09 10:00:00','2026-04-09 10:00:00'),
('ecee1b27-df9c-4fb5-8f8d-049c52613161','244ffbf3-42f9-4bda-8186-a930aceb37f7','delivered',179.97,'6bd6e821-5455-4c78-b165-046efda8f765','2026-03-06 10:00:00','2026-03-06 10:00:00');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Payments`
--

LOCK TABLES `Payments` WRITE;
/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ProductTags`
--

LOCK TABLES `ProductTags` WRITE;
/*!40000 ALTER TABLE `ProductTags` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductTags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` (`id`, `name`, `slug`, `description`, `price`, `stock`, `imageUrl`, `categoryId`, `isActive`, `createdAt`, `updatedAt`) VALUES ('004c96ca-f306-4a87-9cac-f0010475b945','Lunettes Anti-Lumière Bleue','lunettes-anti-lumiere-bleue','Protection des yeux pour le travail sur écran.',34.99,90,'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800','7f85c1cd-fdc6-4d2a-b296-a9483a19c90a',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('1bf95de4-2839-4947-b6aa-268849ec6e05','Tapis de Yoga Premium','tapis-de-yoga-premium','Antidérapant, épaisseur 6mm, matériau écologique.',39.99,85,'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800','8726d9bd-e823-4961-8f16-43aecacae48f',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('21869b36-2941-43c2-82a2-3ebd387703a7','Ceinture Cuir Classique','ceinture-cuir-classique','Cuir pleine fleur, boucle acier inoxydable.',29.99,3,'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800','7f85c1cd-fdc6-4d2a-b296-a9483a19c90a',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('21f4fd02-3a5a-4c48-901e-d83228652b18','Chargeur Rapide 65W GaN','chargeur-rapide-65w-gan','Chargeur compact 3 ports, technologie GaN.',39.99,120,'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800','83c1bf66-929e-4d45-9474-5d2ce4344389',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('3f04cae6-9953-4f76-a915-3ba80cc53c3b','Casque Gaming Surround 7.1','casque-gaming-surround-7-1','Son surround 7.1, micro antibruit détachable.',99.99,2,'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&q=80&w=800','8188f4e6-839f-4431-a6a6-6e0796e3ddb7',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('51d95aac-9028-4187-ab2a-395c8287d974','Clavier Mécanique RGB','clavier-mecanique-rgb','Switches mécaniques, rétroéclairage RGB personnalisable.',119.99,30,'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800','83c1bf66-929e-4d45-9474-5d2ce4344389',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('563003c6-f8d5-4689-ad09-47b17512f645','Caméra Surveillance WiFi','camera-surveillance-wifi','Vision nocturne, détection de mouvement, alertes mobiles.',79.99,45,'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800','7ceb82dd-7fbf-4328-8c80-6da65ccf6637',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('6ef16916-12b5-44ab-b09e-61279bdc176d','Souris Ergonomique Sans Fil','souris-ergonomique-sans-fil','Design ergonomique, capteur haute précision 16000 DPI.',49.99,80,'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800','83c1bf66-929e-4d45-9474-5d2ce4344389',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('7555cd94-03c5-4129-8226-5293b1a0b9d1','Webcam Full HD 1080p','webcam-full-hd-1080p','Webcam avec micro intégré et correction automatique de lumière.',69.99,4,'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&q=80&w=800','83c1bf66-929e-4d45-9474-5d2ce4344389',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('780a55d4-481f-4ece-9791-12cc331157cd','Disque SSD Externe 1To','disque-ssd-externe-1to','Stockage ultra-rapide USB-C, robuste et compact.',129.99,55,'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&q=80&w=800','83c1bf66-929e-4d45-9474-5d2ce4344389',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('7ad43ba8-99a4-40ef-b0ea-6bb75b0e2f15','Portefeuille Cuir RFID','portefeuille-cuir-rfid','Cuir véritable avec protection anti-piratage RFID.',44.99,60,'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800','7f85c1cd-fdc6-4d2a-b296-a9483a19c90a',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('85f9a61d-abb2-4c41-b12d-df28b195c1b1','Manette Gaming Pro','manette-gaming-pro','Retour haptique, gâchettes adaptatives, sans fil.',69.99,40,'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=800','8188f4e6-839f-4431-a6a6-6e0796e3ddb7',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('8958803f-dad4-48d8-9187-7940dafac44b','Sneakers SmartFit','sneakers-smartfit','Chaussures s\'adaptant à votre foulée, semelle amortissante.',129.99,7,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800','7f85c1cd-fdc6-4d2a-b296-a9483a19c90a',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('8c81b3cf-664c-4305-aa5b-ac2b2b995309','Aspirateur Robot Laser','aspirateur-robot-laser','Cartographie laser, vidage automatique, contrôle app.',349.99,18,'https://images.unsplash.com/photo-1589006833888-3a6c9b6dcb1f?auto=format&fit=crop&q=80&w=800','7ceb82dd-7fbf-4328-8c80-6da65ccf6637',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('8e0c7a2d-3ae2-4579-bdbf-8aff04526423','Ampoule Connectée RGB','ampoule-connectee-rgb','Éclairage intelligent 16M couleurs, contrôle vocal.',24.99,5,'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=800','7ceb82dd-7fbf-4328-8c80-6da65ccf6637',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('a5f8755b-3c45-4de9-8727-3c7f79e145ba','Prise Connectée WiFi','prise-connectee-wifi','Programmation horaire et suivi de consommation.',19.99,150,'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&q=80&w=800','7ceb82dd-7fbf-4328-8c80-6da65ccf6637',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('b5db8701-3789-4608-89c4-7835a73ed691','Casque Audio Premium IA','casque-audio-premium-ia','Casque à réduction de bruit active avec ajustement sonore par IA. Autonomie 30h.',299.99,42,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800','83c1bf66-929e-4d45-9474-5d2ce4344389',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('ccb4b74c-b067-47b0-bd64-11027388398a','Montre Connectée Health+','montre-connectee-health','Suivi cardiaque, sommeil, SpO2 et 100+ modes sportifs.',199.99,200,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800','8726d9bd-e823-4961-8f16-43aecacae48f',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('db9455fb-5f1b-4f56-8654-77a6dddf6932','Thermostat Intelligent','thermostat-intelligent','Régulation automatique, économies d\'énergie jusqu\'à 30%.',189.99,25,'https://images.unsplash.com/photo-1567925086783-a0e9f6b8b9a7?auto=format&fit=crop&q=80&w=800','7ceb82dd-7fbf-4328-8c80-6da65ccf6637',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('e55cad48-5bde-44ca-bca1-e422d3e61112','Haltères Réglables 20kg','halteres-reglables-20kg','Poids ajustable de 2 à 20kg, gain de place.',159.99,12,'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=800','8726d9bd-e823-4961-8f16-43aecacae48f',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('e5777107-1ae3-4447-9c10-6a4fe4e03e5a','Enceinte Bluetooth 360','enceinte-bluetooth-360','Son immersif à 360 degrés, résistante aux éclaboussures.',89.99,100,'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800','83c1bf66-929e-4d45-9474-5d2ce4344389',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('edb1796b-6fc0-438a-bd31-0dbe11999132','Casquette Streetwear','casquette-streetwear','Coupe classique, broderie premium.',24.99,110,'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800','7f85c1cd-fdc6-4d2a-b296-a9483a19c90a',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('edfd37b4-7142-40bd-a087-930828ca1bea','Écouteurs Sans Fil Pro','ecouteurs-sans-fil-pro','Écouteurs true wireless avec boîtier de charge rapide.',149.99,65,'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800','83c1bf66-929e-4d45-9474-5d2ce4344389',1,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('f4163e79-298c-4e70-84a8-0f51d6b37a26','Sac à dos Urbain Tech','sac-a-dos-urbain-tech','Sac ergonomique avec port USB et compartiment laptop 15\".',59.99,75,'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800','7f85c1cd-fdc6-4d2a-b296-a9483a19c90a',1,'2026-07-29 02:29:58','2026-07-29 02:29:58');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Tags`
--

LOCK TABLES `Tags` WRITE;
/*!40000 ALTER TABLE `Tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` (`id`, `email`, `password`, `firstName`, `lastName`, `role`, `isActive`, `loginAttempts`, `lockedUntil`, `createdAt`, `updatedAt`) VALUES ('0cf2c418-802a-4e55-9670-6bc15b2b9a01','mehdi@shopai.ma','$2a$10$SNt1p7gTzDpgEq5oS4YTU.lNmme7t7AdQdlJH3NPgtO47fZSgmx0W','Mehdi','Alaoui','client',1,0,NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('244ffbf3-42f9-4bda-8186-a930aceb37f7','sara@shopai.ma','$2a$10$m2MW/Yp797CzRxI8Fl7lAurczeZLOjG11kHAO4kg7BwvEnL3WM.eG','Sara','Bennani','client',1,0,NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('3942b189-d884-4337-bf69-a7ed72886c78','omar@shopai.ma','$2a$10$W8DX/BuoI.8C4tBJ8B2.sulLk4amWb42zfYe/klnHlQ5O0Qy175Xy','Omar','Tazi','client',1,0,NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('43985d25-6270-42b2-b828-dc5578202cec','admin@shopai.ma','$2a$10$m7C8lBKx7zIcNe3Egs01heJ0AZcLFXVcXS8ug1wsRL4ctxkNb6e7y','Super','Admin','admin',1,0,NULL,'2026-07-29 02:29:57','2026-07-29 02:29:57'),
('68cf00dd-1739-46a6-8a1e-1210ba49355d','client@shopai.ma','$2a$10$TNwDUmr6PbG8QA47VexzzOGv5ObkeTnW/CiFQfZfDJe4Mh1udqGOC','Yassine','El Amrani','client',1,0,NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('68e59989-2d50-4c9d-af49-af048a7f7f49','compte.bloque@shopai.ma','$2a$10$IiMx02BE3i3.XpWIdFobp.y0hy5VcBAx97mg0IVtUP5PwaH7FYID6','Karim','Zouiten','client',0,0,NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58'),
('c5f7b070-591a-4260-8c75-f8a14f3cc3f9','fatima@shopai.ma','$2a$10$/hSa.ZnefzMy3OzmTX9m9eTdcdN4zKEA5NVXNjDj0jH08mjp/GFUW','Fatima','Idrissi','client',1,0,NULL,'2026-07-29 02:29:58','2026-07-29 02:29:58');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-29  2:30:34
SET FOREIGN_KEY_CHECKS = 1;
