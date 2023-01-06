CREATE TABLE IF NOT EXISTS eg_tl_taxdetails_pde
(
    id character varying(64),
    tenantid character varying(64),
    tradelicensedetailid character varying(64),
    service character varying(64),
    fromyear character varying(15),
    fromperiod character varying(15),
    toyear character varying(15),
    toperiod character varying(15),
    headcode character varying(15),
    amount numeric(16),
    active boolean,
    createdby character varying(64),
    lastmodifiedby character varying(64),
    createdtime bigint,
    lastmodifiedtime bigint,
    CONSTRAINT pk_eg_tl_taxdetails_pde PRIMARY KEY (id, tradelicensedetailid),
    CONSTRAINT fk_eg_tl_taxdetails_pde FOREIGN KEY (tradelicensedetailid)
        REFERENCES public.eg_tl_tradelicensedetail (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
