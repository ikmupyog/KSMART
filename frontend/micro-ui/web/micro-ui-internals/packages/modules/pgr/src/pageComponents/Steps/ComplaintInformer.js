import React, { useEffect, useState } from "react";
import { FormStep, CardLabel, TextArea, TextInput, CheckBox } from "@egovernments/digit-ui-react-components";
import EmpTimeLine from "../../components/EmpPGRTimeline"

const ComplaintInformer = ({ t, config, onSelect, value }) => {

  const [selected, setSelected] = useState({
    name: value?.name || "", mobileNumber: value?.mobileNumber || "", address: value?.address || "", anonymous: value?.anonymous || false
  })

  const [isTrue, setIstrue] = useState(false)

  useEffect(() => {
    if (selected.anonymous) {
      setIstrue(false)
    } else {
      if (selected.mobileNumber.length !== 10) {
        setIstrue(true)
      }
    }
  }, [selected])

  let validation = {}

  const goNext = () => {
    onSelect(selected);
  };

  const handleMobile = (e) => {
    if (e.target.value.trim().length === 10) {
      setIstrue(false)
    }
    if (e.target.value.trim().length >= 0) {
      const phone = e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10)
      setSelected({ ...selected, mobileNumber: phone });
    }
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <EmpTimeLine currentStep={4} /> : null}

      <FormStep config={config} onSelect={goNext} isDisabled={isTrue}>
        <CheckBox className="form-field" label={`${t("CS_ADDCOMPLAINT_ANONYMOUS")}`}
          onChange={(e) => setSelected({
            ...selected, anonymous: !selected.anonymous, name: "", mobileNumber: "", address: ""
          })}
          value={selected.anonymous} checked={selected.anonymous || false} />

        {!selected.anonymous && <div className="row">
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_NAME")}`} </CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="name" value={selected.name} disable={selected.anonymous}
              onChange={(e) => setSelected({ ...selected, name: e.target.value })} placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_NAME")}`} />
          </div>
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_PHONE")}`} </CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="mobileNumber" value={selected.mobileNumber}
              // onChange={(e) => { setSelected({ ...selected, mobileNumber: e.target.value.replace(/[^0-9]/ig, '') }) }}
              placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_PHONE")}`} onChange={handleMobile} {...(validation = { pattern: "^[0-9]{10}$", isRequired: true, type: "text" })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_ADDRESS")}`} </CardLabel>
            <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="name" value={selected.address} disable={selected.anonymous}
              onChange={(e) => setSelected({ ...selected, address: e.target.value })} placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_ADDRESS")}`} />
          </div>
        </div>}

      </FormStep>
    </React.Fragment>
  )
};

export default ComplaintInformer;
