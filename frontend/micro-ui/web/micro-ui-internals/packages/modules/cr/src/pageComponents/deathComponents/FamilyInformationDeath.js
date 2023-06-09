import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, CheckBox, BackButton, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../utils";

const FamilyInformationDeath = ({ config, onSelect, formData, isEditDeath, isEditDeathPageComponents }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Spouse = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "SpouseType");
  let cmbspouse = [];
  Spouse &&
    Spouse["birth-death-service"] &&
    Spouse["birth-death-service"].spouseType &&
    Spouse["birth-death-service"].spouseType.map((ob) => {
      cmbspouse.push(ob);
    });
  //const [isEditDeathPageComponents, setIsEditDeathPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditDeath ? isEditDeath : false);

  const cmbSpouseAge = [
    { i18nKey: "Yes", code: "YES" },
    { i18nKey: "No", code: "NO" },
  ];

  const [SpouseType, setSpouseType] = useState(
    formData?.FamilyInformationDeath?.SpouseType?.code
      ? formData?.FamilyInformationDeath?.SpouseType
      : formData?.InformationDeath?.FamilyInformationDeath?.SpouseType
      ? cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.InformationDeath?.FamilyInformationDeath?.SpouseType)[0]
      : ""
  );

  const [SpouseUnavailable, setSpouseUnavailable] = useState(
    formData?.FamilyInformationDeath?.SpouseUnavailable
      ? formData?.FamilyInformationDeath?.SpouseUnavailable
      : formData?.InformationDeath?.FamilyInformationDeath?.SpouseUnavailable
      ? formData?.InformationDeath?.FamilyInformationDeath?.SpouseUnavailable
      : false
  );
  // const [Nationality, setSelectedNationality] = useState(
  //   formData?.InformationDeath?.Nationality?.code
  //     ? formData?.InformationDeath?.Nationality
  //     : formData?.InformationDeath?.Nationality
  //     ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.InformationDeath?.Nationality)[0]
  //     : ""
  // );
  // const [SpouseType, setSpouseType] = useState(
  //   formData?.FamilyInformationDeath?.SpouseType?.code
  //     ? formData?.FamilyInformationDeath?.SpouseType
  //     : formData?.FamilyInformationDeath?.SpouseType
  //     ? cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.InformationDeath?.SpouseType)[0]
  //     : null
  // );
  const [SpouseNameEn, setSpouseNameEN] = useState(
    formData?.FamilyInformationDeath?.SpouseNameEn
      ? formData?.FamilyInformationDeath?.SpouseNameEn
      : formData?.InformationDeath?.FamilyInformationDeath?.SpouseNameEn
      ? formData?.InformationDeath?.FamilyInformationDeath?.SpouseNameEn
      : ""
  );

  // const [SpouseNameEN, setSpouseNameEN] = useState(
  //   formData?.FamilyInformationDeath?.SpouseNameEN ? formData?.FamilyInformationDeath?.SpouseNameEN : ""
  // );

  const [SpouseNameML, setSpouseNameMl] = useState(
    formData?.FamilyInformationDeath?.SpouseNameML
      ? formData?.FamilyInformationDeath?.SpouseNameML
      : formData?.InformationDeath?.FamilyInformationDeath?.SpouseNameML
      ? formData?.InformationDeath?.FamilyInformationDeath?.SpouseNameML
      : ""
  );
  const [SpouseAadhaar, setSpouseAadhaar] = useState(
    formData?.FamilyInformationDeath?.SpouseAadhaar
      ? formData?.FamilyInformationDeath?.SpouseAadhaar
      : formData?.InformationDeath?.FamilyInformationDeath?.SpouseAadhaar
      ? formData?.InformationDeath?.FamilyInformationDeath?.SpouseAadhaar
      : ""
  );

  const [spouseAgeIfAlive, setspouseAgeIfAlive] = useState(
    formData?.FamilyInformationDeath?.spouseAgeIfAlive?.code
      ? formData?.FamilyInformationDeath?.spouseAgeIfAlive
      : formData?.InformationDeath?.FamilyInformationDeath?.spouseAgeIfAlive
      ? cmbSpouseAge.filter((cmbSpouseAge) => cmbSpouseAge.code === formData?.InformationDeath?.FamilyInformationDeath?.spouseAgeIfAlive)[0]
      : ""
  );
  const [SpouseAgeStatusHide, setSpouseAgeStatusHide] = useState(
    formData?.FamilyInformationDeath?.spouseAgeIfAlive?.code
      ? formData?.FamilyInformationDeath?.spouseAgeIfAlive.code
      : formData?.InformationDeath?.FamilyInformationDeath?.spouseAgeIfAlive
      ? formData?.InformationDeath?.FamilyInformationDeath?.spouseAgeIfAlive
      : ""
  );

  const [spouseAge, setspouseAge] = useState(
    formData?.FamilyInformationDeath?.spouseAge
      ? formData?.FamilyInformationDeath?.spouseAge
      : formData?.InformationDeath?.FamilyInformationDeath?.spouseAge
      ? formData?.InformationDeath?.FamilyInformationDeath?.spouseAge
      : ""
  );

  const [FatherUnavailable, setFatherUnavailablechecked] = useState(
    formData?.FamilyInformationDeath?.FatherUnavailable
      ? formData?.FamilyInformationDeath?.FatherUnavailable
      : formData?.InformationDeath?.FamilyInformationDeath?.FatherUnavailable
      ? formData?.FamilyInformationDeath?.FamilyInformationDeath?.FatherUnavailable
      : false
  );
  const [FatherNameEn, setFatherNameEn] = useState(
    formData?.FamilyInformationDeath?.FatherNameEn
      ? formData?.FamilyInformationDeath?.FatherNameEn
      : formData?.InformationDeath?.FamilyInformationDeath?.FatherNameEn
      ? formData?.InformationDeath?.FamilyInformationDeath?.FatherNameEn
      : ""
  );
  const [FatherNameMl, setFatherNameMl] = useState(
    formData?.FamilyInformationDeath?.FatherNameMl
      ? formData?.FamilyInformationDeath?.FatherNameMl
      : formData?.InformationDeath?.FamilyInformationDeath?.FatherNameMl
      ? formData?.InformationDeath?.FamilyInformationDeath?.FatherNameMl
      : ""
  );
  const [FatherAadharNo, setFatherAadharNo] = useState(
    formData?.FamilyInformationDeath?.FatherAadharNo
      ? formData?.FamilyInformationDeath?.FatherAadharNo
      : formData?.InformationDeath?.FamilyInformationDeath?.FatherAadharNo
      ? formData?.InformationDeath?.FamilyInformationDeath?.FatherAadharNo
      : ""
  );
  const [MotherUnavailable, setMotherUnavailable] = useState(
    formData?.FamilyInformationDeath?.MotherUnavailable
      ? formData?.FamilyInformationDeath?.MotherUnavailable
      : formData?.InformationDeath?.FamilyInformationDeath?.MotherUnavailable
      ? formData?.InformationDeath?.FamilyInformationDeath?.MotherUnavailable
      : false
  );
  const [MotherNameEn, setMotherNameEn] = useState(
    formData?.FamilyInformationDeath?.MotherNameEn
      ? formData?.FamilyInformationDeath?.MotherNameEn
      : formData?.InformationDeath?.FamilyInformationDeath?.MotherNameEn
      ? formData?.InformationDeath?.FamilyInformationDeath?.MotherNameEn
      : ""
  );
  const [MotherNameMl, setMotherNameMl] = useState(
    formData?.FamilyInformationDeath?.MotherNameMl
      ? formData?.FamilyInformationDeath?.MotherNameMl
      : formData?.InformationDeath?.FamilyInformationDeath?.MotherNameMl
      ? formData?.InformationDeath?.FamilyInformationDeath?.MotherNameMl
      : ""
  );
  const [MotherAadharNo, setMotherAadharNo] = useState(
    formData?.FamilyInformationDeath?.MotherAadharNo
      ? formData?.FamilyInformationDeath?.MotherAadharNo
      : formData?.InformationDeath?.FamilyInformationDeath?.MotherAadharNo
      ? formData?.InformationDeath?.FamilyInformationDeath?.MotherAadharNo
      : ""
  );

  const [FamilyMobileNo, setFamilyMobileNo] = useState(
    formData?.FamilyInformationDeath?.FamilyMobileNo
      ? formData?.FamilyInformationDeath?.FamilyMobileNo
      : formData?.InformationDeath?.FamilyInformationDeath?.FamilyMobileNo
      ? formData?.InformationDeath?.FamilyInformationDeath?.FamilyMobileNo
      : ""
  );

  const [FamilyEmailId, setFamilyEmailId] = useState(
    formData?.FamilyInformationDeath?.FamilyEmailId
      ? formData?.FamilyInformationDeath?.FamilyEmailId
      : formData?.InformationDeath?.FamilyInformationDeath?.FamilyEmailId
      ? formData?.InformationDeath?.FamilyInformationDeath?.FamilyEmailId
      : ""
  );
  // const [inputValue, setInputValue] = useState("");
  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.InformationDeath?.DeceasedAadharNumber ? false : false);
  const [SpouseNameEnError, setSpouseNameEnError] = useState(false);
  const [SpouseNameMLError, setSpouseNameMLError] = useState(false);
  const [FatherNameEnError, setFatherNameEnError] = useState(false);
  const [FatherNameMlError, setFatherNameMlError] = useState(false);
  const [MotherNameEnError, setMotherNameEnError] = useState(false);
  const [MotherNameMlError, setMotherNameMlError] = useState(false);
  const [AdhaarDuplicationError, setAdhaarDuplicationError] = useState(false);
  const [spouseAgeIfAliveError, setspouseAgeIfAliveError] = useState(formData?.FamilyInformationDeath?.spouseAgeIfAlive ? false : false);
  const [spouseAgeError, setspouseAgeError] = useState(formData?.FamilyInformationDeath?.spouseAge ? false : false);
  const [AgeValidationMsg, setAgeValidationMsg] = useState(false);
  const onSkip = () => onSelect();
  // function setFatherUnavailablechecked(e){
  //   if (e.target.checked === true) {
  //     setFatherUnavailable(e.target.checked);("")
  //     setSelectFatherNameEn
  //     setFatherNameMl("");
  //     setFatherAadharNo("");
  //   } else {
  //     setFatherUnavailable(e.target.checked);
  //     setDateOfDeath("");
  //     setDeathTime("");
  //   }
  // }
  // function setSelectFatherNameEn(e) {
  //   if (e.target.value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setFatherNameEn(
  //       e.target.value.replace(
  //         /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
  //         ""
  //       )
  //     );
  //   }
  // }
  // function setSelectFatherNameMl(e) {
  //   if (e.target.value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setFatherNameMl(
  //       e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, "")
  //     );
  //   }
  // }

  function setSelectSpouseType(value) {
    setSpouseType(value);
  }

  // function setSelectSpouseNameEN(e) {
  //   if (e.target.value.length === 51) {
  //     return false;
  //     // window.alert("Username shouldn't exceed 10 characters")
  //   } else {
  //     setSpouseNameEN(
  //       e.target.value.replace(
  //         /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
  //         ""
  //       )
  //     );
  //   }
  // }

  function setSelectSpouseNameEN(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setSpouseNameEN(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectSpouseNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern) && e.target.value.trim() !== " ") {
      e.preventDefault();
      setSpouseNameMl("");
    } else {
      setSpouseNameMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectFatherNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setFatherNameEn(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectFatherNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern) && e.target.value.trim() !== " ") {
      e.preventDefault();
      setFatherNameMl("");
    } else {
      setFatherNameMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectMotherNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setMotherNameEn(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectMotherNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern) && e.target.value.trim() !== " ") {
      e.preventDefault();
      setMotherNameMl("");
    } else {
      setMotherNameMl(e.target.value.trim().length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectSpouseAadhaar(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (newValue === MotherAadharNo || newValue === FatherAadharNo) {
      // If so, clear the Father's Aadhar number field
      setSpouseAadhaar("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (newValue === formData?.InformationDeath?.DeceasedAadharNumber) {
      setSpouseAadhaar("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setSpouseAadhaar(newValue);
    }
  }

  function setSelectspouseAge(e) {
    setspouseAge(
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
    } else {
      setAgeValidationMsg(false);
    }
  }
  function setSelectspouseAgeIfAlive(value) {
    setspouseAgeIfAlive(value);
    setSpouseAgeStatusHide(value.code);
  }

  function setSelectFatherAadharNo(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    // Check if the new value is the same as the Mother's Aadhar number
    if (newValue === MotherAadharNo || newValue === SpouseAadhaar) {
      // If so, clear the Father's Aadhar number field
      setFatherAadharNo("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (newValue === formData?.InformationDeath?.DeceasedAadharNumber) {
      setFatherAadharNo("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setFatherAadharNo(newValue);
    }
  }

  function setSelectMotherAadharNo(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);

    // Check if the new value is the same as the Father's Aadhar number
    if (newValue === FatherAadharNo || newValue === SpouseAadhaar) {
      // If so, clear the Mother's Aadhar number field
      setMotherAadharNo("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else if (newValue === formData?.InformationDeath?.DeceasedAadharNumber) {
      setMotherAadharNo("");
      setAdhaarDuplicationError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setMotherAadharNo(newValue);
    }
  }

  //  {
  //   setMotherAadharNo(newValue);
  // }

  function setSelectFamilyMobileNo(e) {
    if (e.target.value.trim().length >= 0) {
      setFamilyMobileNo(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
    }
  }
  function setSelectFamilyEmailId(e) {
    setFamilyEmailId(e.target.value);
  }

  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  function setCheckSpecialCharSpace(e) {
    let pattern = /^[a-zA-Z-.`' ]*$/;
    if (!e.key.match(pattern) && e.code === "Space") {
      e.preventDefault();
    }
  }
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }

  if (isEditDeath) {
    if (formData?.FamilyInformationDeath?.SpouseType != null) {
      if (cmbspouse.length > 0 && (SpouseType === undefined || SpouseType === "")) {
        setSpouseType(cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.FamilyInformationDeath?.SpouseType));
      }
    }
  }
  let validFlag = true;
  const goNext = () => {
    if (SpouseNameEn.trim() == null || SpouseNameEn.trim() == "" || SpouseNameEn.trim() == undefined) {
      validFlag = false;
      setSpouseNameEN("");
      setSpouseNameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setSpouseNameEnError(false);
    }
    if (SpouseNameML.trim() == null || SpouseNameML.trim() == "" || SpouseNameML.trim() == undefined) {
      validFlag = false;
      setSpouseNameMl("");
      setSpouseNameMLError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setSpouseNameMLError(false);
    }
    if (spouseAgeIfAlive == null || spouseAgeIfAlive == "" || spouseAgeIfAlive == undefined) {
      validFlag = false;
      setspouseAgeIfAliveError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setspouseAgeIfAliveError(false);
    }

    if (spouseAge == null || spouseAge == "" || spouseAge == undefined) {
      if (spouseAgeError) {
        validFlag = false;
        setspouseAgeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setspouseAgeError(false);
      }
    }

    if (FatherNameEn.trim() == null || FatherNameEn.trim() == "" || FatherNameEn.trim() == undefined) {
      validFlag = false;
      setFatherNameEn("");
      setFatherNameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setFatherNameEnError(false);
    }
    if (FatherNameMl.trim() == null || FatherNameMl.trim() == "" || FatherNameMl.trim() == undefined) {
      validFlag = false;
      setFatherNameMl("");
      setFatherNameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setFatherNameMlError(false);
    }
    if (MotherNameEn.trim() == null || MotherNameEn.trim() == "" || MotherNameEn.trim() == undefined) {
      validFlag = false;
      setMotherNameEn("");
      setMotherNameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMotherNameEnError(false);
    }
    if (MotherNameMl.trim() == null || MotherNameMl.trim() == "" || MotherNameMl.trim() == undefined) {
      validFlag = false;
      setMotherNameMl("");
      setMotherNameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMotherNameMlError(false);
    }

    if (
      (MotherAadharNo.trim() == null || MotherAadharNo.trim() == "") &&
      (FatherAadharNo.trim() != null || FatherAadharNo.trim() == "") &&
      (SpouseAadhaar.trim() != null || SpouseAadhaar.trim() == "")
    ) {
      setMotherAadharNo("");
      setFatherAadharNo("");
      setSpouseAadhaar("");
    } else {
      if (MotherAadharNo.trim() != null && FatherAadharNo.trim() != null && SpouseAadhaar.trim() != null) {
        if (MotherAadharNo === FatherAadharNo) {
          validFlag = false;
          setAdhaarDuplicationError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        }
        if (MotherAadharNo === SpouseAadhaar) {
          validFlag = false;
          setAdhaarDuplicationError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        }
        if (FatherAadharNo === SpouseAadhaar) {
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
    // sessionStorage.setItem("SpouseType", SpouseType ? SpouseType.code : null);
    // sessionStorage.setItem("SpouseNameEN", SpouseNameEN ? SpouseNameEN : null);
    // sessionStorage.setItem("SpouseNameMl", SpouseNameMl ? SpouseNameMl : null);
    // sessionStorage.setItem("SpouseAadhaar", SpouseAadhaar ? SpouseAadhaar : null);
    // sessionStorage.setItem("FatherNameEn", FatherNameEn ? FatherNameEn : null);
    // sessionStorage.setItem("FatherNameMl", FatherNameMl ? FatherNameMl : null);
    // sessionStorage.setItem("FatherAadharNo", FatherAadharNo ? FatherAadharNo : null);
    // sessionStorage.setItem("MotherNameEn", MotherNameEn ? MotherNameEn : null);
    // sessionStorage.setItem("MotherNameMl", MotherNameMl ? MotherNameMl : null);
    // sessionStorage.setItem("MotherAadharNo", MotherAadharNo ? MotherAadharNo : null);
    // sessionStorage.setItem("FatherUnavailable", FatherUnavailable);
    // sessionStorage.setItem("MotherUnavailable", MotherUnavailable);
    // sessionStorage.setItem("SpouseUnavailable", SpouseUnavailable);
    // sessionStorage.setItem("FamilyMobileNo", FamilyMobileNo);
    // sessionStorage.setItem("FamilyEmailId", FamilyEmailId);

    onSelect(config.key, {
      SpouseType,
      SpouseNameEn,
      SpouseNameML,
      SpouseAadhaar,
      FatherNameEn,
      FatherNameMl,
      FatherAadharNo,
      MotherNameEn,
      MotherNameMl,
      MotherAadharNo,
      FatherUnavailable,
      MotherUnavailable,
      SpouseUnavailable,
      FamilyMobileNo,
      FamilyEmailId,
      spouseAgeIfAlive,
      spouseAge,
    });
  };

  // if (isEditDeath) {
  //   if (formData?.FamilyInformationDeath?.SpouseType != null) {
  //     if (cmbspouse.length > 0 && (SpouseType === undefined || SpouseType === "")) {
  //       setSpouseType(cmbspouse.filter((cmbspouse) => cmbspouse.code === formData?.FamilyInformationDeath?.SpouseType)[0]);
  //     }
  //   }
  // }

  // if (
  //   isEditDeath &&
  //   isEditDeathPageComponents === false &&
  //   (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
  // ) {

  // }

  // const handleBlur = (event) => {
  //   const value = event.target.value;
  //   if (value.length > 12) {
  //     setInputValue(value.slice(0, 12));
  //   } else {
  //     setInputValue(value);
  //   }
  // };
  return (
    <React.Fragment>
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null} */}

      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!FamilyMobileNo}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ padding: "0 10px" }}>{`${t("CR_FAMILY_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox
                label={t("CR_SPOUSE_UNAVAILABLE")}
                onChange={() => setSpouseUnavailable(!SpouseUnavailable)}
                value={SpouseUnavailable}
                checked={SpouseUnavailable}
              />
            </div>
          </div>
        </div>
        {SpouseUnavailable ? null : (
          // <div style={{ pointerEvents: isSpouseChecked ? "none" : "all", opacity: isSpouseChecked ? 0.5 : 1 }}>
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ padding: "0 10px" }}>{`${t("CR_SPOUSE_DETAILS")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_SPOUSE_TYPE_EN")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbspouse}
                    selected={SpouseType}
                    select={setSelectSpouseType}
                    placeholder={`${t("CR_SPOUSE_TYPE_EN")}`}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_NAME")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseNameEn"
                    value={SpouseNameEn}
                    onChange={setSelectSpouseNameEN}
                    onKeyPress={setCheckSpecialCharSpace}
                    placeholder={`${t("CR_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_NAME_ML")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseNameML"
                    value={SpouseNameML}
                    onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectSpouseNameMl}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="SpouseAadhaar"
                    value={SpouseAadhaar}
                    onChange={setSelectSpouseAadhaar}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_SPOUSE_AGE_IF_ALIVE")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="i18nKey"
                    isMandatory={false}
                    option={sortDropdownNames(cmbSpouseAge ? cmbSpouseAge : [], "code", t)}
                    selected={spouseAgeIfAlive}
                    select={setSelectspouseAgeIfAlive}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_SPOUSE_AGE_IF_ALIVE")}`}
                  />
                </div>

                {SpouseAgeStatusHide === "YES" && (
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_SPOUSE_AGE")}`} <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="spouseAge"
                      value={spouseAge}
                      onChange={setSelectspouseAge}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_SPOUSE_AGE")}`}
                      {...(validation = { pattern: "^[0-9]{2}$", type: "text", isRequired: true, title: t("CR_INVALID_SPOUSE_AGE") })}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox
                label={t("CR_FATHER_UNAVAILABLE")}
                onChange={() => setFatherUnavailablechecked(!FatherUnavailable)}
                value={FatherUnavailable}
                checked={FatherUnavailable}
              />
            </div>
          </div>
        </div>
        {FatherUnavailable ? null : (
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ padding: "0 10px" }}>{`${t("CR_FATHER_DETAILS")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherNameEn"
                    value={FatherNameEn}
                    onChange={setSelectFatherNameEn}
                    onKeyPress={setCheckSpecialCharSpace}
                    placeholder={`${t("CR_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME_ML")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherNameMl"
                    value={FatherNameMl}
                    onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectFatherNameMl}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="FatherAadharNo"
                    value={FatherAadharNo}
                    onChange={setSelectFatherAadharNo}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox
                label={t("CR_MOTHER_UNAVAILABLE")}
                onChange={() => setMotherUnavailable(!MotherUnavailable)}
                value={MotherUnavailable}
                checked={MotherUnavailable}
              />
            </div>
          </div>
        </div>
        {MotherUnavailable ? null : (
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ padding: "0 10px" }}>{`${t("CR_DETAILS_OF_MOTHER")}`}</span>
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="text"
                    optionKey="i18nKey"
                    name="MotherNameEn"
                    value={MotherNameEn}
                    onChange={setSelectMotherNameEn}
                    onKeyPress={setCheckSpecialCharSpace}
                    placeholder={`${t("CR_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: true, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_NAME_ML")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MotherNameMl"
                    value={MotherNameMl}
                    onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectMotherNameMl}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MotherAadharNo"
                    value={MotherAadharNo}
                    onChange={setSelectMotherAadharNo}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ padding: "0 10px" }}>{`${t("CR_CONTACT_DETAILS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_FAMILY_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="FamilyMobileNo"
                value={FamilyMobileNo}
                onChange={setSelectFamilyMobileNo}
                placeholder={`${t("CR_FAMILY_MOBILE_NO")}`}
                {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "number", title: t("CS_COMMON_INVALID_AGE") })}

                // {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("CR_INVALID_PHONE_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_EMAIL_ID")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"email"}
                optionKey="i18nKey"
                name="FamilyEmailId"
                value={FamilyEmailId}
                onChange={setSelectFamilyEmailId}
                placeholder={`${t("CR_EMAIL_ID")}`}
                {...(validation = { isRequired: false, type: "email", title: t("CR_INVALID_EMAIL_ID") })}
              />
            </div>
          </div>
        </div>
        {toast && (
          <Toast
            error={AadharError || spouseAgeIfAliveError || spouseAgeError}
            label={
              AadharError || spouseAgeIfAliveError || spouseAgeError
                ? AadharError
                  ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                  : spouseAgeIfAliveError
                  ? t(`DEATH_ERROR_SPOUSE_ALIVE_CHOOSE`)
                  : spouseAgeError
                  ? t(`DEATH_ERROR_SPOUSE_AGE_CHOOSE`)
                  : setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
      </FormStep>
    </React.Fragment>
  );
};
export default FamilyInformationDeath;
