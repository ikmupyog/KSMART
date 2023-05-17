import React, { useCallback , useState, useReducer, useEffect } from "react";
import { CardLabel, TextInput, Dropdown, LinkButton } from "@egovernments/digit-ui-react-components";
const TLCorrectionApplicant = ({ t, config,formData,onEditSelect,formDataEdit }) => {
  let validation = {};
  const storedAppData = null;
  const [isEdit,setIsEdit]=useState(true);
  const comenu = [
    { i18nKey: "TL_CO_SO", code: "S/o" },
    { i18nKey: "TL_CO_DO", code: "D/o" },
  ]
  const initapplicantedit = () => {
    console.log("fire started");

    // console.log(isEdit);
    // console.log(JSON.stringify(formDataEdit));
    // console.log(JSON.stringify(formData));
    // if(isEdit)
  //  return formDataEdit?.TradeDetails?.tradeLicenseDetail?.owners? formDataEdit?.tradeLicenseDetail?.owners :formData?.tradeLicenseDetail?.owners;
    // else
     return  formDataEdit?.TradeDetails?.tradeLicenseDetail?.owners ? formDataEdit?.TradeDetails?.tradeLicenseDetail?.owners  :  formData?.tradeLicenseDetail?.owners;
  }
  const ed = () => {
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
        Digit.SessionStorage.set("owneredit", true);
        return state.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_APP":
        
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            // console.log("data"+ JSON.stringify({ ...data, [action.payload.key]: action.payload.value }));
            // let owners = { ...data, [action.payload.key]: action.payload.value };
            // let tradeLicenseDetail = {owners};
            // onEditSelect(config.key, { tradeLicenseDetail });
       
       
          //  onEditSelect(config.key, { owneredit });
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        })
       
        ;
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
  const [appState, dispatchapplicant] = useReducer(reducer, storedAppData, initapplicantedit);

  const handleAppInputField = useCallback((index, e, key, length = 100) => {
    Digit.SessionStorage.set("owneredit", true)
    if (e.length === 0) {
     dispatchapplicant({ type: "EDIT_CURRENT_APP", payload: { index, key, value: "" } });
      // let owneredit = true;
      // onEditSelect(config.key, { owneredit });
      return;
    }
    if (e.trim() === "" || e.trim() === ".") {
      // let owneredit = true;
      // onEditSelect(config.key, { owneredit });
      return;
    }
    if (e.length <= length) {
       dispatchapplicant({ type: "EDIT_CURRENT_APP", payload: { index, key, value: e } });
      //  let owneredit = true;
      //  onEditSelect(config.key, { owneredit });
    }
    else
      return;
  }, [dispatchapplicant]);


  useEffect(()=>{
    if(Digit.SessionStorage.get("owneredit")){
      Digit.SessionStorage.set("owneredit", false);
      let owners = appState;
      let address = formDataEdit?.TradeDetails?.tradeLicenseDetail?.address;
      let tenantId = formDataEdit?.TradeDetails?.tenantId;
      let structurePlace = formDataEdit?.TradeDetails?.tradeLicenseDetail?.structurePlace;
      let ownerspremise = formDataEdit?.TradeDetails?.tradeLicenseDetail?.ownerspremise;
      let institution = formDataEdit?.TradeDetails?.tradeLicenseDetail?.institution;
      let licenseeType = formDataEdit?.TradeDetails?.tradeLicenseDetail?.licenseeType;
      let businessSector = formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessSector;
      let structureType = formDataEdit?.TradeDetails?.tradeLicenseDetail?.structureType;
      let structurePlaceSubtype = formDataEdit?.TradeDetails?.tradeLicenseDetail?.structurePlaceSubtype;
      let businessActivityDesc = formDataEdit?.TradeDetails?.tradeLicenseDetail?.businessActivityDesc;
      let ownershipCategory = formDataEdit?.TradeDetails?.tradeLicenseDetail?.ownershipCategory;
      let enterpriseType = formDataEdit?.TradeDetails?.tradeLicenseDetail?.enterpriseType;
      let capitalInvestment = formDataEdit?.TradeDetails?.tradeLicenseDetail?.capitalInvestment ;
      let noOfEmployees = formDataEdit?.TradeDetails?.tradeLicenseDetail?.noOfEmployees;
      let tradeUnits = formDataEdit?.TradeDetails?.tradeLicenseDetail?.tradeUnits;
      let applicationDocuments = [];
  
      let tradeLicenseDetail = { tenantId, licenseeType, owners, ownerspremise, institution, businessSector, capitalInvestment, enterpriseType,
          structureType,structurePlaceSubtype, businessActivityDesc, noOfEmployees,
          ownershipCategory, address, tradeUnits, structurePlace,applicationDocuments }
      onEditSelect(config.key,{tradeLicenseDetail});
      setIsEdit(false);
    }

  });
  const handleAppSelectField = useCallback((index, e, key) => {
    appState[index].careOf = e.code;
  }, [dispatchapplicant, appState]);
  return (
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
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_OWNER_DETAILS_HEADER")}`}</span> </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSEE_AADHAR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantAadharNo" value={field.aadhaarNumber} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "aadhaarNumber", 12)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_AADHAR_NO") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantName" value={field.name} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z ]/ig, ''), "name", 100)} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_LICENSEE_NAME") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSEE_NAME")}`}(Malayalam) <span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applicantNameLocal" value={field.applicantNameLocal} onChange={e => handleAppInputField(index, e.target.value.replace(/[^\u0D00-\u0D7F\u200D\u200C .&'@']/g, ''), "applicantNameLocal", 200)} {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: true, type: "text", title: t("TL_LICENSEE_NAME") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>S/o or D/o<span className="mandatorycss">*</span></CardLabel>
                <div className="col-md-4">
                  <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={comenu} selected={comenu.filter(obj => obj.code === field.careOf)[0]} select={e => handleAppSelectField(index, e, "careOf")} {...(validation = { isRequired: true, type: "text", title: "S/O or D/O" })} />
                </div>
                <div className="col-md-8">
                  <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appconame" value={field.careOfName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "careOfName", 100)} {...(validation = { isRequired: true, type: "text", title: "C/O Name" })} />
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
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="apphousename" value={field.houseName} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "houseName", 150)} {...(validation = { isRequired: true, title: t("TL_INVALID_HOUSE_NO_NAME") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_POSTOFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appponame" value={field.postOffice} onChange={e => handleAppInputField(index, e.target.value.replace(/[^A-Za-z0-9@'$#& ,]/ig, ''), "postOffice", 50)} {...(validation = { isRequired: true, title: t("TL_INVALID_POSTOFFICE") })} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_PIN")}`}</CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="pincode" value={field.pincode} onChange={e => handleAppInputField(index, e.target.value.replace(/[^0-9]/ig, ''), "pincode", 6)} {...(validation = { isRequired: false, title: t("TL_INVALID_PIN") })} />
              </div>

               {formDataEdit?.TradeDetails?.tradeLicenseDetail?.licenseeType === "JOINT_PARTNERSHIP" && ( 
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
  );
}
export default TLCorrectionApplicant;