ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_designation character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_designation character varying(500);

ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_institution_name character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_institution_name character varying(500);

ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_iscaretaker boolean;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_iscaretaker boolean;

ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_isguardian boolean;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_isguardian boolean;

ALTER TABLE eg_death_dtls add column IF NOT EXISTS ip_op_list character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS ip_op_list character varying(200);

ALTER TABLE eg_death_dtls add column IF NOT EXISTS ip_op_no character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS ip_op_no character varying(200);

ALTER TABLE eg_death_dtls add column IF NOT EXISTS reg_no_hospital character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS reg_no_hospital character varying(200);

ALTER TABLE eg_death_dtls add column IF NOT EXISTS reg_no_institution character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS reg_no_institution character varying(200);

ALTER TABLE eg_death_dtls add column IF NOT EXISTS admission_no_institution character varying(200);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS admission_no_institution character varying(200);


