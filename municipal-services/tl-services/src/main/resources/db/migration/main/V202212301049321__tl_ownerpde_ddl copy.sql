CREATE TABLE IF NOT EXISTS eg_tl_owner_pde
(
    id character varying(64),
    tenantid character varying(64),
    tradelicensedetailid character varying(64),
    ownertype character varying(64),
    active boolean,
    ownername character varying(150),
    aadharno character varying(20),
    address character varying(1024),
    email character varying(50),
    mobilenumber character varying(50),
    createdby character varying(64),
    createdtime bigint,
    CONSTRAINT pk_eg_tl_owner_pde PRIMARY KEY (id, tradelicensedetailid),
    CONSTRAINT fk_eg_tl_owner_pde FOREIGN KEY (tradelicensedetailid)
        REFERENCES public.eg_tl_tradelicensedetail (id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);