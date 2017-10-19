
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS booking;
CREATE TABLE booking (
  id int(11) NOT NULL auto_increment, 
  listingid int NOT NULL,
  bookingDate DateTime collate utf8_unicode_ci NOT NULL,
  startTime Time collate utf8_unicode_ci NOT NULL,  
  status tinyInt(3) NOT NULL,
  createdDate DateTime collate utf8_unicode_ci NULL,
  updatedDate DateTime collate utf8_unicode_ci NULL,
  PRIMARY KEY  (id),
  FOREIGN KEY (listingId)
     REFERENCES listing(id)
     ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;