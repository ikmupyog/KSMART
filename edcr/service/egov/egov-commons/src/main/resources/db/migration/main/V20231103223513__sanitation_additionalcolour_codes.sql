INSERT INTO egdcr_sub_feature_colorcode(id, feature, subfeature, colorcode,ordernumber) VALUES (nextval('seq_egdcr_sub_feature_colorcode'), 'Sanitation', 'Male Visitors', 4, 4);

INSERT INTO egdcr_sub_feature_colorcode(id, feature, subfeature, colorcode,ordernumber) VALUES (nextval('seq_egdcr_sub_feature_colorcode'), 'Sanitation', 'Female Visitors', 5, 5);

INSERT INTO egdcr_sub_feature_colorcode(id, feature, subfeature, colorcode,ordernumber) VALUES (nextval('seq_egdcr_sub_feature_colorcode'), 'Sanitation', 'Male or Female Visitors', 6, 6);

insert into state.egdcr_layername(id,key,value,createdby,createddate,lastmodifiedby,lastmodifieddate,version) select nextval('state.seq_egdcr_layername'),'LAYER_NAME_PARKING_AREA','PARKING_AREA',1,now(),1,now(),0 where not exists(select key from state.egdcr_layername where key='LAYER_NAME_PARKING_AREA');
