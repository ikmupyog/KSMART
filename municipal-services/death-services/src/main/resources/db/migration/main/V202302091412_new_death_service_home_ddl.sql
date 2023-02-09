ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_locality_en character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_locality_ml character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_street_en character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_street_ml character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_housename_en character varying(500);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_housename_ml character varying(500);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_postoffice_id character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_postofficename_en character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_postofficename_ml character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_pincode BIGINT;
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_ward character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_taluk_id character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_taluk_en character varying(500);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_home_taluk_ml character varying(500);

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_locality_en character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_locality_ml character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_street_en character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_street_ml character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_housename_en character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_housename_ml character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_postoffice_id character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_postofficename_en character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_postofficename_ml character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_pincode BIGINT;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_ward character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_taluk_id character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_taluk_en character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_home_taluk_ml character varying(500);

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_locality_en character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_locality_ml character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_street_en character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_street_ml character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_housename_en character varying(500);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_housename_ml character varying(500);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_postoffice_id character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_postofficename_en character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_postofficename_ml character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_pincode BIGINT;
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_ward character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_taluk_id character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_taluk_en character varying(500);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_home_taluk_ml character varying(500);

ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_locality_en character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_locality_ml character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_street_en character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_street_ml character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_housename_en character varying(500);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_housename_ml character varying(500);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_postoffice_id character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_postofficename_en character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_postofficename_ml character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_pincode BIGINT;
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_ward character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_taluk_id character varying(200);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_taluk_en character varying(500);
ALTER TABLE eg_death_dtls_registry_log   add column IF NOT EXISTS death_home_taluk_ml character varying(500);

ALTER TABLE eg_death_statistical_dtls ALTER COLUMN smoking_type TYPE character varying(64);
ALTER TABLE eg_death_statistical_dtls ALTER COLUMN tobacco_type TYPE character varying(64);
ALTER TABLE eg_death_statistical_dtls ALTER COLUMN alcohol_type TYPE character varying(64);

ALTER TABLE eg_death_statistical_dtls_log ALTER COLUMN smoking_type TYPE character varying(64);
ALTER TABLE eg_death_statistical_dtls_log ALTER COLUMN tobacco_type TYPE character varying(64);
ALTER TABLE eg_death_statistical_dtls_log ALTER COLUMN alcohol_type TYPE character varying(64);

ALTER TABLE eg_death_statistical_registry ALTER COLUMN smoking_type TYPE character varying(64);
ALTER TABLE eg_death_statistical_registry ALTER COLUMN tobacco_type TYPE character varying(64);
ALTER TABLE eg_death_statistical_registry ALTER COLUMN alcohol_type TYPE character varying(64);

ALTER TABLE eg_death_statistical_registry_log ALTER COLUMN smoking_type TYPE character varying(64);
ALTER TABLE eg_death_statistical_registry_log ALTER COLUMN tobacco_type TYPE character varying(64);
ALTER TABLE eg_death_statistical_registry_log ALTER COLUMN alcohol_type TYPE character varying(64);

ALTER TABLE eg_death_statistical_dtls ALTER COLUMN death_during_delivery TYPE character varying(200);

ALTER TABLE eg_death_statistical_dtls ADD COLUMN  IF NOT EXISTS Autopsy_performed BOOLEAN;
ALTER TABLE eg_death_statistical_dtls ADD COLUMN  IF NOT EXISTS Autopsy_completed BOOLEAN;
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS manner_of_death character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_main_custom character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_main_interval INTEGER;
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_main_timeunit character varying(200);

ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_sub_custom character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_sub_interval INTEGER;
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_sub_timeunit character varying(200);

ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_sub2 character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_sub2_custom character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_sub2_interval INTEGER;
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS death_cause_sub2_timeunit character varying(200);

ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS deceased_pregnant character varying(200);
ALTER TABLE eg_death_statistical_dtls add column IF NOT EXISTS is_delivery character varying(200);

ALTER TABLE eg_death_statistical_dtls_log ALTER COLUMN death_during_delivery TYPE character varying(200);

ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN  IF NOT EXISTS Autopsy_performed BOOLEAN;
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN  IF NOT EXISTS Autopsy_completed BOOLEAN;
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS manner_of_death character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_main_custom character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_main_interval INTEGER;
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_main_timeunit character varying(200);

ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_sub_custom character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_sub_interval INTEGER;
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_sub_timeunit character varying(200);

ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_sub2 character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_sub2_custom character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_sub2_interval INTEGER;
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS death_cause_sub2_timeunit character varying(200);

ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS deceased_pregnant character varying(200);
ALTER TABLE eg_death_statistical_dtls_log add column IF NOT EXISTS is_delivery character varying(200);

ALTER TABLE eg_death_statistical_registry ALTER COLUMN death_during_delivery TYPE character varying(200);

ALTER TABLE eg_death_statistical_registry ADD COLUMN  IF NOT EXISTS Autopsy_performed BOOLEAN;
ALTER TABLE eg_death_statistical_registry ADD COLUMN  IF NOT EXISTS Autopsy_completed BOOLEAN;
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS manner_of_death character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_main_custom character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_main_interval INTEGER;
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_main_timeunit character varying(200);

ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_sub_custom character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_sub_interval INTEGER;
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_sub_timeunit character varying(200);

ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_sub2 character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_sub2_custom character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_sub2_interval INTEGER;
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS death_cause_sub2_timeunit character varying(200);

ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS deceased_pregnant character varying(200);
ALTER TABLE eg_death_statistical_registry add column IF NOT EXISTS is_delivery character varying(200);

ALTER TABLE eg_death_statistical_registry_log ALTER COLUMN death_during_delivery TYPE character varying(200);

ALTER TABLE eg_death_statistical_registry_log ADD COLUMN  IF NOT EXISTS Autopsy_performed BOOLEAN;
ALTER TABLE eg_death_statistical_registry_log ADD COLUMN  IF NOT EXISTS Autopsy_completed BOOLEAN;
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS manner_of_death character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_main_custom character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_main_interval INTEGER;
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_main_timeunit character varying(200);

ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_sub_custom character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_sub_interval INTEGER;
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_sub_timeunit character varying(200);

ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_sub2 character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_sub2_custom character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_sub2_interval INTEGER;
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS death_cause_sub2_timeunit character varying(200);

ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS deceased_pregnant character varying(200);
ALTER TABLE eg_death_statistical_registry_log add column IF NOT EXISTS is_delivery character varying(200);

ALTER TABLE eg_death_statistical_dtls ALTER death_medically_certified TYPE bool USING
(death_medically_certified::int::bool);

ALTER TABLE eg_death_statistical_dtls_log ALTER death_medically_certified TYPE bool USING
(death_medically_certified::int::bool);

ALTER TABLE eg_death_statistical_registry ALTER death_medically_certified TYPE bool USING
(death_medically_certified::int::bool);

ALTER TABLE eg_death_statistical_registry_log ALTER death_medically_certified TYPE bool USING
(death_medically_certified::int::bool);




