import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, TextArea } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformantDetails = ({ config, onSelect, userType, formData, InfomantFirstNameEn, setInfomantFirstNameEn, InfomantAadhar, setInfomantAadhar, InfomantEmail, setInfomantEmail,
    InfomantMobile, setInfomantMobile, InformantAddressLineOne, setInformantAddressLineOne, InformantAddressLineTwo, setInformantAddressLineTwo,
}) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};

    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    // const [InfomantFirstNameEn, setInfomantFirstNameEn] = useState(formData?.InfomantInfoDetails?.InfomantFirstNameEn);
    // const [InfomantAadhar, setInfomantAadhar] = useState(formData?.InfomantInfoDetails?.InfomantAadhar);
    // const [InfomantEmail, setInfomantEmail] = useState(formData?.InfomantInfoDetails?.InfomantEmail);
    // const [InfomantMobile, setInfomantMobile] = useState(formData?.InfomantInfoDetails?.InfomantMobile);
    // const [InformantAddressLineOne, setInformantAddressLineOne] = useState(formData?.InfomantInfoDetails?.InformantAddressLineOne);
    // const [InformantAddressLineTwo, setInformantAddressLineTwo] = useState(formData?.InfomantInfoDetails?.InformantAddressLineTwo);


    const onSkip = () => onSelect();

    function setSelectInfomantFirstNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setInfomantFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectInformantAddressLineOne(e) {
        if (e.target.value.length === 251) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setInformantAddressLineOne(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectInformantAddressLineTwo(e) {
        if (e.target.value.length === 251) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setInformantAddressLineTwo(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
        }
    }
    function setSelectInfomantAadhar(e) {
        if (e.target.value.length != 0) {
            if (e.target.value.length > 12) {
                return false;
            } else if (e.target.value.length < 12) {
                setInfomantAadhar(e.target.value);
                return false;
            } else {
                setInfomantAadhar(e.target.value);
            }
        } else {
            setInfomantAadhar(e.target.value);
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
    function setSelectInfomantMobile(e) {
        if (e.target.value.length != 0) {
            if (e.target.value.length > 10) {
                return false;
            } else if (e.target.value.length < 10) {
                setInfomantMobile(e.target.value);
                return false;
            } else {
                setInfomantMobile(e.target.value);
            }
        } else {
            setInfomantMobile(e.target.value);
        }
        setInfomantMobile(e.target.value);
    }

    const goNext = () => {
        // sessionStorage.setItem("InfomantFirstNameEn", InfomantFirstNameEn);          
        // sessionStorage.setItem("InfomantAadhar", InfomantAadhar);       
        // sessionStorage.setItem("InfomantEmail", InfomantEmail);
        // sessionStorage.setItem("InfomantMobile", InfomantMobile);   
        // sessionStorage.setItem("InformantAddressLineOne", InformantAddressLineOne);   
        // sessionStorage.setItem("InformantAddressLineTwo", InformantAddressLineTwo);   


        // onSelect(config.key, {
        //     InfomantFirstNameEn,  InfomantAadhar,  InfomantEmail, InfomantMobile        });
    }
    return (
        <React.Fragment>
            {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton> */}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!InfomantFirstNameEn}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMENT_DETAILS")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-3" ><CardLabel>{`${t("CR_INFORMANT_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="InfomantFirstNameEn"
                                value={InfomantFirstNameEn} onChange={setSelectInfomantFirstNameEn} disable={isEdit} placeholder={`${t("CR_INFORMANT_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME_EN") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="InfomantAadhar" value={InfomantAadhar} onChange={setSelectInfomantAadhar} disable={isEdit} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="InfomantEmail" value={InfomantEmail} onChange={setSelectInfomantEmail} disable={isEdit} placeholder={`${t("CR_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"number"} optionKey="i18nKey" name="InfomantMobile" value={InfomantMobile} onChange={setSelectInfomantMobile} disable={isEdit} placeholder={`${t("CR_MOBILE_NO")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CR_ADDRESS_1_EN")}`}</CardLabel>
                            <TextArea
                                t={t}
                                isMandatory={true}
                                type={"text"}
                                optionKey="i18nKey"
                                name="InformantAddressLineOne"
                                value={InformantAddressLineOne}
                                onChange={setSelectInformantAddressLineOne}
                                disable={isEdit}
                                placeholder={`${t("CR_ADDRESS_1_EN")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS_1_EN") })}
                            />
                        </div>
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CR_ADDRESS_2_EN")}`}</CardLabel>
                            <TextArea
                                t={t}
                                isMandatory={false}
                                type={"text"}
                                optionKey="i18nKey"
                                name="InformantAddressLineTwo"
                                value={InformantAddressLineTwo}
                                onChange={setSelectInformantAddressLineTwo}
                                disable={isEdit}
                                placeholder={`${t("CR_ADDRESS_2_EN")}`}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS_2_EN") })}
                            />
                        </div>
                    </div>
                </div>




            </FormStep>
        </React.Fragment>
    );
};
export default InformantDetails;