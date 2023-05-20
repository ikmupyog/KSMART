import React, { useEffect, useState } from "react";
import { CardLabel, Dropdown, FormStep, TextArea } from "@egovernments/digit-ui-react-components";
import PGRTimeline from "../../components/PGRTimeline";
import { arraySort } from "../../constants/utils";

const SelectAddress = ({ t, config, onSelect, value }) => {
  const allCities = Digit.Hooks.pgr.useTenants();
  const cities = value.pincode ? allCities.filter((city) => city.pincode.some(pin => pin == value.pincode)) : allCities;

  const { locality_complaint } = value;

  const [selectedCity, setSelectedCity] = useState(() => {
    const { city_complaint } = value;
    return city_complaint ? city_complaint : null;
  });

  const locale = Digit.SessionStorage.get("locale") || "en_IN";

  const [localities, setLocalities] = useState(null);
  const [landmark, setLandmark] = useState(value?.landmark || "");

  const [selectedLocality, setSelectedLocality] = useState(() => {
    return locality_complaint ? locality_complaint : null;
  });

  const pinCity = allCities.find((city) => city.pincode.some(pin => pin == value.pincode))
  const CitizenCityId = Digit.ULBService.getCitizenCurrentTenant(true);

  useEffect(() => {
    const city = allCities.find(item => item.code === CitizenCityId)
    if (value.pincode) {
      setSelectedCity(pinCity)
    } else {
      setSelectedCity(city)

    }
  }, [])

  const { data: fetchedLocalities } = Digit.Hooks.useBoundaryLocalities(pinCity?.code || CitizenCityId, "revenue", { enabled: !!selectedCity, }, t);

  useEffect(() => {
    if (fetchedLocalities) {
      const { pincode } = value;
      let __localityList = pincode ? fetchedLocalities.filter((city) => city.pincode.includes(pincode)) : fetchedLocalities;
      setLocalities(fetchedLocalities);
    }
  }, [selectedCity, fetchedLocalities]);

  function selectCity(city) {
    setSelectedLocality(null);
    setLocalities(null);
    setSelectedCity(city);;
  }

  function selectLocality(locality) {
    setSelectedLocality(locality);
    // Digit.SessionStorage.set("locality_complaint", locality);
  }

  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C 0-9!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;
  let en_pattern = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

  const handleLandmark = (e) => {
    if (e.target.value.trim().length <= 100) {
      if (locale === "ml_IN") {
        if (e.target.value.match(ml_pattern)) {
          setLandmark(e.target.value.substring(0, 100));
        }
      } else if (e.target.value.match(en_pattern)) {
        setLandmark(e.target.value.substring(0, 100));
      }
    }
  }

  function onSubmit() {
    onSelect({ city_complaint: selectedCity, locality_complaint: selectedLocality, landmark: landmark.trim() });
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <PGRTimeline currentStep={3} /> : null}
      <FormStep config={config} onSelect={onSubmit} t={t} isDisabled={selectedLocality && landmark ? false : true}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CS_COMMON_LOCAL_BODY")} <span className="mandatorycss">*</span></CardLabel>
              <Dropdown isMandatory selected={selectedCity} option={arraySort(cities ? cities : [], "name", t)} select={selectCity} optionKey="i18nKey" t={t} disable={true} />
              {/*
            <RadioButtons selectedOption={selectedCity} options={cities} optionsKey="i18nKey" onSelect={selectCity} disabled={true} />
          */}
            </div>
            {selectedCity && localities ? (
              <div className="col-md-6">
                <CardLabel>{t("CS_COMMON_WARD")} <span className="mandatorycss">*</span></CardLabel>
                <Dropdown isMandatory selected={selectedLocality} optionKey="i18nkey" option={arraySort(localities ? localities : [], "name", t)} select={selectLocality} t={t} />
              </div>
            ) : <div className="col-md-6"></div>}
          </div>
        </div>
        {selectedCity && localities && (
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <CardLabel> {`${t("CS_ADDCOMPLAINT_LANDMARK")}`} <span className="mandatorycss">*</span><span> {t("PGR_LANDMARK_LIMIT")}</span></CardLabel>
                <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="landmark" value={landmark}
                  onChange={handleLandmark} placeholder={`${t("CS_ADDCOMPLAINT_COMPLAINT_LOCATION")}`} />
              </div>
            </div>
          </div>
        )}
      </FormStep>
    </React.Fragment>
  );
};

export default SelectAddress;
