ALTER TABLE  public.eg_hrms_jurisdiction
ADD COLUMN  rolecode character varying(50),
ADD COLUMN  zonecode character varying(50);

ALTER TABLE public.eg_hrms_jurisdiction_child
DROP COLUMN  zonecode;
