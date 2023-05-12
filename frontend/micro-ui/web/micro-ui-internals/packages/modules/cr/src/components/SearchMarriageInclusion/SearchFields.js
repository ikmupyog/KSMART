import React, { Fragment, useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";
//style
const mystyle = {
  display: "block",
};
let validation = {};

const SearchFields = ({ register, control, reset,watch, tenantId, t, previousPage }) => {
  const stateId = Digit.ULBService.getStateId();
  // const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.cr.useMDMS.applicationTypes(tenantId);
  const { data: place, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MarriagePlaceType");

  // const applicationType = useWatch({ control, name: "applicationType" });
  const [value, setValue] = useState(0);
  const [checkIsRequired, setCheckIsRequired] = useState(false);
useEffect(() => {
  if (watch().registrationNo?.length > 0) {
    setCheckIsRequired(false);
  } else {
    setCheckIsRequired(true);
  }
console.log("getValues ===> ", watch());
}, [watch()]);
  // let cmbPlaceType = [];
  // place &&
  //   place["birth-death-service"]?.MarriagePlaceType?.map((placeDetails) => {
  //     cmbPlaceType.push({ i18nKey: `CR_COMMON_GENDER_${t(placeDetails.code)}`, code: `${t(placeDetails.code)}`, value: `${placeDetails.name}` });
  //   });

  // function setSelectmarriagePlacetype(value) {
  //   setmarriagePlacenameEn(value);
  //   setValue(value.code);
  //   setAgeMariageStatus(value.code);
  // }

  return (
    <>
     <SearchField>
        <label>
        {t("CR_REGISTRATION_NUMBER")}
        </label>
        <TextInput
          name="registrationNo"
          inputRef={register({})}
          placeholder={`${t("CR_REGISTRATION_NUMBER")}`}
          // {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })}
        />
      </SearchField>
    <SearchField>
        <label>
        <span className="mandatorycss">*</span>
          {t("CR_DATE_OF_MARRIAGE")}
        </label>
        <Controller
          render={(props) => (
            <DatePicker
            datePickerRef={register({})}
              date={props.value}
              onChange={props.onChange}
              {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: checkIsRequired, title: t("CR_INVALID_DATE") })}
            />
          )}
          name="marriageDOM"
          control={control}
        />
      </SearchField>
      <SearchField>
        <label> 
        <span className="mandatorycss">*</span>
          {t("CR_FIRST_NAME_OF_HUSBAND")}</label>
        <TextInput
          name="groomFirstnameEn"
          inputRef={register({})}
          placeholder={`${t("CR_FIRST_NAME_OF_HUSBAND")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: checkIsRequired, type: "text", title: t("CR_GROOM_NAME") })}
        />
      </SearchField>
      <SearchField>
        <label>
        <span className="mandatorycss">*</span>{t("CR_FIRST_NAME_OF_WIFE")}</label>
        <TextInput
          name="brideFirstnameEn"
          inputRef={register({})}
          placeholder={`${t("CR_FIRST_NAME_OF_WIFE")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: checkIsRequired, type: "text", title: t("CR_BRIDE_NAME") })}
        />
      </SearchField>    
      {/* <SearchField>
        <label> {t("CR_AADHAR")}</label>
        <TextInput
          t={t}
          isMandatory={false}
          type="number"
          max="12"
          optionKey="i18nKey"
          name="groomAadharNo"
          value={DeceasedAadharNumber}
          onChange={(e)=>{
            setDeceasedAadharNumber(e.target.value)
        }}
          placeholder={`${t("CR_AADHAR")}`}
          {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
        />
      </SearchField> */}
     
      {/* <SearchField>
        <label> {t("CR_AADHAR")}</label>
        <TextInput
          t={t}
          isMandatory={false}
          type="number"
          max="12"
          optionKey="i18nKey"
          name="brideAadharNo"
          value={DeceasedBrideAadharNumber}
          onChange={(e)=>{
            setDeceasedBrideAadharNumber(e.target.value)
        }}
          placeholder={`${t("CR_AADHAR")}`}
          {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
        />
      </SearchField>
      */}
      <SearchField className="submit">
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
        <p
          onClick={() => {
            reset({
              id: "",
              DeceasedName: "",
              marriageDOM: "",
              Gender: "",
              WifeorMotherName: "",
              HusbandorfatherName: "",
              HospitalName: "",
              RegistrationNumber: "",
              offset: 0,
              limit: 10,
              sortBy: "dateofreport",
              sortOrder: "DESC",
            });
            previousPage();
          }}
        >
          {t(`ES_COMMON_CLEAR_ALL`)}
        </p>
      </SearchField>
    </>
  );
};
export default SearchFields;
