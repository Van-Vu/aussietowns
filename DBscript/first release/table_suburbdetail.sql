CREATE TABLE `suburbdetail` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `suburbname` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
   `postcode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
   `state` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
   `detail` varchar(5000) COLLATE utf8_unicode_ci DEFAULT NULL,
   `level` int(1) DEFAULT NULL,
   `lat` decimal(9,6) DEFAULT NULL,
   `lng` decimal(9,6) DEFAULT NULL,
   `area` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
   `region` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=15593 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci