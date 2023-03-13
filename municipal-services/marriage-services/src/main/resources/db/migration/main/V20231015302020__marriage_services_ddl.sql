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
            lastmodifiedby character varying(64) COLLATE pg_catalog."default"
    );

-- FUNCTION: public.process_eg_marriage_details_audit()

-- DROP FUNCTION IF EXISTS public.process_eg_marriage_details_audit();

CREATE OR REPLACE FUNCTION public.process_eg_marriage_details_audit()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO eg_marriage_details_audit SELECT 'D', now(), OLD.*;
RETURN OLD;
ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO eg_marriage_details_audit SELECT 'U', now(), OLD.*;
RETURN NEW;
END IF;
RETURN NULL;
END;
$BODY$;
-- Trigger: eg_marriage_details_audit

-- DROP TRIGGER IF EXISTS eg_marriage_details_audit ON public.eg_marriage_details;

CREATE TRIGGER eg_marriage_details_audit
    BEFORE DELETE OR UPDATE
                         ON public.eg_marriage_details
                         FOR EACH ROW
                         EXECUTE FUNCTION public.process_eg_marriage_details_audit();

-- Table: public.eg_marriage_bride_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_bride_details_audit;

CREATE TABLE IF NOT EXISTS public.eg_marriage_bride_details_audit
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
              lastmodifiedby character varying(64) COLLATE pg_catalog."default"
    );

-- FUNCTION: public.process_eg_marriage_bride_details_audit()

-- DROP FUNCTION IF EXISTS public.process_eg_marriage_bride_details_audit();

CREATE OR REPLACE FUNCTION public.process_eg_marriage_bride_details_audit()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO eg_marriage_bride_details_audit SELECT 'D', now(), OLD.*;
RETURN OLD;
ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO eg_marriage_bride_details_audit SELECT 'U', now(), OLD.*;
RETURN NEW;
END IF;
RETURN NULL;
END;
$BODY$;

-- Trigger: eg_marriage_bride_details_audit

-- DROP TRIGGER IF EXISTS eg_marriage_bride_details_audit ON public.eg_marriage_bride_details;

CREATE TRIGGER eg_marriage_bride_details_audit
BEFORE DELETE OR UPDATE ON public.eg_marriage_bride_details
FOR EACH ROW EXECUTE FUNCTION public.process_eg_marriage_bride_details_audit();



-- Table: public.eg_marriage_groom_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_groom_details_audit;

CREATE TABLE IF NOT EXISTS public.eg_marriage_groom_details_audit
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
                  lastmodifiedby character varying(64) COLLATE pg_catalog."default"
);
-- FUNCTION: public.process_eg_marriage_groom_details_audit()

-- DROP FUNCTION IF EXISTS public.process_eg_marriage_groom_details_audit();

CREATE OR REPLACE FUNCTION public.process_eg_marriage_groom_details_audit()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO eg_marriage_groom_details_audit SELECT 'D', now(), OLD.*;
RETURN OLD;
ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO eg_marriage_groom_details_audit SELECT 'U', now(), OLD.*;
RETURN NEW;
END IF;
RETURN NULL;
END;
$BODY$;

-- Trigger: eg_marriage_groom_details

-- DROP TRIGGER IF EXISTS eg_marriage_groom_details_audit ON public.eg_marriage_groom_details;

CREATE TRIGGER eg_marriage_groom_details_audit
BEFORE DELETE OR UPDATE ON public.eg_marriage_groom_details
FOR EACH ROW EXECUTE FUNCTION public.process_eg_marriage_groom_details_audit();


-- Table: public.eg_marriage_permanent_address_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_permanent_address_details_audit;

CREATE TABLE IF NOT EXISTS public.eg_marriage_permanent_address_details_audit
(
        operation character(1) COLLATE pg_catalog."default" NOT NULL,
        stamp timestamp without time zone NOT NULL,
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
           lastmodifiedby character varying(64) COLLATE pg_catalog."default"
);
-- FUNCTION: public.process_eg_marriage_permanent_address_details_audit()

