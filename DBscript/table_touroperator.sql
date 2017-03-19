
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS touroperator;
CREATE TABLE touroperator (
  tourofferid int NOT NULL,
  userid int NOT NULL,
  PRIMARY KEY  (tourofferid,userid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;