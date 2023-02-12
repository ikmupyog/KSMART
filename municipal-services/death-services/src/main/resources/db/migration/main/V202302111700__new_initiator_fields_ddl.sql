	
ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_name character varying(200);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_aadhar_submitted boolean;
ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_aadhar_no character varying(64) ;
ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_mobile_no BIGINT;

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_name character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_aadhar_submitted boolean;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_aadhar_no character varying(64) ;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_mobile_no BIGINT;