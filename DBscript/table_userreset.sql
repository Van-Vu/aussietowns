
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS userreset;
CREATE TABLE userreset (
  id int(11) NOT NULL auto_increment,
  userId int NOT NULL,
  resetToken varchar(36) NOT NULL,
  expiryDate DateTime NOT NULL,
  isActive bit NOT NULL DEFAULT 0,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;