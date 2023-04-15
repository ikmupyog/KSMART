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
import HouseMarriageRegistration from "./HouseMarriageRegistration";
import CustomTimePicker from "../../components/CustomTimePicker";
import MarriageInstitution from "./MarriageInstitution";
import MarriagePublicPlace from "./MarriagePublicPlace";
import { useQueryClient } from "react-query";
// import { TimePicker } from '@material-ui/pickers';

const MarriageRegistration = ({ config, onSelect, userType, formData, isEditMarriage }) => {
  console.log(formData);
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
  const { data: typeOfMarriage = {}, isTypeOfMarriageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "TypeOfMarriage"
  );
  const { data: marriagePlaceType = {}, isMarriagePlaceTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "MarriagePlaceType"
  );
  const { data: marriagePlaceId = {}, isMarriagePlaceId } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "MarriagePlace");
  //To be changed when master data come
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];

  // const cmbPlaceNameReligious = [
  //   { i18nKey: "Religious Institution 1", code: "RELIGIOUSINSTITUTION1", namelocal: "മത സ്ഥാപനം 1" },
  //   { i18nKey: "Religious Institution 2", code: "RELIGIOUSINSTITUTION2", namelocal: "മത സ്ഥാപനം 2" },
  //   { i18nKey: "Others", name: "OTHERS", namelocal: "മറ്റുള്ളവ" },
  // ];

  // const cmbPlaceNameMandapam = [
  //   {
  //     i18nKey: "Mandapam 1",
  //     code: "RELIGIOUSINSTITUTION1",
  //     namelocal: "മണ്ഡപം 1",
  //   },
  //   {
  //     i18nKey: "Mandapam 2",
  //     code: "RELIGIOUSINSTITUTION2",
  //     namelocal: "മണ്ഡപം 2",
  //   },
  //   {
  //     i18nKey: "Others",
  //     code: "OTHERS",
  //     namelocal: "മറ്റുള്ളവ",
  //   },
  // ];

  const cmbSubRegistarOffice = [
    {
      i18nKey: "SubRegistrar Office 1",
      code: "SUBREGISTRAROFFICE1",
      namelocal: "സബ് രജിസ്ട്രാർ ഓഫീസ് 1",
    },
    {
      i18nKey: "SubRegistrar Office 2",
      code: "SUBREGISTRAROFFICE2",
      namelocal: "സബ് രജിസ്ട്രാർ ഓഫീസ് 2",
    },
  ];

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
  let MarriagePlaceTypeName = "";
  let workFlowData = [];
  let cmbMarriagePlaceIds = [];
  const cmbTypeOfMarriage = [];
  const cmbPlaceType = [];
  let naturetype = null;
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
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
  typeOfMarriage &&
    typeOfMarriage["birth-death-service"] &&
    typeOfMarriage["birth-death-service"].TypeOfMarriage &&
    typeOfMarriage["birth-death-service"].TypeOfMarriage.map((ob) => {
      cmbTypeOfMarriage.push(ob);
    });
  marriagePlaceType &&
    marriagePlaceType["birth-death-service"] &&
    marriagePlaceType["birth-death-service"].MarriagePlaceType &&
    marriagePlaceType["birth-death-service"].MarriagePlaceType.map((ob) => {
      cmbPlaceType.push(ob);
    });

  marriagePlaceId &&
    marriagePlaceId["egov-location"] &&
    marriagePlaceId["egov-location"].MarriagePlace &&
    marriagePlaceId["egov-location"].MarriagePlace.map((ob) => {
      cmbMarriagePlaceIds.push(ob);
    });

  let currentLB = [];
  const cmbPlaceNameReligious = cmbMarriagePlaceIds?.filter((placeId) => placeId.placeTpe === "RELIGIOUS_INSTITUTION");
  console.log({ cmbPlaceNameReligious });
  const cmbPlaceNameMandapam = cmbMarriagePlaceIds?.filter((placeId) => placeId.placeTpe === "MANDAPAM_HALL_AND_OTHER");

  const [marriageDOM, setmarriageDOM] = useState(formData?.MarriageDetails?.marriageDOM ? formData?.MarriageDetails?.marriageDOM : "");
  const [marriageDistrictid, setMarriageDistrictid] = useState(
    formData?.MarriageDetails?.marriageDistrictid.code ? formData?.MarriageDetails?.marriageDistrictid : ""
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderMarriagePlace, setisInitialRenderMarriagePlace] = useState(true);
  const [marriageTalukID, setmarriageTalukID] = useState(
    formData?.MarriageDetails?.marriageTalukID ? formData?.MarriageDetails?.marriageTalukID : ""
  );
  const [marriageVillageName, setmarriageVillageName] = useState(
    formData?.MarriageDetails?.marriageVillageName ? formData?.MarriageDetails?.marriageVillageName : ""
  );
  const [marriageLBtype, setMarriageLBtype] = useState(formData?.MarriageDetails?.marriageLBtype ? formData?.MarriageDetails?.marriageLBtype : "");

  const [marriageTenantid, setMarriageTenantid] = useState(
    formData?.MarriageDetails?.marriageTenantid ? formData?.MarriageDetails?.marriageTenantid : null
  );
  const [value, setValue] = useState(0);
  const [marriagePlacetype, setMarriagePlacetype] = useState(
    formData?.MarriageDetails?.marriagePlacetype ? formData?.MarriageDetails?.marriagePlacetype : ""
  );
  // const [marriagePlacenameEn, setmarriagePlacenameEn] = useState(
  //   formData?.MarriageDetails?.marriagePlacenameEn?.code
  //     ? formData?.MarriageDetails?.marriagePlacenameEn
  //     : formData?.MarriageDetails?.marriagePlacenameEn
  //     ? cmbPlaceType.filter((cmbPlaceType) => cmbPlaceType.code === formData?.MarriageDetails?.marriagePlacenameEn)[0]
  //     : ""
  // );
  const [marriagePublicOrPrivateNamePlaceEn, setmarriagePublicOrPrivateNamePlaceEn] = useState(
    formData?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn ? formData?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn : ""
  );
  const [marriagePublicOrPrivateNamePlaceMl, setmarriagePublicOrPrivateNamePlaceMl] = useState(
    formData?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn ? formData?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn : ""
  );
  const [marriageHouseNoAndNameEn, setmarriageHouseNoAndNameEn] = useState(
    formData?.MarriageDetails?.marriageHouseNoAndNameEn ? formData?.MarriageDetails?.marriageHouseNoAndNameEn : ""
  );
  const [marriageHouseNoAndNameMl, setmarriageHouseNoAndNameMl] = useState(
    formData?.MarriageDetails?.marriageHouseNoAndNameMl ? formData?.MarriageDetails?.marriageHouseNoAndNameMl : ""
  );

  const [placeidEn, setplaceidEn] = useState(formData?.MarriageDetails?.placeidEn?.code ? formData?.MarriageDetails?.placeidEn : "");
  const [placeidMl, setplaceidMl] = useState(formData?.MarriageDetails?.placeidMl?.code ? formData?.MarriageDetails?.placeidMl : "");
  const [marriagePlacenameEn, setmarriagePlacenameEn] = useState(
    formData?.MarriageDetails?.marriagePlacenameEn ? formData?.MarriageDetails?.marriagePlacenameEn : ""
  );
  const [marriagePlacenameMl, setmarriagePlacenameMl] = useState(
    formData?.MarriageDetails?.marriagePlacenameMl ? formData?.MarriageDetails?.marriagePlacenameMl : ""
  );
  // const [marriageOthersSpecify, setmarriageOthersSpecify] = useState(
  //   formData?.MarriageDetails?.marriageOthersSpecify ? formData?.MarriageDetails?.marriageOthersSpecify : ""
  // );
  const [marriageType, setmarriageType] = useState(formData?.MarriageDetails?.marriageType ? formData?.MarriageDetails?.marriageType : "");
  const [marriageWardCode, setMarriageWardCode] = useState(
    formData?.MarriageDetails?.marriageWardCode ? formData?.MarriageDetails?.marriageWardCode : ""
  );
  const [isDisableEdit, setisDisableEdit] = useState(isEditMarriage ? isEditMarriage : false);
  const [marriageLocalityEn, setmarriageLocalityEn] = useState(
    formData?.MarriageDetails?.marriageLocalityEn ? formData?.MarriageDetails?.marriageLocalityEn : ""
  );
  const [marriageLocalityMl, setmarriageLocalityMl] = useState(
    formData?.MarriageDetails?.marriageLocalityMl ? formData?.MarriageDetails?.marriageLocalityMl : ""
  );
  const [marriageStreetEn, setmarriageStreetEn] = useState(
    formData?.MarriageDetails?.marriageStreetEn ? formData?.MarriageDetails?.marriageStreetEn : ""
  );
  const [marriageStreetMl, setmarriageStreetMl] = useState(
    formData?.MarriageDetails?.marriageStreetMl ? formData?.MarriageDetails?.marriageStreetMl : ""
  );
  const [marriageLandmark, setmarriageLandmark] = useState(
    formData?.MarriageDetails?.marriageLandmark ? formData?.MarriageDetails?.marriageLandmark : ""
  );
  const [file, setFile] = useState();

  const stateDist = cmbDistrict?.filter((dist) => dist.statecode == "kl");

  const filteredLBType = cmbLBType?.filter((lbType) => lbType.name === "Municipality" || lbType.name === "Corporation");

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
      //  return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };

  const onSkip = () => onSelect();
  // React.useEffect(() => {
  //   if (isInitialRenderMarriagePlace) {
  //     if (marriagePlacenameEn) {
  //       setIsInitialRender(false);
  //       naturetype = marriagePlacenameEn.code;
  //       setValue(naturetype);
  //       if (naturetype === "OTHER") {
  //         <HouseMarriageRegistration
  //           formData={formData}
  //           marriageLocalityEn={marriageLocalityEn}
  //           marriageLocalityMl={marriageLocalityMl}
  //           marriageStreetEn={marriageStreetEn}
  //           marriageStreetMl={marriageStreetMl}
  //           marriageHouseNoAndNameEn={marriageHouseNoAndNameEn}
  //           marriageHouseNoAndNameMal={marriageHouseNoAndNameMal}
  //           marriageLandmark={marriageLandmark}
  //         />;
  //       }
  //     }
  //   }
  // });
  function setSelectmarriageDOM(value) {
    setMarriageDistrictid("");
    setmarriageTalukID("");
    setmarriageVillageName("");
    setMarriageLBtype("");
    setMarriageTenantid("");
    setMarriageWardCode("");
    setMarriagePlacetype("");
    setplaceidEn("");
    setplaceidMl("");
    setmarriageDOM(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
    } else {
      setmarriageDOM(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectMarriageDistrictid(value) {
    setMarriageDistrictid(value);
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
    setmarriageTalukID("");
    setmarriageVillageName("");
    setMarriageLBtype("");
    setMarriageTenantid("");
    setMarriageWardCode("");
    setMarriagePlacetype("");
    setplaceidEn("");
    setplaceidMl("");
  }
  function setSelectmarriageTalukID(value) {
    setmarriageTalukID(value);
    setmarriageVillageName("");
    setMarriageLBtype("");
    setMarriageTenantid("");
    setMarriageWardCode("");
    setMarriagePlacetype("");
    setplaceidEn("");
    setplaceidMl("");
  }
  function setSelectmarriageVillageName(value) {
    setmarriageVillageName(value);
    setMarriageLBtype("");
    setMarriageTenantid("");
    setMarriageWardCode("");
    setMarriagePlacetype("");
    setplaceidEn("");
    setplaceidMl("");
  }
  function setSelectmarriageLBtype(value) {
    setMarriageLBtype(value);
    setMarriageTenantid("");
    setMarriageWardCode("");
    setMarriagePlacetype("");
    setplaceidEn("");
    setplaceidMl("");
  }
  function setSelectmarriageTenantid(value) {
    setIsWardChange(true);
    setMarriageWardCode(null);
    setTenantWard(value.code);
    setMarriageTenantid(value);
    setMarriageWardCode("");
    setMarriagePlacetype("");
    setplaceidEn("");
    setplaceidMl("");
  }
  function setSelectmarriagePlacetype(value) {
    setMarriagePlacetype(value);
    setValue(value.code);
    setplaceidEn("");
    setplaceidMl("");
    // let currentWorkFlow = workFlowData.filter(
    //   (workFlowData) =>
    //     workFlowData.marriagePlacetype === value.code &&
    //     workFlowData.startdateperiod <= Difference_In_DaysRounded &&
    //     workFlowData.enddateperiod >= Difference_In_DaysRounded
    // );
    // workFlowCode = currentWorkFlow[0].WorkflowCode;
    // if (value.code === "other") {

    // }
    // setAgeMariageStatus(value.code);
  }
  function setSelectPlaceidEn(value) {
    setplaceidEn(value);
    setplaceidMl(value);
    // setMarriagePlacenameMl(value.localname);
    // setAgeMariageStatus(value.code);
  }
  // function setSelectPlaceidMl(value) {

  //   // setAgeMariageStatus(value.code);
  // }
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
    setMarriageWardCode(value);
    setMarriagePlacetype("");
    setplaceidEn("");
    setplaceidMl("");
  }

  function setCSLB(selectedLBType) {
    const localbodies = lbs.filter((LB) => LB.city.districtid === marriageDistrictid.districtid);
    if (selectedLBType.name === "Municipality") {
      const filteredMunicipality = localbodies.filter((LB) => LB.city.lbtypecode.split("_")[2] === "MUNICIPALITY");
      return filteredMunicipality;
    } else if (selectedLBType.name === "Corporation") {
      const filteredCorporation = localbodies.filter((LB) => LB.city.lbtypecode.split("_")[2] === "CORPORATION");
      return filteredCorporation;
    }
  }
  function setMarriagePlace(place) {
    if (place.code === "RELIGIOUS_INSTITUTION") {
      return cmbPlaceNameReligious;
    } else if (place.code === "MANDAPAM_HALL_AND_OTHER") {
      return cmbPlaceNameMandapam;
    } else if (place.type === "SUB_REGISTRAR_OFFICE") {
      return cmbSubRegistarOffice;
    }
  }

  console.log({ placeidEn, placeidMl });

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
      // sessionStorage.setItem("marriageDOM", marriageDOM ? marriageDOM : null);
      // sessionStorage.setItem("marriageDistrictid", marriageDistrictid ? marriageDistrictid : null);
      // sessionStorage.setItem("marriageLBtype", marriageLBtype ? marriageLBtype : null);
      // sessionStorage.setItem("marriageWardCode", marriageWardCode ? marriageWardCode : null);
      // sessionStorage.setItem("marriageTenantid", marriageTenantid ? marriageTenantid : null);
      // sessionStorage.setItem("marriageTalukID", marriageTalukID ? marriageTalukID : null);
      // sessionStorage.setItem("marriageVillageName", marriageVillageName ? marriageVillageName : null);
      // sessionStorage.setItem("marriagePlacetype", marriagePlacetype ? marriagePlacetype : null);
      // sessionStorage.setItem("marriagePlacenameEn", marriagePlacenameEn ? marriagePlacenameEn : null);
      // sessionStorage.setItem("marriagePlacenameMl", marriagePlacenameMl ? marriagePlacenameMl : null);
      // sessionStorage.setItem("marriageType", marriageType ? marriageType : null);
      // sessionStorage.setItem("marriageOthersSpecify", marriageOthersSpecify ? marriageOthersSpecify : null);
      // sessionStorage.setItem("workFlowCode", workFlowCode);
      // if (marriagePlacetype.code === "OTHER") {
      //   //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
      //   // sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      //   sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      //   // sessionStorage.setItem("marriageWardCode", marriageWardCode ? marriageWardCode : null);
      //   sessionStorage.setItem("marriageStreetMal", marriageStreetMal ? marriageStreetMal : null);
      //   sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      //   sessionStorage.setItem("marriageHouseNoAndNameEn", marriageHouseNoAndNameEn ? marriageHouseNoAndNameEn : null);
      //   sessionStorage.setItem("marriageHouseNoAndNameMal", marriageHouseNoAndNameMal ? marriageHouseNoAndNameMal : null);
      //   sessionStorage.setItem("marriageLocalityMl", marriageLocalityMl ? marriageLocalityMl : null);
      //   sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      // }
      // sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);

      onSelect(config.key, {
        marriageDOM,
        marriageDistrictid,
        marriageTalukID,
        marriageVillageName,
        marriageLBtype,
        marriageTenantid,
        marriagePlacetype,
        placeidEn,
        placeidMl,
        marriagePlacenameEn,
        marriagePlacenameMl,
        marriageType,
        marriageWardCode,
        marriageStreetMl,
        marriageStreetEn,
        marriageLocalityEn,
        marriageLocalityMl,
        marriageLandmark,
        marriagePublicOrPrivateNamePlaceEn,
        marriagePublicOrPrivateNamePlaceMl,
        marriageHouseNoAndNameEn,
        marriageHouseNoAndNameMl,
        // marriageOthersSpecify,
        // tripStartTime,
        // selectedOption,
        // Gender,
      });
    }
  };

  console.log("Registration", formData);
  console.log({ cmbLBType });
  console.log({ marriagePlacetype });
  console.log({ cmbMarriagePlaceIds });

  if (
    isLoading ||
    isTalukLoading ||
    isVillageLoading ||
    isLBTypeLoading ||
    islocalbodiesLoading ||
    isWardLoaded ||
    isTypeOfMarriageLoading ||
    isMarriagePlaceTypeLoading ||
    isMarriagePlaceId
  ) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={1} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={
            !marriageDOM ||
            !marriageDistrictid ||
            !marriageTalukID ||
            !marriageVillageName ||
            !marriageLBtype ||
            !marriageTenantid ||
            !marriagePlacetype ||
            (marriagePlacetype.code === "RELIGIOUS_INSTITUTION" ? !placeidEn : false) ||
            (marriagePlacetype.code === "MANDAPAM_HALL_AND_OTHER" ? !placeidEn : false) ||
            (marriagePlacetype.code === "SUB_REGISTRAR_OFFICE" ? !placeidEn : false) ||
            (marriagePlacetype.code === "HOUSE"
              ? !marriageLocalityEn || !marriageLocalityMl || !marriageHouseNoAndNameEn || !marriageHouseNoAndNameMl
              : false) ||
            (marriagePlacetype.code === "PUBLIC_PLACE" || marriagePlacetype.code === "PRIVATE_PLACE"
              ? !marriageLocalityEn || !marriageLocalityMl || !marriagePublicOrPrivateNamePlaceEn || !marriagePublicOrPrivateNamePlaceMl
              : false) ||
            (marriagePlacetype.code === "OTHER"
              ? !marriageLocalityEn || !marriageLocalityMl || !marriagePlacenameEn || !marriagePlacenameMl
              : false) ||
            !marriageType
          }
        >
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
                      max={convertEpochToDate(new Date())}
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
                      // name="marriageDistrictid"
                      // value={marriageDistrictid}
                      select={setSelectMarriageDistrictid}
                      selected={marriageDistrictid}
                      placeholder={t("CS_COMMON_DISTRICT")}
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
                      placeholder={t("CS_COMMON_TALUK")}
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
                      placeholder={t("CS_COMMON_VILLAGE")}
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
                      placeholder={t("CS_LBTYPE")}
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
                      placeholder={t("CS_COMMON_WARD")}
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
                      optionKey="name"
                      option={cmbPlaceType}
                      selected={marriagePlacetype}
                      select={setSelectmarriagePlacetype}
                      placeholder={t("CR_MARRIAGE_PLACE_TYPE")}
                      isMandatory={true}
                      {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_TYPE") })}
                      // option={cmbCountry}
                    />
                  </div>
                  {(marriagePlacetype.code === "RELIGIOUS_INSTITUTION" ||
                    marriagePlacetype.code === "MANDAPAM_HALL_AND_OTHER" ||
                    marriagePlacetype.code === "SUB_REGISTRAR_OFFICE") && (
                    <React.Fragment>
                      <div className="col-md-4">
                        <CardLabel>
                          {`${t("CR_NAME_OF_PLACE_EN")}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <Dropdown
                          t={t}
                          type={"text"}
                          optionKey="name"
                          option={setMarriagePlace(marriagePlacetype)}
                          selected={placeidEn}
                          select={setSelectPlaceidEn}
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
                          optionKey="nameLocal"
                          option={setMarriagePlace(marriagePlacetype)}
                          selected={placeidMl}
                          // select={setSelectPlaceidMl}
                          disable={true}
                          placeholder={t("CR_NAME_OF_PLACE_MAL")}
                          isMandatory={true}
                          {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_MAL") })}
                          // option={cmbCountry}
                        />
                      </div>
                    </React.Fragment>
                  )}
                  {marriagePlacetype.code === "OTHER" && (
                    <MarriageInstitution
                      marriagePlacenameEn={marriagePlacenameEn}
                      setmarriagePlacenameEn={setmarriagePlacenameEn}
                      marriagePlacenameMl={marriagePlacenameMl}
                      setmarriagePlacenameMl={setmarriagePlacenameMl}
                      marriageLocalityEn={marriageLocalityEn}
                      setmarriageLocalityEn={setmarriageLocalityEn}
                      marriageLocalityMl={marriageLocalityMl}
                      setmarriageLocalityMl={setmarriageLocalityMl}
                      marriageStreetEn={marriageStreetEn}
                      setmarriageStreetEn={setmarriageStreetEn}
                      marriageStreetMl={marriageStreetMl}
                      setmarriageStreetMl={setmarriageStreetMl}
                      marriageLandmark={marriageLandmark}
                      setmarriageLandmark={setmarriageLandmark}
                    />
                  )}
                  {marriagePlacetype.code === "HOUSE" && (
                    <HouseMarriageRegistration
                      marriagePlacenameEn={marriageHouseNoAndNameEn}
                      setmarriagePlacenameEn={setmarriageHouseNoAndNameEn}
                      marriagePlacenameMl={marriageHouseNoAndNameMl}
                      setmarriagePlacenameMl={setmarriageHouseNoAndNameMl}
                      marriageLocalityEn={marriageLocalityEn}
                      setmarriageLocalityEn={setmarriageLocalityEn}
                      marriageLocalityMl={marriageLocalityMl}
                      setmarriageLocalityMl={setmarriageLocalityMl}
                      marriageStreetEn={marriageStreetEn}
                      setmarriageStreetEn={setmarriageStreetEn}
                      marriageStreetMl={marriageStreetMl}
                      setmarriageStreetMl={setmarriageStreetMl}
                      marriageLandmark={marriageLandmark}
                      setmarriageLandmark={setmarriageLandmark}
                    />
                  )}
                  {(marriagePlacetype.code === "PUBLIC_PLACE" || marriagePlacetype.code === "PRIVATE_PLACE") && (
                    <MarriagePublicPlace
                      marriagePlacenameEn={marriagePublicOrPrivateNamePlaceEn}
                      setmarriagePlacenameEn={setmarriagePublicOrPrivateNamePlaceEn}
                      marriagePlacenameMl={marriagePublicOrPrivateNamePlaceMl}
                      setmarriagePlacenameMl={setmarriagePublicOrPrivateNamePlaceMl}
                      marriageLocalityEn={marriageLocalityEn}
                      setmarriageLocalityEn={setmarriageLocalityEn}
                      marriageLocalityMl={marriageLocalityMl}
                      setmarriageLocalityMl={setmarriageLocalityMl}
                      marriageStreetEn={marriageStreetEn}
                      setmarriageStreetEn={setmarriageStreetEn}
                      marriageStreetMl={marriageStreetMl}
                      setmarriageStreetMl={setmarriageStreetMl}
                      marriageLandmark={marriageLandmark}
                      setmarriageLandmark={setmarriageLandmark}
                    />
                  )}
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
                      optionKey="name"
                      option={cmbTypeOfMarriage}
                      selected={marriageType}
                      select={setSelectmarriageType}
                      placeholder={t("CR_MARRIAGE_TYPE")}
                      isMandatory={true}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_MARRIAGE_TYPE") })}
                      // option={cmbCountry}
                    />
                  </div>
                  {marriageType?.i18nKey === "Others" && (
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
                        {...(validation = {
                          pattern: "^[a-zA-Z-.`' ]*$",
                          isRequired: true,
                          type: "text",
                          title: t("CR_INVALID_MARRIAGE_TYPE_OTHER"),
                        })}
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
