import {
  BreakLine, CardSectionHeader, CardSubHeader, CheckPoint, ConnectingCheckPoints, Loader, Row, StatusTable,
  LinkButton, Carousel, Accordion
} from "@egovernments/digit-ui-react-components";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BPADocuments from "../../../../../templates/ApplicationDetails/components/BPADocuments";
import InspectionReport from "../../../../../templates/ApplicationDetails/components/InspectionReport";
import NOCDocuments from "../../../../../templates/ApplicationDetails/components/NOCDocuments";
import PermissionCheck from "../../../../../templates/ApplicationDetails/components/PermissionCheck";
import PropertyDocuments from "../../../../../templates/ApplicationDetails/components/PropertyDocuments";
import PropertyEstimates from "../../../../../templates/ApplicationDetails/components/PropertyEstimates";
import PropertyFloors from "../../../../../templates/ApplicationDetails/components/PropertyFloors";
import PropertyOwners from "../../../../../templates/ApplicationDetails/components/PropertyOwners";
import ScruntinyDetails from "../../../../../templates/ApplicationDetails/components/ScruntinyDetails";
import SubOccupancyTable from "../../../../../templates/ApplicationDetails/components/SubOccupancyTable";
import TLCaption from "../../../../../templates/ApplicationDetails/components/TLCaption";
import TLTradeAccessories from "../../../../../templates/ApplicationDetails/components/TLTradeAccessories";
import TLTradeUnits from "../../../../../templates/ApplicationDetails/components/TLTradeUnits";
import DocumentsPreview from "../../../../../templates/ApplicationDetails/components/DocumentsPreview";
import moment from "moment";

