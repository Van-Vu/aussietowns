
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS listing;
CREATE TABLE listing (
  id int(11) NOT NULL auto_increment,
  type TINYINT collate utf8_unicode_ci default 0 NOT NULL,
  locationid int default 0 NOT null,
  cost int collate utf8_unicode_ci NOT NULL,
  currency TINYINT collate utf8_unicode_ci NOT NULL,
  header varchar(100) collate utf8_unicode_ci default NULL,
  description varchar(1000) collate utf8_unicode_ci default NULL,
  requirement varchar(1000) collate utf8_unicode_ci default NULL,
  minParticipant TINYINT collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;