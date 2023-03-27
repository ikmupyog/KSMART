CREATE TABLE IF NOT EXISTS eg_tl_correction
(
    id character varying(64),
    tenantid character varying(64),
	tradelicenseid character varying(64),
    tradelicensedetailid character varying(64),
    licensenumber character varying(64),
	correctionappnumber character varying(64),
	correction jsonb,
	history jsonb,
	correctionstatus character varying(64),
    active boolean,
    createdby character varying(64),
	lastmodifiedby character varying(64),
    createdtime bigint,
    lastmodifiedtime bigint,
    CONSTRAINT pk_eg_tl_correction PRIMARY KEY (id)
);