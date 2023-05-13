import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { LOCALIZATION_KEY } from "../../constants/Localization";

import {
  Card,
  CardLabel,
  Header,
  CardSubHeader,
  StatusTable,
  Row,
  Accordion,
  SubmitBar,
  DisplayPhotos,
  ImageViewer,
  Loader,
  Toast,
} from "@egovernments/digit-ui-react-components";

import TimeLine from "../../components/TimeLine";
const tableStyle = {
  marginLeft: "15px",
};
const cardStyle = {
  display: "flex",
  gap: "20px",
};
const complntSummary = {
  width: "100%",
};
const timelineWidth = {
  width: "100%"
}
const WorkflowComponent = ({ complaintDetails, id, getWorkFlow, zoomImage }) => {
  const tenantId = complaintDetails.service.tenantId;
  const workFlow = Digit.Hooks.useWorkflowDetails({ tenantId: tenantId, id, moduleCode: "PGR" });

  useEffect(() => {
    getWorkFlow(workFlow.data);
  }, [workFlow.data]);

  useEffect(() => {
    workFlow.revalidate();
  }, []);

  return (
    !workFlow.isLoading && (
      <TimeLine
        // isLoading={workFlowData.isLoading}
        data={workFlow.data}
        serviceRequestId={id}
        complaintWorkflow={complaintDetails.workflow}
        rating={complaintDetails.audit.rating}
        zoomImage={zoomImage}
        complaintDetails={complaintDetails}
      />
    )
  );
};

