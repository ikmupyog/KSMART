-- Table: public.eg_fm_arisingfile

-- DROP TABLE IF EXISTS public.eg_fm_arisingfile;

CREATE TABLE IF NOT EXISTS public.eg_fm_arisingfile
(
	id character varying(64) ,
	tenantid character varying(15),
	filenumber character varying(45),
        filecode character varying(45),
	filearisingmode character varying(45),
        filearisingdate bigint,
	financialyear character varying(10),
	workflowcode character varying(45),
	businessservice character varying(45),
	assignee character varying(45),
	action character varying(45),
	filestatus character varying(45),
    createdby character varying(45),
    createdtime bigint,
    lastmodifiedby character varying(45),
    lastmodifiedtime bigint,
    CONSTRAINT eg_fm_arisingfile_pkey PRIMARY KEY (id)
)



