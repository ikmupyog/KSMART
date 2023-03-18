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

const MarriageInstitution = ({ config, onSelect, userType, formData }) => {
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

  const [marriageDistrictid, setmarriageDistrictid] = useState(formData?.MarriageInstitution?.marriageDistrictid ? formData?.MarriageInstitution?.marriageDistrictid : null);
  const [marriageTenantid, setmarriageTenantid] = useState(formData?.MarriageInstitution?.marriageTenantid ? formData?.MarriageInstitution?.marriageTenantid : null);
  const [marriageLBtype, setmarriageLBtype] = useState(formData?.MarriageInstitution?.marriageLBtype ? formData?.MarriageInstitution?.marriageLBtype : null);
  const [marriageDOM, setmarriageDOM] = useState(formData?.MarriageInstitution?.marriageDOM ? formData?.MarriageInstitution?.marriageDOM : "");
  const [marriageVillageName, setmarriageVillageName] = useState(formData?.MarriageInstitution?.marriageVillageName ? formData?.MarriageInstitution?.marriageVillageName : null);
  const [marriageTalukID, setmarriageTalukID] = useState(formData?.MarriageInstitution?.marriageTalukID ? formData?.MarriageInstitution?.marriageTalukID : null);
  const [marriageWardCode, setmarriageWardCode] = useState(formData?.MarriageInstitution?.marriageWardCode ? formData?.MarriageInstitution?.marriageWardCode : "");
  const [marriageLocalityEn, setMarriageLocalityEn] = useState(formData?.MarriageInstitution?.marriageLocalityEn ? formData?.MarriageInstitution?.marriageLocalityEn : "");
  const [marriageOthersSpecify, setmarriageOthersSpecify] = useState(formData?.MarriageInstitution?.marriageOthersSpecify ? formData?.MarriageInstitution?.marriageOthersSpecify : "");
  const [marriageLocalityMal, setMarriageLocalityMal] = useState(formData?.MarriageInstitution?.marriageLocalityMal ? formData?.MarriageInstitution?.marriageLocalityMal : "");
<<<<<<< HEAD
  const [marriageType, setmarriageType] = useState(
    formData?.GroomDetails?.marriageType ? formData?.GroomDetails?.marriageType : null
=======
  const [marraigeType, setMarraigeType] = useState(
    formData?.MarriageInstitution?.marraigeType ? formData?.MarriageInstitution?.marraigeType : null
>>>>>>> a11d376a05 (added)
  );
  const [marriageReligiousInstitutionOther, setMarriageReligiousInstitutionOther] = useState(
    formData?.MarriageInstitution?.marriageReligiousInstitutionOther ? formData?.MarriageInstitution?.marriageReligiousInstitutionOther : ""
  );
  const [marriageLandmark, setMarriageLandmark] = useState(
    formData?.MarriageInstitution?.marriageLandmark ? formData?.MarriageInstitution?.marriageLandmark : ""
  );
  const [marriageStreetMal, setMarriageStreetMal] = useState(
    formData?.MarriageInstitution?.marriageStreetMal ? formData?.MarriageInstitution?.marriageStreetMal : ""
  );
  const [marriageReligiousInstitutionOtherNameEn, setMarriageReligiousInstitutionOtherNameEn] = useState(
    formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameEn ? formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameEn : ""
  );
  const [marriageReligiousInstitutionOtherNameMal, setMarriageReligiousInstitutionOtherNameMal] = useState(
    formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameMal ? formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameMal : ""
  );
  const [marriageStreetEn, setMarriageStreetEn] = useState(
    formData?.MarriageInstitution?.marriageStreetEn ? formData?.MarriageInstitution?.marriageStreetEn : ""
  );
  const [marriageReligiousInstitution, setMarriageReligiousInstitution] = useState(
    formData?.MarriageInstitution?.marriageReligiousInstitution ? formData?.MarriageInstitution?.marriageReligiousInstitution : null
  );
  
  const [toast, setToast] = useState(false);
  
  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();
  const cmbMarriageReligiousInstitution = [
    { i18nKey: "Mandapam", code: "MANDAPAM" },
    { i18nKey: "Hall", code: "HALL" },
    { i18nKey: "Auditorium", code: "AUDITORIUM" },
    { i18nKey: "ConventionCenter", code: "CONVENTIONCENTER" },
  ];

  const cmbSpouseLiving = [
    { i18nKey: "Yes", code: "YES" },
    { i18nKey: "No", code: "NO" },
  ];
  
    function setSelectmarriageLBtype(value) {
    setmarriageLBtype(value);
    }
    function setselectmarriageTenantid(value) {
        setmarriageTenantid(value);
      }
  
  function setSelectmarriageDistrictid(value) {
    setmarriageDistrictid(value);
  }
  function setSelectMarriageReligiousInstitution(value) {
    setMarriageReligiousInstitution(value);
  }
  
  function setSelectmarriageVillageName(value) {
    setmarriageVillageName(value);
  }
  function setSelectmarriageWardCode(value) {
    setTenantWard(value.code);
    setmarriageWardCode(value);
  }

  function setSelectmarriageTalukID(value) {
    setmarriageTalukID(value);
  }

  function setSelectmarriageType(value) {
    setmarriageType(value);
  }
  
  function setselectmarriageDOM(value) {
    setmarriageDOM(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
    } else {
      setmarriageDOM(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectMarriageReligiousInstitutionOther(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
     } 
    else {
        setMarriageReligiousInstitutionOther(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectmarriageOthersSpecify(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
     } 
    else {
        setmarriageOthersSpecify(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }

  function setSelectMarriageReligiousInstitutionOtherNameMal(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setMarriageReligiousInstitutionOtherNameMal(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
    }
  }
  function setSelectMarriageReligiousInstitutionOtherNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
     } 
    else {
      setMarriageReligiousInstitutionOtherNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
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
      sessionStorage.setItem("marriageDOM", marriageDOM ? marriageDOM : null);
      sessionStorage.setItem("marriageLBtype", marriageLBtype ? marriageLBtype : null);
      sessionStorage.setItem("marriageTenantid", marriageTenantid ? marriageTenantid : null);
      sessionStorage.setItem("marriageVillageName", marriageVillageName ? marriageVillageName : null);
      sessionStorage.setItem("marriageReligiousInstitutionOther", marriageReligiousInstitutionOther ? marriageReligiousInstitutionOther.code : null);
      sessionStorage.setItem("marriageWardCode", marriageWardCode ? marriageWardCode : null);
      sessionStorage.setItem("marriageTalukID", marriageTalukID ? marriageTalukID : null);
      sessionStorage.setItem("marriageLocalityMal", marriageLocalityMal ? marriageLocalityMal : null);
      sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      sessionStorage.setItem("marriageOthersSpecify", marriageOthersSpecify ? marriageOthersSpecify : null);
      sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      sessionStorage.setItem("marriageDistrictid", marriageDistrictid ? marriageDistrictid.code : null);
      sessionStorage.setItem("marriageType", marriageType ? marriageType : null);
      sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      sessionStorage.setItem("marriageStreetMal", marriageStreetMal ? marriageStreetMal : null);
      sessionStorage.setItem("marriageReligiousInstitutionOtherNameMal", marriageReligiousInstitutionOtherNameMal ? marriageReligiousInstitutionOtherNameMal : null);
      sessionStorage.setItem("MarriageReligiousInstitutionOtherNameEn", MarriageReligiousInstitutionOtherNameEn ? MarriageReligiousInstitutionOtherNameEn : null);
      onSelect(config.key, {
        marriageDOM,
        marriageDistrictid,
        marriageLBtype,
        marriageTenantid,
        marriageVillageName,
        marriageTalukID,
        marriageWardCode,
        marriageReligiousInstitutionOther,
        marriageLocalityMal,
        marriageLocalityEn,
        marriageOthersSpecify,
        marriageType,
        marriageLandmark,
        marriageReligiousInstitutionOtherNameMal,
        MarriageReligiousInstitutionOtherNameEn,
        marriageStreetEn,
        marriageStreetMal,
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
              <DatePicker date={marriageDOM} name="marriageDOM" onChange={setselectmarriageDOM} placeholder={`${t("CR_DATE_OF_MARRIAGE")}`} />
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
                selected={marriageDistrictid}
                select={setSelectmarriageDistrictid}
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
                selected={marriageLBtype}
                select={setSelectmarriageLBtype}
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
                selected={marriageTenantid}
                select={setselectmarriageTenantid}
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
                        selected={marriageVillageName}
                        select={setSelectmarriageVillageName}
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
                          selected={marriageTalukID}
                          select={setSelectmarriageTalukID}
                          placeholder={`${t("CS_COMMON_TALUK")}`}
                        />
            </div>
            <div className="col-md-4">
                <CardLabel>
                    {`${t("CS_COMMON_WARD")}`}
                </CardLabel>
                  <Dropdown t={t} 
                  optionKey="namecmb" 
                  //isMandatory={config.isMandatory} 
                  option={cmbWardNoFinal} 
                  selected={marriageWardCode} 
                  select={setSelectmarriageWardCode}  
                  {...(validation = { isRequired: false, title: t("CS_COMMON_INVALID_WARD") })} />
                </div>
                </div>
                </div>
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-3">
                <CardLabel>{t("CR_RELIGIOUS_INSTITUTION")}</CardLabel>{" "}
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbMarriageReligiousInstitution}
                  selected={marriageReligiousInstitution}
                  select={setSelectMarriageReligiousInstitution}
                  placeholder={`${t("CR_RELIGIOUS_INSTITUTION")}`}
                />
                </div> 
                <div className="col-md-3">
              <CardLabel>{t("CR_RELIGIOUS_INSTITUTION_OTHER")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                //name="marriageReligiousInstitutionOther"
                value={marriageReligiousInstitutionOther}
                onChange={setSelectMarriageReligiousInstitutionOther}
                placeholder={`${t("CR_RELIGIOUS_INSTITUTION_OTHER")}`}
                
              />
            </div> 
            <div className="col-md-3">
              <CardLabel>{t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                //name="marriageReligiousInstitutionOtherNameEn"
                value={marriageReligiousInstitutionOtherNameEn}
                onChange={setSelectMarriageReligiousInstitutionOtherNameEn}
                placeholder={`${t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}`}
                
              />
            </div> 
            <div className="col-md-3">
              <CardLabel>{t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                //name="marriageReligiousInstitutionOtherNameMal"
                value={marriageReligiousInstitutionOtherNameMal}
                onChange={setSelectMarriageReligiousInstitutionOtherNameMal}
                placeholder={`${t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}`}
               
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
                selected={marriageType}
                select={setSelectmarriageType}
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
                        //name="marriageOthersSpecify"
                        value={marriageOthersSpecify}
                        onChange={setSelectmarriageOthersSpecify}
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
export default MarriageInstitution;
