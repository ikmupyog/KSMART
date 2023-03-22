-- Table: public.eg_marriage_details

-- DROP TABLE IF EXISTS public.eg_marriage_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    dateofmarriage bigint,
    dateofreporting bigint,
    districtid character varying(64) COLLATE pg_catalog."default",
    lbtype character varying(64) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default",
    placetype character varying(64) COLLATE pg_catalog."default",
    placeid character varying(1000) COLLATE pg_catalog."default",
    placename_en character varying(1000) COLLATE pg_catalog."default",
    placename_ml character varying(1000) COLLATE pg_catalog."default",
    houseno_and_name_en character varying(2500) COLLATE pg_catalog."default",
    houseno_and_name_ml character varying(2500) COLLATE pg_catalog."default",
    street_name_en character varying(1000) COLLATE pg_catalog."default",
    street_name_ml character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(64) COLLATE pg_catalog."default",
    marriage_type character varying(64) COLLATE pg_catalog."default",
    oth_marriage_type character varying(200) COLLATE pg_catalog."default",
    landmark character varying(1000) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    applicationtype character varying(64) COLLATE pg_catalog."default" NOT NULL,
    businessservice character varying(64) COLLATE pg_catalog."default" NOT NULL,
    workflowcode character varying(64) COLLATE pg_catalog."default" NOT NULL,
    applicationnumber character varying(64) COLLATE pg_catalog."default",
    filenumber character varying(64) COLLATE pg_catalog."default",
    file_date bigint,
    file_status character varying(64) COLLATE pg_catalog."default",
    registrationno character varying(64) COLLATE pg_catalog."default",
    registration_date bigint,
    action character varying(64) COLLATE pg_catalog."default",
    status character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_marriage_place_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_place_details_applicationnumber_fkey UNIQUE (applicationnumber),
    CONSTRAINT eg_marriage_place_details_filenumber_fkey UNIQUE (filenumber),
    CONSTRAINT eg_marriage_place_details_registrationno_fkey UNIQUE (registrationno, applicationnumber)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_marriage_details
    OWNER to postgres;
-- Index: idx_eg_marriage_details_tenantid

-- DROP INDEX IF EXISTS public.idx_eg_marriage_details_tenantid;

