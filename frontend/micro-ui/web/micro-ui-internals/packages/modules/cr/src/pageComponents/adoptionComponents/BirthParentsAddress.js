import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/ADTimeline";
import { useTranslation } from "react-i18next";

const BirthParentsAddress = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Country = {},isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {},isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: PostOffice = {},isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {},isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {},isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {},isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies={}, islocalbodiesLoading } = Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");  

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [lbs, setLbs] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [PresentCountry, setPresentCountry] = useState(formData?.BirthMotherAddressDetails?.PresentCountry);
  const [PresentStateName, setPresentStateName] = useState(formData?.BirthMotherAddressDetails?.PresentStateName);
  const [PresentDistrict, setPresentDistrict] = useState(formData?.BirthMotherAddressDetails?.PresentDistrict);
  const [PresentLBTypeName, setPresentLBTypeName] = useState(formData?.BirthMotherAddressDetails?.PresentLBTypeName);
  const [PresentLBName, setPresentLBName] = useState(formData?.BirthMotherAddressDetails?.PresentLBName);
  // const [PresentWardNo, setPresentWardNo] = useState(formData.AddressPresentDetails?.Presentwardno);
  const [PresentTaluk, setPresentTaluk] = useState(formData?.BirthMotherAddressDetails?.PresentTaluk);
  const [PresentPostOffice, setPresentPostOffice] = useState(formData?.BirthMotherAddressDetails?.PresentPostOffice);
  const [PresentPincode, setPresentPincode] = useState(formData?.BirthMotherAddressDetails?.PresentPincode);
  const [PresentHouseNameEn, setPresentHouseNameEn] = useState(formData?.BirthMotherAddressDetails?.PresentHouseNameEn);
  const [PresentHouseNameMl, setPresentHouseNameMl] = useState(formData?.BirthMotherAddressDetails?.PresentHouseNameMl);
  const [PresentBuldingNo, setPresentBuldingNo] = useState(formData?.BirthMotherAddressDetails?.PresentBuldingNo);
  const [PresentDoorNo, setPresentDoorNo] = useState(formData?.BirthMotherAddressDetails?.PresentDoorNo);
  const [PresentResNo, setPresentResNo] = useState(formData?.BirthMotherAddressDetails?.PresentResNo);
  const [PresentMainPlaceEn, setPresentMainPlaceEn] = useState(formData?.BirthMotherAddressDetails?.PresentMainPlaceEn);
  const [PresentMainPlaceMl, setPresentMainPlaceMl] = useState(formData?.BirthMotherAddressDetails?.PresentMainPlaceMl);
  const [PresentLocalityNameEn, setPresentLocalityNameEn] = useState(formData?.BirthMotherAddressDetails?.PresentLocalityNameEn);
  const [PresentLocalityNameMl, setPresentLocalityNameMl] = useState(formData?.BirthMotherAddressDetails?.PresentLocalityNameMl);
  const [PresentStreetNameEn, setPresentStreetNameEn] = useState(formData?.BirthMotherAddressDetails?.PresentStreetNameEn);
  const [PresentStreetNameMl, setPresentStreetNameMl] = useState(formData?.BirthMotherAddressDetails?.PresentStreetNameMl);
  const [PresentVillage, setPresentVillage] = useState(formData?.BirthMotherAddressDetails?.PresentVillage);
  const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.BirthMotherAddressDetails?.isPrsentAddress);
  const [PermanentCountry, setPermanentCountry] = useState(formData?.BirthMotherAddressDetails?.PermanentCountry);
  const [PermanentStateName, setPermanentStateName] = useState(formData?.BirthMotherAddressDetails?.PermanentStateName);
  const [PermanentDistrict, setPermanentDistrict] = useState(formData?.BirthMotherAddressDetails?.PermanentDistrict);
  const [PermanentLBTypeName, setPermanentLBTypeName] = useState(formData?.BirthMotherAddressDetails?.PermanentLBTypeName);
  const [PermanentLBName, setPermanentLBName] = useState(formData?.BirthMotherAddressDetails?.PermanentLBName);
  // const [PermanentWardNo, setPermanentWardNo] = useState(formData.AddressPresentDetails?.Presentwardno);
  const [PermanentVillage, setPermanentVillage] = useState(formData?.BirthMotherAddressDetails?.PermanentVillage);
  const [PermanentTaluk, setPermanentTaluk] = useState(formData?.BirthMotherAddressDetails?.PermanentTaluk);
  const [PermanentPostOffice, setPermanentPostOffice] = useState(formData?.BirthMotherAddressDetails?.PermanentPostOffice);
  const [PermanentPincode, setPermanentPincode] = useState(formData?.BirthMotherAddressDetails?.PermanentPincode);
  const [PermanentBuldingNo, setPermanentBuldingNo] = useState(formData?.BirthMotherAddressDetails?.PermanentBuldingNo);
  const [PermanentDoorNo, setPermanentDoorNo] = useState(formData?.BirthMotherAddressDetails?.PermanentDoorNo);
  const [PermanentResNo, setPermanentResNo] = useState(formData?.BirthMotherAddressDetails?.PermanentResNo);
  const [PermanentHouseNameEn, setPermanentHouseNameEn] = useState(formData?.BirthMotherAddressDetails?.PermanentHouseNameEn);
  const [PermanentHouseNameMl, setPermanentHouseNameMl] = useState(formData?.BirthMotherAddressDetails?.PermanentHouseNameMl);
  const [PermanentMainPlaceEn, setPermanentMainPlaceEn] = useState(formData?.BirthMotherAddressDetails?.PermanentMainPlaceEn);
  const [PermanentMainPlaceMl, setPermanentMainPlaceMl] = useState(formData?.BirthMotherAddressDetails?.PermanentMainPlaceMl);
  const [PermanentLocalityNameEn, setPermanentLocalityNameEn] = useState(formData?.BirthMotherAddressDetails?.PermanentLocalityNameEn);
  const [PermanentLocalityNameMl, setPermanentLocalityNameMl] = useState(formData?.BirthMotherAddressDetails?.PermanentLocalityNameMl);
  const [PermanentStreetNameEn, setPermanentStreetNameEn] = useState(formData?.BirthMotherAddressDetails?.PermanentStreetNameEn);
  const [PermanentStreetNameMl, setPermanentStreetNameMl] = useState(formData?.BirthMotherAddressDetails?.PermanentStreetNameMl);

  let cmbPlace = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let cmbCountry = [];
  let cmbState = [];
  let districtid = null;
  let cmbLBType = [];

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

  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });

  State &&
    State["common-masters"] &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });

  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });

