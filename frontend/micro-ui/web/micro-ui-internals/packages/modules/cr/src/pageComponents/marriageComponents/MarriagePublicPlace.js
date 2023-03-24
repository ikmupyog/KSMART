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

const MarriagePublicPlace = ({ config, onSelect, userType, formData }) => {
  const { t } = useTranslation();
  let validation = {};

  const [marriageLocalityEn, setMarriageLocalityEn] = useState(formData?.MarriagePublicPlace?.marriageLocalityEn ? formData?.MarriagePublicPlace?.marriageLocalityEn : "");
  const [marriageLocalityMal, setMarriageLocalityMal] = useState(formData?.MarriagePublicPlace?.marriageLocalityMal ? formData?.MarriagePublicPlace?.marriageLocalityMal : "");
  
  const [marriageLandmark, setMarriageLandmark] = useState(
    formData?.MarriagePublicPlace?.marriageLandmark ? formData?.MarriagePublicPlace?.marriageLandmark : ""
  );
  const [marriageStreetMal, setMarriageStreetMal] = useState(
    formData?.MarriagePublicPlace?.marriageStreetMal ? formData?.MarriagePublicPlace?.marriageStreetMal : ""
  );
  const [marriagePublicOrPrivateNamePlaceEn, setMarriagePublicOrPrivateNamePlaceEn] = useState(
    formData?.MarriagePublicPlace?.marriagePublicOrPrivateNamePlaceEn ? formData?.MarriagePublicPlace?.marriagePublicOrPrivateNamePlaceEn : ""
  );
  const [marriagePublicOrPrivateNamePlaceMal, setMarriagePublicOrPrivateNamePlaceMal] = useState(
    formData?.MarriagePublicPlace?.marriagePublicOrPrivateNamePlaceMal ? formData?.MarriagePublicPlace?.marriagePublicOrPrivateNamePlaceMal : ""
  );
  const [marriageStreetEn, setMarriageStreetEn] = useState(
    formData?.MarriagePublicPlace?.marriageStreetEn ? formData?.MarriagePublicPlace?.marriageStreetEn : ""
  );
  const [marriagePublicOrPrivatePlace, setMarriagePublicOrPrivatePlace] = useState(
    formData?.MarriagePublicPlace?.marriagePublicOrPrivatePlace ? formData?.MarriagePublicPlace?.marriagePublicOrPrivatePlace : null
  );
  
  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();
  const cmbMarriagePublicOrPrivatePlace = [
    { i18nKey: "Public", code: "PUBLIC" },
    { i18nKey: "Private", code: "PRIVATE" },
    
  ];
  function setSelectMarriagePublicOrPrivatePlace(value) {
    setMarriagePublicOrPrivatePlace(value);
  }

  function setSelectMarriagePublicOrPrivateNamePlaceMal(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMarriagePublicOrPrivateNamePlaceMal('');
    } else {
      setMarriagePublicOrPrivateNamePlaceMal(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMarriagePublicOrPrivateNamePlaceEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMarriagePublicOrPrivateNamePlaceEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
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
      sessionStorage.setItem("marriagePublicOrPrivateNamePlaceEn", marriagePublicOrPrivateNamePlaceEn ? marriagePublicOrPrivateNamePlaceEn.code : null);
      sessionStorage.setItem("marriageLocalityMal", marriageLocalityMal ? marriageLocalityMal : null);
      sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      sessionStorage.setItem("marriageStreetMal", marriageStreetMal ? marriageStreetMal : null);
      sessionStorage.setItem("marriagePublicOrPrivateNamePlaceMal", marriagePublicOrPrivateNamePlaceMal ? marriagePublicOrPrivateNamePlaceMal : null);
      sessionStorage.setItem("marriagePublicOrPrivatePlace", marriagePublicOrPrivatePlace ? marriagePublicOrPrivatePlace : null);
      onSelect(config.key, {
        marriageLocalityMal,
        marriageLocalityEn,
        marriageLandmark,
        marriagePublicOrPrivatePlace,
        marriageStreetEn,
        marriageStreetMal,
        marriagePublicOrPrivateNamePlaceMal,
        marriagePublicOrPrivateNamePlaceEn
      });
    }
  };
  
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={1} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>          
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-4">
                <CardLabel>
                  {t("CR_PUBLIC_OR_PRIVATE_PLACE")}
                  <span className="mandatorycss">*</span>
                  </CardLabel>{" "}
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbMarriagePublicOrPrivatePlace}
                  selected={marriagePublicOrPrivatePlace}
                  select={setSelectMarriagePublicOrPrivatePlace}
                  placeholder={`${t("CR_PUBLIC_OR_PRIVATE_PLACE")}`}
                  {...(validation = { isRequired: true })}
                />
                </div> 
            <div className="col-md-4">
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
                value={marriagePublicOrPrivateNamePlaceEn}
                onChange={setSelectMarriagePublicOrPrivateNamePlaceEn}
                placeholder={`${t("CR_PUBLIC_PRIVATE_PLACE_EN")}`}
                {...(validation = { isRequired: true })}
              />
            </div> 
            <div className="col-md-4">
              <CardLabel>
                {t("CR_PUBLIC_PRIVATE_PLACE_ML")}
                <span className="mandatorycss">*</span>
                </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="marriagePublicOrPrivateNamePlaceMal"
                value={marriagePublicOrPrivateNamePlaceMal}
                onChange={setSelectMarriagePublicOrPrivateNamePlaceMal}
                placeholder={`${t("CR_PUBLIC_PRIVATE_PLACE_EN")}`}
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
export default MarriagePublicPlace;