-- DROP FUNCTION IF EXISTS public.process_eg_marriage_permanent_address_details_audit();

CREATE OR REPLACE FUNCTION public.process_eg_marriage_permanent_address_details_audit()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO eg_marriage_permanent_address_details_audit SELECT 'D', now(), OLD.*;
RETURN OLD;
ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO eg_marriage_permanent_address_details_audit SELECT 'U', now(), OLD.*;
RETURN NEW;
END IF;
RETURN NULL;
END;
$BODY$;

-- Trigger: eg_marriage_permanent_address_details_audit

-- DROP TRIGGER IF EXISTS eg_marriage_permanent_address_details_audit ON public.eg_marriage_permanent_address_details;

CREATE TRIGGER eg_marriage_permanent_address_details_audit
BEFORE DELETE OR UPDATE ON public.eg_marriage_permanent_address_details
FOR EACH ROW EXECUTE FUNCTION public.process_eg_marriage_permanent_address_details_audit();


-- Table: public.eg_marriage_present_address_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_present_address_details_audit;

CREATE TABLE IF NOT EXISTS public.eg_marriage_present_address_details_audit
(
    operation character(1) COLLATE pg_catalog."default" NOT NULL,
    stamp timestamp without time zone NOT NULL,
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
                lastmodifiedby character varying(64) COLLATE pg_catalog."default"
);
-- FUNCTION: public.process_eg_marriage_present_address_details_audit()

-- DROP FUNCTION IF EXISTS public.process_eg_marriage_present_address_details_audit();

CREATE OR REPLACE FUNCTION public.process_eg_marriage_present_address_details_audit()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO eg_marriage_present_address_details_audit SELECT 'D', now(), OLD.*;
RETURN OLD;
ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO eg_marriage_present_address_details_audit SELECT 'U', now(), OLD.*;
RETURN NEW;
END IF;
RETURN NULL;
END;
$BODY$;

-- Trigger: eg_marriage_present_address_details_audit

-- DROP TRIGGER IF EXISTS eg_marriage_present_address_details_audit ON public.eg_marriage_present_address_details;

CREATE TRIGGER eg_marriage_present_address_details_audit
BEFORE DELETE OR UPDATE ON public.eg_marriage_present_address_details
FOR EACH ROW EXECUTE FUNCTION public.process_eg_marriage_present_address_details_audit();



-- Table: public.eg_marriage_witness_details_audit

-- DROP TABLE IF EXISTS public.eg_marriage_witness_details_audit;

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
        is_message_received boolean,
        is_esigned boolean,
        marriageid character varying(64) COLLATE pg_catalog."default" NOT NULL,
         createdtime bigint,
                    createdby character varying(64) COLLATE pg_catalog."default",
                    lastmodifiedtime bigint,
                    lastmodifiedby character varying(64) COLLATE pg_catalog."default"
);
-- FUNCTION: public.process_eg_marriage_witness_details_audit()

-- DROP FUNCTION IF EXISTS public.process_eg_marriage_witness_details_audit();

CREATE OR REPLACE FUNCTION public.process_eg_marriage_witness_details_audit()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO eg_birth_mother_information_audit SELECT 'D', now(), OLD.*;
RETURN OLD;
ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO eg_birth_mother_information_audit SELECT 'U', now(), OLD.*;
RETURN NEW;
END IF;
RETURN NULL;
END;
$BODY$;

-- Trigger: eg_marriage_witness_details_audit

-- DROP TRIGGER IF EXISTS eg_marriage_witness_details_audit ON public.eg_marriage_witness_details;

CREATE TRIGGER eg_marriage_witness_details_audit
BEFORE DELETE OR UPDATE ON public.eg_marriage_witness_details
FOR EACH ROW EXECUTE FUNCTION public.process_eg_marriage_witness_details_audit();
