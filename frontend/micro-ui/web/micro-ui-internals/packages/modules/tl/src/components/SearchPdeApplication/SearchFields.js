import React, { Fragment } from "react"
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
  display: "block"
};


const SearchFields = ({ register, control, reset, tenantId, t }) => {
  // const { data: bussinessSector, isLoading: bussinessSectorLoading } = Digit.Hooks.tl.useMDMS.applicationTypes(tenantId)
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const { roles: userRoles,uuid: uuid } = Digit.UserService.getUser().info;
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
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
    cmbWardNo.map((wardmst) => {
      wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
      wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
      cmbWardNoFinal.push(wardmst);
    });
  

  const roletemp = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("TL_PDEAPPROVER"));
  const roletempop = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("TL_PDEOPERATOR"));
  const roleall = [];
  roleall.push(...roletemp);
  roleall.push(...roletempop);
  const rolecombine = [];
  roleall?.map?.((e) => {
    rolecombine.push(e.code);
  });
  const { data: userData, isLoading: PTALoading } = Digit.Hooks.useEmployeeSearch(
    tenantId,
    {
      roles: rolecombine?.map?.((e) => ({ code: e })),
      isActive: true,
      uuids: uuid,
      rolecodes: rolecombine?.map?.((e) => (e)).join(",")
    }
    // { enabled: !action?.isTerminateState }
  );

  const operatorwardtemp = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("TL_PDEOPERATOR"));
  const appwardtemp = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("TL_PDEAPPROVER"));

  const operatorward = [];
  const appward = [];
  operatorwardtemp?.map((ob) => {
    operatorward.push(...ob.jurisdictionChilds);

  });
  appwardtemp?.map((ob) => {
    appward.push(...ob.jurisdictionChilds);

  });



  const finaloperatorward = [];
  operatorward.map((temp) => {
    finaloperatorward.push(...cmbWardNoFinal?.filter((doc) => doc.code === temp.wardCode));
  })
  const finalapproverward = [];
  appward.map((temp) => {
    finalapproverward.push(...cmbWardNoFinal?.filter((doc) => doc.code === temp.wardCode));
  })
  const finalward = [];

  finalward.push(...finaloperatorward);
  finalward.push(...finalapproverward);

  cmbWardNoFinal= finalward.reduce((ac,a) => ac.find(x=> x.code === a.code) ? [...ac] : [...ac,a],[]);

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

  const bussinesssector = useWatch({ control, name: "bussinesssector" });
  const wardId = useWatch({ control, name: "wardId" });
  const applicationstatus = useWatch({ control, name: "applicationstatus" });



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
      <label>{`${t("TL_LOCALIZATION_APPLNSTATUS")}`}</label>
      <Controller

        control={control}
        name="applicationstatus"
        render={(props) => (
          <Dropdown
            selected={props.value}
            select={props.onChange}
            onBlur={props.onBlur}
            option={applnStatus}
            optionKey="name"
            t={t}
          />
        )}
      />
    </SearchField>
    <SearchField>
      <label>{t("TL_HOME_SEARCH_RESULTS_APP_NO_LABEL")}</label>
      <TextInput name="applicationNumber" inputRef={register({})} />
    </SearchField>
    <SearchField>
      <label>{`${t("TL_COMMON_TABLE_COL_TRD_NAME")}`}</label>
      <TextInput name="tradeName" inputRef={register({})} />
    </SearchField>
    {/* <SearchField>
            <label>{`${t("TL_LOCALIZATION_SECTOR")}`}</label>
            <Controller
                    control={control}
                    name="bussinesssector"
                    render={(props) => (
                        <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={bussinesssectorlist}
                        optionKey="name"
                        t={t}
                        />
                    )}
                    />
        </SearchField> */}
    <SearchField>
      <label>{`${t("TL_LOCALIZATION_TRADE_OWNER_NAME")}`}</label>
      <TextInput name="ownerName" inputRef={register({})} />
    </SearchField>

    <SearchField>
      <label>{t("TL_LOCALIZATION_DOOR_NO")}</label>
      <TextInput name="doorNo" inputRef={register({})} />
    </SearchField>
    <SearchField>
      <label>{t("TL_LOCALIZATION_DOOR_NO_SUB")}</label>
      <TextInput name="subNo" inputRef={register({})} />
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