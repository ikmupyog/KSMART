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

  const [marriageDistrictid, setMarriageDistrictid] = useState(formData?.MarriagePublicPlace?.marriageDistrictid ? formData?.MarriagePublicPlace?.marriageDistrictid : null);
  const [marriageTenantid, setMarriageTenantid] = useState(formData?.MarriagePublicPlace?.marriageTenantid ? formData?.MarriagePublicPlace?.marriageTenantid : null);
  const [marriageLBtype, setMarriageLBtype] = useState(formData?.MarriagePublicPlace?.marriageLBtype ? formData?.MarriagePublicPlace?.marriageLBtype : null);
  const [marriageDOM, setMarriageDOM] = useState(formData?.MarriagePublicPlace?.marriageDOM ? formData?.MarriagePublicPlace?.marriageDOM : "");
  const [marriageVillageName, setMarriageVillageName] = useState(formData?.MarriagePublicPlace?.marriageVillageName ? formData?.MarriagePublicPlace?.marriageVillageName : null);
  const [marriageTalukID, setMarriageTalukID] = useState(formData?.MarriagePublicPlace?.marriageTalukID ? formData?.MarriagePublicPlace?.marriageTalukID : null);
  const [marriageWardCode, setMarriageWardCode] = useState(formData?.MarriagePublicPlace?.marriageWardCode ? formData?.MarriagePublicPlace?.marriageWardCode : "");
  const [marriageLocalityEn, setMarriageLocalityEn] = useState(formData?.MarriagePublicPlace?.marriageLocalityEn ? formData?.MarriagePublicPlace?.marriageLocalityEn : "");
  const [marriageOthersSpecify, setMarriageOthersSpecify] = useState(formData?.MarriagePublicPlace?.marriageOthersSpecify ? formData?.MarriagePublicPlace?.marriageOthersSpecify : "");
  const [marriageLocalityMal, setMarriageLocalityMal] = useState(formData?.MarriagePublicPlace?.marriageLocalityMal ? formData?.MarriagePublicPlace?.marriageLocalityMal : "");
  const [marriageType, setMarriageType] = useState(
    formData?.MarriagePublicPlace?.marriageType ? formData?.MarriagePublicPlace?.marriageType : null
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
  
    function setSelectMarriageLBtype(value) {
    setMarriageLBtype(value);
    }
    function setselectMarriageTenantid(value) {
        setMarriageTenantid(value);
      }
  
  function setSelectMarriageDistrictid(value) {
    setMarriageDistrictid(value);
  }
  function setSelectMarriagePublicOrPrivatePlace(value) {
    setMarriagePublicOrPrivatePlace(value);
  }
  
  function setSelectMarriageVillageName(value) {
    setMarriageVillageName(value);
  }
  function setSelectMarriageWardCode(value) {
    setTenantWard(value.code);
    setMarriageWardCode(value);
  }

  function setSelectMarriageTalukID(value) {
    setMarriageTalukID(value);
  }

  function setSelectMarriageType(value) {
    setMarriageType(value);
  }
  
  function setselectMarriageDOM(value) {
    setMarriageDOM(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
    } else {
      setMarriageDOM(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  
  function setSelectMarriageOthersSpecify(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMarriageOthersSpecify(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectMarriagePublicOrPrivateNamePlaceMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMarriagePublicOrPrivateNamePlaceMal('');
    } else {
      setMarriagePublicOrPrivateNamePlaceMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriagePublicOrPrivateNamePlaceEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMarriagePublicOrPrivateNamePlaceEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageLandmark(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
       setMarriageLandmark(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageStreetEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
       setMarriageStreetEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageLocalityEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMarriageLocalityEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageLocalityMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMarriageLocalityMal('');
    } else {
        setMarriageLocalityMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectmarriageStreetMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMarriageStreetMal('');
    } else {
      setMarriageStreetMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  let validFlag = true;
  const goNext = () => {
  
    if (validFlag == true) {
      sessionStorage.setItem("marriageDOM", marriageDOM ? marriageDOM : null);
      sessionStorage.setItem("marriageLBtype", marriageLBtype ? marriageLBtype : null);
      sessionStorage.setItem("marriageTenantid", marriageTenantid ? marriageTenantid : null);
      sessionStorage.setItem("marriageVillageName", marriageVillageName ? marriageVillageName : null);
      sessionStorage.setItem("marriagePublicOrPrivateNamePlaceEn", marriagePublicOrPrivateNamePlaceEn ? marriagePublicOrPrivateNamePlaceEn.code : null);
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
      sessionStorage.setItem("marriagePublicOrPrivateNamePlaceMal", marriagePublicOrPrivateNamePlaceMal ? marriagePublicOrPrivateNamePlaceMal : null);
      sessionStorage.setItem("marriagePublicOrPrivatePlace", marriagePublicOrPrivatePlace ? marriagePublicOrPrivatePlace : null);
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
              <DatePicker date={marriageDOM} name="marriageDOM" onChange={setselectMarriageDOM} placeholder={`${t("CR_DATE_OF_MARRIAGE")}`} />
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
                select={setSelectMarriageDistrictid}
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
                select={setSelectMarriageLBtype}
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
                select={setselectMarriageTenantid}
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
                        select={setSelectMarriageVillageName}
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
                          select={setSelectMarriageTalukID}
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
                  selected={marriageWardCode} 
                  select={setSelectMarriageWardCode}  
                  {...(validation = { isRequired: false, title: t("CS_COMMON_INVALID_WARD") })} />
                </div>
                </div>
                </div>
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-4">
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
            <div className="col-md-4">
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
            <div className="col-md-4">
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
                selected={marriageType}
                select={setSelectMarriageType}
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
                        onChange={setSelectMarriageOthersSpecify}
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
