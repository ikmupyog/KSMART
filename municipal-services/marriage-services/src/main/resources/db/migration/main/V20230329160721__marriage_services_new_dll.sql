ALTER TABLE public.eg_marriage_bride_groom_details
 ADD COLUMN IF NOT EXISTS tenantid character varying(64) COLLATE pg_catalog."default",
 ALTER COLUMN aadharno TYPE character varying(200) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_witness_details
 ADD COLUMN IF NOT EXISTS tenantid character varying(64) COLLATE pg_catalog."default",
 ALTER COLUMN aadharno TYPE character varying(200) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_bride_groom_details_audit
 ADD COLUMN IF NOT EXISTS tenantid character varying(64) COLLATE pg_catalog."default",
 ALTER COLUMN aadharno TYPE character varying(200) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_witness_details_audit
   ADD COLUMN IF NOT EXISTS tenantid character varying(64) COLLATE pg_catalog."default",
  ALTER COLUMN aadharno TYPE character varying(200) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_document
    ADD COLUMN IF NOT EXISTS applicationNumber character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_document_audit
    ADD COLUMN IF NOT EXISTS applicationNumber character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_details
     ADD COLUMN IF NOT EXISTS villageid character varying(64) COLLATE pg_catalog."default",
      ADD COLUMN IF NOT EXISTS  taluk_name character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_details_audit
     ADD COLUMN IF NOT EXISTS villageid character varying(64) COLLATE pg_catalog."default",
      ADD COLUMN IF NOT EXISTS  taluk_name character varying(1000) COLLATE pg_catalog."default";