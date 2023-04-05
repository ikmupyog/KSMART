// import {getFilteredChildDobData} from './child-dob-util';
// import  {getFilteredChildNameData} from './child-name-util';
// import {getFilteredChildSexData} from './child-sex-util';

import moment from 'moment';

export const getFilteredChildAdharData = (selectedData, inclusionData) => {
  let filteredData = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let currentValue = {curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY")}
  return {...filteredData,...currentValue};
};

export const getFilteredChildDobData = (selectedData, inclusionData) => {
 
  let filteredData = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let childDobObj = {
    curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY"),
    // changeCurValue: (value,data)=> _changeCurValue(value,data)
  };
  let currentValue = { curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY") };
  return { ...filteredData, ...currentValue };
};

export const getFilteredChildNameData = (selectedData, inclusionData) =>{
    let filteredData = {};
   
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "LESS_THAN_SIX");
  } else if(selectedData) {
    filteredData = inclusionData?.find((item) => item.conditionCode === "GREATER_THAN_SIX_NON_STUDENT");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "GREATER_THAN_SIX_STUDENT");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE_CORRECTION");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_CORRECTION");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_CORRECTION");
  } else if (selectedData) {
   filteredData = inclusionData?.find((item) => item.conditionCode === "AGE_MAJOR_INTIALS_EXPANTION");
  }
  let currentValue = {curValue: {firstName: selectedData?.firstname_en ,middleName: selectedData?.middlename_en,lastName:selectedData?.lastname_en}}
  return {...filteredData,...currentValue};
}


export const getFilteredChildSexData = (data) =>{
    let query = "[?(@.condition ==";
    if(data?.placeOfBirth === "HOSPITAL"){
       query += "HOSPITAL";
    } else if(data?.placeOfBirth === "NON-HOSPITAL"){
       query += "NON-HOSPITAL";
    }
    query += ")]";
    return query;
}


export const getFatherDetailsbData = (selectedData, inclusionData) => {
   
    let filteredData = {};
    if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    //TODO need validation to check dob is null
    let childDobObj = {
      curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY"),
      // changeCurValue: (value,data)=> _changeCurValue(value,data)
    };
    let currentValue = { curValue: selectedData?.dateofbirth && moment(selectedData?.dateofbirth).format("DD/MM/YYYY") };
    return { ...filteredData, ...currentValue };
  };

  
  export const getFilteredMarriageDOMData = (selectedData, inclusionData) => {
    let filteredData = {};
    if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    let childDobObj = {
      curValue: selectedData?.marriageDOM && moment(selectedData?.marriageDOM).format("DD/MM/YYYY"),
    };
    
    //TODO need validation to check dob is null
    let currentValue = {curValue: selectedData?.marriageDOM && moment(selectedData?.marriageDOM).format("DD/MM/YYYY")}
    return {...filteredData,...currentValue};
  };
  export const getFilteredGroomNameEnData = (selectedData, inclusionData) => {
    let filteredData = {};
    if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    let childDobObj = {
      curValue:  selectedData?.GroomDetails?.groomFirstnameEn,
    };
    
    //TODO need validation to check dob is null
    let currentValue = {curValue: selectedData?.GroomDetails?.groomFirstnameEn }
    return {...filteredData,...currentValue};
  };

  export const getFilteredWardData = (selectedData, inclusionData) => {
    let filteredData = {};
    if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
    } else {
      filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
    }
    let childDobObj = {
      curValue:  selectedData?.GroomDetails?.groomFirstnameEn,
    };
    
    //TODO need validation to check dob is null
    let currentValue = {curValue: selectedData?.marriageWardCode }
    return {...filteredData,...currentValue};
  };