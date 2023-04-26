    ALTER TABLE eg_marriage_details ALTER COLUMN brideurl TYPE VARCHAR(2000);
	ALTER TABLE eg_marriage_details ALTER COLUMN groomurl TYPE VARCHAR(2000);
	ALTER TABLE eg_marriage_details_audit ALTER COLUMN brideurl TYPE VARCHAR(2000);
	ALTER TABLE eg_marriage_details_audit ALTER COLUMN groomurl TYPE VARCHAR(2000);
	
	ALTER TABLE eg_register_marriage_details ALTER COLUMN brideurl TYPE VARCHAR(2000);
	ALTER TABLE eg_register_marriage_details ALTER COLUMN groomurl TYPE VARCHAR(2000);
	ALTER TABLE eg_register_marriage_details_audit ALTER COLUMN brideurl TYPE VARCHAR(2000);
	ALTER TABLE eg_register_marriage_details_audit ALTER COLUMN groomurl TYPE VARCHAR(2000);