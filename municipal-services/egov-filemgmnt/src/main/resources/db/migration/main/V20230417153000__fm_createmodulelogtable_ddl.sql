CREATE TABLE IF NOT EXISTS public.eg_fm_modulemaster_log
(

    id character varying(64) ,
    tenantid character varying(15),
    modulecode character varying(20) ,
    modulenameeng character varying(64) ,
    modulenamemal character varying(64) ,
    status character varying(10) ,
    createdby character varying(64) ,
    createdtime bigint,
    lastmodifiedby character varying(64) ,
    lastmodifiedtime bigint,

    CONSTRAINT eg_fm_modulemaster_log_pkey PRIMARY KEY (id)
    )