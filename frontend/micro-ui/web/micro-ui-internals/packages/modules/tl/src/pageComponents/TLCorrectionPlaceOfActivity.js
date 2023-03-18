import React, { useEffect, useState, useReducer } from "react";
import { CardLabel, TextInput, Dropdown, LinkButton, RadioButtons, DatePicker } from "@egovernments/digit-ui-react-components";
import { sortDropdownNames } from "../utils/index";
const TLCorrectionPlaceOfActivity = ({ t, config }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const stateId = Digit.ULBService.getStateId();
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: dataitem = {}, isstructuretypeLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeStructureSubtype");
  let cmbStructure = [];
  let cmbPlace = [];
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
  let validation = {};
  const [licenseUnitName, setLicenseUnitName] = useState();
  const [licenseUnitNameLocal, setLicenseUnitNameLocal] = useState();
  const [contactno, setContactno] = useState();
  const [email, setEmail] = useState();
  const [structureType, setStructureType] = useState();
  const [structurePlaceSubtype, setStructurePlaceSubtype] = useState();
  const [filteredPlaceSubtype, setFilteredPlaceSubtype] = useState([]);
  const [ownershipCategoryMenu,setOwnershipCategoryMenu] =useState([]);
  const [ownershipCategory, setOwnershipCategory] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
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
  useEffect(() => {
    if (isInitialRender) {
      if (structureType) {
        setIsInitialRender(false);
        naturetype = structureType.code;
        setFilteredPlaceSubtype(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        setValue2(naturetype);
        if (naturetype === "LAND") {
          setValue3(formDataPage?.tradeLicenseDetail?.structurePlace?.isResurveyed ? formDataPage?.tradeLicenseDetail?.structurePlace?.isResurveyed : null);
        }
      }
    }
  }, [isInitialRender, value2, value3, filteredPlaceSubtype]);
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
      <div className="row">
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
      </div>
    </div>

  );
}
export default TLCorrectionPlaceOfActivity;