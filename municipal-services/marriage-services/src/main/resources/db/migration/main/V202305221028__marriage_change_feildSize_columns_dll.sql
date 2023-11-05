ALTER TABLE IF EXISTS public.eg_marriage_witness_details ALTER COLUMN address_en TYPE VARCHAR(1000);
ALTER TABLE IF EXISTS public.eg_marriage_witness_details_audit ALTER COLUMN address_en TYPE VARCHAR(1000);
ALTER TABLE IF EXISTS public.eg_register_marriage_witness_details ALTER COLUMN address_en TYPE VARCHAR(1000);
ALTER TABLE IF EXISTS public.eg_register_marriage_witness_details_audit ALTER COLUMN address_en TYPE VARCHAR(1000);
