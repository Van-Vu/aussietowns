
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS booking;
CREATE TABLE booking (
  id int(11) NOT NULL auto_increment, 
  listingid int NOT NULL,
  bookingDate DateTime collate utf8_unicode_ci NOT NULL,
  startTime Time collate utf8_unicode_ci NOT NULL,  
  existingUserid int DEFAULT 0,
  isPrimary bit NOT NULL,
  isConfirmed bit NOT NULL,
  firstname varchar(30) collate utf8_unicode_ci default NULL,
  lastname varchar(30) collate utf8_unicode_ci default NULL,
  email varchar(100) collate utf8_unicode_ci default NULL,
  phone varchar(20) collate utf8_unicode_ci default NULL,
  address varchar(1000) collate utf8_unicode_ci default NULL,
  emergencycontact varchar(20) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (id),
  FOREIGN KEY (listingId)
     REFERENCES listing(id)
     ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;