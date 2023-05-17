import React, { useCallback, useState, useReducer, useEffect } from "react";
import { CardLabel, TextInput, Dropdown, LinkButton, RadioButtons, CardText, DatePicker, MultiSelectDropdown, RemoveableTag, Toast } from "@egovernments/digit-ui-react-components";
import { sortDropdownNames } from "../utils/index";
import { convertEpochToDate,stringReplaceAll } from '../utils/index';
import { isUndefined } from "lodash";

const TLCorrectionActivity = ({ t, config, formData, onEditSelect, formDataEdit }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [isEditSubType, setIsEditSubType] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const [subType, setSubType] = useState([]);
  const [minDate, setMinDate] = useState('2018-01-01');
  const [toast, setToast] = useState(false);
  
  let validation = {};
  let BusinessCategoryMenu = [];
  let BusinessTypeMenu = [];
  let BusinessSubTypeMenu = [];

  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");

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

  function getBusinessTypeMenu(BusinessCategory) {
    BusinessTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (
          ob?.code.split(".")[0] === BusinessCategory?.code &&
          !BusinessTypeMenu.some((BusinessTypeMenu) => BusinessTypeMenu?.code === `${ob?.code.split(".")[0] + "." + ob?.code.split(".")[1]}`)
        ) {
          BusinessTypeMenu.push({ i18nKey: `${ob?.code.split(".")[0] + "_" + ob?.code.split(".")[1]}`, code: `${ob?.code.split(".")[0] + "." + ob?.code.split(".")[1]}` });
        }
      });
    return BusinessTypeMenu;
  }

  function getBusinessSubTypeMenu(BusinessType) {
    BusinessSubTypeMenu = [];
    BusinessType &&
      Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (ob.code.split(".")[0] + "." + ob.code.split(".")[1] === BusinessType.code && !BusinessSubTypeMenu.some((BusinessSubTypeMenu) => BusinessSubTypeMenu.code === `${ob.code}`)) {
          BusinessSubTypeMenu.push({ i18nKey: `${stringReplaceAll(ob.code,'.','_')}`, code: `${ob.code}` });
        }
      });
    return BusinessSubTypeMenu;
  }

  // const [businessSector, setBusinessSector] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec?.code.includes(formDataEdit?.tradeLicenseDetail?.businessSector))[0]  : formData?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec?.code.includes(formData?.tradeLicenseDetail?.businessSector))[0] : "");
  // const [fields, setFeilds] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits : formData?.TradeDetails?.tradeLicenseDetail?.tradeUnits ? formData?.TradeDetails?.tradeLicenseDetail?.tradeUnits :[{ businesscategory: "", businesstype: "", businesssubtype: "", unit: null, uom: null }]);
  // const [noOfEmployees, setNoOfEmployees] = useState(formDataEdit?.tradeLicenseDetail?.noOfEmployees ? formDataEdit?.tradeLicenseDetail?.noOfEmployees : formData?.tradeLicenseDetail?.noOfEmployees ? formData?.tradeLicenseDetail?.noOfEmployees : "");
  // const [capitalInvestment, setCapitalInvestment] = useState(formDataEdit?.tradeLicenseDetail?.capitalInvestment ? formDataEdit?.tradeLicenseDetail?.capitalInvestment : formData?.tradeLicenseDetail?.capitalInvestment ? formData?.tradeLicenseDetail?.capitalInvestment : "" );
  // const [commencementDate, setCommencementDate] = useState(formDataEdit?.commencementDate? convertEpochToDate(formDataEdit?.commencementDate) : formData?.commencementDate ? convertEpochToDate(formData?.commencementDate) : null);
  // const [desiredLicensePeriod, setDesiredLicensePeriod] = useState(formDataEdit?.desiredLicensePeriod ? LicensePeriod.filter((period) => period?.code.includes(formDataEdit?.desiredLicensePeriod))[0] : formData?.desiredLicensePeriod ? LicensePeriod.filter((period) => period?.code.includes(formData?.desiredLicensePeriod))[0] : "");
  //const [businessSector, setBusinessSector] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessSector ? menusector.filter((sec) => sec?.code.includes(formDataEdit?.tradeLicenseDetail?.businessSector))[0]  : "");
  // const [fields, setFeilds] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits  :[{ businessCategory: "", businessType: "", businessSubtype: "", unit: null, uom: null }]);


  // const [category, setCategory] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory ? BusinessCategoryMenu.filter((category) => category?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory))[0]  : "");
  // const [bustype, setBustype] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessType ? getBusinessTypeMenu(category).filter((type) => type?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessType))[0] : ""); 
  // const [bussubtype, setBussubtype] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessSubtype ? getBusinessSubTypeMenu(bustype).filter((type) => type?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessSubtype))[0] : ""); 
  // const [fields, setFeilds] = useState([{ 
  //   businessCategory: formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory ? BusinessCategoryMenu.filter((category) => category?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory))[0]  : null , 
  //   businessType: formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessType ? getBusinessTypeMenu(category).filter((type) => type?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessType))[0] : null, 
  //   businessSubtype: formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessSubtype ? getBusinessSubTypeMenu(bustype).filter((type) => type?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessSubtype))[0] : null, 
  //   unit: null, uom: null }]);


  //const [fields, setFeilds] = useState([{ id : null, businessCategory: "", businessType: "", businessSubtype: "", unit: null, uom: null }]);
  const [fields, setFeilds] = useState([{ id: null, businessCategory: "", businessType: "", businessSubtype: "",active: false, unit: null, uom: null }]);
  const [fillFields, setFillFields] = useState([{  businessCategory: "", businessType: "", businessSubtype: [], unit: null, uom: null }]);
  const [noOfEmployees, setNoOfEmployees] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.noOfEmployees ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.noOfEmployees : "");
  const [capitalInvestment, setCapitalInvestment] = useState(formDataEdit?.TradeDetails?.tradeLicenseDetail?.capitalInvestment ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.capitalInvestment : "");
  const [commencementDate, setCommencementDate] = useState(formDataEdit?.TradeDetails?.commencementDate ? convertEpochToDate(formDataEdit?.TradeDetails?.commencementDate) : null);
  const [desiredLicensePeriod, setDesiredLicensePeriod] = useState(formDataEdit?.TradeDetails?.desiredLicensePeriod ? LicensePeriod.filter((period) => period?.code.includes(formDataEdit?.TradeDetails?.desiredLicensePeriod))[0] : "");



  Data &&
    Data.TradeLicense &&
    Data.TradeLicense.TradeType.map((ob) => {
      if (!BusinessCategoryMenu.some((BusinessCategoryMenu) => BusinessCategoryMenu.code === `${ob.code.split(".")[0]}`)) {
        BusinessCategoryMenu.push({ i18nKey: `${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}` });
      }

    });
    
    if(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits !== null){
      if(BusinessCategoryMenu.length > 0){
        const businessType = Array.from(
          new Set(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits?.map(type => type.businessType))
        );      

      if(businessType && (fields[0]?.businessCategory === undefined || fields[0]?.businessCategory === "")) {
          let category = null;
          category = BusinessCategoryMenu.filter((category) => category?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory))[0];

          if(businessType){
            businessType.map((bType) => {
              let bussubtyp = null;
              let bustype = null;
              let res = [];
              let att = [];

              formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits?.map((unit) => {
                if(bType === unit?.businessType){
                  bustype = getBusinessTypeMenu(category).filter((type) => type?.code.includes(businessType))[0];
                  bussubtyp = getBusinessSubTypeMenu(bustype).filter((type) => type?.code.includes(unit?.businessSubtype))[0];
                }
                if(bussubtyp===undefined && bussubtyp==="" && bussubtyp === null){
                  bussubtyp=null;//{"i18nKey":"","code":""}
                }
                setFeilds([
                  {
                    id: unit.id,
                    businessCategory: category?.code ? category.code : null,
                    businessType: bustype?.code ? bustype.code : null,
                    businessSubtype: bussubtyp?.code ? bussubtyp.code : null,active: true, unit: null, uom: null
                  }
                ]);
                bussubtyp !== undefined ? res.push(bussubtyp) : null;
              })

              setFillFields([
                {
                  businessCategory: category,
                  businessType: bustype,
                  businessSubtype: res, unit: null, uom: null
                }
              ]);
            })
          }
        }
      }
    }
    else{
      if((isInitialRender)&&(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits === null))
      {
        setFeilds([
          {
            id: null,
            businessCategory: null,
            businessType: null,
            businessSubtype: null,active: true, unit: null, uom: null
          }
        ]);
        setFillFields([
          {
            businessCategory: null,
            businessType: null,
            businessSubtype: [], unit: null, uom: null
          }
        ]);
        setIsInitialRender(false);
      }
    }
    
    
  // if (formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory && (fields[0].businessCategory === undefined || fields[0].businessCategory === "") && BusinessCategoryMenu.length > 0) {
  //   let category = BusinessCategoryMenu.filter((category) => category?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessCategory))[0];
  //   let bustype = null;
  //   let bussubtyp = null;
  //   bustype = getBusinessTypeMenu(category).filter((type) => type?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessType))[0];
  //   bussubtyp = getBusinessSubTypeMenu(bustype).filter((type) => type?.code.includes(formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.businessSubtype))[0];

  //   let res = [];
  //   res.push(bussubtyp);
  //   setFeilds([
  //     {
  //       id: formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.id ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits[0]?.id : null,
  //       businessCategory: category,
  //       businessType: bustype,
  //       businessSubtype: res, unit: null, uom: null
  //     }
  //   ]);

  // }

  const selectBusinessCategory = (i, value) => {
    let units = [...fields];
    units[i].businessCategory =  value?.code ? value.code : null;
    selectBusinessType(i, null);
    selectBusinessSubType(i, null);
    setFeilds(units);
  }
  const selectBusinessType = (i, value) => {
    let units = [...fields];
    let fillUnits = [...fillFields];
    units[i].businessType = value?.code ? value.code : null;
    fillUnits[i].businessType = value;
    selectBusinessSubType(i, null);
    fillUnits[i].businessSubtype = [];
    setFillFields(fillUnits);
    setFeilds(units);
    Digit.SessionStorage.set("activityedit", true);
  }
  const selectBusinessSubType = (i, value) => {
    let units = [...fields];
    units[i].businessSubtype =  value?.code ? value.code : null;
    setFeilds(units);
    Digit.SessionStorage.set("activityedit", true);
  }
  const changesetCapitalInvestment = (e => {
    setCapitalInvestment(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    setIsInitialRender(true);
    Digit.SessionStorage.set("activityedit", true);
  });
  const changesetCommencementDate = (e => {
    setCommencementDate(e);
    Digit.SessionStorage.set("activityedit", true);
  });
  const changesetDesiredLicensePeriod = (e => {
    setDesiredLicensePeriod(e);
    Digit.SessionStorage.set("activityedit", true);
  });

  const changesetNoofEmployees = (e => {
    setNoOfEmployees(e.target.value.length <= 4 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 4));
    Digit.SessionStorage.set("activityedit", true);
  })


  useEffect(() => {
    if (Digit.SessionStorage.get("activityedit") && isEditSubType) {
      Digit.SessionStorage.set("activityedit", false);
      setIsEditSubType(false);
      let tradeUnits = fields;

      let address = formDataEdit?.TradeDetails?.tradeLicenseDetail?.address
      let tenantId = formDataEdit?.TradeDetails?.tenantId;
      let structurePlace = formDataEdit?.TradeDetails?.tradeLicenseDetail?.structurePlace;
      let owners = formDataEdit?.TradeDetails?.tradeLicenseDetail?.owners;
      let ownerspremise = formDataEdit?.TradeDetails?.tradeLicenseDetail?.ownerspremise;
      let institution = formDataEdit?.TradeDetails?.tradeLicenseDetail?.institution;
      let licenseeType = formDataEdit?.TradeDetails?.tradeLicenseDetail?.licenseeType;
      let businessSector = formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessSector;
      let structureType = formDataEdit?.TradeDetails?.tradeLicenseDetail?.structureType;
      let structurePlaceSubtype = formDataEdit?.TradeDetails?.tradeLicenseDetail?.structurePlaceSubtype;
      let businessActivityDesc = formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessActivityDesc;
      let ownershipCategory = formDataEdit?.TradeDetails?.tradeLicenseDetail?.ownershipCategory;
      let enterpriseType = formDataEdit?.TradeDetails?.tradeLicenseDetail?.enterpriseType;

      let tradeLicenseDetail = {
        tenantId, licenseeType, owners, ownerspremise, institution, businessSector, capitalInvestment, enterpriseType,
        structureType, structurePlaceSubtype, businessActivityDesc, noOfEmployees,
        ownershipCategory, address, tradeUnits, structurePlace
      }
      onEditSelect(config.key, { tradeLicenseDetail, desiredLicensePeriod: desiredLicensePeriod.code });
    }
  });
  const selectCategorysubtype = (e) => {
      let subUnitSelect = [];
      let tempUnitFill = [];
      e && e?.map((ob) => {
        ob != "" || ob != [] ? subUnitSelect.push(ob?.[1]) : null;   
      });

      let tradeUnitJSON = [...fields];
      let tradeUnitFill = [...fillFields];
      const businessSubtypeJSON = Array.from(
        new Set(tradeUnitJSON.map(type => type.businessSubtype))
      ); 

      for(let i=0; i<tradeUnitFill.length; i++){
        if(subUnitSelect.length > 0 )
            subUnitSelect.map(subType => {
                tempUnitFill.push(subType)
            });
        
        tradeUnitFill[i].businessSubtype = tempUnitFill;
      }

      if(subUnitSelect.length > 0 )
        subUnitSelect.map((selUnit,index) => {
          tradeUnitJSON[index] =  (selUnit !== null && businessSubtypeJSON.includes(selUnit.code)) ? tradeUnitJSON[index]
          : ({
              "id": null,
              "businessCategory": tradeUnitFill[0].businessCategory.code,
              "businessType": tradeUnitFill[0].businessType.code, 
              "businessSubtype": selUnit?.code ? selUnit?.code : null,
              "active":true,
              "unit":null,"uom":null
            });
        })


      for(let i=0; i<tradeUnitJSON.length; i++){
        subUnitSelect.length > 0 ? ((subUnitSelect.filter(subUnit => subUnit?.code !== "" && subUnit?.code.includes(tradeUnitJSON[i]?.businessSubtype))).length === 0) ? delete tradeUnitJSON[i] : null :null;
      }
      setFillFields(tradeUnitFill);
      setFeilds(tradeUnitJSON);
      Digit.SessionStorage.set("activityedit", true);
      setIsEditSubType(true);
  }  
  const selectCategorysubtype1 = (e) => {
    let subUnits = [];
    let att = [];
    e && e?.map((ob) => {
      subUnits.push(ob?.[1]);   
    });

    let unitsfields = [...fields];
    let tradeUnits = [];
    let tempval=[]
    for (let i=0;i<unitsfields.length;i++){
      unitsfields[i].businessSubtype !== null ? tempval.push(unitsfields[i].businessSubtype) : "" ;
    }

    if(subUnits.length > 0){
      subUnits.map(subUnit => {
          tempval.some(code => code.code === subUnit.code) ? 
          unitsfields.map(unitfield =>{
              if(subUnit.code === unitfield?.businessSubtype?.code){
                tradeUnits.push({
                  "id": unitfield.id,
                  "businessCategory": unitfield.businessCategory.code,
                  "businessType": unitfield.businessType.code, 
                  "businessSubtype": unitfield.businessSubtype.code,
                  "active":true,
                  "unit":null,"uom":null
                });
              }
            })
            : 
            tradeUnits.push({
              "id": null,
              "businessCategory": unitsfields[0].businessCategory.code,
              "businessType": subUnit.code.split(".")[0] + "." + subUnit.code.split(".")[1], 
              "businessSubtype": subUnit.code,
              "active":true,
              "unit":null,"uom":null
            })
          // units.map(unit =>{
          //     let subCode = + "{" +subUnit.code.split(".")[0] + "." + subUnit.code.split(".")[1]+ "}";
          //     if( subCode === unit.businessType.code){
          //       if(!subUnits.includes(unit.businessSubtype.code)){
          //         tradeUnits.splice(unit.id, 1);
          //         tradeUnits.push({ "id": unit.id,"active":false});
          //       }
          //     }
          //   }) 
      });
      if(tradeUnits[0]?.businessCategory){
        Digit.SessionStorage.set("activityedit", true);
        setIsEditSubType(true);
        setFeilds(tradeUnits);
      }
    }
    else{
      unitsfields[0].businessSubtype = [];
      setFillFields(unitsfields);
      Digit.SessionStorage.set("activityedit", true);
      setIsEditSubType(true);
      unitsfields.map(unitfield =>{
        tradeUnits.push({
          "id": unitfield.id,
          "businessCategory": unitfield.businessCategory.code,
          "businessType": unitfield.businessType.code, 
          "businessSubtype": "",
          "active":true,
          "unit":null,"uom":null
        });
      })
      setFeilds(tradeUnits);
    }
    let tempvalSub=[];
    for (let i=0;i<unitsfields.length;i++){
      if(subUnits.length > 0){
        subUnits.map(subUnit => {
          if(unitsfields[i]?.businessType?.code === subUnit?.code.split(".")[0] + "." + subUnit?.code.split(".")[1]){
            tempvalSub.push(subUnit);
          }
        });
      }
      unitsfields[i].businessSubtype = tempvalSub;
    }
    setFillFields(unitsfields);
  };



  const onRemoved = (index, key) => {
    let temp =[];
    let unitfill = [...fillFields];
    let flag = false;
    for (let i=0;i<unitfill.length;i++){
      unitfill[i].businessSubtype.filter(subType =>{
        if(subType !== null && subType?.code !== key.code)
        {
          temp.push(subType);
          flag = true;
        }
      });

      unitfill[i].businessSubtype = temp.length===0 ?  [] : temp;
    }
  //  if(flag === true){
      setFillFields(unitfill);
      
       let unit = [...fields];
       let tempUnit = [];
      for (let i=0;i<unit.length;i++){
        !key?.code.includes(unit[i]?.businessSubtype) ? tempUnit.push(unit[i]) : "";

        if(temp.length===0){
          unit[i].businessCategory=unit[i].businessCategory;
          unit[i].businessType=unit[i].businessType;
          unit[i].businessSubtype=null;
          tempUnit.push(unit[i]);
        }
      }
      Digit.SessionStorage.set("activityedit", true);
      setFeilds(tempUnit);
      setIsEditSubType(true);
   // }
  };
  const initFn = () => {
    return formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits;
  };
  const storedBusinessTypeData = formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits;
  const reducerBusinessType = (stateBusinessType, action) => {
    switch (action.type) {
      case "ADD_NEW_BUSINESSTYPE":
        return [
          ...stateBusinessType,
          {
            businessCategory: "", 
            businessType: "", 
            businessSubtype: [], 
            unit: null, 
            uom: null 
          },
        ];
      case "REMOVE_THIS_BUSINESSTYPE":
        return stateDoor.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENTBUSINESSTYPE":
        return stateDoor.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
    }
  };
  
  const [formStateBusinessType, dispatchBusinessType] =  useReducer(reducerBusinessType, storedBusinessTypeData, initFn);
  

  return (
   
    <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >
      <div className="row">
        <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`}</span> </h1>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-3">
          <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
            {`${t("TL_BUSINESS_SECTOR")}`}<span className="mandatorycss">*</span>
          </CardLabel>
        </div>
        <div className="col-md-8">
          <RadioButtons t={t} optionsKey="name" isMandatory={config.isMandatory} options={menusector} selectedOption={businessSector} onSelect={selectBusinessSector} style={{ display: "flex", justifyContent: "space-between", width: "48%" }} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_SECTOR"), })} />&nbsp;
        </div>
      </div> 
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_BUSINESS_SECTOR")}`}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessSector} </CardText>
          </div>
        </div>
      </div>*/}
      {fillFields.map((field, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-md-3" >
              <CardLabel>{`${t("TL_LOCALIZATION_SECTOR")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} option={BusinessCategoryMenu} optionKey="i18nKey" isMandatory={config.isMandatory} value={field?.businessCategory} selected={field?.businessCategory} name={`TradeCategory-${index}`} select={(e) => selectBusinessCategory(index, e)} placeholder="Bussiness Category" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_CATEGORY"), })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={getBusinessTypeMenu(field?.businessCategory)} selected={field?.businessType} select={(e) => selectBusinessType(index, e)} placeholder="Bussiness Type"  {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_BUSINESS_TYPE"), })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
              {/* <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory} option={sortDropdownNames(getBusinessSubTypeMenu(field?.businessType), "i18nKey", t)} selected={field?.businessSubtype} select={(e) => selectBusinessSubType(index, e)} placeholder="Bussiness Sub Type" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_SUB_BUSINESS_TYPE"), })} /> */}
              <MultiSelectDropdown t={t}
                optionsKey="i18nKey"
                isMandatory={config.isMandatory}
                options={getBusinessSubTypeMenu(field?.businessType) && getBusinessSubTypeMenu(field?.businessType)}
                selected={field?.businessSubtype}
                onSelect={selectCategorysubtype}
                // [{i18nKey: 'TC1.TT1.TST1', code: 'TC1.TT1.TST1'},{i18nKey: 'TC1.TT1.TST2', code: 'TC1.TT1.TST2'}]
                placeholder="Bussiness Sub Type" {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_SUB_BUSINESS_TYPE"), })}
              />
              <div className="tag-container">
                {field?.businessSubtype?.length > 0 &&
                  field?.businessSubtype.map((value, indexsub) => {
                    return <RemoveableTag key={indexsub} text={`${t(value && value["i18nKey"]).slice(0, 22)} ...`} onClick={() => onRemoved(indexsub, value)} />;
                })}
              </div>
            </div>
            {toast && (
                    <Toast
                        error={toast}
                        label={errorMessage}
                        onClose={() => setToast(false)}
                    />
                )}{""}
            {/* <div className="col-md-1">
              <CardLabel>Add More</CardLabel>
              <LinkButton
                label={
                  <svg class="icon  icon--plus" viewBox="0 0 5 5" fill="green" width="50" height="50">
                    <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
                  </svg>
                }
                onClick={(e) => dispatchBusinessType({ type: "ADD_NEW_BUSINESSTYPE" })}
              />
            </div> */}
          </div>
          
        )
      }
      )}
      <div className="row">
        <div className="col-md-12" align = "right">
          {
            // subType ? 
            // subType.map((type,i) => {
            //   (1) + ") " + t({type})
            // }) 
            // : "" 
          }
        </div>
      </div>
      {/* <div className="row">
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
      </div> */}
    </div>

  );
}
export default TLCorrectionActivity;