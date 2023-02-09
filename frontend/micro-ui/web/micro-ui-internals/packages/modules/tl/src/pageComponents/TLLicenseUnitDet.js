import { CardLabel, Dropdown, FormStep, LinkButton, Loader, RadioButtons, RadioOrSfieldelect, TextInput, TextArea, DatePicker, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useLocation } from "react-router-dom";
import Timeline from "../components/TLTimeline";
import { sortDropdownNames } from "../utils/index";

const TLLicenseUnitDet = ({ t, config, onSelect, userType, formData }) => {


  const menusector = [
    { name: "Manufacturing Sector", code: "MANUFACTURING" },
    { name: "Service Sector", code: "SERVICE" },
  ];

  const menu = [
    { i18nKey: "TL_COMMON_YES", code: "YES" },
    { i18nKey: "TL_COMMON_NO", code: "NO" },
  ];

  const ownershipCategoryMenu = [
    { name: "Own", code: "OWN" },
    { name: "Joint Ownership", code: "JOINTOWNER" },
    { name: "Lease", code: "LEASE" },
    { name: "Rent", code: "RENT" },
    { name: "Consent", code: "CONSENT" },
    { name: "LB Owned Building", code: "LBBUILDING" },
  ];
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  let validation = {};
  const { data: Districts = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "District"); 
  const { data: PostOffice = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "PostOffice");
  const { data: LBTypes = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "LBType");
 // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [BoundaryList,setBoundaryList] = useState([]);
  const { data: localbodies, islocalbodiesLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "tenant", "Localbody");
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: dataitem = {}, isstructuretypeLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeStructureSubtype");

  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState();
  const [activities, setActivity] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRendercombo, setisInitialRendercombo] = useState(true);
  const [isInitialRenderRadio, setisInitialRenderRadio] = useState(true);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [DistrictList, setDistrictList] = useState(formData?.districtid ? formData?.districtid : "");
  const [LBTypeList, setLBTypeList] = useState(formData?.lbtype ? formData?.lbtype : "");
  const [Localbody, setLocalbody] = useState(formData?.tenantId ? cmbLB.filter((lb) => lb.code.includes(formData?.tenantId))[0] : "");
  const [FilterLocalbody, setFilterLocalbody] = useState([]);
  const [ZonalOffice, setZonalOffice] = useState([]);
  const [businessSector, setBusinessSector] = useState(formData?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec.code.includes(formData?.tradeLicenseDetail?.businessSector))[0] : "");
  // const [BuildingType, setBuildingType] = useState(formData?.tradeLicenseDetail?.address?.buildingType ? buildingtype.filter((type) => type.code.includes(formData?.tradeLicenseDetail?.address?.buildingType))[0] : "");
  const [businessCategory, setBusinessCategory] = useState(formData?.tradeLicenseDetail?.tradeUnits?.businessCategory ? TradeCategoryMenu.filter((category) => category.code.includes(formData?.tradeLicenseDetail?.tradeUnits?.businessCategory))[0] : "");
  const [businessType, setBusinessType] = useState(formData?.tradeLicenseDetail?.tradeUnits?.businessType  ? formData?.tradeLicenseDetail?.tradeUnits?.businessType  : "");
  const [businessSubType, setBusinessSubType] = useState(formData?.tradeLicenseDetail?.Units?.businessSubtype  ? formData?.tradeLicenseDetail?.Units?.businessSubtype  : "");
  const [businessActivityDesc,setBusinessActivityDesc] = useState(formData?.tradeLicenseDetail?.businessActivityDesc  ? formData?.tradeLicenseDetail?.businessActivityDesc  : "");
  const [noOfEmployees,setNoOfEmployees] = useState(formData?.tradeLicenseDetail?.businessActivityDesc  ? formData?.tradeLicenseDetail?.businessActivityDesc  : "");
  const [capitalInvestment,setCapitalInvestment] = useState(formData?.tradeLicenseDetail?.capitalInvestment  ? formData?.tradeLicenseDetail?.capitalInvestment  : "");
  const [commencementDate,setCommencementDate] = useState(formData?.commencementDate);
  const [desiredLicensePeriod,setDesiredLicensePeriod] = useState(formData?.desiredLicensePeriod  ? formData?.desiredLicensePeriod  : "");

  const [tradeName,setTradeName] = useState(formData?.tradeName  ? formData?.tradeName  : "");
  const [licenseUnitNameLocal,setLicenseUnitNameLocal] = useState(formData?.licenseUnitNameLocal  ? formData?.licenseUnitNameLocal  : "");
  const [contactno,setContactno] = useState(formData?.tradeLicenseDetail?.address?.contactno  ? formData?.tradeLicenseDetail?.address?.contactno  : "");
  const [email,setEmail] = useState(formData?.tradeLicenseDetail?.address?.email  ? formData?.tradeLicenseDetail?.address?.email  : "");  
  const [structureType,setStructureType] = useState(formData?.tradeLicenseDetail?.structureType  ? formData?.tradeLicenseDetail?.structureType  : ""); 
  const [structurePlaceSubtype,setStructurePlaceSubtype] = useState(formData?.tradeLicenseDetail?.structurePlaceSubtype  ? formData?.tradeLicenseDetail?.structurePlaceSubtype  : "");
  const [ownershipCategory,setOwnershipCategory] = useState(formData?.tradeLicenseDetail?.ownershipCategory  ? formData?.tradeLicenseDetail?.ownershipCategory  : "");
  const [isResurveyed,setIsResurveyed] = useState(formData?.tradeLicenseDetail?.structurePlace?.isResurveyed  ? formData?.tradeLicenseDetail?.structurePlace?.isResurveyed  : "");
  const [blockNo,setBlockNo] = useState(formData?.tradeLicenseDetail?.structurePlace?.blockNo  ? formData?.tradeLicenseDetail?.structurePlace?.blockNo  : "");
  const [surveyNo,setSurveyNo] = useState(formData?.tradeLicenseDetail?.structurePlace?.setSurveyNo  ? formData?.tradeLicenseDetail?.structurePlace?.setSurveyNo  : "");
  const [subDivisionNo,setSubDivisionNo] = useState(formData?.tradeLicenseDetail?.structurePlace?.subDivisionNo  ? formData?.tradeLicenseDetail?.structurePlace?.subDivisionNo  : ""); 
  const [partitionNo,setPartitionNo] = useState(formData?.tradeLicenseDetail?.structurePlace?.partitionNo  ? formData?.tradeLicenseDetail?.structurePlace?.partitionNo  : ""); 
  const [locality,setLocality] = useState(formData?.tradeLicenseDetail?.address?.locality  ? formData?.tradeLicenseDetail?.address?.locality  : ""); 
  const [street,setStreet] = useState(formData?.tradeLicenseDetail?.address?.street  ? formData?.tradeLicenseDetail?.address?.street  : ""); 
  const [landmark,setLandmark] = useState(formData?.tradeLicenseDetail?.address?.landmark  ? formData?.tradeLicenseDetail?.address?.landmark  : ""); 
  const [buildingName,setBuildingName] = useState(formData?.tradeLicenseDetail?.address?.buildingName  ? formData?.tradeLicenseDetail?.address?.buildingName  : ""); 
  const [pincode,setPincode] = useState(formData?.tradeLicenseDetail?.address?.pincode  ? formData?.tradeLicenseDetail?.address?.pincode  : ""); 
  const [postOffice,setPostOffice]  = useState(formData?.tradeLicenseDetail?.address?.postOffice  ? formData?.tradeLicenseDetail?.address?.postOffice  : ""); 
  const [vehicleNo,setVehicleNo]  = useState(formData?.tradeLicenseDetail?.structurePlace?.vehicleNo  ? formData?.tradeLicenseDetail?.structurePlace?.vehicleNo  : "");
  const [serviceArea,setServiceArea]  = useState(formData?.tradeLicenseDetail?.address?.serviceArea  ? formData?.tradeLicenseDetail?.address?.serviceArea  : "");  
  const [vesselNo,setVesselNo]  = useState(formData?.tradeLicenseDetail?.structurePlace?.vesselNo  ? formData?.tradeLicenseDetail?.structurePlace?.vesselNo  : "");
  const [waterbody,setWaterbody]  = useState(formData?.tradeLicenseDetail?.address?.waterbody  ? formData?.tradeLicenseDetail?.address?.waterbody  : "");
  const [fields, setFeilds] = useState([{ businesscategory: "", businesstype: "", businesssubtype: "", unit: null, uom: null }]);
  const [fieldsDoor, setFeildsDoor] = useState(
    (formData?.tradeLicenseDetail && formData?.tradeLicenseDetail.structurePlace) || [{ blockNo: "", surveyNo: "", subDivisionNo: "", partitionNo: "", doorNo: "", doorNoSub: "",
    vehicleNo: "", vesselNo: "", isResurveyed: null,stallNo: "" }]
  );
  const storedDoorData = formData?.door?.door;

  // const onSuccess = () => {
  //   sessionStorage.removeItem("CurrentTenant");
  //   queryClient.invalidateQueries("TL_CREATE_TRADE");
  // };
  
  let naturetype = null;
  let naturetypecmbvalue = null;
  let cmbDistrict = [];
  let cmbLBType = [];
  let LBs = [];
  let cmbLB = [];
  let Boundary = [];
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  let cmbStructureType = [];
  let cmbStructure = [];
  let cmbPostOffice = [];
  let cmbPlace = [];
  
  

  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
  dataitem &&
    dataitem["TradeLicense"] &&
    dataitem["TradeLicense"].TradeStructureSubtype.map((ob) => {
      cmbStructure.push(ob);
    });
  Districts &&
    Districts["common-masters"] &&
    Districts["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  PostOffice &&
  PostOffice["common-masters"] &&
  PostOffice["common-masters"].PostOffice.map((ob) => {
    cmbPostOffice.push(ob);
  });

  LBTypes &&
  LBTypes["common-masters"] &&
  LBTypes["common-masters"].LBType.map((ob) => {
    cmbLBType.push(ob);
  });

  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      LBs.push(ob);
  });
  
  BoundaryList &&
    BoundaryList["egov-location"] &&
    BoundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        Boundary.push(...ob.boundary);
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

  cmbWardNoFinal = cmbWardNoFinal.sort((a, b) => {
    if (parseInt(a.wardno) > parseInt(b.wardno)) { return 1; }
    if (parseInt(b.wardno) > parseInt(a.wardno)) { return -1; }
    return 0;
  });

  function handleAdd() {
    const values = [...fields];
    values.push({ businesscategory: "", businesstype: "", businesssubtype: "", unit: null, uom: null });
    setFeilds(values);
  }

  function handleRemove(index) {
    const values = [...fields];
    if (values.length != 1) {
      values.splice(index, 1);
      setFeilds(values);
    }
  }

  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
  let BusinessCategoryMenu = [];
  //let TradeTypeMenu = [];

  Data &&
    Data.TradeLicense &&
    Data.TradeLicense.TradeType.map((ob) => {
      if (!BusinessCategoryMenu.some((BusinessCategoryMenu) => BusinessCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
        BusinessCategoryMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
      }
    });

  const mutationboundary = [];
  if((Localbody) && (isInitialRender)){
    mutationboundary = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, Localbody.code.split(".")[1]  + "/egov-location", "boundary-data");
  }
  
  
  // useEffect(() => {
  //   if ((mutationboundary?.error !== null) && (Localbody) && (isInitialRender)) {
  //     mutationboundary.mutate(tenantId, Localbody.city.idgencode.toLowerCase() + "/egov-location", "boundary-data", {
  //       onSuccess,
  //     });
  //     setIsInitialRender(false);
  //   }

  // }, [mutationboundary,isInitialRender]);

  // if(mutationboundary?.status === "success" && mutationboundary?.isSuccess && !mutationboundary?.isError)
  // setBoundaryList(mutationboundary?.status === "success" && mutationboundary?.isSuccess && !mutationboundary?.isError) ? mutationboundary.data : "";



  function getBusinessTypeMenu(BusinessCategory) {
    let BusinessTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (
          ob.code.split(".")[0] === BusinessCategory.code &&
          !BusinessTypeMenu.some((BusinessTypeMenu) => BusinessTypeMenu.code === `${ob.code.split(".")[1]}`)
        ) {
          BusinessTypeMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[1]}`, code: `${ob.code.split(".")[1]}` });
        }
      });
    return BusinessTypeMenu;
  }

  function getBusinessSubTypeMenu(BusinessType) {
    let BusinessSubTypeMenu = [];
    BusinessType &&
      Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (ob.code.split(".")[1] === BusinessType.code && !BusinessSubTypeMenu.some((BusinessSubTypeMenu) => BusinessSubTypeMenu.code === `${ob.code}`)) {
          BusinessSubTypeMenu.push({ i18nKey: `TL_${ob.code}`, code: `${ob.code}` });
        }
      });
    return BusinessSubTypeMenu;
  }

  const selectDistrict = useCallback(value => {
    setDistrictList(value);
    setLocalbody(null);
  }, [DistrictList,Localbody]);

  const selectLBType = useCallback(value => {
    setLBTypeList(value);
    setIsInitialRender(true);
  }, [LBTypeList,isInitialRender]);

  const selectLocalbody = useCallback(value => {
    setLocalbody(value);
    setIsInitialRender(true);
  }, [Localbody,isInitialRender]);

  function selectBusinessCategory(i, value) {
    let units = [...fields];
    units[i].businesscategory = value;
    setBusinessCategory(value);
    selectBusinessType(i, null);
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  function selectBusinessType(i, value) {
    let units = [...fields];
    units[i].businesstype = value;
    setBusinessType(value);
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  function selectBusinessSubType(i, value) {
    let units = [...fields];
    units[i].businesssubtype = value;
    setBusinessSubType(value);
    // if (value == null) {
    //   units[i].unit = null;
    //   setUnitOfMeasure(null);
    // }
    // Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
    // value &&
    //   Data &&
    //   Data.TradeLicense &&
    //   Data.TradeLicense.TradeType.map((ob) => {
    //     if (value.code === ob.code) {
    //       units[i].unit = ob.uom;
    //       setUnitOfMeasure(ob.uom);
    //       // setFeilds(units);
    //     }
    //   });
    setFeilds(units);
  }

  const changesetBusinessActivityDesc = useCallback(e => {
    setBusinessActivityDesc(e.target.value);
  }, [businessActivityDesc]);

  const changesetCapitalInvestment = useCallback(e => {
    setCapitalInvestment(e.target.value);
  }, [capitalInvestment]);

  const changesetCommencementDate = useCallback(e => {
    setCommencementDate(e.target.value);
  }, [commencementDate]);

  const changesetDesiredLicensePeriod = useCallback(e => {
    setDesiredLicensePeriod(e.target.value);
  }, [desiredLicensePeriod]);

  const changesetNoofEmployees = useCallback(e => {
    setNoOfEmployees(e.target.value);
  }, [noOfEmployees]);

  const changesetTradeName = useCallback(e => {
    setTradeName(e.target.value);
  }, [tradeName]);

  const changesetLicenseUnitNameLocal = useCallback(e => {
    setLicenseUnitNameLocal(e.target.value);
  }, [licenseUnitNameLocal]);

  const changesetContactno = useCallback(e => {
    setContactno(e.target.value);
  }, [contactno]);

  const changesetEmail = useCallback(e => {
    setEmail(e.target.value);
  }, [email]);

  const selectStructureType = useCallback(value => {
    setStructureType(value);
    naturetypecmbvalue = value.code.substring(0, 4);
    setValue2(naturetypecmbvalue);
    SelectStructurePlaceSubtype(null);
    setActivity(null);
  }, [structureType,activities,structureType,value2]);

  const SelectStructurePlaceSubtype = useCallback(value => {
    setStructurePlaceSubtype(value);
  }, [structurePlaceSubtype]);

  const SelectOwnershipCategory = useCallback(value => {
    setOwnershipCategory(value);
  }, [ownershipCategory]);

  const selectIsResurveyed = useCallback(value => {
    setIsResurveyed(value);
    setValue3(value.code);
  }, [isResurveyed,value3]);

  const changesetBlockNo = useCallback(e => {
    setBlockNo(e.target.value);
  }, [blockNo]);

  const changesetSurveyNo = useCallback(e => {
    setSurveyNo(e.target.value);
  }, [surveyNo]);
  
  const changesetSubDivisionNo = useCallback(e => {
    setSubDivisionNo(e.target.value);
  }, [subDivisionNo]);

  const changesetPartitionNo = useCallback(e => {
    setPartitionNo(e.target.value);
  }, [partitionNo]);

  const changesetLocality = useCallback(e => {
    setLocality(e.target.value);
  }, [locality]);

  const changesetStreet = useCallback(e => {
    setStreet(e.target.value);
  }, [street]);

  const changesetLandmark = useCallback(e => {
    setLandmark(e.target.value);
  }, [landmark]);

  const changesetBuildingName = useCallback(e => {
    setBuildingName(e.target.value);
  }, [buildingName]);

  const changesetPincode = useCallback(e => {
    setPincode(e.target.value);
    setPostOffice(cmbPostOffice.filter((postoffice)=>{
      postOffice.pincode === e.target.value.pincode  
    }));
  }, [pincode,postOffice]);

  const selectsetPostOffice = useCallback(value => {
    setPostOffice(value);
    setPincode(value.pincode);
  }, [pincode,postOffice]);

  const changesetVehicleNo = useCallback(e => {
    setVehicleNo(e.target.value);
  }, [vehicleNo]);

  const changesetServiceArea = useCallback(e => {
    setServiceArea(e.target.value);
  }, [serviceArea]);

  const changesetVesselNo = useCallback(e => {
    setVesselNo(e.target.value);
  }, [vesselNo]);

  const changesetWaterbody = useCallback(e => {
    setWaterbody(e.target.value);
  }, [waterbody]);
  
  const selectBusinessSector = useCallback(value => {
    setBusinessSector(value);
  }, [businessSector]);
  
  
  const initFnEdit = () => {
    return fieldsDoor;
  };

  const reducerDoor = (stateDoor, action) => {

    switch (action.type) {
      case "ADD_NEW_DOOR":
        return [
          ...stateDoor,
          {
            blockNo: "",
            surveyNo: "",
            subDivisionNo: "",
            partitionNo: "",
            doorNo: "",
            doorNoSub: "",
            vehicleNo: "",
            vesselNo: "",
            isResurveyed: null,
            stallNo: "",
          },
        ];
      case "REMOVE_THIS_DOOR":
        return stateDoor.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_DOORNO":
        return stateDoor.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
      // case "CHECK_DOOR":
      //   queryClient.removeQueries("TL_SEARCH_PDE");
      //   data1["wardId"] = WardNo?.code ? WardNo.code : "";
      //   state1.map((data, __index) => {
      //     data1["doorNo"] = data?.doorNo ? data.doorNo : "";
      //     data1["subNo"] = data?.doorNoSub ? data.doorNoSub : "";
      //     configDoor = {
      //       enabled: !!(data && Object.keys(data).length > 0)
      //     }
      //     data1 = {
      //       ...data1
      //     }
          // setPayloadDoor(Object.keys(data1).filter(k => data1[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data1[key] === "object" ? data1[key].code : data1[key] }), {}));
          // searchResultDoor = mutationsearchDoor?.status === "success" && mutationsearchDoor?.isSuccess && !mutationsearchDoor?.isError ? mutationsearchDoor.data.Licenses : "";
          // if (searchResultDoor?.length === 1) {
          //   formData = (mutationsearchDoor?.status === "success" && mutationsearchDoor?.isSuccess && !mutationsearchDoor?.isError) ? mutationsearchDoor.data : "";
          //   setFlgCheck(true);
          // }
        // });
        // return [
        //   ...stateDoor
        // ];

    }
  };

  const initFn = (initData) => {
    return [
      {
          blockNo: "",
          surveyNo: "",
          subDivisionNo: "",
          partitionNo: "",
          doorNo: "",
          doorNoSub: "",
          vehicleNo: "",
          vesselNo: "",
          isResurveyed: null,
          stallNo: ""
      },
    ];
  };

  const [formStateDoor, dispatchDoor] = isEdit ? useReducer(reducerDoor, storedDoorData, initFnEdit) : useReducer(reducerDoor, storedDoorData, initFn);

  const handleTextInputField1 = useCallback((index, e, key) => {
    if (key === "doorNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 5 ? e.target.value.replace(/[^0-9.]/ig, '') : (e.target.value.replace(/[^0-9.]/ig, '')).substring(0, 5) } });
    if (key === "doorNoSub")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 14 ? e.target.value : e.target.value.substring(0, 14) } });
    if (key === "stallNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "blockNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "surveyNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "subDivisionNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "partitionNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "vehicleNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "vesselNo")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    if (key === "isResurveyed")
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value.length <= 15 ? e.target.value : e.target.value.substring(0, 15) } });
    
      setFeildsDoor((formData?.tradeLicenseDetail && formData?.tradeLicenseDetail.structurePlace) || [{ blockNo: "", surveyNo: "", subDivisionNo: "", partitionNo: "", doorNo: "", doorNoSub: "",
      vehicleNo: "", vesselNo: "", isResurveyed: null,stallNo: "" }]);
  }, [dispatchDoor]);

 
  useEffect(() => {
    if (isInitialRender) {
      if (structurePlaceSubtype) {
        setIsInitialRender(false);
        naturetype = structurePlaceSubtype.code.substring(0, 4);
        setValue2(naturetype);
        setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        if (naturetype === "LAND") {
          setValue3(formData?.tradeLicenseDetail?.structurePlace?.isResurveyed ? formData?.tradeLicenseDetail?.structurePlace?.isResurveyed : null);
        }
      }
    }
  }, [activities, isInitialRender,value2,value3]);

  useEffect(() => {
    if(isInitialRender) {
      // if((DistrictList)&&(LBTypeList)){
        cmbLB = [];
        setIsInitialRender(false);
        cmbLB.push(...LBs.filter((localbody) => ((localbody?.city?.districtid == DistrictList?.districtid)&&(localbody?.city?.lbtypecode == LBTypeList?.code))));
        setFilterLocalbody(cmbLB);
      // }
     
    }
  }, [isInitialRender,FilterLocalbody]);

  useEffect(() => {
    if((isInitialRender)) {
      if(Localbody){
        setIsInitialRender(false);
        cmbWardNoFinal.push(...cmbWardNoFinal?.filter((wardno) => ((wardno?.zonecode == Zonal?.code)&&(Zonal?.city?.lbtypecode == LBTypeList?.code))));
        setFilterLocalbody(cmbLB);
      }
    }
  }, [isInitialRender,FilterLocalbody]);


  const goNext = () => {
    let combineddoorno = "";
    formStateDoor.map((data) => {
      combineddoorno = combineddoorno + data.doorNo +
        (data.doorNoSub !== "" && data.doorNoSub !== null ? "/" + data.doorNoSub : "") +
        (data.stallNo !== "" && data.stallNo !== null ? "(" + data.stallNo + ")" : "") + ",";
    });
    combineddoorno = combineddoorno.slice(0, -1);

    let units = fields;
    // formData.TradeDetails.Units;    
    let address = {
      "id": (isEdit) ? formData?.tradeLicenseDetail?.address?.id : null,
      "tenantId": tenantId,
      "doorNo": combineddoorno,
      "locality": locality,
      "street": street,
      "landmark": landmark,
      "buildingName":  buildingName,
      "zonalid": WardNo.zonecode,
      "wardid": WardNo.code,
      "wardno": WardNo.wardno,
      "postOffice":  postOffice.code,
      "pincode":  pincode,
      "contactno":  contactno,
      "email":  email,
      "waterbody":  waterbody,
      "serviceArea": serviceArea
    };
    let tradeUnits = { ...units, units: fields };
      
    let structurePlace ={
            "blockNo": blockNo,
            "surveyNo": surveyNo,
            "subDivisionNo": subDivisionNo,
            "partitionNo": partitionNo,
            "doorNo": 365,
            "doorNoSub": "A",
            "vehicleNo": vehicleNo,
            "vesselNo": vesselNo,
            "isResurveyed": isResurveyed,
            "stallNo": stallNo,
    }

    let tradeName = tradeName;
    let licenseUnitNameLocal = licenseUnitNameLocal;
    let desiredLicensePeriod = desiredLicensePeriod;
    let capitalInvestment = capitalInvestment;
    let structureType = structureType.code;
    let structurePlaceSubtype = structurePlaceSubtype.code;
    let businessActivityDesc =businessActivityDesc;
    let noOfEmployees = noOfEmployees;
    let ownershipCategory = ownershipCategory.code;

    let formdatatemp = {
      Licenses: [
        {
          id: (isEdit) ? formData?.id : null,
          tenantId: tenantId,
          commencementDate: commencementDate,
          applicationNumber: (isEdit) ? formData?.applicationNumber : null,
          status: (isEdit) ? formData?.status : null,
          tradeLicenseDetail: {
            id: (isEdit) ? formData?.tradeLicenseDetail?.id : null,
            channel: "CITIZEN",
            capitalInvestment:capitalInvestment,
            structureType: structureType,
            structurePlaceSubtype: structurePlaceSubtype,
            businessActivityDesc: businessActivityDesc,
            noOfEmployees: noOfEmployees,
            ownershipCategory: ownershipCategory,
            address: address,
            tradeUnits: tradeUnits
          },
          tradeName: tradeName,
          licenseUnitNameLocal : licenseUnitNameLocal,
          desiredLicensePeriod : desiredLicensePeriod,
          capitalInvestment: capitalAmount,
        }
      ]
    }

    onSelect(config.key, formdatatemp);
  };

  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      {isLoading ? (<Loader />) : (
        <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!fields[0].businesscategory || !fields[0].businesstype || !fields[0].businesssubtype } >
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Local Body</span> </h1>
              </div>
            </div>
            <div className="row">   
              <div className="col-md-2" >
                <CardLabel>District</CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbDistrict} selected={DistrictList} select={selectDistrict}  disabled={isEdit} placeholder={`${t("CS_COMMON_DISTRICT")}`} />
              </div>
              <div className="col-md-2" >
                <CardLabel>Localbody Type</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbLBType}
                  selected={LBTypeList} 
                  select={selectLBType}
                  placeholder={`${t("LB_TYPE")}`}
                  disabled={isEdit}
                />
              </div>
              <div className="col-md-3" >
                <CardLabel>Localbody</CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={false} option={FilterLocalbody} selected={Localbody} select={selectLocalbody} disabled={isEdit} placeholder={`${t("LB_NAME")}`} />
              </div>
              <div className="col-md-2" >
                <CardLabel>Zonal</CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={Zonal}   {...(validation = { isRequired: true, title: t("TL_INVALID_Zone") })} />
              </div>
              <div className="col-md-3" >
                <CardLabel>Ward</CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbWardNoFinal}   {...(validation = { isRequired: true, title: t("TL_INVALID_WARD_NO") })} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Nature of Licensing Activity</span> </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <CardLabel style={{ marginBottom: "30px" }}>
                  Bussiness Sector<span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-8">  
                  <RadioButtons t={t} optionsKey="name" isMandatory={config.isMandatory} options={menusector} selectedOption={businessSector} onSelect={selectBusinessSector}  style={{ display: "flex", justifyContent: "space-between", width: "48%" }} />
              </div>
            </div>
            {fields.map((field, index) => {
              return (
              <div className="row">    {/* {`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`} */}
                <div className="col-md-4" ><CardLabel>Bussiness Category<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} option={BusinessCategoryMenu} optionKey="i18nKey" value={field?.businesscategory} selected={field?.businesscategory}  name={`TradeCategory-${index}`} select={(e) => selectBusinessCategory(index, e)}  placeholder="Bussiness Category" />
                </div>
                <div className="col-md-4" >{/* {`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`} */}
                    <CardLabel>Bussiness Type<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={getBusinessTypeMenu(field?.businesscategory)} selected={field?.businesstype} select={(e) => selectBusinessType(index, e)}  placeholder="Bussiness Type" />
                </div>
                <div className="col-md-4" > {/* {`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`} */}                 
                  <CardLabel>Bussiness Sub Type <span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={sortDropdownNames(getBusinessSubTypeMenu(field?.businesstype), "i18nKey", t)} selected={field?.businesssubtype} select={(e) => selectBusinessSubType(index, e)} placeholder="Bussiness Sub Type" />
                </div>
              </div>
              )}
            )}
            <div className="row">
              <div className="col-md-4">{/*{`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`}*/}
                <CardLabel>Custom Specific Description</CardLabel>
                <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="businessActivityDesc" value={businessActivityDesc} onChange={changesetBusinessActivityDesc} placeholder="Custom Specific Description" {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_BUSINESS_ACTIVITY"),})} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Additional Details of Licensing Activity</span> </h1>
              </div>
            </div>
            <div className="row">    {/* {`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`} */}
              <div className="col-md-2" ><CardLabel>Capital Investment<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={false}  optionKey="i18nKey" name="capitalInvestment" value={capitalInvestment} onChange={changesetCapitalInvestment}  placeholder="Capital Investment Range" {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_CAPITAL_AMOUNT") })} />
              </div>
              <div className="col-md-3" >
                {/* {`${t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL")}`} */}
                  <CardLabel>Commencement Date<span className="mandatorycss">*</span></CardLabel>
                  <DatePicker name="commencementDate" date={commencementDate} onChange={changesetCommencementDate} disabled={isEdit} placeholder="Date of Commencement"  {...(validation = {  isRequired: false, title: t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL") })} />
              </div>
              <div className="col-md-3" > {/* {`${t("TL_LICENSE_PERIOD")}`} */}                 
                <CardLabel>Desired Period of License (Year)<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="desiredLicensePeriod" onChange={changesetDesiredLicensePeriod} placeholder="Desired Period of License"   disable={isEdit} {...(validation = { pattern: "^[0-9]*$", isRequired: false, type: "number", title: t("TL_INVALID_LICENSE_PERIOD") })} />
              </div>
              <div className="col-md-4">{/*{`${t("TL_NEW_NUMBER_OF_EMPLOYEES_LABEL")}`}*/}
                <CardLabel className="card-label-smaller">No. of Employees</CardLabel>
                <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="noOfEmployees" value={noOfEmployees} onChange={changesetNoofEmployees}   placeholder="No. of Employees" {...(validation = { pattern: "^[0-9`' ]{4}*$", isRequired: false, type: "text", title: t("TL_INVALID_NO_EMPLOYEES"),})} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Place of Activity</span> </h1>
              </div>
            </div>
            <div className="row">    {/* {`${t("TL_LICENSING_UNIT_NAME")}`} */}
              <div className="col-md-3" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="tradeName" value={tradeName} onChange={changesetTradeName}   disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
              </div>
              <div className="col-md-3" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="licenseUnitNameLocal" value={licenseUnitNameLocal} onChange={changesetLicenseUnitNameLocal}  disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME_ML")}`} {...(validation = {  isRequired: false, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
              </div>
              <div className="col-md-3" ><CardLabel>{`${t("TL_CONTACT_NO")}`}</CardLabel>
                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="contactno" value={contactno} onChange={changesetContactno} disable={isEdit} placeholder={`${t("TL_CONTACT_NO")}`} {...(validation = { pattern: "^[0-9]*$",type: "text", isRequired: false, title: t("TL_INVALID_MOBILE_NO") })} />
              </div>
              <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardLabel>
                <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="email" value={email} onChange={changesetEmail} disable={isEdit} placeholder={`${t("TL_LOCALIZATION_EMAIL_ID")}`} {...(validation = { isRequired: false, title: t("TL_INVALID_EMAIL_ID") })} />
              </div>
            </div>
            <div className="row">    
            {/* {`${t("TL_LOCALIZATION_PLACE_ACTVITY")}`} */}
              <div className="col-md-4" ><CardLabel>Place & Structure Type<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPlace} selected={structureType} select={selectStructureType} disabled={isEdit} />
              </div> {/* {`${t("TL_LOCALIZATION_NATURE_STRUCTURE")}`} */}
              <div className="col-md-4" ><CardLabel>Place & Structure Sub Type<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbStructure} selected={structurePlaceSubtype} select={SelectStructurePlaceSubtype} disabled={isEdit} />
              </div>
              <div className="col-md-4">
                {/* {`${t("TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL")} `} */}
                <CardLabel>Type of Ownership<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={ownershipCategoryMenu} selected={ownershipCategory} select={SelectOwnershipCategory}  {...(validation = { isRequired: true, title: t("TL_INVALID_OwnershipCategory") })} />
              </div>
            </div>
            {formStateDoor.map((field, index) => {
              return (
                <div  key={`${field}-${index}`}>
                  {value2 === "LAND" && (
                    <div>
                      <div className="row"><div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_RESURVEY_LAN_DETAILS")}`}</span>   </h1> </div>
                      </div>
                      <div className="row"><div className="col-md-12" >
                        <LabelFieldPair style={{ display: "flex" }}><CardLabel>{`${t("TL_RESURVEY_LAND")}`}</CardLabel>
                          <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={isResurveyed} onSelect={selectIsResurveyed} disabled={isEdit} style={{ marginTop: "-8px", paddingLeft: "5px", height: "25px",display: "flex" }} />
                        </LabelFieldPair></div>
                      </div>

                      {value3 === "YES" && (
                        <div> 
                          <div className="row">
                            <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="blockNo" value={field?.blockNo}  onChange={(e) => handleTextInputField1(index, e, "blockNo")} disable={isEdit}  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BLOCK_NO") })} />
                            </div>
                            <div className="col-md-3" > <CardLabel>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="surveyNo" value={field?.surveyNo} onChange={(e) => handleTextInputField1(index, e, "surveyNo")}  disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SURVEY_NO") })} />
                            </div>
                            <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="subDivisionNo" value={field?.subDivisionNo} onChange={(e) => handleTextInputField1(index, e, "subDivisionNo")} disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SUBDIVISION_NO") })} />
                            </div>
                            <div className="col-md-3" > <CardLabel>{`${t("TL_LOCALIZATION_PARTITION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="partitionNo" value={field?.partitionNo} onChange={(e) => handleTextInputField1(index, e, "partitionNo")} disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_PARTITION_NO") })} />
                            </div>
                          </div>
                        </div>)}
                        {value3 === "NO" && (
                          <div> 
                            <div className="row">
                              <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey"  name="blockNo" value={field?.blockNo}  onChange={(e) => handleTextInputField1(index, e, "blockNo")}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BLOCK_NO") })} />
                              </div>
                              <div className="col-md-4" > <CardLabel>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey"  name="surveyNo" value={field?.surveyNo} onChange={(e) => handleTextInputField1(index, e, "surveyNo")} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SURVEY_NO") })} />
                              </div>
                              <div className="col-md-4" > <CardLabel>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="subDivisionNo" value={field?.subDivisionNo} onChange={(e) => handleTextInputField1(index, e, "subDivisionNo")} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SUBDIVISION_NO") })} />
                              </div>
                            </div>
                          </div>)}
                          <div className="row">
                          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                          </div>
                        </div>
                      <div className="row"> 
                        <div className="col-md-4" ><CardLabel>Locality<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="locality" value={locality} onChange={changesetLocality}  disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Street / Road</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={street} onChange={changesetStreet} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Land Mark</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="landmark" value={landmark} onChange={changesetLandmark} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                      </div>
                      <div className="row"> 
                        <div className="col-md-4" ><CardLabel>Building Name<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="buildingName"  value={buildingName} onChange={changesetBuildingName}  disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Pincode</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="pincode" value={pincode} onChange={changesetPincode} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Post Office</CardLabel>
                          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPostOffice} selected={postOffice} select={selectsetPostOffice} disabled={isEdit} />
                        </div>
                      </div>
                    </div>
                  )}

                  {value2 === "BUIL" && (
                    <div style={{
                      border: "solid",
                      borderRadius: "10px",
                      //  padding: "25px",
                      //  paddingTop: "25px",
                      marginTop: "5px",
                      borderColor: "#f3f3f3",
                      background: "#FAFAFA",
                      }} className="col-md-12">

                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_BUILDING_HEADER")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row"> 
                        <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="doorNo"  value={field.doorNo} onChange={(e) => handleTextInputField1(index, e, "doorNo")}  disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO_SUB")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="doorNoSub" value={field.doorNoSub} onChange={(e) => handleTextInputField1(index, e, "doorNoSub")}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                        {value3 === "LBBUILDING" && (
                        <div className="col-md-4" ><CardLabel>Stall No</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="stallNo" value={field.stallNo} onChange={(e) => handleTextInputField1(index, e, "stallNo")} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                        )}
                    
                        <div>
                          {formStateDoor.length === (index + 1) && (
                            <div className="col-md-1">
                              <CardLabel>Add More</CardLabel>
                              <LinkButton
                                label={
                                  <svg class="icon  icon--plus" viewBox="0 0 5 5" fill="green" width="50" height="50">
                                    <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
                                  </svg>
                                }
                                onClick={(e) => dispatchDoor({ type: "ADD_NEW_DOOR" })}
                              />
                            </div>
                          )}
                          {formStateDoor.length > 1 && (
                            <div className="col-md-1">
                              <CardLabel>Remove</CardLabel>
                              <LinkButton
                                label={
                                  <svg viewBox="0 0 24 24" fill="red" width="50" height="50"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" /> </g> </svg>
                                }
                                onClick={(e) => dispatchDoor({ type: "REMOVE_THIS_DOOR", payload: { index } })}
                              />
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  )}
                  {value2 === "VEHI" && (
                    <div>
                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_VECHICLE_HEADER")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12" ><CardLabel>{`${t("TL_VECHICLE_NO")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="vehicleNo"  value={field?.vehicleNo} onChange={(e) => handleTextInputField1(index, e, "vehicleNo")}   disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_VECHICLE_NO") })} /> 
                        </div>    
                      </div>
                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                        </div>
                      </div>
                      <div className="row"> 
                        <div className="col-md-6" ><CardLabel>Service Area<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="serviceArea"  value={serviceArea} onChange={changesetServiceArea} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_SERVICE_AREA") })} />
                        </div>
                        <div className="col-md-6" ><CardLabel>Designated Public Place</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Street" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DESIGNATED_PUBLIC_PLACE") })} />
                        </div>
                      </div>
                    </div>
                  
                  )}
                  {value2 === "WATE" && (
                    <div>
                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_VESSEL_HEADER")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12" ><CardLabel>{`${t("TL_VESSEL_NO")}*`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="vesselNo" value={field?.vesselNo} onChange={(e) => handleTextInputField1(index, e, "vesselNo")} disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_VESSEL_NO") })} /> </div>    </div>
                          <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                        </div>
                      </div>
                      <div className="row"> 
                        <div className="col-md-4" ><CardLabel>Waterbody<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="waterbody" value={waterbody} onChange={changesetWaterbody} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Service Area / Location</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ServiceArea" value={serviceArea} onChange={changesetServiceArea} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Designated Public Place</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="DesignatedPublicPlace" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                        </div>
                      </div>
                    </div>
                  )}
                  {value2 === "DESI" && (
                    <div>
                      <div className="row">
                        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Details")}`}</span> </h1>
                        </div>
                      </div>
                      <div className="row">
                      {/* {`${t("Details Specify")}`} */}
                        <div className="col-md-12" ><CardLabel>Designated Public Place</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="DesignatedPublicPlace" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("Invalid Designated Public Place Specified") })} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            )}
            {value2 === "BUIL" && (
              <div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                  </div>
                </div>
                <div className="row"> 
                  <div className="col-md-4" ><CardLabel>Locality<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="locality" value={locality} onChange={changesetLocality}  disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>Street / Road</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={street} onChange={changesetStreet} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>Land Mark</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey"  name="landmark" value={landmark} onChange={changesetLandmark}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                  </div>
                </div>
                <div className="row"> 
                  <div className="col-md-4" ><CardLabel>Building Name<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="buildingName"  value={buildingName} onChange={changesetBuildingName}  disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_BUILDING_NAME") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>Pincode</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="pincode" value={pincode} onChange={changesetPincode} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_PINCODE") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>Post Office</CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPostOffice} selected={postOffice} select={selectsetPostOffice} disabled={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_POST_OFFICE") })} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </FormStep>
      )}
    </React.Fragment>
  );
};
export default TLLicenseUnitDet;