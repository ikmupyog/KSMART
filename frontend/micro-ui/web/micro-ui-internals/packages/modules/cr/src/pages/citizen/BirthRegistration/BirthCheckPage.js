import {
  Card,
  CardLabel,
  CardSubHeader,
  CardText,
  CitizenInfoLabel,
  LinkButton,
  Row,
  StatusTable,
  SubmitBar,
  BackButton,
  CheckBox,
  Toast,
  Accordion,
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
//import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/CRTimeline";

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

const getPath = (path, params) => {
  params &&
    Object.keys(params).map((key) => {
      path = path.replace(`:${key}`, params[key]);
    });
  return path;
};

const BirthCheckPage = ({ onSubmit, value, userType }) => {
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  const history = useHistory();
  const match = useRouteMatch();
  const [InitiatorDeclareError, setInitiatorDeclareError] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(false);
  const [toast, setToast] = useState(false);
  const { ChildDetails, ParentsDetails, AddressBirthDetails, InitiatorinfoDetails, InformarHosInstDetails } = value;
  // console.log(AddressBirthDetails);
  const uploadedImages = [ChildDetails.uploadedFile];
  useEffect(() => {
    if (uploadedImages?.length > 0) {
      fetchImage();
    }
  }, []);
  const [imagesThumbs, setImagesThumbs] = useState(null);
  const [imageZoom, setImageZoom] = useState(null);

  const fetchImage = async () => {
    setImagesThumbs(null);
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, Digit.ULBService.getStateId());
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
    });
    setImagesThumbs(newThumbnails);
  };
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
  function onBirthSubmit() {
    // && window.location.href.includes("/citizen")
    if (isInitiatorDeclaration === false) {
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
  //
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
    // console.log("userRoles", userRoles);
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
        <Accordion
          expanded={true}
          title={t("CR_BIRTH_CHILD_DETAILS")}
          content={
            <StatusTable>
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
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{convertEpochToDate(ChildDetails?.childDOB)}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_OF_BIRTH")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {ChildDetails?.birthDateTime ? ChildDetails?.birthDateTime : "NOT_RECORDED"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.gender.code}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_CHILD_AADHAAR")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.childAadharNo}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CHILD_INFO")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FIRST_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.childFirstNameEn}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MIDDLE_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.childMiddleNameEn}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LAST_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.childLastNameEn}</CardText>
                  </div>

                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FIRST_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.childFirstNameMl}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MIDDLE_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.childMiddleNameMl}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LAST_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.childLastNameMl}</CardText>
                    {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("CR_BIRTH_PLACE_DETAILS")}
          content={
            <StatusTable>
              {ChildDetails?.birthPlace.code === "HOSPITAL" && (
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
              {ChildDetails?.birthPlace.code === "INSTITUTION" && (
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
              {ChildDetails?.birthPlace.code === "HOME" && (
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
              {ChildDetails?.birthPlace.code === "VEHICLE" && (
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
              {ChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
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
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.birthPlace.name}</CardText>
                  </div>
                </div>
              </div>
              {ChildDetails?.birthPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.hospitalName.hospitalName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {ChildDetails?.hospitalName.hospitalNamelocal}
                      </CardText>
                      {<ActionButton style={{ Colour: "red !important" }} jumpTo={`${routeLink}/child-details`} />}
                    </div>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "INSTITUTION" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_TYPE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.institution.name}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {ChildDetails?.institutionId.institutionName}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {ChildDetails?.institutionId.institutionNamelocal}
                          {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "HOME" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.wardNo.namecmb}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.adrsPostOffice.name}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.adrsPincode}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.adrsLocalityNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.adrsLocalityNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.adrsStreetNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.adrsStreetNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.adrsHouseNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.adrsHouseNameMl}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "VEHICLE" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TYPE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.vehicleType.name}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_REGISTRATION_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.vehicleRegistrationNo}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.vehicleHaltPlace}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.vehicleFromEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.vehicleToEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.vehicleFromMl}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.vehicleToMl}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADMITTED_HOSPITAL_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {ChildDetails?.setadmittedHospitalEn.hospitalName}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.wardNo.namecmb}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                      </div>
                      <div className="col-md-9">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.vehicleDesDetailsEn}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PUBLIC_PLACE_TYPE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.publicPlaceType.name}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.wardNo.namecmb}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.localityNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.localityNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.streetNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.streetNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                      </div>
                      <div className="col-md-9">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.publicPlaceDecpEn}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("CR_STATISTICAL_DETAILS")}
          content={
            <StatusTable>
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
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {locale === "en_IN" ? ChildDetails?.medicalAttensionSub?.name : ChildDetails?.medicalAttensionSub?.namelocal}</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PREGNANCY_DURATION")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.pregnancyDuration}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DELIVERY_METHOD")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {locale === "en_IN" ? ChildDetails?.deliveryMethods?.name : ChildDetails?.deliveryMethods?.namelocal}</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BIRTH_WEIGHT")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.birthWeight}</CardText>
                    {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("CR_PARENTS_DETAILS")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              {ParentsDetails?.isMotherInfo === true && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {`${t("CR_MOTHER_INFORMATION_MISSING")}`} :
                      </CardText>
                      {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
                    </div>
                  </div>
                </div>
              )}
              {ParentsDetails?.isMotherInfo === false && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.motherAadhar}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.motherFirstNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.motherFirstNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? ParentsDetails?.motherNationality?.nationalityname : ParentsDetails?.motherNationality?.nationalitynamelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_MARITAL_STATUS")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? ParentsDetails?.motherMaritalStatus?.name : ParentsDetails?.motherMaritalStatus?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-10">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_AGE_MARRIAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.motherMarriageAge}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-5">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_AGE_BIRTH")}`} :</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.motherMarriageBirth}</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ORDER_CURRENT_DELIVERY")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.orderofChildren}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EDUCATION")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? ParentsDetails?.motherEducation?.name : ParentsDetails?.motherEducation?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? ParentsDetails?.motherProfession?.name : ParentsDetails?.motherProfession?.namelocal}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
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
              {ParentsDetails?.isFatherInfo === true && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {`${t("CR_FATHER_INFORMATION_MISSING")}`} :
                      </CardText>
                      {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
                    </div>
                  </div>
                </div>
              )}
              {ParentsDetails?.isFatherInfo === false && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.fatherAadhar}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.fatherFirstNameEn}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.fatherFirstNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? ParentsDetails?.fatherNationality?.nationalityname : ParentsDetails?.fatherNationality?.nationalitynamelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EDUCATION")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? ParentsDetails?.fatherEducation?.name : ParentsDetails?.fatherEducation?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? ParentsDetails?.fatherProfession?.name : ParentsDetails?.fatherProfession?.namelocal}
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
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_RELIGION")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {locale === "en_IN" ? ParentsDetails?.Religion?.name : ParentsDetails?.Religion?.namelocal}
                    </CardText>
                  </div>
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PARENTS_CONTACT_NO")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.fatherMobile}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PARENTS_EMAIL")}`} :</CardText>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ParentsDetails?.fatherEmail}</CardText>
                    {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
                  </div>
                </div>
              </div>
            </StatusTable>
          }
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
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaDistrict?.name : AddressBirthDetails?.presentInsideKeralaDistrict?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaTaluk?.name : AddressBirthDetails?.presentInsideKeralaTaluk?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaVillage?.name : AddressBirthDetails?.presentInsideKeralaVillage?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaLBName?.name : AddressBirthDetails?.presentInsideKeralaLBName?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentWardNo.namecmb}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaPostOffice?.name : AddressBirthDetails?.presentInsideKeralaPostOffice?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaHouseNameMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/address-birth`} />}
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.presentOutsideKeralaDistrict?.name : AddressBirthDetails?.presentOutsideKeralaDistrict?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaTaluk}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.presentOutsideKeralaVillage?.name : AddressBirthDetails?.presentOutsideKeralaVillage?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaCityVilgeEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaHouseNameMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/address-birth`} />}
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaProvinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaProvinceMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.presentOutSideIndiaadrsVillage?.name : AddressBirthDetails?.presentOutSideIndiaadrsVillage?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaadrsCityTown}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaPostCode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressEnB}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressMlB}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/address-birth`} />}
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrDistrict?.name : AddressBirthDetails?.permntInKeralaAdrDistrict?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrTaluk?.name : AddressBirthDetails?.permntInKeralaAdrTaluk?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrVillage?.name : AddressBirthDetails?.permntInKeralaAdrVillage?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrLBName?.name : AddressBirthDetails?.permntInKeralaAdrLBName?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaWardNo.namecmb}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrPostOffice?.name : AddressBirthDetails?.permntInKeralaAdrPostOffice?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrHouseNameMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/address-birth`} />}
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.permntOutsideKeralaDistrict?.name : AddressBirthDetails?.permntOutsideKeralaDistrict?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaTaluk}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.permntOutsideKeralaVillage?.name : AddressBirthDetails?.permntOutsideKeralaVillage?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaCityVilgeEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaHouseNameMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/address-birth`} />}
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaprovinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaprovinceMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN" ? AddressBirthDetails?.permntOutsideIndiaVillage?.name : AddressBirthDetails?.permntOutsideIndiaVillage?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaCityTown}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permanentOutsideIndiaPostCode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLineoneEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLineoneMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLinetwoEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLinetwoMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/address-birth`} />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </StatusTable>
          }
        />
        {ChildDetails?.proceedNoRDO != null && ChildDetails?.regNoNAC != null && (
          <Accordion
            expanded={false}
            title={t("CR_DOCUMENTS")}
            content={
              <StatusTable>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_RDO_PROCEED_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.proceedNoRDO}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAC_REG_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ChildDetails?.regNoNAC}</CardText>
                    </div>
                  </div>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                    <div className="col-md-12">
                      <div className="col-md-12">
                        <h1 className="summaryheadingh">
                          <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAC_CERTIFICATE_UPLOAD")}`}</span>{" "}
                        </h1>
                      </div>
                    </div>
                  </div>
                )}
                {uploadedImages.length > 0 && (
                  <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                    <div
                      className="col-md-12"
                      style={{
                        display: "flex",
                        marginLeft: "15px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {imagesThumbs &&
                        imagesThumbs.map((thumbnail, index) => {
                          return (
                            <div key={index}>
                              {thumbnail.type == "pdf" ? (
                                <React.Fragment>
                                  <object
                                    style={{ height: "120px", cursor: "zoom-in", margin: "5px" }}
                                    height={120}
                                    data={thumbnail.pdfUrl}
                                    alt={`upload-thumbnails-${index}`}
                                  />
                                </React.Fragment>
                              ) : (
                                <img
                                  style={{ height: "120px", cursor: "zoom-in", margin: "5px" }}
                                  height={120}
                                  src={thumbnail.small}
                                  alt={`upload-thumbnails-${index}`}
                                  onClick={() => setImageZoom(thumbnail.large)}
                                />
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>

                )}
              </StatusTable>
            }
          />
        )}
        {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={() => setImageZoom(null)} /> : null}

        {InitiatorinfoDetails?.initiatorAadhar != null && (
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
                  {InitiatorinfoDetails?.isGuardian === false && InitiatorinfoDetails?.isCaretaker === false && (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} :</CardText>
                          </div>
                          <div className="col-md-3">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                              {locale === "en_IN" ? InitiatorinfoDetails?.initiator?.name : InitiatorinfoDetails?.initiator?.namelocal}
                            </CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorAadhar}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                          </div>
                          <div className="col-md-4">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorNameEn}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorMobile}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-3">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                          </div>
                          <div className="col-md-9">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorAddress}</CardText>
                            {<ActionButton jumpTo={`${routeLink}/initiator-details`} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {InitiatorinfoDetails?.isGuardian === true && InitiatorinfoDetails?.isCaretaker === false && (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} :</CardText>
                          </div>
                          <div className="col-md-3">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                              {locale === "en_IN" ? InitiatorinfoDetails?.initiator?.name : InitiatorinfoDetails?.initiator?.namelocal}
                            </CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_RELATION")}`} :</CardText>
                          </div>
                          <div className="col-md-3">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                              {locale === "en_IN" ? InitiatorinfoDetails?.relation?.name : InitiatorinfoDetails?.relation?.namelocal}
                            </CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorAadhar}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                          </div>
                          <div className="col-md-4">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorNameEn}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorMobile}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                          </div>
                          <div className="col-md-5">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorAddress}</CardText>
                            {<ActionButton jumpTo={`${routeLink}/initiator-details`} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {InitiatorinfoDetails?.isGuardian === false && InitiatorinfoDetails?.isCaretaker === true && (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR")}`} :</CardText>
                          </div>
                          <div className="col-md-3">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                              {locale === "en_IN" ? InitiatorinfoDetails?.initiator?.name : InitiatorinfoDetails?.initiator?.namelocal}
                            </CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME")}`} :</CardText>
                          </div>
                          <div className="col-md-5">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorInstitutionName}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-3">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_DESIGNATION")}`} :</CardText>
                          </div>
                          <div className="col-md-4">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                              {locale === "en_IN" ? InitiatorinfoDetails?.initiatorDesi?.name : InitiatorinfoDetails?.initiatorDesi?.namelocal}
                            </CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorAadhar}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                          </div>
                          <div className="col-md-4">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorNameEn}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorMobile}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-3">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                          </div>
                          <div className="col-md-9">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.initiatorAddress}</CardText>
                            {<ActionButton jumpTo={`${routeLink}/initiator-details`} />}
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

        {InformarHosInstDetails?.initiatorAadhar != null && isHospitalUser === true && (
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformarHosInstDetails?.infomantAadhar}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformarHosInstDetails?.infomantFirstNameEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_DESIGNATION")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformarHosInstDetails?.informerDesi}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformarHosInstDetails?.infomantMobile}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformarHosInstDetails?.informerAddress}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/initiator-details`} />}
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
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {locale === "en_IN" ? InitiatorinfoDetails?.ipopList?.name : InitiatorinfoDetails?.ipopList?.namelocal}
                      </CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_IP_OP_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.ipopNumber}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GYNC_REG_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InitiatorinfoDetails?.obstetricsNumber}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/initiator-details`} />}
                    </div>
                  </div>
                </div>
              </StatusTable>
            }
          />
        )}
        {/* {window.location.href.includes("/citizen") && ( */}
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
        {/* )} */}

        {toast && (
          <Toast
            error={InitiatorDeclareError}
            label={InitiatorDeclareError ? (InitiatorDeclareError ? t(`BIRTH_DECLARATION_CHOOSE`) : setToast(false)) : setToast(false)}
            onClose={() => setToast(false)}
          />
        )}
        {""}
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onBirthSubmit} disabled={!isInitiatorDeclaration} />
        {/* disabled={!isInitiatorDeclaration } */}
      </Card>
    </React.Fragment>
  );
};

export default BirthCheckPage;
