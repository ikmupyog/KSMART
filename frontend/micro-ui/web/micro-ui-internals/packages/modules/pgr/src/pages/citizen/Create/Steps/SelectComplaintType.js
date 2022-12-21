import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TypeSelectCard,CardLabel } from "@egovernments/digit-ui-react-components";

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

  function selectedValue(value) {
    setComplaintType(value);
    // SessionStorage.set("complaintType", value);
  }
  return (
    
    <TypeSelectCard 
      {...mystyle}
      {...textParams}
      {...{ menu: menu }}
      {...{ optionsKey: "name" }}
      {...{ selected: selectedValue }}
      {...{ selectedOption: complaintType }}
      {...{ onSave: goNext }}
      {...{ t }}
      disabled={Object.keys(complaintType).length === 0 || complaintType === null ? true : false}
    />
    
  );
};

export default SelectComplaintType;
