import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import CustomTimePicker from "../../components/CustomTimePicker";

const MarriagePublicPlace = ({ config, onSelect, userType, formData }) => {
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
    console.log(tenantWard);
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");
  
  let cmbDistrict = [];
  District &&
    District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
  });
  let menu = [];
  Menu &&
    Menu.map((groomGenderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${groomGenderDetails.code}`, code: `${groomGenderDetails.code}`, value: `${groomGenderDetails.code}` });
    });
   let cmbProfession = [];
     Profession &&
        Profession["birth-death-service"] &&
        Profession["birth-death-service"].Profession.map((ob) => {
            cmbProfession.push(ob);
        });
    let cmbLBType = [];
    LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
    let cmbLB = [];
    localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  let cmbTaluk = [];
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  let cmbVillage = [];
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
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

  const [marraigeDistrictid, setMarraigeDistrictid] = useState(formData?.MarriagePublicPlace?.marraigeDistrictid ? formData?.MarriagePublicPlace?.marraigeDistrictid : null);
  const [marraigeTenantid, setMarraigeTenantid] = useState(formData?.MarriagePublicPlace?.marraigeTenantid ? formData?.MarriagePublicPlace?.marraigeTenantid : null);
  const [marraigeLBtype, setMarraigeLBtype] = useState(formData?.MarriagePublicPlace?.marraigeLBtype ? formData?.MarriagePublicPlace?.marraigeLBtype : null);
  const [marraigeDOM, setMarraigeDOM] = useState(formData?.MarriagePublicPlace?.marraigeDOM ? formData?.MarriagePublicPlace?.marraigeDOM : "");
  const [marraigeVillageName, setMarraigeVillageName] = useState(formData?.MarriagePublicPlace?.marraigeVillageName ? formData?.MarriagePublicPlace?.marraigeVillageName : null);
  const [marraigeTalukID, setMarraigeTalukID] = useState(formData?.MarriagePublicPlace?.marraigeTalukID ? formData?.MarriagePublicPlace?.marraigeTalukID : null);
  const [marraigeWardCode, setMarraigeWardCode] = useState(formData?.MarriagePublicPlace?.marraigeWardCode ? formData?.MarriagePublicPlace?.marraigeWardCode : "");
  const [marriageLocalityEn, setMarriageLocalityEn] = useState(formData?.MarriagePublicPlace?.marriageLocalityEn ? formData?.MarriagePublicPlace?.marriageLocalityEn : "");
  const [marraigeOthersSpecify, setMarraigeOthersSpecify] = useState(formData?.MarriagePublicPlace?.marraigeOthersSpecify ? formData?.MarriagePublicPlace?.marraigeOthersSpecify : "");
  const [marriageLocalityMal, setMarriageLocalityMal] = useState(formData?.MarriagePublicPlace?.marriageLocalityMal ? formData?.MarriagePublicPlace?.marriageLocalityMal : "");
  const [marraigeType, setMarraigeType] = useState(
    formData?.MarriagePublicPlace?.marraigeType ? formData?.MarriagePublicPlace?.marraigeType : null
  );
  
  const [marriageLandmark, setMarriageLandmark] = useState(
    formData?.MarriagePublicPlace?.marriageLandmark ? formData?.MarriagePublicPlace?.marriageLandmark : ""
  );
  const [marriageStreetMal, setMarriageStreetMal] = useState(
    formData?.MarriagePublicPlace?.marriageStreetMal ? formData?.MarriagePublicPlace?.marriageStreetMal : ""
  );
  const [marriagePublicOrPrivateNamePlaceEn, setMarriagePublicOrPrivateNamePlaceEn] = useState(
    formData?.MarriagePublicPlace?.marriagePublicOrPrivateNamePlaceEn ? formData?.MarriagePublicPlace?.marriagePublicOrPrivateNamePlaceEn : ""
  );
  const [marriagePublicOrPrivateNamePlaceMal, setMarriagePublicOrPrivateNamePlaceMal] = useState(
    formData?.MarriagePublicPlace?.marriagePublicOrPrivateNamePlaceMal ? formData?.MarriagePublicPlace?.marriagePublicOrPrivateNamePlaceMal : ""
  );
  const [marriageStreetEn, setMarriageStreetEn] = useState(
    formData?.MarriagePublicPlace?.marriageStreetEn ? formData?.MarriagePublicPlace?.marriageStreetEn : ""
  );
  const [marriagePublicOrPrivatePlace, setMarriagePublicOrPrivatePlace] = useState(
    formData?.MarriagePublicPlace?.marriagePublicOrPrivatePlace ? formData?.MarriagePublicPlace?.marriagePublicOrPrivatePlace : null
  );
  
  const [toast, setToast] = useState(false);
  
  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();
  const cmbMarriagePublicOrPrivatePlace = [
    { i18nKey: "Public", code: "PUBLIC" },
    { i18nKey: "Private", code: "PRIVATE" },
    
  ];
  
    function setSelectMarraigeLBtype(value) {
    setMarraigeLBtype(value);
    }
    function setselectMarraigeTenantid(value) {
        setMarraigeTenantid(value);
      }
  
  function setSelectMarraigeDistrictid(value) {
    setMarraigeDistrictid(value);
  }
  function setSelectMarriagePublicOrPrivatePlace(value) {
    setMarriagePublicOrPrivatePlace(value);
  }
  
  function setSelectMarraigeVillageName(value) {
    setMarraigeVillageName(value);
  }
  function setSelectMarraigeWardCode(value) {
    setTenantWard(value.code);
    setMarraigeWardCode(value);
  }

  function setSelectMarraigeTalukID(value) {
    setMarraigeTalukID(value);
  }

  function setSelectMarraigeType(value) {
    setMarraigeType(value);
  }
  
  function setselectMarraigeDOM(value) {
    setMarraigeDOM(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
    } else {
      setMarraigeDOM(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectMarriagePublicOrPrivatePlace(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
     } 
    else {
        setMarriagePublicOrPrivatePlace(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectMarraigeOthersSpecify(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
     } 
    else {
        setMarraigeOthersSpecify(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }

  function setSelectMarriagePublicOrPrivateNamePlaceMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMarriagePublicOrPrivateNamePlaceMal(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
  function setSelectMarriagePublicOrPrivateNamePlaceEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
     } 
    else {
      setMarriagePublicOrPrivateNamePlaceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectMarriageLandmark(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
        setMarriageLandmark(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectMarriageStreetEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
        setMarriageStreetEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectMarriageLocalityEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
        setMarriageLocalityEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectMarriageLocalityMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
        setMarriageLocalityMal(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectmarriageStreetMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMarriageStreetMal(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }

  let validFlag = true;
  const goNext = () => {
  
    if (validFlag == true) {
      sessionStorage.setItem("marraigeDOM", marraigeDOM ? marraigeDOM : null);
      sessionStorage.setItem("marraigeLBtype", marraigeLBtype ? marraigeLBtype : null);
      sessionStorage.setItem("marraigeTenantid", marraigeTenantid ? marraigeTenantid : null);
      sessionStorage.setItem("marraigeVillageName", marraigeVillageName ? marraigeVillageName : null);
      sessionStorage.setItem("marriagePublicOrPrivateNamePlaceEn", marriagePublicOrPrivateNamePlaceEn ? marriagePublicOrPrivateNamePlaceEn.code : null);
      sessionStorage.setItem("marraigeWardCode", marraigeWardCode ? marraigeWardCode : null);
      sessionStorage.setItem("marraigeTalukID", marraigeTalukID ? marraigeTalukID : null);
      sessionStorage.setItem("marriageLocalityMal", marriageLocalityMal ? marriageLocalityMal : null);
      sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      sessionStorage.setItem("marraigeOthersSpecify", marraigeOthersSpecify ? marraigeOthersSpecify : null);
      sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      sessionStorage.setItem("marraigeDistrictid", marraigeDistrictid ? marraigeDistrictid.code : null);
      sessionStorage.setItem("marraigeType", marraigeType ? marraigeType : null);
      sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      sessionStorage.setItem("marriageStreetMal", marriageStreetMal ? marriageStreetMal : null);
      sessionStorage.setItem("marriagePublicOrPrivateNamePlaceMal", marriagePublicOrPrivateNamePlaceMal ? marriagePublicOrPrivateNamePlaceMal : null);
      sessionStorage.setItem("marriagePublicOrPrivatePlace", marriagePublicOrPrivatePlace ? marriagePublicOrPrivatePlace : null);
      onSelect(config.key, {
        marraigeDOM,
        marraigeDistrictid,
        marraigeLBtype,
        marraigeTenantid,
        marraigeVillageName,
        marraigeTalukID,
        marraigeWardCode,
        marriageReligiousInstitutionOther,
        marriageLocalityMal,
        marriageLocalityEn,
        marraigeOthersSpecify,
        marraigeType,
        marriageLandmark,
        marriageReligiousInstitutionOtherNameMal,
        marriagePublicOrPrivatePlace,
        marriageStreetEn,
        marriageStreetMal,
        marriagePublicOrPrivateNamePlaceMal,
        marriagePublicOrPrivateNamePlaceEn
      });
    }
  };
  if (isLoading || isProfessionLoading || isDistrictLoading || islocalbodiesLoading || isTalukLoading || isVillageLoading ||isWardLoaded) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t}>
          
          <div className="row">
            <div className="col-md-12">
            <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
            <div className="col-md-3">
             <CardLabel>
                  {`${t("CR_DATE_OF_MARRIAGE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              <DatePicker date={marraigeDOM} name="marraigeDOM" onChange={setselectMarraigeDOM} placeholder={`${t("CR_DATE_OF_MARRIAGE")}`} />
            </div>
          </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                  {`${t("CR_DISTRICT")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbDistrict}
                selected={marraigeDistrictid}
                select={setSelectMarraigeDistrictid}
                placeholder={`${t("CR_DISTRICT")}`}
              />
            </div>

            <div className="col-md-4">
              <CardLabel>
                  {`${t("CR_LB_TYPE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbLBType}
                selected={marraigeLBtype}
                select={setSelectMarraigeLBtype}
                placeholder={`${t("CR_LB_TYPE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                  {`${t("CR_LB")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbLB}
                selected={marraigeTenantid}
                select={setselectMarraigeTenantid}
                placeholder={`${t("CR_LB")}`}
              />
            </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
            <div className="col-md-4">
                      <CardLabel>
                        {t("CS_COMMON_VILLAGE")} 
                        <span className="mandatorycss">*</span>  
                      </CardLabel>
                      <Dropdown
                        t={t}
                        optionKey="name"
                        isMandatory={false}
                        option={cmbVillage}
                        selected={marraigeVillageName}
                        select={setSelectMarraigeVillageName}
                        placeholder={`${t("CS_COMMON_VILLAGE")}`}
                      />
                    </div>
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
                          selected={marraigeTalukID}
                          select={setSelectMarraigeTalukID}
                          placeholder={`${t("CS_COMMON_TALUK")}`}
                        />
            </div>
            <div className="col-md-4">
                <CardLabel>
                    {`${t("CS_COMMON_WARD")}`}
                </CardLabel>
                  <Dropdown t={t} 
                  optionKey="namecmb" 
                  option={cmbWardNoFinal} 
                  selected={marraigeWardCode} 
                  select={setSelectMarraigeWardCode}  
                  {...(validation = { isRequired: false, title: t("CS_COMMON_INVALID_WARD") })} />
                </div>
                </div>
                </div>
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-3">
                <CardLabel>{t("CR_PUBLIC_OR_PRIVATE_PLACE")}</CardLabel>{" "}
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbMarriagePublicOrPrivatePlace}
                  selected={marriagePublicOrPrivatePlace}
                  select={setSelectMarriagePublicOrPrivatePlace}
                  placeholder={`${t("CR_PUBLIC_OR_PRIVATE_PLACE")}`}
                />
                </div> 
            <div className="col-md-3">
              <CardLabel>{t("CR_PUBLIC_PRIVATE_PLACE_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="marriagePublicOrPrivateNamePlaceEn"
                value={marriagePublicOrPrivateNamePlaceEn}
                onChange={setSelectMarriagePublicOrPrivateNamePlaceEn}
                placeholder={`${t("CR_PUBLIC_PRIVATE_PLACE_EN")}`}
                
              />
            </div> 
            <div className="col-md-3">
              <CardLabel>{t("CR_PUBLIC_PRIVATE_PLACE_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="marriagePublicOrPrivateNamePlaceMal"
                value={marriagePublicOrPrivateNamePlaceMal}
                onChange={setSelectMarriagePublicOrPrivateNamePlaceMal}
                placeholder={`${t("CR_PUBLIC_PRIVATE_PLACE_EN")}`}
               
              />
            </div> 
            </div>
         </div>
         <div className="row">
            <div className="col-md-12">
               <div className="col-md-3">
                      <CardLabel>
                        {t("CR_LOCALITY_EN")}
                       
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        //name="marriageLocalityEn"
                        value={marriageLocalityEn}
                        onChange={setSelectMarriageLocalityEn}
                        placeholder={`${t("CR_LOCALITY_EN")}`}
                        
                      />
                    </div>
                <div className="col-md-3">
                      <CardLabel>
                        {t("CR_LOCALITY_ML")}
                       
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        //name="marriageLocalityMal"
                        value={marriageLocalityMal}
                        onChange={setSelectMarriageLocalityMal}
                        placeholder={`${t("CR_LOCALITY_ML")}`}
                        
                      />
                    </div>
            <div className="col-md-3">
            <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              //name="marriageStreetEn"
              value={marriageStreetEn}
              onChange={setSelectMarriageStreetEn}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              //name="marriageStreetMal"
              value={marriageStreetMal}
              onChange={setSelectmarriageStreetMal}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              
            />
          </div>
          <div className="col-md-3">
                      <CardLabel>
                        {t("CR_LANDMARK")}
                       
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        //name="marriageLandmark"
                        value={marriageLandmark}
                        onChange={setSelectMarriageLandmark}
                        placeholder={`${t("CR_LANDMARK")}`}
                        
                      />
                    </div>
                </div>
            </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_CUSTOM_AND_CEREMONY_DETAILS")}`}</span>{" "}
              </h1>
            </div>
            </div>
          <div className="col-md-row">
            <div className="col-md-12">
                
            <div className="col-md-3">
              <CardLabel>
                  {`${t("CR_MARRIAGE_TYPE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                t={t}
                optionKey="i18nKey"
                isMandatory={false}
                //option={cmbmarriagetype}
                selected={marraigeType}
                select={setSelectMarraigeType}
                placeholder={`${t("CR_MARRIAGE_TYPE")}`}
              />
            </div>
              <div className="col-md-3">
                      <CardLabel>
                        {t("CR_MARRIAGE_OTHER_SPECIFY")}
                       
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        //name="marraigeOthersSpecify"
                        value={marraigeOthersSpecify}
                        onChange={setSelectMarraigeOthersSpecify}
                        placeholder={`${t("CR_MARRIAGE_OTHER_SPECIFY")}`}
                        
                      />
                    </div>
            </div>
          </div>

          {toast && (
            <Toast
              error={
                AadharError || DOBError
                // || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
              }
              label={
                AadharError || DOBError
                  ? //  || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
                    // InstitutionError || SignedOfficerInstError || signedOfficerDesgInstError
                    AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : DOBError
                    ? t(`BIRTH_DOB_VALIDATION_MSG`)
                    : // : signedOfficerError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                      // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

                      setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}

          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
};
export default MarriagePublicPlace;
