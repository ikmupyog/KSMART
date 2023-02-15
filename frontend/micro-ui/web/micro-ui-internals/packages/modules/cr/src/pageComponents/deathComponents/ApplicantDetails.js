import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, CheckBox,BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
// import PlaceOfDeathHome from "./PlaceOfDeathHome";
// import InformantAddress from "../birthComponents/InformantAddress";

const ApplicantDetails = ({ config, onSelect, userType, formData }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {}; 
 
  
  const [ApplicantNameEn, setApplicantNameEn] = useState(formData?.ApplicantDetails?.ApplicantNameEn ? formData?.ApplicantDetails?.ApplicantNameEn :"");
  const [ApplicantNameMl, setApplicantNameMl] = useState(formData?.ApplicantDetails?.ApplicantNameMl ? formData?.ApplicantDetails?.ApplicantNameMl : "");
  const [AadhaarNo, setAadhaarNo] = useState(formData?.ApplicantDetails?.AadhaarNo ? formData?.ApplicantDetails?.AadhaarNo : "");
  const [InformentMobileNo, setInformentMobileNo] = useState(formData?.ApplicantDetails?.InformentMobileNo ? formData?.ApplicantDetails?.InformentMobileNo : 0);
  const [InformentEmail, setInformentEmail] = useState(formData?.ApplicantDetails?.InformentEmail ? formData?.ApplicantDetails?.InformentEmail : "");
 

 // Informent Address from Birth Page
  // const [InformantAdrsCountry, setInformantAdrsCountry] = useState(formData?.ApplicantDetails?.InformantAdrsCountry ? formData?.ApplicantDetails?.InformantAdrsCountry : null );
  // const [InformantAdrsStateName, setInformantAdrsStateName] = useState(formData?.ApplicantDetails?.InformantAdrsStateName ? formData?.ApplicantDetails?.InformantAdrsStateName :null);
  // const [InformantAdrsDistrict, setInformantAdrsDistrict] = useState(formData?.ApplicantDetails?.InformantAdrsDistrict ? formData?.ApplicantDetails?.InformantAdrsDistrict : null);
  // const [InformantAdrsLBTypeName, setInformantAdrsLBTypeName] = useState(formData?.ApplicantDetails?.InformantAdrsLBTypeName ? formData?.ApplicantDetails?.InformantAdrsLBTypeName : null);
  // const [InformantAdrsLBName, setInformantAdrsLBName] = useState(formData?.ApplicantDetails?.InformantAdrsLBName ? formData?.ApplicantDetails?.InformantAdrsLBName : null );
  // const [InformantAdrsTaluk, setInformantAdrsTaluk] = useState(formData?.ApplicantDetails?.InformantAdrsTaluk ? formData?.ApplicantDetails?.InformantAdrsTaluk : null);
  // const [InformantAdrsPostOffice, setInformantAdrsPostOffice] = useState(formData?.ApplicantDetails?.InformantAdrsPostOffice ? formData?.ApplicantDetails?.InformantAdrsPostOffice : null);
  // const [InformantAdrsPincode, setInformantAdrsPincode] = useState(formData?.ApplicantDetails?.InformantAdrsPincode ? formData?.ApplicantDetails?.InformantAdrsPincode :0 );
  // const [InformantAdrsHouseNameEn, setInformantAdrsHouseNameEn] = useState(formData?.ApplicantDetails?.InformantAdrsHouseNameEn ? formData?.ApplicantDetails?.InformantAdrsHouseNameEn :"");
  // const [InformantAdrsResNo, setInformantAdrsResNo] = useState(formData?.ApplicantDetails?.InformantAdrsResNo ? formData?.ApplicantDetails?.InformantAdrsResNo : "");
  // const [InformantAdrsDoorNo, setInformantAdrsDoorNo] = useState(formData?.ApplicantDetails?.InformantAdrsDoorNo ? formData?.ApplicantDetails?.InformantAdrsDoorNo : "");
  // const [InformantAdrsMainPlaceEn, setInformantAdrsMainPlaceEn] = useState(formData?.ApplicantDetails?.InformantAdrsMainPlaceEn ? formData?.ApplicantDetails?.InformantAdrsMainPlaceEn : "");
  // const [InformantAdrsLocalityNameEn, setInformantAdrsLocalityNameEn] = useState(formData?.ApplicantDetails?.InformantAdrsLocalityNameEn ? formData?.ApplicantDetails?.InformantAdrsLocalityNameEn : "");
  // const [InformantAdrsStreetNameEn, setInformantAdrsStreetNameEn] = useState(formData?.ApplicantDetails?.InformantAdrsStreetNameEn ? formData?.ApplicantDetails?.InformantAdrsStreetNameEn : "");
  // const [InformantAdrsVillage, setInformantAdrsVillage] = useState(formData?.ApplicantDetails?.InformantAdrsVillage ? formData?.ApplicantDetails?.InformantAdrsVillage : null);
    // const [InformantAdrsBuldingNo, setInformantAdrsBuldingNo] = useState(formData?.ApplicantDetails?.InformantAdrsBuldingNo);

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let naturetypecmbvalue = null;
  

  const onSkip = () => onSelect();
 

  function setSelectApplicantNameEn(e) {
    setApplicantNameEn(e.target.value);
  }
  function setSelectApplicantNameMl(e) {
    setApplicantNameMl(e.target.value);
  }
  function setSelectAadhaarNo(e) {
    setAadhaarNo(e.target.value);
  }
  function setSelectInformentMobileNo(e) {
    setInformentMobileNo(e.target.value);
  }
  function setSelectInformentEmail(e) {
    setInformentEmail(e.target.value);
  }

  

  const goNext = () => {

    sessionStorage.setItem("ApplicantNameEn", ApplicantNameEn ? ApplicantNameEn : null );
    sessionStorage.setItem("ApplicantNameMl", ApplicantNameMl ? ApplicantNameMl : null);
    sessionStorage.setItem("AadhaarNo", AadhaarNo ? AadhaarNo : null);
    sessionStorage.setItem("InformentMobileNo", InformentMobileNo ? InformentMobileNo :null);
    sessionStorage.setItem("InformentEmail", InformentEmail ? InformentEmail : null);
 
    
 // Address from Birth
    // sessionStorage.setItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
    // sessionStorage.setItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
    // sessionStorage.setItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);    
    // sessionStorage.setItem("InformantAdrsResNo", InformantAdrsResNo ? InformantAdrsResNo : null);
    // sessionStorage.setItem("InformantAdrsDoorNo", InformantAdrsDoorNo ? InformantAdrsDoorNo : null);
    // sessionStorage.setItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn ? InformantAdrsHouseNameEn : null);
    // sessionStorage.setItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn ? InformantAdrsMainPlaceEn : null);
    // sessionStorage.setItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn ? InformantAdrsLocalityNameEn : null);
    // sessionStorage.setItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn ? InformantAdrsStreetNameEn : null);
    // sessionStorage.setItem("InformantAdrsVillage", InformantAdrsVillage ? InformantAdrsVillage.code : null);
    // sessionStorage.setItem("InformantAdrsLBName", InformantAdrsLBName ? InformantAdrsLBName.code : null);
    // sessionStorage.setItem("InformantAdrsDistrict", InformantAdrsDistrict ? InformantAdrsDistrict.code : null);
    // sessionStorage.setItem("InformantAdrsTaluk", InformantAdrsTaluk ? InformantAdrsTaluk.code : null);
    // sessionStorage.setItem("InformantAdrsPostOffice", InformantAdrsPostOffice ? InformantAdrsPostOffice.code : null);
    // sessionStorage.setItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPostOffice : null);
// sessionStorage.setItem("InformantAdrsBuldingNo", InformantAdrsBuldingNo);
    onSelect(config.key, {

      ApplicantNameEn,
      ApplicantNameMl,     
      AadhaarNo,
      InformentMobileNo,
      InformentEmail,    


      InformantAdrsCountry,
      InformantAdrsStateName,
      InformantAdrsLBTypeName,
      InformantAdrsMainPlaceEn,
      InformantAdrsStreetNameEn,
      InformantAdrsVillage,
      InformantAdrsLBName,
      InformantAdrsDistrict,
      InformantAdrsTaluk,
      InformantAdrsPostOffice,
      InformantAdrsPincode,
      InformantAdrsResNo,
      InformantAdrsDoorNo,
      InformantAdrsHouseNameEn,
      InformantAdrsLocalityNameEn,
      // InfntWardNo,

    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        <div className="row">
          {/* <div className="col-md-4">
            <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbTitle}
              selected={setTitle}
              select={selectTitle}
              disabled={isEdit}
              placeholder={`${t("CR_TITLE_NAME_EN")}`}
            />
          </div> */}
          <div className="col-md-4">
            <CardLabel>
              {t("CR_APPLICANT_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameEn"
              value={ApplicantNameEn}
              onChange={setSelectApplicantNameEn}
              disable={isEdit}
              placeholder={`${t("CR_APPLICANT_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CR_APPLICANT_NAME_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameMl"
              value={ApplicantNameMl}
              onChange={setSelectApplicantNameMl}
              disable={isEdit}
              placeholder={`${t("CR_APPLICANT_NAME_ML")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AadhaarNo"
                value={AadhaarNo}
                onChange={setSelectAadhaarNo}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_MOBILE_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformentMobileNo"
                value={InformentMobileNo}
                onChange={setSelectInformentMobileNo}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type="email"
                optionKey="i18nKey"
                name="InformentEmail"
                value={InformentEmail}
                onChange={setSelectInformentEmail}
                disable={isEdit}
                placeholder={`${t("CR_EMAIL")}`}
                {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
          {/* <InformantAddress
              InformantAdrsCountry={InformantAdrsCountry}
              setInformantAdrsCountry={setInformantAdrsCountry}
              InformantAdrsStateName={InformantAdrsStateName}
              setInformantAdrsStateName={setInformantAdrsStateName}
              InformantAdrsDistrict={InformantAdrsDistrict}
              setInformantAdrsDistrict={setInformantAdrsDistrict}
              InformantAdrsLBTypeName={InformantAdrsLBTypeName}
              setInformantAdrsLBTypeName={setInformantAdrsLBTypeName}
              InformantAdrsLBName={InformantAdrsLBName}
              setInformantAdrsLBName={setInformantAdrsLBName}
              InformantAdrsTaluk={InformantAdrsTaluk}
              setInformantAdrsTaluk={setInformantAdrsTaluk}
              InformantAdrsPostOffice={InformantAdrsPostOffice}
              setInformantAdrsPostOffice={setInformantAdrsPostOffice}
              InformantAdrsPincode={InformantAdrsPincode}
              setInformantAdrsPincode={setInformantAdrsPincode}
              InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
              setInformantAdrsHouseNameEn={setInformantAdrsHouseNameEn}
              // InformantAdrsBuldingNo={InformantAdrsBuldingNo} setInformantAdrsBuldingNo={setInformantAdrsBuldingNo}
              InformantAdrsResNo={InformantAdrsResNo}
              setInformantAdrsResNo={setInformantAdrsResNo}
              InformantAdrsDoorNo={InformantAdrsDoorNo}
              setInformantAdrsDoorNo={setInformantAdrsDoorNo}
              InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
              setInformantAdrsMainPlaceEn={setInformantAdrsMainPlaceEn}
              InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
              setInformantAdrsLocalityNameEn={setInformantAdrsLocalityNameEn}
              InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
              setInformantAdrsStreetNameEn={setInformantAdrsStreetNameEn}
              InformantAdrsVillage={InformantAdrsVillage}
              setInformantAdrsVillage={setInformantAdrsVillage}
              // InfntWardNo={InfntWardNo} setInfntWardNo={setInfntWardNo}
            /> */}
          </div>
        </div>
       
      </FormStep>
    </React.Fragment>
  );
};
export default ApplicantDetails;
