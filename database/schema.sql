-- ============================================================================
-- ShopAI — Script de création de la base (schéma IMPLÉMENTÉ / MVP)
-- Aligné sur les modèles Sequelize réellement exécutés par l'application.
-- Les clés primaires sont des UUID (CHAR(36)), timestamps createdAt/updatedAt.
--
-- NB : la conception complète (diagrammes MCD/MLD/Classes) prévoit aussi des
-- entités Avis, Paiement en ligne, Rôles multiples et TVA détaillée. Le présent
-- périmètre implémenté couvre le parcours e-commerce COD (paiement à la livraison).
-- ============================================================================

DROP DATABASE IF EXISTS shopai;
CREATE DATABASE shopai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shopai;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
CREATE TABLE Users (
  id            CHAR(36) PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,          -- haché bcrypt
  firstName     VARCHAR(255) NOT NULL,
  lastName      VARCHAR(255) NOT NULL,
  role          ENUM('client','admin') NOT NULL DEFAULT 'client',
  isActive      BOOLEAN NOT NULL DEFAULT TRUE,
  loginAttempts INT NOT NULL DEFAULT 0,         -- verrouillage anti brute-force
  lockedUntil   DATETIME NULL,
  createdAt     DATETIME NOT NULL,
  updatedAt     DATETIME NOT NULL
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
CREATE TABLE Categories (
  id          CHAR(36) PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  parentId    CHAR(36) NULL,
  createdAt   DATETIME NOT NULL,
  updatedAt   DATETIME NOT NULL,
  CONSTRAINT fk_category_parent FOREIGN KEY (parentId) REFERENCES Categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
CREATE TABLE Products (
  id          CHAR(36) PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  stock       INT NOT NULL DEFAULT 0,
  imageUrl    VARCHAR(255) NULL,
  categoryId  CHAR(36) NULL,
  isActive    BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt   DATETIME NOT NULL,
  updatedAt   DATETIME NOT NULL,
  CONSTRAINT fk_product_category FOREIGN KEY (categoryId) REFERENCES Categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
CREATE TABLE Tags (
  id        CHAR(36) PRIMARY KEY,
  name      VARCHAR(255) NOT NULL UNIQUE,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

-- Table de jointure N-N Produit <-> Tag
CREATE TABLE ProductTags (
  productId CHAR(36) NOT NULL,
  tagId     CHAR(36) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (productId, tagId),
  CONSTRAINT fk_pt_product FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE,
  CONSTRAINT fk_pt_tag     FOREIGN KEY (tagId)     REFERENCES Tags(id)     ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
CREATE TABLE Addresses (
  id         CHAR(36) PRIMARY KEY,
  userId     CHAR(36) NOT NULL,
  street     VARCHAR(255) NOT NULL,
  city       VARCHAR(255) NOT NULL,
  postalCode VARCHAR(255) NOT NULL,
  country    VARCHAR(255) NOT NULL,
  createdAt  DATETIME NOT NULL,
  updatedAt  DATETIME NOT NULL,
  CONSTRAINT fk_address_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
CREATE TABLE Carts (
  id        CHAR(36) PRIMARY KEY,
  userId    CHAR(36) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_cart_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE CartItems (
  id        CHAR(36) PRIMARY KEY,
  cartId    CHAR(36) NOT NULL,
  productId CHAR(36) NOT NULL,
  quantity  INT NOT NULL DEFAULT 1,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_cartitem_cart    FOREIGN KEY (cartId)    REFERENCES Carts(id)    ON DELETE CASCADE,
  CONSTRAINT fk_cartitem_product FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
CREATE TABLE Orders (
  id          CHAR(36) PRIMARY KEY,
  userId      CHAR(36) NOT NULL,
  status      ENUM('pending','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  totalAmount DECIMAL(10,2) NOT NULL,
  addressId   CHAR(36) NULL,
  createdAt   DATETIME NOT NULL,
  updatedAt   DATETIME NOT NULL,
  CONSTRAINT fk_order_user    FOREIGN KEY (userId)    REFERENCES Users(id)     ON DELETE CASCADE,
  CONSTRAINT fk_order_address FOREIGN KEY (addressId) REFERENCES Addresses(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE OrderItems (
  id        CHAR(36) PRIMARY KEY,
  orderId   CHAR(36) NOT NULL,
  productId CHAR(36) NOT NULL,
  quantity  INT NOT NULL,
  price     DECIMAL(10,2) NOT NULL,             -- prix figé au moment de la commande
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_orderitem_order   FOREIGN KEY (orderId)   REFERENCES Orders(id)   ON DELETE CASCADE,
  CONSTRAINT fk_orderitem_product FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
CREATE TABLE ActivityLogs (
  id        CHAR(36) PRIMARY KEY,
  userId    CHAR(36) NULL,
  action    VARCHAR(255) NOT NULL,
  ip        VARCHAR(255) NULL,
  userAgent VARCHAR(255) NULL,
  details   TEXT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_log_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- Tables issues de la conception, présentes dans les modèles mais non exploitées
-- par le MVP (paiement à la livraison, avis non implémentés côté interface).
CREATE TABLE Payments (
  id            CHAR(36) PRIMARY KEY,
  orderId       CHAR(36) NOT NULL,
  method        VARCHAR(255) NOT NULL,
  status        VARCHAR(255) NOT NULL,
  transactionId VARCHAR(255) NULL,
  createdAt     DATETIME NOT NULL,
  updatedAt     DATETIME NOT NULL,
  CONSTRAINT fk_payment_order FOREIGN KEY (orderId) REFERENCES Orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Reviews (
  id        CHAR(36) PRIMARY KEY,
  userId    CHAR(36) NOT NULL,
  productId CHAR(36) NOT NULL,
  rating    INT NOT NULL,
  comment   TEXT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_review_user    FOREIGN KEY (userId)    REFERENCES Users(id)    ON DELETE CASCADE,
  CONSTRAINT fk_review_product FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;
