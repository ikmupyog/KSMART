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
  Accordion
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
//import TLDocument from "../../../pageComponents/TLDocumets";
// import Timeline from "../../../components/CRTimeline";
import Timeline from "../../../components/CRABTimeline";

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

const AbandonedBirthCheckPage = ({ onSubmit, value, userType,formData }) => {
  
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  // let isEdit = window.location.href.includes("renew-trade");
  // console.log("checkpage");
  const [InitiatorDeclareError, setInitiatorDeclareError] = useState(false);
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = React.useState( false);
  const [toast, setToast] = useState(false);
  const {
    AbandonedBirthInformarDetails,
    AbandonedChildDetails,
    // ChildDetails,
    // ParentsDetails,
    // AddressBirthDetails,
    // InitiatorinfoDetails,
    // InformarHosInstDetails,
    // BirthPlace,
    // HospitalDetails,
    // FatherInfoDetails,
    // MotherInfoDetails,
    // AddressDetails,
    // StatisticalInfoDetails,
    isEditProperty,
    cpt,
  } = value;

  const uploadedImages = [
    // AbandonedBirthInformarDetails?.uploadedFiles[0].fileStoreId,
    // AbandonedBirthInformarDetails?.uploadedFiles[1].fileStoreId
    AbandonedBirthInformarDetails.uploadedFile,
    AbandonedBirthInformarDetails.uploadedFile1,
  ];
  // console.log(uploadedImages);
  useEffect(() => {
    // console.log("uploadedImages",uploadedImages,AbandonedBirthInformarDetails)
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
    return `${
      new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
    }`;
  }
  function onABSubmit() {
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
  
  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
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
  // console.log(value);
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



  return (
    <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{t("CR_REG_SUMMARY_HEADING")}</CardSubHeader>

        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REG_SUMMARY_HEADING")}`}</span>
            </h1>
          </div>
        </div> */}
        {/* <div className="col-md-12"
          style={{
            maxWidth: "auto",
            margin: "25px auto",
            padding: "3rem 2rem",
            border: "none",
            borderRadius: "8px",
            height: "auto",
            backgroundColor: "#f3f0ef",
          }}
        >         */}
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{convertEpochToDate(AbandonedChildDetails?.childDOB)}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_OF_BIRTH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.birthDateTime ? AbandonedChildDetails?.birthDateTime :"NOT_RECORDED"}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.gender.code}</CardText>
                  {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}
                </div>
                
              </div>
            </div>
          </StatusTable>}
        />
        <Accordion expanded={false} title={t("CR_BIRTH_PLACE_DETAILS")}
          content={<StatusTable >
            {AbandonedChildDetails?.birthPlace.code === "HOSPITAL" && (
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
            {AbandonedChildDetails?.birthPlace.code === "INSTITUTION" && (
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
            {AbandonedChildDetails?.birthPlace.code === "HOME" && (
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
            {AbandonedChildDetails?.birthPlace.code === "VEHICLE" && (
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
            {AbandonedChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.birthPlace.name}</CardText>
                </div>
              </div>
            </div>
            {AbandonedChildDetails?.birthPlace.code === "HOSPITAL" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.hospitalName.hospitalName}</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.hospitalName.hospitalNamelocal}</CardText>
                    {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}
                  </div>
                </div>
              </div>
            )}
            {AbandonedChildDetails?.birthPlace.code === "INSTITUTION" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.institution.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.institutionId.institutionName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.institutionId.institutionNamelocal}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AbandonedChildDetails?.birthPlace.code === "HOME" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.adrsPostOffice.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.adrsPincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.adrsLocalityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.adrsLocalityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.adrsStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.adrsStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.adrsHouseNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.adrsHouseNameMl}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AbandonedChildDetails?.birthPlace.code === "VEHICLE" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.vehicleType.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_REGISTRATION_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.vehicleRegistrationNo}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.vehicleHaltPlace}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.vehicleFromEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.vehicleToEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.vehicleFromMl}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.vehicleToMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADMITTED_HOSPITAL_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.setadmittedHospitalEn.hospitalName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.vehicleDesDetailsEn}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AbandonedChildDetails?.birthPlace.code === "PUBLIC_PLACES" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PUBLIC_PLACE_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.publicPlaceType.name}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.wardNo.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.localityNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.localityNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.streetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.streetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.publicPlaceDecpEn}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.medicalAttensionSub?.name ? AbandonedChildDetails?.medicalAttensionSub?.name :  "NOT_RECORDED" }</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PREGNANCY_DURATION")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.pregnancyDuration ? AbandonedChildDetails?.pregnancyDuration :  "NOT_RECORDED"}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DELIVERY_METHOD")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.deliveryMethods.name ? AbandonedChildDetails?.deliveryMethods.name :  "NOT_RECORDED"}</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BIRTH_WEIGHT")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.birthWeight ? AbandonedChildDetails?.birthWeight :  "NOT_RECORDED" }</CardText>
                  {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}
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
            {AbandonedChildDetails?.isMotherInfo === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_INFORMATION_MISSING")}`} :</CardText>
                    {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}

                  </div>
                </div>
              </div>
            )}
            {AbandonedChildDetails?.isMotherInfo === false && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.motherFirstNameEn ? AbandonedChildDetails?.motherFirstNameEn   :  "NOT_RECORDED"}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.motherFirstNameMl ? AbandonedChildDetails?.motherFirstNameMl  :  "NOT_RECORDED"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                  <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.motherAadhar ? AbandonedChildDetails?.motherAadhar  :  "NOT_RECORDED"}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CR_MOTHER_ADDRESS")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedChildDetails?.addressOfMother ? AbandonedChildDetails?.addressOfMother   :  "NOT_RECORDED"}</CardText>
                      {<ActionButton jumpTo={`${routeLink}/abandoned-child-details`} />}
                    </div>                    
                  </div>
                </div> 
              </div>
            )} 
          </StatusTable>}
        />
      <Accordion expanded={false} title={t("CR_PARENTS_CARETAKER")}
          content={<StatusTable >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENTS_CARETAKER")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.institutionName ? AbandonedBirthInformarDetails?.institutionName  :  "NOT_RECORDED"}</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CARE_TAKER_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.caretakerName ? AbandonedBirthInformarDetails?.caretakerName : "NOT_RECORDED"}</CardText>
                </div>
                           
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CARE_TAKER_DESIGNATION")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.caretakerDesignation ? AbandonedBirthInformarDetails?.caretakerDesignation  : "NOT_RECORDED"}</CardText>
                </div>    
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.caretakerMobile ? AbandonedBirthInformarDetails?.caretakerMobile  : "NOT_RECORDED" }</CardText>
                </div>
                </div> 
                </div>
                <div className="row">
                <div className="col-md-12">
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRESS")}`} :</CardText>
                </div>
                <div className="col-md-8">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.caretakerAddress  ? AbandonedBirthInformarDetails?.caretakerAddress: "NOT_RECORDED"}</CardText>
                  
                </div>
                <div className="col-md-1"> {<ActionButton jumpTo={`${routeLink}/abandoned-birth-informar-details`} />}</div>
               
                     
              </div>
            </div>
          </StatusTable>}
        />
  <Accordion expanded={false} title={t("CR_OFFICAL_INFORMANT")}
          content={<StatusTable >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OFFICAL_INFORMANT")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_OFFICE_INSTITUTION")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.infomantinstitution}</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMANT_DESIGNATION")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.informerDesi }</CardText>
                </div>
                           
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMANT_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.infomantFirstNameEn}</CardText>
                </div>    
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                </div>
                <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.infomantAadhar}</CardText>
                </div>   
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
            <div className="col-md-3">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                </div>
                <div className="col-md-8">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{AbandonedBirthInformarDetails?.infomantMobile}</CardText>
                </div>
                <div className="col-md-1">
                {<ActionButton jumpTo={`${routeLink}/abandoned-birth-informar-details`} />}
                </div>
                </div>
            </div>
          </StatusTable>}
        />
       <Accordion
          expanded={false}
          title={t("CR_DOCUMENTS")}
          content={
            <StatusTable>
              {uploadedImages.length > 0 && (
                <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DOCUMENTS")}`}</span>{" "}
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
                      {<ActionButton jumpTo={`${routeLink}/abandoned-birth-informar-details`} />}
                  </div>
                </div>
              )}
            </StatusTable>
          }
        />
        {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={() => setImageZoom(null)} /> : null}


        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
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

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">{/* <span style={{ background: "#fff", padding: "0 10px" }}>                
                </span> */}</h1>
          </div>
        </div>
        {toast && (
          <Toast
            error={InitiatorDeclareError}
            label={
              InitiatorDeclareError
                ? InitiatorDeclareError
                  ? t(`BIRTH_DECLARATION_CHOOSE`) : setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onABSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default AbandonedBirthCheckPage;
