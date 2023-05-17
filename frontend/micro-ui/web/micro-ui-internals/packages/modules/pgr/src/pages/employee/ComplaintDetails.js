import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card, CardLabel, CardLabelDesc, CardSubHeader, DisplayPhotos, MediaRow, Row, StatusTable, PopUp, HeaderBar, ImageViewer,
  TextArea, UploadFile, Toast, ActionBar, Menu, SubmitBar, Dropdown, Loader, Modal, SectionalDropdown, Accordion
} from "@egovernments/digit-ui-react-components";

import { Close } from "../../Icons";
import { useTranslation } from "react-i18next";
import { isError, useQueryClient } from "react-query";
import StarRated from "../../components/timelineInstances/StarRated";
import TimeLine from "../../components/TimeLine";

const MapView = (props) => {
  return (
    <div onClick={props.onClick}>
      <img src="https://via.placeholder.com/640x280" />
    </div>
  );
};
const cardStyle = {
  display: "flex",
};
const complntSummary = {
  width: "100%",
};
const timelineWidth = {
  width: "100%",
};
const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};

const CloseBtn = (props) => {
  return (
    <div className="icon-bg-secondary" onClick={props.onClick}>
      <Close />
    </div>
  );
};

const TLCaption = ({ data, comments }) => {
  const { t } = useTranslation();
  return (
    <div>
      {data?.date && <p>{data?.date}</p>}
      <p>{data?.name}</p>
      <p>{data?.mobileNumber}</p>
      {data?.source && <p>{t("ES_COMMON_FILED_VIA_" + data?.source.toUpperCase())}</p>}
      {comments?.map((e) => (
        <div className="TLComments">
          <h3>{t("WF_COMMON_COMMENTS")}</h3>
          <p>{e}</p>
        </div>
      ))}
    </div>
  );
};

const WorkflowComponent = ({ complaintDetails, id, zoomImage }) => {
  const tenantId = complaintDetails.service.tenantId;
  const workFlowDetails = Digit.Hooks.useWorkflowDetails({ tenantId: tenantId, id, moduleCode: "PGR" });

  useEffect(() => {
    workFlowDetails.revalidate();
  }, []);

  return (
    !workFlowDetails.isLoading && (
      <TimeLine
        // isLoading={workFlowDetails.isLoading}
        data={workFlowDetails.data}
        serviceRequestId={id}
        complaintWorkflow={complaintDetails.workflow}
        rating={complaintDetails.audit.rating}
        zoomImage={zoomImage}
        complaintDetails={complaintDetails}
      />
    )
  );
};

