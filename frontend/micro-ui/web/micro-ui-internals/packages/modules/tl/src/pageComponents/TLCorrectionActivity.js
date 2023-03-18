import React, { useCallback, useState, useReducer } from "react";
import { CardLabel, TextInput, Dropdown, LinkButton, RadioButtons,DatePicker } from "@egovernments/digit-ui-react-components";
import { sortDropdownNames } from "../utils/index";
const TLCorrectionActivity = ({ t, config }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const stateId = Digit.ULBService.getStateId();
  const [minDate, setMinDate] = useState('2018-01-01');
  let validation = {};
  const menusector = [
    { name: "Manufacturing Sector", code: "MANUFACTURING" },
    { name: "Service Sector", code: "SERVICE" },
  ];
  const LicensePeriod = [
    { name: "Upto 1 Year", code: "1" },
    { name: "Upto 2 Year", code: "2" },
    { name: "Upto 3 Year", code: "3" },
    { name: "Upto 4 Year", code: "4" },
    { name: "Upto 5 Year", code: "5" },
  ];
  const [businessCategory, setBusinessCategory] = useState();
  const [businessType, setBusinessType] = useState();
  const [businessSubType, setBusinessSubType] = useState();
  const [businessSector, setBusinessSector] = useState();
  const [fields, setFeilds] = useState([{ businesscategory: "", businesstype: "", businesssubtype: "", unit: null, uom: null }]);
  const [noOfEmployees, setNoOfEmployees] = useState();
  const [capitalInvestment, setCapitalInvestment] = useState();
  const [commencementDate, setCommencementDate] = useState();
  const [desiredLicensePeriod, setDesiredLicensePeriod] = useState();
  
  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
  let BusinessCategoryMenu = [];
  Data &&
    Data.TradeLicense &&
    Data.TradeLicense.TradeType.map((ob) => {
      if (!BusinessCategoryMenu.some((BusinessCategoryMenu) => BusinessCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
        BusinessCategoryMenu.push({ i18nKey: `${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
      }
    });
  function getBusinessTypeMenu(BusinessCategory) {
    let BusinessTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (
          ob.code.split(".")[0] === BusinessCategory.code &&
          !BusinessTypeMenu.some((BusinessTypeMenu) => BusinessTypeMenu.code === `${ob.code.split(".")[0] + "." + ob.code.split(".")[1]}`)
        ) {
          BusinessTypeMenu.push({ i18nKey: `${ob.code.split(".")[0] + "." + ob.code.split(".")[1]}`, code: `${ob.code.split(".")[0] + "." + ob.code.split(".")[1]}` });
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
        if (ob.code.split(".")[0] + "." + ob.code.split(".")[1] === BusinessType.code && !BusinessSubTypeMenu.some((BusinessSubTypeMenu) => BusinessSubTypeMenu.code === `${ob.code}`)) {
          BusinessSubTypeMenu.push({ i18nKey: `${ob.code}`, code: `${ob.code}` });
        }
      });
    return BusinessSubTypeMenu;
  }
  const selectBusinessSector = (value => {
    setBusinessSector(value);
    setIsInitialRender(true);
  });
  const selectBusinessCategory = (i, value) => {
    let units = [...fields];
    units[i].businesscategory = value;
    setBusinessCategory(value);
    selectBusinessType(i, null);
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  const selectBusinessType = (i, value) => {
    let units = [...fields];
    units[i].businesstype = value;
    setBusinessType(value);
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  const selectBusinessSubType = (i, value) => {
    let units = [...fields];
    units[i].businesssubtype = value;
    setBusinessSubType(value);
    setFeilds(units);
  }
  const changesetCapitalInvestment = (e => {
    setCapitalInvestment(e.target.value.length<=12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    setIsInitialRender(true);
  });
  const changesetCommencementDate = (e => {
    setCommencementDate(e);
  });
  const changesetDesiredLicensePeriod = (e => {
    setDesiredLicensePeriod(e);
 });

 const changesetNoofEmployees = (e => {
   setNoOfEmployees(e.target.value.length<=4 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 4));
 })
  return (
    <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >
      <div className="row">
        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`}</span> </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
            {`${t("TL_BUSINESS_SECTOR")}`}<span className="mandatorycss">*</span>
          </CardLabel>
        </div>
        <div className="col-md-8">
          <RadioButtons t={t} optionsKey="name" isMandatory={config.isMandatory} options={menusector} selectedOption={businessSector} onSelect={selectBusinessSector} style={{ display: "flex", justifyContent: "space-between", width: "48%" }} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_SECTOR"), })} />&nbsp;
        </div>
      </div>
      {fields.map((field, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_SECTOR")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} option={BusinessCategoryMenu} optionKey="i18nKey" isMandatory={config.isMandatory} value={field?.businesscategory} selected={field?.businesscategory} name={`TradeCategory-${index}`} select={(e) => selectBusinessCategory(index, e)} placeholder="Bussiness Category" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_CATEGORY"), })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={getBusinessTypeMenu(field?.businesscategory)} selected={field?.businesstype} select={(e) => selectBusinessType(index, e)} placeholder="Bussiness Type"  {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_TYPE"), })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={sortDropdownNames(getBusinessSubTypeMenu(field?.businesstype), "i18nKey", t)} selected={field?.businesssubtype} select={(e) => selectBusinessSubType(index, e)} placeholder="Bussiness Sub Type" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_SUB_BUSINESS_TYPE"), })} />
            </div>
          </div>
        )
      }
      )}
      <div className="row">
        <div className="col-md-3" ><CardLabel>{`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`}&nbsp;(<svg style={{ display: "inline-block" }} class="icon icon-tabler icon-tabler-currency-rupee" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" /> <line x1="7" y1="9" x2="18" y2="9" /> </svg>)<span className="mandatorycss">*</span></CardLabel>
          <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="capitalInvestment" value={capitalInvestment} onChange={changesetCapitalInvestment} placeholder="Capital Investment Range" {...(validation = { isRequired: true, title: t("TL_INVALID_CAPITAL_AMOUNT") })} />
        </div>
        <div className="col-md-3" >
          <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
          <DatePicker name="commencementDate" min={minDate} date={commencementDate} onChange={changesetCommencementDate} placeholder="Date of Commencement"  {...(validation = { isRequired: true, title: t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL") })} />
        </div>
        <div className="col-md-3" >
          <CardLabel>{`${t("TL_LICENSE_PERIOD")}`}<span className="mandatorycss">*</span></CardLabel>
          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={LicensePeriod} selected={desiredLicensePeriod} select={changesetDesiredLicensePeriod} placeholder="Desired License Period" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSE_PERIOD"), })} />
        </div>
        <div className="col-md-3">
          <CardLabel>{`${t("TL_NEW_NUMBER_OF_EMPLOYEES_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="noOfEmployees" value={noOfEmployees} onChange={changesetNoofEmployees} placeholder="No. of Employees" {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_NO_EMPLOYEES"), })} />
        </div>
      </div>
    </div>

  );
}
export default TLCorrectionActivity;