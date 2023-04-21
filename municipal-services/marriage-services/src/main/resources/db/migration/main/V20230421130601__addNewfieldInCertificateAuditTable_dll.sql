ALTER TABLE public.eg_marriage_certificate ADD COLUMN IF NOT EXISTS count int4;
ALTER TABLE public.eg_marriage_certificate ALTER COLUMN registrationno TYPE varchar(64) USING registrationno::varchar;

