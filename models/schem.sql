CREATE TABLE product(
    productId INT PRIMARY KEY AUTO_INCREMENT,
    productType INT NOT NULL,
    productName VARCHAR(400) NOT NULL,
    productDescription TEXT NOT NULL,
    productQuantity SMALLINT NOT NULL, 
    productSprice SMALLINT NOT NULL,
    productMprice SMALLINT NOT NULL
);

CREATE TABLE productType(
    productTypeId INT PRIMARY KEY AUTO_INCREMENT,
    productTypeName VARCHAR(400) NOT NULL,
    productTypeDescription TEXT NOT NULL
);
CREATE TABLE productTypeAttributeValue(
    productTypeAttributeValueId INT PRIMARY KEY AUTO_INCREMENT,
    productTypeID INT NOT NULL,
    attributeValueId INT NOT NULL
);

CREATE TABLE attribute(
    attributeId INT PRIMARY KEY AUTO_INCREMENT,
    attributeName VARCHAR(400) NOT NULL,
    attributeType VARCHAR(400)
);

CREATE TABLE attributeValue(
    attributeValueId INT PRIMARY KEY AUTO_INCREMENT,
    attributeId INT NOT NULL,
    attributeName VARCHAR(400) NOT NULL
);
CREATE TABLE productAttributeValue(
    productID INT NOT NULL,
    attributeValueId INT NOT NULL
);

CREATE TABLE IF NOT EXISTS authors (
  author_ID bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  author_name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  author_avatar text COLLATE utf8_bin NOT NULL,
  author_description text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (author_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

CREATE TABLE posts (
  post_ID INT  PRIMARY KEY AUTO_INCREMENT,
  post_type VARCHAR(100) NOT NULL,
  post_title VARCHAR(1000) NOT NULL,
  post_content TEXT NOT NULL,
  post_author VARCHAR(100) NOT NULL,
  post_imgurl VARCHAR(1000) NOT NULL,
  post_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  post_comment_count INT(11) unsigned NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS comments (
  comment_ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  comment_post_ID bigint(20) unsigned NOT NULL,
  comment_count bigint(20) unsigned NOT NULL,
  comment_author text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  comment_author_IP varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  comment_date datetime NOT NULL,
  comment_content text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  comment_approved tinyint(4) NOT NULL DEFAULT '0',
  comment_like_count int(10) unsigned NOT NULL,
  comment_author_email varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (comment_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

