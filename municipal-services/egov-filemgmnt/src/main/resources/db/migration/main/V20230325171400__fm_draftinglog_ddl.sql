CREATE TABLE IF NOT EXISTS public.eg_fm_drafting_log
(
    id character varying(64) ,
    tenantid character varying(64),
    businessservice character varying(45),
    modulename character varying(64),
    filecode character varying(45),
    drafttype character varying(64),
    drafttext character varying(1024),
    assigner character varying(64),
    filestoreid character varying(45),
    status character varying(45),
    createdby character varying(45),
    createdtime bigint,
    lastmodifiedby character varying(45),
    lastmodifiedtime bigint,
    CONSTRAINT eg_fm_drafting_log_pkey PRIMARY KEY (id)
    )