import React, { useState } from "react";
import { LabelFieldPair, CardLabel, TextInput, CardLabelError } from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";

const SelectEmployeeAadhaarNumber = ({ t, config, onSelect, formData = {}, userType, register, errors }) => {
  const { pathname: url } = useLocation();
  const [iserror, setError] = useState(false);
  let isMobile = window.Digit.Utils.browser.isMobile();
  const inputs = [
    {
      label: t("HR_Aadhar_LABEL"),
      isMandatory: true,
      type: "text",
      name: "aadhaarNumber",
      populators: {
        validation: {
          required: true,
          pattern: /^[0-9]\d{11}$/,
        },
        error: t("HR_INVALID_AADHAR"),
      },
    },
  ];

  function setValue(value, input) {
    onSelect(config.key, { ...formData[config.key], [input]: value });
  }
  function validate(value, input) {
    setError(!input.populators.validation.pattern.test(value));
  }

  return (
    <div>
      {inputs?.map((input, index) => (
        <React.Fragment key={index}>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">
              {t(input.label)}
              {input.isMandatory ? " * " : null}
            </CardLabel>
            <div className="field-container" style={{ width:isMobile? "100%":"50%", display: "block" }}>
              <div>
                <div style={{ display: "flex" }}>
                  <TextInput
                    className="field desktop-w-full"
                    key={input.name}
                    value={formData && formData[config.key] ? formData[config.key][input.name] : undefined}
                    onChange={(e) =>{ setValue(e.target.value, input.name,validate(e.target.value, input))}}
                    disable={false}
                    defaultValue={undefined}
                    onBlur={(e) => validate(e.target.value, input)}
                    {...input.validation}
                  />
                </div>
                <div>{iserror ? <CardLabelError style={{ width: "100%" }}>{t(input.populators.error)}</CardLabelError> : <span style={{
                  color: "gray", width: "100%", border: "none",
                  background: "none",
                  justifyContent: "start"
                }}>
                  {t("HR_UNIQUE_AADHAR")}
                </span>}</div>
              </div>
            </div>
          </LabelFieldPair>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SelectEmployeeAadhaarNumber;