CREATE INDEX IF NOT EXISTS idx_eg_marriage_details_tenantid
    ON public.eg_marriage_details USING btree
    (tenantid COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.eg_marriage_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_details_audit;

CREATE TABLE IF NOT EXISTS public.eg_marriage_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    dateofmarriage bigint,
    dateofreporting bigint,
    districtid character varying(64) COLLATE pg_catalog."default",
    lbtype character varying(64) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default",
    placetype character varying(64) COLLATE pg_catalog."default",
    placeid character varying(1000) COLLATE pg_catalog."default",
    placename_en character varying(1000) COLLATE pg_catalog."default",
    placename_ml character varying(1000) COLLATE pg_catalog."default",
    houseno_and_name_en character varying(2500) COLLATE pg_catalog."default",
    houseno_and_name_ml character varying(2500) COLLATE pg_catalog."default",
    street_name_en character varying(1000) COLLATE pg_catalog."default",
    street_name_ml character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(64) COLLATE pg_catalog."default",
    marriage_type character varying(64) COLLATE pg_catalog."default",
    oth_marriage_type character varying(200) COLLATE pg_catalog."default",
    landmark character varying(1000) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    applicationtype character varying(64) COLLATE pg_catalog."default" NOT NULL,
    businessservice character varying(64) COLLATE pg_catalog."default" NOT NULL,
    workflowcode character varying(64) COLLATE pg_catalog."default" NOT NULL,
    applicationnumber character varying(64) COLLATE pg_catalog."default",
    filenumber character varying(64) COLLATE pg_catalog."default",
    file_date bigint,
    file_status character varying(64) COLLATE pg_catalog."default",
    registrationno character varying(64) COLLATE pg_catalog."default",
    registration_date bigint,
    action character varying(64) COLLATE pg_catalog."default",
    status character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default");

-- Table: public.eg_marriage_bride_groom_details

-- DROP TABLE IF EXISTS public.eg_marriage_bride_groom_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_bride_groom_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    residentship character varying(64) COLLATE pg_catalog."default",
    adharno character varying(15) COLLATE pg_catalog."default",
    passportno character varying(1000) COLLATE pg_catalog."default",
    socialsecurityno character varying(64) COLLATE pg_catalog."default",
    firstname_en character varying(200) COLLATE pg_catalog."default",
    firstname_mal character varying(200) COLLATE pg_catalog."default",
    middlename_en character varying(200) COLLATE pg_catalog."default",
    middlename_mal character varying(200) COLLATE pg_catalog."default",
    lastname_en character varying(200) COLLATE pg_catalog."default",
    lastname_mal character varying(200) COLLATE pg_catalog."default",
    mobile character varying(150) COLLATE pg_catalog."default",
    emailid character varying(300) COLLATE pg_catalog."default",
    gender character varying(20) COLLATE pg_catalog."default",
    dateofbirth bigint,
    age integer,
    parent_guardian character varying(64) COLLATE pg_catalog."default",
    fathername_en character varying(200) COLLATE pg_catalog."default",
    fathername_mal character varying(200) COLLATE pg_catalog."default",
    mothername_en character varying(200) COLLATE pg_catalog."default",
    mothername_mal character varying(200) COLLATE pg_catalog."default",
    father_adharno character varying(15) COLLATE pg_catalog."default",
    mother_adharno character varying(15) COLLATE pg_catalog."default",
    guardianname_en character varying(200) COLLATE pg_catalog."default",
    guardianname_mal character varying(200) COLLATE pg_catalog."default",
    guardian_adhar character varying(15) COLLATE pg_catalog."default",
    maritalstatusid character varying(64) COLLATE pg_catalog."default",
    no_of_spouse_living boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom  character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_marriage_bride_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_bride_details_fkey FOREIGN KEY (marriageid)
    REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_marriage_bride_groom_details
    OWNER to postgres;

-- Table: public.eg_marriage_bride_groom_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_bride_groom_details_audit;

CREATE TABLE IF NOT EXISTS public.eg_marriage_bride_groom_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    residentship character varying(64) COLLATE pg_catalog."default",
    adharno character varying(15) COLLATE pg_catalog."default",
    passportno character varying(1000) COLLATE pg_catalog."default",
    socialsecurityno character varying(64) COLLATE pg_catalog."default",
    firstname_en character varying(200) COLLATE pg_catalog."default",
    firstname_mal character varying(200) COLLATE pg_catalog."default",
    middlename_en character varying(200) COLLATE pg_catalog."default",
    middlename_mal character varying(200) COLLATE pg_catalog."default",
    lastname_en character varying(200) COLLATE pg_catalog."default",
    lastname_mal character varying(200) COLLATE pg_catalog."default",
    mobile character varying(150) COLLATE pg_catalog."default",
    emailid character varying(300) COLLATE pg_catalog."default",
    gender character varying(20) COLLATE pg_catalog."default",
    dateofbirth bigint,
    age integer,
    parent_guardian character varying(64) COLLATE pg_catalog."default",
    fathername_en character varying(200) COLLATE pg_catalog."default",
    fathername_mal character varying(200) COLLATE pg_catalog."default",
    mothername_en character varying(200) COLLATE pg_catalog."default",
    mothername_mal character varying(200) COLLATE pg_catalog."default",
    father_adharno character varying(15) COLLATE pg_catalog."default",
    mother_adharno character varying(15) COLLATE pg_catalog."default",
    guardianname_en character varying(200) COLLATE pg_catalog."default",
    guardianname_mal character varying(200) COLLATE pg_catalog."default",
    guardian_adhar character varying(15) COLLATE pg_catalog."default",
    maritalstatusid character varying(64) COLLATE pg_catalog."default",
    no_of_spouse_living boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom  character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default"
    );

-- Table: public.eg_marriage_permanent_address_details

