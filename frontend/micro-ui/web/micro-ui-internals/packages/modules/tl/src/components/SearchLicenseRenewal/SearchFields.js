import React, { Fragment, useEffect } from "react"
import { Controller, useWatch, useState } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
  display: "block"
};


const SearchFields = ({ register, control, reset, tenantId, t }) => {
  const stateId = Digit.ULBService.getStateId();
  const { data: Districts = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "District"); 
  const { data: LBTypes = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "LBType");
  const { data: localbodies, islocalbodiesLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "tenant", "Localbody");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "egov-location", "boundary-data");
  const { data: sector = {}, isSectorLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "EnterpriseType");
  
  const districtId = useWatch({control, name: "districtId"});
  const lbTypeId = useWatch({control, name: "lbTypeId"});
  const lbId = useWatch({control, name: "lbId"});
  const zonalId = useWatch({control, name: "zonalId"});

  const bussinesssector = useWatch({ control, name: "bussinesssector" });
  const wardId = useWatch({ control, name: "wardId" });
  const applicationstatus = useWatch({ control, name: "applicationstatus" });
  
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  let cmbDistrict = [];
  let cmbLBType = [];
  let LBs = [];
  let cmbSector = [];
  let FilterLocalbody  = [];

  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      LBs.push(ob);
    });
  
  useEffect(() => {
    if((districtId) && (lbTypeId)){
      if(LBs.length > 0){
        console.log("456789");
        console.log(LBs.length);
        FilterLocalbody.push(LBs.filter((localbody) => ((districtId.code === localbody.city.distCodeStr) && (lbTypeId.code === localbody.city.lbtypecode))));
        
      }
    }
  },[FilterLocalbody]);
  
  // if((districtId) && (lbTypeId)&&(lbId)){
  //   const { data: boundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "egov-location", "boundary-data");
  // }

  Districts &&
    Districts["common-masters"] &&
    Districts["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  LBTypes &&
    LBTypes["common-masters"] &&
    LBTypes["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
 
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        Zonal.push(...ob.boundary.children);
        ob.boundary.children.map((obward) => {
          cmbWardNo.push(...obward.children);
        });
      }
    });
  sector &&
    sector["TradeLicense"] &&
    sector["TradeLicense"].EnterpriseType.map((ob) => {
      cmbSector.push(ob);
      });

  cmbWardNo.map((wardmst) => {
      wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
      wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
      cmbWardNoFinal.push(wardmst);
    });
  

  cmbWardNoFinal = cmbWardNoFinal.sort((a, b) => {
    if (parseInt(a.wardno) > parseInt(b.wardno)) { return 1; }
    if (parseInt(b.wardno) > parseInt(a.wardno)) { return -1; }
    return 0;
  });


  const bussinesssectorlist = [
    { name: "Manufacturing Sector", code: "MANUFACTORING" },
    { name: "Service Sector", code: "SERVICE" },
  ];

  const applnStatus = [
    { name: "Initiated", code: "INITIATED" },
    { name: "Forwarded", code: "FORWARDED" },
    { name: "Approved", code: "APPROVED" }
  ];


  // const { data: statusData, isLoading } = Digit.Hooks.useApplicationStatusGeneral({ businessServices, tenantId }, {});
  // let applicationStatuses = []

  // statusData && statusData?.otherRoleStates?.map((status) => {
  //     let found = applicationStatuses.length>0? applicationStatuses?.some(el => el?.code === status.applicationStatus) : false;  
  //     if(!found) applicationStatuses.push({code:status?.applicationStatus, i18nKey:`WF_NEWTL_${(status?.applicationStatus)}`})
  // })

  // statusData && statusData?.userRoleStates?.map((status) => {
  //     let found = applicationStatuses.length>0? applicationStatuses?.some(el => el?.code === status.applicationStatus) : false;  
  //     if(!found) applicationStatuses.push({code:status?.applicationStatus, i18nKey:`WF_NEWTL_${(status?.applicationStatus)}`})
  // })

  return <>
  <SearchField>
      <label>{`${t("TL_DISTRICT")}`}</label>
      <Controller

        control={control}
        name="districtId"
        render={(props) => (
          <Dropdown
            selected={props.value}
            select={props.onChange}
            onBlur={props.onBlur}
            option={cmbDistrict}
            optionKey="name"
            t={t}
          />
        )}
      />
    </SearchField>
    <SearchField>
      <label>{`${t("TL_LB_TYPE_LABEL")}`}</label>
      <Controller

        control={control}
        name="lbTypeId"
        render={(props) => (
          <Dropdown
            selected={props.value}
            select={props.onChange}
            onBlur={props.onBlur}
            option={cmbLBType}
            optionKey="name"
            t={t}
          />
        )}
      />
    </SearchField>
    <SearchField>
      <label>{`${t("TL_LB_NAME_LABEL")}`}</label>
      <Controller

        control={control}
        name="lbId"
        render={(props) => (
          <Dropdown
            selected={props.value}
            select={props.onChange}
            onBlur={props.onBlur}
            option={FilterLocalbody}
            optionKey="name"
            t={t}
          />
        )}
      />
    </SearchField>
    <SearchField>
      <label>{`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`}</label>
      <Controller

        control={control}
        name="zonalId"
        render={(props) => (
          <Dropdown
            selected={props.value}
            select={props.onChange}
            onBlur={props.onBlur}
            option={Zonal}
            optionKey="name"
            t={t}
          />
        )}
      />
    </SearchField>
    <SearchField>
      <label>{`${t("TL_LOCALIZATION_WARD_NO")}`}</label>
      <Controller

        control={control}
        name="wardId"
        render={(props) => (
          <Dropdown
            selected={props.value}
            select={props.onChange}
            onBlur={props.onBlur}
            option={cmbWardNoFinal}
            optionKey="namecmb"
            t={t}
          />
        )}
      />
    </SearchField>
    <SearchField>
      <label>{t("TL_LOCALIZATION_DOOR_NO")}</label>
      <TextInput name="doorNo" inputRef={register({})} />
    </SearchField>
    <SearchField>
      <label>{t("TL_LOCALIZATION_DOOR_NO_SUB")}</label>
      <TextInput name="subNo" inputRef={register({})} />
    </SearchField>
    <SearchField>
      <label>{`${t("TL_COMMON_TABLE_COL_TRD_NAME")}`}</label>
      <TextInput name="tradeName" inputRef={register({})} />
    </SearchField>
    
    <SearchField>
      <label>{`${t("TL_LOCALIZATION_TRADE_OWNER_NAME")}`}</label>
      <TextInput name="ownerName" inputRef={register({})} />
    </SearchField>

    
    <SearchField className="submit">
      <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
      <p onClick={() => {
        reset({
          applicationNumber: "",
          bussinesssector: "",
          ownerName: "",
          wardId: "",
          doorNo: "",
          subNo: "",
          tradeName: "",
          offset: 0,
          limit: 10,
          sortBy: "wardId",
          sortOrder: "DESC"
        });
        previousPage();
      }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
    </SearchField>
  </>
}
export default SearchFields