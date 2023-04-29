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
  const { data: subRegistarOffice = {}, isSubRegistarLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "SubRegistar"
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

  // const cmbSubRegistarOffice = [
  //   {
  //     i18nKey: "SubRegistrar Office 1",
  //     code: "SUBREGISTRAROFFICE1",
  //     namelocal: "സബ് രജിസ്ട്രാർ ഓഫീസ് 1",
  //   },
  //   {
  //     i18nKey: "SubRegistrar Office 2",
  //     code: "SUBREGISTRAROFFICE2",
  //     namelocal: "സബ് രജിസ്ട്രാർ ഓഫീസ് 2",
  //   },
  // ];

  console.log({ subRegistarOffice });

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
  const cmbSubRegistarOffice = [];
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

  subRegistarOffice &&
    subRegistarOffice["birth-death-service"] &&
    subRegistarOffice["birth-death-service"].SubRegistar &&
    subRegistarOffice["birth-death-service"].SubRegistar.map((ob) => {
      cmbSubRegistarOffice.push(ob);
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

  console.log({ cmbSubRegistarOffice });

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

  const filteredSubRegistrarOfficeList = cmbSubRegistarOffice?.filter(sOffice => sOffice.districtCode === marriageDistrictid?.code)
  console.log({filteredSubRegistrarOfficeList})

  const [toast, setToast] = useState(false);
  const [DOBError, setDOBError] = useState(formData?.MarriageDetails?.marriageDOM ? false : false);
  const [marriageDistrictidError, setMarriageDistrictidError] = useState(false);
  const [marriageTalukIDError, setmarriageTalukIDError] = useState(false);
  const [marriageVillageNameError, setmarriageVillageNameError] = useState(false);
  const [marriageLBtypeError, setMarriageLBtypeError] = useState(false);
  const [marriageTenantidError, setMarriageTenantidError] = useState(false);
  const [marriageWardCodeError, setMarriageWardCodeError] = useState(false);
  const [marriageInstitutionError, setMarriageInstitutionError] = useState(false);
  const [marriagePlaceTypeError, setMarriagePlacetypeError] = useState(false);
  const [marriageLocalityEnError, setmarriageLocalityEnError] = useState(false);
  const [marriageLocalityMlError, setmarriageLocalityMlError] = useState(false);
  const [marriageStreetEnError, setmarriageStreetEnError] = useState(false);
  const [marriageStreetMlError, setmarriageStreetMlError] = useState(false);
  const [marriageHouseNoAndNameEnError, setmarriageHouseNoAndNameEnError] = useState(false);
  const [marriageHouseNoAndNameMlError, setmarriageHouseNoAndNameMlError] = useState(false);
  const [marriageLandmarkError, setmarriageLandmarkError] = useState(false);
  const [marriagePublicPrivatePlaceEnError, setmarriagePublicPrivatePlaceEnError] = useState(false);
  const [marriagePublicPrivatePlaceMlError, setmarriagePublicPrivatePlaceMlError] = useState(false);
  const [marriagePlacenameEnError, setmarriagePlacenameEnError] = useState(false);
  const [marriagePlacenameMlError, setmarriagePlacenameMlError] = useState(false);
  const [marriageTypeError, setmarriageTypeError] = useState(false);

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
    setmarriageDOM(value);
    const today = new Date();
    // const birthDate = new Date(value);
    // if (birthDate.getTime() <= today.getTime()) {
    //   // To calculate the time difference of two dates
    //   let Difference_In_Time = today.getTime() - birthDate.getTime();
    //   let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    //   let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
    // } else {
    //   setmarriageDOM(null);
    //   setDOBError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 3000);
    // }
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
    console.log({place})
    if (place.code === "RELIGIOUS_INSTITUTION") {
      return cmbPlaceNameReligious;
    } else if (place.code === "MANDAPAM_HALL_AND_OTHER") {
      return cmbPlaceNameMandapam;
    } else if (place.code === "SUB_REGISTRAR_OFFICE") {
      return filteredSubRegistrarOfficeList;
    }
  }

  useEffect(() => {
    if (cmbLB?.length > 0) {
      const currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
      setMarriageTenantid(currentLB[0]);
      console.log({ currentLB });
      const currentDistrict = stateDist.filter((dist) => dist.code === currentLB[0].city.distCodeStr);
      console.log({ currentDistrict });
      setMarriageDistrictid(currentDistrict[0]);
      districtid = currentDistrict[0].districtid;
      cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === districtid);
      setLbsTalukvalue(cmbFilterTaluk);
      console.log({ cmbFilterTaluk });
      cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === districtid);
      setLbsVillagevalue(cmbFilterVillage);
      console.log({ cmbFilterVillage });
      const currentLBType = filteredLBType?.filter((LBType) => LBType.code === currentLB[0].city.lbtypecode);
      setMarriageLBtype(currentLBType[0]);
      const currentTaluk = cmbFilterTaluk?.filter((taluk) => taluk.code === currentLB[0].city.talukcode);
      setmarriageTalukID(currentTaluk[0]);
      console.log({ currentTaluk });
    }
  }, [cmbLB.length]);

  let validFlag = true;
  const goNext = () => {
    if (marriageDistrictid == null || marriageDistrictid == undefined) {
      setMarriageDistrictidError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMarriageDistrictidError(false);
    }
    if (marriageTalukID == null || marriageTalukID == undefined || marriageTalukID == "") {
      setmarriageTalukIDError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setmarriageTalukIDError(false);
    }
    if (marriageVillageName == null || marriageVillageName == undefined || marriageVillageName == "") {
      setmarriageVillageNameError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setmarriageVillageNameError(false);
    }
    if (marriageLBtype == null || marriageLBtype == undefined || marriageLBtype == "") {
      setMarriageLBtypeError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMarriageLBtypeError(false);
    }
    if (marriageWardCode == null || marriageWardCode == undefined || marriageWardCode == "") {
      setMarriageWardCodeError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMarriageWardCodeError(false);
    }
    if (marriageTenantid == null || marriageTenantid == undefined || marriageTenantid == "") {
      setMarriageTenantidError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMarriageTenantidError(false);
    }
    if (marriagePlaceType == null || marriagePlaceType == undefined || marriagePlaceType == "") {
      setMarriagePlacetypeError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMarriagePlacetypeError(false);
    }
    if (
      marriagePlacetype.code === "RELIGIOUS_INSTITUTION" ||
      marriagePlacetype.code === "MANDAPAM_HALL_AND_OTHER" ||
      marriagePlacetype.code === "SUB_REGISTRAR_OFFICE"
    ) {
      if (placeidEn == null || placeidMl === null) {
        setMarriageInstitutionError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setMarriageInstitutionError(false);
      }
    } else if (marriagePlacetype.code === "HOUSE") {
      if (marriageHouseNoAndNameEn === null || marriageHouseNoAndNameEn.trim() == "" || marriageHouseNoAndNameEn.trim() == undefined) {
        validFlag = false;
        setmarriageHouseNoAndNameEn("");
        setmarriageHouseNoAndNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setmarriageHouseNoAndNameEnError(false);
      }
      if (marriageHouseNoAndNameMl === null || marriageHouseNoAndNameMl.trim() == "" || marriageHouseNoAndNameMl.trim() == undefined) {
        validFlag = false;
        setmarriageHouseNoAndNameMl("");
        setmarriageHouseNoAndNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setmarriageHouseNoAndNameMlError(false);
      }
    } else if (marriagePlacetype.code === "PUBLIC_PLACE" || marriagePlacetype.code === "PRIVATE_PLACE") {
      if (
        marriagePublicOrPrivateNamePlaceEn === null ||
        marriagePublicOrPrivateNamePlaceEn.trim() == "" ||
        marriagePublicOrPrivateNamePlaceEn.trim() == undefined
      ) {
        validFlag = false;
        setmarriagePublicOrPrivateNamePlaceEn("");
        setmarriagePublicPrivatePlaceEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setmarriagePublicPrivatePlaceEnError(false);
      }
      if (
        marriagePublicOrPrivateNamePlaceMl === null ||
        marriagePublicOrPrivateNamePlaceMl.trim() == "" ||
        marriagePublicOrPrivateNamePlaceMl.trim() == undefined
      ) {
        validFlag = false;
        setmarriagePublicOrPrivateNamePlaceMl("");
        setmarriagePublicPrivatePlaceMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setmarriagePublicPrivatePlaceMlError(false);
      }
    } else if (marriagePlacetype.code === "OTHER") {
      if (marriagePlacenameEn === null || marriagePlacenameEn.trim() == "" || marriagePlacenameEn.trim() == undefined) {
        validFlag = false;
        setmarriagePlacenameEn("");
        setmarriagePlacenameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setmarriagePlacenameEnError(false);
      }
      if (marriagePlacenameMl === null || marriagePlacenameMl.trim() == "" || marriagePlacenameMl.trim() == undefined) {
        validFlag = false;
        setmarriagePlacenameMl("");
        setmarriagePlacenameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setmarriagePlacenameMlError(false);
      }
    }
    if (marriageType == null || marriageType == undefined) {
      setmarriageTypeError(true);
      validFlag = false;
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setmarriageTypeError(false);
    }
    if (marriageLocalityEn === null || marriageLocalityEn.trim() == "" || marriageLocalityEn.trim() == undefined) {
      validFlag = false;
      setmarriageLocalityEn("");
      setmarriageLocalityEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setmarriageLocalityEnError(false);
    }
    if (marriageLocalityMl === null || marriageLocalityMl.trim() == "" || marriageLocalityMl.trim() == undefined) {
      validFlag = false;
      setmarriageLocalityMl("");
      setmarriageLocalityMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setmarriageLocalityMlError(false);
    }
    if (marriageStreetEn === null || marriageStreetEn.trim() === "" || marriageStreetEn.trim() === undefined) {
      setmarriageStreetEn("");
    } else {
      if (marriageStreetEn != null && (marriageStreetMl === null || marriageStreetMl.trim() === "" || marriageStreetMl.trim() === undefined)) {
        validFlag = false;
        setmarriageStreetMl("");
        setmarriageStreetMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setmarriageStreetMlError(false);
      }
    }
    if (marriageStreetMl === null || marriageStreetMl.trim() === "" || marriageStreetMl.trim() === undefined) {
      setmarriageStreetMl("");
    } else {
      if (marriageStreetMl != null && (marriageStreetEn === null || marriageStreetEn.trim() === "" || marriageStreetEn.trim() === undefined)) {
        validFlag = false;
        setmarriageStreetEn("");
        setmarriageStreetEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setmarriageStreetEnError(false);
      }
    }
    if (marriageLandmark != "" && (marriageLandmark === null || marriageLandmark.trim() == "" || marriageLandmark.trim() == undefined)) {
      validFlag = false;
      setmarriageLandmark("");
      setmarriageLandmarkError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setmarriageLandmarkError(false);
    }
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
      // if (marriagePlacetype.code === "OTHER") {        //sethospitalCode(hospitalName.code);
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

  console.log({marriageDistrictid})
  console.log("Registration", formData);
  console.log({ marriageType });


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
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
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
                    //{...(validation = { isRequired: true, title: t("CR_INVALID_DATE_OF_MARRIAGE") })}
                  />
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
                  />
                </div>
              </div>
              <div className="row">
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
                  />
                </div>
              </div>
              <div className="row">
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
                        optionKey={marriagePlacetype.code==="SUB_REGISTRAR_OFFICE" ? "locationOfOffice" : "name"}
                        option={setMarriagePlace(marriagePlacetype)}
                        selected={placeidEn}
                        select={setSelectPlaceidEn}
                        placeholder={t("CR_NAME_OF_PLACE_EN")}
                        isMandatory={true}
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
                        optionKey={marriagePlacetype.code==="SUB_REGISTRAR_OFFICE" ? "locationOfOffice" : "name"}
                        option={setMarriagePlace(marriagePlacetype)}
                        selected={placeidMl}
                        // select={setSelectPlaceidMl}
                        disable={true}
                        placeholder={t("CR_NAME_OF_PLACE_MAL")}
                        isMandatory={true}
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
                    // option={cmbCountry}
                  />
                </div>
                {/* {marriageType?.i18nKey === "Others" && (
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
                  )} */}
              </div>
            </div>
          </div>
          {toast && (
            <Toast
              error={
                DOBError ||
                marriageDistrictidError ||
                marriageTalukIDError ||
                marriageVillageNameError ||
                marriageLBtypeError ||
                marriageTenantidError ||
                marriageWardCodeError ||
                marriagePlaceTypeError ||
                marriageInstitutionError ||
                marriageLocalityEnError ||
                marriageLocalityMlError ||
                marriageStreetEnError ||
                marriageStreetMlError ||
                marriageHouseNoAndNameEnError ||
                marriageHouseNoAndNameMlError ||
                marriageLandmarkError ||
                marriagePublicPrivatePlaceEnError ||
                marriagePublicPrivatePlaceMlError ||
                marriagePlacenameEnError ||
                marriagePlacenameMlError ||
                marriageTypeError
              }
              label={
                DOBError ||
                marriageDistrictidError ||
                marriageTalukIDError ||
                marriageVillageNameError ||
                marriageLBtypeError ||
                marriageTenantidError ||
                marriageWardCodeError ||
                marriagePlaceTypeError ||
                marriageInstitutionError ||
                marriageLocalityEnError ||
                marriageLocalityMlError ||
                marriageStreetEnError ||
                marriageStreetMlError ||
                marriageHouseNoAndNameEnError ||
                marriageHouseNoAndNameMlError ||
                marriageLandmarkError ||
                marriagePublicPrivatePlaceEnError ||
                marriagePublicPrivatePlaceMlError ||
                marriagePlacenameEnError ||
                marriagePlacenameMlError ||
                marriageTypeError
                  ? DOBError
                    ? t(`MARRIAGE_DATE_VALIDATION_MSG`)
                    : marriageDistrictidError
                    ? t(`BIRTH_ERROR_DISTRICT_CHOOSE`)
                    : marriageTalukIDError
                    ? t(`BIRTH_ERROR_TALUK_CHOOSE`)
                    : marriageVillageNameError
                    ? t(`BIRTH_ERROR_VILLAGE_CHOOSE`)
                    : marriageLBtypeError
                    ? t(`CR_ERROR_LB_TYPE_CHOOSE`)
                    : marriageTenantidError
                    ? t(`BIRTH_ERROR_LBNAME_CHOOSE`)
                    : marriageWardCodeError
                    ? t(`BIRTH_ERROR_WARD_CHOOSE`)
                    : marriagePlaceTypeError
                    ? t(`CR_ERROR_MARRIAGE_PLACE_TYPE_CHOOSE`)
                    : marriageInstitutionError
                    ? t(`CR_MARRIAGE_INSTITUTION_ERROR_CHOOSE`)
                    : marriageLocalityEnError
                    ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                    : marriageLocalityMlError
                    ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                    : marriageStreetEnError
                    ? t(`BIRTH_ERROR_ADDRESS_PRESENT_STREET_EN`)
                    : marriageStreetMlError
                    ? t(`BIRTH_ERROR_ADDRESS_PRESENT_STREET_ML`)
                    : marriageHouseNoAndNameEnError
                    ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`)
                    : marriageHouseNoAndNameMlError
                    ? t(`BIRTH_ERROR_HOUSE_NAME_ML_CHOOSE`)
                    : marriageLandmarkError
                    ? t(`CR_LANDMARK_ERROR`)
                    : marriagePublicPrivatePlaceEnError
                    ? t(`CR_PLACE_NAME_EN_ERROR`)
                    : marriagePublicPrivatePlaceMlError
                    ? t(`CR_PLACE_NAME_ML_ERROR`)
                    : marriagePlacenameEnError
                    ? t(`CR_PLACE_NAME_EN_ERROR`)
                    : marriagePlacenameMlError
                    ? t(`CR_PLACE_NAME_ML_ERROR`)
                    : marriageTypeError
                    ? t(`CR_MARRIAGE_TYPE_ERROR_CHOOSE`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
        </FormStep>
      </React.Fragment>
    );
};
export default MarriageRegistration;
