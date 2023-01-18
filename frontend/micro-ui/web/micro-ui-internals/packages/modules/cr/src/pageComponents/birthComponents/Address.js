import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import AddressOutsideIndia from "./AddressOutsideIndia";

const Address = ({ config, onSelect, userType, formData }) => {
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
  const { data: localbodies={}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");  
  const [Address, selectAddress] = useState(formData?.AddressDetails?.Address);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [lbs, setLbs] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [OutSideAdressEnError, setOutSideAdressEnError] = useState(formData?.AddressDetails?.AdressEn ? false: false);
  const [OutSideAdressMlError, setOutSideAdressMlError] = useState(formData?.AddressDetails?.AdressMl ? false: false);
//   const [OutSideAdressEnBError, setOutSideAdressEnBError] = useState(formData?.AddressDetails?.AdressEnB ? false: false);
//   const [OutSideAdressMlBError, setOutSideAdressMlBError] = useState(formData?.AddressDetails?.AdressMlB ? false: false);
  const [OutSideLocalityEnError, setOutSideLocalityEnError] = useState(formData?.AddressDetails?.LocalityEn ? false: false);
  const [OutSideLocalityMlError, setOutSideLocalityMlError] = useState(formData?.AddressDetails?.LocalityMl ? false: false);
  const [OutSideProvinceEnError, setOutSideProvinceEnError] = useState(formData?.AddressDetails?.ProvinceEn ? false: false);
  const [OutSideProvinceMlError, setOutSideProvinceMlError] = useState(formData?.AddressDetails?.ProvinceMl ? false: false);
  const [OutSideOutSideCountryError, setOutSideOutSideCountryError] = useState(formData?.AddressDetails?.OutSideCountry ? false: false);


 
  const [PresentCountry, setPresentCountry] = useState(formData?.AddressDetails?.PresentCountry ? formData?.AddressDetails?.PresentCountry : "");
  const [PresentStateName, setPresentStateName] = useState(formData?.AddressDetails?.PresentStateName ? formData?.AddressDetails?.PresentStateName : "");
  const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressDetails?.PresentDistrict ? formData?.AddressDetails?.PresentDistrict : "");
  const [PresentLBTypeName, setPresentLBTypeName] = useState(formData?.AddressDetails?.PresentLBTypeName ? formData?.AddressDetails?.PresentLBTypeName : "");
  const [PresentLBName, setPresentLBName] = useState(formData?.AddressDetails?.PresentLBName ? formData?.AddressDetails?.PresentLBName : "");
  // const [PresentWardNo, setPresentWardNo] = useState(formData?.AddressDetails?.PresentWardNo ? formData?.AddressDetails?.PresentWardNo : "");
  const [PresentTaluk, setPresentTaluk] = useState(formData?.AddressDetails?.PresentTaluk ? formData?.AddressDetails?.PresentTaluk : "");
  const [PresentPostOffice, setPresentPostOffice] =useState(formData?.AddressDetails?.PresentPostOffice ? formData?.AddressDetails?.PresentPostOffice : "");
  const [PresentPincode, setPresentPincode] = useState(formData?.AddressDetails?.PresentPincode ? formData?.AddressDetails?.PresentPincode : "");
  const [PresentHouseNameEn, setPresentHouseNameEn] = useState(formData?.AddressDetails?.PresentHouseNameEn ? formData?.AddressDetails?.PresentHouseNameEn : "");
  const [PresentHouseNameMl, setPresentHouseNameMl] = useState(formData?.AddressDetails?.PresentHouseNameMl ? formData?.AddressDetails?.PresentHouseNameMl : "");
  // const [PresentBuldingNo, setPresentBuldingNo] = useState(formData?.AddressDetails?.PresentBuldingNo);
  const [PresentDoorNo, setPresentDoorNo] = useState(formData?.AddressDetails?.PresentDoorNo ? formData?.AddressDetails?.PresentDoorNo : "");
  const [PresentResNoEn, setPresentResNoEn] = useState(formData?.AddressDetails?.PresentResNoEn ? formData?.AddressDetails?.PresentResNoEn : "");
  const [PresentResNoMl, setPresentResNoMl] = useState(formData?.AddressDetails?.PresentResNoMl ? formData?.AddressDetails?.PresentResNoMl : "");
  const [PresentMainPlaceEn, setPresentMainPlaceEn] = useState(formData?.AddressDetails?.PresentMainPlaceEn ? formData?.AddressDetails?.PresentMainPlaceEn : "");
  const [PresentMainPlaceMl, setPresentMainPlaceMl] = useState(formData?.AddressDetails?.PresentMainPlaceMl ? formData?.AddressDetails?.PresentMainPlaceMl : "");
  const [PresentLocalityNameEn, setPresentLocalityNameEn] = useState(formData?.AddressDetails?.PresentLocalityNameEn ? formData?.AddressDetails?.PresentLocalityNameEn : "");
  const [PresentLocalityNameMl, setPresentLocalityNameMl] = useState(formData?.AddressDetails?.PresentLocalityNameMl ? formData?.AddressDetails?.PresentLocalityNameMl : "");
  const [PresentStreetNameEn, setPresentStreetNameEn] = useState(formData?.AddressDetails?.PresentStreetNameEn ? formData?.AddressDetails?.PresentStreetNameEn : "");
  const [PresentStreetNameMl, setPresentStreetNameMl] = useState(formData?.AddressDetails?.PresentStreetNameMl ? formData?.AddressDetails?.PresentStreetNameMl : "");
  const [PresentVillage, setPresentVillage] = useState(formData?.AddressDetails?.PresentVillage ? formData?.AddressDetails?.PresentVillage : "");
  const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressDetails?.isPrsentAddress ? formData?.AddressDetails?.isPrsentAddress : "");    
  const [PermanentCountry, setPermanentCountry] = useState(formData?.AddressDetails?.PermanentCountry ? formData?.AddressDetails?.PermanentCountry : "");
  const [PermanentStateName, setPermanentStateName] = useState(formData?.AddressDetails?.PermanentStateName ? formData?.AddressDetails?.PermanentStateName : "");
  const [PermanentDistrict, setPermanentDistrict] = useState(formData?.AddressDetails?.PermanentDistrict ? formData?.AddressDetails?.PermanentDistrict : "");
  const [PermanentLBTypeName, setPermanentLBTypeName] = useState(formData?.AddressDetails?.PermanentLBTypeName ? formData?.AddressDetails?.PermanentLBTypeName : "");
  const [PermanentLBName, setPermanentLBName] = useState(formData?.AddressDetails?.PermanentLBName ? formData?.AddressDetails?.PermanentLBName : "");
  // const [PermanentWardNo, setPermanentWardNo] = useState(formData?.AddressDetails?.PermanentWardNo ? formData?.AddressDetails?.PermanentWardNo : "");
  const [PermanentVillage, setPermanentVillage] = useState(formData?.AddressDetails?.PermanentVillage ? formData?.AddressDetails?.PermanentVillage : "");
  const [PermanentTaluk, setPermanentTaluk] = useState(formData?.AddressDetails?.PermanentTaluk ? formData?.AddressDetails?.PermanentTaluk : "");
  const [PermanentPostOffice, setPermanentPostOffice] =useState(formData?.AddressDetails?.PermanentPostOffice ? formData?.AddressDetails?.PermanentPostOffice : "");
  const [PermanentPincode, setPermanentPincode] = useState(formData?.AddressDetails?.PermanentPincode ? formData?.AddressDetails?.PermanentPincode : "");
  
  const [PermanentDoorNo, setPermanentDoorNo] = useState(formData?.AddressDetails?.PermanentDoorNo ? formData?.AddressDetails?.PermanentDoorNo : "");
  const [PermanentResNoEn, setPermanentResNoEn] = useState(formData?.AddressDetails?.PermanentResNoEn ? formData?.AddressDetails?.PermanentResNoEn : "");
  const [PermanentResNoMl, setPermanentResNoMl] = useState(formData?.AddressDetails?.PermanentResNoMl ? formData?.AddressDetails?.PermanentResNoMl : "");
  const [PermanentHouseNameEn, setPermanentHouseNameEn] = useState(formData?.AddressDetails?.PermanentHouseNameEn ? formData?.AddressDetails?.PermanentHouseNameEn : "");
  const [PermanentHouseNameMl, setPermanentHouseNameMl] = useState(formData?.AddressDetails?.PermanentHouseNameMl ? formData?.AddressDetails?.PermanentHouseNameMl : "");
  const [PermanentMainPlaceEn, setPermanentMainPlaceEn] = useState(formData?.AddressDetails?.PermanentMainPlaceEn ? formData?.AddressDetails?.PermanentMainPlaceEn : "");
  const [PermanentMainPlaceMl, setPermanentMainPlaceMl] = useState(formData?.AddressDetails?.PermanentMainPlaceMl ? formData?.AddressDetails?.PermanentMainPlaceMl : "");
  const [PermanentLocalityNameEn, setPermanentLocalityNameEn] = useState(formData?.AddressDetails?.PermanentLocalityNameEn ? formData?.AddressDetails?.PermanentLocalityNameEn : "");
  const [PermanentLocalityNameMl, setPermanentLocalityNameMl] = useState(formData?.AddressDetails?.PermanentLocalityNameMl ? formData?.AddressDetails?.PermanentLocalityNameMl : "");
  const [PermanentStreetNameEn, setPermanentStreetNameEn] = useState(formData?.AddressDetails?.PermanentStreetNameEn ? formData?.AddressDetails?.PermanentStreetNameEn : "");
  const [PermanentStreetNameMl, setPermanentStreetNameMl] = useState(formData?.AddressDetails?.PermanentStreetNameMl ? formData?.AddressDetails?.PermanentStreetNameMl : "");


  const [AdressEn, setAdressEn] = useState(formData?.AddressDetails?.AdressEn ? formData?.AddressDetails?.AdressEn : "");
  const [AdressMl, setAdressMl] = useState(formData?.AddressDetails?.AdressMl ? formData?.AddressDetails?.AdressMl : "");
  const [AdressEnB, setAdressEnB] = useState(formData?.AddressDetails?.AdressEnB ? formData?.AddressDetails?.AdressEnB : "");
  const [AdressMlB, setAdressMlB] = useState(formData?.AddressDetails?.AdressMlB ? formData?.AddressDetails?.AdressMlB : "");
  const [LocalityEn, setLocalityEn] = useState(formData?.AddressDetails?.LocalityEn ? formData?.AddressDetails?.LocalityEn : "");
  const [LocalityMl, setLocalityMl] = useState(formData?.AddressDetails?.LocalityMl ? formData?.AddressDetails?.LocalityMl : "");
  const [ProvinceEn, setProvinceEn] = useState(formData?.AddressDetails?.ProvinceEn ? formData?.AddressDetails?.ProvinceEn : "");
  const [ProvinceMl, setProvinceMl] = useState(formData?.AddressDetails?.ProvinceMl ? formData?.AddressDetails?.ProvinceMl : "");
  const [OutSideCountry, setOutSideCountry] = useState(formData?.AddressDetails?.OutSideCountry ? formData?.AddressDetails?.OutSideCountry : null);
  // // const [selectedValue, setSelectedValue] = useState(formData?.AddressDetails?.selectedValue ? formData?.AddressDetails?.selectedValue : "");
  const [selectedValue, setSelectedValue] = React.useState(null);
  
  let cmbPlace = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let cmbCountry = [];
  let cmbState = [];
  let districtid = null;
  let cmbLBType = [];
  let cmbLB = [];

  console.log("District" + District);
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
    localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
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
  // function setSelectPresentBuldingNo(e) {
  //   setPresentBuldingNo(e.target.value);
  //   if (isPrsentAddress) {
  //     setPermanentBuldingNo(PresentBuldingNo);
  //   }
  // }
  function setSelectPresentDoorNo(e) {
    setPresentDoorNo(e.target.value);
    if (isPrsentAddress) {
      setPermanentDoorNo(PresentDoorNo);
    }
  }
  function setSelectPresentResNoEn(e) {
    setPresentResNoEn(e.target.value);
    if (isPrsentAddress) {
      setPermanentResNoEn(PresentResNoEn);
    }
  }
  function setSelectPresentResNoMl(e) {
    setPresentResNoMl(e.target.value);
    if (isPrsentAddress) {
      setPermanentResNoMl(PresentResNoMl);
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
  // function setSelectPermanentBuldingNo(e) {
  //   setPermanentBuldingNo(e.target.value);
  // }
  function setSelectPermanentDoorNo(e) {
    setPermanentDoorNo(e.target.value);
  }
  function setSelectPermanentResNoEn(e) {
    setPermanentResNoEn(e.target.value);
  }
  function setSelectPermanentResNoMl(e) {
    setPermanentResNoMl(e.target.value);
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
    if (e.target.checked == true) {
    setIsPrsentAddress(e.target.checked);    
      setPermanentCountry(PresentCountry);
      setPermanentStateName(PresentStateName);
      setPermanentLBTypeName(PresentLBTypeName);
      // setPermanentBuldingNo(PresentBuldingNo);
      setPermanentDoorNo(PresentDoorNo);
      setPermanentResNoEn(PresentResNoEn);
      setPermanentResNoMl(PresentResNoMl);
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
      // setPermanentBuldingNo("");
      setPermanentDoorNo("");
      setPermanentResNoEn("");
      setPermanentResNoMl("");
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
        setLbs(cmbLB.filter((cmbLB) => cmbLB.city.districtid === PresentDistrict.districtid));
      }
    }
  }, [lbs, isInitialRender]);
  


  const goNext = () => { 
      
    if(selectedValue === "4"){
    
    sessionStorage.setItem("AdressEn", AdressEn ? AdressEn.AdressEn : null);
    sessionStorage.setItem("AdressMl", AdressMl  ? AdressMl.AdressMl  : null);
    sessionStorage.setItem("AdressEnB", AdressEnB  ? AdressEnB.AdressEnB  : null);
    sessionStorage.setItem("AdressMlB", AdressMlB  ? AdressMlB.AdressMlB  : null) ;
    sessionStorage.setItem("LocalityEn", LocalityEn  ? LocalityEn.LocalityEn  : null);
    sessionStorage.setItem("LocalityMl", LocalityMl  ? LocalityMl.LocalityMl  : null);
    sessionStorage.setItem("ProvinceEn", ProvinceEn  ? ProvinceEn.ProvinceEn  : null);
    sessionStorage.setItem("ProvinceMl", ProvinceMl  ? ProvinceMl.ProvinceMl  : null);
    sessionStorage.setItem("OutSideCountry", OutSideCountry ? OutSideCountry.OutSideCountry : null);

    onSelect(config.key, { AdressEn, AdressMl, AdressEnB, AdressMlB, LocalityEn, LocalityMl, ProvinceEn, ProvinceMl, OutSideCountry, 
      
    });

    }else if(selectedValue === "1"){
    sessionStorage.setItem("PresentCountry", PresentCountry ? PresentCountry.code : null);
    sessionStorage.setItem("PresentStateName", PresentStateName ? PresentStateName.code : null );
    sessionStorage.setItem("PresentLBTypeName", PresentLBTypeName ? PresentLBTypeName.code : null );
    // sessionStorage.setItem("PresentBuldingNo", PresentBuldingNo ? PresentBuldingNo : null );
    sessionStorage.setItem("PresentDoorNo", PresentDoorNo ? PresentDoorNo : null );
    sessionStorage.setItem("PresentResNoEn", PresentResNoEn ? PresentResNoEn : null );
    sessionStorage.setItem("PresentResNoEn", PresentResNoMl ? PresentResNoMl : null );
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
    // sessionStorage.setItem("PermanentBuldingNo", PermanentBuldingNo ? PermanentBuldingNo : null );
    sessionStorage.setItem("PermanentDoorNo", PermanentDoorNo ? PermanentDoorNo : null );
    sessionStorage.setItem("PermanentResNoEn", PermanentResNoEn ? PermanentResNoEn : null );
    sessionStorage.setItem("PermanentResNoMl", PermanentResNoMl ? PermanentResNoMl : null );
    sessionStorage.setItem("PermanentHouseNameEn", PermanentHouseNameEn ? PermanentHouseNameEn : null );
    sessionStorage.setItem("PermanentHouseNameMl", PermanentHouseNameMl ? PermanentHouseNameMl : null );
    sessionStorage.setItem("PermanentMainPlaceEn", PermanentMainPlaceEn ? PermanentMainPlaceEn : null );
    sessionStorage.setItem("PermanentMainPlaceMl", PermanentMainPlaceMl ? PermanentMainPlaceMl : null );
    sessionStorage.setItem("PermanentLocalityNameEn", PermanentLocalityNameEn ? PermanentLocalityNameEn : null );
    sessionStorage.setItem("PermanentLocalityNameMl", PermanentLocalityNameMl ? PermanentLocalityNameMl : null );
    sessionStorage.setItem("PermanentStreetNameEn", PermanentStreetNameEn ? PermanentStreetNameEn : null );
    sessionStorage.setItem("PermanentStreetNameMl", PermanentStreetNameMl ? PermanentStreetNameMl : null );
    sessionStorage.setItem("PermanentVillage", PermanentVillage ? PermanentVillage.code : null );
    // sessionStorage.setItem("PermanentWardNo", PermanentWardNo ? PermanentWardNo .code : null );
    sessionStorage.setItem("PermanentLBName",PermanentLBName ? PermanentLBName.code : null );
    sessionStorage.setItem("PermanentDistrict", PermanentDistrict ? PermanentDistrict.code : null );
    sessionStorage.setItem("PermanentTaluk", PermanentTaluk ? PermanentTaluk.code : null );
    sessionStorage.setItem("PermanentPostOffice", PermanentPostOffice ? PermanentPostOffice.code : null );
    sessionStorage.setItem("PermanentPincode", PermanentPincode ? PermanentPincode : null );
    onSelect(config.key, {
      
      PresentDoorNo,
      PresentResNoEn,
      PresentResNoMl,
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
     
      
      PermanentDoorNo,
      PermanentResNoEn,
      PermanentResNoMl,
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
      AdressEn,
      AdressMl,
      AdressEnB,
      AdressMlB,
      LocalityEn,
      LocalityMl,
      ProvinceEn,
      ProvinceMl,
      OutSideCountry,
    
      
    });
  }
  };

 
  if (isCountryLoading || isStateLoading  ||islocalbodiesLoading|| isPostOfficeLoading  || isDistrictLoading || isTalukLoading || isVillageLoading ) {
      return <Loader></Loader>;
     }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>    
      <FormStep
 t={t}
 config={config}
 onSelect={goNext}
 onSkip={onSkip}
 
 >
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!PresentCountry || !PresentStateName || !PresentDistrict || !PresentLBTypeName || !PresentLBName || !PresentVillage
|| !PresentTaluk || !PresentPostOffice || !PresentPincode || !PresentMainPlaceEn || !PresentMainPlaceMl || !PresentLocalityNameEn 
|| !PresentLocalityNameMl || !PresentStreetNameEn || !PresentStreetNameMl || !PresentHouseNameEn || !PresentHouseNameMl || !PresentDoorNo
|| !PresentResNoEn || !PresentResNoMl   }> */}

