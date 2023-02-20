import React, { useState } from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../../components/PGRTimeline";

const SelectLandmark = ({ t, config, onSelect, value }) => {
  const [landmark, setLandmark] = useState(() => {
    const { landmark } = value;
    return landmark ? landmark : "";
  });

  function onChange(e) {
    setLandmark(e.target.value);
  }

  const onSkip = () => onSelect(); 

  return (
    <React.Fragment>
       {window.location.href.includes("/citizen") ? <Timeline currentStep={4}/> : null}
      <FormStep config={config} value={landmark} onChange={onChange} onSelect={(data) => onSelect(data)} onSkip={onSkip} t={t}></FormStep>
    </React.Fragment>
  )
};

export default SelectLandmark;
