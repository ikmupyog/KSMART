-- ALTER TABLE eg_death_cert_request RENAME TO eg_death_cert_request_old;

-- Table: public.eg_death_cert_request

-- DROP TABLE IF EXISTS public.eg_death_cert_request;

CREATE TABLE IF NOT EXISTS public.eg_death_cert_request
(
    id character varying(64) NOT NULL,
    deathcertificateno character varying(64) NOT NULL,
    createdby character varying(64) NOT NULL,
    createdtime bigint NOT NULL,
    deathdtlid character varying(64) NOT NULL,
    filestoreid character varying(256) ,
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64),
    status character varying(64),
    additionaldetail jsonb,
    embeddedurl character varying(64),
    dateofissue bigint,
    CONSTRAINT eg_death_cert_request_registry_pkey PRIMARY KEY (id),
    CONSTRAINT eg_death_cert_request_registry_fkey FOREIGN KEY (deathdtlid)
        REFERENCES public.eg_death_dtls_registry (id)
);
-- Table: public.eg_death_cert_request_audit

-- DROP TABLE IF EXISTS public.eg_death_cert_request_audit;

CREATE TABLE IF NOT EXISTS public.eg_death_cert_request_audit
(
    id character varying(64) NOT NULL,
    deathcertificateno character varying(64) NOT NULL,
    createdby character varying(64)  NOT NULL,
    createdtime bigint NOT NULL,
    deathdtlid character varying(64),
    filestoreid character varying(256),
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64),
    status character varying(64),
    additionaldetail jsonb,
    embeddedurl character varying(64),
    dateofissue bigint
);
	
	