//     let Zonal = [];
//  let cmbWardNo = [];
//  let cmbWardNoFinal = [];
//  boundaryList &&
//    boundaryList["egov-location"] &&
//    boundaryList["egov-location"].TenantBoundary.map((ob) => {
//      //  console.log(ob);
//      // if(ob?.boundary){
//      Zonal.push(...ob.boundary.children);
//      ob.boundary.children.map((obward) => {
//        cmbWardNo.push(...obward.children);
//      });
//      // }

//    });
//  //console.log(Zonal);
//  cmbWardNo.map((wardmst) => {
//    wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
//    wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
//    cmbWardNoFinal.push(wardmst);
//  });


  const onSkip = () => onSelect();

  function setSelectPresentCountry(value) {
    setPresentCountry(value);
    console.log("Country" + cmbCountry);
    if (isPrsentAddress) {
      setPermanentCountry(PresentCountry);
    }
  }
  function setSelectPresentStateName(value) {
    setPresentStateName(value);
    console.log("StateName" + cmbState);
    if (isPrsentAddress) {
      setPermanentStateName(PresentStateName);
    }
  }
  function setSelectPresentDistrict(value) {
    setIsInitialRender(true);
    setPresentDistrict(value);
    setPresentLBName(null);
    setLbs(null);
    districtid = value.districtid;
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
  // function setSelectPresentWard(value) {
  //   setPresentWardNo(value);
  //   if (isPrsentAddress) {
  //     setPermanentWardNo(PresentWardNo);
  //   }
  // }


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
  function setSelectPresentResNo(e) {
    setPresentResNo(e.target.value);
    if (isPrsentAddress) {
      setPermanentResNo(PresentResNo);
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
  function setSelectPermanentCountry(value) {
    setPermanentCountry(value);
  }
  function setSelectPermanentStateName(value) {
    setPermanentStateName(value);
  }
  function setSelectPermanentDistrict(value) {
    setPermanentDistrict(value);
    districtid = value.districtid;
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
  // function setSelectPermanentWard(value) {
  //   setPermanentWardNo(value);
  // }

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
  function setSelectPermanentResNo(e) {
    setPermanentResNo(e.target.value);
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
      setPermanentCountry(PresentCountry);
      setPermanentStateName(PresentStateName);
      setPermanentLBTypeName(PresentLBTypeName);
      setPermanentBuldingNo(PresentBuldingNo);
      setPermanentDoorNo(PresentDoorNo);
      setPermanentResNo(PresentResNo);
      setPermanentHouseNameEn(PresentHouseNameEn);
      setPermanentHouseNameMl(PresentHouseNameMl);
      setPermanentMainPlaceEn(PresentMainPlaceEn);
      setPermanentMainPlaceMl(PresentMainPlaceMl);
      setPermanentLocalityNameEn(PresentLocalityNameEn);
      setPermanentLocalityNameMl(PresentLocalityNameMl);
      setPermanentStreetNameEn(PresentStreetNameEn);
      setPermanentStreetNameMl(PresentStreetNameMl);
      setPermanentVillage(PresentVillage);
      // setPermanentWardNo(PresentWardNo);
      setPermanentLBName(PresentLBName);
      setPermanentDistrict(PresentDistrict);
      setPermanentTaluk(PresentTaluk);
      setPermanentPostOffice(PresentPostOffice);
      setPermanentPincode(PresentPincode);
    } else {
      setPermanentCountry("");
      setPermanentStateName("");
      setPermanentLBTypeName(" ");
      setPermanentBuldingNo("");
      setPermanentDoorNo("");
      setPermanentResNo("");
      setPermanentHouseNameEn("");
      setPermanentHouseNameMl("");
      setPermanentMainPlaceEn("");
      setPermanentMainPlaceMl("");
      setPermanentLocalityNameEn("");
      setPermanentLocalityNameMl("");
      setPermanentStreetNameEn("");
      setPermanentStreetNameMl("");
      setPermanentVillage("");
      // setPermanentWardNo("");
      setPermanentLBName("");
      setPermanentDistrict("");
      setPermanentTaluk("");
      setPermanentPostOffice("");
      setPermanentPincode("");
    }
  }
  useEffect(() => {
    if (isInitialRender) {
      console.log("PresentDistrict" + districtid);
      console.log(localbodies);
      if (PresentDistrict) {
        setIsInitialRender(false);
        setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === PresentDistrict.districtid));
      }
    }
  }, [lbs, isInitialRender]);
  const goNext = () => {   
    sessionStorage.setItem("PresentCountry", PresentCountry ? PresentCountry.code : null);
    sessionStorage.setItem("PresentStateName", PresentStateName ? PresentStateName.code : null );
    sessionStorage.setItem("PresentLBTypeName", PresentLBTypeName ? PresentLBTypeName.code : null );
    sessionStorage.setItem("PresentBuldingNo", PresentBuldingNo ? PresentBuldingNo : null );
    sessionStorage.setItem("PresentDoorNo", PresentDoorNo ? PresentDoorNo : null );
    sessionStorage.setItem("PresentResNo", PresentResNo ? PresentResNo : null );
    sessionStorage.setItem("PresentHouseNameEn", PresentHouseNameEn ? PresentHouseNameEn: null );
    sessionStorage.setItem("PresentHouseNameMl", PresentHouseNameMl ? PresentHouseNameMl : null );
    sessionStorage.setItem("PresentMainPlaceEn", PresentMainPlaceEn ? PresentMainPlaceEn : null );
    sessionStorage.setItem("PresentMainPlaceMl", PresentMainPlaceMl ? PresentMainPlaceMl : null );
    sessionStorage.setItem("PresentLocalityNameEn", PresentLocalityNameEn ? PresentLocalityNameEn : null );
    sessionStorage.setItem("PresentLocalityNameMl", PresentLocalityNameMl ? PresentLocalityNameMl : null );
    sessionStorage.setItem("PresentStreetNameEn", PresentStreetNameEn ? PresentStreetNameEn : null );
    sessionStorage.setItem("PresentStreetNameMl", PresentStreetNameMl ? PresentStreetNameMl: null );
    sessionStorage.setItem("PresentVillage", PresentVillage ? PresentVillage.code : null );
    // sessionStorage.setItem("PresentWardNo", PresentWardNo.code);
    sessionStorage.setItem("PresentLBName", PresentLBName ? PresentLBName.code : null );
    sessionStorage.setItem("PresentDistrict", PresentDistrict ? PresentDistrict.code : null );
    sessionStorage.setItem("PresentTaluk", PresentTaluk ? PresentTaluk.code : null );
    sessionStorage.setItem("PresentPostOffice", PresentPostOffice ?  PresentPostOffice.code : null );
    sessionStorage.setItem("PresentPincode", PresentPincode ? PresentPincode : null );
    sessionStorage.setItem("PermanentCountry", PermanentCountry ? PermanentCountry.code : null );
    sessionStorage.setItem("PermanentStateName", PermanentStateName ? PermanentStateName.code : null );
    sessionStorage.setItem("PermanentLBTypeName", PermanentLBTypeName ? PermanentLBTypeName.code : null );
    sessionStorage.setItem("PermanentBuldingNo", PermanentBuldingNo ? PermanentBuldingNo : null );
    sessionStorage.setItem("PermanentDoorNo", PermanentDoorNo ? PermanentDoorNo : null );
    sessionStorage.setItem("PermanentResNo", PermanentResNo ? PermanentResNo : null );
    sessionStorage.setItem("PermanentHouseNameEn", PermanentHouseNameEn ? PermanentHouseNameEn : null );
    sessionStorage.setItem("PermanentHouseNameMl", PermanentHouseNameMl ? PermanentHouseNameMl : null );
    sessionStorage.setItem("PermanentMainPlaceEn", PermanentMainPlaceEn ? PermanentMainPlaceEn : null );
    sessionStorage.setItem("PermanentMainPlaceMl", PermanentMainPlaceMl ? PermanentMainPlaceMl : null );
    sessionStorage.setItem("PermanentLocalityNameEn", PermanentLocalityNameEn ? PermanentLocalityNameEn : null );
    sessionStorage.setItem("PermanentLocalityNameMl", PermanentLocalityNameMl ? PermanentLocalityNameMl : null );
    sessionStorage.setItem("PermanentStreetNameEn", PermanentStreetNameEn ? PermanentStreetNameEn : null );
    sessionStorage.setItem("PermanentStreetNameMl", PermanentStreetNameMl ? PermanentStreetNameMl : null );
    sessionStorage.setItem("PermanentVillage", PermanentVillage ? PermanentVillage.code : null );
    // sessionStorage.setItem("PermanentWardNo", PermanentWardNo ? : null );
    sessionStorage.setItem("PermanentLBName",PermanentLBName ? PermanentLBName.code : null );
    sessionStorage.setItem("PermanentDistrict", PermanentDistrict ? PermanentDistrict.code : null );
    sessionStorage.setItem("PermanentTaluk", PermanentTaluk ? PermanentTaluk.code : null );
    sessionStorage.setItem("PermanentPostOffice", PermanentPostOffice ? PermanentPostOffice.code : null );
    sessionStorage.setItem("PermanentPincode", PermanentPincode ? PermanentPincode : null );
    onSelect(config.key, {
      PresentBuldingNo,
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
      PresentVillage,
      PresentLBName,
      PresentDistrict,
      PresentTaluk,
      PresentPostOffice,
      PresentPincode,
      PermanentBuldingNo,
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
      PermanentVillage,
      PermanentLBName,
      PermanentDistrict,
      PermanentTaluk,
      PermanentPostOffice,
      PermanentPincode,
      PermanentCountry,
      PermanentStateName,
      PermanentLBTypeName,
    });
  };


  if (isCountryLoading || isStateLoading  ||islocalbodiesLoading|| isPostOfficeLoading  || isDistrictLoading || isTalukLoading || isVillageLoading ) {
      return <Loader></Loader>;
     }
  return (
    <React.Fragment>
     {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
     {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> 
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={
          !PresentDoorNo ||
          !PresentLocalityNameEn ||
          !PresentLocalityNameMl ||
          !PresentDistrict ||
          !PresentVillage ||
          !PresentTaluk ||
          !PresentPostOffice ||
          !PresentPincode ||
          !PermanentDoorNo ||
          !PermanentLocalityNameEn ||
          !PermanentLocalityNameMl ||
          !PermanentDistrict ||
          !PermanentVillage ||
          !PermanentTaluk ||
          !PermanentPostOffice ||
          !PermanentPincode
        }
      >
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_PARENTS_ADDRESS_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CS_COMMON_COUNTRY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbCountry}
                selected={PresentCountry}
                select={setSelectPresentCountry}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CS_COMMON_STATE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbState}
                selected={PresentStateName}
                select={setSelectPresentStateName}
                disabled={isEdit}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CS_COMMON_DISTRICT")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbDistrict}
                selected={PresentDistrict}
                select={setSelectPresentDistrict}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>

            <div className="col-md-6">
              <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbLBType}
                selected={PresentLBTypeName}
                select={setSelectPresentLBTypeName}
                disabled={isEdit}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_LB_NAME")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={lbs}
                selected={PresentLBName}
                select={setSelectPresentLBName}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_LB_NAME")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_VILLAGE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbVillage}
                selected={PresentVillage}
                select={setSelectPresentVillage}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_VILLAGE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_TALUK")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbTaluk}
                selected={PresentTaluk}
                select={setSelectPresentTaluk}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_TALUK")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          {/* <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={PresentWardNo} select={setSelectPresentWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div> */}
            <div className="col-md-6">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbPostOffice}
                selected={PresentPostOffice}
                select={setSelectPresentPostOffice}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CS_COMMON_PIN_CODE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentPincode"
                value={PresentPincode}
                onChange={setSelectPresentPincode}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_PIN_CODE")}`}
                {...(validation = {
                  pattern: "^[a-zA-Z-.`' ]*$",
                  isRequired: true,
                  type: "number",
                  maxLength: 6,
                  minLength: 6,
                  title: t("CS_COMMON_INVALID_PIN_CODE"),
                })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_MAIN_PLACE_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentMainPlaceEn"
                value={PresentMainPlaceEn}
                onChange={setSelectPresentMainPlaceEn}
                disable={isEdit}
                placeholder={`${t("CR_MAIN_PLACE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_MAIN_PLACE_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentMainPlaceMl"
                value={PresentMainPlaceMl}
                onChange={setSelectPresentMainPlaceMl}
                disable={isEdit}
                placeholder={`${t("CR_MAIN_PLACE_ML")}`}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentLocalityNameEn"
                value={PresentLocalityNameEn}
                onChange={setSelectPresentLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentLocalityNameMl"
                value={PresentLocalityNameMl}
                onChange={setSelectPresentLocalityNameMl}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentStreetNameEn"
                value={PresentStreetNameEn}
                onChange={setSelectPresentStreetNameEn}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentStreetNameMl"
                value={PresentStreetNameMl}
                onChange={setSelectPresentStreetNameMl}
                placeholder={`${t("CR_STREET_NAME_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_CITY_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_HOUSE_NAME_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentHouseNameEn"
                value={PresentHouseNameEn}
                onChange={setSelectPresentHouseNameEn}
                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_HOUSE_NAME_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentHouseNameMl"
                value={PresentHouseNameMl}
                onChange={setSelectPresentHouseNameMl}
                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentBuldingNo"
                value={PresentBuldingNo}
                onChange={setSelectPresentBuldingNo}
                placeholder={`${t("CR_BUILDING_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_DOOR_NO")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentDoorNo"
                value={PresentDoorNo}
                onChange={setSelectPresentDoorNo}
                placeholder={`${t("CR_DOOR_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentResNo"
                value={PresentResNo}
                onChange={setSelectPresentResNo}
                placeholder={`${t("CR_RES_ASSOCIATION_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO") })}
              />
            </div>
          </div>
        </div>

        {/* <div className="row">
 <div className="col-md-12" >
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbState}
 selected={StateName}
 select={setSelectStateName}
 disabled={isEdit}
 />
 </div>
 <div className="col-md-6" >
 <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
 <Dropdown
 t={t}
 optionKey="name"
 isMandatory={false}
 option={cmbCountry}
 selected={MotherCountry}
 select={setSelectMotherCountry}
 disabled={isEdit}
 />
 </div>
 </div>
 </div> */}

        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
                <CheckBox label={t("CR_SAME_AS_ABOVE")} onChange={setSameAsPresent} value={isPrsentAddress} checked={isPrsentAddress} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CS_COMMON_COUNTRY")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbCountry}
                  selected={PermanentCountry}
                  select={setSelectPermanentCountry}
                  disabled={isEdit}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CS_COMMON_STATE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbState}
                  selected={PermanentStateName}
                  select={setSelectPermanentStateName}
                  disabled={isEdit}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CS_COMMON_DISTRICT")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbDistrict}
                  selected={PermanentDistrict}
                  select={setSelectPermanentDistrict}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_DISTRICT")}`}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbLBType}
                  selected={PermanentLBTypeName}
                  select={setSelectPermanentLBTypeName}
                  disabled={isEdit}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_LB_NAME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={lbs}
                  selected={PermanentLBName}
                  select={setSelectPermanentLBName}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_LB_NAME")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_VILLAGE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbVillage}
                  selected={PermanentVillage}
                  select={setSelectPermanentVillage}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_VILLAGE")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_TALUK")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbTaluk}
                  selected={PermanentTaluk}
                  select={setSelectPermanentTaluk}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_TALUK")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            {/* <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={PermanentWardNo} select={setSelectPermanentWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div> */}
              <div className="col-md-6">
                <CardLabel>
                  {t("CS_COMMON_POST_OFFICE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbPostOffice}
                  selected={PermanentPostOffice}
                  select={setSelectPermanentPostOffice}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CS_COMMON_PIN_CODE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentPincode"
                  value={PermanentPincode}
                  onChange={setSelectPermanentPincode}
                  disable={isEdit}
                  placeholder={`${t("CS_COMMON_PIN_CODE")}`}
                  {...(validation = {
                    pattern: "^[a-zA-Z-.`' ]*$",
                    isRequired: true,
                    type: "number",
                    maxLength: 6,
                    minLength: 6,
                    title: t("CS_COMMON_INVALID_PIN_CODE"),
                  })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_MAIN_PLACE_EN")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentMainPlaceEn"
                  value={PermanentMainPlaceEn}
                  onChange={setSelectPermanentMainPlaceEn}
                  disable={isEdit}
                  placeholder={`${t("CR_MAIN_PLACE_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_MAIN_PLACE_ML")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentMainPlaceMl"
                  value={PermanentMainPlaceMl}
                  onChange={setSelectPermanentMainPlaceMl}
                  disable={isEdit}
                  placeholder={`${t("CR_MAIN_PLACE_ML")}`}
                  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_LOCALITY_EN")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentLocalityNameEn"
                  value={PermanentLocalityNameEn}
                  onChange={setSelectPermanentLocalityNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_LOCALITY_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_LOCALITY_ML")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentLocalityNameMl"
                  value={PermanentLocalityNameMl}
                  onChange={setSelectPermanentLocalityNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_LOCALITY_ML")}`}
                  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_STREET_NAME_EN")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentStreetNameEn"
                  value={PermanentStreetNameEn}
                  onChange={setSelectPermanentStreetNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_STREET_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_STREET_NAME_ML")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentStreetNameMl"
                  value={PermanentStreetNameMl}
                  onChange={setSelectPermanentStreetNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_STREET_NAME_ML")}`}
                  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_HOUSE_NAME_EN")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentHouseNameEn"
                  value={PermanentHouseNameEn}
                  onChange={setSelectPermanentHouseNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_HOUSE_NAME_ML")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentHouseNameMl"
                  value={PermanentHouseNameMl}
                  onChange={setSelectPermanentHouseNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentBuldingNo"
                  value={PermanentBuldingNo}
                  onChange={setSelectPermanentBuldingNo}
                  disable={isEdit}
                  placeholder={`${t("CR_BUILDING_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_DOOR_NO")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentDoorNo"
                  value={PermanentDoorNo}
                  onChange={setSelectPermanentDoorNo}
                  disable={isEdit}
                  placeholder={`${t("CR_DOOR_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOOR_NO") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{t("CR_RES_ASSOCIATION_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentResNo"
                  value={PermanentResNo}
                  onChange={setSelectPermanentResNo}
                  placeholder={`${t("CR_RES_ASSOCIATION_NO")}`}
                  disable={isEdit}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO") })}
                />
              </div>
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default BirthParentsAddress;
