import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Toast, LabelFieldPair, RadioButtons } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import AddressOutsideIndia from "./AddressOutsideIndia";

const Address = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");

  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");  
  const [Address, selectAddress] = useState(formData?.AddressDetails?.Address);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderRadioButtons, setisInitialRenderRadioButtons] = useState(true);
  const [isInitialRenderRadio, setIsInitialRenderRadio] = useState(true);
  const [lbs, setLbs] = useState(0);
  // const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [toast, setToast] = useState(false);
  const [PresentCountryError, setPresentCountryError] = useState(formData?.AddressDetails?.PresentCountry ? false : false);
  const [PresentStateNameError, setPresentStateNameError] = useState(formData?.AddressDetails?.PresentStateName ? false : false);
  const [PresentDistrictError, setPresentDistrictError] = useState(formData?.AddressDetails?.PresentDistrict ? false : false);
  const [PresentLBTypeNameError, setPresentLBTypeNameError] = useState(formData?.AddressDetails?.PresentLBTypeNameError ? false : false);
  const [PresentLBNameError, setPresentLBNameError] = useState(formData?.AddressDetails?.PresentLBName ? false : false);
  const [PresentVillageError, setPresentVillageError] = useState(formData?.AddressDetails?.PresentVillage ? false : false);
  const [PresentTalukError, setPresentTalukError] = useState(formData?.AddressDetails?.PresentTaluk ? false : false);
  const [PresentPostOfficeError, setPresentPostOfficeError] = useState(formData?.AddressDetails?.PresentPostOffice ? false : false);
  const [PresentPincodeError, setPresentPincodeError] = useState(formData?.AddressDetails?.PresentPincode ? false : false);

  const [PermanentCountryError, setPermanentCountryError] = useState(formData?.AddressDetails?.PermanentCountry ? false : false);
  const [PermanentStateNameError, setPermanentStateNameError] = useState(formData?.AddressDetails?.PermanentStateName ? false : false);
  const [PermanentDistrictError, setPermanentDistrictError] = useState(formData?.AddressDetails?.PermanentDistrict ? false : false);
  const [PermanentLBTypeNameError, setPermanentLBTypeNameError] = useState(formData?.AddressDetails?.PermanentLBTypeName ? false : false);
  const [PermanentLBNameError, setPermanentLBNameError] = useState(formData?.AddressDetails?.PermanentLBName ? false : false);
  const [PermanentVillageError, setPermanentVillageError] = useState(formData?.AddressDetails?.PermanentVillage ? false : false);
  const [PermanentTalukError, setPermanentTalukError] = useState(formData?.AddressDetails?.PermanentTaluk ? false : false);
  const [PermanentPostOfficeError, setPermanentPostOfficeError] = useState(formData?.AddressDetails?.PermanentPostOffice ? false : false);
  const [PermanentPincodeError, setPermanentPincodeError] = useState(formData?.AddressDetails?.PermanentPincode ? false : false);

  const [OutSideIndiaAddressOneEnError, setOutSideIndiaAddressOneEnError] = useState(formData?.AddressDetails?.AdressEn ? false : false);
  const [OutSideIndiaAddressOneMlError, setOutSideIndiaAddressOneMlError] = useState(formData?.AddressDetails?.AdressMl ? false : false);
  const [OutSideIndiaAddressLocEnError, setOutSideIndiaAddressLocEnError] = useState(formData?.AddressDetails?.LocalityEn ? false : false);
  const [OutSideIndiaAddressLocMlError, setOutSideIndiaAddressLocMlError] = useState(formData?.AddressDetails?.LocalityMl ? false : false);
  const [OutSideIndiaAddressProvinceEnError, setOutSideIndiaAddressProvinceEnError] = useState(formData?.AddressDetails?.setProvinceEn ? false : false);
  const [OutSideIndiaAddressProvinceMlError, setOutSideIndiaAddressProvinceMlError] = useState(formData?.AddressDetails?.setProvinceMl ? false : false);
  const [OutSideIndiaAddressPostCodeError, setOutSideIndiaAddressPostCodeError] = useState(formData?.AddressDetails?.setPostCode ? false : false);
  const [OutSideIndiaAddressError, setOutSideIndiaAddressError] = useState(formData?.AddressDetails?.OutSideCountry ? false : false);



  const [PresentCountry, setPresentCountry] = useState(formData?.AddressDetails?.PresentCountry ? formData?.AddressDetails?.PresentCountry : null);
  const [PresentStateName, setPresentStateName] = useState(formData?.AddressDetails?.PresentStateName ? formData?.AddressDetails?.PresentStateName : null);
  const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressDetails?.PresentDistrict ? formData?.AddressDetails?.PresentDistrict : null);
  const [PresentLBTypeName, setPresentLBTypeName] = useState(formData?.AddressDetails?.PresentLBTypeName ? formData?.AddressDetails?.PresentLBTypeName : null);
  const [PresentLBName, setPresentLBName] = useState(formData?.AddressDetails?.PresentLBName ? formData?.AddressDetails?.PresentLBName : null);
  // const [PresentWardNo, setPresentWardNo] = useState(formData?.AddressDetails?.PresentWardNo ? formData?.AddressDetails?.PresentWardNo : "");
  const [PresentTaluk, setPresentTaluk] = useState(formData?.AddressDetails?.PresentTaluk ? formData?.AddressDetails?.PresentTaluk : null);
  const [PresentPostOffice, setPresentPostOffice] = useState(formData?.AddressDetails?.PresentPostOffice ? formData?.AddressDetails?.PresentPostOffice : null);
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
  const [PresentVillage, setPresentVillage] = useState(formData?.AddressDetails?.PresentVillage ? formData?.AddressDetails?.PresentVillage : null);
  const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressDetails?.isPrsentAddress ? formData?.AddressDetails?.isPrsentAddress : false);

  const [PermanentCountry, setPermanentCountry] = useState(formData?.AddressDetails?.PermanentCountry ? formData?.AddressDetails?.PermanentCountry : null);
  const [PermanentStateName, setPermanentStateName] = useState(formData?.AddressDetails?.PermanentStateName ? formData?.AddressDetails?.PermanentStateName : null);
  const [PermanentDistrict, setPermanentDistrict] = useState(formData?.AddressDetails?.PermanentDistrict ? formData?.AddressDetails?.PermanentDistrict : null);
  const [PermanentLBTypeName, setPermanentLBTypeName] = useState(formData?.AddressDetails?.PermanentLBTypeName ? formData?.AddressDetails?.PermanentLBTypeName : null);
  const [PermanentLBName, setPermanentLBName] = useState(formData?.AddressDetails?.PermanentLBName ? formData?.AddressDetails?.PermanentLBName : null);
  // const [PermanentWardNo, setPermanentWardNo] = useState(formData?.AddressDetails?.PermanentWardNo ? formData?.AddressDetails?.PermanentWardNo : "");
  const [PermanentVillage, setPermanentVillage] = useState(formData?.AddressDetails?.PermanentVillage ? formData?.AddressDetails?.PermanentVillage : null);
  const [PermanentTaluk, setPermanentTaluk] = useState(formData?.AddressDetails?.PermanentTaluk ? formData?.AddressDetails?.PermanentTaluk : null);
  const [PermanentPostOffice, setPermanentPostOffice] = useState(formData?.AddressDetails?.PermanentPostOffice ? formData?.AddressDetails?.PermanentPostOffice : null);
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
  const [PostCode, setPostCode] = useState(formData?.AddressDetails?.PostCode ? formData?.AddressDetails?.PostCode : "");
  const [OutSideCountry, setOutSideCountry] = useState(formData?.AddressDetails?.OutSideCountry ? formData?.AddressDetails?.OutSideCountry : null);
  const [selectedValueRadio, setSelectedValue] = useState(formData?.AddressDetails?.selectedValueRadio ? formData?.AddressDetails?.selectedValueRadio : "");
  const [valueRad, setValueRad] = useState(formData?.AddressDetails?.selectedValueRadio ? formData?.AddressDetails?.selectedValueRadio : "");
  // const [selectedValueRadio, setSelectedValue] = React.useState(null);
  console.log("Jetheesh" + formData?.AddressDetails?.selectedValueRadio);
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

  let cmbfilterNation = [];
  let cmbfilterCountry = [];
  let cmbfilterState = [];
  let cmbfilterDistrict = [];
  useEffect(() => {
    if (isInitialRenderRadioButtons) {
      setisInitialRenderRadioButtons(false);
      if (selectedValueRadio) {
        setIsInitialRenderRadio(false);
        setValueRad(selectedValueRadio.code);
      }
      if (valueRad == "ILB") {
        if (cmbCountry.length > 0) {
          cmbfilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.name.includes('India'));
          setPresentCountry(cmbfilterCountry[0]);
          setPermanentCountry(cmbfilterCountry[0]);
        }
        if (cmbState.length > 0) {
          cmbfilterState = cmbState.filter((cmbState) => cmbState.name.includes('Kerala'));
          setPresentStateName(cmbfilterState[0]);
          setPermanentStateName(cmbfilterState[0]);
        }
        // if (cmbDistrict.length > 0) {
        //   cmbfilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.name.includes(tenantId));
        //   setPresentDistrict(cmbfilterDistrict[0]);
        //   setPermanentDistrict(cmbfilterDistrict[0]);              
        // }

      }
      if (valueRad == "IKL") {
        if (cmbCountry.length > 0) {
          cmbfilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.name.includes('India'));
          setPresentCountry(cmbfilterCountry[0]);
          setPermanentCountry(cmbfilterCountry[0]);
        }
        if (cmbState.length > 0) {
          cmbfilterState = cmbState.filter((cmbState) => cmbState.name.includes('Kerala'));
          setPresentStateName(cmbfilterState[0]);
          setPermanentStateName(cmbfilterState[0]);
        }

      }
      if (valueRad === "IIND") {
        if (cmbCountry.length > 0) {
          cmbfilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.name.includes('India'));
          setPresentCountry(cmbfilterCountry[0]);
          setPermanentCountry(cmbfilterCountry[0]);
          setPresentStateName(null);
          setPermanentStateName(null);
        }
      }

    }

  }, [Country, State, District, isInitialRenderRadioButtons])

  // useEffect(() => {

  //   if (isInitialRenderRadio) {
  //     if(selectedValueRadio){
  //       setIsInitialRenderRadio(false);
  //       setValueRad(selectedValueRadio.code);
  //     }
  //   }
  // }, [isInitialRenderRadio]);
  const menu = [
    { i18nKey: "CR_INSIDE_LOCAL_BODY", code: "ILB" },
    { i18nKey: "CR_INSIDE_KERALA", code: "IKL" },
    { i18nKey: "CR_INSIDE_INDIA", code: "IIND" },
    { i18nKey: "CR_OUTSIDE_INDIA", code: "OIND" },
  ];
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

  function selectRadioButtons(value) {
    console.log(value);
    setSelectedValue(value);
    setValueRad(value.code);
    setisInitialRenderRadioButtons(true);
  }
  function setSelectPresentCountry(value) {
    setPresentCountry(value);
    if (isPrsentAddress) {
      setPermanentCountry(PresentCountry);
    }
  }
  function setSelectPresentStateName(value) {
    setPresentStateName(value);
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
    if (isPrsentAddress) {
      setPermanentVillage(PresentVillage);
    }
  }
  function setSelectPresentTaluk(value) {
    setPresentTaluk(value);
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
    if (e.target.value.length != 0) {

      if (e.target.value.length > 6) {
        // setMotherAadhar(e.target.value);
        setPresentPincodeError(true);
        return false;
      } else if (e.target.value.length < 6) {
        setPresentPincodeError(true);
        setPresentPincode(e.target.value);
        return false;
      }
      else {
        setPresentPincodeError(false);
        setPresentPincode(e.target.value);
        if (isPrsentAddress) {
          setPermanentPincode(PresentPincode);
        }
        return true;
      }
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
    if (e.target.value.length === 20) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentResNoEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentResNoEn(PresentResNoEn);
      }
    }

  }
  function setSelectPresentResNoMl(e) {
    if (e.target.value.length === 20) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentResNoMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentResNoMl(PresentResNoMl);
      }
    }

  }

  function setSelectPresentHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentHouseNameEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentHouseNameEn(PresentHouseNameEn);
      }
    }

  }
  function setSelectPresentHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentHouseNameMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentHouseNameMl(PresentHouseNameMl);
      }
    }

  }

  function setSelectPresentMainPlaceEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentMainPlaceEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentMainPlaceEn(PresentMainPlaceEn);
      }
    }

  }
  function setSelectPresentMainPlaceMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentMainPlaceMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentMainPlaceMl(PresentMainPlaceMl);
      }
    }

  }
  function setSelectPresentLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentLocalityNameEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentLocalityNameEn(PresentLocalityNameEn);
      }
    }

  }
  function setSelectPresentLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentLocalityNameMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentLocalityNameMl(PresentLocalityNameMl);
      }
    }

  }
  function setSelectPresentStreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentStreetNameEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentStreetNameEn(PresentStreetNameEn);
      }
    }

  }
  function setSelectPresentStreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPresentStreetNameMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentStreetNameMl(PresentStreetNameMl);
      }
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
    if (e.target.value.length != 0) {

      if (e.target.value.length > 6) {
        // setMotherAadhar(e.target.value);
        setPresentPincodeError(true);
        return false;
      } else if (e.target.value.length < 6) {
        setPresentPincodeError(true);
        setPermanentPincode(e.target.value);
        return false;
      }
      else {
        setPresentPincodeError(false);
        setPermanentPincode(e.target.value);
        return true;
      }
    }
  }
  // function setSelectPermanentBuldingNo(e) {
  //   setPermanentBuldingNo(e.target.value);
  // }
  function setSelectPermanentDoorNo(e) {
    setPermanentDoorNo(e.target.value);
  }
  function setSelectPermanentResNoEn(e) {
    if (e.target.value.length === 20) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentResNoEn(e.target.value);
    }
  }
  function setSelectPermanentResNoMl(e) {
    if (e.target.value.length === 20) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentResNoMl(e.target.value);
    }
  }


  function setSelectPermanentHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentHouseNameEn(e.target.value);
    }
  }
  function setSelectPermanentHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentHouseNameMl(e.target.value);
    }
  }
  function setSelectPermanentMainPlaceEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentMainPlaceEn(e.target.value);
    }
  }
  function setSelectPermanentMainPlaceMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentMainPlaceMl(e.target.value);
    }
  }
  function setSelectPermanentLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentLocalityNameEn(e.target.value);
    }
  }
  function setSelectPermanentLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentLocalityNameMl(e.target.value);
    }
  }
  function setSelectPermanentStreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentStreetNameEn(e.target.value);
    }
  }
  function setSelectPermanentStreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setPermanentStreetNameMl(e.target.value);
    }
  }

  function setSameAsPresent(e) {

    if (e.target.checked == true) {
      console.log("e.target.checked" + e.target.checked);
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
      console.log("e.target.checked else" + e.target.checked);
      setIsPrsentAddress(e.target.checked);
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
      if (PresentDistrict) {
        setIsInitialRender(false);
        setLbs(cmbLB.filter((cmbLB) => cmbLB.city.districtid === PresentDistrict.districtid));
      }
    }
  }, [lbs, isInitialRender]);

  let validFlag = true;
  const goNext = () => {

    if (valueRad === "ILB" || valueRad === "IKL" || valueRad === "IIND") {
      if (PresentCountry == null) {
        validFlag = false;
        setPresentCountryError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentCountryError(false);
      }
      if (PresentStateName == null) {
        validFlag = false;
        setPresentStateNameError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentStateNameError(false);
      }
      if (PresentDistrict == null) {
        validFlag = false;
        setPresentDistrictError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentDistrictError(false);
      }
      if (PresentLBTypeName == null) {
        validFlag = false;
        setPresentLBTypeNameError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentLBTypeNameError(false);
      }
      if (PresentLBName == null) {
        validFlag = false;
        setPresentLBNameError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentLBNameError(false);
      }
      if (PresentVillage == null) {
        validFlag = false;
        setPresentVillageError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentVillageError(false);
      }
      if (PresentTaluk == null) {
        validFlag = false;
        setPresentTalukError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentTalukError(false);
      }
      if (PresentPostOffice == null) {
        validFlag = false;
        setPresentPostOfficeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentPostOfficeError(false);
      }
      if (PresentPostOffice == null) {
        validFlag = false;
        setPresentPostOfficeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPresentPostOfficeError(false);
      }
      if (PresentPincode != null || PresentPincode != '' || PresentPincode != undefined) {
        if (PresentPincodeError) {
          validFlag = false;
          setPresentPincodeError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          // return false;
          // window.alert("Username shouldn't exceed 10 characters")
        } else {
          setPresentPincodeError(false);
        }
      }
      //Permanent Validation
      if (PermanentCountry == null) {
        validFlag = false;
        setPermanentCountryError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentCountryError(false);
      }
      if (PermanentStateName == null) {
        validFlag = false;
        setPermanentStateNameError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentStateNameError(false);
      }
      if (PermanentDistrict == null) {
        validFlag = false;
        setPermanentDistrictError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentDistrictError(false);
      }
      if (PermanentLBTypeName == null) {
        validFlag = false;
        setPermanentLBTypeNameError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentLBTypeNameError(false);
      }
      if (PermanentLBName == null) {
        validFlag = false;
        setPermanentLBNameError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentLBNameError(false);
      }
      if (PermanentVillage == null) {
        validFlag = false;
        setPermanentVillageError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentVillageError(false);
      }
      if (PermanentTaluk == null) {
        validFlag = false;
        setPermanentTalukError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentTalukError(false);
      }
      if (PermanentPostOffice == null) {
        validFlag = false;
        setPermanentPostOfficeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentPostOfficeError(false);
      }
      if (PermanentPostOffice == null) {
        validFlag = false;
        setPermanentPostOfficeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
      else {
        setPermanentPostOfficeError(false);
      }
      if (PermanentPincode != null || PermanentPincode != '' || PermanentPincode != undefined) {
        if (PermanentPincodeError) {
          validFlag = false;
          setPermanentPincodeError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          // return false;
          // window.alert("Username shouldn't exceed 10 characters")
        } else {
          setPermanentPincodeError(false);
        }
      }
    }
    if (valueRad === "OIND") {

      if (AdressEn == null || AdressEn == '' || AdressEn == undefined) {
        validFlag = false;
        setOutSideIndiaAddressOneEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setOutSideIndiaAddressOneEnError(false);
      }
      if (AdressMl == null || AdressMl == '' || AdressMl == undefined) {
        validFlag = false;
        setOutSideIndiaAddressOneMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setOutSideIndiaAddressOneMlError(false);
      }
      if (LocalityEn == null || LocalityEn == '' || LocalityEn == undefined) {
        validFlag = false;
        setOutSideIndiaAddressLocEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setOutSideIndiaAddressLocEnError(false);
      }
      if (LocalityMl == null || LocalityMl == '' || LocalityMl == undefined) {
        validFlag = false;
        setOutSideIndiaAddressLocMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setOutSideIndiaAddressLocMlError(false);
      }
      if (ProvinceEn == null || ProvinceEn == '' || ProvinceEn == undefined) {
        validFlag = false;
        setOutSideIndiaAddressProvinceEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setOutSideIndiaAddressProvinceEnError(false);
      }
      if (ProvinceMl == null || ProvinceMl == '' || ProvinceMl == undefined) {
        validFlag = false;
        setOutSideIndiaAddressProvinceMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setOutSideIndiaAddressProvinceMlError(false);
      }
      if (OutSideCountry == null) {
        validFlag = false;
        setOutSideIndiaAddressError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        // return false;
        // window.alert("Username shouldn't exceed 10 characters")
      } else {
        setOutSideIndiaAddressError(false);
      }
    }
    sessionStorage.setItem("selectedValueRadio", selectedValueRadio ? selectedValueRadio.code : null);
    if (validFlag === true) {
      if (valueRad === "OIND") {

        sessionStorage.setItem("AdressEn", AdressEn ? AdressEn.AdressEn : null);
        sessionStorage.setItem("AdressMl", AdressMl ? AdressMl.AdressMl : null);
        sessionStorage.setItem("AdressEnB", AdressEnB ? AdressEnB.AdressEnB : null);
        sessionStorage.setItem("AdressMlB", AdressMlB ? AdressMlB.AdressMlB : null);
        sessionStorage.setItem("LocalityEn", LocalityEn ? LocalityEn.LocalityEn : null);
        sessionStorage.setItem("LocalityMl", LocalityMl ? LocalityMl.LocalityMl : null);
        sessionStorage.setItem("ProvinceEn", ProvinceEn ? ProvinceEn.ProvinceEn : null);
        sessionStorage.setItem("ProvinceMl", ProvinceMl ? ProvinceMl.ProvinceMl : null);
        sessionStorage.setItem("PostCode", PostCode ? PostCode.PostCode : null);
        sessionStorage.setItem("OutSideCountry", OutSideCountry ? OutSideCountry.OutSideCountry : null);

        onSelect(config.key, {
          AdressEn, AdressMl, AdressEnB, AdressMlB, LocalityEn, LocalityMl, ProvinceEn, ProvinceMl,PostCode, OutSideCountry,
          selectedValueRadio

        });

      } else if (valueRad === "ILB" || valueRad === "IKL" || valueRad === "IIND") {
        sessionStorage.setItem("isPrsentAddress", isPrsentAddress.code);
        sessionStorage.setItem("PresentCountry", PresentCountry ? PresentCountry.code : null);
        sessionStorage.setItem("PresentStateName", PresentStateName ? PresentStateName.code : null);
        sessionStorage.setItem("PresentLBTypeName", PresentLBTypeName ? PresentLBTypeName.code : null);
        // sessionStorage.setItem("PresentBuldingNo", PresentBuldingNo ? PresentBuldingNo : null );
        sessionStorage.setItem("PresentDoorNo", PresentDoorNo ? PresentDoorNo : null);
        sessionStorage.setItem("PresentResNoEn", PresentResNoEn ? PresentResNoEn : null);
        sessionStorage.setItem("PresentResNoEn", PresentResNoMl ? PresentResNoMl : null);
        sessionStorage.setItem("PresentHouseNameEn", PresentHouseNameEn ? PresentHouseNameEn : null);
        sessionStorage.setItem("PresentHouseNameMl", PresentHouseNameMl ? PresentHouseNameMl : null);
        sessionStorage.setItem("PresentMainPlaceEn", PresentMainPlaceEn ? PresentMainPlaceEn : null);
        sessionStorage.setItem("PresentMainPlaceMl", PresentMainPlaceMl ? PresentMainPlaceMl : null);
        sessionStorage.setItem("PresentLocalityNameEn", PresentLocalityNameEn ? PresentLocalityNameEn : null);
        sessionStorage.setItem("PresentLocalityNameMl", PresentLocalityNameMl ? PresentLocalityNameMl : null);
        sessionStorage.setItem("PresentStreetNameEn", PresentStreetNameEn ? PresentStreetNameEn : null);
        sessionStorage.setItem("PresentStreetNameMl", PresentStreetNameMl ? PresentStreetNameMl : null);
        sessionStorage.setItem("PresentVillage", PresentVillage ? PresentVillage.code : null);
        // sessionStorage.setItem("PresentWardNo", PresentWardNo.code);
        sessionStorage.setItem("PresentLBName", PresentLBName ? PresentLBName.code : null);
        sessionStorage.setItem("PresentDistrict", PresentDistrict ? PresentDistrict.code : null);
        sessionStorage.setItem("PresentTaluk", PresentTaluk ? PresentTaluk.code : null);
        sessionStorage.setItem("PresentPostOffice", PresentPostOffice ? PresentPostOffice.code : null);
        sessionStorage.setItem("PresentPincode", PresentPincode ? PresentPincode : null);
        sessionStorage.setItem("PermanentCountry", PermanentCountry ? PermanentCountry.code : null);
        sessionStorage.setItem("PermanentStateName", PermanentStateName ? PermanentStateName.code : null);
        sessionStorage.setItem("PermanentLBTypeName", PermanentLBTypeName ? PermanentLBTypeName.code : null);
        // sessionStorage.setItem("PermanentBuldingNo", PermanentBuldingNo ? PermanentBuldingNo : null );
        sessionStorage.setItem("PermanentDoorNo", PermanentDoorNo ? PermanentDoorNo : null);
        sessionStorage.setItem("PermanentResNoEn", PermanentResNoEn ? PermanentResNoEn : null);
        sessionStorage.setItem("PermanentResNoMl", PermanentResNoMl ? PermanentResNoMl : null);
        sessionStorage.setItem("PermanentHouseNameEn", PermanentHouseNameEn ? PermanentHouseNameEn : null);
        sessionStorage.setItem("PermanentHouseNameMl", PermanentHouseNameMl ? PermanentHouseNameMl : null);
        sessionStorage.setItem("PermanentMainPlaceEn", PermanentMainPlaceEn ? PermanentMainPlaceEn : null);
        sessionStorage.setItem("PermanentMainPlaceMl", PermanentMainPlaceMl ? PermanentMainPlaceMl : null);
        sessionStorage.setItem("PermanentLocalityNameEn", PermanentLocalityNameEn ? PermanentLocalityNameEn : null);
        sessionStorage.setItem("PermanentLocalityNameMl", PermanentLocalityNameMl ? PermanentLocalityNameMl : null);
        sessionStorage.setItem("PermanentStreetNameEn", PermanentStreetNameEn ? PermanentStreetNameEn : null);
        sessionStorage.setItem("PermanentStreetNameMl", PermanentStreetNameMl ? PermanentStreetNameMl : null);
        sessionStorage.setItem("PermanentVillage", PermanentVillage ? PermanentVillage.code : null);
        // sessionStorage.setItem("PermanentWardNo", PermanentWardNo ? PermanentWardNo .code : null );
        sessionStorage.setItem("PermanentLBName", PermanentLBName ? PermanentLBName.code : null);
        sessionStorage.setItem("PermanentDistrict", PermanentDistrict ? PermanentDistrict.code : null);
        sessionStorage.setItem("PermanentTaluk", PermanentTaluk ? PermanentTaluk.code : null);
        sessionStorage.setItem("PermanentPostOffice", PermanentPostOffice ? PermanentPostOffice.code : null);
        sessionStorage.setItem("PermanentPincode", PermanentPincode ? PermanentPincode : null);
        onSelect(config.key, {
          selectedValueRadio,
          PresentDoorNo, PresentResNoEn, PresentResNoMl,
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
          PostCode,
          OutSideCountry,


        });
      }
    }
  };


  if (isCountryLoading || isStateLoading || islocalbodiesLoading || isPostOfficeLoading || isDistrictLoading || isTalukLoading || isVillageLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!PresentCountry || !PresentStateName || !PresentDistrict || !PresentLBTypeName || !PresentLBName || !PresentVillage
|| !PresentTaluk || !PresentPostOffice || !PresentPincode || !PresentMainPlaceEn || !PresentMainPlaceMl || !PresentLocalityNameEn 
|| !PresentLocalityNameMl || !PresentStreetNameEn || !PresentStreetNameMl || !PresentHouseNameEn || !PresentHouseNameMl || !PresentDoorNo
|| !PresentResNoEn || !PresentResNoMl   }> */}

        {/* <div className="row">
          <div className="col-md-12">

            <div className="radios">
              <div className="radiobuttons">
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-1"
                  value="1"
                  checked={selectedValueRadio === "1"}
                  // onChange={(e) => setSelectedValue(e.target.value)}
                  onSelect={setSelectedValue}
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
                  checked={selectedValueRadio === "2"}
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
                  checked={selectedValueRadio === "3"}
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
                  checked={selectedValueRadio === "4"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-4">CR_OUTSIDE_INDIA</label>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-12">

            <div className="radios">
              <div className="radiobuttons">
                <LabelFieldPair style={{ display: "flex" }}>
                  <RadioButtons t={t} optionsKey="i18nKey" options={menu} selectedOption={selectedValueRadio} onSelect={selectRadioButtons} style={{ marginTop: "-8px", paddingLeft: "5px", height: "25px", display: "flex" }} />
                </LabelFieldPair>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {(valueRad === "ILB" || valueRad === "IKL" || valueRad === "IIND") && (
            <div id="div-1">
              <div className="col-md-12">


                <div className="row">

                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARANT_ADDRESS_TIME_OF_BIRTH")}`}</span>{" "}
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
                        type={"number"}
                        optionKey="i18nKey"
                        name="PresentPincode"
                        value={PresentPincode}
                        onChange={setSelectPresentPincode}
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
                        {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@' .0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_ML") })}
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
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS_OF_THE_FAMILY")}`}</span>{" "}
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
                          type={"number"}
                          optionKey="i18nKey"
                          name="PermanentPincode"
                          value={PermanentPincode}
                          onChange={setSelectPermanentPincode}
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
                          name="PermanentLocalityNameEn"
                          value={PermanentLocalityNameEn}
                          onChange={setSelectPermanentLocalityNameEn}
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
                          placeholder={`${t("CR_LOCALITY_ML")}`}
                          {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
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
                          placeholder={`${t("CR_STREET_NAME_ML")}`}
                          {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })}
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
                          {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@' .0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_ML") })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
        {valueRad === "OIND" && (
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
              setPostCode={setPostCode} PostCode={PostCode}
              setOutSideCountry={setOutSideCountry} OutSideCountry={OutSideCountry}

            />
          </div>)
        }
        {toast && (
          <Toast
            error={
              PresentCountryError || PresentStateNameError || PresentDistrictError || PresentLBTypeNameError || PresentLBNameError
              || PresentVillageError || PresentTalukError || PresentPostOfficeError || PresentPincodeError || PermanentCountryError
              || PermanentStateNameError || PermanentDistrictError || PermanentLBTypeNameError || PermanentLBNameError || PermanentVillageError
              || PermanentTalukError || PermanentPostOfficeError || PermanentPincodeError || OutSideIndiaAddressOneEnError
              || OutSideIndiaAddressOneMlError || OutSideIndiaAddressLocEnError || OutSideIndiaAddressLocMlError || OutSideIndiaAddressProvinceEnError
              || OutSideIndiaAddressProvinceMlError || OutSideIndiaAddressError

            }
            label={
              (PresentCountryError || PresentStateNameError || PresentDistrictError || PresentLBTypeNameError || PresentLBNameError || PresentVillageError
                || PresentTalukError || PresentPostOfficeError || PresentPincodeError || PermanentCountryError || PermanentStateNameError || PermanentDistrictError
                || PermanentLBTypeNameError || PermanentLBNameError || PermanentVillageError || PermanentTalukError || PermanentPostOfficeError || PermanentPincodeError
                || OutSideIndiaAddressOneEnError || OutSideIndiaAddressOneMlError || OutSideIndiaAddressLocEnError || OutSideIndiaAddressLocMlError || OutSideIndiaAddressProvinceEnError
                || OutSideIndiaAddressProvinceMlError || OutSideIndiaAddressError
                ?
                (PresentCountryError ? t(`BIRTH_ERROR_PRESENT_COUNTRY_CHOOSE`) : PresentStateNameError ? t(`BIRTH_ERROR_PRESENT_STATE_CHOOSE`) : PresentDistrictError ? t(`BIRTH_ERROR_PRESENT_DISTRICT_CHOOSE`)
                  : PresentLBTypeNameError ? t(`BIRTH_ERROR_PRESENT_LBTYPE_CHOOSE`) : PresentLBNameError ? t(`BIRTH_ERROR_PRESENT_LBNAME_CHOOSE`)
                    : PresentVillageError ? t(`BIRTH_ERROR_PRESENT_VILLAGE_CHOOSE`) : PresentTalukError ? t(`BIRTH_ERROR_PRESENT_TALUK_CHOOSE`) : PresentPostOfficeError ? t(`BIRTH_ERROR_PRESENT_POSTOFFICE_CHOOSE`)
                      : PresentPincodeError ? t(`BIRTH_ERROR_PRESENT_PINCODE_CHOOSE`) : PermanentCountryError ? t(`BIRTH_ERROR_PERMANENT_COUNTRY_CHOOSE`)
                        : PermanentStateNameError ? t(`BIRTH_ERROR_PERMANENT_STATE_CHOOSE`) : PermanentDistrictError ? t(`BIRTH_ERROR_PERMANENT_DISTRICT_CHOOSE`) : PermanentLBTypeNameError ? t(`BIRTH_ERROR_PERMANENT_LBTYPE_CHOOSE`)
                          : PermanentLBNameError ? t(`BIRTH_ERROR_PERMANENT_LBNAME_CHOOSE`) : PermanentVillageError ? t(`BIRTH_ERROR_PERMANENT_VILLAGE_CHOOSE`) : PermanentTalukError ? t(`BIRTH_ERROR_PERMANENT_TALUK_CHOOSE`)
                            : PermanentPostOfficeError ? t(`BIRTH_ERROR_PERMANENT_POSTOFFICE_CHOOSE`) : PermanentPincodeError ? t(`BIRTH_ERROR_PERMANENT_PINCODE_CHOOSE`)
                            : OutSideIndiaAddressOneEnError ? t(`BIRTH_ERROR_OUTSIDE_ADDR_ONE_EN_ERROR`)
                            : OutSideIndiaAddressOneMlError ? t(`BIRTH_ERROR_OUTSIDE_ADDR_ONE_ML_ERROR`)
                            : OutSideIndiaAddressLocEnError ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                            : OutSideIndiaAddressLocMlError ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                            : OutSideIndiaAddressProvinceEnError ? t(`BIRTH_ERROR_OUTSIDE_STATE_PROV_EN_ERROR`)  
                            : OutSideIndiaAddressProvinceMlError ? t(`BIRTH_ERROR_OUTSIDE_STATE_PROV_ML_ERROR`)  
                            : OutSideIndiaAddressError ? t(`BIRTH_ERROR_COUNTRY_CHOOSE`)

                                : setToast(false)
                ) : setToast(false)
              )
            }

            onClose={() => setToast(false)}
          />
        )
        }{""}

      </FormStep>
    </React.Fragment>
  );
};
export default Address;
