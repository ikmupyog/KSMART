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
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{t("CR_REG_SUMMARY_HEADING")}</CardSubHeader>
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
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_BIRTH_TIME")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{convertEpochToDate(StillBirthChildDetails?.childDOB)}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_OF_BIRTH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.birthDateTime ? StillBirthChildDetails?.birthDateTime : "NA"}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.gender.code}</CardText>
                  {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}
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
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PLACE_OF_BIRTH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.birthPlace.name}</CardText>
                  {/* {<ActionButton jumpTo={`${routeLink}/StillBirthChildDetails`} />} */}
                </div>
              </div>
            </div>
            {StillBirthChildDetails?.birthPlace.code === "HOSPITAL" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.hospitalName.hospitalName}</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.hospitalName.hospitalNamelocal}</CardText>
                    {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "INSTITUTION" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.institution.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.institutionId.institutionName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.institutionId.institutionNamelocal}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "HOME" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.adrsPostOffice.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.adrsPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.adrsLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.adrsLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.adrsStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.adrsStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.adrsHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.adrsHouseNameMl}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "VEHICLE" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleType.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_REGISTRATION_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleRegistrationNo}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleHaltPlace}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleFromEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleToEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleFromMl}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleToMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADMITTED_HOSPITAL_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.setadmittedHospitalEn.hospitalName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.vehicleDesDetailsEn}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {StillBirthChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PUBLIC_PLACE_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.publicPlaceType.name}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.localityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.localityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.streetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.streetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.publicPlaceDecpEn}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}
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
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.medicalAttensionSub?.name}</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PREGNANCY_DURATION")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.pregnancyDuration}</CardText>
               
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DELIVERY_METHOD")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthChildDetails?.deliveryMethods.name}</CardText>
                  {<ActionButton jumpTo={`${routeLink}/stillbirth-child-details`} />}
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
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_INFORMATION_MISSING")}`} :</CardText>
                  </div>
                </div>
              </div>
            )}
            {StillBirthParentsDetails?.isMotherInfo === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherAadhar}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherFirstNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherFirstNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherNationality.nationalityname}</CardText>
                    </div>
                    {/* <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_MARITAL_STATUS")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherMaritalStatus.code}</CardText>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {/* <div className="col-md-8">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_AGE_MARRIAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherMarriageAge}</CardText>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_AGE_BIRTH")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherMarriageBirth}</CardText>
                    </div>
                    {/* <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ORDER_CURRENT_DELIVERY")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.orderofChildren}</CardText>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EDUCATION")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherEducation.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.motherProfession.name}</CardText>
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
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.fatherAadhar}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.fatherFirstNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.fatherFirstNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.fatherNationality.nationalityname}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EDUCATION")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.fatherEducation.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.fatherProfession.name}</CardText>
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
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_RELIGION")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.Religion.name}</CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PARENTS_CONTACT_NO")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.fatherMobile}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PARENTS_EMAIL")}`} :</CardText>
                </div>
                <div className="col-md-6">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthParentsDetails?.fatherEmail}</CardText>
                  {<ActionButton jumpTo={`${routeLink}/stillbirth-parents-details`} />}
                </div>
              </div>
            </div>

          </StatusTable>}
        />
        <Accordion expanded={false} title={t("BIRTH_TIME_LINE_ADDRESS")}

          content={<StatusTable >

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
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaDistrict.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaTaluk.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaVillage.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaLBName.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentWardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaPostOffice.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentInsideKeralaHouseNameMl}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}
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
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaDistrict.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaTaluk}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaVillage.i18nKey}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaCityVilgeEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaPostOfficeEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutsideKeralaHouseNameMl}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}
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
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaProvinceEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaProvinceMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaadrsVillage.i18nKey}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaadrsCityTown}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaPostCode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaAdressEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaAdressMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaAdressEnB}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.presentOutSideIndiaAdressMlB}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}
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
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrDistrict.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrTaluk.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrVillage.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrLBName.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaWardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrPostOffice.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntInKeralaAdrHouseNameMl}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}
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
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaDistrict.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaTaluk}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaVillage.i18nKey}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaCityVilgeEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaPostOfficeEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideKeralaHouseNameMl}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}
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
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideIndiaprovinceEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideIndiaprovinceMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideIndiaVillage.i18nKey}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideIndiaCityTown}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permanentOutsideIndiaPostCode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideIndiaLineoneEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideIndiaLineoneMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideIndiaLinetwoEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AddressBirthDetails?.permntOutsideIndiaLinetwoMl}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-address`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </StatusTable>}
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
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiator.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorAadhar}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorMobile}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorAddress}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {StillBirthInitiatorDetails?.isGuardian === true && StillBirthInitiatorDetails?.isCaretaker === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiator.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_RELATION")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.relation.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorAadhar}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorNameEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorMobile}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                    </div>
                    <div className="col-md-5">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorAddress}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {StillBirthInitiatorDetails?.isGuardian === false && StillBirthInitiatorDetails?.isCaretaker === true && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiator.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-5">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorInstitutionName}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_DESIGNATION")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorDesi.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorAadhar}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorNameEn}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorMobile}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.initiatorAddress}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}
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
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInformarDetails?.infomantAadhar}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInformarDetails?.infomantFirstNameEn}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_DESIGNATION")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInformarDetails?.informerDesi}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInformarDetails?.infomantMobile}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInformarDetails?.informerAddress}</CardText>
                  {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}
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
              <div className="col-md-2">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_IP_OP")}`} :</CardText>
              </div>
              <div className="col-md-2">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.ipopList?.name}</CardText>
              </div>
              <div className="col-md-2">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_IP_OP_NO")}`} :</CardText>
              </div>
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.ipopNumber}</CardText>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-2">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GYNC_REG_NO")}`} :</CardText>
              </div>
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{StillBirthInitiatorDetails?.obstetricsNumber}</CardText>
                {<ActionButton jumpTo={`${routeLink}/stillbirth-initiator-details`} />}
              </div>
            </div>
          </div>
        </StatusTable>
      }
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
