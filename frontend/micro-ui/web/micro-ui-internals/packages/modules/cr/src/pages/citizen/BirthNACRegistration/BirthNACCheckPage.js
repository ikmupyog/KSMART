import {
  Card,
  CardLabel,
  CardSubHeader,
  CardText,
  CitizenInfoLabel,
  LinkButton,
  Row,
  Accordion,
  StatusTable,
  SubmitBar,
  BackButton,
  Toast,
  CheckBox,
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import Timeline from "../../../components/NACTimeline";
import _, { isArray } from "lodash";

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

const BirthNACCheckPage = ({ onSubmit, value, userType, formData }) => {
  let isEdit = window.location.href.includes("renew-trade");
  const locale = Digit.SessionStorage.get("locale");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const [InitiatorDeclareError, setInitiatorDeclareError] = useState(false);
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(false);
  const [isDeclaration, setDeclaration] = useState(false);
  const [toast, setToast] = useState(false);
  const { BirthNACInitiator, BirthNACDetails, BirthNACParentsDetails, AddressBirthDetails, BirthNACDocuments } = value;
  const ownerState = useState(BirthNACInitiator?.ownerState);

  // const uploadedImages = [
  //   BirthNACInitiator.uploadedFile,
  //   BirthNACInitiator.uploadedFile1,
  //   BirthNACInitiator.uploadedFile2,
  //   BirthNACInitiator.uploadedFile3,
  //   BirthNACInitiator.uploadedFile4,
  //   BirthNACInitiator.uploadedFile5,
  // ];
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${
      new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
    }`;
  }
  let routeLink = "";
  routeLink = `${getPath(match.path, match.params)}`;
  routeLink = routeLink.replace("/check", "");
  // useEffect(() => {
  //   if (uploadedImages?.length > 0) {
  //     fetchImage();
  //   }
  // }, []);
  // const [imagesThumbs, setImagesThumbs] = useState(null);
  // const [imageZoom, setImageZoom] = useState(null);

  // const fetchImage = async () => {
  //   setImagesThumbs(null);
  //   const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, Digit.ULBService.getStateId());
  //   const newThumbnails = fileStoreIds.map((key) => {
  //     const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
  //     return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
  //   });
  //   setImagesThumbs(newThumbnails);
  // };

  if (window.location.href.includes("/citizen") == "citizen") {
    userType = "citizen";
  } else {
    userType = "employee";
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
  function onBirthSubmit() {
    if (!isInitiatorDeclaration || !isDeclaration) {
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
  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }
  function setDeclarationStatement(e) {
    if (e.target.checked == false) {
      setDeclaration(e.target.checked);
    } else {
      setDeclaration(e.target.checked);
    }
  }

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
      <Card>
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
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {convertEpochToDate(BirthNACDetails?.childDOB)}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_OF_BIRTH")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {BirthNACDetails?.birthDateTime ? BirthNACDetails?.birthDateTime : t("CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>{BirthNACDetails?.gender.code}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_CHILD_AADHAAR")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {BirthNACDetails?.childAadharNo ? BirthNACDetails?.childAadharNo : t("CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("ORDER_OF_BIRTH")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.nacorderofChildren}</CardText>
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
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.childFirstNameEn}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MIDDLE_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.childMiddleNameEn}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LAST_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.childLastNameEn}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FIRST_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.childFirstNameMl}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MIDDLE_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.childMiddleNameMl}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LAST_NAME_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.childLastNameMl}</CardText>
                    {<ActionButton jumpTo={`${routeLink}/nac-child-details`} />}
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
              {BirthNACDetails?.birthPlace.code === "HOSPITAL" && (
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
              {BirthNACDetails?.birthPlace.code === "INSTITUTION" && (
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
              {BirthNACDetails?.birthPlace.code === "HOME" && (
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
              {BirthNACDetails?.birthPlace.code === "VEHICLE" && (
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
              {BirthNACDetails?.birthPlace.code === "PUBLIC_PLACES" && (
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
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.birthPlace.name}</CardText>
                  </div>
                </div>
              </div>
              {BirthNACDetails?.birthPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BirthNACDetails?.hospitalName.hospitalName}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BirthNACDetails?.hospitalName.hospitalNamelocal}
                      </CardText>
                      {<ActionButton style={{ Colour: "red !important" }} jumpTo={`${routeLink}/BirthNACDetails`} />}
                    </div>
                  </div>
                </div>
              )}
              {BirthNACDetails?.birthPlace.code === "INSTITUTION" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_TYPE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.institution.name}</CardText>
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
                          {BirthNACDetails?.institutionId.institutionName}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BirthNACDetails?.institutionId.institutionNamelocal}
                          {<ActionButton jumpTo={`${routeLink}/nac-child-details`} />}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {BirthNACDetails?.birthPlace.code === "HOME" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.wardNo.namecmb}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.adrsPostOffice.name}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.adrsPincode}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.adrsLocalityNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.adrsLocalityNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.adrsStreetNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.adrsStreetNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.adrsHouseNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.adrsHouseNameMl}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-child-details`} />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {BirthNACDetails?.birthPlace.code === "VEHICLE" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TYPE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.vehicleType.name}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_REGISTRATION_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.vehicleRegistrationNo}</CardText>
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.vehicleHaltPlace}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.vehicleFromEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.vehicleToEn}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.vehicleFromMl}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.vehicleToMl}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/BirthNACDetails`} />}
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
                          {BirthNACDetails?.setadmittedHospitalEn.hospitalName}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.wardNo.namecmb}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                      </div>
                      <div className="col-md-9">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.vehicleDesDetailsEn}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-child-details`} />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {BirthNACDetails?.birthPlace.code === "PUBLIC_PLACES" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PUBLIC_PLACE_TYPE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.publicPlaceType.name}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.wardNo.namecmb}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.localityNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.localityNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.streetNameEn}</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.streetNameMl}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                      </div>
                      <div className="col-md-9">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACDetails?.publicPlaceDecpEn}</CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-child-details`} />}
                      </div>
                      <div className="col-md-2">{<ActionButton jumpTo={`${routeLink}/BirthNACDetails`} />}</div>
                    </div>
                  </div>
                </div>
              )}
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
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACParentsDetails?.motherAadhar}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BirthNACParentsDetails?.motherFirstNameEn}
                      </CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BirthNACParentsDetails?.motherFirstNameMl}
                      </CardText>
                      {<ActionButton jumpTo={`${routeLink}/nac-parents-details`} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACParentsDetails?.fatherAadhar}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BirthNACParentsDetails?.fatherFirstNameEn}
                      </CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BirthNACParentsDetails?.fatherFirstNameMl}
                      </CardText>
                      {<ActionButton jumpTo={`${routeLink}/nac-parents-details`} />}
                    </div>
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
                          {locale === "en_IN"
                            ? AddressBirthDetails?.presentInsideKeralaDistrict?.name
                            : AddressBirthDetails?.presentInsideKeralaDistrict?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.presentInsideKeralaTaluk?.name
                            : AddressBirthDetails?.presentInsideKeralaTaluk?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.presentInsideKeralaVillage?.name
                            : AddressBirthDetails?.presentInsideKeralaVillage?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.presentInsideKeralaLBName?.name
                            : AddressBirthDetails?.presentInsideKeralaLBName?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentWardNo.namecmb}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.presentInsideKeralaPostOffice?.name
                            : AddressBirthDetails?.presentInsideKeralaPostOffice?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaPincode}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaHouseNameMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-address-details`} />}
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
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.presentOutsideKeralaDistrict?.name
                            : AddressBirthDetails?.presentOutsideKeralaDistrict?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaTaluk}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.presentOutsideKeralaVillage?.name
                            : AddressBirthDetails?.presentOutsideKeralaVillage?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaCityVilgeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaHouseNameMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-address-details`} />}
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
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaProvinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaProvinceMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.presentOutSideIndiaadrsVillage?.name
                            : AddressBirthDetails?.presentOutSideIndiaadrsVillage?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaadrsCityTown}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaPostCode}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressEnB}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressMlB}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-address-details`} />}
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
                          {locale === "en_IN"
                            ? AddressBirthDetails?.permntInKeralaAdrDistrict?.name
                            : AddressBirthDetails?.permntInKeralaAdrDistrict?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.permntInKeralaAdrTaluk?.name
                            : AddressBirthDetails?.permntInKeralaAdrTaluk?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.permntInKeralaAdrVillage?.name
                            : AddressBirthDetails?.permntInKeralaAdrVillage?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.permntInKeralaAdrLBName?.name
                            : AddressBirthDetails?.permntInKeralaAdrLBName?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaWardNo.namecmb}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.permntInKeralaAdrPostOffice?.name
                            : AddressBirthDetails?.permntInKeralaAdrPostOffice?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrPincode}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrStreetNameMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrHouseNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrHouseNameMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-address-details`} />}
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
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.permntOutsideKeralaDistrict?.name
                            : AddressBirthDetails?.permntOutsideKeralaDistrict?.namelocal}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaTaluk}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.permntOutsideKeralaVillage?.name
                            : AddressBirthDetails?.permntOutsideKeralaVillage?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaCityVilgeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaHouseNameMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-address-details`} />}
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
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaprovinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaprovinceMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {locale === "en_IN"
                            ? AddressBirthDetails?.permntOutsideIndiaVillage?.name
                            : AddressBirthDetails?.permntOutsideIndiaVillage?.namelocal}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaCityTown}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permanentOutsideIndiaPostCode}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLineoneEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLineoneMl}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLinetwoEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLinetwoMl}
                        </CardText>
                        {<ActionButton jumpTo={`${routeLink}/nac-address-details`} />}
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
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACInitiator?.initiatorAadhar}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACInitiator?.initiatorNameEn}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_IS_CAREOF")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACInitiator?.careofapplicant}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACInitiator?.initiatorMobile}</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                  </div>
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{BirthNACInitiator?.initiatorAddress}</CardText>
                    {<ActionButton jumpTo={`${routeLink}/nac-initiator-details`} />}
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
        {ownerState.map((item) => {
          let itemData = _.head(item) || {};
          //let dob = new Date(itemData?.dob);
          if (Array.isArray(item)) {
            return (
              <Accordion
                key={item.slNo}
                expanded={false}
                title={`${t("DETAILS OF THE CHILDREN BORN INCLUDING THE APPLICANT CHILD")}`}
                content={
                  <StatusTable>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-12">
                          <h1 className="summaryheadingh">
                            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                              "DETAILS OF THE CHILDREN BORN INCLUDING THE APPLICANT CHILD"
                            )}`}</span>{" "}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{itemData?.childNameEn}</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME_ML")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{itemData?.childNameMl}</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{itemData?.sex.value}</CardText>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_BIRTH_TIME")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{itemData?.dob}</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}> {`${t("ORDER_OF_BIRTH")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{itemData?.nacorderofChildren}</CardText>
                        </div>
                      </div>
                    </div>
                  </StatusTable>
                }
              />
            );
          }
        })}

        <Accordion
          expanded={false}
          title={t("CR_DOCUMENTS")}
          content={
            <StatusTable>
              <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DOCUMENTS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                <div className="col-md-12">
                  <div className="col-md-2">
                    {_.head(AdoptionDocuments?.uploadedFile)?.type === "pdf" && (
                      <React.Fragment>
                        <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(AdoptionDocuments?.uploadedFile)?.pdfUrl} alt="" />
                      </React.Fragment>
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(AdoptionDocuments?.uploadedFile)?.type === "pdf"
                          ? _.head(AdoptionDocuments?.uploadedFile)?.pdfUrl
                          : _.head(AdoptionDocuments?.uploadedFile)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                  <div className="col-md-2">
                    {_.head(AdoptionDocuments?.uploadedFile1)?.type === "pdf" && (
                      <React.Fragment>
                        <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(AdoptionDocuments?.uploadedFile1)?.pdfUrl} alt="" />
                      </React.Fragment>
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(AdoptionDocuments?.uploadedFile1)?.type === "pdf"
                          ? _.head(AdoptionDocuments?.uploadedFile1)?.pdfUrl
                          : _.head(AdoptionDocuments?.uploadedFile1)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                  <div className="col-md-2">
                    {_.head(AdoptionDocuments?.uploadedFile2)?.type === "pdf" && (
                      <React.Fragment>
                        <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(AdoptionDocuments?.uploadedFile2)?.pdfUrl} alt="" />
                      </React.Fragment>
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(AdoptionDocuments?.uploadedFile2)?.type === "pdf"
                          ? _.head(AdoptionDocuments?.uploadedFile2)?.pdfUrl
                          : _.head(AdoptionDocuments?.uploadedFile2)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                  <div className="col-md-2">
                    {_.head(AdoptionDocuments?.uploadedFile3)?.type === "pdf" && (
                      <React.Fragment>
                        <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(AdoptionDocuments?.uploadedFile3)?.pdfUrl} alt="" />
                      </React.Fragment>
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(AdoptionDocuments?.uploadedFile3)?.type === "pdf"
                          ? _.head(AdoptionDocuments?.uploadedFile3)?.pdfUrl
                          : _.head(AdoptionDocuments?.uploadedFile3)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                  <div className="col-md-2">
                    {_.head(AdoptionDocuments?.uploadedFile4)?.type === "pdf" && (
                      <React.Fragment>
                        <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(AdoptionDocuments?.uploadedFile4)?.pdfUrl} alt="" />
                      </React.Fragment>
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(AdoptionDocuments?.uploadedFile4)?.type === "pdf"
                          ? _.head(AdoptionDocuments?.uploadedFile4)?.pdfUrl
                          : _.head(AdoptionDocuments?.uploadedFile4)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                  <div className="col-md-2">
                    {_.head(AdoptionDocuments?.uploadedFile5)?.type === "pdf" && (
                      <React.Fragment>
                        <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(AdoptionDocuments?.uploadedFile5)?.pdfUrl} alt="" />
                      </React.Fragment>
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(AdoptionDocuments?.uploadedFile5)?.type === "pdf"
                          ? _.head(AdoptionDocuments?.uploadedFile5)?.pdfUrl
                          : _.head(AdoptionDocuments?.uploadedFile5)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
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
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_MNAC_")}
                onChange={setDeclarationStatement}
                value={isDeclaration}
                checked={isDeclaration}
                //disable={isDisableEdit}
              />
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
          <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onBirthSubmit} />
        </div>
      </Card>
    </React.Fragment>
  );
};

export default BirthNACCheckPage;