const ComplaintDetailsPage = (props) => {
  let { t } = useTranslation();
  let { id } = useParams();

  const [imageShownBelowComplaintDetails, setImageToShowBelowComplaintDetails] = useState({});
  const [imageZoom, setImageZoom] = useState(null);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [disableComment, setDisableComment] = useState(true);
  const [loader, setLoader] = useState(false);
  const [imagesThumbs, setImagesThumbs] = useState(null);
  const [initialRender, setInitialRender] = useState(true);
  const [workFlowData, setWorkFlowData] = useState(null);

  let tenantId = Digit.ULBService.getCurrentTenantId(); // ToDo: fetch from state
  const { isLoading, isError, complaintDetails, revalidate: revalidateComplaintDetails } = Digit.Hooks.pgr.useComplaintDetails({ tenantId, id });

  const fetchImage = async (uploadedImages) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, complaintDetails.service.tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url)
      return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
    });
    setImagesThumbs(newThumbnails);
    setInitialRender(false)
  }

  useEffect(() => {
    if (workFlowData) {
      const { timeline: complaintTimelineData = [] } = workFlowData;
      if (complaintTimelineData) {
        const actionByCitizenOnComplaintCreation = complaintTimelineData?.find((e) => e?.performedAction === "APPLY");
        const { wfDocuments } = actionByCitizenOnComplaintCreation;
        if (wfDocuments && wfDocuments.length > 0) {
          const imageUrls = wfDocuments.map(item => item.fileStoreId)
          fetchImage(imageUrls)
        }
      }
    }
  }, [workFlowData]);

  useEffect(() => {
    (async () => {
      if (complaintDetails) {
        setLoader(true);
        await revalidateComplaintDetails();
        setLoader(false);
      }
    })();
  }, []);

  function zoomImage(imageSource, index) {
    setImageZoom(imageSource);
  }
  function zoomImageWrapper(imageSource, index) {
    zoomImage(imageShownBelowComplaintDetails?.fullImage[index]);
  }

  function onCloseImageZoom() {
    setImageZoom(null);
  }

  const onWorkFlowChange = (data) => {
    setWorkFlowData(data)
    let timeline = data?.timeline;
    timeline && timeline[0].timeLineActions?.filter((e) => e === "COMMENT").length ? setDisableComment(false) : setDisableComment(true);
    if (timeline) {
      const actionByCitizenOnComplaintCreation = timeline.find((e) => e?.performedAction === "APPLY");
      const { thumbnailsToShow } = actionByCitizenOnComplaintCreation;
      setImageToShowBelowComplaintDetails(thumbnailsToShow);
    }
  };

  if (isLoading || loader) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  return (
    <React.Fragment>
      {/* <div className="complaint-summary">
        <Header>{t(`${LOCALIZATION_KEY.CS_HEADER}_COMPLAINT_SUMMARY`)}</Header> */}
      {complaintDetails ? <div style={cardStyle}>
        <div style={{ position: "relative" }} className={"wrapper-app"}>
          <div style={complntSummary}>
            <Accordion expanded={true} title={`${t('CS_COMPLAINT_DETAILS_COMPLAINT_DETAILS')}`}
              content={<StatusTable style={{ position: "relative", marginTop: "19px" }}>
                <div className="row">
                  <div className="col-md-12">
                    {
                      Object.entries(complaintDetails?.rowDetails?.basicDetails).map(([key, val], i) =>
                        <div className="col-md-12" style={{ marginBottom: "20px" }} key={key}>
                          <p style={{ overflowWrap: "break-word" }}><strong>{t(key)} : </strong> {t(val) || 'N/A'}</p>
                        </div>
                      )
                    }
                  </div>
                </div>
              </StatusTable>} />
            <Accordion title={`${t('CS_ADDCOMPLAINT_COMPLAINT_DETAILS')}`}
              content={<StatusTable style={{ position: "relative", marginTop: "19px" }}>
                <div className="row">
                  <div className="col-md-12">
                    {
                      Object.entries(complaintDetails?.rowDetails?.additionalDetails).map(([key, val]) => {
                        if (val && typeof val === 'object') {
                          return (
                            <div className="col-md-12" style={{ marginBottom: "20px" }} key={key}>
                              <div><strong>{t(key)} : </strong>
                                <div style={{ marginLeft: "5%" }}> {val.map((line, i) =>
                                  <p key={i} style={{ overflowWrap: "break-word" }}>{t(line)}</p>)}</div>
                              </div>
                            </div>)
                        } else {
                          return <div className="col-md-6" style={{ marginBottom: "20px" }} key={key}>
                            <p style={{ overflowWrap: "break-word" }}><strong>{t(key)} : </strong> {t(val) || 'N/A'}</p>
                          </div>
                        }
                      })
                    }
                  </div>
                </div>
              </StatusTable>} />
            {imagesThumbs ?
              <Accordion title={`${t('CS_ADDCOMPLAINT_DOCUMENTS')}`}
                content={<StatusTable>
                  {/* {imagesToShowBelowComplaintDetails?.thumbs ? (
                  <DisplayPhotos srcs={imagesToShowBelowComplaintDetails?.thumbs} onClick={(source, index) => zoomImageWrapper(source, index)} />
                ) : <p>N/A</p>} */}
                  <div className="row">
                    <div className="col-md-12" style={{ display: "flex", marginLeft: "15px" }}>
                      {imagesThumbs.map((thumbnail, index) => {
                        return (
                          <div key={index}>
                            {thumbnail.type == "pdf" ?
                              <React.Fragment>
                                <object style={{ height: "120px", cursor: "zoom-in", margin: "5px" }} height={120} data={thumbnail.pdfUrl}
                                  alt={`upload-thumbnails-${index}`} />
                              </React.Fragment> :
                              <img style={{ height: "120px", cursor: "zoom-in", margin: "5px" }} height={120} src={thumbnail.small}
                                alt={`upload-thumbnails-${index}`} onClick={() => setImageZoom(thumbnail.large)} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </StatusTable>} /> : null}
            {/* <CardSubHeader style={{ fontSize: "26px" }}>{t(`${LOCALIZATION_KEY.CS_HEADER}_COMPLAINT_SUMMARY`)}</CardSubHeader> */}

          </div>
          {/* <div style={borderStyle}></div> */}

        </div>
        <div className={"timeline-wrapper"} style={{ marginRight: "15px" }}>
          <div style={timelineWidth}>
            {complaintDetails?.service && (
              <WorkflowComponent getWorkFlow={onWorkFlowChange} complaintDetails={complaintDetails} id={id} zoomImage={zoomImage} />
            )}
          </div>
        </div>
      </div> : <Loader />}
      {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={onCloseImageZoom} /> : null}
      {toast && (
        <Toast
          error={commentError}
          label={!commentError ? t(`CS_COMPLAINT_COMMENT_SUCCESS`) : t(`CS_COMPLAINT_COMMENT_ERROR`)}
          onClose={() => setToast(false)}
        />
      )}{" "}
    </React.Fragment>
  );
};

export default ComplaintDetailsPage;




// {Object.keys(complaintDetails).length > 0 ? (
//   <div style={tableStyle}>
//     {/* <Card> */}
//     {/* <CardLabel>{t(`SERVICEDEFS.${complaintDetails.audit.serviceCode.toUpperCase()}`)}</CardLabel> */}
//     <StatusTable>
//       {Object.keys(complaintDetails.details).map((flag, index, arr) => (
//         <Row
//           key={index}
//           label={t(flag)}
//           text={
//             Array.isArray(complaintDetails.details[flag])
//               ? complaintDetails.details[flag].map((val) => (typeof val === "object" ? t(val?.code) : t(val)))
//               : t(complaintDetails.details[flag]) || "N/A"
//           }
//           last={index === arr.length - 1}
//         />
//       ))}
//     </StatusTable>
//     {imageShownBelowComplaintDetails?.thumbs ? (
//       <DisplayPhotos srcs={imageShownBelowComplaintDetails?.thumbs} onClick={(source, index) => zoomImageWrapper(source, index)} />
//     ) : null}
//     {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={onCloseImageZoom} /> : null}
//     {/* </Card>
// <Card> */}

//     {/* </Card> */}
//     {/* <Card>
// <CardSubHeader>{t(`${LOCALIZATION_KEY.CS_COMMON}_COMMENTS`)}</CardSubHeader>
// <TextArea value={comment} onChange={(e) => setComment(e.target.value)} name="" />
// <SubmitBar disabled={disableComment || comment.length < 1} onSubmit={submitComment} label={t("CS_PGR_SEND_COMMENT")} />
// </Card> */}
//   </div>
// ) : (
//   <Loader />
// )}