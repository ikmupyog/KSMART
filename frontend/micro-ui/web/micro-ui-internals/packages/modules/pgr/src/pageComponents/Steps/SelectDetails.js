import React, { useState } from "react";
import { FormStep, TextArea, CardLabel } from "@egovernments/digit-ui-react-components";
import PGRTimeline from "../../components/PGRTimeline";
import EmpTimeLine from "../../components/EmpPGRTimeline"

const SelectDetails = ({ t, config, onSelect, value }) => {
  const [details, setDetails] = useState(() => {
    const { details } = value;
    return details ? details : "";
  });

  const locale = Digit.SessionStorage.get("locale") || "en_IN";

  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C 0-9!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;
  let en_pattern = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

  const handleChange = (e) => {
    if (e.target.value.trim().length <= 150) {
      if (locale === "ml_IN") {
        if (e.target.value.match(ml_pattern)) {
          setDetails(e.target.value.substring(0, 150));
        }
      } else if (e.target.value.match(en_pattern)) {
        setDetails(e.target.value.substring(0, 150));
      }
    }
  }

  const goNext = () => {
    onSelect({ details: details.trim() });
  };

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <PGRTimeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <EmpTimeLine currentStep={5} /> : null}
      <FormStep config={config} onSelect={goNext} disabled={true} t={t} isDisabled={!details}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CS_ADDCOMPLAINT_DETAILS")}`} <span className="mandatorycss">*</span>
                <span>{t("PGR_COMPLAINT_DETAILS_LIMIT")} </span>
              </CardLabel>
              <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="details" value={details}
                onChange={handleChange} placeholder={`${t("CS_ADDCOMPLAINT_DETAILS")}`} />
            </div>
            <div className="col-md-6">
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  )
};

export default SelectDetails;
