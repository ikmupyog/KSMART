import React from "react";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../../components/PGRTimeline";

const SelectGeolocation = ({ onSelect, onSkip, value, t }) => {
  let pincode = "";
  return (
    <React.Fragment>
    {window.location.href.includes("/citizen") ? <Timeline currentStep={2}/> : null}
    <LocationSearchCard
      header={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_HEADER")}
      cardText={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT")}
      nextText={t("CS_COMMON_NEXT")}
      skipAndContinueText={t("CS_COMMON_SKIP")}
      skip={() => onSelect()}
      onSave={() => onSelect({ pincode })}
      onChange={(code) => (pincode = code)}
    />
      </React.Fragment>
  );
};

export default SelectGeolocation;
