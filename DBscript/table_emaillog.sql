
SET NAMES utf8;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS emaillog;
CREATE TABLE emaillog (
  id int(11) NOT NULL auto_increment,
  listingid int NOT NULL,
  fromAddress varchar(128) NOT NULL,
  toAddress varchar(128) NOT NULL,
  subject varchar(200) NOT NULL,
  content varchar(1000) NOT NULL,
  transactionId varchar(36),
  messageId varchar(36),
  status bit DEFAULT 0,
  createdDate DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (listingId)
     REFERENCES listing(id)
     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;