ALTER TABLE IF EXISTS public.eg_marriage_bride_details
RENAME TO eg_marriage_bride_groom_details;

ALTER TABLE IF EXISTS public.eg_marriage_bride_details_audit
RENAME TO eg_marriage_bride_groom_details_audit;

DROP TABLE public.eg_marriage_groom_details;
DROP TABLE public.eg_marriage_groom_details_audit;

ALTER TABLE public.eg_marriage_details
DROP COLUMN public_or_privateplace,
DROP COLUMN public_or_privateplacennameplace_en,
DROP COLUMN public_or_privateplacennameplace_ml,
DROP COLUMN religious_institution_other,
DROP COLUMN religious_institution_othername_en,
DROP COLUMN religious_institution_othername_ml,
DROP COLUMN religious_institution,
DROP COLUMN fileno,
DROP COLUMN file_date,
DROP COLUMN file_status,
DROP COLUMN othersspecify,
DROP COLUMN placeothers;

ALTER TABLE public.eg_marriage_details_audit
DROP COLUMN public_or_privateplace,
DROP COLUMN public_or_privateplacennameplace_en,
DROP COLUMN public_or_privateplacennameplace_ml,
DROP COLUMN religious_institution_other,
DROP COLUMN religious_institution_othername_en,
DROP COLUMN religious_institution_othername_ml,
DROP COLUMN religious_institution,
DROP COLUMN fileno,
DROP COLUMN file_date,
DROP COLUMN file_status,
DROP COLUMN othersspecify,
DROP COLUMN placeothers;

ALTER TABLE public.eg_marriage_bride_groom_details
DROP COLUMN profession_en,
DROP COLUMN profession_mal,
DROP COLUMN is_spouse_living;


ALTER TABLE public.eg_marriage_bride_groom_details_audit
DROP COLUMN profession_en,
DROP COLUMN profession_mal,
DROP COLUMN is_spouse_living;

ALTER TABLE public.eg_marriage_present_address_details
ADD COLUMN same_as_permanent boolean,
ADD COLUMN tenantid character varying(64) COLLATE pg_catalog."default",
DROP COLUMN houseno,
DROP COLUMN doorno;

ALTER TABLE public.eg_marriage_present_address_details_audit
ADD COLUMN same_as_permanent boolean,
ADD COLUMN tenantid character varying(64) COLLATE pg_catalog."default",
DROP COLUMN houseno,
DROP COLUMN doorno;


ALTER TABLE public.eg_marriage_permanent_address_details
ADD COLUMN tenantid character varying(64) COLLATE pg_catalog."default",
DROP COLUMN houseno,
DROP COLUMN doorno;

ALTER TABLE public.eg_marriage_permanent_address_details_audit
ADD COLUMN tenantid character varying(64) COLLATE pg_catalog."default",
DROP COLUMN houseno,
DROP COLUMN doorno;

ALTER TABLE public.eg_marriage_witness_details
ADD COLUMN serial_no bigint,
DROP COLUMN w2_adharno,
DROP COLUMN w2_name_en,
DROP COLUMN w2_name_mal,
DROP COLUMN w2_age,
DROP COLUMN w2_address_en,
DROP COLUMN w2_address_mal,
DROP COLUMN w2_mobile,
DROP COLUMN w2_is_message_received,
DROP COLUMN w2_is_esigned,
DROP COLUMN is_message_received;



ALTER TABLE public.eg_marriage_witness_details_audit
ADD COLUMN serial_no bigint,
DROP COLUMN w2_adharno,
DROP COLUMN w2_name_en,
DROP COLUMN w2_name_mal,
DROP COLUMN w2_age,
DROP COLUMN w2_address_en,
DROP COLUMN w2_address_mal,
DROP COLUMN w2_mobile,
DROP COLUMN w2_is_message_received,
DROP COLUMN w2_is_esigned,
DROP COLUMN is_message_received;


ALTER TABLE public.eg_register_marriage_witness_details
ADD COLUMN serial_no bigint,
DROP COLUMN is_message_received;
