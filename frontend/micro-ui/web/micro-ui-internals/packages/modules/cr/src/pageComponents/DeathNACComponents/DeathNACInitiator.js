import React, { useState, useEffect } from "react";
import Timeline from "../../components/NACDRTimeline";
import { FormStep, CardLabel, TextInput, Dropdown, LinkButton, UploadFile, BackButton, MultiLink, CheckBox, TextArea, Toast, Table } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const DeathNACInitiatorDetails = ({ config, onSelect, userType, formData, isEditStillBirth = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const { name: name, } = Digit.UserService.getUser().info; // window.localStorage.getItem("user-info");
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.InitiatorinfoDetails?.isInitiatorDeclaration : formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration : false);
  const [isDeclaration, setDeclaration] = useState(formData?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.InitiatorinfoDetails?.isInitiatorDeclaration : formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration : false);
  const [initiatorNameEn, setinitiatorNameEn] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? formData?.InitiatorinfoDetails?.initiatorNameEn : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorNameEn ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorNameEn : name);
  const [initiatorAadhar, setinitiatorAadhar] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? formData?.InitiatorinfoDetails?.initiatorAadhar : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAadhar ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAadhar : "");
  const [initiatorMobile, setinitiatorMobile] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? formData?.InitiatorinfoDetails?.initiatorMobile : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorMobile ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorMobile : "");
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.InitiatorinfoDetails?.initiatorDesi ? formData?.InitiatorinfoDetails?.initiatorDesi : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorDesi ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorDesi : "");
  const [initiatorAddress, setinitiatorAddress] = useState(formData?.InitiatorinfoDetails?.initiatorAddress ? formData?.InitiatorinfoDetails?.initiatorAddress : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAddress ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile1, setUploadedFile1] = useState(null);
  const [uploadedFile2, setUploadedFile2] = useState(null);
  const [uploadedFile3, setUploadedFile3] = useState(null);
  const [uploadedFile4, setUploadedFile4] = useState(null);
  const [uploadedFile5, setUploadedFile5] = useState(null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file1, setFile1] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file2, setFile2] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file3, setFile3] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file4, setFile4] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [file5, setFile5] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [toast, setToast] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? false : false);
  const [initiatorAadharError, setinitiatorAadharError] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? false : false);
  const [initiatorMobileError, setinitiatorMobileError] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? false : false);
  const [initiatorDesiError, setinitiatorDesiError] = useState(formData?.InitiatorinfoDetails?.initiatorDesi ? false : false);
  const onSkip = () => onSelect();

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



  function setSelectinitiatorAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length != 0) {
      setinitiatorMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
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
      });
    }
  };
  console.log(formData);
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
        isDisabled={!isInitiatorDeclaration || !initiatorNameEn || !initiatorAadhar || !initiatorMobile}
      >

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
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Applicant</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
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
                disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            <div className="col-md-4">
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

        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
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
              <span style={{ background: "#fff", padding: "0 10px" }}>File Upload</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-5">
                <CardLabel>Address proof of deceased at the time of birth<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
                <UploadFile
                  extraStyleName={"propertyCreate"}
                  accept=".jpg,.png,.pdf"
                  onUpload={selectfile}
                  onDelete={() => {
                    setUploadedFile(null);
                  }}
                  message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}

                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <CardLabel>ID card of applicant<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
                <UploadFile
                  extraStyleName={"propertyCreate"}
                  accept=".jpg,.png,.pdf"
                  onUpload={selectfile1}
                  onDelete={() => {
                    setUploadedFile1(null);
                  }}
                  message={uploadedFile1 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}

                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <CardLabel>ID proof of father/mother/spouse<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
                <UploadFile
                  extraStyleName={"propertyCreate"}
                  accept=".jpg,.png,.pdf"
                  onUpload={selectfile2}
                  onDelete={() => {
                    setUploadedFile2(null);
                  }}
                  message={uploadedFile2 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}

                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <CardLabel>ID Proof of Mother at the time of birth <span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
                <UploadFile
                  extraStyleName={"propertyCreate"}
                  accept=".jpg,.png,.pdf"
                  onUpload={selectfile3}
                  onDelete={() => {
                    setUploadedFile3(null);
                  }}
                  message={uploadedFile3 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}

                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <CardLabel>ID Proof of death <span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
                <UploadFile
                  extraStyleName={"propertyCreate"}
                  accept=".jpg,.png,.pdf"
                  onUpload={selectfile4}
                  onDelete={() => {
                    setUploadedFile4(null);
                  }}
                  message={uploadedFile4 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}

                />
              </div>
            </div>
          </div>
        </div>
        {toast && (
          <Toast
            error={infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError}
            label={
              infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError
                ? infomantFirstNmeEnError
                  ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                  : initiatorAadharError
                    ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                    : initiatorMobileError
                      ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                      : initiatorDesiError
                        ? t(`BIRTH_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
                        : setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
      </FormStep>
    </React.Fragment>
  );
};
export default DeathNACInitiatorDetails;
