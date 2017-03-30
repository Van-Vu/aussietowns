
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS schedule;
CREATE TABLE schedule (
  id int(11) NOT NULL auto_increment,
  fromTime Date collate utf8_unicode_ci NOT NULL,
  toTime Date collate utf8_unicode_ci NOT NULL,
  isFullday BIT collate utf8_unicode_ci NOT NULL,
  listingId int(11) NOT NULL,
  PRIMARY KEY  (id),
  FOREIGN KEY (listingId)
     REFERENCES listing(id)
     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;