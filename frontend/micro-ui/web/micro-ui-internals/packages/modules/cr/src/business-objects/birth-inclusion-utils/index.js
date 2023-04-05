import { getFilteredChildDobData } from "./child-dob-util";
import  {getFilteredChildNameData} from './child-name-util';
import {getFilteredChildSexData} from './child-sex-util';

import moment from "moment";

export const getFilteredChildAdharData = (selectedData, inclusionData) => {
  let filteredData = {};
  if (selectedData?.registerBirthPlace?.placeofbirthid === "HOSPITAL") {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_INSTITUTIONAL");
  } else {
    filteredData = inclusionData?.find((item) => item.conditionCode === "DOB_NON_INSTITUTIONAL");
  }
  //TODO need validation to check dob is null
  let currentValue = { curValue: selectedData?.dateofbirth };
  return { ...filteredData, ...currentValue };
};

export const getFilteredFatherData = (selectedData, inclusionData) => {
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

export const getFilteredMotherData = (selectedData, inclusionData) => {
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

export const getFilteredParentAddressData = (selectedData, inclusionData) => {
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
  const computedValue = computeInitialValue(selectedData?.dateofbirth)
  let currentValue = {
    initialValue:computedValue ,
    curValue: computedValue,
  };
  return { ...filteredData, ...currentValue };
};

const computeInitialValue = (dob) => {
  const initialValue = dob && moment(dob).format("DD/MM/YYYY");
  return initialValue;
};

export { getFilteredChildDobData, getFilteredChildNameData, getFilteredChildSexData };
