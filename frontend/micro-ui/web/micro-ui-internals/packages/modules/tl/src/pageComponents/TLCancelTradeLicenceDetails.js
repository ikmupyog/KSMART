import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Toast, Dropdown, TextInput, LinkButton, Card, StatusTable, CardText, FormStep, FormComposer, ButtonSelector, SubmitBar, CardLabel, RadioButtons } from "@egovernments/digit-ui-react-components";
import Timeline from "../components/TLTimeline";
import { values } from "lodash";

const TLCancelTradeLicenceDetails = ({ t, config, onSelect, formData, errorMessage , validation}) => {
  const history = useHistory();
  const match = useRouteMatch();
 
  // const [toast, setToast] = useState(false);
  const [isApplicant, setIsApplicant] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [adhaarNo, setAdhaarNo] = useState("");
  const [nameofApplicant,setNameofApplicant] = useState("");
  const [relationship,setRelationship] = useState("");
  const [housename,setHouseName] = useState("");
  const [localPlace,setLocalPlace] = useState("");
  const [mainPlace,setMainPlace] = useState("");
  const [pincode,setPincode] = useState("");
  const [postOffice,setPostOffice] = useState("");
  const [district,setDistrict] = useState("");

  
  const menu = [
    { name: "TL_LICENSEE", code: "LICENSEE" },
    { name: "TL_OTHERS", code: "OTHERS" },
  ];
  
  const CancelReasons = [
    { name: "TL_BUSINESS_LOSS", code: "BUSINESSLOSS" },
    { name: "TL_LOCATION_CHANGE", code: "LOCATIONCHANGE" },
    { name: "TL_OTHER", code: "OTHERS" }
  ]
  
  if (validation === false) {
    setToast(true)
    setTimeout(() => {
      setToast(false);
    }, 2000);
  }
 
  const selectIsApplicant = (value => {
    setIsApplicant(value);
    console.log("isApplicant : " + isApplicant);
  });
  const selectCancelReason = (value => {
    setCancelReason(value);
  });
  const changesetAdhaarNo = (e => {
    setAdhaarNo(e.target.value);
  });
  const changesetNameofApplicant = (e => {
    setNameofApplicant(e.target.value);
  });
  const changesetRelationship = (e => {
    setRelationship(e.target.value);
  });
  const changesetHousename = (e => {
    setHouseName(e.target.value);
  });
  const changesetLocalPlace =(e => {
    setLocalPlace(e.target.value);
  });
  const changesetMainPlace =(e => {
    setMainPlace(e.target.value);
  });
  const changesetPincode =(e => {
    setPincode(e.target.value);
  });
  const changesetPostOffice =(e => {
    setPostOffice(e.target.value);
  });
  const changesetDistrict =(e => {
    setDistrict(e.target.value);
  });
  
  
  
  
 
  const goNext = async (data) => {
   // console.log("ya firing amin"+JSON.stringify(data));
   onSelect("", "");
  }
  const onSkip = () => onSelect();
  function submit(data) {
  }

  const handleNextPage = () => {
    history.push(`${match.path}/check`);
  }
  return (
    <React.Fragment>
       {window.location.href.includes("/citizen") ? <Timeline flow={'CANCELLATION'}/> : null}
      {window.location.href.includes("/employee") ? <Timeline  flow={'CANCELLATION'}/> : null}
      <FormStep  config={config} onSelect={goNext} onSkip={onSkip} t={t}  >
         <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >
         <div className="row">
            <div className="col-md-3">
              <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
              {`${t("TL_APPLICANT_IS_LICENSEE")}`}<span className="mandatorycss">*</span>
              </CardLabel>
            </div>
            <div className="col-md-8">
              <RadioButtons t={t} optionsKey="name" isMandatory={config.isMandatory} options={menu} selectedOption={isApplicant} onSelect={selectIsApplicant} style={{ display: "flex", justifyContent: "space-between", width: "48%" }} {...(validation = { isRequired: true, type: "text", title: t("TL_INVALID_APPLICANT_TYPE"), })} />&nbsp;
            </div>
          </div>
         {isApplicant.code === "LICENSEE" && (
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_APPLICANT_LICENSEE")}`}</span> </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                {`${t("TL_REASON_LICENSE_CANCELLATION")}`}<span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-8">
                <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={CancelReasons} selected={cancelReason} select={selectCancelReason} {...(validation = { isRequired: true, title: t("TL_INVALID_CANCEL_REASON") })} />
              </div>
            </div>
          </div>
          )}
          {isApplicant.code === "OTHERS" && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_APPLICANT_OTHERS")}`}</span> </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                  {`${t("TL_LICENSEE_AADHAR_NO")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="adhaarNo" value={adhaarNo} onChange={changesetAdhaarNo}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_ADHAAR_NO"), })} />
                </div>
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                    {`${t("TL_APPLICANT_NAME")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="name" value={nameofApplicant} onChange={changesetNameofApplicant}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_NAME_APPLICANT"), })} />
                </div>
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                    {`${t("TL_RELATIONSHIP_WITH_LICENSEE_LABEL")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="relationship" value={relationship} onChange={changesetRelationship}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_RELATIONSHIP"), })} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                  {`${t("TL_HOUSE_NO_NAME")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="housename" value={housename} onChange={changesetHousename}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_HOUSE_NAME"), })} />
                </div>
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                  {`${t("TL_LOCAL_PLACE")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="localPlace" value={localPlace} onChange={changesetLocalPlace}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_HOUSE_NAME"), })} />
                </div>
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                    {`${t("TL_MAIN_PLACE")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="name" value={mainPlace} onChange={changesetMainPlace}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_NAME_APPLICANT"), })} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                  {`${t("TL_HOUSE_NO_NAME")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="housename" value={housename} onChange={changesetHousename}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_HOUSE_NAME"), })} />
                </div>
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                  {`${t("TL_LOCAL_PLACE")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="localPlace" value={localPlace} onChange={changesetLocalPlace}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_HOUSE_NAME"), })} />
                </div>
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                    {`${t("TL_MAIN_PLACE")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="name" value={mainPlace} onChange={changesetMainPlace}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_NAME_APPLICANT"), })} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                  {`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="contactNo" value={contactNo} onChange={changesetPostOffice}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_HOUSE_NAME"), })} />
                </div>
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                  {`${t("TL_PIN")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="pincode" value={pincode} onChange={changesetPincode}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_HOUSE_NAME"), })} />
                </div>
                <div className="col-md-4">
                  <CardLabel style={{ marginBottom: "30px", marginTop: "20px" }}>
                  {`${t("TL_DISTRICT")}`}<span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput t={t} type={"text"} isMandatory={false} optionKey="i18nKey" name="district" value={district} onChange={changesetDistrict}  {...(validation = { isRequired: false, type: "text", title: t("TL_INVALID_HOUSE_NAME"), })} />
                </div>
            </div>
         </div>
          )}
        </div> 
        {/* {toast && (
              <Toast
                  error={toast}
                  label={errorMessage}
                  onClose={() => setToast(false)}
              />
          )}{""} */}
      </FormStep>
    </React.Fragment>




  );
}
export default TLCancelTradeLicenceDetails;