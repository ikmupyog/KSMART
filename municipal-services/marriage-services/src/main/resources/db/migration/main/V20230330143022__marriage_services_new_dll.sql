ALTER TABLE public.eg_marriage_details_audit
  DROP COLUMN operation,
  DROP COLUMN stamp;

ALTER TABLE public.eg_marriage_details_audit
DROP COLUMN filenumber,
DROP COLUMN file_date,
DROP COLUMN file_status;

ALTER TABLE public.eg_marriage_bride_groom_details_audit
  DROP COLUMN operation,
  DROP COLUMN stamp;

ALTER TABLE public.eg_marriage_permanent_address_details_audit
  DROP COLUMN operation,
  DROP COLUMN stamp;

ALTER TABLE public.eg_marriage_present_address_details_audit
  DROP COLUMN operation,
  DROP COLUMN stamp;

ALTER TABLE public.eg_marriage_witness_details_audit
  DROP COLUMN operation,
  DROP COLUMN stamp;