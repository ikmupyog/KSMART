import React from "react";
import { CheckBox, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const Status = ({ complaints, onAssignmentChange, pgrfilters, assignedTo }) => {
  const { t } = useTranslation();
  const { uuid = '' } = Digit.UserService.getUser().info;
  const UUID = assignedTo?.code === "ASSIGNED_TO_ME" ? uuid : ""
  console.log("UUID", UUID)
  const complaintsWithCount = Digit.Hooks.pgr.useComplaintStatusCount(complaints, UUID);
  let hasFilters = pgrfilters?.applicationStatus?.length;
  return (
    <div className="status-container">
      <div className="filter-label">{t("ES_PGR_FILTER_STATUS")}</div>
      {complaintsWithCount.length === 0 && <Loader />}
      {complaintsWithCount.map((option, index) => {
        return (
          <CheckBox
            key={index}
            onChange={(e) => onAssignmentChange(e, option)}
            checked={hasFilters ? (pgrfilters.applicationStatus.filter((e) => e.code === option.code).length !== 0 ? true : false) : false}
            label={`${option.name} (${option.count || 0})`}
          />
        );
      })}
    </div>
  );
};

export default Status;
