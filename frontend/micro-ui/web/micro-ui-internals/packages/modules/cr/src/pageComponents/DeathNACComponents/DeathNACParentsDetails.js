import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton, Loader, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/NACDRTimeline";
import { useTranslation } from "react-i18next";

const DeathNACParentsDetails =({ config, onSelect, userType, formData, isEditStillBirth, isEditStillBirthPageComponents }) => {
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
  const { data: Spouse = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "SpouseType");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
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
  let cmbspouse = [];
  Spouse &&
    Spouse["birth-death-service"] && Spouse["birth-death-service"].spouseType &&
    Spouse["birth-death-service"].spouseType.map((ob) => {
      cmbspouse.push(ob);
    });
  const [SpouseType, setSpouseType] = useState(
    formData?.DeathNACParentsDetails?.SpouseType?.code
      ? formData?.DeathNACParentsDetails?.SpouseType
      : formData?.DeathNACParentsDetails?.SpouseType
        ? cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.DeathNACParentsDetails?.SpouseType)[0]
        : ""
  );
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
  const [motherAadhar, setMotherAadhar] = useState(formData?.DeathNACParentsDetails?.motherAadhar ? formData?.DeathNACParentsDetails?.motherAadhar : null);

  const [motherFirstNameEn, setMotherFirstNameEn] = useState(formData?.DeathNACParentsDetails?.motherFirstNameEn ? formData?.DeathNACParentsDetails?.motherFirstNameEn : "");
  const [motherFirstNameMl, setMotherFirstNameMl] = useState(formData?.DeathNACParentsDetails?.motherFirstNameMl ? formData?.DeathNACParentsDetails?.motherFirstNameMl : "");


  const [fatherAadhar, setFatherAadhar] = useState(formData?.DeathNACParentsDetails?.fatherAadhar ? formData?.DeathNACParentsDetails?.fatherAadhar : null);

  const [fatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.DeathNACParentsDetails?.fatherFirstNameEn ? formData?.DeathNACParentsDetails?.fatherFirstNameEn : "");
  const [fatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.DeathNACParentsDetails?.fatherFirstNameMl ? formData?.DeathNACParentsDetails?.fatherFirstNameMl : "");

  const [toast, setToast] = useState(false);
  const [MotherAadharError, setMotherAadharError] = useState(formData?.DeathNACParentsDetails?.motherAadhar ? false : false);

  const [SpouseAadhaarError, setSpuseAadhaarError] = useState(false);

  const [FatherAadharError, setFatherAadharError] = useState(formData?.DeathNACParentsDetails?.fatherAadhar ? false : false);
  const [FatherFirstNmeEnError, setFatherFirstNmeEnError] = useState(formData?.DeathNACParentsDetails?.fatherFirstNameEn ? false : false);
  const [FatherFirstNmeMlError, setFatherFirstNmeMlError] = useState(formData?.DeathNACParentsDetails?.fatherFirstNameMl ? false : false);
  const [SpouseUnavailable, setSpouseUnavailable] = useState(
    formData?.DeathNACParentsDetails?.SpouseUnavailable
      ? formData?.DeathNACParentsDetails?.SpouseUnavailable
      : false
  );
  const [SpouseNameEN, setSpouseNameEN] = useState(
    formData?.DeathNACParentsDetails?.SpouseNameEN ? formData?.DeathNACParentsDetails?.SpouseNameEN : ""
  );
  const [SpouseNameMl, setSpouseNameMl] = useState(
    formData?.DeathNACParentsDetails?.SpouseNameMl ? formData?.DeathNACParentsDetails?.SpouseNameMl : ""
  );
  const [SpouseAadhaar, setSpouseAadhaar] = useState(
    formData?.DeathNACParentsDetails?.SpouseAadhaar ? formData?.DeathNACParentsDetails?.SpouseAadhaar : ""
  );


  const onSkip = () => onSelect();

  function setSelectMotherFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z]*$") != null) {
      setMotherFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectMotherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setMotherFirstNameMl("");
    } else {
      setMotherFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectMotherAadhar(e) {

    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (newValue === SpouseAadhaar || newValue === fatherAadhar || newValue === formData?.DeathNACDetails.DeceasedAadharNumber){
      setMotherAadhar("");
      setMotherAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setMotherAadhar(newValue);
      setMotherAadharError(false);
    }
  }

  function setSelectFatherAadhar(e) {

    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (newValue === SpouseAadhaar || newValue === motherAadhar || newValue === formData?.DeathNACDetails.DeceasedAadharNumber){
      setFatherAadhar("");
      setFatherAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setFatherAadhar(newValue);
      setFatherAadharError(false);
    }
  }

  function setSelectFatherFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z]*$") != null) {
      setFatherFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectFatherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setFatherFirstNameMl("");
    } else {
      setFatherFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectSpouseType(value) {
    setSpouseType(value);
  }
  function setSelectSpouseNameEN(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setSpouseNameEN(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectSpouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setSpouseNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }

  function setSelectSpouseAadhaar(e) {

    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    if (newValue === formData?.DeathNACDetails.DeceasedAadharNumber || newValue === motherAadhar || newValue === fatherAadhar){
      setSpouseAadhaar("");
      setSpuseAadhaarError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
    else{
      setSpouseAadhaar(newValue);
      setSpuseAadhaarError(false);
    }
  }

  function setMotherInfo(e) {
    if (e.target.checked == true) {
      //setIsMotherInfo(e.target.checked);
      setMotherFirstNameEn("");
      setMotherFirstNameMl("");
      setMotherAadhar("");
      setIsMotherInfo(e.target.checked);
    }
  }
  function setFatherInfo(e) {
    if (e.target.checked == true) {
      //setIsFatherInfo(e.target.checked);
      setFatherAadhar("");
      setFatherFirstNameEn("");
      setFatherFirstNameMl("");
    } else {
      //setIsFatherInfo(e.target.checked);
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }

  let validFlag = true;
  const goNext = () => {
    // if (isMotherInfo === false) {
    // if (motherAadhar != null || motherAadhar != "" || motherAadhar != undefined) {
    //   if (MotherAadharError) {
    //     validFlag = false;
    //     setMotherAadharError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //     // return false;
    //     // window.alert("Username shouldn't exceed 10 characters")
    //   } else {
    //     setMotherAadharError(false);
    //   }
    // }
    // //}
    // if (fatherAadhar != null || fatherAadhar != "" || fatherAadhar != undefined) {
    //   let adharLength = fatherAadhar;
    //   console.log(adharLength);
    //   if (adharLength.length < 12 || adharLength.length > 12) {
    //     validFlag = false;
    //     setFatherAadharError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setFatherAadharError(false);
    //   }
    // }
  

    if (validFlag == true) {
      sessionStorage.setItem("motherFirstNameEn", motherFirstNameEn ? motherFirstNameEn : null);
      sessionStorage.setItem("motherFirstNameMl", motherFirstNameMl ? motherFirstNameMl : null);
      sessionStorage.setItem("motherAadhar", motherAadhar ? motherAadhar : null);
      //sessionStorage.setItem("isMotherInfo", isMotherInfo ? isMotherInfo : null);
      //sessionStorage.setItem("isFatherInfo", isFatherInfo ? isFatherInfo : null);
      sessionStorage.setItem("fatherAadhar", fatherAadhar ? fatherAadhar : null);
      sessionStorage.setItem("fatherFirstNameEn", fatherFirstNameEn ? fatherFirstNameEn : null);
      sessionStorage.setItem("fatherFirstNameMl", fatherFirstNameMl ? fatherFirstNameMl : null);

      onSelect(config.key, {
        motherFirstNameEn,
        motherFirstNameMl,
        motherAadhar,

        fatherAadhar,
        //isMotherInfo,
        //isFatherInfo,
        fatherFirstNameEn,
        fatherFirstNameMl,
        SpouseType,
        SpouseNameEN,
        SpouseNameMl,
        SpouseAadhaar,
        SpouseUnavailable,
      });
    }
  };

  if (isReligionListLoading || isQualificationLoading || isProfessionLoading || isCountryLoading || isNationLoad) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
        // isDisabled={
        //   !fatherMobile ||
        //   (isMotherInfo === false
        //     ? motherFirstNameEn === "" ||
        //       motherFirstNameMl === "" ||
        //       !motherNationality ||
        //       motherMarriageBirth === "" ||
        //       orderofChildren === "" ||
        //       !motherEducation ||
        //       !motherProfession
        //     : false) ||
        //   (isFatherInfo === false
        //     ? fatherFirstNameEn === "" || fatherFirstNameMl === "" || !fatherNationality || !fatherEducation || !fatherProfession
        //     : false) ||
        //   !Religion ||
        //   fatherMobile === ""
        // }
        >
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CheckBox
                  label={t("CR_SPOUSE_UNAVAILABLE")}
                  onChange={() => setSpouseUnavailable(!SpouseUnavailable)}
                  value={SpouseUnavailable}
                  checked={SpouseUnavailable}
                />
              </div>
            </div>
          </div>
          {
            SpouseUnavailable ? null : (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SPOUSE_DETAILS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardLabel>
                        {`${t("CR_SPOUSE_TYPE_EN")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <Dropdown
                        t={t}
                        optionKey="name"
                        isMandatory={false}
                        option={cmbspouse}
                        selected={SpouseType}
                        select={setSelectSpouseType}
                        placeholder={`${t("CR_SPOUSE_TYPE_EN")}`}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>
                        {`${t("CR_NAME")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="SpouseNameEN"
                        value={SpouseNameEN}
                        onChange={setSelectSpouseNameEN}
                        placeholder={`${t("CR_NAME")}`}
                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>
                        {`${t("CR_NAME_ML")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="SpouseNameMl"
                        value={SpouseNameMl}
                        onChange={setSelectSpouseNameMl}
                        placeholder={`${t("CR_NAME_ML")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: true,
                          type: "text",
                          title: t("CR_INVALID_NAME_ML"),
                        })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type="number"
                        min="12"
                        max="12"
                        optionKey="i18nKey"
                        name="SpouseAadhaar"
                        value={SpouseAadhaar}
                        onChange={setSelectSpouseAadhaar}
                        placeholder={`${t("CS_COMMON_AADHAAR")}`}
                        {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              // <div>Availables</div>
            )
          }
          {/* {isMotherInfo === false && ( */}
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
                    disable={isDisableEdit}
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
                    disable={isDisableEdit}
                    placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_MOTHER_NAME_ML"),
                    })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    optionKey="i18nKey"
                    min="12"
                    max="12"
                    name="motherAadhar"
                    value={motherAadhar}
                    onChange={setSelectMotherAadhar}
                    disable={isDisableEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* // )} */}

          {/* {isFatherInfo === false && ( */}
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
                    onChange={setSelectFatherFirstNameEn}
                    disable={isDisableEdit}
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
                    disable={isDisableEdit}
                    placeholder={`${t("CR_FATHER_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_FATHER_NAME_ML"),
                    })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    min="12"
                    max="12"
                    name="fatherAadhar"
                    value={fatherAadhar}
                    onChange={setSelectFatherAadhar}
                    disable={isDisableEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>

          </div>
          {/* )} */}

          {/* {toast && (
            <Toast
              error={
                MotherAadharError ||
                MotherBirthageError ||
                MotherEducationError ||
                MotherProfessionError ||
                MotherNationalityError ||
                FatherAadharError ||
                FatherFirstNmeEnError ||
                FatherEduError ||
                FatherProfError ||
                FatherMobileError ||
                ReligionError ||
                OrderofChildrenError
              }
              label={
                MotherAadharError ||
                MotherBirthageError ||
                MotherEducationError ||
                MotherProfessionError ||
                MotherNationalityError ||
                FatherAadharError ||
                FatherFirstNmeEnError ||
                FatherEduError ||
                FatherProfError ||
                FatherMobileError ||
                ReligionError ||
                OrderofChildrenError
                  ? MotherAadharError
                    ? t(`CS_COMMON_INVALID_MOTHER_AADHAR_NO`)
                    : MotherBirthageError
                    ? t(`CR_INVALID_MOTHER_AGE_AT_BIRTH`)
                    : MotherEducationError
                    ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`)
                    : MotherProfessionError
                    ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`)
                    : MotherNationalityError
                    ? t(`BIRTH_ERROR_MOTHER_NATIONALITY_CHOOSE`)
                    : OrderofChildrenError
                    ? t(`BIRTH_ERROR_ORDER_OF_CHILDREN`)
                    : FatherAadharError
                    ? t(`CS_COMMON_INVALID_FATHER_AADHAR_NO`)
                    : FatherFirstNmeEnError
                    ? t(`CR_INVALID_FATHER_NAME_EN`)
                    : FatherEduError
                    ? t(`BIRTH_ERROR_FATHER_EDUCATION_CHOOSE`)
                    : FatherProfError
                    ? t(`BIRTH_ERROR_FATHER_PROFESSION_CHOOSE`)
                    : ReligionError
                    ? t(`BIRTH_ERROR_RELIGION_CHOOSE`)
                    : FatherMobileError
                    ? t(`CR_INVALID_MOBILE_NO`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )} */}
          {toast && (
            <Toast
              error={SpouseAadhaarError || MotherAadharError || FatherAadharError}
              label={
                MotherAadharError || FatherAadharError || SpouseAadhaarError
                  ? MotherAadharError
                    ? t(`CS_COMMON_INVALID_MOTHER_AADHAR_NO`)
                    : FatherAadharError
                    ? t(`CS_COMMON_INVALID_FATHER_AADHAR_NO`)
                    : SpouseAadhaarError
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
export default DeathNACParentsDetails;
