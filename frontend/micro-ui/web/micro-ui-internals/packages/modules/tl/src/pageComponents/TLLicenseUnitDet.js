import { CardLabel, Dropdown, FormStep, LinkButton, Loader, RadioButtons, RadioOrSelect, TextInput, TextArea, DatePicker, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect, useCallback } from "react";
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

  const buildingtype = [
    { name: "Own", code: "OWN" },
    { name: "Rent", code: "RENT" },
    { name: "LB Building", code: "LBBUILDING" },
  ];
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  let validation = {};
  const { data: Districts = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "District"); 
  const { data: PostOffice = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "PostOffice");
  const { data: LBTypes = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
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
  const [BuildingType, setBuildingType] = useState(formData?.tradeLicenseDetail?.address?.buildingType ? buildingtype.filter((type) => type.code.includes(formData?.tradeLicenseDetail?.address?.buildingType))[0] : "");
  const [TradeCategory, setTradeCategory] = useState();
  const [TradeType, setTradeType] = useState(formData?.TadeDetails?.Units?.TradeType ? formData?.TadeDetails?.Units?.TradeType : "");
  const [TradeSubType, setTradeSubType] = useState(formData?.TadeDetails?.Units?.TradeSubType ? formData?.TadeDetails?.Units?.TradeSubType : "");
  const [CustomType, setCustomType] = useState(formData?.TadeDetails?.Units?.CustomType ? formData?.TadeDetails?.Units?.CustomType : "");
  const [BusinessActivity, setBusinessActivity] = useState(formData?.TadeDetails?.Units?.BusinessActivity ? formData?.TadeDetails?.Units?.BusinessActivity : "");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity ? formData?.TradeDetails?.setPlaceofActivity : "");
  const [StructureType, setStructureType] = useState(formData?.TradeDetails?.StructureType ? formData?.TradeDetails?.StructureType : "");
  const [ResurveyedLand, setResurveyedLand] = useState(formData?.TradeDetails?.ResurveyedLand ? formData?.TradeDetails?.ResurveyedLand : "");
  // const [fields, setFeilds] = useState((formData?.TradeDetails && formData?.TradeDetails?.units) || [{ tradecategory: "", tradetype: "", tradesubtype: "", unit: null, uom: null }]);
  const [fields, setFeilds] = useState([{ tradecategory: "", tradetype: "", tradesubtype: "", unit: null, uom: null }]);
  const onSuccess = () => {
    sessionStorage.removeItem("CurrentTenant");
    queryClient.invalidateQueries("TL_CREATE_TRADE");
  };
  let naturetype = null;
  let naturetypecmbvalue = null;
  let cmbDistrict = [];
  let cmbLBType = [];
  let LBs = [];
  let cmbLB = [];
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  let cmbPlace = [];
  let cmbStructure = [];
  let cmbPostOffice = [];
  

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

  cmbWardNoFinal = cmbWardNoFinal.sort((a, b) => {
    if (parseInt(a.wardno) > parseInt(b.wardno)) { return 1; }
    if (parseInt(b.wardno) > parseInt(a.wardno)) { return -1; }
    return 0;
  });

  function handleAdd() {
    const values = [...fields];
    values.push({ tradecategory: "", tradetype: "", tradesubtype: "", unit: null, uom: null });
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
  let TradeCategoryMenu = [];
  //let TradeTypeMenu = [];

  Data &&
    Data.TradeLicense &&
    Data.TradeLicense.TradeType.map((ob) => {
      if (!TradeCategoryMenu.some((TradeCategoryMenu) => TradeCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
        TradeCategoryMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
      }
    });

  function getTradeTypeMenu(TradeCategory) {
    let TradeTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (
          ob.code.split(".")[0] === TradeCategory.code &&
          !TradeTypeMenu.some((TradeTypeMenu) => TradeTypeMenu.code === `${ob.code.split(".")[1]}`)
        ) {
          TradeTypeMenu.push({ i18nKey: `TRADELICENSE_TRADETYPE_${ob.code.split(".")[1]}`, code: `${ob.code.split(".")[1]}` });
        }
      });
    return TradeTypeMenu;
  }

  function getTradeSubTypeMenu(TradeType) {
    let TradeSubTypeMenu = [];
    TradeType &&
      Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (ob.code.split(".")[1] === TradeType.code && !TradeSubTypeMenu.some((TradeSubTypeMenu) => TradeSubTypeMenu.code === `${ob.code}`)) {
          TradeSubTypeMenu.push({ i18nKey: `TL_${ob.code}`, code: `${ob.code}` });
        }
      });
    return TradeSubTypeMenu;
  }

  const selectDistrict = useCallback(value => {
    setDistrictList(value);
    setLocalbody(null);
  }, [DistrictList]);

  const selectLBType = useCallback(value => {
    setLBTypeList(value);
    setIsInitialRender(true);
  }, [LBTypeList,isInitialRender]);

  const selectLocalbody = useCallback(value => {
    setLocalbody(value);
    setIsInitialRender(true);
  }, [Localbody,isInitialRender]);

  function selectTradeCategory(i, value) {
    let units = [...fields];
    units[i].tradecategory = value;
    setTradeCategory(value);
    selectTradeType(i, null);
    selectTradeSubType(i, null);
    setFeilds(units);
  }
  function selectTradeType(i, value) {
    let units = [...fields];
    units[i].tradetype = value;
    setTradeType(value);
    selectTradeSubType(i, null);
    setFeilds(units);
  }
  function selectTradeSubType(i, value) {
    let units = [...fields];
    units[i].tradesubtype = value;
    setTradeSubType(value);
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
  function selectPlaceofactivity(value) {
    setIsInitialRender(true);
    setisInitialRendercombo(true);
    naturetypecmbvalue = value.code.substring(0, 4);
    setValue2(naturetypecmbvalue);
    // setSelectedPlaceofActivity(value);
    // setStructureType(null);
    // setActivity(null);
  }
  function selectStructuretype(value) {
    setStructureType(value);
  }
  function selectResurveyedLand(value) {
    setResurveyedLand(value);
    setValue3(value.code);
  }
  function selectCustomType(i, e) {

    let units = [...fields];
    units[i].unit = e.target.value;
    setCustomType(e.target.value);
    setFeilds(units);
  }
  function selectBusinessActivity(i, e) {
    let units = [...fields];
    units[i].uom = e.target.value;
    setBusinessActivity(e.target.value);
    setFeilds(units);
  }
  useEffect(() => {
    if (isInitialRender) {
      if (setPlaceofActivity) {
        setIsInitialRender(false);
        naturetype = setPlaceofActivity.code.substring(0, 4);
        setValue2(naturetype);
        setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        if (naturetype === "LAND") {
          setValue3(formData?.TradeDetails?.ResurveyedLand ? formData?.TradeDetails?.ResurveyedLand.code : null);
        }
      }
    }
  }, [activities, isInitialRender]);

  useEffect(() => {
    if((isInitialRender)&&(DistrictList)&&(LBTypeList)) {
      cmbLB = [];
      setIsInitialRender(false);
      cmbLB.push(...LBs.filter((localbody) => ((localbody?.city?.districtid == DistrictList?.districtid)&&(localbody?.city?.lbtypecode == LBTypeList?.code))));
      setFilterLocalbody(cmbLB);
    }
  }, [isInitialRender,FilterLocalbody]);


  // const mutationLB = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "tenant", "tenants");

  // useEffect(() => {
  //   if (mutationLB?.error !== null) {
  //       mutationLB.mutate(stateId, "tenant", "tenants", {
  //       onSuccess,
  //     });
  //   }
  // }, [mutationLB]);

  // if (mutationLB?.status === "success" && mutationLB?.isSuccess && !mutationLB?.isError && isInitialRender) {
  //   cmbLB = (mutationLB?.status === "success" && mutationLB?.isSuccess && !mutationLB?.isError) ? mutationLB.data : "";
  // }

  const goNext = () => {
    let units = fields;
    // formData.TradeDetails.Units;    
    let unitsdata;

   
    let structureType = structureType.code;
    let structurePlaceSubtype = structurePlaceSubtype.code;
    let ownershipCategory = ownershipCategory.code;
    
    onSelect(config.key, {address,tradeUnits,structurePlace,tradeName,licenseUnitNameLocal,desiredLicensePeriod,
      capitalInvestment,structureType,structurePlaceSubtype,businessActivityDesc,noOfEmployees,ownershipCategory,
      commencementDate,businessSector});
  };

  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      {isLoading ? (<Loader />) : (
        <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t}  >
          {fields.map((field, index) => {
            return (
              <div>
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
                        disabled={isEdit}
                      />
                    </div>
                    <div className="col-md-3" >
                      <CardLabel>Localbody</CardLabel>
                      <Dropdown t={t} optionKey="name" isMandatory={false} option={FilterLocalbody} selected={Localbody} select={selectLocalbody} disabled={isEdit} placeholder={`${t("CS_COMMON_LB_NAME")}`} />
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
                        <RadioButtons t={t} optionsKey="name" isMandatory={config.isMandatory} options={menusector}  style={{ display: "flex", justifyContent: "space-between", width: "48%" }} />
                    </div>
                  </div>
                  <div className="row">    {/* {`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`} */}
                    <div className="col-md-4" ><CardLabel>Bussiness Category<span className="mandatorycss">*</span></CardLabel>
                        <Dropdown t={t} option={TradeCategoryMenu} optionKey="i18nKey" name={`TradeCategory-${index}`} selected={TradeCategory} select={selectTradeCategory}  placeholder="Bussiness Category" />
                    </div>
                    <div className="col-md-4" >{/* {`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`} */}
                       <CardLabel>Bussiness Type<span className="mandatorycss">*</span></CardLabel>
                        <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={getTradeTypeMenu(field?.tradecategory)} selected={field?.tradetype} select={(e) => selectTradeType(index, e)}  placeholder="Bussiness Type" />
                    </div>
                    <div className="col-md-4" > {/* {`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`} */}                 
                      <CardLabel>Bussiness Sub Type <span className="mandatorycss">*</span></CardLabel>
                      <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={sortDropdownNames(getTradeSubTypeMenu(field?.tradetype), "i18nKey", t)} selected={field?.tradesubtype} select={(e) => selectTradeSubType(index, e)} placeholder="Bussiness Sub Type" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">{/*{`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`}*/}
                      <CardLabel>Custom Specific Description</CardLabel>
                      <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="CustomType" value={field?.unit} onChange={(e) => selectCustomType(index, e)} placeholder="Custom Specific Description" {...(validation = { pattern: "^[a-zA-Z-.,0-9`' ]{50}*$", isRequired: false, type: "text", title: t("TL_INVALID_BUSINESS_ACTIVITY"),})} />
                    </div>
                    <div className="col-md-4">{/*{`${t("TL_NEW_NUMBER_OF_EMPLOYEES_LABEL")}`}*/}
                      <CardLabel className="card-label-smaller">No. of Employees</CardLabel>
                      <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="CustomType"   placeholder="No. of Employees" {...(validation = { pattern: "^[a-zA-Z-.,0-9`' ]{50}*$", isRequired: false, type: "text", title: t("TL_INVALID_BUSINESS_ACTIVITY"),})} />
                    </div>
                    <div className="col-md-4">
                      {/* {`${t("TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL")} `} */}
                      <CardLabel>{`${t("TL_TYPE_BUILDING")}`}<span className="mandatorycss">*</span></CardLabel>
                      <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={buildingtype}  {...(validation = { isRequired: true, title: t("TL_INVALID_WARD_NO") })} />
                    </div>
                  </div>
                </div>
                <div className="row">    {/* {`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`} */}
                  <div className="col-md-4" ><CardLabel>Capital Investment<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false}  optionKey="i18nKey" name="CapitalAmount"  placeholder="Capital Investment Range" {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_CAPITAL_AMOUNT") })} />
                  </div>
                  <div className="col-md-4" >{/* {`${t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL")}`} */}
                      <CardLabel>Commencement Date<span className="mandatorycss">*</span></CardLabel>
                      <DatePicker isMandatory={false} name="CommencementDate" placeholder="Date of Commencement" disabled={isEdit} {...(validation = {  isRequired: false, title: t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL") })} />
                  </div>
                  <div className="col-md-4" > {/* {`${t("TL_LICENSE_PERIOD")}`} */}                 
                    <CardLabel>Desired Period of License (Year)<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicensePeriod" placeholder="Desired Period of License"   disable={isEdit} {...(validation = { pattern: "^[0-9]*$", isRequired: false, type: "number", title: t("TL_INVALID_LICENSE_PERIOD") })} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Place of Activity</span> </h1>
                  </div>
                </div>
                <div className="row">    {/* {`${t("TL_LICENSING_UNIT_NAME")}`} */}
                  <div className="col-md-3" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicenseUnitName"   disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
                  </div>
                  <div className="col-md-3" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicenseUnitNameMal"  disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME_ML")}`} {...(validation = {  isRequired: false, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
                  </div>
                  <div className="col-md-3" ><CardLabel>{`${t("TL_CONTACT_NO")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MobileNo" disable={isEdit} placeholder={`${t("TL_CONTACT_NO")}`} {...(validation = { pattern: "^[0-9]*$",type: "text", isRequired: false, title: t("TL_INVALID_MOBILE_NO") })} />
                  </div>
                  <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="EmailID" disable={isEdit} placeholder={`${t("TL_LOCALIZATION_EMAIL_ID")}`} {...(validation = { isRequired: false, title: t("TL_INVALID_EMAIL_ID") })} />
                  </div>
                </div>
                <div className="row">    
                {/* {`${t("TL_LOCALIZATION_PLACE_ACTVITY")}`} */}
                  <div className="col-md-6" ><CardLabel>Place/Structure Type<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPlace} selected={setPlaceofActivity} select={selectPlaceofactivity} disabled={isEdit} />
                  </div> {/* {`${t("TL_LOCALIZATION_NATURE_STRUCTURE")}`} */}
                  <div className="col-md-6" ><CardLabel>Place/Structure Sub Type<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={activities} selected={StructureType} select={selectStructuretype} disabled={isEdit} />
                  </div>
                </div>
                {value2 === "LAND" && (
                  <div>
                    <div className="row"><div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_RESURVEY_LAN_DETAILS")}`}</span>   </h1> </div>
                      </div>
                    <div className="row"><div className="col-md-12" >
                      <LabelFieldPair style={{ display: "flex" }}><CardLabel>{`${t("TL_RESURVEY_LAND")}`}</CardLabel>
                        <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={ResurveyedLand} onSelect={selectResurveyedLand} disabled={isEdit} style={{ marginTop: "-8px", paddingLeft: "5px", height: "25px",display: "flex" }} />
                      </LabelFieldPair></div>
                    </div>

                    {value3 === "YES" && (
                      <div> 
                        <div className="row">
                          <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BlockNo" disable={isEdit}  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BLOCK_NO") })} />
                          </div>
                          <div className="col-md-3" > <CardLabel>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="SurveyNo" disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SURVEY_NO") })} />
                          </div>
                          <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="SubDivNo" disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SUBDIVISION_NO") })} />
                          </div>
                          <div className="col-md-3" > <CardLabel>{`${t("TL_LOCALIZATION_PARTITION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="PartitionNo" disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_PARTITION_NO") })} />
                          </div>
                        </div>
                      </div>)}
                    {value3 === "NO" && (
                      <div> 
                        <div className="row">
                          <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BlockNo"  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BLOCK_NO") })} />
                          </div>
                          <div className="col-md-4" > <CardLabel>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="SurveyNo"  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SURVEY_NO") })} />
                          </div>
                          <div className="col-md-4" > <CardLabel>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="SubDivNo"  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SUBDIVISION_NO") })} />
                          </div>
                        </div>
                      </div>)}
                      <div className="row">
                      <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col-md-4" ><CardLabel>Locality<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Locality" disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Street / Road</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Street" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Land Mark</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LandMark" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col-md-4" ><CardLabel>Building Name<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BuildingName" disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Pincode</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Pincode" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Post Office</CardLabel>
                        <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPostOffice}  disabled={isEdit} />
                      </div>
                    </div>
                  </div>
                )}

                {value2 === "BUIL" && (
                  <div>
                    <div className="row">
                      <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_BUILDING_HEADER")}`}</span> </h1>
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="DoorNoBuild" disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO_SUB")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="DoorSubBuild" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Stall No</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="StallNo" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col-md-4" ><CardLabel>Locality<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Locality" disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Street / Road</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Street" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Land Mark</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LandMark" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col-md-4" ><CardLabel>Building Name<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BuildingName" disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Pincode</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Pincode" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Post Office</CardLabel>
                        <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPostOffice} selected={setPlaceofActivity} select={selectPlaceofactivity} disabled={isEdit} />
                      </div>
                    </div>
                  </div>)}
                {value2 === "VEHI" && (
                  <div>
                    <div className="row">
                      <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_VECHICLE_HEADER")}`}</span> </h1>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12" ><CardLabel>{`${t("TL_VECHICLE_NO")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="VechicleNo"  disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_VECHICLE_NO") })} /> 
                      </div>    
                    </div>
                    <div className="row">
                      <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col-md-6" ><CardLabel>Service Area<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ServiceArea" disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                      </div>
                      <div className="col-md-6" ><CardLabel>Designated Public Place</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Street" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
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
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="VesselNo" disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_VESSEL_NO") })} /> </div>    </div>
                        <div className="row">
                      <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col-md-4" ><CardLabel>Waterbody<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="Waterbody" disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Service Area / Location</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ServiceArea" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>Designated Public Place</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="DesignatedPublicPlace" disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                      </div>
                    </div>
                  </div>)}
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
                  </div>)}
                </div>
            );
          })}
        </FormStep>
      )}
    </React.Fragment>
  );
};
export default TLLicenseUnitDet;