CREATE TABLE IF NOT EXISTS eg_institution
(
    id character varying(64),
    institutionid character varying(64),
    tenantid character varying(64),
    institutionname character varying(256),
    institutionnamelocal character varying(500),
    gstnumber character varying(30),
    pannumber character varying(30),
    address character varying(1500),
    email character varying(20),
    contactno character varying(15),
    active boolean,
    createdby character varying(64),
    createdtime bigint,
    lastmodifiedby character varying(64),
    lastmodifiedtime bigint,
    CONSTRAINT pk_eg_institution PRIMARY KEY (id)
);