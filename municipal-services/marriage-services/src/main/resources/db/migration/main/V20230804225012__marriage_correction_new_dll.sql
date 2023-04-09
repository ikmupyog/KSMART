
ALTER TABLE IF EXISTS public.eg_marriage_document
    ADD COLUMN correction_id character varying(64);

ALTER TABLE IF EXISTS public.eg_marriage_document
    ADD COLUMN correction_field_name character varying(1024);



ALTER TABLE IF EXISTS public.eg_marriage_document_audit
    ADD COLUMN correction_id character varying(64);

ALTER TABLE IF EXISTS public.eg_marriage_document_audit
    ADD COLUMN correction_field_name character varying(1024);






	CREATE TABLE public.eg_marriage_correction
(
    id character varying(64) NOT NULL,
    marriageid character varying(64) NOT NULL,
    correction_field_name character varying(1024) NOT NULL,
    condition_code character varying(1024),
    specific_condition character varying(1024),
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    CONSTRAINT eg_marriage_correction_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.eg_marriage_correction
    OWNER to postgres;



		CREATE TABLE public.eg_marriage_correction_audit
(
    id character varying(64) NOT NULL,
    marriageid character varying(64) NOT NULL,
    correction_field_name character varying(1024) NOT NULL,
    condition_code character varying(1024),
    specific_condition character varying(1024),
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    CONSTRAINT eg_marriage_correction_audit_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.eg_marriage_correction_audit
    OWNER to postgres;




	CREATE TABLE public.eg_marriage_correction_child
(
    id character varying(64) NOT NULL,
    marriageid character varying(64) NOT NULL,
    correctionid character varying(64) NOT NULL,
    correction_field_name character varying(1024) NOT NULL,
	table_name character varying(1024),
	column_name character varying(1024) NOT NULL,
	old_value character varying(2500) NOT NULL,
	new_value character varying(2500) NOT NULL,
	column_	character varying(1024),
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    CONSTRAINT eg_marriage_correction_child_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.eg_marriage_correction_child
    OWNER to postgres;



	CREATE TABLE public.eg_marriage_correction_child_audit
(
    id character varying(64) NOT NULL,
    marriageid character varying(64) NOT NULL,
    correctionid character varying(64) NOT NULL,
    correction_field_name character varying(1024) NOT NULL,
	table_name character varying(1024),
	column_name character varying(1024) NOT NULL,
	old_value character varying(2500) NOT NULL,
	new_value character varying(2500) NOT NULL,
	column_	character varying(1024),
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    CONSTRAINT eg_marriage_correction_child_audit_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.eg_marriage_correction_child_audit
    OWNER to postgres;
