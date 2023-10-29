delete from egbpa_usage;
delete from egbpa_sub_occupancy;
delete from egbpa_occupancy;

--------------------------------OCCUPANCY MASTER DATA ---------------------------

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'A1', 'Apartments/Flats', 't', 0, 1, now(), 1,now(), 65, 3, 4, 1, 'Apartments/Flats', 2);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'A4', 'Small proffessional offices used as part of principal residential use', 't', 0, 1, now(), 1,now(), 65, 3, 4, 1, 'Small proffessional offices used as part of principal residential use', 24);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'A5', 'Single family dwelling & dual single family units', 't', 0, 1, now(), 1,now(), 65, 3, 4, 1, 'Single family dwelling & dual single family units', 25);


INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'A2', 'Special residential lodging', 't', 0, 1, now(), 1,now(), 65, 2.5, 4, 1, 'Special residential lodging', 3);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'A3', 'Hotels', 't', 0, 1, now(), 1,now(), 65, 2.5, 4, 1, 'Hotels', 23);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'B1', 'Educational up to high school', 't', 0, 1, now(), 1,now(), 35, 2.5, 3, 6, 'Educational up to high school', 4);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'B2', 'High schools, Higher secondary, Junior technical schools, ITIs', 't', 0, 1, now(), 1,now(), 35, 2.5, 3, 6, 'High schools, Higher secondary, Junior technical schools, ITIs', 14);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'B3', 'Higher educational institutions', 't', 0, 1, now(), 1,now(), 35, 2.5, 3, 6, 'Higher educational institutions', 15);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'C1', 'Medical - IP', 't', 0, 1, now(), 1,now(), 60, 2.5, 3.5, 10, 'Medical - IP', 5);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'C2', 'Medical -OP', 't', 0, 1, now(), 1,now(), 60, 2.5, 3.5, 10, 'Medical -OP', 20); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'C3', 'Medical - Admin', 't', 0, 1, now(), 1,now(), 60, 2.5, 3.5, 10, 'Medical - Admin', 21);  


INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'D', 'Assembly', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 14, 'Assembly', 6);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'D1', 'Assembly - Worship', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 14, 'Assembly - Worship', 16);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'D2', 'Assembly Bus terminal', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 14, 'Assembly Bus terminal', 22);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'D3', 'Assembly - Auditorium, Community Halls & Wedding Halls', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 14, 'Assembly - Auditorium, Community Halls & Wedding Halls', 17);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'D4', 'Assembly - Patriotic', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 14, 'Assembly - Patriotic', 36);


INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'E', 'Office/Business', 't', 0, 1, now(), 1,now(), 70, 3, 4, 17, 'Office/ Business', 7);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'E1', 'Govt. approved /owned IT Parks', 't', 0, 1, now(), 1,now(), 70, 3, 4, 17, 'Govt. approved /owned IT Parks', 30);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'E2', 'All Govt. offices in plot owned by Govt.', 't', 0, 1, now(), 1,now(), 70, 3, 4, 17, 'All Govt. offices in plot owned by Govt.', 31);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'F', 'Commercial/Parking Plaza', 't', 0, 1, now(), 1,now(), 70, 3, 4, 18, 'Commercial/Parking Plaza', 8);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'F1', 'Appurtenant - Parking', 't', 0, 1, now(), 1,now(), 70, 3, 4, 18, 'Appurtenant - Parking', 18);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'F2', 'Restaurant', 't', 0, 1, now(), 1,now(), 70, 3, 4, 18, 'Restaurant', 38);

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'F3', 'Saegregated Sanitation', 't', 0, 1, now(), 1,now(), 70, 3, 4, 18, 'Saegregated Sanitation', 19);
   

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'G1', 'Industries - Type G1', 't', 0, 1, now(), 1,now(), 65, 2.5, 3, 22, 'Industries - Type G1', 9); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'G4', 'Automobile Service station with repairing facility', 't', 0, 1, now(), 1,now(), 65, 2.5, 3, 22, 'Automobile Service station with repairing facility', 28); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'G5', 'Non nuisance, Non dangerous type', 't', 0, 1, now(), 1,now(), 65, 2.5, 3, 22, 'Non nuisance, Non dangerous type', 37); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'G2', 'Industries - Type G2', 't', 0, 1, now(), 1,now(), 65, 2.5, 3, 22, 'Industries - Type G2', 10); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'G3', 'Industrial Type G2 - Modern meat processing unit/slaughter houses, Electric and gas crematoria', 't', 0, 1, now(), 1,now(), 65, 2.5, 3, 22, 'Industrial Type G2 - Modern meat processing unit/slaughter houses, Electric and gas crematoria', 27); 
   

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'H', 'Storage H', 't', 0, 1, now(), 1,now(), 80, 3, 4, 24, 'Storage H', 11); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'I', 'Hazardous', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 24, 'Hazardous(I)', 	12); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'I1', 'Automobile Fuel filling Station Canopy', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 24, 'Automobile Fuel filling Station Canopy', 26); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'I2', 'Sales office/ kiosks in Fuel Filling Station', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 24, 'Sales office/ kiosks in Fuel Filling Station', 29); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'I3', 'Storage of LPG cylinders designated as white category as per PCB', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 24, 'Storage of LPG cylinders designated as white category as per PCB', 32); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'I4', 'Burial ground, Vault and Crematori', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 24, 'Burial ground, Vault and Crematori', 33); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'I5', 'Type C magazine for explosives', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 24, 'Type C magazine for explosives', 34); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'I6', 'Fuel Filling station intended to fuel boats', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 24, 'Fuel Filling station intended to fuel boats', 35); 

INSERT INTO egbpa_occupancy(id, code, name, isactive, version, createdby, createddate, lastmodifiedby,lastmodifieddate, maxcoverage, minfar, maxfar, ordernumber, description, colorcode)
VALUES (nextval('seq_egbpa_occupancy'), 'J', 'Multiplex Complex', 't', 0, 1, now(), 1,now(), 40, 1.5, 2.5, 24, 'Multiplex Complex', 13);  