
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS tourguest;
CREATE TABLE tourguest (
  id int(11) NOT NULL AUTO_INCREMENT,
  bookingId int(11) NOT NULL,
  existingUserid int(11) DEFAULT 0,
  isPrimary bit(1) NOT NULL,
  firstname varchar(30) collate utf8_unicode_ci DEFAULT NULL,
  lastname varchar(30) collate utf8_unicode_ci DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  phone varchar(20) DEFAULT NULL,
  address varchar(300) DEFAULT NULL,
  emergencycontact varchar(20) DEFAULT NULL,
  isConfirmed bit(1) NOT NULL DEFAULT 0,
  isWithdrawn bit(1) NOT NULL DEFAULT 0,
  createdDate datetime NOT NULL,
  updatedDate datetime NOT NULL,
  PRIMARY KEY  (id),
  FOREIGN KEY (bookingId)
     REFERENCES booking(id)
     ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;