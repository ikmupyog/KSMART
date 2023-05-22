import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BridePresentAddressSameAsGroomPresentAddress = ({
  isBridePresentAddressSameAsGroomPresentAddress,
  setIsBridePresentAddressSameAsGroomPresentAddress,
  isEditMarriage = false,
  formData,
  setaddressCountry,
  setaddressStateName,
  setoutsideKeralaDistrict,
  setValue,
  setCountryValue,
  setCountryValuePermanent,
  setValuePermanent,
  setpermtaddressCountry,
  setpermtaddressStateName,
  setPresentWardNo,
  setinsideKeralaDistrict,
  setinsideKeralaLBTypeName,
  setinsideKeralaLBName,
  setinsideKeralaTaluk,
  setinsideKeralaVillage,
  setinsideKeralaPostOffice,
  setinsideKeralaPincode,
  setinsideKeralaHouseNameEn,
  setinsideKeralaHouseNameMl,
  setinsideKeralaLocalityNameEn,
  setinsideKeralaLocalityNameMl,
  setinsideKeralaStreetNameEn,
  setinsideKeralaStreetNameMl,
  setoutsideKeralaTaluk,
  setoutsideKeralaCityVilgeEn,
  setoutsideKeralaVillage,
  setoutsideKeralaPincode,
  setoutsideKeralaHouseNameEn,
  setoutsideKeralaHouseNameMl,
  setoutsideKeralaLocalityNameEn,
  setoutsideKeralaLocalityNameMl,
  setoutsideKeralaStreetNameEn,
  setoutsideKeralaStreetNameMl,
  setoutsideKeralaPostOfficeEn,
  setoutsideKeralaPostOfficeMl,
  setAdressEn,
  setAdressMl,
  setAdressEnB,
  setAdressMlB,
  setProvinceEn,
  setProvinceMl,
  setadrsVillage,
  setadrsCityTown,
  setPostCode,
}) => {
  const { t } = useTranslation();
  const setBridePresentAddressSameAsGroomPresentAddress = (e) => {
    setIsBridePresentAddressSameAsGroomPresentAddress(e.target.checked);
    if (e.target.checked) {
      setaddressCountry(formData?.GroomAddressDetails?.presentaddressCountry);
      setaddressStateName(formData?.GroomAddressDetails?.presentaddressStateName);
      setoutsideKeralaDistrict(formData?.GroomAddressDetails?.presentOutsideKeralaDistrict);
      setValue(formData?.GroomAddressDetails?.value);
      setCountryValue(formData?.GroomAddressDetails?.countryvalue);
      setCountryValuePermanent(formData?.GroomAddressDetails?.countryValuePermanent);
      setValuePermanent(formData?.GroomAddressDetails?.valuePermanent);
      setpermtaddressCountry(formData?.GroomAddressDetails?.permtaddressCountry);
      setpermtaddressStateName(formData?.GroomAddressDetails?.permtaddressStateName);
      setPresentWardNo(formData?.GroomAddressDetails?.presentWardNo);
      setinsideKeralaDistrict(formData?.GroomAddressDetails?.presentInsideKeralaDistrict);
      setinsideKeralaLBTypeName(formData?.GroomAddressDetails?.presentInsideKeralaLBTypeName);
      setinsideKeralaLBName(formData?.GroomAddressDetails?.presentInsideKeralaLBName);
      setinsideKeralaTaluk(formData?.GroomAddressDetails?.presentInsideKeralaTaluk);
      setinsideKeralaVillage(formData?.GroomAddressDetails?.presentInsideKeralaVillage);
      setinsideKeralaPostOffice(formData?.GroomAddressDetails?.presentInsideKeralaPostOffice);
      setinsideKeralaPincode(formData?.GroomAddressDetails?.presentInsideKeralaPincode);
      setinsideKeralaHouseNameEn(formData?.GroomAddressDetails?.presentInsideKeralaHouseNameEn);
      setinsideKeralaHouseNameMl(formData?.GroomAddressDetails?.presentInsideKeralaHouseNameMl);
      setinsideKeralaLocalityNameEn(formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn);
      setinsideKeralaLocalityNameMl(formData?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl);
      setinsideKeralaStreetNameEn(formData?.GroomAddressDetails?.presentInsideKeralaStreetNameEn);
      setinsideKeralaStreetNameMl(formData?.GroomAddressDetails?.presentInsideKeralaStreetNameMl);
      setoutsideKeralaTaluk(formData?.GroomAddressDetails?.presentOutsideKeralaTaluk);
      setoutsideKeralaCityVilgeEn(formData?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn);
      setoutsideKeralaVillage(formData?.GroomAddressDetails?.presentOutsideKeralaVillage);
      setoutsideKeralaPincode(formData?.GroomAddressDetails?.presentOutsideKeralaPincode);
      setoutsideKeralaHouseNameEn(formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn);
      setoutsideKeralaHouseNameMl(formData?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl);
      setoutsideKeralaLocalityNameEn(formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn);
      setoutsideKeralaLocalityNameMl(formData?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl);
      setoutsideKeralaStreetNameEn(formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn);
      setoutsideKeralaStreetNameMl(formData?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl);
      setoutsideKeralaPostOfficeEn(formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn);
      setoutsideKeralaPostOfficeMl(formData?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl);
      setAdressEn(formData?.GroomAddressDetails?.presentOutSideIndiaAdressEn);
      setAdressMl(formData?.GroomAddressDetails?.presentOutSideIndiaAdressMl);
      setAdressEnB(formData?.GroomAddressDetails?.presentOutSideIndiaAdressEnB);
      setAdressMlB(formData?.GroomAddressDetails?.presentOutSideIndiaAdressMlB);
      setProvinceEn(formData?.GroomAddressDetails?.presentOutSideIndiaProvinceEn);
      setProvinceMl(formData?.GroomAddressDetails?.presentOutSideIndiaProvinceMl);
      setadrsVillage(formData?.GroomAddressDetails?.presentOutSideIndiaadrsVillage);
      setadrsCityTown(formData?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown);
      setPostCode(formData?.GroomAddressDetails?.presentOutSideIndiaPostCode);
    } else {
      setaddressCountry("");
      setaddressStateName("");
      setoutsideKeralaDistrict("");
      setValue("");
      setCountryValue("");
      setCountryValuePermanent("");
      setValuePermanent("");
      setpermtaddressCountry("");
      setpermtaddressStateName("");
      setPresentWardNo("");
      setinsideKeralaDistrict("");
      setinsideKeralaLBTypeName("");
      setinsideKeralaLBName("");
      setinsideKeralaTaluk("");
      setinsideKeralaVillage("");
      setinsideKeralaPostOffice("");
      setinsideKeralaPincode("");
      setinsideKeralaHouseNameEn("");
      setinsideKeralaHouseNameMl("");
      setinsideKeralaLocalityNameEn("");
      setinsideKeralaLocalityNameMl("");
      setinsideKeralaStreetNameEn("");
      setinsideKeralaStreetNameMl("");
      setoutsideKeralaTaluk("");
      setoutsideKeralaCityVilgeEn("");
      setoutsideKeralaVillage("");
      setoutsideKeralaPincode("");
      setoutsideKeralaHouseNameEn("");
      setoutsideKeralaHouseNameMl("");
      setoutsideKeralaLocalityNameEn("");
      setoutsideKeralaLocalityNameMl("");
      setoutsideKeralaStreetNameEn("");
      setoutsideKeralaStreetNameMl("");
      setoutsideKeralaPostOfficeEn("");
      setoutsideKeralaPostOfficeMl("");
      setAdressEn("");
      setAdressMl("");
      setAdressEnB("");
      setAdressMlB("");
      setProvinceEn("");
      setProvinceMl("");
      setadrsVillage("");
      setadrsCityTown("");
      setPostCode("");
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <CheckBox
              label={t("CR_BRIDE_PRESENT_ADDRESS_SAME_AS_GROOM_PRESENT_ADDRESS")}
              onChange={setBridePresentAddressSameAsGroomPresentAddress}
              value={isBridePresentAddressSameAsGroomPresentAddress}
              checked={isBridePresentAddressSameAsGroomPresentAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridePresentAddressSameAsGroomPresentAddress;
