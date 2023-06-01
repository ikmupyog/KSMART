import React, { useState, useReducer, useEffect, useCallback } from "react";
import Timeline from "../../components/NACTimeline";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  LinkButton,
  UploadFile,
  DatePicker,
  BackButton,
  MultiLink,
  CheckBox,
  TextArea,
  Toast,
  Table,
  RadioButtons,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { trimURL } from "../../utils";

const BirthNACInitiator = ({ config, onSelect, userType, formData, isEditStillBirth = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  let validation = {};
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const { name: name } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const [initiatorNameEn, setinitiatorNameEn] = useState(
    formData?.BirthNACInitiator?.initiatorNameEn ? formData?.BirthNACInitiator?.initiatorNameEn : ""
  );
  const [initiatorAadhar, setinitiatorAadhar] = useState(
    formData?.BirthNACInitiator?.initiatorAadhar ? formData?.BirthNACInitiator?.initiatorAadhar : ""
  );
  const [initiatorMobile, setinitiatorMobile] = useState(
    formData?.BirthNACInitiator?.initiatorMobile ? formData?.BirthNACInitiator?.initiatorMobile : ""
  );
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.BirthNACInitiator?.initiatorDesi ? formData?.BirthNACInitiator?.initiatorDesi : "");
  const [initiatorAddress, setinitiatorAddress] = useState(
    formData?.BirthNACInitiator?.initiatorAddress ? formData?.BirthNACInitiator?.initiatorAddress : ""
  );
  const [careofapplicant, setcareofapplicant] = useState(
    formData?.BirthNACInitiator?.careofapplicant ? formData?.BirthNACInitiator?.careofapplicant : ""
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [dob, setChildDOB] = useState(formData?.BirthNACInitiator?.dob ? formData?.BirthNACInitiator?.dob : "");
  const [sex, selectGender] = useState(formData?.BirthNACInitiator?.sex ? formData?.BirthNACInitiator?.sex : "");
  const [childNameEn, setchildNameEn] = useState(formData?.BirthNACInitiator?.childNameEn ? formData?.BirthNACInitiator?.childNameEn : "");
  const [childNameMl, setchildNameMl] = useState(formData?.BirthNACInitiator?.childNameMl ? formData?.BirthNACInitiator?.childNameMl : "");
  const [nacorderofChildren, setorderOfBirth] = useState(
    formData?.BirthNACInitiator?.nacorderofChildren ? formData?.BirthNACInitiator?.nacorderofChildren : ""
  );
  const [isAlive, setisAlive] = useState(formData?.BirthNACInitiator?.isAlive ? formData?.BirthNACInitiator?.isAlive : "");
  const [slNo, setslNo] = useState();
  const [uploadedFile, setUploadedFile] = useState(formData?.BirthNACInitiator?.uploadedFile ? formData?.BirthNACInitiator?.uploadedFile : null);
  const [uploadedFile1, setUploadedFile1] = useState(formData?.BirthNACInitiator?.uploadedFile1);
  const [uploadedFile2, setUploadedFile2] = useState(formData?.BirthNACInitiator?.uploadedFile2);
  const [uploadedFile3, setUploadedFile3] = useState(formData?.BirthNACInitiator?.uploadedFile3);
  const [uploadedFile4, setUploadedFile4] = useState(formData?.BirthNACInitiator?.uploadedFile4);
  const [uploadedFile5, setUploadedFile5] = useState(formData?.BirthNACInitiator?.uploadedFile5);
  const [aadressFile, setAadressFile] = useState(formData?.BirthNACInitiator?.uploadedFile ? formData?.BirthNACInitiator?.uploadedFile : null);
  const [proofFile, setProofFile] = useState(formData?.BirthNACInitiator?.uploadedFile1);
  const [certificateFile, setCertificateFile] = useState(formData?.BirthNACInitiator?.uploadedFile2);
  const [motherIdFile, setMotherIdFile] = useState(formData?.BirthNACInitiator?.uploadedFile3);
  const [fatherIdFile, setFatherIdFile] = useState(formData?.BirthNACInitiator?.uploadedFile4);
  const [medicalFile, setMedicalFile] = useState(formData?.BirthNACInitiator?.uploadedFile5);
  const [docPreview, setDocPreview] = useState(formData?.BirthNACInitiator?.docPreview ? formData?.BirthNACInitiator?.docPreview : null);
  const [proofFileDocPreview, setProofFileDocPreview] = useState(
    formData?.BirthNACInitiator?.docPreview ? formData?.BirthNACInitiator?.docPreview : null
  );
  const [certificateFiledocPreview, setCertificateFileDocPreview] = useState(
    formData?.BirthNACInitiator?.docPreview ? formData?.BirthNACInitiator?.docPreview : null
  );
  const [motherIdFiledocPreview, setMotherIdFileDocPreview] = useState(
    formData?.BirthNACInitiator?.docPreview ? formData?.BirthNACInitiator?.docPreview : null
  );
  const [fatherIdFiledocPreview, setFatherIdFileDocPreview] = useState(
    formData?.BirthNACInitiator?.docPreview ? formData?.BirthNACInitiator?.docPreview : null
  );
  const [medicalFiledocPreview, setMedicalFileDocPreview] = useState(
    formData?.BirthNACInitiator?.docPreview ? formData?.BirthNACInitiator?.docPreview : null
  );

  const [toast, setToast] = useState(false);
  const [DobMissmatchError, setDOBMissmatchError] = useState(false);
  const [OrderofBirthMissmatchError, setOrderofBirthMissmatchError] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.BirthNACInitiator?.initiatorNameEn ? false : false);
  const [initiatorAadharError, setinitiatorAadharError] = useState(formData?.BirthNACInitiator?.initiatorAadhar ? false : false);
  const [initiatorMobileError, setinitiatorMobileError] = useState(formData?.BirthNACInitiator?.initiatorMobile ? false : false);
  const [initiatorAddressError, setinitiatorAddressError] = useState(formData?.BirthNACInitiator?.initiatorAddress ? false : false);
  const [formDatalocal, setFormDatalocal] = useState(formData?.TradeDetails);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [AadharError, setAadharError] = useState(formData?.BirthNACParentsDetails?.motherAadhar ? false : false);
  const [error, setError] = useState(null);
  const [proofError, setProofError] = useState(null);
  const [certificateError, setCertificateError] = useState(null);
  const [motherIdError, setMotherIdError] = useState(null);
  const [fatherIderror, setFatherIdError] = useState(null);
  const [medicalError, setMedicalError] = useState(null);
  const storedAppData = null;
  const storedOwnerData = null;
  let menu = [];
  let orderMenu = [
    { i18nKey: `Yes`, code: "Yes", value: true },
    { i18nKey: `No`, code: "No", value: false },
  ];

  let ownerappmap = {
    slNo: "slNo",
    sex: "sex",
    dob: "dob",
    childNameEn: "childNameEn",
    childNameMl: "childNameMl",
    nacorderofChildren: "nacorderofChildren",
    isAlive: "isAlive",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_APPLICANT":
        return [
          ...state,
          {
            slNo: "",
            sex: "",
            dob: "dob",
            childNameEn: "",
            childNameMl: "",
            nacorderofChildren: "",
            isAlive: false,
          },
        ];
      case "REMOVE_APPLICANT":
        return state.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_APP":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
      case "EDIT_CURRENT_SELECT_APP":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
    }
  };

  const reducerowner = (state, action) => {
    switch (action.type) {
      case "ADD_OWNER":
        return [
          ...state,
          {
            slNo: "",
            sex: "",
            dob: null,
            childNameEn: "",
            childNameMl: "",
            nacorderofChildren: "",
            isAlive: false,
          },
        ];
      case "REMOVE_OWNER":
        return state.filter((e, i) => i !== action?.payload?.index);
      case "EDIT_CURRENT_OWNER":
        return state.map((data, __index) => {
          if (__index === action.payload.index) {
            return { ...data, [action.payload.key]: action.payload.value };
          } else {
            return data;
          }
        });
    }
  };

  const initowner = () => {
    if (formData?.BirthNACInitiator?.ownerState) {
      return formData?.BirthNACInitiator?.ownerState;
    } else {
      return [
        {
          slNo: "",
          sex: formData?.BirthNACDetails?.gender,
          dob: formData?.BirthNACDetails?.childDOB,
          childNameEn: formData?.BirthNACDetails?.childFirstNameEn,
          childNameMl: formData?.BirthNACDetails?.childFirstNameMl,
          nacorderofChildren: formData?.BirthNACDetails?.nacorderofChildren,
          isAlive: false,
        },
      ];
    }
  };

  const initapplicant = () => {
    return [
      {
        slNo: "",
        sex: formData?.BirthNACDetails?.gender,
        dob: "dob",
        childNameEn: "",
        childNameMl: "",
        nacorderofChildren: "",
        isAlive: false,
      },
    ];
  };
  const [ownerState, disptachowner] = useReducer(reducerowner, storedOwnerData, initowner);

  const [appState, dispatchapplicant] =
    formDatalocal?.tradeLicenseDetail?.owners?.length > 0
      ? useReducer(reducer, storedAppData, initapplicantedit)
      : useReducer(reducer, storedAppData, initapplicant);

  const handleOwnerInputField = useCallback(
    (index, e, key, length = 100) => {
      if (e.length === 0) {
        disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: "" } });
        return;
      }
      if (e.length <= length || typeof e === "object" || typeof e === "boolean")
        disptachowner({ type: "EDIT_CURRENT_OWNER", payload: { index, key, value: e } });
      else return;
    },
    [disptachowner]
  );
  const fetchFile = async (fileId) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([fileId], tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: trimURL(key.url.split(",")[1]), small: trimURL(key.url.split(",")[2]), key: key.id, type: fileType, pdfUrl: trimURL(key.url) };
    });
    return newThumbnails;
  };

  const onSkip = () => onSelect();
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setchildNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setchildNameMl("");
    } else {
      setchildNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }

  function setSelectinitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z,-0-9, ]*$") != null) {
      setinitiatorAddress(e.target.value.length <= 100 ? e.target.value : e.target.value.substring(0, 200));
    }
  }

  function setselectCareofApplicant(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setcareofapplicant(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectinitiatorAadhar(e) {
    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12);
    if (newValue === formData?.BirthNACParentsDetails.motherAadhar && newValue === formData?.BirthNACParentsDetails.fatherAadhar) {
      setinitiatorAadhar("");
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setinitiatorAadhar(newValue);
    }
  }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length != 0) {
      setinitiatorMobile(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
    }
  }

  function selectfile(e) {
    setAadressFile(e.target.files[0]);
  }
  function selectfile1(e) {
    setProofFile(e.target.files[0]);
  }
  function selectfile2(e) {
    setCertificateFile(e.target.files[0]);
  }
  function selectfile3(e) {
    setMotherIdFile(e.target.files[0]);
  }
  function selectfile4(e) {
    setFatherIdFile(e.target.files[0]);
  }
  function selectfile5(e) {
    setMedicalFile(e.target.files[0]);
  }

  useEffect(() => {
    (async () => {
      setError(null);
      if (aadressFile) {
        if (aadressFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", aadressFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setDocPreview(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [aadressFile]);

  useEffect(() => {
    (async () => {
      setProofError(null);
      if (proofFile) {
        if (proofFile.size >= 2000000) {
          setProofError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", proofFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile1(response?.data?.files[0]?.fileStoreId);
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setProofFileDocPreview(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [proofFile]);
  useEffect(() => {
    (async () => {
      setCertificateError(null);
      if (certificateFile) {
        if (certificateFile.size >= 2000000) {
          setCertificateError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", certificateFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile2(response?.data?.files[0]?.fileStoreId);
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setCertificateFileDocPreview(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [certificateFile]);
  useEffect(() => {
    (async () => {
      setMotherIdError(null);
      if (motherIdFile) {
        if (motherIdFile.size >= 2000000) {
          setMotherIdError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", motherIdFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile3(response?.data?.files[0]?.fileStoreId);
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setMotherIdFileDocPreview(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [motherIdFile]);
  useEffect(() => {
    (async () => {
      setFatherIdError(null);
      if (fatherIdFile) {
        if (fatherIdFile.size >= 2000000) {
          setFatherIdError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", fatherIdFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile4(response?.data?.files[0]?.fileStoreId);
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setFatherIdFileDocPreview(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [fatherIdFile]);
  useEffect(() => {
    (async () => {
      setMedicalError(null);
      if (medicalFile) {
        if (medicalFile.size >= 2000000) {
          setMedicalError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", medicalFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile5(response?.data?.files[0]?.fileStoreId);
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setMedicalFileDocPreview(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [medicalFile]);
  let validFlag = true;
  const goNext = () => {
    if (initiatorNameEn == null || initiatorNameEn == "" || initiatorNameEn == undefined) {
      validFlag = false;
      setinfomantFirstNmeEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantFirstNmeEnError(false);
    }

    if (initiatorAadhar != null || initiatorAadhar != "" || initiatorAadhar != undefined) {
      let adharLength = initiatorAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setinitiatorAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorAadharError(false);
      }
    } else {
      validFlag = false;
      setinitiatorAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (initiatorMobile != null || initiatorMobile != "" || initiatorMobile != undefined) {
      let mobileLength = initiatorMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setinitiatorMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorMobileError(false);
      }
    } else {
      validFlag = false;
      setinitiatorMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (initiatorAddress === null || initiatorAddress === "" || initiatorAddress === undefined) {
      validFlag = false;
      setinitiatorAddressError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinitiatorAddressError(false);
    }
    const dobDate = new Date(ownerState[0].dob).toISOString().split("T")[0];
    if (new Date(formData?.BirthNACDetails?.childDOB).getTime() != new Date(dobDate).getTime()) {
      validFlag = false;
      setDOBMissmatchError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (parseInt(formData?.BirthNACDetails?.nacorderofChildren) !== parseInt(ownerState[0].nacorderofChildren)) {
      validFlag = false;
      setOrderofBirthMissmatchError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }

    if (validFlag == true) {
      onSelect(config.key, {
        initiatorNameEn: initiatorNameEn.trim(),
        initiatorAadhar,
        initiatorMobile,
        initiatorDesi,
        initiatorAddress,
        ownerState,
        careofapplicant: careofapplicant.trim(),
        uploadedFile,
        uploadedFile1,
        uploadedFile2,
        uploadedFile3,
        uploadedFile4,
        uploadedFile5,
        aadressFile,
        proofFile,
        certificateFile,
        motherIdFile,
        fatherIdFile,
        medicalFile,
        docPreview,
      });
    }
  };

  const handleTextInputField1 = useCallback(
    (index, e, key, length = 100) => {
      if (e.length <= length) {
        disptachowner({ type: "EDIT_CURRENT_DOORNO", payload: { index, key, value: e } });
        setFlgCheck(false);
        setFlgCheckDoor(false);
      } else return;
    },
    [disptachowner]
  );

  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={
          !initiatorNameEn ||
          !initiatorAadhar ||
          !initiatorMobile ||
          !initiatorAddress ||
          ownerState[0].dob === null ||
          ownerState[0].childNameEn === "" ||
          ownerState[0].childNameMl === "" ||
          ownerState[0].sex === "" ||
          ownerState[0].nacorderofChildren === "" ||
          ownerState[0].isAlive === "" ||
          !aadressFile ||
          !proofFile ||
          !motherIdFile ||
          !fatherIdFile
        }
      >
        <div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>Applicant</span>{" "}
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CS_COMMON_AADHAAR")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="initiatorAadhar"
                  value={initiatorAadhar}
                  onChange={setSelectinitiatorAadhar}
                  disable={isDisableEdit}
                  placeholder={`${t("CS_COMMON_AADHAAR")}`}
                  {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>

              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_INITIATOR_NAME")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="initiatorNameEn"
                  value={initiatorNameEn}
                  onChange={setSelectinitiatorNameEn}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_INITIATOR_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_IS_CAREOF")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="careofapplicant"
                  value={careofapplicant}
                  onChange={setselectCareofApplicant}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_IS_CAREOF")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_MOBILE_NO")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"number"}
                  optionKey="i18nKey"
                  name="initiatorMobile"
                  value={initiatorMobile}
                  onChange={setSelectinitiatorMobile}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_MOBILE_NO")}`}
                  {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_INFORMER_ADDRESS")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextArea
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="initiatorAddress"
                  isMandatory={true}
                  value={initiatorAddress}
                  onChange={setSelectinitiatorAddress}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                  {...(validation = { pattern: "^[a-zA-Z,-0-9, ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{t("Details of the Children born including the applicant child")}</span>{" "}
              </h1>
            </div>
          </div>
          {ownerState.map((field, index) => {
            return (
              <div key={`${field}-${index}`}>
                <div
                  style={{
                    border: "solid",
                    borderRadius: "10px",
                    marginTop: "5px",
                    borderColor: "#f3f3f3",
                    background: "#FAFAFA",
                  }}
                  className="col-md-12"
                >
                  <div className="row">
                    <div className="col-md-3">
                      <CardLabel>
                        {t("SL NO")}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        //isMandatory={true}
                        type={"number"}
                        optionKey="i18nKey"
                        name="slNo"
                        value={field?.slNo ? field.slNo : index + 1}
                        //onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^0-9]/gi, ""), "slNo")}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>
                        {`${t("CR_DATE_OF_BIRTH_TIME")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <DatePicker
                        //isMandatory={true}
                        date={field?.dob}
                        name="dob"
                        max={convertEpochToDate(new Date())}
                        onChange={(e) => handleOwnerInputField(index, e, "dob")}
                        inputFormat="DD-MM-YYYY"
                        placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                        {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>
                        {`${t("CR_NAME")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        //isMandatory={true}
                        type={"text"}
                        optionKey="i18nKey"
                        name="childNameEn"
                        value={field?.childNameEn}
                        onChange={(e) => handleOwnerInputField(index, e.target.value.replace("^[a-zA-Z-.`' ]*$", ""), "childNameEn")}
                        disable={isEdit}
                        placeholder="Name"
                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: "Name" })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>
                        {`${t("CR_NAME_ML")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        //isMandatory={true}
                        type={"text"}
                        optionKey="i18nKey"
                        name="childNameMl"
                        value={field?.childNameMl}
                        onChange={(e) =>
                          handleOwnerInputField(index, e.target.value.replace(/[^\u0D00-\u0D7F\u200D\u200C .&'@']/g, ""), "childNameMl")
                        }
                        disable={isEdit}
                        placeholder={`${t("CR_FIRST_NAME_ML")}`}
                        {...(validation = {
                          pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                          isRequired: true,
                          type: "text",
                          title: t("CR_INVALID_NAME_ML"),
                        })}
                      />
                    </div>
                    {/* </div>
                    <div className="row"> */}
                    <div className="col-md-3">
                      <CardLabel>
                        {`${t("CR_GENDER")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <Dropdown
                        t={t}
                        optionKey="code"
                        //isMandatory={true}
                        option={menu}
                        selected={field?.sex}
                        // select={setselectGender}
                        placeholder={`${t("CR_GENDER")}`}
                        select={(e) => handleOwnerInputField(index, e, "sex")}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <CardLabel>
                      {`${t("ORDER_OF_BIRTH")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      //isMandatory={true}
                      type={"text"}
                      optionKey="i18nKey"
                      name="nacorderofChildren"
                      value={field?.nacorderofChildren}
                      onChange={(e) => handleOwnerInputField(index, e.target.value.replace(/[^0-9]/gi, ""), "nacorderofChildren")}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>
                      {`${t("CR_ALIVE")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    {/* <CheckBox
                        t={t}
                        label={field.isAlive ? "Yes" : "NO"}
                        name="isAlive"
                        onChange={(e) => handleOwnerInputField(index, e.target.checked, "isAlive")}
                        value={field?.isAlive}
                        checked={field?.isAlive}
                      /> */}
                    <Dropdown
                      t={t}
                      optionKey="code"
                      //isMandatory={true}
                      option={orderMenu}
                      selected={field?.isAlive}
                      // select={setselectGender}
                      //placeholder={`${t("CR_GENDER")}`}
                      select={(e) => handleOwnerInputField(index, e, "isAlive")}
                    />
                  </div>
                  {ownerState.length === index + 1 && (
                    <div className="col-md-1">
                      <CardLabel>Add</CardLabel>
                      <LinkButton
                        label={
                          <svg className="icon  icon--plus" viewBox="0 0 122.88 122.88" width="30" height="30">
                            <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z" />
                          </svg>
                        }
                        onClick={(e) =>
                          disptachowner({
                            type: "ADD_OWNER",
                            payload: {
                              slNo: slNo,
                              sex: sex,
                              dob: dob,
                              childNameEn: childNameEn,
                              childNameMl: childNameMl,
                              nacorderofChildren: nacorderofChildren,
                              isAlive: isAlive,
                            },
                          })
                        }
                      />
                    </div>
                  )}
                  {ownerState.length > 1 && (
                    <div className="col-md-1">
                      <CardLabel>Remove</CardLabel>
                      <LinkButton
                        label={
                          <svg viewBox="0 0 1024 1024" width="30" height="30">
                            {" "}
                            <g>
                              {" "}
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M800 256h-576a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32H256v576a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320h32a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32zM448 799.36a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0z m192 0a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0zM800 128H640v-32a32.64 32.64 0 0 0-32-32h-192a32 32 0 0 0-32 32V128H224a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32h576a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32z"
                              />{" "}
                            </g>{" "}
                          </svg>
                        }
                        onClick={(e) => disptachowner({ type: "REMOVE_OWNER", payload: { index } })}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1" style={{ marginTop: "30px" }}>
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SUPPORTING_DOC")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <CardLabel>
                    {`${t("CR_NAC_DOWNLOAD_ADDRESS_PROOF_PARENTS")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                </div>
                <div className="col-md-3">
                  <UploadFile
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile}
                    onDelete={() => {
                      setUploadedFile(null);
                    }}
                    message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
                <div className="col-md-3">
                  {error ? <p style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{error}</p> : ""}
                </div>
                {docPreview && (
                  <div className="col-md-2">
                    {_.head(docPreview)?.type === "pdf" ? (
                      <React.Fragment>
                        <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(docPreview)?.pdfUrl} alt="Other Certificate Pdf" />
                      </React.Fragment>
                    ) : (
                      <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(docPreview)?.small} alt="Other Certificate Image" />
                    )}
                    <a target="_blank" href={_.head(docPreview)?.type === "pdf" ? _.head(docPreview)?.pdfUrl : _.head(docPreview)?.large}>
                      Preview
                    </a>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <CardLabel>
                    {`${t("CR_NAC_DOWNLOAD_BIRTH_SHOWING_DATE_PLACE")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                </div>
                <div className="col-md-3">
                  <UploadFile
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile1}
                    onDelete={() => {
                      setUploadedFile1(null);
                    }}
                    message={uploadedFile1 ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
                <div className="col-md-3">
                  {proofError ? (
                    <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{proofError}</div>
                  ) : (
                    ""
                  )}
                </div>
                {proofFileDocPreview && (
                  <div className="col-md-2">
                    {_.head(proofFileDocPreview)?.type === "pdf" ? (
                      <React.Fragment>
                        <object
                          style={{ margin: "5px 0" }}
                          height={120}
                          width={100}
                          data={_.head(proofFileDocPreview)?.pdfUrl}
                          alt="Other Certificate Pdf"
                        />
                      </React.Fragment>
                    ) : (
                      <img
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        src={_.head(proofFileDocPreview)?.small}
                        alt="Other Certificate Image"
                      />
                    )}
                    <a
                      target="_blank"
                      href={_.head(proofFileDocPreview)?.type === "pdf" ? _.head(proofFileDocPreview)?.pdfUrl : _.head(proofFileDocPreview)?.large}
                    >
                      Preview
                    </a>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_NAC_DOWNLOAD_SCHOOL_CERTIFICATE")}`}</CardLabel>
                </div>
                <div className="col-md-3">
                  <UploadFile
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile2}
                    onDelete={() => {
                      setUploadedFile2(null);
                    }}
                    message={uploadedFile2 ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
                <div className="col-md-3">
                  {certificateError ? (
                    <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{certificateError}</div>
                  ) : (
                    ""
                  )}
                </div>
                {certificateFiledocPreview && (
                  <div className="col-md-2">
                    {_.head(certificateFiledocPreview)?.type === "pdf" ? (
                      <React.Fragment>
                        <object
                          style={{ margin: "5px 0" }}
                          height={120}
                          width={100}
                          data={_.head(certificateFiledocPreview)?.pdfUrl}
                          alt="Other Certificate Pdf"
                        />
                      </React.Fragment>
                    ) : (
                      <img
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        src={_.head(certificateFiledocPreview)?.small}
                        alt="Other Certificate Image"
                      />
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(certificateFiledocPreview)?.type === "pdf"
                          ? _.head(certificateFiledocPreview)?.pdfUrl
                          : _.head(certificateFiledocPreview)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <CardLabel>
                    {`${t("CR_NAC_DONWLOAD_ID_PROOF_OF_MOTHER")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                </div>
                <div className="col-md-3">
                  <UploadFile
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile3}
                    onDelete={() => {
                      setUploadedFile3(null);
                    }}
                    message={uploadedFile3 ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
                <div className="col-md-3">
                  {motherIdError ? (
                    <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{motherIdError}</div>
                  ) : (
                    ""
                  )}
                </div>
                {motherIdFiledocPreview && (
                  <div className="col-md-2">
                    {_.head(motherIdFiledocPreview)?.type === "pdf" ? (
                      <React.Fragment>
                        <object
                          style={{ margin: "5px 0" }}
                          height={120}
                          width={100}
                          data={_.head(motherIdFiledocPreview)?.pdfUrl}
                          alt="Other Certificate Pdf"
                        />
                      </React.Fragment>
                    ) : (
                      <img
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        src={_.head(motherIdFiledocPreview)?.small}
                        alt="Other Certificate Image"
                      />
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(motherIdFiledocPreview)?.type === "pdf"
                          ? _.head(motherIdFiledocPreview)?.pdfUrl
                          : _.head(motherIdFiledocPreview)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <CardLabel>
                    {`${t("CR_NAC_DONWLOAD_ID_PROOF_OF_FATHER")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                </div>
                <div className="col-md-3">
                  <UploadFile
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile4}
                    onDelete={() => {
                      setUploadedFile4(null);
                    }}
                    message={uploadedFile4 ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
                <div className="col-md-3">
                  {fatherIderror ? (
                    <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{fatherIderror}</div>
                  ) : (
                    ""
                  )}
                </div>
                {fatherIdFiledocPreview && (
                  <div className="col-md-2">
                    {_.head(fatherIdFiledocPreview)?.type === "pdf" ? (
                      <React.Fragment>
                        <object
                          style={{ margin: "5px 0" }}
                          height={120}
                          width={100}
                          data={_.head(fatherIdFiledocPreview)?.pdfUrl}
                          alt="Other Certificate Pdf"
                        />
                      </React.Fragment>
                    ) : (
                      <img
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        src={_.head(fatherIdFiledocPreview)?.small}
                        alt="Other Certificate Image"
                      />
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(fatherIdFiledocPreview)?.type === "pdf"
                          ? _.head(fatherIdFiledocPreview)?.pdfUrl
                          : _.head(fatherIdFiledocPreview)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_NAC_DOWNLOAD_MEDICAL_CERTIFICATE_DIFFERENTLY_ABLED")}`}</CardLabel>
                </div>
                <div className="col-md-3">
                  <UploadFile
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile5}
                    onDelete={() => {
                      setUploadedFile5(null);
                    }}
                    message={uploadedFile5 ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
                <div className="col-md-3">
                  {medicalError ? (
                    <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{medicalError}</div>
                  ) : (
                    ""
                  )}
                </div>
                {medicalFiledocPreview && (
                  <div className="col-md-2">
                    {_.head(medicalFiledocPreview)?.type === "pdf" ? (
                      <React.Fragment>
                        <object
                          style={{ margin: "5px 0" }}
                          height={120}
                          width={100}
                          data={_.head(medicalFiledocPreview)?.pdfUrl}
                          alt="Other Certificate Pdf"
                        />
                      </React.Fragment>
                    ) : (
                      <img
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        src={_.head(medicalFiledocPreview)?.small}
                        alt="Other Certificate Image"
                      />
                    )}
                    <a
                      target="_blank"
                      href={
                        _.head(medicalFiledocPreview)?.type === "pdf" ? _.head(medicalFiledocPreview)?.pdfUrl : _.head(medicalFiledocPreview)?.large
                      }
                    >
                      Preview
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          {toast && (
            <Toast
              error={
                infomantFirstNmeEnError ||
                initiatorAadharError ||
                initiatorMobileError ||
                initiatorAddressError ||
                DobMissmatchError ||
                OrderofBirthMissmatchError
              }
              label={
                infomantFirstNmeEnError ||
                initiatorAadharError ||
                initiatorMobileError ||
                initiatorAddressError ||
                DobMissmatchError ||
                OrderofBirthMissmatchError
                  ? infomantFirstNmeEnError
                    ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                    : initiatorAadharError
                    ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                    : initiatorMobileError
                    ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                    : initiatorAddressError
                    ? t(`BIRTH_ERROR_INFORMANT_ADDRESS_CHOOSE`)
                    : DobMissmatchError
                    ? t(`BIRTH_NAC_DATE_OF_BIRTH_MISSMATCH`)
                    : OrderofBirthMissmatchError
                    ? t(`BIRTH_NAC_ORDER_OF_BIRTH_MISSMATCH`)
                    : AadharError
                    ? t(`CS_COMMON_DUPLICATE_AADHAR_NO`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default BirthNACInitiator;
