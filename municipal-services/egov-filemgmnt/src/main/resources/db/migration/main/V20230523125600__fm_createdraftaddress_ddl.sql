CREATE TABLE IF NOT EXISTS public.eg_fm_draftingaddress(

    id character varying(64) ,
    tenantid character varying(15),
    filecode character varying(20) ,
    draftid character varying(64) ,
    salutation character varying(64) ,
    name character varying(64),
    address character varying(64),
    status character varying(10) ,
    createdby character varying(64) ,
    createdtime bigint,
    lastmodifiedby character varying(64) ,
    lastmodifiedtime bigint,

    CONSTRAINT eg_fm_draftingaddress_log_pkey PRIMARY KEY (id),
    CONSTRAINT eg_fm_draftingaddress_fkey FOREIGN KEY (draftid)
    REFERENCES public.eg_fm_drafting (id)
    )