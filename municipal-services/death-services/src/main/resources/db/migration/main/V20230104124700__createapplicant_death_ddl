
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS appl_type character varying(64);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS appl_type character varying(64);


DROP TABLE IF EXISTS public.eg_death_applicant_dtls;
CREATE TABLE IF NOT EXISTS public.eg_death_applicant_dtls
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
	death_dtl_id character varying(64) COLLATE pg_catalog."default",
	tenantid character varying(50) COLLATE pg_catalog."default" NOT NULL,
    applicant_name character varying(64) COLLATE pg_catalog."default",
    applicant_aadhar character varying(64) COLLATE pg_catalog."default",
    applicant_mobile_no character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_death_applicant_dtls_pkey PRIMARY KEY (id),
	    CONSTRAINT fk_eg_death_dtls FOREIGN KEY (death_dtl_id)
        REFERENCES public.eg_death_dtls (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

