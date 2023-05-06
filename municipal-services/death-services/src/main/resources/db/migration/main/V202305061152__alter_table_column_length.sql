ALTER TABLE public.eg_death_dtls_registry ALTER COLUMN death_place_other_ml TYPE varchar(500);
ALTER TABLE public.eg_death_dtls_registry_log ALTER COLUMN death_place_other_ml TYPE varchar(500);

ALTER TABLE public.eg_death_dtls ALTER COLUMN death_place_other_ml TYPE varchar(500);
ALTER TABLE public.eg_death_dtls_log ALTER COLUMN death_place_other_ml TYPE varchar(500);