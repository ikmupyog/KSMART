import React, { useState, useEffect } from "react";
import {FormStep, CardLabel, TextInput,Dropdown, BackButton,DatePicker,RadioButtons,LabelFieldPair,CheckBox,Toast,} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/ADTimeline";
import { useTranslation } from "react-i18next";

const AdoptionDetails = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderRadioButtons, setisInitialRenderRadioButtons] = useState(true);
  const [isInitialRenderRadio, setIsInitialRenderRadio] = useState(true);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [AdoptionAgencyName, setAdoptionAgencyName] = useState(formData?.AdoptionDetails?.AdoptionAgencyName);
  const [AdoptionAgencyAddress, setAdoptionAgencyAddress] = useState(formData?.AdoptionDetails?.AdoptionAgencyAddress);

  const [selectedValueRadio, setSelectedValue] = useState(formData?.AdoptionDetails?.selectedValueRadio ? formData?.AdoptionDetails?.selectedValueRadio : "" );
  const [valueRad, setValueRad] = useState(formData?.AdoptionDetails?.selectedValueRadio ? formData?.AdoptionDetails?.selectedValueRadio : "");
  const [toast, setToast] = useState(false);
  const [AdoptiveFirstNameEn, setAdoptiveFirstNameEn] = useState(formData?.AdoptionDetails?.AdoptiveFirstNameEn ? formData?.AdoptionDetails?.AdoptiveFirstNameEn : "" );
  const [AdoptiveMiddleNameEn, setAdoptiveMiddleNameEn] = useState(formData?.AdoptionDetails?.AdoptiveMiddleNameEn ? formData?.AdoptionDetails?.AdoptiveMiddleNameEn : ""
  );
  const [AdoptiveLastNameEn, setAdoptiveLastNameEn] = useState(formData?.AdoptionDetails?.AdoptiveLastNameEn ? formData?.AdoptionDetails?.AdoptiveLastNameEn : "" );
  const [AdoptiveFirstNameMl, setAdoptiveFirstNameMl] = useState(formData?.AdoptionDetails?.AdoptiveFirstNameMl ? formData?.AdoptionDetails?.AdoptiveFirstNameMl : "" );
  const [AdoptiveMiddleNameMl, setAdoptiveMiddleNameMl] = useState(formData?.AdoptionDetails?.AdoptiveMiddleNameMl ? formData?.AdoptionDetails?.AdoptiveMiddleNameMl : "");
  const [AdoptiveLastNameMl, setAdoptiveLastNameMl] = useState(formData?.AdoptionDetails?.AdoptiveLastNameMl ? formData?.AdoptionDetails?.AdoptiveLastNameMl : "" );
  const [AdoptiveDOB, setAdoptiveDOB] = useState(formData?.AdoptiveDetails?.AdoptiveDOB ? formData?.AdoptionDetails?.AdoptiveDOB : "");
  const [Gender, selectGender] = useState(formData?.AdoptiveDetails?.Gender ? formData?.AdoptionDetails?.Gender : "");
  const [AdoptiveBirthPlace, setAdoptiveBirthPlace] = useState(formData?.AdoptionDetails?.AdoptiveBirthPlace );
  const [AdoptionDeedNo, setAdoptionDeedNo] = useState(formData?.AdoptionDetails?.AdoptionDeedNo);
  const [AdoptionIssuingAthority, setAdoptionIssuingAthority] = useState(formData?.AdoptionDetails?.AdoptionIssuingAthority);
  const [AdoptionOrderDate, setAdoptionOrderDate] = useState(formData?.AdoptionDetails?.AdoptionOrderDate);
  const [AdoptionContactName, setAdoptionContactName] = useState(formData?.AdoptionDetails?.AdoptionContactName);
  // const [AdoptiveAadharHIde, setAdoptiveAadharHIde] = useState(formData?.AdoptiveDetails?.AdoptiveAadharNo ? true : false);
  const [AdoptiveAadharNo, setAdoptiveAadharNo] = useState(formData?.AdoptionDetails?.AdoptiveAadharNo ? formData?.AdoptionDetails?.AdoptiveAadharNo : "" );
  const [ContactMobile, setContactMobile] = useState(formData?.AdoptionDetails?.ContactMobile ? formData?.AdoptionDetails?.ContactMobile : "");
 
  const [isDob, setIsDob] = useState(formData?.AdoptionDetails?.isDob ? formData?.AdoptionDetails?.isDob : false);
  const [isAdoptAgency, setIsAdoptAgency] = useState(formData?.AdoptionDetails?.isAdoptAgency ? formData?.AdoptionDetails?.isAdoptAgency : false);
  const [ContactMobileError, setContactMobileError] = useState(formData?.AdoptionDetails?.ContactMobile ? false : false);
  const [AadharError, setAadharError] = useState(formData?.AdoptionDetails?.AdoptiveAadharNo ? false : false);
  const [DOBError, setDOBError] = useState(formData?.AdoptionDetails?.AdoptiveDOB ? false : false);
  const [GendError, setGendError] = useState(formData?.AdoptionDetails?.Gender ? false : false);

  const [access, setAccess] = React.useState(true);
  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  useEffect(() => {
    if (isInitialRenderRadioButtons) {
      setisInitialRenderRadioButtons(false);
      if (selectedValueRadio) {
        setIsInitialRenderRadio(false);
        setValueRad(selectedValueRadio.code);
      }
    }
  }, [isInitialRenderRadioButtons]);

  const menus = [
    { i18nKey: "CR_YES", code: "YES" },
    { i18nKey: "CR_NO", code: "NO" },
  ];

  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.AdoptionDetails?.isDob != null) {
        setIsInitialRender(false);
        setIsDob(formData?.AdoptionDetails?.isDob);
      }
    }
  }, [isInitialRender]);

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.AdoptionDetails?.isAdoptAgency != null) {
        setIsInitialRender(false);
        setIsAdoptAgency(formData?.AdoptionDetails?.isAdoptAgency);
      }
    }
  }, [isInitialRender]);

  function setSelectAdoptionDeedNo(e) {
    setAdoptionDeedNo(e.target.value);
  }
  // function setSelectAdoptionIssuingAthority(e) {
  //     setAdoptionIssuingAthority(e.target.value);
  // }
  function setselectAdoptionOrderDate(value) {
    setAdoptionOrderDate(value);
  }
  function setselectAdoptiveDOB(value) {
    setAdoptiveDOB(value);
  }
  function setSelectAdoptionAgencyName(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptionAgencyName(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdoptionAgencyAddress(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptionAgencyAddress(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdoptionContactName(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptionContactName(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function selectRadioButtons(value) {
    console.log(value);
    setSelectedValue(value);
    setValueRad(value.code);
    setisInitialRenderRadioButtons(true);
  }

  function setSelectAdoptionIssuingAthority(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptionIssuingAthority(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  
  function setSelectAdoptiveAadharNo(e) {
    if (e.target.value.length != 0) {

        if (e.target.value.length > 12) {
          
            setAadharError(true);
         
        } else if (e.target.value.length < 12) {
          setAadharError(true);
          setAdoptiveAadharNo(e.target.value);
            return false;
        }
        else {
          setAadharError(false);
          setAdoptiveAadharNo(e.target.value);
            return true;
        }
    } else {
      setAadharError(false);
      setAdoptiveAadharNo(e.target.value);
        return true;
    }

}

  function setSelectContactMobile(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        setContactMobileError(true);
      } else if (e.target.value.length < 10) {
        setContactMobileError(true);
        setContactMobile(e.target.value);
        return false;
      } else {
        setContactMobileError(false);
        setContactMobile(e.target.value);
        return true;
      }
    } else {
      setContactMobileError(false);
      setContactMobile(e.target.value);
      return true;
    }
  }

  function setSelectAdoptiveFirstNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptiveFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdoptiveMiddleNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptiveMiddleNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdoptiveLastNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptiveLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdoptiveFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptiveFirstNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectAdoptiveMiddleNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptiveMiddleNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectAdoptiveLastNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptiveLastNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectAdoptiveBirthPlace(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdoptiveBirthPlace(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  // function setselectAdoptiveDOB(value) {
  //   setAdoptiveDOB(value);
  //   const today = new Date();
  //   const birthDate = new Date(value);
  //   if (birthDate.getTime() <= today.getTime()) {
  //     // To calculate the time difference of two dates
  //     let Difference_In_Time = today.getTime() - birthDate.getTime();
  //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //     let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
  //     console.log(Difference_In_DaysRounded);
  //     // if (Difference_In_DaysRounded >= 180) {
  //     //   setAdoptiveAadharHIde(true);
  //     // } else {
  //     //   setAdoptiveAadharHIde(false);
  //     //   setAdoptiveAadharNo("");
  //     // }
  //   } else {
  //     setAdoptiveDOB(null);
  //     setDOBError(true);
  //     setToast(true);
  //     setTimeout(() => {
  //       setToast(false);
  //     }, 3000);
  //   }
  // }
  function setselectGender(value) {
    selectGender(value);
  }

  function setSelectContactMobile(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        setContactMobileError(true);
      } else if (e.target.value.length < 10) {
        setContactMobileError(true);
        setContactMobile(e.target.value);
        return false;
      } else {
        setContactMobileError(false);
        setContactMobile(e.target.value);
        return true;
      }
    } else {
      setContactMobileError(false);
      setContactMobile(e.target.value);
      return true;
    }
  }

  function setDob(e) {
    if (e.target.checked === true) {
      setIsDob(e.target.checked);
    } else {
      setIsDob(e.target.checked);
      setAdoptiveDOB("");
      selectGender("");
      setAdoptiveBirthPlace("");
      setAdoptionDeedNo("");
      setAdoptionOrderDate("");
      setAdoptionIssuingAthority("");
    }
  }

  function setAdoptAgency(e) {
    if (e.target.checked === true) {
      setIsAdoptAgency(e.target.checked);
    } else {
      setIsAdoptAgency(e.target.checked);
      setAdoptionAgencyName("");
      setAdoptionAgencyAddress("");
      setAdoptionContactName("");
      setContactMobile("");
    }
  }

  let validFlag = true;

  const goNext = () => {
   
      if (AdoptiveAadharNo != null || AdoptiveAadharNo != '' || AdoptiveAadharNo != undefined) {
          if (AadharError) {
              validFlag = false;
              setAadharError(true);
              setToast(true);
              setTimeout(() => {
                  setToast(false);
              }, 2000);
              
          } else {
              setAadharError(false);
          }
        }
    //   if (Gender == null || Gender == '' || Gender == undefined) {
    //     validFlag = false;
    //     setGendError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //         setToast(false);
    //     }, 2000);

    // } else {
    //   setGendError(false);
    // }

    sessionStorage.setItem("selectedValueRadio", selectedValueRadio ? selectedValueRadio.code : null);
    if (validFlag === true) {
      if (valueRad === "YES") {
        // sessionStorage.setItem("isDob", isDob ? isDob  : null);
        sessionStorage.setItem("isAdoptAgency", isAdoptAgency ? isAdoptAgency : null);
        sessionStorage.setItem("AdoptiveAadharNo", AdoptiveAadharNo ? AdoptiveAadharNo.AdoptiveAadharNo : null);
        sessionStorage.setItem("AdoptiveFirstNameEn", AdoptiveFirstNameEn ? AdoptiveFirstNameEn.AdoptiveFirstNameEn : null);
        sessionStorage.setItem("AdoptiveMiddleNameEn", AdoptiveMiddleNameEn ? AdoptiveMiddleNameEn.AdoptiveMiddleNameEn : null);
        sessionStorage.setItem("AdoptiveLastNameEn", AdoptiveLastNameEn ? AdoptiveLastNameEn.AdoptiveLastNameEn : null);
        sessionStorage.setItem("AdoptiveFirstNameMl", AdoptiveFirstNameMl ? AdoptiveFirstNameMl.AdoptiveFirstNameMl : null);
        sessionStorage.setItem("AdoptiveMiddleNameMl", AdoptiveMiddleNameMl ? AdoptiveMiddleNameMl.AdoptiveMiddleNameMl : null);
        sessionStorage.setItem("AdoptiveLastNameMl", AdoptiveLastNameMl ? AdoptiveLastNameMl.AdoptiveLastNameMl : null);
        sessionStorage.setItem("AdoptiveDOB", AdoptiveDOB ? AdoptiveDOB.AdoptiveDOB : null);
        sessionStorage.setItem("Gender", Gender ? Gender.code : null);
        sessionStorage.setItem("AdoptiveBirthPlace", AdoptiveBirthPlace ? AdoptiveBirthPlace.AdoptiveBirthPlace : null);
        // sessionStorage.setItem("AdoptiveDOB", AdoptiveDOB ? AdoptiveDOB : null);
        sessionStorage.setItem("AdoptionDeedNo", AdoptionDeedNo ? AdoptionDeedNo.AdoptionDeedNo : null);
        sessionStorage.setItem("AdoptionIssuingAthority", AdoptionIssuingAthority ? AdoptionIssuingAthority.AdoptionIssuingAthority : null);
        sessionStorage.setItem("AdoptionOrderDate", AdoptionOrderDate ? AdoptionOrderDate : null);
        sessionStorage.setItem("AdoptionAgencyName", AdoptionAgencyName ? AdoptionAgencyName.AdoptionAgencyName : null);
        sessionStorage.setItem("AdoptionAgencyAddress", AdoptionAgencyAddress ? AdoptionAgencyAddress.AdoptionAgencyAddress : null);
        sessionStorage.setItem("AdoptionContactName", AdoptionContactName ? AdoptionContactName.AdoptionContactName : null);
        sessionStorage.setItem("ContactMobile", ContactMobile ? ContactMobile.ContactMobile : null);

        onSelect(config.key, {
          selectedValueRadio,
          AdoptiveAadharNo,
          AdoptiveFirstNameEn,
          AdoptiveMiddleNameEn,
          AdoptiveLastNameEn,
          AdoptiveFirstNameMl,
          AdoptiveMiddleNameMl,
          AdoptiveLastNameMl,
          AdoptiveDOB,
          Gender,
          AdoptiveBirthPlace,
          AdoptionDeedNo,
          AdoptionIssuingAthority,
          AdoptionOrderDate,
          AdoptionAgencyName,
          AdoptionAgencyAddress,
          AdoptionContactName,
          ContactMobile,
          isDob,
        });
      } else if (valueRad === "NO") {
        sessionStorage.setItem("isDob", isDob ? isDob : null);
        sessionStorage.setItem("isAdoptAgency", isAdoptAgency ? isAdoptAgency : null);
        sessionStorage.setItem("AdoptiveAadharNo", AdoptiveAadharNo ? AdoptiveAadharNo.AdoptiveAadharNo : null);
        sessionStorage.setItem("AdoptiveFirstNameEn", AdoptiveFirstNameEn ? AdoptiveFirstNameEn.AdoptiveFirstNameEn : null);
        sessionStorage.setItem("AdoptiveMiddleNameEn", AdoptiveMiddleNameEn ? AdoptiveMiddleNameEn.AdoptiveMiddleNameEn : null);
        sessionStorage.setItem("AdoptiveLastNameEn", AdoptiveLastNameEn ? AdoptiveLastNameEn.AdoptiveLastNameEn : null);
        sessionStorage.setItem("AdoptiveFirstNameMl", AdoptiveFirstNameMl ? AdoptiveFirstNameMl.AdoptiveFirstNameMl : null);
        sessionStorage.setItem("AdoptiveMiddleNameMl", AdoptiveMiddleNameMl ? AdoptiveMiddleNameMl.AdoptiveMiddleNameMl : null);
        sessionStorage.setItem("AdoptiveLastNameMl", AdoptiveLastNameMl ? AdoptiveLastNameMl.AdoptiveLastNameMl : null);
        sessionStorage.setItem("AdoptiveDOB", AdoptiveDOB ? AdoptiveDOB.AdoptiveDOB : null);
        sessionStorage.setItem("Gender", Gender ? Gender.Gender : null);
        sessionStorage.setItem("AdoptiveBirthPlace", AdoptiveBirthPlace ? AdoptiveBirthPlace.AdoptiveBirthPlace : null);
        sessionStorage.setItem("AdoptionDeedNo", AdoptionDeedNo ? AdoptionDeedNo.AdoptionDeedNo : null);
        sessionStorage.setItem("AdoptionIssuingAthority", AdoptionIssuingAthority ? AdoptionIssuingAthority.AdoptionIssuingAthority : null);
        sessionStorage.setItem("AdoptionOrderDate", AdoptionOrderDate ? AdoptionOrderDate.AdoptionOrderDate : null);
        sessionStorage.setItem("AdoptionAgencyName", AdoptionAgencyName ? AdoptionAgencyName.AdoptionAgencyName : null);
        sessionStorage.setItem("AdoptionAgencyAddress", AdoptionAgencyAddress ? AdoptionAgencyAddress.AdoptionAgencyAddress : null);
        sessionStorage.setItem("AdoptionContactName", AdoptionContactName ? AdoptionContactName.AdoptionContactName : null);
        sessionStorage.setItem("ContactMobile", ContactMobile ? ContactMobile.ContactMobile : null);

        onSelect(config.key, {
          selectedValueRadio,
          AdoptiveAadharNo,
          AdoptiveFirstNameEn,
          AdoptiveMiddleNameEn,
          AdoptiveLastNameEn,
          AdoptiveFirstNameMl,
          AdoptiveMiddleNameMl,
          AdoptiveLastNameMl,
          AdoptiveDOB,
          Gender,
          AdoptiveBirthPlace,
          AdoptionDeedNo,
          AdoptionIssuingAthority,
          AdoptionOrderDate,
          AdoptionAgencyName,
          AdoptionAgencyAddress,
          AdoptionContactName,
          ContactMobile,
          isDob,
          isAdoptAgency,
        });
      }
    }
  };

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        {/* <LabelFieldPair style={{ display: "flex" }}> <CardLabel style={{fontSize:"15px",width:"none !important"}}>{`${t("CR_WHETHER_BIRTH_REGISTERED")}`}</CardLabel>
                  <RadioButtons t={t} optionsKey="i18nKey" options={menus} selectedOption={selectedValueRadio} onSelect={selectRadioButtons} style={{ marginTop: "-5px", paddingLeft: "5px", height: "25px", display: "flex" }} />
                </LabelFieldPair> */}
        {/* <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADOPTION_INFORMATION")}`}</span> </h1>
                    </div>
                </div> */}

        <div className="row">
          <div className="col-md-12">
            <CardLabel style={{ fontSize: "17px", width: "none !important" }}>{`${t("CR_WHETHER_BIRTH_REGISTERED")}`} </CardLabel>
            <div className="radios">
              <div className="radiobuttons">
                <LabelFieldPair style={{ display: "flex" }}>
                  <RadioButtons
                    t={t}
                    optionsKey="i18nKey"
                    options={menus}
                    selectedOption={selectedValueRadio}
                    onSelect={selectRadioButtons}
                    style={{ marginTop: "-8px", paddingLeft: "5px", height: "25px", display: "flex" }}
                  />
                </LabelFieldPair>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {valueRad === "YES" && (
            <div id="div-1">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SEARCH_REGISTRATION")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_ADOPTIVE_CHILD_AADHAAR")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"number"}
                        optionKey="i18nKey"
                        name="AdoptiveAadharNo"
                        value={AdoptiveAadharNo}
                        onChange={setSelectAdoptiveAadharNo}
                        placeholder={`${t("CR_ADOPTIVE_CHILD_AADHAAR")}`}
                        // inputProps={{
                        //   maxLength: 12,
                        // }}
                        {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_ADOPTIVE_FIRST_NAME_EN")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveFirstNameEn"
                        value={AdoptiveFirstNameEn}
                        onChange={setSelectAdoptiveFirstNameEn}
                        //  onChange={(e,v) => this.updateTextField(e,v)}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_FIRST_NAME_EN")}`}
                        {...(validation = {
                          pattern: "^[a-zA-Z-.`' ]*$",
                          isRequired: true,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_FIRST_NAME_EN"),
                        })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTIVE_MIDDLE_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveMiddleNameEn"
                        value={AdoptiveMiddleNameEn}
                        onChange={setSelectAdoptiveMiddleNameEn}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_MIDDLE_NAME_EN")}`}
                        {...(validation = {
                          pattern: "^[a-zA-Z-.`' ]*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_MIDDLE_NAME_EN"),
                        })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTIVE_LAST_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveLastNameEn"
                        value={AdoptiveLastNameEn}
                        onChange={setSelectAdoptiveLastNameEn}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_LAST_NAME_EN")}`}
                        {...(validation = {
                          pattern: "^[a-zA-Z-.`' ]*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_LAST_NAME_EN"),
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_ADOPTIVE_FIRST_NAME_ML")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveFirstNameMl"
                        value={AdoptiveFirstNameMl}
                        onChange={setSelectAdoptiveFirstNameMl}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_FIRST_NAME_ML")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: true,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_FIRST_NAME_ML"),
                        })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTIVE_MIDDLE_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveMiddleNameMl"
                        value={AdoptiveMiddleNameMl}
                        onChange={setSelectAdoptiveMiddleNameMl}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_MIDDLE_NAME_ML")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_MIDDLE_NAME_ML"),
                        })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTIVE_LAST_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveLastNameMl"
                        value={AdoptiveLastNameMl}
                        onChange={setSelectAdoptiveLastNameMl}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_LAST_NAME_ML")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_LAST_NAME_ML"),
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardLabel>
                        {t("CR_DATE_OF_BIRTH_TIME")}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <DatePicker
                        date={AdoptiveDOB}
                        name="AdoptiveDOB"
                        onChange={setselectAdoptiveDOB}
                        // disable={isDob}
                         placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                        {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "number",
                          
                          title: t("CR_INVALID_DATE_OF_BIRTH"),
                        })}
                      />
                    </div>

                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_GENDER")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <Dropdown
                        t={t}
                        optionKey="code"
                        isMandatory={true}
                        option={menu}
                        selected={Gender}
                        select={setselectGender}
                        // disable={isDob}
                        placeholder={`${t("CR_GENDER")}`}
                        {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTION_PLACE_OF_BIRTH")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveBirthPlace"
                        value={AdoptiveBirthPlace}
                        onChange={setSelectAdoptiveBirthPlace}
                        disable={isEdit}
                        placeholder={`${t("CR_ADOPTION_PLACE_OF_BIRTH")}`}
                        {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text" })}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTION_DEED_ORDER_NO")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptionDeedNo"
                        value={AdoptionDeedNo}
                        onChange={setSelectAdoptionDeedNo}
                        disable={isEdit}
                        placeholder={`${t("CR_ADOPTION_DEED_ORDER_NO")}`}
                        {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text" })}
                      />
                    </div>

                    <div className="col-md-4">
                      <CardLabel>{t("CR_ADOPTION_ORDER_DATE")}</CardLabel>
                      <DatePicker
                        date={AdoptionOrderDate}
                        name="AdoptionOrderDate"
                        onChange={setselectAdoptionOrderDate}
                        placeholder={`${t("CR_ADOPTION_ORDER_DATE")}`}
                        {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, type: "text" })}
                      />
                    </div>

                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTION_ISSUING_AUTHORITY")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptionIssuingAthority"
                        value={AdoptionIssuingAthority}
                        onChange={setSelectAdoptionIssuingAthority}
                        disable={isEdit}
                        placeholder={`${t("CR_ADOPTION_ISSUING_AUTHORITY")}`}
                        {...(validation = {
                          pattern: "^[a-zA-Z-.0-9`' ]*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTION_PLACE_OF_BIRTH"),
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CheckBox
                        label={t("CR_ADOPTION_AVAILABLE_THROUGH_AGENCY_FRIENDS")}
                        onChange={setAdoptAgency}
                        value={isAdoptAgency}
                        checked={isAdoptAgency}
                      />
                    </div>
                  </div>
                </div>
                {isAdoptAgency === true && (
                  <div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-3">
                          <CardLabel>{`${t("CR_ADOPTION_AGENCY_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptionAgencyName"
                            value={AdoptionAgencyName}
                            onChange={setSelectAdoptionAgencyName}
                            // disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_AGENCY_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.0-9`' ]*$",
                              isRequired: false,
                              type: "text",
                              title: t("CR_INVALID_ADOPTION_AGENCY_NAME_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel>{`${t("CR_ADOPTION_AGENCY_ADDRESS_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptionAgencyAddress"
                            value={AdoptionAgencyAddress}
                            onChange={setSelectAdoptionAgencyAddress}
                            // disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_AGENCY_ADDRESS_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.0-9`' ]*$",
                              isRequired: false,
                              type: "text",
                              title: t("CR_INVALID_ADOPTION_AGENCY_ADDRESS_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel>{`${t("CR_ADOPTION_CONTACT_NAME")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptionContactName"
                            value={AdoptionContactName}
                            onChange={setSelectAdoptionContactName}
                            // disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_CONTACT_NAME")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.0-9`' ]*$",
                              isRequired: false,
                              type: "text",
                              title: t("CR_INVALID_ADOPTION_CONTACT_NAME"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel>
                            {`${t("CR_MOBILE_NO")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"number"}
                            optionKey="i18nKey"
                            name="ContactMobile"
                            value={ContactMobile}
                            onChange={setSelectContactMobile}
                            disable={isEdit}
                            placeholder={`${t("CR_MOBILE_NO")}`}
                            {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {valueRad === "NO" && (
            <div id="div-1">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADOPTION_REGISTRATION_NOT_REGISTERED_BIRTH")}`}</span>{" "}
                    </h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_ADOPTIVE_CHILD_AADHAAR")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"number"}
                        optionKey="i18nKey"
                        name="AdoptiveAadharNo"
                        value={AdoptiveAadharNo}
                        onChange={setSelectAdoptiveAadharNo}
                        placeholder={`${t("CR_ADOPTIVE_CHILD_AADHAAR")}`}
                        inputProps={{
                          maxLength: 12,
                        }}
                        {...(validation = { pattern: "^[0-9]{12}$",  isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_ADOPTIVE_FIRST_NAME_EN")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveFirstNameEn"
                        value={AdoptiveFirstNameEn}
                        onChange={setSelectAdoptiveFirstNameEn}
                        //  onChange={(e,v) => this.updateTextField(e,v)}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_FIRST_NAME_EN")}`}
                        {...(validation = {
                          pattern: "^[a-zA-Z-.`' ]*$",
                          isRequired: true,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_FIRST_NAME_EN"),
                        })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTIVE_MIDDLE_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveMiddleNameEn"
                        value={AdoptiveMiddleNameEn}
                        onChange={setSelectAdoptiveMiddleNameEn}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_MIDDLE_NAME_EN")}`}
                        {...(validation = {
                          pattern: "^[a-zA-Z-.`' ]*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_MIDDLE_NAME_EN"),
                        })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTIVE_LAST_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveLastNameEn"
                        value={AdoptiveLastNameEn}
                        onChange={setSelectAdoptiveLastNameEn}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_LAST_NAME_EN")}`}
                        {...(validation = {
                          pattern: "^[a-zA-Z-.`' ]*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_LAST_NAME_EN"),
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_ADOPTIVE_FIRST_NAME_ML")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveFirstNameMl"
                        value={AdoptiveFirstNameMl}
                        onChange={setSelectAdoptiveFirstNameMl}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_FIRST_NAME_ML")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: true,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_FIRST_NAME_ML"),
                        })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTIVE_MIDDLE_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveMiddleNameMl"
                        value={AdoptiveMiddleNameMl}
                        onChange={setSelectAdoptiveMiddleNameMl}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_MIDDLE_NAME_ML")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_MIDDLE_NAME_ML"),
                        })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADOPTIVE_LAST_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="AdoptiveLastNameMl"
                        value={AdoptiveLastNameMl}
                        onChange={setSelectAdoptiveLastNameMl}
                        // disable={isAdoptiveName}
                        placeholder={`${t("CR_ADOPTIVE_LAST_NAME_ML")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: false,
                          type: "text",
                          title: t("CR_INVALID_ADOPTIVE_LAST_NAME_ML"),
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CheckBox label={t("CR_DOB_AVAILABLE_ADOPTION_COURT_ORDER")} onChange={setDob} value={isDob} checked={isDob} />
                    </div>
                  </div>
                </div>
                {isDob === true && (
                  <div>                   

                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-4">
                          <CardLabel>
                            {t("CR_DATE_OF_BIRTH_TIME")}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <DatePicker
                            date={AdoptiveDOB}
                            name="AdoptiveDOB"
                            onChange={setselectAdoptiveDOB}
                            inputFormat="DD-MM-YYYY"
                            placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                            disable={isEdit}
                            {...(validation = { isRequired: true, title: t("CR_INVALID_DATE_OF_BIRTH") })}
                          />
                        </div>

                        <div className="col-md-4">
                          <CardLabel>
                            {`${t("CR_GENDER")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <Dropdown
                            t={t}
                            optionKey="code"
                            isMandatory={true}
                            option={menu}
                            selected={Gender}
                            select={setselectGender}
                            placeholder={`${t("CR_GENDER")}`}
                              disable={isEdit}
                            {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel>{`${t("CR_ADOPTION_PLACE_OF_BIRTH")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptiveBirthPlace"
                            value={AdoptiveBirthPlace}
                            onChange={setSelectAdoptiveBirthPlace}
                            placeholder={`${t("CR_ADOPTION_PLACE_OF_BIRTH")}`}
                            disable={isEdit}
                            {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text" })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-4">
                          <CardLabel>{`${t("CR_ADOPTION_DEED_ORDER_NO")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptionDeedNo"
                            value={AdoptionDeedNo}
                            onChange={setSelectAdoptionDeedNo}
                            disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_DEED_ORDER_NO")}`}
                            {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text" })}
                          />
                        </div>

                        <div className="col-md-4">
                          <CardLabel>{t("CR_ADOPTION_ORDER_DATE")}</CardLabel>
                          <DatePicker
                            date={AdoptionOrderDate}
                            name="AdoptionOrderDate"
                            onChange={setselectAdoptionOrderDate}
                            disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_ORDER_DATE")}`}
                            {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, type: "text" })}
                          />
                        </div>

                        <div className="col-md-4">
                          <CardLabel>{`${t("CR_ADOPTION_ISSUING_AUTHORITY")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptionIssuingAthority"
                            value={AdoptionIssuingAthority}
                            onChange={setSelectAdoptionIssuingAthority}
                            disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_ISSUING_AUTHORITY")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.0-9`' ]*$",
                              isRequired: false,
                              type: "text",
                              title: t("CR_INVALID_ADOPTION_PLACE_OF_BIRTH"),})}
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
                        label={t("CR_ADOPTION_AVAILABLE_THROUGH_AGENCY_FRIENDS")}
                        onChange={setAdoptAgency}
                        value={isAdoptAgency}
                        checked={isAdoptAgency}
                      />
                    </div>
                  </div>
                </div>
                {isAdoptAgency === true && (
                  <div>
                   

                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-3">
                          <CardLabel>{`${t("CR_ADOPTION_AGENCY_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptionAgencyName"
                            value={AdoptionAgencyName}
                            onChange={setSelectAdoptionAgencyName}
                            // disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_AGENCY_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.0-9`' ]*$",
                              isRequired: false,
                              type: "text",
                              title: t("CR_INVALID_ADOPTION_AGENCY_NAME_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel>{`${t("CR_ADOPTION_AGENCY_ADDRESS_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptionAgencyAddress"
                            value={AdoptionAgencyAddress}
                            onChange={setSelectAdoptionAgencyAddress}
                            // disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_AGENCY_ADDRESS_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.0-9`' ]*$",
                              isRequired: false,
                              type: "text",
                              title: t("CR_INVALID_ADOPTION_AGENCY_ADDRESS_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel>{`${t("CR_ADOPTION_CONTACT_NAME")}`}</CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"text"}
                            optionKey="i18nKey"
                            name="AdoptionContactName"
                            value={AdoptionContactName}
                            onChange={setSelectAdoptionContactName}
                            // disable={isEdit}
                            placeholder={`${t("CR_ADOPTION_CONTACT_NAME")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.0-9`' ]*$",
                              isRequired: false,
                              type: "text",
                              title: t("CR_INVALID_ADOPTION_CONTACT_NAME"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel>
                            {`${t("CR_MOBILE_NO")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <TextInput
                            t={t}
                            isMandatory={false}
                            type={"number"}
                            optionKey="i18nKey"
                            name="ContactMobile"
                            value={ContactMobile}
                            onChange={setSelectContactMobile}
                            disable={isEdit}
                            placeholder={`${t("CR_MOBILE_NO")}`}
                            {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {toast && (
            <Toast
              error={
                AadharError || DOBError || GendError || ContactMobileError
              
              }
              label={
                AadharError || DOBError || GendError || ContactMobileError
                  ? AadharError ? t(`CS_COMMON_INVALID_AADHAR_NO`) : DOBError ? t(`BIRTH_DOB_VALIDATION_MSG`)
                    : GendError  ? t("BIRTH_ERROR_GENDER_CHOOSE")
                    : 

                      setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AdoptionDetails;