-- DROP TABLE IF EXISTS public.eg_marriage_permanent_address_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_permanent_address_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    housename_no_en character varying(2500) COLLATE pg_catalog."default",
    housename_no_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(2000) COLLATE pg_catalog."default",
    street_name_ml character varying(2000) COLLATE pg_catalog."default",
    districtid character varying(64) COLLATE pg_catalog."default",
    stateid character varying(64) COLLATE pg_catalog."default",
    poid character varying(64) COLLATE pg_catalog."default",
    pinno character varying(10) COLLATE pg_catalog."default",
    countryid character varying(64) COLLATE pg_catalog."default",
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    tenantid character varying(64) COLLATE pg_catalog."default",
    poname_en character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_marriage_permanent_address_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_permanent_address_details_fkey FOREIGN KEY (marriageid)
    REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_marriage_permanent_address_details
    OWNER to postgres;

-- Table: public.eg_marriage_permanent_address_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_permanent_address_details_audit;

CREATE TABLE IF NOT EXISTS public.eg_marriage_permanent_address_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    housename_no_en character varying(2500) COLLATE pg_catalog."default",
    housename_no_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(2000) COLLATE pg_catalog."default",
    street_name_ml character varying(2000) COLLATE pg_catalog."default",
    districtid character varying(64) COLLATE pg_catalog."default",
    stateid character varying(64) COLLATE pg_catalog."default",
    poid character varying(64) COLLATE pg_catalog."default",
    pinno character varying(10) COLLATE pg_catalog."default",
    countryid character varying(64) COLLATE pg_catalog."default",
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    tenantid character varying(64) COLLATE pg_catalog."default",
    poname_en character varying(64) COLLATE pg_catalog."default"
    );

-- Table: public.eg_marriage_present_address_details

-- DROP TABLE IF EXISTS public.eg_marriage_present_address_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_present_address_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    housename_no_en character varying(2500) COLLATE pg_catalog."default",
    housename_no_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(2000) COLLATE pg_catalog."default",
    street_name_ml character varying(2000) COLLATE pg_catalog."default",
    districtid character varying(64) COLLATE pg_catalog."default",
    stateid character varying(64) COLLATE pg_catalog."default",
    poid character varying(64) COLLATE pg_catalog."default",
    pinno character varying(10) COLLATE pg_catalog."default",
    countryid character varying(64) COLLATE pg_catalog."default",
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    same_as_permanent boolean,
    tenantid character varying(64) COLLATE pg_catalog."default",
    poname_en character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_marriage_present_address_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_present_address_details_fkey FOREIGN KEY (marriageid)
    REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_marriage_present_address_details
    OWNER to postgres;

-- Table: public.eg_marriage_present_address_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_present_address_details_audit;

CREATE TABLE IF NOT EXISTS public.eg_marriage_present_address_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    housename_no_en character varying(2500) COLLATE pg_catalog."default",
    housename_no_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(2000) COLLATE pg_catalog."default",
    street_name_ml character varying(2000) COLLATE pg_catalog."default",
    districtid character varying(64) COLLATE pg_catalog."default",
    stateid character varying(64) COLLATE pg_catalog."default",
    poid character varying(64) COLLATE pg_catalog."default",
    pinno character varying(10) COLLATE pg_catalog."default",
    countryid character varying(64) COLLATE pg_catalog."default",
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    same_as_permanent boolean,
    tenantid character varying(64) COLLATE pg_catalog."default",
    poname_en character varying(64) COLLATE pg_catalog."default"
    );

-- Table: public.eg_marriage_witness_details

-- DROP TABLE IF EXISTS public.eg_marriage_witness_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_witness_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    adharno character varying(15) COLLATE pg_catalog."default",
    name_en character varying(200) COLLATE pg_catalog."default",
    name_mal character varying(200) COLLATE pg_catalog."default",
    age integer,
    address_en character varying(200) COLLATE pg_catalog."default",
    address_mal character varying(200) COLLATE pg_catalog."default",
    mobile character varying(150) COLLATE pg_catalog."default",
    is_esigned boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    serial_no bigint,
    CONSTRAINT eg_marriage_witness_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_witness_details_fkey FOREIGN KEY (marriageid)
    REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_marriage_witness_details
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_marriage_witness_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    adharno character varying(15) COLLATE pg_catalog."default",
    name_en character varying(200) COLLATE pg_catalog."default",
    name_mal character varying(200) COLLATE pg_catalog."default",
    age integer,
    address_en character varying(200) COLLATE pg_catalog."default",
    address_mal character varying(200) COLLATE pg_catalog."default",
    mobile character varying(150) COLLATE pg_catalog."default",
    is_esigned boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    serial_no bigint
    );
