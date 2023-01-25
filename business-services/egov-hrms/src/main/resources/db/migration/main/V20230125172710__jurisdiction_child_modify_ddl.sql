
 DROP TABLE IF EXISTS public.eg_hrms_jurisdiction_child;

CREATE TABLE IF NOT EXISTS public.eg_hrms_jurisdiction_child
(
    uuid character varying(1024) COLLATE pg_catalog."default" NOT NULL,
    jurisdictionid character varying(1024) COLLATE pg_catalog."default",
    tenantid character varying(250) COLLATE pg_catalog."default",
    zonecode character varying(50) COLLATE pg_catalog."default",
    wardcode character varying(50) COLLATE pg_catalog."default",
    createdby character varying(250) COLLATE pg_catalog."default",
    createddate bigint NOT NULL,
    lastmodifiedby character varying(250) COLLATE pg_catalog."default",
    lastmodifieddate bigint,
    isactive boolean,
    CONSTRAINT pk_eghrms_jurisdiction_child PRIMARY KEY (uuid),
    CONSTRAINT fk_eghrms_jurisdiction_id FOREIGN KEY (jurisdictionid)
        REFERENCES public.eg_hrms_jurisdiction (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_hrms_jurisdiction_child
    OWNER to postgres;
