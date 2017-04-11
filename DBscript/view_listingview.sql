CREATE OR REPLACE VIEW listingview AS 
select l.id, l.type, l.cost, l.currency, l.header, l.description, l.requirement, l.minParticipant,
s.startdate,s.duration,s.endDate,s.repeatedType, 
d.id as suburbId, concat(d.suburbname,', ', d.state ) as suburbname, d.postcode, d.area, d.region, d.lat, d.lng, 
IF(l.type = 0, u1.id, u2.id) AS ownerId,
IF(l.type = 0, concat(u1.FirstName, ' ', u1.lastname), concat(u2.firstname, ' ', u2.lastname)) AS ownerName,
IF(l.type = 0, u1.email, u2.email) AS ownerEmail
from listing l
inner join schedule s on s.listingId = l.id
inner join suburbdetail d on d.id = l.locationid
left outer join touroperator o on o.listingid = l.id
left outer join user u1 on u1.id = o.userid
left outer join tourguest g on g.listingid = l.id
left outer join user u2 on u2.id = g.userid
where o.isowner = 1 or g.isowner = 1
order by l.id;