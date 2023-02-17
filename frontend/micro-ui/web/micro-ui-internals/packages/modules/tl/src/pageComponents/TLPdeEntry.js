import { CardLabel, Dropdown, FormStep, LinkButton, Loader, RadioButtons, TextInput, Banner, Toast } from "@egovernments/digit-ui-react-components";
import React, { useState, useReducer, useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "react-query";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import ApplicationDetailsPDE from "../pages/employee/ApplicationDetailsPDE";

const TLPdeEntry = ({ t, config, onSelect, formData, isEdit }) => {

  const [formdatasearch, setFormdatasearch] = useState();
  const [payloadDoor, setPayloadDoor] = useState([]);
  const [payloadDoorinit, setPayloadDoorinit] = useState({ "wardId": "0" });

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { roles: userRoles, uuid: uuid } = Digit.UserService.getUser().info;
  const roletemp = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("TL_PDEAPPROVER"));
  const roletempop = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("TL_PDEOPERATOR"));
  const approle = roletemp?.length > 0 ? true : false;
  const oprole = roletempop?.length > 0 ? true : false;
  let configstatus = true;
  let configstatusop = false;

  configstatus = formData?.status === "APPROVED" ? false : true;
  configstatus = formData?.status === "FORWARDED" && approle && configstatus ? true : false;

  configstatusop = (formData?.status === "INITIATED") && oprole && !configstatus ? true : false;
  configstatus = isEdit ? configstatus : true;
  configstatusop = isEdit ? configstatusop : true;

  const [flgEdit, setFlgEdit] = useState(false);
  const [flgCheck, setFlgCheck] = useState(false);

  const [flgshowEdit, setShowFlgEdit] = useState(true);
  const [toast, setToast] = useState(false);
  const menusector = [
    { name: "Manufacturing Sector", code: "MANUFACTORING" },
    { name: "Service Sector", code: "SERVICE" },
  ];
  const menu = [
    { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" },
    { i18nKey: "TL_COMMON_INSTITUTION", code: "INSTITUTION" },
  ];


  const buildingtype = [
    { i18nKey: "Own", code: "OWN" },
    { i18nKey: "Rent", code: "RENT" },
    { i18nKey: "LB Building", code: "LBBUILDING" },
  ];
  let validation = {};
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState("");
  const [businessService, setBusinessService] = useState("PdeTL");
  const [displayMenu, setDisplayMenu] = useState(false);
  const [pdeformdata, setPdeformdata] = useState("");
  const stateId = Digit.ULBService.getStateId();
  const [selectedAction, setSelectedAction] = useState(null);
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const mutationyear = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "egf-master", "FinancialYear");
  useEffect(() => {
    if (mutationyear?.error !== null) {
      mutationyear.mutate(tenantId, "egf-master", "FinancialYear", {
        onSuccess,
      });
    }

  }, [mutationyear])

  const yearListFrom = (mutationyear?.status === "success" && mutationyear?.isSuccess && !mutationyear?.isError) ? mutationyear.data : "";
  const yearListTo = (mutationyear?.status === "success" && mutationyear?.isSuccess && !mutationyear?.isError) ? mutationyear.data : "";

  const mutationperiod = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "egf-master", "FinancialPeriod");

  useEffect(() => {
    if (mutationperiod?.error !== null) {
      mutationperiod.mutate(tenantId, "egf-master", "FinancialPeriod", {
        onSuccess,
      });
    }

  }, [mutationperiod])

  const periodList = (mutationperiod?.status === "success" && mutationperiod?.isSuccess && !mutationperiod?.isError) ? mutationperiod.data : "";

  const [licensingInstitutionName, setLicensingInstitution] = useState(formData?.licenseUnitName ? formData?.licenseUnitName : "");
  const [PaidYear, setSelectedYear] = useState(formData.TradeDetails?.PaidYear);
  const [DoorNoBuild, setDoorNoBuild] = useState(formData.TradeDetails?.structurePlace?.doorNo);
  const [DoorSubBuild, setDoorSubBuild] = useState(formData.TradeDetails?.DoorSubBuild);
  const [BuildingCode, setBuildingCode] = useState(formData.tradeLicenseDetail?.address?.lbBuildingCode ? formData.tradeLicenseDetail?.address?.lbBuildingCode : "");
  const [BuildingName, setBuildingName] = useState(formData.tradeLicenseDetail?.address.lbBuildingName ? formData.tradeLicenseDetail?.address.lbBuildingName : "");

  const [BuildingstallNo, setBuildingstallNo] = useState(formData.tradeLicenseDetail?.structurePlace?.stallNo ? formData.tradeLicenseDetail?.structurePlace?.stallNo : "");
  const [sector, setSector] = useState(formData?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec.code.includes(formData?.tradeLicenseDetail?.businessSector))[0] : "");
  const [LicenseeType, setLicenseeType] = useState(formData?.tradeLicenseDetail?.licenseeType ? menu.filter((lic) => lic.code.includes(formData?.tradeLicenseDetail?.licenseeType))[0] : "");
  const [BuildingType, setBuildingType] = useState(formData?.tradeLicenseDetail?.ownershipCategory ? buildingtype.filter((type) => type.code.includes(formData?.tradeLicenseDetail?.ownershipCategory))[0] : "");

  const [capitalAmount, setCapitalAmount] = useState(formData?.tradeLicenseDetail?.capitalInvestment ? formData?.tradeLicenseDetail?.capitalInvestment : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderRadio, setIsInitialRenderRadio] = useState(true);
  const [value2, setValue2] = useState(formData?.tradeLicenseDetail?.licenseeType ? formData?.tradeLicenseDetail?.licenseeType : "");
  const [value3, setValue3] = useState(formData?.tradeLicenseDetail?.ownershipCategory ? formData?.tradeLicenseDetail?.ownershipCategory : "");
  const [fields, setFeilds] = useState(
    (formData?.tradeLicenseDetail && formData?.tradeLicenseDetail?.ownersPde) || [{ name: "" }]
  );

  const [fields1, setFeilds1] = useState(
    (formData?.tradeLicenseDetail && formData?.tradeLicenseDetail.structurePlace) || [{ doorNo: "", doorNoSub: "", stallNo: "" }]
  );

  const storedOwnerData = formData?.owners?.owners;
  const storedDoorData = formData?.door?.door;

  let cmbSector = [];
  let cmbSectorFileterData = [];
  sector &&
    sector["TradeLicense"] &&
    sector["TradeLicense"].EnterpriseType.map((ob) => {
      cmbSector.push(ob);
    });

  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        Zonal.push(...ob.boundary.children);
        ob.boundary.children.map((obward) => {
          cmbWardNo.push(...obward.children);
        });
      }
    });

  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
    wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
    cmbWardNoFinal.push(wardmst);
  });


  const roleall = [];
  roleall.push(...roletemp);
  roleall.push(...roletempop);
  const rolecombine = [];
  roleall?.map?.((e) => {
    rolecombine.push(e.code);
  });
  const { data: userData, isLoading: PTALoading } = Digit.Hooks.useEmployeeSearch(
    tenantId,
    {
      roles: rolecombine?.map?.((e) => ({ code: e })),
      isActive: true,
      uuids: uuid,
      rolecodes: rolecombine?.map?.((e) => (e)).join(",")
    }
    // { enabled: !action?.isTerminateState }
  );

  const operatorwardtemp = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("TL_PDEOPERATOR"));
  const appwardtemp = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("TL_PDEAPPROVER"));

  const operatorward = [];
  const appward = [];
  operatorwardtemp?.map((ob) => {
    operatorward.push(...ob.jurisdictionChilds);

  });
  appwardtemp?.map((ob) => {
    appward.push(...ob.jurisdictionChilds);

  });



  const finaloperatorward = [];
  operatorward.map((temp) => {
    finaloperatorward.push(...cmbWardNoFinal?.filter((doc) => doc.code === temp.wardCode));
  })
  const finalapproverward = [];
  appward.map((temp) => {
    finalapproverward.push(...cmbWardNoFinal?.filter((doc) => doc.code === temp.wardCode));
  })
  const finalward = [];

  finalward.push(...finaloperatorward);
  finalward.push(...finalapproverward);

  let finalwardred = finalward?.reduce((ac, a) => ac.find(x => x.code === a.code) ? [...ac] : [...ac, a], []);

  if (finalwardred.length > 0)
    cmbWardNoFinal = isEdit && formData?.status !== "INITIATED" ? finalwardred : finaloperatorward;

  cmbWardNoFinal = cmbWardNoFinal.sort((a, b) => {
    if (parseInt(a.wardno) > parseInt(b.wardno)) { return 1; }
    if (parseInt(b.wardno) > parseInt(a.wardno)) { return -1; }
    return 0;
  });
  const [WardNo, setWardNo] = useState(formData.tradeLicenseDetail?.address?.wardNo ? cmbWardNoFinal.filter((ward) => ward.wardno.includes(formData.tradeLicenseDetail?.address?.wardNo))[0] : "");
  const selWard = cmbWardNoFinal.filter((ward) => ward.wardno.includes(formData.tradeLicenseDetail?.address?.wardNo))[0];

  let tldata = [];
  let profdata = [];
  let rentdata = [];

  formData?.tradeLicenseDetail?.taxPde &&
    formData?.tradeLicenseDetail?.taxPde.map((ob) => {
      if (ob.service == "TL")
        tldata.push(ob);
      else if (ob.service == "PROFTAX")
        profdata.push(ob);
      else if (ob.service == "RT.Municipal_Shops_Rent")
        rentdata.push(ob);
    });

  let cmbPayProfYearTo = [];
  let cmbPayLicYearTo = [];
  let cmbPayRentYearTo = [];

  let cmbPayYearFrom = [];
  yearListFrom &&
    yearListFrom["egf-master"] &&
    yearListFrom["egf-master"].FinancialYear.map((ob) => {
      cmbPayYearFrom.push(ob);
    });

  let cmbPayYearTo = [];


  yearListTo &&
    yearListTo["egf-master"] &&
    yearListTo["egf-master"].FinancialYear.map((ob) => {
      ob.code === "2022-23" ? cmbPayYearTo.push(ob) : ""
    });

  function getYeardata() {
    return cmbPayYearTo;
  }

  let cmbPeriod = [];
  periodList &&
    periodList["egf-master"] &&
    periodList["egf-master"].FinancialPeriod.map((ob) => {
      cmbPeriod.push(ob);
    });


  const monthid = (new Date).getMonth();
  let half = "";

  if (((parseInt(monthid) + 1) >= 4) && ((parseInt(monthid) + 1) <= 9)) {
    half = "IHALF";
  }
  else {
    half = "IIHALF";
  }



  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const cmbptperiod = cmbPeriod.filter((doc) => doc.category.includes("CATEGORY_TAX"));
  const cmbrentperiod = cmbPeriod.filter((doc) => doc.category.includes("CATEGORY_RENT"));

  const cmbpttoperiod = cmbPeriod.filter((doc) => doc.category.includes("CATEGORY_TAX") && doc.code.includes(half));
  const cmbrenttoperiod = cmbPeriod.filter((doc) => doc.category.includes("CATEGORY_RENT") && doc.code.includes(monthNames[monthid]));




  function getPtPeriod() {
    return cmbpttoperiod;
  }

  function getRentPeriod() {
    return cmbrenttoperiod;
  }
  const [licArrear, setLicArrear] = useState(tldata[0]?.arrear ? tldata[0]?.arrear : "");
  const [licCurrent, setLicCurrent] = useState(tldata[0]?.current ? tldata[0]?.current : "");
  const [profArrear, setProfArrear] = useState(profdata[0]?.arrear ? profdata[0]?.arrear : "");
  const [profCurrentFirst, setProfCurrentFirst] = useState(profdata[0]?.current ? profdata[0]?.current : "");
  const [profCurrentSecond, setProfCurrentSecond] = useState(profdata[0]?.current2 ? profdata[0]?.current2 : "");
  const [rentArrear, setRentArrear] = useState(rentdata[0]?.arrear ? rentdata[0]?.arrear : "");
  const [rentCurrent, setRentCurrent] = useState(rentdata[0]?.current ? rentdata[0]?.current : "");

  const [licFromYear, setLicFromYear] = useState(tldata[0]?.fromYear ? cmbPayYearFrom.filter((year) => year.code.includes(tldata[0]?.fromYear))[0] : "");
  const [licToYear, setLicToYear] = useState(tldata[0]?.toYear ? cmbPayYearTo.filter((year) => year.code.includes(tldata[0]?.toYear))[0] : "");
  const [profFromYear, setProfFromYear] = useState(profdata[0]?.fromYear ? cmbPayYearFrom.filter((year) => year.code.includes(profdata[0]?.fromYear))[0] : "");
  const [profFromPeriod, setProfFromPeriod] = useState(profdata[0]?.fromPeriod ? cmbptperiod.filter((period) => period.code.includes(profdata[0]?.fromPeriod))[0] : "");
  const [profToYear, setProfToYear] = useState(profdata[0]?.toYear ? cmbPayYearTo.filter((year) => year.code.includes(profdata[0]?.toYear))[0] : "");
  const [profToPeriod, setProfToPeriod] = useState(profdata[0]?.toPeriod ? cmbpttoperiod.filter((period) => period.code.includes(profdata[0]?.toPeriod))[0] : "");
  const [rentFromYear, setRentFromYear] = useState(rentdata[0]?.fromYear ? cmbPayYearFrom.filter((year) => year.code.includes(rentdata[0]?.fromYear))[0] : "");
  const [rentFromMonth, setRentFromMonth] = useState(rentdata[0]?.fromPeriod ? cmbrentperiod.filter((month) => month.code.includes(rentdata[0]?.fromPeriod))[0] : "");
  const [rentToYear, setRentToYear] = useState(rentdata[0]?.toYear ? cmbPayYearTo.filter((year) => year.code.includes(rentdata[0]?.toYear))[0] : "");
  const [rentToMonth, setRentToMonth] = useState(rentdata[0]?.toPeriod ? cmbrenttoperiod.filter((month) => month.code.includes(rentdata[0]?.toPeriod))[0] : "");

  if (mutationyear?.status === "success" && mutationyear?.isSuccess && !mutationyear?.isError && isInitialRender) {
    setLicFromYear(tldata[0]?.fromYear ? cmbPayYearFrom.filter((year) => year.code.includes(tldata[0]?.fromYear))[0] : "");
    setLicToYear(tldata[0]?.toYear ? cmbPayYearTo.filter((year) => year.code.includes(tldata[0]?.toYear))[0] : "");
    setProfFromYear(profdata[0]?.fromYear ? cmbPayYearFrom.filter((year) => year.code.includes(profdata[0]?.fromYear))[0] : "");
    setProfToYear(profdata[0]?.toYear ? cmbPayYearTo.filter((year) => year.code.includes(profdata[0]?.toYear))[0] : "");
    setRentFromYear(rentdata[0]?.fromYear ? cmbPayYearFrom.filter((year) => year.code.includes(rentdata[0]?.fromYear))[0] : "");
    setRentToYear(rentdata[0]?.toYear ? cmbPayYearTo.filter((year) => year.code.includes(rentdata[0]?.toYear))[0] : "");

    setLicensingInstitution(formData?.licenseUnitName ? formData?.licenseUnitName : "");
    setDoorNoBuild(formData.TradeDetails?.structurePlace?.doorNo);
    setDoorSubBuild(formData.TradeDetails?.DoorSubBuild);
    setBuildingCode(formData.tradeLicenseDetail?.address?.lbBuildingCode ? formData.tradeLicenseDetail?.address?.lbBuildingCode : "");
    setBuildingName(formData.tradeLicenseDetail?.address.lbBuildingName ? formData.tradeLicenseDetail?.address.lbBuildingName : "");
    setBuildingstallNo(formData.tradeLicenseDetail?.structurePlace?.stallNo ? formData.tradeLicenseDetail?.structurePlace?.stallNo : "");
    setSector(formData?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec.code.includes(formData?.tradeLicenseDetail?.businessSector))[0] : "");
    setLicenseeType(formData?.tradeLicenseDetail?.licenseeType ? menu.filter((lic) => lic.code.includes(formData?.tradeLicenseDetail?.licenseeType))[0] : "");
    setBuildingType(formData?.tradeLicenseDetail?.ownershipCategory ? buildingtype.filter((type) => type.code.includes(formData?.tradeLicenseDetail?.ownershipCategory))[0] : "");
    setCapitalAmount(formData?.tradeLicenseDetail?.capitalInvestment ? formData?.tradeLicenseDetail?.capitalInvestment : "");
    setValue2(formData?.tradeLicenseDetail?.licenseeType ? formData?.tradeLicenseDetail?.licenseeType : "");
    setValue3(formData?.tradeLicenseDetail?.ownershipCategory ? formData?.tradeLicenseDetail?.ownershipCategory : "");
    setFeilds((formData?.tradeLicenseDetail && formData?.tradeLicenseDetail?.ownersPde) || [{ name: "" }]);
    setFeilds1((formData?.tradeLicenseDetail && formData?.tradeLicenseDetail.structurePlace) || [{ doorNo: "", doorNoSub: "", stallNo: "" }]);
    setWardNo(formData.tradeLicenseDetail?.address?.wardNo ? cmbWardNoFinal.filter((ward) => ward.wardno.includes(formData.tradeLicenseDetail?.address?.wardNo))[0] : "");
    setLicArrear(tldata[0]?.arrear ? tldata[0]?.arrear : "");
    setLicCurrent(tldata[0]?.current ? tldata[0]?.current : "");
    setProfArrear(profdata[0]?.arrear ? profdata[0]?.arrear : "");
    setProfCurrentFirst(profdata[0]?.current ? profdata[0]?.current : "");
    setProfCurrentSecond(profdata[0]?.current2 ? profdata[0]?.current2 : "");
    setRentArrear(rentdata[0]?.arrear ? rentdata[0]?.arrear : "");
    setRentCurrent(rentdata[0]?.current ? rentdata[0]?.current : "");
  }

  if (mutationperiod?.status === "success" && mutationperiod?.isSuccess && !mutationperiod?.isError && isInitialRender) {
    setIsInitialRender(false);
    setProfFromPeriod(profdata[0]?.fromPeriod ? cmbptperiod.filter((period) => period.code.includes(profdata[0]?.fromPeriod))[0] : "");
    setProfToPeriod(profdata[0]?.toPeriod ? cmbpttoperiod.filter((period) => period.code.includes(profdata[0]?.toPeriod))[0] : "");
    setRentFromMonth(rentdata[0]?.fromPeriod ? cmbrentperiod.filter((month) => month.code.includes(rentdata[0]?.fromPeriod))[0] : "");
    setRentToMonth(rentdata[0]?.toPeriod ? cmbrenttoperiod.filter((month) => month.code.includes(rentdata[0]?.toPeriod))[0] : "");
  }



  const setSelectBuildingcode = useCallback(e => {
    setBuildingCode(e.target.value);
    setFlgEdit(true);
  }, [BuildingCode]);

  const setSelectBuildingName = useCallback(e => {
    setBuildingName(e.target.value.replace(/[^A-Za-z0-9, ]/ig, ''));
    setFlgEdit(true);
  }, [BuildingName, flgEdit]);

  const setSelectWard = useCallback(value => {
    setWardNo(value);
    setFlgEdit(true);
  }, [WardNo, flgEdit]);

  const selectLicenseeType = useCallback(value => {
    setLicenseeType(value);
    setValue2(value.code);
    setFlgEdit(true);
  }, [value2, flgEdit]);

  const selectBuildingType = useCallback(value => {
    setBuildingCode("");
    setBuildingName("");
    setBuildingstallNo("");
    formState1.map((d) => {
      d.doorNo = "";
      d.doorNoSub = "";
      d.stallNo = "";
    })
    setFlgEdit(true);
    setBuildingType(value);
    setValue3(value.code);

    setIsInitialRenderRadio(true);
  }, [buildingtype, flgEdit]);

  const selectSector = useCallback(value => {
    setSector(value);
    setFlgEdit(true);
  }, [sector, flgEdit]);

  const changesetCapitalAmount = useCallback(e => {
    setCapitalAmount(e.target.value.replace(/[^0-9.]/ig, ''));
    setFlgEdit(true);
  }, [capitalAmount, flgEdit]);

  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
  let TradeCategoryMenu = [];
  let TradeTypeMenu = [];



  const mutation = Digit.Hooks.tl.useTradeLicensePdeAPI(
    tenantId,
    true
  );
  const mutation1 = Digit.Hooks.tl.useTradeLicensePdeAPI(
    tenantId,
    false
  );

  const payload = WardNo?.code ? { "wardId": WardNo.code } : { "wardId": "0" };
  const config1 = {
    enabled: !!(payload && Object.keys(payload).length > 0)
  }
  const mutationsearch = Digit.Hooks.tl.useSearchPde(
    { tenantId, filters: payload, config1 }
  );
  useEffect(() => {
    if (WardNo?.code !== undefined && WardNo?.code !== "0") {
      if (mutationsearch?.error !== null) {
        mutationsearch.mutate({ tenantId, filters: payload, config1 }, {
          onSuccess,
        });
      }
    }
  }, [mutationsearch])
  const searchResult = mutationsearch?.status === "success" && mutationsearch?.isSuccess && !mutationsearch?.isError ? mutationsearch.data.Licenses : ""


  // let workflowDetails = (isEdit) ? Digit.Hooks.useWorkflowDetails({
  //   tenantId: tenantId,
  //   id: 'KL-TL-2023-01-11-012659-KL_COCHIN',  //// formData?.applicationNumber?formData?.applicationNumber:"0",
  //   moduleCode: businessService,
  //   role: "EMPLOYEE",
  //   //  config:{EditRenewalApplastModifiedTime:EditRenewalApplastModifiedTime},
  // }) : {};

  // useEffect(() => {
  //   if (workflowDetails?.data?.applicationBusinessService) {
  //     setBusinessService(workflowDetails?.data?.applicationBusinessService);
  //   }
  // }, [workflowDetails.data]);

  // if (workflowDetails?.data?.processInstances?.length > 0) {
  //   let filteredActions = [];
  //   filteredActions = get(workflowDetails?.data?.processInstances[0], "nextActions", [])?.filter(
  //     item => item.action != "ADHOC"
  //   );
  //   let actions = orderBy(filteredActions, ["action"], ["desc"]);
  //   if ((!actions || actions?.length == 0) && workflowDetails?.data?.actionState) workflowDetails.data.actionState.nextActions = [];

  //   workflowDetails?.data?.actionState?.nextActions?.forEach(data => {
  //     if (data.action == "RESUBMIT") {
  //       data.redirectionUrl = {
  //         pathname: `/digit-ui/employee/tl/edit-application-details/${applicationNumber}`,
  //         state: applicationDetails
  //       },
  //         data.tenantId = stateId
  //     }
  //   })
  // }


  const setSelectIndividualName = useCallback((i, value) => {
    let owners = [...fields];
    owners[i].name = value;
    setFeilds(owners);
    setFlgEdit(true);
  }, [fields, flgEdit]);

  const changesetrentArrear = useCallback(e => {
    setRentArrear(e.target.value.replace(/[^0-9.]/ig, ''))
    setFlgEdit(true);
  }, [rentArrear, flgEdit]);

  const changesetrentCurrent = useCallback(e => {
    setRentCurrent(e.target.value.replace(/[^0-9.]/ig, ''));
    setFlgEdit(true);
  }, [rentCurrent, flgEdit]);
  function selectRentFromYear(value) {
    setRentFromYear(value);
    setRentToYear(getYeardata()[0]);
    setRentToMonth(getRentPeriod()[0]);
    setFlgEdit(true);
  }

  const selectRentFromMonth = useCallback(value => {
    setRentFromMonth(value);
    setFlgEdit(true);
  }, [rentFromMonth, flgEdit]);

  const selectRentToYear = useCallback(value => {
    setRentToYear(value);
    setFlgEdit(true);
  }, [rentToYear, flgEdit]);

  const selectRentToMonth = useCallback(value => {
    setRentToMonth(value);
    setFlgEdit(true);
  }, [rentToMonth, flgEdit]);

  const changesetProfArrear = useCallback(e => {
    setProfArrear(e.target.value.replace(/[^0-9.]/ig, ''));
    setFlgEdit(true);
  }, [profArrear, flgEdit]);

  const changesetProfCurrentFirst = useCallback(e => {
    setProfCurrentFirst(e.target.value.replace(/[^0-9.]/ig, ''));
    setFlgEdit(true);
  }, [profCurrentFirst, flgEdit]);

  const changesetProfCurrentSecond = useCallback(e => {
    setProfCurrentSecond(e.target.value.replace(/[^0-9.]/ig, ''));
    setFlgEdit(true);
  }, [profCurrentSecond, flgEdit]);

  function selectProfFromYear(value) {
    setProfFromYear(value);
    setProfToYear(getYeardata()[0]);
    setProfToPeriod(getPtPeriod()[0]);
    setFlgEdit(true);
  }

  const selectProfFromPeriod = useCallback(value => {
    setProfFromPeriod(value);
    setFlgEdit(true);
  }, [profFromPeriod, flgEdit]);

  const selectProfToYear = useCallback(value => {
    setProfToYear(value);
    setFlgEdit(true);
  }, [profToYear, flgEdit]);

  const selectProfToPeriod = useCallback(value => {
    setProfToPeriod(value);
    setFlgEdit(true);
  }, [profToPeriod, flgEdit]);

  function selectLicFromYear(value) {
    setLicFromYear(value);
    setLicToYear(getYeardata()[0]);
    setFlgEdit(true);
  }

  const selectLicToYear = useCallback(value => {
    setLicToYear(value);
    setFlgEdit(true);
  }, [licToYear, flgEdit]);

  const changesetLicArrear = useCallback(e => {
    setLicArrear(e.target.value.replace(/[^0-9.]/ig, ''));
    setFlgEdit(true);
  }, [licArrear, flgEdit]);

  const changesetLicCurrent = useCallback(e => {
    setLicCurrent(e.target.value.replace(/[^0-9.]/ig, ''));
    setFlgEdit(true);
  }, [licCurrent, flgEdit]);

  const setSelectLicensingInstitutionName = useCallback(e => {
    if (e.target.value.trim().length > 0) {
      setLicensingInstitution(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''));
    }
    else {
      setLicensingInstitution(e.target.value.replace(/[ ]/ig, ''));
    }
    setFlgEdit(true);
  }, [licensingInstitutionName, flgEdit]);

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("TL_CREATE_TRADE");
  };

  const initFnEdit = () => {
    return fields;
  };

  const initFnEdit1 = () => {
    return fields1;
  };

  const initFn = (initData) => {
    return [
      {
        name: "",
      },
    ];
  };

  const initFn1 = (initData) => {
    return [
      {
        doorNo: "",
        doorNoSub: "",
        stallNo: ""
      },
    ];
  };


  const reducer = (state, action) => {
    setFlgEdit(true);
    switch (action.type) {
      case "ADD_NEW_OWNER":
        return [
          ...state,
          {
            name: "",
          },
        ];
      case "REMOVE_THIS_OWNER":
        return state.filter((e, i) => i !== action?.payload?.index);
      case "SET_PRIMARY_OWNER":
        if (action?.payload?.index) {
          return state.map((ownerData, i) => {
            if (i === action?.payload?.index) {
              return { ...ownerData, isprimaryowner: true };
            } else {
              return { ...ownerData, isprimaryowner: false };
            }
          });
        } else {
          return state;
        }
      case "EDIT_CURRENT_OWNER_PROPERTY":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
    }
  };
  let data1 = [];
  let configDoor = "";

  const mutationsearchDoor = Digit.Hooks.tl.useSearchPde({ tenantId, filters: (payloadDoor.length === undefined) ? payloadDoor : payloadDoorinit, configDoor });
  let searchResultDoor = "";

  const [formState, dispatch] = isEdit ? useReducer(reducer, storedOwnerData, initFnEdit) : useReducer(reducer, storedOwnerData, initFn);
  const reducer1 = (state1, action) => {
    setFlgEdit(true);

    switch (action.type) {
      case "ADD_NEW_DOOR":
        return [
          ...state1,
          {
            doorNo: "",
            doorNoSub: "",
            stallNo: ""
          },
        ];
      case "REMOVE_THIS_DOOR":
        return state1.filter((e, i) => i !== action?.payload?.index);
      case "SET_PRIMARY_OWNER":
        if (action?.payload?.index) {
          return state1.map((ownerData, i) => {
            if (i === action?.payload?.index) {
              return { ...ownerData, isprimaryowner: true };
            } else {
              return { ...ownerData, isprimaryowner: false };
            }
          });
        } else {
          return state1;
        }
      case "EDIT_CURRENT_DOORNO":
        return state1.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
      case "CHECK_DOOR":
        queryClient.removeQueries("TL_SEARCH_PDE");
        data1["wardId"] = WardNo?.code ? WardNo.code : "";
        state1.map((data, __index) => {
          data1["doorNo"] = data?.doorNo ? data.doorNo : "";
          data1["subNo"] = data?.doorNoSub ? data.doorNoSub : "";
          configDoor = {
            enabled: !!(data && Object.keys(data).length > 0)
          }
          data1 = {
            ...data1
          }
          setPayloadDoor(Object.keys(data1).filter(k => data1[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data1[key] === "object" ? data1[key].code : data1[key] }), {}));
          // mutationsearchDoor.mutate({ tenantId, filters: payloadDoor, configDoor }, {
          //   onSuccess,
          // });

          searchResultDoor = mutationsearchDoor?.status === "success" && mutationsearchDoor?.isSuccess && !mutationsearchDoor?.isError ? mutationsearchDoor.data.Licenses : "";
          if (searchResultDoor?.length === 1) {
            formData = (mutationsearchDoor?.status === "success" && mutationsearchDoor?.isSuccess && !mutationsearchDoor?.isError) ? mutationsearchDoor.data : "";
            setFlgCheck(true);
          }
        });
        return [
          ...state1
        ];

    }
  };

  useEffect(() => {

    if (payloadDoor.length === undefined) {
      if (mutationsearchDoor !== undefined) {
        if (mutationsearchDoor?.error !== null) {
          mutationsearchDoor.mutate({ tenantId, filters: payloadDoor, configDoor }, {
            onSuccess,
          });
        }
      }

    }
  }, [mutationsearchDoor])


  useEffect(() => {
    if (mutationsearchDoor?.isSuccess && !flgCheck) {
      if (mutationsearchDoor?.data?.Licenses?.length === 1) {
        setFlgCheck(true);
        setFormdatasearch((mutationsearchDoor?.status === "success" && mutationsearchDoor?.isSuccess && !mutationsearchDoor?.isError) ? mutationsearchDoor.data.Licenses[0] : "");
      }
      //  else{
      //   setFlgCheck(false);
      //   setFormdatasearch("");
      //  }

    }
  }, [mutationsearchDoor, flgCheck, formdatasearch])


  const [formState1, dispatch1] = isEdit ? useReducer(reducer1, storedDoorData, initFnEdit1) : useReducer(reducer1, storedDoorData, initFn1);

  const handleTextInputField = useCallback((index, e, key) => {
    if (e.target.value.trim().length > 0) {
      dispatch({ type: "EDIT_CURRENT_OWNER_PROPERTY", payload: { index, key, value: e.target.value.replace(/[^A-Za-z. ]/ig, '') } });
    }
    else {
      dispatch({ type: "EDIT_CURRENT_OWNER_PROPERTY", payload: { index, key, value: e.target.value.replace(/[ ]/ig, '') } });
    }
    setFlgEdit(true);
  }, [dispatch, flgEdit]);

  const handleTextInputField1 = useCallback((index, e, key) => {
    if (key === "doorNo")
      dispatch1({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 5 ? e.target.value.replace(/[^0-9.]/ig, '') : (e.target.value.replace(/[^0-9.]/ig, '')).substring(0, 5) } });
    if (key === "doorNoSub")
      dispatch1({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 14 ? e.target.value : e.target.value.substring(0, 14) } });
    if (key === "stallNo")
      dispatch1({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    setFlgEdit(true);
  }, [dispatch1, flgEdit]);


  // const convertToEditPDE = () => {
  //   let formdata = {
  //     Licenses: [
  //       {
  //         action: "INITIATE",
  //         applicationType: "RENEWAL",
  //         financialYear: "2021-22",
  //         licenseType: "PERMANENT",
  //         tenantId: tenantId,
  //         tradeLicenseDetail: {
  //           channel: "PDE",
  //           address: {
  //             tenantId: tenantId,
  //             doorNo: null, // formState1,
  //             zonalid: WardNo.zonecode,   // formData.TradeDetails?.Zonal.code,
  //             wardid: WardNo.code,//formData.TradeDetails?.code,
  //             wardno: WardNo.wardno, //formData.TradeDetails?.wardno,
  //             circledivisionid: "3016921"
  //           },
  //           ownersPde: [
  //             ...formState
  //           ],
  //           structureType: "BUILDING",
  //           structurePlace: [...formState1],
  //           businessSector: Sector.code,
  //           capitalInvestment: capitalAmount,
  //           //enterpriseType: Sector,
  //           licenseeType: value2
  //         },
  //         tradeName: licensingInstitutionName,
  //         workflowCode: "PdeTL"
  //       }
  //     ]
  //   }
  //   setPdeformdata(prevPostsData => ([...prevPostsData, formdata]));
  // }
  function validateData() {
    let combineddoorno = "";
    let flg = true;
    formState1.map((data) => {
      combineddoorno = data.doorNo + data.doorNoSub;
      const noOccurence = formState1.filter(d => ((d.doorNo === data.doorNo) && (d.doorNoSub === data.doorNoSub))).length;
      flg = noOccurence > 1 ? "DN" : true;
    })
    if (flg == true) {
      flg = capitalAmount > 1 ? true : "CA";
    }
    if (flg == true) {
      flg = LicenseeType ? true : "LT";
    }
    if (flg == true) {
      flg = WardNo ? true : "WN";
    }
    if (flg == true) {
      flg = buildingtype ? true : "BT";
    }
    if (flg == true) {
      flg = sector ? true : "BS";
    }
    if (flg == true) {
      formState1.map((data) => {
        let noOccurence = 0;
        if (searchResult) {
          searchResult.map((d) => {
            if (d?.tradeLicenseDetail?.address.wardNo == WardNo.wardno) {
              let doornos = d?.tradeLicenseDetail?.structurePlace;
              if (isEdit) {
                noOccurence = doornos.filter((doorno) => ((doorno.doorNo == data.doorNo) && (doorno.doorNoSub.toUpperCase() == data.doorNoSub.toUpperCase())) ? doorno : "").length;
                if ((noOccurence > 1) && (flg == true)) { flg = "DExists"; }
              }
              else {
                noOccurence = doornos.filter(doorno => ((doorno.doorNo == data.doorNo) && (doorno.doorNoSub.toUpperCase() == data.doorNoSub.toUpperCase())) ? doorno : "").length;
                if ((noOccurence > 0) && (flg == true)) { flg = "DExists"; }
              }
            }
          });
        }
      });
    }

    return flg;
  }


  const goNext = (e) => {
    setToast(false)
    let tenantId1 = tenantId;
    let combineddoorno = "";
    let Tax = [];
    if (flgEdit === true) {
      if (validateData() === "DN") {
        setErrorMessage("Door No Duplication Found");
        setToast(true)
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else if (validateData() === "CA") {
        setErrorMessage("Capital Investment must be greater than 1 ");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else if (validateData() === "LT") {
        setErrorMessage("Select Ownership Type");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else if (validateData() === "WN") {
        setErrorMessage("Select Ward No");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else if (validateData() === "BT") {
        setErrorMessage("Select Building Type");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else if (validateData() === "BS") {
        setErrorMessage("Select Bussiness Category");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else if (validateData() === "DExists") {
        setErrorMessage("Doorno already  exists Please Check");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }


      else {
        if ((((licFromYear.id) && (licToYear.id) && (parseInt(licFromYear.code.replace(/-/g, "")) <= parseInt(licToYear.code.replace(/-/g, ""))))
          || (!licFromYear) && (!licToYear))
          && (((profFromYear.id) && (profToYear.id) && (parseInt(profFromYear?.code.replace(/-/g, "")) <= parseInt(profToYear.code.replace(/-/g, ""))))
            || (!profFromYear) && (!profToYear))
          && ((rentFromYear.id) && (rentToYear.id) && (parseInt(rentFromYear?.code.replace(/-/g, "")) <= parseInt(rentToYear.code.replace(/-/g, "")))
            || ((!rentFromYear) && (!rentToYear)))) {
          formState1.map((data) => {
            combineddoorno = combineddoorno + data.doorNo +
              (data.doorNoSub !== "" && data.doorNoSub !== null ? "/" + data.doorNoSub : "") +
              (data.stallNo !== "" && data.stallNo !== null ? "(" + data.stallNo + ")" : "") + ",";
          });
          combineddoorno = combineddoorno.slice(0, -1)
          if (licFromYear?.code !== undefined && licFromYear?.code !== null &&
            licToYear?.code !== undefined && licToYear?.code !== null) {
            let licencetax = {
              service: "TL",
              fromYear: licFromYear.code,
              fromPeriod: "",
              toYear: licToYear.code,
              toPeriod: "",
              arrear: licArrear === "" ? 0 : licArrear,
              current: licCurrent === "" ? 0 : licCurrent,
              current2: 0
            };
            Tax.push(licencetax);
          }

          if (profFromYear?.code !== undefined && profFromYear?.code !== null &&
            profToYear?.code !== undefined && profToYear?.code !== null &&
            profFromPeriod?.code !== undefined && profFromPeriod?.code !== null &&
            profToPeriod?.code !== undefined && profToPeriod?.code !== null) {
            let proftax = {
              service: "PROFTAX",
              fromYear: profFromYear.code,
              fromPeriod: profFromPeriod.code,
              toYear: profToYear.code,
              toPeriod: profToPeriod.code,
              arrear: profArrear === "" ? 0 : profArrear,
              current: profCurrentFirst === "" ? 0 : profCurrentFirst,
              current2: profCurrentSecond === "" ? 0 : profCurrentSecond
            };
            Tax.push(proftax);
          }
          if (rentFromYear?.code !== undefined && rentFromYear?.code !== null &&
            rentToYear?.code !== undefined && rentToYear?.code !== null &&
            rentFromMonth?.code !== undefined && rentFromMonth?.code !== null &&
            rentToMonth?.code !== undefined && rentToMonth?.code !== null) {
            let renttax = {
              service: "RT.Municipal_Shops_Rent",
              fromYear: rentFromYear.code,
              fromPeriod: rentFromMonth.code,
              toYear: rentToYear.code,
              toPeriod: rentToMonth.code,
              arrear: rentArrear === "" ? 0 : rentArrear,
              current: rentCurrent === "" ? 0 : rentCurrent,
              current2: 0
            };
            Tax.push(renttax);
          }
          let formdatatemp = {
            Licenses: [
              {
                id: (isEdit) ? formData?.id : null,
                action: "INITIATE",
                applicationType: "RENEWAL",
                financialYear: "2021-22",
                licenseType: "PERMANENT",
                tenantId: tenantId,
                applicationNumber: (isEdit) ? formData?.applicationNumber : null,
                status: (isEdit) ? formData?.status : null,
                tradeLicenseDetail: {
                  id: (isEdit) ? formData?.tradeLicenseDetail?.id : null,
                  channel: "PDE",
                  ownershipCategory:BuildingType.code,
                  address: {
                    id: (isEdit) ? formData?.tradeLicenseDetail?.address?.id : null,
                    tenantId: tenantId,
                    doorNo: combineddoorno, // formState1,
                    zonalid: WardNo.zonecode,//formData.TradeDetails?.Zonal.code,
                    wardid: WardNo.code,//formData.TradeDetails?.code,
                    wardno: WardNo.wardno,//formData.TradeDetails?.wardno,
                    circledivisionid: WardNo.zonecode,
                    lbBuildingCode: BuildingCode === undefined ? "" : BuildingCode,
                    lbBuildingName: BuildingName === undefined ? "" : BuildingName,
                   // buildingType: BuildingType.code
                  },
                  ownersPde: [
                    ...formState
                  ],
                  structureType: "BUILDING",
                  structurePlace: [...formState1],
                  businessSector: sector.code,
                  capitalInvestment: capitalAmount,
                  //enterpriseType: Sector,
                  licenseeType: value2,
                  taxPde: Tax
                },
                licenseUnitName: licensingInstitutionName,
                workflowCode: "PdeTL"
              }
            ]
          }
          setPdeformdata(formdatatemp);

          try {
            // setIsInitialRender(false);
            if (isEdit) {
              mutation1.mutate(formdatatemp, {
                onSuccess,

              });
            } else {
              mutation.mutate(formdatatemp, {
                onSuccess,

              });
            }
          }
          catch (err) {
            console.log(err);
          }
        }
        else {
          setErrorMessage("Year Mismatch Error");
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        }
      }
      setShowFlgEdit(true);
    }
    else {
      if (formData?.tradeLicenseDetail?.owners === null) {
        formData.tradeLicenseDetail["owners"] = [];
      }
      if (formData?.tradeLicenseDetail?.tradeUnits === null) {
        formData.tradeLicenseDetail["tradeUnits"] = [];
      }
      setShowFlgEdit(false);
    }
  }


  useEffect(() => {
    if (!isEdit) {
      if (mutation?.error !== null) {
        mutation.mutate(pdeformdata, {
          onSuccess,
        });
      }
    }

  }, [mutation]);

  useEffect(() => {
    if (isEdit) {
      if (mutation1?.error !== null) {
        mutation1.mutate(pdeformdata, {
          onSuccess,
        });
      }
    }
  }, [mutation1])

  const onSkip = () => onSelect();
  // useEffect(() => {
  //   if (!mutation.isLoading && mutation.isSuccess && !mutation.isError && !mutation.isIdle) {
  //     workflowdetailsupdate(mutation);
  //   }
  // }, [mutation,workflowDetails])
  const workflowdetailsupdate = (props) => {


  }

  const BannerPicker = (props) => {
    if (workflowDetails?.data?.applicationBusinessService) {
      setBusinessService(workflowDetails?.data?.applicationBusinessService);
    }
    if (workflowDetails?.data?.processInstances?.length > 0) {
      let filteredActions = [];
      filteredActions = get(workflowDetails?.data?.processInstances[0], "nextActions", [])?.filter(
        item => item.action != "ADHOC"
      );
      let actions = orderBy(filteredActions, ["action"], ["desc"]);
      if ((!actions || actions?.length == 0) && workflowDetails?.data?.actionState) workflowDetails.data.actionState.nextActions = [];

      workflowDetails?.data?.actionState?.nextActions?.forEach(data => {
        if (data.action == "RESUBMIT") {
          data.redirectionUrl = {
            pathname: `/digit-ui/employee/tl/edit-application-details/${applicationNumber}`,
            state: applicationDetails
          },
            data.tenantId = stateId
        }
      })
    }

    return (

      <Banner
        message={t("CS_TRADE_APPLICATION_SUCCESS")}  ///{GetActionMessage(props)}
        applicationNumber={props.data?.Licenses[0]?.applicationNumber}
        info={props.isSuccess ? "Saved Success Fully" : ""}   //props.t("TL_REF_NO_LABEL") 
        successful={props.isSuccess}
      />
    );
  };
  const handleNewPage = () => {
    window.location.reload();
  }
  function onActionSelect(action) {
    if (action) {
      if (action?.isWarningPopUp) {
        setWarningPopUp(true);
      } else if (action?.redirectionUrll) {
        window.location.assign(`${window.location.origin}/digit-ui/employee/payment/collect/${action?.redirectionUrll?.pathname}`);
      } else if (!action?.redirectionUrl) {
        setShowModal(true);
      } else {
        history.push({
          pathname: action.redirectionUrl?.pathname,
          state: { ...action.redirectionUrl?.state },
        });
      }
    }
    setSelectedAction(action);
    setDisplayMenu(false);
  }
  if (mutation.isLoading || mutation1.isLoading)
    return (
      <Loader />
    );
  else if (!isEdit && !mutation.isLoading && mutation.isSuccess && !mutation.isError && !mutation.isIdle)
    return (
      <ApplicationDetailsPDE data={mutation.data} isSuccess={mutation.isSuccess} isLoading={(mutation.isIdle || mutation.isLoading)} isNewentry={oprole} isEdited={flgshowEdit}></ApplicationDetailsPDE>

      // <Card>
      // <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={(mutation.isIdle || mutation.isLoading)} />
      /* <SubmitBar label="New Entry" onSubmit={handleNewPage} /> */
      /* <ApplicationDetailsActionBar
          workflowDetails={workflowDetails}
          displayMenu={displayMenu}
          onActionSelect={onActionSelect}
          setDisplayMenu={setDisplayMenu}
          businessService={businessService}
          forcedActionPrefix={forcedActionPrefix}
          ActionBarStyle={ActionBarStyle}
          MenuStyle={MenuStyle}
        /> */

      // </Card>
    );
  else if (isEdit && !mutation1.isLoading && mutation1.isSuccess && !mutation1.isError && !mutation1.isIdle && flgshowEdit === true)
    return (
      <ApplicationDetailsPDE data={mutation1.data} isSuccess={mutation1.isSuccess} isLoading={(mutation1.isIdle || mutation1.isLoading)} isNewentry={oprole} isEdited={flgshowEdit}></ApplicationDetailsPDE>
      // <Card>
      // <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={(mutation.isIdle || mutation.isLoading)} />
      /* <SubmitBar label="New Entry" onSubmit={handleNewPage} /> */
      /* <ApplicationDetailsActionBar
          workflowDetails={workflowDetails}
          displayMenu={displayMenu}
          onActionSelect={onActionSelect}
          setDisplayMenu={setDisplayMenu}
          businessService={businessService}
          forcedActionPrefix={forcedActionPrefix}
          ActionBarStyle={ActionBarStyle}
          MenuStyle={MenuStyle}
        /> */

      // </Card>
    );
  else if (isEdit && (flgshowEdit === false))
    return (
      <ApplicationDetailsPDE data={formData} isSuccess={true} isLoading={true} isNewentry={oprole} isEdited={flgshowEdit}></ApplicationDetailsPDE>
      // <Card>
      // <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={(mutation.isIdle || mutation.isLoading)} />
      /* <SubmitBar label="New Entry" onSubmit={handleNewPage} /> */
      /* <ApplicationDetailsActionBar
          workflowDetails={workflowDetails}
          displayMenu={displayMenu}
          onActionSelect={onActionSelect}
          setDisplayMenu={setDisplayMenu}
          businessService={businessService}
          forcedActionPrefix={forcedActionPrefix}
          ActionBarStyle={ActionBarStyle}
          MenuStyle={MenuStyle}
        /> */

      // </Card>
    );
  else if (flgCheck === true)
    return (
      <TLPdeEntry formData={formdatasearch} isEdit={true} t={t} config={config} onSelect={onSelect}></TLPdeEntry>
    );

  else
    return (
      <React.Fragment>
        {isLoading ? (<Loader />) : (
          <FormStep config={configstatus || configstatusop ? config : ""} onSelect={goNext} onSkip={onSkip} t={t} >
            <div>
              <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", marginLeft: "50px" }} >

                <div className="row">
                  <div className="col-md-12" > <header className="card-header">{t("TL_LICENSING_PDE_ENTRY_HEADER")} </header>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" > </h1>
                  </div>
                </div>
                {isEdit && (
                  <div className="row">
                    <div className="col-md-3" ><CardLabel>{`${t("TL_APPLICATION_NO")}`}</CardLabel></div>
                    <div className="col-md-4" >
                      <CardLabel>{formData?.applicationNumber}</CardLabel>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-7">
                    {/* {`${t("TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL")} `} */}
                    <CardLabel style={{ marginBottom: "30px" }}>{`${t("TL_TYPE_BUILDING")}`}<span className="mandatorycss">*</span></CardLabel>
                    <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={buildingtype} selectedOption={BuildingType} onSelect={selectBuildingType} style={{ display: "flex", justifyContent: "space-between", width: "48%" }} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-7" ><CardLabel>{`${t("TL_LOCALIZATION_WARD_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={WardNo} select={setSelectWard}  {...(validation = { isRequired: true, title: t("TL_INVALID_WARD_NO") })} />
                  </div>
                </div>

                {formState1.map((field, index) => {
                  return (
                    <div className="row" key={`${field}-${index}`}>
                      <div style={{
                        border: "solid",
                        borderRadius: "25px",
                        //  padding: "25px",
                        //  paddingTop: "25px",
                        marginTop: "5px",
                        borderColor: "#f3f3f3",
                        background: "#FAFAFA",
                      }} className="col-md-7">

                        <div className="col-md-3">
                          <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="DoorNoBuild" value={field.doorNo} onChange={(e) => handleTextInputField1(index, e, "doorNo")}  {...(validation = { isRequired: value3 === "LBBUILDING" ? false : true, title: t("TL_INVALID_DOOR_NO") })} />
                        </div>
                        <div className="col-md-3">
                          <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO_SUB")}`}</CardLabel>
                          <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="DoorSubBuild" value={field.doorNoSub} onChange={(e) => handleTextInputField1(index, e, "doorNoSub")}  {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                        {value3 === "LBBUILDING" && (
                          <div className="row">
                            <div className="col-md-3">
                              <CardLabel>Stall No</CardLabel>
                              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="BuildingstallNo" value={field.stallNo} onChange={(e) => handleTextInputField1(index, e, "stallNo")}  {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_STALL_NO") })} />
                            </div>
                          </div>
                        )}
                        <div className="col-md-2">
                          <CardLabel>.</CardLabel>
                          <LinkButton
                            label={
                              <div>
                                <span>
                                  <svg
                                    style={{ float: "right", position: "relative", bottom: "5px" }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
                                      fill={!(formState1.length == 1) ? "#494848" : "#FAFAFA"}
                                    />
                                  </svg>
                                </span>
                              </div>
                            }
                            style={{ width: "100px", display: "inline" }}
                            onClick={(e) => dispatch1({ type: "REMOVE_THIS_DOOR", payload: { index } })}
                          />
                        </div>
                      </div>

                    </div>
                  );
                })
                }


                <div className="row">
                  <div className="col-md-7" >
                    <div style={{ justifyContent: "right", display: "flex", paddingBottom: "15px", color: "#FF8C00" }}>
                      <div className="col-md-3">
                        <button type="button" style={{ paddingTop: "10px" }} onClick={(e) => dispatch1({ type: "CHECK_DOOR" })}>
                          {`${t("TL_CHECK_DOOR_LABEL")}`}
                        </button>
                      </div>
                      <div className="col-md-3">
                        &nbsp;
                      </div>
                      <div className="col-md-3">
                        <button type="button" style={{ paddingTop: "10px" }} onClick={() => dispatch1({ type: "ADD_NEW_DOOR" })}>
                          {`${t("TL_ADD_DOOR_LABEL")}`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {formState.map((field, index) => {
                  return (
                    <div className="row" key={`${field}-${index}`}>
                      <div style={{
                        border: "solid",
                        borderRadius: "25px",
                        padding: "5px",
                        paddingTop: "5px",
                        marginTop: "5px",
                        borderColor: "#f3f3f3",
                        background: "#FAFAFA",
                      }} className="col-md-7">
                        {/* <CardLabel>{`${t("TL_LICENSE_NAME_LICENSEE")}`}<span className="mandatorycss">*</span></CardLabel> */}
                        <div className="col-md-10">
                          <CardLabel>{`${t("TL_LICENSE_NAME_LICENSEE")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="name" value={field.name} onChange={(e) => handleTextInputField(index, e, "name")} placeholder={`${t("TL_LICENSEE_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                        </div>
                        <div className="col-md-1">
                          <CardLabel>.</CardLabel>
                          <LinkButton
                            label={
                              <div>
                                <span>
                                  <svg
                                    style={{ float: "right", position: "relative", bottom: "5px" }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
                                      fill={!(formState.length == 1) ? "#494848" : "#FAFAFA"}
                                    />
                                  </svg>
                                </span>
                              </div>

                            }

                            style={{ width: "100px", display: "inline" }}
                            onClick={(e) => dispatch({ type: "REMOVE_THIS_OWNER", payload: { index } })}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="row">
                  <div className="col-md-7" >
                    <div style={{ justifyContent: "right", display: "flex", paddingBottom: "15px", color: "#FF8C00" }}>
                      <button type="button" style={{ paddingTop: "10px" }} onClick={() => dispatch({ type: "ADD_NEW_OWNER" })}>
                        {t("TL_ADD_LICENCEE_LABEL")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <CardLabel style={{ marginBottom: "30px" }} > {`${t("TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL")} `}<span className="mandatorycss">*</span></CardLabel>
                    <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={LicenseeType} onSelect={selectLicenseeType} style={{ display: "flex", justifyContent: "space-between", width: "38%" }} {...(validation = { isRequired: true, type: "option", title: "Invalid Ownership Type" })} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} name="licensingInstitutionName" value={licensingInstitutionName} onChange={setSelectLicensingInstitutionName} placeholder={`${t("TL_LICENSING_INSTITUTION_NAME")}`} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_INSTITUTION_NAME") })} />
                  </div>
                </div>


                {value3 === "LBBUILDING" && (
                  <div className="col-md-7">
                    <div className="col-md-4">
                      <CardLabel>{`${t("TL_BUILDING_CODE")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="BuildingCode" value={BuildingCode} onChange={setSelectBuildingcode}  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BUILDING_CODE") })} />
                    </div>
                    <div className="col-md-8">
                      <CardLabel>{`${t("TL_BUILDING_NAME")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="BuildingName" value={BuildingName} onChange={setSelectBuildingName}  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BUILDING_NAME") })} />
                    </div>
                  </div>
                )}

                {/* <div style="justify-content: center; display: flex; padding-bottom: 15px; color: rgb(255, 140, 0);"><button type="button" style="padding-top: 10px;">Add More Licensee</button></div> */}
                <div className="row">
                  <div className="col-md-7" ><CardLabel>{`${t("TL_LOCALIZATION_SECTOR")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={menusector} selected={sector} select={(e) => selectSector(e)}  {...(validation = { isRequired: true, title: t("TL_INVALID_SECTOR_NAME") })} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7" >
                    <CardLabel style={{ display: "inline-block" }}>{`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)<span className="mandatorycss"> *</span></CardLabel>
                    <TextInput t={t} type={"text"} isMandatory={config.isMandatory} name="capitalAmount" value={capitalAmount} onChange={changesetCapitalAmount} {...(validation = { isRequired: true, title: t("TL_INVALID_CAPITAL_AMOUNT") })} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12" >
                    {`${t("TL_LICENSE_PDE_DATA")}`}
                  </div>
                </div>
                <div style={{ border: "solid", borderRadius: "5px", padding: "5px", paddingTop: "5px", marginTop: "5px", borderColor: "#f3f3f3", background: "#FAFAFA", }} className="col-md-12">
                  <div className="row">
                    <div className="col-md-3" >
                      <CardLabel>{`${t("TL_LICENSE_PDE_FROM_YEAR")}`}</CardLabel>
                      <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPayYearFrom} selected={licFromYear} select={selectLicFromYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_FROM_YEAR") })} />
                    </div>
                    <div className="col-md-3" >
                      <CardLabel>{`${t("TL_LICENSE_PDE_TO_YEAR")}`}</CardLabel>
                      <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPayYearTo} selected={licToYear} select={selectLicToYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_TO_YEAR") })} />
                    </div>
                    <div className="col-md-3" >
                      <CardLabel style={{ display: "inline-block" }}>{`${t("TL_LICENSE_PDE_ARREAR")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)</CardLabel>
                      <TextInput t={t} isMandatory={false} type={"text"} name="licArrear" value={licArrear} onChange={changesetLicArrear} {...(validation = { isRequired: false, title: t("TL_INVALID_ARREAR") })} />
                    </div>
                    <div className="col-md-3" >
                      <CardLabel style={{ display: "inline-block" }}>{`${t("TL_LICENSE_PDE_CURRENT")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)</CardLabel>
                      <TextInput t={t} isMandatory={false} type={"text"} name="licCurrent" value={licCurrent} onChange={changesetLicCurrent} {...(validation = { isRequired: false, title: t("TL_INVALID_CURRENT") })} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12" >
                    {`${t("TL_LICENSE_PDE_PROF_DATA")}`}
                  </div>
                </div>
                <div style={{ border: "solid", borderRadius: "5px", padding: "5px", paddingTop: "5px", marginTop: "5px", borderColor: "#f3f3f3", background: "#FAFAFA", }} className="col-md-12">
                  <div className="row">
                    <div className="col-md-2" >
                      <CardLabel>{`${t("TL_LICENSE_PDE_FROM_YEAR")}`}</CardLabel>
                      <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPayYearFrom} selected={profFromYear} select={selectProfFromYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_FROM_YEAR") })} />
                    </div>
                    <div className="col-md-2" >
                      <CardLabel>{`${t("TL_LICENSE_PDE_FROM_PERIOD")}`}</CardLabel>
                      <Dropdown t={t} optionKey="description" isMandatory={false} option={cmbptperiod} selected={profFromPeriod} select={selectProfFromPeriod}  {...(validation = { isRequired: false, title: t("TL_INVALID_FROM_PERIOD") })} />
                    </div>
                    <div className="col-md-2" >
                      <CardLabel>{`${t("TL_LICENSE_PDE_TO_YEAR")}`}</CardLabel>
                      <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPayYearTo} selected={profToYear} select={selectProfToYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_TO_YEAR") })} />
                    </div>
                    <div className="col-md-2" >
                      <CardLabel>{`${t("TL_LICENSE_PDE_TO_PERIOD")}`}</CardLabel>
                      <Dropdown t={t} optionKey="description" isMandatory={false} option={cmbpttoperiod} selected={profToPeriod} select={selectProfToPeriod}  {...(validation = { isRequired: false, title: t("TL_INVALID_TO_PERIOD") })} />
                    </div>
                    <div className="col-md-2" >
                      <CardLabel style={{ display: "inline-block" }}>{`${t("TL_LICENSE_PDE_ARREAR")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)</CardLabel>
                      <TextInput t={t} isMandatory={false} type="text" name="profArrear" value={profArrear} onChange={changesetProfArrear} {...(validation = { isRequired: false, title: t("TL_INVALID_ARREAR") })} />
                    </div>
                    <div className="col-md-2" >
                      <CardLabel style={{ display: "inline-block" }}>{`${t("TL_LICENSE_PDE_CURRENT_FIRST")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)</CardLabel>
                      <TextInput t={t} isMandatory={false} type="text" name="profCurrentFirst" value={profCurrentFirst} onChange={changesetProfCurrentFirst} {...(validation = { isRequired: false, title: t("TL_INVALID_CURRENT") })} />
                    </div>
                    <div className="col-md-3" >
                      <CardLabel style={{ display: "inline-block" }}>{`${t("TL_LICENSE_PDE_CURRENT_SECOND")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)</CardLabel>
                      <TextInput t={t} isMandatory={false} type="text" name="profCurrentSecond" value={profCurrentSecond} onChange={changesetProfCurrentSecond} {...(validation = { isRequired: false, title: t("TL_INVALID_PENAL") })} />
                    </div>
                  </div>
                  <div className="row">
                  </div>
                </div>
                {value3 === "LBBUILDING" && (
                  <div>
                    <div className="row">
                      <div className="col-md-12" > <CardLabel>{`${t("TL_LICENSE_PDE_RENT_DATA")}`}</CardLabel>
                      </div>
                    </div>

                    <div id="divRent" style={{ border: "solid", borderRadius: "5px", padding: "5px", paddingTop: "5px", marginTop: "5px", borderColor: "#f3f3f3", background: "#FAFAFA", }} className="col-md-12">
                      <div className="row">
                        <div className="col-md-2" >
                          <CardLabel>{`${t("TL_LICENSE_PDE_FROM_YEAR")}`}</CardLabel>
                          <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPayYearFrom} selected={rentFromYear} select={selectRentFromYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_FROM_YEAR") })} />
                        </div>
                        <div className="col-md-2" >
                          <CardLabel>{`${t("TL_LICENSE_PDE_FROM_MONTH")}`}</CardLabel>
                          <Dropdown t={t} optionKey="description" isMandatory={false} option={cmbrentperiod} selected={rentFromMonth} select={selectRentFromMonth}  {...(validation = { isRequired: false, title: t("TL_INVALID_FROM_MONTH") })} />
                        </div>
                        <div className="col-md-2" >
                          <CardLabel>{`${t("TL_LICENSE_PDE_TO_YEAR")}`}</CardLabel>
                          <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbPayYearTo} selected={rentToYear} select={selectRentToYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_TO_YEAR") })} />
                        </div>
                        <div className="col-md-2" >
                          <CardLabel>{`${t("TL_LICENSE_PDE_TO_MONTH")}`}</CardLabel>
                          <Dropdown t={t} optionKey="description" isMandatory={false} option={cmbrenttoperiod} selected={rentToMonth} select={selectRentToMonth}  {...(validation = { isRequired: false, title: t("TL_INVALID_TO_MONTH") })} />
                        </div>
                        <div className="col-md-2" >
                          <CardLabel style={{ display: "inline-block" }}>{`${t("TL_LICENSE_PDE_ARREAR")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)</CardLabel>
                          <TextInput t={t} isMandatory={false} type="text" name="rentArrear" value={rentArrear} onChange={changesetrentArrear} {...(validation = { isRequired: false, title: t("TL_INVALID_ARREAR") })} />
                        </div>
                        <div className="col-md-2" >
                          <CardLabel style={{ display: "inline-block" }}>{`${t("TL_LICENSE_PDE_CURRENT")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="21" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)</CardLabel>
                          <TextInput t={t} isMandatory={false} type="text" name="rentCurrent" value={rentCurrent} onChange={changesetrentCurrent} {...(validation = { isRequired: false, title: t("TL_INVALID_CURRENT") })} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* <div style={{ border: "solid", borderRadius: "5px", padding: "5px", paddingTop: "5px", marginTop: "5px", borderColor: "#f3f3f3", background: "#FAFAFA", }} className="col-md-12">
                  <div className="row">
                    {errorMessage && <div className="mandatorycss"> {errorMessage} </div>}
                  </div>
                </div> */}
              </div>
              <div>
                {toast && (
                  <Toast
                    error={toast}
                    label={errorMessage}
                    onClose={() => setToast(false)}
                  />
                )}{""}
              </div>
            </div>
          </FormStep>
        )}
      </React.Fragment>
    );
};
export default TLPdeEntry;