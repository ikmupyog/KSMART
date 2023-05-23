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
import { Link, useLocation , useHistory} from "react-router-dom";
import { BIRTH_INCLUSION_FIELD_NAMES } from "../../../config/constants";
import moment from "moment";
import { trimURL } from "../../../utils";

function BirthInclusionSummary({
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
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const mutation = Digit.Hooks.cr.useBirthCorrectionAction(tenantId);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_BIRTH_INCLUSION", {});

  const [imagesThumbs, setImagesThumbs] = useState([]);
  const navData = location?.state?.navData;
  const birthInclusionFormsObj = location?.state?.birthInclusionData;
  const birthInclusionData = location?.state?.birthInclusionData?.CorrectionDetails?.[0]?.CorrectionField;
  const history = useHistory();

    useEffect(() => {
        if (birthInclusionData?.length > 0) {
          setDocumentsView(birthInclusionData?.[0]?.CorrectionDocument);
        }
      }, []);

  const fetchImage = async (uploadedImages) => {
    setImagesThumbs(null);
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      // return { large: fileType === "image" ? key.url.split(",")[1] : key.url, small: fileType === "image" ? key.url.split(",")[2] : key.url, key: key.id, type: fileType, pdfUrl: key.url };
      return { large: fileType === "image" ? trimURL(key.url.split(",")[1]) : key.url, small: fileType === "image" ? trimURL(key.url.split(",")[2]) : key.url, key: key.id, type: fileType, pdfUrl: trimURL(key.url) };
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

    setImagesThumbs(formattedImageThumbs);
  };

  function OpenImage(imageSource, index, thumbnailsToShow) {
    window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
  }

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

  useEffect(()=>{
  if(mutation?.isError) {

    clearParams(); 
    history.push({
        pathname: `/digit-ui/citizen/cr/birth-inclusion-acknowledgement`,
        state: { navData, birthInclusionData: {} ,mutationData:{ data : mutation.data, isSuccess: mutation.isSuccess, isLoading : mutation?.isLoading }}
      });
  }
  },[mutation])

  const navigateAcknowledgement = (data) =>{
    clearParams();
    history.push({
      pathname: `/digit-ui/citizen/cr/birth-inclusion-acknowledgement`,
      state: { navData, birthInclusionData: data, mutationData:{ data : data, isSuccess: true, isLoading : false } }
    });
  }

  const submitBirthInclusion = () =>{
    mutation.mutate(birthInclusionFormsObj,{ onSuccess: navigateAcknowledgement });
  }

  const getFieldValue = (data, type = "text") => {
    let fieldValue = "";
    switch (type) {
      case "text":
        fieldValue = data ? data : t("CR_NOT_RECORDED");
        break;
      case "date":
        fieldValue = data ? moment(data).format("DD/MM/YYYY") : t("CR_NOT_RECORDED");
        break;
    }
    return fieldValue;
  };

  const setDocumentsView = (documentData) => {
    const documentIds = documentData?.map((item) => item.filestoreId);
    fetchImage(documentIds);
  };

  const renderCardDetail = (index, value, fieldName, documentData) => {
    const type = fieldName === "CHILD_DOB" ? "date" : "text";
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
          {index === 0 &&
            <LinkButton label={t("CR_VIEW")} style={{ fontWeight: "bold", color: "#86a4ad", cursor:"pointer" }} onClick={() => setDocumentsView(documentData)} />
          }
          </div>
        </div>
      </div>
    );
  };

  const renderSummaryCard = (detail, index) => {
  
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
                {detail?.correctionFieldValue?.map((value, index) => renderCardDetail(index, value, detail.correctionFieldName, detail.CorrectionDocument))}
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
          {birthInclusionData?.length > 0 && birthInclusionData?.map((detail, index) => renderSummaryCard(detail, index))}
          {birthInclusionData?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "2rem"}}>
              <SubmitBar  label={t("CS_COMMON_BACK")} onSubmit={()=> history.goBack()}/>
              <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={submitBirthInclusion}/>
            </div>
          )}
        </div>
        <div className={"cr-timeline-wrapper"}>
          {imagesThumbs?.length > 0 && (
            <Carousel {...{ carouselItems: imagesThumbs }} imageHeight={300} containerStyle={{ height: "300px", width: "400px", overflow: "scroll" }} />
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
                    <CheckPoint
                      isCompleted={true}
                      label={t(`${timelineStatusPrefix}${workflowDetails?.data?.timeline[0]?.state}`)}
                      // customChild={getTimelineCaptions(workflowDetails?.data?.timeline[0])}
                      customChild={""}
                    />
                  ) : (
                    <ConnectingCheckPoints>
                      {workflowDetails?.data?.timeline &&
                        workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
                          return (
                            <React.Fragment key={index}>
                              <CheckPoint
                                keyValue={index}
                                isCompleted={index === 0}
                                info={checkpoint.comment}
                                label={t(
                                  `${timelineStatusPrefix}${
                                    checkpoint?.performedAction === "REOPEN" ? checkpoint?.performedAction : checkpoint?.[statusAttribute]
                                  }`
                                )}
                                // customChild={getTimelineCaptions(checkpoint)}
                                customChild={""}
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

export default BirthInclusionSummary;
