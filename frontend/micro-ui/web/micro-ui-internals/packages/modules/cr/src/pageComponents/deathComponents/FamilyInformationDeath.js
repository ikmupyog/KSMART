import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, CheckBox, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const FamilyInformationBirth = ({ config, onSelect, userType, formData, iseditDeath }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: Spouse = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "SpouseType");
  let cmbspouse = [];
  Spouse &&
    Spouse["birth-death-service"] &&
    Spouse["birth-death-service"].SpouseType.map((ob) => {
      cmbspouse.push(ob);
    });
    const [SpouseType, setSpouseType] = useState(formData?.FamilyInformationDeath?.SpouseType?.code ? formData?.FamilyInformationDeath?.SpouseType : formData?.FamilyInformationDeath?.SpouseType ?
      (cmbspouse.filter(cmbspouse => cmbspouse.code === formData?.FamilyInformationDeath?.SpouseType)[0]) : "");
  const [SpouseUnavailable, setSpouseUnavailable] = useState(
    formData?.FamilyInformationDeath?.SpouseUnavailable
      ? formData?.FamilyInformationDeath?.SpouseUnavailable
      : formData?.FamilyInformationDeath?.SpouseUnavailable
      ? formData?.FamilyInformationDeath?.SpouseUnavailable
      : false
  );
  // const [Nationality, setSelectedNationality] = useState(
  //   formData?.InformationDeath?.Nationality?.code
  //     ? formData?.InformationDeath?.Nationality
  //     : formData?.InformationDeath?.Nationality
  //     ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.InformationDeath?.Nationality)[0]
  //     : ""
  // );
  // const [SpouseType, setSpouseType] = useState(
  //   formData?.FamilyInformationDeath?.SpouseType?.code
  //     ? formData?.FamilyInformationDeath?.SpouseType
  //     : formData?.FamilyInformationDeath?.SpouseType
  //     ? cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.InformationDeath?.SpouseType)[0]
  //     : null
  // );
    const [SpouseNameEN, setSpouseNameEN] = useState(iseditDeath ? formData?.FamilyInformationDeath?.SpouseNameEN ?. formData?.FamilyInformationDeath?.SpouseNameEN : "");

  // const [SpouseNameEN, setSpouseNameEN] = useState(
  //   formData?.FamilyInformationDeath?.SpouseNameEN ? formData?.FamilyInformationDeath?.SpouseNameEN : ""
  // );
  const [SpouseNameMl, setSpouseNameMl] = useState(
    formData?.FamilyInformationDeath?.SpouseNameMl ? formData?.FamilyInformationDeath?.SpouseNameMl : ""
  );
  const [SpouseAadhaar, setSpouseAadhaar] = useState(
    formData?.FamilyInformationDeath?.SpouseAadhaar ? formData?.FamilyInformationDeath?.SpouseAadhaar : ""
  );

  const [FatherUnavailable, setFatherUnavailable] = useState(
    formData?.FamilyInformationDeath?.FatherUnavailable
      ? formData?.FamilyInformationDeath?.FatherUnavailable
      : formData?.FamilyInformationDeath?.FatherUnavailable
      ? formData?.FamilyInformationDeath?.FatherUnavailable
      : false
  );
  const [FatherNameEn, setFatherNameEn] = useState(
    formData?.FamilyInformationDeath?.FatherNameEn ? formData?.FamilyInformationDeath?.FatherNameEn : ""
  );
  const [FatherNameMl, setFatherNameMl] = useState(
    formData?.FamilyInformationDeath?.FatherNameMl ? formData?.FamilyInformationDeath?.FatherNameMl : ""
  );
  const [FatherAadharNo, setFatherAadharNo] = useState(
    formData?.FamilyInformationDeath?.FatherAadharNo ? formData?.FamilyInformationDeath?.FatherAadharNo : ""
  );
  const [MotherUnavailable, setMotherUnavailable] = useState(
    formData?.FamilyInformationDeath?.MotherUnavailable ? formData?.FamilyInformationDeath?.MotherUnavailable : false
  );
  const [MotherNameEn, setMotherNameEn] = useState(
    formData?.FamilyInformationDeath?.MotherNameEn ? formData?.FamilyInformationDeath?.MotherNameEn : ""
  );
  const [MotherNameMl, setMotherNameMl] = useState(
    formData?.FamilyInformationDeath?.MotherNameMl ? formData?.FamilyInformationDeath?.MotherNameMl : ""
  );
  const [MotherAadharNo, setMotherAadharNo] = useState(
    formData?.FamilyInformationDeath?.MotherAadharNo ? formData?.FamilyInformationDeath?.MotherAadharNo : ""
  );

  const [FamilyMobileNo, setFamilyMobileNo] = useState(
    formData?.FamilyInformationDeath?.FamilyMobileNo ? formData?.FamilyInformationDeath?.FamilyMobileNo : ""
  );

  const [FamilyEmailId, setFamilyEmailId] = useState(
    formData?.FamilyInformationDeath?.FamilyEmailId ? formData?.FamilyInformationDeath?.FamilyEmailId : ""
  );

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let naturetypecmbvalue = null;

  const onSkip = () => onSelect();

  function setSelectFatherNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectFatherNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setFatherNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectFatherAadharNo(e) {
    if (e.target.value != null || e.target.value != "") {
      if (e.target.value.length <= 12) {
        if (e.target.value < 12) {
          setFatherAadharNo(e.target.value);
          // setMotherAgeMarriageError(true);
          return false;
        } else {
          setFatherAadharNo(e.target.value);
          // setMotherAgeMarriageError(false);
        }
      } else {
        // setMotherAgeMarriageError(true);
        return false;
      }
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
    // setSpouseAdharNo(e.target.value);
    if (e.target.value != null || e.target.value != "") {
      if (e.target.value.length <= 12) {
        if (e.target.value < 12) {
          setSpouseAadhaar(e.target.value);
          // setMotherAgeMarriageError(true);
          return false;
        } else {
          setSpouseAadhaar(e.target.value);
          // setMotherAgeMarriageError(false);
        }
      } else {
        console.log(e.target.value.length);
        // setMotherAgeMarriageError(true);
        return false;
      }
    }
  }

  function setSelectMotherNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectMotherNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMotherNameMl(
        e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
      );
    }
  }
  function setSelectMotherAadharNo(e) {
    if (e.target.value != null || e.target.value != "") {
      if (e.target.value.length <= 12) {
        if (e.target.value < 12) {
          setMotherAadharNo(e.target.value);
          // setMotherAgeMarriageError(true);
          return false;
        } else {
          setMotherAadharNo(e.target.value);
          // setMotherAgeMarriageError(false);
        }
      } else {
        // setMotherAgeMarriageError(true);
        return false;
      }
    }
  }
  function setSelectFamilyMobileNo(e) {
    if (e.target.value != null || e.target.value != "") {
      if (e.target.value.length <= 10) {
        if (e.target.value < 10) {
          setFamilyMobileNo(e.target.value);
          // setMotherAgeMarriageError(true);
          return false;
        } else {
          setFamilyMobileNo(e.target.value);
          // setMotherAgeMarriageError(false);
        }
      } else {
        // setMotherAgeMarriageError(true);
        return false;
      }
    }
  }
  function setSelectFamilyEmailId(e) {
    setFamilyEmailId(e.target.value);
  }

  const goNext = () => {
    sessionStorage.setItem("SpouseType", SpouseType ? SpouseType.code : null);
    // sessionStorage.setItem("setTitleB", setTitleB ? setTitleB.code : null);
    sessionStorage.setItem("SpouseNameEN", SpouseNameEN ? SpouseNameEN : null);
    sessionStorage.setItem("SpouseNameMl", SpouseNameMl ? SpouseNameMl : null);
    sessionStorage.setItem("SpouseAadhaar", SpouseAadhaar ? SpouseAadhaar : null);

    sessionStorage.setItem("FatherNameEn", FatherNameEn ? FatherNameEn : null);
    sessionStorage.setItem("FatherNameMl", FatherNameMl ? FatherNameMl : null);
    sessionStorage.setItem("FatherAadharNo", FatherAadharNo ? FatherAadharNo : null);
    // sessionStorage.setItem("FatherMobile", FatherMobile ? FatherMobile : null);

    sessionStorage.setItem("MotherNameEn", MotherNameEn ? MotherNameEn : null);
    sessionStorage.setItem("MotherNameMl", MotherNameMl ? MotherNameMl : null);
    sessionStorage.setItem("MotherAadharNo", MotherAadharNo ? MotherAadharNo : null);
    // sessionStorage.setItem("MotherEmail", MotherEmail ? MotherEmail : null);
    // sessionStorage.setItem("MotherMobile", MotherMobile ? MotherMobile : null);

    sessionStorage.setItem("FatherUnavailable", FatherUnavailable);
    sessionStorage.setItem("MotherUnavailable", MotherUnavailable);
    sessionStorage.setItem("SpouseUnavailable", SpouseUnavailable);

    sessionStorage.setItem("FamilyMobileNo", FamilyMobileNo);
    sessionStorage.setItem("FamilyEmailId", FamilyEmailId);

    onSelect(config.key, {
      SpouseType,
      SpouseNameEN,
      SpouseNameMl,
      SpouseAadhaar,
      FatherNameEn,
      FatherNameMl,
      FatherAadharNo,
      MotherNameEn,
      MotherNameMl,
      MotherAadharNo,
      FatherUnavailable,
      MotherUnavailable,
      SpouseUnavailable,
      FamilyMobileNo,
      FamilyEmailId,
    });
  };
  
  if (iseditDeath) {

    if (formData?.FamilyInformationDeath?.SpouseType != null) {
      if (cmbspouse.length > 0 && (SpouseType === undefined || SpouseType === "")) {
        setSpouseType(cmbspouse.filter(cmbspouse => cmbspouse.code === formData?.FamilyInformationDeath?.SpouseType)[0]);
      }
    }
  }
    // if (formData?.ChildDetails?.medicalAttensionSub != null) {
    //   if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
    //     setMedicalAttensionSub(cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]);
    //   }
    // }
    // if (formData?.ChildDetails?.pregnancyDuration != null) {
    //   console.log("pregnancyDuration" + pregnancyDuration);
    //   if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
    //     setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.ChildDetails?.pregnancyDuration)[0]);
    //   }
    // }
    // if (formData?.ChildDetails?.deliveryMethods != null) {
    //   if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
    //     // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.ChildDetails?.deliveryMethods)[0]);
    //     setDeliveryMethod(cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]);
    //   }
    // }
  
  const [inputValue, setInputValue] = useState("");

  const handleBlur = (event) => {
    const value = event.target.value;
    if (value.length > 12) {
      setInputValue(value.slice(0, 12));
    } else {
      setInputValue(value);
    }
  };
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}

      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FAMILY_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>

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
        {SpouseUnavailable ? null : (
          // <div style={{ pointerEvents: isSpouseChecked ? "none" : "all", opacity: isSpouseChecked ? 0.5 : 1 }}>
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
                    disabled={isEdit}
                    placeholder={`${t("CR_SPOUSE_TYPE_EN")}`}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_NAME_EN")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseNameEN"
                    value={SpouseNameEN}
                    onChange={setSelectSpouseNameEN}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
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
                    disable={isEdit}
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
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    optionKey="i18nKey"
                    name="SpouseAadhaar"
                    value={SpouseAadhaar}
                    defaultValue={inputValue}
                    onBlur={handleBlur}
                    onChange={setSelectSpouseAadhaar}
                    disable={isEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox
                label={t("CR_FATHER_UNAVAILABLE")}
                onChange={() => setFatherUnavailable(!FatherUnavailable)}
                value={FatherUnavailable}
                checked={FatherUnavailable}
              />
            </div>
          </div>
        </div>
        {FatherUnavailable ? null : (
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_DETAILS")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME_EN")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherNameEn"
                    value={FatherNameEn}
                    onChange={setSelectFatherNameEn}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME_ML")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherNameMl"
                    value={FatherNameMl}
                    onChange={setSelectFatherNameMl}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherAadharNo"
                    value={FatherAadharNo}
                    onChange={setSelectFatherAadharNo}
                    disable={isEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "number", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox
                label={t("CR_MOTHER_UNAVAILABLE")}
                onChange={() => setMotherUnavailable(!MotherUnavailable)}
                value={MotherUnavailable}
                checked={MotherUnavailable}
              />
            </div>
          </div>
        </div>
        {MotherUnavailable ? null : (
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DETAILS_OF_MOTHER")}`}</span>
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME_EN")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MotherNameEn"
                    value={MotherNameEn}
                    onChange={setSelectMotherNameEn}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME_ML")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MotherNameMl"
                    value={MotherNameMl}
                    onChange={setSelectMotherNameMl}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MotherAadharNo"
                    value={MotherAadharNo}
                    onChange={setSelectMotherAadharNo}
                    disable={isEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CONTACT_DETAILS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_FAMILY_MOBILE_NO")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="FamilyMobileNo"
                value={FamilyMobileNo}
                onChange={setSelectFamilyMobileNo}
                disable={isEdit}
                placeholder={`${t("CR_FAMILY_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9 ]*$", isRequired: false, type: "text", title: t("CR_INVALID_PHONE_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_EMAIL_ID")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"email"}
                optionKey="i18nKey"
                name="FamilyEmailId"
                value={FamilyEmailId}
                onChange={setSelectFamilyEmailId}
                disable={isEdit}
                placeholder={`${t("CR_EMAIL_ID")}`}
                {...(validation = { isRequired: false, type: "email", title: t("CR_INVALID_EMAIL_ID") })}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default FamilyInformationBirth;
