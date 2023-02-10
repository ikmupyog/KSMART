import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPermanentInsideKerala = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();  
  let validation = {};
  const tenantId = Digit.ULBService.getCurrentTenantId();  
  const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [WardNo, setWardNo] = useState(formData.AddressInsideKeralaDetails?.wardno);
 
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [lbs, setLbs] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrDistrict);
  const [permntInKeralaAdrLBTypeName, setpermntInKeralaAdrLBTypeName] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrLBTypeName);
  const [permntInKeralaAdrLBName, setpermntInKeralaAdrLBName] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrLBName);
  const [permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrTaluk);
  const [permntInKeralaAdrVillage, setpermntInKeralaAdrVillage] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrVillage);
  const [permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrPostOffice);
  const [permntInKeralaAdrPincode, setpermntInKeralaAdrPincode] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrPincode);
  const [permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrHouseNameEn);
  const [permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrHouseNameMl);
  const [permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrLocalityNameEn);
  const [permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrLocalityNameMl);
  const [permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrStreetNameEn);
  const [permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl] = useState(formData?.AddressInsideKeralaDetails?.permntInKeralaAdrStreetNameMl);
 

  let cmbPlace = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let districtid = null;
  let cmbLBType = [];

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
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      //  console.log(ob);
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

  const onSkip = () => onSelect();

  function setSelectpermntInKeralaAdrDistrict(value) {
    setIsInitialRender(true);
    setpermntInKeralaAdrDistrict(value);
    setpermntInKeralaAdrLBName(null);
    setLbs(null);
    districtid = value.districtid;
  }
  function setSelectpermntInKeralaAdrLBTypeName(value) {
    setpermntInKeralaAdrLBTypeName(value);
  }
  function setSelectpermntInKeralaAdrLBName(value) {
    setpermntInKeralaAdrLBName(value);
  }
  function setSelectpermntInKeralaAdrVillage(value) {
    setpermntInKeralaAdrVillage(value);
    console.log("Village" + cmbVillage);
  }
  function setSelectpermntInKeralaAdrTaluk(value) {
    setpermntInKeralaAdrTaluk(value);
    console.log("Taluk" + cmbTaluk);
  }

  
  function setSelectpermntInKeralaAdrPostOffice(value) {
    setpermntInKeralaAdrPostOffice(value);
    console.log(value);
    setpermntInKeralaAdrPostOffice(value.pincode);
  }
  function setSelectpermntInKeralaAdrPincode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        return false;
      } else if (e.target.value.length < 6) {
        setpermntInKeralaAdrPincode(e.target.value);
        return false;
      } else {
        setpermntInKeralaAdrPincode(e.target.value);
        return true;
      }
    }
  }
  function setSelectpermntInKeralaAdrHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectpermntInKeralaAdrHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrHouseNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectpermntInKeralaAdrLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectpermntInKeralaAdrLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrLocalityNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectpermntInKeralaAdrStreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrStreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
 
  function setSelectpermntInKeralaAdrStreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setpermntInKeralaAdrStreetNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  

 
  function setSelectWard(value) {
    setWardNo(value);
  }

  useEffect(() => {
    if (isInitialRender) {
      console.log("permntInKeralaAdrDistrict" + districtid);
      console.log(localbodies);
      if (permntInKeralaAdrDistrict) {
        setIsInitialRender(false);
        setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === permntInKeralaAdrDistrict.districtid));
      }
    }
  }, [lbs, isInitialRender]);
  const goNext = () => {
    //  sessionStorage.setItem("permntInKeralaAdrLBTypeName", permntInKeralaAdrLBTypeName.code);

    sessionStorage.setItem("permntInKeralaAdrHouseNameEn", permntInKeralaAdrHouseNameEn);
    sessionStorage.setItem("permntInKeralaAdrHouseNameMl", permntInKeralaAdrHouseNameMl);

    sessionStorage.setItem("permntInKeralaAdrLocalityNameEn", permntInKeralaAdrLocalityNameEn);
    sessionStorage.setItem("permntInKeralaAdrLocalityNameMl", permntInKeralaAdrLocalityNameMl);
    sessionStorage.setItem("permntInKeralaAdrStreetNameEn", permntInKeralaAdrStreetNameEn);
    sessionStorage.setItem("permntInKeralaAdrStreetNameMl", permntInKeralaAdrStreetNameMl);
    sessionStorage.setItem("permntInKeralaAdrVillage", permntInKeralaAdrVillage.code);
    sessionStorage.setItem("permntInKeralaAdrLBName", null);
    sessionStorage.setItem("permntInKeralaAdrDistrict", permntInKeralaAdrDistrict.code);
    sessionStorage.setItem("permntInKeralaAdrTaluk", permntInKeralaAdrTaluk.code);
    sessionStorage.setItem("permntInKeralaAdrPostOffice", permntInKeralaAdrPostOffice.code);
    sessionStorage.setItem("permntInKeralaAdrPincode", permntInKeralaAdrPincode.code);

    onSelect(config.key, {
      permntInKeralaAdrLBName,
      permntInKeralaAdrDistrict,
      permntInKeralaAdrTaluk,
      permntInKeralaAdrVillage,
      permntInKeralaAdrLocalityNameEn,
      permntInKeralaAdrStreetNameEn,
      permntInKeralaAdrHouseNameEn,
      permntInKeralaAdrLocalityNameMl,
      permntInKeralaAdrStreetNameMl,
      permntInKeralaAdrHouseNameMl,
      permntInKeralaAdrPincode,
      permntInKeralaAdrPostOffice,
    });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null} */}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!permntInKeralaAdrDistrict}>
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS")}`}</span>{" "}
            </h1>
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
                selected={permntInKeralaAdrDistrict}
                select={setSelectpermntInKeralaAdrDistrict}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>

            {/* <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbLBType}
 selected={permntInKeralaAdrLBTypeName}
 select={setSelectpermntInKeralaAdrLBTypeName}
 disabled={isEdit}
 />
 </div>  */}
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_TALUK")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbTaluk}
                selected={permntInKeralaAdrTaluk}
                select={setSelectpermntInKeralaAdrTaluk}
                disabled={isEdit}
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
                isMandatory={true}
                option={cmbVillage}
                selected={permntInKeralaAdrVillage}
                select={setSelectpermntInKeralaAdrVillage}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_VILLAGE")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CS_COMMON_LB_NAME")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={lbs}
                selected={permntInKeralaAdrLBName}
                select={setSelectpermntInKeralaAdrLBName}
                disabled={isEdit}
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
                isMandatory={config.isMandatory}
                option={cmbWardNoFinal}
                selected={WardNo}
                select={setSelectWard}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="permntInKeralaAdrLocalityNameEn"
                value={permntInKeralaAdrLocalityNameEn}
                onChange={setSelectpermntInKeralaAdrLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="permntInKeralaAdrStreetNameEn"
                value={permntInKeralaAdrStreetNameEn}
                onChange={setSelectpermntInKeralaAdrStreetNameEn}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                disable={isEdit}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="permntInKeralaAdrHouseNameEn"
                value={permntInKeralaAdrHouseNameEn}
                onChange={setSelectpermntInKeralaAdrHouseNameEn}
                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="permntInKeralaAdrLocalityNameMl"
                value={permntInKeralaAdrLocalityNameMl}
                onChange={setSelectpermntInKeralaAdrLocalityNameMl}
                disable={isEdit}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="permntInKeralaAdrStreetNameMl"
                value={permntInKeralaAdrStreetNameMl}
                onChange={setSelectpermntInKeralaAdrStreetNameMl}
                placeholder={`${t("CR_STREET_NAME_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_HOUSE_NAME_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="permntInKeralaAdrHouseNameMl"
                value={permntInKeralaAdrHouseNameMl}
                onChange={setSelectpermntInKeralaAdrHouseNameMl}
                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
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
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbPostOffice}
                selected={permntInKeralaAdrPostOffice}
                select={setSelectpermntInKeralaAdrPostOffice}
                disabled={isEdit}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="permntInKeralaAdrPincode"
                value={permntInKeralaAdrPincode}
                onChange={setSelectpermntInKeralaAdrPincode}
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
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPermanentInsideKerala;