import { Card, CardSectionHeader, CheckPoint, ConnectingCheckPoints, GreyOutText, Loader, DisplayPhotos } from "@egovernments/digit-ui-react-components";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LOCALIZATION_KEY } from "../constants/Localization";
import PendingAtLME from "./timelineInstances/pendingAtLme";
import PendingForAssignment from "./timelineInstances/PendingForAssignment";
import PendingForReassignment from "./timelineInstances/PendingForReassignment";
import Reopen from "./timelineInstances/reopen";
import Resolved from "./timelineInstances/resolved";
import Rejected from "./timelineInstances/rejected";
import StarRated from "./timelineInstances/StarRated";
import { CustomCommets } from "./timelineInstances/commets";

const TLCaption = ({ data, comments }) => {
  const { t } = useTranslation()
  return (
    <div>
      {data?.date && <p>{data?.date}</p>}
      <p>{data?.name}</p>
      <p>{data?.mobileNumber}</p>
      {data?.source && <p>{t("ES_COMMON_FILED_VIA_" + data?.source.toUpperCase())}</p>}
    </div>
  );
};

const TimeLine = ({ isLoading, data, serviceRequestId, complaintWorkflow, rating, zoomImage, complaintDetails }) => {
  const { t } = useTranslation();
  const tenantId = complaintDetails.service.tenantId;

  function zoomImageWrapper(imageSource, index, thumbnailsToShow) {
    let newIndex = thumbnailsToShow.thumbs?.findIndex(link => link === imageSource);
    zoomImage((newIndex > -1 && thumbnailsToShow?.fullImage?.[newIndex]) || imageSource);
  }
  let { timeline } = data;
  const totalTimelineLength = useMemo(() => timeline?.length, [timeline])

  useEffect(() => {
    const [{ auditDetails }] = timeline?.filter((status, index, array) => {
      if (index === array.length - 1 && status.status === "PENDINGFORASSIGNMENT") {
        return true;
      } else {
        return false;
      }
    });
    // const onlyPendingForAssignmentStatusArray = timeline?.filter( e => e?.status === "PENDINGFORASSIGNMENT")
    // const duplicateCheckpointOfPendingForAssignment = onlyPendingForAssignmentStatusArray.at(-1)
    // timeline?.push({
    //   ...duplicateCheckpointOfPendingForAssignment,
    //   performedAction: "FILED",
    //   status: "COMPLAINT_FILED",
    // });
  }, [timeline]);


  const getCheckPoint = ({ status, caption, auditDetails, timeLineActions, index, array, performedAction, comment, thumbnailsToShow, assigner, totalTimelineLength, wfDocuments }) => {
    const isCurrent = 0 === index;
    switch (status) {
      case "PENDINGFORREASSIGNMENT":
        return <CheckPoint isCompleted={isCurrent} key={index} label={t(`CS_COMMON_${status}`)}
          customChild={<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner, wfDocuments, zoomImage }} />} />;

      case "PENDINGFORASSIGNMENT":
        return <CheckPoint isCompleted={isCurrent} key={index} label={t(`CS_COMMON_${status}`)}
          customChild={<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner }} />} />;

      case "PENDINGFORASSIGNMENT_AFTERREOPEN":
        return <PendingForAssignment isCompleted={isCurrent} key={index} text={t(`CS_COMMON_${status}`)}
          customChild={<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner, wfDocuments, zoomImage }} />} />;

      case "PENDINGATLME":
        let { name, mobileNumber } = caption && caption.length > 0 ? caption[0] : { name: "", mobileNumber: "" };
        const assignedTo = `${t(`CS_COMMON_${status}`)}`;
        return <PendingAtLME isCompleted={isCurrent} key={index} name={name} mobile={mobileNumber} text={assignedTo}
          customChild={<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner, wfDocuments, zoomImage }} />} />;

      case "RESOLVED":
        return (
          <Resolved
            key={index}
            isCompleted={isCurrent}
            action={complaintWorkflow.action}
            nextActions={index <= 1 && timeLineActions}
            //rating={index <= 1 && rating}
            serviceRequestId={serviceRequestId}
            reopenDate={Digit.DateUtils.ConvertTimestampToDate(auditDetails.lastModifiedTime)}
            customChild={<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner, wfDocuments, zoomImage }} />}
          />
        );
      case "REJECTED":
        return (
          <Rejected
            key={index}
            isCompleted={isCurrent}
            action={complaintWorkflow.action}
            nextActions={index <= 1 && timeLineActions}
            //rating={index <= 1 && rating}
            serviceRequestId={serviceRequestId}
            reopenDate={Digit.DateUtils.ConvertTimestampToDate(auditDetails.lastModifiedTime)}
            customChild={<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner, wfDocuments, zoomImage }} />}
          />
        );
      case "CLOSEDAFTERRESOLUTION":
        return <CheckPoint isCompleted={isCurrent} key={index} label={t(`CS_COMMON_${`CS_COMMON_${status}`}`)}
          customChild={<div>
            {<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner, wfDocuments, zoomImage }} />}
            {rating ? <StarRated text={t("CS_ADDCOMPLAINT_YOU_RATED")} rating={rating} /> : null}</div>} />;

      // case "RESOLVE":
      // return (
      //   <Resolved
      //     action={complaintWorkflow.action}
      //     nextActions={timeLineActions}
      //     rating={rating}
      //     serviceRequestId={serviceRequestId}
      //     reopenDate={Digit.DateUtils.ConvertTimestampToDate(auditDetails.lastModifiedTime)}
      //   />
      // );
      case "COMPLAINT_FILED":
        return <CheckPoint isCompleted={isCurrent} key={index} label={t("CS_COMMON_COMPLAINT_FILED")}
          customChild={<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner, wfDocuments, zoomImage }} />} />;

      default:
        return <CheckPoint isCompleted={isCurrent} key={index} label={t(`CS_COMMON_${status}`)}
          customChild={<CustomCommets {...{ tenantId, comment, thumbnailsToShow, auditDetails, assigner, wfDocuments, zoomImage }} />} />;
    }
  };

  return (
    <React.Fragment>
      <CardSectionHeader>{t(`${LOCALIZATION_KEY.CS_COMPLAINT_DETAILS}_COMPLAINT_TIMELINE`)}</CardSectionHeader>
      <br></br>
      {timeline && totalTimelineLength > 0 ? (
        <ConnectingCheckPoints>
          {timeline.map(({ status, caption, auditDetails, timeLineActions, performedAction, wfComment: comment, thumbnailsToShow, assigner, wfDocuments }, index, array) => {

            return getCheckPoint({ status, caption, auditDetails, timeLineActions, index, array, performedAction, comment, thumbnailsToShow, assigner, totalTimelineLength, wfDocuments });
          })}
        </ConnectingCheckPoints>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default TimeLine;