ALTER TABLE public.eg_marriage_details
 ADD COLUMN IF NOT EXISTS amount BIGINT ;
 
 ALTER TABLE public.eg_marriage_details_audit
 ADD COLUMN IF NOT EXISTS amount BIGINT ;