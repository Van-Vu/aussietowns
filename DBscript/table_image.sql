
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS image;
CREATE TABLE image (
  imageid int(11) NOT NULL auto_increment,
  listingid int NOT NULL,
  url varchar(128) NOT NULL,
  sortOrder SMALLINT NOT NULL DEFAULT 0,
  createdDate DATETIME,
  isActive bit,
  PRIMARY KEY (imageid),
  FOREIGN KEY (listingId)
     REFERENCES listing(id)
     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;