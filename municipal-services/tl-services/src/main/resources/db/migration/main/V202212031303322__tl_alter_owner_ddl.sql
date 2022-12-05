ALTER TABLE eg_tl_owner
ADD COLUMN ownername character varying(150),
ADD COLUMN aadharno character varying(20),
ADD COLUMN address character varying(1024),
ADD COLUMN email character varying(50),
ADD COLUMN isactualowner integer,
ADD COLUMN consentagreementplace character varying(150),
ADD COLUMN consentagreementdate bigint,
ADD COLUMN consentagreementenddate bigint;