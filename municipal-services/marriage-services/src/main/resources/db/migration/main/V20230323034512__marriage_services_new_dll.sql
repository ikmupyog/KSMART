DROP TABLE IF EXISTS public.eg_marriage_details CASCADE;
DROP INDEX IF EXISTS public.idx_eg_marriage_details_tenantid;
DROP TABLE IF EXISTS public.eg_marriage_details_audit;
DROP TABLE IF EXISTS public.eg_marriage_bride_groom_details;
DROP TABLE IF EXISTS public.eg_marriage_bride_groom_details_audit;
DROP TABLE IF EXISTS public.eg_marriage_permanent_address_details;
DROP TABLE IF EXISTS public.eg_marriage_permanent_address_details_audit;
DROP TABLE IF EXISTS public.eg_marriage_present_address_details;
DROP TABLE IF EXISTS public.eg_marriage_present_address_details_audit;
DROP TABLE IF EXISTS public.eg_marriage_witness_details;
DROP TABLE IF EXISTS public.eg_marriage_witness_details_audit;
DROP TABLE IF EXISTS public.eg_marriage_certificate;
DROP TABLE IF EXISTS public.eg_marriage_certificate_audit;
DROP TABLE IF EXISTS public.eg_register_marriage_document;
DROP TABLE IF EXISTS public.eg_register_marriage_document_audit;
DROP TABLE IF EXISTS public.eg_register_marriage_details CASCADE;
DROP TABLE IF EXISTS public.eg_register_marriage_details_audit;
DROP TABLE IF EXISTS public.eg_register_marriage_bride_groom_details;
DROP TABLE IF EXISTS public.eg_register_marriage_bride_groom_details_audit;
DROP TABLE IF EXISTS public.eg_register_marriage_permanent_address_details_audit;
DROP TABLE IF EXISTS public.eg_register_marriage_present_address_details;
DROP TABLE IF EXISTS public.eg_register_marriage_present_address_details_audit;
DROP TABLE IF EXISTS public.eg_register_marriage_witness_details;
DROP TABLE IF EXISTS public.eg_register_marriage_witness_details_audit;
DROP TABLE IF EXISTS public.eg_register_marriage_document;
DROP TABLE IF EXISTS public.eg_register_marriage_document_audit;






DROP FUNCTION IF EXISTS public.process_eg_marriage_bride_details_audit();
DROP FUNCTION IF EXISTS public.process_eg_marriage_details_audit();
DROP FUNCTION IF EXISTS public.process_eg_marriage_groom_details_audit();
DROP FUNCTION IF EXISTS public.process_eg_marriage_permanent_address_details_audit();
DROP FUNCTION IF EXISTS public.process_eg_marriage_present_address_details_audit();
DROP FUNCTION IF EXISTS public.process_eg_marriage_witness_details_audit();