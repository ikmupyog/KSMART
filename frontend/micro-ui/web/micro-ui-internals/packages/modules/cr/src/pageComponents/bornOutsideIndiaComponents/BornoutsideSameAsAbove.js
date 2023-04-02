import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BornoutsideSameAsAbove = ({ config, onSelect, userType, formData, isPrsentAddress, setIsPrsentAddress,
  isEditBirth = false, isEditDeath = false
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : isEditDeath ? isEditDeath : false);

  // const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressSameAsAboveDetails?.isPrsentAddress);

  const onSkip = () => onSelect();

  function setSameAsPresent(e) {
    setIsPrsentAddress(e.target.checked);
    // if (e.target.checked == true) {
      
    // } 
  }

  const goNext = () => {

    onSelect(config.key, {

    });
  }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div> */}
        {/* <div>
          <div className="row">
            <div className="col-md-12" >
              <div className="col-md-12" >
                <CheckBox label={t("CR_RESIDENT_ADDRESS_AT_TIME_BIRTH_REG")} onChange={setSameAsPresent} value={isPrsentAddress} 
                checked={isPrsentAddress} 
                // disable={isDisableEdit}
               
                 />
              </div>
            </div>
          </div>
        </div> */}

      </FormStep>
    </React.Fragment>
  );
};
export default BornoutsideSameAsAbove;