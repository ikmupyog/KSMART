import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const MarriageInstitution = ({
  config,
  onSelect,
  userType,
  formData,
  otherMarriagePlacenameEn,
  setotherMarriagePlacenameEn,
  otherMarriagePlacenameMl,
  setotherMarriagePlacenameMl,
  marriageLocalityEn,
  setmarriageLocalityEn,
  marriageLocalityMl,
  setmarriageLocalityMl,
  marriageStreetEn,
  setmarriageStreetEn,
  marriageStreetMl,
  setmarriageStreetMl,
  marriageLandmark,
  setmarriageLandmark,
}) => {
  const { t } = useTranslation();
  let validation = {};
  // const [marriageReligiousInstitutionOther, setMarriageReligiousInstitutionOther] = useState(
  //   formData?.MarriageInstitution?.marriageReligiousInstitutionOther ? formData?.MarriageInstitution?.marriageReligiousInstitutionOther : ""
  // );
  // const [marriageLandmark, setMarriageLandmark] = useState(
  //   formData?.MarriageInstitution?.marriageLandmark ? formData?.MarriageInstitution?.marriageLandmark : ""
  // );
  // const [marriageStreetMal, setMarriageStreetMal] = useState(
  //   formData?.MarriageInstitution?.marriageStreetMal ? formData?.MarriageInstitution?.marriageStreetMal : ""
  // );
  // const [marriageReligiousInstitutionOtherNameEn, setMarriageReligiousInstitutionOtherNameEn] = useState(
  //   formData?.MarriageDetails?.marriageReligiousInstitutionOtherNameEn ? formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameEn : ""
  // );
  // const [marriageReligiousInstitutionOtherNameMal, setMarriageReligiousInstitutionOtherNameMal] = useState(
  //   formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameMal
  //     ? formData?.MarriageInstitution?.marriageReligiousInstitutionOtherNameMal
  //     : ""
  // );
  // const [marriageStreetEn, setMarriageStreetEn] = useState(
  //   formData?.MarriageInstitution?.marriageStreetEn ? formData?.MarriageInstitution?.marriageStreetEn : ""
  // );
  // const [marriageLocalityEn, setMarriageLocalityEn] = useState(
  //   formData?.MarriageInstitution?.marriageLocalityEn ? formData?.MarriageInstitution?.marriageLocalityEn : ""
  // );

  // const [marriageLocalityMal, setMarriageLocalityMal] = useState(
  //   formData?.MarriageInstitution?.marriageLocalityMal ? formData?.MarriageInstitution?.marriageLocalityMal : ""
  // );

  // const [marriageReligiousInstitution, setMarriageReligiousInstitution] = useState(
  //   formData?.MarriageInstitution?.marriageReligiousInstitution ? formData?.MarriageInstitution?.marriageReligiousInstitution : null
  // );

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
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setMarriageReligiousInstitutionOther(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function selectSetotherMarriagePlacenameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setMarriageLocalityMal('');
    } else {
      setotherMarriagePlacenameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectOtherMarriagePlacenameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setotherMarriagePlacenameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectMarriageLandmark(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setmarriageLandmark(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectMarriageStreetEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setmarriageStreetEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectMarriageLocalityEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setmarriageLocalityEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectMarriageLocalityMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setmarriageLocalityMl("");
    } else {
      setmarriageLocalityMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectmarriageStreetMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setmarriageStreetMl("");
    } else {
      setmarriageStreetMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
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
      sessionStorage.setItem(
        "marriageReligiousInstitutionOtherNameMal",
        marriageReligiousInstitutionOtherNameMal ? marriageReligiousInstitutionOtherNameMal : null
      );
      sessionStorage.setItem(
        "marriageReligiousInstitutionOtherNameEn",
        marriageReligiousInstitutionOtherNameEn ? marriageReligiousInstitutionOtherNameEn : null
      );
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
      <div className="row">
        <div className="col-md-12">
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
              name="otherMarriagePlacenameEn"
              value={otherMarriagePlacenameEn}
              onChange={setSelectOtherMarriagePlacenameEn}
              placeholder={`${t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_RELIGIOUS_INST_OTHER_EN") })}
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
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
            />
          </div>
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
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-3">
          <CardLabel>{t("CR_LANDMARK")}</CardLabel>
          <TextInput
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            //name="marriageLandmark"
            value={marriageLandmark}
            onChange={setSelectMarriageLandmark}
            placeholder={`${t("CR_LANDMARK")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LANDMARK") })}
          />
        </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
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
              value={otherMarriagePlacenameMl}
              onChange={selectSetotherMarriagePlacenameMl}
              placeholder={`${t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_RELIGIOUS_INST_OTHER_ML"),
              })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              //name="marriageStreetMal"
              value={marriageStreetMl}
              onChange={setSelectmarriageStreetMl}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
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
              value={marriageLocalityMl}
              onChange={setSelectMarriageLocalityMl}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_LOCALITY_ML"),
              })}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MarriageInstitution;
