ALTER TABLE eg_death_dtls add column IF NOT EXISTS deceased_aadhar_unavailable BOOLEAN;
ALTER TABLE eg_death_dtls add column IF NOT EXISTS vehicle_first_halt_ml character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_locality_en character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_locality_ml character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_street_en character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_street_ml character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_country character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_state character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_district character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_city character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_remarks_en character varying(500);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS death_place_remarks_ml character varying(500);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS place_of_burial_en character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS place_of_burial_ml character varying(200);

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS deceased_aadhar_unavailable BOOLEAN;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS vehicle_first_halt_ml character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_locality_en character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_locality_ml character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_street_en character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_street_ml character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_country character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_state character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_district character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_city character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_remarks_en character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS death_place_remarks_ml character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS place_of_burial_en character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS place_of_burial_ml character varying(200);

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS deceased_aadhar_unavailable BOOLEAN;
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS vehicle_first_halt_ml character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_locality_en character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_locality_ml character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_street_en character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_street_ml character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_country character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_state character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_district character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_city character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_remarks_en character varying(500);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS death_place_remarks_ml character varying(500);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS place_of_burial_en character varying(200);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS place_of_burial_ml character varying(200);

ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS deceased_aadhar_unavailable BOOLEAN;
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS vehicle_first_halt_ml character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_locality_en character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_locality_ml character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_street_en character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_street_ml character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_country character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_state character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_district character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_city character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_remarks_en character varying(500);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS death_place_remarks_ml character varying(500);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS place_of_burial_en character varying(200);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS place_of_burial_ml character varying(200);



ALTER TABLE eg_death_address_dtls RENAME COLUMN houename_en  TO housename_en;
ALTER TABLE eg_death_address_dtls RENAME COLUMN houename_ml  TO housename_ml;  
 
ALTER TABLE eg_death_address_dtls_log RENAME COLUMN houename_en  TO housename_en;
ALTER TABLE eg_death_address_dtls_log RENAME COLUMN houename_ml  TO housename_ml;  

ALTER TABLE eg_death_address_registry RENAME COLUMN houename_en  TO housename_en;
ALTER TABLE eg_death_address_registry RENAME COLUMN houename_ml  TO housename_ml;  
 
ALTER TABLE eg_death_address_registry_log RENAME COLUMN houename_en  TO housename_en;
ALTER TABLE eg_death_address_registry_log RENAME COLUMN houename_ml  TO housename_ml;  

ALTER TABLE eg_death_address_dtls add column IF NOT EXISTS lbtype character varying(200);
ALTER TABLE eg_death_address_dtls_log add column IF NOT EXISTS lbtype character varying(200);

ALTER TABLE eg_death_address_dtls add column IF NOT EXISTS postal_code character varying(200);
ALTER TABLE eg_death_address_dtls_log add column IF NOT EXISTS postal_code character varying(200);

ALTER TABLE eg_death_address_registry add column IF NOT EXISTS lbtype character varying(200);
ALTER TABLE eg_death_address_registry_log add column IF NOT EXISTS lbtype character varying(200);

ALTER TABLE eg_death_address_registry add column IF NOT EXISTS postal_code character varying(200);
ALTER TABLE eg_death_address_registry_log add column IF NOT EXISTS postal_code character varying(200);