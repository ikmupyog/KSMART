import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { sortDropdownNames } from "../../utils";

const AddressPresentInsideKerala = ({ config, onSelect, userType, formData, presentWardNo, setPresentWardNo,
    presentInsideKeralaDistrict, setinsideKeralaDistrict, presentInsideKeralaLBTypeName, setinsideKeralaLBTypeName,
    presentInsideKeralaLBName, setinsideKeralaLBName, presentInsideKeralaTaluk, setinsideKeralaTaluk,
    presentInsideKeralaVillage, setinsideKeralaVillage, presentInsideKeralaPostOffice, setinsideKeralaPostOffice,
    presentInsideKeralaPincode, setinsideKeralaPincode, presentInsideKeralaHouseNameEn, setinsideKeralaHouseNameEn,
    presentInsideKeralaHouseNameMl, setinsideKeralaHouseNameMl, presentInsideKeralaLocalityNameEn, setinsideKeralaLocalityNameEn,
    presentInsideKeralaLocalityNameMl, setinsideKeralaLocalityNameMl, presentInsideKeralaStreetNameEn, setinsideKeralaStreetNameEn,
    presentInsideKeralaStreetNameMl, setinsideKeralaStreetNameMl, lbs, setLbs, Talukvalues, setLbsTalukvalue, Villagevalues, setLbsVillagevalue,
    PostOfficevalues, setPostOfficevalues, Districtvalues, setDistrictvalue,
    isPrsentAddress, setIsPrsentAddress, permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict, permntInKeralaAdrLBName,
    setpermntInKeralaAdrLBName, permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk, permntInKeralaAdrVillage, setpermntInKeralaAdrVillage,
    permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice, permntInKeralaAdrPincode, setpermntInKeralaAdrPincode,
    permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn, permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl,
    permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn, permntInKeralaAdrLocalityNameMl,
    setpermntInKeralaAdrLocalityNameMl, permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn, permntInKeralaAdrStreetNameMl,
    setpermntInKeralaAdrStreetNameMl, permntInKeralaWardNo, setpermntInKeralaWardNo, isEditBirth = false, isEditDeath = false, isEditStillBirth = false, isEditAdoption,
    isEditBirthNAC = false, value, setValue, countryvalue, setCountryValue, TalukDropDownvalues, setLbTalukDropDownvalues,
    VillageDropDownvalues, setLbsVillageDropDownvalues, PostOfficeDropDownvalues, setPostOfficeDropDownvalues
    // isInitialRender, setIsInitialRender
}) => {
    // console.log(formData);
    const stateId = Digit.ULBService.getStateId();
    const [pofilter, setPofilter] = useState(false);
    const [isDisableEdit, setisDisableEdit] = useState(false);
    const { t } = useTranslation();
    const locale = Digit.SessionStorage.get("locale");
    let validation = {};
    let tenantId = "";
    tenantId = Digit.ULBService.getCurrentTenantId();
    if (tenantId === "kl") {
        tenantId = Digit.ULBService.getCitizenCurrentTenant();
    }
    let edittedTenantId = "";
    if (isEditBirth) {
        edittedTenantId = formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaLBName;
    } else if (isEditDeath) {
        edittedTenantId = formData?.AddressBirthDetails?.presentInsideKeralaLBName;
    } else if (isEditStillBirth) {
        edittedTenantId = formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaLBName;
    } else if (isEditAdoption) {
        edittedTenantId = formData?.AdoptionAddressBasePage?.presentInsideKeralaLBName;
    }
    const [tenantWard, setTenantWard] = useState(edittedTenantId ? edittedTenantId : tenantId);
    const [tenantboundary, setTenantboundary] = useState(false);
    const queryClient = useQueryClient();
    if (tenantboundary) {
        queryClient.removeQueries("CR_PRESENT_ADDR_WARD");
        // queryClient.removeQueries("CR_PRESENT_ADDR_VILLAGE");
        // queryClient.removeQueries("CR_PRESENT_ADDR_TALUK");
        // queryClient.removeQueries("CR_TALUK");
        setTenantboundary(false);
    }

    //const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    //const { data: TalukPresent = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PresentTaluk");
    //const { data: VillagePresent = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PresentVillage");
    const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
    // const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
    const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "PresentWard");
    const [toast, setToast] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [cmbFilterPostOffice, setCmbFilterPostOffice] = useState([]);
    let cmbLB = [];
    // let cmbTaluk = [];
    // let cmbVillage = [];
    let cmbDistrict = [];
    let cmbPostOffice = [];
    let districtid = null;
    let cmbLBType = [];
    let cmbFilterDistrict = [];
    let cmbFilterTaluk = [];
    let cmbFilterVillage = [];
    // let cmbFilterPostOffice = [];

    localbodies &&
        localbodies["tenant"] && localbodies["tenant"].tenants &&
        localbodies["tenant"].tenants.map((ob) => {
            cmbLB.push(ob);
        });
    // TalukPresent &&
    //     TalukPresent["common-masters"] && TalukPresent["common-masters"].Taluk &&
    //     TalukPresent["common-masters"].Taluk.map((ob) => {
    //         cmbTaluk.push(ob);
    //     });

    // VillagePresent &&
    //     VillagePresent["common-masters"] && VillagePresent["common-masters"].Village &&
    //     VillagePresent["common-masters"].Village.map((ob) => {
    //         cmbVillage.push(ob);
    //     });
    District &&
        District["common-masters"] && District["common-masters"].District &&
        District["common-masters"].District.map((ob) => {
            cmbDistrict.push(ob);
        });
    // PostOffice &&
    //     PostOffice["common-masters"] && PostOffice["common-masters"].PostOffice &&
    //     PostOffice["common-masters"].PostOffice.map((ob) => {
    //         cmbPostOffice.push(ob);
    //     });
    // cmbPostOffice = cmbPostOffice.sort((a, b) => a.name - b.name);
    // LBType &&
    //     LBType["common-masters"] && LBType["common-masters"].LBType &&
    //     LBType["common-masters"].LBType.map((ob) => {
    //         cmbLBType.push(ob);
    //     });
    let Zonal = [];
    let cmbWardNo = [];
    let cmbWardNoFinal = [];
    let currentLB = [];
    boundaryList &&
        boundaryList["egov-location"] && boundaryList["egov-location"].TenantBoundary &&
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
    const sortWardList = cmbWardNoFinal.sort((a, b) => a.wardno - b.wardno);


    useEffect(() => {

        if (isInitialRender) {
            if (cmbLB.length > 0 && isEditBirth === false && isEditDeath === false && isEditAdoption === false && isEditBirthNAC === false && isEditStillBirth === false &&
                countryvalue === "IND" && value === "kl" &&
                (formData?.AddressBirthDetails?.presentInsideKeralaLBName === null || formData?.AddressBirthDetails?.presentInsideKeralaLBName === "" || formData?.AddressBirthDetails?.presentInsideKeralaLBName === undefined)) {
                loadPresentInsideKeralaData();
            }
            else if (cmbLB.length > 0 && isEditBirth === false && isEditDeath === false && isEditAdoption === false && isEditBirthNAC === false && isEditStillBirth === false
                && countryvalue === "IND" && value === "kl" && formData?.AddressBirthDetails?.presentInsideKeralaLBName != null) {
                loadPresentInsideKeralaWithData();
            }
        }

    }, [District, localbodies, Districtvalues, Talukvalues, Villagevalues, PostOfficevalues, lbs, isInitialRender]);
    //District,cmbTaluk,cmbVillage, TalukPresent, localbodies, Districtvalues, Talukvalues, Villagevalues, PostOfficevalues, lbs

    function loadPresentInsideKeralaData() {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        if (currentLB.length > 0) {
            setinsideKeralaLBName(currentLB[0]);
            setLbs(cmbLB.filter((cmbLB) => cmbLB.city.districtid === currentLB[0].city.districtid));
            if (isPrsentAddress) {
                setpermntInKeralaAdrLBName(currentLB[0]);
            }
        }
        if (currentLB.length > 0 && cmbDistrict.length > 0) {
            cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === currentLB[0].city.statecode);
            setDistrictvalue(cmbFilterDistrict);
            setinsideKeralaDistrict(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);
            if (isPrsentAddress) {
                setpermntInKeralaAdrDistrict(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);
            }
        }
        // if (currentLB.length > 0 && cmbTaluk.length > 0) {
        //     cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        //     setLbsTalukvalue(cmbFilterTaluk);
        // }
        // if (currentLB.length > 0 && cmbVillage.length > 0) {
        //     cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        //     setLbsVillagevalue(cmbFilterVillage);
        // }
        // if (currentLB.length > 0 && cmbPostOffice.length > 0) {
        //     setCmbFilterPostOffice(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        //     setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        // }
        if (currentLB.length > 0) {
            setLbsTalukvalue(currentLB[0].talukList);
            setLbTalukDropDownvalues(currentLB[0].talukList);
            setLbsVillagevalue(currentLB[0].villageList);
            setLbsVillageDropDownvalues(currentLB[0].villageList);
            setCmbFilterPostOffice(currentLB[0].poList);
            setPostOfficevalues(currentLB[0].poList);
            setPostOfficeDropDownvalues(currentLB[0].poList);
        }
        if (cmbLB.length > 0 && cmbDistrict.length > 0) {
            setIsInitialRender(false);
        }
    }
    function loadPresentInsideKeralaWithData() {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === formData?.AddressBirthDetails?.presentInsideKeralaLBName.code);
        if (currentLB.length > 0) {
            setinsideKeralaLBName(currentLB[0]);
            setLbs(cmbLB.filter((cmbLB) => cmbLB.city.districtid === currentLB[0].city.districtid));
            if (isPrsentAddress) {
                setpermntInKeralaAdrLBName(currentLB[0]);
            }
        }
        if (currentLB.length > 0 && cmbDistrict.length > 0) {
            cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === currentLB[0].city.statecode);
            setDistrictvalue(cmbFilterDistrict);
            setinsideKeralaDistrict(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);
            if (isPrsentAddress) {
                setpermntInKeralaAdrDistrict(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);
            }
        }
        if (currentLB.length > 0) {
            setLbsTalukvalue(currentLB[0].talukList);
            setLbTalukDropDownvalues(currentLB[0].talukList);
            setLbsVillagevalue(currentLB[0].villageList);
            setLbsVillageDropDownvalues(currentLB[0].villageList);
            setCmbFilterPostOffice(currentLB[0].poList);
            setPostOfficevalues(currentLB[0].poList);
            setPostOfficeDropDownvalues(currentLB[0].poList);
        }
        // if (currentLB.length > 0 && cmbTaluk.length > 0) {
        //     cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        //     setLbsTalukvalue(cmbFilterTaluk);
        // }
        // if (currentLB.length > 0 && cmbVillage.length > 0) {
        //     cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        //     setLbsVillagevalue(cmbFilterVillage);
        // }
        // if (currentLB.length > 0 && cmbPostOffice.length > 0) {
        //     setCmbFilterPostOffice(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        //     setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        // }
        if (cmbLB.length > 0 && cmbDistrict.length > 0) {
            setIsInitialRender(false);
        }
    }


    if (isEditBirth) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict);
        if (formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict != null) {
            if (cmbDistrict.length > 0 && (presentInsideKeralaDistrict === undefined || presentInsideKeralaDistrict === "")) {
                cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === value);
                setDistrictvalue(cmbFilterDistrict);
                setinsideKeralaDistrict(cmbFilterDistrict.filter(cmbFilterDistrict => cmbFilterDistrict.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict)[0]);
            }
        }
        if (formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaLBName != null) {
            if (cmbLB.length > 0 && (presentInsideKeralaLBName === undefined || presentInsideKeralaLBName === "")) {
                setLbs(cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict));
                setinsideKeralaLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaLBName)[0]);
            }
        }
        if (formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaTaluk != null) {
            if (currentLB.length > 0 && (presentInsideKeralaTaluk === undefined || presentInsideKeralaTaluk === "")) {
                // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
                // setLbsTalukvalue(cmbFilterTaluk);
                // setinsideKeralaTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaTaluk)[0]);
                cmbFilterTaluk = currentLB[0].talukList;
                setLbsTalukvalue(currentLB[0].talukList);
                setinsideKeralaTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaTaluk)[0]);
            }
        }
        if (formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaVillage != null) {
            if (currentLB.length > 0 && (presentInsideKeralaVillage === undefined || presentInsideKeralaVillage === "")) {
                // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
                // setLbsVillagevalue(cmbFilterVillage);
                // setinsideKeralaVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaVillage)[0]);
                cmbFilterVillage = currentLB[0].villageList;
                setLbsVillagevalue(currentLB[0].villageList);
                setinsideKeralaVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaVillage)[0]);
            }
        }
        if (formData?.ChildDetails?.AddressBirthDetails?.presentWardNo != null && cmbWardNo.length > 0) {
            if (cmbWardNo.length > 0 && (presentWardNo === undefined || presentWardNo === "")) {
                setPresentWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.ChildDetails?.AddressBirthDetails?.presentWardNo)[0]);
            }
        }
        if (formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice != null) {
            if (currentLB.length > 0 && (presentInsideKeralaPostOffice === undefined || presentInsideKeralaPostOffice === "")) {
                // setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
                // setinsideKeralaPostOffice(cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0]);
                // let pin = cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0];
                // setinsideKeralaPincode(pin.pincode);
                setPostOfficevalues(currentLB[0].poList);
                setinsideKeralaPostOffice(currentLB[0].poList.filter(poList => poList.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0]);
                let pin = currentLB[0].poList.filter(poList => poList.code === formData?.ChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0];
                setinsideKeralaPincode(pin.pincode);
            }
        }
    }
    else if (isEditDeath) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.AddressBirthDetails?.presentInsideKeralaDistrict);
        if (formData?.AddressBirthDetails?.presentInsideKeralaDistrict != null) {
            if (cmbDistrict.length > 0 && (presentInsideKeralaDistrict === undefined || presentInsideKeralaDistrict === "")) {
                cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === value);
                setDistrictvalue(cmbFilterDistrict);
                setinsideKeralaDistrict(cmbFilterDistrict.filter(cmbFilterDistrict => cmbFilterDistrict.code === formData?.AddressBirthDetails?.presentInsideKeralaDistrict)[0]);
            }
        }
        if (formData?.AddressBirthDetails?.presentInsideKeralaLBName != null) {
            if (cmbLB.length > 0 && (presentInsideKeralaLBName === undefined || presentInsideKeralaLBName === "")) {
                setLbs(cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.AddressBirthDetails?.presentInsideKeralaDistrict));
                setinsideKeralaLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.AddressBirthDetails?.presentInsideKeralaLBName)[0]);
            }
        }
        if (formData?.AddressBirthDetails?.presentInsideKeralaTaluk != null) {
            if (currentLB.length > 0 && (presentInsideKeralaTaluk === undefined || presentInsideKeralaTaluk === "")) {
                // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
                // setLbsTalukvalue(cmbFilterTaluk);
                // setinsideKeralaTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.AddressBirthDetails?.presentInsideKeralaTaluk)[0]);
                cmbFilterTaluk = currentLB[0].talukList;
                setLbsTalukvalue(currentLB[0].talukList);
                setinsideKeralaTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.AddressBirthDetails?.presentInsideKeralaTaluk)[0]);
            }
        }
        if (formData?.AddressBirthDetails?.presentInsideKeralaVillage != null) {
            if (currentLB.length > 0 && (presentInsideKeralaVillage === undefined || presentInsideKeralaVillage === "")) {
                // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
                // setLbsVillagevalue(cmbFilterVillage);
                // setinsideKeralaVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.AddressBirthDetails?.presentInsideKeralaVillage)[0]);
                cmbFilterVillage = currentLB[0].villageList;
                setLbsVillagevalue(currentLB[0].villageList);
                setinsideKeralaVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.AddressBirthDetails?.presentInsideKeralaVillage)[0]);
            }
        }
        if (formData?.AddressBirthDetails?.presentWardNo != null && cmbWardNo.length > 0) {
            if (cmbWardNo.length > 0 && (presentWardNo === undefined || presentWardNo === "")) {
                setPresentWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.AddressBirthDetails?.presentWardNo)[0]);
            }
        }
        if (formData?.AddressBirthDetails?.presentInsideKeralaPostOffice != null) {
            if (currentLB.length > 0 && (presentInsideKeralaPostOffice === undefined || presentInsideKeralaPostOffice === "")) {
                // setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
                // setinsideKeralaPostOffice(cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0]);
                // let pin = cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0];
                // setinsideKeralaPincode(pin.pincode);
                setPostOfficevalues(currentLB[0].poList);
                setinsideKeralaPostOffice(currentLB[0].poList.filter(poList => poList.code === formData?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0]);
                let pin = currentLB[0].poList.filter(poList => poList.code === formData?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0];
                setinsideKeralaPincode(pin.pincode);
            }
        }
    }
    else if (isEditStillBirth) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict);
        if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict != null) {
            if (cmbDistrict.length > 0 && (presentInsideKeralaDistrict === undefined || presentInsideKeralaDistrict === "")) {
                cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === value);
                setDistrictvalue(cmbFilterDistrict);
                setinsideKeralaDistrict(cmbFilterDistrict.filter(cmbFilterDistrict => cmbFilterDistrict.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict)[0]);
            }
        }
        if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaLBName != null) {
            if (cmbLB.length > 0 && (presentInsideKeralaLBName === undefined || presentInsideKeralaLBName === "")) {
                setLbs(cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaDistrict));
                setinsideKeralaLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaLBName)[0]);
            }
        }
        if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaTaluk != null) {
            if (currentLB.length > 0 && (presentInsideKeralaTaluk === undefined || presentInsideKeralaTaluk === "")) {
                cmbFilterTaluk = currentLB[0].talukList;
                setLbsTalukvalue(currentLB[0].talukList);
                setinsideKeralaTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaTaluk)[0]);
            }
        }
        if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaVillage != null) {
            if (currentLB.length > 0 && (presentInsideKeralaVillage === undefined || presentInsideKeralaVillage === "")) {
                cmbFilterVillage = currentLB[0].villageList;
                setLbsVillagevalue(currentLB[0].villageList);
                setinsideKeralaVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaVillage)[0]);
            }
        }
        if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentWardNo != null && cmbWardNo.length > 0) {
            if (cmbWardNo.length > 0 && (presentWardNo === undefined || presentWardNo === "")) {
                setPresentWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentWardNo)[0]);
            }
        }
        if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice != null) {
            if (currentLB.length > 0 && (presentInsideKeralaPostOffice === undefined || presentInsideKeralaPostOffice === "")) {
                // setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
                // setinsideKeralaPostOffice(cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0]);
                // let pin = cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0];
                // setinsideKeralaPincode(pin.pincode);
                setPostOfficevalues(currentLB[0].poList);
                setinsideKeralaPostOffice(currentLB[0].poList.filter(poList => poList.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0]);
                let pin = currentLB[0].poList.filter(poList => poList.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentInsideKeralaPostOffice)[0];
                setinsideKeralaPincode(pin.pincode);
            }
        }
    }
    else if (isEditAdoption !== false) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.AdoptionAddressBasePage?.presentInsideKeralaDistrict);
        if (formData?.AdoptionAddressBasePage?.presentInsideKeralaDistrict != null) {
            if (cmbDistrict.length > 0 && (presentInsideKeralaDistrict === undefined || presentInsideKeralaDistrict === "")) {
                cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === value);
                setDistrictvalue(cmbFilterDistrict);
                setinsideKeralaDistrict(cmbFilterDistrict.filter(cmbFilterDistrict => cmbFilterDistrict.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaDistrict)[0]);
            }
        }
        if (formData?.AdoptionAddressBasePage?.presentInsideKeralaLBName != null) {
            if (cmbLB.length > 0 && (presentInsideKeralaLBName === undefined || presentInsideKeralaLBName === "")) {
                setLbs(cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.AdoptionAddressBasePage?.presentInsideKeralaDistrict));
                setinsideKeralaLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaLBName)[0]);
            }
        }
        if (formData?.AdoptionAddressBasePage?.presentInsideKeralaTaluk != null) {
            if (currentLB.length > 0 && (presentInsideKeralaTaluk === undefined || presentInsideKeralaTaluk === "")) {
                // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
                // setLbsTalukvalue(cmbFilterTaluk);
                // setinsideKeralaTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaTaluk)[0]);
                cmbFilterTaluk = currentLB[0].talukList;
                setLbsTalukvalue(currentLB[0].talukList);
                setinsideKeralaTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaTaluk)[0]);
            }
        }
        if (formData?.AdoptionAddressBasePage?.presentInsideKeralaVillage != null) {
            if (currentLB.length > 0 && (presentInsideKeralaVillage === undefined || presentInsideKeralaVillage === "")) {
                // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
                // setLbsVillagevalue(cmbFilterVillage);
                // setinsideKeralaVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaVillage)[0]);
                cmbFilterVillage = currentLB[0].villageList;
                setLbsVillagevalue(currentLB[0].villageList);
                setinsideKeralaVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaVillage)[0]);
            }
        }
        if (formData?.AdoptionAddressBasePage?.presentWardNo != null && cmbWardNo.length > 0) {
            if (cmbWardNo.length > 0 && (presentWardNo === undefined || presentWardNo === "")) {
                setPresentWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.AdoptionAddressBasePage?.presentWardNo)[0]);
            }
        }
        if (formData?.AdoptionAddressBasePage?.presentInsideKeralaPostOffice != null) {
            if (currentLB.length > 0 && (presentInsideKeralaPostOffice === undefined || presentInsideKeralaPostOffice === "")) {
                // setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
                // setinsideKeralaPostOffice(cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaPostOffice)[0]);
                // let pin = cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaPostOffice)[0];
                // setinsideKeralaPincode(pin.pincode);
                setPostOfficevalues(currentLB[0].poList);
                setinsideKeralaPostOffice(currentLB[0].poList.filter(poList => poList.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaPostOffice)[0]);
                let pin = currentLB[0].poList.filter(poList => poList.code === formData?.AdoptionAddressBasePage?.presentInsideKeralaPostOffice)[0];
                setinsideKeralaPincode(pin.pincode);
            }
        }
    }
    const onSkip = () => onSelect();

    function setSelectinsideKeralaDistrict(value) {
        // setIsInitialRender(true);
        setinsideKeralaDistrict(value);
        setinsideKeralaTaluk(null);
        setLbsTalukvalue(null);
        setinsideKeralaVillage(null);
        setLbsVillagevalue(null);
        setPostOfficevalues(null);
        setinsideKeralaLBName(null);
        setLbs(null);
        // sortWardList = "";
        districtid = value.districtid;
        setTenantboundary(true);
        if (cmbLB.length > 0) {
            currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === value.code);
            setLbs(currentLB);
            setinsideKeralaLBName(currentLB);
            // setLbsTalukvalue(currentLB[0].talukList);
            // setLbTalukDropDownvalues(currentLB[0].talukList);
            // setLbsVillagevalue(currentLB[0].villageList);
            // setLbsVillageDropDownvalues(currentLB[0].villageList);
            // setCmbFilterPostOffice(currentLB[0].poList);
            // setPostOfficevalues(currentLB[0].poList);
            // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === districtid);
            // setLbsTalukvalue(cmbFilterTaluk);
            // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === districtid);
            // setLbsVillagevalue(cmbFilterVillage);
            // setCmbFilterPostOffice(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === districtid));
            // setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === districtid));
            // setIsInitialRender(false);
        }
        if (isPrsentAddress) {
            setpermntInKeralaAdrDistrict(value);
        }
        // else {
        //     setpermntInKeralaAdrDistrict('');
        // }
    }
    // function setSelectinsideKeralaLBTypeName(value) {
    //     setinsideKeralaLBTypeName(value);
    // }
    function setSelectinsideKeralaLBName(value) {
        setinsideKeralaTaluk(null);
        setinsideKeralaVillage(null);
        setinsideKeralaPostOffice(null);
        setinsideKeralaPincode(null);
        setPresentWardNo(null);
        setTenantWard(value.code);
        setinsideKeralaLBName(value);
        setTenantboundary(true);
        if (value != null) {
            setLbsTalukvalue(value.talukList);
            setLbTalukDropDownvalues(value.talukList);
            setLbsVillagevalue(value.villageList);
            setLbsVillageDropDownvalues(value.villageList);
            setCmbFilterPostOffice(value.poList);
            setPostOfficevalues(value.poList);
            if (isPrsentAddress) {
                setpermntInKeralaAdrLBName(value);
            }
        }

    }
    function setSelectinsideKeralaTaluk(value) {
        setinsideKeralaVillage(null);
        if (value != null) {
            setinsideKeralaTaluk(value);
            setLbsVillagevalue(VillageDropDownvalues.filter((VillageDropDownvalues) => VillageDropDownvalues.talukCode === value.code));
            if (isPrsentAddress) {
                setpermntInKeralaAdrTaluk(value);
            }
        }
        // if (cmbVillage.length > 0) {
        //     setLbsVillagevalue(cmbVillage.filter((cmbVillage) => cmbVillage.talukCode === value.code));
        // }

    }
    function setSelectinsideKeralaVillage(value) {
        // setinsideKeralaTaluk(null);
        if (value != null) {
            setinsideKeralaVillage(value);
            setinsideKeralaTaluk(TalukDropDownvalues.filter((TalukDropDownvalues) => TalukDropDownvalues.code === value.talukCode)[0])
            // setLbsTalukvalue(TalukDropDownvalues.filter((TalukDropDownvalues) => TalukDropDownvalues.code === value.talukCode));
            if (isPrsentAddress) {
                setpermntInKeralaAdrVillage(value);
            }
        }
    }

    function setSelectinsideKeralaPostOffice(value) {
        setinsideKeralaPostOffice(value);
        setinsideKeralaPincode(value.pincode);
        if (isPrsentAddress) {
            setpermntInKeralaAdrPostOffice(value);
            setpermntInKeralaAdrPincode(value.pincode);
        }
    }
    const setSelectinsideKeralaPincode = (e => {

        if (e.target.value.length === 6) {
            setPostOfficevalues(PostOfficevalues.filter((postoffice) =>
                parseInt(postoffice.pincode) === parseInt(e.target.value)));
            setPofilter(true);
        } else {
            setPostOfficevalues(cmbFilterPostOffice);
            setPofilter(false);
        }
        setinsideKeralaPincode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 6));
        setinsideKeralaPostOffice(PostOfficevalues.filter((postoffice) => parseInt(postoffice.pincode) === parseInt(e.target.value))[0]);
        if (isPrsentAddress) {
            setpermntInKeralaAdrPincode(e.target.value);
        }
    });
    // function setSelectinsideKeralaPincode(e) {
    //     if (e.target.value.length != 0) {
    //         if (e.target.value.length > 6) {
    //             return false;
    //         } else if (e.target.value.length < 6) {
    //             setinsideKeralaPincode(e.target.value);
    //             return false;
    //         } else {
    //             setinsideKeralaPincode(e.target.value);
    //             if (isPrsentAddress) {
    //                 setpermntInKeralaAdrPincode(e.target.value);
    //             } else {
    //                 setpermntInKeralaAdrPincode('');
    //             }
    //             return true;
    //         }
    //     }
    // }
    function setSelectinsideKeralaHouseNameEn(e) {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9/ ]*$") != null)) {
            setinsideKeralaHouseNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            if (isPrsentAddress) {
                setpermntInKeralaAdrHouseNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            }
        }
    }
    function setSelectinsideKeralaHouseNameMl(e) {
        let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]*$/;
        if (!(e.target.value.match(pattern))) {
            e.preventDefault();
            setinsideKeralaHouseNameMl('');
        }
        else {
            setinsideKeralaHouseNameMl(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            if (isPrsentAddress) {
                setpermntInKeralaAdrHouseNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            }
        }
    }

    function setSelectinsideKeralaLocalityNameEn(e) {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setinsideKeralaLocalityNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            if (isPrsentAddress) {
                setpermntInKeralaAdrLocalityNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            }
        }
    }

    function setSelectinsideKeralaLocalityNameMl(e) {
        let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
        if (!(e.target.value.match(pattern))) {
            e.preventDefault();
            setinsideKeralaLocalityNameMl('');
        }
        else {
            setinsideKeralaLocalityNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            if (isPrsentAddress) {
                setpermntInKeralaAdrLocalityNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            }
        }
    }

    function setSelectinsideKeralaStreetNameEn(e) {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setinsideKeralaStreetNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            if (isPrsentAddress) {
                setpermntInKeralaAdrStreetNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            }
        }
    }

    function setSelectinsideKeralaStreetNameMl(e) {
        let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
        if (!(e.target.value.match(pattern))) {
            e.preventDefault();
            setinsideKeralaStreetNameMl('');
        }
        else {
            setinsideKeralaStreetNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            if (isPrsentAddress) {
                setpermntInKeralaAdrStreetNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
            }
        }
    }

    function setSelectWard(value) {
        setPresentWardNo(value);
        if (isPrsentAddress) {
            setpermntInKeralaWardNo(value);
        }
    }
    function setCheckMalayalamInputField(e) {
        let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
        if (!(e.key.match(pattern))) {
            e.preventDefault();
        }
    }
    function setCheckMalayalamInputFieldWithSplChar(e) {
        let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]/;
        if (!(e.key.match(pattern))) {
            e.preventDefault();
        }
    }
    const goNext = () => {

    };
    // isPostOfficeLoading || isTalukLoading || isVillageLoading
    if (islocalbodiesLoading || isDistrictLoading || isWardLoaded) {
        return <Loader></Loader>;
    } else
        return (
            <React.Fragment>
                {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentInsideKeralaDistrict}> */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <h1 className="headingh1">
                                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-3">
                            <CardLabel>
                                {t("CS_COMMON_DISTRICT")}
                                <span className="mandatorycss">*</span>
                            </CardLabel>
                            <Dropdown
                                t={t}
                                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                                option={sortDropdownNames(Districtvalues ? Districtvalues : [], "name", t)}
                                selected={presentInsideKeralaDistrict}
                                select={setSelectinsideKeralaDistrict}
                                disable={isDisableEdit}
                                placeholder={`${t("CS_COMMON_DISTRICT")}`}
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
                                {t("CS_COMMON_LB_NAME")}
                                <span className="mandatorycss">*</span>
                            </CardLabel>
                            <Dropdown
                                t={t}
                                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                                option={sortDropdownNames(lbs ? lbs : [], "name", t)}
                                selected={presentInsideKeralaLBName}
                                select={setSelectinsideKeralaLBName}
                                disable={isDisableEdit}
                                placeholder={`${t("CS_COMMON_LB_NAME")}`}
                            />
                        </div>
                        <div className="col-md-3">
                            <CardLabel>
                                {t("CS_COMMON_TALUK")}
                                <span className="mandatorycss">*</span>
                            </CardLabel>
                            <Dropdown
                                t={t}
                                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                                option={sortDropdownNames(Talukvalues ? Talukvalues : [], "name", t)}
                                selected={presentInsideKeralaTaluk}
                                select={setSelectinsideKeralaTaluk}
                                disable={isDisableEdit}
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
                                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                                option={sortDropdownNames(Villagevalues ? Villagevalues : [], "name", t)}
                                selected={presentInsideKeralaVillage}
                                select={setSelectinsideKeralaVillage}
                                disable={isDisableEdit}
                                placeholder={`${t("CS_COMMON_VILLAGE")}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-4">
                            <CardLabel>
                                {`${t("CS_COMMON_WARD")}`}
                                <span className="mandatorycss">*</span>
                            </CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="namecmb"
                                option={sortWardList}
                                selected={presentWardNo}
                                select={setSelectWard}
                                placeholder={`${t("CS_COMMON_WARD")}`}
                                disable={isDisableEdit}
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
                                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                                option={sortDropdownNames(PostOfficevalues ? PostOfficevalues : [], "name", t)}
                                selected={presentInsideKeralaPostOffice}
                                select={setSelectinsideKeralaPostOffice}
                                disable={isDisableEdit}
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
                                disable={isDisableEdit}
                                placeholder={`${t("CS_COMMON_PIN_CODE")}`}
                                {...(validation = {
                                    pattern: "^[0-9]*$",
                                    isRequired: true,
                                    type: "text",
                                    maxLength: 6,
                                    minLength: 6,
                                    title: t("CS_COMMON_INVALID_PIN_CODE"),
                                })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
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
                                disable={isDisableEdit}
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
                                disable={isDisableEdit}
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
                                disable={isDisableEdit}
                                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                                {...(validation = { pattern: "^[a-zA-Z-0-9/ ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
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
                                onKeyPress={setCheckMalayalamInputField}
                                onChange={setSelectinsideKeralaLocalityNameMl}
                                disable={isDisableEdit}
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
                                onKeyPress={setCheckMalayalamInputField}
                                onChange={setSelectinsideKeralaStreetNameMl}
                                disable={isDisableEdit}
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
                                onKeyPress={setCheckMalayalamInputFieldWithSplChar}
                                onChange={setSelectinsideKeralaHouseNameMl}
                                disable={isDisableEdit}
                                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                                {...(validation = {
                                    pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]*$",
                                    isRequired: true,
                                    type: "text",
                                    title: t("CR_INVALID_HOUSE_NAME_ML"),
                                })}
                            />
                        </div>
                    </div>
                </div>

                {/* </FormStep> */}
            </React.Fragment>
        );
};
export default AddressPresentInsideKerala;