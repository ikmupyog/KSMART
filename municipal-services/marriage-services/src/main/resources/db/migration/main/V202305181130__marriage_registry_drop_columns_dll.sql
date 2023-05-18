alter table eg_register_marriage_details drop column IF EXISTS application_dtls_id  ;
alter table eg_register_marriage_details drop column IF EXISTS application_category ;

alter table eg_register_marriage_details_audit drop column IF EXISTS application_dtls_id  ;
alter table eg_register_marriage_details_audit drop column IF EXISTS application_category ;