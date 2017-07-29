CREATE OR REPLACE VIEW listingview AS 
select l.id, l.type, l.cost, l.currency, l.header, l.description, l.requirement, l.minParticipant,
d.id as suburbId, concat(d.suburbname,', ', d.state ) as suburbname, d.postcode, d.area, d.region, d.lat, d.lng, 
CAST(concat(
    '[', 
    group_concat(json_object('startDate', s.startDate, 'duration', s.duration, 'endDate', s.endDate, 'repeatedType', s.repeatedType)),
    ']'
) AS char(500)) as schedules,
IF(l.type = 0, u1.id, u2.id) AS ownerId,
IF(l.type = 0, concat(u1.FirstName, ' ', u1.lastname), concat(u2.firstname, ' ', u2.lastname)) AS ownerName,
IF(l.type = 0, u1.email, u2.email) AS ownerEmail,
i.url AS firstImageUrl
from listing l
inner join schedule s on s.listingId = l.id
inner join suburbdetail d on d.id = l.locationid
left outer join (select url, listingid from image order by sortorder, createddate) as i on i.listingid = l.id
left outer join touroperator o on o.listingid = l.id
left outer join user u1 on u1.id = o.userid
left outer join tourguest g on g.listingid = l.id
left outer join user u2 on u2.id = g.existingUserid
where o.isPrimary = 1 or g.isPrimary = 1
group by l.id;