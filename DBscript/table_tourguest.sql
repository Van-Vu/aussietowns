
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS tourguest;
CREATE TABLE tourguest (
  listingid int NOT NULL,
  userid int NOT NULL,
  PRIMARY KEY  (listingid, userid),
  FOREIGN KEY (listingId)
     REFERENCES listing(id)
     ON DELETE CASCADE,
  FOREIGN KEY (userId)
     REFERENCES user(id)
     ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;