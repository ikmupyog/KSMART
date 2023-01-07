ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN createdby character varying(64) ;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN     createddate bigint ;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN    lastmodifiedby character varying(64);

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN     lastmodifieddate bigint;