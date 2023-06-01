import React, { useState, useEffect } from "react";
import Timeline from "../../components/NACDRTimeline";
import { FormStep, CardLabel, TextInput, Dropdown, LinkButton, UploadFile, BackButton, MultiLink, CheckBox, TextArea, Toast, Table } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const DeathNACInitiatorDetails = ({ config, onSelect, userType, formData, isEditStillBirth = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const [isDisableEdit1, setisDisableEdit1] = useState(false);
  const { name: name, } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.InitiatorinfoDetails?.isInitiatorDeclaration : formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration : false);
  const [isDeclaration, setDeclaration] = useState(formData?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.InitiatorinfoDetails?.isInitiatorDeclaration : formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration : false);
  const [initiatorNameEn, setinitiatorNameEn] = useState(formData?.DeathNACInitiator?.initiatorNameEn ? formData?.DeathNACInitiator?.initiatorNameEn : "");
  const [initiatorAadhar, setinitiatorAadhar] = useState(formData?.DeathNACInitiator?.initiatorAadhar ? formData?.DeathNACInitiator?.initiatorAadhar : "");
  const [initiatorMobile, setinitiatorMobile] = useState(formData?.DeathNACInitiator?.initiatorMobile ? formData?.DeathNACInitiator?.initiatorMobile : "");
  const [initiatorEmail, setinitiatorEmail] = useState(formData?.DeathNACInitiator?.initiatorEmail ? formData?.DeathNACInitiator?.initiatorEmail :  "");
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.DeathNACInitiator?.initiatorDesi ? formData?.DeathNACInitiator?.initiatorDesi :  "");
  const [initiatorAddress, setinitiatorAddress] = useState(formData?.DeathNACInitiator?.initiatorAddress ? formData?.DeathNACInitiator?.initiatorAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(formData?.DeathNACInitiator?.uploadedFile ? formData?.DeathNACInitiator?.uploadedFile : null);
  const [uploadedFile1, setUploadedFile1] = useState(formData?.DeathNACInitiator?.uploadedFile1 ? formData?.DeathNACInitiator?.uploadedFile1 : null);
  const [uploadedFile2, setUploadedFile2] = useState(formData?.DeathNACInitiator?.uploadedFile2 ? formData?.DeathNACInitiator?.uploadedFile2 : null);
  const [uploadedFile3, setUploadedFile3] = useState(formData?.DeathNACInitiator?.uploadedFile3 ? formData?.DeathNACInitiator?.uploadedFile3 : null);
  const [uploadedFile4, setUploadedFile4] = useState(formData?.DeathNACInitiator?.uploadedFile4 ? formData?.DeathNACInitiator?.uploadedFile4 : null);
  const [uploadedFile5, setUploadedFile5] = useState(formData?.DeathNACInitiator?.uploadedFile5 ? formData?.DeathNACInitiator?.uploadedFile5 : null);
  const [uploadedFile6, setUploadedFile6] = useState(formData?.DeathNACInitiator?.uploadedFile6 ? formData?.DeathNACInitiator?.uploadedFile6 : null);
  const [file, setFile] = useState(formData?.DeathNACInitiator?.docType1);
  const [file1, setFile1] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file2, setFile2] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file3, setFile3] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file4, setFile4] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file5, setFile5] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file6, setFile6] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [toast, setToast] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? false : false);
  const [initiatorAadharError, setinitiatorAadharError] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? false : false);
  const [initiatorAadharMissmatch, setinitiatorAadharMissmatch] = useState(false);
  const [initiatorMobileError, setinitiatorMobileError] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? false : false);
  const [initiatorEmailError, setinitiatorEmailError] = useState(formData?.InitiatorinfoDetails?.initiatorEmail ? false : false);
  const [initiatorDesiError, setinitiatorDesiError] = useState(formData?.InitiatorinfoDetails?.initiatorDesi ? false : false);
  const [RelationwithDeceased, setRelationwithDeceased] = useState(formData?.DeathNACInitiator?.RelationwithDeceased ? formData?.DeathNACInitiator?.RelationwithDeceased :  "");
  const onSkip = () => onSelect();
  const selectedRelation = [
    { label: "Father", value: "FATHER" },
    { label: "Mother", value: "MOTHER" },
    { label: "Son", value: "SON" },
    { label: "Daughter", value: "DAUGHTER" },
    { label: "Wife", value: "WIFE" },
    { label: "Husband", value: "HUSBAND" },
    { label: "other", value: "OTHER" },
  ]
  const docType1 = "Address proof of deceased at the time of death";
  const docType2 = "ID CARD OF APPLICANT";
  const docType3 = "ID proof of father/mother/spouse";
  const docType4 = "PROOF OF DEATH";
  const docType5 = "Declaration by Applicant  Stating that death occured in this ulb area, DOD. Place of Death, and address at the time of death counter signed by gazetted officer";
  const docType6 = "Declaration by a credible person stating the event occured with in the jurisdiction of local body concerned";
  const docType7 = "Declaration by another credible person stating the event occured with in the jurisdiction of local body concerned";

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.InitiatorinfoDetails?.isInitiatorDeclaration != null) {
        setIsInitialRender(false);
        setisInitiatorDeclaration(formData?.InitiatorinfoDetails?.isInitiatorDeclaration);
      }
    }
  }, [isInitialRender]);

  // function setSelectrelation(e) {
  //   if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
  //     setrelation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
  //   }
  // }

  function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }
  const selectRelationwithDeceased = (value) => {
    console.log("value", value.value);
    setRelationwithDeceased(value.value);
    if (value.value === "FATHER") {
      setinitiatorAadhar(formData?.DeathNACParentsDetails?.fatherAadhar);
      setisDisableEdit1(true);
    }
    else if (value.value === "MOTHER") {
      setinitiatorAadhar(formData?.DeathNACParentsDetails?.motherAadhar);
      setisDisableEdit1(true);
    }else if (value.value === "WIFE" || value.value === "HUSBAND") {
      setinitiatorAadhar(formData?.DeathNACParentsDetails?.SpouseAadhaar);
      setisDisableEdit1(true);
    }
    else {
      setinitiatorAadhar("");
      setisDisableEdit1(false);
    }
  }


  function setSelectinitiatorAadhar(e) {

    const newValue = e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12);
    if (newValue.length === 12 && RelationwithDeceased === "FATHER") {
      if (newValue === formData?.DeathNACParentsDetails?.fatherAadhar || formData?.DeathNACParentsDetails?.fatherAadhar ) {
        setinitiatorAadhar(newValue);
      }
      else {
        setinitiatorAadhar("");
        setinitiatorAadharMissmatch(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    }
    else if (newValue.length === 12 && RelationwithDeceased === "MOTHER") {
      if (newValue === formData?.DeathNACParentsDetails?.motherAadhar || formData?.DeathNACParentsDetails?.motherAadhar) {
        setinitiatorAadhar(newValue);
      }
      else {
        setinitiatorAadhar("");
        setinitiatorAadharMissmatch(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    }
    else if (newValue.length === 12 && RelationwithDeceased === "WIFE" || RelationwithDeceased === "HUSBAND") {
      if (newValue === formData?.DeathNACParentsDetails?.SpouseAadhaar || formData?.DeathNACParentsDetails?.SpouseAadhaar) {
        setinitiatorAadhar(newValue);
      }
      else {
        setinitiatorAadhar("");
        setinitiatorAadharMissmatch(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    }
    else {
      if (newValue.length === 12 && newValue === formData?.DeathNACParentsDetails?.SpouseAadhaar || newValue === formData?.DeathNACParentsDetails?.motherAadhar || newValue === formData?.DeathNACParentsDetails?.fatherAadhar || newValue === formData?.DeathNACDetails?.DeceasedAadharNumber) {
        setinitiatorAadhar("");
        setinitiatorAadharMissmatch(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
      else {
        setinitiatorAadhar(newValue);
      }
    }
  }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }
  function setSelectinitiatorEmail(e) {
    if (e.target.value.trim().length === 51 || e.target.value.trim() === ".") {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setinitiatorEmail(e.target.value.trim());
    }
    // if (e.target.value.trim().length >= 0 && !(e.target.value.includes("@") && e.target.value.includes("."))) {
    //   setinitiatorEmail(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    // }
    // setinitiatorEmail(e.target.value);

    // if(value.length && !(value.includes("@") && value.includes("."))){
    //   setErrors({...errors, emailAddress: {type: "pattern", message: "CORE_COMMON_PROFILE_EMAIL_INVALID"}})
    // }else{
    //   setErrors({...errors, emailAddress : null})
    // }
    // if (e.target.value.trim().length != 0) {
    //   setinitiatorEmail(e.target.value, '')).substring(0, 10));
    // }
  }

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }
  function setDeclarationStatement(e) {
    if (e.target.checked == false) {
      setDeclaration(e.target.checked);
    } else {
      setDeclaration(e.target.checked);
    }
  }
  function selectfile(e) {
    setFile(e.target.files[0]);
  }
  function selectfile1(e) {
    setFile1(e.target.files[0]);
  }
  function selectfile2(e) {
    setFile2(e.target.files[0]);
  }
  function selectfile3(e) {
    setFile3(e.target.files[0]);
  }
  function selectfile4(e) {
    setFile4(e.target.files[0]);
  }
  function selectfile5(e) {
    setFile5(e.target.files[0]);
  }
  function selectfile6(e) {
    setFile6(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", file, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (file1) {
        if (file1.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", file1, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile1(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file1]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (file2) {
        if (file2.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", file2, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile2(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file2]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (file3) {
        if (file3.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", file3, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile3(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file3]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (file4) {
        if (file4.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", file4, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile4(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file4]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (file5) {
        if (file5.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", file5, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile5(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file5]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (file6) {
        if (file6.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", file6, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile6(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file6]);
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
      console.log(adharLength);
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

    if (validFlag == true) {

      onSelect(config.key, {
        // relation,
        initiatorNameEn,
        initiatorAadhar,
        initiatorMobile,
        initiatorDesi,
        initiatorAddress,
        isInitiatorDeclaration,
        initiatorEmail,
        RelationwithDeceased,
        uploadedFile,
        uploadedFile1,
        uploadedFile2,
        uploadedFile3,
        uploadedFile4,
        uploadedFile5,
        uploadedFile6,
        docType1,
        docType2,
        docType3,
        docType4,
        docType5,
        docType6,
        docType7,
      });
    }
  };
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={!isInitiatorDeclaration || !isDeclaration || !initiatorNameEn || !initiatorAadhar || !initiatorMobile || !uploadedFile || !uploadedFile1 || !uploadedFile2 || !uploadedFile3 || !uploadedFile4 || !uploadedFile5 || !uploadedFile6}
      >

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_APPLICANT_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
          <div className="col-md-4">
            <CardLabel>
              {`${t("CR_APPLICANT_NAME")}`}
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
              placeholder={`${t("CR_APPLICANT_NAME")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
            />
          </div>
          <div className="col-md-4">
          <CardLabel>
              {`${t("CR_RELATION_WITH_DECEASED")}`}<span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="label"
              isMandatory={false}
              option={selectedRelation}
              selected={'RelationwithDeceased'}
              select={selectRelationwithDeceased}
              placeholder={`${t("CR_RELATION_WITH_APPLICANT_AND_DECEASED")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_RELATION_WITH_DECEASED") })}
            />
          </div>
          <div className="col-md-4">
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
              disable={isDisableEdit1}
              placeholder={`${t("CS_COMMON_AADHAAR")}`}
              {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
          </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
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
            <div className="col-md-4">
            <CardLabel>
              {`${t("CR_EMAIL_ID")}`}
            </CardLabel>
            <TextInput
              t={t}
              type="email"
              optionKey="i18nKey"
              isMandatory={false}
              name="initiatorEmail"
              value={initiatorEmail}
              onChange={setSelectinitiatorEmail}
              disable={isDisableEdit}
              placeholder={`${t("CR_EMAIL_ID")}`}
              {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
            />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAddress"
                value={initiatorAddress}
                onChange={setSelectinitiatorAddress}
                disable={isDisableEdit}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1" style={{ marginTop: "30px" }}>
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ACTION_FILEUPLOADED")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row" style={{ clear: "both"}}>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <CardLabel>{`${t("CR_ADDRESS_DECEASED")}`}<span className="mandatorycss">*</span></CardLabel>
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
            </div>
            <div className="row" style={{ clear: "both"}}>
              <div className="col-md-6">
                <CardLabel>{`${t("CR_ID_APPLICANT")}`}<span className="mandatorycss">*</span></CardLabel>
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
            </div>
            <div className="row" style={{ clear: "both" }}>
              <div className="col-md-6">
                <CardLabel>{`${t("CR_ID_RELATION")}`}<span className="mandatorycss">*</span></CardLabel>
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
            </div>
            <div className="row" style={{ clear: "both"}}>
              <div className="col-md-6">
                <CardLabel>{`${t("CR_ID_PROOF_DEATH")}`}<span className="mandatorycss">*</span></CardLabel>
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
            </div>
            <div className="row" style={{ clear: "both"}}>
              <div className="col-md-6">
                <CardLabel>{`${t("CR_DECLARATION_GAZETTED")}`}<span className="mandatorycss">*</span></CardLabel>
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
            </div>
            <div className="row" style={{ clear: "both"}}>
              <div className="col-md-6">
                <CardLabel>{`${t("CR_DECLARATION_CREDIBLR_PERSON")}`}<span className="mandatorycss">*</span></CardLabel>
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
            </div>
            <div className="row" style={{ clear: "both"}}>
              <div className="col-md-6">
                <CardLabel>{`${t("CR_DECLARATION_ANOTHER_CREDIBLE_PERSON")}`}<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
                <UploadFile
                  extraStyleName={"propertyCreate"}
                  accept=".jpg,.png,.pdf"
                  onUpload={selectfile6}
                  onDelete={() => {
                    setUploadedFile6(null);
                  }}
                  message={uploadedFile6 ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}

                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label="I do understand that NAC/NIA issue will be subject to the genuiness of documents produced and enquiry done by the registrar"
                onChange={setDeclarationStatement}
                value={isDeclaration}
                checked={isDeclaration}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div>
        {
          toast && (
            <Toast
              error={infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError || initiatorAadharMissmatch}
              label={
                infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError || initiatorAadharMissmatch
                  ? infomantFirstNmeEnError
                    ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                    : initiatorAadharError
                      ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                      : initiatorMobileError
                        ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                        : initiatorDesiError
                          ? t(`BIRTH_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
                          : initiatorAadharMissmatch
                            ? ("Aadhar Number is not matching with the Aadhar Number in the document")
                            : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )
        }
        {""}
      </FormStep >
    </React.Fragment >
  );
};
export default DeathNACInitiatorDetails;
