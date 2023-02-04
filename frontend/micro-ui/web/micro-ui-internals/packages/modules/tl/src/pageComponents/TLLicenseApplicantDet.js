import { CardLabel, Dropdown, FormStep, LinkButton, Loader, RadioButtons, RadioOrSelect, TextInput, TextArea, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import React, { useState, useReducer } from "react";
import { useLocation } from "react-router-dom";
import Timeline from "../components/TLTimeline";
import { sortDropdownNames } from "../utils/index";

const TLLicenseApplicantDet = ({ t, config, onSelect, userType, formData }) => {

  const [licenseeType, setLicenseeType] = useState(formData?.TradeDetails?.LicenseeType ? formData?.TradeDetails?.LicenseeType : { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" });

  const menu = [
    { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" },
    { i18nKey: "TL_COMMON_JOINT_PARTNERSHIP", code: "JOINT_PARTNERSHIP" },
    { i18nKey: "TL_COMMON_INSTITUTION", code: "INSTITUTION" },
  ];
  const storedAppData = null;
  const storedOwnerData = null;
  const initapplicant = () => {
    return [
      {
        appaadhaarno: "",
        appnameeng: "",
        appnamemal: "",
        appconame: "",
        appmobileno: "",
        appemail: "",
        applocality: "",
        appstreet: "",
        apphouseno: "",
        apphousename: "",
        appponame: "",
        appincode: ""
      }
    ]
  }

  const initowner = () => {
    return [
      {
        owneraadhaarno: "",
        ownernameeng: "",
        appmobileno: "",
        appemail: "",
        applocality: "",
        appstreet: "",
        apphouseno: "",
        apphousename: "",
        appponame: "",
        appincode: ""
      }
    ]
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_APPLICANT":
        return [
          ...state,
          {
            appaadhaarno: "",
            appnameeng: "",
            appnamemal: "",
            appconame: "",
            appmobileno: "",
            appemail: "",
            applocality: "",
            appstreet: "",
            apphouseno: "",
            apphousename: "",
            appponame: "",
            appincode: ""
          },
        ];
      case "REMOVE_APPLICANT":
        return state.filter((e, i) => i !== action?.payload?.index);
    }
  }

  const reducerowner = (state, action) => {
    switch (action.type) {
      case "ADD_OWNER":
        return [
          ...state,
          {
            owneraadhaarno: "",
            ownernameeng: "",
            appmobileno: "",
            appemail: "",
            applocality: "",
            appstreet: "",
            apphouseno: "",
            apphousename: "",
            appponame: "",
            appincode: ""
          },
        ];
      case "REMOVE_OWNER":
        return state.filter((e, i) => i !== action?.payload?.index);
    }
  }


  const [appState, dispatchapplicant] = useReducer(reducer, storedAppData, initapplicant);
  const [ownerState, disptachowner] = useReducer(reducerowner, storedOwnerData, initowner);

  function selectLicenseeType(value) {
    setLicenseeType(value);
  }



  const goNext = () => {
    let units = fields;
    // formData.TradeDetails.Units;    
    let unitsdata;

    unitsdata = { ...units, units: fields };
    onSelect(config.key, unitsdata);
  };

  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      {/* isDisabled={!fields[0].tradecategory || !fields[0].tradetype || !fields[0].tradesubtype} */}
      <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t}  >

        <div className="row">
          <div className="col-md-12" > <header className="card-header">New IFTE & OS License Application</header>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" > </h1>
          </div>
        </div> */}


        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Name and Address of Applicant</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <LabelFieldPair style={{ display: "flex" }}><CardLabel style={{ fontSize: "17px", width: "none !important" }}>{`${t("TL_LICENSEE_MSG")}`}</CardLabel>
              <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={licenseeType} onSelect={selectLicenseeType} style={{ marginTop: "8px", paddingLeft: "5px", height: "10px", display: "flex", }} />
            </LabelFieldPair>
          </div>
        </div>
        {(licenseeType.code === "INDIVIDUAL" || licenseeType.code === "JOINT_PARTNERSHIP") && (

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
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appaadhaarno" value={field.appaadhaarno} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appnameeng" value={field.appnameeng} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LICENSEE_NAME")}`}(Malayalam) <span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appnamemal" value={field.appnamemal} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appconame" value={field.appconame} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appmobileno" value={field.appmobileno} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appemail" value={field.appemail} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applocality" value={field.applocality} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="apphouseno" value={field.apphouseno} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="apphousename" value={field.apphousename} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appponame" value={field.appponame} />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appincode" value={field.appincode} />
                    </div>

                    {licenseeType.code === "JOINT_PARTNERSHIP" && (
                      <div>
                        {appState.length === (index + 1) && (
                          <div className="col-md-1">
                            <CardLabel>Add More</CardLabel>
                            <LinkButton
                              label={
                                <svg class="icon  icon--plus" viewBox="0 0 5 5" fill="green" width="50" height="50">
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

        {licenseeType.code === "INSTITUTION" && (
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
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="owneraadhaarno" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSING_INSTITUTION_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownernameeng" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSING_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appmobileno" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applocality" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applocality" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applocality" />
              </div>
              {/* </div>
              <div className="row"> */}
              <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicensingInstitutionAddress" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>Designated Person of the Licensing Unit</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
            <div className="row">

              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSEE_AADHAR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appaadhaarno" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appnameeng" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appnamemal" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appconame" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appmobileno" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appemail" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applocality" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="apphouseno" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="apphousename" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appponame" />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appincode" />
              </div>
              <div className="col-md-3">
              </div>
            </div>
</div>
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
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="owneraadhaarno" value={field.owneraadhaarno} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownernameeng" value={field.ownernameeng} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_LICENSEE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appmobileno" value={field.appmobileno} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="applocality" value={field.applocality} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_CONTACT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="apphouseno" value={field.apphouseno} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="apphousename" value={field.apphousename} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appstreet" value={field.appstreet} />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appponame" value={field.appponame} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <CardLabel>{`${t("TL_LOCALIZATION_DOOR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                    <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="appincode" value={field.appincode} />
                  </div>
                  {ownerState.length === (index + 1) && (
                    <div className="col-md-1">
                      <CardLabel>Add More</CardLabel>
                      <LinkButton
                        label={
                          <svg class="icon  icon--plus" viewBox="0 0 5 5" fill="green" width="50" height="50">
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


      </FormStep>

    </React.Fragment>
  );
};
export default TLLicenseApplicantDet;