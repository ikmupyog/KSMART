ALTER TABLE eg_fm_applicantpersonal_log
ADD COLUMN applicationdate bigint;

ALTER TABLE eg_fm_applicantpersonal_log
ADD COLUMN firstnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal_log
ADD COLUMN lastnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal_log
ADD COLUMN fatherfirstnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal_log
ADD COLUMN fatherlastnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal_log
ADD COLUMN motherfirstnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal_log
ADD COLUMN motherlastnamemal varchar;

ALTER TABLE eg_fm_applicantaddress_log
RENAME COLUMN houseno TO buildingno;

ALTER TABLE eg_fm_applicantaddress_log
ADD COLUMN subno varchar;

ALTER TABLE eg_fm_applicantaddress_log
ADD COLUMN housenamemal varchar;

ALTER TABLE eg_fm_applicantaddress_log
ADD COLUMN village varchar;

ALTER TABLE eg_fm_applicantaddress_log
ADD COLUMN taluk varchar;

ALTER TABLE eg_fm_applicantaddress_log
ADD COLUMN streetmal varchar;

ALTER TABLE eg_fm_applicantaddress_log
ADD COLUMN localplacemal varchar;

ALTER TABLE eg_fm_applicantaddress_log
ADD COLUMN mainplacemal varchar;

ALTER TABLE eg_fm_filedetail_log
ADD COLUMN businessservice varchar;

ALTER TABLE eg_fm_filedetail_log
ADD COLUMN assignee varchar;

