CREATE OR REPLACE VIEW listingview AS 
select l.id, l.type, l.cost, l.currency, l.header, l.description, l.requirement, l.minParticipant,
d.id as suburbId, concat(d.suburbname,', ', d.state ) as suburbname, d.postcode, d.area, d.region, d.lat, d.lng, 
CAST(concat(
    '[', 
    group_concat(concat('{', '"startDate":"', s.startDate, '","duration":"', s.duration, '","endDate":"', s.endDate, '","repeatedType":"', s.repeatedType, '","repeatedDay":"', s.repeatedDay, '"}')),
    ']'
) AS char(500)) as schedules,
u.id AS ownerId,
concat(u.FirstName, ' ', u.lastname) AS ownerName,
u.email AS ownerEmail,
i.url AS imageUrls
from listing l
inner join schedule s on s.listingId = l.id
inner join suburbdetail d on d.id = l.locationid
inner join touroperator o on o.listingid = l.id
inner join user u on u.id = o.userid
left outer join listingimageview as i on i.listingid = l.id
where o.isPrimary = 1 group by l.id
union
select l.id, l.type, l.cost, l.currency, l.header, l.description, l.requirement, l.minParticipant,
d.id as suburbId, concat(d.suburbname,', ', d.state ) as suburbname, d.postcode, d.area, d.region, d.lat, d.lng, 
CAST(concat(
    '[', 
    group_concat(concat('{', '"startDate":"', s.startDate, '","duration":"', s.duration, '","endDate":"', s.endDate, '","repeatedType":"', s.repeatedType, '","repeatedDay":"', s.repeatedDay, '"}')),
    ']'
) AS char(500)) as schedules,
u.id AS ownerId,
concat(u.FirstName, ' ', u.lastname) AS ownerName,
u.email AS ownerEmail,
i.url AS imageUrls
from listing l
inner join schedule s on s.listingId = l.id
inner join suburbdetail d on d.id = l.locationid
inner join user u on u.id = l.requestorid
left outer join listingimageview as i on i.listingid = l.id
group by l.id;