import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, NewRadioButton, BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import AdressInside from "./AdressInside";
import OutSideIndia from "./OutSideIndia";

import Timeline from "../../components/DRTimeline";
// import AddressInside from "./AdressInside";

const AddressOfDecesed = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // PresentCountry, setPresentCountry, PresentStateName, setPresentStateName, PresentDistrict, setPresentDistrict,
  // PresentLBTypeName, setPresentLBTypeName,PresentLBName, setPresentLBName,PresentTaluk, setPresentTaluk, PresentPostOffice, setPresentPostOffice,PresentPincode, setPresentPincode,
  // PresentHouseNameEn, setPresentHouseNameEn , PresentHouseNameMl, setPresentHouseNameMl,PresentDoorNo,setPresentDoorNo, PresentResNo, setPresentResNo,PresentMainPlaceEn, setPresentMainPlaceEn,
  // PresentMainPlaceMl, setPresentMainPlaceMl,PresentLocalityNameEn, setPresentLocalityNameEn,
  // PresentLocalityNameMl, setPresentLocalityNameMl,PresentStreetNameEn, setPresentStreetNameEn,PresentStreetNameMl, setPresentStreetNameMl,PresentCityEn, setPresentCityEn,PresentCityMl, setPresentCityMl,PresentVillage, setPresentVillage,
  // PermanentStateName, setPermanentStateName,PermanentDistrict, setPermanentDistrict,PermanentLBTypeName, setPermanentLBTypeName,PermanentLBName, setPermanentLBName,PermanentVillage, setPermanentVillage,PermanentTaluk, setPermanentTaluk,
  // PermanentPostOffice, setPermanentPostOffice,PermanentPincode, setPermanentPincode,PermanentResNo, setPermanentResNo,PermanentHouseNameEn, setPermanentHouseNameEn,PermanentHouseNameMl, setPermanentHouseNameMl,PermanentMainPlaceEn,
  // setPermanentMainPlaceEn,PermanentMainPlaceMl, setPermanentMainPlaceMl,PermanentDoorNo, setPermanentDoorNo,PermanentCityEn, setPermanentCityEn,PermanentCityMl, setPermanentCityMl,PermanentLocalityNameEn, setPermanentLocalityNameEn,
  // PermanentLocalityNameMl, setPermanentLocalityNameMl,PermanentStreetNameEn, setPermanentStreetNameEn,PermanentStreetNameMl, setPermanentStreetNameMl,isPrsentAddress, setIsPrsentAddress, PermanentCountry, setPermanentCountry

  const [PresentCountry, setPresentCountry] = useState(formData?.AddressOfDecesed?.PresentCountry ? formData?.AddressOfDecesed?.PresentCountry : null);
  const [PresentStateName, setPresentStateName] = useState(formData?.AddressOfDecesed?.PresentStateName ? formData?.AddressOfDecesed?.PresentStateName : null);
  const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressOfDecesed?.PresentDistrict ? formData?.AddressOfDecesed?.PresentDistrict : null);
  const [PresentLBTypeName, setPresentLBTypeName] = useState(formData?.AddressOfDecesed?.PresentLBTypeName ? formData?.AddressOfDecesed?.PresentLBTypeName : null);
  const [PresentLBName, setPresentLBName] = useState(formData?.AddressOfDecesed?.PresentLBName ? formData?.AddressOfDecesed?.PresentLBName : null);
  const [PresentTaluk, setPresentTaluk] = useState(formData?.AddressOfDecesed?.PresentTaluk ? formData?.AddressOfDecesed?.PresentTaluk : null);
  const [PresentPostOffice, setPresentPostOffice] = useState(formData?.AddressOfDecesed?.PresentPostOffice ? formData?.AddressOfDecesed?.PresentPostOffice : null);
  const [PresentPincode, setPresentPincode] = useState(formData?.AddressOfDecesed?.PresentPincode ? formData?.AddressOfDecesed?.PresentPincode : 0);
  const [PresentHouseNameEn, setPresentHouseNameEn] = useState(formData?.AddressOfDecesed?.PresentHouseNameEn ? formData?.AddressOfDecesed?.PresentHouseNameEn : "");
  const [PresentHouseNameMl, setPresentHouseNameMl] = useState(formData?.AddressOfDecesed?.PresentHouseNameMl ? formData?.AddressOfDecesed?.PresentHouseNameMl : ""); 
  const [PresentDoorNo, setPresentDoorNo] = useState(formData?.AddressOfDecesed?.PresentDoorNo ? formData?.AddressOfDecesed?.PresentDoorNo : "");
  const [PresentResNo, setPresentResNo] = useState(formData?.AddressOfDecesed?.PresentResNo ? formData?.AddressOfDecesed?.PresentResNo : "");
  const [PresentMainPlaceEn, setPresentMainPlaceEn] = useState(formData?.AddressOfDecesed?.PresentMainPlaceEn ? formData?.AddressOfDecesed?.PresentMainPlaceEn : "");
  const [PresentMainPlaceMl, setPresentMainPlaceMl] = useState(formData?.AddressOfDecesed?.PresentMainPlaceMl ? formData?.AddressOfDecesed?.PresentMainPlaceMl : "");
  const [PresentLocalityNameEn, setPresentLocalityNameEn] = useState(formData?.AddressOfDecesed?.PresentLocalityNameEn ? formData?.AddressOfDecesed?.PresentLocalityNameEn :"");
  const [PresentLocalityNameMl, setPresentLocalityNameMl] = useState(formData?.AddressOfDecesed?.PresentLocalityNameMl ? formData?.AddressOfDecesed?.PresentLocalityNameMl : "");
  const [PresentStreetNameEn, setPresentStreetNameEn] = useState(formData?.AddressOfDecesed?.PresentStreetNameEn ? formData?.AddressOfDecesed?.PresentStreetNameEn : "" );
  const [PresentStreetNameMl, setPresentStreetNameMl] = useState(formData?.AddressOfDecesed?.PresentStreetNameMl ? formData?.AddressOfDecesed?.PresentStreetNameMl : "");
  const [PresentCityEn, setPresentCityEn] = useState(formData?.AddressOfDecesed?.PresentCityEn ? formData?.AddressOfDecesed?.PresentCityEn : "");
  const [PresentCityMl, setPresentCityMl] = useState(formData?.AddressOfDecesed?.PresentCityMl ? formData?.AddressOfDecesed?.PresentCityMl : "");
  const [PresentVillage, setPresentVillage] = useState(formData?.AddressOfDecesed?.PresentVillage ? formData?.AddressOfDecesed?.PresentVillage : null);
  //Permanent Address
  const [PermanentCountry, setPermanentCountry] = useState(formData?.AddressOfDecesed?.PermanentCountry ? formData?.AddressOfDecesed?.PermanentCountry : null);
  const [PermanentStateName, setPermanentStateName] = useState(formData?.AddressOfDecesed?.PermanentStateName ? formData?.AddressOfDecesed?.PermanentStateName : null);
  const [PermanentDistrict, setPermanentDistrict] = useState(formData?.AddressOfDecesed?.PermanentDistrict ? formData?.AddressOfDecesed?.PermanentDistrict : null);
  const [PermanentLBTypeName, setPermanentLBTypeName] = useState(formData?.AddressOfDecesed?.PermanentLBTypeName ? formData?.AddressOfDecesed?.PermanentLBTypeName : null);
  const [PermanentLBName, setPermanentLBName] = useState(formData?.AddressOfDecesed?.PermanentLBName ? formData?.AddressOfDecesed?.PermanentLBName : null);
  const [PermanentVillage, setPermanentVillage] = useState(formData?.AddressOfDecesed?.PermanentVillage ? formData?.AddressOfDecesed?.PermanentVillage : null);
  const [PermanentTaluk, setPermanentTaluk] = useState(formData?.AddressOfDecesed?.PermanentTaluk ? formData?.AddressOfDecesed?.PermanentTaluk : null);
  const [PermanentPostOffice, setPermanentPostOffice] = useState(formData?.AddressOfDecesed?.PermanentPostOffice ? formData?.AddressOfDecesed?.PermanentPostOffice : null);
  const [PermanentPincode, setPermanentPincode] = useState(formData?.AddressOfDecesed?.PermanentPincode ? formData?.AddressOfDecesed?.PermanentPincode : 0 );
  const [PermanentDoorNo, setPermanentDoorNo] = useState(formData?.AddressOfDecesed?.PermanentDoorNo ? formData?.AddressOfDecesed?.PermanentDoorNo : "" );
  const [PermanentResNo, setPermanentResNo] = useState(formData?.AddressOfDecesed?.PermanentResNo ? formData?.AddressOfDecesed?.PermanentResNo : "");
  const [PermanentHouseNameEn, setPermanentHouseNameEn] = useState(formData?.AddressOfDecesed?.PermanentHouseNameEn ? formData?.AddressOfDecesed?.PermanentHouseNameEn:""  );
  const [PermanentHouseNameMl, setPermanentHouseNameMl] = useState(formData?.AddressOfDecesed?.PermanentHouseNameMl ? formData?.AddressOfDecesed?.PermanentHouseNameMl : "");
  const [PermanentMainPlaceEn, setPermanentMainPlaceEn] = useState(formData?.AddressOfDecesed?.PermanentMainPlaceEn ? formData?.AddressOfDecesed?.PermanentMainPlaceEn : "");
  const [PermanentMainPlaceMl, setPermanentMainPlaceMl] = useState(formData?.AddressOfDecesed?.PermanentMainPlaceMl ? formData?.AddressOfDecesed?.PermanentMainPlaceMl : "");
  const [PermanentCityEn, setPermanentCityEn] = useState(formData?.AddressOfDecesed?.PermanentCityEn ? formData?.AddressOfDecesed?.PermanentCityEn : "");
  const [PermanentCityMl, setPermanentCityMl] = useState(formData?.AddressOfDecesed?.PermanentCityMl ? formData?.AddressOfDecesed?.PermanentCityMl : "");
  const [PermanentLocalityNameEn, setPermanentLocalityNameEn] = useState(formData?.AddressOfDecesed?.PermanentLocalityNameEn ? formData?.AddressOfDecesed?.PermanentLocalityNameEn : "");
  const [PermanentLocalityNameMl, setPermanentLocalityNameMl] = useState(formData?.AddressOfDecesed?.PermanentLocalityNameMl ? formData?.AddressOfDecesed?.PermanentLocalityNameMl : "");
  const [PermanentStreetNameEn, setPermanentStreetNameEn] = useState(formData?.AddressOfDecesed?.PermanentStreetNameEn ? formData?.AddressOfDecesed?.PermanentStreetNameEn : "");
  const [PermanentStreetNameMl, setPermanentStreetNameMl] = useState(formData?.AddressOfDecesed?.PermanentStreetNameMl ? formData?.AddressOfDecesed?.PermanentStreetNameMl : "");
  const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressOfDecesed?.isPrsentAddress ? formData?.AddressOfDecesed?.isPrsentAddress : false);

  //Outside India
  const [AdressEn, setAdressEn] = useState(formData?.AddressOfDecesed?.AdressEn);
  const [AdressMl, setAdressMl] = useState(formData?.AddressOfDecesed?.AdressMl);
  const [AdressEnB, setAdressEnB] = useState(formData?.AddressOfDecesed?.AdressEnB);
  const [AdressMlB, setAdressMlB] = useState(formData?.AddressOfDecesed?.AdressMlB);
  const [LocalityEn, setLocalityEn] = useState(formData?.AddressOfDecesed?.LocalityEn);
  const [LocalityMl, setLocalityMl] = useState(formData?.AddressOfDecesed?.LocalityMl);
  const [ProvinceEn, setProvinceEn] = useState(formData?.AddressOfDecesed?.ProvinceEn);
  const [ProvinceMl, setProvinceMl] = useState(formData?.AddressOfDecesed?.ProvinceMl);
  const [setCountry, setSelectedCountry] = useState(formData?.AddressOfDecesed?.setCountry);

  const onSkip = () => onSelect();
  const goNext = () => {
    sessionStorage.setItem("PresentCountry", PresentCountry ? PresentCountry.code : null);
    sessionStorage.setItem("PresentStateName", PresentStateName ? PresentStateName.code : null);
    sessionStorage.setItem("PresentLBTypeName", PresentStateName ? PresentLBTypeName.code : null);
    sessionStorage.setItem("PresentDoorNo", PresentDoorNo ? PresentDoorNo : null);
    sessionStorage.setItem("PresentResNo", PresentResNo ? PresentResNo : null);
    sessionStorage.setItem("PresentHouseNameEn", PresentHouseNameEn ? PresentHouseNameEn : null);
    sessionStorage.setItem("PresentHouseNameMl", PresentHouseNameMl ? PresentHouseNameMl : null);
    sessionStorage.setItem("PresentMainPlaceEn", PresentMainPlaceEn ? PresentMainPlaceEn : null);
    sessionStorage.setItem("PresentMainPlaceMl", PresentMainPlaceMl ? PresentMainPlaceMl : null);
    sessionStorage.setItem("PresentLocalityNameEn", PresentLocalityNameEn ? PresentLocalityNameEn : null);
    sessionStorage.setItem("PresentLocalityNameMl", PresentLocalityNameMl ? PresentLocalityNameMl : null);
    sessionStorage.setItem("PresentStreetNameEn", PresentStreetNameEn ? PresentStreetNameEn : null);
    sessionStorage.setItem("PresentStreetNameMl", PresentStreetNameMl ? PresentStreetNameMl : null);
    sessionStorage.setItem("PresentCityEn", PresentCityEn ? PresentCityEn : null);
    sessionStorage.setItem("PresentCityaMl", PresentCityMl ? PresentCityMl : null);
    sessionStorage.setItem("PresentVillage", PresentVillage ? PresentVillage.code : null);
    sessionStorage.setItem("PresentLBName", PresentLBName ? PresentLBName : null);
    sessionStorage.setItem("PresentDistrict", PresentDistrict ? PresentDistrict.code : null);
    sessionStorage.setItem("PresentTaluk", PresentTaluk ? PresentTaluk.code : null);
    sessionStorage.setItem("PresentPostOffice", PresentPostOffice ? PresentPostOffice.code : null);
    sessionStorage.setItem("PresentPincode", PresentPincode ? PresentPincode.code : null);
    sessionStorage.setItem("PermanentCountry", PermanentCountry ? PermanentCountry.code : null);
    sessionStorage.setItem("PermanentStateName", PermanentStateName ? PermanentStateName.code : null);
    sessionStorage.setItem("PermanentLBTypeName", PermanentLBTypeName ? PermanentLBTypeName.code : null);
    sessionStorage.setItem("PermanentDoorNo", PermanentDoorNo ? PermanentDoorNo : null);
    sessionStorage.setItem("PermanentResNo", PermanentResNo ? PermanentResNo : null);
    sessionStorage.setItem("PermanentHouseNameEn", PermanentHouseNameEn ? PermanentHouseNameEn : null);
    sessionStorage.setItem("PermanentHouseNameMl", PermanentHouseNameMl ? PermanentHouseNameMl : null);
    sessionStorage.setItem("PermanentMainPlaceEn", PermanentMainPlaceEn ? PermanentMainPlaceEn : null);
    sessionStorage.setItem("PermanentMainPlaceMl", PermanentMainPlaceMl ? PermanentMainPlaceMl : null);
    sessionStorage.setItem("PermanentLocalityNameEn", PermanentLocalityNameEn ? PermanentLocalityNameEn : null);
    sessionStorage.setItem("PermanentLocalityNameMl", PermanentLocalityNameMl ? PermanentLocalityNameMl : null);
    sessionStorage.setItem("PermanentStreetNameEn", PermanentStreetNameEn ? PermanentStreetNameEn : null);
    sessionStorage.setItem("PermanentStreetNameMl", PermanentStreetNameMl ? PermanentStreetNameMl : null);
    sessionStorage.setItem("PermanentCityEn", PermanentCityEn ? PermanentCityEn : null);
    sessionStorage.setItem("PermanentCityMl", PermanentCityMl ? PermanentCityMl : null);
    sessionStorage.setItem("PermanentVillage", PermanentVillage ? PermanentVillage.code : null);
    sessionStorage.setItem("PermanentLBName", PermanentLBName ? PermanentLBName : null);
    sessionStorage.setItem("PermanentDistrict", PermanentDistrict ? PermanentDistrict.code : null);
    sessionStorage.setItem("PermanentTaluk", PermanentTaluk ? PermanentTaluk.code : null);
    sessionStorage.setItem("PermanentPostOffice", PermanentPostOffice ? PermanentPostOffice.code : null);
    sessionStorage.setItem("PermanentPincode", PermanentPincode ? PermanentPincode.code : null);
    sessionStorage.setItem("isPrsentAddress", isPrsentAddress ? isPrsentAddress : false);

    //Outside India
    sessionStorage.setItem("AdressEn", AdressEn ? AdressEn : null);
    sessionStorage.setItem("AdressMl", AdressMl ? AdressMl : null);
    sessionStorage.setItem("AdressEnB", AdressEnB ? AdressEnB : null);
    sessionStorage.setItem("AdressMlB", AdressMlB ? AdressMlB : null);
    sessionStorage.setItem("LocalityEn", LocalityEn ? LocalityEn : null);
    sessionStorage.setItem("LocalityMl", LocalityMl ? LocalityMl : null);
    sessionStorage.setItem("ProvinceEn", ProvinceEn ? ProvinceEn : null);
    sessionStorage.setItem("ProvinceMl", ProvinceMl ? ProvinceMl : null);
    sessionStorage.setItem("setCountry", setCountry ? setCountry.code : null);
    sessionStorage.setItem("setCountry", setCountry ? setCountry.code : null);
    sessionStorage.setItem("selectedOption", selectedOption ? selectedOption : "ILB");

    onSelect(config.key, {
      selectedOption,
      PresentDoorNo,
      PresentResNo,
      PresentHouseNameEn,
      PresentHouseNameMl,
      PresentLocalityNameEn,
      PresentLBTypeName,
      PresentCountry,
      PresentStateName,
      PresentMainPlaceEn,
      PresentMainPlaceMl,
      PresentLocalityNameMl,
      PresentStreetNameEn,
      PresentStreetNameMl,
      PresentCityEn,
      PresentCityMl,
      PresentVillage,
      PresentLBName,
      PresentDistrict,
      PresentTaluk,
      PresentPostOffice,
      PresentPincode,
      PermanentDoorNo,
      PermanentResNo,
      PermanentHouseNameEn,
      PermanentHouseNameMl,
      PermanentMainPlaceMl,
      PermanentMainPlaceEn,
      PermanentLocalityNameEn,
      PermanentLocalityNameMl,
      PermanentStreetNameEn,
      PermanentStreetNameMl,
      PermanentCityMl,
      PermanentCityEn,
      PermanentVillage,
      PermanentLBName,
      PermanentDistrict,
      PermanentTaluk,
      PermanentPostOffice,
      PermanentPincode,
      PermanentCountry,
      PermanentStateName,
      PermanentLBTypeName,
      isPrsentAddress,

      AdressEn,
      AdressMl,
      AdressEnB,
      AdressMlB,
      LocalityEn,
      LocalityMl,
      ProvinceEn,
      ProvinceMl,
      setCountry,
    });
  };

  const [inside, setInside] = useState(true);
  const [outside, setOutside] = useState(false);
  const insideHandler = () => {
    setInside(true);
    setOutside(false);
  };
  const outsideHandler = () => {
    setInside(false);
    setOutside(true);
  };
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    formData?.AddressOfDecesed?.selectedOption ? formData?.AddressOfDecesed?.selectedOption : "ILB"
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee")  ? <Timeline currentStep={3} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="maindeath">
          <div className="radios">
            <div className="inside">
              <input type="radio" name="options" value="ILB" checked={selectedOption === "ILB"} onChange={handleOptionChange} />
              <p>{t("ADDRESS_TYPE_INSIDE_LOCAL_BODY")}</p>
            </div>
            <div className="inside">
              <input type="radio" name="options" value="IK" checked={selectedOption === "IK"} onChange={handleOptionChange} />
              <p>{t("ADDRESS_TYPE_INSIDE_KERALA")}</p>
            </div>
            <div className="inside">
              <input type="radio" name="options" value="IIN" checked={selectedOption === "IIN"} onChange={handleOptionChange} />
              <p>{t("ADDRESS_TYPE_INSIDE_INDIA")}</p>
            </div>
            <div className="inside">
              <input type="radio" name="options" value="OIN" checked={selectedOption === "OIN"} onChange={handleOptionChange} />
              <p>{t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}</p>
            </div>
          </div>
          <div>
            {selectedOption === "ILB" &&  (
              <AdressInside
                PresentCountry={PresentCountry}
                setPresentCountry={setPresentCountry}
                PresentStateName={PresentStateName}
                setPresentStateName={setPresentStateName}
                PresentDistrict={PresentDistrict}
                setPresentDistrict={setPresentDistrict}
                PresentLBTypeName={PresentLBTypeName}
                setPresentLBTypeName={setPresentLBTypeName}
                PresentLBName={PresentLBName}
                setPresentLBName={setPresentLBName}
                PresentTaluk={PresentTaluk}
                setPresentTaluk={setPresentTaluk}
                PresentPostOffice={PresentPostOffice}
                setPresentPostOffice={setPresentPostOffice}
                PresentPincode={PresentPincode}
                setPresentPincode={setPresentPincode}
                PresentHouseNameEn={PresentHouseNameEn}
                setPresentHouseNameEn={setPresentHouseNameEn}
                PresentHouseNameMl={PresentHouseNameMl}
                setPresentHouseNameMl={setPresentHouseNameMl}
                PresentDoorNo={PresentDoorNo}
                setPresentDoorNo={setPresentDoorNo}
                PresentResNo={PresentResNo}
                setPresentResNo={setPresentResNo}
                PresentMainPlaceEn={PresentMainPlaceEn}
                setPresentMainPlaceEn={setPresentMainPlaceEn}
                PresentMainPlaceMl={PresentMainPlaceMl}
                setPresentMainPlaceMl={setPresentMainPlaceMl}
                PresentLocalityNameEn={PresentLocalityNameEn}
                setPresentLocalityNameEn={setPresentLocalityNameEn}
                PresentLocalityNameMl={PresentLocalityNameMl}
                setPresentLocalityNameMl={setPresentLocalityNameMl}
                PresentStreetNameEn={PresentStreetNameEn}
                setPresentStreetNameEn={setPresentStreetNameEn}
                PresentStreetNameMl={PresentStreetNameMl}
                setPresentStreetNameMl={setPresentStreetNameMl}
                PresentCityEn={PresentCityEn}
                setPresentCityEn={setPresentCityEn}
                PresentCityMl={PresentCityMl}
                setPresentCityMl={setPresentCityMl}
                PresentVillage={PresentVillage}
                setPresentVillage={setPresentVillage}
                isPrsentAddress={isPrsentAddress}
                setIsPrsentAddress={setIsPrsentAddress}
                PermanentCountry={PermanentCountry}
                setPermanentCountry={setPermanentCountry}
                PermanentStateName={PermanentStateName}
                setPermanentStateName={setPermanentStateName}
                PermanentDistrict={PermanentDistrict}
                setPermanentDistrict={setPermanentDistrict}
                PermanentLBTypeName={PermanentLBTypeName}
                setPermanentLBTypeName={setPermanentLBTypeName}
                PermanentLBName={PermanentLBName}
                setPermanentLBName={setPermanentLBName}
                PermanentVillage={PermanentVillage}
                setPermanentVillage={setPermanentVillage}
                PermanentTaluk={PermanentTaluk}
                setPermanentTaluk={setPermanentTaluk}
                PermanentPostOffice={PermanentPostOffice}
                setPermanentPostOffice={setPermanentPostOffice}
                PermanentPincode={PermanentPincode}
                setPermanentPincode={setPermanentPincode}
                PermanentDoorNo={PermanentDoorNo}
                setPermanentDoorNo={setPermanentDoorNo}
                PermanentResNo={PermanentResNo}
                setPermanentResNo={setPermanentResNo}
                PermanentHouseNameEn={PermanentHouseNameEn}
                setPermanentHouseNameEn={setPermanentHouseNameEn}
                PermanentHouseNameMl={PermanentHouseNameMl}
                setPermanentHouseNameMl={setPermanentHouseNameMl}
                PermanentMainPlaceEn={PermanentMainPlaceEn}
                setPermanentMainPlaceEn={setPermanentMainPlaceEn}
                PermanentMainPlaceMl={PermanentMainPlaceMl}
                setPermanentMainPlaceMl={setPermanentMainPlaceMl}
                PermanentCityEn={PermanentCityEn}
                setPermanentCityEn={setPermanentCityEn}
                PermanentCityMl={PermanentCityMl}
                setPermanentCityMl={setPermanentCityMl}
                PermanentLocalityNameEn={PermanentLocalityNameEn}
                setPermanentLocalityNameEn={setPermanentLocalityNameEn}
                PermanentLocalityNameMl={PermanentLocalityNameMl}
                setPermanentLocalityNameMl={setPermanentLocalityNameMl}
                PermanentStreetNameEn={PermanentStreetNameEn}
                setPermanentStreetNameEn={setPermanentStreetNameEn}
                PermanentStreetNameMl={PermanentStreetNameMl}
                setPermanentStreetNameMl={setPermanentStreetNameMl}
              />
            )}
             {selectedOption === "IK" &&  (
              <AdressInside
                PresentCountry={PresentCountry}
                setPresentCountry={setPresentCountry}
                PresentStateName={PresentStateName}
                setPresentStateName={setPresentStateName}
                PresentDistrict={PresentDistrict}
                setPresentDistrict={setPresentDistrict}
                PresentLBTypeName={PresentLBTypeName}
                setPresentLBTypeName={setPresentLBTypeName}
                PresentLBName={PresentLBName}
                setPresentLBName={setPresentLBName}
                PresentTaluk={PresentTaluk}
                setPresentTaluk={setPresentTaluk}
                PresentPostOffice={PresentPostOffice}
                setPresentPostOffice={setPresentPostOffice}
                PresentPincode={PresentPincode}
                setPresentPincode={setPresentPincode}
                PresentHouseNameEn={PresentHouseNameEn}
                setPresentHouseNameEn={setPresentHouseNameEn}
                PresentHouseNameMl={PresentHouseNameMl}
                setPresentHouseNameMl={setPresentHouseNameMl}
                PresentDoorNo={PresentDoorNo}
                setPresentDoorNo={setPresentDoorNo}
                PresentResNo={PresentResNo}
                setPresentResNo={setPresentResNo}
                PresentMainPlaceEn={PresentMainPlaceEn}
                setPresentMainPlaceEn={setPresentMainPlaceEn}
                PresentMainPlaceMl={PresentMainPlaceMl}
                setPresentMainPlaceMl={setPresentMainPlaceMl}
                PresentLocalityNameEn={PresentLocalityNameEn}
                setPresentLocalityNameEn={setPresentLocalityNameEn}
                PresentLocalityNameMl={PresentLocalityNameMl}
                setPresentLocalityNameMl={setPresentLocalityNameMl}
                PresentStreetNameEn={PresentStreetNameEn}
                setPresentStreetNameEn={setPresentStreetNameEn}
                PresentStreetNameMl={PresentStreetNameMl}
                setPresentStreetNameMl={setPresentStreetNameMl}
                PresentCityEn={PresentCityEn}
                setPresentCityEn={setPresentCityEn}
                PresentCityMl={PresentCityMl}
                setPresentCityMl={setPresentCityMl}
                PresentVillage={PresentVillage}
                setPresentVillage={setPresentVillage}
                isPrsentAddress={isPrsentAddress}
                setIsPrsentAddress={setIsPrsentAddress}
                PermanentCountry={PermanentCountry}
                setPermanentCountry={setPermanentCountry}
                PermanentStateName={PermanentStateName}
                setPermanentStateName={setPermanentStateName}
                PermanentDistrict={PermanentDistrict}
                setPermanentDistrict={setPermanentDistrict}
                PermanentLBTypeName={PermanentLBTypeName}
                setPermanentLBTypeName={setPermanentLBTypeName}
                PermanentLBName={PermanentLBName}
                setPermanentLBName={setPermanentLBName}
                PermanentVillage={PermanentVillage}
                setPermanentVillage={setPermanentVillage}
                PermanentTaluk={PermanentTaluk}
                setPermanentTaluk={setPermanentTaluk}
                PermanentPostOffice={PermanentPostOffice}
                setPermanentPostOffice={setPermanentPostOffice}
                PermanentPincode={PermanentPincode}
                setPermanentPincode={setPermanentPincode}
                PermanentDoorNo={PermanentDoorNo}
                setPermanentDoorNo={setPermanentDoorNo}
                PermanentResNo={PermanentResNo}
                setPermanentResNo={setPermanentResNo}
                PermanentHouseNameEn={PermanentHouseNameEn}
                setPermanentHouseNameEn={setPermanentHouseNameEn}
                PermanentHouseNameMl={PermanentHouseNameMl}
                setPermanentHouseNameMl={setPermanentHouseNameMl}
                PermanentMainPlaceEn={PermanentMainPlaceEn}
                setPermanentMainPlaceEn={setPermanentMainPlaceEn}
                PermanentMainPlaceMl={PermanentMainPlaceMl}
                setPermanentMainPlaceMl={setPermanentMainPlaceMl}
                PermanentCityEn={PermanentCityEn}
                setPermanentCityEn={setPermanentCityEn}
                PermanentCityMl={PermanentCityMl}
                setPermanentCityMl={setPermanentCityMl}
                PermanentLocalityNameEn={PermanentLocalityNameEn}
                setPermanentLocalityNameEn={setPermanentLocalityNameEn}
                PermanentLocalityNameMl={PermanentLocalityNameMl}
                setPermanentLocalityNameMl={setPermanentLocalityNameMl}
                PermanentStreetNameEn={PermanentStreetNameEn}
                setPermanentStreetNameEn={setPermanentStreetNameEn}
                PermanentStreetNameMl={PermanentStreetNameMl}
                setPermanentStreetNameMl={setPermanentStreetNameMl}
              />
            )}
             {selectedOption === "IIN" &&  (
              <AdressInside
                PresentCountry={PresentCountry}
                setPresentCountry={setPresentCountry}
                PresentStateName={PresentStateName}
                setPresentStateName={setPresentStateName}
                PresentDistrict={PresentDistrict}
                setPresentDistrict={setPresentDistrict}
                PresentLBTypeName={PresentLBTypeName}
                setPresentLBTypeName={setPresentLBTypeName}
                PresentLBName={PresentLBName}
                setPresentLBName={setPresentLBName}
                PresentTaluk={PresentTaluk}
                setPresentTaluk={setPresentTaluk}
                PresentPostOffice={PresentPostOffice}
                setPresentPostOffice={setPresentPostOffice}
                PresentPincode={PresentPincode}
                setPresentPincode={setPresentPincode}
                PresentHouseNameEn={PresentHouseNameEn}
                setPresentHouseNameEn={setPresentHouseNameEn}
                PresentHouseNameMl={PresentHouseNameMl}
                setPresentHouseNameMl={setPresentHouseNameMl}
                PresentDoorNo={PresentDoorNo}
                setPresentDoorNo={setPresentDoorNo}
                PresentResNo={PresentResNo}
                setPresentResNo={setPresentResNo}
                PresentMainPlaceEn={PresentMainPlaceEn}
                setPresentMainPlaceEn={setPresentMainPlaceEn}
                PresentMainPlaceMl={PresentMainPlaceMl}
                setPresentMainPlaceMl={setPresentMainPlaceMl}
                PresentLocalityNameEn={PresentLocalityNameEn}
                setPresentLocalityNameEn={setPresentLocalityNameEn}
                PresentLocalityNameMl={PresentLocalityNameMl}
                setPresentLocalityNameMl={setPresentLocalityNameMl}
                PresentStreetNameEn={PresentStreetNameEn}
                setPresentStreetNameEn={setPresentStreetNameEn}
                PresentStreetNameMl={PresentStreetNameMl}
                setPresentStreetNameMl={setPresentStreetNameMl}
                PresentCityEn={PresentCityEn}
                setPresentCityEn={setPresentCityEn}
                PresentCityMl={PresentCityMl}
                setPresentCityMl={setPresentCityMl}
                PresentVillage={PresentVillage}
                setPresentVillage={setPresentVillage}
                isPrsentAddress={isPrsentAddress}
                setIsPrsentAddress={setIsPrsentAddress}
                PermanentCountry={PermanentCountry}
                setPermanentCountry={setPermanentCountry}
                PermanentStateName={PermanentStateName}
                setPermanentStateName={setPermanentStateName}
                PermanentDistrict={PermanentDistrict}
                setPermanentDistrict={setPermanentDistrict}
                PermanentLBTypeName={PermanentLBTypeName}
                setPermanentLBTypeName={setPermanentLBTypeName}
                PermanentLBName={PermanentLBName}
                setPermanentLBName={setPermanentLBName}
                PermanentVillage={PermanentVillage}
                setPermanentVillage={setPermanentVillage}
                PermanentTaluk={PermanentTaluk}
                setPermanentTaluk={setPermanentTaluk}
                PermanentPostOffice={PermanentPostOffice}
                setPermanentPostOffice={setPermanentPostOffice}
                PermanentPincode={PermanentPincode}
                setPermanentPincode={setPermanentPincode}
                PermanentDoorNo={PermanentDoorNo}
                setPermanentDoorNo={setPermanentDoorNo}
                PermanentResNo={PermanentResNo}
                setPermanentResNo={setPermanentResNo}
                PermanentHouseNameEn={PermanentHouseNameEn}
                setPermanentHouseNameEn={setPermanentHouseNameEn}
                PermanentHouseNameMl={PermanentHouseNameMl}
                setPermanentHouseNameMl={setPermanentHouseNameMl}
                PermanentMainPlaceEn={PermanentMainPlaceEn}
                setPermanentMainPlaceEn={setPermanentMainPlaceEn}
                PermanentMainPlaceMl={PermanentMainPlaceMl}
                setPermanentMainPlaceMl={setPermanentMainPlaceMl}
                PermanentCityEn={PermanentCityEn}
                setPermanentCityEn={setPermanentCityEn}
                PermanentCityMl={PermanentCityMl}
                setPermanentCityMl={setPermanentCityMl}
                PermanentLocalityNameEn={PermanentLocalityNameEn}
                setPermanentLocalityNameEn={setPermanentLocalityNameEn}
                PermanentLocalityNameMl={PermanentLocalityNameMl}
                setPermanentLocalityNameMl={setPermanentLocalityNameMl}
                PermanentStreetNameEn={PermanentStreetNameEn}
                setPermanentStreetNameEn={setPermanentStreetNameEn}
                PermanentStreetNameMl={PermanentStreetNameMl}
                setPermanentStreetNameMl={setPermanentStreetNameMl}
              />
            )}
            {selectedOption === "OIN" && (
              <OutSideIndia
                AdressEn={AdressEn}
                setAdressEn={setAdressEn}
                AdressMl={AdressMl}
                setAdressMl={setAdressMl}
                AdressEnB={AdressEnB}
                setAdressEnB={setAdressEnB}
                AdressMlB={AdressMlB}
                setAdressMlB={setAdressMlB}
                LocalityEn={LocalityEn}
                setLocalityEn={setLocalityEn}
                ProvinceMl={ProvinceMl}
                setProvinceMl={setProvinceMl}
                setCountry={setCountry}
                setSelectedCountry={setSelectedCountry}
                LocalityMl={LocalityMl}
                setLocalityMl={setLocalityMl}
                ProvinceEn={ProvinceEn}
                setProvinceEn={setProvinceEn}
              />
            )}
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressOfDecesed;
