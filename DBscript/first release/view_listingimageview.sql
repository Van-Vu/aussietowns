CREATE OR REPLACE VIEW listingimageview AS 
select CAST(concat(group_concat(url SEPARATOR ';')) AS char(1000)) as url, listingid from image group by listingid order by sortorder, createddate;