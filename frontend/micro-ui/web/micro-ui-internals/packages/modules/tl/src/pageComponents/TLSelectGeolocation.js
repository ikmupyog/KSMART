import React, { useState } from "react";

import TLLocationSearch from "../pageComponents/TLLocationSearch"
import Timeline from "../components/TLTimeline";

const TLSelectGeolocation = ({ t, config, onSelect, formData = {} }) => {
  let LBs = [];
  const stateId = Digit.ULBService.getStateId();
  const { data: localbodies, islocalbodiesLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "tenant", "Localbody");
  
  const [tradeLicenseDetail,seTradeLicenseDetail]=useState();
  const [pincode, setPincode] = useState(formData?.address?.pincode || "");
  const [geoLocation, setGeoLocation] = useState(formData?.address?.geoLocation || {});
  const tenants = Digit.Hooks.tl.useTenants();
  const [pincodeServicability, setPincodeServicability] = useState(null);
  let isEditProperty = window.location.href.includes("edit-application")||window.location.href.includes("renew-trade");
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const { data: defaultConfig = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "MapConfig");
  const defaultcoord = defaultConfig?.PropertyTax?.MapConfig;
  let defaultcoord1 = defaultcoord ? defaultcoord[0] : {};
  const onSkip = () => onSelect();

  localbodies &&
  localbodies["tenant"] &&
  localbodies["tenant"].tenants.map((ob) => {
    LBs.push(ob);
  });
  

console.log(JSON.stringify(localbodies));
  let lbdet=tenants?.filter((obj)=>obj.code===tenantId);
  const onChange = (code, location,results,tradeLicenseDetail) => {
    localbodies &&
localbodies["tenant"] &&
localbodies["tenant"].tenants.map((ob) => {
  LBs.push(ob);
});
    console.log(JSON.stringify(LBs));
    setPincodeServicability(null);
    seTradeLicenseDetail(tradeLicenseDetail);
    const foundValue = tenants?.find((obj) => obj.pincode?.find((item) => item == code));
    console.log(foundValue);
    if (!foundValue) {
      setPincodeServicability("TL_COMMON_PINCODE_NOT_SERVICABLE");
      setPincode("");
      setGeoLocation({});
    } else {
      setPincode(code);
      setGeoLocation(location);
    }
  }

  const goNext=()=>{
    console.log("hai reached"+JSON.stringify(tradeLicenseDetail));
   // let tradeLicenseDetail ={street,buildingName,landmark};
    onSelect(config.key, {tradeLicenseDetail, geoLocation, pincode });
  }

  return (
    <React.Fragment>
    {window.location.href.includes("/citizen") ? <Timeline currentStep={1}/> : null}
    <TLLocationSearch
      header={t("TL_GEOLOCATION_HEADER")}
      cardText={t("TL_GEOLOCATION_TEXT")}
      nextText={t("Next")}
      skipAndContinueText={t("CORE_COMMON_SKIP_CONTINUE")}
      skip={onSkip}
      t={t}
      position={geoLocation}
      onSave= {goNext}  //{() => onSelect(config.key, { geoLocation, pincode })}
      onChange={(code, location,results,tradeLicenseDetail) => onChange(code, location,results,tradeLicenseDetail)}
      disabled={pincode === "" || isEditProperty}
      forcedError={t(pincodeServicability)}
      isPTDefault={true}
      PTdefaultcoord={defaultcoord1}
    />
    </React.Fragment>
  );
};

export default TLSelectGeolocation;
