ALTER TABLE public.eg_marriage_permanent_address_details
ADD COLUMN city_town_village character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_permanent_address_details_audit
ADD COLUMN city_town_village character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_present_address_details
ADD COLUMN city_town_village character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_present_address_details_audit
ADD COLUMN city_town_village character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_permanent_address_details
ADD COLUMN city_town_village character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_permanent_address_details_audit
ADD COLUMN city_town_village character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_present_address_details
ADD COLUMN city_town_village character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_present_address_details_audit
ADD COLUMN city_town_village character varying(1000) COLLATE pg_catalog."default";