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
    scrollToTop();
  };

  function OpenImage(imageSource, index, thumbnailsToShow) {
    window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
  }

  const setDocumentsView = (documentData) => {
    const documentIds = documentData?.map((item) => item.filestoreId);
    fetchImage(documentIds);
  };

  useEffect(() => {
    if (deathCorrectionData?.length > 0) {
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
      history.push({
          pathname:  `/digit-ui/citizen/cr/death-correction-acknowledgement`,
          state: { navData, deathCorrectionData: {} ,mutationData:{ data : mutation.data, isSuccess: mutation.isSuccess, isLoading : mutation?.isLoading }}
        });
    }
    },[mutation])
    
  const submitDeathCorrection = () => {
    const resp = mutation.mutate(deathCorrectionFormsObj, { onSuccess: navigateAcknowledgement });
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
        fieldValue = data ? data : t("CR_NOT_RECORDED") ;
        break;
      case "date":
        fieldValue = data ? moment(data).format("DD/MM/YYYY") : t("CR_NOT_RECORDED") ;
        break;
    }
    return fieldValue;
  };

  const renderCardDetail = (index,value, fieldName, documentData) => {
    const type = fieldName === "DECEASED_DOB" ? "date" : "text";
    const columnName = (value.column === "CR_DECEASED_LAST_NAME_ML") ? t("DECEASED_LAST_NAME_ML") : t(value.column);
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <h3 style={{ overflowWrap: "break-word" }}>{columnName} :</h3>
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
                      <h5>{t("CR_OLD_VALUE")}</h5>{" "}
                    </div>
                    <div className="col-md-3">
                      {" "}
                      <h5>{t("CR_NEW_VALUE")}</h5>{" "}
                    </div>
                  </div>
                </div>
                {detail?.correctionFieldValue?.map((value, index) => renderCardDetail(index,value, detail.correctionFieldName, detail.CorrectionDocument))}
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
            <Carousel {...{ carouselItems: imagesThumbs }}  imageHeight={300} containerStyle={{ height: "300px", width: "400px", overflow: "scroll" }} />
          </div>
        )}
      </div>
    </>
  );
}

export default DeathCorrectionSummary;
