CREATE TABLE IF NOT EXISTS public.eg_death_correction
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    death_dtl_id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    correction_field_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    condition_code character varying(128) COLLATE pg_catalog."default" NOT NULL,
    specific_condition_code character varying(200) COLLATE pg_catalog."default" NOT NULL,
    createdby character varying(45) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(45) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT eg_death_correction_pkey PRIMARY KEY (death_dtl_id,correction_field_name),
    CONSTRAINT eg_death_correction_key UNIQUE (id)
    );

CREATE TABLE IF NOT EXISTS public.eg_death_correction_child
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    death_dtl_id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    correction_field_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    register_table_name character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    register_column_name character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    new_value character varying(2000) COLLATE pg_catalog."default" NOT NULL,
    old_value character varying(2000) COLLATE pg_catalog."default",
    correction_id character varying(64) COLLATE pg_catalog."default"  NOT NULL,
    local_column character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdby character varying(45) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(45) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT eg_death_correction_child_pkey PRIMARY KEY (death_dtl_id,correction_field_name,register_column_name),
    CONSTRAINT eg_death_correction_child_key UNIQUE (id),
    CONSTRAINT eg_death_correction_child_fkey FOREIGN KEY (correction_id)
    REFERENCES public.eg_death_correction (id) MATCH SIMPLE
    );
CREATE TABLE IF NOT EXISTS public.eg_death_correction_document
(
    id character varying(128) COLLATE pg_catalog."default",
    death_dtl_id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    correction_field_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    filestoreid character varying(1024) COLLATE pg_catalog."default",
    active boolean NOT NULL,
    correction_id character varying(64) COLLATE pg_catalog."default"  NOT NULL,
    createdby character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT eg_death_correction_document_pkey PRIMARY KEY (death_dtl_id, correction_field_name,document_type, active),
    CONSTRAINT eg_death_correction_document_key UNIQUE (id),
    CONSTRAINT eg_death_correction_document_fkey FOREIGN KEY (correction_id)
    REFERENCES public.eg_death_correction (id) MATCH SIMPLE
    );

CREATE TABLE IF NOT EXISTS public.eg_register_death_correction
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    death_dtl_id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    correction_field_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    condition_code character varying(128) COLLATE pg_catalog."default" NOT NULL,
    specific_condition_code character varying(200) COLLATE pg_catalog."default" NOT NULL,
    createdby character varying(45) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(45) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT eg_register_death_correction_pkey PRIMARY KEY (death_dtl_id,correction_field_name),
    CONSTRAINT eg_register_death_correction_key UNIQUE (id)

    );
CREATE TABLE IF NOT EXISTS public.eg_register_death_correction_child
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    death_dtl_id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    correction_field_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    register_table_name character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    register_column_name character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    new_value character varying(2000) COLLATE pg_catalog."default" NOT NULL,
    old_value character varying(2000) COLLATE pg_catalog."default" NOT NULL,
    correction_id character varying(64) COLLATE pg_catalog."default"  NOT NULL,
    local_column character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdby character varying(45) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(45) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT eg_register_death_correction_child_pkey PRIMARY KEY (death_dtl_id,correction_field_name,register_column_name),
    CONSTRAINT eg_register_death_correction_child_key UNIQUE (id),
    CONSTRAINT eg_register_death_correction_child_fkey FOREIGN KEY (correction_id)
    REFERENCES public.eg_register_death_correction (id) MATCH SIMPLE
    );
CREATE TABLE IF NOT EXISTS public.eg_register_death_correction_document
(
    id character varying(128) COLLATE pg_catalog."default",
    death_dtl_id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    correction_field_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    filestoreid character varying(1024) COLLATE pg_catalog."default",
    active boolean NOT NULL,
    correction_id character varying(64) COLLATE pg_catalog."default"  NOT NULL,
    createdby character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT eg_register_death_correction_document_pkey PRIMARY KEY (death_dtl_id, correction_field_name,document_type,active),
    CONSTRAINT eg_register_death_correction_document_key UNIQUE (id),
    CONSTRAINT eg_register_death_correction_document_fkey FOREIGN KEY (correction_id)
    REFERENCES public.eg_register_death_correction (id) MATCH SIMPLE
    );