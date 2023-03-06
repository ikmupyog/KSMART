ALTER TABLE eg_death_dtls add column IF NOT EXISTS burial_lb_ward character varying(200);	
ALTER TABLE eg_death_dtls add column IF NOT EXISTS burial_description character varying(500);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS deceased_description character varying(500);

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS burial_lb_ward character varying(200);	
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS burial_description character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS deceased_description character varying(500);

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS burial_lb_ward character varying(200);	
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS burial_description character varying(500);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS deceased_description character varying(500);

ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS burial_lb_ward character varying(200);	
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS burial_description character varying(500);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS deceased_description character varying(500);

ALTER TABLE eg_death_dtls add column IF NOT EXISTS informant_office character varying(200);	
ALTER TABLE eg_death_dtls add column IF NOT EXISTS informant_designation character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS informant_pen_no character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS informant_office_address character varying(1000);

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS informant_office character varying(200);	
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS informant_designation character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS informant_pen_no character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS informant_office_address character varying(1000);

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS informant_office character varying(200);	
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS informant_designation character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS informant_pen_no character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS informant_office_address character varying(1000);

ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS informant_office character varying(200);	
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS informant_designation character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS informant_pen_no character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS informant_office_address character varying(1000);


ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS medical_practitioner_name character varying(200);	
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS medical_practitioner_aadhaar character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS medical_practitioner_mobile bigint;
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS medical_practitioner_regno character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS medical_practitioner_desig character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS medical_practitioner_address character varying(1000);

ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS medical_practitioner_name character varying(200);	
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS medical_practitioner_aadhaar character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS medical_practitioner_mobile bigint;
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS medical_practitioner_regno character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS medical_practitioner_desig character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS medical_practitioner_address character varying(1000);

ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS medical_practitioner_name character varying(200);	
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS medical_practitioner_aadhaar character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS medical_practitioner_mobile bigint;
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS medical_practitioner_regno character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS medical_practitioner_desig character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS medical_practitioner_address character varying(1000);

ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS medical_practitioner_name character varying(200);	
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS medical_practitioner_aadhaar character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS medical_practitioner_mobile bigint;
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS medical_practitioner_regno character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS medical_practitioner_desig character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS medical_practitioner_address character varying(1000);