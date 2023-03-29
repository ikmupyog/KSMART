-- DROP TABLE IF EXISTS public.eg_fm_enquiry;

CREATE TABLE IF NOT EXISTS public.eg_fm_enquiry
(
    id character varying(64) ,
    tenantid character varying(20) ,
    businessservice character varying(64) ,
    modulecode character varying(20) ,
    filecode character varying(64) ,
    latitude  character varying(10) ,
    longitude character varying(64) ,
    assigner  character varying(64) ,
    status  character varying(64) ,
    imagefilestoreid character varying(15) ,
    createdby character varying(64) ,
    createdtime bigint,
    lastmodifiedby character varying(64) ,
    lastmodifiedtime bigint

);