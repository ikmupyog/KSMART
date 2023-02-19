ALTER TABLE eg_death_address_dtls add column IF NOT EXISTS addr_lb_name character varying(200);
ALTER TABLE eg_death_address_dtls_log add column IF NOT EXISTS addr_lb_name character varying(200);

ALTER TABLE eg_death_address_registry add column IF NOT EXISTS addr_lb_name character varying(200);
ALTER TABLE eg_death_address_registry_log add column IF NOT EXISTS addr_lb_name character varying(200);

ALTER TABLE eg_death_address_dtls add column IF NOT EXISTS addr_sameas_present boolean;
ALTER TABLE eg_death_address_dtls_log add column IF NOT EXISTS addr_sameas_present boolean;

ALTER TABLE eg_death_address_registry add column IF NOT EXISTS addr_sameas_present boolean;
ALTER TABLE eg_death_address_registry_log add column IF NOT EXISTS addr_sameas_present boolean;