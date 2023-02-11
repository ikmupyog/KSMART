CREATE TABLE eg_tl_premiseowner(
    id character varying(64) NOT NULL,
    tenantId character varying(64),
	tradeLicensedetailid character varying(64),
	premiseownername character varying(300),
	housename character varying(200),
	street character varying(150),
	locality character varying(150),
	postoffice character varying(150),
	pincode character varying(10),
	aadhaarNo character varying(20),
	contactno character varying(15)
    active boolean,
    createdBy character varying(64),
    lastModifiedBy character varying(64),
    createdTime bigint,
    lastModifiedTime bigint,

    CONSTRAINT pk_eg_tl_premiseowner PRIMARY KEY (id),
    CONSTRAINT fk_eg_tl_premiseowner FOREIGN KEY (tradeLicensedetailid) REFERENCES eg_tl_tradeLicensedetail (id)
);