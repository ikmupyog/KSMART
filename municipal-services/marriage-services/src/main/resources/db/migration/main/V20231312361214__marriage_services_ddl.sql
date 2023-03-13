ALTER TABLE public.eg_marriage_details
ADD COLUMN houseno_and_nameen character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN houseno_and_nameml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN religious_institution character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN public_or_privatePlace character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN public_or_privatePlacenNamePlace_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN public_or_privatePlacenNamePlace_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN religious_institution_other character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN religious_institution_otherName_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN religious_institution_otherName_ml character varying(2500) COLLATE pg_catalog."default";


ALTER TABLE public.eg_marriage_details_audit
ADD COLUMN houseno_and_nameen character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN houseno_and_nameml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN religious_institution character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN public_or_privatePlace character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN public_or_privatePlacenNamePlace_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN public_or_privatePlacenNamePlace_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN religious_institution_other character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN religious_institution_otherName_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN religious_institution_otherName_ml character varying(2500) COLLATE pg_catalog."default";



ALTER TABLE public.eg_marriage_witness_details
ADD COLUMN w2_adharno character varying(15) COLLATE pg_catalog."default",
ADD COLUMN w2_name_en character varying(200) COLLATE pg_catalog."default",
ADD COLUMN w2_name_mal character varying(200) COLLATE pg_catalog."default",
ADD COLUMN w2_age integer,
ADD COLUMN w2_address_en character varying(200) COLLATE pg_catalog."default",
ADD COLUMN w2_address_mal character varying(200) COLLATE pg_catalog."default",
ADD COLUMN w2_mobile character varying(150) COLLATE pg_catalog."default",
ADD COLUMN w2_is_message_received boolean,
ADD COLUMN w2_is_esigned boolean;


ALTER TABLE public.eg_marriage_witness_details_audit
ADD COLUMN w2_adharno character varying(15) COLLATE pg_catalog."default",
ADD COLUMN w2_name_en character varying(200) COLLATE pg_catalog."default",
ADD COLUMN w2_name_mal character varying(200) COLLATE pg_catalog."default",
ADD COLUMN w2_age integer,
ADD COLUMN w2_address_en character varying(200) COLLATE pg_catalog."default",
ADD COLUMN w2_address_mal character varying(200) COLLATE pg_catalog."default",
ADD COLUMN w2_mobile character varying(150) COLLATE pg_catalog."default",
ADD COLUMN w2_is_message_received boolean,
ADD COLUMN w2_is_esigned boolean;
