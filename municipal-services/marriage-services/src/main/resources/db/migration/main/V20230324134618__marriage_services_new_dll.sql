ALTER TABLE public.eg_marriage_permanent_address_details
ADD COLUMN ot_address1_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address1_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_zipcode character varying(10) COLLATE pg_catalog."default";


ALTER TABLE public.eg_marriage_permanent_address_details_audit
ADD COLUMN ot_address1_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address1_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_zipcode character varying(10) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_present_address_details
ADD COLUMN ot_address1_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address1_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_zipcode character varying(10) COLLATE pg_catalog."default";


ALTER TABLE public.eg_marriage_present_address_details_audit
ADD COLUMN ot_address1_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address1_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_zipcode character varying(10) COLLATE pg_catalog."default";


ALTER TABLE public.eg_register_marriage_permanent_address_details
ADD COLUMN ot_address1_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address1_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_zipcode character varying(10) COLLATE pg_catalog."default";


ALTER TABLE public.eg_register_marriage_permanent_address_details_audit
ADD COLUMN ot_address1_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address1_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_zipcode character varying(10) COLLATE pg_catalog."default";


ALTER TABLE public.eg_register_marriage_present_address_details
ADD COLUMN ot_address1_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address1_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_zipcode character varying(10) COLLATE pg_catalog."default";


ALTER TABLE public.eg_register_marriage_present_address_details_audit
ADD COLUMN ot_address1_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address1_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_address2_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_en character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_state_region_province_ml character varying(2500) COLLATE pg_catalog."default",
ADD COLUMN ot_zipcode character varying(10) COLLATE pg_catalog."default";



ALTER TABLE public.eg_marriage_details
ADD COLUMN DOMCorreflag boolean,
ADD COLUMN placeIdCorrflag boolean,
ADD COLUMN groomNameCorreflag boolean,
ADD COLUMN brideNameCorreflag boolean,
ADD COLUMN grromAgeCorreflag boolean,
ADD COLUMN brideAgeCorreflag boolean,
ADD COLUMN groomDOBCorreflag boolean,
ADD COLUMN brideDOBCorreflag boolean,
ADD COLUMN groomPermanentAddrCorreflag boolean,
ADD COLUMN bridePermanentAddrCorreflag boolean,
ADD COLUMN groomMotherCorreflag boolean,
ADD COLUMN brideMotherCorreflag boolean,
ADD COLUMN groomFatherCorreflag boolean,
ADD COLUMN brideFatherCorreflag boolean,
ADD COLUMN groomGuardianCorreflag boolean,
ADD COLUMN brideGurdianCorreflag boolean;


ALTER TABLE public.eg_marriage_details_audit
ADD COLUMN DOMCorreflag boolean,
ADD COLUMN placeIdCorrflag boolean,
ADD COLUMN groomNameCorreflag boolean,
ADD COLUMN brideNameCorreflag boolean,
ADD COLUMN grromAgeCorreflag boolean,
ADD COLUMN brideAgeCorreflag boolean,
ADD COLUMN groomDOBCorreflag boolean,
ADD COLUMN brideDOBCorreflag boolean,
ADD COLUMN groomPermanentAddrCorreflag boolean,
ADD COLUMN bridePermanentAddrCorreflag boolean,
ADD COLUMN groomMotherCorreflag boolean,
ADD COLUMN brideMotherCorreflag boolean,
ADD COLUMN groomFatherCorreflag boolean,
ADD COLUMN brideFatherCorreflag boolean,
ADD COLUMN groomGuardianCorreflag boolean,
ADD COLUMN brideGurdianCorreflag boolean;



ALTER TABLE public.eg_marriage_details
DROP COLUMN filenumber,
DROP COLUMN file_date,
DROP COLUMN file_status;

--ALTER TABLE public.eg_register_marriage_details
--ADD COLUMN DOMCorreflag boolean,
--ADD COLUMN placeIdCorrflag boolean,
--ADD COLUMN groomNameCorreflag boolean,
--ADD COLUMN brideNameCorreflag boolean,
--ADD COLUMN grromAgeCorreflag boolean,
--ADD COLUMN brideAgeCorreflag boolean,
--ADD COLUMN groomDOBCorreflag boolean,
--ADD COLUMN brideDOBCorreflag boolean,
--ADD COLUMN groomPermanentAddrCorreflag boolean,
--ADD COLUMN bridePermanentAddrCorreflag boolean,
--ADD COLUMN groomMotherCorreflag boolean,
--ADD COLUMN brideMotherCorreflag boolean,
--ADD COLUMN groomFatherCorreflag boolean,
--ADD COLUMN brideFatherCorreflag boolean,
--ADD COLUMN groomGuardianCorreflag boolean,
--ADD COLUMN brideGurdianCorreflag boolean;
--
--ALTER TABLE public.eg_register_marriage_details_audit
--ADD COLUMN DOMCorreflag boolean,
--ADD COLUMN placeIdCorrflag boolean,
--ADD COLUMN groomNameCorreflag boolean,
--ADD COLUMN brideNameCorreflag boolean,
--ADD COLUMN grromAgeCorreflag boolean,
--ADD COLUMN brideAgeCorreflag boolean,
--ADD COLUMN groomDOBCorreflag boolean,
--ADD COLUMN brideDOBCorreflag boolean,
--ADD COLUMN groomPermanentAddrCorreflag boolean,
--ADD COLUMN bridePermanentAddrCorreflag boolean,
--ADD COLUMN groomMotherCorreflag boolean,
--ADD COLUMN brideMotherCorreflag boolean,
--ADD COLUMN groomFatherCorreflag boolean,
--ADD COLUMN brideFatherCorreflag boolean,
--ADD COLUMN groomGuardianCorreflag boolean,
--ADD COLUMN brideGurdianCorreflag boolean;
--
--
--
