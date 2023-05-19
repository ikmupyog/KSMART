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

  const locale = Digit.SessionStorage.get("locale") || "en_IN";


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

  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
  let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;

  const handleName = (e) => {
    if (locale === "ml_IN") {
      if (e.target.value.match(ml_pattern)) {
        setSelected({ ...selected, name: e.target.value })
      }
    } else if (e.target.value.match(en_pattern)) {
      setSelected({ ...selected, name: e.target.value })
    }
  }

  const handleAddress = (e) => {
    if (locale === "ml_IN") {
      if (e.target.value.match(ml_pattern)) {
        setSelected({ ...selected, address: e.target.value })
      }
    } else if (e.target.value.match(en_pattern)) {
      setSelected({ ...selected, address: e.target.value })
    }
  }

  const isDisabled = selected.anonymous ? false : selected.address && selected.name && selected.mobileNumber?.length === 10 ? false : true;

  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <EmpTimeLine currentStep={4} /> : null}

      <FormStep config={config} onSelect={goNext} isDisabled={isDisabled}>
        <CheckBox className="form-field" label={`${t("CS_ADDCOMPLAINT_ANONYMOUS")}`}
          onChange={(e) => setSelected({
            ...selected, anonymous: !selected.anonymous, name: "", mobileNumber: "", address: ""
          })}
          value={selected.anonymous} checked={selected.anonymous || false} />

        {!selected.anonymous && <div className="row">
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_NAME")}`} <span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="name" value={selected.name} disable={selected.anonymous}
              onChange={handleName} placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_NAME")}`} />
          </div>
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_PHONE")}`} <span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="mobileNumber" value={selected.mobileNumber}
              // onChange={(e) => { setSelected({ ...selected, mobileNumber: e.target.value.replace(/[^0-9]/ig, '') }) }}
              placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_PHONE")}`} onChange={handleMobile} {...(validation = { pattern: "^[0-9]{10}$", isRequired: true, type: "text" })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel> {`${t("CS_ADDCOMPLAINT_INFORMER_ADDRESS")}`} <span className="mandatorycss">*</span></CardLabel>
            <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="name" value={selected.address} disable={selected.anonymous}
              onChange={handleAddress} placeholder={`${t("CS_ADDCOMPLAINT_INFORMER_ADDRESS")}`} />
          </div>
        </div>}

      </FormStep>
    </React.Fragment>
  )
};

export default ComplaintInformer;
