CREATE TABLE IF NOT EXISTS public.eg_pgr_informer_v2
(
    tenantid character varying(256) COLLATE pg_catalog."default" NOT NULL,
    id character varying(256) COLLATE pg_catalog."default" NOT NULL,
    parentid character varying(256) COLLATE pg_catalog."default" NOT NULL,
  
    informername character varying(256) COLLATE pg_catalog."default",
    informeraddress character varying(1024) COLLATE pg_catalog."default",
   
    mobno bigint,
    additionaldetails jsonb,
    CONSTRAINT pk_eg_pgr_informer_v2 PRIMARY KEY (id),
    CONSTRAINT fk_eg_pgr_informer_v2 FOREIGN KEY (parentid)
        REFERENCES public.eg_pgr_service_v2 (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_pgr_informer_v2
    OWNER to postgres;
-- Index: index_eg_pgr_informer_v2_informername

-- DROP INDEX IF EXISTS public.index_eg_pgr_informer_v2_informername;

CREATE INDEX IF NOT EXISTS index_eg_pgr_informer_v2_informername
    ON public.eg_pgr_informer_v2 USING btree
    (informername COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
