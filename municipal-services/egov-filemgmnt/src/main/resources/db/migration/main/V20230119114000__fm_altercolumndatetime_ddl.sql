ALTER TABLE eg_fm_applicantaddress
RENAME COLUMN createddate TO createdtime;

ALTER TABLE eg_fm_applicantaddress
RENAME COLUMN lastmodifieddate TO lastmodifiedtime;

ALTER TABLE eg_fm_applicantdocument
RENAME COLUMN createddate TO createdtime;

ALTER TABLE eg_fm_applicantdocument
RENAME COLUMN lastmodifieddate TO lastmodifiedtime;

ALTER TABLE eg_fm_applicantpersonal_child
RENAME COLUMN createddate TO createdtime;

ALTER TABLE eg_fm_applicantpersonal_child
RENAME COLUMN lastmodifieddate TO lastmodifiedtime;

ALTER TABLE eg_fm_applicantservicedocument
RENAME COLUMN createddate TO createdtime;

ALTER TABLE eg_fm_applicantservicedocument
RENAME COLUMN lastmodifieddate TO lastmodifiedtime;

ALTER TABLE eg_fm_filedetail
RENAME COLUMN createddate TO createdtime;

ALTER TABLE eg_fm_filedetail
RENAME COLUMN lastmodifieddate TO lastmodifiedtime;

