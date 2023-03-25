ALTER TABLE public.eg_marriage_bride_groom_details
  DROP COLUMN no_of_spouse_living,
  ADD COLUMN no_of_spouse_living bigint;
