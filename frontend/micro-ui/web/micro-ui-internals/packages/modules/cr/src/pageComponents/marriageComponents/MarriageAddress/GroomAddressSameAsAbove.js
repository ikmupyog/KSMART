import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const GroomAddressSameAsAbove = ({
  config,
  onSelect,
  userType,
  formData,
  isPrsentAddress,
  setIsPrsentAddress,
  isEditMarriage = false,
  isEditDeath = false,
  isEditStillBirth = false,
  isEditBirthNAC = false,
  presentaddressCountry,
  setaddressCountry,
  presentaddressStateName,
  setaddressStateName,
  presentOutsideKeralaDistrict,
  setoutsideKeralaDistrict,
  value,
  setValue,
  countryvalue,
  setCountryValue,
  countryValuePermanent,
  setCountryValuePermanent,
  valuePermanent,
  setValuePermanent,
  permtaddressCountry,
  setpermtaddressCountry,
  permtaddressStateName,
  setpermtaddressStateName,
  presentWardNo,
  setPresentWardNo,
  presentInsideKeralaDistrict,
  setinsideKeralaDistrict,
  presentInsideKeralaLBTypeName,
  setinsideKeralaLBTypeName,
  presentInsideKeralaLBName,
  setinsideKeralaLBName,
  presentInsideKeralaTaluk,
  setinsideKeralaTaluk,
  presentInsideKeralaVillage,
  setinsideKeralaVillage,
  presentInsideKeralaPostOffice,
  setinsideKeralaPostOffice,
  presentInsideKeralaPincode,
  setinsideKeralaPincode,
  presentInsideKeralaHouseNameEn,
  setinsideKeralaHouseNameEn,
  presentInsideKeralaHouseNameMl,
  setinsideKeralaHouseNameMl,
  presentInsideKeralaLocalityNameEn,
  setinsideKeralaLocalityNameEn,
  presentInsideKeralaLocalityNameMl,
  setinsideKeralaLocalityNameMl,
  presentInsideKeralaStreetNameEn,
  setinsideKeralaStreetNameEn,
  presentInsideKeralaStreetNameMl,
  setinsideKeralaStreetNameMl,
  permntInKeralaAdrDistrict,
  setpermntInKeralaAdrDistrict,
  permntInKeralaAdrLBName,
  setpermntInKeralaAdrLBName,
  permntInKeralaAdrTaluk,
  setpermntInKeralaAdrTaluk,
  permntInKeralaAdrVillage,
  setpermntInKeralaAdrVillage,
  permntInKeralaAdrPostOffice,
  setpermntInKeralaAdrPostOffice,
  permntInKeralaAdrPincode,
  setpermntInKeralaAdrPincode,
  permntInKeralaAdrHouseNameEn,
  setpermntInKeralaAdrHouseNameEn,
  permntInKeralaAdrHouseNameMl,
  setpermntInKeralaAdrHouseNameMl,
  permntInKeralaAdrLocalityNameEn,
  setpermntInKeralaAdrLocalityNameEn,
  permntInKeralaAdrLocalityNameMl,
  setpermntInKeralaAdrLocalityNameMl,
  permntInKeralaAdrStreetNameEn,
  setpermntInKeralaAdrStreetNameEn,
  permntInKeralaAdrStreetNameMl,
  setpermntInKeralaAdrStreetNameMl,
  permntInKeralaWardNo,
  setpermntInKeralaWardNo,
  presentOutsideKeralaTaluk,
  setoutsideKeralaTaluk,
  presentOutsideKeralaCityVilgeEn,
  setoutsideKeralaCityVilgeEn,
  presentOutsideKeralaVillage,
  setoutsideKeralaVillage,
  presentOutsideKeralaPincode,
  setoutsideKeralaPincode,
  presentOutsideKeralaHouseNameEn,
  setoutsideKeralaHouseNameEn,
  presentOutsideKeralaHouseNameMl,
  setoutsideKeralaHouseNameMl,
  presentOutsideKeralaLocalityNameEn,
  setoutsideKeralaLocalityNameEn,
  presentOutsideKeralaLocalityNameMl,
  setoutsideKeralaLocalityNameMl,
  presentOutsideKeralaStreetNameEn,
  setoutsideKeralaStreetNameEn,
  presentOutsideKeralaStreetNameMl,
  setoutsideKeralaStreetNameMl,
  presentOutsideKeralaPostOfficeEn,
  setoutsideKeralaPostOfficeEn,
  presentOutsideKeralaPostOfficeMl,
  setoutsideKeralaPostOfficeMl,
  permntOutsideKeralaDistrict,
  setpermntOutsideKeralaDistrict,
  permntOutsideKeralaTaluk,
  setpermntOutsideKeralaTaluk,
  permntOutsideKeralaCityVilgeEn,
  setpermntOutsideKeralaCityVilgeEn,
  permntOutsideKeralaVillage,
  setpermntOutsideKeralaVillage,
  permntOutsideKeralaPincode,
  setpermntOutsideKeralaPincode,
  permntOutsideKeralaHouseNameEn,
  setpermntOutsideKeralaHouseNameEn,
  permntOutsideKeralaHouseNameMl,
  setpermntOutsideKeralaHouseNameMl,
  permntOutsideKeralaLocalityNameEn,
  setpermntOutsideKeralaLocalityNameEn,
  permntOutsideKeralaLocalityNameMl,
  setpermntOutsideKeralaLocalityNameMl,
  permntOutsideKeralaStreetNameEn,
  setpermntOutsideKeralaStreetNameEn,
  permntOutsideKeralaStreetNameMl,
  setpermntOutsideKeralaStreetNameMl,
  permntOutsideKeralaPostOfficeEn,
  setpermntoutsideKeralaPostOfficeEn,
  permntOutsideKeralaPostOfficeMl,
  setpermntoutsideKeralaPostOfficeMl,
  presentOutSideIndiaAdressEn,
  setAdressEn,
  presentOutSideIndiaAdressMl,
  setAdressMl,
  presentOutSideIndiaAdressEnB,
  setAdressEnB,
  presentOutSideIndiaAdressMlB,
  setAdressMlB,
  presentOutSideIndiaProvinceEn,
  setProvinceEn,
  presentOutSideIndiaProvinceMl,
  setProvinceMl,
  presentOutSideIndiaadrsVillage,
  setadrsVillage,
  presentOutSideIndiaadrsCityTown,
  setadrsCityTown,
  presentOutSideIndiaPostCode,
  setPostCode,
  permntOutsideIndiaLineoneEn,
  setadrsPermntOutsideIndiaLineoneEn,
  permntOutsideIndiaLineoneMl,
  setadrsPermntOutsideIndiaLineoneMl,
  permntOutsideIndiaLinetwoEn,
  setadrsPermntOutsideIndiaLinetwoEn,
  permntOutsideIndiaLinetwoMl,
  setadrsPermntOutsideIndiaLinetwoMl,
  permntOutsideIndiaprovinceEn,
  setPermntOutsideIndiaprovinceEn,
  permntOutsideIndiaprovinceMl,
  setPermntOutsideIndiaprovinceMl,
  permntOutsideIndiaVillage,
  setadrsPermntOutsideIndiaVillage,
  permntOutsideIndiaCityTown,
  setadrsPermntOutsideIndiaCityTown,
  permanentOutsideIndiaPostCode,
  setPermantpostCode,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(false);

  // const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressSameAsAboveDetails?.isPrsentAddress);

  const onSkip = () => onSelect();

  function setSameAsPresent(e) {
    setIsPrsentAddress(e.target.checked);
    if (e.target.checked == true) {
      setpermtaddressCountry(presentaddressCountry);
      setpermtaddressStateName(presentaddressStateName);
      setCountryValuePermanent(countryValuePermanent);
      setValuePermanent(valuePermanent);
      setpermntInKeralaAdrDistrict(presentInsideKeralaDistrict);
      setpermntInKeralaAdrLBName(presentInsideKeralaLBName);
      setpermntInKeralaAdrTaluk(presentInsideKeralaTaluk);
      setpermntInKeralaAdrVillage(presentInsideKeralaVillage);
      setpermntInKeralaAdrPostOffice(presentInsideKeralaPostOffice);
      setpermntInKeralaAdrPincode(presentInsideKeralaPincode);
      setpermntInKeralaAdrHouseNameEn(presentInsideKeralaHouseNameEn);
      setpermntInKeralaAdrHouseNameMl(presentInsideKeralaHouseNameMl);
      setpermntInKeralaAdrLocalityNameEn(presentInsideKeralaLocalityNameEn);
      setpermntInKeralaAdrLocalityNameMl(presentInsideKeralaLocalityNameMl);
      setpermntInKeralaAdrStreetNameEn(presentInsideKeralaStreetNameEn);
      setpermntInKeralaAdrStreetNameMl(presentInsideKeralaStreetNameMl);
      setpermntInKeralaWardNo(presentWardNo);
      setpermntOutsideKeralaDistrict(presentOutsideKeralaDistrict);
      setpermntOutsideKeralaTaluk(presentOutsideKeralaTaluk);
      setpermntOutsideKeralaCityVilgeEn(presentOutsideKeralaCityVilgeEn);
      setpermntOutsideKeralaVillage(presentOutsideKeralaVillage);
      setpermntOutsideKeralaPincode(presentOutsideKeralaPincode);
      setpermntOutsideKeralaHouseNameEn(presentOutsideKeralaHouseNameEn);
      setpermntOutsideKeralaHouseNameMl(presentOutsideKeralaHouseNameMl);
      setpermntOutsideKeralaLocalityNameEn(presentOutsideKeralaLocalityNameEn);
      setpermntOutsideKeralaLocalityNameMl(presentOutsideKeralaLocalityNameMl);
      setpermntOutsideKeralaStreetNameEn(presentOutsideKeralaStreetNameEn);
      setpermntOutsideKeralaStreetNameMl(presentOutsideKeralaStreetNameMl);
      setpermntoutsideKeralaPostOfficeEn(presentOutsideKeralaPostOfficeEn);
      setpermntoutsideKeralaPostOfficeMl(presentOutsideKeralaPostOfficeMl);
      setadrsPermntOutsideIndiaLineoneEn(presentOutSideIndiaAdressEn);
      setadrsPermntOutsideIndiaLineoneMl(presentOutSideIndiaAdressMl);
      setadrsPermntOutsideIndiaLinetwoEn(presentOutSideIndiaAdressEnB);
      setadrsPermntOutsideIndiaLinetwoMl(presentOutSideIndiaAdressMlB);
      setPermntOutsideIndiaprovinceEn(presentOutSideIndiaProvinceEn);
      setPermntOutsideIndiaprovinceMl(presentOutSideIndiaProvinceMl);
      setadrsPermntOutsideIndiaVillage(presentOutSideIndiaadrsVillage);
      setadrsPermntOutsideIndiaCityTown(presentOutSideIndiaadrsCityTown);
      setPermantpostCode(presentOutSideIndiaPostCode);
    } else {
      // setpermtaddressCountry(presentaddressCountry);
      // setpermtaddressStateName(presentaddressStateName);
      // setCountryValuePermanent(countryvalue);
      // setValuePermanent(value);
      setpermntInKeralaAdrDistrict("");
      setpermntInKeralaAdrLBName("");
      setpermntInKeralaAdrTaluk("");
      setpermntInKeralaAdrVillage("");
      setpermntInKeralaAdrPostOffice("");
      setpermntInKeralaAdrPincode("");
      setpermntInKeralaAdrHouseNameEn("");
      setpermntInKeralaAdrHouseNameMl("");
      setpermntInKeralaAdrLocalityNameEn("");
      setpermntInKeralaAdrLocalityNameMl("");
      setpermntInKeralaAdrStreetNameEn("");
      setpermntInKeralaAdrStreetNameMl("");
      setpermntInKeralaWardNo("");
      setpermntOutsideKeralaDistrict("");
      setpermntOutsideKeralaTaluk("");
      setpermntOutsideKeralaCityVilgeEn("");
      setpermntOutsideKeralaVillage("");
      setpermntOutsideKeralaPincode("");
      setpermntOutsideKeralaHouseNameEn("");
      setpermntOutsideKeralaHouseNameMl("");
      setpermntOutsideKeralaLocalityNameEn("");
      setpermntOutsideKeralaLocalityNameMl("");
      setpermntOutsideKeralaStreetNameEn("");
      setpermntOutsideKeralaStreetNameMl("");
      setpermntoutsideKeralaPostOfficeEn("");
      setpermntoutsideKeralaPostOfficeMl("");
      setadrsPermntOutsideIndiaLineoneEn("");
      setadrsPermntOutsideIndiaLineoneMl("");
      setadrsPermntOutsideIndiaLinetwoEn("");
      setadrsPermntOutsideIndiaLinetwoMl("");
      setPermntOutsideIndiaprovinceEn("");
      setPermntOutsideIndiaprovinceMl("");
      setadrsPermntOutsideIndiaVillage("");
      setadrsPermntOutsideIndiaCityTown("");
      setPermantpostCode("");
    }
  }

  if (isPrsentAddress && isEditMarriage) {
    setpermtaddressCountry(presentaddressCountry);
    setpermtaddressStateName(presentaddressStateName);
    setCountryValuePermanent(countryValuePermanent);
    setValuePermanent(valuePermanent);
    setpermntInKeralaAdrDistrict(presentInsideKeralaDistrict);
    setpermntInKeralaAdrLBName(presentInsideKeralaLBName);
    setpermntInKeralaAdrTaluk(presentInsideKeralaTaluk);
    setpermntInKeralaAdrVillage(presentInsideKeralaVillage);
    setpermntInKeralaAdrPostOffice(presentInsideKeralaPostOffice);
    setpermntInKeralaAdrPincode(presentInsideKeralaPincode);
    setpermntInKeralaAdrHouseNameEn(presentInsideKeralaHouseNameEn);
    setpermntInKeralaAdrHouseNameMl(presentInsideKeralaHouseNameMl);
    setpermntInKeralaAdrLocalityNameEn(presentInsideKeralaLocalityNameEn);
    setpermntInKeralaAdrLocalityNameMl(presentInsideKeralaLocalityNameMl);
    setpermntInKeralaAdrStreetNameEn(presentInsideKeralaStreetNameEn);
    setpermntInKeralaAdrStreetNameMl(presentInsideKeralaStreetNameMl);
    setpermntInKeralaWardNo(presentWardNo);
    setpermntOutsideKeralaDistrict(presentOutsideKeralaDistrict);
    setpermntOutsideKeralaTaluk(presentOutsideKeralaTaluk);
    setpermntOutsideKeralaCityVilgeEn(presentOutsideKeralaCityVilgeEn);
    setpermntOutsideKeralaVillage(presentOutsideKeralaVillage);
    setpermntOutsideKeralaPincode(presentOutsideKeralaPincode);
    setpermntOutsideKeralaHouseNameEn(presentOutsideKeralaHouseNameEn);
    setpermntOutsideKeralaHouseNameMl(presentOutsideKeralaHouseNameMl);
    setpermntOutsideKeralaLocalityNameEn(presentOutsideKeralaLocalityNameEn);
    setpermntOutsideKeralaLocalityNameMl(presentOutsideKeralaLocalityNameMl);
    setpermntOutsideKeralaStreetNameEn(presentOutsideKeralaStreetNameEn);
    setpermntOutsideKeralaStreetNameMl(presentOutsideKeralaStreetNameMl);
    setpermntoutsideKeralaPostOfficeEn(presentOutsideKeralaPostOfficeEn);
    setpermntoutsideKeralaPostOfficeMl(presentOutsideKeralaPostOfficeMl);
    setadrsPermntOutsideIndiaLineoneEn(presentOutSideIndiaAdressEn);
    setadrsPermntOutsideIndiaLineoneMl(presentOutSideIndiaAdressMl);
    setadrsPermntOutsideIndiaLinetwoEn(presentOutSideIndiaAdressEnB);
    setadrsPermntOutsideIndiaLinetwoMl(presentOutSideIndiaAdressMlB);
    setPermntOutsideIndiaprovinceEn(presentOutSideIndiaProvinceEn);
    setPermntOutsideIndiaprovinceMl(presentOutSideIndiaProvinceMl);
    setadrsPermntOutsideIndiaVillage(presentOutSideIndiaadrsVillage);
    setadrsPermntOutsideIndiaCityTown(presentOutSideIndiaadrsCityTown);
    setPermantpostCode(presentOutSideIndiaPostCode);
  }

  const goNext = () => {
    onSelect(config.key, {});
  };
  return (
    <React.Fragment>
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!isPrsentAddress}> */}
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_PERMANENT_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_SAME_AS_ABOVE")}
                onChange={setSameAsPresent}
                value={isPrsentAddress}
                checked={isPrsentAddress}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div>
      </div>

      {/* </FormStep> */}
    </React.Fragment>
  );
};
export default GroomAddressSameAsAbove;
