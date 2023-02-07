ALTER TABLE eg_institution
	RENAME TO eg_establishmentunit;
  
ALTER TABLE eg_establishmentunit
	RENAME COLUMN institutionname TO establishmentunitname;
ALTER TABLE eg_establishmentunit
	RENAME COLUMN institutionnamelocal TO establishmentunitnamelocal;
ALTER TABLE eg_establishmentunit
	RENAME COLUMN institutionid TO establishmentunitid;
	
ALTER TABLE eg_tl_tradelicensedetail
	RENAME COLUMN institutionid TO establishmentunitid;