ALTER TABLE eg_tl_structureplacedetail RENAME COLUMN zonalcode TO partitionno;
ALTER TABLE eg_tl_structureplacedetail ADD COLUMN isresurveyed boolean;
