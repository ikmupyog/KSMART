import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, TextArea } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformarHospitalInstitution = ({ config, onSelect, userType, formData,
}) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};

    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [infomantFirstNameEn, setinfomantFirstNameEn] = useState(formData?.InformarHosInstDetails?.infomantFirstNameEn);
    const [infomantAadhar, setinfomantAadhar] = useState(formData?.InformarHosInstDetails?.infomantAadhar);
    const [InfomantEmail, setInfomantEmail] = useState(formData?.InformarHosInstDetails?.InfomantEmail);
    const [infomantMobile, setinfomantMobile] = useState(formData?.InformarHosInstDetails?.infomantMobile);
    const [informerDesi, setinformerDesi] = useState(formData?.InformarHosInstDetails?.informerDesi);
    const [informerAddress, setinformerAddress] = useState(formData?.InformarHosInstDetails?.informerAddress);


    const onSkip = () => onSelect();

    function setSelectinfomantFirstNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinfomantFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectinformerDesi(e) {
        if (e.target.value.length === 251) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinformerDesi(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectinformerAddress(e) {
        if (e.target.value.length === 251) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinformerAddress(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectinfomantAadhar(e) {
        if (e.target.value.length != 0) {
            if (e.target.value.length > 12) {
                return false;
            } else if (e.target.value.length < 12) {
                setinfomantAadhar(e.target.value);
                return false;
            } else {
                setinfomantAadhar(e.target.value);
            }
        } else {
            setinfomantAadhar(e.target.value);
        }
    }

    function setSelectInfomantEmail(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setInfomantEmail(e.target.value);
        }
    }
    function setSelectinfomantMobile(e) {
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
        setinfomantMobile(e.target.value);
    }

    const goNext = () => {
        sessionStorage.setItem("infomantFirstNameEn", infomantFirstNameEn);          
        sessionStorage.setItem("infomantAadhar", infomantAadhar);       
        // sessionStorage.setItem("InfomantEmail", InfomantEmail);
        sessionStorage.setItem("infomantMobile", infomantMobile);   
        sessionStorage.setItem("informerDesi", informerDesi);   
        sessionStorage.setItem("informerAddress", informerAddress);   


        onSelect(config.key, {
            infomantFirstNameEn,  infomantAadhar,   infomantMobile ,informerDesi,  informerAddress     });
    }
    return (
        <React.Fragment>
            {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton> */}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!infomantFirstNameEn}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMENT_DETAILS")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                    <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={true} type={"text"} optionKey="i18nKey" name="infomantAadhar" value={infomantAadhar} onChange={setSelectinfomantAadhar} disable={isEdit} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_INFORMANT_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={true} type={"text"} optionKey="i18nKey" name="infomantFirstNameEn"
                                value={infomantFirstNameEn} onChange={setSelectinfomantFirstNameEn} disable={isEdit} placeholder={`${t("CR_INFORMANT_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" >
                            <CardLabel>{`${t("CR_INFORMER_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput
                                t={t}
                                isMandatory={true}
                                type={"text"}
                                optionKey="i18nKey"
                                name="informerDesi"
                                value={informerDesi}
                                onChange={setSelectinformerDesi}
                                disable={isEdit}
                                placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
                            />
                        </div>
                        {/* <div className="col-md-3" ><CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="InfomantEmail" value={InfomantEmail} onChange={setSelectInfomantEmail} disable={isEdit} placeholder={`${t("CR_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })} />
                        </div> */}
                       
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                    <div className="col-md-3" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={true} type={"number"} optionKey="i18nKey" name="infomantMobile" value={infomantMobile} onChange={setSelectinfomantMobile} disable={isEdit} placeholder={`${t("CR_MOBILE_NO")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
                        </div>
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CR_ADDRESS_EN")}`}</CardLabel>
                            <TextArea
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="informerAddress"
                                value={informerAddress}
                                onChange={setSelectinformerAddress}
                                disable={isEdit}
                                placeholder={`${t("CR_ADDRESS_2_EN")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS_EN") })}
                            />
                        </div>
                    </div>
                </div>




            </FormStep>
        </React.Fragment>
    );
};
export default InformarHospitalInstitution;