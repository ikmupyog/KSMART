import React, {Fragment} from "react"
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
   display:"block"
  };


const SearchFields = ({register, control, reset, tenantId, t }) => {
   // const { data: bussinessSector, isLoading: bussinessSectorLoading } = Digit.Hooks.tl.useMDMS.applicationTypes(tenantId)
    const { data: boundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");

    let Zonal = [];
    let cmbWardNo = [];
    let cmbWardNoFinal = [];
    boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      //  console.log(ob);
      // if(ob?.boundary){
      Zonal.push(...ob.boundary.children);
      ob.boundary.children.map((obward) => {
        cmbWardNo.push(...obward.children);
      });
      // }

    });
  //console.log(Zonal);
  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
    wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
    cmbWardNoFinal.push(wardmst);
  });

    const bussinesssectorlist = [
        { name: "Manufacturing Sector", code: "MANUFACTORING" },
        { name: "Service Sector", code: "SERVICE" },
      ];

    const bussinesssector = useWatch({ control, name: "bussinesssector" });
    const wardno = useWatch({ control, name: "wardno" });



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
            <label>Trade Name</label>
            <TextInput name="tradeName" inputRef={register({})} />
        </SearchField>
        <SearchField>
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
        </SearchField>
        <SearchField>
            <label>Owner Name</label>
            <TextInput  name="ownerName" inputRef={register({})}/>
        </SearchField>
        <SearchField>
            <label>{`${t("TL_LOCALIZATION_WARD_NO")}`}</label>
            <Controller
           
                    control={control}
                    name="wardno"
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
            <TextInput  name="doorNo" inputRef={register({})}/>
        </SearchField>
        <SearchField>
            <label>{t("TL_LOCALIZATION_DOOR_NO_SUB")}</label>
            <TextInput  name="subNo" inputRef={register({})}/>
        </SearchField>

        <SearchField className="submit">
            <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
            <p onClick={() => {
                reset({ 
                    bussinesssector: "", 
                    ownerName: "", 
                    wardno: "",
                    doorNo: "",
                    subNo: "",
                    tradeName: "",
                    offset: 0,
                    limit: 10,
                    sortBy: "wardno",
                    sortOrder: "DESC"
                });
                previousPage();
            }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
        </SearchField>
    </>
}
export default SearchFields