ALTER TABLE public.eg_death_dtls_registry ALTER COLUMN death_place_other_ml TYPE varchar(500);
ALTER TABLE public.eg_death_dtls_registry_log ALTER COLUMN death_place_other_ml TYPE varchar(500);

ALTER TABLE public.eg_death_dtls ALTER COLUMN death_place_other_ml TYPE varchar(500);
ALTER TABLE public.eg_death_dtls_log ALTER COLUMN death_place_other_ml TYPE varchar(500);

ALTER TABLE eg_death_document_dtls add column IF NOT EXISTS rdo_proceedings_no character varying(200);	
ALTER TABLE eg_death_document_dtls add column IF NOT EXISTS nac_registration_no character varying(200);