insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_ACCBLDG_DIST_BLDG','ACCBLDG_DIST_BLDG',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_ACCBLDG_DIST_BLDG');

insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_FLR_ROOM_HT','BLK_%s_FLR_%s_HT_ROOM',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_FLR_ROOM_HT');

insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_SEPTIC_TANK','SEPTIC_TANK',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_SEPTIC_TANK');

insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_BIO_GAS','BIO_GAS',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_BIO_GAS');