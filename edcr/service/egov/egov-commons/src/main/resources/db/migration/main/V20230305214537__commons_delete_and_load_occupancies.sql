delete from egbpa_usage;
delete from egbpa_sub_occupancy;
delete from egbpa_occupancy;


INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'A1', 'Residential', true, 0, 1, now(), 1, now(), 65, 3, 4, 1,'Residential',25);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'A2', 'Special Residential', true, 0, 1, now(), 1, now(), 65, 2.5, 4, 2,'Special Residential',3);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'B1', 'Educational', true, 0, 1, now(), 1, now(), 35, 2.5, 3, 3,'Educational', 4);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'C', 'Medical/Hospital', true, 0, 1, now(), 1, now(), 60, 2.5, 3.5, 4, 'Medical/Hospital', 5);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'D', 'Assembly', true, 0, 1, now(), 1, now(), 40, 1.5, 2.5, 5, 'Assembly', 6);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'E', 'Office/Business', true, 0, 1, now(), 1, now(), 70, 3, 4, 6, 'Office/Business', 7);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'F', 'Mercantile / Commercial', true, 0, 1, now(), 1, now(), 70, 3, 4, 7, 'Mercantile / Commercial', 8);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'G1', 'Industrial', true, 0, 1, now(), 1, now(), 65, 2.5, 0, 8, 'Industrial', 9);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'G2', 'Small Industrial', true, 0, 1, now(), 1, now(), 75, 3.5, 4, 9, 'Small Industrial', 10);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'H', 'Storage', true, 0, 1, now(), 1, now(), 80, 3, 4, 10, 'Storage', 11);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'I1', 'Hazardous (I1)', true, 0, 1, now(), 1, now(), 45, 2, 2, 11, 'Hazardous (I1)', 12);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'I2', 'Hazardous (I2)', true, 0, 1, now(), 1, now(), 40, 1.5, 1.5, 12, 'Hazardous (I2)', 13);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), '14', 'Thatched / Tiled House', true, 0, 1, now(), 1, now(), 65, 1, 1, 13, 'Thatched / Tiled House', null);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), '15', 'Mixed', true, 0, 1, now(), 1, now(), null, null, null, 14, 'Mixed', null);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'A3', 'Hostel Educational', true, 0, 1, now(), 1, now(), 65, 2.5, 4, 15, 'Hostel Educational', 19);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'A4', 'Apartment/Flat', true, 0, 1, now(), 1, now(), 65, 3, 4, 16, 'Apartment/Flat', 2);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'A5', 'Professional Office', true, 0, 1, now(), 1, now(), 65, 3, 4, 17, 'Professional Office', 24);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'B2', 'Educational HighSchool', true, 0, 1, now(), 1, now(), 35, 2.5, 3, 18, 'Educational HighSchool', 14);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'B3', 'Higher Educational Institute', true, 0, 1, now(), 1, now(), 35, 2.5, 3, 19, 'Higher Educational Institute', 15);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'C1', 'Medical IP', true, 0, 1, now(), 1, now(), 60, 2.5, 3.5, 20, 'Medical IP', 5);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'C2', 'Medical OP', true, 0, 1, now(), 1, now(), 60, 2.5, 3.5, 21, 'Medical OP', 20);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'C3', 'Medical Admin', true, 0, 1, now(), 1, now(), 60, 2.5, 3.5, 22, 'Medical Admin', 21);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'D1', 'Assembly Worship', true, 0, 1, now(), 1, now(), 40, 1.5, 2.5, 23, 'Assembly Worship', 16);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'D2', 'Bus Terminal', true, 0, 1, now(), 1, now(), 40, 1.5, 2.5, 24, 'Bus Terminal', 22);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'F1', 'Commercial Parking Plaza', true, 0, 1, now(), 1, now(), 70, 3, 4, 25, 'Commercial Parking Plaza', 17);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'F2', 'Commercial Parking Appurtenant', true, 0, 1, now(), 1, now(), 70, 3, 4, 26, 'Commercial Parking Appurtenant', 18);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'F3', 'Hotels', true, 0, 1, now(), 1, now(), 70, 3, 4, 27, 'Hotels', 23);

INSERT INTO egbpa_occupancy (id, code, name, isactive, version, createdby, createddate, lastmodifiedby, lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description
, colorcode) VALUES (nextval('SEQ_egbpa_occupancy'), 'F4', 'Kiosk', true, 0, 1, now(), 1, now(), 70, 3, 4, 28, 'Kiosk', 26);