<div className="row">
          <div className="col-md-12">         
           
            <div className="radios">
              <div className="radiobuttons">
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-1"
                  value="1"
                  checked={selectedValue === "1"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-1">CR_INSIDE_LOCAL_BODY</label>
              </div>

              <div className="radiobuttons">
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-2"
                  value="2"
                  checked={selectedValue === "2"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-2">CR_INSIDE_KERALA</label>
              </div>
              <div className="radiobuttons">
                {" "}
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-3"
                  value="3"
                  checked={selectedValue === "3"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-3">CR_INSIDE_INDIA</label>
              </div>
              <div className="radiobuttons">
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-4"
                  value="4"
                  checked={selectedValue === "4"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-4">CR_OUTSIDE_INDIA</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
         
          {/* {selectedValue === "3" && (
            <div id="div-3">
              <div className="col-md-12">
              <Address />                  
                 
                </div>              
             
              </div>           
          )} */}
          {/* {selectedValue === "4" && (
            <div id="div-4">
              <div className="col-md-12">
              <AddressOutsideIndia />  
              </div>
            </div>
          )} */}
         
        </div>

        
        <div className="row">
          {selectedValue === "1" && (
            <div id="div-1">
              <div className="col-md-12">

        
        <div className="row">
          
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>



        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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

            <div className="col-md-3">
              <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`} <span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbLBType}
                selected={PresentLBTypeName}
                select={setSelectPresentLBTypeName}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_LB_TYPE")}`}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          {/* <div className="col-md-4" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={PresentWardNo} select={setSelectPresentWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div> */}
           
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
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
                name="PresentLocalityNameEn"
                value={PresentLocalityNameEn}
                onChange={setSelectPresentLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            
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
                name="PresentLocalityNameMl"
                value={PresentLocalityNameMl}
                onChange={setSelectPresentLocalityNameMl}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
              />
            </div>
            <div className="col-md-3">
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
            <div className="col-md-3">
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
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_ML") })}
              />
            </div>
            <div className="col-md-3">
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
          </div>
        </div>
       
       
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-3">
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
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
              />
            </div>
            {/* <div className="col-md-2">
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
            </div> */}
              {/* <div className="col-md-3" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={PresentWardNo} select={setSelectPresentWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div> */}
            <div className="col-md-3">
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
            <div className="col-md-3">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO_EN")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentResNoEn"
                value={PresentResNoEn}
                onChange={setSelectPresentResNoEn}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_EN") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO_ML")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentResNoMl"
                value={PresentResNoMl}
                onChange={setSelectPresentResNoMl}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_ML")}`}
                disable={isEdit}
                {...(validation = {  pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@' .0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_ML") })}
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
              <div className="col-md-3">
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
                  disabled={isPrsentAddress}
                />
              </div>
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
                <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`} <span className="mandatorycss">*</span></CardLabel>
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
           
             
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
                  {...(validation = {pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
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
                  name="PermanentLocalityNameEn"
                  value={PermanentLocalityNameEn}
                  onChange={setSelectPermanentLocalityNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_LOCALITY_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
                />
              </div>
            </div>
          </div>
{/*           
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
          </div> */}
          <div className="row">
            <div className="col-md-12">
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
                  name="PermanentLocalityNameMl"
                  value={PermanentLocalityNameMl}
                  onChange={setSelectPermanentLocalityNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_LOCALITY_ML")}`}
                  {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$",isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
                />
              </div>
              <div className="col-md-3">
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
              <div className="col-md-3">
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
                  {...(validation = {pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })}
                />
              </div>
              <div className="col-md-3">
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
            </div>
          </div>
         

          <div className="row">
            <div className="col-md-12">
            <div className="col-md-3">
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
                  {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
                />
              </div>
              {/* <div className="col-md-2">
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
              </div> */}
               {/* <div className="col-md-3" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={PermanentWardNo} select={setSelectPermanentWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div> */}
              <div className="col-md-3">
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
              <div className="col-md-3">
                <CardLabel>{t("CR_RES_ASSOCIATION_NO_EN")}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentResNoEn"
                  value={PermanentResNoEn}
                  onChange={setSelectPermanentResNoEn}
                  placeholder={`${t("CR_RES_ASSOCIATION_NO_EN")}`}
                  disable={isEdit}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_EN") })}
                />
              </div>
              <div className="col-md-3">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO_ML")}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PermanentResNoMl"
                value={PermanentResNoMl}
                onChange={setSelectPermanentResNoMl}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_ML")}`}
                disable={isEdit}
                {...(validation = {  pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@' .0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_ML") })}
              />
            </div>
            </div>
          </div>
        </div>
        </div>
            </div>
          )}
         
        </div>
        {selectedValue === "4" && (
          <div>
            <AddressOutsideIndia
              setAdressEn={setAdressEn} AdressEn={AdressEn}
              setAdressMl={setAdressMl} AdressMl={AdressMl}
              setAdressEnB={setAdressEnB} AdressEnB={AdressEnB}
              setAdressMlB={setAdressMlB} AdressMlB={AdressMlB}
              setLocalityEn={setLocalityEn} LocalityEn={LocalityEn}
              setLocalityMl={setLocalityMl} LocalityMl={LocalityMl}
              setProvinceEn={setProvinceEn} ProvinceEn={ProvinceEn}
              setProvinceMl={setProvinceMl} ProvinceMl={ProvinceMl}
              setOutSideCountry={setOutSideCountry} OutSideCountry={OutSideCountry}

            />
          </div>)
        }

      </FormStep>
    </React.Fragment>
  );
};
export default Address;
