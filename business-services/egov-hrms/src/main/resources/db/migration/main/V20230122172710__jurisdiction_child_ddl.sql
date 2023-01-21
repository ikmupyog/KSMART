CREATE TABLE public.eg_hrms_jurisdiction_child
(
uuid character varying(1024) COLLATE pg_catalog."default" NOT NULL,
jurisdictionid character varying(1024) COLLATE pg_catalog."default" NOT NULL,
tenantid character varying(250) COLLATE pg_catalog."default" NOT NULL,
zonecode character varying(50) COLLATE pg_catalog."default" NOT NULL,
wardcode character varying(50) COLLATE pg_catalog."default" NOT NULL,
 createdby character varying(250) COLLATE pg_catalog."default" NOT NULL,
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
