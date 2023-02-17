
ALTER TABLE eg_death_address_dtls add column IF NOT EXISTS province_name_en character varying(200);
ALTER TABLE eg_death_address_dtls add column IF NOT EXISTS province_name_ml character varying(200);
ALTER TABLE eg_death_address_dtls add column IF NOT EXISTS city_town_village character varying(200);

ALTER TABLE eg_death_address_dtls_log add column IF NOT EXISTS province_name_en character varying(200);
ALTER TABLE eg_death_address_dtls_log add column IF NOT EXISTS province_name_ml character varying(200);
ALTER TABLE eg_death_address_dtls_log add column IF NOT EXISTS city_town_village character varying(200);

ALTER TABLE eg_death_address_registry add column IF NOT EXISTS province_name_en character varying(200);
ALTER TABLE eg_death_address_registry add column IF NOT EXISTS province_name_ml character varying(200);
ALTER TABLE eg_death_address_registry add column IF NOT EXISTS city_town_village character varying(200);

ALTER TABLE eg_death_address_registry_log add column IF NOT EXISTS province_name_en character varying(200);
ALTER TABLE eg_death_address_registry_log add column IF NOT EXISTS province_name_ml character varying(200);
ALTER TABLE eg_death_address_registry_log add column IF NOT EXISTS city_town_village character varying(200);

