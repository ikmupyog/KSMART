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
  const [error, setError] = useState(null);
  const fetchFile = async (fileId) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([fileId], tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: trimURL(key.url.split(",")[1]), small: trimURL(key.url.split(",")[2]), key: key.id, type: fileType, pdfUrl: trimURL(key.url) };
    });
    console.log({ newThumbnails });
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
      setError(null);
      if (documentFile) {
        if (documentFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", documentFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setUploadedFile(fileDetails);
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
            const response = await Digit.UploadServices.Filestorage("citizen-profile", proofFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setUploadedFile1(fileDetails);
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
            const response = await Digit.UploadServices.Filestorage("citizen-profile", registeredFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setUploadedFile2(fileDetails);
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
            const response = await Digit.UploadServices.Filestorage("citizen-profile", motherIdFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setUploadedFile3(fileDetails);
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
            const response = await Digit.UploadServices.Filestorage("citizen-profile", fatherIdFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setUploadedFile4(fileDetails);
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
            const response = await Digit.UploadServices.Filestorage("citizen-profile", medicalFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setUploadedFile5(fileDetails);
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
              {uploadedFile && (
                <div className="col-md-3">
                  {_.head(uploadedFile)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(uploadedFile)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(uploadedFile)?.small} alt="Child Birth Certificate Image" />
                  )}
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href={_.head(uploadedFile)?.type === "pdf" ? _.head(uploadedFile)?.pdfUrl : _.head(uploadedFile)?.large}
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
              {uploadedFile1 && (
                <div className="col-md-3">
                  {_.head(uploadedFile1)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(uploadedFile1)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(uploadedFile1)?.small}
                      alt="Child Birth Certificate Image"
                    />
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
              {uploadedFile2 && (
                <div className="col-md-3">
                  {_.head(uploadedFile2)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(uploadedFile2)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(uploadedFile2)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href={_.head(uploadedFile2)?.type === "pdf" ? _.head(uploadedFile2)?.pdfUrl : _.head(uploadedFile2)?.large}
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
              {uploadedFile3 && (
                <div className="col-md-3">
                  {_.head(uploadedFile3)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(uploadedFile3)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(uploadedFile3)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href={_.head(uploadedFile3)?.type === "pdf" ? _.head(uploadedFile3)?.pdfUrl : _.head(uploadedFile3)?.large}
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
              {uploadedFile4 && (
                <div className="col-md-3">
                  {_.head(uploadedFile4)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(uploadedFile4)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(uploadedFile4)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href={_.head(uploadedFile4)?.type === "pdf" ? _.head(uploadedFile4)?.pdfUrl : _.head(uploadedFile4)?.large}
                  >
                    Preview
                  </a>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_ADOPTION_CERTIFICATE_ISSUED_BY_SURGEON")}`}
                  <span className="mandatorycss">*</span>
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
                  message={uploadedFile5 ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                />
              </div>
              {uploadedFile5 && (
                <div className="col-md-3">
                  {_.head(uploadedFile5)?.type === "pdf" ? (
                    <React.Fragment>
                      <object
                        style={{ margin: "5px 0" }}
                        height={120}
                        width={100}
                        data={_.head(uploadedFile5)?.pdfUrl}
                        alt="Child Birth Certificate Pdf"
                      />
                    </React.Fragment>
                  ) : (
                    <img
                      style={{ margin: "5px 0" }}
                      height={120}
                      width={100}
                      src={_.head(uploadedFile5)?.small}
                      alt="Child Birth Certificate Image"
                    />
                  )}
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href={_.head(uploadedFile5)?.type === "pdf" ? _.head(uploadedFile5)?.pdfUrl : _.head(uploadedFile5)?.large}
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
