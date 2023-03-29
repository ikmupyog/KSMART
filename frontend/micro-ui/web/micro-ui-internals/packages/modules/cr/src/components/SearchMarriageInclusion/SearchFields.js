import React, { Fragment, useState } from "react"
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
    display: "block"
};
let validation = {}

const SearchFields = ({ register, control, reset, tenantId, t,previousPage }) => {
    const stateId = Digit.ULBService.getStateId();
    const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.cr.useMDMS.applicationTypes(tenantId)
    const { data: Menu, isLoading: genderLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
    const { data: hospitalData = {}, isLoading:hospitalLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
    const { data: place, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MarriagePlaceType");

  console.log("search marriage json===",Menu);
    const applicationType = useWatch({ control, name: "applicationType" });
    const [value, setValue] = useState(0);
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
      let cmbPlaceType = [];
      console.log("search place json===",place);
      place &&
       place["birth-death-service"]?.MarriagePlaceType?.map((placeDetails) => {
        cmbPlaceType.push({ i18nKey: `CR_COMMON_GENDER_${placeDetails.code}`, code: `${placeDetails.code}`, value: `${placeDetails.code}` });
      });
    //   place &&
    // place["birth-death-service"] &&
    // place["birth-death-service"].MarriagePlaceType &&
    // place["birth-death-service"].MarriagePlaceType.map((ob) => {
    //     cmbPlaceType.push(ob);
    // });
    // const cmbPlaceType = [
    //     { i18nKey: "Religious Institution", code: "RELIGIOUSINSTITUTION" },
    //     { i18nKey: "Public/Pvt Place ", code: "PUBLIC/PVTPLACE " },
    //     { i18nKey: "House", code: "HOUSE" },
    //    ];
      let cmbhospital = [];
      hospitalData &&
        hospitalData["egov-location"] &&
        hospitalData["egov-location"].hospitalList.map((ob) => {
          cmbhospital.push(ob);
        });

        function setSelectmarriagePlacetype(value) {
            // setmarriagePlacenameEn(value);
            setValue(value.code);
            // setAgeMariageStatus(value.code);
          }

    return <>
        <SearchField>
            <label><span className="mandatorycss">*</span> {t("CERTIFICATE NO")}</label>
            <TextInput name="id" inputRef={register({})} 
             placeholder={`${t("Certificate No")}`} 
             {...(validation = { isRequired: false, type: "text", title: t("DC_INVALID_REGISTRY_ID") })}/>
        </SearchField>
        <SearchField>
            <label>
                 {/* <span className="mandatorycss">*</span>  */}
            {t("REGISTRATION NUMBER")}</label>
            <TextInput name="marriageRegistrationNumber" inputRef={register({})}
                placeholder={`${t("MARRIAGE_REGISTRATION_NUMBER")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })} />
        </SearchField>
        <SearchField>
            <label> 
                {/* <span className="mandatorycss">*</span> */}
            {t(" DATE")}</label>
            <Controller
                render={(props) => <DatePicker date={props.value} onChange={props.onChange}  {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, title: t("CR_INVALID_DATE") })} />}
                name="MarriageDate"
                control={control}
            />
        </SearchField>
        <SearchField>
            <label> 
                {/* <span className="mandatorycss">*</span> */}
                {t("PLACE OF MARRIAGE")}</label>
                <Controller
                control={control}
                name="placeOfMarriage"
                render={(props) => (
                    <Dropdown
                        selected={props.value}
                        select={setSelectmarriagePlacetype}
                        onBlur={props.onBlur}
                        option={cmbPlaceType}
                        optionKey="code"
                        t={t}
                        placeholder={`${t("PLACE_OF_MARRIAGE")}`}
                        {...(validation = { isRequired: false, title: t("DC_INVALID_GENDER") })}
                    />
                )}
            />
        </SearchField>
        {/* {value === "RELIGIOUSINSTITUTION" && (
             <div>
              <SearchField>
                <CardLabel>
                  {`${t("CR_NAME_OF_PLACE_EN")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  option={cmbPlaceType}
                  selected={marriagePlacenameEn}
                  select={setSelectmarriagePlacenameEn}
                  placeholder={t("CR_NAME_OF_PLACE_EN")}
                  isMandatory={true}
                  {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_EN") })}
                  // option={cmbCountry}
                />
              </SearchField>
             
              
              <SearchField>
                <CardLabel>
                  {`${t("CR_NAME_OF_PLACE_MAL")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  option={cmbPlaceType}
                  selected={marriagePlacenameMal}
                  select={setSelectmarriagePlacenameMal}
                  placeholder={t("CR_NAME_OF_PLACE_MAL")}
                  isMandatory={true}
                  {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_MAL") })}
                  // option={cmbCountry}
                />
              </SearchField>             
            
         
            
          {value === "OTHER" && (
                <div>
                  <HouseMarriageRegistration
                  formData={formData}
                    marriageLocalityEn={marriageLocalityEn}
                    marriageLocalityMal={marriageLocalityMal}
                    marriageStreetEn={marriageStreetEn}
                    marriageStreetMal={marriageStreetMal}
                    marriageHouseNoAndNameEn={marriageHouseNoAndNameEn}
                    marriageHouseNoAndNameMal={marriageHouseNoAndNameMal}
                    marriageLandmark={marriageLandmark}
                    setmarriageLocalityEn={setmarriageLocalityEn}
                    setmarriageLocalityMal={setmarriageLocalityMal}
                    setmarriageStreetEn={setmarriageStreetEn}
                    setmarriageStreetMal={setmarriageStreetMal}
                    setmarriageHouseNoAndNameEn={setmarriageHouseNoAndNameEn}
                    setmarriageHouseNoAndNameMal={setmarriageHouseNoAndNameMal}
                    setmarriageLandmark={setmarriageLandmark}
                  />
                  ;
                </div>
              )}
              </div>)} */}
        {/* <SearchField>
            <label> {t("DC_DECEASED_FATHER_NAME")}</label>
            <TextInput name="deceasedFatherName" inputRef={register({})} placeholder={`${t("DC_DECEASED_FATHER_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_DECEASED_FATHER_NAME") })} />
        </SearchField>
        <SearchField>
            <label> {t("DC_DECEASED_MOTHER_NAME")}</label>
            <TextInput name="deceasedMotherName" inputRef={register({})} placeholder={`${t("DC_DECEASED_MOTHER_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_MOTHER_NAME") })} />
        </SearchField>

        <SearchField>
            <label>{t("DC_HUSBAND_OR_WIFE_NAME")}</label>
            <TextInput name="deceasedHusbandWifeName" inputRef={register({})}
                placeholder={`${t("DC_HUSBAND_OR_WIFE_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_HUSBAND_OR_WIFE_NAME") })} />
        </SearchField>
        <SearchField>
            <label>{`${t("CD_HOSPITAL")}`}</label>
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
                        placeholder={`${t("CD_HOSPITAL")}`}
                    />
                )}
            />
        </SearchField> */}
        {/* <SearchField>
            <label>  {t("DC_REGISTRATION_NUMBER")}</label>
            <TextInput name="RegistrationNumber" inputRef={register({})}
                placeholder={`${t("DC_REGISTRATION_NUMBER")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })} />
        </SearchField> */}
        

        {/* {applicationTypesLoading ? <Loader/> : <SearchField> 
            <label>{t("CR_SEARCH_APPLICATION_TYPE")}</label>
            <Controller
           
                    control={control}
                    name="applicationType"
                    render={(props) => (
                        <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={applicationTypes}
                        optionKey="i18nKey"
                        t={t}
                        />
                    )}
                    />
        </SearchField>}
        <SearchField>
            <label  style={mystyle}>{t("CR_SEARCH_FROM_DATE")}</label>
            <Controller
           
                render={(props) => <DatePicker  date={props.value} onChange={props.onChange} />}
                name="fromDate"
                control={control}
                />
        </SearchField>
        <SearchField>
            <label style={mystyle}>{t("CR_SEARCH_TO_DATE")}</label>
            <Controller
                render={(props) => <DatePicker   date={props.value} onChange={props.onChange} />}
                name="toDate"
                control={control}
                />
        </SearchField>
        { isLoading ? <Loader/> : <SearchField>
            <label>{t("CR_SEARCH_RESULTS_APP_STATUS_LABEL")}</label>
            <Controller
                    control={control}
                    name="status"
                    render={(props) => (
                        <Dropdown
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={applicationStatuses}
                        optionKey="i18nKey"
                        t={t}
                        />
                    )}
            />
        </SearchField>}
        <SearchField>
            <label>{t("CR_SEARCH_MOTHER_NAME")}</label>
            <TextInput  name="tradeName" inputRef={register({})}/>
        </SearchField>
       */}
       <SearchField>
       <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARTNER_DETAILS")}`}</span>{" "}
              </h1>
            </div>
          </div>
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