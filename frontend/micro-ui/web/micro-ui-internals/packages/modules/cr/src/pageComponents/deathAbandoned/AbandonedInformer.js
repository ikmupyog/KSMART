import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast,  UploadFile, } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const AbandonedInformer = ({ config, onSelect, userType, formData, isEditAbandonedDeath }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  console.log("Informer",formData);

  const [IsDeclarationInformant, setIsDeclarationInformant] = useState(
    formData?.InformantDetails?.IsDeclarationInformant ? formData?.InformantDetails?.IsDeclarationInformant : false
  );
  // const [isDeclarationInfotwo, setIsDeclarationInfotwo] = useState(
  //   formData?.InformantDetails?.isDeclarationInfotwo ? formData?.InformantDetails?.isDeclarationInfotwo : false
  // );
  const [InformantAadharNo, setInformantAadharNo] = useState(
    formData?.InformantDetails?.InformantAadharNo ? formData?.InformantDetails?.InformantAadharNo : ""
  );
  const [InformantNameEn, setInformantNameEn] = useState(
    formData?.InformantDetails?.InformantNameEn ? formData?.InformantDetails?.InformantNameEn : ""
  );
  const [InformantMobileNo, setInformantMobileNo] = useState(
    formData?.InformantDetails?.InformantMobileNo ? formData?.InformantDetails?.InformantMobileNo : ""
  );
  const [DeathSignedOfficerDesignation, setDeathSignedOfficerDesignation] = useState(
    formData?.InformantDetails?.DeathSignedOfficerDesignation ? formData?.InformantDetails?.DeathSignedOfficerDesignation : ""
  );
  const [InformantAddress, setInformantAddress] = useState(
    formData?.InformantDetails?.InformantAddress ? formData?.InformantDetails?.InformantAddress : ""
  );
  const [InformantOfficeAuthority, setInformantOfficeAuthority] = useState(
    formData?.InformantDetails?.InformantOfficeAuthority ? formData?.InformantDetails?.InformantOfficeAuthority : ""
  );
  const [InformantPENNo, setInformantPENNo] = useState(
    formData?.InformantDetails?.InformantPENNo ? formData?.InformantDetails?.InformantPENNo : ""
  );
  const [InformantOfficeAddress, setInformantOfficeAddress] = useState(
    formData?.InformantDetails?.InformantOfficeAddress ? formData?.InformantDetails?.InformantOfficeAddress : ""
  );

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);
  const [infomantNameError, setinfomantNameError] = useState(formData?.InformantDetails?.InformantNameEn ? false : false);
  const [infomantAadharError, setinfomantAadharError] = useState(formData?.InformantDetails?.infomantAadhar ? false : false);
  const [infomantMobileError, setinfomantMobileError] = useState(formData?.InformantDetails?.InformantMobileNo ? false : false);
  const [informerDesiError, setinformerDesiError] = useState(formData?.InformantDetails?.DeathSignedOfficerDesignation ? false : false);
  const onSkip = () => onSelect();
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile1, setUploadedFile1] = useState(null);
  const [uploadedFile2, setUploadedFile2] = useState(null);
  const [uploadedFile3, setUploadedFile3] = useState(null);
  const [uploadedFile4, setUploadedFile4] = useState(null);
  const [uploadedFile5, setUploadedFile5] = useState(null);
  const [file, setFile] = useState(formData?.InformantDetails?.file);
  const [file1, setFile1] = useState(formData?.InformantDetails?.file1);
  const [file2, setFile2] = useState(formData?.InformantDetails?.file2);
  const [file3, setFile3] = useState(formData?.InformantDetails?.file3);
  const [file4, setFile4] = useState(formData?.InformantDetails?.file4);
  const [file5, setFile5] = useState(formData?.InformantDetails?.file5);

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
          } catch (err) {}
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
          } catch (err) {}
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
          } catch (err) {}
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
          } catch (err) {}
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
          } catch (err) {}
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
          } catch (err) {}
        }
      }
    })();
  }, [file5]);

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.Informer?.IsDeclarationInformant != null) {
        setIsInitialRender(false);
        se(formData?.Informer?.IsDeclarationInformant);
      }
      // if (formData?.Informer?.isDeclarationInfotwo != null) {
      //   setIsInitialRender(false);
      //   setIsDeclarationInfotwo(formData?.Informer?.isDeclarationInfotwo);
      // }
    }
  }, [isInitialRender]);

  function setDeclarationInfo(e) {
    if (e.target.checked == true) {
      setIsDeclarationInformant(e.target.checked);
    } else {
      setIsDeclarationInformant(e.target.checked);
    }
  }
  // function setDeclarationInfotwo(e) {
  //   if (e.target.checked == true) {
  //     setIsDeclarationInfotwo(e.target.checked);
  //   } else {
  //     setIsDeclarationInfotwo(e.target.checked);
  //   }
  // }
  function setSelectInformantAadharNo(e) {
    if (e.target.value.trim().length >= 0) {
      setInformantAadharNo(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
    function setSelectInformantOfficeAuthority(e) {
    
        setInformantOfficeAuthority(e.target.value);
      }
      function setSelectInformantPENNo(e) {
        
          setInformantPENNo(e.target.value);
      }  
        function setSelectInformantOfficeAddress(e) {
        
            setInformantOfficeAddress(e.target.value);

  }
  function setSelectInformantNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setInformantNameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }

  function setSelectInformantMobileNo(e) {
    if (e.target.value.trim().length >= 0) {
      setInformantMobileNo(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
    }
    // if (e.target.value.length != 0) {
    //   if (e.target.value.length > 10) {
    //     return false;
    //   } else if (e.target.value.length < 10) {
    //     setInformantMobileNo(e.target.value);
    //     return false;
    //   } else {
    //     setInformantMobileNo(e.target.value);
    //   }
    // } else {
    //   setInformantMobileNo(e.target.value);
    // }
  }
  function setSelectDeathSignedOfficerDesignation(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setDeathSignedOfficerDesignation(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectInformantAddress(e) {
    if (e.target.value.length === 251) {
      return false;
    } else {
      setInformantAddress(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }

  let validFlag = true;
  const goNext = () => {
    if (InformantNameEn == null || InformantNameEn == "" || InformantNameEn == undefined) {
      validFlag = false;
      setinfomantNameError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantNameError(false);
    }
    if (DeathSignedOfficerDesignation == null || DeathSignedOfficerDesignation == "" || DeathSignedOfficerDesignation == undefined) {
      validFlag = false;
      setinformerDesiError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinformerDesiError(false);
    }

    if (InformantAadharNo == null || InformantAadharNo == "" || InformantAadharNo == undefined) {
      validFlag = false;
      setinfomantAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantAadharError(false);
    }
    if (InformantMobileNo == null || InformantMobileNo == "" || InformantMobileNo == undefined) {
      validFlag = false;
      setinfomantMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantMobileError(false);
    }

    if (validFlag == true) {
      sessionStorage.setItem("IsDeclarationInformant", IsDeclarationInformant ? IsDeclarationInformant : null);
      // sessionStorage.setItem("isDeclarationInfotwo", isDeclarationInfotwo ? isDeclarationInfotwo : null);
      sessionStorage.setItem("InformantNameEn", InformantNameEn ? InformantNameEn : null);
      sessionStorage.setItem("InformantAadharNo", InformantAadharNo ? InformantAadharNo : null);

      sessionStorage.setItem("InformantMobileNo", InformantMobileNo ? InformantMobileNo : null);
      sessionStorage.setItem("DeathSignedOfficerDesignation", DeathSignedOfficerDesignation ? DeathSignedOfficerDesignation : null);
      sessionStorage.setItem("InformantAddress", InformantAddress ? InformantAddress : null);
      // 
      sessionStorage.setItem("InformantOfficeAuthority",InformantOfficeAuthority ?InformantOfficeAuthority : null);
      sessionStorage.setItem("InformantPENNo", InformantPENNo ? InformantPENNo : null);
      sessionStorage.setItem("InformantOfficeAddress", InformantOfficeAddress ? InformantOfficeAddress : null);
      sessionStorage.setItem("file", file ? file : null);
      sessionStorage.setItem("file1", file1 ? file1 : null);
      sessionStorage.setItem("file2", file2 ? file2 : null);
      sessionStorage.setItem("file3", file3 ? file3 : null);
      sessionStorage.setItem("file4", file4 ? file4 : null);
      sessionStorage.setItem("file5", file5 ? file5 : null);
      onSelect(config.key, {
        IsDeclarationInformant,
        // isDeclarationInfotwo,
        InformantNameEn,
        InformantAadharNo,
        InformantMobileNo,
        DeathSignedOfficerDesignation,
        InformantAddress,
        InformantOfficeAuthority,
        InformantPENNo,
        InformantOfficeAddress,
        uploadedFile,
        uploadedFile1,
        uploadedFile2,
        uploadedFile3,
        uploadedFile4,
        uploadedFile5

      });
    }
  };
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen/cr-death-creation/informer") || window.location.href.includes("/employee/cr-death-creation/informer") ? <Timeline currentStep={6} /> : null}
      
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={
        !IsDeclarationInformant||!uploadedFile||!uploadedFile1||!uploadedFile2||!uploadedFile3||!uploadedFile4||!uploadedFile5}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMANT_DETAILS")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INFORMER_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={IsDeclarationInformant}
                checked={IsDeclarationInformant}
              />
            </div>
          </div>
        </div>

<div className="row">
  <div className="col-md-12">
  <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INFORMER_AUTHORITY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantOfficeAuthority"
                value={InformantOfficeAuthority}
                onChange={setSelectInformantOfficeAuthority}
                placeholder={`${t("CR_INFORMER_AUTHORITY")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
              />
            </div>
  <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INFORMER_DESIGNATION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeathSignedOfficerDesignation"
                value={DeathSignedOfficerDesignation}
                onChange={setSelectDeathSignedOfficerDesignation}
                placeholder={`${t("CR_INFORMER_DESIGNATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
              />
            </div>
  <div className="col-md-3">
              <CardLabel>
                {`${t("CR_INFORMANT_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantNameEn"
                value={InformantNameEn}
                onChange={setSelectInformantNameEn}
                placeholder={`${t("CR_INFORMANT_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
              />
            </div>

            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_PEN_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantPENNo"
                value={InformantPENNo}
                onChange={setSelectInformantPENNo}
                placeholder={`${t("CR_PEN_NO)")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
              />
            </div>

           
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
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="InformantAadharNo"
                value={InformantAadharNo}
                onChange={setSelectInformantAadharNo}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"number"}
                optionKey="i18nKey"
                name="InformantMobileNo"
                value={InformantMobileNo}
                onChange={setSelectInformantMobileNo}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
  </div>
</div>
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-6">
              <CardLabel>{`${t("CR_OFFICE_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantOfficeAddress"
                value={InformantOfficeAddress}
                onChange={setSelectInformantOfficeAddress}
                placeholder={`${t("CR_OFFICE_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{`${t("CR_PERSONAL_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformantAddress"
                value={InformantAddress}
                onChange={setSelectInformantAddress}
                placeholder={`${t("CR_PERSONAL_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
              />
            </div>
          </div>
        </div>
     
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`DOCUMENTS`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-5">
                  <CardLabel>
                    Letter form the Informer /Notifier Official<span className="mandatorycss">*</span>
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
                    message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <CardLabel>
                    Copy of the FIR<span className="mandatorycss">*</span>
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
                    message={uploadedFile1 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <CardLabel>
                   Inquest Report<span className="mandatorycss">*</span>
                  </CardLabel>
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
                  <CardLabel>
                    Post-Mortem Report <span className="mandatorycss">*</span>
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
                    message={uploadedFile3 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <CardLabel>
                    Medical Certificate of Cause-of-Death<span className="mandatorycss">*</span>
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
                    message={uploadedFile4 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <CardLabel>
                    Court Order<span className="mandatorycss">*</span>
                  </CardLabel>
                </div>
                <div className="col-md-3">
                  <UploadFile
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile5}
                    onDelete={() => {
                      setUploadedFile5(null);
                    }}
                    message={uploadedFile5 ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
              </div>
            </div>
          </div>

        {toast && (
          <Toast
            error={infomantNameError || infomantAadharError || infomantMobileError || informerDesiError}
            label={
              infomantNameError || infomantAadharError || infomantMobileError || informerDesiError
                ? infomantNameError
                  ? t(`CR_ERROR_INFORMANT_NAME_CHOOSE`)
                  : infomantAadharError
                  ? t(`CR_ERROR_INFORMANT_AADHAR_CHOOSE`)
                  : infomantMobileError
                  ? t(`CR_ERROR_INFORMANT_MOBILE_CHOOSE`)
                  : informerDesiError
                  ? t(`CR_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
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
export default AbandonedInformer;
