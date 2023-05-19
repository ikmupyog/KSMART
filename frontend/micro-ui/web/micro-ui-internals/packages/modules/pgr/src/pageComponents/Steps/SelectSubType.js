import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import PGRTimeline from "../../components/PGRTimeline";
import EmpTimeLine from "../../components/EmpPGRTimeline"
import { arraySort } from "../../constants/utils";

const SelectSubType = ({ t, config, onSelect, value }) => {
  const [subType, setSubType] = useState(() => {
    const { subType } = value;
    return subType ? subType : {};
  });
  const { complaintType } = value;
  const menu = Digit.Hooks.pgr.useComplaintSubType(complaintType, t);


  const goNext = () => {
    // const serviceCode = subType.key;
    onSelect({ subType });
  };

  function selectedValue(value) {
    setSubType(value);
    onSelect({ subType: value });
  }

  const configNew = {
    ...config.texts,
    ...{ headerCaption: t(`SERVICEDEFS.${complaintType?.key.toUpperCase()}`) },
    ...{ menu: arraySort(menu ? menu : [], "name", t) },
    ...{ optionsKey: "name" },
    ...{ selected: selectedValue },
    ...{ selectedOption: subType },
    ...{ onSave: goNext },
  };

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <PGRTimeline /> : null}
      {window.location.href.includes("/employee") ? <EmpTimeLine /> : null}
      <TypeSelectCard {...configNew} disabled={Object.keys(subType).length === 0 || subType === null ? true : false} t={t} />
    </React.Fragment>
  )
};
export default SelectSubType;
