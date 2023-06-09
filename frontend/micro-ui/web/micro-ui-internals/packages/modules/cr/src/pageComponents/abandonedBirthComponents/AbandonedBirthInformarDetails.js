import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast ,UploadFile} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import Timeline from "../../components/CRABTimeline";

const AbandonedBirthInformarDetails = ({ config, onSelect, userType, formData,isEditAbandonedBirth=false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const [isDisableEdit, setisDisableEdit] = useState(isEditAbandonedBirth ? isEditAbandonedBirth : false);
  const {name:name,} =Digit.UserService.getUser().info ; 
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  let documentList = [
    { "code": "REPORTINGFORM", "description": "ReportingForm" , "label" : "CR_REPORTING_FORM" },
    { "code": "CHILDBIRTHPROOF", "description": "ProofOfIdentity","label" : "CR_CHILDBIRTH_PROOF" },    
  ] 
  const [isDeclarationInfo, setIsDeclarationInfo] = useState(formData?.AbandonedBirthInformarDetails?.isDeclarationInfo ? formData?.AbandonedBirthInformarDetails?.isDeclarationInfo : false);
  const [institutionName, setinstitutionName] = useState(formData?.AbandonedBirthInformarDetails?.institutionName ? formData?.AbandonedBirthInformarDetails?.institutionName : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.institutionName ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.institutionName : "");
  const [caretakerName, setcaretakerName] = useState(formData?.AbandonedBirthInformarDetails?.caretakerName ? formData?.AbandonedBirthInformarDetails?.caretakerName : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerName ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerName : "");
  const [caretakerDesignation, setcaretakerDesignation] = useState(formData?.AbandonedBirthInformarDetails?.caretakerDesignation ? formData?.AbandonedBirthInformarDetails?.caretakerDesignation : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerDesignation ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerDesignation : "");
  const [caretakerMobile, setcaretakerMobile] = useState(formData?.AbandonedBirthInformarDetails?.caretakerMobile ? formData?.AbandonedBirthInformarDetails?.caretakerMobile : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerMobile ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerMobile : "");
  const [caretakerAddress, setcaretakerAddress] = useState(formData?.AbandonedBirthInformarDetails?.caretakerAddress ? formData?.AbandonedBirthInformarDetails?.caretakerAddress : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerAddress ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.caretakerAddress : "");
  const [infomantinstitution, setinfomantinstitution] = useState(formData?.AbandonedBirthInformarDetails?.infomantinstitution ? formData?.AbandonedBirthInformarDetails?.infomantinstitution : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantinstitution ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantinstitution : "");
  const [informerDesi, setinformerDesi] = useState(formData?.AbandonedBirthInformarDetails?.informerDesi ? formData?.AbandonedBirthInformarDetails?.informerDesi : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.informerDesi ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.informerDesi : "");
  const [infomantAadhar, setinfomantAadhar] = useState(formData?.AbandonedBirthInformarDetails?.infomantAadhar ? formData?.AbandonedBirthInformarDetails?.infomantAadhar : formData?.ChildDetails?.AbandonedBirthInformarDetails?.infomantAadhar ? formData?.ChildDetails?.AbandonedBirthInformarDetails?.infomantAadhar : "");
  const [infomantFirstNameEn, setinfomantFirstNameEn] = useState(formData?.AbandonedBirthInformarDetails?.infomantFirstNameEn ? formData?.AbandonedBirthInformarDetails?.infomantFirstNameEn : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantFirstNameEn ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantFirstNameEn : "");
  const [infomantMobile, setinfomantMobile] = useState(formData?.AbandonedBirthInformarDetails?.infomantMobile ? formData?.AbandonedBirthInformarDetails?.infomantMobile : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantMobile ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.infomantMobile : "");
  const [informerAddress, setinformerAddress] = useState(formData?.AbandonedBirthInformarDetails?.informerAddress ? formData?.AbandonedBirthInformarDetails?.informerAddress : formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.informerAddress ? formData?.AbandonedChildDetails?.AbandonedBirthInformarDetails?.informerAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);

  // const [uploadedFiles, setUploadedFiles] = useState(formData?.AbandonedBirthInformarDetails?.document? formData?.AbandonedBirthInformarDetails?.document: []);
  // const [docuploadedId, setDocuploadedId] = useState();
  // const [docuploadedName, setDocuploadedName] = useState();
  // const [uploadedFile, setUploadedFile] = useState();
  // const [file, setFile] = useState();
  const [error, setError] = useState(null);
  // const cityDetails = Digit.ULBService.getCurrentUlb();
  let acceptFormat = ".pdf"

  const [uploadedFile, setUploadedFile] = useState(formData?.AbandonedBirthInformarDetails?.uploadedFile);
  const [uploadedFile1, setUploadedFile1] = useState(formData?.AbandonedBirthInformarDetails?.uploadedFile1);
  const [file, setFile] = useState(formData?.InitiatorAbandoned?.uploadedFile);
  const [file1, setFile1] = useState(formData?.InitiatorAbandoned?.uploadedFile1);
  

  // let acceptFormat = ".jpg,.png,.pdf,.jpeg"

  // const [dropdownValue, setDropdownValue] = useState(formData?.AbandonedBirthInformarDetails?.documents?.ProofOfIdentity?.documentType || null);
  // const tenantId = Digit.ULBService.getCurrentTenantId();
  // const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  // const docs = Documentsob?.AbandonedBirthInformarDetails?.Documents;
  // console.log(docs);
  // const proofOfIdentity = Array.isArray(docs) && docs.filter((doc) => doc.code.includes("ADDRESSPROOF"));


  const [toast, setToast] = useState(false);
  const onSkip = () => onSelect(); 
  useEffect(() => {
    if (isInitialRender) {
      if (formData?.AbandonedBirthInformarDetails?.isDeclarationInfo != null) {
        setIsInitialRender(false);
        setIsDeclarationInfo(formData?.AbandonedBirthInformarDetails?.isDeclarationInfo);
      }
    }    
  }, [isInitialRender]);
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

  function selectfile(e) {
    setFile(e.target.files[0]);
  }
  function selectfile1(e) {
    setFile1(e.target.files[0]);
  }

  function setSelectinstitutionName(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinstitutionName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectcaretakerName(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setcaretakerName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectcaretakerDesignation(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setcaretakerDesignation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }    
  function setSelectcaretakerMobile(e) {
    if (e.target.value.trim().length != 0) {
      setcaretakerMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }  
  function setSelectcaretakerAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9, ]*$") != null)) {
      setcaretakerAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }   
  function setSelectinfomantinstitution(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinfomantinstitution(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinformerDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinformerDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }  
  function setSelectinfomantAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinfomantAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }   
  }
  function setSelectinfomantFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinfomantFirstNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  } 
  function setSelectinfomantMobile(e) {
    if (e.target.value.trim().length != 0) {
      setinfomantMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }   
  function setSelectinformerAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9, ]*$") != null)) {
      setinformerAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  } 
  // function selectfile(e) {
  //   console.log({e});
  //   let result = documentList.filter(obj => obj.code == e?.target?.id);
  //   setDocuploadedName(result[0].description);
  //   setDocuploadedId(e?.target?.id);
  //   setUploadedFile(null);
  //   setFile(e.target.files[0]);
  //   console.log(result + "MY Documents");
  // }
  // function onDeleteown(e) {
  //   const removeindex = uploadedFiles.findIndex(element => {
  //     return element.documentType === e
  //   });
  //   if (removeindex === -1) {
  //     return false;
  //   };
  //   setUploadedFiles(!!uploadedFiles.splice(removeindex, 1))
  // }

  // function handleDelete(e) {
  //   const removeindex = uploadedFiles?.findIndex(element => {
  //     return element?.documentType === e
  //   });
  //   if (removeindex === -1) {
  //     return false;
  //   };
  //   setUploadedFiles(!!uploadedFiles.splice(removeindex, 1))
  // }

  function setDeclarationInfo(e) {
    if (e.target.checked == true) {
      setIsDeclarationInfo(e.target.checked);     
    } else {
      setIsDeclarationInfo(e.target.checked);
    }
  }

  let validFlag = true;
  const goNext = () => {

    // let document = formData?.document;
    // if (uploadedFiles.length > 0) {
    //     document = uploadedFiles      
    // }
    // let documents = { document: document }   
   
    if (validFlag == true) {      
      // sessionStorage.setItem("institutionName", institutionName ? institutionName : null);
      // sessionStorage.setItem("caretakerName", caretakerName ? caretakerName : null);
      // sessionStorage.setItem("caretakerDesignation", caretakerDesignation ? caretakerDesignation : null);
      // sessionStorage.setItem("caretakerMobile", caretakerMobile ? caretakerMobile : null);
      // sessionStorage.setItem("caretakerAddress", caretakerAddress ? caretakerAddress : null);
      // sessionStorage.setItem("infomantinstitution", infomantinstitution ? infomantinstitution : null);
      // sessionStorage.setItem("informerDesi", informerDesi ? informerDesi : null);      
      // sessionStorage.setItem("infomantAadhar", infomantAadhar ? infomantAadhar : null);
      // sessionStorage.setItem("infomantFirstNameEn", infomantFirstNameEn ? infomantFirstNameEn : null);
      // sessionStorage.setItem("infomantMobile", infomantMobile ? infomantMobile : null);
      // sessionStorage.setItem("informerAddress", informerAddress ? informerAddress : null);    
      // sessionStorage.setItem("documentType", documentType ? documentType : null);
      // sessionStorage.setItem("documentName", documentName ? documentName : null);
      // sessionStorage.setItem("isDeclarationInfo", isDeclarationInfo ? isDeclarationInfo : null);

      onSelect(config.key, { 
        // documents,
        institutionName: institutionName.trim(),
        caretakerName: caretakerName.trim(),
        caretakerDesignation: caretakerDesignation.trim(),
        caretakerMobile: caretakerMobile.trim(),
        caretakerAddress: caretakerAddress.trim(),
        infomantinstitution: infomantinstitution.trim(),
        informerDesi: informerDesi.trim(),
        infomantAadhar: infomantAadhar.trim(), 
        infomantFirstNameEn: infomantFirstNameEn.trim(), 
        infomantMobile: infomantMobile.trim(),  
        informerAddress: informerAddress.trim(),
        // uploadedFiles,
        isDeclarationInfo,
        // docuploadedName,
        // file,
        // document,
        // fileStoreId,
        // ProofOfIdentity,
        uploadedFile,
        uploadedFile1,
        file,
        file1,
      });
    }
  };
 
  // useEffect(() => {
  //   (async () => {
  //     setError(null);
  //     if (file && file?.type) {
  //       if (!(acceptFormat?.split(",")?.includes(`.${file?.type?.split("/")?.pop()}`))) {
  //         setError(t("CR_UPLOAD_FORMAT_NOT_SUPPORTED"));
  //       }
  //       else if (file.size >= 2000000) {
  //         setError(t("CR_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
  //       } else {
  //         try {
  //           const response = await Digit.UploadServices.Filestorage("property-upload", file, Digit.ULBService.getStateId());
  //           if (response?.data?.files?.length > 0) {
  //             const temp = {
  //               "documentType": docuploadedId, "description": docuploadedName,
  //               "fileStoreId": response?.data?.files[0]?.fileStoreId, "name": file.name, "type": file.type, "size": file.size
  //             };

  //             uploadedFiles.push(temp);
  //             setUploadedFile(response?.data?.files[0]?.fileStoreId);
  //           } else {
  //             setError(t("PT_FILE_UPLOAD_ERROR"));
  //           }
  //         } catch (err) {
  //         }
  //       }
  //     }
  //   })();
  // }, [file, uploadedFiles]);

  return (
    <React.Fragment>
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}

      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}   isDisabled={!isDeclarationInfo ||!uploadedFile||!uploadedFile1}  >
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("CR_INFORMER_DECLARATION_STATEMENT")} onChange={setDeclarationInfo} value={isDeclarationInfo} checked={isDeclarationInfo} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENTS_CARETAKER")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12"> 
          <div className="col-md-4">
              <CardLabel>
                {`${t("CR_INSTITUTION_NAME_EN")}`}                
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="institutionName"
                value={institutionName}
                onChange={setSelectinstitutionName}
                disable={isEdit}
                placeholder={`${t("CR_INSTITUTION_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`'  ]*$", isRequired: false, type: "text", title: t("CR_ERROR_INSTITUTION_NAME_CHOOSE") })}
              />
            </div>           
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_CARE_TAKER_NAME_EN")}`}                
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="caretakerName"
                value={caretakerName}
                onChange={setSelectcaretakerName}
                disable={isEdit}
                placeholder={`${t("CR_CARE_TAKER_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_ERROR_CARE_TAKER_NAME") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_CARE_TAKER_DESIGNATION")}`}                
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="caretakerDesignation"
                value={caretakerDesignation}
                onChange={setSelectcaretakerDesignation}
                disable={isEdit}
                placeholder={`${t("CR_CARE_TAKER_DESIGNATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_ERROR_CARE_TAKER_DESIGNATION") })}
              />
            </div>    
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}                
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="caretakerMobile"
                value={caretakerMobile}
                onChange={setSelectcaretakerMobile}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: false, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
         
            <div className="col-md-6">
              <CardLabel>{`${t("CR_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="caretakerAddress"
                value={caretakerAddress}
                onChange={setSelectcaretakerAddress}
                disable={isEdit}
                placeholder={`${t("CR_CARE_TAKER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRESS") })}
              />
            </div>            
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OFFICAL_INFORMANT")}`}</span>{" "}
            </h1>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-12"> 
          <div className="col-md-4">
              <CardLabel>
                {`${t("CR_OFFICE_INSTITUTION")}`}               
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="infomantinstitution"
                value={infomantinstitution}
                onChange={setSelectinfomantinstitution}
                disable={isEdit}
                placeholder={`${t("CR_OFFICE_INSTITUTION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_OFFICE_INSTITUTION_NAME") })}
              />
            </div>  
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_INFORMANT_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}                
                type={"text"}
                optionKey="i18nKey"
                name="informerDesi"
                value={informerDesi}
                onChange={setSelectinformerDesi}
                disable={isEdit}
                placeholder={`${t("CR_INFORMANT_DESIGNATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}
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
                name="infomantAadhar"
                value={infomantAadhar}
                onChange={setSelectinfomantAadhar}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12"> 
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_INFORMANT_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput 
              t={t}               
              type={"text"} 
              optionKey="i18nKey" 
              name="infomantFirstNameEn"              
              value={infomantFirstNameEn} 
              disable={isEdit}
              onChange={setSelectinfomantFirstNameEn}  placeholder={`${t("CR_INFORMANT_NAME_EN")}`}
             {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })} />
            </div>
          

            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="infomantMobile"
                value={infomantMobile}
                onChange={setSelectinfomantMobile }
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_ADDRESS")}`} <span className="mandatorycss">*</span></CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="informerAddress"
                value={informerAddress}
                disable={isEdit}
                onChange={setSelectinformerAddress}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRESS") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SUPPORTING_DOC")}`}</span>{" "}
            </h1>
          </div>
        </div>
 
        <div className="col-md-6">
        <CardLabel>{`${t("CR_DOC_TYPE")}`}</CardLabel>
        </div>

        <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-5">
                  <CardLabel>
                  CR_REPORTING_FORM<span className="mandatorycss">*</span>
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
              </div>
              <div className="row">
                <div className="col-md-5">
                  <CardLabel>
                  CR_CHILDBIRTH_PROOF<span className="mandatorycss">*</span>
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
                {uploadedFile1 && (
                        <div className="col-md-4">
                          {_.head(uploadedFile1)?.type === "pdf" ? (
                            <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(uploadedFile1)?.pdfUrl} alt="CR_CHILDBIRTH_PROOF" />
                          ) : (
                            <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(uploadedFile1)?.small} alt="CR_CHILDBIRTH_PROOF" />
                          )}
                          <a
                            style={{ color: "blue" }}
                            target="_blank"
                            href={_.head(uploadedFile1)?.type === "pdf" ? _.head(uploadedFile1)?.pdfUrl : _.head(uploadedFile1)?.large}
                          >
                            Preview
                          </a>
                        </div>
                      )}
              </div>              
            </div>   
          </div>



        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              {
                documentList.map((doc, index, arr) => (
                  <div className="row" key={doc.code}>
                    <div className="col-md-12">
                      <div className="col-md-6">
                        <span>
                          {doc.label}
                        </span>
                        <span className="mandatorycss">*</span>
                      </div>
                      <div className="col-md-6">
                        <UploadFile
                          id={doc.code}
                          name={doc.description}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectfile}
                          onDelete={() => {
                            onDeleteown(doc.code);
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                          error={error}
                        />
                      </div>

                    </div>
                  </div>
                )
                )

              }
            </div>
            </div>
        </div>
        {error ? <div style={{ height: "20px", width: "100%", fontSize: "20px", color: "red", marginTop: "5px" }}>{error}</div> : ""} */}


        {/* <div className="row">
            <div className="col-md-12"> 
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_DOC_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput 
              t={t} 
              isMandatory={true} 
              type={"text"} 
              optionKey="i18nKey" 
              name="documentType"              
              value={documentType} 
              onChange={setSelectdocumentType}  placeholder={`${t("CR_DOC_TYPE")}`}
             {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOC_TYPE") })} />
            </div>
            <div className="col-md-4" >
              <CardLabel>{`${t("CR_DOC_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput 
              t={t} 
              isMandatory={true} 
              type={"text"} 
              optionKey="i18nKey" 
              name="documentName"              
              value={documentName} 
              onChange={setSelectdocumentName}  placeholder={`${t("CR_DOC_NAME")}`}
             {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DOC_NAME") })} />
            </div>
            <div className="col-md-4">            
            </div>
          </div>
          
        </div>  */}

        {/* <div className="row">
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
        </div> */}
        {/* {toast && (
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
        {""} */}
      </FormStep>
    </React.Fragment>
  );
};
export default AbandonedBirthInformarDetails;
