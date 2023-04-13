
ALTER TABLE eg_fm_arisingfileapplicantdetails
    RENAME COLUMN applicantnameeng TO applicantfnameeng;
ALTER TABLE eg_fm_arisingfileapplicantdetails
    RENAME COLUMN applicantnamemal TO applicantfnamemal;

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN applicantmidname varchar(64);
ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN applicantlastname varchar(64);

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN wardname varchar(64);

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN doornumber varchar(64);

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN doorsubno varchar(64);

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN streetname varchar(64);

ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD COLUMN cityname varchar(64);