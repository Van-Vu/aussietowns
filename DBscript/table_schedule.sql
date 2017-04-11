
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS schedule;
CREATE TABLE schedule (
  id int(11) NOT NULL auto_increment,
  startDate DateTime collate utf8_unicode_ci NOT NULL,
  duration Time collate utf8_unicode_ci NOT NULL,
  endDate DateTime collate utf8_unicode_ci NULL,
  repeatedType tinyint collate utf8_unicode_ci NULL,
  listingId int(11) NOT NULL,
  PRIMARY KEY  (id),
  FOREIGN KEY (listingId)
     REFERENCES listing(id)
     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;