
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id int(11) NOT NULL auto_increment,
  firstname varchar(30) collate utf8_unicode_ci default NULL,
  lastname varchar(30) collate utf8_unicode_ci default NULL,
  email varchar(100) collate utf8_unicode_ci default NULL,
  password varchar(100) collate utf8_unicode_ci default NULL,
  gender varchar(10) collate utf8_unicode_ci default NULL,
  birthday DATE collate utf8_unicode_ci default NULL,
  phone varchar(20) collate utf8_unicode_ci default NULL,
  language SMALLINT collate utf8_unicode_ci DEFAULT 0 NOT NULL,
  currency TINYINT collate utf8_unicode_ci DEFAULT 0 NOT NULL,
  location varchar(100) collate utf8_unicode_ci default NULL,
  description varchar(1000) collate utf8_unicode_ci default NULL,
  address varchar(1000) collate utf8_unicode_ci default NULL,
  emergencycontact varchar(20) collate utf8_unicode_ci default NULL,
  photoUrl varchar(1000) collate utf8_unicode_ci default NULL,
  videoUrl varchar(1000) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;