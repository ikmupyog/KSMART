import {
    FormStep,
    CardLabel,
    TextInput,
    Dropdown,
    DatePicker,
    CheckBox,
    BackButton,
    Loader,
    EditButton,
    PopUp,
    UploadFile,
    SubmitBar,
    EditIcon,
    StatusTable,
    RefreshIcon,
    Accordion,
    FormBackButton,
  } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormFieldContainer from "../components/FormFieldContainer";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";
import { MARRIAGE_INCLUSION_FIELD_NAMES } from "../config/constants";

const CorrectionAddressDetails = ({ marriageCorrectionFormsObj, selectedConfig, onBrideAddressChange, setMarriageCorrectionFilterQuery, checkLangRequired, onChangeMalayalam }) => {
  const { t } = useTranslation();
  let validation = {};
  let formData = {};
  let docIdDetails = [];
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadDoc, setUploadDoc] = useState({});
  const fieldName = MARRIAGE_INCLUSION_FIELD_NAMES[selectedConfig?.documentData?.[0]?.CorrectionField];

  const FieldComponentContainer = (props) => {
    return <div className="col-md-11">{props.children}</div>;
  };
  const ButtonContainer = (props) => {
    return (
      <div className="col-md-1" style={{ cursor: "pointer", background: "#00B9F2", borderRadius: "12px", height: "35px", width: "35px" }}>
        {props.children}
      </div>
    );
  };



  return (
    <div>
      <FormFieldContainer>
        <FieldComponentContainer>
          <div className="col-md-6">
            <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              name="brideHouseNameEn"
              disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
              // autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
              defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.houseNameEn}
              onBlur={(e) => onBrideAddressChange(e, "houseNameEn")}
              placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
              {...(validation = {
                pattern: "^[a-zA-Z-.`'0-9 ]*$",
                type: "text",
                  isRequired: checkLangRequired("BRIDE_PERADD", "houseNameEn", "En"),
                title: t("CR_INVALID_HOUSE_NAME_EN"),
              })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              name="brideLocalityEn"
              disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
              // autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
              defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.localityNameEn}
              onBlur={(e) => onBrideAddressChange(e, "localityNameEn")}
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = {
                pattern: "^[a-zA-Z-.`'0-9 ]*$",
                type: "text",
                  isRequired: checkLangRequired("BRIDE_PERADD", "localityNameEn", "En"),
                title: t("CR_INVALID_LOCALITY_EN"),
              })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_EN")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              name="brideStreetEn"
              disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
              // autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
              defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.streetNameEn}
              onBlur={(e) => onBrideAddressChange(e, "streetNameEn")}
              placeholder={`${t("CR_STREET_EN")}`}
              {...(validation = {
                pattern: "^[a-zA-Z-.`'0-9 ]*$",
                type: "text",
                  isRequired: checkLangRequired("BRIDE_PERADD", "streetNameEn", "En"),
                title: t("CR_INVALID_STREET_NAME_EN"),
              })}
            />
          </div>
        </FieldComponentContainer>
        <div style={{ marginTop: "1.5rem" }}>
          {marriageCorrectionFormsObj?.BRIDE_PERADD?.isDisable && (
            <ButtonContainer>
              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["BRIDE_PERADD"])}>
                <EditIcon style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }} selected={true} label={"Edit"} />
              </span>
            </ButtonContainer>
          )}
        </div>
      </FormFieldContainer>
      <FormFieldContainer>
        <FieldComponentContainer>
          <div className="col-md-6">
            <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              name="brideHouseNameMl"
              defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.houseNameMl}
              disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
              // autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
              // onKeyPress={setCheckMalayalamInputField}
              onChange={(e) => onChangeMalayalam(e, "BRIDE_PERADD", "houseNameMl")}
              onBlur={(e) => onBrideAddressChange(e, "houseNameMl")}
              placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 -]*$",
                type: "text",
                  isRequired: checkLangRequired("BRIDE_PERADD", "houseNameMl"),
                title: t("CR_INVALID_HOUSE_NAME_ML"),
              })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              name="brideLocalityMl"
              defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.localityNameMl}
              disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
              // autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
              // onKeyPress={setCheckMalayalamInputField}
              onChange={(e) => onChangeMalayalam(e, "BRIDE_PERADD", "localityNameMl")}
              onBlur={(e) => onBrideAddressChange(e, "localityNameMl")}
              placeholder={`${t("CR_LOCALITY_MAL")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                type: "text",
                  isRequired: checkLangRequired("BRIDE_PERADD", "localityNameMl"),
                title: t("CR_INVALID_LOCALITY_ML"),
              })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_MAL")}`}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              name="brideStreetMl"
              defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.streetNameMl}
              disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
              // autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
              // onKeyPress={setCheckMalayalamInputField}
              onChange={(e) => onChangeMalayalam(e, "BRIDE_PERADD", "streetNameMl")}
              onBlur={(e) => onBrideAddressChange(e, "streetNameMl")}
              placeholder={`${t("CR_STREET_MAL")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                type: "text",
                  isRequired: checkLangRequired("BRIDE_PERADD", "streetNameMl"),
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
            />
          </div>
        </FieldComponentContainer>
      </FormFieldContainer>
    </div>
  );
};
export default CorrectionAddressDetails;
