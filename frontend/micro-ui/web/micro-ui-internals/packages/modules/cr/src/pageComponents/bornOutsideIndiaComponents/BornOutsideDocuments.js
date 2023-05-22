import React, { useState, useEffect } from "react";
import Timeline from "../../components/BOBRTimeline";
import { FormStep, CardLabel, UploadFile } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { trimURL } from "../../utils";

const BornOutsideDocuments = ({ config, onSelect, formData }) => {
  const { t } = useTranslation();

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  const [error, setError] = useState(null);

  const [childBirthCertificateFile, setChildBirthCertificateFile] = useState(
    formData?.BornOutsideDocuments?.childBirthCertificateFile ? formData?.BornOutsideDocuments?.childBirthCertificateFile : null
  );
  const [childBirthCertificate, setChildBirthCertificate] = useState(
    formData?.BornOutsideDocuments?.childBirthCertificate ? formData?.BornOutsideDocuments?.childBirthCertificate : null
  );

  const [childPassportFile, setChildPassportFile] = useState(
    formData?.BornOutsideDocuments?.childPassportFile ? formData?.BornOutsideDocuments?.childPassportFile : null
  );
  const [childPassport, setChildPassport] = useState(
    formData?.BornOutsideDocuments?.childPassport ? formData?.BornOutsideDocuments?.childPassport : null
  );

  const [citizenshipFile, setCitizenshipFile] = useState(formData?.BornOutsideDocuments?.citizenshipFile ? formData?.BornOutsideDocuments?.citizenshipFile : null);
  const [citizenship, setCitizenship] = useState(formData?.BornOutsideDocuments?.citizenship ? formData?.BornOutsideDocuments?.citizenship : null);

  const [fatherPassportFile, setFatherPassportFile] = useState(formData?.BornOutsideDocuments?.fatherPassportFile ? formData?.BornOutsideDocuments?.fatherPassportFile : null);
  const [fatherPassport, setFatherPassport] = useState(formData?.BornOutsideDocuments?.fatherPassport ? formData?.BornOutsideDocuments?.fatherPassport : null);

  const [motherPassportFile, setMotherPassportFile] = useState(formData?.BornOutsideDocuments?.motherPassportFile ? formData?.BornOutsideDocuments?.motherPassportFile : null);
  const [motherPassport, setMotherPassport] = useState(formData?.BornOutsideDocuments?.motherPassport ? formData?.BornOutsideDocuments?.motherPassport : null);

  const [cancellingVisaFile, setCancellingVisaFile] = useState(formData?.BornOutsideDocuments?.cancellingVisaFile ? formData?.BornOutsideDocuments?.cancellingVisaFile : null);
   const [cancellingVisa, setCancellingVisa] = useState(formData?.BornOutsideDocuments?.cancellingVisa ? formData?.BornOutsideDocuments?.cancellingVisa : null);

  const [addressProofFile, setAddressProofFile] = useState(formData?.BornOutsideDocuments?.addressProofFile ? formData?.BornOutsideDocuments?.addressProofFile : null);
  const [addressProof, setAddressProof] = useState(formData?.BornOutsideDocuments?.addressProof ? formData?.BornOutsideDocuments?.addressProof : null);

  const [notaryFile, setNotaryFile] = useState(formData?.BornOutsideDocuments?.notaryFile ? formData?.BornOutsideDocuments?.notaryFile : null);
  const [notary, setNotary] = useState(formData?.BornOutsideDocuments?.notary ? formData?.BornOutsideDocuments?.notary : null);

  const [marriageCertificateFile, setMarriageCertificateFile] = useState(formData?.BornOutsideDocuments?.marriageCertificateFile ? formData?.BornOutsideDocuments?.marriageCertificateFile : null);
  const [marriageCertificate, setMarriageCertificate] = useState(formData?.BornOutsideDocuments?.marriageCertificate ? formData?.BornOutsideDocuments?.marriageCertificate : null);

  const [nationalityFile, setNationalityFile] = useState(formData?.BornOutsideDocuments?.nationalityFile ? formData?.BornOutsideDocuments?.nationalityFile : null);
  const [nationality, setNationality] = useState(formData?.BornOutsideDocuments?.nationality ? formData?.BornOutsideDocuments?.nationality : null);

  const [magistrateFile, setMagistrateFile] = useState(formData?.BornOutsideDocuments?.magistrateFile ? formData?.BornOutsideDocuments?.magistrateFile : null);
  const [magistrate, setMagistrate] = useState(formData?.BornOutsideDocuments?.magistrate ? formData?.BornOutsideDocuments?.magistrate : null);

  const fetchFile = async (fileId) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([fileId], tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: trimURL(key.url.split(",")[1]), small: trimURL(key.url.split(",")[2]), key: key.id, type: fileType, pdfUrl: trimURL(key.url) };
    });
    console.log({ newThumbnails });
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
            const response = await Digit.UploadServices.Filestorage("bornoutside/childbirthcertificate", childBirthCertificateFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setChildBirthCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [childBirthCertificateFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (childPassportFile) {
        if (childPassportFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/childPassport", childPassportFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setChildPassport(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [childPassportFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (citizenshipFile) {
        if (citizenshipFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/citizenship", citizenshipFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setCitizenship(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [citizenshipFile]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (fatherPassportFile) {
        if (fatherPassportFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/fatherPassport", fatherPassportFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setFatherPassport(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [fatherPassportFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (motherPassportFile) {
        if (motherPassportFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/motherPassport", motherPassportFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setMotherPassport(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [motherPassportFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (cancellingVisaFile) {
        if (cancellingVisaFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/cancellingVisa", cancellingVisaFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setCancellingVisa(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [cancellingVisaFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (addressProofFile) {
        if (addressProofFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/addressProof", addressProofFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setAddressProof(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [addressProofFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (notaryFile) {
        if (notaryFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/notary", notaryFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setNotary(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [notaryFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (marriageCertificateFile) {
        if (marriageCertificateFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/marriageCertificate", marriageCertificateFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setMarriageCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [marriageCertificateFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (nationalityFile) {
        if (nationalityFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/nationality", nationalityFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setNationality(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [nationalityFile]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (magistrateFile) {
        if (magistrateFile.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("bornoutside/magistrate", magistrateFile, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setMagistrate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [magistrateFile]);


  const onSkip = () => onSelect();
  let validFlag = true;
  const goNext = () => {
    if (validFlag == true) {
            onSelect(config.key, {
              childBirthCertificateFile,
              childPassportFile,
              citizenshipFile,
              fatherPassportFile,
              motherPassportFile,
              cancellingVisaFile,
              addressProofFile,
              notaryFile,
              marriageCertificateFile,
              nationalityFile,
              magistrateFile,
            });
          }
  };

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
          !childBirthCertificateFile || 
          !childPassportFile ||
          !citizenshipFile ||
          !fatherPassportFile ||
          !motherPassportFile ||
          !cancellingVisaFile ||
          !addressProofFile ||
          !notaryFile ||
          !marriageCertificateFile ||
          !nationalityFile ||
          !magistrateFile
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
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_CHILD_BIRTH_CERTIFICATE")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setChildBirthCertificateFile(e.target.files[0])}
              onDelete={() => {
                setChildBirthCertificate(null);
              }}
              message={childBirthCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {childBirthCertificate && (
            <div className="col-md-2">
              {_.head(childBirthCertificate)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(childBirthCertificate)?.pdfUrl}
                    alt="Child Birth Certificate Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(childBirthCertificate)?.small}
                  alt="Child Birth Certificate Image"
                />
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
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_CHILD'S_PASSPORT")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setChildPassportFile(e.target.files[0])}
              onDelete={() => {
                setChildPassport(null);
              }}
              message={childPassport ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {childPassport && (
            <div className="col-md-2">
              {_.head(childPassport)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(childPassport)?.pdfUrl}
                    alt="Child Birth Certificate Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(childPassport)?.small}
                  alt="Child Birth Certificate Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(childPassport)?.type === "pdf" ? _.head(childPassport)?.pdfUrl : _.head(childPassport)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_CERTIFICATE_OF_INDIAN_CITIZENSHIP")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setCitizenshipFile(e.target.files[0])}
              onDelete={() => {
                setCitizenship(null);
              }}
              message={citizenship ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {citizenship && (
            <div className="col-md-2">
              {_.head(citizenship)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(citizenship)?.pdfUrl}
                    alt="Citizenship Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(citizenship)?.small}
                  alt="Citizenship Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(citizenship)?.type === "pdf" ? _.head(citizenship)?.pdfUrl : _.head(citizenship)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_FATHER'S_PASSPORT")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setFatherPassportFile(e.target.files[0])}
              onDelete={() => {
                setFatherPassport(null);
              }}
              message={fatherPassport ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {fatherPassport && (
            <div className="col-md-2">
              {_.head(fatherPassport)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(fatherPassport)?.pdfUrl}
                    alt="Father Passport Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(fatherPassport)?.small}
                  alt="Father Passport Pdf"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(fatherPassport)?.type === "pdf" ? _.head(fatherPassport)?.pdfUrl : _.head(fatherPassport)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_MOTHER'S_PASSPORT")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setMotherPassportFile(e.target.files[0])}
              onDelete={() => {
                setMotherPassport(null);
              }}
              message={motherPassport ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {motherPassport && (
            <div className="col-md-2">
              {_.head(motherPassport)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(motherPassport)?.pdfUrl}
                    alt="Mother Passport Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(motherPassport)?.small}
                  alt="Mother Passport Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(motherPassport)?.type === "pdf" ? _.head(motherPassport)?.pdfUrl : _.head(motherPassport)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_DOCUMENT_ON_CANCELLING_VISA")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setCancellingVisaFile(e.target.files[0])}
              onDelete={() => {
                setCancellingVisa(null);
              }}
              message={cancellingVisa ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {cancellingVisa && (
            <div className="col-md-2">
              {_.head(cancellingVisa)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(cancellingVisa)?.pdfUrl}
                    alt="Cancelling Visa Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(cancellingVisa)?.small}
                  alt="Cancelling Visa Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(cancellingVisa)?.type === "pdf" ? _.head(cancellingVisa)?.pdfUrl : _.head(cancellingVisa)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_ADDRESS_PROOF")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setAddressProofFile(e.target.files[0])}
              onDelete={() => {
                setAddressProof(null);
              }}
              message={addressProof ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {addressProof && (
            <div className="col-md-2">
              {_.head(addressProof)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(addressProof)?.pdfUrl}
                    alt="Address Proof Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(addressProof)?.small}
                  alt="Address Proof Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(addressProof)?.type === "pdf" ? _.head(addressProof)?.pdfUrl : _.head(addressProof)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_NOTARY_AFFIDAVIT_OF_PERMANENT_SETTLING_AND_RESIDENCY_IN_INDIA")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setNotaryFile(e.target.files[0])}
              onDelete={() => {
                setNotary(null);
              }}
              message={notary ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {notary && (
            <div className="col-md-2">
              {_.head(notary)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(notary)?.pdfUrl}
                    alt="Notary Affidavit Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(notary)?.small}
                  alt="Notary Affidavit Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(notary)?.type === "pdf" ? _.head(notary)?.pdfUrl : _.head(notary)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_MARRIAGE_CERTIFICATE_OF_PARENTS")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setMarriageCertificateFile(e.target.files[0])}
              onDelete={() => {
                setMarriageCertificate(null);
              }}
              message={marriageCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {marriageCertificate && (
            <div className="col-md-2">
              {_.head(marriageCertificate)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(marriageCertificate)?.pdfUrl}
                    alt="Marriage Certificate Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(marriageCertificate)?.small}
                  alt="Marriage Certificate Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(marriageCertificate)?.type === "pdf" ? _.head(marriageCertificate)?.pdfUrl : _.head(marriageCertificate)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_PROCEEDINGS_OF_SUB_DIVISIONAL_MAGISTRATE")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setMagistrateFile(e.target.files[0])}
              onDelete={() => {
                setMagistrate(null);
              }}
              message={magistrate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {magistrate && (
            <div className="col-md-2">
              {_.head(magistrate)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(magistrate)?.pdfUrl}
                    alt="Proceedings of sub divisional magistrate Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(magistrate)?.small}
                  alt="Proceedings of sub divisional magistrate Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(magistrate)?.type === "pdf" ? _.head(magistrate)?.pdfUrl : _.head(magistrate)?.large}
              >
                Preview
              </a>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {`${t("CR_CHECK_NATIONALITY")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
          </div>
          <div className="col-md-4">
            <UploadFile
              id={"born-ouside-docs"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={(e) => setNationalityFile(e.target.files[0])}
              onDelete={() => {
                setNationality(null);
              }}
              message={nationality ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            />
          </div>
          {nationality && (
            <div className="col-md-2">
              {_.head(nationality)?.type === "pdf" ? (
                <React.Fragment>
                  <object
                    style={{ margin: "5px 0" }}
                    height={120}
                    width={100}
                    data={_.head(nationality)?.pdfUrl}
                    alt="Check Nationality Pdf"
                  />
                </React.Fragment>
              ) : (
                <img
                  style={{ margin: "5px 0" }}
                  height={120}
                  width={100}
                  src={_.head(nationality)?.small}
                  alt="Check Nationality Image"
                />
              )}
              <a
                style={{ color: "blue" }}
                target="_blank"
                href={_.head(nationality)?.type === "pdf" ? _.head(nationality)?.pdfUrl : _.head(nationality)?.large}
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