-- Table: public.eg_register_marriage_document

-- DROP TABLE IF EXISTS public.eg_register_marriage_document;

CREATE TABLE IF NOT EXISTS public.eg_marriage_document
(
    id character varying(128) COLLATE pg_catalog."default",
    tenantid character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_description character varying(140) COLLATE pg_catalog."default",
    filestoreid character varying(1024) COLLATE pg_catalog."default",
    document_link character varying(1024) COLLATE pg_catalog."default",
    file_type character varying(20) COLLATE pg_catalog."default",
    file_size bigint,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    active boolean NOT NULL,
    createdby character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT eg_marriage_document_document_fkey PRIMARY KEY (tenantid, document_type, document_name, marriageid, bride_groom, active),
    CONSTRAINT eg_marriage_document_pkey UNIQUE (id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_marriage_document
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_marriage_document_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(128) COLLATE pg_catalog."default",
    tenantid character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_description character varying(140) COLLATE pg_catalog."default",
    filestoreid character varying(1024) COLLATE pg_catalog."default",
    document_link character varying(1024) COLLATE pg_catalog."default",
    file_type character varying(20) COLLATE pg_catalog."default",
    file_size bigint,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    active boolean NOT NULL,
    createdby character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint);

-- Table: public.eg_register_marriage_details

-- DROP TABLE IF EXISTS public.eg_register_marriage_details;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    dateofmarriage bigint,
    dateofreporting bigint,
    districtid character varying(64) COLLATE pg_catalog."default",
    lbtype character varying(64) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default",
    placetype character varying(64) COLLATE pg_catalog."default",
    placeid character varying(64) COLLATE pg_catalog."default",
    placename_en character varying(1000) COLLATE pg_catalog."default",
    placename_ml character varying(1000) COLLATE pg_catalog."default",
    housenameno_en character varying(1000) COLLATE pg_catalog."default",
    housenameno_ml character varying(1000) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(1000) COLLATE pg_catalog."default",
    street_name_ml character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(64) COLLATE pg_catalog."default",
    marriage_type character varying(64) COLLATE pg_catalog."default",
    oth_marriage_type character varying(200) COLLATE pg_catalog."default",
    landmark character varying(1000) COLLATE pg_catalog."default",
    registrationno character varying(64) COLLATE pg_catalog."default",
    registration_date bigint,
    registrtion_status character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    ack_no character varying(64) COLLATE pg_catalog."default",
    is_migrated boolean,
    migrated_date bigint,
    CONSTRAINT eg_register_marriage_place_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_register_marriage_place_details_ack_no_fkey UNIQUE (ack_no, tenantid)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_register_marriage_details
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    dateofmarriage bigint,
    dateofreporting bigint,
    districtid character varying(64) COLLATE pg_catalog."default",
    lbtype character varying(64) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default",
    placetype character varying(64) COLLATE pg_catalog."default",
    placeid character varying(64) COLLATE pg_catalog."default",
    placename_en character varying(1000) COLLATE pg_catalog."default",
    placename_ml character varying(1000) COLLATE pg_catalog."default",
    housenameno_en character varying(1000) COLLATE pg_catalog."default",
    housenameno_ml character varying(1000) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(1000) COLLATE pg_catalog."default",
    street_name_ml character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(64) COLLATE pg_catalog."default",
    marriage_type character varying(64) COLLATE pg_catalog."default",
    oth_marriage_type character varying(200) COLLATE pg_catalog."default",
    landmark character varying(1000) COLLATE pg_catalog."default",
    registrationno character varying(64) COLLATE pg_catalog."default",
    registration_date bigint,
    registrtion_status character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    ack_no character varying(64) COLLATE pg_catalog."default",
    is_migrated boolean,
    migrated_date bigint);
