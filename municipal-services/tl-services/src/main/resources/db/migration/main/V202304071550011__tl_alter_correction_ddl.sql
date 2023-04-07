ALTER TABLE eg_tl_correction ALTER COLUMN correction TYPE text;

ALTER TABLE eg_tl_correction ALTER COLUMN history TYPE text;

ALTER TABLE eg_tl_correction ADD iscurrentrequest BOOLEAN NOT NULL DEFAULT TRUE;