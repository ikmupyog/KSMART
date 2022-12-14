-- Table: public.eg_fm_applicantpersonal_child

-- DROP TABLE IF EXISTS public.eg_fm_applicantpersonal_child;

CREATE TABLE IF NOT EXISTS public.eg_fm_applicantpersonal_child
(
    id character varying(64) ,
    applicantpersonalid character varying(20) ,
    buildingnumber character varying(64) ,
    relationofassessee character varying(20) ,
    nameofoccupier character varying(64) ,
    relationofoccupier character varying(10) ,
    durationofresidence character varying(64) ,
    
    CONSTRAINT eg_fm_applicantpersonal_child_pkey PRIMARY KEY (id)
);