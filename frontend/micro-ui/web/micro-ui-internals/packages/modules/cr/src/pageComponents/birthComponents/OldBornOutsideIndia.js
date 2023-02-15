import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton,Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const BornOutsideIndia = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: Menu,isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
    const [ChildPassportNo, setChildPassportNo] = useState(formData?.ChildDetails?.ChildPassportNo);
    const [ChildArrivalDate, setChildArrivalDate] = useState(formData?.ChildDetails?.ChildArrivalDate);
   const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade"); 
  
    const onSkip = () => onSelect();

    function setSelectPassportNo(e) {
      setChildPassportNo(e.target.value);
    }
    function setselectChildArrivalDate(e) {
      setChildArrivalDate(e.target.value);
    }

    const handleTimeChange = (value, cb) => {
      if (typeof value === 'string') {
        cb(value);
        setTripStartTime(value);
      }
    }
    const goNext = () => {
      sessionStorage.setItem("ChildPassportNo", ChildPassportNo);
      sessionStorage.setItem("ChildArrivalDate", ChildArrivalDate);

      onSelect(config.key, { ChildPassportNo, ChildArrivalDate });
    }
    if (isLoading ){
      return <Loader></Loader>;
    }
    return (
      <React.Fragment>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!ChildPassportNo }>
  
          <div className="row">
            <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BORN_OUTSIDE_INDIA")}`}</span> </h1>
            </div>
          </div>
         
          <div className="row">
              <div className="col-md-6" > <CardLabel>{`${t("CR_PASSPORT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildPassportNo" value={ChildPassportNo} onChange={setSelectPassportNo} disable={isEdit} placeholder={`${t("CR_PASSPORT_NO")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_PASSPORT_NO") })} />
              </div>

              <div className="col-md-6" ><CardLabel>{t("CR_DATE_OF_ARRIVAL")}<span className="mandatorycss">*</span></CardLabel>
            <DatePicker date={ChildArrivalDate} name="ChildArrivalDate" onChange={setselectChildArrivalDate} placeholder={`${t("CR_DATE_OF_ARRIVAL")}`} />

          </div>
             
            </div>
          
          
        
         
         
        </FormStep>
      </React.Fragment>
    );
  
  
  };
export default BornOutsideIndia;
