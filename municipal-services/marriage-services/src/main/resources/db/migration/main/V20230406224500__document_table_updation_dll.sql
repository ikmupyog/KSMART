	ALTER TABLE public.eg_marriage_document
    ADD COLUMN IF NOT EXISTS updated_flag Integer;
	
		ALTER TABLE public.eg_marriage_document_audit
    ADD COLUMN IF NOT EXISTS updated_flag Integer;

    		ALTER TABLE public.eg_marriage_document
    ADD COLUMN IF NOT EXISTS  registrationno character varying(64);
	
			ALTER TABLE public.eg_marriage_document_audit
    ADD COLUMN IF NOT EXISTS  registrationno character varying(64);

