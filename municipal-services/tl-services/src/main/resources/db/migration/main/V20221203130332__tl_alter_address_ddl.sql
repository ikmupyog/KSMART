ALTER TABLE eg_tl_address
ADD COLUMN zonalid numeric,
ADD COLUMN wardid numeric,
ADD COLUMN wardno integer,
ADD COLUMN circledivisionid numeric,
ADD COLUMN contactno character varying(50),
ADD COLUMN email character varying(64);