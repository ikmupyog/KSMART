--  DO $$
-- BEGIN
--   IF EXISTS(SELECT * FROM information_schema.columns
--   WHERE table_name='eg_death_dtls' and column_name='deseased_passportno') THEN

 ALTER TABLE eg_death_dtls RENAME COLUMN deseased_passportno  TO deceased_idprooftype;  
 ALTER TABLE eg_death_dtls ADD COLUMN deceased_idproofno character varying(64);
 
 ALTER TABLE eg_death_dtls_log RENAME COLUMN deseased_passportno  TO deceased_idprooftype;  
 ALTER TABLE eg_death_dtls_log ADD COLUMN deceased_idproofno character varying(64);
--  ALTER TABLE eg_death_dtls_log ADD COLUMN appl_type character varying(64);
 
 ALTER TABLE eg_death_dtls_registry RENAME COLUMN deseased_passportno  TO deceased_idprooftype;  
 ALTER TABLE eg_death_dtls_registry ADD COLUMN deceased_idproofno character varying(64);
 
 ALTER TABLE eg_death_dtls_registry_log RENAME COLUMN deseased_passportno  TO deceased_idprooftype;  
 ALTER TABLE eg_death_dtls_registry_log ADD COLUMN deceased_idproofno character varying(64);

--    END IF;
-- END $$;