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
    // sessionStorage.setItem("isDirectRenewal", false);
    history.push(jumpTo);
  }
  return (
    <LinkButton
      label={t("CS_COMMON_CHANGE")}
      className="check-page-link-button"
      style={jumpTo.includes("proof-of-identity") ? { background: "#D7E1F1", borderRadius: "30px" } : { background: "#D7E1F1", borderRadius: "30px" }}
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
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <CardSubHeader style={{ marginLeft: "18px", marginBottom: "16px", fontSize: "16px", color: "#00377B" }}>{t("CR_REG_SUMMARY_HEADING")}</CardSubHeader>
        <Accordion
          expanded={true}
          title={t("CR_BIRTH_CHILD_DETAILS")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading" >{`${t("CR_DATE_OF_BIRTH_TIME")}`} </CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">: {convertEpochToDate(ChildDetails?.childDOB)}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_TIME_OF_BIRTH")}`}</CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">
                      : {ChildDetails?.displaytime ? ChildDetails?.displaytime + " " + ChildDetails?.displayAmPm : "NOT_RECORDED"}
                      {/* {ChildDetails?.birthDateTime ? ChildDetails?.birthDateTime : "NOT_RECORDED"} */}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_GENDER")}`} </CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">: {ChildDetails?.gender.code}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CS_COMMON_CHILD_AADHAAR")}`}</CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">: {ChildDetails?.childAadharNo ? ChildDetails?.childAadharNo : "NOT_RECORDED"}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff" }}>{`${t("CR_CHILD_INFO")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_CHILD_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-6">
                    <CardText className="summarySubHeading">: {ChildDetails?.childFirstNameEn ? ChildDetails?.childFirstNameEn + " " + ChildDetails?.childMiddleNameEn
                      + " " + ChildDetails?.childLastNameEn + " / " + ChildDetails?.childFirstNameMl + " " + ChildDetails?.childMiddleNameMl + " " +
                      ChildDetails?.childLastNameMl : "NOT_RECORDED"}</CardText>
                  </div>

                  {/* <div className="col-md-2">
                    <CardText className="summaryHeading">{`${t("CR_MIDDLE_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText className="summaryHeading">{ChildDetails?.childMiddleNameEn}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText className="summaryHeading">{`${t("CR_LAST_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText className="summaryHeading">{ChildDetails?.childLastNameEn}</CardText>
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                </div>
              </div>
              {/* <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_FIRST_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summaryHeading">{ChildDetails?.childFirstNameMl}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText className="summaryHeading">{`${t("CR_MIDDLE_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText className="summaryHeading">{ChildDetails?.childMiddleNameMl}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText className="summaryHeading">{`${t("CR_LAST_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText className="summaryHeading">{ChildDetails?.childLastNameMl}</CardText>
                    {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                  </div>
                </div>
              </div> */}
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
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff" }}>{`${t("CR_INSTITUTION_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff" }}>{`${t("CR_BIRTH_PLACE_HOME")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff" }}>{`${t("CR_BIRTH_VEHICLE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff" }}>{`${t("CR_PUBLIC_PLACE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_PLACE_OF_BIRTH")}`}</CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">: {ChildDetails?.birthPlace.name}</CardText>
                  </div>
                </div>
              </div>
              {ChildDetails?.birthPlace.code === "HOSPITAL" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOSPITAL_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ChildDetails?.hospitalName.hospitalName}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOSPITAL_ML")}`} </CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {ChildDetails?.hospitalName.hospitalNamelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                    </div>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "INSTITUTION" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_INSTITUTION_TYPE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ChildDetails?.institution.name}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_INSTITUTION_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {ChildDetails?.institutionId.institutionName}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_INSTITUTION_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {ChildDetails?.institutionId.institutionNamelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                    </div>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "HOME" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.wardNo.namecmb}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.adrsPostOffice.name}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.adrsPincode}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.adrsLocalityNameEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.adrsLocalityNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.adrsStreetNameEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.adrsStreetNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.adrsHouseNameEn}</CardText>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.adrsHouseNameMl}</CardText>
                        {/* {<ActionButton jumpTo={`${routeLink}/child-details`} />} */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                    </div>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "VEHICLE" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_VEHICLE_TYPE")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.vehicleType.name}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_VEHICLE_REGISTRATION_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.vehicleRegistrationNo}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">
                          {`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.vehicleHaltPlace}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_VEHICLE_FROM_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.vehicleFromEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_VEHICLE_TO_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.vehicleToEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_VEHICLE_FROM_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.vehicleFromMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_VEHICLE_TO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.vehicleToMl}</CardText>
                        {/* {<ActionButton jumpTo={`${routeLink}/child-details`} />} */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADMITTED_HOSPITAL_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          {ChildDetails?.setadmittedHospitalEn.hospitalName}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.wardNo.namecmb}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_DESCRIPTION")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.vehicleDesDetailsEn}</CardText>
                        {/* {<ActionButton jumpTo={`${routeLink}/child-details`} />} */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                    </div>
                  </div>
                </div>
              )}
              {ChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_PUBLIC_PLACE_TYPE")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.publicPlaceType.name}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.wardNo.namecmb}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.localityNameEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.localityNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.streetNameEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.streetNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_DESCRIPTION")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">{ChildDetails?.publicPlaceDecpEn}</CardText>
                        {/* {<ActionButton jumpTo={`${routeLink}/child-details`} />} */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {<ActionButton jumpTo={`${routeLink}/child-details`} />}
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
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff" }}>{`${t("CR_ADDIONAL_BIRTH_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}</CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">
                      : {locale === "en_IN" ? ChildDetails?.medicalAttensionSub?.name : locale === "ml_IN" ? ChildDetails?.medicalAttensionSub?.namelocal : ChildDetails?.medicalAttensionSub?.name}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_PREGNANCY_DURATION")}`} </CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">: {ChildDetails?.pregnancyDuration}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_DELIVERY_METHOD")}`}</CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">
                      : {locale === "en_IN" ? ChildDetails?.deliveryMethods?.name : locale === "ml_IN" ? ChildDetails?.deliveryMethods?.namelocal : ChildDetails?.deliveryMethods?.name}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_BIRTH_WEIGHT")}`}</CardText>
                  </div>
                  <div className="col-md-6">
                    <CardText className="summarySubHeading">: {ChildDetails?.birthWeight}</CardText>
                  </div>
                  {/* <div className="col-md-2">
                    {<ActionButton jumpTo={`${routeLink}/child-details`} />}
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {<ActionButton jumpTo={`${routeLink}/child-details`} />}
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
                    <span style={{ background: "#fff" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              {ParentsDetails?.isMotherInfo === true && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-10">
                      <CardText className="summaryHeading">
                        {`${t("CR_MOTHER_INFORMATION_MISSING")}`} :
                      </CardText>
                    </div>
                    {/* <div className="col-md-2">
                      {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
                    </div> */}
                  </div>
                </div>

              )}
              {ParentsDetails?.isMotherInfo === false && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_AADHAAR")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ParentsDetails?.motherAadhar}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_MOTHER_NAME_EN")}`} </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ParentsDetails?.motherFirstNameEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_MOTHER_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ParentsDetails?.motherFirstNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_NATIONALITY")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? ParentsDetails?.motherNationality?.nationalityname : locale === "ml_IN" ? ParentsDetails?.motherNationality?.nationalitynamelocal : ParentsDetails?.motherNationality?.nationalityname}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_MOTHER_MARITAL_STATUS")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? ParentsDetails?.motherMaritalStatus?.name : locale === "ml_IN" ? ParentsDetails?.motherMaritalStatus?.namelocal : ParentsDetails?.motherMaritalStatus?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_MOTHER_AGE_MARRIAGE")}`} </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ParentsDetails?.motherMarriageAge}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_MOTHER_AGE_BIRTH")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ParentsDetails?.motherMarriageBirth}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ORDER_CURRENT_DELIVERY")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ParentsDetails?.orderofChildren}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_EDUCATION")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? ParentsDetails?.motherEducation?.name : locale === "ml_IN" ? ParentsDetails?.motherEducation?.namelocal : ParentsDetails?.motherEducation?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_PROFESSIONAL")}`}</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? ParentsDetails?.motherProfession?.name : locale === "ml_IN" ? ParentsDetails?.motherProfession?.namelocal : ParentsDetails?.motherProfession?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>

                </div>
              )}
              <div className="row">
                <div className="col-md-12">
                  {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff" }}>{`${t("CR_FATHER_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              {ParentsDetails?.isFatherInfo === true && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-10">
                      <CardText className="summaryHeading">
                        {`${t("CR_FATHER_INFORMATION_MISSING")}`} :
                      </CardText>
                    </div>
                  </div>
                </div>
              )}
              {ParentsDetails?.isFatherInfo === false && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_AADHAAR")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ParentsDetails?.fatherAadhar}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_FATHER_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">: {ParentsDetails?.fatherFirstNameEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_FATHER_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading"> : {ParentsDetails?.fatherFirstNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_NATIONALITY")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? ParentsDetails?.fatherNationality?.nationalityname : locale === "ml_IN" ? ParentsDetails?.fatherNationality?.nationalitynamelocal : ParentsDetails?.fatherNationality?.nationalityname}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_EDUCATION")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? ParentsDetails?.fatherEducation?.name : locale === "ml_IN" ? ParentsDetails?.fatherEducation?.namelocal : ParentsDetails?.fatherEducation?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_PROFESSIONAL")}`}</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? ParentsDetails?.fatherProfession?.name : locale === "ml_IN" ? ParentsDetails?.fatherProfession?.namelocal : ParentsDetails?.fatherProfession?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-md-12">
                  {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff" }}>{`${t("CR_ADDIONAL_FAMILY_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CS_COMMON_RELIGION")}`}</CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">
                      : {locale === "en_IN" ? ParentsDetails?.Religion?.name : locale === "ml_IN" ? ParentsDetails?.Religion?.namelocal : ParentsDetails?.Religion?.name}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_PARENTS_CONTACT_NO")}`}</CardText>
                  </div>
                  <div className="col-md-8">
                    <CardText className="summarySubHeading">: {ParentsDetails?.fatherMobile}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText className="summaryHeading">{`${t("CR_PARENTS_EMAIL")}`}</CardText>
                  </div>
                  <div className="col-md-6">
                    <CardText className="summarySubHeading">: {ParentsDetails?.fatherEmail}</CardText>
                  </div>
                  {/* <div className="col-md-2">
                    {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {<ActionButton jumpTo={`${routeLink}/parents-details`} />}
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
                        <span style={{ background: "#fff" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_DISTRICT")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaDistrict?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaDistrict?.namelocal : AddressBirthDetails?.presentInsideKeralaDistrict?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_TALUK")}`} </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaTaluk?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaTaluk?.namelocal : AddressBirthDetails?.presentInsideKeralaTaluk?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_VILLAGE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaVillage?.namelocal : AddressBirthDetails?.presentInsideKeralaVillage?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_LB_NAME")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaLBName?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaLBName?.namelocal : AddressBirthDetails?.presentInsideKeralaLBName?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_WARD")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentWardNo.namecmb}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_POST_OFFICE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.presentInsideKeralaPostOffice?.name : locale === "ml_IN" ? AddressBirthDetails?.presentInsideKeralaPostOffice?.namelocal : AddressBirthDetails?.presentInsideKeralaPostOffice?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_PIN_CODE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentInsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentInsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentInsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentInsideKeralaStreetNameEn ? AddressBirthDetails?.presentInsideKeralaStreetNameEn : "NOT_RECORDED"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentInsideKeralaStreetNameMl ? AddressBirthDetails?.presentInsideKeralaStreetNameMl : "NOT_RECORDED"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentInsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentInsideKeralaHouseNameMl}
                        </CardText>
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
                        <span style={{ background: "#fff" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_ADDRESS")}`}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_DISTRICT")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.presentOutsideKeralaDistrict?.name : locale === "ml_IN" ? AddressBirthDetails?.presentOutsideKeralaDistrict?.namelocal : AddressBirthDetails?.presentOutsideKeralaDistrict?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_TALUK_TEHSIL")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaTaluk}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_TOWN_VILLAGE_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.presentOutsideKeralaVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.presentOutsideKeralaVillage?.namelocal : AddressBirthDetails?.presentOutsideKeralaVillage?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText className="summaryHeading">{`${t("CR_CITY_VILLAGE_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaCityVilgeEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_POST_OFFICE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_PIN_CODE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_EN")}`} </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutsideKeralaHouseNameMl}
                        </CardText>
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
                        <span style={{ background: "#fff" }}>{`${t("CR_PRESE_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                        </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutSideIndiaProvinceEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`}
                        </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.presentOutSideIndiaProvinceMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_TOWN_VILLAGE_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.presentOutSideIndiaadrsVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.presentOutSideIndiaadrsVillage?.namelocal : AddressBirthDetails?.presentOutSideIndiaadrsVillage?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          {AddressBirthDetails?.presentOutSideIndiaadrsCityTown}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ZIP_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          {AddressBirthDetails?.presentOutSideIndiaPostCode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          {AddressBirthDetails?.presentOutSideIndiaAdressEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          {AddressBirthDetails?.presentOutSideIndiaAdressMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          {AddressBirthDetails?.presentOutSideIndiaAdressEnB}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          {AddressBirthDetails?.presentOutSideIndiaAdressMlB}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-md-12">
                  {<ActionButton jumpTo={`${routeLink}/address-birth`} />}
                </div>
              </div>
              {AddressBirthDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.permtaddressStateName?.code === "kl" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_DISTRICT")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrDistrict?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrDistrict?.namelocal : AddressBirthDetails?.permntInKeralaAdrDistrict?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_TALUK")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrTaluk?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrTaluk?.namelocal : AddressBirthDetails?.permntInKeralaAdrTaluk?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_VILLAGE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrVillage?.namelocal : AddressBirthDetails?.permntInKeralaAdrVillage?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_LB_NAME")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrLBName?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrLBName?.namelocal : AddressBirthDetails?.permntInKeralaAdrLBName?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_WARD")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntInKeralaWardNo.namecmb}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_POST_OFFICE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.permntInKeralaAdrPostOffice?.name : locale === "ml_IN" ? AddressBirthDetails?.permntInKeralaAdrPostOffice?.namelocal : AddressBirthDetails?.permntInKeralaAdrPostOffice?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_PIN_CODE")}`} </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntInKeralaAdrPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          {AddressBirthDetails?.permntInKeralaAdrLocalityNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntInKeralaAdrLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntInKeralaAdrStreetNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntInKeralaAdrStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntInKeralaAdrHouseNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntInKeralaAdrHouseNameMl}
                        </CardText>
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
                        <span style={{ background: "#fff" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_PERM_ADDRESS")}`}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_DISTRICT")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.permntOutsideKeralaDistrict?.name : AddressBirthDetails?.permntOutsideKeralaDistrict?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_TALUK_TEHSIL")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaTaluk}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_TOWN_VILLAGE_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.permntOutsideKeralaVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.permntOutsideKeralaVillage?.namelocal : AddressBirthDetails?.permntOutsideKeralaVillage?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_CITY_VILLAGE_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaCityVilgeEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_POST_OFFICE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_PIN_CODE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_LOCALITY_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_STREET_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_HOUSE_NAME_ML")}`}</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideKeralaHouseNameMl}
                        </CardText>
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
                        <span style={{ background: "#fff" }}>{`${t("CR_PER_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                        </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideIndiaprovinceEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`}
                        </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideIndiaprovinceMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_TOWN_VILLAGE_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {locale === "en_IN" ? AddressBirthDetails?.permntOutsideIndiaVillage?.name : locale === "ml_IN" ? AddressBirthDetails?.permntOutsideIndiaVillage?.namelocal : AddressBirthDetails?.permntOutsideIndiaVillage?.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_CITY_TOWN_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideIndiaCityTown}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ZIP_CODE")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permanentOutsideIndiaPostCode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADDRES_LINE_ONE_EN")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideIndiaLineoneEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADDRES_LINE_ONE_ML")}`}</CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideIndiaLineoneMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADDRES_LINE_TWO_EN")}`} </CardText>
                      </div>
                      <div className="col-md-8">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideIndiaLinetwoEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardText className="summaryHeading">{`${t("CR_ADDRES_LINE_TWO_ML")}`} </CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText className="summarySubHeading">
                          : {AddressBirthDetails?.permntOutsideIndiaLinetwoMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-md-12">
                  {<ActionButton jumpTo={`${routeLink}/address-birth`} />}
                </div>
              </div>
            </StatusTable>
          }
        />
        {ChildDetails?.UploadNACHIde === true && (
          <Accordion
            expanded={false}
            title={t("CR_DOCUMENTS")}
            content={
              <StatusTable>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText className="summaryHeading">{`${t("CR_RDO_PROCEED_NO")}`}</CardText>
                    </div>
                    <div className="col-md-8">
                      <CardText className="summarySubHeading">: {ChildDetails?.proceedNoRDO}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText className="summaryHeading">{`${t("CR_NAC_REG_NO")}`} </CardText>
                    </div>
                    <div className="col-md-8">
                      <CardText className="summarySubHeading">: {ChildDetails?.regNoNAC}</CardText>
                    </div>
                  </div>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff" }}>{`${t("CR_NAC_CERTIFICATE_UPLOAD")}`}</span>{" "}
                      </h1>
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
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  {InitiatorinfoDetails?.isGuardian === false && InitiatorinfoDetails?.isCaretaker === false && (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INITIATOR")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">
                              : {locale === "en_IN" ? InitiatorinfoDetails?.initiator?.name : locale === "ml_IN" ? InitiatorinfoDetails?.initiator?.namelocal : InitiatorinfoDetails?.initiator?.name}
                            </CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CS_COMMON_AADHAAR")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorAadhar}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INITIATOR_NAME")}`} </CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorNameEn}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_MOBILE_NO")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorMobile}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INFORMER_ADDRESS")}`}</CardText>
                          </div>
                          <div className="col-md-6">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorAddress}</CardText>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {InitiatorinfoDetails?.isGuardian === true && InitiatorinfoDetails?.isCaretaker === false && (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INITIATOR")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">
                              : {locale === "en_IN" ? InitiatorinfoDetails?.initiator?.name : locale === "ml_IN" ? InitiatorinfoDetails?.initiator?.namelocal : InitiatorinfoDetails?.initiator?.name}
                            </CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_RELATION")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">
                              : {locale === "en_IN" ? InitiatorinfoDetails?.relation?.name : locale === "ml_IN" ? InitiatorinfoDetails?.relation?.namelocal : InitiatorinfoDetails?.relation?.name}
                            </CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CS_COMMON_AADHAAR")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorAadhar}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INITIATOR_NAME")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorNameEn}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_MOBILE_NO")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorMobile}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INFORMER_ADDRESS")}`}</CardText>
                          </div>
                          <div className="col-md-6">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorAddress}</CardText>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {InitiatorinfoDetails?.isGuardian === false && InitiatorinfoDetails?.isCaretaker === true && (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INITIATOR")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">
                              : {locale === "en_IN" ? InitiatorinfoDetails?.initiator?.name : locale === "ml_IN" ? InitiatorinfoDetails?.initiator?.namelocal : InitiatorinfoDetails?.initiator?.name}
                            </CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INSTITUTION_NAME")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorInstitutionName}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INSTITUTION_NAME_DESIGNATION")}`} </CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">
                              : {locale === "en_IN" ? InitiatorinfoDetails?.initiatorDesi?.name : locale === "ml_IN" ? InitiatorinfoDetails?.initiatorDesi?.namelocal : InitiatorinfoDetails?.initiatorDesi?.name}
                            </CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CS_COMMON_AADHAAR")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorAadhar}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INITIATOR_NAME")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorNameEn}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_MOBILE_NO")}`}</CardText>
                          </div>
                          <div className="col-md-8">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorMobile}</CardText>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-4">
                            <CardText className="summaryHeading">{`${t("CR_INFORMER_ADDRESS")}`}</CardText>
                          </div>
                          <div className="col-md-6">
                            <CardText className="summarySubHeading">: {InitiatorinfoDetails?.initiatorAddress}</CardText>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-md-12">
                      {<ActionButton jumpTo={`${routeLink}/initiator-details`} />}
                    </div>
                  </div>
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
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText className="summaryHeading">{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText className="summarySubHeading">{InformarHosInstDetails?.infomantAadhar}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText className="summaryHeading">{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText className="summarySubHeading">{InformarHosInstDetails?.infomantFirstNameEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText className="summaryHeading">{`${t("CR_INFORMER_DESIGNATION")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText className="summarySubHeading">{InformarHosInstDetails?.informerDesi}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText className="summaryHeading">{`${t("CR_MOBILE_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText className="summarySubHeading">{InformarHosInstDetails?.infomantMobile}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText className="summaryHeading">{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {<ActionButton jumpTo={`${routeLink}/initiator-details`} />}
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
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff" }}>{`${t("CR_HOSP_ADMISSION_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText className="summaryHeading">{`${t("CR_IP_OP")}`}</CardText>
                    </div>
                    <div className="col-md-8">
                      <CardText className="summarySubHeading">
                        : {locale === "en_IN" ? InitiatorinfoDetails?.ipopList?.name : locale === "ml_IN" ? InitiatorinfoDetails?.ipopList?.namelocal : InitiatorinfoDetails?.ipopList?.name}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText className="summaryHeading">{`${t("CR_IP_OP_NO")}`}</CardText>
                    </div>
                    <div className="col-md-8">
                      <CardText className="summarySubHeading">: {InitiatorinfoDetails?.ipopNumber}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <CardText className="summaryHeading">{`${t("CR_GYNC_REG_NO")}`}</CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText className="summarySubHeading">: {InitiatorinfoDetails?.obstetricsNumber}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {<ActionButton jumpTo={`${routeLink}/initiator-details`} />}
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
                <span style={{ marginLeft: "10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
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
