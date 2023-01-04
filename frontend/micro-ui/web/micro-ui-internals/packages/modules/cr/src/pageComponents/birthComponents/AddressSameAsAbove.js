import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressSameAsAbove = ({ config, onSelect, userType, formData }) => {
 const stateId = Digit.ULBService.getStateId();
 const { t } = useTranslation();
 let validation = {};
 const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
 const { data: State = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
 const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
 const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
 const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
 const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District"); 
 const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
 const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
//  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
 const [isInitialRender, setIsInitialRender] = useState(true);
 const [lbs, setLbs] = useState(0);
 const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
 const [PresentCountry, setPresentCountry] = useState(formData?.AddressSameAsAboveDetails?.PresentCountry);
 const [PresentStateName, setPresentStateName] = useState(formData?.AddressSameAsAboveDetails?.PresentStateName);
 const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressSameAsAboveDetails?.PresentDistrict);
 const [PresentLBTypeName, setPresentLBTypeName] = useState(formData?.AddressSameAsAboveDetails?.PresentLBTypeName);
 const [PresentLBName, setPresentLBName] = useState(formData?.AddressSameAsAboveDetails?.PresentLBName);
 const [PresentTaluk, setPresentTaluk] = useState(formData?.AddressSameAsAboveDetails?.PresentTaluk);
 const [PresentPostOffice, setPresentPostOffice] = useState(formData?.AddressSameAsAboveDetails?.PresentPostOffice);
 const [PresentPincode, setPresentPincode] = useState(formData?.AddressSameAsAboveDetails?.PresentPincode);
 const [PresentHouseNameEn, setPresentHouseNameEn] = useState(formData?.AddressSameAsAboveDetails?.PresentHouseNameEn);
 const [PresentHouseNameMl, setPresentHouseNameMl] = useState(formData?.AddressSameAsAboveDetails?.PresentHouseNameMl);
 const [PresentBuldingNo, setPresentBuldingNo] = useState(formData?.AddressSameAsAboveDetails?.PresentBuldingNo);
 const [PresentDoorNo, setPresentDoorNo] = useState(formData?.AddressSameAsAboveDetails?.PresentDoorNo);
 const [PresentMainPlaceEn, setPresentMainPlaceEn] = useState(formData?.AddressSameAsAboveDetails?.PresentMainPlaceEn);
 const [PresentMainPlaceMl, setPresentMainPlaceMl] = useState(formData?.AddressSameAsAboveDetails?.PresentMainPlaceMl);
 const [PresentLocalityNameEn, setPresentLocalityNameEn] = useState(formData?.AddressSameAsAboveDetails?.PresentLocalityNameEn);
 const [PresentLocalityNameMl, setPresentLocalityNameMl] = useState(formData?.AddressSameAsAboveDetails?.PresentLocalityNameMl);
 const [PresentStreetNameEn, setPresentStreetNameEn] = useState(formData?.AddressSameAsAboveDetails?.PresentStreetNameEn);
 const [PresentStreetNameMl, setPresentStreetNameMl] = useState(formData?.AddressSameAsAboveDetails?.PresentStreetNameMl);
 const [PresentVillage, setPresentVillage] = useState(formData?.AddressSameAsAboveDetails?.PresentVillage); 
 const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressSameAsAboveDetails?.isPrsentAddress);
 const [PermanentCountry, setPermanentCountry] = useState(formData?.AddressSameAsAboveDetails?.PermanentCountry);
 const [PermanentStateName, setPermanentStateName] = useState(formData?.AddressSameAsAboveDetails?.PermanentStateName);
 const [PermanentDistrict, setPermanentDistrict] = useState(formData?.AddressSameAsAboveDetails?.PermanentDistrict);
 const [PermanentLBTypeName, setPermanentLBTypeName] = useState(formData?.AddressSameAsAboveDetails?.PermanentLBTypeName);
 const [PermanentLBName, setPermanentLBName] = useState(formData?.AddressSameAsAboveDetails?.PermanentLBName);
 const [PermanentVillage, setPermanentVillage] = useState(formData?.AddressSameAsAboveDetails?.PermanentVillage);
 const [PermanentTaluk, setPermanentTaluk] = useState(formData?.AddressSameAsAboveDetails?.PermanentTaluk);
 const [PermanentPostOffice, setPermanentPostOffice] = useState(formData?.AddressSameAsAboveDetails?.PermanentPostOffice);
 const [PermanentPincode, setPermanentPincode] = useState(formData?.AddressSameAsAboveDetails?.PermanentPincode);
 const [PermanentBuldingNo, setPermanentBuldingNo] = useState(formData?.AddressSameAsAboveDetails?.PermanentBuldingNo);
 const [PermanentDoorNo, setPermanentDoorNo] = useState(formData?.AddressSameAsAboveDetails?.PermanentDoorNo);
 const [PermanentHouseNameEn, setPermanentHouseNameEn] = useState(formData?.AddressSameAsAboveDetails?.PermanentHouseNameEn);
 const [PermanentHouseNameMl, setPermanentHouseNameMl] = useState(formData?.AddressSameAsAboveDetails?.PermanentHouseNameMl);
 const [PermanentMainPlaceEn, setPermanentMainPlaceEn] = useState(formData?.AddressSameAsAboveDetails?.PermanentMainPlaceEn);
 const [PermanentMainPlaceMl, setPermanentMainPlaceMl] = useState(formData?.AddressSameAsAboveDetails?.PermanentMainPlaceMl);
 const [PermanentLocalityNameEn, setPermanentLocalityNameEn] = useState(formData?.AddressSameAsAboveDetails?.PermanentLocalityNameEn);
 const [PermanentLocalityNameMl, setPermanentLocalityNameMl] = useState(formData?.AddressSameAsAboveDetails?.PermanentLocalityNameMl);
 const [PermanentStreetNameEn, setPermanentStreetNameEn] = useState(formData?.AddressSameAsAboveDetails?.PermanentStreetNameEn);
 const [PermanentStreetNameMl, setPermanentStreetNameMl] = useState(formData?.AddressSameAsAboveDetails?.PermanentStreetNameMl);
 
 
 let cmbPlace = [];
 let cmbTaluk = [];
 let cmbVillage = [];
 let cmbDistrict = [];
 let cmbPostOffice = [];
 let districtid = null;
 let cmbLBType = [];
 
 console.log("Taluk" + Taluk);
 Taluk &&
 Taluk["common-masters"] &&
 Taluk["common-masters"].Taluk.map((ob) => {
 cmbTaluk.push(ob);
 });
 Village &&
 Village["common-masters"] &&
 Village["common-masters"].Village.map((ob) => {
 cmbVillage.push(ob);
 });
 PostOffice &&
 District["common-masters"] &&
 District["common-masters"].District.map((ob) => {
 cmbDistrict.push(ob);
 });
 PostOffice &&
 PostOffice["common-masters"] &&
 PostOffice["common-masters"].PostOffice.map((ob) => {
 cmbPostOffice.push(ob);
 }); 

 LBType &&
 LBType["common-masters"] &&
 LBType["common-masters"].LBType.map((ob) => {
 cmbLBType.push(ob);
 });

 const onSkip = () => onSelect();

 
  function setSelectPresentDistrict(value) {
    setIsInitialRender(true);
    setPresentDistrict(value);
    setPresentLBName(null);
    setLbs(null);
    districtid = value.districtid
    if (isPrsentAddress) {
    setPermanentDistrict(PresentDistrict);
    }
    }
 function setSelectPresentLBTypeName(value) {
 setPresentLBTypeName(value);
 if (isPrsentAddress) {
 setPermanentLBTypeName(PresentLBTypeName);
 }
 }
 function setSelectPresentLBName(value) {
  setPresentLBName(value);
  if (isPrsentAddress) {
  setPermanentLBName(PresentLBName);
  }
  }
  function setSelectPresentVillage(value) {
    setPresentVillage(value);
    console.log("Village" + cmbVillage);
    if (isPrsentAddress) {
    setPermanentVillage(PresentVillage);
    }
    }
 function setSelectPresentTaluk(value) {
      setPresentTaluk(value);
      console.log("Taluk" + cmbTaluk);
      if (isPrsentAddress) {
      setPermanentTaluk(PresentTaluk);
  }
  }
      
  function setSelectPresentPostOffice(value) {
      setPresentPostOffice(value);
      if (isPrsentAddress) {
      setPermanentPostOffice(PresentPostOffice);
      }
      }
