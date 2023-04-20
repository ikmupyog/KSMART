ALTER TABLE public.eg_marriage_details
  ADD COLUMN IF NOT EXISTS is_backward boolean;

ALTER TABLE public.eg_marriage_details_audit
  ADD COLUMN IF NOT EXISTS is_backward boolean;

ALTER TABLE public.eg_register_marriage_details
  ADD COLUMN IF NOT EXISTS is_backward boolean,
  ADD COLUMN IF NOT EXISTS certificatenumber character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_details_audit
  ADD COLUMN IF NOT EXISTS is_backward boolean,
  ADD COLUMN IF NOT EXISTS certificatenumber character varying(64) COLLATE pg_catalog."default";