function ApplicationContent({ applicationDetails, workflowDetails, isDataLoading, applicationData,
  businessService, timelineStatusPrefix, showTimeLine = true, statusAttribute = "status", paymentsList }) {
  const tenantId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const [imagesThumbs, setImagesThumbs] = useState([]);
  console.log("applicationDetails in content==", applicationDetails);
  function OpenImage(imageSource, index, thumbnailsToShow) {
      window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
  }

  const getTimelineCaptions = (checkpoint) => {
      if (checkpoint.state === "OPEN" || (checkpoint.status === "INITIATED" && !window.location.href.includes("/obps/"))) {
          const caption = {
              date: Digit.DateUtils.ConvertTimestampToDate(applicationData?.auditDetails?.createdTime),
              source: applicationData?.channel || "",
          };
          return <TLCaption data={caption} />;
      } else if (window.location.href.includes("/obps/") || window.location.href.includes("/noc/")) {
          const caption = {
              date: checkpoint?.auditDetails?.lastModified,
              name: checkpoint?.assignes?.[0]?.name,
              mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
              comment: t(checkpoint?.comment),
              wfComment: checkpoint.wfComment,
              thumbnailsToShow: checkpoint?.thumbnailsToShow,
          };
          return <TLCaption data={caption} OpenImage={OpenImage} />;
      } else {
          const caption = {
              date: Digit.DateUtils?.ConvertTimestampToDate(applicationData?.auditDetails?.lastModifiedTime),
              name: checkpoint?.assignes?.[0]?.name,
              // mobileNumber: checkpoint?.assigner?.mobileNumber,
              wfComment: checkpoint?.wfComment,
              mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
          };
          return <TLCaption data={caption} />;
      }
  };

  const getTranslatedValues = (dataValue, isNotTranslated) => {
      if (dataValue) {
          return !isNotTranslated ? t(dataValue) : dataValue;
      } else {
          return t("NA");
      }
  };

  const fetchImage = async (uploadedImages) => {
      setImagesThumbs(null);
      const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, tenantId);
      const newThumbnails = fileStoreIds.map((key) => {
        const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
        return { large: fileType === "image" ? key.url.split(",")[1] : key.url, small: fileType === "image" ? key.url.split(",")[2] : key.url, key: key.id, type: fileType, pdfUrl: key.url };
      });
      const formattedImageThumbs =
        newThumbnails?.length > 0 &&
        newThumbnails.map((item, index) => {
          const tempObj = {
            image: item.large,
            caption: `Caption ${index}`,
          };
          return tempObj;
        });
        console.log("formattedImageThumbs ===", formattedImageThumbs);
      setImagesThumbs(formattedImageThumbs);
    };

  useEffect(() => {
      if(applicationDetails?.applicationDetails?.[0]?.documentIds?.length > 0) {
          fetchImage(applicationDetails?.applicationDetails?.[0]?.documentIds);
      }
  }, [applicationDetails?.applicationDetails])

  const setDocumentsView = (documentData) => {
      if(documentData?.length > 0){
       fetchImage(documentData);
      } else return;
     }; 

  useEffect(() => {
      console.log("workflowDetails==", workflowDetails?.data);
  }, [workflowDetails])

  const checkLocation = window.location.href.includes("employee/tl") || window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc");
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
              fieldValue = data ? data : t("CR_NOT_RECORDED");
              break;
          case "date":
              fieldValue = data ? moment(parseInt(data, 10)).format("DD/MM/YYYY") : t("CR_NOT_RECORDED");
              break;
      }
      return fieldValue;
  };



  const renderCardDetail = (value, fieldName, documentData) => {
      const type = fieldName === "CHILD_DOB" ? "date" : "text";
      console.log("fieldvalues", value, type);
      return (
          <div className="row">
              <div className="col-md-12">
                  <div className="col-md-3">
                      <h3 style={{ overflowWrap: "break-word" }}>{t(value.title)} :</h3>
                  </div>
                  <div className="col-md-4">
                      <h4>
                          <strong style={{ overflowWrap: "break-word" }}>{getFieldValue(value?.oldValue, type)}</strong>
                      </h4>
                  </div>
                  <div className="col-md-4">
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
      console.log("render summary==", detail);
      //  switch()
      return (
          <React.Fragment key={index}>
              <div style={getMainDivStyles()}>
                  <Accordion
                      expanded={index === 0 ? true : false}
                      title={t(detail?.title)}
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
                              {detail?.fieldValues?.map((value, index) => renderCardDetail(value, detail.title, detail.CorrectionDocument))}
                          </StatusTable>
                      }
                  />
              </div>
              {detail?.belowComponent && <detail.belowComponent />}
              {detail?.additionalDetails?.inspectionReport && (<ScruntinyDetails scrutinyDetails={detail?.additionalDetails} paymentsList={paymentsList} />)}
              {applicationDetails?.applicationData?.additionalDetails?.fieldinspection_pending?.length > 0 && detail?.additionalDetails?.fiReport && (
                  <InspectionReport fiReport={applicationDetails?.applicationData?.additionalDetails?.fieldinspection_pending} />
              )}
              {detail?.additionalDetails?.floors && <PropertyFloors floors={detail?.additionalDetails?.floors} />}
              {detail?.additionalDetails?.owners && <PropertyOwners owners={detail?.additionalDetails?.owners} />}
              {detail?.additionalDetails?.units && <TLTradeUnits units={detail?.additionalDetails?.units} />}
              {detail?.additionalDetails?.accessories && <TLTradeAccessories units={detail?.additionalDetails?.accessories} />}
              {detail?.additionalDetails?.permissions && workflowDetails?.data?.nextActions?.length > 0 && (
                  <PermissionCheck applicationData={applicationDetails?.applicationData} t={t} permissions={detail?.additionalDetails?.permissions} />
              )}
              {detail?.additionalDetails?.obpsDocuments && (
                  <BPADocuments t={t} applicationData={applicationDetails?.applicationData} docs={detail.additionalDetails.obpsDocuments} bpaActionsDetails={workflowDetails} />
              )}
              {detail?.additionalDetails?.noc && (
                  <NOCDocuments t={t} isNoc={true} NOCdata={detail.values} applicationData={applicationDetails?.applicationData}
                      docs={detail.additionalDetails.noc} noc={detail.additionalDetails?.data} bpaActionsDetails={workflowDetails} />
              )}
              {detail?.additionalDetails?.scruntinyDetails && <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} />}
              {detail?.additionalDetails?.buildingExtractionDetails && <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} />}
              {detail?.additionalDetails?.subOccupancyTableDetails && (
                  <SubOccupancyTable edcrDetails={detail?.additionalDetails} applicationData={applicationDetails?.applicationData} />
              )}
              {detail?.additionalDetails?.documentsWithUrl && <DocumentsPreview documents={detail?.additionalDetails?.documentsWithUrl} />}
              {detail?.additionalDetails?.documents && <PropertyDocuments documents={detail?.additionalDetails?.documents} />}
              {detail?.additionalDetails?.taxHeadEstimatesCalculation && (
                  <PropertyEstimates taxHeadEstimatesCalculation={detail?.additionalDetails?.taxHeadEstimatesCalculation} />
              )}
          </React.Fragment>
      );
  };

  return (
      <>
          <div className="file-main">
              <div className={"cr-wrapper-app"}>
                  {applicationDetails?.applicationDetails?.length > 0 && applicationDetails?.applicationDetails?.map((detail, index) => renderSummaryCard(detail, index))}
              </div>
              <div className={"cr-timeline-wrapper"}>
              {imagesThumbs?.length > 0 && (
          <Carousel {...{ carouselItems: imagesThumbs }}  imageHeight={300} containerStyle={{ height: "300px", width: "400px", overflow: "scroll" }} />
        )}

                  {showTimeLine && workflowDetails?.data?.timeline?.length > 0 && (
                      <React.Fragment>
                          {(workflowDetails?.isLoading || isDataLoading) && <Loader />}
                          {!workflowDetails?.isLoading && !isDataLoading && (
                              <Fragment>
                                  <CardSectionHeader>
                                      {/* {t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")} */}
                                      {t("Activities")}
                                  </CardSectionHeader>
                                  <BreakLine />
                                  {workflowDetails?.data?.timeline && workflowDetails?.data?.timeline?.length === 1 ? (
                                      <CheckPoint isCompleted={true} label={t(`${timelineStatusPrefix}${workflowDetails?.data?.timeline[0]?.state}`)}
                                          customChild={getTimelineCaptions(workflowDetails?.data?.timeline[0])}
                                      />
                                  ) : (
                                      <ConnectingCheckPoints>
                                          {workflowDetails?.data?.timeline &&
                                              workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
                                                  return (
                                                      <React.Fragment key={index}>
                                                          <CheckPoint keyValue={index} isCompleted={index === 0} info={checkpoint.comment}
                                                              label={t(
                                                                  `${timelineStatusPrefix}${checkpoint?.[statusAttribute]}`
                                                              )}
                                                              customChild={getTimelineCaptions(checkpoint)}
                                                          />
                                                      </React.Fragment>
                                                  );
                                              })}
                                      </ConnectingCheckPoints>
                                  )}
                              </Fragment>
                          )}

                      </React.Fragment>
                  )}
              </div>
          </div>
      </>
  );
}

export default ApplicationContent;
