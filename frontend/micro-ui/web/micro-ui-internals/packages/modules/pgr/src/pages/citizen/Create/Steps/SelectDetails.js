import React, { useState } from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../../components/PGRTimeline";

const SelectDetails = ({ t, config, onSelect, value }) => {
  const [details, setDetails] = useState(() => {
    const { details } = value;
    return details ? details : "";
  });

  const onChange = (event) => {
    const { value } = event.target;
    setDetails(value);
  };

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6}/> : null}
      <FormStep config={config} onChange={onChange} onSelect={() => onSelect({ details })} value={details} t={t} />
    </React.Fragment>
  )
};

export default SelectDetails;
