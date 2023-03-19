insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) 
select nextval('state.seq_egdcr_layername'),'LAYER_NAME_UN_NOTIFIED_ROAD','UN_NOTIFIED_ROAD',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_UN_NOTIFIED_ROAD');

update state.egdcr_layername set value='BLK_%s_FLR_%s_FIRESTAIR_%s_FLIGHT' where key='LAYER_NAME_FIRESTAIR_FLIGHT';
update state.egdcr_layername set value='BLK_%s_FLR_%s_STAIR_%s_FLIGHT' where key='LAYER_NAME_STAIR_FLIGHT';
update state.egdcr_layername set value='BLK_%s_FLR_%s_M_%s_BLT_UP_AREA' where key='LAYER_NAME_MEZZANINE_FLOOR_BLT_UP_AREA';
update state.egdcr_layername set value='BLK_%s_FLR_%s_M_%s_BLT_UP_AREA_DEDUCT' where key='LAYER_NAME_MEZZANINE_FLOOR_DEDUCTION';
update state.egdcr_layername set value='REAR_YARD' where key='LAYER_NAME_REAR_YARD';
update state.egdcr_layername set value='SIDE_YARD2' where key='LAYER_NAME_SIDE_YARD_2';
update state.egdcr_layername set value='SIDE_YARD1' where key='LAYER_NAME_SIDE_YARD_1';
update state.egdcr_layername set value='FRONT_YARD' where key='LAYER_NAME_FRONT_YARD';
update state.egdcr_layername set value='BLK_%s_OPEN_STAIR' where key='LAYER_NAME_OPEN_STAIR';
update state.egdcr_layername set value='BLK_%s_SHADE_OVERHANG' where key='LAYER_NAME_SHADE_OVERHANG';
update state.egdcr_layername set value='PARKING_AREA' where key='LAYER_NAME_PARKING_AREA_SUFFIX';
update state.egdcr_layername set value='PARKING_AREA_EXISTING' where key='EXIST_PARKING_AREA_SUFFIX';