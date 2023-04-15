-- Table: public.eg_fm_modulemaster

-- DROP TABLE IF EXISTS public.eg_fm_modulemaster;

CREATE TABLE IF NOT EXISTS public.eg_fm_modulemaster
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

    CONSTRAINT eg_fm_modulemaster_pkey PRIMARY KEY (id)
    );

-- Table: public.eg_fm_majorfunctionmaster

-- DROP TABLE IF EXISTS public.eg_fm_majorfunctionmaster;

CREATE TABLE IF NOT EXISTS public.eg_fm_majorfunctionmaster
(
    id character varying(64) ,
    tenantid character varying(15),
    mfcode character varying(20) ,
    moduleid character varying(20),
    mfnameeng character varying(64) ,
    mfnamemal character varying(64) ,
    createdby character varying(64) ,
    createdtime bigint,
    lastmodifiedby character varying(64) ,
    lastmodifiedtime bigint,
    CONSTRAINT eg_fm_majorfunctionmaster_pkey PRIMARY KEY (id),
    CONSTRAINT eg_fm_majorfunctionmaster_fkey FOREIGN KEY (moduleid)
    REFERENCES public.eg_fm_modulemaster (id)
    );

-- Table: public.eg_fm_subfunctionmaster

-- DROP TABLE IF EXISTS public.eg_fm_subfunctionmaster;

CREATE TABLE IF NOT EXISTS public.eg_fm_subfunctionmaster
(
    id character varying(64) ,
    tenantid character varying(15),
    sfcode character varying(20) ,
    mfid character varying(20),
    sfnameeng character varying(64) ,
    sfnamemal character varying(64) ,
    createdby character varying(64) ,
    createdtime bigint,
    lastmodifiedby character varying(64) ,
    lastmodifiedtime bigint,
    CONSTRAINT eg_fm_subfunctionmaster_pkey PRIMARY KEY (id),
    CONSTRAINT eg_fm_subfunctionmaster_fkey FOREIGN KEY (mfid)
    REFERENCES public.eg_fm_majorfunctionmaster (id)
    );

-- Table: public.eg_fm_servicemaster

-- DROP TABLE IF EXISTS public.eg_fm_servicemaster;

CREATE TABLE IF NOT EXISTS public.eg_fm_servicemaster
(
    id character varying(64) ,
    tenantid character varying(15),
    servicecode character varying(20) ,
    sfid character varying(20),
    servicenameeng character varying(64) ,
    servicenamemal character varying(64) ,
    createdby character varying(64) ,
    createdtime bigint,
    lastmodifiedby character varying(64) ,
    lastmodifiedtime bigint,
    CONSTRAINT eg_fm_servicemaster_pkey PRIMARY KEY (id),
    CONSTRAINT eg_fm_servicemaster_fkey FOREIGN KEY (sfid)
    REFERENCES public.eg_fm_subfunctionmaster (id)
    );