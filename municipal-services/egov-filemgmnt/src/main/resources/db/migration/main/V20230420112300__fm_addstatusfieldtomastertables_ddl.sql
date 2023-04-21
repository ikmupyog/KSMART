
ALTER TABLE eg_fm_majorfunctionmaster
ADD COLUMN status character varying(64) ;

ALTER TABLE eg_fm_subfunctionmaster
ADD COLUMN status character varying(64) ;

ALTER TABLE eg_fm_servicemaster
ADD COLUMN status character varying(64) ;