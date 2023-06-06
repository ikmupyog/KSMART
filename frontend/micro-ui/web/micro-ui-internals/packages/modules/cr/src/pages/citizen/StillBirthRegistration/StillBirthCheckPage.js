import {
  Card, CardLabel, CardSubHeader, CardText, CitizenInfoLabel,
  LinkButton, Row, StatusTable, SubmitBar, BackButton, CheckBox, Toast, Accordion
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
//import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/SBRTimeline";
const ActionButton = ({ jumpTo }) => {
  const { t } = useTranslation();
  const history = useHistory();
  function routeTo() {
    sessionStorage.setItem("isDirectRenewal", false);
    history.push(jumpTo);
  }
  return (
    <LinkButton
      label={t("CS_COMMON_CHANGE")}
      className="check-page-link-button"
      style={jumpTo.includes("proof-of-identity") ? { textAlign: "right", marginTop: "-32px" } : {}}
      onClick={routeTo}
    />
  );
};
// const ActionButton = ({ jumpTo }) => {
//   const { t } = useTranslation();
//   const history = useHistory();
//   function routeTo() {
//     sessionStorage.setItem("isDirectRenewal", false);
//     history.push(jumpTo);
//   }
//   return (
//     <LinkButton
//       label={t("CS_COMMON_CHANGE")}
//       className="check-page-link-button"
//       style={jumpTo.includes("proof-of-identity") ? { textAlign: "right", marginTop: "-32px" } : {}}
//       onClick={routeTo}
//     />
//   );
// };

const getPath = (path, params) => {
  params &&
    Object.keys(params).map((key) => {
      path = path.replace(`:${key}`, params[key]);
    });
  return path;
};

const StillBirthCheckPage = ({ onSubmit, value, userType }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const [InitiatorDeclareError, setInitiatorDeclareError] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(false);
  const [toast, setToast] = useState(false);
  const locale = Digit.SessionStorage.get("locale");
  const {
    StillBirthChildDetails,
    StillBirthParentsDetails,
    AddressBirthDetails,
    StillBirthInitiatorDetails,
    StillBirthInformarDetails,
    InformarHosInstDetails,
  } = value;
  console.log(AddressBirthDetails);
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }
  // const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = "";
  // `/digit-ui/citizen/tl/tradelicence/${typeOfApplication}`;
  // if (window.location.href.includes("edit-application") || window.location.href.includes("renew-trade")) {
    routeLink = `${getPath(match.path, match.params)}`;
    routeLink = routeLink.replace("/check", "");
  // }

  if (window.location.href.includes("/citizen") == "citizen") {
    userType = "citizen";
  } else {
    userType = "employee";
  }
  function onStillBirthSubmit() {
    if (!isInitiatorDeclaration) {
      setInitiatorDeclareError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiatorDeclareError(false);
      onSubmit();
    }
  }
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };

  // useEffect(() => {
  //   if (isInitialRender) {
  //     if (formData?.InitiatorinfoDetails?.isInitiatorDeclaration != null) {
  //       setIsInitialRender(false);
  //       setisInitiatorDeclaration(formData?.InitiatorinfoDetails?.isInitiatorDeclaration);
  //     }
  //   }
  // }, [isInitialRender]);

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }

  const { roles: userRoles, } = Digit.UserService.getUser().info;
  const [isHospitalUser, setIsHospitalUser] = useState(false);
  useEffect(() => {
    console.log("userRoles", userRoles);
    if (userRoles.length > 0) {
      if (userRoles[0].code === "HOSPITAL_OPERATOR" || userRoles[0].code === "HOSPITAL_APPROVER" ||
        userRoles[0].code === "BND_LOCAL_REGISTRAR" || userRoles[0].code === "BND_SUB_REGISTRAR" || userRoles[0].code === "BND_DISTRICT_REGISTRAR") {
        setIsHospitalUser(true);
      } else {
        setIsHospitalUser(false);
      }
    }
  }, [userRoles]);
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{t("CR_STILLBIRTH_REG_SUMMARY_HEADING")}</CardSubHeader>
        <Accordion expanded={true} title={t("CR_BIRTH_CHILD_DETAILS")}
          content={<StatusTable >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_BIRTH_TIME")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>:{convertEpochToDate(StillBirthChildDetails?.childDOB)}</CardText>
                </div>
                </div>
                </div>
              <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_OF_BIRTH")}`} </CardText>
                </div>


                <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.displaytime ? StillBirthChildDetails?.displaytime + " " + StillBirthChildDetails?.displayAmPm : "NOT_RECORDED"}
                     
                    </CardText>
                  </div>
                  </div>
                  </div>
                {/* <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.birthDateTime ? StillBirthChildDetails?.birthDateTime : "NOT_RECORDED"}</CardText>
                </div> */}
                <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`} </CardText>
                </div>
               
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>:  {StillBirthChildDetails?.gender.code}</CardText>
                  </div>  
                  <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                  {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}</CardText>
                </div>             
               
              </div>
            </div>
          

          </StatusTable>}
        />
        <Accordion expanded={false} title={t("CR_BIRTH_PLACE_DETAILS")}
          content={<StatusTable >
            {StillBirthChildDetails?.birthPlace.code === "HOSPITAL" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "INSTITUTION" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSTITUTION_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "HOME" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_PLACE_HOME")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "VEHICLE" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_VEHICLE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PUBLIC_PLACE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PLACE_OF_BIRTH")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>:{StillBirthChildDetails?.birthPlace.name}</CardText>
                  {/* {<ActionButton jumpTo={`${routeLink}/StillBirthChildDetails`} />} */}
                </div>
              </div>
            </div>
        

      {StillBirthChildDetails?.birthPlace.code === "HOSPITAL" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>: {StillBirthChildDetails?.hospitalName.hospitalName}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_ML")}`} </CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          : {StillBirthChildDetails?.hospitalName.hospitalNamelocal}
                        </CardText>
                      </div>

                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                         {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}</CardText>
                       </div>  
                      {/* <div className="col-md-2">
                        {<ActionButton style={{ Colour: "red !important" }} jumpTo={`${routeLink}/stillbirth-child-details`} />}
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            {StillBirthChildDetails?.birthPlace.code === "INSTITUTION" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_TYPE")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>:{StillBirthChildDetails?.institution.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.institutionId.institutionName}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthChildDetails?.institutionId.institutionNamelocal}</CardText>
                      {/* <div className="col-md-2">
                      {<ActionButton jumpTo={`${ruteLink}/stillbirth-child-details`} />}
                      </div> */}
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                        {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}</CardText>
                   </div>                     
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "HOME" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>:{StillBirthChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.adrsPostOffice.name}</CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.adrsPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.adrsLocalityNameEn}</CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.adrsLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.adrsStreetNameEn}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.adrsStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthChildDetails?.adrsHouseNameEn}</CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.adrsHouseNameMl}</CardText>
                      {/* <div className="col-md-3">
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}
                      </div> */}
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}</CardText>
                      </div>  
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "VEHICLE" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TYPE")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.vehicleType.name}</CardText>
                    </div>
                    </div>
                    </div>
                    
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_REGISTRATION_NO")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.vehicleRegistrationNo}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.vehicleHaltPlace}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.vehicleFromEn}</CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.vehicleToEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.vehicleFromMl}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.vehicleToMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADMITTED_HOSPITAL_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.setadmittedHospitalEn.hospitalName}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleDesDetailsEn}</CardText>
                                       
                    </div>
                    <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                     {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}</CardText>
                    </div>  
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PUBLIC_PLACE_TYPE")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.publicPlaceType.name}</CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthChildDetails?.localityNameEn}</CardText>
                    </div>
                    </div>
                    </div>
                    
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.localityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthChildDetails?.streetNameEn}</CardText>
                    </div>
                    </div>
                    </div>
                  
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthChildDetails?.streetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthChildDetails?.publicPlaceDecpEn}</CardText>
                      
                    </div>
                    <div className="col-md-2">
                     <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                     {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}</CardText>
                    </div>    
                  </div>
                </div>
              </div>
            )}

          </StatusTable>}
        />
        <Accordion expanded={false} title={t("CR_STATISTICAL_DETAILS")}
          content={<StatusTable >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_BIRTH_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} </CardText>
                </div>
              
                <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>: {locale === "en_IN" ? StillBirthChildDetails?.medicalAttensionSub?.name : locale === "ml_IN" ? StillBirthChildDetails?.medicalAttensionSub?.namelocal : StillBirthChildDetails?.medicalAttensionSub?.name}</CardText>
                  </div>
                  </div>
                  </div>
                  <div className="row">
               <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PREGNANCY_DURATION")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthChildDetails?.pregnancyDuration}</CardText>
               
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DELIVERY_METHOD")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{locale === "en_IN" ? StillBirthChildDetails?.deliveryMethods?.name : locale === "ml_IN" ? StillBirthChildDetails?.deliveryMethods?.namelocal : StillBirthChildDetails?.deliveryMethods?.name}</CardText>
                  </div>  
                 <div className="col-md-4">
                 <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                 {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}</CardText>
               </div>              
              </div>
            </div>

          </StatusTable>}
        />
        <Accordion expanded={false} title={t("CR_PARENTS_DETAILS")}
          content={<StatusTable >

            <div className="row">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
            </div>
            {StillBirthParentsDetails?.isMotherInfo === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_INFORMATION_MISSING")}`} :</CardText>
                  </div>
                </div>
              </div>
            )}
            {StillBirthParentsDetails?.isMotherInfo === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthParentsDetails?.motherAadhar}</CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthParentsDetails?.motherFirstNameEn}</CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>:{StillBirthParentsDetails?.motherFirstNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>: {locale === "en_IN" ? StillBirthParentsDetails?.motherNationality?.nationalityname : locale === "ml_IN" ? StillBirthParentsDetails?.motherNationality?.nationalitynamelocal : StillBirthParentsDetails?.motherNationality?.nationalityname}</CardText>
                    </div>
                    
                  </div>
                </div>
               
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_AGE_BIRTH")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>: {StillBirthParentsDetails?.motherMarriageBirth}</CardText>
                    </div>                    
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EDUCATION")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{locale === "en_IN" ? StillBirthParentsDetails?.motherEducation?.name : locale === "ml_IN" ? StillBirthParentsDetails?.motherEducation?.namelocal : StillBirthParentsDetails?.motherEducation?.name}
                     </CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>:
                      {locale === "en_IN" ? StillBirthParentsDetails?.motherProfession?.name : locale === "ml_IN" ? StillBirthParentsDetails?.motherProfession?.namelocal : StillBirthParentsDetails?.motherProfession?.name}
                       </CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
            {StillBirthParentsDetails?.isFatherInfo === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_INFORMATION_MISSING")}`} :</CardText>
                  </div>
                </div>
              </div>
            )}
            {StillBirthParentsDetails?.isFatherInfo === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthParentsDetails?.fatherAadhar}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_EN")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthParentsDetails?.fatherFirstNameEn}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_ML")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>: {StillBirthParentsDetails?.fatherFirstNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {locale === "en_IN" ? StillBirthParentsDetails?.fatherNationality?.nationalityname : locale === "ml_IN" ? StillBirthParentsDetails?.fatherNationality?.nationalitynamelocal : StillBirthParentsDetails?.fatherNationality?.nationalityname}
                       </CardText>
                    </div>
                    </div>
                    </div>

                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EDUCATION")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {locale === "en_IN" ? StillBirthParentsDetails?.fatherEducation?.name : locale === "ml_IN" ? StillBirthParentsDetails?.fatherEducation?.namelocal : StillBirthParentsDetails?.fatherEducation?.name}
                        </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`}</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {locale === "en_IN" ? StillBirthParentsDetails?.fatherProfession?.name : locale === "ml_IN" ? StillBirthParentsDetails?.fatherProfession?.namelocal : StillBirthParentsDetails?.fatherProfession?.name}
                       </CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_FAMILY_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_RELIGION")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{locale === "en_IN" ? StillBirthParentsDetails?.Religion?.name : locale === "ml_IN" ? StillBirthParentsDetails?.Religion?.namelocal : StillBirthParentsDetails?.Religion?.name}</CardText>
                </div>
                </div>
                </div>

                <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PARENTS_CONTACT_NO")}`}</CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthParentsDetails?.fatherMobile}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PARENTS_EMAIL")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthParentsDetails?.fatherEmail} </CardText>
                
                </div>
                <div className="col-md-4">
                 <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
               {<ActionButton jumpTo={`${routeLink}/stillbirth-parents-details`} />}</CardText>
               </div>  
              </div>
            </div>

          </StatusTable>}
        />
