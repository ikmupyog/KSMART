CREATE TABLE IF NOT EXISTS public.eg_fm_drafting_child
(
    id character varying(64) ,
    businessservice character varying(45),
    modulename character varying(64),
    workflowcode character varying(45),
    filecode character varying(45),
    status character varying(45),
    createdby character varying(45),
    createdtime bigint,
    lastmodifiedby character varying(45),
    lastmodifiedtime bigint,
    CONSTRAINT eg_fm_drafting_child_pkey PRIMARY KEY (id)
    )