import React, { Fragment, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, SubmitBar, DatePicker, SearchField, Dropdown, Loader, ButtonSelector } from "@egovernments/digit-ui-react-components";

//style
const mystyle = {
  display: "block",
};
let validation = {};

const SearchFields = ({ register, control, reset, tenantId, t, previousPage }) => {
  const stateId = Digit.ULBService.getStateId();
  const { data: applicationTypes, isLoading: applicationTypesLoading } = Digit.Hooks.cr.useMDMS.applicationTypes(tenantId);
  const { data: place, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MarriagePlaceType");

  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState();
  const [DeceasedBrideAadharNumber, setDeceasedBrideAadharNumber] = useState();
  // const applicationType = useWatch({ control, name: "applicationType" });
  const [value, setValue] = useState(0);

  let cmbPlaceType = [];
  place &&
    place["birth-death-service"]?.MarriagePlaceType?.map((placeDetails) => {
      cmbPlaceType.push({ i18nKey: `CR_COMMON_GENDER_${t(placeDetails.code)}`, code: `${t(placeDetails.code)}`, value: `${placeDetails.code}` });
    });

  function setSelectmarriagePlacetype(value) {
    // setmarriagePlacenameEn(value);
    setValue(value.code);
    // setAgeMariageStatus(value.code);
  }

  return (
    <>
    <SearchField>
        <label>
          {t("DATE_OF_MARRIAGE")}
        </label>
        <Controller
          render={(props) => (
            <DatePicker
              date={props.value}
              onChange={props.onChange}
              {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, title: t("CR_INVALID_DATE") })}
            />
          )}
          name="marriageDOM"
          control={control}
        />
      </SearchField>
      <SearchField>
        <label> {t("CR_NAME_OF_HUSBAND")}</label>
        <TextInput
          name="groomFirstnameEn"
          inputRef={register({})}
          placeholder={`${t("CR_NAME_OF_HUSBAND")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_GROOM_NAME") })}
        />
      </SearchField>
      <SearchField>
        <label>
          <span className="mandatorycss">*</span> {t("CERTIFICATE NO")}
        </label>
        <TextInput
          name="id"
          inputRef={register({})}
          placeholder={`${t("Certificate No")}`}
          {...(validation = { isRequired: false, type: "text", title: t("DC_INVALID_CERTIFICATE_NO") })}
        />
      </SearchField>
      <SearchField>
        <label>
          {/* <span className="mandatorycss">*</span> */}
          {t("PLACE OF MARRIAGE")}
        </label>
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
      {/* <SearchField>
       <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARTNER_DETAILS")}`}</span>{" "}
              </h1>
            </div>
          </div>
       </SearchField> */}
      <SearchField>
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
      </SearchField>
      <SearchField>
        <label> {t("CR_BRIDE_NAME")}</label>
        <TextInput
          name="brideFirstnameEn"
          inputRef={register({})}
          placeholder={`${t("CR_BRIDE_NAME")}`}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_BRIDE_NAME") })}
        />
      </SearchField>
      <SearchField>
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
      <SearchField>
        <label>
          {t("REGISTRATION NUMBER")}
        </label>
        <TextInput
          name="registrationNo"
          inputRef={register({})}
          placeholder={`${t("MARRIAGE_REGISTRATION_NUMBER")}`}
          {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })}
        />
      </SearchField>
      <SearchField className="submit">
        <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
        <p
          onClick={() => {
            reset({
              id: "",
              DeceasedName: "",
              DeathDate: "",
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
