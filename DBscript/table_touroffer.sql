
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS touroffer;
CREATE TABLE touroffer (
  id int(11) NOT NULL auto_increment,
  time DATETIME collate utf8_unicode_ci NOT NULL,
  locationid int default 0 NOT null,
  hour TINYINT collate utf8_unicode_ci NOT NULL,
  minute TINYINT collate utf8_unicode_ci NOT NULL,
  isFullday TINYINT collate utf8_unicode_ci NOT NULL,
  cost int collate utf8_unicode_ci NOT NULL,
  currency TINYINT collate utf8_unicode_ci NOT NULL,
  header varchar(100) collate utf8_unicode_ci default NULL,
  description varchar(1000) collate utf8_unicode_ci default NULL,
  requirement varchar(1000) collate utf8_unicode_ci default NULL,
  minParticipant TINYINT collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;