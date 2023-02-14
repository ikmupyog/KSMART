import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPresentInsideKerala = ({ config, onSelect, userType, formData, presentWardNo, setPresentWardNo,
    presentInsideKeralaDistrict, setinsideKeralaDistrict, presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName,
    presentInsideKeralaLBName, setinsideKeralaLBName, presentInsideKeralaTaluk, setinsideKeralaTaluk,
    presentInsideKeralaVillage, setinsideKeralaVillage, presentInsideKeralaPostOffice, setinsideKeralaPostOffice,
    presentInsideKeralaPincode, setinsideKeralaPincode, presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn,
    presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl, presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn,
    presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl, presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn,
    presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl, lbs, setLbs, Talukvalues, setLbsTalukvalue, Villagevalues, setLbsVillagevalue

}) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const tenantId = Digit.ULBService.getCitizenCurrentTenant();
    const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
    const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
    const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
    const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "boundary-data");
    const [toast, setToast] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [isDisableStatus, setDisableStatus] = useState(true);

    // const [lbs, setLbs] = useState(0);
    //  const [presentWardNo, setPresentWardNo] = useState(formData.AddressInsideKeralaDetails?.presentWardNo);
    //  const [presentInsideKeralaDistrict, setinsideKeralaDistrict] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaDistrict);
    //  const [presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaLBTypeName);
    //  const [presentInsideKeralaLBName, setinsideKeralaLBName] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaLBName);
    //  const [presentInsideKeralaTaluk, setinsideKeralaTaluk] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaTaluk);
    //  const [presentInsideKeralaVillage, setinsideKeralaVillage] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaVillage);
    //  const [presentInsideKeralaPostOffice, setinsideKeralaPostOffice] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaPostOffice);
    //  const [presentInsideKeralaPincode, setinsideKeralaPincode] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaPincode);
    //  const [presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaHouseNameEn);
    //  const [presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaHouseNameMl);
    //  const [presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaLocalityNameEn);
    //  const [presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaLocalityNameMl);
    //  const [presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaStreetNameEn);
    //  const [presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl] = useState(formData?.AddressInsideKeralaDetails?.presentInsideKeralaStreetNameMl);
    let cmbLB = [];
    let cmbTaluk = [];
    let cmbVillage = [];
    let cmbDistrict = [];
    let cmbPostOffice = [];
    let districtid = null;
    let cmbLBType = [];
    let cmbFilterDistrict = [];
    let cmbFilterTaluk = [];
    let cmbFilterVillage = [];

    localbodies &&
        localbodies["tenant"] &&
        localbodies["tenant"].tenants.map((ob) => {
            cmbLB.push(ob);
        });
    Taluk &&
        Taluk["common-masters"] &&
        Taluk["common-masters"].Taluk.map((ob) => {
            cmbTaluk.push(ob);
        });
    Village &&
        Village["common-masters"] &&
        Village["common-masters"].Village.map((ob) => {
            cmbVillage.push(ob);
        });
    District &&
        District["common-masters"] &&
        District["common-masters"].District.map((ob) => {
            cmbDistrict.push(ob);
        });
    PostOffice &&
        PostOffice["common-masters"] &&
        PostOffice["common-masters"].PostOffice.map((ob) => {
            cmbPostOffice.push(ob);
        });
    LBType &&
        LBType["common-masters"] &&
        LBType["common-masters"].LBType.map((ob) => {
            cmbLBType.push(ob);
        });
    let Zonal = [];
    let cmbWardNo = [];
    let cmbWardNoFinal = [];
    let currentLB = [];
    boundaryList &&
        boundaryList["egov-location"] &&
        boundaryList["egov-location"].TenantBoundary.map((ob) => {
            // console.log(ob);
            // if(ob?.boundary){
            Zonal.push(...ob.boundary.children);
            ob.boundary.children.map((obward) => {
                cmbWardNo.push(...obward.children);
            });
            // }
        });
    //console.log(Zonal);
    cmbWardNo.map((wardmst) => {
        wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
        wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
        cmbWardNoFinal.push(wardmst);
    });
    useEffect(() => {

        if (isInitialRender) {
            if (cmbLB.length > 0) {
                currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
                setinsideKeralaLBName(currentLB[0]);
                cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.code === currentLB[0].city.distCodeStr);
                setinsideKeralaDistrict(cmbFilterDistrict[0]);
                cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
                setLbsTalukvalue(cmbFilterTaluk);
                cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
                setLbsVillagevalue(cmbFilterVillage);
                setIsInitialRender(false);
            }
        }
    }, [District, LBType, localbodies, Talukvalues, Villagevalues, lbs, isInitialRender]);

    const onSkip = () => onSelect();

    function setSelectinsideKeralaDistrict(value) {
        setIsInitialRender(true);
        setinsideKeralaDistrict(value);
        setinsideKeralaLBName(null);
        setLbs(null);
        districtid = value.districtid;
    }
    function setSelectinsideKeralaLBTypeName(value) {
        setinsideKeralaLBTypeName(value);
    }
    function setSelectinsideKeralaLBName(value) {
        setinsideKeralaLBName(value);
    }
    function setSelectinsideKeralaVillage(value) {
        setinsideKeralaVillage(value);
    }
    function setSelectinsideKeralaTaluk(value) {
        setinsideKeralaTaluk(value);
    }

    function setSelectinsideKeralaPostOffice(value) {
        setinsideKeralaPostOffice(value);
        setinsideKeralaPincode(value.pincode);
    }
    function setSelectinsideKeralaPincode(e) {
        if (e.target.value.length != 0) {
            if (e.target.value.length > 6) {
                return false;
            } else if (e.target.value.length < 6) {
                setinsideKeralaPincode(e.target.value);
                return false;
            } else {
                setinsideKeralaPincode(e.target.value);
                return true;
            }
        }
    }
    function setSelectinsideKeralaHouseNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
        }
    }
    function setSelectinsideKeralaHouseNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaHouseNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
        }
    }

    function setSelectinsideKeralaLocalityNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
        }
    }

    function setSelectinsideKeralaLocalityNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaLocalityNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
        }
    }

    function setSelectinsideKeralaStreetNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaStreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
        }
    }

    function setSelectinsideKeralaStreetNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaStreetNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
        }
    }

    function setSelectWard(value) {
        setPresentWardNo(value);
    }

    // useEffect(() => {
    //     if (isInitialRender) {
    //         console.log("presentInsideKeralaDistrict" + districtid);
    //         console.log(localbodies);
    //         if (presentInsideKeralaDistrict) {
    //             setIsInitialRender(false);
    //             setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === presentInsideKeralaDistrict.districtid));
    //         }
    //     }
    // }, [lbs, isInitialRender]);
    const goNext = () => {
        // sessionStorage.setItem("presentInsideKeralaLBTypeName", presentInsideKeralaLBTypeName.code);

        // sessionStorage.setItem("presentInsideKeralaHouseNameEn", presentInsideKeralaHouseNameEn ? presentInsideKeralaHouseNameEn : null);
        // sessionStorage.setItem("presentInsideKeralaHouseNameMl", presentInsideKeralaHouseNameMl ? presentInsideKeralaHouseNameMl : null);
        // sessionStorage.setItem("presentInsideKeralaLocalityNameEn", presentInsideKeralaLocalityNameEn ? presentInsideKeralaLocalityNameEn : null);
        // sessionStorage.setItem("presentInsideKeralaLocalityNameMl", presentInsideKeralaLocalityNameMl ? presentInsideKeralaLocalityNameMl : null);
        // sessionStorage.setItem("presentInsideKeralaStreetNameEn", presentInsideKeralaStreetNameEn ? presentInsideKeralaStreetNameEn : null);
        // sessionStorage.setItem("presentInsideKeralaStreetNameMl", presentInsideKeralaStreetNameMl ? presentInsideKeralaStreetNameMl : null);
        // sessionStorage.setItem("presentInsideKeralaVillage", presentInsideKeralaVillage ? presentInsideKeralaVillage.code : null);
        // sessionStorage.setItem("presentInsideKeralaLBName", presentInsideKeralaLBName ? presentInsideKeralaLBName : null);
        // sessionStorage.setItem("presentInsideKeralaDistrict", presentInsideKeralaDistrict ? presentInsideKeralaDistrict.code : null);
        // sessionStorage.setItem("presentInsideKeralaTaluk", presentInsideKeralaTaluk ? presentInsideKeralaTaluk.code : null);
        // sessionStorage.setItem("presentInsideKeralaPostOffice", presentInsideKeralaPostOffice ? presentInsideKeralaPostOffice.code : null);
        // sessionStorage.setItem("presentInsideKeralaPincode", presentInsideKeralaPincode ? presentInsideKeralaPincode.code : null);
        // sessionStorage.setItem("presentWardNo", presentWardNo ? presentWardNo.code : null);

        // onSelect(config.key, {
        //     presentInsideKeralaLBName,
        //     presentInsideKeralaDistrict,
        //     presentInsideKeralaTaluk,
        //     presentInsideKeralaVillage,
        //     presentInsideKeralaLocalityNameEn,
        //     presentInsideKeralaStreetNameEn,
        //     presentInsideKeralaHouseNameEn,
        //     presentInsideKeralaLocalityNameMl,
        //     presentInsideKeralaStreetNameMl,
        //     presentInsideKeralaHouseNameMl,
        //     presentInsideKeralaPincode,
        //     presentInsideKeralaPostOffice,
        //     presentWardNo,
        // });
    };

    if (islocalbodiesLoading || isPostOfficeLoading || isDistrictLoading || isTalukLoading || isVillageLoading || isWardLoaded) {
        return <Loader></Loader>;
    }
    return (
        <React.Fragment>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentInsideKeralaDistrict}>

                <div className="row">
                    <div className="col-md-4">
                        <CardLabel>
                            {t("CS_COMMON_DISTRICT")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="name"
                            option={cmbDistrict}
                            selected={presentInsideKeralaDistrict}
                            select={setSelectinsideKeralaDistrict}
                            placeholder={`${t("CS_COMMON_DISTRICT")}`}
                            disable={isDisableStatus}
                        />
                    </div>

                    {/* <div className="col-md-6" >
                    <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
                    <Dropdown
                    t={t}
                    optionKey="name"
                    option={cmbLBType}
                    selected={presentInsideKeralaLBTypeName}
                    select={setSelectinsideKeralaLBTypeName}
                    
                    />
                    </div> */}
                    <div className="col-md-4">
                        <CardLabel>
                            {t("CS_COMMON_TALUK")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="name"
                            option={Talukvalues}
                            selected={presentInsideKeralaTaluk}
                            select={setSelectinsideKeralaTaluk}
                            placeholder={`${t("CS_COMMON_TALUK")}`}
                        />
                    </div>
                    <div className="col-md-4">
                        <CardLabel>
                            {t("CS_COMMON_VILLAGE")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="name"
                            option={Villagevalues}
                            selected={presentInsideKeralaVillage}
                            select={setSelectinsideKeralaVillage}
                            placeholder={`${t("CS_COMMON_VILLAGE")}`}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <CardLabel>
                            {t("CS_COMMON_LB_NAME")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="name"
                            option={lbs}
                            selected={presentInsideKeralaLBName}
                            select={setSelectinsideKeralaLBName}
                            disable={isDisableStatus}
                            placeholder={`${t("CS_COMMON_LB_NAME")}`}
                        />
                    </div>
                    <div className="col-md-6">
                        <CardLabel>
                            {`${t("CS_COMMON_WARD")}`}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="namecmb"
                            option={cmbWardNoFinal}
                            selected={presentWardNo}
                            select={setSelectWard}
                            placeholder={`${t("CS_COMMON_WARD")}`}
                            {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <CardLabel>
                            {t("CR_LOCALITY_EN")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <TextInput
                            t={t}
                            type={"text"}
                            optionKey="i18nKey"
                            name="presentInsideKeralaLocalityNameEn"
                            value={presentInsideKeralaLocalityNameEn}
                            onChange={setSelectinsideKeralaLocalityNameEn}
                            placeholder={`${t("CR_LOCALITY_EN")}`}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
                        />
                    </div>
                    <div className="col-md-4">
                        <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
                        <TextInput
                            t={t}
                            type={"text"}
                            optionKey="i18nKey"
                            name="presentInsideKeralaStreetNameEn"
                            value={presentInsideKeralaStreetNameEn}
                            onChange={setSelectinsideKeralaStreetNameEn}
                            placeholder={`${t("CR_STREET_NAME_EN")}`}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
                        />
                    </div>
                    <div className="col-md-4">
                        <CardLabel>
                            {t("CR_HOUSE_NAME_EN")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <TextInput
                            t={t}
                            type={"text"}
                            optionKey="i18nKey"
                            name="presentInsideKeralaHouseNameEn"
                            value={presentInsideKeralaHouseNameEn}
                            onChange={setSelectinsideKeralaHouseNameEn}
                            placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <CardLabel>
                            {t("CR_LOCALITY_ML")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <TextInput
                            t={t}
                            type={"text"}
                            optionKey="i18nKey"
                            name="presentInsideKeralaLocalityNameMl"
                            value={presentInsideKeralaLocalityNameMl}
                            onChange={setSelectinsideKeralaLocalityNameMl}
                            placeholder={`${t("CR_LOCALITY_ML")}`}
                            {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                                isRequired: true,
                                type: "text",
                                title: t("CR_INVALID_LOCALITY_ML"),
                            })}
                        />
                    </div>
                    <div className="col-md-4">
                        <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
                        <TextInput
                            t={t}
                            type={"text"}
                            optionKey="i18nKey"
                            name="presentInsideKeralaStreetNameMl"
                            value={presentInsideKeralaStreetNameMl}
                            onChange={setSelectinsideKeralaStreetNameMl}
                            placeholder={`${t("CR_STREET_NAME_ML")}`}
                            {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                                isRequired: false,
                                type: "text",
                                title: t("CR_INVALID_STREET_NAME_ML"),
                            })}
                        />
                    </div>
                    <div className="col-md-4">
                        <CardLabel>
                            {t("CR_HOUSE_NAME_ML")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <TextInput
                            t={t}
                            type={"text"}
                            optionKey="i18nKey"
                            name="presentInsideKeralaHouseNameMl"
                            value={presentInsideKeralaHouseNameMl}
                            onChange={setSelectinsideKeralaHouseNameMl}
                            placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                            {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                                isRequired: true,
                                type: "text",
                                title: t("CR_INVALID_HOUSE_NAME_ML"),
                            })}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <CardLabel>
                            {t("CS_COMMON_POST_OFFICE")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                            t={t}
                            optionKey="name"
                            option={cmbPostOffice}
                            selected={presentInsideKeralaPostOffice}
                            select={setSelectinsideKeralaPostOffice}
                            placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
                        />
                    </div>
                    <div className="col-md-6">
                        <CardLabel>
                            {t("CS_COMMON_PIN_CODE")}
                            <span className="mandatorycss">*</span>
                        </CardLabel>
                        <TextInput
                            t={t}
                            type={"text"}
                            optionKey="i18nKey"
                            name="presentInsideKeralaPincode"
                            value={presentInsideKeralaPincode}
                            onChange={setSelectinsideKeralaPincode}
                            disable={isDisableStatus}
                            placeholder={`${t("CS_COMMON_PIN_CODE")}`}
                            {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                isRequired: true,
                                type: "number",
                                maxLength: 6,
                                minLength: 6,
                                title: t("CS_COMMON_INVALID_PIN_CODE"),
                            })}
                        />
                    </div>
                </div>
            </FormStep>
        </React.Fragment>
    );
};
export default AddressPresentInsideKerala;