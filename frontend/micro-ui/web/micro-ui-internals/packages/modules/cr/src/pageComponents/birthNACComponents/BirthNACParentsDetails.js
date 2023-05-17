import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const NACParentsDetails = ({ config, onSelect, userType, formData, isEditStillBirth, isEditStillBirthPageComponents }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "Qualification"
  );
  const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "QualificationSub"
  );
  const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: ReligionList = {}, isReligionListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const [isInitialRender, setIsInitialRender] = useState(true);
  let cmbfilterNation = [];
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];

  let cmbQualification = [];
  Qualification &&
    Qualification["birth-death-service"] &&
    Qualification["birth-death-service"].Qualification &&
    Qualification["birth-death-service"].Qualification.map((ob) => {
      cmbQualification.push(ob);
    });
  let cmbQualificationSub = [];
  QualificationSub &&
    QualificationSub["birth-death-service"] &&
    QualificationSub["birth-death-service"].QualificationSub &&
    QualificationSub["birth-death-service"].QualificationSub.map((ob) => {
      cmbQualificationSub.push(ob);
    });
  let cmbProfession = [];
  Profession &&
    Profession["birth-death-service"] &&
    Profession["birth-death-service"].Profession &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbProfession.push(ob);
    });

  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });

  let cmbReligion = [];
  ReligionList &&
    ReligionList["common-masters"] &&
    ReligionList["common-masters"].Religion &&
    ReligionList["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  const [motherAadhar, setMotherAadhar] = useState(
    formData?.BirthNACParentsDetails?.motherAadhar
      ? formData?.BirthNACParentsDetails?.motherAadhar
      : formData?.BirthNACDetails?.BirthNACParentsDetails?.motherAadhar
      ? formData?.BirthNACDetails?.BirthNACParentsDetails?.motherAadhar
      : null
  );

  const [motherFirstNameEn, setMotherFirstNameEn] = useState(
    formData?.BirthNACParentsDetails?.motherFirstNameEn
      ? formData?.BirthNACParentsDetails?.motherFirstNameEn
      : formData?.BirthNACDetails?.BirthNACParentsDetails?.motherFirstNameEn
      ? formData?.BirthNACDetails?.BirthNACParentsDetails?.motherFirstNameEn
      : ""
  );
  const [motherFirstNameMl, setMotherFirstNameMl] = useState(
    formData?.BirthNACParentsDetails?.motherFirstNameMl
      ? formData?.BirthNACParentsDetails?.motherFirstNameMl
      : formData?.BirthNACDetails?.BirthNACParentsDetails?.motherFirstNameMl
      ? formData?.BirthNACDetails?.BirthNACParentsDetails?.motherFirstNameMl
      : ""
  );

  const [fatherAadhar, setFatherAadhar] = useState(
    formData?.BirthNACParentsDetails?.fatherAadhar
      ? formData?.BirthNACParentsDetails?.fatherAadhar
      : formData?.BirthNACDetails?.BirthNACParentsDetails?.fatherAadhar
      ? formData?.BirthNACDetails?.BirthNACParentsDetails?.fatherAadhar
      : null
  );

  const [fatherFirstNameEn, setFatherFirstNameEn] = useState(
    formData?.BirthNACParentsDetails?.fatherFirstNameEn
      ? formData?.BirthNACParentsDetails?.fatherFirstNameEn
      : formData?.BirthNACDetails?.BirthNACParentsDetails?.fatherFirstNameEn
      ? formData?.BirthNACDetails?.BirthNACParentsDetails?.fatherFirstNameEn
      : ""
  );
  const [fatherFirstNameMl, setFatherFirstNameMl] = useState(
    formData?.BirthNACParentsDetails?.fatherFirstNameMl
      ? formData?.BirthNACParentsDetails?.fatherFirstNameMl
      : formData?.BirthNACDetails?.BirthNACParentsDetails?.fatherFirstNameMl
      ? formData?.BirthNACDetails?.BirthNACParentsDetails?.fatherFirstNameMl
      : ""
  );
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [toast, setToast] = useState(false);
  const [MotherAadharError, setMotherAadharError] = useState(formData?.BirthNACParentsDetails?.motherAadhar ? false : false);

  const [FatherAadharError, setFatherAadharError] = useState(formData?.BirthNACParentsDetails?.fatherAadhar ? false : false);
  const [AadharError, setAadharError] = useState(formData?.BirthNACParentsDetails?.motherAadhar ? false : false);

  const onSkip = () => onSelect();

  function setSelectMotherFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.trim().match("^[a-zA-Z]*$") != null) {
      setMotherFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  function setSelectMotherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern) && e.target.value.trim() !== " ") {
      e.preventDefault();
      setMotherFirstNameMl("");
    } else {
      setMotherFirstNameMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectMotherAadhar(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (newValue === formData?.BirthNACDetails.childAadharNo) {
      setMotherAadhar("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setMotherAadhar(newValue);
    }
  }

  function setSelectFatherAadhar(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (newValue === motherAadhar) {
      setFatherAadhar("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setFatherAadhar(newValue);
    }
  }

  function setSelectFatherFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.trim().match("^[a-zA-Z]*$") != null) {
      setFatherFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectFatherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setFatherFirstNameMl("");
    } else {
      setFatherFirstNameMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }

  let validFlag = true;
  const goNext = () => {
    if (motherAadhar != null || motherAadhar != "" || motherAadhar != undefined) {
      let adharLength = motherAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setMotherAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setMotherAadharError(false);
      }
    }
    //}
    if (fatherAadhar != null || fatherAadhar != "" || fatherAadhar != undefined) {
      let adharLength = fatherAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setFatherAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setFatherAadharError(false);
      }
    }

    if (validFlag == true) {
      onSelect(config.key, {
        motherFirstNameEn: motherFirstNameEn.toUpperCase().trim(),
        motherFirstNameMl: motherFirstNameMl.trim(),
        motherAadhar,
        fatherAadhar,
        fatherFirstNameEn: fatherFirstNameEn.toUpperCase().trim(),
        fatherFirstNameMl: fatherFirstNameMl.trim(),
      });
    }
  };

  if (isReligionListLoading || isQualificationLoading || isProfessionLoading || isCountryLoading || isNationLoad) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={!motherAadhar || !motherFirstNameEn || !motherFirstNameMl || !fatherAadhar || !fatherFirstNameEn || !fatherFirstNameMl}
        >
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CS_COMMON_AADHAAR")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="motherAadhar"
                    value={motherAadhar}
                    onChange={setSelectMotherAadhar}
                    onKeyPress={setCheckSpecialChar}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "test", isRequired: true, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_MOTHER_NAME_EN")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="motherFirstNameEn"
                    value={motherFirstNameEn}
                    onChange={setSelectMotherFirstNameEn}
                    placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_NAME_EN") })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_MOTHER_NAME_ML")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="motherFirstNameMl"
                    value={motherFirstNameMl}
                    onChange={setSelectMotherFirstNameMl}
                    onKeyPress={setCheckMalayalamInputField}
                    placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_MOTHER_NAME_ML"),
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CS_COMMON_AADHAAR")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="fatherAadhar"
                    value={fatherAadhar}
                    onChange={setSelectFatherAadhar}
                    onKeyPress={setCheckSpecialChar}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "test", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_FATHER_NAME_EN")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="fatherFirstNameEn"
                    value={fatherFirstNameEn}
                    disable={isEdit}
                    onChange={setSelectFatherFirstNameEn}
                    placeholder={`${t("CR_FATHER_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FATHER_NAME_EN") })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_FATHER_NAME_ML")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="fatherFirstNameMl"
                    value={fatherFirstNameMl}
                    onChange={setSelectFatherFirstNameMl}
                    onKeyPress={setCheckMalayalamInputField}
                    placeholder={`${t("CR_FATHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_FATHER_NAME_ML"),
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          {toast && (
            <Toast
              error={MotherAadharError || FatherAadharError || AadharError}
              label={
                MotherAadharError || FatherAadharError || AadharError
                  ? MotherAadharError
                    ? t(`CS_COMMON_INVALID_MOTHER_AADHAR_NO`)
                    : FatherAadharError
                    ? t(`CS_COMMON_INVALID_FATHER_AADHAR_NO`)
                    : AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}
        </FormStep>
      </React.Fragment>
    );
};
export default NACParentsDetails;
