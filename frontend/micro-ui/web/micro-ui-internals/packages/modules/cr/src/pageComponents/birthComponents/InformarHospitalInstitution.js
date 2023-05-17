import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformarHospitalInstitution = ({ config, onSelect, userType, formData,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [infomantFirstNameEn, setinfomantFirstNameEn] = useState(formData?.InformarHosInstDetails?.infomantFirstNameEn ? formData?.InformarHosInstDetails?.infomantFirstNameEn : "");
  const [infomantAadhar, setinfomantAadhar] = useState(formData?.InformarHosInstDetails?.infomantAadhar ? formData?.InformarHosInstDetails?.infomantAadhar : "");

  const [infomantMobile, setinfomantMobile] = useState(formData?.InformarHosInstDetails?.infomantMobile ? formData?.InformarHosInstDetails?.infomantMobile : "");
  const [informerDesi, setinformerDesi] = useState(formData?.InformarHosInstDetails?.informerDesi ? formData?.InformarHosInstDetails?.informerDesi : "");
  const [informerAddress, setinformerAddress] = useState(formData?.InformarHosInstDetails?.informerAddress ? formData?.InformarHosInstDetails?.informerAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.InformarHosInstDetails?.infomantFirstNameEn ? false : false);
  const [infomantAadharError, setinfomantAadharError] = useState(formData?.InformarHosInstDetails?.infomantAadhar ? false : false);
  const [infomantMobileError, setinfomantMobileError] = useState(formData?.InformarHosInstDetails?.infomantMobile ? false : false);
  const [mobileLengthError, setMobileLengthError] = useState(formData?.InformarHosInstDetails?.infomantMobile ? false : false);
  const [informerDesiError, setinformerDesiError] = useState(formData?.InformarHosInstDetails?.informerDesi ? false : false);
  const [informerAddressError, setinformerAddressError] = useState(formData?.InformarHosInstDetails?.informerAddress ? false : false);


  const onSkip = () => onSelect();



  function setSelectinfomantFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinfomantFirstNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinformerDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinformerDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinformerAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9, ]*$") != null)) {
      setinformerAddress(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinfomantAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinfomantAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }

  function setSelectinfomantMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setinfomantMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        return false;
      } else if (e.target.value.length < 10) {
        setinfomantMobile(e.target.value);
        return false;
      } else {
        setinfomantMobile(e.target.value);
      }
    } else {
      setinfomantMobile(e.target.value);
    }
  }




  let validFlag = true;
  const goNext = () => {
    if (infomantFirstNameEn == null || infomantFirstNameEn == "" || infomantFirstNameEn == undefined) {
      validFlag = false;
      setinfomantFirstNmeEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantFirstNmeEnError(false);
    }
    if (informerDesi == null || informerDesi == "" || informerDesi == undefined) {
      validFlag = false;
      setinformerDesiError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinformerDesiError(false);
    }

    if (infomantAadhar == null || infomantAadhar == "" || infomantAadhar == undefined) {
      validFlag = false;
      setinfomantAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantAadharError(false);
    }
    if (infomantMobile == null || infomantMobile == "" || infomantMobile == undefined) {
      validFlag = false;
      setinfomantMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantMobileError(false);
    }

    if (validFlag == true) {

      onSelect(config.key, {
        infomantFirstNameEn, infomantAadhar, infomantMobile, informerDesi, informerAddress
      });
    }
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!infomantAadhar || !infomantFirstNameEn || !informerDesi || !infomantMobile 
      } >
        <div className="row">
          <div className="col-md-12" >
            <h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMER_VERIFICATION")}`}</span> </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" >
            <div className="col-md-2" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput t={t} type={"text"}
                optionKey="i18nKey"
                name="infomantAadhar"
                value={infomantAadhar}
                onChange={setSelectinfomantAadhar}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_AADHAAR") })} />
            </div>
            <div className="col-md-4" ><CardLabel>{`${t("CR_INFORMANT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput t={t}
                type={"text"}
                optionKey="i18nKey"
                name="infomantFirstNameEn"
                value={infomantFirstNameEn}
                onChange={setSelectinfomantFirstNameEn}
                placeholder={`${t("CR_INFORMANT_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INFORMANT_NAME") })} />
            </div>
            <div className="col-md-3" >
              <CardLabel>{`${t("CR_INFORMER_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="informerDesi"
                value={informerDesi}
                onChange={setSelectinformerDesi}
                disable={isEdit}
                placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                {...(validation = { pattern: "^[a-zA-Z ]*$", isRequired: true, type: "text", title: t("CR_INFORMER_DESIGNATION") })}
              />
            </div>
            <div className="col-md-3" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput t={t}
                type={"number"}
                optionKey="i18nKey"
                name="infomantMobile"
                value={infomantMobile}
                onChange={setSelectinfomantMobile}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_MOBILE_NO") })} />
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12" >
            <div className="col-md-6" >
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="informerAddress"
                value={informerAddress}
                onChange={setSelectinformerAddress}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-0-9, ]*$", isRequired: false, type: "text", title: t("CR_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div>


        {toast && (
          <Toast
            error={
              infomantFirstNmeEnError ||
              infomantAadharError ||
              infomantMobileError ||
              informerDesiError
            }
            label={
              infomantFirstNmeEnError ||
                infomantAadharError ||
                infomantMobileError ||
                informerDesiError
                ?
                infomantFirstNmeEnError
                  ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                  : infomantAadharError
                    ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                    : infomantMobileError
                      ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                      : informerDesiError
                        ? t(`BIRTH_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
                        :
                        setToast(false)
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
export default InformarHospitalInstitution;