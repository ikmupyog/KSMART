import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const MarriagePublicPlace = ({
  config,
  onSelect,
  userType,
  formData,
  marriagePlacenameEn,
  setmarriagePlacenameEn,
  marriagePlacenameMl,
  setmarriagePlacenameMl,
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

  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();
  const cmbMarriagePublicOrPrivatePlace = [
    { i18nKey: "Public", code: "PUBLIC" },
    { i18nKey: "Private", code: "PRIVATE" },
  ];

  function setSelectOtherMarriagePlacenameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setmarriagePlacenameMl("");
    } else {
      setmarriagePlacenameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectOtherMarriagePlacenameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setmarriagePlacenameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
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
  function setSelectMarriageLocalityMal(e) {
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
      // sessionStorage.setItem(
      //   "marriagePublicOrPrivateNamePlaceEn",
      //   marriagePublicOrPrivateNamePlaceEn ? marriagePublicOrPrivateNamePlaceEn.code : null
      // );
      // sessionStorage.setItem("marriageLocalityMl", marriageLocalityMl ? marriageLocalityMl : null);
      // sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      // sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      // sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      // sessionStorage.setItem("marriageStreetMl", marriageStreetMl ? marriageStreetMl : null);
      // sessionStorage.setItem("marriagePublicOrPrivateNamePlaceMal", marriagePublicOrPrivateNamePlaceMal ? marriagePublicOrPrivateNamePlaceMal : null);
      // sessionStorage.setItem("marriagePublicOrPrivatePlace", marriagePublicOrPrivatePlace ? marriagePublicOrPrivatePlace : null);
      onSelect(config.key, {
        // marriageLocalityMl,
        // marriageLocalityEn,
        // marriageLandmark,
        // marriagePublicOrPrivatePlace,
        // marriageStreetEn,
        // marriageStreetMl,
        // marriagePublicOrPrivateNamePlaceMal,
        // marriagePublicOrPrivateNamePlaceEn,
      });
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <CardLabel>
              {t("CR_PUBLIC_PRIVATE_PLACE_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="marriagePublicOrPrivateNamePlaceEn"
              value={marriagePlacenameEn}
              onChange={setSelectOtherMarriagePlacenameEn}
              placeholder={`${t("CR_PUBLIC_PRIVATE_PLACE_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_PUBLIC_PRIVATE_PLACE_EN") })}
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
            <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              //name="marriageStreetEn"
              value={marriageStreetEn}
              onChange={setSelectMarriageStreetEn}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
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
              {t("CR_PUBLIC_PRIVATE_PLACE_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="marriagePublicOrPrivateNamePlaceMl"
              value={marriagePlacenameMl}
              onChange={setSelectOtherMarriagePlacenameMl}
              placeholder={`${t("CR_PUBLIC_PRIVATE_PLACE_EN")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: true,
                type: "text", title: t("CR_INVALID_PUBLIC_PRIVATE_PLACE_ML") })}
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
              //name="marriageLocalityMl"
              value={marriageLocalityMl}
              onChange={setSelectMarriageLocalityMal}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_LOCALITY_ML"),
              })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              //name="marriageStreetMl"
              value={marriageStreetMl}
              onChange={setSelectmarriageStreetMl}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MarriagePublicPlace;
