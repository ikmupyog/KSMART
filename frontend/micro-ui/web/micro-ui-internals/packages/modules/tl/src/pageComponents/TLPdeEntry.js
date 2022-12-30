import { CardLabel, Dropdown, FormStep, LinkButton, Loader, RadioButtons, RadioOrSelect, TextInput,TextArea, LogoutIcon  } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState, useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom";
import Timeline from "../components/TLTimeline";
import { sortDropdownNames } from "../utils/index";

const TLPdeEntry = ({ t, config, onSelect, userType, formData }) => {
  let validation = {};
   
  // const [ownername, setIndividualName] = useState(formData.address?.IndividualName);
  const [pdeformdata, setPdeformdata,getPdeformdata] = useState("");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  // const [ownershipCategory, setOwnershipCategory] = useState(formData?.ownershipCategory);
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [WardNo, setWardNo] = useState(formData.TradeDetails?.address?.wardno);
  const [LicensingInstitutionName, setLicensingInstitution] = useState(formData?.tradeName);
  const { data: yearList = {}, isLoadyear } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "egf-master", "FinancialYear");
  const { data: periodList = {}, isLoadPeriod } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "egf-master", "FinancialPeriod");
  const [PaidYear,setSelectedYear ] = useState(formData.TradeDetails?.PaidYear);
  const [DoorNoBuild, setDoorNoBuild] = useState(formData.TradeDetails?.structurePlace?.doorNo);
  const [DoorSubBuild, setDoorSubBuild] = useState(formData.TradeDetails?.DoorSubBuild);
  const { data: sector = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "EnterpriseType");
  const [Sector, setSelectedSector] = useState(formData?.TradeDetails?.setSector);
  const [capitalAmount, setCapitalAmount] = useState(formData.TradeDetails?.capitalAmount);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderRadio, setIsInitialRenderRadio] = useState(true);
  const [value2, setValue2] = useState();
  const [OwnerName, setOwnername] = useState(formData?.TadeDetails?.licenseedetails?.ownername || "");
  const [fields, setFeilds] = useState(
    (formData?.TradeDetails && formData?.TradeDetails?.licenseedetails?.ownername) || [{ ownername: ""}]
  );
  const [fields1, setFeilds1] = useState(
    (formData?.TradeDetails && formData?.TradeDetails?.licenseedetails.door) || [{ doorno: "", subno: ""}]
  );
  const [rentArrear, setRentArrear] = useState(formData.TradeDetails?.rentArrear);
  const [rentCurrent, setRentCurrent] = useState(formData.TradeDetails?.rentCurrent);
  const [rentPenal, setRentPenal] = useState(formData.TradeDetails?.rentPenal);
  const [rentFromYear,setRentFromYear ] = useState(formData.TradeDetails?.rentFromYear);
  const [rentFromMonth,setRentFromMonth ] = useState(formData.TradeDetails?.rentFromMonth);
  const [rentToYear,setRentToYear ] = useState(formData.TradeDetails?.rentToYear);  
  const [rentToMonth,setRentToMonth ] = useState(formData.TradeDetails?.rentToMonth);

  const [profArrear, setProfArrear] = useState(formData.TradeDetails?.profArrear);
  const [profCurrent, setProfCurrent] = useState(formData.TradeDetails?.profCurrent);
  const [profPenal, setProfPenal] = useState(formData.TradeDetails?.profPenal);
  const [profFromYear,setProfFromYear ] = useState(formData.TradeDetails?.profFromYear);
  const [profFromPeriod,setProfFromPeriod ] = useState(formData.TradeDetails?.setProfFromPeriod);
  const [profToYear,setProfToYear ] = useState(formData.TradeDetails?.profToYear); 
  const [profToPeriod,setProfToPeriod ] = useState(formData.TradeDetails?.setProfToPeriod); 

  const [licArrear, setLicArrear] = useState(formData.TradeDetails?.licArrear);
  const [licCurrent, setLicCurrent] = useState(formData.TradeDetails?.licCurrent);
  const [licPenal, setLicPenal] = useState(formData.TradeDetails?.licPenal);
  const [licBelated, setLicBelated] = useState(formData.TradeDetails?.licBelated);
  const [licFromYear,setLicFromYear ] = useState(formData.TradeDetails?.licFromYear);
  const [licToYear,setLicToYear ] = useState(formData.TradeDetails?.licToYear); 

  const storedOwnerData = formData?.owners?.owners;
  const storedDoorData  = formData?.door?.door;

  let cmbSector = [];
  let cmbSectorFileterData = [];
  sector &&
  sector["TradeLicense"] &&
  sector["TradeLicense"].EnterpriseType.map((ob) => {
    cmbSector.push(ob);
    });
 const menusector = [
    { name: "Manufacturing Sector", code: "MANUFACTORING" },
    { name: "Service Sector", code: "SERVICE" },
  ];

  let Zonal = [];
  let cmbWardNo = [];
  boundaryList &&
  boundaryList["egov-location"] &&
  boundaryList["egov-location"].TenantBoundary.map((ob) => {    
    ob.boundary.children.map((obward)=>{
      cmbWardNo.push(...obward.children);
    });
  });
 
  let cmbPayYear = [];
    yearList &&
    yearList["egf-master"] &&
    yearList["egf-master"].FinancialYear.map((ob) => {    
      cmbPayYear.push(ob);
  });

  let cmbPeriod = [];
    periodList &&
    periodList["egf-master"] &&
    periodList["egf-master"].FinancialPeriod.map((ob) => {    
      cmbPeriod.push(ob);
  });

  const [LicenseeType, setLicenseeType] = useState(formData?.TradeDetails?.LicenseeType);

  function handleTextInputField(index, e, key) {
    dispatch({ type: "EDIT_CURRENT_OWNER_PROPERTY", payload: { index, key, value: e.target.value } });
  }

  function handleTextInputField1(index, e, key) {
    dispatch1({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e.target.value } });
  }
  function setSelectLicensingInstitutionName(e) {
    setLicensingInstitution(e.target.value);
  }
  function setSelectWard(value) {
    setWardNo(value);
  }
  function selectLicenseeType(value) {
    setLicenseeType(value);
    setValue2(value.code);
    setIsInitialRenderRadio(true);
  }
  function selectSector(value) {
    setSelectedSector(value);   
  }
  function selectedsetCapitalAmount(e) {
    setCapitalAmount(e.target.value);    
    // console.log(this.CapitalAmount);
  }
  function selectYear(value) {
    setSelectedYear(value);   
  }
  

  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
  let TradeCategoryMenu = [];
  let TradeTypeMenu = [];

  const menu = [
    { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" },
    { i18nKey: "TL_COMMON_INSTITUTION", code: "INSTITUTION" },
  ];

  const mutation = Digit.Hooks.tl.useTradeLicensePdeAPI(
    tenantId,
    true
  );


  
  function setSelectIndividualName(i,value) {
    let owners = [...fields];
    owners[i].ownername = value;
    setFeilds(owners);
  }
  function selectedsetrentArrear(e){
    setRentArrear(e.target.value);
  }
  function selectedsetrentCurrent(e){
    setRentCurrent(e.target.value);
  }
  function selectedsetrentPenal(e){
    setRentPenal(e.target.value);
  }
  function selectRentFromYear(value)
  {
    setRentFromYear(value);
  }
  function selectRentFromMonth(value)
  {
    setRentFromMonth(value);
  }
  function selectRentToYear(value)
  {
    setRentToYear(value);
  }
  function selectRentToMonth(value)
  {
    setRentToMonth(value);
  }
  function selectedsetProfArrear(e){
    setProfArrear(e.target.value);
  }
  function selectedsetProfCurrent(e){
    setProfCurrent(e.target.value);
  }
  function selectedsetProfPenal(e){
    setProfPenal(e.target.value);
  }
  function selectProfFromYear(value)
  {
    setProfFromYear(value);
  }
  function selectProfFromPeriod(value)
  {
    setProfFromPeriod(value);
  }
  function selectProfToYear(value)
  {
    setProfToYear(value);
  }
  function selectProfToPeriod(value)
  {
    setProfToPeriod(value);
  }
  function selectLicFromYear(value)
  {
    setLicFromYear(value);
  }
  function selectLicToYear(value)
  {
    setLicToYear(value);
  }
 
  function selectedsetLicArrear(e){
    setLicArrear(e.target.value);
  }
  function selectedsetLicCurrent(e){
    setLicCurrent(e.target.value);
  }
  function selectedsetLicPenal(e){
    setLicPenal(e.target.value);
  }
  function selectedsetLicBelated(e){
    setLicBelated(e.target.value);
  }
  
  

 
  
  useEffect(() => {
    
    if (isInitialRenderRadio) {
      if(LicenseeType){
        setIsInitialRenderRadio(false);
        setValue2(LicenseeType.code);
      }
    }
  }, [isInitialRender]);


  const initFn = (initData) => {
        return  [
              {
                ownername: "",
              },
            ];
  };

  const initFn1 = (initData) => {
    return  [
          {
            doorno: "",
            subno: "",
          },
        ];
};
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_NEW_OWNER":
        return [
          ...state, 
          {
            ownername: "",
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
  const [formState, dispatch] = useReducer(reducer, storedOwnerData, initFn);
  const reducer1 = (state1, action) => {
    switch (action.type) {
      case "ADD_NEW_DOOR":
        return [
          ...state1, 
          {
            doorno: "",
            subno: "",
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
    }
  };
  const [formState1, dispatch1] = useReducer(reducer1, storedDoorData, initFn1);

    const convertToEditPDE = () => {
      console.log('hai');
      let formdata = {
        Licenses: [
          {
            action: "INITIATE",
            applicationType: "RENEWAL",
            financialYear: "2021-22",
            licenseType: "PERMANENT",
            tenantId: tenantId,
            tradeLicenseDetail: {
              channel: "PDE",
              address: {
                tenantId: tenantId,
                doorNo: formState1,
                zonalid: formData.TradeDetails?.Zonal.code,
                wardid: formData.TradeDetails?.code,
                wardno: formData.TradeDetails?.wardno,
                circledivisionid: "3016921"
              },
              ownersPde: [
                {
                  name: formState
                }
              ],
              structureType: "BUILDING",
              structurePlace: formState1,
              businessSector: Sector.code,
              capitalInvestment: capitalAmount,
              //enterpriseType: Sector,
              licenseeType: value2
            },
            tradeName: LicensingInstitutionName,
            workflowCode: "PdeTL"
          }
        ]
      }
      setPdeformdata(formdata);
    //  setSelectFormdata(formdata);
     // console.log(Fdata);
    }
  

 

  const goNext = () => {
    let jsonval ;
    console.log('call');

      convertToEditPDE();
      setTimeout(() => { }, 1000);
      console.log('Data : '+JSON.stringify(pdeformdata));
      console.log('after');
  

      try {
      //  setIsInitialRender(false);
        let tenantId1 = tenantId;
        mutation.mutate(pdeformdata, {          
        });
        console.log(mutation);
      }
      catch (err) {
        console.log(err);
      }

    // sessionStorage.setItem("ownername", ownerStep);
    //   sessionStorage.setItem("LicenseeType", LicenseeType.code);
    //   sessionStorage.setItem("LicensingInstitutionName", LicensingInstitutionName);
    //   sessionStorage.setItem("WardNo", WardNo.code);
    //   sessionStorage.setItem("DoorNoBuild", DoorNoBuild);
    //   sessionStorage.setItem("DoorSubBuild", DoorSubBuild);
    //  // sessionStorage.setItem("WardDet", WardNo.name);
    //   sessionStorage.setItem("setSector", setSector);   
    //   sessionStorage.setItem("CapitalAmount", capitalAmount);   
    //   sessionStorage.setItem("PaidYear", PaidYear);   
    //   onSelect(config.key, { LicenseeType,LicensingInstitutionName,WardNo,DoorNoBuild,DoorSubBuild,setSector,capitalAmount,PaidYear });  
  };

  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      
      {isLoading ? ( <Loader />) : (
        <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} >
          
                           
                <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display:"flow-root", }} >
                    <div className="row">    
                      <div className="col-md-12" ><h1 className="headingh1" ></h1>
                      </div>        
                    </div>
                    {formState.map((field, index) => {
                    return ( 
                      <div className="row" key={`${field}-${index}`}>
                        <div  style= {{
                        border: "solid",
                        borderRadius: "5px",
                        padding: "5px",
                        paddingTop: "5px",
                        marginTop: "5px",
                        borderColor: "#f3f3f3",
                        background: "#FAFAFA",
                      }} className="col-md-7">
                            {/* <CardLabel>{`${t("TL_LICENSE_NAME_LICENSEE")}`}<span className="mandatorycss">*</span></CardLabel> */}
                            <CardLabel>Name of Licensee<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="ownername"  value={fields.ownername} onChange={(e) => handleTextInputField(index, e, "ownername")}   placeholder={`${t("TL_LICENSEE_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                            
                            
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
                      );
                    })} 
    
                    <div className="row">
                      <div className="col-md-7" >
                        <div style={{ justifyContent: "right", display: "flex", paddingBottom: "15px", color: "#FF8C00" }}>
                          <button type="button" style={{ paddingTop: "10px" }} onClick={() => dispatch({ type: "ADD_NEW_OWNER" })}>
                            {t("TL_ADD_OWNER_LABEL")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">                      
                      <div className="col-md-7">
                        <CardLabel> {`${t("TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL")} `}<span className="mandatorycss">*</span></CardLabel>
                        <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={LicenseeType} onSelect={selectLicenseeType} style={{ marginTop:"-8px",paddingLeft:"5px" ,height:"25px"}} /> 
                      </div>
                    </div>
                    <div className="row">   
                      <div className="col-md-7" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="LicensingInstitutionName" value={LicensingInstitutionName} onChange={setSelectLicensingInstitutionName}  placeholder={`${t("TL_LICENSING_INSTITUTION_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_INSTITUTION_NAME") })} />
                      </div>
                    </div>
                    <div className="row">    
                      <div className="col-md-7" ><CardLabel>{`${t("TL_LOCALIZATION_WARD_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <Dropdown t={t} optionKey="wardno" isMandatory={config.isMandatory} option={cmbWardNo}  selected={WardNo} select={setSelectWard}  {...(validation = { isRequired: true, title: t("TL_INVALID_WARD_NO") })} />
                      </div>
                    </div>
                    {formState1.map((field1, index) => {
                    return ( 
                      <div className="row" key={`${field1}-${index}`}>
                        <div  style= {{
                              border: "solid",
                              borderRadius: "25px",
                              padding: "25px",
                              paddingTop: "25px",
                              marginTop: "25px",
                              borderColor: "#f3f3f3",
                              background: "#FAFAFA",
                            }} className="col-md-7">
                          <div className="col-md-6">
                              <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="DoorNoBuild" value={fields1.doorno} onChange={(e) => handleTextInputField1(index, e, "doorno")}  {...(validation = { pattern: "^[0-9`' ]*$", isRequired: true, type: "number", title: t("TL_INVALID_DOOR_NO") })} />
                          </div>
                          <div className="col-md-6">
                            <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO_SUB")}`}</CardLabel>
                              <TextInput t={t} isMandatory={config.isMandatory} type={"text"} optionKey="i18nKey" name="DoorSubBuild" value={fields1.subno} onChange={(e) => handleTextInputField1(index, e, "subno")}  {...(validation = { pattern: "^[a-zA-Z-0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_DOOR_NO_SUB") })} />
                          </div>
                          <div className="col-md-12">
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
                          <button type="button" style={{ paddingTop: "10px" }} onClick={() => dispatch1({ type: "ADD_NEW_DOOR" })}>
                            New Door
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <div style="justify-content: center; display: flex; padding-bottom: 15px; color: rgb(255, 140, 0);"><button type="button" style="padding-top: 10px;">Add More Licensee</button></div> */}
                    <div className="row">
                      <div className="col-md-7" ><CardLabel>{`${t("TL_LOCALIZATION_SECTOR")}`}<span className="mandatorycss">*</span></CardLabel>
                        <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={menusector} selected={Sector} select={selectSector}  {...(validation = { isRequired: true, title: t("TL_INVALID_SECTOR_NAME") })} />
                      </div>
                    </div> 
                    <div className="row">
                      <div className="col-md-7" ><CardLabel>{`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`}<span className="mandatorycss">*</span></CardLabel>
                        <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="capitalAmount" value={capitalAmount} onChange={selectedsetCapitalAmount} {...(validation = { pattern: "^([0-9])$", isRequired: true, type: "number", title: t("TL_INVALID_CAPITAL_AMOUNT") })} />
                      </div>
                    </div>  
                    {/* <div className="row">
                      <div className="col-md-7" ><CardLabel>{`${t("TL_LICENSE_PDE_PAID_UPTO")}`}<span className="mandatorycss">*</span></CardLabel>
                        <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPayYear} selected={PaidYear} select={selectYear}  {...(validation = { isRequired: true, title: t("TL_INVALID_FEEPAID_YEAR") })} />
                      </div>
                    </div> */}

                    <div className="row">
                      <div className="col-md-12" >Trade Licence (Previous Data)
                        {/* {`${t("TL_LICENSE_PDE_DATA")}`} */}
                      </div>
                      {/* <div className="col-md-12" >Profession Tax (Previous Data)
                      </div> */}
                    </div>
                    <div  style= {{border: "solid",borderRadius: "25px",padding: "25px",paddingTop: "25px",marginTop: "25px",borderColor: "#f3f3f3",background: "#FAFAFA",}} className="col-md-7">
                      <div className="row">
                        <div className="col-md-3" ><CardLabel>From Period</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_FROM_YEAR")}`}</CardLabel> */}
                          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPayYear} selected={licFromYear} select={selectLicFromYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_FROM_YEAR") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>To Year</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_TO_YEAR")}`}</CardLabel> */}
                          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPayYear} selected={licToYear} select={selectLicToYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_TO_YEAR") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>Arrear</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_ARREAR")}`}</CardLabel> */}
                          <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="licArrear" value={licArrear} onChange={selectedsetLicArrear} {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_ARREAR") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>Current</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_CURRENT")}`}</CardLabel> */}
                          <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="licCurrent" value={licCurrent} onChange={selectedsetLicCurrent} {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_CURRENT") })} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4" ><CardLabel>Belated Fees</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_BELATED")}`}</CardLabel> */}
                          <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="licBelated" value={licBelated} onChange={selectedsetLicBelated} {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_BELATED") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Penal Interest</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_PENAL")}`}</CardLabel> */}
                          <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="licPenal" value={licPenal} onChange={selectedsetLicPenal} {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_PENAL") })} />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12" >Profession Tax (Previous Data)
                        {/* {`${t("TL_LICENSE_PDE_PROF_DATA")}`} */}
                      </div>
                      {/* <div className="col-md-12" >Profession Tax (Previous Data)
                      </div> */}
                    </div>
                    <div  style= {{border: "solid",borderRadius: "25px",padding: "25px",paddingTop: "25px",marginTop: "25px",borderColor: "#f3f3f3",background: "#FAFAFA",}} className="col-md-7">
                      <div className="row">
                        <div className="col-md-3" ><CardLabel>From Year</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_FROM_YEAR")}`}</CardLabel> */}
                          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPayYear} selected={profFromYear} select={selectProfFromYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_FROM_YEAR") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>From Priod</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_FROM_PERIOD")}`}</CardLabel> */}
                          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPeriod} selected={profFromPeriod} select={selectProfFromPeriod}  {...(validation = { isRequired: false, title: t("TL_INVALID_FROM_PERIOD") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>To Year</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_TO_YEAR")}`}</CardLabel> */}
                          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPayYear} selected={profToYear} select={selectProfToYear}  {...(validation = { isRequired: false, title: t("TL_INVALID_TO_YEAR") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>To Period</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_TO_PERIOD")}`}</CardLabel> */}
                          <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPeriod} selected={profToPeriod} select={selectProfToPeriod}  {...(validation = { isRequired: false, title: t("TL_INVALID_TO_PERIOD") })} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4" ><CardLabel>Arrear</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_ARREAR")}`}</CardLabel> */}
                          <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="profArrear" value={profArrear} onChange={selectedsetProfArrear} {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_ARREAR") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Current</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_CURRENT")}`}</CardLabel> */}
                          <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="profCurrent" value={profCurrent} onChange={selectedsetProfCurrent} {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_CURRENT") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>Penal Interest</CardLabel>
                          {/* <CardLabel>{`${t("TL_LICENSE_PDE_PENAL")}`}</CardLabel> */}
                          <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="profPenal" value={profPenal} onChange={selectedsetProfPenal} {...(validation = { pattern: "^([0-9])$", isRequired: false, type: "number", title: t("TL_INVALID_PENAL") })} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-md-12" >{`${t("TL_LICENSE_PDE_RENT_DATA")}`} 
                      </div>*/}
                      <div className="col-md-12" >Rent (Previous Data)
                      </div>
                      
                    </div>
                    
                      <div  style= {{border: "solid",borderRadius: "25px",padding: "25px",paddingTop: "25px",marginTop: "25px",borderColor: "#f3f3f3",background: "#FAFAFA",}} className="col-md-7">
                        <div className="row">
                          <div className="col-md-3" ><CardLabel>From Year</CardLabel>
                            {/* <CardLabel>{`${t("TL_LICENSE_PDE_FROM_YEAR")}`}</CardLabel> */}
                            <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPayYear} selected={rentFromYear} select={selectRentFromYear}  {...(validation = { isRequired: true, title: t("TL_INVALID_FROM_YEAR") })} />
                          </div>
                          <div className="col-md-3" ><CardLabel>From Month</CardLabel>
                            {/* <CardLabel>{`${t("TL_LICENSE_PDE_FROM_MONTH")}`}</CardLabel> */}
                            <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPeriod} selected={rentFromMonth} select={selectRentFromMonth}  {...(validation = { isRequired: true, title: t("TL_INVALID_FROM_MONTH") })} />
                          </div>
                          <div className="col-md-3" ><CardLabel>To Year</CardLabel>
                            {/* <CardLabel>{`${t("TL_LICENSE_PDE_TO_YEAR")}`}</CardLabel> */}
                            <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPayYear} selected={rentToYear} select={selectRentToYear}  {...(validation = { isRequired: true, title: t("TL_INVALID_TO_YEAR") })} />
                          </div>
                          <div className="col-md-3" ><CardLabel>To Month</CardLabel>
                            {/* <CardLabel>{`${t("TL_LICENSE_PDE_TO_MONTH")}`}</CardLabel> */}
                            <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbPeriod} selected={rentToMonth} select={selectRentToMonth}  {...(validation = { isRequired: true, title: t("TL_INVALID_TO_MONTH") })} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4" ><CardLabel>Arrear</CardLabel>
                            {/* <CardLabel>{`${t("TL_LICENSE_PDE_ARREAR")}`}</CardLabel> */}
                            <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="rentArrear" value={rentArrear} onChange={selectedsetrentArrear} {...(validation = { pattern: "^([0-9])$", isRequired: true, type: "number", title: t("TL_INVALID_ARREAR") })} />
                          </div>
                          <div className="col-md-4" ><CardLabel>Current</CardLabel>
                            {/* <CardLabel>{`${t("TL_LICENSE_PDE_CURRENT")}`}</CardLabel> */}
                            <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="rentCurrent" value={rentCurrent} onChange={selectedsetrentCurrent} {...(validation = { pattern: "^([0-9])$", isRequired: true, type: "number", title: t("TL_INVALID_CURRENT") })} />
                          </div>
                          <div className="col-md-4" ><CardLabel>Penal Interest</CardLabel>
                            {/* <CardLabel>{`${t("TL_LICENSE_PDE_PENAL")}`}</CardLabel> */}
                            <TextInput t={t} isMandatory={config.isMandatory}  optionKey="i18nKey" name="rentPenal" value={rentPenal} onChange={selectedsetrentPenal} {...(validation = { pattern: "^([0-9])$", isRequired: true, type: "number", title: t("TL_INVALID_PENAL") })} />
                          </div>
                      </div>
                    </div>
                </div>
        </FormStep>
      )}
    </React.Fragment>
  );
};
export default TLPdeEntry;