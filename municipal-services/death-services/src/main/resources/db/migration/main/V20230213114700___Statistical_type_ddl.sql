
ALTER TABLE eg_death_statistical_dtls
ALTER COLUMN death_medically_certified TYPE character varying(50) ;
ALTER TABLE eg_death_statistical_dtls
ALTER COLUMN autopsy_performed TYPE character varying(50);
ALTER TABLE eg_death_statistical_dtls 
ALTER COLUMN autopsy_completed TYPE character varying(50) ;


ALTER TABLE eg_death_statistical_dtls_log
ALTER COLUMN death_medically_certified TYPE character varying(50) ;
ALTER TABLE eg_death_statistical_dtls_log
ALTER COLUMN autopsy_performed TYPE character varying(50);
ALTER TABLE eg_death_statistical_dtls_log 
ALTER COLUMN autopsy_completed TYPE character varying(50) ;


ALTER TABLE eg_death_statistical_registry
ALTER COLUMN death_medically_certified TYPE character varying(50) ;
ALTER TABLE eg_death_statistical_registry
ALTER COLUMN autopsy_performed TYPE character varying(50);
ALTER TABLE eg_death_statistical_registry 
ALTER COLUMN autopsy_completed TYPE character varying(50) ;

ALTER TABLE eg_death_statistical_registry_log
ALTER COLUMN death_medically_certified TYPE character varying(50) ;
ALTER TABLE eg_death_statistical_registry_log
ALTER COLUMN autopsy_performed TYPE character varying(50);
ALTER TABLE eg_death_statistical_registry_log 
ALTER COLUMN autopsy_completed TYPE character varying(50) ;
