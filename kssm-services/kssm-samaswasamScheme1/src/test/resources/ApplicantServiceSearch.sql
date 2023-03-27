SELECT ap.id AS applicant_id, ap.aadhaarno, ap.email, ap.firstname, ap.lastname, ap.title, ap.mobileno, ap.
  tenantid, ap.createdby AS applicant_createdby, ap.createdtime AS applicant_createdtime, ap.lastmodifiedby 
  AS applicant_lastmodifiedby, ap.lastmodifiedtime AS applicant_lastmodifiedtime, ap.fatherfirstname, ap.
  fatherlastname, ap.motherfirstname, ap.motherlastname, ap.applicantcategory, ap.dateofbirth, ap.
  bankaccountno, ap.firstnamemal, ap.lastnamemal, ap.fatherfirstnamemal, ap.fatherlastnamemal, ap.
  motherfirstnamemal, ap.motherlastnamemal,
  -- applicant address
  ad.id AS address_id, ad.buildingno, ad.housename, ad.street, ad.pincode, ad.postofficename, ad.createdby AS 
  address_createdby, ad.createdtime AS address_createdtime, ad.lastmodifiedby AS address_lastmodifiedby, ad
  .lastmodifiedtime AS address_lastmodifiedtime, ad.residenceassociationno, ad.localplace, ad.mainplace, 
  ad.wardno, ad.subno, ad.housenamemal, ad.village, ad.taluk, ad.streetmal, ad.localplacemal, ad.
  mainplacemal,
  -- applicant document
  doc.id AS document_id, doc.documenttypeid, doc.documentnumber, doc.docexpirydate, doc.createdby AS 
  document_createdby, doc.createdtime AS document_createdtime, doc.lastmodifiedby AS 
  document_lastmodifiedby, doc.lastmodifiedtime AS document_lastmodifiedtime,
  -- service detail
  svc.id AS servicedetail_id, svc.serviceid, svc.servicecode, svc.createdby AS servicedetail_createdby, svc.
  createdtime AS servicedetail_createdtime, svc.lastmodifiedby AS servicedetail_lastmodifiedby, svc.
  lastmodifiedtime AS servicedetail_lastmodifiedtime, svc.servicesubtype, svc.serviceminortype,
  -- service document
  sd.id AS servicedocument_id, sd.documenttypeid AS servicedocument_documenttypeid, sd.filestoreid, sd.
  active, sd.createdby AS servicedocument_createdby, sd.createdtime AS servicedocument_createdtime, sd.
  lastmodifiedby AS servicedocument_lastmodifiedby, sd.lastmodifiedtime AS 
  servicedocument_lastmodifiedtime, sd.documentnumber AS servicedocument_documentnumber, sd.
  applicationdetails,
  -- service file detail
  fd.id AS filedetail_id, fd.filenumber, fd.filecode, fd.filename, fd.filearisingmode, fd.filearisingdate, 
  fd.financialyear, fd.applicationdate, fd.workflowcode, fd.action, fd.filestatus, fd.createdby AS 
  filedetail_createdby, fd.createdtime AS filedetail_createdtime, fd.lastmodifiedby AS 
  filedetail_lastmodifiedby, fd.lastmodifiedtime AS filedetail_lastmodifiedtime, fd.filecategory, fd.
  businessservice, fd.assignee,
  -- applicant detail/child
  apc.id AS applicantdetail_id, apc.buildingNumber, apc.relationofassessee, apc.nameofoccupier, apc.
  relationofoccupier, apc.durationofresidenceinyears, apc.ownername, apc.ownernamemal, apc.owneraddress, 
  apc.owneraddressmal, apc.ownermobileno, apc.nameofoccupiermal, apc.durationofresidenceinmonths, apc.
  createdby AS applicantdetail_createdby, apc.createdtime AS applicantdetail_createdtime, apc.
  lastmodifiedby AS applicantdetail_lastmodifiedby, apc.lastmodifiedtime AS 
  applicantdetail_lastmodifiedtime
FROM eg_fm_applicantpersonal ap
INNER JOIN eg_fm_applicantaddress ad ON ad.applicantpersonalid = ap.id
INNER JOIN eg_fm_applicantdocument doc ON doc.applicantpersonalid = ap.id
INNER JOIN eg_fm_servicedetail svc ON svc.applicantpersonalid = ap.id
INNER JOIN eg_fm_applicantservicedocument sd ON sd.servicedetailsid = svc.id
INNER JOIN eg_fm_filedetail fd ON fd.servicedetailsid = svc.id
LEFT JOIN eg_fm_applicantpersonal_child apc ON apc.applicantpersonalid = ap.id
WHERE svc.id = 'ffd9101b-3b90-4127-8c03-b9271402e0a0';
