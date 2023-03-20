-- Table: public.school_master_login

-- DROP TABLE IF EXISTS public.school_master_login;

CREATE TABLE IF NOT EXISTS public.m_schoolmaster
(
    schoolid SERIAL NOT NULL,
    school_code integer UNIQUE,
    school_name character varying(100) COLLATE pg_catalog."default",
    district_id integer,
    revenue_district_name character varying(50) COLLATE pg_catalog."default",
    edu_district_name character varying(50) COLLATE pg_catalog."default",
    sub_district_name character varying(50) COLLATE pg_catalog."default",
    level_type_id integer,
    level_type character varying(50) COLLATE pg_catalog."default",
    type_name_id integer,
    type_name character varying(50) COLLATE pg_catalog."default",
    institution_type_id integer,
    institution_type_name character varying(50) COLLATE pg_catalog."default",
    pincode numeric,
    school_phone character varying(50) COLLATE pg_catalog."default",
    school_address character varying(100) COLLATE pg_catalog."default",
    school_email character varying(50) COLLATE pg_catalog."default",
    headmaster_name character varying(50) COLLATE pg_catalog."default",
    headmaster_phone character varying(50) COLLATE pg_catalog."default",
    status_id integer,
    tny_status integer,
    CONSTRAINT institution_registration_pkey PRIMARY KEY (schoolid),
    CONSTRAINT school_master_login_school_code_key UNIQUE (school_code),
    CONSTRAINT school_master_login_schoolid_key UNIQUE (schoolid)
)