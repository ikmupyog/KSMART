import React, { useState } from "react";
import { FormStep, CardLabel, TextArea, TextInput, CheckBox } from "@egovernments/digit-ui-react-components";
import EmpTimeLine from "../../components/EmpPGRTimeline"

const Informer = ({ t, config, onSelect, value }) => {

  const [selected, setSelected] = useState({
    name: value?.name, mobileNumber: value?.mobileNumber, address: value?.address, anonymous: value?.anonymous || false
  })

  let validation = {}

  const goNext = () => {
    onSelect(selected);
  };

  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <EmpTimeLine currentStep={4} /> : null}
      <FormStep config={config} onSelect={goNext}>
        <CheckBox
          className="form-field"
          label={`${t("CS_ADDCOMPLAINT_ANONYMOUS")}`}
          onChange={(e) => setSelected({ ...selected, anonymous: !selected.anonymous })}
          value={selected.anonymous}
          checked={selected.anonymous || false}
        />
        {!selected.anonymous && <div className="row">
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_NAME")}`} </CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="name" value={selected.name} disable={selected.anonymous}
              onChange={(e) => setSelected({ ...selected, name: e.target.value })} placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_NAME")}`} />
          </div>
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_PHONE")}`} </CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="mobileNumber" value={selected.mobileNumber} disable={selected.anonymous}
              onChange={(e) => setSelected({ ...selected, mobileNumber: e.target.value })} placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_PHONE")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "number", title: t("CS_ADDCOMPLAINT_INFORMER_PHONE"), })} />
          </div>
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_ADDRESS")}`} </CardLabel>
            <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={selected.address} disable={selected.anonymous}
              onChange={(e) => setSelected({ ...selected, address: e.target.value })} placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_ADDRESS")}`} />
          </div>
        </div>}
      </FormStep>
    </React.Fragment>
  )
};

export default Informer;
