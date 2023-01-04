 
 ALTER TABLE eg_death_dtls RENAME COLUMN deseased_passportno  TO deseased_idprooftype;  
 ALTER TABLE eg_death_dtls ADD COLUMN deseased_idproofno character varying(64);
 
 ALTER TABLE eg_death_dtls_log RENAME COLUMN deseased_passportno  TO deseased_idprooftype;  
 ALTER TABLE eg_death_dtls_log ADD COLUMN deseased_idproofno character varying(64);
--  ALTER TABLE eg_death_dtls_log ADD COLUMN appl_type character varying(64);
 
 ALTER TABLE eg_death_dtls_registry RENAME COLUMN deseased_passportno  TO deseased_idprooftype;  
 ALTER TABLE eg_death_dtls_registry ADD COLUMN deseased_idproofno character varying(64);
 
 ALTER TABLE eg_death_dtls_registry_log RENAME COLUMN deseased_passportno  TO deseased_idprooftype;  
 ALTER TABLE eg_death_dtls_registry_log ADD COLUMN deseased_idproofno character varying(64);