import { FormStep, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import PGRTimeline from "../../components/PGRTimeline";

const SelectPincode = ({ t, config, onSelect, value }) => {
  const tenants = Digit.Hooks.pgr.useTenants();
  // const __initPincode = Digit.SessionStorage.get("PGR_CREATE_PINCODE");
  const [pincode, setPincode] = useState(() => {
    const { pincode } = value;
    return pincode;
  });
  let isNextDisabled = pincode?.length === 6 ? false : true;
  const [pincodeServicability, setPincodeServicability] = useState(null);


  const goNext = async (data) => {
    var foundValue = tenants.find((obj) => obj.pincode?.find((item) => item == data?.pincode));
    if (foundValue) {
      Digit.SessionStorage.set("city_complaint", foundValue);
      let response = await Digit.LocationService.getLocalities(foundValue.code);
      if (response.TenantBoundary.length > 0) {
        let __localityList = Digit.LocalityService.get(response.TenantBoundary[0]);
        const filteredLocalities = __localityList.filter((obj) => obj.pincode?.find((item) => item == data.pincode));
      }
      onSelect({ ...data, city_complaint: foundValue });
    } else {
      Digit.SessionStorage.set("city_complaint", undefined);
      Digit.SessionStorage.set("selected_localities", undefined);
      setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
    }
  };

  const handleChange = (e) => {
    if (e.target.value.trim().length === 6) {
      isNextDisabled = false
    }
    if (e.target.value.trim().length >= 0) {
      const phone = e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 6)
      setPincode(phone);
    }
  }

  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <PGRTimeline currentStep={2} /> : null}

      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        disabled={true}
        onSkip={onSkip}
        forcedError={t(pincodeServicability)}
        isDisabled={isNextDisabled} >
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CORE_COMMON_PINCODE")}`}
              </CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="pincode" value={pincode}
                onChange={handleChange} placeholder={`${t("CORE_COMMON_PINCODE")}`} />
            </div>
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default SelectPincode;
