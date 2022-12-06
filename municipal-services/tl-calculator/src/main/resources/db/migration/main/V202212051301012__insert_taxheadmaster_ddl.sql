INSERT INTO eg_tl_taxheadmaster(
	id, tenantid, lbtype, service, headname, headcode, type, rate, status, createdby, createdtime, lastmodifiedby, lastmodifiedtime)
 VALUES ('1', 'default', 'UL', 'TL',
		 'Advance Collection Of Revenue Licence Fees',
		 '350410301', 'ADV',0, 0, 1, (SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')),1,(SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')));

INSERT INTO eg_tl_taxheadmaster(
	id, tenantid, lbtype, service, headname, headcode, type, rate, status, createdby, createdtime, lastmodifiedby, lastmodifiedtime)
 VALUES ('2', 'default', 'UL', 'TL',
		 'Receivable For Licence Fee (Current)',
		 '431300201', 'CUR',0, 0, 1, (SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')),1,(SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')));

INSERT INTO eg_tl_taxheadmaster(
	id, tenantid, lbtype, service, headname, headcode, type, rate, status, createdby, createdtime, lastmodifiedby, lastmodifiedtime)
 VALUES ('3', 'default', 'UL', 'TL',
		 'Receivable For Licence Fee (Arrear)',
		 '431300202', 'ARR',0, 0, 1, (SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')),1,(SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')));
		 
INSERT INTO eg_tl_taxheadmaster(
	id, tenantid, lbtype, service, headname, headcode, type, rate, status, createdby, createdtime, lastmodifiedby, lastmodifiedtime)
 VALUES ('4', 'default', 'UL', 'TL',
		 'Licence Charge Fees',
		 '140400500', 'CHARGEFEE','0', 0, 1, (SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')),1,(SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')));

INSERT INTO eg_tl_taxheadmaster(
	id, tenantid, lbtype, service, headname, headcode, type, rate, status, createdby, createdtime, lastmodifiedby, lastmodifiedtime)
 VALUES ('5', 'default', 'UL', 'TL',
		 'Fees for Installation of Machinery',
		 '140120200', 'INSTALLATIONFEE',0, 0, 1, (SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')),1,(SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')));
		 
INSERT INTO eg_tl_taxheadmaster(
	id, tenantid, lbtype, service, headname, headcode, type, rate, status, createdby, createdtime, lastmodifiedby, lastmodifiedtime)
 VALUES ('6', 'default', 'UL', 'TL',
		 'Fines',
		 '140200300', 'FINE',0, 0, 1, (SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')),1,(SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')));
		 
INSERT INTO eg_tl_taxheadmaster(
	id, tenantid, lbtype, service, headname, headcode, type, rate, status, createdby, createdtime, lastmodifiedby, lastmodifiedtime)
 VALUES ('7', 'default', 'UL', 'TL',
		 'Application Fee',
		 '140129900', 'ALL',10, 1, 1, (SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')),1,(SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')));
		 
INSERT INTO eg_tl_taxheadmaster(
	id, tenantid, lbtype, service, headname, headcode, type, rate, status, createdby, createdtime, lastmodifiedby, lastmodifiedtime)
 VALUES ('8', 'default', 'UL', 'TL',
		 'Court Fee Stamp',
		 '350100112', 'ALL',5, 1, 1, (SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')),1,(SELECT EXTRACT(EPOCH FROM TIMESTAMP  '2022-10-06')));

		 