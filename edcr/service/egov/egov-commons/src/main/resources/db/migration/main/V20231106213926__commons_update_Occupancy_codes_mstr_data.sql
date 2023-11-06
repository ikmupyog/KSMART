delete from egbpa_occupancy where code in ('A1', 'A4', 'A5');

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'A4', 'Apartments/Flats', 't', 0, 1, now(), 1,now(), 65, 3, 4, 1, 'Apartments/Flats', 2);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'A5', 'Small proffessional offices used as part of principal residential use', 't', 0, 1, now(), 1,now(), 65, 3, 4, 1, 'Small proffessional offices used as part of principal residential use', 24);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'A1', 'Single family dwelling & dual single family units', 't', 0, 1, now(), 1,now(), 65, 3, 4, 1, 'Single family dwelling & dual single family units', 25);
