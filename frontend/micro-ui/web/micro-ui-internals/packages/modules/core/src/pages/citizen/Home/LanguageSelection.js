import React, { useMemo, useState } from "react"
import { PageBasedInput, Loader, RadioButtons, CardHeader, Card, CustomButton, SubmitBar } from "@egovernments/digit-ui-react-components"
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Background from "../../../components/Background";

const LanguageSelection = () => {
    const { t } = useTranslation()
    const history = useHistory();

    const { data: { languages, stateInfo } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
    const selectedLanguage = Digit.StoreData.getCurrentLanguage();

    const [selected, setselected] = useState(selectedLanguage);
    const handleChangeLanguage = (language) => {
        setselected(language.value);
        Digit.LocalizationService.changeLanguage(language.value, stateInfo.code);
    };
    const texts = useMemo(() => ({
        header: t("CS_COMMON_CHOOSE_LANGUAGE"),
        submitBarLabel: t("CORE_COMMON_CONTINUE")
    }), [t])

    const RadioButtonProps = useMemo(() => ({
        options: languages,
        optionsKey: "label",
        additionalWrapperClass: "reverse-radio-selection-wrapper",
        onSelect: (language) => Digit.LocalizationService.changeLanguage(language.value, stateInfo.code),
        selectedOption: languages?.filter(i => i.value === selectedLanguage)[0]
    }), [selectedLanguage, languages])

    function onSubmit() {
        history.push(`/digit-ui/citizen/select-location`)
    }
    const handleSubmit = (event) => {
        history.push(`/digit-ui/citizen/select-location`);
    };

    return isLoading ? <Loader /> :
        <Background>
            {/* <PageBasedInput texts={texts} onSubmit={onSubmit}> */}
            <div className="leftdiv">
                <div className="leftflex" >
                    <h1 className="logostyle">
                        {/* <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/logo-white.png" alt="No Image" style={{ maxWidth: "450px" }} /> */}

                    </h1>
                    <div style={{ textAlign: "center", margin: "0 auto" }}>
                        <div>
                            <img src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" alt="No Image" style={{ maxWidth: "450px" }} />
                            <label style={{ fontSize: "32px",marginBottom: "20px !important" }}>Exploring K-Smart</label><br></br>
                            <label style={{ fontSize: "17px",marginTop: "20px !important" }}>Kerala - Solutions for Managing Administrative Reformation and Transformation.</label>
                        </div>
                    </div>
                    <div style={{ justifyContent: "space-between !important" }} >

                        <span style={{ marginRight: "60%" }} >2022&copy;K-Smart</span>&nbsp;
                        <span  >
                            <a className="text-white text-link" href="#">Legal</a>&nbsp;&nbsp;
                            <a className="text-white text-link" href="#">Privacy</a>
                        </span>

                    </div>
                </div>
            </div>
            <Card className="bannerCard removeBottomMargin" style={{ margin: "0 auto" }}>
                <div className="bannerHeader">
                    <p>{t(`TENANT_TENANTS_${stateInfo?.code.toUpperCase()}`)}</p>
                </div>
                <div className="language-selector" style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%" }}>
                    {languages.map((language, index) => (
                        <div className="language-button-container" key={index}>
                            <SubmitBar className="btnksmart"
                                selected={language.value === selected}
                                label={language.label}
                                
                                onClick={() => handleChangeLanguage(language)}
                            ></SubmitBar>
                        </div>
                    ))}
                </div>
                <SubmitBar className="btnksmart" style={{ width: "35%",fonntF:"system-ui !important",fontWeight: "400 !important",fontSize: "17px !important" }} 
                label={t(`CORE_COMMON_CONTINUE`)} onSubmit={handleSubmit} />
            </Card>
            {/* <CardHeader>{t("CS_COMMON_CHOOSE_LANGUAGE")}</CardHeader>
        <RadioButtons style={{ display:"initial" }}
        {...RadioButtonProps}/> */}
            {/* </PageBasedInput> */}
        </Background>
}

export default LanguageSelection