-- Index: idx_eg_register_marriage_details_tenantid

-- DROP INDEX IF EXISTS public.idx_eg_register_marriage_details_tenantid;

CREATE INDEX IF NOT EXISTS idx_eg_register_marriage_details_tenantid
    ON public.eg_register_marriage_details USING btree
    (tenantid COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.eg_register_marriage_bride_groom_details

-- DROP TABLE IF EXISTS public.eg_register_marriage_bride_groom_details;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_bride_groom_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    residentship character varying(64) COLLATE pg_catalog."default",
    adharno character varying(15) COLLATE pg_catalog."default",
    passportno character varying(1000) COLLATE pg_catalog."default",
    socialsecurityno character varying(64) COLLATE pg_catalog."default",
    firstname_en character varying(200) COLLATE pg_catalog."default",
    middlename_en character varying(200) COLLATE pg_catalog."default",
    lastname_en character varying(200) COLLATE pg_catalog."default",
    firstname_ml character varying(200) COLLATE pg_catalog."default",
    middlename_ml character varying(200) COLLATE pg_catalog."default",
    lastname_ml character varying(200) COLLATE pg_catalog."default",
    mobile character varying(150) COLLATE pg_catalog."default",
    emailid character varying(300) COLLATE pg_catalog."default",
    gender character varying(20) COLLATE pg_catalog."default",
    dateofbirth bigint,
    age integer,
    parent_guardian character varying(64) COLLATE pg_catalog."default",
    fathername_en character varying(200) COLLATE pg_catalog."default",
    mothername_en character varying(200) COLLATE pg_catalog."default",
    fathername_ml character varying(200) COLLATE pg_catalog."default",
    mothername_ml character varying(200) COLLATE pg_catalog."default",
    father_adharno character varying(15) COLLATE pg_catalog."default",
    mother_adharno character varying(15) COLLATE pg_catalog."default",
    guardianname_en character varying(200) COLLATE pg_catalog."default",
    guardianname_ml character varying(200) COLLATE pg_catalog."default",
    guardian_adhar character varying(15) COLLATE pg_catalog."default",
    maritalstatusid character varying(64) COLLATE pg_catalog."default",
    no_of_spouse_living boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    mig_chvackno character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_register_marriage_bride_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_register_marriage_bride_details_fkey FOREIGN KEY (marriageid)
    REFERENCES public.eg_register_marriage_details (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_register_marriage_bride_groom_details
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_bride_groom_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    residentship character varying(64) COLLATE pg_catalog."default",
    adharno character varying(15) COLLATE pg_catalog."default",
    passportno character varying(1000) COLLATE pg_catalog."default",
    socialsecurityno character varying(64) COLLATE pg_catalog."default",
    firstname_en character varying(200) COLLATE pg_catalog."default",
    middlename_en character varying(200) COLLATE pg_catalog."default",
    lastname_en character varying(200) COLLATE pg_catalog."default",
    firstname_ml character varying(200) COLLATE pg_catalog."default",
    middlename_ml character varying(200) COLLATE pg_catalog."default",
    lastname_ml character varying(200) COLLATE pg_catalog."default",
    mobile character varying(150) COLLATE pg_catalog."default",
    emailid character varying(300) COLLATE pg_catalog."default",
    gender character varying(20) COLLATE pg_catalog."default",
    dateofbirth bigint,
    age integer,
    parent_guardian character varying(64) COLLATE pg_catalog."default",
    fathername_en character varying(200) COLLATE pg_catalog."default",
    mothername_en character varying(200) COLLATE pg_catalog."default",
    fathername_ml character varying(200) COLLATE pg_catalog."default",
    mothername_ml character varying(200) COLLATE pg_catalog."default",
    father_adharno character varying(15) COLLATE pg_catalog."default",
    mother_adharno character varying(15) COLLATE pg_catalog."default",
    guardianname_en character varying(200) COLLATE pg_catalog."default",
    guardianname_ml character varying(200) COLLATE pg_catalog."default",
    guardian_adhar character varying(15) COLLATE pg_catalog."default",
    maritalstatusid character varying(64) COLLATE pg_catalog."default",
    no_of_spouse_living boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    mig_chvackno character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default"
    );


-- Table: public.eg_register_marriage_permanent_address_details

-- DROP TABLE IF EXISTS public.eg_register_marriage_permanent_address_details;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_permanent_address_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    housename_en character varying(2500) COLLATE pg_catalog."default",
    housename_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(2000) COLLATE pg_catalog."default",
    street_name_ml character varying(2000) COLLATE pg_catalog."default",
    districtid character varying(64) COLLATE pg_catalog."default",
    stateid character varying(64) COLLATE pg_catalog."default",
    poid character varying(64) COLLATE pg_catalog."default",
    poname_en character varying(64) COLLATE pg_catalog."default",
    poname_ml character varying(64) COLLATE pg_catalog."default",
    pinno character varying(10) COLLATE pg_catalog."default",
    countryid character varying(64) COLLATE pg_catalog."default",
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    mig_chvackno character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_register_marriage_permanent_address_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_register_marriage_permanent_address_details_fkey FOREIGN KEY (marriageid)
    REFERENCES public.eg_register_marriage_details (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_register_marriage_permanent_address_details
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_permanent_address_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    housename_en character varying(2500) COLLATE pg_catalog."default",
    housename_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(2000) COLLATE pg_catalog."default",
    street_name_ml character varying(2000) COLLATE pg_catalog."default",
    districtid character varying(64) COLLATE pg_catalog."default",
    stateid character varying(64) COLLATE pg_catalog."default",
    poid character varying(64) COLLATE pg_catalog."default",
    poname_en character varying(64) COLLATE pg_catalog."default",
    poname_ml character varying(64) COLLATE pg_catalog."default",
    pinno character varying(10) COLLATE pg_catalog."default",
    countryid character varying(64) COLLATE pg_catalog."default",
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    mig_chvackno character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default"
    );


-- Table: public.eg_register_marriage_present_address_details

-- DROP TABLE IF EXISTS public.eg_register_marriage_present_address_details;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_present_address_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    housename_en character varying(2500) COLLATE pg_catalog."default",
    housename_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(2000) COLLATE pg_catalog."default",
    street_name_ml character varying(2000) COLLATE pg_catalog."default",
    districtid character varying(64) COLLATE pg_catalog."default",
    stateid character varying(64) COLLATE pg_catalog."default",
    poid character varying(64) COLLATE pg_catalog."default",
    poname_en character varying(64) COLLATE pg_catalog."default",
    poname_ml character varying(64) COLLATE pg_catalog."default",
    pinno character varying(10) COLLATE pg_catalog."default",
    countryid character varying(64) COLLATE pg_catalog."default",
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    mig_chvackno character varying(64) COLLATE pg_catalog."default",
    same_as_permanent boolean,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_register_marriage_present_address_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_register_marriage_present_address_details_fkey FOREIGN KEY (marriageid)
    REFERENCES public.eg_register_marriage_details (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_register_marriage_present_address_details
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_present_address_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    housename_en character varying(2500) COLLATE pg_catalog."default",
    housename_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    tenantid character varying(64) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    locality_en character varying(1000) COLLATE pg_catalog."default",
    locality_ml character varying(1000) COLLATE pg_catalog."default",
    street_name_en character varying(2000) COLLATE pg_catalog."default",
    street_name_ml character varying(2000) COLLATE pg_catalog."default",
    districtid character varying(64) COLLATE pg_catalog."default",
    stateid character varying(64) COLLATE pg_catalog."default",
    poid character varying(64) COLLATE pg_catalog."default",
    poname_en character varying(64) COLLATE pg_catalog."default",
    poname_ml character varying(64) COLLATE pg_catalog."default",
    pinno character varying(10) COLLATE pg_catalog."default",
    countryid character varying(64) COLLATE pg_catalog."default",
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    mig_chvackno character varying(64) COLLATE pg_catalog."default",
    same_as_permanent boolean,
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default"
    );

-- Table: public.eg_register_marriage_witness_details

-- DROP TABLE IF EXISTS public.eg_register_marriage_witness_details;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_witness_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    adharno character varying(15) COLLATE pg_catalog."default",
    name_en character varying(200) COLLATE pg_catalog."default",
    name_mal character varying(200) COLLATE pg_catalog."default",
    age integer,
    address_en character varying(200) COLLATE pg_catalog."default",
    address_mal character varying(200) COLLATE pg_catalog."default",
    mobile character varying(150) COLLATE pg_catalog."default",
    is_esigned boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    mig_chvackno character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    serial_no bigint,
    CONSTRAINT eg_register_marriage_witness_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_register_marriage_witness_details_fkey FOREIGN KEY (marriageid)
    REFERENCES public.eg_register_marriage_details (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_register_marriage_witness_details
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_witness_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    adharno character varying(15) COLLATE pg_catalog."default",
    name_en character varying(200) COLLATE pg_catalog."default",
    name_mal character varying(200) COLLATE pg_catalog."default",
    age integer,
    address_en character varying(200) COLLATE pg_catalog."default",
    address_mal character varying(200) COLLATE pg_catalog."default",
    mobile character varying(150) COLLATE pg_catalog."default",
    is_esigned boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    mig_chvackno character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    serial_no bigint
    );


-- Table: public.eg_register_marriage_document

-- DROP TABLE IF EXISTS public.eg_register_marriage_document;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_document
(
    id character varying(128) COLLATE pg_catalog."default",
    tenantid character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_description character varying(140) COLLATE pg_catalog."default",
    filestoreid character varying(1024) COLLATE pg_catalog."default",
    document_link character varying(1024) COLLATE pg_catalog."default",
    file_type character varying(20) COLLATE pg_catalog."default",
    file_size bigint,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    active boolean NOT NULL,
    createdby character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint,
    CONSTRAINT eg_register_marriage_document_fkey PRIMARY KEY (tenantid, document_type, document_name, marriageid, bride_groom, active),
    CONSTRAINT eg_register_marriage_document_pkey UNIQUE (id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_register_marriage_document
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_register_marriage_document_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(128) COLLATE pg_catalog."default",
    tenantid character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    document_description character varying(140) COLLATE pg_catalog."default",
    filestoreid character varying(1024) COLLATE pg_catalog."default",
    document_link character varying(1024) COLLATE pg_catalog."default",
    file_type character varying(20) COLLATE pg_catalog."default",
    file_size bigint,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL,
    active boolean NOT NULL,
    createdby character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedtime bigint
    );

-- Table: public.eg_marriage_certificate

-- DROP TABLE IF EXISTS public.eg_marriage_certificate;

CREATE TABLE IF NOT EXISTS public.eg_marriage_certificate
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    registrationno character varying(25) COLLATE pg_catalog."default",
    registrydetailsid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    filestoreid character varying(256) COLLATE pg_catalog."default",
    status character varying(25) COLLATE pg_catalog."default",
    additionaldetail jsonb,
    embeddedurl character varying(64) COLLATE pg_catalog."default",
    dateofissue bigint,
    tenantid character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_marriage_certificate_request_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_certificate_request_fkey FOREIGN KEY (registrydetailsid)
    REFERENCES public.eg_register_marriage_details (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.eg_marriage_certificate
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.eg_marriage_certificate_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    registrationno character varying(25) COLLATE pg_catalog."default",
    registrydetailsid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    filestoreid character varying(256) COLLATE pg_catalog."default",
    status character varying(25) COLLATE pg_catalog."default",
    additionaldetail jsonb,
    embeddedurl character varying(64) COLLATE pg_catalog."default",
    dateofissue bigint,
    tenantid character varying(64) COLLATE pg_catalog."default",
    createdtime bigint,
    lastmodifiedtime bigint,
    createdby character varying(64) COLLATE pg_catalog."default",
    lastmodifiedby character varying(64) COLLATE pg_catalog."default"
    );
