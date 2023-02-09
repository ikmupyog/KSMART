import { CardLabel, Dropdown, FormStep, LinkButton, RadioButtons, TextInput, TextArea, LabelFieldPair, Toast } from "@egovernments/digit-ui-react-components";
import React, { useState, useReducer, useCallback } from "react";
import Timeline from "../components/TLTimeline";
// import { sortDropdownNames } from "../utils/index";

const TLLicenseApplicantDet = ({ t, config, onSelect, userType, formData }) => {
  const [valflag, setValflag] = useState(false);
  const [toast, setToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let validation = {};
  const stateId = Digit.ULBService.getStateId();
  /** Institution type details */
  const { data: type = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "NatureOfInstitution");
  const [initialrender, setInitialrender] = useState(false);
  let cmbtype = [];
  type &&
    type["TradeLicense"] &&
    type["TradeLicense"].NatureOfInstitution.map((ob) => {
      cmbtype.push(ob);
    });
  const [natureOfInstitution, setNatureOfInstitution] = useState(formData?.TradeDetails?.institution?.natureOfInstitution ?
    cmbtype.filter(obj => obj.code === formData?.TradeDetails?.institution?.natureOfInstitution)[0] : "");
  if (cmbtype.length > 0) {
    if (!initialrender) {
      setNatureOfInstitution(formData?.TradeDetails?.institution?.natureOfInstitution ?
        cmbtype.filter(obj => obj.code === formData?.TradeDetails?.institution?.natureOfInstitution)[0] : "");
      setInitialrender(true);
    }
  }
  const [contactNo, setContactNo] = useState(formData?.TradeDetails?.institution?.contactNo ? formData?.TradeDetails?.institution?.contactNo : "");
  const [email, setEmail] = useState(formData?.TradeDetails?.institution?.email ? formData?.TradeDetails?.institution?.email : "");
  const [address, setAddress] = useState(formData?.TradeDetails?.institution?.address ? formData?.TradeDetails?.institution?.address : "");
  const [institutionName, setInstitutionName] = useState(formData?.TradeDetails?.institution?.institutionName ? formData?.TradeDetails?.institution?.institutionName : "");
  const [organisationregistrationno, setOrganisationregistrationno] = useState(formData?.TradeDetails?.institution?.organisationregistrationno ? formData?.TradeDetails?.institution?.organisationregistrationno : "");
  const [licenseUnitId, setLicenseUnitId] = useState(formData?.TradeDetails?.institution?.licenseUnitId ? formData?.TradeDetails?.institution?.licenseUnitId : "");
  /*** institution end */

  /****  address */


  /** applicant */

  /** owner */





  const menu = [
    { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" },
    { i18nKey: "TL_COMMON_JOINT_PARTNERSHIP", code: "JOINT_PARTNERSHIP" },
    { i18nKey: "TL_COMMON_INSTITUTION", code: "INSTITUTION" },
  ];

  const [LicenseeType, setLicenseeType] = useState(formData?.TradeDetails?.licenseeType ?
    menu?.filter(obj => obj.code === formData?.TradeDetails?.licenseeType)[0]
    : { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" });

  const comenu = [
    { i18nKey: "TL_CO_SO", code: "S/O" },
    { i18nKey: "TL_CO_DO", code: "D/O" },
  ]
  const storedAppData = null;
  const storedOwnerData = null;
  const initapplicantedit = () => {
    return formData?.TradeDetails?.applicant;
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
    return formData?.TradeDetails?.owners;
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


  const [appState, dispatchapplicant] = formData?.TradeDetails?.applicant?.length > 0 ? useReducer(reducer, storedAppData, initapplicantedit) : useReducer(reducer, storedAppData, initapplicant);
  const [ownerState, disptachowner] = formData?.TradeDetails?.owners?.length > 0 ? useReducer(reducerowner, storedOwnerData, initowneredit) : useReducer(reducerowner, storedOwnerData, initowner);

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
    console.log(value);
    setNatureOfInstitution(value);
  }

  const handleOwnerInputField = useCallback((index, e, key, length = 100) => {
    if (e.length <= length)
      disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: e } });
    else
      return
  }, [disptachowner]);

  const handleAppInputField = useCallback((index, e, key, length = 100) => {
    if (e.length <= length)
      dispatchapplicant({ type: "EDIT_CURRENT_APP", payload: { index, key, value: e } });
    else
      return;
  }, [dispatchapplicant]);

  const handleAppSelectField = useCallback((index, e, key) => {
    appState[index].careOf = e.code;
    // careOf.slice(index,0,e);
  }, [dispatchapplicant, appState]);


  const goNext = () => {
    //  valflag=validateData();
    if (validateData()) {
      let owners = appState;
      let ownerspremise = ownerState;
      let institution = {
        "institutionName": institutionName, "contactNo": contactNo,
        "organisationregistrationno": organisationregistrationno, "address": address, "natureOfInstitution": natureOfInstitution.code,
        "email": email, "licenseUnitId": licenseUnitId
      };
      let licenseeType = LicenseeType.code;
      onSelect(config.key, { owners, ownerspremise, institution, licenseeType });
    } else {
      setToast(true)
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }

  };

  function validateData() {
    let mobilevalidation = /^[5-9]{1}[0-9]{9}$/;
    if (!contactNo.match(mobilevalidation) && contactNo!=="") {
      setErrorMessage(t("TL_INVALID_MOBILE_NO"));
      setValflag(false);
      return valflag;
    } else {
      setValflag(true);
      return valflag;
    }
  }

  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      {/* isDisabled={!fields[0].tradecategory || !fields[0].tradetype || !fields[0].tradesubtype} */}
      <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t}  >

        <div className="row">
          <div className="col-md-12" ><header className="card-header">New IFTE & OS License Application</header>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Name and Address of Applicant</span>{" "}
            </h1>
          </div>
        </div>
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
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantAadharNo" value={field.aadhaarNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "aadhaarNumber",12)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantName" value={field.name} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "name")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}(Malayalam) <span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantNameLocal" value={field.applicantNameLocal} onChange={e => handleAppInputField(index, e.target.value, "applicantNameLocal")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>S/O or D/O<span className="mandatorycss">*</span></CardLabel>
                      <div className="col-md-4">
                        <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={comenu} name="careOf" selected={comenu.filter(obj => obj.code === field.careOf)[0]} select={e => handleAppSelectField(index, e, "careOf")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                        {/* selected={careOf[index]} select={e => handleAppSelectField(index, e, "careOf")} */}
                      </div>
                      <div className="col-md-8">
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="careOfName" value={field.careOfName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "careOfName")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                      </div>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantMobileNo" value={field.mobileNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "mobileNumber", 10)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantEmail" value={field.emailId} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, ''), "emailId")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>Locality</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="locality" value={field.locality} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "locality")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_STREET_NAME")}`}</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="street" value={field.street} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "street")} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>House Name</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="houseName" value={field.houseName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "houseName")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>Post Office</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="postOffice" value={field.postOffice} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "postOffice")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>Pincode</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="pincode" value={field.pincode} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "pincode", 6)} />
                    </div>

                    {LicenseeType.code === "JOINT_PARTNERSHIP" && (
                      <div>
                        {appState.length === (index + 1) && (
                          <div className="col-md-1">
                            <CardLabel>Add More</CardLabel>
                            <LinkButton
                              label={
                                <svg viewBox="0 0 5 5" fill="green" width="50" height="50">
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
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="organisationregistrationno" value={organisationregistrationno} onChange={e => setOrganisationregistrationno(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length < 51 ? e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '') : (e.target.value).substring(0, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length - 1))}  {...(validation = { isRequired: true, title: t("TL_LICENSING_UNIT_TYPE") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSING_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="institutionName" value={institutionName} onChange={e => setInstitutionName(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length < 101 ? e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '') : (e.target.value).substring(0, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_LICENSING_UNIT_TYPE") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>Licensing Unit ID<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="licenseUnitId" value={licenseUnitId} onChange={e => setLicenseUnitId(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length < 51 ? e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '') : (e.target.value).substring(0, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_LICENSING_UNIT_TYPE") })} />
              </div>

            </div>
            <div className="row">
              <div className="col-md-3">
                <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="contactNo" value={contactNo} onChange={e => setContactNo(e.target.value)} {...(validation = { isRequired: true, title: t("TL_LICENSING_UNIT_TYPE") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>

                {/* e.target.value.replace(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ig, '').length < 101 ? e.target.value.replace(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ig,'') : (e.target.value).substring(0, e.target.value.replace(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ig,'').length-1 ) */}
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="email" value={email} onChange={e => setEmail(e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, '').length < 101 ? e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, '') : e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, '').substring(0, e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_LICENSING_UNIT_TYPE") })} />
              </div>
              {/* </div>
              <div className="row"> */}
              <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="address" value={address} onChange={e => setAddress(e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length < 250 ? e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '') : (e.target.value).substring(0, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, '').length - 1))} {...(validation = { isRequired: true, title: t("TL_LICENSING_UNIT_TYPE") })} />
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
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantAadharNo" value={field.aadhaarNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "aadhaarNumber", 12)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantName" value={field.name} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "name")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`} (Malayalam)<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantNameLocal" value={field.applicantNameLocal} onChange={e => handleAppInputField(index, e.target.value, "applicantNameLocal")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>S/O or D/O<span className="mandatorycss">*</span></CardLabel>
                      <div className="col-md-4">
                        <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={comenu} selected={comenu.filter(obj => obj.code === field.careOf)[0]} select={e => handleAppSelectField(index, e, "careOf")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                      </div>
                      <div className="col-md-8">
                        <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="careOfName" value={field.careOfName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "careOfName")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantMobileNo" value={field.mobileNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "mobileNumber", 10)} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantEmail" value={field.emailId} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9+_.-]+@[a-zA-Z0-9.-]/ig, ''), "emailId")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>Locality</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="locality" value={field.locality} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "locality")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>House Name</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="houseName" value={field.houseName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "houseName")} />
                    </div>
                  </div>
                  <div className="row">

                    <div className="col-md-3">
                      <CardLabel>Postoffice</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="postOffice" value={field.postOffice} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "postOffice")} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>Pincode</CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="pincode" value={field.pincode} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "pincode", 6)} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="designation" value={field.designation} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "designation")} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
                    </div>
                  </div>
                </div>
              )

            })
            }
          </div>
        )
        }
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Name and Address of Owner of the Premise (Place or Structure)
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
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="aadhaarNumber" value={field.owneraadhaarNo} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "owneraadhaarNo", 12)} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownername" value={field.ownerName} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "ownerName")} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownermobileno" value={field.ownerContactNo} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "ownerContactNo", 10)} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>Locality<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerlocality" value={field.locality} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "locality")} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_STREET_NAME")}`}</CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerstreet" value={field.street} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "street")} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>House Name</CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerhousename" value={field.houseName} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "houseName")} />
                  </div>

                  <div className="col-md-3">
                    <CardLabel>Postoffice</CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerponame" value={field.postOffice} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "postOffice")} />
                  </div>
                  <div className="col-md-1">
                    <CardLabel>Pincode</CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerpincode" value={field.pincode} onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^0-9.]/ig, ''), "pincode", 6)} />
                  </div>
                  {ownerState.length === (index + 1) && (
                    <div className="col-md-1">
                      <CardLabel>Add More</CardLabel>
                      <LinkButton
                        label={
                          <svg viewBox="0 0 5 5" fill="green" width="50" height="50">
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
export default TLLicenseApplicantDet;