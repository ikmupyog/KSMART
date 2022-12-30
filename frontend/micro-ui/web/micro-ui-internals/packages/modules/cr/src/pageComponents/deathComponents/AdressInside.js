import React, { useState, useEffect } from "react";
  import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
  // import Timeline from "../../components/CRTimeline";
  import { useTranslation } from "react-i18next";
  
  const AddressInside = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
    const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [lbs, setLbs] = useState(0);
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [PresentHouseNameMl, setPresentHouseNameMl] = useState(formData?.AddressDetails?.PresentHouseNameMl);
    const [PresentHouseNameEn, setPresentHouseNameEn] = useState(formData?.AddressDetails?.PresentHouseNameEn);
    const [PresentStreetEn, setPresentStreetEn] = useState(formData?.AddressDetails?.PresentStreetEn);
    const [PresentStreetMl, setPresentStreetMl] = useState(formData?.AddressDetails?.PresentStreetMl); 
    const [PresentViaEn, setPresentViaEn] = useState(formData?.AddressDetails?.PresentViaEn);
    const [PresentViaMl, setPresentViaMl] = useState(formData?.AddressDetails?.PresentViaMl); 
    const [PresentBuldingNo, setPresentBuldingNo] = useState(formData?.AddressDetails?.PresentBuldingNo);
    const [PresentHouseNo, setPresentHouseNo] = useState(formData?.AddressDetails?.PresentHouseNo);
    const [PresentLocalityNameEn, setPresentLocalityNameEn] = useState(formData?.AddressDetails?.PresentLocalityNameEn);
    const [PresentLocalityNameMl, setPresentLocalityNameMl] = useState(formData?.AddressDetails?.PresentLocalityNameMl);
    const [PresentCityNameEn, setPresentCityNameEn] = useState(formData?.AddressDetails?.PresentCityNameEn);
    const [PresentCityNameMl, setPresentCityNameMl] = useState(formData?.AddressDetails?.PresentCityNameMl);
    const [PresentVillage, setPresentVillage] = useState(formData?.AddressDetails?.PresentVillage);
    const [PresentLBName, setPresentLBName] = useState(formData?.AddressDetails?.PresentLBName);
    const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressDetails?.PresentDistrict);
    const [PresentTaluk, setPresentTaluk] = useState(formData?.AddressDetails?.PresentTaluk);
    const [PresentPostOffice, setPresentPostOffice] = useState(formData?.AddressDetails?.PresentPostOffice);
    const [PresentPincode, setPresentPincode] = useState(formData?.AddressDetails?.PresentPincode);
    const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressDetails?.isPrsentAddress);
    const [PermanentHouseNameEn, setPermanentHouseNameEn] = useState(formData?.AddressDetails?.PermanentHouseNameEn);
    const [PermanentHouseNameMl, setPermanentHouseNameMl] = useState(formData?.AddressDetails?.PermanentHouseNameMl);
    const [PermanentStreetEn, setPermanentStreetEn] = useState(formData?.AddressDetails?.PermanentStreetEn);
    const [PermanentStreetMl, setPermanentStreetMl] = useState(formData?.AddressDetails?.PermanentStreetMl);
    const [PermanentViaEn, setPermanentViaEn] = useState(formData?.AddressDetails?.PermanentViaEn);
    const [PermanentViaMl, setPermanentViaMl] = useState(formData?.AddressDetails?.PermanentViaMl);
    const [PermanentBuldingNo, setPermanentBuldingNo] = useState(formData?.AddressDetails?.PermanentBuldingNo);
    const [PermanentHouseNo, setPermanentHouseNo] = useState(formData?.AddressDetails?.PermanentHouseNo);
    const [PermanentLocalityNameEn, setPermanentLocalityNameEn] = useState(formData?.AddressDetails?.PermanentLocalityNameEn);
    const [PermanentLocalityNameMl, setPermanentLocalityNameMl] = useState(formData?.AddressDetails?.PermanentLocalityNameMl);
    const [PermanentCityNameEn, setPermanentCityNameEn] = useState(formData?.AddressDetails?.PermanentCityNameEn);
    const [PermanentCityNameMl, setPermanentCityNameMl] = useState(formData?.AddressDetails?.PermanentCityNameMl);
    const [PermanentVillage, setPermanentVillage] = useState(formData?.AddressDetails?.PermanentVillage);
    const [PermanentLBName, setPermanentLBName] = useState(formData?.AddressDetails?.PermanentLBName);
    const [PermanentDistrict, setPermanentDistrict] = useState(formData?.AddressDetails?.PermanentDistrict);
    const [PermanentTaluk, setPermanentTaluk] = useState(formData?.AddressDetails?.PermanentTaluk);
    const [PermanentPostOffice, setPermanentPostOffice] = useState(formData?.AddressDetails?.PermanentPostOffice);   
    const [PermanentPincode, setPermanentPincode] = useState(formData?.AddressDetails?.PermanentPincode);
   
    let cmbPlace = [];
    let cmbTaluk = [];
    let cmbVillage = [];
    let cmbDistrict = [];
    let cmbPostOffice = [];
    let districtid = null;
    console.log("Taluk" + Taluk);
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
    PostOffice &&
      District["common-masters"] &&
      District["common-masters"].District.map((ob) => {
        cmbDistrict.push(ob);
      });
    PostOffice &&
      PostOffice["common-masters"] &&
      PostOffice["common-masters"].PostOffice.map((ob) => {
        cmbPostOffice.push(ob);
      });
  
    const onSkip = () => onSelect();

    function setSelectPresentHouseNameMl(e) {
      setPresentHouseNameMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentHouseNameMl(PresentHouseNameMl);
      }
    }
    function setSelectPresentHouseNameEn(e) {
      setPresentHouseNameEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentHouseNameEn(PresentHouseNameEn);
      }
    }
    function setSelectPresentStreetMl(e) {
      setPresentStreetMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentStreetMl(PresentStreetMl);
      }
    }
    function setSelectPresentStreetEn(e) {
      setPresentStreetEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentStreetEn(PresentStreetEn);
      }
    }

    function setSelectPresentViaMl(e) {
      setPresentViaMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentViaMl(PresentViaMl);
      }
    }
    function setSelectPresentViaEn(e) {
      setPresentViaEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentViaEn(PresentViaEn);
      }
    }

    function setSelectPresentBuldingNo(e) {
      setPresentBuldingNo(e.target.value);
      if (isPrsentAddress) {
        setPermanentBuldingNo(PresentBuldingNo);
      }
    }
    function setSelectPresentHouseNo(e) {
      setPresentHouseNo(e.target.value);
      if (isPrsentAddress) {
        setPermanentHouseNo(PresentHouseNo);
      }
    }
    function setSelectPresentLocalityNameEn(e) {
      setPresentLocalityNameEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentLocalityNameEn(PresentLocalityNameEn);
      }
    }
    function setSelectPresentLocalityNameMl(e) {
      setPresentLocalityNameMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentLocalityNameMl(PresentLocalityNameMl);
      }
    }
    function setSelectPresentCityNameEn(e) {
      setPresentCityNameEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentCityNameEn(PresentCityNameEn);
      }
    }
    function setSelectPresentCityNameMl(e) {
      setPresentCityNameMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentCityNameMl(PresentCityNameMl);
      }
    }
    function setSelectPresentVillage(value) {
      setPresentVillage(value);
      console.log("Village" + cmbVillage);
      if (isPrsentAddress) {
        setPermanentVillage(PresentVillage);
      }
    }
    function setSelectPresentLBName(value) {
      setPresentLBName(value);
      if (isPrsentAddress) {
        setPermanentLBName(PresentLBName);
      }
    }
    function setSelectPresentTaluk(value) {
      setPresentTaluk(value);
      console.log("Taluk" + cmbTaluk);
      if (isPrsentAddress) {
        setPermanentTaluk(PresentTaluk);
      }
    }
    function setSelectPresentDistrict(value) {
      setIsInitialRender(true);
      setPresentDistrict(value);
      setPresentLBName(null);
      setLbs(null);
      districtid = value.districtid
      if (isPrsentAddress) {
        setPermanentDistrict(PresentDistrict);
      }
    }
    function setSelectPresentPostOffice(value) {
      setPresentPostOffice(value);
      if (isPrsentAddress) {
        setPermanentPostOffice(PresentPostOffice);
      }
    }
    function setSelectPresentPincode(e) {
      setPresentPincode(e.target.value);
      if (isPrsentAddress) {
        setPermanentPincode(PresentPincode);
      }
    }

    //Permanent Address Function
    function setSelectPermanentHouseNameMl(e) {
      setPermanentHouseNameMl(e.target.value);
    }
    function setSelectPermanentHouseNameEn(e) {
      setPermanentHouseNameEn(e.target.value);
    }
    function setSelectPermanentStreetMl(e) {
      setPermanentStreetMl(e.target.value);
    }
    function setSelectPermanentStreetEn(e) {
      setPermanentStreetEn(e.target.value);
    }  
    
    function setSelectPermanentViaMl(e) {
      setPermanentViaMl(e.target.value);
    }
    function setSelectPermanentViaEn(e) {
      setPermanentViaEn(e.target.value);
    }  

    function setSelectPermanentBuldingNo(e) {
      setPermanentBuldingNo(e.target.value);
    }
    function setSelectPermanentHouseNo(e) {
      setPermanentHouseNo(e.target.value);
    }
    function setSelectPermanentLocalityNameEn(e) {
      setPermanentLocalityNameEn(e.target.value);
    }
    function setSelectPermanentLocalityNameMl(e) {
      setPermanentLocalityNameMl(e.target.value);
    }
    function setSelectPermanentCityNameEn(e) {
      setPermanentCityNameEn(e.target.value);
    }
    function setSelectPermanentCityNameMl(e) {
      setPermanentCityNameMl(e.target.value);
    }
    function setSelectPermanentVillage(value) {
      setPermanentVillage(value);
    }
    function setSelectPermanentLBName(value) {
      setPermanentLBName(value);
    }
    function setSelectPermanentTaluk(value) {
      setPermanentTaluk(value);
    }
    function setSelectPermanentDistrict(value) {
      setPermanentDistrict(value);
      districtid = value.districtid
    }
    function setSelectPermanentPostOffice(value) {
      setPermanentPostOffice(value);
    }
    function setSelectPermanentPincode(e) {
      setPermanentPincode(e.target.value);
    }
    
    
    function setSameAsPresent(e) {
      setIsPrsentAddress(e.target.checked);
      if (e.target.checked == true) {
        setPermanentHouseNameMl(PresentHouseNameMl);
        setPermanentHouseNameEn(PresentHouseNameEn); 
        setPermanentStreetEn(PresentStreetEn);
        setPermanentStreetMl(PresentStreetMl); 
        setPermanentViaEn(PresentViaEn);
        setPermanentViaMl(PresentViaMl);       
        setPermanentBuldingNo(PresentBuldingNo);
        setPermanentHouseNo(PresentHouseNo);
        setPermanentLocalityNameEn(PresentLocalityNameEn);
        setPermanentLocalityNameMl(PresentLocalityNameMl);
        setPermanentCityNameEn(PresentCityNameEn);
        setPermanentCityNameMl(PresentCityNameMl);
        setPermanentVillage(PresentVillage);
        setPermanentLBName(PresentLBName);
        setPermanentDistrict(PresentDistrict);
        setPermanentTaluk(PresentTaluk);
        setPermanentPostOffice(PresentPostOffice);
        setPermanentPincode(PresentPincode);
              
        
      } else {
        setPermanentHouseNameMl('');
        setPermanentHouseNameEn('');
        setPermanentBuldingNo('');
        setPermanentHouseNo('');
        setPermanentPresentStreetMl('');
        setPermanentPresentStreetEn('');
        setPermanentPresentViaMl('');
        setPermanentPresentViaEn(''); 
        setPermanentLocalityNameEn('');
        setPermanentLocalityNameMl('');
        setPermanentCityNameEn('');
        setPermanentCityNameMl('');
        setPermanentVillage('');
        setPermanentLBName('');
        setPermanentDistrict('');
        setPermanentTaluk('');
        setPermanentPostOffice('');
        setPermanentPincode('');
       
      }
    }
    useEffect(() => {
      if (isInitialRender) {
        console.log("PresentDistrict" + districtid);
        console.log(localbodies);
        if (PresentDistrict) {
          setIsInitialRender(false);
          setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === PresentDistrict.districtid));
        }
      }
    }, [lbs, isInitialRender]);
    const goNext = () => {
      sessionStorage.setItem("PresentHouseNameMl", PresentHouseNameMl.code);
      sessionStorage.setItem("PresentHouseNameEn", PresentHouseNameEn.code); 
      sessionStorage.setItem("PresentBuldingNo", PresentBuldingNo);
      sessionStorage.setItem("PresentHouseNo", PresentHouseNo);
      sessionStorage.setItem("PresentStreetEn", PresentStreetEn); 
      sessionStorage.setItem("PresentStreetMl", PresentStreetMl);
      sessionStorage.setItem("PresentViaEn", PresentViatEn); 
      sessionStorage.setItem("PresentViaMl", PresentViaMl);
      sessionStorage.setItem("PresentLocalityNameEn", PresentLocalityNameEn);
      sessionStorage.setItem("PresentLocalityNameMl", PresentLocalityNameMl);
      sessionStorage.setItem("PresentCityNameEn", PresentCityNameEn);
      sessionStorage.setItem("PresentCityNameMl", PresentCityNameMl);
      sessionStorage.setItem("PresentVillage", PresentVillage.code);
      sessionStorage.setItem("PresentLBName", null);
      sessionStorage.setItem("PresentDistrict", PresentDistrict.code);
      sessionStorage.setItem("PresentTaluk", PresentTaluk.code);
      sessionStorage.setItem("PresentPostOffice", PresentPostOffice.code);
      sessionStorage.setItem("PresentPincode", PresentPincode.code);     
      sessionStorage.setItem("PermanentHouseNameMl", PresentHouseNameMl);
      sessionStorage.setItem("PermanentHouseNameEn", PresentHouseNameEn);
      sessionStorage.setItem("PermanentHouseNameEn", PresentHouseNameEn); 
      sessionStorage.setItem("PermanentStreetEn", PermanentStreetEn);   
      sessionStorage.setItem("PermanentStreetMl", PermanentStreetMl);  
      sessionStorage.setItem("PermanentViaEn", PermanentViaEn);   
      sessionStorage.setItem("PermanentViaMl", PermanentViaMl);
      sessionStorage.setItem("PresentBuldingNo", PermanentBuldingNo);
      sessionStorage.setItem("PermanentHouseNo", PermanentHouseNo);
      sessionStorage.setItem("PermanentLocalityNameEn", PermanentLocalityNameEn);
      sessionStorage.setItem("PermanentLocalityNameMl", PermanentLocalityNameMl);
      sessionStorage.setItem("PermanentCityNameEn", PermanentCityNameEn);
      sessionStorage.setItem("PermanentCityNameMl", PermanentCityNameMl);
      sessionStorage.setItem("PermanentVillage", PermanentVillage.code);
      sessionStorage.setItem("PermanentLBName", null);
      sessionStorage.setItem("PermanentDistrict", PermanentDistrict.code);
      sessionStorage.setItem("PermanentTaluk", PermanentTaluk.code);
      sessionStorage.setItem("PermanentPostOffice", PermanentPostOffice.code);
      sessionStorage.setItem("PermanentPincode", PermanentPincode.code);
      
      onSelect(config.key, {
        PresentHouseNameMl,PresentHouseNameEn,PresentBuldingNo, PresentHouseNo, PresentStreetEn,PresentStreetMl,PresentViaEn,PresentViaMl,PresentLocalityNameEn,
        PresentLocalityNameMl, PresentCityNameEn, PresentCityNameMl, PresentVillage, PresentLBName, PresentDistrict, PresentTaluk, PresentPostOffice, PresentPincode,
        PresentHouseNameEn, PermanentHouseNameMl,PermanentBuldingNo, PermanentHouseNo,PermanentViaMl,PermanentViaEn, PermanentStreetMl,PermanentStreetEn,PermanentLocalityNameEn, PermanentLocalityNameMl, PermanentCityNameEn, PermanentCityNameMl, PermanentVillage, PermanentLBName,
        PermanentDistrict, PermanentTaluk, PermanentPostOffice, PermanentPincode, 
      });
    }
    return (
      <React.Fragment>
        {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null} */}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={
          !PresentHouseNameMl ||
          !PresentHouseNameEn ||
          !PresentHouseNo ||
          !PresentStreetEn ||
          !PresentStreetMl ||
          !PresentLocalityNameEn ||
          !PresentLocalityNameMl || 
          !PresentViaEn ||
          !PresentViaMl ||         
          !PresentDistrict ||
          !PresentVillage ||
          !PresentTaluk ||
          !PresentPostOffice ||
          !PresentPincode ||   
          !PermanentHouseNameMl ||
          !PermanentHouseNameEn ||                 
          !PermanentHouseNo ||
          !PermanentStreetEn ||
          !PermanentStreetMl ||
          !PermanentLocalityNameEn ||
          !PermanentLocalityNameMl ||
          !PermanentViaEn ||
          !PermanentviaMl ||
          !PermanentDistrict ||
          !PermanentVillage ||
          !PermanentTaluk ||
          !PermanentPostOffice ||
          !PermanentPincode 
          
        }
      >
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
            {/* <div className="col-md-6">
              <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentBuldingNo"
                value={PresentBuldingNo}
                onChange={setSelectPresentBuldingNo}
                placeholder={`${t("CR_BUILDING_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
              />
            </div> */}
            <div className="col-md-6">
              <CardLabel>{t("CR_DOOR_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentBuldingNo"
                value={PresentBuldingNo}
                onChange={setSelectPresentBuldingNo}
                placeholder={`${t("CR_DOOR_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DOOR_NO") })}
              />
            </div>            
            <div className="col-md-6">
              <CardLabel>
                {t("CR_HOUSE_NO")}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentHouseNo"
                value={PresentHouseNo}
                onChange={setSelectPresentHouseNo}
                placeholder={`${t("CR_HOUSE_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NO") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-md-12" >
            <div className="col-md-6" >
                 <CardLabel>{`${t("CR_HOUSE_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PresentHouseNameEn"
                  value={PresentHouseNameEn}
                  onChange={setSelectPresentHouseNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
                  />
            </div>
            <div className="col-md-6" >
                  <CardLabel>{`${t("CR_HOUSE_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PresentHouseNameMl"
                  value={PresentHouseNameMl}
                  onChange={setSelectPresentHouseNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
                   />
            </div>
            </div>
        </div>  
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_STREET_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentStreetEn"
                value={PresentStreetEn}
                onChange={setSelectPresentStreetEn}
                placeholder={`${t("CR_STREET_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STREET_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_STREET_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentStreetMl"
                value={PresentStreetMl}
                onChange={setSelectPresentStreetMl}
                placeholder={`${t("CR_STREET_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_STREET_ML") })}
              />
            </div>
          </div>
        </div>      
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentLocalityNameEn"
                value={PresentLocalityNameEn}
                onChange={setSelectPresentLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentLocalityNameMl"
                value={PresentLocalityNameMl}
                onChange={setSelectPresentLocalityNameMl}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_MAIN_PLACE_EN")}<span className="mandatorycss">*</span> </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentCityNameEn"
                value={PresentCityNameEn}
                onChange={setSelectPresentCityNameEn}
                placeholder={`${t("CR_MAIN_PLACE_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_MAIN_PLACE_ML")}<span className="mandatorycss">*</span> </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentCityNameMl"
                value={PresentCityNameMl}
                onChange={setSelectPresentCityNameMl}
                placeholder={`${t("CR_MAIN_PLACE_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_VIA_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentViaEn"
                value={PresentViaEn}
                onChange={setSelectPresentViaEn}
                placeholder={`${t("CR_VIA_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VIA_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_VIA_ML")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentViaMl"
                value={PresentViaMl}
                onChange={setSelectPresentViaMl}
                placeholder={`${t("CR_VIA_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_VIA_ML") })}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
            <div className="col-md-12" >
              <div className="col-md-6" >
                <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbState}
                  selected={StateName}
                  select={setSelectStateName}
                  disabled={isEdit}
                />
              </div>
              <div className="col-md-6" >
                <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbCountry}
                  selected={MotherCountry}
                  select={setSelectMotherCountry}
                  disabled={isEdit}
                />
              </div>
            </div>
          </div> */}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_DISTRICT")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbDistrict}
                selected={PresentDistrict}
                select={setSelectPresentDistrict}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_LB_NAME")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={lbs}
                selected={PresentLBName}
                select={setSelectPresentLBName}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_LB_NAME")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_WARD")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbVillage}
                selected={PresentVillage}
                select={setSelectPresentVillage}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_WARD")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_VILLAGE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbVillage}
                selected={PresentVillage}
                select={setSelectPresentVillage}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_VILLAGE")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_TALUK")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbTaluk}
                selected={PresentTaluk}
                select={setSelectPresentTaluk}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_TALUK")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbPostOffice}
                selected={PresentPostOffice}
                select={setSelectPresentPostOffice}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_PIN_CODE")}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentPincode"
                value={PresentPincode}
                onChange={setSelectPresentPincode}
                disable={isEdit}
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
        </div>

        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
                <CheckBox
                  label={t("CR_PERMANANT_ADDRESS_SAME_AS_PRESENT_ADDRESS")}
                  onChange={setSameAsPresent}
                  value={isPrsentAddress}
                  checked={isPrsentAddress}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
              </h1>
            </div>
          </div>
           
          <div className="row">
            <div className="col-md-12">
              {/* <div className="col-md-6">
                <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentBuldingNo"
                  value={PermanentBuldingNo}
                  onChange={setSelectPermanentBuldingNo}
                  disable={isEdit}
                  placeholder={`${t("CR_BUILDING_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
                />
              </div> */}
              <div className="col-md-6">
                <CardLabel>{t("CR_DOOR_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentBuldingNo"
                  value={PermanentBuldingNo}
                  onChange={setSelectPermanentBuldingNo}
                  disable={isEdit}
                  placeholder={`${t("CR_DOOR_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DOOR_NO") })}
                />
              </div>
              
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_HOUSE_NO")}
                  {/* <span className="mandatorycss">*</span> */}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentHouseNo"
                  value={PermanentHouseNo}
                  onChange={setSelectPermanentHouseNo}
                  disable={isEdit}
                  placeholder={`${t("CR_HOUSE_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NO") })}
                />
              </div>
            </div>
          </div><div className="row">
            <div className="col-md-12" >
            <div className="col-md-6" >
                 <CardLabel>{`${t("CR_HOUSE_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentHouseNameEn"
                  value={PermanentHouseNameEn}
                  onChange={setSelectPermanentHouseNameEn}
                  disable={isEdit}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
                  />
            </div>
            <div className="col-md-6" >
                  <CardLabel>{`${t("CR_HOUSE_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentHouseNameMl"
                  value={PermanentHouseNameMl}
                  onChange={setSelectPermanentHouseNameMl}
                  disable={isEdit}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
                   />
            </div>
            </div>
        </div>  
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_STREET_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PermanentStreetEn"
                value={PermanentStreetEn}
                onChange={setSelectPermanentStreetEn}
                placeholder={`${t("CR_STREET_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STREET_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_STREET_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PermanentStreetMl"
                value={PermanentStreetMl}
                onChange={setSelectPermanentStreetMl}
                placeholder={`${t("CR_STREET_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_STREET_ML") })}
              />
            </div>
          </div>
        </div>       
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_LOCALITY_EN")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentLocalityNameEn"
                  value={PermanentLocalityNameEn}
                  onChange={setSelectPermanentLocalityNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_LOCALITY_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_LOCALITY_ML")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentLocalityNameMl"
                  value={PermanentLocalityNameMl}
                  onChange={setSelectPermanentLocalityNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_LOCALITY_ML")}`}
                  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_MAIN_PLACE_EN")}
                  <span className="mandatorycss">*</span> 
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentCityNameEn"
                  value={PermanentCityNameEn}
                  onChange={setSelectPermanentCityNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_MAIN_PLACE_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_MAIN_PLACE_ML")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentCityNameMl"
                  value={PermanentCityNameMl}
                  onChange={setSelectPermanentCityNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_MAIN_PLACE_ML")}`}
                  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_VIA_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PermanentViaEn"
                value={PermanentViaEn}
                onChange={setSelectPermanentViaEn}
                placeholder={`${t("CR_VIA_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VIA_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_VIA_ML")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PermanentViaMl"
                value={PermanentViaMl}
                onChange={setSelectPermanentViaMl}
                placeholder={`${t("CR_VIA_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_VIA_ML") })}
              />
            </div>
          </div>
        </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_DISTRICT")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbDistrict}
                  selected={PermanentDistrict}
                  select={setSelectPermanentDistrict}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_DISTRICT")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_LB_NAME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={lbs}
                  selected={PermanentLBName}
                  select={setSelectPermanentLBName}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_LB_NAME")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_WARD")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbVillage}
                  selected={PermanentVillage}
                  select={setSelectPermanentVillage}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_WARD")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <div className="col-md-3">
                <CardLabel>
                  {t("CS_COMMON_VILLAGE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbVillage}
                  selected={PermanentVillage}
                  select={setSelectPermanentVillage}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_VILLAGE")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {t("CS_COMMON_TALUK")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbTaluk}
                  selected={PermanentTaluk}
                  select={setSelectPermanentTaluk}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_TALUK")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {t("CS_COMMON_POST_OFFICE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbPostOffice}
                  selected={PermanentPostOffice}
                  select={setSelectPermanentPostOffice}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {t("CS_COMMON_PIN_CODE")}
                  {/* <span className="mandatorycss">*</span> */}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentPincode"
                  value={PermanentPincode}
                  onChange={setSelectPermanentPincode}
                  disable={isEdit}
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
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressInside;