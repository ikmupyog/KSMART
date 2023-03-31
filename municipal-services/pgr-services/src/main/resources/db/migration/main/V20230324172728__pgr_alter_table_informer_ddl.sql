ALTER TABLE public.eg_pgr_informer_v2
ADD COLUMN   createdby character varying(128)  NOT NULL,
ADD COLUMN   createdtime bigint NOT NULL,
ADD COLUMN   lastmodifiedby character varying(128) ,
ADD COLUMN   lastmodifiedtime bigint;
