import React, { useState, useEffect } from "react";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/PGRTimeline";

const SelectGeolocation = ({ onSelect, onSkip, value, t }) => {
  const [location, setLocation] = useState({});
  const [disable, setDisable] = useState(false);
  const [pincode, setPincode] = useState("");

  const onLocationChange = (code, loc) => {
    setPincode(code)
    setLocation(loc);
  }

  let district = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.DISTRICT");

  const stateId = Digit.ULBService.getStateId();
  const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  let postOffices = []

  console.log("first", PostOffice)

  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      if (ob.distid === district?.districtid) {
        postOffices.push(ob?.pincode);
      }
    });

  useEffect(() => {
    if (!postOffices.includes(pincode)) {
      setPincode("")
      setDisable(true)
    }
  }, [location, pincode])


  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      <LocationSearchCard
        header={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_HEADER")}
        cardText={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT")}
        nextText={t("CS_COMMON_NEXT")}
        skipAndContinueText={t("CS_COMMON_SKIP")}
        skip={() => onSelect({ pincode: "" })}
        onSave={() => onSelect({ pincode })}
        onChange={(code, loc) => onLocationChange(code, loc)}
        disabled={disable}
      />
    </React.Fragment>
  );
};

export default SelectGeolocation;
