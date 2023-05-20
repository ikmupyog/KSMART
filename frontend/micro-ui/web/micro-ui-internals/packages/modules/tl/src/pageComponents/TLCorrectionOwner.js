import React, { useCallback, useState, useReducer } from "react";
import { CardLabel, TextInput, Dropdown, LinkButton, FormStep, SubmitBar } from "@egovernments/digit-ui-react-components";
const TLCorrectionOwner = ({ t, config,onSelect,formData }) => {
  let validation = {};
  const storedOwnerData = null;

  const initowneredit = () => {
    return formData?.tradeLicenseDetail?.ownerspremise;
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
  const [ownerState, disptachowner] = useReducer(reducerowner, storedOwnerData, initowneredit);

  const handleOwnerInputField = useCallback((index, e, key, length = 100) => {
    if (e.length === 0) {
      disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: "" } });
      return;
    }
    if (e.trim() === "" || e.trim() === ".") {
      return;
    }
    if (e.length <= length)
      disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: e } });
    else
      return
  }, [disptachowner]);
  const goNext = async () => {
    let ownerspremise = ownerState;
    let tradeLicenseDetail = {ownerspremise:ownerspremise}
    onSelect(config.key,{tradeLicenseDetail});
  }
  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      <FormStep onSelect={goNext}>
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
        {/* <div className="row">
          <div className="col-md-12">
            <SubmitBar label={t("TL_DOWNLOAD_ACK_FORM")} onSubmit={goNext} />
          </div>
        </div> */}
      </FormStep>
    </React.Fragment>

  );
}
export default TLCorrectionOwner;