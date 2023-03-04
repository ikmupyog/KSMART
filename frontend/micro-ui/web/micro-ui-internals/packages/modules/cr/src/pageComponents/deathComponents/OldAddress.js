import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const Address = ({ config, onSelect, userType, formData , InformantAdrsCountry, setInformantAdrsCountry,InformantAdrsStateName, setInformantAdrsStateName,InformantAdrsDistrict, setInformantAdrsDistrict,
  InformantAdrsLBTypeName, setInformantAdrsLBTypeName,InformantAdrsLBName, setInformantAdrsLBName,InformantAdrsTaluk, setInformantAdrsTaluk,InformantAdrsPostOffice, setInformantAdrsPostOffice,
  InformantAdrsPincode, setInformantAdrsPincode,InformantAdrsHouseNameEn, setInformantAdrsHouseNameEn,
  InformantAdrsResNo, setInformantAdrsResNo,InformantAdrsDoorNo, setInformantAdrsDoorNo,InformantAdrsMainPlaceEn, setInformantAdrsMainPlaceEn,InformantAdrsLocalityNameEn, setInformantAdrsLocalityNameEn,
  InformantAdrsStreetNameEn, setInformantAdrsStreetNameEn,InformantAdrsVillage, setInformantAdrsVillage,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies={}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");

  //  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [lbs, setLbs] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [InformantAdrsCountry, setInformantAdrsCountry] = useState(formData?.Address?.InformantAdrsCountry);
  // const [InformantAdrsStateName, setInformantAdrsStateName] = useState(formData?.Address?.InformantAdrsStateName);
  // const [InformantAdrsDistrict, setInformantAdrsDistrict] = useState(formData?.Address?.InformantAdrsDistrict);
  // const [InformantAdrsLBTypeName, setInformantAdrsLBTypeName] = useState(formData?.Address?.InformantAdrsLBTypeName);
  // const [InformantAdrsLBName, setInformantAdrsLBName] = useState(formData?.Address?.InformantAdrsLBName);
  // const [InformantAdrsTaluk, setInformantAdrsTaluk] = useState(formData?.Address?.InformantAdrsTaluk);
  // const [InformantAdrsPostOffice, setInformantAdrsPostOffice] = useState(formData?.Address?.InformantAdrsPostOffice);
  // const [InformantAdrsPincode, setInformantAdrsPincode] = useState(formData?.Address?.InformantAdrsPincode);
  // const [InformantAdrsHouseNameEn, setInformantAdrsHouseNameEn] = useState(formData?.Address?.InformantAdrsHouseNameEn);
  // //  const [InformantAdrsHouseNameMl, setInformantAdrsHouseNameMl] = useState(formData?.Address?.InformantAdrsHouseNameMl);
  // const [InformantAdrsBuldingNo, setInformantAdrsBuldingNo] = useState(formData?.Address?.InformantAdrsBuldingNo);
  // const [InformantAdrsResNo, setInformantAdrsResNo] = useState(formData?.Address?.InformantAdrsResNo);
  // // const [InformantAdrsInfontName, setInformantAdrsInfontName] = useState(formData?.Address?.InformantAdrsInfontName);
  // const [InformantAdrsDoorNo, setInformantAdrsDoorNo] = useState(formData?.Address?.InformantAdrsDoorNo);
  // const [InformantAdrsMainPlaceEn, setInformantAdrsMainPlaceEn] = useState(formData?.Address?.InformantAdrsMainPlaceEn);
  // //  const [InformantAdrsMainPlaceMl, setInformantAdrsMainPlaceMl] = useState(formData?.Address?.InformantAdrsMainPlaceMl);
  // const [InformantAdrsLocalityNameEn, setInformantAdrsLocalityNameEn] = useState(formData?.Address?.InformantAdrsLocalityNameEn);
  // //  const [InformantAdrsLocalityNameMl, setInformantAdrsLocalityNameMl] = useState(formData?.Address?.InformantAdrsLocalityNameMl);
  // const [InformantAdrsStreetNameEn, setInformantAdrsStreetNameEn] = useState(formData?.Address?.InformantAdrsStreetNameEn);
  // //  const [InformantAdrsStreetNameMl, setInformantAdrsStreetNameMl] = useState(formData?.Address?.InformantAdrsStreetNameMl);
  // const [InformantAdrsVillage, setInformantAdrsVillage] = useState(formData?.Address?.InformantAdrsVillage);
  // const [InfntWardNo, setInfntWardNo] = useState(formData.Address?.InfntWardNo);

  let cmbCountry = [];
  let cmbState = [];
  let cmbPlace = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let districtid = null;
  let cmbLBType = [];
  let cmbLB = [];

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

  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });

  State &&
    State["common-masters"] &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
    localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  // let Zonal = [];
  // let cmbInfntWardNo = [];
  // let cmbInfntWardNoFinal = [];
  // boundaryList &&
  //   boundaryList["egov-location"] &&
  //   boundaryList["egov-location"].TenantBoundary.map((ob) => {
  //     //  console.log(ob);
  //     // if(ob?.boundary){
  //     Zonal.push(...ob.boundary.children);
  //     ob.boundary.children.map((obward) => {
  //       cmbInfntWardNo.push(...obward.children);
  //     });
  //     // }
  //   });
  // //console.log(Zonal);
  // cmbInfntWardNo.map((wardmst) => {
  //   wardmst.localnamecmb = wardmst.InfntWardNo + " ( " + wardmst.localname + " )";
  //   wardmst.namecmb = wardmst.InfntWardNo + " ( " + wardmst.name + " )";
  //   cmbInfntWardNoFinal.push(wardmst);
  // });

  const onSkip = () => onSelect();
  function setSelectInformantAdrsCountry(value) {
    setInformantAdrsCountry(value);
    console.log("Country" + cmbCountry);
  }
  function setSelectInformantAdrsStateName(value) {
    setInformantAdrsStateName(value);
    console.log("StateName" + cmbState);
  }

  function setSelectInformantAdrsDistrict(value) {
    setIsInitialRender(true);
    setInformantAdrsDistrict(value);
    setInformantAdrsLBName(null);
    setLbs(null);
    districtid = value.districtid;
  }
  
  function setSelectInformantAdrsLBTypeName(value) {
    setInformantAdrsLBTypeName(value);
  }
  function setSelectInformantAdrsLBName(value) {
    setInformantAdrsLBName(value);
  }
  function setSelectInformantAdrsVillage(value) {
    setInformantAdrsVillage(value);
    console.log("Village" + cmbVillage);
  }
  function setSelectInformantAdrsTaluk(value) {
    setInformantAdrsTaluk(value);
    console.log("Taluk" + cmbTaluk);
  }

  function setSelectInformantAdrsPostOffice(value) {
    setInformantAdrsPostOffice(value);
  }
  function setSelectInformantAdrsPincode(e) {
    setInformantAdrsPincode(e.target.value);
  }
  // function setSelectInformantAdrsBuldingNo(e) {
  //   setInformantAdrsBuldingNo(e.target.value);
  // }
  function setSelectInformantAdrsResNo(e) {
    setInformantAdrsResNo(e.target.value);
  }
  function setSelectInformantAdrsDoorNo(e) {
    setInformantAdrsDoorNo(e.target.value);
  }
  function setSelectInformantAdrsHouseNameEn(e) {
    setInformantAdrsHouseNameEn(e.target.value);
  }
  //  function setSelectInformantAdrsHouseNameMl(e) {
  //   setInformantAdrsHouseNameMl(e.target.value);

  //   }
  function setSelectInformantAdrsInfontName(e) {
    setInformantAdrsInfontName(e.target.value);
  }

  function setSelectInformantAdrsMainPlaceEn(e) {
    setInformantAdrsMainPlaceEn(e.target.value);
  }
  //  function setSelectInformantAdrsMainPlaceMl(e) {
  //   setInformantAdrsMainPlaceMl(e.target.value);

  //   }

  function setSelectInformantAdrsLocalityNameEn(e) {
    setInformantAdrsLocalityNameEn(e.target.value);
  }
  //  function setSelectInformantAdrsLocalityNameMl(e) {
  //   setInformantAdrsLocalityNameMl(e.target.value);

  //   }

  function setSelectInformantAdrsStreetNameEn(e) {
    setInformantAdrsStreetNameEn(e.target.value);
  }

  //  function setSelectInformantAdrsStreetNameMl(e) {
  //   setInformantAdrsStreetNameMl(e.target.value);
  //   }
  // function setSelectWard(value) {
  //   setInfntWardNo(value);
  // }

  useEffect(() => {
    if (isInitialRender) {
      console.log("InformantAdrsDistrict" + districtid);
      console.log(localbodies);
      if (InformantAdrsDistrict) {
        setIsInitialRender(false);
        setLbs(cmbLB.filter((cmbLB) => cmbLB.city.districtid === InformantAdrsDistrict.districtid));
      }
    }
  }, [lbs, isInitialRender]);
  const goNext = () => {
    // sessionStorage.setItem("InformantAdrsCountry", InformantAdrsCountry.code);
    // sessionStorage.setItem("InformantAdrsStateName", InformantAdrsStateName.code);
    // sessionStorage.setItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName.code);
    // sessionStorage.setItem("InformantAdrsBuldingNo", InformantAdrsBuldingNo);
    // sessionStorage.setItem("InformantAdrsResNo", InformantAdrsResNo);
    // sessionStorage.setItem("InformantAdrsDoorNo", InformantAdrsDoorNo);
    // sessionStorage.setItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn);
    // //  sessionStorage.setItem("InformantAdrsHouseNameMl", InformantAdrsHouseNameMl);
    // sessionStorage.setItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn);
    // //  sessionStorage.setItem("InformantAdrsMainPlaceMl", InformantAdrsMainPlaceMl);
    // sessionStorage.setItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn);
    // //  sessionStorage.setItem("InformantAdrsLocalityNameMl", InformantAdrsLocalityNameMl);
    // sessionStorage.setItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn);
    // //  sessionStorage.setItem("InformantAdrsStreetNameMl", InformantAdrsStreetNameMl);
    // sessionStorage.setItem("InformantAdrsVillage", InformantAdrsVillage.code);
    // sessionStorage.setItem("InformantAdrsLBName", null);
    // sessionStorage.setItem("InformantAdrsDistrict", InformantAdrsDistrict.code);
    // sessionStorage.setItem("InformantAdrsTaluk", InformantAdrsTaluk.code);
    // sessionStorage.setItem("InformantAdrsPostOffice", InformantAdrsPostOffice.code);
    // sessionStorage.setItem("InformantAdrsPincode", InformantAdrsPincode.code);
    // sessionStorage.setItem("InformantAdrsInfontName", InformantAdrsInfontName);
    // sessionStorage.setItem(" InfntWardNo",  InfntWardNo);
   
    // onSelect(config.key, {
    //   InformantAdrsBuldingNo,
    //   InformantAdrsDoorNo,
    //   InformantAdrsHouseNameEn,
    //   InformantAdrsLocalityNameEn,
    //   InformantAdrsInfontName,
    //   InformantAdrsCountry,
    //   InformantAdrsStateName,
    //   InformantAdrsLBTypeName,
    //   InformantAdrsMainPlaceEn,
    //   InformantAdrsStreetNameEn,
    //   InformantAdrsVillage,
    //   InformantAdrsLBName,
    //   InformantAdrsDistrict,
    //   InformantAdrsTaluk,
    //   InformantAdrsPostOffice,
    //   InformantAdrsPincode,
    //   InformantAdrsResNo,
    //   InfntWardNo
    // });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!InformantAdrsCountry}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_INFORMANT_ADDRESS_HEADER")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_COUNTRY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbCountry}
                selected={InformantAdrsCountry}
                select={setSelectInformantAdrsCountry}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_STATE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbState}
                selected={InformantAdrsStateName}
                select={setSelectInformantAdrsStateName}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_DISTRICT")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbDistrict}
                selected={InformantAdrsDistrict}
                select={setSelectInformantAdrsDistrict}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbLBType}
                selected={InformantAdrsLBTypeName}
                select={setSelectInformantAdrsLBTypeName}
                disabled={isEdit}
              />
            </div>
          </div>
        </div>

      
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_LB_NAME")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={lbs}
                selected={InformantAdrsLBName}
                select={setSelectInformantAdrsLBName}
                disabled={isEdit}
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
                optionKey="name"
                isMandatory={false}
                option={cmbTaluk}
                selected={InformantAdrsTaluk}
                select={setSelectInformantAdrsTaluk}
                disabled={isEdit}
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
                isMandatory={true}
                option={cmbVillage}
                selected={InformantAdrsVillage}
                select={setSelectInformantAdrsVillage}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_VILLAGE")}`}
              />
            </div>
            
            {/* <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_WARD")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="namecmb"
                isMandatory={config.isMandatory}
                option={cmbInfntWardNoFinal}
                selected={InfntWardNo}
                select={setSelectWard}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
              />
            </div> */}
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbPostOffice}
                selected={InformantAdrsPostOffice}
                select={setSelectInformantAdrsPostOffice}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            
            
            <div className="col-md-3">
              <CardLabel>
                {t("CS_COMMON_PIN_CODE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantAdrsPincode"
                value={InformantAdrsPincode}
                onChange={setSelectInformantAdrsPincode}
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
            <div className="col-md-3">
              <CardLabel>
                {t("CR_MAIN_PLACE_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantAdrsMainPlaceEn"
                value={InformantAdrsMainPlaceEn}
                onChange={setSelectInformantAdrsMainPlaceEn}
                disable={isEdit}
                placeholder={`${t("CR_MAIN_PLACE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantAdrsLocalityNameEn"
                value={InformantAdrsLocalityNameEn}
                onChange={setSelectInformantAdrsLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantAdrsStreetNameEn"
                value={InformantAdrsStreetNameEn}
                onChange={setSelectInformantAdrsStreetNameEn}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
              />
            </div>
          </div>
        </div>

        
      

        <div className="row">
          <div className="col-md-12">
            
            <div className="col-md-3">
              <CardLabel>
                {t("CR_HOUSE_NAME_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantAdrsHouseNameEn"
                value={InformantAdrsHouseNameEn}
                onChange={setSelectInformantAdrsHouseNameEn}
                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
              />
            </div>
            <div className="col-md-3">
            <CardLabel>
                {t("CR_DOOR_NO")}
                
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantAdrsDoorNo"
                value={InformantAdrsDoorNo}
                onChange={setSelectInformantAdrsDoorNo}
                placeholder={`${t("CR_DOOR_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DOOR_NO") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantAdrsResNo"
                value={InformantAdrsResNo}
                onChange={setSelectInformantAdrsResNo}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_EN") })}
              />
            </div>
          </div>
        </div>
        
       
      </FormStep>
    </React.Fragment>
  );
};
export default Address;