import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  BackButton,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";


const MarriageInstitution = ({ config, onSelect, userType, formData }) => {
  const { t } = useTranslation();
  let validation = {};
  const [marriageReligiousInstitutionOther, setMarriageReligiousInstitutionOther] = useState(
    formData?.MarriageInstitution?.marriageReligiousInstitutionOther ? formData?.MarriageInstitution?.marriageReligiousInstitutionOther : ""
  );
  const [marriageLandmark, setMarriageLandmark] = useState(
    formData?.MarriageInstitution?.marriageLandmark ? formData?.MarriageInstitution?.marriageLandmark : ""
  );
  const [marriageStreetMal, setMarriageStreetMal] = useState(
    formData?.MarriageInstitution?.marriageStreetMal ? formData?.MarriageInstitution?.marriageStreetMal : ""
  );
  const [marriageReligiousInstitutionOtherNameEn, setMarriageReligiousInstitutionOtherNameEn] = useState(
    formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameEn ? formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameEn : ""
  );
  const [marriageReligiousInstitutionOtherNameMal, setMarriageReligiousInstitutionOtherNameMal] = useState(
    formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameMal ? formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameMal : ""
  );
  const [marriageStreetEn, setMarriageStreetEn] = useState(
    formData?.MarriageInstitution?.marriageStreetEn ? formData?.MarriageInstitution?.marriageStreetEn : ""
  );
  const [marriageLocalityEn, setMarriageLocalityEn] = useState(
    formData?.MarriageInstitution?.marriageLocalityEn ? formData?.MarriageInstitution?.marriageLocalityEn : "");

  const [marriageLocalityMal, setMarriageLocalityMal] = useState(
    formData?.MarriageInstitution?.marriageLocalityMal ? formData?.MarriageInstitution?.marriageLocalityMal : "");

  const [marriageReligiousInstitution, setMarriageReligiousInstitution] = useState(
    formData?.MarriageInstitution?.marriageReligiousInstitution ? formData?.MarriageInstitution?.marriageReligiousInstitution : null
  );
  
  const [access, setAccess] = React.useState(true);
  const onSkip = () => onSelect();
  
  const cmbMarriageReligiousInstitution = [
    { i18nKey: "Mandapam", code: "MANDAPAM" },
    { i18nKey: "Hall", code: "HALL" },
    { i18nKey: "Auditorium", code: "AUDITORIUM" },
    { i18nKey: "ConventionCenter", code: "CONVENTIONCENTER" },
  ];

  function setSelectMarriageReligiousInstitution(value) {
    setMarriageReligiousInstitution(value);
  }
  function setSelectMarriageReligiousInstitutionOther(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMarriageReligiousInstitutionOther(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageReligiousInstitutionOtherNameMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMarriageLocalityMal('');
    } else {
      setMarriageReligiousInstitutionOtherNameMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageReligiousInstitutionOtherNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMarriageReligiousInstitutionOtherNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageLandmark(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
       setMarriageLandmark(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageStreetEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
     setMarriageStreetEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageLocalityEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
        setMarriageLocalityEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriageLocalityMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMarriageLocalityMal('');
    } else {
        setMarriageLocalityMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectmarriageStreetMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMarriageStreetMal('');
    } else {
      setMarriageStreetMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  let validFlag = true;
  const goNext = () => {
  
    if (validFlag == true) {
      sessionStorage.setItem("marriageReligiousInstitutionOther", marriageReligiousInstitutionOther ? marriageReligiousInstitutionOther.code : null);
      sessionStorage.setItem("marriageLocalityMal", marriageLocalityMal ? marriageLocalityMal : null);
      sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      sessionStorage.setItem("marriageStreetMal", marriageStreetMal ? marriageStreetMal : null);
      sessionStorage.setItem("marriageReligiousInstitutionOtherNameMal", marriageReligiousInstitutionOtherNameMal ? marriageReligiousInstitutionOtherNameMal : null);
      sessionStorage.setItem("marriageReligiousInstitutionOtherNameEn", marriageReligiousInstitutionOtherNameEn ? marriageReligiousInstitutionOtherNameEn : null);
      onSelect(config.key, {
        marriageReligiousInstitutionOther,
        marriageLocalityMal,
        marriageLocalityEn,
        marriageLandmark,
        marriageReligiousInstitutionOtherNameMal,
        marriageReligiousInstitutionOtherNameEn,
        marriageStreetEn,
        marriageStreetMal,
      });
    }
  };
  
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-3">
                <CardLabel>
                  {t("CR_RELIGIOUS_INSTITUTION")}
                  <span className="mandatorycss">*</span>
                  </CardLabel>{" "}
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbMarriageReligiousInstitution}
                  selected={marriageReligiousInstitution}
                  select={setSelectMarriageReligiousInstitution}
                  placeholder={`${t("CR_RELIGIOUS_INSTITUTION")}`}
                  {...(validation = { isRequired: true })}
                />
                </div> 
                <div className="col-md-3">
              <CardLabel>
                {t("CR_RELIGIOUS_INSTITUTION_OTHER")}
                </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                //name="marriageReligiousInstitutionOther"
                value={marriageReligiousInstitutionOther}
                onChange={setSelectMarriageReligiousInstitutionOther}
                placeholder={`${t("CR_RELIGIOUS_INSTITUTION_OTHER")}`}
                
              />
            </div> 
            <div className="col-md-3">
              <CardLabel>
                {t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}
                <span className="mandatorycss">*</span>
                </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="marriageReligiousInstitutionOtherNameEn"
                value={marriageReligiousInstitutionOtherNameEn}
                onChange={setSelectMarriageReligiousInstitutionOtherNameEn}
                placeholder={`${t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}`}
                {...(validation = { isRequired: true })}
              />
            </div> 
            <div className="col-md-3">
              <CardLabel>
                {t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}
                <span className="mandatorycss">*</span>
                </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="marriageReligiousInstitutionOtherNameMal"
                value={marriageReligiousInstitutionOtherNameMal}
                onChange={setSelectMarriageReligiousInstitutionOtherNameMal}
                placeholder={`${t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}`}
                {...(validation = { isRequired: true })}
              />
            </div> 
            </div>
         </div>
         <div className="row">
            <div className="col-md-12">
               <div className="col-md-3">
                      <CardLabel>
                        {t("CR_LOCALITY_EN")}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        //name="marriageLocalityEn"
                        value={marriageLocalityEn}
                        onChange={setSelectMarriageLocalityEn}
                        placeholder={`${t("CR_LOCALITY_EN")}`}
                        {...(validation = { isRequired: true })}
                      />
                    </div>
                <div className="col-md-3">
                      <CardLabel>
                        {t("CR_LOCALITY_ML")}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        //name="marriageLocalityMal"
                        value={marriageLocalityMal}
                        onChange={setSelectMarriageLocalityMal}
                        placeholder={`${t("CR_LOCALITY_ML")}`}
                        {...(validation = { isRequired: true })}
                      />
                    </div>
            <div className="col-md-3">
            <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              //name="marriageStreetEn"
              value={marriageStreetEn}
              onChange={setSelectMarriageStreetEn}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              //name="marriageStreetMal"
              value={marriageStreetMal}
              onChange={setSelectmarriageStreetMal}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              
            />
          </div>
                  <div className="col-md-3">
                      <CardLabel>
                        {t("CR_LANDMARK")}
                      </CardLabel>
                      <TextInput
                        t={t}
                        isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        //name="marriageLandmark"
                        value={marriageLandmark}
                        onChange={setSelectMarriageLandmark}
                        placeholder={`${t("CR_LANDMARK")}`}
                        
                      />
                    </div>
                </div>
            </div>
        </FormStep>
      </React.Fragment>
    );
};
export default MarriageInstitution;
