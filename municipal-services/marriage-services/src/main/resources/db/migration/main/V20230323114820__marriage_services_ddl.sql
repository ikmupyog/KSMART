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
        placeothers character varying(64) COLLATE pg_catalog."default",
        placeid character varying(1000) COLLATE pg_catalog."default",
        placename_en character varying(1000) COLLATE pg_catalog."default",
        street_name_en character varying(1000) COLLATE pg_catalog."default",
        street_name_ml character varying(1000) COLLATE pg_catalog."default",
        placename_mal character varying(1000) COLLATE pg_catalog."default",
        ward_code character varying(64) COLLATE pg_catalog."default",
        talukid character varying(64) COLLATE pg_catalog."default",
        village_name character varying(64) COLLATE pg_catalog."default",
        marriage_type character varying(64) COLLATE pg_catalog."default",
        oth_marriage_type character varying(200) COLLATE pg_catalog."default",
        landmark character varying(1000) COLLATE pg_catalog."default",
        locality_en character varying(1000) COLLATE pg_catalog."default",
        locality_ml character varying(1000) COLLATE pg_catalog."default",
        othersspecify character varying(1000) COLLATE pg_catalog."default",
        applicationtype character varying(64) COLLATE pg_catalog."default" NOT NULL,
        businessservice character varying(64) COLLATE pg_catalog."default" NOT NULL,
        workflowcode character varying(64) COLLATE pg_catalog."default" NOT NULL,
        fileno character varying(64) COLLATE pg_catalog."default",
        file_date bigint,
        file_status character varying(64) COLLATE pg_catalog."default",
        applicationnumber character varying(64) COLLATE pg_catalog."default",
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
        CONSTRAINT eg_marriage_place_details_fm_fileno_fkey UNIQUE (fileno, tenantid),
        CONSTRAINT eg_marriage_place_details_registrationno_fkey UNIQUE (registrationno, tenantid)
        );


CREATE INDEX IF NOT EXISTS idx_eg_marriage_details_tenantid
    ON public.eg_marriage_details USING btree
    (tenantid COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

   -- Table: public.bride_details

   -- DROP TABLE IF EXISTS public.bride_details;

   CREATE TABLE IF NOT EXISTS public.eg_marriage_bride_details
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
       profession_en character varying(200) COLLATE pg_catalog."default",
       profession_mal character varying(200) COLLATE pg_catalog."default",
       maritalstatusid character varying(64) COLLATE pg_catalog."default",
       is_spouse_living boolean,
       no_of_spouse_living boolean,
       marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
       photo_url character varying(150) COLLATE pg_catalog."default",
        createdtime bigint,
           createdby character varying(64) COLLATE pg_catalog."default",
           lastmodifiedtime bigint,
           lastmodifiedby character varying(64) COLLATE pg_catalog."default",
       CONSTRAINT eg_marriage_bride_details_pkey PRIMARY KEY (id),
       CONSTRAINT eg_marriage_bride_details_fkey FOREIGN KEY (marriageid)
           REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
           ON UPDATE NO ACTION
           ON DELETE NO ACTION
           NOT VALID
   );


-- Table: public.eg_marriage.groom_details

-- DROP TABLE IF EXISTS public.eg_marriage.groom_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_groom_details
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
    profession_en character varying(200) COLLATE pg_catalog."default",
    profession_mal character varying(200) COLLATE pg_catalog."default",
    maritalstatusid character varying(64) COLLATE pg_catalog."default",
    is_spouse_living boolean,
    no_of_spouse_living boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
    photo_url character varying(150) COLLATE pg_catalog."default",
            createdtime bigint,
               createdby character varying(64) COLLATE pg_catalog."default",
               lastmodifiedtime bigint,
               lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_marriage_groom_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_groom_details_fkey FOREIGN KEY (marriageid)
        REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
-- Table: public.marriage_permanent_address_details

-- DROP TABLE IF EXISTS public.marriage_permanent_address_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_permanent_address_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    houseno character varying(200) COLLATE pg_catalog."default",
    housename_no_en character varying(2500) COLLATE pg_catalog."default",
    housename_no_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    doorno integer,
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
    CONSTRAINT eg_marriage_permanent_address_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_permanent_address_details_fkey FOREIGN KEY (marriageid)
        REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);



-- Table: public.marriage_present_address_details

-- DROP TABLE IF EXISTS public.marriage_present_address_details;

CREATE TABLE IF NOT EXISTS public.eg_marriage_present_address_details
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    houseno character varying(200) COLLATE pg_catalog."default",
    housename_no_en character varying(2500) COLLATE pg_catalog."default",
    housename_no_ml character varying(2500) COLLATE pg_catalog."default",
    villageid character varying(64) COLLATE pg_catalog."default",
    village_name character varying(1000) COLLATE pg_catalog."default",
    talukid character varying(64) COLLATE pg_catalog."default",
    taluk_name character varying(1000) COLLATE pg_catalog."default",
    ward_code character varying(64) COLLATE pg_catalog."default",
    doorno integer,
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
    CONSTRAINT eg_marriage_present_address_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_present_address_details_fkey FOREIGN KEY (marriageid)
        REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- Table: public.witness_details

-- DROP TABLE IF EXISTS public.witness_details;

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
    is_message_received boolean,
    is_esigned boolean,
    marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
     createdtime bigint,
                createdby character varying(64) COLLATE pg_catalog."default",
                lastmodifiedtime bigint,
                lastmodifiedby character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT eg_marriage_witness_details_pkey PRIMARY KEY (id),
    CONSTRAINT eg_marriage_witness_details_fkey FOREIGN KEY (marriageid)
        REFERENCES public.eg_marriage_details (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)




