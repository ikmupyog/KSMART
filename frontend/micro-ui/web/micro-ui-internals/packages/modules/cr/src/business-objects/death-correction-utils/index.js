// import {getFilteredChildDobData} from './child-dob-util';
// import  {getFilteredChildNameData} from './child-name-util';
// import {getFilteredChildSexData} from './child-sex-util';

import moment from 'moment';

export const getFilteredChildAdharData = (selectedData, correctionData) => {
  console.log("selectedData==123",selectedData,correctionData);
  let filteredData = {};
  if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let currentValue = {curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY")}
  return {...filteredData,...currentValue};
};

export const getFilteredChildDobData = (selectedData, correctionData) => {
  console.log("selectedData==123", selectedData, correctionData);
  let filteredData = {};
  if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let childDobObj = {
    curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY"),
    // changeCurValue: (value,data)=> _changeCurValue(value,data)
  };
  let currentValue = { curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY") };
  return { ...filteredData, ...currentValue };
};


export const getFilteredChildNameData = (selectedData, correctionData) =>{
    let filteredData = {};
    console.log("filteredData==",selectedData, correctionData);
  if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
    filteredData = correctionData?.find((item) => item.conditionCode === "LESS_THAN_SIX");
  } else if(selectedData) {
    filteredData = correctionData?.find((item) => item.conditionCode === "GREATER_THAN_SIX_NON_STUDENT");
  } else if (selectedData) {
   filteredData = correctionData?.find((item) => item.conditionCode === "GREATER_THAN_SIX_STUDENT");
  } else if (selectedData) {
   filteredData = correctionData?.find((item) => item.conditionCode === "AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE_CORRECTION");
  } else if (selectedData) {
   filteredData = correctionData?.find((item) => item.conditionCode === "AGE_MAJOR_CORRECTION");
  } else if (selectedData) {
   filteredData = correctionData?.find((item) => item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION");
  } else if (selectedData) {
   filteredData = correctionData?.find((item) => item.conditionCode === "AGE_MAJOR_CORRECTION");
  } else if (selectedData) {
   filteredData = correctionData?.find((item) => item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION");
  }
  let currentValue = {curValue: {firstName: selectedData?.firstname_en ,middleName: selectedData?.middlename_en,lastName:selectedData?.lastname_en}}
  return {...filteredData,...currentValue};
}


export const getFilteredChildSexData = (data) =>{
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY") };
    return { ...filteredData, ...currentValue };
}


export const getFatherDetailsbData = (selectedData, correctionData) => {
    console.log("selectedData==123", selectedData, correctionData);
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: selectedData?.dateofdeath && moment(selectedData?.dateofdeath).format("DD/MM/YYYY") };
    return { ...filteredData, ...currentValue };
  };
  
  // const _changeCurValue = (value,data) =>{
  //   return()
  // }
  
  
  export const getFilteredDeceasedAadharData = (selectedData, correctionData) => {
    console.log("selectedData==123", selectedData, correctionData);
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let currentValue = { curValue: selectedData?.DeceasedAadharNumber };
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDeceasedPlaceOfDeath = (selectedData, correctionData) => {
    console.log("selectedData==123", selectedData, correctionData);
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let currentValue = { curValue: selectedData?.InformationDeath?.DeathPlace };
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDeceasedGender = (selectedData, correctionData) => {
    console.log("selectedData==123", selectedData, correctionData);
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let currentValue = { curValue: selectedData?.InformationDeath?.DeceasedGender };
    return { ...filteredData, ...currentValue };
  };
  
  export const getFilteredDeceasedNameDataEn = (selectedData, correctionData) => {
    console.log("selectedData==123", selectedData, correctionData);
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DeceasedFirstNameEn,
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: {firstName: selectedData?.InformationDeath?.DeceasedFirstNameEn ,middleName: selectedData?.InformationDeath?.DeceasedMiddleNameEn,lastName:selectedData?.InformationDeath?.DeceasedLastNameEn}};
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDeceasedNameDataMl = (selectedData, correctionData) => {
    console.log("selectedData==123", selectedData, correctionData);
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DeceasedFirstNameEn,
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: {firstName: selectedData?.InformationDeath?.DeceasedFirstNameMl ,middleName: selectedData?.InformationDeath?.DeceasedMiddleNameMl,lastName:selectedData?.InformationDeath?.DeceasedLastNameMl}};
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDodData = (selectedData, correctionData) => {
    console.log("selectedData==dob---parms", selectedData, correctionData);
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DateofDeath && moment(selectedData?.InformationDeath?.DateofDeath).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: selectedData?.InformationDeath?.DateofDeath && moment(selectedData?.InformationDeath?.DateofDeath).format("DD/MM/YYYY") };
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDeceasedMothersName = (selectedData, correctionData) => {
    console.log("selectedData==dob---parms", selectedData, correctionData);
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let currentValue = { curValue: {mothersNameEn: selectedData?.FamilyInformationDeath?.MotherNameEn, mothersNameMl: selectedData?.FamilyInformationDeath?.MotherNameMl}};
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDeceasedFathersName = (selectedData, correctionData) => {
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DateofDeath && moment(selectedData?.InformationDeath?.DateofDeath).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: {fathersNameEn: selectedData?.FamilyInformationDeath?.FatherNameEn, fathersNameMl: selectedData?.FamilyInformationDeath?.FatherNameMl}};
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDeceasedSpouseName = (selectedData, correctionData) => {
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DateofDeath && moment(selectedData?.InformationDeath?.DateofDeath).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: {spouseNameEn: selectedData?.FamilyInformationDeath?.SpouseNameEn, spouseNameMl: selectedData?.FamilyInformationDeath?.SpouseNameMl}};
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDeceasedAddressEn = (selectedData, correctionData) => {
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DateofDeath && moment(selectedData?.InformationDeath?.DateofDeath).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: {houseNameEn: selectedData?.AddressBirthDetails?.PermanentAddrHoueNameEn, 
      localityNameEn: selectedData?.AddressBirthDetails?.PermanentAddrLocalityEn,
      streetNameEn: selectedData?.AddressBirthDetails?.PermanentAddrStreetNameEn,
    }};
    return { ...filteredData, ...currentValue };
  };
  export const getFilteredDeceasedAddressMl = (selectedData, correctionData) => {
    let filteredData = {};
    if (selectedData?.registerDeathPlace?.placeofdeathid === "HOSPITAL") {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = correctionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.InformationDeath?.DateofDeath && moment(selectedData?.InformationDeath?.DateofDeath).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: {houseNameMl: selectedData?.AddressBirthDetails?.PermanentAddrHoueNameMl, 
      localityNameMl: selectedData?.AddressBirthDetails?.PermanentAddrLocalityMl,
      streetNameMl: selectedData?.AddressBirthDetails?.PermanentAddrStreetNameMl,
    }};
    return { ...filteredData, ...currentValue };
  };