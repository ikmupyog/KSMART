import React, { useState, useEffect } from "react";
import Timeline from "../../components/AdoptionTimeline";
import { FormStep, CardLabel, UploadFile } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const AdoptionDocuments = ({ config, onSelect, formData = false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();

  const [uploadedFile, setUploadedFile] = useState(formData?.AdoptionDocuments?.uploadedFile);
  const [uploadedFile1, setUploadedFile1] = useState(formData?.AdoptionDocuments?.uploadedFile1);
  const [uploadedFile2, setUploadedFile2] = useState(formData?.AdoptionDocuments?.uploadedFile2);
  const [uploadedFile3, setUploadedFile3] = useState(formData?.AdoptionDocuments?.uploadedFile3);
  const [uploadedFile4, setUploadedFile4] = useState(formData?.AdoptionDocuments?.uploadedFile4);
  const [uploadedFile5, setUploadedFile5] = useState(formData?.AdoptionDocuments?.uploadedFile5);
  const [documentFile, setDocumentFile] = useState(formData?.AdoptionDocuments?.uploadedFile);
  const [proofFile, setProofFile] = useState(formData?.AdoptionDocuments?.uploadedFile1);
  const [registeredFile, setRegisteredFile] = useState(formData?.AdoptionDocuments?.uploadedFile2);
  const [motherIdFile, setMotherIdFile] = useState(formData?.AdoptionDocuments?.uploadedFile3);
  const [fatherIdFile, setFatherIdFile] = useState(formData?.AdoptionDocuments?.uploadedFile4);
  const [medicalFile, setMedicalFile] = useState(formData?.AdoptionDocuments?.uploadedFile5);
  const onSkip = () => onSelect();
  const [error, setError] = useState(null);

  function selectfile(e) {
    setDocumentFile(e.target.files[0]);
  }
  function selectfile1(e) {
    setProofFile(e.target.files[0]);
  }
  function selectfile2(e) {
    setRegisteredFile(e.target.files[0]);
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
      if (documentFile) {
        if (documentFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", documentFile, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [documentFile]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (proofFile) {
        if (proofFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", proofFile, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile1(response?.data?.files[0]?.fileStoreId);
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
      setError(null);
      if (registeredFile) {
        if (registeredFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", registeredFile, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile2(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [registeredFile]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (motherIdFile) {
        if (motherIdFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", motherIdFile, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile3(response?.data?.files[0]?.fileStoreId);
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
      setError(null);
      if (fatherIdFile) {
        if (fatherIdFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", fatherIdFile, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile4(response?.data?.files[0]?.fileStoreId);
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
      setError(null);
      if (medicalFile) {
        if (medicalFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", medicalFile, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile5(response?.data?.files[0]?.fileStoreId);
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
    if (validFlag == true) {
      onSelect(config.key, {
        uploadedFile,
        uploadedFile1,
        uploadedFile2,
        uploadedFile3,
        uploadedFile4,
        uploadedFile5,
        documentFile,
        proofFile,
        registeredFile,
        motherIdFile,
        fatherIdFile,
        medicalFile,
      });
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
        isDisabled={!documentFile || !proofFile || !registeredFile || !motherIdFile || !fatherIdFile || !medicalFile}
      >
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
                  {`${t("CR_ADOPTION_dOCUMENTS_AND_AADHAAR")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-6">
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
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_ADOPTION_RESIDENCE_OF_PARENTS")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-6">
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
            <div className="row">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_ADOPTION_REGISTERED_DEED")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-6">
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
            <div className="row">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_ADOPTION_COPY_OF_BIRTH_CERTIFICATE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-6">
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
            <div className="row">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_NAC_DONWLOAD_ID_PROOF_OF_FATHER")}`} <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-6">
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
            <div className="row">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_ADOPTION_CERTIFICATE_ISSUED_BY_SURGEON")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
              </div>
              <div className="col-md-6">
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
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AdoptionDocuments;
