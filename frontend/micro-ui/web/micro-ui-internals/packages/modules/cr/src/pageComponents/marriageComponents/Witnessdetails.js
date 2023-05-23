import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  NewRadioButton,
  Loader,
  Toast,
  SubmitBar,
  TextArea,
  PopUp,
  ImageUploadHandler,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import { v4 as uuidv4 } from "uuid";
import { trimURL } from "../../utils";
import _ from "lodash";

const WitnessDetails = ({ config, onSelect, userType, formData, isEditWitness, isEditMarriage = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: District = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: LBType = {}, isLBTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  // const cmbMaritalStatus = [
  //   { i18nKey: "Married", code: "MARRIED" },
  //   { i18nKey: "Un Married", code: "UNMARRIED" },
  //   { i18nKey: "Not Applicable", code: "NOT Applicable" },
  // ];
  const cmbExpirationType = [
    { i18nKey: "Alive", code: "ALIVE" },
    { i18nKey: "Expired", code: "EXPIRED" },
  ];

  let cmbDistrict = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbLBType = [];
  District &&
    District["common-masters"] &&
    District["common-masters"].District &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].Taluk &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
  const [marraigeDOM, setmarraigeDOM] = useState(formData?.WitnessDetails?.marraigeDOM ? formData?.WitnessDetails?.marraigeDOM : "");
  const [marriageDistrict, setmarriageDistrict] = useState(
    formData?.WitnessDetails?.marriageDistrict ? formData?.WitnessDetails?.marriageDistrict : ""
  );
  const [marraigeTalukID, setmarraigeTalukID] = useState(formData?.WitnessDetails?.marraigeTalukID ? formData?.WitnessDetails?.marraigeTalukID : "");
  const [marraigeVillageName, setmarraigeVillageName] = useState(
    formData?.WitnessDetails?.marraigeVillageName ? formData?.WitnessDetails?.marraigeVillageName : ""
  );
  const [marraigeLBtype, setmarraigeLBtype] = useState(formData?.WitnessDetails?.marraigeLBtype ? formData?.WitnessDetails?.marraigeLBtype : "");
  const [marraigePlacetype, setmarraigePlacetype] = useState(
    formData?.WitnessDetails?.marraigePlacetype ? formData?.WitnessDetails?.marraigePlacetype : ""
  );
  const [marriageLocalityEn, setmarriageLocalityEn] = useState(
    formData?.WitnessDetails?.marriageLocalityEn ? formData?.WitnessDetails?.marriageLocalityEn : ""
  );
  const [marriageLocalityMal, setmarriageLocalityMal] = useState(
    formData?.WitnessDetails?.marriageLocalityMal ? formData?.WitnessDetails?.marriageLocalityMal : ""
  );
  const [marriageStreetEn, setmarriageStreetEn] = useState(
    formData?.WitnessDetails?.marriageStreetEn ? formData?.WitnessDetails?.marriageStreetEn : ""
  );
  const [marriageStreetMal, setmarriageStreetMal] = useState(
    formData?.WitnessDetails?.marriageStreetMal ? formData?.WitnessDetails?.marriageStreetMal : ""
  );
  const [marriageHouseNoAndNameEn, setmarriageHouseNoAndNameEn] = useState(
    formData?.WitnessDetails?.marriageHouseNoAndNameEn ? formData?.WitnessDetails?.marriageHouseNoAndNameEn : ""
  );
  const [marriageHouseNoAndNameMal, setmarriageHouseNoAndNameMal] = useState(
    formData?.WitnessDetails?.marriageHouseNoAndNameMal ? formData?.WitnessDetails?.marriageHouseNoAndNameMal : ""
  );
  const [marriageLandmark, setmarriageLandmark] = useState(
    formData?.WitnessDetails?.marriageLandmark ? formData?.WitnessDetails?.marriageLandmark : ""
  );
  const [marraigeOthersSpecify, setmarraigeOthersSpecify] = useState(
    formData?.WitnessDetails?.marraigeOthersSpecify ? formData?.WitnessDetails?.marraigeOthersSpecify : ""
  );
  const [marraigeType, setmarraigeType] = useState(formData?.WitnessDetails?.marraigeType ? formData?.WitnessDetails?.marraigeType : "");

  const [witness1AadharNo, setwitness1AadharNo] = useState(
    formData?.WitnessDetails?.witness1AadharNo ? formData?.WitnessDetails?.witness1AadharNo : ""
  );
  const [witness2AadharNo, setwitness2AadharNo] = useState(
    formData?.WitnessDetails?.witness2AadharNo ? formData?.WitnessDetails?.witness2AadharNo : ""
  );
  const [witness2NameEn, setwitness2NameEn] = useState(formData?.WitnessDetails?.witness2NameEn ? formData?.WitnessDetails?.witness2NameEn : "");
  const [witness1NameEn, setwitness1NameEn] = useState(formData?.WitnessDetails?.witness1NameEn ? formData?.WitnessDetails?.witness1NameEn : "");
  const [witness1Age, setwitness1Age] = useState(formData?.WitnessDetails?.witness1Age ? formData?.WitnessDetails?.witness1Age : "");
  const [witness2Age, setwitness2Age] = useState(formData?.WitnessDetails?.witness2Age ? formData?.WitnessDetails?.witness2Age : "");
  const [witness1AddresSEn, setwitness1AddressEn] = useState(
    formData?.WitnessDetails?.witness1AddresSEn ? formData?.WitnessDetails?.witness1AddresSEn : ""
  );
  const [witness2AddresSEn, setwitness2AddressEn] = useState(
    formData?.WitnessDetails?.witness2AddresSEn ? formData?.WitnessDetails?.witness2AddresSEn : ""
  );
  const [witness1AadharError, setwitness1AadharError] = useState(formData?.WitnessDetails?.witness1AadharNo ? false : false);
  const [witness2AadharError, setwitness2AadharError] = useState(formData?.WitnessDetails?.witness2AadharNo ? false : false);
  const [witness1Mobile, setwitness1Mobile] = useState(formData?.WitnessDetails?.witness1Mobile ? formData?.WitnessDetails?.witness1Mobile : "");
  const [witness2Mobile, setwitness2Mobile] = useState(formData?.WitnessDetails?.witness2Mobile ? formData?.WitnessDetails?.witness2Mobile : "");
  const [witness1Esigned, setwitness1Esigned] = useState(
    formData?.WitnessDetails?.witness1Esigned ? formData?.WitnessDetails?.witness1Esigned : false
  );
  const [witness2Esigned, setwitness2Esigned] = useState(
    formData?.WitnessDetails?.witness2Esigned ? formData?.WitnessDetails?.witness2Esigned : false
  );
  const [isDisableEdit, setisDisableEdit] = useState(isEditWitness ? isEditWitness : false);
  const [toast, setToast] = useState(false);
  const [groomImage, setGroomImage] = useState(null);
  const [brideImage, setBrideImage] = useState(null);
  const [previewGroomImage, setPreviewGroomImage] = useState(null);
  const [previewBrideImage, setPreviewBrideImage] = useState(null);
  const [expirationType, setExpirationType] = useState(null);
  // const [expirationTypeHusband, setExpirationTypeHusband] = useState(
  //   formData?.WitnessDetails?.expirationTypeHusband ? formData?.WitnessDetails?.expirationTypeHusband : null
  // );
  const [isExpiredHusband, setIsExpiredHusband] = useState(
    formData?.WitnessDetails?.isExpiredHusband ? formData?.WitnessDetails?.isExpiredHusband : false
  );
  // const [expirationTypeWife, setExpirationTypeWife] = useState(
  //   formData?.WitnessDetails?.expirationTypeWife ? formData?.WitnessDetails?.expirationTypeWife : null
  // );

  const [isExpiredWife, setIsExpiredWife] = useState(formData?.WitnessDetails?.isExpiredWife ? formData?.WitnessDetails?.isExpiredWife : false);
  const [isBackward, setIsBackward] = useState(formData?.WitnessDetails?.isBackward ? formData?.WitnessDetails?.isBackward : false);
  const [isOpenHusbandModal, setIsOpenHusbandModal] = useState(false);
  const [isOpenWifeModal, setIsOpenWifeModal] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);

  const [brideFilestoreId, setUploadedBrideImageId] = useState(
    formData?.WitnessDetails?.brideFilestoreId
      ? _.isArray(formData?.WitnessDetails?.brideFilestoreId)
        ? formData?.WitnessDetails?.brideFilestoreId
        : [formData?.WitnessDetails?.brideFilestoreId]
      : null
  );
  const [groomFilestoreId, setUploadedGroomImageId] = useState(
    formData?.WitnessDetails?.groomFilestoreId
      ? _.isArray(formData?.WitnessDetails?.groomFilestoreId)
        ? formData?.WitnessDetails?.groomFilestoreId
        : [formData?.WitnessDetails?.groomFilestoreId]
      : null
  );
  const [groomURL, setGroomURL] = useState(formData?.WitnessDetails?.groomURL ? formData?.WitnessDetails?.groomURL : null);
  const [brideURL, setBrideURL] = useState(formData?.WitnessDetails?.brideURL ? formData?.WitnessDetails?.brideURL : null);

  const currentYear = new Date().getFullYear();

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  const getUserType = () => Digit.UserService.getType();

  const EsignVerificationWitness1 = async () => {
    const data = {
      ...witness1Mobile,
      tenantId: stateCode,
      userType: getUserType(),
    };

    sendOtp({ otp: { ...data, ...{ type: "register" } } });
  };

  // const sendOtp = async (data) => {
  //   console.log("sendOtp");

  //   try {
  //     console.log("try reached==", data);

  //     const res = await Digit.UserService.sendOtp(data, 32);

  //     return [res, null];
  //   } catch (err) {
  //     console.log("catch reached==", err);

  //     return [null, err];
  //   }
  // };

  const [AgeValidationMsg, setAgeValidationMsg] = useState(false);
  const [witness1NameEnError, setwitness1NameEnError] = useState(false);
  const [witness2NameEnError, setwitness2NameEnError] = useState(false);
  const [witness1AgeError, setwitness1AgeError] = useState(false);
  const [witness2AgeError, setwitness2AgeError] = useState(false);
  const [witness1AddressEnError, setwitness1AddressEnError] = useState(false);
  const [witness2AddressEnError, setwitness2AddressEnError] = useState(false);
  const [witness1MobileError, setwitness1MobileError] = useState(false);
  const [witness2MobileError, setwitness2MobileError] = useState(false);
  const [AdhaarDuplicationError, setAdhaarDuplicationError] = useState(false);

  const onSkip = () => onSelect();

  function setSelectExpirationTypeHusband(e) {
    if (e.target.checked === true) {
      setIsOpenHusbandModal(true);
    }
    setIsExpiredHusband(e.target.checked);
  }

  function setSelectExpirationTypeWife(e) {
    if (e.target.checked === true) {
      setIsOpenWifeModal(true);
    }
    setIsExpiredWife(e.target.checked);
  }

  function setSelectIsBackward(e) {
    setIsBackward(e.target.checked);
  }
  // function setSelectmarraigeDOM(value) {
  //   setmarraigeDOM(value);
  //   const today = new Date();
  //   const birthDate = new Date(value);
  //   if (birthDate.getTime() <= today.getTime()) {
  //     // To calculate the time difference of two dates
  //     let Difference_In_Time = today.getTime() - birthDate.getTime();
  //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //     let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
  //     console.log(Difference_In_DaysRounded);
  //   } else {
  //     setmarraigeDOM(null);
  //     // setDOBError(true);
  //     // setToast(true);
  //     setTimeout(() => {
  //       setToast(false);
  //     }, 3000);
  //   }
  // }
  function setSelectwitness1AadharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setwitness1AadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue != "" && newValue === witness2AadharNo) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (
      newValue != "" &&
      (newValue === formData?.GroomDetails?.groomAadharNo ||
        newValue === formData?.GroomDetails?.groomFatherAadharNo ||
        newValue === formData?.GroomDetails?.groomMotherAadharNo ||
        newValue === formData?.GroomDetails?.groomGuardianAadharNo)
    ) {
      setAdhaarDuplicationError(true);
      setToast(true);
      motherMarriageAge;
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (
      newValue != "" &&
      (newValue === formData?.BrideDetails?.brideAdharNo ||
        newValue === formData?.BrideDetails?.brideFatherAadharNo ||
        newValue === formData?.BrideDetails?.brideMotherAadharNo ||
        newValue === formData?.BrideDetails?.brideGuardianAadharNo)
    ) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setwitness1AadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }
  function setSelectwitness2AadharNo(e) {
    // if (e.target.value.trim().length >= 0) {
    //   setwitness2AadharNo(
    //     e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
    //   );
    // }
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    if (newValue != "" && newValue === witness1AadharNo) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (
      newValue != "" &&
      (newValue === formData?.GroomDetails?.groomAadharNo ||
        newValue === formData?.GroomDetails?.groomFatherAadharNo ||
        newValue === formData?.GroomDetails?.groomMotherAadharNo ||
        newValue === formData?.GroomDetails?.groomGuardianAadharNo)
    ) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (
      newValue != "" &&
      (newValue === formData?.BrideDetails?.brideAdharNo ||
        newValue === formData?.BrideDetails?.brideFatherAadharNo ||
        newValue === formData?.BrideDetails?.brideMotherAadharNo ||
        newValue === formData?.BrideDetails?.brideGuardianAadharNo)
    ) {
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setwitness2AadharNo(newValue);
      setAdhaarDuplicationError(false);
    }
  }
  function setSelectwitness1NameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setwitness1NameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  // if (e.target.value.length === 51) {
  //   return false;
  //   // window.alert("Username shouldn't exceed 10 characters")
  // } else {
  //   setwitness1NameEn(
  //     e.target.value.replace(
  //       /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
  //       ""
  //     )
  //   );
  // }

  function setSelectwitness2NameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setwitness2NameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setwitness2NameEn(
    //     e.target.value.replace(
    //       /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
    //       ""
    //     )
    //   );
    // }
  }

  function setSelectwitness1Age(e) {
    setwitness1Age(
      e.target.value.trim().length <= 2
        ? e.target.value.trim().replace(/[^0-9]/gi, "")
        : e.target.value
            .trim()
            .replace(/[^0-9]/gi, "")
            .substring(0, 2)
    );
    if (e.target.value < 18) {
      setAgeValidationMsg(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      setwitness1Age(null);
    } else {
      setAgeValidationMsg(false);
    }
    // if (e.target.value.length === 3) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   if(e.target.value >= 18){
    //    setwitness1Age(e.target.value);
    //   }
    //   else{
    //     return false;
    //   }
    // }
  }
  function setSelectwitness2Age(e) {
    setwitness2Age(
      e.target.value.trim().length <= 2
        ? e.target.value.trim().replace(/[^0-9]/gi, "")
        : e.target.value
            .trim()
            .replace(/[^0-9]/gi, "")
            .substring(0, 2)
    );
    if (e.target.value < 18) {
      setAgeValidationMsg(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      setwitness2Age(null);
    } else {
      setAgeValidationMsg(false);
    }
    // if (e.target.value.length === 3) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setwitness2Age(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' a-zA-Z]/gi, ""));
    // }
  }
  function setSelectwitness1AddressEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9 ,/]*$") != null) {
      setwitness1AddressEn(e.target.value.length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setwitness1AddressEn(
    //     e.target.value.replace(
    //       /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
    //       ""
    //     )
    //   );
    // }
  }
  function setSelectwitness2AddressEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9 ,/]*$") != null) {
      setwitness2AddressEn(e.target.value.length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
    // if (e.target.value.length === 51) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setwitness2AddressEn(
    //     e.target.value.replace(
    //       /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
    //       ""
    //     )
    //   );
    // }
  }
  function setSelectwitness1Mobile(e) {
    if (e.target.value.trim().length >= 0) {
      setwitness1Mobile(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
    }
    // setwitness1Mobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10));
    // // if (e.target.value.length === 11) {
    // //   return false;
    // //   // window.alert("Username shouldn't exceed 10 characters")
    // // } else {
    // //   setwitness1Mobile(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C a-zA-Z]/gi, ""));
    // // }
  }
  function setSelectwitness2Mobile(e) {
    if (e.target.value.trim().length >= 0) {
      setwitness2Mobile(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
    }
    // setwitness2Mobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10));
    // // if (e.target.value.length === 11) {
    // //   return false;
    // //   // window.alert("Username shouldn't exceed 10 characters")
    // // } else {
    // //   setwitness2Mobile(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C a-zA-Z]/gi, ""));
    // // }
  }
  function setSelectmarriageLocalityEn(value) {
    setmarriageLocalityEn(value);
    // setAgeMariageStatus(value.code);
  }

  function setSelectwitness1Esigned() {
    setwitness1Esigned(true);
  }

  function setSelectwitness2Esigned() {
    setwitness1Esigned(true);
  }

  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }

  async function handleUploadBride(id) {
    setUploadedBrideImageId(id);
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(id, tenantId);
    setBrideURL(fileStoreIds && trimURL(fileStoreIds[0]?.url));
  }

  async function handleUploadGroom(id) {
    setUploadedGroomImageId(id);
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(id, tenantId);
    setGroomURL(fileStoreIds && trimURL(fileStoreIds[0]?.url));
  }

  let validFlag = true;
  const goNext = () => {
    if (witness1AadharNo.trim() == null || witness1AadharNo.trim() == "" || witness1AadharNo.trim() == undefined) {
      setwitness1AadharNo("");
    } else if (witness1AadharNo != null && witness1AadharNo != "") {
      let adharLength = witness1AadharNo;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setwitness1AadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setwitness1AadharError(false);
      }
    }
    if (witness2AadharNo.trim() == null || witness2AadharNo.trim() == "" || witness2AadharNo.trim() == undefined) {
      setwitness2AadharNo("");
    } else if (witness2AadharNo != null && witness2AadharNo != "") {
      let adharLength = witness2AadharNo;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setwitness2AadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setwitness2AadharError(false);
      }
    }
    if ((witness1AadharNo.trim() == null || witness1AadharNo.trim() == "") && (witness2AadharNo.trim() != null || witness2AadharNo.trim() == "")) {
      setwitness1AadharNo("");
      setwitness2AadharNo("");
    } else {
      if (witness1AadharNo.trim() != null && witness2AadharNo.trim() != null) {
        if (witness1AadharNo === witness2AadharNo) {
          validFlag = false;
          setAdhaarDuplicationError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setAdhaarDuplicationError(false);
        }
      }
    }
    if (witness1NameEn.trim() == null || witness1NameEn.trim() == "" || witness1NameEn.trim() == undefined) {
      validFlag = false;
      setwitness1NameEn("");
      setwitness1NameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setwitness1NameEnError(false);
    }
    if (witness1Age == null || witness1Age == "" || witness1Age == undefined) {
      if (witness1AgeError) {
        validFlag = false;
        setwitness1AgeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setwitness1AgeError(false);
      }
    }
    if (witness2Age == null || witness2AddresSEn == "" || witness2Age == undefined) {
      if (witness2AgeError) {
        validFlag = false;
        setwitness2AgeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setwitness2AgeError(false);
      }
    }
    if (witness2NameEn.trim() == null || witness2NameEn.trim() == "" || witness2NameEn.trim() == undefined) {
      validFlag = false;
      setwitness2NameEn("");
      setwitness2NameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setwitness2NameEnError(false);
    }
    if (witness1AddresSEn.trim() == null || witness1AddresSEn.trim() == "" || witness1AddresSEn.trim() == undefined) {
      validFlag = false;
      setwitness1AddressEn("");
      setwitness1AddressEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setwitness1AddressEnError(false);
    }
    if (witness2AddresSEn.trim() == null || witness2AddresSEn.trim() == "" || witness2AddresSEn.trim() == undefined) {
      validFlag = false;
      setwitness2AddressEn("");
      setwitness2AddressEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setwitness2AddressEnError(false);
    }
    if (witness1Mobile != null || witness1Mobile != "" || witness1Mobile != undefined) {
      let mobileLength = witness1Mobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setwitness1MobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setwitness1MobileError(false);
      }
    } else {
      validFlag = false;
      setwitness1MobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (witness2Mobile != null || witness2Mobile != "" || witness2Mobile != undefined) {
      let mobileLength = witness2Mobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setwitness2MobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setwitness2MobileError(false);
      }
    } else {
      validFlag = false;
      setwitness2MobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }

    if (validFlag == true) {
      // sessionStorage.setItem("marraigeDOM", marraigeDOM ? marraigeDOM : null);
      // sessionStorage.setItem("marriageDistrict", marriageDistrict ? marriageDistrict : null);
      // sessionStorage.setItem("marraigeLBtype", marraigeLBtype ? marraigeLBtype : null);
      // sessionStorage.setItem("marraigeTalukID", marraigeTalukID ? marraigeTalukID : null);
      // sessionStorage.setItem("marraigeVillageName", marraigeVillageName ? marraigeVillageName : null);
      // sessionStorage.setItem("marraigePlacetype", marraigePlacetype ? marraigePlacetype : null);
      // sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      // sessionStorage.setItem("witness1NameEn", witness1NameEn ? witness1NameEn : null);
      // sessionStorage.setItem("witness2NameEn", witness2NameEn ? witness2NameEn : null);
      // sessionStorage.setItem("witness1Age", witness1Age ? witness1Age : null);
      // sessionStorage.setItem("witness2Age", witness2Age ? witness2Age : null);
      // sessionStorage.setItem("witness1AddresSEn", witness1AddresSEn ? witness1AddresSEn : null);
      // sessionStorage.setItem("witness2AddresSEn", witness2AddresSEn ? witness2AddresSEn : null);
      // sessionStorage.setItem("witness1Mobile", witness1Mobile ? witness1Mobile : null);
      // sessionStorage.setItem("witness2Mobile", witness2Mobile ? witness2Mobile : null);
      // sessionStorage.setItem("marriageStreetMal", marriageStreetMal ? marriageStreetMal : null);
      // sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      // sessionStorage.setItem("marriageHouseNoAndNameEn", marriageHouseNoAndNameEn ? marriageHouseNoAndNameEn : null);
      // sessionStorage.setItem("marriageHouseNoAndNameMal", marriageHouseNoAndNameMal ? marriageHouseNoAndNameMal : null);
      // sessionStorage.setItem("marriageLocalityMal", marriageLocalityMal ? marriageLocalityMal : null);
      // sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      // sessionStorage.setItem("marraigeType", marraigeType ? marraigeType : null);
      // sessionStorage.setItem("marraigeOthersSpecify", marraigeOthersSpecify ? marraigeOthersSpecify : null);
      // sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);
      // sessionStorage.setItem("witness1AadharNo", witness1AadharNo ? witness1AadharNo : null);
      // sessionStorage.setItem("witness2AadharNo", witness2AadharNo ? witness2AadharNo : null);
      onSelect(config.key, {
        witness1AadharNo,
        witness2AadharNo,
        witness1NameEn: witness1NameEn.trim(),
        witness2NameEn: witness2NameEn.trim(),
        witness1Age,
        witness2Age,
        witness1AddresSEn: witness1AddresSEn.trim(),
        witness2AddresSEn: witness2AddresSEn.trim(),
        witness1Mobile,
        witness2Mobile,
        witness1Esigned,
        witness2Esigned,
        isExpiredHusband,
        isExpiredWife,
        brideURL,
        groomURL,
        brideFilestoreId,
        groomFilestoreId,
        uniqueId,
        isBackward,
      });
    }
  };

  useEffect(() => {
    setUniqueId(uuidv4());
  }, []);

  useEffect(() => {
    if (!brideImage) {
      setPreviewBrideImage(undefined);
      return;
    }
    const previewBrideUrl = URL.createObjectURL(brideImage);
    console.log({ previewBrideUrl });
    setPreviewBrideImage(previewBrideUrl);
  }, [brideImage]);

  useEffect(() => {
    if (!groomImage) {
      setPreviewGroomImage(undefined);
      return;
    }
    const previewGroomUrl = URL.createObjectURL(groomImage);
    setPreviewGroomImage(previewGroomUrl);
  }, [groomImage]);

  console.log("Witness", formData);

  if (isLoading || isTalukLoading || isVillageLoading || isLBTypeLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
            <FormStep
              t={t}
              config={config}
              onSelect={goNext}
              onSkip={onSkip}
              isDisabled={
                !witness1AadharNo ||
                !witness1NameEn ||
                !witness1Age ||
                !witness1AddresSEn ||
                !witness1Mobile ||
                !witness2AadharNo ||
                !witness2NameEn ||
                !witness2Age ||
                !witness2AddresSEn ||
                !witness2Mobile ||
                !groomFilestoreId ||
                !brideFilestoreId
              }
            >
              <div className="row">
                <div className="col-md-12" style={{ marginBottom: "20px" }}>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESSES_TO_SOLEMNIZATION_OF_MARRIAGE")}`}</span>{" "}
                      </h1>
                    </div>
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESSES_1_DETAILS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS1_ADHAR_NO")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness1AadharNo"
                      value={witness1AadharNo}
                      onChange={setSelectwitness1AadharNo}
                      onKeyPress={setCheckSpecialChar}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS1_ADHAR_NO")}`}
                      inputProps={{
                        maxLength: 12,
                      }}
                      {...(validation = { pattern: "^[0-9]{12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS1_NAME")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness1NameEn"
                      value={witness1NameEn}
                      onChange={setSelectwitness1NameEn}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS1_NAME")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CS_INVALID_NAME") })}
                      //{...(validation = { isRequired: true, title: t("CS_INVALID_NAME") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS1_AGE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness1Age"
                      value={witness1Age}
                      onChange={setSelectwitness1Age}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS1_AGE")}`}
                      inputProps={{
                        maxLength: 2,
                      }}
                      {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true, title: t("CS_INVALID_AGE") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS1_ADDRESS")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextArea
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness1AddresSEn"
                      value={witness1AddresSEn}
                      onChange={setSelectwitness1AddressEn}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS1_ADDRESS")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ,/]*$", isRequired: false, type: "text", title: t("CS_INVALID_ADDRESS") })}
                    />
                  </div>

                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS1_MOBILE_NO")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness1Mobile"
                      value={witness1Mobile}
                      onChange={setSelectwitness1Mobile}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS1_MOBILE_NO")}`}
                      {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
                    />
                  </div>
                  {/* <div className="col-md-2">
                    <TextInput
                      t={t}
                      type={"button"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      style={{
                        backgroundColor: "#ea3d32",
                        borderRadius: "5px",
                        fontSize: "18px",
                        color: "#fff",
                        marginTop: "40px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                      name="eSign"
                      value="E-sign"
                      // onClick = {sendWitness1OTP}
                      // disable={isDisableEdit}
                      // {...(validation = { isRequired: true })}
                    />
                  </div> */}

                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESSES_2_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS2_ADHAR_NO")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      type={"number"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness2AadharNo"
                      value={witness2AadharNo}
                      onChange={setSelectwitness2AadharNo}
                      disable={isDisableEdit}
                      onKeyPress={setCheckSpecialChar}
                      placeholder={`${t("CR_WITNESS2_ADHAR_NO")}`}
                      inputProps={{
                        maxLength: 12,
                      }}
                      {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS2_NAME")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness2NameEn"
                      value={witness2NameEn}
                      onChange={setSelectwitness2NameEn}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS2_NAME")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CS_INVALID_NAME") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS2_AGE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      type={"text"}
                      isMandatory={false}
                      optionKey="i18nKey"
                      name="witness2Age"
                      value={witness2Age}
                      onChange={setSelectwitness2Age}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS2_AGE")}`}
                      {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true, title: t("CS_INVALID_AGE") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS2_ADDRESS")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextArea
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness2AddresSEn"
                      value={witness2AddresSEn}
                      onChange={setSelectwitness2AddressEn}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS2_ADDRESS")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ,/]*$", isRequired: false, type: "text", title: t("CS_INVALID_ADDRESS") })}
                    />
                  </div>

                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_WITNESS2_MOBILE_NO")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      type={"text"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      name="witness2Mobile"
                      value={witness2Mobile}
                      onChange={setSelectwitness2Mobile}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_WITNESS2_MOBILE_NO")}`}
                      {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
                    />
                  </div>
                  {/* <div className="col-md-2">
                    <TextInput
                      t={t}
                      type={"button"}
                      optionKey="i18nKey"
                      isMandatory={false}
                      style={{
                        backgroundColor: "#ea3d32",
                        borderRadius: "5px",
                        fontSize: "18px",
                        color: "#fff",
                        marginTop: "40px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                      name="eSign"
                      value="E-sign"
                      onChange={setSelectwitness2Esigned}
                      disable={isDisableEdit}
                      // {...(validation = { isRequired: true })}
                    />
                  </div> */}
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LIVE_STATUS_OF_OF_PARTIES_TO_LIVE")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <CardLabel>{t("CR_HUSBAND_NAME")}</CardLabel>
                        <TextInput
                          t={t}
                          isMandatory={false}
                          type={"text"}
                          optionKey="i18nKey"
                          name="husbandname"
                          value={`${formData?.GroomDetails?.groomFirstnameEn} ${formData?.GroomDetails?.groomMiddlenameEn || ""} ${
                            formData?.GroomDetails?.groomLastnameEn || ""
                          }`}
                          placeholder={t("CR_HUSBAND_NAME")}
                          {...(validation = { isRequired: true })}
                        />
                      </div>
                      <div className="col-md-6">
                        <CardLabel>
                          {`${t("CR_EXPIRATION")}`}
                          {/* <span className="mandatorycss">*</span> */}
                        </CardLabel>
                        <CheckBox
                          label={t("CR_EXPIRATION_TYPE")}
                          onChange={setSelectExpirationTypeHusband}
                          value={isExpiredHusband}
                          checked={isExpiredHusband}
                          disable={isDisableEdit}
                          style={{ marginBottom: "40px" }}
                        />
                      </div>
                      <div className="col-md-4">
                        <CardLabel>{t("CR_WIFE_NAME")}</CardLabel>
                        <TextInput
                          t={t}
                          isMandatory={false}
                          type={"text"}
                          optionKey="i18nKey"
                          name="wifename"
                          value={`${formData?.BrideDetails?.brideFirstnameEn} ${formData?.BrideDetails?.brideMiddlenameEn || ""} ${
                            formData?.BrideDetails?.brideLastnameEn || ""
                          }`}
                          placeholder={t("CR_WIFE_NAME")}
                          {...(validation = { isRequired: true })}
                        />
                      </div>
                      <div className="col-md-6">
                        <CardLabel>
                          {`${t("CR_EXPIRATION")}`}
                          {/* <span className="mandatorycss">*</span> */}
                        </CardLabel>
                        <CheckBox
                          label={t("CR_EXPIRATION_TYPE")}
                          onChange={setSelectExpirationTypeWife}
                          value={isExpiredWife}
                          checked={isExpiredWife}
                          disable={isDisableEdit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PHOTOS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-6" style={{ margin: "10px 0 30px 0" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                          <h2 style={{ textAlign: "center" }}>{`${t("CR_GROOM_IMAGE")}`}</h2>
                          <h2 style={{ marginBottom: "10px", textAlign: "center" }}>{`(${t("CR_FILE_SIZE_AND_SUPPORTS")})`}</h2>
                          <ImageUploadHandler
                            tenantId={tenantId}
                            uploadedImages={groomFilestoreId}
                            onPhotoChange={handleUploadGroom}
                            isMulti={false}
                            moduleType={`crmarriage/${uniqueId}/groom/${currentYear}`}
                            extraParams={{ fileName: "groom.jpg", UUID: uniqueId }}
                            type="groomImage"
                          />
                        </div>
                      </div>
                      <div className="col-md-6" style={{ margin: "10px 0 30px 0" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                          <h2 style={{ textAlign: "center" }}>{`${t("CR_BRIDE_IMAGE")}`}</h2>
                          <h2 style={{ marginBottom: "10px", textAlign: "center" }}>{`(${t("CR_FILE_SIZE_AND_SUPPORTS")})`}</h2>
                          <ImageUploadHandler
                            tenantId={tenantId}
                            uploadedImages={brideFilestoreId}
                            onPhotoChange={handleUploadBride}
                            isMulti={false}
                            moduleType={`crmarriage/${uniqueId}/bride/${currentYear}`}
                            extraParams={{ fileName: "bride.jpg", UUID: uniqueId }}
                            type="brideImage"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BELONG_TO_BACKWARD_COMMUNITY")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <CheckBox
                        label={`${t("CR_WHETHER_BACKWARD")}`}
                        onChange={setSelectIsBackward}
                        value={isBackward}
                        checked={isBackward}
                        style={{ marginBottom: "40px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {toast && (
                <Toast
                  error={
                    witness1AadharError ||
                    AgeValidationMsg ||
                    witness1NameEnError ||
                    witness2AadharError ||
                    witness2NameEnError ||
                    witness1AgeError ||
                    witness2AgeError ||
                    witness1AddressEnError ||
                    witness2AddressEnError ||
                    witness1MobileError ||
                    witness2MobileError ||
                    AdhaarDuplicationError
                  }
                  label={
                    witness1AadharError ||
                    AgeValidationMsg ||
                    witness1NameEnError ||
                    witness2AadharError ||
                    witness2NameEnError ||
                    witness1AgeError ||
                    witness2AgeError ||
                    witness1AddressEnError ||
                    witness2AddressEnError ||
                    witness1MobileError ||
                    witness2MobileError ||
                    AdhaarDuplicationError
                      ? witness1AadharError
                        ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                        : AgeValidationMsg
                        ? t(`CR_MOTHER_AGE_WARNING`)
                        : witness1NameEnError
                        ? t(`CR_INVALID_WITNESS1_NAME`)
                        : witness2AadharError
                        ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                        : witness2NameEnError
                        ? t(`CR_INVALID_WITNESS2_NAME`)
                        : witness1AgeError
                        ? t(`CR_INVALID_WITNESS1_AGE`)
                        : witness2AgeError
                        ? t(`CR_INVALID_WITNESS2_AGE`)
                        : witness1AddressEnError
                        ? t(`CR_INVALID_WITNESS1_ADDRESS`)
                        : witness2AddressEnError
                        ? t(`CR_INVALID_WITNESS2_ADDRESS`)
                        : witness1MobileError
                        ? t(`CR_INVALID_WITNESS1_MOBILENO`)
                        : witness2MobileError
                        ? t(`CR_INVALID_WITNESS2_MOBILENO`)
                        : AdhaarDuplicationError
                        ? t(`DUPLICATE_AADHAR_NO`)
                        : setToast(false)
                      : setToast(false)
                  }
                  onClose={() => setToast(false)}
                  // error={AadharError}
                  // label={AadharError ? (AadharError ? t(`CS_COMMON_INVALID_AADHAR_NO`) : setToast(false)) : setToast(false)}
                  // onClose={() => setToast(false)}
                />
              )}
            </FormStep>
          </div>
        </div>
        {(isOpenHusbandModal || isOpenWifeModal) && (
          <PopUp>
            <div className="popup-module" style={{ borderRadius: "8px" }}>
              <div style={{ margin: "20px", padding: "20px", border: "1px solid grey", borderRadius: "8px" }}>
                <div style={{ fontSize: "18px", margin: "10px" }}>
                  You opted that{" "}
                  {isOpenHusbandModal &&
                    `${formData?.GroomDetails?.groomFirstnameEn} ${formData?.GroomDetails?.groomMiddlenameEn || ""} ${
                      formData?.GroomDetails?.groomLastnameEn || ""
                    } `}
                  {isOpenWifeModal &&
                    `${formData?.BrideDetails?.brideFirstnameEn} ${formData?.BrideDetails?.brideMiddlenameEn || ""} ${
                      formData?.BrideDetails?.brideLastnameEn || ""
                    } `}
                  has Expired, Do you want to continue?
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", columnGap: "8px" }}>
                  <button
                    style={{
                      backgroundColor: "orange",
                      padding: "4px 16px",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    onClick={() => {
                      if (isOpenHusbandModal) {
                        setIsExpiredHusband(true);
                        setIsOpenHusbandModal(false);
                      } else if (isOpenWifeModal) {
                        setIsExpiredWife(true);
                        setIsOpenWifeModal(false);
                      }
                    }}
                  >
                    Yes
                  </button>
                  <button
                    style={{ border: "1px solid grey", padding: "4px 16px", borderRadius: "8px" }}
                    onClick={() => {
                      if (isOpenHusbandModal) {
                        setIsExpiredHusband(false);
                        setIsOpenHusbandModal(false);
                      } else if (isOpenWifeModal) {
                        setIsExpiredWife(false);
                        setIsOpenWifeModal(false);
                      }
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </PopUp>
        )}
      </React.Fragment>
    );
};
export default WitnessDetails;
