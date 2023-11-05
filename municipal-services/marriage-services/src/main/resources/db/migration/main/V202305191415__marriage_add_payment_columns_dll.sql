ALTER TABLE public.eg_marriage_details Add COLUMN  if not exists payment_transaction_id character varying(128);

ALTER TABLE public.eg_marriage_details_audit Add COLUMN  if not exists payment_transaction_id character varying(128);

ALTER TABLE public.eg_marriage_details Add COLUMN if not exists payment_success Boolean;

ALTER TABLE public.eg_marriage_details_audit Add COLUMN  if not exists payment_success Boolean;

ALTER TABLE public.eg_marriage_details ALTER COLUMN amount TYPE DECIMAL;

ALTER TABLE public.eg_marriage_details_audit ALTER COLUMN amount TYPE DECIMAL;