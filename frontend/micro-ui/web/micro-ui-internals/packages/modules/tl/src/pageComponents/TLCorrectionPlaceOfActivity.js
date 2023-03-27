import React, { useEffect, useState, useReducer, useCallback  } from "react";
import { CardLabel, TextInput, Dropdown, LinkButton, RadioButtons, DatePicker } from "@egovernments/digit-ui-react-components";
import { sortDropdownNames } from "../utils/index";
const TLCorrectionPlaceOfActivity = ({ t, config ,onSelect,formData}) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const stateId = Digit.ULBService.getStateId();

  const [tenantId, setTenantId] = useState(formData?.tenantId); 
  const { data: PostOffice = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "PostOffice");
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: dataitem = {}, isstructuretypeLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeStructureSubtype");
  const { data: localbodies, islocalbodiesLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "tenant", "Localbody");

  let cmbStructure = [];
  let cmbPlace = [];
  let cmbPostOffice = [];
  let naturetype = null;
  let LBs = [];

  const ownershipCategoryMenumain = [
    { name: "Own", code: "OWN" },
    { name: "Joint Ownership", code: "JOINTOWNER" },
    { name: "Lease", code: "LEASE" },
    { name: "Rent", code: "RENT" },
    { name: "Consent", code: "CONSENT" },
    { name: "LB Owned Building", code: "LBBUILDING" },
    { name: "Central/State Government", code: "CENTRALSTATEGOVT" },
    { name: "Local Government", code: "LOCALGOVT" },
  ];
  const menu = [
    { i18nKey: "TL_COMMON_YES", code: "YES" },
    { i18nKey: "TL_COMMON_NO", code: "NO" },
  ];

  let validation = {};
  const isEdit = window.location.href.includes("/licenserenewal-unit-det") || window.location.href.includes("renew-trade");
  const [licenseUnitName, setLicenseUnitName] = useState(formData?.licenseUnitName ? formData?.licenseUnitName : "");
  const [licenseUnitNameLocal, setLicenseUnitNameLocal] = useState(formData?.licenseUnitNameLocal ? formData?.licenseUnitNameLocal : "");
  const [contactno, setContactno] = useState(formData?.tradeLicenseDetail?.address?.contactno ? formData?.tradeLicenseDetail?.address?.contactno : "");
  const [email, setEmail] = useState(formData?.tradeLicenseDetail?.address?.email ? formData?.tradeLicenseDetail?.address?.email : "");
  const [structureType, setStructureType] = useState(formData?.tradeLicenseDetail?.structureType ? cmbStructure.filter((structure) => structure?.code.includes(formData?.tradeLicenseDetail?.structureType))[0] : "");
  const [structurePlaceSubtype, setStructurePlaceSubtype] = useState(formData?.tradeLicenseDetail?.structurePlaceSubtype ? cmbPlace.filter((place) => place?.code.includes(formData?.tradeLicenseDetail?.structurePlaceSubtype))[0] : "");
  const [filteredPlaceSubtype, setFilteredPlaceSubtype] = useState([]);
  const [ownershipCategoryMenu,setOwnershipCategoryMenu] =useState([]);
  const [ownershipCategory, setOwnershipCategory] = useState(formData?.tradeLicenseDetail?.ownershipCategory ? ownershipCategoryMenu.filter((category) => category?.code.includes(formData?.tradeLicenseDetail?.ownershipCategory))[0] : "");
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState(formData?.tradeLicenseDetail?.structurePlace?.isResurveyed === false ?  "NO" : "YES");
  const [locality, setLocality] = useState(formData?.tradeLicenseDetail?.address?.localityName ? formData?.tradeLicenseDetail?.address?.localityName : "");
  const [street, setStreet] = useState(formData?.tradeLicenseDetail?.address?.street ? formData?.tradeLicenseDetail?.address?.street : "");
  const [landmark, setLandmark] = useState(formData?.tradeLicenseDetail?.address?.landmark ? formData?.tradeLicenseDetail?.address?.landmark : "");
  const [buildingName, setBuildingName] = useState(formData?.tradeLicenseDetail?.address?.buildingName ? formData?.tradeLicenseDetail?.address?.buildingName : "");
  const [pincode, setPincode] = useState(formData?.tradeLicenseDetail?.address?.pincode ? formData?.tradeLicenseDetail?.address?.pincode : "");
  const [postOffice, setPostOffice] = useState(formData?.tradeLicenseDetail?.address?.postOffice ? cmbPostOffice.filter((postoffice) => postoffice?.code.includes(formData?.tradeLicenseDetail?.address?.postOffice.code))[0] : "");
  const [serviceArea, setServiceArea] = useState(formData?.tradeLicenseDetail?.address?.serviceArea ? formData?.tradeLicenseDetail?.address?.serviceArea : "");
  const [waterbody, setWaterbody] = useState(formData?.tradeLicenseDetail?.address?.waterbody ? formData?.tradeLicenseDetail?.address?.waterbody : "");
  const [FilterPostoffice, setFilterPostoffice] = useState([]);

  const storedDoorData = formData?.tradeLicenseDetail?.structurePlace;
  
  
  const initFnEdit = () => {
    return formData?.tradeLicenseDetail?.structurePlace;
    //return fieldsDoor;
  };
  
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
  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      LBs.push(ob);
    });
  
  const changesetLicenseUnitName = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setLicenseUnitName(e.target.value.length <= 100 ? e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '') : (e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '')).substring(0, 100));
    }
    else {
      setLicenseUnitName('');
    }

  });

  const changesetLicenseUnitNameLocal = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setLicenseUnitNameLocal(e.target.value.length <= 200 ? e.target.value.replace(/[^\u0D00-\u0D7F\u200D\u200C .&'@']/ig, '') : (e.target.value.replace(/[^\u0D00-\u0D7F\u200D\u200C .&'@']/ig, '')).substring(0, 200));
    }
    else {
      setLicenseUnitNameLocal('');
    }
  });

  const changesetContactno = (e => {
    setContactno(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
  });

  const changesetEmail = (e => {
    setEmail(e.target.value);
  });
  const selectStructureType = (value => {
    setStructureType(value);
    let tempval = [];
    setOwnershipCategoryMenu(ownershipCategoryMenumain);
    if (value?.code === "DESIGNATEDPLACE") {
      tempval = ownershipCategoryMenumain;
      tempval.splice(0, 6);
      setOwnershipCategoryMenu(tempval);
    }
    else if (value?.code !== "BUILDING") {
      tempval = ownershipCategoryMenumain;
      tempval.splice(5, 3);
      setOwnershipCategoryMenu(tempval);
    }
    else if (value?.code === "BUILDING") {
      tempval = ownershipCategoryMenumain;
      tempval.splice(6, 2);
      setOwnershipCategoryMenu(tempval);
    }
    // naturetypecmbvalue = value.code.substring(0, 4);
    // setValue2(naturetypecmbvalue);
    setValue2(value.code);
    setIsInitialRender(true);
    SelectStructurePlaceSubtype(null);
    setFilteredPlaceSubtype(null);
  });

  const SelectStructurePlaceSubtype = (value => {
    setStructurePlaceSubtype(value);
  });

  const SelectOwnershipCategory = (value => {
    setOwnershipCategory(value);
  });
  const changesetLocality = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setLocality(e.target.value.length <= 100 ? e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '') : (e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '')).substring(0, 100));
    }
    else {
      setLocality('');
    }
  });

  const changesetStreet = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setStreet(e.target.value.length <= 100 ? e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '') : (e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '')).substring(0, 100));
    }
    else {
      setStreet('');
    }

  });

  const changesetLandmark = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setLandmark(e.target.value.length <= 150 ? e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '') : (e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '')).substring(0, 150));
    }
    else {
      setLandmark('');
    }
  });

  const changesetBuildingName = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setBuildingName(e.target.value.length <= 100 ? e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '') : (e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '')).substring(0, 100));
    }
    else {
      setBuildingName('');
    }

  });

  const changesetPincode = (e => {
    setPincode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 6));
    setPostOffice(cmbPostOffice.filter((postoffice) => {
      postoffice.pincode === e.target.value.pincode
    }));
  });

  const selectsetPostOffice = (value => {
    setPostOffice(value);
    setPincode(value.pincode);
  });

  const changesetServiceArea = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setServiceArea(e.target.value.length <= 200 ? e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '') : (e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '')).substring(0, 200));
    }
    else {
      setServiceArea('');
    }
  });

  const changesetWaterbody = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setWaterbody(e.target.value.length <= 200 ? e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '') : (e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '')).substring(0, 200));
    }
    else {
       setWaterbody('');
    }
  });

  let data1 = [];
  let config1 = '';
  let searchReult = "";

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
            isResurveyed: "",
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
      case "CHECK_DOOR":
        data1["wardId"] = WardNo?.code ? WardNo.code : "";
        stateDoor.map((data, __index) => {
          data1["doorNo"] = data?.doorNo ? data.doorNo : "";
          data1["subNo"] = data?.doorNoSub ? data.doorNoSub : "";
          data1["checkDuplication"] = "DUPLICATION";
          config1 = {
            enabled: !!(data1 && Object.keys(data1).length > 0)
          }
          data1 = {
            ...data1
          }

          setPayloadDoor(Object.keys(data1).filter(k => data1[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data1[key] === "object" ? data1[key].code : data1[key] }), {}));
          searchReult = mutationDoor?.status === "success" && mutationDoor?.isSuccess && !mutationDoor?.isError ? mutationDoor.data.Licenses : "";
          if (searchReult?.length === 1) {
            setFlgCheckDoor(true);
            setErrorMessage(t("Door No Already Entered in Another Appln"));
            setToast(true)
            setTimeout(() => {
              setToast(false);
            }, 2000);
            setFlgCheck(true);
            return { ...data};

          }
          else {
            setFlgCheckDoor(false);
            setFlgCheck(true);
          }

        });
        return [
          ...stateDoor
        ];
    }
  };
  const [formStateDoor, dispatchDoor] = useReducer(reducerDoor, storedDoorData, initFnEdit); 

  const handleTextInputField1 = useCallback((index, e, key, length = 100) => {
    if (e.length <= length) {
      dispatchDoor({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e } });
      setFlgCheck(false);
      setFlgCheckDoor(false);
    }
    else
      return;
  }, [dispatchDoor]);
  useEffect(() => {
    if (isInitialRender) {
      if (structureType) {
        setIsInitialRender(false);
        naturetype = structureType.code;
        setFilteredPlaceSubtype(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        setValue2(naturetype);
        if (naturetype === "LAND") {
          setValue3(formData?.tradeLicenseDetail?.structurePlace?.isResurveyed ? formData?.tradeLicenseDetail?.structurePlace?.isResurveyed : null);
        }
      }
    }
  }, [isInitialRender, value2, value3, filteredPlaceSubtype]);
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      let districtidtemp = LBs.filter(object => object.code === tenantId)[0].city.districtid;
      let cmbPO = []; 
      console.log("cmbPostOffice"+JSON.stringify(...cmbPostOffice));
      console.log("cmbPostOffice"+districtidtemp);
      //cmbPO.push(...cmbPostOffice.filter((po) => (po?.distid == districtidtemp)));
      // setFilterPostoffice(cmbPO);

      if (formData && formData?.tradeLicenseDetail?.structureType) {
        setOwnershipCategoryMenu(ownershipCategoryMenumain);
        if (formData?.tradeLicenseDetail?.structureType === "DESIGNATEDPLACE") {
          let tempval = ownershipCategoryMenumain;
          tempval.splice(0, 6);
          setOwnershipCategoryMenu(tempval);
        }
        else if (formData?.tradeLicenseDetail?.structureType !== "BUILDING") {
          let tempval = ownershipCategoryMenumain;
          tempval.splice(5, 3);
          setOwnershipCategoryMenu(tempval);
        }
        else if (formData?.tradeLicenseDetail?.structureType === "BUILDING") {
          let tempval = ownershipCategoryMenumain;
          tempval.splice(6, 2);
          setOwnershipCategoryMenu(tempval);
        }
      }
    }
  }, [isInitialRender,  ownershipCategoryMenu]);
  if (formData?.tradeLicenseDetail?.ownershipCategory && formData?.tradeLicenseDetail?.ownershipCategory !== null && ownershipCategoryMenumain.length > 0
    && ownershipCategory === undefined && ownershipCategory !== "") {
    setOwnershipCategory(ownershipCategoryMenumain.filter((category) => category?.code.includes(formData?.tradeLicenseDetail?.ownershipCategory))[0]);
  }
  if (formData?.tradeLicenseDetail?.structureType && structureType === undefined && cmbStructure.length > 0) {
    setStructureType(formData?.tradeLicenseDetail?.structureType ? cmbPlace.filter((structure) => structure.code.includes(formData?.tradeLicenseDetail?.structureType))[0] : "");
    setValue2(formData?.tradeLicenseDetail?.structureType);
  }
  if (formData?.tradeLicenseDetail?.structurePlaceSubtype && formData?.tradeLicenseDetail?.structurePlaceSubtype !== null && structurePlaceSubtype === undefined && cmbPlace.length > 0) {
    setStructurePlaceSubtype(formData?.tradeLicenseDetail?.structurePlaceSubtype ? cmbStructure.filter((place) => place.code.includes(formData?.tradeLicenseDetail?.structurePlaceSubtype))[0] : "");
  }
  return (
    <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >
      <div className="row">
        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_PLACE_ACTIVITY")}`}</span> </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="licenseUnitName" value={licenseUnitName} onChange={changesetLicenseUnitName}  placeholder={`${t("TL_LICENSING_UNIT_NAME")}`} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
        </div>
        <div className="col-md-3" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="licenseUnitNameLocal" value={licenseUnitNameLocal} onChange={changesetLicenseUnitNameLocal} placeholder={`${t("TL_LICENSING_UNIT_NAME_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
        </div>
        <div className="col-md-3" ><CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="contactno" value={contactno} onChange={changesetContactno}  placeholder={`${t("TL_CONTACT_NO")}`} {...(validation = { pattern: "^[0-9]*$", isRequired: true, title: t("TL_INVALID_MOBILE_NO") })} />
        </div>
        <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextInput t={t} isMandatory={config.isMandatory} type="email" optionKey="i18nKey" name="email" value={email} onChange={changesetEmail}  placeholder={`${t("TL_LOCALIZATION_EMAIL_ID")}`} {...(validation = { isRequired: true, title: t("TL_INVALID_EMAIL_ID") })} />
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_PLACE_ACTVITY")}`}<span className="mandatorycss">*</span></CardLabel>
          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPlace} selected={structureType} select={selectStructureType} {...(validation = { isRequired: true, title: t("TL_INVALID_PLACE_STRUCTURE") })} />
        </div>
        <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_NATURE_STRUCTURE")}`}<span className="mandatorycss">*</span></CardLabel>
          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={filteredPlaceSubtype} selected={structurePlaceSubtype} select={SelectStructurePlaceSubtype} {...(validation = { isRequired: true, title: t("TL_INVALID_SUB_PLACE_STRUCTURE") })} />
        </div>
        <div className="col-md-4">
          <CardLabel>{`${t("TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL")} `}<span className="mandatorycss">*</span></CardLabel>
          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={ownershipCategoryMenu} selected={ownershipCategory} select={SelectOwnershipCategory}  {...(validation = { isRequired: true, title: t("TL_INVALID_OwnershipCategory") })} />
        </div>
      </div> */}
      {formStateDoor.map((field, index) => {
        return (
          <div key={`${field}-${index}`}>
            {value2 === "LAND" && (
              <div>
                <div className="row"><div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_RESURVEY_LAN_DETAILS")}`}</span>   </h1> </div>
                </div>
                <div className="row">
                  <div className="col-md-3" >
                    <CardLabel style={{ marginBottom: "30px" }}>{`${t("TL_RESURVEY_LAND")}`}<span className="mandatorycss">*</span>
                    </CardLabel>&nbsp;
                  </div>
                  <div className="col-md-8" >
                    <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={field?.isResurveyed} onSelect={selectIsResurveyed} disabled={isEdit} style={{ display: "flex", justifyContent: "space-between", width: "48%" }} />
                  </div>
                </div>
                {value3 === "YES" && (
                  <div>
                    <div className="row">
                      <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="blockNo" value={field?.blockNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^0-9]/ig, ''), "blockNo", 5)}  disable={isEdit}  {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, title: t("TL_INVALID_BLOCK_NO") })} />
                      </div>
                      <div className="col-md-3" > <CardLabel>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="surveyNo" value={field?.surveyNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^0-9]/ig, ''), "surveyNo", 5)} disable={isEdit}     {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, title: t("TL_INVALID_SURVEY_NO") })} />
                      </div>
                      <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="subDivisionNo" value={field?.subDivisionNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^0-9]/ig, ''), "subDivisionNo", 5)} disable={isEdit}     {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true,  title: t("TL_INVALID_SUBDIVISION_NO") })} />
                      </div>
                      <div className="col-md-3" > <CardLabel>{`${t("TL_LOCALIZATION_PARTITION_NO")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="partitionNo" value={field?.partitionNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^0-9]/ig, ''), "partitionNo", 5)} disable={isEdit}     {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, title: t("TL_INVALID_PARTITION_NO") })} />
                      </div>
                    </div>
                  </div>)}
                {value3 === "NO" && (
                  <div>
                    <div className="row">
                      <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="blockNo" value={field?.blockNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^0-9]/ig, ''), "blockNo", 5)} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_BLOCK_NO") })} />
                      </div>
                      <div className="col-md-4" > <CardLabel>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="surveyNo" value={field?.surveyNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^0-9]/ig, ''), "surveyNo", 5)} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_SURVEY_NO") })} />
                      </div>
                      <div className="col-md-4" > <CardLabel>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="subDivisionNo" value={field?.subDivisionNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^0-9]/ig, ''), "subDivisionNo", 5)} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_SUBDIVISION_NO") })} />
                      </div>
                    </div>
                  </div>)}
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Location and Address of Licensing Unit</span> </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALITY")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="locality" value={locality} onChange={changesetLocality} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LOCALITY") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_STREET_NAME")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={street} onChange={changesetStreet} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_STREET_NAME") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_LAND_MARK")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="landmark" value={landmark} onChange={changesetLandmark} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LAND_MARK") })} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4" ><CardLabel>{`${t("TL_BUILDING_NAME")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="buildingName" value={buildingName} onChange={changesetBuildingName} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BUILDING_NAME") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_POSTOFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
                    <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPostOffice} selected={postOffice} select={selectsetPostOffice} disabled={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_POSTOFFICE") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_PIN")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="pincode" value={pincode} onChange={changesetPincode} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_PIN") })} />
                  </div>
                </div>
              </div>
            )}

            {value2 === "BUILDING" && (
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
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="doorNo" value={field.doorNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^0-9]/ig, ''), "doorNo", 5)} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, title: t("TL_INVALID_DOOR_NO") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO_SUB")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="doorNoSub" value={field.doorNoSub} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^a-zA-Z-0-9/]/ig, ''), "doorNoSub", 14)} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                  </div>
                  {ownershipCategory.code === "LBBUILDING" && (
                    <div className="col-md-2" ><CardLabel>{`${t("TL_STALL_NO")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="stallNo" value={field.stallNo} onChange={e => handleTextInputField1(index, e.target.value.replace(/[^a-zA-Z-0-9/]/ig, ''), "stallNo", 4)} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_STALL_NO") })} />
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
            {value2 === "VEHICLE" && (
              <div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_VECHICLE_HEADER")}`}</span> </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7" ><CardLabel>{`${t("TL_VECHICLE_NO")}`} 
                  {structurePlaceSubtype?.code === "MOTOR_VEHICLE" && (
                    <span className="mandatorycss">*</span>
                  )}
                  </CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="vehicleNo" value={field?.vehicleNo} onChange={(e) => handleTextInputField1(index, e.target.value.replace(/[^a-zA-Z-0-9/]/ig, ''), "vehicleNo")} disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_VECHICLE_NO") })} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_LOCATION_ADDRESS")}`}</span> </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6" ><CardLabel>{`${t("TL_SERVICE_AREA")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="serviceArea" value={serviceArea} onChange={changesetServiceArea} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_SERVICE_AREA") })} />
                  </div>
                  <div className="col-md-6" ><CardLabel>{`${t("TL_DESIGNATED_PLACE")}`}</CardLabel>
                    <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="landmark" value={landmark} onChange={changesetLandmark}  disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DESIGNATED_PUBLIC_PLACE") })} />
                  </div>
                </div>
              </div>

            )}
            {value2 === "WATER" && (
              <div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_VESSEL_HEADER")}`}</span> </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7" ><CardLabel>{`${t("TL_VESSEL_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="vesselNo" value={field?.vesselNo} onChange={(e) => handleTextInputField1(index, e.target.value.replace(/[^a-zA-Z-0-9/]/ig, ''), "vesselNo")} disable={isEdit}     {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_VESSEL_NO") })} /> </div>    </div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}></span>{`${t("TL_LOCATION_ADDRESS")}`} </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4" ><CardLabel>{`${t("TL_WATER_BODY")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="waterbody" value={waterbody} onChange={changesetWaterbody} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_WATER_BODY") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_SERVICE_AREA")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="ServiceArea" value={serviceArea} onChange={changesetServiceArea} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_SERVICE_AREA") })} />
                  </div>
                  <div className="col-md-4" ><CardLabel>{`${t("TL_DESIGNATED_PLACE")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="landmark" value={landmark} onChange={changesetLandmark} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_DESIGNATED_PUBLIC_PLACE") })} />
                  </div>
                </div>
              </div>
            )}
            {value2 === "DESIGNATEDPLACE" && (
              <div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Details")}`}</span> </h1>
                  </div>
                </div>
                <div className="row">
                  {/* {`${t("Details Specify")}`} */}
                  <div className="col-md-7" ><CardLabel>{`${t("TL_DESIGNATED_PLACE")}`} </CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="landmark" value={landmark} onChange={changesetLandmark} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DESIGNATED_PUBLIC_PLACE") })} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }
      )}
      {value2 === "BUILDING" && (
        <div>
          <div className="row">
            <div className="col-md-7" >
              <div style={{ justifyContent: "right", display: "flex", paddingBottom: "15px", color: "#FF8C00" }}>
                <div className="col-md-3">
                  <button type="button" style={{ paddingTop: "10px" }} onClick={(e) => dispatchDoor({ type: "CHECK_DOOR" })}>
                    {`${t("TL_CHECK_DOOR_LABEL")}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_LOCATION_ADDRESS")}`} </span></h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALITY")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="locality" value={locality} onChange={changesetLocality} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LOCALITY") })} />
            </div>
            <div className="col-md-4" ><CardLabel>{`${t("TL_STREET_NAME")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={street} onChange={changesetStreet} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_STREET_NAME") })} />
            </div>
            <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_LAND_MARK")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="landmark" value={landmark} onChange={changesetLandmark} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LAND_MARK") })} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4" ><CardLabel>{`${t("TL_BUILDING_NAME")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="buildingName" value={buildingName} onChange={changesetBuildingName} disable={isEdit} {...(validation = { pattern: "^[a-zA-Z`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_BUILDING_NAME") })} />
            </div>
            <div className="col-md-4" ><CardLabel>{`${t("TL_POSTOFFICE")}`} <span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPostOffice} selected={postOffice} select={selectsetPostOffice} disabled={isEdit} {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_POSTOFFICE") })} />
            </div>
            <div className="col-md-4" ><CardLabel>{`${t("TL_PIN")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="pincode" value={pincode} onChange={changesetPincode} disable={isEdit} {...(validation = { pattern: "^[0-9`' ]*$", isRequired: false, title: t("TL_INVALID_PIN") })} />
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
export default TLCorrectionPlaceOfActivity;