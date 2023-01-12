import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton,CheckBox  } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformantDetails = ({ config, onSelect, userType, formData ,InformantNameEn, setInformantNameEn, informantAadhar, setinformantAadhar, informantEmail, setinformantEmail,
    informantMobile, setinformantMobile,
}) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
    const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
    const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
    const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    // const [InformantNameEn, setInformantNameEn] = useState(formData?.InformantDetails?.InformantNameEn); 
    // const [informantAadhar, setinformantAadhar] = useState(formData?.InformantDetails?.informantAadhar); 
    // const [informantEmail, setinformantEmail] = useState(formData?.InformantDetails?.informantEmail);
    // const [informantMobile, setinformantMobile] = useState(formData?.InformantDetails?.informantMobile);  
 
    const onSkip = () => onSelect();

    function setSelectInformantNameEn(e) {
        setInformantNameEn(e.target.value);
    }  
 
    function setSelectinformantAadhar(e) {
        setinformantAadhar(e.target.value);
    }
 
    function setSelectinformantEmail(e) {
        setinformantEmail(e.target.value);
    }
    function setSelectinformantMobile(e) {
        setinformantMobile(e.target.value);
    }
  
    const goNext = () => {
        // sessionStorage.setItem("InformantNameEn", InformantNameEn ? InformantNameEn : null);
       
        // sessionStorage.setItem("informantAadhar", informantAadhar ? informantAadhar : null);
        
        // sessionStorage.setItem("informantEmail", informantEmail ? informantEmail : null);
        // sessionStorage.setItem("informantMobile", informantMobile ? informantMobile : null);
        
        // onSelect(config.key, {
        //     InformantNameEn, informantMiddleNameEn,  informantAadhar,  informantEmail, 
        //     informantMobile,
        // });
    }
    if (isQualificationLoading || isQualificationSubLoading || isProfessionLoading || isNationLoad) {
        return <Loader></Loader>;
    }
    return (
        <React.Fragment>
            {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton> */}
            {/* isDisabled={!InformantNameEn} */}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
            <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMANT_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>
                
               
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-3" ><CardLabel>{`${t("CR_INFORMANT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="InformantNameEn"
                                value={InformantNameEn} onChange={setSelectInformantNameEn} disable={{isEdit}} placeholder={`${t("CR_INFORMANT_NAME")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="informantAadhar" value={informantAadhar}
                             onChange={setSelectinformantAadhar} disable={{isEdit}} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="informantEmail" value={informantEmail} 
                            onChange={setSelectinformantEmail} disable={{isEdit}} placeholder={`${t("CR_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="informantMobile" value={informantMobile} 
                            onChange={setSelectinformantMobile} disable={{isEdit}} placeholder={`${t("CR_EMAIL")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
                        </div>
                    </div>
                </div>
               

               
            </FormStep>
        </React.Fragment>
    );
};
export default InformantDetails;
