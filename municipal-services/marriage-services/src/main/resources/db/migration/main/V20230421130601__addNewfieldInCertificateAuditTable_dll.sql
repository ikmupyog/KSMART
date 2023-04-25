ALTER TABLE IF EXISTS public.eg_marriage_certificate_audit ADD COLUMN IF NOT EXISTS count int4;
ALTER TABLE IF EXISTS  public.eg_marriage_certificate_audit ALTER COLUMN registrationno TYPE varchar(64) USING registrationno::varchar;

