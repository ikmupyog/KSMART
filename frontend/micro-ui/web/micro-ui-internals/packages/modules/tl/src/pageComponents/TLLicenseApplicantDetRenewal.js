import { CardLabel, Dropdown, FormStep, LinkButton, Loader, RadioButtons, RadioOrSelect, TextInput, TextArea, LabelFieldPair, Toast } from "@egovernments/digit-ui-react-components";
import React, { useState, useReducer, useCallback } from "react";
import Timeline from "../components/TLTimeline";


const TLLicenseApplicantDetRenewal = ({ t, config, onSelect, userType, formData }) => {
  const [formDatalocal, setFormDatalocal] = useState(formData?.TradeDetails ? formData?.TradeDetails : formData );
  const [tenantId, setTenantId] =  useState(formDatalocal?.tenantId); 
  const [valflag, setValflag] = useState(false);
  const [initialrender, setInitialrender] = useState(false);
  const [toast, setToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let validation = {};
  const stateId = Digit.ULBService.getStateId();
  //const { data: type = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TypeOfUnit");
  const { data: type = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "NatureOfInstitution");

  let cmbtype = [];
  type &&
    type["TradeLicense"] &&
    type["TradeLicense"].NatureOfInstitution.map((ob) => {
      cmbtype.push(ob);
    });
  const [natureOfInstitution, setNatureOfInstitution] = useState(formDatalocal?.tradeLicenseDetail?.institution?.natureOfInstitution ?
    cmbtype.filter(obj => obj.code === formDatalocal?.tradeLicenseDetail?.institution?.natureOfInstitution)[0] : "");
  if (cmbtype.length > 0) {
    if (!initialrender) {
      setNatureOfInstitution(formDatalocal?.tradeLicenseDetail?.institution?.natureOfInstitution ?
        cmbtype.filter(obj => obj.code === formDatalocal?.tradeLicenseDetail?.institution?.natureOfInstitution)[0] : "");
      setInitialrender(true);
    }
  }
  const [contactNo, setContactNo] = useState(formDatalocal?.tradeLicenseDetail?.institution?.contactNo ? formDatalocal?.tradeLicenseDetail?.institution?.contactNo : "");
  const [email, setEmail] = useState(formDatalocal?.tradeLicenseDetail?.institution?.email ? formDatalocal?.tradeLicenseDetail?.institution?.email : "");
  const [insaddress, setInsaddress] = useState(formDatalocal?.tradeLicenseDetail?.institution?.address ? formDatalocal?.tradeLicenseDetail?.institution?.address : "");
  const [institutionName, setInstitutionName] = useState(formDatalocal?.tradeLicenseDetail?.institution?.institutionName ? formDatalocal?.tradeLicenseDetail?.institution?.institutionName : "");
  const [organisationregistrationno, setOrganisationregistrationno] = useState(formDatalocal?.tradeLicenseDetail?.institution?.organisationregistrationno ? formDatalocal?.tradeLicenseDetail?.institution?.organisationregistrationno : "");
  const [licenseUnitId, setLicenseUnitId] = useState(formDatalocal?.tradeLicenseDetail?.institution?.licenseUnitId ? formDatalocal?.tradeLicenseDetail?.institution?.licenseUnitId : "");
  /*** institution end */

  /****  address */

  let ownerappmap ={
    name: "ownerName",
    houseName: "houseName",
    street: "street",
    locality: "locality",
    postOffice: "postOffice",
    pincode: "pincode",
    aadhaarNumber: "owneraadhaarNo",
    mobileNumber: "ownerContactNo"
  };
  /** applicant */

  /** owner */
  const menu = [
    { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" },
    { i18nKey: "TL_COMMON_JOINT_PARTNERSHIP", code: "JOINT_PARTNERSHIP" },
    { i18nKey: "TL_COMMON_INSTITUTION", code: "INSTITUTION" },
  ];

  const [LicenseeType, setLicenseeType] = useState(formDatalocal?.tradeLicenseDetail?.licenseeType ?
    menu.filter(obj => obj.code === formDatalocal?.tradeLicenseDetail?.licenseeType)[0]
    : { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" });

  const comenu = [
    { i18nKey: "TL_CO_SO", code: "S/o" },
    { i18nKey: "TL_CO_DO", code: "D/o" },
  ]
  const storedAppData = null;
  const storedOwnerData = null;
  const initapplicantedit = () => {
    return formDatalocal?.tradeLicenseDetail?.owners;
  }
  const initapplicant = () => {
    return [
      {
        name: "",
        applicantNameLocal: "",
        careOf: "",
        careOfName: "",
        designation: "",
        houseName: "",
        street: "",
        locality: "",
        postOffice: "",
        pincode: "",
        aadhaarNumber: "",
        mobileNumber: "",
        emailId: ""
      }
    ]
  }
  const initowneredit = () => {
    return formDatalocal?.tradeLicenseDetail?.ownerspremise;
  }
  const initowner = () => {
    return [
      {
        owneraadhaarNo: "",
        ownerName: "",
        houseName: "",
        street: "",
        locality: "",
        postOffice: "",
        pincode: "",
        ownerContactNo: ""
      }
    ]
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_APPLICANT":
        return [
          ...state,
          {
            name: "",
            applicantNameLocal: "",
            careOf: "",
            careOfName: "",
            designation: "",
            houseName: "",
            street: "",
            locality: "",
            postOffice: "",
            pincode: "",
            aadhaarNumber: "",
            mobileNumber: "",
            emailId: ""
          },
        ];
      case "REMOVE_APPLICANT":
        return state.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_APP":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
      case "EDIT_CURRENT_SELECT_APP":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
    }
  }

  const reducerowner = (state, action) => {
    switch (action.type) {
      case "ADD_OWNER":
        return [
          ...state,
          {
            owneraadhaarNo: "",
            ownerName: "",
            houseName: "",
            street: "",
            locality: "",
            postOffice: "",
            pincode: "",
            ownerContactNo: ""
          },
        ];
      case "REMOVE_OWNER":
        return state.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_OWNER":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
    }
  }


  const [appState, dispatchapplicant] = formDatalocal?.tradeLicenseDetail?.owners?.length > 0 ? useReducer(reducer, storedAppData, initapplicantedit) : useReducer(reducer, storedAppData, initapplicant);
  const [ownerState, disptachowner] = formDatalocal?.tradeLicenseDetail?.ownerspremise?.length > 0 ? useReducer(reducerowner, storedOwnerData, initowneredit) : useReducer(reducerowner, storedOwnerData, initowner);

  function selectLicenseeType(value) {
    if (value.code !== "JOINT_PARTNERSHIP" && appState.length > 1) {
      setErrorMessage("Multiple Applicant Found Remove....");
      setToast(true)
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else
      setLicenseeType(value);
  }

  function selectLicensingInstitutionType(value) {
    setNatureOfInstitution(value);
  }

  const handleOwnerInputField = useCallback((index, e, key, length = 100) => {
    if(e.length===0){
      disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: "" } });
      return;
    }
    if(e.trim()==="" || e.trim()==="."){
      return;
    }
    if (e.length <= length)
      disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: e } });
    else
      return
  }, [disptachowner]);

  const handleAppInputField = useCallback((index, e, key, length = 100) => {
    if(e.length===0){
      dispatchapplicant({ type: "EDIT_CURRENT_APP", payload: { index, key, value: "" } });
      if(formDatalocal?.tradeLicenseDetail?.ownershipCategory === "OWN" && LicenseeType === "INDIVIDUAL" && ownerappmap[key]){
        let jsonString = [];
        jsonString['index'] = index;
        jsonString['key'] = ownerappmap[key];
        jsonString['value'] = "";

        disptachowner({ type: "EDIT_CURRENT_OWNER", payload: {...jsonString} });
      }
      return;
    }
    if(e.trim()==="" || e.trim()==="."){
      return;
    }
    if (e.length <= length){
      dispatchapplicant({ type: "EDIT_CURRENT_APP", payload: { index, key, value: e } });
      if(formDatalocal?.tradeLicenseDetail?.ownershipCategory === "OWN" && LicenseeType === "INDIVIDUAL" && ownerappmap[key]){
        let jsonString = [];
        jsonString['index'] = index;
        jsonString['key'] = ownerappmap[key];
        jsonString['value'] = e;

       let peyloadtemp= { index, key, value: e };

       disptachowner({ type: "EDIT_CURRENT_OWNER",payload : {...jsonString} });
      }
    }
    else
      return;
  }, [dispatchapplicant,disptachowner]);

  const handleAppSelectField = useCallback((index, e, key) => {
    appState[index].careOf = e.code;
    // careOf.slice(index,0,e);
  }, [dispatchapplicant, appState]);


  const goNext = async () => {

    const result = await validateData();
    if (result) {
      let owners = appState;
      let ownerspremise = ownerState;
      let institution = LicenseeType.code === "INSTITUTION" ? {
        "institutionName": institutionName, "contactNo": contactNo,
        "organisationregistrationno": organisationregistrationno, "address": insaddress, "natureOfInstitution": natureOfInstitution.code,
        "email": email, "licenseUnitId": licenseUnitId
      } : null;
      let licenseeType = LicenseeType.code;
      let capitalInvestment = formDatalocal?.tradeLicenseDetail?.capitalInvestment;
      let structureType = formDatalocal?.tradeLicenseDetail?.structureType;
      let structurePlaceSubtype = formDatalocal?.tradeLicenseDetail?.structurePlaceSubtype;
      let businessActivityDesc = formDatalocal?.tradeLicenseDetail?.businessActivityDesc;
      let noOfEmployees = formDatalocal?.tradeLicenseDetail?.noOfEmployees;
      let ownershipCategory = formDatalocal?.tradeLicenseDetail?.ownershipCategory;
      let address = formDatalocal?.tradeLicenseDetail?.address;
      let structurePlace = formDatalocal?.tradeLicenseDetail?.structurePlace;
      let tradeUnits = formDatalocal?.tradeLicenseDetail?.tradeUnits;
      let businessSector = formDatalocal?.tradeLicenseDetail?.businessSector;
      let enterpriseType=formDatalocal?.tradeLicenseDetail?.enterpriseType;
      // let applicationType=formDatalocal?.applicationType;
      // let workflowCode=formDatalocal?.workflowCode;
      // let oldApplicationNumber=formDatalocal?.oldApplicationNumber;
      let tradeLicenseDetail = { tenantId,
        licenseeType, owners, ownerspremise, institution, businessSector, capitalInvestment, structureType, structurePlaceSubtype
        , businessActivityDesc, noOfEmployees, ownershipCategory, address, structurePlace, tradeUnits,enterpriseType
       
      };
      onSelect(config.key, { tradeLicenseDetail });
    } else {
      setToast(true)
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }

  };

  function validateData() {
    let mobilevalidation = /^[5-9]{1}[0-9]{9}$/;
    let aadharvalidation = /^[0-9]{12}$/;
    let validation = true;
    appState?.map((ob) => {
      if (!ob.mobileNumber.match(mobilevalidation)) {
        setErrorMessage(t("TL_INVALID_MOBILE_NO"));
        validation = false;
      }
      if(!ob.aadhaarNumber.match(aadharvalidation)) {
        setErrorMessage(t("TL_INVALID_AADHAR_NO"));
        validation = false;
      }
      
    });
    if(formDatalocal?.tradeLicenseDetail?.structureType !== 'DESIGNATEDPLACE')    
    ownerState?.map((ob) => {
      if (!ob.ownerContactNo.match(mobilevalidation)) {
        setErrorMessage(t("TL_INVALID_MOBILE_NO"));
        validation = false;
      }
      if(!ob.owneraadhaarNo.match(aadharvalidation)) {
        setErrorMessage(t("TL_INVALID_AADHAR_NO"));
        validation = false;
      }
    });
    if (!contactNo.match(mobilevalidation) && contactNo !== "") {
      setErrorMessage(t("TL_INVALID_MOBILE_NO"));
      validation = false;
    }
    if(formDatalocal?.tradeLicenseDetail?.ownershipCategory.code === 'JOINTOWNER'){
      if (ownerState.length === 1) {
        setErrorMessage(t("Ownership Category Selected as Joint, Please Enter Multiple Owners"));
        validation = false;
      }
    }
    if (LicenseeType.code === "JOINT_PARTNERSHIP" && appState.length === 1) {
      setErrorMessage("Applicant is Joint/Partnership, Please Enter Multiple Applicant");
      validation = false;
    }
    return Promise.resolve(validation);
  }
  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t}
        isDisabled={!LicenseeType || appState[0].name === "" || appState[0].applicantNameLocal === "" || appState[0].careOfName === ""
          || appState[0].houseName === "" ||(LicenseeType.code !== "INSTITUTION" ? appState[0].street === "" : false) || appState[0].locality === "" || appState[0].postOffice === ""
          || appState[0].aadhaarNumber === "" || appState[0].mobileNumber === "" || appState[0].emailId === ""
          || (LicenseeType?.code === "INSTITUTION" ? (appState[0].designation === "" || contactNo === "" || email === "" || insaddress === "" || institutionName === ""
            || organisationregistrationno === "" || licenseUnitId === "") : false)
          || ((formDatalocal?.tradeLicenseDetail?.structureType?.code !== "DESIGNATEDPLACE") ? (ownerState[0].owneraadhaarNo == "" || ownerState[0].ownerName == "" || ownerState[0].houseName == "" || ownerState[0].street == ""
          || ownerState[0].locality == "" || ownerState[0].postOffice == "" || ownerState[0].ownerContactNo == ""):false)} >

        <div className="row">
          <div className="col-md-12" > <header className="card-header">New IFTE & OS License Application</header>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" > </h1>
          </div>
        </div> */}


        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Name and Address of Applicant</span>{" "}
            </h1>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            <LabelFieldPair style={{ display: "flex", }}>
              <CardLabel style={{ fontSize: "17px", width: "none !important" }}>{`${t("TL_LICENSEE_MSG")}`}</CardLabel>
              <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={LicenseeType} onSelect={selectLicenseeType} style={{ marginTop: "8px", padding: "10px", height: "10px", display: "flex" }} />
            </LabelFieldPair>
          </div>
        </div>
        {(LicenseeType.code === "INDIVIDUAL" || LicenseeType.code === "JOINT_PARTNERSHIP") && (

          appState.map((field, index) => {
            return (
              <div key={`${field}-${index}`}>
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
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_AADHAR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantAadharNo" value={field.aadhaarNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "aadhaarNumber", 12)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_AADHAR_NO") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantName" value={field.name} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z ]/ig, ''), "name",100)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}(Local) <span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantNameLocal" value={field.applicantNameLocal} onChange={e => handleAppInputField(index, e.target.value.replace(/[^\u0D00-\u0D7F\u200D\u200C .&'@']/g,''), "applicantNameLocal",200)} {...(validation = {pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",isRequired: true,type: "text",title: t("TL_LICENSEE_NAME")})}/>
                    </div>
                    <div className="col-md-3">
                      <CardLabel>S/o or D/o<span className="mandatorycss">*</span></CardLabel>
                      <div className="col-md-4">
                        <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={comenu} selected={comenu.filter(obj => obj.code === field.careOf)[0]} select={e => handleAppSelectField(index, e, "careOf")} {...(validation = { isRequired: true, type: "text", title: "S/O or D/O" })} />
                      </div>
                      <div className="col-md-8">
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appconame" value={field.careOfName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "careOfName",100)} {...(validation = { isRequired: true, type: "text", title: "C/O Name" })} />
                      </div>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantMobileNo" value={field.mobileNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "mobileNumber", 10)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_MOBILE_NO") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type="email" name="applicantEmail" value={field.emailId} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, ''), "emailId")} {...(validation = { isRequired: true, title: t("TL_INVALID_EMAIL_ID") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALITY")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applocality" value={field.locality} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "locality")} {...(validation = { isRequired: true, title: t("TL_INVALID_LOCALITY") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_STREET_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appstreet" value={field.street} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "street")} {...(validation = { isRequired: true, title: t("TL_INVALID_STREET_NAME") })} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_HOUSE_NO_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="apphousename" value={field.houseName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "houseName",150)} {...(validation = { isRequired: true, title: t("TL_INVALID_HOUSE_NO_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_POSTOFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appponame" value={field.postOffice} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "postOffice",50)} {...(validation = { isRequired: true, title: t("TL_INVALID_POSTOFFICE") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_PIN")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="pincode" value={field.pincode} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "pincode", 6)} {...(validation = { isRequired: false, title: t("TL_INVALID_PIN") })} />
                    </div>

                    {LicenseeType.code === "JOINT_PARTNERSHIP" && (
                      <div>
                        {appState.length === (index + 1) && (
                          <div className="col-md-1">
                            <CardLabel>Add More</CardLabel>
                            <LinkButton
                              label={
                                <svg className="icon  icon--plus" viewBox="0 0 5 5" fill="green" width="50" height="50">
                                  <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
                                </svg>
                              }
                              onClick={(e) => dispatchapplicant({ type: "ADD_APPLICANT" })}
                            />
                          </div>
                        )}
                        {appState.length > 1 && (
                          <div className="col-md-1">
                            <CardLabel>Remove</CardLabel>
                            <LinkButton
                              label={
                                <svg viewBox="0 0 24 24" fill="red" width="50" height="50"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" /> </g> </svg>
                              }
                              onClick={(e) => dispatchapplicant({ type: "REMOVE_APPLICANT", payload: { index } })}
                            />
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                </div>
              </div>
            )
          })


        )}

        {LicenseeType.code === "INSTITUTION" && (
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>Institution Details
                  </span>{" "}
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <CardLabel>{`${t("TL_INSTITUTION_TYPE_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={cmbtype} selected={natureOfInstitution} select={selectLicensingInstitutionType} {...(validation = { isRequired: true, title: t("TL_LICENSING_UNIT_TYPE") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSING_INSTITUTION_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="organisationregistrationno" value={organisationregistrationno} onChange={e => setOrganisationregistrationno(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length < 51 ? e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '') : (e.target.value).substring(0, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length - 1))}  {...(validation = { isRequired: true, title: t("TL_INVALID_LICENSING_INSTITUTION_ID") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSING_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="institutionName" value={institutionName} onChange={e =>  e.target.value.trim().length===0 ? setInstitutionName("") : e.target.value.trim()=== "" || e.target.value.trim()==="."  ? setInstitutionName("")  :   setInstitutionName(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length < 151 ? e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '') : (e.target.value).substring(0, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_LICENSING_INSTITUTION_NAME_INVALID") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSING_UNIT_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="licenseUnitId" value={licenseUnitId} onChange={e => e.target.value.trim().length===0 ? setLicenseUnitId("") : e.target.value.trim()=== "" || e.target.value.trim()==="."  ? setLicenseUnitId("")  :  setLicenseUnitId(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length < 51 ? e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '') : (e.target.value).substring(0, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_INVALID_LICENSING_INSTITUTION_ID") })} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="contactNo" value={contactNo} onChange={e => setContactNo(e.target.value.replace(/[^0-9]/ig, '').length < 11 ? e.target.value.replace(/[^0-9]/ig, '') : e.target.value.replace(/[^0-9]/ig, '').substring(0, e.target.value.replace(/[^0-9]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_INVALID_CONTACT_NO") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type="email" name="email" value={email} onChange={e => setEmail(e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, '').length < 101 ? e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, '') : e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, '').substring(0, e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_INVALID_EMAIL_ID") })} />
              </div>
              <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="insaddress" value={insaddress} onChange={e =>e.target.value.trim().length===0 ? setInsaddress("") : e.target.value.trim()=== "" || e.target.value.trim()==="."  ? setInsaddress("")  :  setInsaddress(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length < 250 ? e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '') : (e.target.value).substring(0, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_INVALID_LICENSING_INSTITUTION_ADDRESS") })} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>Designated Person of the Licensing Unit</span>{" "}
                </h1>
              </div>
            </div>
            {appState.map((field, index) => {
              return (
                <div className="row" key={index}>
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_AADHAR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantAadharNo" value={field.aadhaarNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "aadhaarNumber", 12)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_AADHAR_NO") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantName" value={field.name} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z ]/ig, ''), "name")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`} (Malayalam)<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantNameLocal" value={field.applicantNameLocal} onChange={e => handleAppInputField(index, e.target.value, "applicantNameLocal",200)} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>S/O or D/O<span className="mandatorycss">*</span></CardLabel>
                      <div className="col-md-4">
                        <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={comenu} selected={comenu.filter(obj => obj.code === field.careOf)[0]} select={e => handleAppSelectField(index, e, "careOf")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_CO") })} />
                      </div>
                      <div className="col-md-8">
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appconame" value={field.careOfName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "careOfName")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_CO") })} />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantMobileNo" value={field.mobileNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "mobileNumber", 10)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_MOBILE_NO") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type="email" name="applicantEmail" value={field.emailId} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, ''), "emailId")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_EMAIL_ID") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALITY")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="locality" value={field.locality} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "locality")} {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_LOCALITY") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_HOUSE_NO_NAME")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="houseName" value={field.houseName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "houseName",150)} {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_HOUSE_NO_NAME") })} />
                    </div>
                  </div>
                  <div className="row">

                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_POSTOFFICE")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="postOffice" value={field.postOffice} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "postOffice",50)} {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_POSTOFFICE") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_PIN")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="pincode" value={field.pincode} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "pincode", 6)} {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_PIN") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="designation" value={field.designation} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "designation",50)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_DESIGNATION") })} />
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
        )}
        {(formDatalocal?.tradeLicenseDetail?.structureType !== "DESIGNATEDPLACE") && (
        <div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_OWNER_ADDRESS_LABEL")}`}
                </span>{" "}
              </h1>
            </div>
          </div>
          {ownerState.map((field, index) => {
            return (
              <div key={`${field}-${index}`}>
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
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_AADHAR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="aadhaarNumber" value={field.owneraadhaarNo} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "owneraadhaarNo", 12)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_AADHAR_NO") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownername" value={field.ownerName} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z ]/ig, ''), "ownerName")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownermobileno" value={field.ownerContactNo} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "ownerContactNo", 10)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_MOBILE_NO") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALITY")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerlocality" value={field.locality} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "locality")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LOCALITY") })} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_STREET_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerstreet" value={field.street} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "street")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_STREET_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_HOUSE_NO_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerhousename" value={field.houseName} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "houseName", 150)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_HOUSE_NO_NAME") })} />
                    </div>

                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_POSTOFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerponame" value={field.postOffice} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "postOffice", 50)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_POSTOFFICE") })} />
                    </div>
                    <div className="col-md-1">
                      <CardLabel>{`${t("TL_PIN")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerpincode" value={field.pincode} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "pincode", 6)} {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_PIN") })} />
                    </div>
                    {ownerState.length === (index + 1) && (
                      <div className="col-md-1">
                        <CardLabel>Add More</CardLabel>
                        <LinkButton
                          label={
                            <svg className="icon  icon--plus" viewBox="0 0 5 5" fill="green" width="50" height="50">
                              <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
                            </svg>
                          }
                          onClick={(e) => disptachowner({ type: "ADD_OWNER" })}
                        />
                      </div>
                    )}
                    {ownerState.length > 1 && (
                      <div className="col-md-1">
                        <CardLabel>Remove</CardLabel>
                        <LinkButton
                          label={
                            <svg viewBox="0 0 24 24" fill="red" width="50" height="50"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" /> </g> </svg>
                          }
                          onClick={(e) => disptachowner({ type: "REMOVE_OWNER", payload: { index } })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
        )}
        <div>
          {toast && (
            <Toast
              error={toast}
              label={errorMessage}
              onClose={() => setToast(false)}
            />
          )}{""}
        </div>
      </FormStep>

    </React.Fragment>
  );
};
export default TLLicenseApplicantDetRenewal;