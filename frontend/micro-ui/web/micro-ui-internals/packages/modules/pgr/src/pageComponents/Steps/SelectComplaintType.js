import React, { useState } from "react";
import PGRTimeline from "../../components/PGRTimeline";
import EmpTimeLine from "../../components/EmpPGRTimeline"
import { TypeSelectCard, CardLabel } from "@egovernments/digit-ui-react-components";
import { arraySort } from "../../constants/utils";

const SelectComplaintType = ({ t, config, onSelect, value }) => {
  const [complaintType, setComplaintType] = useState(() => {
    const { complaintType } = value;
    return complaintType ? complaintType : {};
  });

  const goNext = () => {
    onSelect({ complaintType });
  };

  const textParams = config.texts;
  let style = "";
  const mystyle = {
    marginTop: "8px",
    display: "flow-root",
    lineHeight: "2.5rem",
    marginBottom: "24px",
    flexWrap: "nowrap"
  }
  const menu = Digit.Hooks.pgr.useComplaintTypes({ stateCode: Digit.ULBService.getCurrentTenantId() });

  const complaintMenu = menu?.filter(item => item.key !== "Others");

  function selectedValue(value) {
    setComplaintType(value);
    onSelect({ complaintType: value });
    // SessionStorage.set("complaintType", value);
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <PGRTimeline /> : null}
      {window.location.href.includes("/employee") ? <EmpTimeLine /> : null}
      <TypeSelectCard
        {...mystyle}
        {...textParams}
        {...{ menu: arraySort(complaintMenu ? complaintMenu : [], "name", t) }}
        {...{ optionsKey: "name" }}
        {...{ selected: selectedValue }}
        {...{ selectedOption: complaintType }}
        {...{ onSave: goNext }}
        {...{ t }}
        disabled={Object.keys(complaintType).length === 0 || complaintType === null ? true : false}
      />
    </React.Fragment>


  );
};

export default SelectComplaintType;
