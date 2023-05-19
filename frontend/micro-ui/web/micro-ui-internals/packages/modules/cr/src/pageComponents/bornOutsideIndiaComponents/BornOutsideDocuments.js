import React, { useState, useEffect } from "react";
import Timeline from "../../components/BOBRTimeline";
import { FormStep, CardLabel, UploadFile } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import _ from "lodash";

const BornOutsideDocuments = ({ config, onSelect, formData }) => {

  const { t } = useTranslation();

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  const [error, setError] = useState(null)

  const [childBirthCertificateFile, setChildBirthCertificateFile] = useState(
    formData?.BornOutsideDocuments?.childBirthCertificateFile ? formData?.BornOutsideDocuments?.childBirthCertificateFile : null
  );
  const [childBirthCertificate, setChildBirthCertificate] = useState(
    formData?.BornOutsideDocuments?.childBirthCertificate ? formData?.BornOutsideDocuments?.childBirthCertificate : null
  );

  const fetchFile = async (fileId) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([fileId], tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: trimURL(key.url.split(",")[1]), small: trimURL(key.url.split(",")[2]), key: key.id, type: fileType, pdfUrl: trimURL(key.url) };
    });
    return newThumbnails;
  };

  useEffect(() => {
    (async () => {
      setError(null);
      if (childBirthCertificateFile) {
        if (childBirthCertificateFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(`bornoutside/childbirthcertificate`, childBirthCertificateFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              console.log({fileDetails})
              setChildBirthCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [childBirthCertificateFile]);

  const onSkip = () => onSelect();

  const goNext = ()=>{
    onSelect(config.key, {

    })
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={
          !childBirthCertificateFile
          //  ||
          // !childPassportFile ||
          // !citizenshipFile ||
          // !fatherPassportFile ||
          // !motherPassportFile ||
          // !cancellingVisaFile ||
          // !addressProofFile ||
          // !notaryFile ||
          // !marriageCertificateFile ||
          // !nationalityFile ||
          // !magistrateFile
        }
      >
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SUPPORTING_DOC")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>
              {`${t("CR_CHILD_BIRTH_CERTIFICATE")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-6">
            <UploadFile
              id={"marriage-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e)=>setChildBirthCertificateFile(e.target.files[0])}
              onDelete={() => {
                childBirthCertificate(null);
              }}
              message={childBirthCertificateFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {childBirthCertificate && (
            <div className="col-md-2">
              {_.head(childBirthCertificate)?.type === "pdf" ? (
                <React.Fragment>
                  <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(childBirthCertificate)?.pdfUrl} alt="Child Birth Certificate Pdf" />
                </React.Fragment>
              ) : (
                <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(childBirthCertificate)?.small} alt="Child Birth Certificate Image" />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(childBirthCertificate)?.type === "pdf" ? _.head(childBirthCertificate)?.pdfUrl : _.head(childBirthCertificate)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default BornOutsideDocuments;

// const BornOutsideDocuments = ({ config, onSelect, formData }) => {

//   let tenantId = "";
//   tenantId = Digit.ULBService.getCurrentTenantId();
//   if (tenantId === "kl") {
//     tenantId = Digit.ULBService.getCitizenCurrentTenant();
//   }  const { t } = useTranslation();

//   const fetchFile = async (fileId) => {
//     const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([fileId], tenantId);
//     const newThumbnails = fileStoreIds.map((key) => {
//       const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
//       return { large: trimURL(key.url.split(",")[1]), small: trimURL(key.url.split(",")[2]), key: key.id, type: fileType, pdfUrl: trimURL(key.url) };
//     });
//     console.log(newThumbnails, "new")
//     return newThumbnails;
//   };

//   const [childBirthCertificateFile, setChildBirthCertificateFile] = useState(
//     formData?.BornOutsideDocuments?.childBirthCertificateFile ? formData?.BornOutsideDocuments?.childBirthCertificateFile : null
//   );
//   const [childBirthCertificate, setChildBirthCertificate] = useState(
//     formData?.BornOutsideDocuments?.childBirthCertificate ? formData?.BornOutsideDocuments?.childBirthCertificate : null
//   );

//   const [childPassportFile, setChildPassportFile] = useState(formData?.BornOutsideDocuments?.childPassportFile ? formData?.BornOutsideDocuments?.childPassportFile : null);
//   const [childPassport, setChildPassport] = useState(formData?.BornOutsideDocuments?.childPassport ? formData?.BornOutsideDocuments?.childPassport : null);

//   const [citizenshipFile, setCitizenshipFile] = useState(formData?.BornOutsideDocuments?.citizenshipFile ? formData?.BornOutsideDocuments?.citizenshipFile : null);
//   const [citizenship, setCitizenship] = useState(formData?.BornOutsideDocuments?.citizenship ? formData?.BornOutsideDocuments?.citizenship : null);

//   const [fatherPassportFile, setFatherPassportFile] = useState(formData?.BornOutsideDocuments?.fatherPassportFile ? formData?.BornOutsideDocuments?.fatherPassportFile : null);
//   const [fatherPassport, setFatherPassport] = useState(formData?.BornOutsideDocuments?.fatherPassport ? formData?.BornOutsideDocuments?.fatherPassport : null);

//   const [motherPassportFile, setMotherPassportFile] = useState(formData?.BornOutsideDocuments?.motherPassportFile ? formData?.BornOutsideDocuments?.motherPassportFile : null);
//   const [motherPassport, setMotherPassport] = useState(formData?.BornOutsideDocuments?.motherPassport ? formData?.BornOutsideDocuments?.motherPassport : null);

//   const [cancellingVisaFile, setCancellingVisaFile] = useState(formData?.BornOutsideDocuments?.cancellingVisaFile ? formData?.BornOutsideDocuments?.cancellingVisaFile : null);
//   const [cancellingVisa, setCancellingVisa] = useState(formData?.BornOutsideDocuments?.cancellingVisa ? formData?.BornOutsideDocuments?.cancellingVisa : null);

//   const [addressProofFile, setAddressProofFile] = useState(formData?.BornOutsideDocuments?.addressProofFile ? formData?.BornOutsideDocuments?.addressProofFile : null);
//   const [addressProof, setAddressProof] = useState(formData?.BornOutsideDocuments?.addressProof ? formData?.BornOutsideDocuments?.addressProof : null);

//   const [notaryFile, setNotaryFile] = useState(formData?.BornOutsideDocuments?.notaryFile ? formData?.BornOutsideDocuments?.notaryFile : null);
//   const [notary, setNotary] = useState(formData?.BornOutsideDocuments?.notary ? formData?.BornOutsideDocuments?.notary : null);

//   const [marriageCertificateFile, setMarriageCertificateFile] = useState(formData?.BornOutsideDocuments?.marriageCertificateFile ? formData?.BornOutsideDocuments?.marriageCertificateFile : null);
//   const [marriageCertificate, setMarriageCertificate] = useState(formData?.BornOutsideDocuments?.marriageCertificate ? formData?.BornOutsideDocuments?.marriageCertificate : null);

//   const [nationalityFile, setNationalityFile] = useState(formData?.BornOutsideDocuments?.nationalityFile ? formData?.BornOutsideDocuments?.nationalityFile : null);
//   const [nationality, setNationality] = useState(formData?.BornOutsideDocuments?.nationality ? formData?.BornOutsideDocuments?.nationality : null);

//   const [magistrateFile, setMagistrateFile] = useState(formData?.BornOutsideDocuments?.magistrateFile ? formData?.BornOutsideDocuments?.magistrateFile : null);
//   const [magistrate, setMagistrate] = useState(formData?.BornOutsideDocuments?.magistrate ? formData?.BornOutsideDocuments?.magistrate : null);

//   const onSkip = () => onSelect();
//   const [error, setError] = useState(null);

//   function selectBirth(e) {
//     setChildBirthCertificateFile(e.target.files[0]);
//   }
//   function selectfile1(e) {
//     setChildPassportFile(e.target.files[0]);
//   }
//   function selectfile2(e) {
//     setCitizenshipFile(e.target.files[0]);
//   }
//   function selectfile3(e) {
//     setFatherPassportFile(e.target.files[0]);
//   }
//   function selectfile4(e) {
//     setMotherPassportFile(e.target.files[0]);
//   }
//   function selectfile5(e) {
//     setCancellingVisaFile(e.target.files[0]);
//   }
//   function selectfile6(e) {
//     setAddressProofFile(e.target.files[0]);
//   }
//   function selectfile7(e) {
//     setNotaryFile(e.target.files[0]);
//   }
//   function selectfile8(e) {
//     setMarriageCertificateFile(e.target.files[0]);
//   }
//   function selectfile9(e) {
//     setNationalityFile(e.target.files[0]);
//   }
//   function selectfile10(e) {
//     setMagistrateFile(e.target.files[0]);
//   }
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (childBirthCertificateFile) {
//         if (childBirthCertificateFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage(
//               "bornOutsideIndia",
//               childBirthCertificateFile,
//               tenantId
//             );
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               console.log(fileDetails,"FL")
//               setChildBirthCertificate(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [childBirthCertificateFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (childPassportFile) {
//         if (childPassportFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", childPassportFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setChildPassport(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [childPassportFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (citizenshipFile) {
//         if (citizenshipFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", citizenshipFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setCitizenship(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [citizenshipFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (fatherPassportFile) {
//         if (fatherPassportFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", fatherPassportFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setFatherPassport(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [fatherPassportFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (motherPassportFile) {
//         if (motherPassportFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", motherPassportFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setMotherPassport(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [motherPassportFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (cancellingVisaFile) {
//         if (cancellingVisaFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", cancellingVisaFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setCancellingVisa(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [cancellingVisaFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (addressProofFile) {
//         if (addressProofFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", addressProofFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setCancellingVisa(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [addressProofFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (notaryFile) {
//         if (notaryFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", notaryFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setCancellingVisa(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [notaryFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (marriageCertificateFile) {
//         if (marriageCertificateFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", marriageCertificateFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setCancellingVisaFile(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [marriageCertificateFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (nationalityFile) {
//         if (nationalityFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", nationalityFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setCancellingVisa(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [nationalityFile]);
//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (magistrateFile) {
//         if (magistrateFile.size >= 2000000) {
//           setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("citizen-profile", magistrateFile, tenantId);
//             if (response?.data?.files?.length > 0) {
//               const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
//               setCancellingVisa(fileDetails);
//             } else {
//               setError(t("FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {}
//         }
//       }
//     })();
//   }, [magistrateFile]);

//   console.log({childBirthCertificate})

//   let validFlag = true;
//   const goNext = () => {
//     if (validFlag == true) {
//       onSelect(config.key, {
//         childBirthCertificateFile,
//         childPassportFile,
//         citizenshipFile,
//         fatherPassportFile,
//         motherPassportFile,
//         cancellingVisaFile,
//         addressProofFile,
//         notaryFile,
//         marriageCertificateFile,
//         nationalityFile,
//         magistrateFile,
//       });
//     }
//   };

//   return (
//     <React.Fragment>
// {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
// {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
// <FormStep
//   t={t}
//   config={config}
//   onSelect={goNext}
//   onSkip={onSkip}
//   isDisabled={
//     !childBirthCertificateFile ||
//     !childPassportFile ||
//     !citizenshipFile ||
//     !fatherPassportFile ||
//     !motherPassportFile ||
//     !cancellingVisaFile ||
//     !addressProofFile ||
//     !notaryFile ||
//     !marriageCertificateFile ||
//     !nationalityFile ||
//     !magistrateFile
//   }
// >
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="headingh1" style={{ marginTop: "30px" }}>
//               <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SUPPORTING_DOC")}`}</span>{" "}
//             </h1>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-12">
//             <div className="row">
//               <div className="col-md-6">
// <CardLabel>
//   {`${t("CR_CHILD_BIRTH_CERTIFICATE")}`}
//   <span className="mandatorycss">*</span>
// </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={(e) => setChildBirthCertificateFile(e.target.files[0])}
//                   onDelete={() => {
//                     setChildBirthCertificateFile(null);
//                   }}
//                   message={childBirthCertificateFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//               {childBirthCertificate && (
//                 <div className="col-md-4">
//                   {_.head(childBirthCertificate)?.type === "pdf" ? (
//                     <React.Fragment>
//                       <object
//                         style={{ margin: "5px 0" }}
//                         height={120}
//                         width={100}
//                         data={_.head(childBirthCertificate)?.pdfUrl}
//                         alt="Other Certificate Pdf"
//                       />
//                     </React.Fragment>
//                   ) : (
//                     <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(childBirthCertificate)?.small} alt="Other Certificate Image" />
//                   )}
//                   <a
//                     style={{ color: "blue" }}
//                     target="_blank"
//                     href={_.head(childBirthCertificate)?.type === "pdf" ? _.head(childBirthCertificate)?.pdfUrl : _.head(childBirthCertificate)?.large}
//                   >
//                     Preview
//                   </a>
//                 </div>
//               )}
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_CHILD'S_PASSPORT")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile1}
//                   onDelete={() => {
//                     setChildPassportFile(null);
//                   }}
//                   message={childPassportFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_CERTIFICATE_OF_INDIAN_CITIZENSHIP")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile2}
//                   onDelete={() => {
//                     setCitizenshipFile(null);
//                   }}
//                   message={citizenshipFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_FATHER'S_PASSPORT")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile3}
//                   onDelete={() => {
//                     setFatherPassportFile(null);
//                   }}
//                   message={fatherPassportFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_MOTHER'S_PASSPORT")}`} <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile4}
//                   onDelete={() => {
//                     setMotherPassportFile(null);
//                   }}
//                   message={motherPassportFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_DOCUMENT_ON_CANCELLING_VISA")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile5}
//                   onDelete={() => {
//                     setCancellingVisaFile(null);
//                   }}
//                   message={cancellingVisaFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>

//             {/*  */}
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_ADDRESS_PROOF")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile6}
//                   onDelete={() => {
//                     setAddressProofFile(null);
//                   }}
//                   message={addressProofFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_NOTARY_AFFIDAVIT_OF_PERMANENT_SETTLING_AND_RESIDENCY_IN_INDIA")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile7}
//                   onDelete={() => {
//                     setNotaryFile(null);
//                   }}
//                   message={notaryFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_MARRIAGE_CERTIFICATE_OF_PARENTS")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile8}
//                   onDelete={() => {
//                     setMarriageCertificateFile(null);
//                   }}
//                   message={marriageCertificateFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_CHECK_NATIONALITY")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile9}
//                   onDelete={() => {
//                     setNationalityFile(null);
//                   }}
//                   message={nationalityFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <CardLabel>
//                   {`${t("CR_PROCEEDINGS_OF_SUB_DIVISIONAL_MAGISTRATE")}`}
//                   <span className="mandatorycss">*</span>
//                 </CardLabel>
//               </div>
//               <div className="col-md-6">
//                 <UploadFile
//                   extraStyleName={"propertyCreate"}
//                   accept=".jpg,.png,.pdf"
//                   onUpload={selectfile10}
//                   onDelete={() => {
//                     setMagistrateFile(null);
//                   }}
//                   message={magistrateFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </FormStep>
//     </React.Fragment>
//   );
// };
// export default BornOutsideDocuments;
