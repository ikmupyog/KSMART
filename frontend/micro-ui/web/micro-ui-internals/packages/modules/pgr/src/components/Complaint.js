import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Card, DateWrap, KeyNote } from "@egovernments/digit-ui-react-components";
import { CardSubHeader } from "@egovernments/digit-ui-react-components";
import { LOCALIZATION_KEY } from "../constants/Localization";

// import { ConvertTimestampToDate } from "../@egovernments/digit-utils/services/date";

const Complaint = ({ data, path }) => {
  let { serviceCode, serviceRequestId, applicationStatus } = data;

  const history = useHistory();
  const { t } = useTranslation();

  const handleClick = () => {
    history.push(`${path}/${serviceRequestId}`);
  };

  const closedStatus = ["RESOLVED", "REJECTED", "CLOSEDAFTERREJECTION", "CLOSEDAFTERRESOLUTION"];

  const headerStyle = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "80%",
    fontSize: "26px"
  }

  return (
    <div className="col-md-4">
      <Card onClick={handleClick} >
        <CardSubHeader style={headerStyle}>{t(`SERVICEDEFS.${serviceCode.toUpperCase()}`)}</CardSubHeader>

        <div className="col-md-12" style={{ paddingLeft: "2px", paddingRight: "2px" }}>
          <div className="col-md-6">
            <KeyNote keyValue={t(`${LOCALIZATION_KEY.CS_COMMON}_COMPLAINT_NO`)} note={serviceRequestId} />
          </div>
          <div className="col-md-6">
            <DateWrap date={Digit.DateUtils.ConvertTimestampToDate(data.auditDetails.createdTime)} />
          </div>
        </div>

        <div className="col-md-12" style={{ paddingLeft: "2px", paddingRight: "2px" }}>
          <div className="col-md-6">
            <p>{t(`${LOCALIZATION_KEY.CS_COMMON}_${applicationStatus}`)}</p>
          </div>
          <div className="col-md-6">
            <div className={`status-highlight ${closedStatus.includes(applicationStatus) ? "success" : ""}`}
              style={{ cursor: "pointer", marginLeft: "auto" }}>
              <p>{(closedStatus.includes(applicationStatus) ? t("CS_COMMON_CLOSED") : t("CS_COMMON_OPEN")).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Complaint;
