 ALTER TABLE eg_death_address_registry ADD COLUMN IF NOT EXISTS mig_ack_no character varying(64);
 ALTER TABLE eg_death_address_registry_log ADD COLUMN IF NOT EXISTS mig_ack_no character varying(64);
  
  ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS mig_ack_no character varying(64);
  ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS mig_ack_no character varying(64);