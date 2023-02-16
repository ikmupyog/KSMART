alter table eg_death_address_dtls alter column pincode type character varying(50);
alter table eg_death_address_dtls_log alter column pincode type character varying(50);
alter table eg_death_address_registry alter column pincode type character varying(50);;
alter table eg_death_address_registry_log alter column pincode type character varying(50);

alter table eg_death_address_dtls alter column housename_ml type character varying(500);
alter table eg_death_address_dtls_log alter column housename_ml type character varying(500);
alter table eg_death_address_registry alter column housename_ml type character varying(500);;
alter table eg_death_address_registry_log alter column housename_ml type character varying(500);

alter table eg_death_address_dtls alter column housename_en type character varying(500);
alter table eg_death_address_dtls_log alter column housename_en type character varying(500);
alter table eg_death_address_registry alter column housename_en type character varying(500);;
alter table eg_death_address_registry_log alter column housename_en type character varying(500);

alter table eg_death_dtls alter column death_home_pincode type character varying(50);
alter table eg_death_dtls_log alter column death_home_pincode type character varying(50);
alter table eg_death_dtls_registry alter column death_home_pincode type character varying(50);;
alter table eg_death_dtls_registry_log alter column death_home_pincode type character varying(50);