import React from "react";
import { useTranslation } from "react-i18next";
import { TelePhone } from "@egovernments/digit-ui-react-components";
//TODO: please find a better way to display in checkpoints
import CRDWFReason from "./CRDWFReason";

const CRDWFCaption = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div>
      {data.date && <p>{data.date}</p>}
      <p>{data.name}</p>
      {data.mobileNumber && <TelePhone mobile={data.mobileNumber} />}
      {data.source && <p>{t("ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_" + data.source.toUpperCase())}</p>}
      {/* //TODO: please find a better way to display in checkpoints */}
      {data.comment && <CRDWFReason otherComment={data?.otherComment} headComment={data?.comment}></CRDWFReason>}
    </div>
  );
};

export default CRDWFCaption;