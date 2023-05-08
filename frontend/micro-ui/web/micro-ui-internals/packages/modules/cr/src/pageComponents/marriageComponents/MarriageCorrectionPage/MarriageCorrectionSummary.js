import {
  BreakLine,
  CardSectionHeader,
  CardSubHeader,
  CheckPoint,
  ConnectingCheckPoints,
  Loader,
  Row,
  SubmitBar,
  StatusTable,
  LinkButton,
  Carousel,
  Accordion,
} from "@egovernments/digit-ui-react-components";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useHistory } from "react-router-dom";
import { MARRIAGE_INCLUSION_FIELD_NAMES } from "../../../config/constants";
import moment from "moment";

function MarriageCorrectionSummary({
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
  let navData = location?.state?.navData;
  const marriageCorrectionFormsObj = location?.state?.marriageCorrectionData;
  let marriageCorrectionData = location?.state?.marriageCorrectionData?.CorrectionDetails?.[0]?.CorrectionField;
  const [imagesThumbs, setImagesThumbs] = useState([]);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();

  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_MARRIAGE_CORRECTION", {});

  const marriageFieldLabels = {
    marriageDOM: "CR_DATE_OF_MARRIAGE",
    "GroomDetails.groomFirstnameEn": "CR_FIRST_NAME_EN",
    "GroomDetails.groomFirstnameMl": "CR_FIRST_NAME_ML",
    "GroomDetails.groomMiddlenameEn": "CR_MIDDLE_NAME_EN",
    "GroomDetails.groomMiddlenameMl": "CR_MIDDLE_NAME_ML",
    "GroomDetails.groomLastnameEn": "CR_LAST_NAME_EN",
    "GroomDetails.groomLastnameMl": "CR_LAST_NAME_ML",
    "GroomDetails.groomDOB": "CR_DATE_OF_BIRTH_TIME",
    "GroomDetails.groomAge": "CR_AGE",
    "GroomDetails.groomMothernameEn": "CR_MOTHER_NAME_EN",
    "GroomDetails.groomMothernameMl": "CR_MOTHER_NAME_ML",
    "GroomDetails.groomFathernameEn": "CR_FATHER_NAME_EN",
    "GroomDetails.groomFathernameMl": "CR_FATHER_NAME_ML",
    "GroomDetails.groomGuardiannameEn": "CR_GUARDIAN_NAME_EN",
    "GroomDetails.groomGuardiannameMl": "CR_GUARDIAN_NAME_ML",
    "GroomAddressDetails.permntInKeralaAdrHouseNameEn": "CR_HOUSE_NO_AND_NAME_EN",
    "GroomAddressDetails.permntInKeralaAdrHouseNameMl": "CR_HOUSE_NO_AND_NAME_MAL",
    "GroomAddressDetails.permntInKeralaAdrLocalityNameEn": "CR_LOCALITY_EN",
    "GroomAddressDetails.permntInKeralaAdrLocalityNameMl": "CR_LOCALITY_ML",
    "GroomAddressDetails.permntInKeralaAdrStreetNameEn": "CR_STREET_EN",
    "GroomAddressDetails.permntInKeralaAdrStreetNameMl": "CR_STREET_MAL",
    "GroomAddressDetails.permntOutsideKeralaHouseNameEn": "CR_HOUSE_NO_AND_NAME_EN",
    "GroomAddressDetails.permntOutsideKeralaHouseNameMl": "CR_HOUSE_NO_AND_NAME_MAL",
    "GroomAddressDetails.permntOutsideKeralaLocalityNameEn": "CR_LOCALITY_EN",
    "GroomAddressDetails.permntOutsideKeralaLocalityNameMl": "CR_LOCALITY_ML",
    "GroomAddressDetails.permntOutsideKeralaStreetNameEn": "CR_STREET_EN",
    "GroomAddressDetails.permntOutsideKeralaStreetNameMl": "CR_STREET_MAL",
    "GroomAddressDetails.permntOutsideIndiaLineoneEn": "CR_ADDRES_LINE_ONE_EN",
    "GroomAddressDetails.permntOutsideIndiaLineoneMl": "CR_ADDRES_LINE_ONE_ML",
    "GroomAddressDetails.permntOutsideIndiaLinetwoEn": "CR_ADDRES_LINE_TWO_EN",
    "GroomAddressDetails.permntOutsideIndiaLinetwoMl": "CR_ADDRES_LINE_TWO_ML",

    "BrideDetails.brideFirstnameEn": "CR_FIRST_NAME_EN",
    "BrideDetails.brideFirstnameMl": "CR_FIRST_NAME_ML",
    "BrideDetails.brideMiddlenameEn": "CR_MIDDLE_NAME_EN",
    "BrideDetails.brideMiddlenameMl": "CR_MIDDLE_NAME_ML",
    "BrideDetails.brideLastnameEn": "CR_LAST_NAME_EN",
    "BrideDetails.brideLastnameMl": "CR_LAST_NAME_ML",
    "BrideDetails.brideDOB": "CR_DATE_OF_BIRTH_TIME",
    "BrideDetails.brideAge": "CR_AGE",
    "BrideDetails.brideMothernameEn": "CR_MOTHER_NAME_EN",
    "BrideDetails.brideMothernameMl": "CR_MOTHER_NAME_ML",
    "BrideDetails.brideFathernameEn": "CR_FATHER_NAME_EN",
    "BrideDetails.brideFathernameMl": "CR_FATHER_NAME_ML",
    "BrideDetails.brideGuardiannameEn": "CR_GUARDIAN_NAME_EN",
    "BrideDetails.brideGuardiannameMl": "CR_GUARDIAN_NAME_ML",
    "BrideAddressDetails.permntInKeralaAdrHouseNameEn": "CR_HOUSE_NO_AND_NAME_EN",
    "BrideAddressDetails.permntInKeralaAdrHouseNameMl": "CR_HOUSE_NO_AND_NAME_MAL",
    "BrideAddressDetails.permntInKeralaAdrLocalityNameEn": "CR_LOCALITY_EN",
    "BrideAddressDetails.permntInKeralaAdrLocalityNameMl": "CR_LOCALITY_ML",
    "BrideAddressDetails.permntInKeralaAdrStreetNameEn": "CR_STREET_EN",
    "BrideAddressDetails.permntInKeralaAdrStreetNameMl": "CR_STREET_ML",
    "BrideAddressDetails.permntOutsideKeralaHouseNameEn": "CR_HOUSE_NO_AND_NAME_EN",
    "BrideAddressDetails.permntOutsideKeralaHouseNameMl": "CR_HOUSE_NO_AND_NAME_MAL",
    "BrideAddressDetails.permntOutsideKeralaLocalityNameEn": "CR_LOCALITY_EN",
    "BrideAddressDetails.permntOutsideKeralaLocalityNameMl": "CR_LOCALITY_ML",
    "BrideAddressDetails.permntOutsideKeralaStreetNameEn": "CR_STREET_EN",
    "BrideAddressDetails.permntOutsideKeralaStreetNameMl": "CR_STREET_ML",
    "BrideAddressDetails.permntOutsideIndiaLineoneEn": "CR_ADDRES_LINE_ONE_EN",
    "BrideAddressDetails.permntOutsideIndiaLineoneMl": "CR_ADDRES_LINE_ONE_ML",
    "BrideAddressDetails.permntOutsideIndiaLinetwoEn": "CR_ADDRES_LINE_TWO_EN",
    "BrideAddressDetails.permntOutsideIndiaLinetwoMl": "CR_ADDRES_LINE_TWO_ML",
  };

  // useEffect(() => {
  //   console.log("navigated data==", navData, marriageCorrectionData);
  //   // if (uploadedImages?.length > 0) {
  //   //   fetchImage()
  //   // }
  // }, []);

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
    setImagesThumbs(formattedImageThumbs);
  };

  function OpenImage(imageSource, index, thumbnailsToShow) {
    window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
  }

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

  useEffect(() => {
    if (marriageCorrectionData?.length > 0) {
      setDocumentsView(marriageCorrectionData?.[0]?.CorrectionDocument);
    }
  }, []);

  const getFieldType = (fieldName, value) => {
    let fieldType = "text";
    if (
      fieldName === "DOM" ||
      (fieldName === "GROOM_AGE" && value.column === "GroomDetails.groomDOB") ||
      (fieldName === "BRIDE_AGE" && value.column === "BrideDetails.brideDOB")
    ){
      fieldType = "date";
    }
      return fieldType;
  };

  const renderCardDetail = (index, value, fieldName, documentData) => {
    const type = getFieldType(fieldName, value);
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-4">
            <h3 style={{ overflowWrap: "break-word" }}>{t(marriageFieldLabels[value.column])} :</h3>
          </div>
          <div className="col-md-3">
            <h4>
              <strong style={{ wordWrap: "break-word" }}>{getFieldValue(value?.oldValue, type)}</strong>
            </h4>
          </div>
          <div className="col-md-3">
            <h4>
              <strong style={{ wordWrap: "break-word" }}>{getFieldValue(value?.newValue, type)}</strong>
            </h4>
          </div>
          <div className="col-md-2">
          {index === 0 &&
            <LinkButton label={t("CR_VIEW")} style={{ fontWeight: "bold", color: "#86a4ad", cursor:"pointer" }} onClick={() => setDocumentsView(documentData)} />
          }
          </div>
        </div>
      </div>
    );
  };

  const renderSummaryCard = (detail, index) => {
    //  switch()
    return (
      <React.Fragment key={index}>
        <div style={getMainDivStyles()}>
          <Accordion
            expanded={index === 0 ? true : false}
            title={t(detail?.correctionFieldName)}
            style={{ margin: "10px" }}
            content={
              <StatusTable style={getTableStyles()}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      {" "}
                      <h3></h3>{" "}
                    </div>
                    <div className="col-md-3">
                      {" "}
                      <h5>{t("CR_OLD_VALUE")}</h5>{" "}
                    </div>
                    <div className="col-md-3">
                      {" "}
                      <h5>{t("CR_NEW_VALUE")}</h5>{" "}
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

  const mutation = Digit.Hooks.cr.useMarriageCorrectionAction(tenantId);

  const navigateAcknowledgement = (data = {}) => {
    setParams({});
    history.push({
      pathname: `/digit-ui/citizen/cr/marriage-correction-acknowledgement`,
      state: { navData, marriageCorrectionData: data, mutationData: { data: data, isSuccess: true, isLoading: false } },
    });
  };

  useEffect(() => {
    if (mutation?.isError) {
      setParams({});
      history.push({
        pathname: `/digit-ui/citizen/cr/marriage-correction-acknowledgement`,
        state: {
          navData,
          marriageCorrectionData: {},
          mutationData: { data: mutation.data, isSuccess: mutation.isSuccess, isLoading: mutation?.isLoading },
        },
      });
    }
  }, [mutation]);

  const onSubmitMarriageCorrection = () => {
    mutation.mutate(marriageCorrectionFormsObj, { onSuccess: navigateAcknowledgement });
  };

  return (
    <>
      <div className="file-main">
        <div className={"cr-wrapper-app"}>
          {marriageCorrectionData?.length > 0 && marriageCorrectionData?.map((detail, index) => renderSummaryCard(detail, index))}
          {marriageCorrectionData?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
              <SubmitBar label={t("CS_COMMON_BACK")} onSubmit={() => history.goBack()} />
              <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmitMarriageCorrection} />
            </div>
          )}
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

export default MarriageCorrectionSummary;
