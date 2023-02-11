ALTER TABLE eg_tl_address 
	DROP COLUMN IF EXISTS addressid,
	DROP COLUMN IF EXISTS addressnumber,
	DROP COLUMN IF EXISTS type,
	DROP COLUMN IF EXISTS addressline1,
	DROP COLUMN IF EXISTS addressline2,
	DROP COLUMN IF EXISTS city,
	DROP COLUMN IF EXISTS detail;

ALTER TABLE eg_tl_address 
	ADD COLUMN IF NOT EXISTS postoffice character varying(100),
	ADD COLUMN IF NOT EXISTS waterbody character varying(250),
	ADD COLUMN IF NOT EXISTS servicearea character varying(250);
	

ALTER TABLE eg_tl_address
	DROP COLUMN IF EXISTS buildingtype;
	
ALTER TABLE eg_tl_tradelicense 
DROP COLUMN IF EXISTS propertyid,
DROP COLUMN IF EXISTS oldpropertyid;

ALTER TABLE eg_tl_tradelicense 
	RENAME COLUMN licenseunitnamemal to licenseunitnamelocal;

ALTER TABLE eg_tl_tradelicense 
	ADD COLUMN IF NOT EXISTS desiredlicenseperiod integer;

ALTER TABLE eg_tl_tradelicensedetail
	DROP COLUMN IF EXISTS surveyno,
	DROP COLUMN IF EXISTS additionaldetail,
	DROP COLUMN IF EXISTS operationalarea,
	DROP COLUMN IF EXISTS adhocexemption,
	DROP COLUMN IF EXISTS adhocpenalty,
	DROP COLUMN IF EXISTS adhocexemptionreason,
	DROP COLUMN IF EXISTS adhocpenaltyreason,
	DROP COLUMN IF EXISTS licenseunittype,
	DROP COLUMN IF EXISTS licenseunitid,
	DROP COLUMN IF EXISTS customdetailtype;


ALTER TABLE eg_tl_tradelicensedetail
	ALTER COLUMN businessactivitydesc TYPE text;
	
ALTER TABLE eg_tl_institution
	DROP COLUMN IF EXISTS name,
	DROP COLUMN IF EXISTS type,
	DROP COLUMN IF EXISTS designation;
	
ALTER TABLE eg_tl_institution 
	ADD COLUMN IF NOT EXISTS licenseunitid character varying(64);
	
ALTER TABLE eg_tl_institution
	RENAME COLUMN instituionname TO institutionname;

ALTER TABLE eg_tl_tradeunit
	RENAME COLUMN tradetype to businesssubtype;
ALTER TABLE eg_tl_tradeunit
	RENAME COLUMN uom to businesscategory;
ALTER TABLE eg_tl_tradeunit
	RENAME COLUMN uomvalue to businesstype;

ALTER TABLE eg_tl_owner
	DROP COLUMN IF EXISTS isprimaryowner,
	DROP COLUMN IF EXISTS ownertype,
	DROP COLUMN IF EXISTS ownershippercentage,
	DROP COLUMN IF EXISTS relationship,
	DROP COLUMN IF EXISTS consentagreementplace,
	DROP COLUMN IF EXISTS consentagreementdate,
	DROP COLUMN IF EXISTS consentagreementenddate,
	DROP COLUMN IF EXISTS institutionid,
	DROP COLUMN IF EXISTS address;


ALTER TABLE eg_tl_owner 
	ADD COLUMN IF NOT EXISTS ownernamelocal character varying(300),
	ADD COLUMN IF NOT EXISTS careof character varying(10),
	ADD COLUMN IF NOT EXISTS careofname character varying(200),
	ADD COLUMN IF NOT EXISTS designation character varying(150),
	ADD COLUMN IF NOT EXISTS housename character varying(200),
	ADD COLUMN IF NOT EXISTS street character varying(150),
	ADD COLUMN IF NOT EXISTS locality character varying(150),
	ADD COLUMN IF NOT EXISTS postoffice character varying(150),
	ADD COLUMN IF NOT EXISTS pincode character varying(10),
	ADD COLUMN IF NOT EXISTS ownercontactno character varying(15);

ALTER TABLE eg_tl_tradelicense_audit
DROP COLUMN IF EXISTS propertyid,
DROP COLUMN IF EXISTS oldpropertyid;

ALTER TABLE eg_tl_tradelicense_audit
	ADD COLUMN IF NOT EXISTS assignee character varying(128),
	ADD COLUMN IF NOT EXISTS desiredlicenseperiod integer;
	
ALTER TABLE eg_tl_tradelicense_audit 
	RENAME COLUMN licenseunitnamemal to licenseunitnamelocal;
	
ALTER TABLE eg_tl_tradelicensedetail_audit
	DROP COLUMN IF EXISTS surveyno,
	DROP COLUMN IF EXISTS additionaldetail,
	DROP COLUMN IF EXISTS operationalarea,
	DROP COLUMN IF EXISTS adhocexemption,
	DROP COLUMN IF EXISTS adhocpenalty,
	DROP COLUMN IF EXISTS adhocexemptionreason,
	DROP COLUMN IF EXISTS adhocpenaltyreason,
	DROP COLUMN IF EXISTS licenseunittype,
	DROP COLUMN IF EXISTS licenseunitid,
	DROP COLUMN IF EXISTS customdetailtype;

 ALTER TABLE eg_tl_tradelicensedetail_audit
	RENAME COLUMN subownershipcategory TO ownershipcategory;

ALTER TABLE eg_tl_tradelicensedetail_audit
    RENAME COLUMN institutionid TO establishmentunitid;


