CREATE TABLE public.eg_tl_taxheadmaster
(
  id character varying(64) NOT NULL,
  tenantid character varying(128) NOT NULL,
  lbtype character varying(20) NOT NULL,
  service character varying(128) NOT NULL,
  headname character varying(250) NOT NULL,
  headcode character varying(10) NOT NULL,
  type character varying(20) NOT NULL,
  rate numeric,
  status int,
  createdby character varying(64),
  createdtime bigint,
  lastmodifiedby character varying(64),
  lastmodifiedtime bigint,
  CONSTRAINT pk_eg_tl_taxheadmaster PRIMARY KEY (id, tenantid)
);