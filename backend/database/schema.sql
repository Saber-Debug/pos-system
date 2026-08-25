CREATE TABLE IF NOT EXISTS users (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(120) NOT NULL,
  email          VARCHAR(160) UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  slug           VARCHAR(160) UNIQUE NOT NULL,
  name           VARCHAR(160) NOT NULL,
  origin_country VARCHAR(80) NOT NULL,
  origin_region  VARCHAR(120),
  altitude_m     INT,
  roast_level    VARCHAR(20) NOT NULL,
  process        VARCHAR(20) NOT NULL,
  tasting_notes  TEXT NOT NULL,
  lot_number     VARCHAR(20) NOT NULL,
  roast_date     DATE NOT NULL,
  price_cents    INT NOT NULL,
  weight_grams   INT NOT NULL DEFAULT 250,
  stock          INT NOT NULL DEFAULT 0,
  image_url      TEXT,
  description    TEXT,
  is_featured    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_products_roast_level (roast_level)
);

CREATE TABLE IF NOT EXISTS carts (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart_items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  cart_id    INT NOT NULL,
  product_id INT NOT NULL,
  quantity   INT NOT NULL DEFAULT 1,
  UNIQUE (cart_id, product_id),
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_cart_items_cart_id (cart_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT NOT NULL,
  status           VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_cents      INT NOT NULL,
  shipping_name    VARCHAR(160),
  shipping_address TEXT,
  shipping_phone   VARCHAR(40),
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_orders_user_id (user_id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  order_id         INT NOT NULL,
  product_id       INT NOT NULL,
  product_name     VARCHAR(160) NOT NULL,
  unit_price_cents INT NOT NULL,
  quantity         INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);