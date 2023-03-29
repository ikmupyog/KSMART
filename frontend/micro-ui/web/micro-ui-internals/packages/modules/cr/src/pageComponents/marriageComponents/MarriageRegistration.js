import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  NewRadioButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import MarriageInstitution from "./MarriageInstitution";
import HouseMarriageRegistration from "./HouseMarriageRegistration";
import MarriagePublicPlace from "./MarriagePublicPlace";
import { useQueryClient } from "react-query";
// import { TimePicker } from '@material-ui/pickers';

const MarriageRegistration = ({ config, onSelect, userType, formData, isEditMarriage }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  let tenantId = "";
  let districtid = null;
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  console.log({ tenantId });

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [tenantWard, setTenantWard] = useState(tenantId);
  const [lbs, setLbs] = useState([]);
  const [Talukvalues, setLbsTalukvalue] = useState(null);
  const [Villagevalues, setLbsVillagevalue] = useState(null);
  const [tenantboundary, setTenantboundary] = useState(false);
  const [isWardChange, setIsWardChange] = useState(false);

  const queryClient = useQueryClient();
  if (tenantboundary) {
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    queryClient.removeQueries("CR_VILLAGE");
    queryClient.removeQueries("CR_TALUK");
    setTenantboundary(false);
  }
  if (isWardChange) {
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    setIsWardChange(false);
  }

  const { data: District = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: LBType = {}, isLBTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");

  //To be changed when master data come
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];
  const cmbPlaceType = [
    { i18nKey: "Religious Institution", name: "RELIGIOUSINSTITUTION", namelocal: "മത സ്ഥാപനം" },
    {
      i18nKey: "Mandapam/Hall/Auditorium/Convention Centre",
      name: "MANDAPAM/HALL/AUDITORIUM/CONVENTIONALCENTRE",
      namelocal: "മണ്ഡപം/ ഹാൾ / ഓഡിറ്റോറിയം",
    },
    { i18nKey: "Sub Registrar's Office", name: "SUBREGISTRARSOFFICE", namelocal: "സബ് രജിസ്ട്രാർ ഓഫീസ്" },
    { i18nKey: "House", name: "HOUSE", namelocal: "വീട്" },
    { i18nKey: "Private Place", name: "PRIVATEPLACE", namelocal: "സ്വകാര്യ സ്ഥലം" },
    { i18nKey: "Public Place", name: "PUBLICPLACE", namelocal: "പൊതു സ്ഥലം" },
  ];

  const cmbPlaceNameReligious = [
    { i18nKey: "Religious Institution 1", name: "RELIGIOUSINSTITUTION1", namelocal: "മത സ്ഥാപനം 1" },
    { i18nKey: "Religious Institution 2", name: "RELIGIOUSINSTITUTION2", namelocal: "മത സ്ഥാപനം 2" },
    { i18nKey: "Others", name: "OTHERS", namelocal: "മറ്റുള്ളവ" },
  ];

  const cmbPlaceNameMandapam = [
    {
      i18nKey: "Mandapam 1",
      name: "RELIGIOUSINSTITUTION1",
      namelocal: "മണ്ഡപം 1",
    },
    {
      i18nKey: "Mandapam 2",
      name: "RELIGIOUSINSTITUTION2",
      namelocal: "മണ്ഡപം 2",
    },
    {
      i18nKey: "Others",
      name: "OTHERS",
      namelocal: "മറ്റുള്ളവ",
    },
  ];

  const cmbTypeOfMarriage = [
    {
      i18nKey: "Hindu",
      name: "HINDU",
    },
    {
      i18nKey: "Christian",
      name: "CHRISTIAN",
    },
    {
      i18nKey: "Muslim",
      name: "MUSLIM",
    },
    {
      i18nKey: "Judaism",
      name: "JUDAISM",
    },
    {
      i18nKey: "Budhism",
      name: "BUDHISM",
    },
    {
      i18nKey: "Jainism",
      name: "JAINISM",
    },
    {
      i18nKey: "Sikhism",
      name: "SIKHISM",
    },
    {
      i18nKey: "Muslim",
      name: "MUSLIM",
    },
    {
      i18nKey: "Zorastrianism",
      name: "ZORASTRIANISM",
    },
    {
      i18nKey: "Special MArriage Act",
      name: "SPECIALMARRIAGEACT",
    },
    {
      i18nKey: "Other",
      name: "OTHERS",
    },
  ];

  console.log(tenantWard);

  let cmbDistrict = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbLBType = [];
  let cmbLB = [];
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  let cmbFilterTaluk = [];
  let cmbFilterVillage = [];
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
  District &&
    District["common-masters"] &&
    District["common-masters"].District &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].Taluk &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  let currentLB = [];
  const [marriageDOM, setmarriageDOM] = useState(formData?.MarriageDetails?.marriageDOM ? formData?.MarriageDetails?.marriageDOM : "");
  const [marriageDistrict, setmarriageDistrict] = useState(
    formData?.MarriageDetails?.marriageDistrict ? formData?.MarriageDetails?.marriageDistrict : ""
  );

  const [marriageTalukID, setmarriageTalukID] = useState(
    formData?.MarriageDetails?.marriageTalukID ? formData?.MarriageDetails?.marriageTalukID : ""
  );
  const [marriageVillageName, setmarriageVillageName] = useState(
    formData?.MarriageDetails?.marriageVillageName ? formData?.MarriageDetails?.marriageVillageName : ""
  );
  const [marriageLBtype, setmarriageLBtype] = useState(formData?.MarriageDetails?.marriageLBtype ? formData?.MarriageDetails?.marriageLBtype : "");

  const [marriageTenantid, setmarriageTenantid] = useState(
    formData?.MarriageDetails?.marriageTenantid ? formData?.MarriageDetails?.marriageTenantid : null
  );

  const [marriagePlacetype, setmarriagePlacetype] = useState(
    formData?.MarriageDetails?.marriagePlacetype ? formData?.MarriageDetails?.marriagePlacetype : ""
  );
  const [marriagePlacenameEn, setmarriagePlacenameEn] = useState(
    formData?.MarriageDetails?.marriagePlacenameEn ? formData?.MarriageDetails?.marriagePlacenameEn : ""
  );
  const [marriagePlacenameMal, setmarriagePlacenameMal] = useState(
    formData?.MarriageDetails?.marriagePlacenameMal ? formData?.MarriageDetails?.marriagePlacenameMal : ""
  );
  const [marriageOthersSpecify, setmarriageOthersSpecify] = useState(
    formData?.MarriageDetails?.marriageOthersSpecify ? formData?.MarriageDetails?.marriageOthersSpecify : ""
  );
  const [marriageType, setmarriageType] = useState(formData?.MarriageDetails?.marriageType ? formData?.MarriageDetails?.marriageType : "");
  const [marriageWardCode, setmarriageWardCode] = useState(
    formData?.MarriageDetails?.marriageWardCode ? formData?.MarriageDetails?.marriageWardCode : ""
  );
  const [isDisableEdit, setisDisableEdit] = useState(isEditMarriage ? isEditMarriage : false);
  const [file, setFile] = useState();

  const stateDist = cmbDistrict?.filter((dist) => dist.statecode == "kl");
  console.log({ stateDist });

  // const distTaluk = cmbTaluk?.filter((taluk) => taluk.distId === marriageDistrict.districtid);
  // console.log({ distTaluk });

  // const talukVillage = cmbVillage?.filter((village) => village.distId === marriageDistrict.districtid);
  // console.log({ talukVillage });

  const filteredLBType = cmbLBType?.filter((lbType) => lbType.name === "Municipality" || lbType.name === "Corporation");

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSkip = () => onSelect();

  function setSelectmarriageDOM(value) {
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
      // setDOBError(true);
      // setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectmarriageDistrict(value) {
    setmarriageDistrict(value);
    console.log("District" + cmbDistrict);
    setLbs(null);
    districtid = value.districtid;
    setTenantboundary(true);
    if (cmbLB.length > 0) {
      currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === value.code);
      setLbs(currentLB);
      cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === districtid);
      setLbsTalukvalue(cmbFilterTaluk);
      cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === districtid);
      setLbsVillagevalue(cmbFilterVillage);
      setIsInitialRender(false);
    }
  }
  function setSelectmarriageTalukID(value) {
    setmarriageTalukID(value);
    console.log("Taluk" + cmbTaluk);
  }
  function setSelectmarriageVillageName(value) {
    setmarriageVillageName(value);
    console.log("Village" + cmbVillage);
  }
  function setSelectmarriageLBtype(value) {
    setmarriageLBtype(value);
    console.log("LBType" + cmbLBType);
  }
  function setSelectmarriageTenantid(value) {
    setIsWardChange(true);
    setmarriageWardCode(null);
    setTenantWard(value.code);
    setmarriageTenantid(value);
    console.log("LBType" + cmbLB);
  }
  function setSelectmarriagePlacetype(value) {
    setmarriagePlacetype(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriagePlacenameEn(value) {
    setmarriagePlacenameEn(value);
    // setmarriagePlacenameMal(value.localname);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriagePlacenameMal(value) {
    setmarriagePlacenameMal(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageOthersSpecify(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setmarriageOthersSpecify(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectmarriageType(value) {
    setmarriageType(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageWardCode(value) {
    setTenantWard(value.code);
    setmarriageWardCode(value);
  }

  function setCSLB(selectedLBType) {
    const localbodies = lbs.filter((LB) => LB.city.districtid === marriageDistrict.districtid);
    if (selectedLBType.name === "Municipality") {
      const filteredMunicipality = localbodies.filter((LB) => LB.city.lbtypecode.split("_")[2] === "MUNICIPALITY");
      console.log({ filteredMunicipality });
      return filteredMunicipality;
    } else if (selectedLBType.name === "Corporation") {
      const filteredCorporation = localbodies.filter((LB) => LB.city.lbtypecode.split("_")[2] === "CORPORATION");
      return filteredCorporation;
    }
  }
  function setMarriagePlace(place) {
    if (place.i18nKey === "Religious Institution") {
      return cmbPlaceNameReligious;
    } else if (place.i18nKey === "Mandapam/Hall/Auditorium/Convention Centre") {
      return cmbPlaceNameMandapam;
    } else {
      return cmbPlaceNameMandapam;
    }
  }

  let validFlag = true;
  const goNext = () => {
    // if (AadharError) {
    //   validFlag = false;
    //   setAadharErroChildAadharNor(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    //   // return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setAadharError(false);
    // }
    if (validFlag == true) {
      sessionStorage.setItem("marriageDOM", marriageDOM ? marriageDOM : null);
      sessionStorage.setItem("marriageDistrict", marriageDistrict ? marriageDistrict : null);
      sessionStorage.setItem("marriageLBtype", marriageLBtype ? marriageLBtype : null);
      sessionStorage.setItem("marriageWardCode", marriageWardCode ? marriageWardCode : null);
      sessionStorage.setItem("marriageTenantid", marriageTenantid ? marriageTenantid : null);
      sessionStorage.setItem("marriageTalukID", marriageTalukID ? marriageTalukID : null);
      sessionStorage.setItem("marriageVillageName", marriageVillageName ? marriageVillageName : null);
      sessionStorage.setItem("marriagePlacetype", marriagePlacetype ? marriagePlacetype : null);
      sessionStorage.setItem("marriagePlacenameEn", marriagePlacenameEn ? marriagePlacenameEn : null);
      sessionStorage.setItem("marriagePlacenameMal", marriagePlacenameMal ? marriagePlacenameMal : null);
      sessionStorage.setItem("marriageType", marriageType ? marriageType : null);
      sessionStorage.setItem("marriageOthersSpecify", marriageOthersSpecify ? marriageOthersSpecify : null);
      // sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);

      onSelect(config.key, {
        marriageDOM,
        marriageDistrict,
        marriageTenantid,
        marriageLBtype,
        marriageVillageName,
        marriageTalukID,
        marriagePlacetype,
        marriagePlacenameEn,
        marriagePlacenameMal,
        marriageType,
        marriageWardCode,
        marriageOthersSpecify,
        // tripStartTime,
        // selectedOption,
        // Gender,
      });
    }
  };

  console.log({ marriagePlacenameEn });

  useEffect(() => {
    setmarriagePlacenameEn("");
    setmarriagePlacenameEn("");
    setmarriagePlacenameMal("");
  }, [marriagePlacetype]);

  useEffect(() => {
    if (marriagePlacenameEn) {
      const marriagePlaceMalayalam = setMarriagePlace(marriagePlacetype).filter((place) => place.i18nKey === marriagePlacenameEn.i18nKey);
      setmarriagePlacenameMal(marriagePlaceMalayalam[0]);
    }
  }, [marriagePlacenameEn]);

  console.log({ marriagePlacenameMal });

  if (isLoading || isTalukLoading || isVillageLoading || isLBTypeLoading || islocalbodiesLoading || isWardLoaded) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={1} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_MARRIAGE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardLabel>
                      {`${t("CR_DATE_OF_MARRIAGE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <DatePicker
                      date={marriageDOM}
                      isMandatory={false}
                      name="marriageDOM"
                      onChange={setSelectmarriageDOM}
                      inputFormat="DD-MM-YYYY"
                      placeholder={`${t("CR_DATE_OF_MARRIAGE")}`}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_DATE_OF_MARRIAGE") })}
                    />
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
                <div className="col_md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CS_COMMON_DISTRICT")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      isMandatory={true}
                      optionKey="name"
                      option={stateDist}
                      name="marriageDistrict"
                      value={marriageDistrict}
                      select={setSelectmarriageDistrict}
                      selected={marriageDistrict}
                      placeholder={t("CS_COMMON_DISTRICT'")}
                      {...(validation = { isRequired: true, title: t("CR_COMMON_INVALID_DISTRICT") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CS_COMMON_TALUK")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      isMandatory={true}
                      optionKey="name"
                      option={Talukvalues}
                      name="marriageTalukID"
                      value={marriageTalukID}
                      select={setSelectmarriageTalukID}
                      selected={marriageTalukID}
                      placeholder={t("CS_COMMON_TALUK'")}
                      {...(validation = { isRequired: true, title: t("CR_COMMON_INVALID_TALUK") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CS_COMMON_VILLAGE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={true}
                      option={Villagevalues}
                      name="marriageVillageName"
                      value={marriageVillageName}
                      select={setSelectmarriageVillageName}
                      selected={marriageVillageName}
                      placeholder={t("CS_COMMON_VILLAGE'")}
                      {...(validation = { isRequired: true, title: t("CR_COMMON_INVALID_VILLAGE") })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col_md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CS_LBTYPE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={true}
                      option={filteredLBType}
                      name="marriageLBtype"
                      value={marriageLBtype}
                      select={setSelectmarriageLBtype}
                      selected={marriageLBtype}
                      placeholder={t("CS_LBTYPE'")}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_LBTYPE") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CS_LB")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="code"
                      isMandatory={true}
                      option={setCSLB(marriageLBtype)}
                      name="marriageTenantid"
                      value={marriageTenantid}
                      selected={marriageTenantid}
                      select={setSelectmarriageTenantid}
                      placeholder={`${t("CS_LB")}`}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_LB") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CS_COMMON_WARD")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="namecmb"
                      isMandatory={true}
                      placeholder={t("CS_COMMON_WARD'")}
                      option={cmbWardNoFinal}
                      selected={marriageWardCode}
                      select={setSelectmarriageWardCode}
                      {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col_md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_MARRIAGE_PLACE_TYPE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      option={cmbPlaceType}
                      selected={marriagePlacetype}
                      select={setSelectmarriagePlacetype}
                      placeholder={t("CR_MARRIAGE_PLACE_TYPE")}
                      isMandatory={true}
                      {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_TYPE") })}
                      // option={cmbCountry}
                    />
                  </div>
                  {(marriagePlacetype.i18nKey === "Religious Institution" ||
                    marriagePlacetype.i18nKey === "Mandapam/Hall/Auditorium/Convention Centre" ||
                    marriagePlacetype.i18nKey === "Sub Registrar's Office") && (
                    <React.Fragment>
                      <div className="col-md-4">
                        <CardLabel>
                          {`${t("CR_NAME_OF_PLACE_EN")}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                          t={t}
                          type={"text"}
                          optionKey="i18nKey"
                          option={setMarriagePlace(marriagePlacetype)}
                          selected={marriagePlacenameEn}
                          select={setSelectmarriagePlacenameEn}
                          placeholder={t("CR_NAME_OF_PLACE_EN")}
                          isMandatory={true}
                          {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_EN") })}
                          // option={cmbCountry}
                        />
                      </div>
                      <div className="col-md-4">
                        <CardLabel>
                          {`${t("CR_NAME_OF_PLACE_MAL")}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                          t={t}
                          type={"text"}
                          optionKey="namelocal"
                          option={setMarriagePlace(marriagePlacetype)}
                          selected={marriagePlacenameMal}
                          select={setSelectmarriagePlacenameMal}
                          disable={true}
                          placeholder={t("CR_NAME_OF_PLACE_MAL")}
                          isMandatory={true}
                          {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_MAL") })}
                          // option={cmbCountry}
                        />
                      </div>
                      {marriagePlacenameEn.i18nKey === "Others" && <MarriageInstitution />}
                    </React.Fragment>
                  )}
                  {marriagePlacetype.i18nKey === "House" && <HouseMarriageRegistration />}
                  {(marriagePlacetype.i18nKey === "Public Place" || marriagePlacetype.i18nKey === "Private Place") && <MarriagePublicPlace />}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {/* tenantId */}
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                      "CR_MARRIAGE_CUSTOM_AND_CEREMONY_FOLLOWED_FOR_SOLEMNIZATION"
                    )}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col_md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_MARRIAGE_TYPE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      option={cmbTypeOfMarriage}
                      selected={marriageType}
                      select={setSelectmarriageType}
                      placeholder={t("CR_MARRIAGE_TYPE")}
                      isMandatory={true}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_MARRIAGE_TYPE") })}
                      // option={cmbCountry}
                    />
                  </div>
                  {marriageType.i18nKey === "Others" && (
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_MARRIAGE_OTHER_SPECIFY")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="marriageOthersSpecify"
                        value={marriageOthersSpecify}
                        onChange={setSelectmarriageOthersSpecify}
                        disable={isDisableEdit}
                        placeholder={`${t("CR_MARRIAGE_OTHER_SPECIFY")}`}
                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MARRIAGE_OTHER") })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FormStep>
      </React.Fragment>
    );
};
export default MarriageRegistration;
