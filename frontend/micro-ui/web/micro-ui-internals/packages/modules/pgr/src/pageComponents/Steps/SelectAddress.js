import React, { useEffect, useState } from "react";
import { CardLabel, Dropdown, FormStep, TextArea } from "@egovernments/digit-ui-react-components";
import PGRTimeline from "../../components/PGRTimeline";

const SelectAddress = ({ t, config, onSelect, value }) => {
  const allCities = Digit.Hooks.pgr.useTenants();
  const cities = value?.pincode ? allCities.filter((city) => city?.pincode?.some((pin) => pin == value["pincode"])) : allCities;

  const [selectedCity, setSelectedCity] = useState(() => {
    const { city_complaint } = value;
    return city_complaint ? city_complaint : null;
  });

  const [localities, setLocalities] = useState(null);
  const [landmark, setLandmark] = useState("");

  const [selectedLocality, setSelectedLocality] = useState(() => {
    const { locality_complaint } = value;
    return locality_complaint ? locality_complaint : null;
  });

  const CitizenCityId = Digit.ULBService.getCitizenCurrentTenant(true);


  useEffect(() => {
    const city = allCities.find(item => item.code === CitizenCityId)
    if (CitizenCityId) {
      setSelectedCity(city)
    }
  }, [])

  const { data: fetchedLocalities } = Digit.Hooks.useBoundaryLocalities(CitizenCityId || selectedCity?.code, "revenue", { enabled: !!selectedCity, }, t);

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

  function onSubmit() {
    onSelect({ city_complaint: selectedCity, locality_complaint: selectedLocality, landmark: landmark });
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <PGRTimeline currentStep={3} /> : null}
      <FormStep config={config} onSelect={onSubmit} t={t} isDisabled={selectedLocality ? false : true}>
        <div>
          <CardLabel>{t("CS_COMMON_LOCAL_BODY")}</CardLabel>
          {/* {cities?.length < 5 ? (
            <RadioButtons selectedOption={selectedCity} options={cities} optionsKey="i18nKey" onSelect={selectCity} disabled={true} />
          ) : ( */}
          <Dropdown isMandatory selected={selectedCity} option={cities} select={selectCity} optionKey="i18nKey" t={t} disable={true} />
          {/* )} */}
          {selectedCity && localities && <CardLabel>{t("CS_COMMON_WARD")}</CardLabel>}
          {selectedCity && localities && (
            <React.Fragment>
              <Dropdown isMandatory selected={selectedLocality} optionKey="i18nkey" option={localities} select={selectLocality} t={t} />
              <CardLabel>
                {`${t("CS_ADDCOMPLAINT_LANDMARK")}`}
              </CardLabel>
              <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="landmark" value={landmark}
                onChange={(e) => setLandmark(e.target.value)} placeholder={`${t("CS_ADDCOMPLAINT_COMPLAINT_LOCATION")}`} />
            </React.Fragment>
          )}
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default SelectAddress;
