--update table majorfunctionmaster - length of column moduleid

ALTER TABLE IF EXISTS public.eg_fm_majorfunctionmaster
ALTER COLUMN moduleid TYPE varchar(64);

--update table subfunstionmaster - length of column mfid

ALTER TABLE IF EXISTS public.eg_fm_subfunctionmaster
ALTER COLUMN mfid TYPE varchar(64);

--update table servicemaster - length of column mfid

ALTER TABLE IF EXISTS public.eg_fm_servicemaster
ALTER COLUMN sfid TYPE varchar(64);
