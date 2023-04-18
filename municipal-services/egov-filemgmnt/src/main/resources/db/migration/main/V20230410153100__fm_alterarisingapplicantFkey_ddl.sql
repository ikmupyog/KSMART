ALTER TABLE eg_fm_arisingfileapplicantdetails
    ADD FOREIGN KEY (arisingfileid) REFERENCES eg_fm_arisingfile(id);