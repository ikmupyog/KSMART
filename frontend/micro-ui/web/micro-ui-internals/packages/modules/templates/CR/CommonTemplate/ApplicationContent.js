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
  LabelFieldPair,
  RadioButtons,
} from "@egovernments/digit-ui-react-components";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BPADocuments from "../../ApplicationDetails/components/BPADocuments";
import InspectionReport from "../../ApplicationDetails/components/InspectionReport";
import NOCDocuments from "../../ApplicationDetails/components/NOCDocuments";
import PermissionCheck from "../../ApplicationDetails/components/PermissionCheck";
import PropertyDocuments from "../../ApplicationDetails/components/PropertyDocuments";
import PropertyEstimates from "../../ApplicationDetails/components/PropertyEstimates";
import PropertyFloors from "../../ApplicationDetails/components/PropertyFloors";
import PropertyOwners from "../../ApplicationDetails/components/PropertyOwners";
import ScruntinyDetails from "../../ApplicationDetails/components/ScruntinyDetails";
import SubOccupancyTable from "../../ApplicationDetails/components/SubOccupancyTable";
import TLCaption from "../../ApplicationDetails/components/TLCaption";
import TLTradeAccessories from "../../ApplicationDetails/components/TLTradeAccessories";
import TLTradeUnits from "../../ApplicationDetails/components/TLTradeUnits";
import DocumentsPreview from "../../ApplicationDetails/components/DocumentsPreview";

