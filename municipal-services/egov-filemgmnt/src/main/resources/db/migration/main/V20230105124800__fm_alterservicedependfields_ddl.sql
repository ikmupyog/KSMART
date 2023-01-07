

ALTER TABLE eg_fm_applicantpersonal
ADD COLUMN firstnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal
ADD COLUMN lastnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal
ADD COLUMN fatherfirstnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal
ADD COLUMN fatherlastnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal
ADD COLUMN motherfirstnamemal varchar;

ALTER TABLE eg_fm_applicantpersonal
ADD COLUMN motherlastnamemal varchar;

ALTER TABLE eg_fm_applicantaddress
RENAME COLUMN houseno TO buildingno;

ALTER TABLE eg_fm_applicantaddress
ADD COLUMN subno varchar;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN ownername varchar;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN ownernamemal varchar;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN owneraddress varchar;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN owneraddressmal varchar;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN ownermobileno varchar;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN nameofoccupiermal varchar;

ALTER TABLE eg_fm_applicantpersonal_child
RENAME COLUMN durationofresidence TO durationofresidenceinyears;

ALTER TABLE eg_fm_applicantpersonal_child
ADD COLUMN durationofresidenceinmonths varchar;












