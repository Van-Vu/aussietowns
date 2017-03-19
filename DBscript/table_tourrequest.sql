
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS tourrequest;
CREATE TABLE tourrequest (
  id int(11) NOT NULL auto_increment,
  beginDate Date collate utf8_unicode_ci NOT NULL,
  endDate Date collate utf8_unicode_ci NOT NULL,
  location varchar(100) collate utf8_unicode_ci default NULL,
  budget int collate utf8_unicode_ci NOT NULL,
  currency TINYINT collate utf8_unicode_ci NOT NULL,
  header varchar(100) collate utf8_unicode_ci default NULL,
  description varchar(1000) collate utf8_unicode_ci default NULL,
  minParticipant TINYINT collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;