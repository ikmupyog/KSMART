import React, { useEffect, useState } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  NewRadioButton,
  TextArea,
  SubmitBar,
  BackButton,
  Header,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Timeline from "../../../components/DRTimeline";

const DeathCertificate = ({ config, onSelect, userType, formData, onSubmit }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  let validation = {};
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const { data: Menu } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");

  const [Name, setName] = useState(formData?.ApplicantDetails?.Name);
  const [WifeorMotherName, setWifeOrMotherName] = useState(formData?.ApplicantDetails?.WifeorMotherName);
  const [HusbandorfatherName, setHusbandorfatherName] = useState(formData?.ApplicantDetails?.HusbandorfatherName);
  const [RegistrationNumber, setRegistrationNumber] = useState(formData?.ApplicantDetails?.RegistrationNumber);
  const [HospitalName, selectHospitalName] = useState(formData?.HospitalDetails?.HospitalName);
  const [DeathDate, setDeathDate] = useState(formData?.InformationDeath?.DeathDate);
  const [Gender, selectGender] = useState(formData?.InformationDeath?.Gender);
  const [payloadData, setPayloadData] = useState({});

  const [GeneralRemarks, setGeneralRemarks] = useState(formData?.GeneralRemarks?.GeneralRemarks);
  let naturetypecmbvalue = null;
  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `DC_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  let cmbhospital = [];
  hospital &&
    hospital["birth-death-service"] &&
    hospital["birth-death-service"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
  const onSkip = () => onSelect();
  // function setSelectGeneralRemarks(e) {
  //   setGeneralRemarks(e.target.value);
  // }
  const goNext = () => {
    // console.log("test");
    sessionStorage.setItem("GeneralRemarks", GeneralRemarks);
    onSelect(config.key, { GeneralRemarks });
  };
  const handleSearch = () => {
    console.log("loged");
    let payload = {
      tenantId: "kl.cochin",
      id: "10f2381d-48a4-4ce3-8ad7-c4199a45b677",
    };
    setPayloadData(payload);
    const config = {
      enabled: !!(payload && Object.keys(payload).length > 0),
    };
    onSubmit(payloadData);
  };
  function setSelectWifeOrMotherName(e) {
    setWifeOrMotherName(e.target.value);
  }
  function setSelectHusbandorfatherName(e) {
    setHusbandorfatherName(e.target.value);
  }
  function setSelectRegistrationNumber(e) {
    setRegistrationNumber(e.target.value);
  }
  function setSelectName(e) {
    setName(e.target.value);
  }
  function selectDeathDate(value) {
    setDeathDate(value);
  }
  function setselectGender(value) {
    selectGender(value);
  }
  function setselectHospitalName(value) {
    selectHospitalName(value);
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <Header className="cr-header">DEATH CERTIFICATE</Header>
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  <span className="mandatorycss">*</span>
                  {t("DC_NAME_DECEASED")}
                </CardLabel>

                <TextInput
                  t={t}
                  isMandatory={true}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedName"
                  value={Name}
                  onChange={setSelectName}
                  disable={isEdit}
                  placeholder={`${t("DC_NAME_DECEASED")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_DECEASED") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  <span className="mandatorycss">*</span>
                  {t("DC_DATE_DEATH")}
                </CardLabel>
                <span>
                  <DatePicker
                    date={DeathDate}
                    name="DeathDate"
                    onChange={selectDeathDate}
                    {...(validation = {
                      pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_DATE"),
                    })}
                  />
                </span>
              </div>
              <div className="col-md-4">
                <CardLabel>
                  <span className="mandatorycss">*</span>
                  {t("DC_GENDER")}{" "}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={menu}
                  selected={Gender}
                  select={setselectGender}
                  disabled={isEdit}
                  placeholder={`${t("DC_GENDER")}`}
                  {...(validation = { isRequired: false, title: t("DC_INVALID_GENDER") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>{t("DC_NAME_MOTHER_OR_WIFE")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="WifeorMotherName"
                  value={WifeorMotherName}
                  onChange={setSelectWifeOrMotherName}
                  disable={isEdit}
                  placeholder={`${t("DC_NAME_MOTHER_OR_WIFE")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_NAME_MOTHER_OR_WIFE") })}
                />
              </div>
              <div>
                <div className="col-md-4">
                  <CardLabel>{t("DC_NAME_FATHER_OR_HUSBAND")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="HusbandorfatherName"
                    value={HusbandorfatherName}
                    onChange={setSelectHusbandorfatherName}
                    disable={isEdit}
                    placeholder={`${t("DC_NAME_FATHER_OR_HUSBAND")}`}
                    {...(validation = {
                      pattern: "^[a-zA-Z-.`' ]*$",
                      isRequired: false,
                      type: "text",
                      title: t("DC_INVALID_NAME_FATHER_OR_HUSBAND"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CD_HOSPITAL")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="hospitalName"
                    isMandatory={false}
                    option={cmbhospital}
                    selected={HospitalName}
                    select={setselectHospitalName}
                    placeholder={`${t("CD_HOSPITAL")}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>{t("DC_REGISTRATION_NUMBER")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="RegistrationNumber"
                  value={RegistrationNumber}
                  onChange={setSelectRegistrationNumber}
                  disable={isEdit}
                  placeholder={`${t("DC_REGISTRATION_NUMBER")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DC_INVALID_REGISTRATION_NUMBER") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <SubmitBar label={t("ES_COMMON_SEARCH")} onSubmit={() => handleSearch()} />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default DeathCertificate;