function ApplicationContent({
  applicationDetails,
  workflowDetails,
  isDataLoading,
  applicationData,
  businessService,
  timelineStatusPrefix,
  showTimeLine = true,
  statusAttribute = "status",
  paymentsList,
  selectDeathtype,
  selectBirthtype,
}) {
  const { t } = useTranslation();

  function OpenImage(imageSource, index, thumbnailsToShow) {
    window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
  }
  const [selectedValueRadio, setSelectedValue] = useState(
    applicationDetails?.InformationDeath?.isDeathNAC
      ? { i18nKey: "CR_IS_NAC", code: "NAC" }
      : applicationDetails?.InformationDeath?.isDeathNIA
      ? { i18nKey: "CR_IS_NIA", code: "NIA" }
      : {}
  );
  const [selectedNACValueRadio, setSelectedNACValue] = useState(
    applicationDetails?.isBirthNAC
      ? { i18nKey: "CR_IS_NAC", code: "NAC" }
      : applicationDetails?.isBirthNIA
      ? { i18nKey: "CR_IS_NIA", code: "NIA" }
      : {}
  );

  const radiomenu = [
    { i18nKey: "CR_IS_NAC", code: "NAC" },
    { i18nKey: "CR_IS_NIA", code: "NIA" },
  ];

  const getTimelineCaptions = (checkpoint) => {
    if (checkpoint.state === "OPEN" || (checkpoint.status === "INITIATED" && !window.location.href.includes("/obps/"))) {
      const caption = {
        date: checkpoint?.auditDetails?.created,
        source: applicationData?.channel || "",
        name: checkpoint?.assigner?.name,
        mobileNumber: checkpoint?.assigner?.mobileNumber,
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
      console.log({ checkpoint });
      const caption = {
        date: checkpoint?.auditDetails?.lastModified,
        name: checkpoint?.assigner?.name,
        // mobileNumber: checkpoint?.assigner?.mobileNumber,
        wfComment: checkpoint?.wfComment,
        mobileNumber: checkpoint?.assigner?.mobileNumber,
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

  const deathNACurl = window.location.href.includes("application-deathnacdetails") ? true : false;
  const { roles: userRoles } = Digit.UserService.getUser().info;

  const isLocalRegistrator = userRoles[0]?.code === "BND_LOCAL_REGISTRAR" ? true : false;
  const birthNACurl = window.location.href.includes("application-nacbirth") ? true : false;

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

  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (applicationDetails?.documents && applicationDetails?.documents?.values?.length > 0) {
      fetchImage(applicationDetails?.documents?.values);
    }
  }, [applicationDetails]);

  const fetchImage = async (docs) => {
    setDocuments(null);
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(docs, applicationDetails?.documents?.tenentId);
    const newdocuments = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      if (fileType === "image") {
        return { image: key.url.split(",")[1], key: key.id };
      } else {
        return { image: key.url, key: key.id };
      }
    });
    console.log({ newdocuments });
    setDocuments(newdocuments);
  };

  return (
    <>
      <div className="file-main">
        <div className={"cr-wrapper-app"}>
          {applicationDetails?.applicationDetails?.map((detail, index) => (
            <React.Fragment key={index}>
              <div style={getMainDivStyles()}>
                {index === 0 ? (
                  <CardSubHeader style={{ marginBottom: "16px", fontSize: "18px" }}>{t(detail.title)}</CardSubHeader>
                ) : (
                  <Accordion
                    expanded={index === 1 ? true : false}
                    title={isNocLocation ? `${t(detail.title)}` : t(detail.title)}
                    style={{ margin: "10px" }}
                    content={
                      <StatusTable style={getTableStyles()}>
                        {detail?.title &&
                          !detail?.title.includes("NOC") &&
                          detail?.values?.map((value, index) => {
                            if (value.map === true && value.value !== "N/A") {
                              return <Row key={t(value.title)} label={t(value.title)} text={<img src={t(value.value)} alt="" />} />;
                            }
                            if (value?.isLink == true) {
                              return (
                                <Row
                                  key={t(value.title)}
                                  label={
                                    window.location.href.includes("tl") ? (
                                      <div style={{ width: "200%" }}>
                                        <Link to={value?.to}>
                                          <span className="link" style={{ color: "#F47738" }}>
                                            {t(value?.title)}
                                          </span>
                                        </Link>
                                      </div>
                                    ) : isNocLocation || isBPALocation ? (
                                      `${t(value.title)}`
                                    ) : (
                                      t(value.title)
                                    )
                                  }
                                  text={
                                    <div>
                                      <Link to={value?.to}>
                                        <span className="link" style={{ color: "#F47738" }}>
                                          {value?.value}
                                        </span>
                                      </Link>
                                    </div>
                                  }
                                  last={index === detail?.values?.length - 1}
                                  caption={value.caption}
                                  className="border-none"
                                  rowContainerStyle={getRowStyles()}
                                />
                              );
                            }
                            return (
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="col-md-3">
                                    <h3 style={{ overflowWrap: "break-word" }}>{t(value.title)} :</h3>
                                  </div>
                                  <div className="col-md-4">
                                    <h4>
                                      <strong>{getTextValue(value)}</strong>
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </StatusTable>
                    }
                  />
                )}
              </div>
              {detail?.belowComponent && <detail.belowComponent />}
              {detail?.additionalDetails?.inspectionReport && (
                <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} paymentsList={paymentsList} />
              )}
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
                <BPADocuments
                  t={t}
                  applicationData={applicationDetails?.applicationData}
                  docs={detail.additionalDetails.obpsDocuments}
                  bpaActionsDetails={workflowDetails}
                />
              )}
              {detail?.additionalDetails?.noc && (
                <NOCDocuments
                  t={t}
                  isNoc={true}
                  NOCdata={detail.values}
                  applicationData={applicationDetails?.applicationData}
                  docs={detail.additionalDetails.noc}
                  noc={detail.additionalDetails?.data}
                  bpaActionsDetails={workflowDetails}
                />
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
          ))}
          {deathNACurl && isLocalRegistrator && (
            <div style={{ marginTop: "50px" }}>
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_IS_NAC_OR_NIA")}`}</span>{" "}
                  </h1>
                </div>
                <div className="col-md-6">
                  <div className="radios">
                    <div className="radiobuttons">
                      <LabelFieldPair style={{ display: "flex" }}>
                        <RadioButtons
                          t={t}
                          optionsKey="i18nKey"
                          options={radiomenu}
                          selectedOption={selectedValueRadio}
                          onSelect={(data) => {
                            console.log({ data });
                            setSelectedValue(data);
                            selectDeathtype(data);
                          }}
                          style={{ marginTop: "10px", paddingLeft: "5px", height: "20px", display: "flex" }}
                        />
                      </LabelFieldPair>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {birthNACurl && isLocalRegistrator && (
            <div style={{ marginTop: "50px" }}>
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_IS_NAC_OR_NIA")}`}</span>{" "}
                  </h1>
                </div>
                <div className="col-md-6">
                  <div className="radios">
                    <div className="radiobuttons">
                      <LabelFieldPair style={{ display: "flex" }}>
                        <RadioButtons
                          t={t}
                          optionsKey="i18nKey"
                          options={radiomenu}
                          selectedOption={selectedNACValueRadio}
                          onSelect={(data) => {
                            console.log({ data });
                            setSelectedNACValue(data);
                            selectBirthtype(data);
                          }}
                          style={{ marginTop: "10px", paddingLeft: "5px", height: "20px", display: "flex" }}
                        />
                      </LabelFieldPair>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={"cr-timeline-wrapper"}>
          {documents && documents.length > 0 && (
            <Carousel carouselItems={documents || []} imageHeight={300} containerStyle={{ height: "300px", width: "auto", overflow: "scroll" }} />
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
                      customChild={getTimelineCaptions(workflowDetails?.data?.timeline[0])}
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
