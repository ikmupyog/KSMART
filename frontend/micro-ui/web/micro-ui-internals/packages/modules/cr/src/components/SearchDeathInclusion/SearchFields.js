import React, { useState, useEffect, Fragment } from "react"
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
    display: "block"
};
let validation = {}

const SearchFields = ({ register, control, reset, watch, tenantId, t,previousPage }) => {
    const stateId = Digit.ULBService.getStateId();
    const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.cr.useMDMS.applicationTypes(tenantId)
    const { data: Menu, isLoading: genderLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
    const { data: hospitalData = {}, isLoading:hospitalLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
    const [checkIsRequired, setCheckIsRequired] = useState(false);
  
    const applicationType = useWatch({ control, name: "applicationType" });

    let businessServices = [];
    if (applicationType && applicationType?.code === "RENEWAL")
        businessServices = ["EDITRENEWAL", "DIRECTRENEWAL"]
    else if (applicationType && applicationType?.code === "NEW")
        businessServices = ["NewTL"]
    else
        businessServices = ["EDITRENEWAL", "DIRECTRENEWAL", "NewTL"]

    const { data: statusData, isLoading } = Digit.Hooks.useApplicationStatusGeneral({ businessServices, tenantId }, {});
    let applicationStatuses = []

    statusData && statusData?.otherRoleStates?.map((status) => {
        let found = applicationStatuses.length > 0 ? applicationStatuses?.some(el => el?.code === status.applicationStatus) : false;
        if (!found) applicationStatuses.push({ code: status?.applicationStatus, i18nKey: `WF_NEWTL_${(status?.applicationStatus)}` })
    })

    statusData && statusData?.userRoleStates?.map((status) => {
        let found = applicationStatuses.length > 0 ? applicationStatuses?.some(el => el?.code === status.applicationStatus) : false;
        if (!found) applicationStatuses.push({ code: status?.applicationStatus, i18nKey: `WF_NEWTL_${(status?.applicationStatus)}` })
    })
    let GenderOptions = [];
    Menu &&
      Menu.map((genderDetails) => {
        GenderOptions.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
      });
      let cmbhospital = [];
      hospitalData &&
        hospitalData["egov-location"] &&
        hospitalData["egov-location"].hospitalList.map((ob) => {
          cmbhospital.push(ob);
        });

        useEffect(() => {
            if (watch().DeathACKNo?.length > 0) {
              setCheckIsRequired(false);
            } else {
              setCheckIsRequired(true);
            }
          }, [watch()]);
    return <>
        {/* <SearchField>
            <label><span className="mandatorycss">*</span> {t("Registry ID")}</label>
            <TextInput name="id" inputRef={register({})} 
             placeholder={`${t("Registry ID")}`} 
             {...(validation = { isRequired: false, type: "text", title: t("DC_INVALID_REGISTRY_ID") })}/>
        </SearchField> */}
        <SearchField>
            <label>
                 {/* <span className="mandatorycss">*</span>  */}
            {t("CR_SEARCH_ACK_NO")}</label>
            <TextInput name="DeathACKNo" inputRef={register({})}
// {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })}
              placeholder={`${t("CR_SEARCH_ACK_NO")}`}
              />
                
        </SearchField>
        <SearchField>
            <label> 
                {/* <span className="mandatorycss">*</span> */}
            {t("DC_NAME_DECEASED")}</label>
            <TextInput name="DeceasedFirstNameEn" inputRef={register({})} 
             placeholder={`${t("DC_NAME_DECEASED")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_DECEASED") })}/>
        </SearchField>
        <SearchField>
            <label> 
                <span className="mandatorycss">*</span>
                {t("CR_DATE_OF_DEATH")}</label>
            <Controller
                render={(props) => <DatePicker date={props.value} onChange={props.onChange}
                {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: checkIsRequired, title: t("CR_DATE_OF_DEATH") })} />}
                name="DateOfDeath"
                control={control}
            />
        </SearchField>
        <SearchField>
            <label>
                <span className="mandatorycss">*</span>
                {t("CR_GENDER")}</label>
            <Controller
                control={control}
                name="DeceasedGender"
                render={(props) => (
                    <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={GenderOptions}
                        optionKey="code"
                        t={t}
                        placeholder={`${t("CR_GENDER")}`}
                        {...(validation = { isRequired: checkIsRequired, title: t("CR_INVALID_GENDER") })}
                    />
                )}
            />
        </SearchField>
        <SearchField>
            <label> {t("CR_FATHER_NAME_EN")}</label>
            <TextInput name="FatherNameEn" inputRef={register({})} placeholder={`${t("CR_FATHER_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_FATHER_NAME_EN") })} />
        </SearchField>
        <SearchField>
            <label> {t("CR_MOTHER_NAME_EN")}</label>
            <TextInput name="MotherNameEn" inputRef={register({})} placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MOTHER_NAME_EN") })} />
        </SearchField>

        <SearchField>
            <label>{t("DC_HUSBAND_OR_WIFE_NAME")}</label>
            <TextInput name="deceasedHusbandWifeName" inputRef={register({})}
                placeholder={`${t("DC_HUSBAND_OR_WIFE_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_HUSBAND_OR_WIFE_NAME") })} />
        </SearchField>
        <SearchField>
            <label>{`${t("CR_HOSPITAL_EN")}`}</label>
            <Controller

                control={control}
                name="hospital"
                render={(props) => (
                    <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={cmbhospital}
                        optionKey="hospitalName"
                        t={t}
                        placeholder={`${t("CR_HOSPITAL_EN")}`}
                    />
                )}
            />
        </SearchField>
        <SearchField className="submit">
            <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
            <p onClick={() => {
                reset({ 
                    id: "", 
                    DeceasedName: "", 
                    DeathDate: "",
                    Gender: "",
                    WifeorMotherName: "",
                    HusbandorfatherName: "",
                    HospitalName:"",
                    RegistrationNumber:"",
                    offset: 0,
                    limit: 10,
                    sortBy: "dateofreport",
                    sortOrder: "DESC"
                });
                previousPage();
            }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
        </SearchField> 
    </>
}
export default SearchFields