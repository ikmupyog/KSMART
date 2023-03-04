import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const AddressPresentInsideKerala = ({ config, onSelect, userType, formData, presentWardNo, setPresentWardNo,
    presentInsideKeralaDistrict, setinsideKeralaDistrict, presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName,
    presentInsideKeralaLBName, setinsideKeralaLBName, presentInsideKeralaTaluk, setinsideKeralaTaluk,
    presentInsideKeralaVillage, setinsideKeralaVillage, presentInsideKeralaPostOffice, setinsideKeralaPostOffice,
    presentInsideKeralaPincode, setinsideKeralaPincode, presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn,
    presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl, presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn,
    presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl, presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn,
    presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl, lbs, setLbs, Talukvalues, setLbsTalukvalue, Villagevalues, setLbsVillagevalue,
    PostOfficevalues, setPostOfficevalues,
    isPrsentAddress, setIsPrsentAddress, permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict, permntInKeralaAdrLBName,
    setpermntInKeralaAdrLBName, permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk, permntInKeralaAdrVillage, setpermntInKeralaAdrVillage,
    permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice, permntInKeralaAdrPincode, setpermntInKeralaAdrPincode,
    permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn, permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl,
    permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn, permntInKeralaAdrLocalityNameMl,
    setpermntInKeralaAdrLocalityNameMl, permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn, permntInKeralaAdrStreetNameMl,
    setpermntInKeralaAdrStreetNameMl, permntInKeralaWardNo, setpermntInKeralaWardNo

}) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    let tenantId = "";
    tenantId = Digit.ULBService.getCurrentTenantId();
    if (tenantId === "kl") {
        tenantId = Digit.ULBService.getCitizenCurrentTenant();
    }
    const [tenantWard,setTenantWard]=useState(tenantId);
    const [tenantboundary, setTenantboundary] = useState(false);
    const queryClient = useQueryClient();
    if (tenantboundary) {
      queryClient.removeQueries("TL_ZONAL_OFFICE");
      queryClient.removeQueries("CR_VILLAGE");
      queryClient.removeQueries("CR_TALUK");
      queryClient.removeQueries("CR_TALUK");
      setTenantboundary(false);
    }
    const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
    const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
    const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
    const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");
    const [toast, setToast] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [isDisableStatus, setDisableStatus] = useState(true);
    
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
    let cmbFilterPostOffice = [];

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
                setLbs(currentLB);
                setpermntInKeralaAdrLBName(currentLB[0]);
                cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.code === currentLB[0].city.distCodeStr);
                setinsideKeralaDistrict(cmbFilterDistrict[0]);
                setpermntInKeralaAdrDistrict(cmbFilterDistrict[0]);
                cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
                setLbsTalukvalue(cmbFilterTaluk);
                cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
                setLbsVillagevalue(cmbFilterVillage);
                cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid);
                setPostOfficevalues(cmbFilterPostOffice);
                setIsInitialRender(false);
            }
        }
    }, [District, LBType, localbodies, Talukvalues, Villagevalues, PostOfficevalues, lbs, isInitialRender]);

    const onSkip = () => onSelect();

    function setSelectinsideKeralaDistrict(value) {
        // setIsInitialRender(true);
        setinsideKeralaDistrict(value);
        setinsideKeralaTaluk(null);
        setinsideKeralaVillage(null);
        setinsideKeralaLBName(null);
        setLbs(null);
        districtid = value.districtid;
        setTenantboundary(true);
        if (cmbLB.length > 0) {
            currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === value.code);
            setLbs(currentLB);
            setpermntInKeralaAdrLBName(currentLB);
            cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === districtid);
            setLbsTalukvalue(cmbFilterTaluk);
            cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === districtid);
            setLbsVillagevalue(cmbFilterVillage);
            cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === districtid);
            setPostOfficevalues(cmbFilterPostOffice);
            setIsInitialRender(false);
        }
        if (isPrsentAddress) {
            setpermntInKeralaAdrDistrict(presentInsideKeralaDistrict);
        } else {
            setpermntInKeralaAdrDistrict('');
        }
    }
    // function setSelectinsideKeralaLBTypeName(value) {
    //     setinsideKeralaLBTypeName(value);
    // }
    function setSelectinsideKeralaLBName(value) {
        setTenantWard(value.code);
        setinsideKeralaLBName(value);
        setPresentWardNo(null);
        setTenantboundary(true)
        if (isPrsentAddress) {
            setpermntInKeralaAdrLBName(presentInsideKeralaLBName);
        } else {
            setpermntInKeralaAdrLBName('');
        }
    }
    function setSelectinsideKeralaVillage(value) {
        setinsideKeralaVillage(value);
        if (isPrsentAddress) {
            setpermntInKeralaAdrVillage(presentInsideKeralaVillage);
        } else {
            setpermntInKeralaAdrVillage('');
        }
    }
    function setSelectinsideKeralaTaluk(value) {
        setinsideKeralaTaluk(value);
        if (isPrsentAddress) {
            setpermntInKeralaAdrTaluk(presentInsideKeralaTaluk);
        } else {
            setpermntInKeralaAdrTaluk('');
        }
    }

    function setSelectinsideKeralaPostOffice(value) {
        setinsideKeralaPostOffice(value);
        setinsideKeralaPincode(value.pincode);
        if (isPrsentAddress) {
            setpermntInKeralaAdrPostOffice(presentInsideKeralaPostOffice);
        } else {
            setpermntInKeralaAdrPostOffice('');
        }
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
                if (isPrsentAddress) {
                    setpermntInKeralaAdrPincode(presentInsideKeralaPincode);
                } else {
                    setpermntInKeralaAdrPincode('');
                }
                return true;
            }
        }
    }
    function setSelectinsideKeralaHouseNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' ]/gi, ""));
            if (isPrsentAddress) {
                setpermntInKeralaAdrHouseNameEn(presentInsideKeralaHouseNameEn);
            } else {
                setpermntInKeralaAdrHouseNameEn('');
            }
        }
    }
    function setSelectinsideKeralaHouseNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaHouseNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' ]/gi, ""));
            if (isPrsentAddress) {
                setpermntInKeralaAdrHouseNameMl(presentInsideKeralaHouseNameMl);
            } else {
                setpermntInKeralaAdrHouseNameMl('');
            }
        }
    }

    function setSelectinsideKeralaLocalityNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
            if (isPrsentAddress) {
                setpermntInKeralaAdrLocalityNameEn(presentInsideKeralaLocalityNameEn);
            } else {
                setpermntInKeralaAdrLocalityNameEn('');
            }
        }
    }

    function setSelectinsideKeralaLocalityNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaLocalityNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
            if (isPrsentAddress) {
                setpermntInKeralaAdrLocalityNameMl(presentInsideKeralaLocalityNameMl);
            } else {
                setpermntInKeralaAdrLocalityNameMl('');
            }
        }
    }

    function setSelectinsideKeralaStreetNameEn(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaStreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
            if (isPrsentAddress) {
                setpermntInKeralaAdrStreetNameEn(presentInsideKeralaStreetNameEn);
            } else {
                setpermntInKeralaAdrStreetNameEn('');
            }
        }
    }

    function setSelectinsideKeralaStreetNameMl(e) {
        if (e.target.value.length === 51) {
            return false;
            // window.alert("Username shouldn't exceed 10 characters")
        } else {
            setinsideKeralaStreetNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
            if (isPrsentAddress) {
                setpermntInKeralaAdrStreetNameMl(presentInsideKeralaStreetNameMl);
            } else {
                setpermntInKeralaAdrStreetNameMl('');
            }
        }
    }

    function setSelectWard(value) {
        setPresentWardNo(value);
        if (isPrsentAddress) {
            setpermntInKeralaWardNo(presentWardNo);
        } else {
            setpermntInKeralaWardNo('');
        }
    }

    const goNext = () => {
        
    };

    if (islocalbodiesLoading || isPostOfficeLoading || isDistrictLoading || isTalukLoading || isVillageLoading || isWardLoaded) {
        return <Loader></Loader>;
    } else
        return (
            <React.Fragment>
                <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentInsideKeralaDistrict}>
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1">
                                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
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
                            //disable={isDisableStatus}
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
                        <div className="col-md-3">
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
                        <div className="col-md-3">
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
                        <div className="col-md-3">
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
                                // disable={isDisableStatus}
                                placeholder={`${t("CS_COMMON_LB_NAME")}`}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                            <CardLabel>
                                {t("CS_COMMON_POST_OFFICE")}
                                <span className="mandatorycss">*</span>
                            </CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="name"
                                option={PostOfficevalues}
                                selected={presentInsideKeralaPostOffice}
                                select={setSelectinsideKeralaPostOffice}
                                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
                            />
                        </div>
                        <div className="col-md-4">
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
                                {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
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
                                {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
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
                                    pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .`' ]*$",
                                    isRequired: true,
                                    type: "text",
                                    title: t("CR_INVALID_HOUSE_NAME_ML"),
                                })}
                            />
                        </div>
                    </div>

                </FormStep>
            </React.Fragment>
        );
};
export default AddressPresentInsideKerala;