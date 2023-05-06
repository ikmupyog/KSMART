import {
  BreakLine,
  CardSectionHeader,
  CardSubHeader,
  CheckPoint,
  ConnectingCheckPoints,
  Loader,
  Row,
  StatusTable,
  LinkButton,
  Carousel,
  Accordion,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from "react-router-dom";
import { DEATH_CORRECTION_FIELD_NAMES } from "../../../config/constants";
import moment from "moment";

function DeathCorrectionSummary({
  applicationDetails,
  workflowDetails,
  isDataLoading,
  applicationData,
  businessService,
  timelineStatusPrefix,
  showTimeLine = true,
  statusAttribute = "status",
  paymentsList,
}) {
  const { t } = useTranslation();
  let location = useLocation();
  const history = useHistory();
  let navData = location?.state?.navData;
  const deathCorrectionFormsObj = location?.state?.deathCorrectionData;
  let deathCorrectionData = location?.state?.deathCorrectionData?.CorrectionDetails?.[0]?.CorrectionField;
  const [imagesThumbs, setImagesThumbs] = useState([]);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.cr.useDeathCorrectionAction(tenantId);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_DEATH_CORRECTION", {});
  

  const scrollToTop = (behavior = "auto") => {
    // scroll to top
    window.scrollTo({
      top: 0,
      behavior,
    });
  };

  const fetchImage = async (uploadedImages) => {
    setImagesThumbs(null);
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
    });
    console.log("newThumbnails==", newThumbnails);
    const formattedImageThumbs =
      newThumbnails?.length > 0 &&
      newThumbnails.map((item, index) => {
        const tempObj = {
          image: item.small,
          caption: `Caption ${index}`,
        };
        return tempObj;
      });
    console.log("formattedImageThumbs==", formattedImageThumbs);
    setImagesThumbs(formattedImageThumbs);
    scrollToTop();
  };

  function OpenImage(imageSource, index, thumbnailsToShow) {
    window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
  }

  const setDocumentsView = (documentData) => {
    const documentIds = documentData?.map((item) => item.filestoreId);
    fetchImage(documentIds);
  };

  // const getTimelineCaptions = (checkpoint) => {
  //     if (checkpoint.state === "OPEN" || (checkpoint.status === "INITIATED" && !window.location.href.includes("/obps/"))) {
  //         const caption = {
  //             date: Digit.DateUtils.ConvertTimestampToDate(applicationData?.auditDetails?.createdTime),
  //             source: applicationData?.channel || "",
  //         };
  //         return <TLCaption data={caption} />;
  //     } else if (window.location.href.includes("/obps/") || window.location.href.includes("/noc/")) {
  //         const caption = {
  //             date: checkpoint?.auditDetails?.lastModified,
  //             name: checkpoint?.assignes?.[0]?.name,
  //             mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
  //             comment: t(checkpoint?.comment),
  //             wfComment: checkpoint.wfComment,
  //             thumbnailsToShow: checkpoint?.thumbnailsToShow,
  //         };
  //         return <TLCaption data={caption} OpenImage={OpenImage} />;
  //     } else {
  //         const caption = {
  //             date: Digit.DateUtils?.ConvertTimestampToDate(applicationData?.auditDetails?.lastModifiedTime),
  //             name: checkpoint?.assignes?.[0]?.name,
  //             // mobileNumber: checkpoint?.assigner?.mobileNumber,
  //             wfComment: checkpoint?.wfComment,
  //             mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
  //         };
  //         return <TLCaption data={caption} />;
  //     }
  // };

  useEffect(() => {
    if (deathCorrectionData?.length > 0) {
      console.log("navigated data==", deathCorrectionData);
      setDocumentsView(deathCorrectionData?.[0]?.CorrectionDocument);
    }
  }, []);

  const navigateAcknowledgement = (data={}) =>{
    setParams({});
    history.push({
      pathname: `/digit-ui/citizen/cr/death-correction-acknowledgement`,
      state: { navData, deathCorrectionData: data, mutationData:{ data : data, isSuccess: true, isLoading : false }},
    });
  };
      
  useEffect(()=>{
    if(mutation?.isError) {
        setParams({});
      console.log("mutatio",mutation);
      history.push({
          pathname:  `/digit-ui/citizen/cr/death-correction-acknowledgement`,
          state: { navData, deathCorrectionData: {} ,mutationData:{ data : mutation.data, isSuccess: mutation.isSuccess, isLoading : mutation?.isLoading }}
        });
    }
    },[mutation])
    
  const submitDeathCorrection = () => {
    console.log("birth inclusion===123");
    const resp = mutation.mutate(deathCorrectionFormsObj, { onSuccess: navigateAcknowledgement });
    console.log("resap==", resp);
  };

    
  

 

  const getTranslatedValues = (dataValue, isNotTranslated) => {
    if (dataValue) {
      return !isNotTranslated ? t(dataValue) : dataValue;
    } else {
      return t("NA");
    }
  };

  const checkLocation =
    window.location.href.includes("employee/tl") || window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc");
  const isNocLocation = window.location.href.includes("employee/noc");
  const isBPALocation = window.location.href.includes("employee/obps");

  const getRowStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { justifyContent: "space-between", fontSize: "16px", lineHeight: "19px", color: "#0B0C0C" };
    } else if (checkLocation) {
      return { justifyContent: "space-between", fontSize: "16px", lineHeight: "19px", color: "#0B0C0C" };
    } else {
      return {};
    }
  };

  const getTableStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { position: "relative", marginTop: "19px" };
    } else if (checkLocation) {
      return { position: "relative", marginTop: "19px" };
    } else {
      return {};
    }
  };

  const getMainDivStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { lineHeight: "19px", maxWidth: "950px", minWidth: "280px" };
    } else if (checkLocation) {
      return { lineHeight: "19px", maxWidth: "600px", minWidth: "280px" };
    } else {
      return {};
    }
  };

  const getTextValue = (value) => {
    if (value?.skip) return value.value;
    else if (value?.isUnit) return value?.value ? `${getTranslatedValues(value?.value, value?.isNotTranslated)} ${t(value?.isUnit)}` : t("N/A");
    else return value?.value ? getTranslatedValues(value?.value, value?.isNotTranslated) : t("N/A");
  };

  const getFieldValue = (data, type = "text") => {
    let fieldValue = "";
    switch (type) {
      case "text":
        fieldValue = data;
        break;
      case "date":
        fieldValue = moment(data).format("DD/MM/YYYY");
        break;
    }
    return fieldValue;
  };

  const renderCardDetail = (value, fieldName, documentData) => {
    console.log("value in card==", value, fieldName);
    const type = fieldName === "DECEASED_DOB" ? "date" : "text";
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <h3 style={{ overflowWrap: "break-word" }}>{t(value.column)} :</h3>
          </div>
          <div className="col-md-4">
            <h4>
              <strong style={{ overflowWrap: "break-word" }}>{getFieldValue(value?.oldValue, type)}</strong>
            </h4>
          </div>
          <div className="col-md-3">
            <h4>
              <strong style={{ overflowWrap: "break-word" }}>{getFieldValue(value?.newValue, type)}</strong>
            </h4>
          </div>
          <div className="col-md-1">
            <LinkButton label="View" onClick={() => setDocumentsView(documentData)} />
          </div>
        </div>
      </div>
    );
  };

  const renderSummaryCard = (detail, index) => {
    console.log("detail in summary card--", detail, deathCorrectionData[detail]);
    //  switch()
    return (
      <React.Fragment key={index}>
        <div style={getMainDivStyles()}>
          <Accordion
            expanded={index === 0 ? true : false}
            title={t(`CR_${detail?.correctionFieldName}`)}
            style={{ margin: "10px" }}
            content={
              <StatusTable style={getTableStyles()}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      {" "}
                      <h3></h3>{" "}
                    </div>
                    <div className="col-md-4">
                      {" "}
                      <h5>{t("OLD_VALUE")}</h5>{" "}
                    </div>
                    <div className="col-md-3">
                      {" "}
                      <h5>{t("NEW_VALUE")}</h5>{" "}
                    </div>
                  </div>
                </div>
                {detail?.correctionFieldValue?.map((value, index) => renderCardDetail(value, detail.correctionFieldName, detail.CorrectionDocument))}
              </StatusTable>
            }
          />
        </div>
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="file-main">
        <div className={"cr-wrapper-app"}>
          {deathCorrectionData?.length > 0 && deathCorrectionData?.map((detail, index) => renderSummaryCard(detail, index))}
          {deathCorrectionData?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
              <SubmitBar label={t("CS_COMMON_BACK")} onSubmit={() => history.goBack()} />
              <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={submitDeathCorrection} />
            </div>
          )}
        </div>
        {imagesThumbs?.length > 0 && (
          <div className={"cr-timeline-wrapper"}>
            <Carousel {...{ carouselItems: imagesThumbs }} containerStyle={{ height: "300px", width: "400px", overflow: "scroll" }} />
          </div>
        )}
      </div>
    </>
  );
}

export default DeathCorrectionSummary;