const ComplaintDetailsModal = ({ workflowDetails, complaintDetails, close, popup, selectedAction, onAssign, tenantId, t }) => {
  // RAIN-5692 PGR : GRO is assigning complaint, Selecting employee and assign. Its not getting assigned.
  // Fix for next action  assignee dropdown issue
  const stateArray = workflowDetails?.data?.initialActionState?.nextActions?.filter((ele) => ele?.action == selectedAction);
  const useEmployeeData = Digit.Hooks.pgr.useEmployeeFilter(
    tenantId,
    stateArray?.[0]?.actions?.[0]?.uuid,
    stateArray?.[0]?.assigneeRoles?.length > 0 ? stateArray?.[0]?.assigneeRoles?.join(",") : "",
    complaintDetails
  );
  const employeeData = useEmployeeData
    ? useEmployeeData.map((departmentData) => {
      return { heading: departmentData.department, options: departmentData.employees };
    })
    : null;

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [comments, setComments] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  const [selectedReopenReason, setSelectedReopenReason] = useState(null);

  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 2242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            // TODO: change module in file storage
            const response = await Digit.UploadServices.Filestorage("property-upload", file, cityDetails.code);
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("CS_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
            setError(t("CS_FILE_UPLOAD_ERROR"));
          }
        }
      }
    })();
  }, [file]);

  const reopenReasonMenu = [t(`CS_REOPEN_OPTION_ONE`), t(`CS_REOPEN_OPTION_TWO`), t(`CS_REOPEN_OPTION_THREE`), t(`CS_REOPEN_OPTION_FOUR`)];
  // const uploadFile = useCallback( () => {

  //   }, [file]);

  function onSelectEmployee(employee) {
    setSelectedEmployee(employee);
  }

  const locale = Digit.SessionStorage.get("locale");

  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C 0-9!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;
  let en_pattern = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

  const addComment = (e) => {
    if (e.target.value.trim().length <= 50) {
      if (locale === "ml_IN") {
        if (e.target.value.match(ml_pattern)) {
          setComments(e.target.value.substring(0, 50));
        }
      } else if (e.target.value.match(en_pattern)) {
        setComments(e.target.value.substring(0, 50));
      }
    }
  }

  function selectfile(e) {
    setFile(e.target.files[0]);
  }

  function onSelectReopenReason(reason) {
    setSelectedReopenReason(reason);
  }

  const handleSubmit = (selectedEmployee, comments, uploadedFile) => {
    if (selectedAction !== "REJECT" || selectedAction !== "RESOLVE" || selectedAction !== "REOPEN" || selectedAction == "RETURN") {
      if (selectedEmployee) {
        if (comments) {
          onAssign(selectedEmployee, comments, uploadedFile)
        } else {
          setError(t("PGR_COMMENT_REQUIRED"));
        }
      } else {
        setError(t("PGR_EMPLOYEE_REQUIRED"));
      }
    }
  }

  return (
    <Modal
      headerBarMain={
        <Heading
          label={
            selectedAction === "ASSIGN" || selectedAction === "REASSIGN"
              ? t("CS_ACTION_ASSIGN")
              : selectedAction === "VERIFY"
                ? t("CS_ACTION_VERIFY")
                : selectedAction === "REJECT"
                  ? t("CS_ACTION_REJECT")
                  : selectedAction === "REOPEN"
                    ? t("CS_COMMON_REOPEN")
                    : selectedAction === "RETURN"
                      ? t("CS_COMMON_RETURN")
                      : t("CS_COMMON_RESOLVE")
          }
        />
      }
      headerBarEnd={<CloseBtn onClick={() => close(popup)} />}
      actionCancelLabel={t("CS_COMMON_CANCEL")}
      actionCancelOnSubmit={() => close(popup)}
      actionSaveLabel={
        selectedAction === "ASSIGN" || selectedAction === "REASSIGN"
          ? t("CS_COMMON_ASSIGN")
          : selectedAction === "VERIFY"
            ? t("CS_ACTION_VERIFY")
            : selectedAction === "REJECT"
              ? t("CS_COMMON_REJECT")
              : selectedAction === "REOPEN"
                ? t("CS_COMMON_REOPEN")
                : selectedAction === "RETURN"
                  ? t("CS_COMMON_RETURN")
                  : t("CS_COMMON_RESOLVE")
      }
      actionSaveOnSubmit={() => {
        handleSubmit(selectedEmployee, comments, uploadedFile);
      }}
      error={error}
      setError={setError}
    >
      <Card>
        {selectedAction === "REJECT" || selectedAction === "RESOLVE" || selectedAction === "REOPEN" || selectedAction === "RETURN" ? null : (
          <React.Fragment>
            <CardLabel>{t("CS_COMMON_EMPLOYEE_NAME")}</CardLabel>
            {employeeData && <SectionalDropdown selected={selectedEmployee} menuData={employeeData} displayKey="name" select={onSelectEmployee} />}
          </React.Fragment>
        )}
        {selectedAction === "REOPEN" ? (
          <React.Fragment>
            <CardLabel>{t("CS_REOPEN_COMPLAINT")}</CardLabel>
            <Dropdown selected={selectedReopenReason} option={reopenReasonMenu} select={onSelectReopenReason} />
          </React.Fragment>
        ) : null}
        <CardLabel>{t("CS_COMMON_EMPLOYEE_COMMENTS")} <span>{t("CS_COMMON_EMPLOYEE_COMMENTS_LIMIT")} </span></CardLabel>
        <TextArea name="comment" onChange={addComment} value={comments} />
        <CardLabel>{t("CS_ACTION_SUPPORTING_DOCUMENTS")}</CardLabel>
        <CardLabelDesc>{t(`CS_UPLOAD_RESTRICTIONS`)}</CardLabelDesc>
        <UploadFile
          id={"pgr-doc"}
          accept=".jpg"
          onUpload={selectfile}
          onDelete={() => {
            setUploadedFile(null);
          }}
          message={uploadedFile ? `1 ${t(`CS_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`)}
        />
      </Card>
    </Modal>
  );
};

export const ComplaintDetails = (props) => {
  let { id } = useParams();
  const { t } = useTranslation();
  const [fullscreen, setFullscreen] = useState(false);
  const [imageZoom, setImageZoom] = useState(null);
  const [imagesThumbs, setImagesThumbs] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  const [toast, setToast] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, complaintDetails, revalidate: revalidateComplaintDetails } = Digit.Hooks.pgr.useComplaintDetails({ tenantId, id });

  const [businessService, setBusinessService] = useState("pgrhealthcomplaints"); //DIRECTRENEWAL
  const workflowDetails = Digit.Hooks.useWorkflowDetails({ tenantId, id, moduleCode: businessService, role: "EMPLOYEE" });
  const [imagesToShowBelowComplaintDetails, setImagesToShowBelowComplaintDetails] = useState([]);

  // RAIN-5692 PGR : GRO is assigning complaint, Selecting employee and assign. Its not getting assigned.
  // Fix for next action  assignee dropdown issue
  if (workflowDetails && workflowDetails?.data) {
    workflowDetails.data.initialActionState = workflowDetails?.data?.initialActionState || { ...workflowDetails?.data?.actionState } || {};
    workflowDetails.data.actionState = { ...workflowDetails.data };
  }

  const fetchImage = async (uploadedImages) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url)
      return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
    });
    setImagesThumbs(newThumbnails);
    setInitialRender(false)
  }

  useEffect(() => {
    if (initialRender && workflowDetails) {
      const { data: { timeline: complaintTimelineData = [] } = {} } = workflowDetails;
      if (complaintTimelineData) {
        const actionByCitizenOnComplaintCreation = complaintTimelineData?.find((e) => e?.performedAction === "APPLY") || { wfDocuments: [] };
        // const { thumbnailsToShow } = actionByCitizenOnComplaintCreation;
        // thumbnailsToShow ? setImagesToShowBelowComplaintDetails(thumbnailsToShow) : null;
        const { wfDocuments } = actionByCitizenOnComplaintCreation;
        if (wfDocuments && wfDocuments.length > 0) {
          const imageUrls = wfDocuments.map(item => item.fileStoreId)
          fetchImage(imageUrls)
        }
      }
    }
  }, [workflowDetails]);

  useEffect(() => {
    if (workflowDetails?.data?.applicationBusinessService) {
      setBusinessService(workflowDetails?.data?.applicationBusinessService);
    }
  }, [workflowDetails.data]);

  const [displayMenu, setDisplayMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [assignResponse, setAssignResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const [rerender, setRerender] = useState(1);
  const client = useQueryClient();
  function popupCall(option) {
    setDisplayMenu(false);
    setPopup(true);
  }

  useEffect(() => {
    (async () => {
      const assignWorkflow = await Digit?.WorkflowService?.getByBusinessId(tenantId, id);
    })();
  }, [complaintDetails]);

  const refreshData = async () => {
    await client.refetchQueries(["fetchInboxData"]);
    await workflowDetails.revalidate();
    await revalidateComplaintDetails();
  };

  useEffect(() => {
    (async () => {
      if (complaintDetails) {
        setLoader(true);
        await refreshData();
        setLoader(false);
      }
    })();
  }, []);

  function zoomView() {
    setFullscreen(!fullscreen);
  }

  function close(state) {
    switch (state) {
      case fullscreen:
        setFullscreen(!fullscreen);
        break;
      case popup:
        setPopup(!popup);
        break;
      default:
        break;
    }
  }

  function zoomImage(imageSource, index) {
    setImageZoom(imageSource);
  }
  function zoomImageWrapper(imageSource, index) {
    zoomImage(imagesToShowBelowComplaintDetails?.fullImage[index]);
  }
  function onCloseImageZoom() {
    setImageZoom(null);
  }

  function onActionSelect(action) {
    setSelectedAction(action);
    switch (action) {
      case "RETURN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "RECOMMEND":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "VERIFY":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "ASSIGN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REASSIGN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "RESOLVE":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REJECT":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REOPEN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      default:
        setDisplayMenu(false);
    }
  }

  async function onAssign(selectedEmployee, comments, uploadedFile) {
    setPopup(false);
    let newDetails = Object.keys(complaintDetails).filter(key =>
      key !== 'rowDetails').reduce((obj, key) => {
        obj[key] = complaintDetails[key];
        return obj;
      }, {}
      );
    const response = await Digit.Complaint.assign(newDetails, selectedAction, selectedEmployee, comments, uploadedFile, tenantId);

    setAssignResponse(response);
    setToast(true);
    setLoader(true);
    await refreshData();
    setLoader(false);
    setRerender(rerender + 1);
    setTimeout(() => setToast(false), 10000);
  }

  function closeToast() {
    setToast(false);
  }

  if (isLoading || workflowDetails.isLoading || loader) {
    return <Loader />;
  }

  if (workflowDetails.isError) return <React.Fragment>{workflowDetails.error}</React.Fragment>;

  const getTimelineCaptions = (checkpoint, index, arr) => {
    const { wfComment: comment, thumbnailsToShow } = checkpoint;
    function zoomImageTimeLineWrapper(imageSource, index, thumbnailsToShow) {
      let newIndex = thumbnailsToShow.thumbs?.findIndex((link) => link === imageSource);
      zoomImage((newIndex > -1 && thumbnailsToShow?.fullImage?.[newIndex]) || imageSource);
    }
    const captionForOtherCheckpointsInTL = {
      date: checkpoint?.auditDetails?.lastModified,
      name: checkpoint?.assigner?.name,
      mobileNumber: checkpoint?.assigner?.mobileNumber,
      ...(checkpoint.status === "COMPLAINT_FILED" && complaintDetails?.audit
        ? {
          source: complaintDetails.audit.source,
        }
        : {}),
    };
    const isFirstPendingForAssignment = arr.length - (index + 1) === 1 ? true : false;
    if (checkpoint.status === "PENDINGFORASSIGNMENT" && complaintDetails?.audit) {
      if (isFirstPendingForAssignment) {
        const caption = {
          date: Digit.DateUtils.ConvertTimestampToDate(complaintDetails.audit.details.createdTime),
        };
        return <TLCaption data={caption} comments={checkpoint?.wfComment} />;
      } else {
        const caption = {
          date: Digit.DateUtils.ConvertTimestampToDate(complaintDetails.audit.details.createdTime),
        };
        return (
          <>
            {checkpoint?.wfComment ? (
              <div>
                {checkpoint?.wfComment?.map((e) => (
                  <div className="TLComments">
                    <h3>{t("WF_COMMON_COMMENTS")}</h3>
                    <p>{e}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {checkpoint.status !== "COMPLAINT_FILED" && thumbnailsToShow?.thumbs?.length > 0 ? (
              <div className="TLComments">
                <h3>{t("CS_COMMON_ATTACHMENTS")}</h3>
                <DisplayPhotos srcs={thumbnailsToShow.thumbs} onClick={(src, index) => zoomImageTimeLineWrapper(src, index, thumbnailsToShow)} />
              </div>
            ) : null}
            {caption?.date ? <TLCaption data={caption} /> : null}
          </>
        );
      }
    }
    // return (checkpoint.caption && checkpoint.caption.length !== 0) || checkpoint?.wfComment?.length > 0 ? <TLCaption data={checkpoint?.caption?.[0]} comments={checkpoint?.wfComment} /> : null;
    return (
      <>
        {comment ? (
          <div>
            {comment?.map((e) => (
              <div className="TLComments">
                <h3>{t("WF_COMMON_COMMENTS")}</h3>
                <p>{e}</p>
              </div>
            ))}
          </div>
        ) : null}
        {checkpoint.status !== "COMPLAINT_FILED" && thumbnailsToShow?.thumbs?.length > 0 ? (
          <div className="TLComments">
            <h3>{t("CS_COMMON_ATTACHMENTS")}</h3>
            <DisplayPhotos srcs={thumbnailsToShow.thumbs} onClick={(src, index) => zoomImageTimeLineWrapper(src, index, thumbnailsToShow)} />
          </div>
        ) : null}
        {captionForOtherCheckpointsInTL?.date ? <TLCaption data={captionForOtherCheckpointsInTL} /> : null}
        {checkpoint.status == "CLOSEDAFTERRESOLUTION" && complaintDetails.workflow.action == "RATE" && index <= 1 && complaintDetails.audit.rating ? (
          <StarRated text={t("CS_ADDCOMPLAINT_YOU_RATED")} rating={complaintDetails.audit.rating} />
        ) : null}
      </>
    );
  };

  return (
    <React.Fragment>
      <div style={cardStyle}>
        <div style={{ position: "relative" }} className={"wrapper-app"}>
          <div style={complntSummary}>
            {/* <CardSubHeader>{t(`CS_HEADER_COMPLAINT_SUMMARY`)}</CardSubHeader> */}
            <Accordion expanded={true} title={`${t('CS_COMPLAINT_DETAILS_COMPLAINT_DETAILS')}`}
              content={<StatusTable style={{ position: "relative", marginTop: "19px" }}>
                <div className="row">
                  <div className="col-md-12">
                    {
                      Object.entries(complaintDetails?.rowDetails?.basicDetails).map(([key, val], i) =>
                        <div className={"col-md-12"} style={{ marginBottom: "20px" }} key={key}>
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
            {isLoading ? (
              <Loader />
            ) : (
              1 === 1 ? null : (
                <Accordion title={`${t('CS_COMPLAINT_DETAILS_GEOLOCATION')}`}
                  content={<StatusTable>
                    <MediaRow label="CS_COMPLAINT_DETAILS_GEOLOCATION">
                      <MapView onClick={zoomView} />
                    </MediaRow>
                  </StatusTable>} />
              )
            )}
            {imagesThumbs && imagesThumbs.length > 0 ?
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
                </StatusTable>} />
              : null}
          </div>
        </div>
        <div className={"timeline-wrapper"}>
          <div style={timelineWidth}>
            {complaintDetails?.service && (
              <WorkflowComponent complaintDetails={complaintDetails} id={id} zoomImage={zoomImage} />
            )}
          </div>
        </div>
      </div>

      {fullscreen ? (
        <PopUp>
          <div className="popup-module">
            <HeaderBar main={<Heading label="Complaint Geolocation" />} end={<CloseBtn onClick={() => close(fullscreen)} />} />
            <div className="popup-module-main">
              <img src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_2cieu90RKipfkKS8I59nHLw48nvUiA4&callback=myMap" />
            </div>
          </div>
        </PopUp>
      ) : null}
      {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={onCloseImageZoom} /> : null}
      {popup ? (
        <ComplaintDetailsModal
          workflowDetails={workflowDetails}
          complaintDetails={complaintDetails}
          close={close}
          popup={popup}
          selectedAction={selectedAction}
          onAssign={onAssign}
          tenantId={tenantId}
          t={t}
        />
      ) : null}
      {toast && <Toast label={t(assignResponse ? `CS_ACTION_${selectedAction}_TEXT` : "CS_ACTION_ASSIGN_FAILED")} onClose={closeToast} />}
      {!workflowDetails?.isLoading && workflowDetails?.data?.nextActions?.length > 0 && (
        <ActionBar>
          {displayMenu && workflowDetails?.data?.nextActions ? (
            <Menu options={workflowDetails?.data?.nextActions.map((action) => action.action)} t={t} onSelect={onActionSelect} />
          ) : null}
          <SubmitBar label={t("WF_TAKE_ACTION")} onSubmit={() => setDisplayMenu(!displayMenu)} />
        </ActionBar>
      )}
    </React.Fragment>
  );
};
