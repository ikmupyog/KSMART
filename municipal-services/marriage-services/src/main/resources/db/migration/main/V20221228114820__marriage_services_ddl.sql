-- Table: public.eg_marriage_details

-- DROP TABLE IF EXISTS public.eg_marriage_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    dateofreport bigint,
    dateofmarriage bigint,
    firstname_bride_en character varying(200) COLLATE pg_catalog."default",
    firstname_bride_ml character varying(200) COLLATE pg_catalog."default",
    middlename_bride_en character varying(200) COLLATE pg_catalog."default",
    middlename_bride_ml character varying(200) COLLATE pg_catalog."default",
    lastname_bride_en character varying(200) COLLATE pg_catalog."default",
    lastname_bride_ml character varying(200) COLLATE pg_catalog."default",
    firstname_groom_en character varying(200) COLLATE pg_catalog."default",
    firstname_groom_ml character varying(200) COLLATE pg_catalog."default",
    middlename_groom_en character varying(200) COLLATE pg_catalog."default",
    middlename_groom_ml character varying(200) COLLATE pg_catalog."default",
    lastname_groom_en character varying(200) COLLATE pg_catalog."default",
    lastname_groom_ml character varying(200) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    remarks_en character varying(2500) COLLATE pg_catalog."default",
    remarks_ml character varying(2500) COLLATE pg_catalog."default",
    aadharno character varying(15) COLLATE pg_catalog."default",
    esign_user_code character varying(64) COLLATE pg_catalog."default",
    esign_user_desig_code character varying(64) COLLATE pg_catalog."default",
    applicationtype character varying(64) COLLATE pg_catalog."default" NOT NULL,
    businessservice character varying(64) COLLATE pg_catalog."default" NOT NULL,
    workflowcode character varying(64) COLLATE pg_catalog."default" NOT NULL,
    fm_fileno character varying(64) COLLATE pg_catalog."default",
    file_date bigint,
    file_status character varying(64) COLLATE pg_catalog."default",
    applicationno character varying(64) COLLATE pg_catalog."default",
    registrationno character varying(64) COLLATE pg_catalog."default",
    registration_date bigint,
    action character varying(64) COLLATE pg_catalog."default",
    status character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_marriage_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_details_applicationno_key UNIQUE (applicationno),
    CONSTRAINT eg_marriage_details_fm_fileno_ukey UNIQUE (fm_fileno, tenantid),
    CONSTRAINT eg_marriage_details_registrationno_ukey1 UNIQUE (registrationno, tenantid)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_marriage_details
    OWNER to postgres;
-- Index: idx_eg_birth_details_tenantid

-- DROP INDEX IF EXISTS public.idx_eg_marriage_details_tenantid;

CREATE INDEX IF NOT EXISTS idx_eg_marriage_details_tenantid
    ON public.eg_marriage_details USING btree
    (tenantid COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
