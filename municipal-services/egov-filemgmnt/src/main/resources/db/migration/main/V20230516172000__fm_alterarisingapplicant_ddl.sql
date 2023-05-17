ALTER TABLE eg_fm_arisingfileapplicantdetails
ADD COLUMN country character varying(64) ;

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN state character varying(64) ;

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN district character varying(64) ;

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN postoffice character varying(64) ;