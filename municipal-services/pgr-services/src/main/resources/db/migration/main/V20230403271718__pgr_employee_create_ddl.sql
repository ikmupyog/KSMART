CREATE TABLE IF NOT EXISTS public.eg_pgr_Employee_v2
(
    tenantid character varying(256) COLLATE pg_catalog."default" NOT NULL,
    id character varying(256) COLLATE pg_catalog."default" NOT NULL,
    parentid character varying(256) COLLATE pg_catalog."default" NOT NULL,
    employeename character varying(256) COLLATE pg_catalog."default",
    emptype character varying(1024) COLLATE pg_catalog."default",
    emprolecode character varying(128) COLLATE pg_catalog."default",
    empuuid character varying(128) COLLATE pg_catalog."default",
	empmob character varying(128) COLLATE pg_catalog."default",
	empemail character varying(128) COLLATE pg_catalog."default",
    createdby character varying(128) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint NOT NULL,
    lastmodifiedby character varying(128) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT pk_eg_pgr_Employee_v2 PRIMARY KEY (id),
    CONSTRAINT fk_eg_pgr_Employee_v2 FOREIGN KEY (parentid)
        REFERENCES public.eg_pgr_service_v2 (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
