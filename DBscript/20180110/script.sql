ALTER TABLE Listing ADD COLUMN upsell TINYINT DEFAULT 0;
ALTER TABLE Listing ADD COLUMN isFeatured bit(1) DEFAULT 0;
ALTER TABLE User ADD COLUMN hobbies varchar(200) collate utf8_unicode_ci default NULL;

DROP TABLE IF EXISTS article;
CREATE TABLE article (
  id int(11) NOT NULL auto_increment,
  category TINYINT collate utf8_unicode_ci default 0 NOT NULL,
  status TINYINT collate utf8_unicode_ci default 0 NOT NULL,
  authorid int default 0 NOT null,
  isFeatured bit(1) DEFAULT 0,
  title varchar(200) collate utf8_unicode_ci default NULL,
  content TEXT collate utf8_unicode_ci default NULL,
  imageUrl varchar(100) collate utf8_unicode_ci default NULL,
  tags varchar(200) collate utf8_unicode_ci default NULL,
  createdDate DateTime collate utf8_unicode_ci NOT NULL,
  updatedDate DateTime collate utf8_unicode_ci NOT NULL,  
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS hobbies;
CREATE TABLE hobbies (
  id int(11) NOT NULL auto_increment,
  name varchar(20) collate utf8_unicode_ci default NULL,
  text varchar(50) collate utf8_unicode_ci default NULL,
  visible bit(1) DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO hobbies(name,text,visible) VALUES ('languagestudy','Foreign language study',1), ('reading','Reading',1), ('blogging','Blogging',1), ('yoga','Yoga',1), ('gym','Gym',1), ('meditate','Meditate',1), ('teamsport','Team sport',1), ('dance','Dance',1), ('fishing','Fishing',1), ('camping','Camping',1), ('gardening','Gardening',1), ('musicalinstrument','Musical instrument',1), ('volunteering','Volunteering',1), ('drawing','Drawing',1), ('photography','Photography',1), ('cooking','Cooking',1);