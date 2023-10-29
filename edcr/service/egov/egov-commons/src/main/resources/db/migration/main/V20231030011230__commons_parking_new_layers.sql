insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_EV_CHARGE','EV_CHARGE',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_EV_CHARGE');

insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_STACK_AREA','STACK_AREA',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_STACK_AREA');

insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_DA_PARKING','DA_PARKING',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_DA_PARKING');

insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_MECHEIGHT_PARKING','MECHEIGHT_PARKING',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_MECHEIGHT_PARKING');