function setSelectPresentPincode(e) {
      setPresentPincode(e.target.value);
      if (isPrsentAddress) {
      setPermanentPincode(PresentPincode);
}
}
 function setSelectPresentBuldingNo(e) {
 setPresentBuldingNo(e.target.value);
 if (isPrsentAddress) {
 setPermanentBuldingNo(PresentBuldingNo);
 }
 }
 function setSelectPresentDoorNo(e) {
 setPresentDoorNo(e.target.value);
 if (isPrsentAddress) {
 setPermanentDoorNo(PresentDoorNo);
 }
 }
 function setSelectPresentHouseNameEn(e) {
 setPresentHouseNameEn(e.target.value);
 if (isPrsentAddress) {
 setPermanentHouseNameEn(PresentHouseNameEn);
 }
 }
 function setSelectPresentHouseNameMl(e) {
 setPresentHouseNameMl(e.target.value);
 if (isPrsentAddress) {
 setPermanentHouseNameMl(PresentHouseNameMl);
 }
 }
 
 function setSelectPresentMainPlaceEn(e) {
 setPresentMainPlaceEn(e.target.value);
 if (isPrsentAddress) {
 setPermanentMainPlaceEn(PresentMainPlaceEn);
 }
 }
 function setSelectPresentMainPlaceMl(e) {
 setPresentMainPlaceMl(e.target.value);
 if (isPrsentAddress) {
 setPermanentMainPlaceMl(PresentMainPlaceMl);
 }
 }
 function setSelectPresentLocalityNameEn(e) {
 setPresentLocalityNameEn(e.target.value);
 if (isPrsentAddress) {
 setPermanentLocalityNameEn(PresentLocalityNameEn);
 }
 }
 function setSelectPresentLocalityNameMl(e) {
 setPresentLocalityNameMl(e.target.value);
 if (isPrsentAddress) {
 setPermanentLocalityNameMl(PresentLocalityNameMl);
 }
 }
 function setSelectPresentStreetNameEn(e) {
 setPresentStreetNameEn(e.target.value);
 if (isPrsentAddress) {
 setPermanentStreetNameEn(PresentStreetNameEn);
 }
 }
 function setSelectPresentStreetNameMl(e) {
 setPresentStreetNameMl(e.target.value);
 if (isPrsentAddress) {
 setPermanentStreetNameMl(PresentStreetNameMl);
 }
 } 
 
 //Permanent Address Function
 
  function setSelectPermanentDistrict(value) {
  setPermanentDistrict(value);
  districtid = value.districtid
  }
 function setSelectPermanentLBTypeName(value) {
 setPermanentLBTypeName(value);
 }
 function setSelectPermanentLBName(value) {
  setPermanentLBName(value);
  }
  function setSelectPermanentVillage(value) {
    setPermanentVillage(value);
    }
   
    function setSelectPermanentTaluk(value) {
    setPermanentTaluk(value);
    }
   
    function setSelectPermanentPostOffice(value) {
    setPermanentPostOffice(value);
    }
    function setSelectPermanentPincode(e) {
    setPermanentPincode(e.target.value);
    }
 function setSelectPermanentBuldingNo(e) {
 setPermanentBuldingNo(e.target.value);
 }
 function setSelectPermanentDoorNo(e) {
 setPermanentDoorNo(e.target.value);
 }
 function setSelectPermanentHouseNameEn(e) {
 setPermanentHouseNameEn(e.target.value);
 }
 function setSelectPermanentHouseNameMl(e) {
 setPermanentHouseNameMl(e.target.value);
 }
 function setSelectPermanentMainPlaceEn(e) {
  setPermanentMainPlaceEn(e.target.value);
  }
  function setSelectPermanentMainPlaceMl(e) {
  setPermanentMainPlaceMl(e.target.value);
  }
 function setSelectPermanentLocalityNameEn(e) {
 setPermanentLocalityNameEn(e.target.value);
 }
 function setSelectPermanentLocalityNameMl(e) {
 setPermanentLocalityNameMl(e.target.value);
 }
 function setSelectPermanentStreetNameEn(e) {
 setPermanentStreetNameEn(e.target.value);
 }
 function setSelectPermanentStreetNameMl(e) {
 setPermanentStreetNameMl(e.target.value);
 }

 function setSameAsPresent(e) {
 setIsPrsentAddress(e.target.checked);
 if (e.target.checked == true) { 
 setPermanentLBTypeName(PresentLBTypeName);
 setPermanentBuldingNo(PresentBuldingNo);
 setPermanentDoorNo(PresentDoorNo);
 setPermanentHouseNameEn(PresentHouseNameEn);
 setPermanentHouseNameMl(PresentHouseNameMl); 
 setPermanentMainPlaceEn(PresentMainPlaceEn);
 setPermanentMainPlaceMl(PresentMainPlaceMl);
 setPermanentLocalityNameEn(PresentLocalityNameEn);
 setPermanentLocalityNameMl(PresentLocalityNameMl);
 setPermanentStreetNameEn(PresentStreetNameEn);
 setPermanentStreetNameMl(PresentStreetNameMl);
 setPermanentVillage(PresentVillage);
 setPermanentLBName(PresentLBName);
 setPermanentDistrict(PresentDistrict);
 setPermanentTaluk(PresentTaluk);
 setPermanentPostOffice(PresentPostOffice);
 setPermanentPincode(PresentPincode);
 } else {
 
 setPermanentLBTypeName(' ');
 setPermanentBuldingNo('');
 setPermanentDoorNo('');
 setPermanentHouseNameEn('');
 setPermanentHouseNameMl('');
 setPermanentMainPlaceEn('');
 setPermanentMainPlaceMl('');
 setPermanentLocalityNameEn('');
 setPermanentLocalityNameMl('');
 setPermanentStreetNameEn('');
 setPermanentStreetNameMl('');
 setPermanentVillage('');
 setPermanentLBName('');
 setPermanentDistrict('');
 setPermanentTaluk('');
 setPermanentPostOffice('');
 setPermanentPincode('');
 }
 }

 const goNext = () => {

 onSelect(config.key, {
 
 });
 }
 return (
 <React.Fragment>
 {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
 {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
 <BackButton >{t("CS_COMMON_BACK")}</BackButton>
 <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={ !isPrsentAddress}> 
 <div>
 <div className="row">
 <div className="col-md-12" >
 <div className="col-md-12" >
 {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
 <CheckBox label={t("CR_SAME_AS_ABOVE")} onChange={setSameAsPresent} value={isPrsentAddress} checked={isPrsentAddress} />
 </div>
 </div>
 </div> 
 </div>

 </FormStep>
 </React.Fragment>
 );
};
export default AddressSameAsAbove;