CREATE TABLE IF NOT EXISTS public.eg_death_document_dtls
(
    id character varying(64),
    tenantid character varying(50),
    document_type character varying(64),
    death_dtls_id character varying(64),
    filestore_id character varying(64),
    filename character varying(64),
    death_ackno character varying(64),
    documentuid character varying(64),
    active boolean,
    created_by character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint
)