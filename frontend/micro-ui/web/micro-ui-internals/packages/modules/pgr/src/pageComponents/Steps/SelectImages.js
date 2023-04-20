import React, { useState, useEffect } from "react";
import { FormStep, ImageUploadHandler, CardLabel, UploadFile } from "@egovernments/digit-ui-react-components";
import PGRTimeline from "../../components/PGRTimeline";
import EmpTimeLine from "../../components/EmpPGRTimeline"

const SelectImages = ({ t, config, onSelect, onSkip, value }) => {
  const [uploadedImages, setUploadedImagesIds] = useState(() => {
    const { uploadedImages } = value;
    return uploadedImages ? uploadedImages : null;
  });
  const [file, setFile] = useState("")
  const [error, setError] = useState(null)
  const [uploadedFile, setUploadedFile] = useState([])

  const handleUpload = (ids) => {
    setUploadedImagesIds(ids);
    setUploadedFile(ids);
    // Digit.SessionStorage.set("PGR_CREATE_IMAGES", ids);
  };

  const handleSubmit = () => {
    if (!uploadedFile || uploadedFile.length === 0) return onSkip();
    onSelect({ uploadedImages: uploadedFile });
  };

  useEffect(() => {
    (async () => {
      setError(null)
      if (file) {
        const allowedFileTypesRegex = /(.*?)(pdf)$/i
        if (file.size >= 2242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else if (file?.type && !allowedFileTypesRegex.test(file?.type)) {
          setError(t(`NOT_SUPPORTED_FILE_TYPE`))
        } else {
          const response = await Digit.UploadServices.Filestorage("property-upload", file, value.city_complaint?.code);
          if (response && response.data?.files?.length > 0) {
            if (uploadedFile.length > 0) {
              setUploadedFile(old => [...old, response?.data?.files[0]?.fileStoreId]);
            } else {
              setUploadedFile([response?.data?.files[0]?.fileStoreId]);
            }
          } else {
            setError(t("CS_FILE_UPLOAD_ERROR"));
          }
        }
      }
    })();
  }, [file]);

  const getData = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <PGRTimeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <EmpTimeLine currentStep={3} /> : null}
      <FormStep config={config} onSelect={handleSubmit} onSkip={onSkip} t={t} isDisabled={uploadedFile.length === 0}>
        <CardLabel>{`${t("CS_IMAGES")}`}<span> {t("PGR_IMAGE_LIMIT")}</span></CardLabel>
        <ImageUploadHandler tenantId={value.city_complaint?.code} uploadedImages={uploadedImages} onPhotoChange={handleUpload} />
        {window.location.href.includes("/employee") && <div style={{ marginBottom: "20px" }}>
          <CardLabel>{`${t("CS_SUPPORTING_DOC")}`}</CardLabel>
          <UploadFile
            id={"PGR-doc"}
            extraStyleName={"propertyCreate"}
            accept=".pdf"
            onUpload={getData}
            message={uploadedFile ? `${uploadedFile.length} - ${t(`CR_DOCUMENTS`)}` : t(`CR_DOCUMENTS`)}
            error={error}
          /></div>}
      </FormStep>
    </React.Fragment>
  );
};

export default SelectImages;