<Accordion
expanded={false}
title={t("BIRTH_TIME_LINE_ADDRESS")}
content={
  <StatusTable>
    {AddressBirthDetails?.presentaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.presentaddressStateName?.code === "kl" && (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="summaryheadingh">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaDistrict?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaDistrict?.namelocal : AddressBirthDetails?.presentInsideKeralaDistrict?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaTaluk?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaTaluk?.namelocal : AddressBirthDetails?.presentInsideKeralaTaluk?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaVillage?.namelocal : AddressBirthDetails?.presentInsideKeralaVillage?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaLBName?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaLBName?.namelocal : AddressBirthDetails?.presentInsideKeralaLBName?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentWardNo.namecmb}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaPostOffice?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaPostOffice?.namelocal : AddressBirthDetails?.presentInsideKeralaPostOffice?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentInsideKeralaPincode}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentInsideKeralaLocalityNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentInsideKeralaLocalityNameMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentInsideKeralaStreetNameEn ? AddressBirthDetails?.presentInsideKeralaStreetNameEn : "NOT_RECORDED"}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentInsideKeralaStreetNameMl ? AddressBirthDetails?.presentInsideKeralaStreetNameMl : "NOT_RECORDED"}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentInsideKeralaHouseNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`}</CardText>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentInsideKeralaHouseNameMl}
              </CardText>
            </div>
           
            <div className="col-md-2">
             <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
              {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}</CardText>
          </div>  
          </div>
        </div>
      </div>
    )}
    {AddressBirthDetails?.presentaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.presentaddressStateName?.code != "kl" && (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="summaryheadingh">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_ADDRESS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.presentOutsideKeralaDistrict?.name : locale === "ml_IN" ? AddressBirthDetails?.presentOutsideKeralaDistrict?.namelocal : AddressBirthDetails?.presentOutsideKeralaDistrict?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaTaluk}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.presentOutsideKeralaVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.presentOutsideKeralaVillage?.namelocal : AddressBirthDetails?.presentOutsideKeralaVillage?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-2">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaCityVilgeEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaPostOfficeEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaPincode}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaLocalityNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaLocalityNameMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaStreetNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaStreetNameMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaHouseNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`}</CardText>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutsideKeralaHouseNameMl}
              </CardText>
            </div>
            <div className="col-md-2">
             <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
              {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}</CardText>
          </div>  
          </div>
        </div>
      </div>
    )}
    {AddressBirthDetails?.presentaddressCountry?.code != "COUNTRY_INDIA" && (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="summaryheadingh">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESE_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                {`${t("CR_STATE_REGION_PROVINCE_EN")}`}
              </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutSideIndiaProvinceEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                {`${t("CR_STATE_REGION_PROVINCE_ML")}`}
              </CardText>
            </div>
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.presentOutSideIndiaProvinceMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.presentOutSideIndiaadrsVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.presentOutSideIndiaadrsVillage?.namelocal : AddressBirthDetails?.presentOutSideIndiaadrsVillage?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              :{AddressBirthDetails?.presentOutSideIndiaadrsCityTown}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              : {AddressBirthDetails?.presentOutSideIndiaPostCode}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              : {AddressBirthDetails?.presentOutSideIndiaAdressEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              :  {AddressBirthDetails?.presentOutSideIndiaAdressMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              :  {AddressBirthDetails?.presentOutSideIndiaAdressEnB}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} </CardText>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              : {AddressBirthDetails?.presentOutSideIndiaAdressMlB}
              </CardText>
            </div>
            <div className="col-md-2">
             <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
              {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}</CardText>
          </div>  
          </div>
        </div>
      </div>
    )}
    {AddressBirthDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.permtaddressStateName?.code === "kl" && (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="summaryheadingh">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrDistrict?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrDistrict?.namelocal : AddressBirthDetails?.permntInKeralaAdrDistrict?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrTaluk?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrTaluk?.namelocal : AddressBirthDetails?.permntInKeralaAdrTaluk?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrVillage?.namelocal : AddressBirthDetails?.permntInKeralaAdrVillage?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrLBName?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrLBName?.namelocal : AddressBirthDetails?.permntInKeralaAdrLBName?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntInKeralaWardNo.namecmb}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrPostOffice?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrPostOffice?.namelocal : AddressBirthDetails?.permntInKeralaAdrPostOffice?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntInKeralaAdrPincode}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
               : {AddressBirthDetails?.permntInKeralaAdrLocalityNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntInKeralaAdrLocalityNameMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntInKeralaAdrStreetNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntInKeralaAdrStreetNameMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntInKeralaAdrHouseNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`}</CardText>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntInKeralaAdrHouseNameMl}
              </CardText>
            </div>
            <div className="col-md-2">
             <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
              {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}</CardText>
          </div>  
          </div>
        </div>
      </div>
    )}
    {AddressBirthDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.permtaddressStateName?.code != "kl" && (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="summaryheadingh">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_PERM_ADDRESS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.permntOutsideKeralaDistrict?.name : AddressBirthDetails?.permntOutsideKeralaDistrict?.namelocal}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaTaluk}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.permntOutsideKeralaVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.permntOutsideKeralaVillage?.namelocal : AddressBirthDetails?.permntOutsideKeralaVillage?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaCityVilgeEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaPostOfficeEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaPincode}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaLocalityNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaLocalityNameMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaStreetNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaStreetNameMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaHouseNameEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`}</CardText>
            </div>
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideKeralaHouseNameMl}
              </CardText>
            </div>
         
          <div className="col-md-4">
             <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
              {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}</CardText>
          </div>  
        </div>
      </div>
      </div>
    )}
    {AddressBirthDetails?.permtaddressCountry?.code != "COUNTRY_INDIA" && (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="summaryheadingh">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PER_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                {`${t("CR_STATE_REGION_PROVINCE_EN")}`}
              </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideIndiaprovinceEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                {`${t("CR_STATE_REGION_PROVINCE_ML")}`}
              </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideIndiaprovinceMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {locale === "en_IN" ? AddressBirthDetails?.permntOutsideIndiaVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.permntOutsideIndiaVillage?.namelocal : AddressBirthDetails?.permntOutsideIndiaVillage?.name}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideIndiaCityTown}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permanentOutsideIndiaPostCode}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideIndiaLineoneEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`}</CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideIndiaLineoneMl}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} </CardText>
            </div>
            <div className="col-md-8">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideIndiaLinetwoEn}
              </CardText>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} </CardText>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                : {AddressBirthDetails?.permntOutsideIndiaLinetwoMl}
              </CardText>
            </div>
            <div className="col-md-2">
             <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
              {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}</CardText>
          </div>  
          </div>
        </div>
      </div>
    )}
  </StatusTable>
}
/>
{StillBirthInitiatorDetails?.initiatorAadhar != null && (
    <div>
      <Accordion
        expanded={false}
        title={t("CR_INITIATOR_DETAILS")}
        content={
          <StatusTable>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            {StillBirthInitiatorDetails?.isGuardian === false && StillBirthInitiatorDetails?.isCaretaker === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {locale === "en_IN" ? StillBirthInitiatorDetails?.initiator?.name : locale === "ml_IN" ? StillBirthInitiatorDetails?.initiator?.namelocal : StillBirthInitiatorDetails?.initiator?.name}
                      </CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthInitiatorDetails?.initiatorAadhar}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`}  </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.initiatorNameEn}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.initiatorMobile}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.initiatorAddress}</CardText>
                      </div>
                    
                    <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}</CardText>
                  </div>  
                  </div>
                </div>
              </div>
            )}
            {StillBirthInitiatorDetails?.isGuardian === true && StillBirthInitiatorDetails?.isCaretaker === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :
                        {locale === "en_IN" ? StillBirthInitiatorDetails?.initiator?.name : locale === "ml_IN" ? StillBirthInitiatorDetails?.initiator?.namelocal : StillBirthInitiatorDetails?.initiator?.name}
                      </CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_RELATION")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :
                        {locale === "en_IN" ? StillBirthInitiatorDetails?.relation?.name : locale === "ml_IN" ? StillBirthInitiatorDetails?.relation?.namelocal : StillBirthInitiatorDetails?.relation?.name}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthInitiatorDetails?.initiatorAadhar}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthInitiatorDetails?.initiatorNameEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.initiatorMobile}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthInitiatorDetails?.initiatorAddress}</CardText>
                      </div>
                      <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}</CardText>
                  </div>  
                  </div>
                </div>
              </div>
            )}
            {StillBirthInitiatorDetails?.isGuardian === false && StillBirthInitiatorDetails?.isCaretaker === true && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : 
                        {locale === "en_IN" ? StillBirthInitiatorDetails?.initiator?.name : locale === "ml_IN" ? StillBirthInitiatorDetails?.initiator?.namelocal : StillBirthInitiatorDetails?.initiator?.name}
                      </CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.initiatorInstitutionName}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_DESIGNATION")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :
                        {locale === "en_IN" ? StillBirthInitiatorDetails?.initiatorDesi?.name : locale === "ml_IN" ? StillBirthInitiatorDetails?.initiatorDesi?.namelocal : StillBirthInitiatorDetails?.initiatorDesi?.name}
                      </CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.initiatorAadhar}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthInitiatorDetails?.initiatorNameEn}</CardText>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} </CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.initiatorMobile}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.initiatorAddress}</CardText>
                      </div>
                      <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}</CardText>
                  </div>  
                  </div>
                </div>
              </div>
            )}
          </StatusTable>
        }
      />

    </div>
  )}

  {StillBirthInformarDetails?.initiatorAadhar != null && isHospitalUser === true && (
    <div>
      <Accordion
        expanded={false}
        title={t("CR_INFORMER_VERIFICATION")}
        content={
          <StatusTable>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInformarDetails?.infomantAadhar}</CardText>
                </div>
                </div>
                </div>
                <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInformarDetails?.infomantFirstNameEn}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_DESIGNATION")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthInformarDetails?.informerDesi}</CardText>
                </div>
                </div>
                </div>
                <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthInformarDetails?.infomantMobile}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} </CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInformarDetails?.informerAddress}</CardText>
                 </div>
                
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}</CardText>
                  </div>  
              </div>
            </div>
          </StatusTable>
        }
      />
    </div>
  )}
 {isHospitalUser === true && (
    <Accordion
      expanded={false}
      title={t("CR_HOSPITAL_ADMISION_DETAILS")}
      content={
        <StatusTable>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSP_ADMISSION_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_IP_OP")}`} </CardText>
              </div>
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{locale === "en_IN" ? StillBirthInitiatorDetails?.ipopList?.name : locale === "ml_IN" ? StillBirthInitiatorDetails?.ipopList?.namelocal : StillBirthInitiatorDetails?.ipopList?.name}
                </CardText>
              </div>
              </div>
              </div>

              <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_IP_OP_NO")}`} </CardText>
              </div>
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> :{StillBirthInitiatorDetails?.ipopNumber}</CardText>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GYNC_REG_NO")}`} </CardText>
              </div>
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> : {StillBirthInitiatorDetails?.obstetricsNumber}</CardText>
                </div>
                

               <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "right", }}>
                {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}</CardText>
                  </div>  
            </div>
          </div>
        </StatusTable>      }
    />
  )}
   <div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="summaryheadingh">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
              // disable={isDisableEdit}
              />
            </div>
          </div>

          </div>
          </div>
        {toast && (
          <Toast
            error={InitiatorDeclareError}
            label={InitiatorDeclareError ? (InitiatorDeclareError ? t(`BIRTH_DECLARATION_CHOOSE`) : setToast(false)) : setToast(false)}
            onClose={() => setToast(false)}
          />
        )}
        {""}
         
          <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onStillBirthSubmit} disabled={!isInitiatorDeclaration} />
     

      </Card>
    </React.Fragment>
  );
};

export default StillBirthCheckPage;