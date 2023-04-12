DROP TABLE IF EXISTS public.eg_fm_arisingfileapplicantdetails;

CREATE TABLE IF NOT EXISTS public.eg_fm_arisingfileapplicantdetails
(
    id character varying(64) ,
    tenantid character varying(64),
    arisingfileid character varying(64),
    filecode character varying(45),
    applicanttype character varying(64),
    firstname character varying(64),
    middlename character varying(64),
    lastname character varying(64),
    mobileno character varying(64),
    whatsappno character varying(64),
    emailid character varying(64),
    wardno character varying(45),
    doorno character varying(64),
    doorsubno character varying(64),
    streetname character varying(64),
    localplace character varying(64),
    mainplace character varying(64),
    city character varying(64),
    pincode character varying(64),
    documenttypeid character varying(64),
    documentno character varying(64),
    documentfilestoreid character varying(64),
    institutionname character varying(64),
    officername character varying(64),
    Designation character varying(64),
    createdby character varying(45),
    createdtime bigint,
    lastmodifiedby character varying(45),
    lastmodifiedtime bigint,
    CONSTRAINT eg_fm_arisingfileapplicantdetails_pkey PRIMARY KEY (id)
    )



