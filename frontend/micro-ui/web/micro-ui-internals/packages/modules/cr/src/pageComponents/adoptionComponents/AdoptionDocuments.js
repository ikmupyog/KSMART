import React, { useState, useEffect } from "react";
import Timeline from "../../components/AdoptionTimeline";
import { FormStep, CardLabel, UploadFile } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { trimURL } from "../../utils";

const AdoptionDocuments = ({ config, onSelect, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [uploadedFile, setUploadedFile] = useState(formData?.AdoptionDocuments?.uploadedFile ? formData?.AdoptionDocuments?.uploadedFile : null);
  const [uploadedFile1, setUploadedFile1] = useState(formData?.AdoptionDocuments?.uploadedFile1 ? formData?.AdoptionDocuments?.uploadedFile1 : null);
  const [uploadedFile2, setUploadedFile2] = useState(formData?.AdoptionDocuments?.uploadedFile2 ? formData?.AdoptionDocuments?.uploadedFile2 : null);
  const [uploadedFile3, setUploadedFile3] = useState(formData?.AdoptionDocuments?.uploadedFile3 ? formData?.AdoptionDocuments?.uploadedFile3 : null);
  const [uploadedFile4, setUploadedFile4] = useState(formData?.AdoptionDocuments?.uploadedFile4 ? formData?.AdoptionDocuments?.uploadedFile4 : null);
  const [uploadedFile5, setUploadedFile5] = useState(formData?.AdoptionDocuments?.uploadedFile5 ? formData?.AdoptionDocuments?.uploadedFile5 : null);
  const [documentFile, setDocumentFile] = useState(formData?.AdoptionDocuments?.documentFile ? formData?.AdoptionDocuments?.documentFile : null);
  const [proofFile, setProofFile] = useState(formData?.AdoptionDocuments?.proofFile ? formData?.AdoptionDocuments?.proofFile : null);
  const [registeredFile, setRegisteredFile] = useState(
    formData?.AdoptionDocuments?.registeredFile ? formData?.AdoptionDocuments?.registeredFile : null
  );
  const [motherIdFile, setMotherIdFile] = useState(formData?.AdoptionDocuments?.motherIdFile ? formData?.AdoptionDocuments?.motherIdFile : null);
  const [fatherIdFile, setFatherIdFile] = useState(formData?.AdoptionDocuments?.fatherIdFile ? formData?.AdoptionDocuments?.fatherIdFile : null);
  const [medicalFile, setMedicalFile] = useState(formData?.AdoptionDocuments?.uploadedFile5 ? formData?.AdoptionDocuments?.uploadedFile5 : null);
  const onSkip = () => onSelect();
  const [documentFileError, setDocumentFileError] = useState(null);
  const [proofFileError, setProofFileError] = useState(null);
  const [registeredFileError, setRegisteredFileError] = useState(null);
  const [motherIdFileError, setMotherIdFileError] = useState(null);
  const [fatherIdFileError, setFatherIdFileError] = useState(null);
  const [medicalFileError, setMedicalFileError] = useState(null);
  const [error, setError] = useState(null);
  const [docPreview, setDocPreview] = useState(formData?.AdoptionDocuments?.docPreview ? formData?.AdoptionDocuments?.docPreview : null);
  const [proofFileDocPreview, setProofFileDocPreview] = useState(
    formData?.AdoptionDocuments?.docPreview ? formData?.AdoptionDocuments?.docPreview : null
  );
  const [certificateFiledocPreview, setCertificateFileDocPreview] = useState(
    formData?.AdoptionDocuments?.docPreview ? formData?.AdoptionDocuments?.docPreview : null
  );
  const [motherIdFiledocPreview, setMotherIdFileDocPreview] = useState(
    formData?.AdoptionDocuments?.docPreview ? formData?.AdoptionDocuments?.docPreview : null
  );
  const [fatherIdFiledocPreview, setFatherIdFileDocPreview] = useState(
    formData?.AdoptionDocuments?.docPreview ? formData?.AdoptionDocuments?.docPreview : null
  );
  const [medicalFiledocPreview, setMedicalFileDocPreview] = useState(
    formData?.AdoptionDocuments?.docPreview ? formData?.AdoptionDocuments?.docPreview : null
  );
  const fetchFile = async (fileId) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([fileId], tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: trimURL(key.url.split(",")[1]), small: trimURL(key.url.split(",")[2]), key: key.id, type: fileType, pdfUrl: trimURL(key.url) };
    });
    return newThumbnails;
  };
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
      setDocumentFileError(null);
      if (documentFile) {
        if (documentFile.size >= 2000000) {
          setDocumentFileError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", documentFile, tenantId);
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
  }, [documentFile]);
  useEffect(() => {
    (async () => {
      setProofFileError(null);
      if (proofFile) {
        if (proofFile.size >= 2000000) {
          setProofFileError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
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
      setRegisteredFileError(null);
      if (registeredFile) {
        if (registeredFile.size >= 2000000) {
          setRegisteredFileError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", registeredFile, tenantId);
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
  }, [registeredFile]);
  useEffect(() => {
    (async () => {
      setMotherIdFileError(null);
      if (motherIdFile) {
        if (motherIdFile.size >= 2000000) {
          setMotherIdFileError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
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
      setFatherIdFileError(null);
      if (fatherIdFile) {
        if (fatherIdFile.size >= 2000000) {
          setFatherIdFileError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
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
      setMedicalFileError(null);
      if (medicalFile) {
        if (medicalFile.size >= 2000000) {
          setMedicalFileError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", medicalFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile5(response?.data?.files[0]?.fileStoreId);
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setFatherIdFileDocPreview(fileDetails);
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
        isDisabled={!documentFile || !proofFile || !registeredFile || !motherIdFile || !fatherIdFile}
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
                {documentFileError ? (
                  <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{documentFileError}</div>
                ) : (
                  ""
                )}
              </div>
              {docPreview && (
                <div className="col-md-3">
                  {_.head(docPreview)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(docPreview)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(docPreview)?.small} alt="Child Birth Certificate Image" />
                  )}
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href={_.head(docPreview)?.type === "pdf" ? _.head(docPreview)?.pdfUrl : _.head(docPreview)?.large}
                  >
                    Preview
                  </a>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_ADOPTION_RESIDENCE_OF_PARENTS")}`}
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
                {proofFileError ? (
                  <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{proofFileError}</div>
                ) : (
                  ""
                )}
              </div>
              {proofFileDocPreview && (
                <div className="col-md-3">
                  {_.head(proofFileDocPreview)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(proofFileDocPreview)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(proofFileDocPreview)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
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
                <CardLabel>
                  {`${t("CR_ADOPTION_REGISTERED_DEED")}`}
                  <span className="mandatorycss">*</span>
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
                  message={uploadedFile2 ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                />
              </div>
              <div className="col-md-3">
                {registeredFileError ? (
                  <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{registeredFileError}</div>
                ) : (
                  ""
                )}
              </div>
              {certificateFiledocPreview && (
                <div className="col-md-3">
                  {_.head(certificateFiledocPreview)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(certificateFiledocPreview)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(certificateFiledocPreview)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
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
                  {`${t("CR_ADOPTION_COPY_OF_BIRTH_CERTIFICATE")}`}
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
                {motherIdFileError ? (
                  <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{motherIdFileError}</div>
                ) : (
                  ""
                )}
              </div>
              {motherIdFiledocPreview && (
                <div className="col-md-3">
                  {_.head(motherIdFiledocPreview)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(motherIdFiledocPreview)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(motherIdFiledocPreview)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href={
                      _.head(motherIdFiledocPreview)?.type === "pdf" ? _.head(motherIdFiledocPreview)?.pdfUrl : _.head(motherIdFiledocPreview)?.large
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
                {fatherIdFileError ? (
                  <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{fatherIdFileError}</div>
                ) : (
                  ""
                )}
              </div>
              {fatherIdFiledocPreview && (
                <div className="col-md-3">
                  {_.head(fatherIdFiledocPreview)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(fatherIdFiledocPreview)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(fatherIdFiledocPreview)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href={
                      _.head(fatherIdFiledocPreview)?.type === "pdf" ? _.head(fatherIdFiledocPreview)?.pdfUrl : _.head(fatherIdFiledocPreview)?.large
                    }
                  >
                    Preview
                  </a>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6">
                <CardLabel>{`${t("CR_ADOPTION_CERTIFICATE_ISSUED_BY_SURGEON")}`}</CardLabel>
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
                {medicalFileError ? (
                  <div style={{ height: "20px", width: "100%", fontSize: "15px", color: "red", paddingLeft: "50px" }}>{medicalFileError}</div>
                ) : (
                  ""
                )}
              </div>
              {medicalFiledocPreview && (
                <div className="col-md-3">
                  {_.head(medicalFiledocPreview)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(medicalFiledocPreview)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(medicalFiledocPreview)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
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
      </FormStep>
    </React.Fragment>
  );
};
export default AdoptionDocuments;
