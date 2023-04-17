import React, { useState, useEffect } from "react";
import { FormStep, BackButton, CardLabel, UploadFile, Dropdown } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

const MarriageDocuments = ({ formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  const [ageDocument, setAgeDocument] = useState(
    formData?.MarriageDocuments?.ageDocument?.code ? formData?.MarriageDocuments?.ageDocument?.code : null
  );

  const [uniqueId, setUniqueId] = useState(null);
  const [uploadedImages, setUploadedImagesIds] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState([]);

  let validation = {};

  const groomResidentship = "FOREIGN";
  const brideResidentship = "FOREIGN";
  const marriagePlacetype = "RELIGIOUS_INSTITUTION";
  const groomMaritalstatusID = "MARRIED";
  const brideMaritalstatusID = "MARRIED";
  const expirationTypeHusband = true;
  const expirationTypeWife = true;

  const residentshipDocuments = {
    INDIAN: ["AADHAR"],
    NRI: ["PASSPORT"],
    FOREIGN: ["PASSPORT", "SOCIAL_SECURITY_DOCUMENT"],
  };

  const proofOfMarriageDocuments = {
    RELIGIOUS_INSTITUTION: "RELIGIOUS_INSTITUTION",
    MANDAPAM_HALL_AND_OTHER: "MANDAPAM_HALL_AND_OTHER",
    SUB_REGISTRAR_OFFICE: "SUB_REGISTRAR_OFFICE",
  };

  const crAgeDocuments = [
    {
      name: "Driving License",
      code: "DRIVING_LICENSE",
    },
    {
      name: "School Certificate",
      code: "SCHOOL_CERTIFICATE",
    },
    {
      name: "Birth Certificate",
      code: "BIRTH_CERTIFICATE",
    },
  ];

  function setSelectAgeDocument(value) {
    setAgeDocument(value);
  }

  function select(e) {
    setFile(e.target.files[0]);
  }

  const goNext = () => {
    onSelect(config.key, {
      ageDocument,
    });
  };
  const onSkip = () => onSelect();

  useEffect(() => {
    setUniqueId(uuidv4());
  }, []);
  console.log({ ageDocument });
  useEffect(() => {
    (async () => {
      // setError(null);
      if (file) {
        // const allowedFileTypesRegex = /(.*?)(pdf)$/i;
        if (file.size >= 2242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          // } else if (file?.type && !allowedFileTypesRegex.test(file?.type)) {
          //   setError(t(`NOT_SUPPORTED_FILE_TYPE`));
        } else {
          const response = await Digit.UploadServices.Filestorage("crmarriage", file, Digit.ULBService.getStateId());
          if (response && response.data?.files?.length > 0) {
            if (uploadedFile.length > 0) {
              setUploadedFile((old) => [...old, response?.data?.files[0]?.fileStoreId]);
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
  return (
    <div className="row">
      <div className="col-md-12">
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
          <div className="row">
            <div className="col-md-12" style={{ marginBottom: "20px" }}>
              <div className="row">
                <div className="col-md-12" style={{ marginBottom: "20px" }}>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_DOCUMENTS")}`}</span>{" "}
                  </h1>
                </div>
                <div className="col-md-6">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DOCUMENTS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_RESIDENTSHIP")}`}</span>{" "}
                  </h1>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {groomResidentship === "INDIAN" && (
                    <div className="col-md-12">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_AADHAR`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectAadhar}
                        onDelete={() => {
                          setUploadedFile(null);
                        }}
                        message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                  {groomResidentship === "NRI" && (
                    <React.Fragment>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_PASSPORT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectAadhar}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_SOCIAL_SECURITY_DOCUMENT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectAadhar}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    </React.Fragment>
                  )}
                  {groomResidentship === "FOREIGN" && (
                    <React.Fragment>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_PASSPORT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectAadhar}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_SOCIAL_SECURITY_DOCUMENT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectAadhar}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div className="col-md-6">
                  {brideResidentship === "INDIAN" && (
                    <div className="col-md-12">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_AADHAR`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectAadhar}
                        onDelete={() => {
                          setUploadedFile(null);
                        }}
                        message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                  {brideResidentship === "NRI" && (
                    <React.Fragment>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_PASSPORT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectAadhar}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_SOCIAL_SECURITY_DOCUMENT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectAadhar}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    </React.Fragment>
                  )}
                  {brideResidentship === "FOREIGN" && (
                    <React.Fragment>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_PASSPORT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectAadhar}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_SOCIAL_SECURITY_DOCUMENT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectAadhar}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_AGE")}`}</span>{" "}
                  </h1>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-7">
                    <CardLabel>
                      {`${t("CR_SELECT_DOCUMENT")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={true}
                      placeholder={t("CR_SELECT_DOCUMENT")}
                      option={crAgeDocuments}
                      selected={ageDocument}
                      select={setSelectAgeDocument}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_SELECT_DOCUMENT") })}
                    />
                  </div>
                  <div className="col-md-7">
                    <CardLabel>
                      {`${t(`CR_UPLOAD_YOUR_${ageDocument?.code || "AGE_PROVING_DOCUMENT"}`)}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <UploadFile
                    //   key={item.DocumentId}
                    //   id={item.DocumentId}
                    //   name={item.DocumentType}
                    //   extraStyleName={"propertyCreate"}
                    //   accept=".jpg,.png,.pdf"
                    //   onUpload={selectfile}
                    //   onDelete={() => {
                    //     onDeleteown(item.DocumentId);
                    //     setUploadedFile(null);
                    //   }}
                    //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    //   error={error}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="col-md-7">
                    <CardLabel>
                      {`${t("CR_SELECT_DOCUMENT")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={true}
                      placeholder={t("CR_SELECT_DOCUMENT")}
                      option={crAgeDocuments}
                      selected={ageDocument}
                      select={setSelectAgeDocument}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_SELECT_DOCUMENT") })}
                    />
                  </div>
                  <div className="col-md-7">
                    <CardLabel>
                      {`${t(`CR_UPLOAD_YOUR_${ageDocument?.code || "AGE_PROVING_DOCUMENT"}`)}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <UploadFile
                    //   key={item.DocumentId}
                    //   id={item.DocumentId}
                    //   name={item.DocumentType}
                    //   extraStyleName={"propertyCreate"}
                    //   accept=".jpg,.png,.pdf"
                    //   onUpload={selectfile}
                    //   onDelete={() => {
                    //     onDeleteown(item.DocumentId);
                    //     setUploadedFile(null);
                    //   }}
                    //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    //   error={error}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_MARRIAGE")}`}</span>{" "}
                  </h1>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <CardLabel>
                      {`${t(`CR_UPLOAD_MARRIAGE_CERTIFICATE_FROM_${proofOfMarriageDocuments[marriagePlacetype] || "AN INSTITUTION/SUB_REGISTRAR"}`)}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <UploadFile
                    //   key={item.DocumentId}
                    //   id={item.DocumentId}
                    //   name={item.DocumentType}
                    //   extraStyleName={"propertyCreate"}
                    //   accept=".jpg,.png,.pdf"
                    //   onUpload={selectfile}
                    //   onDelete={() => {
                    //     onDeleteown(item.DocumentId);
                    //     setUploadedFile(null);
                    //   }}
                    //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    //   error={error}
                    />
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
              {(groomMaritalstatusID === "MARRIED" ||
                groomMaritalstatusID === "ANNULLED" ||
                brideMaritalstatusID === "MARRIED" ||
                brideMaritalstatusID === "ANNULLED") && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_ALREADY_MARRIED")}`}</span>{" "}
                      </h1>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {(groomMaritalstatusID === "MARRIED" || groomMaritalstatusID === "ANNULLED") && (
                        // <div className="row">
                        <div className="col-md-12">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DIVORCE/ANNULLED_DECREE")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                          //   key={item.DocumentId}
                          //   id={item.DocumentId}
                          //   name={item.DocumentType}
                          //   extraStyleName={"propertyCreate"}
                          //   accept=".jpg,.png,.pdf"
                          //   onUpload={selectfile}
                          //   onDelete={() => {
                          //     onDeleteown(item.DocumentId);
                          //     setUploadedFile(null);
                          //   }}
                          //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          //   error={error}
                          />
                        </div>
                        // </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      {(brideMaritalstatusID === "MARRIED" || brideMaritalstatusID === "ANNULLED") && (
                        <div className="col-md-12">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DIVORCE/ANNULLED_DECREE")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                          //   key={item.DocumentId}
                          //   id={item.DocumentId}
                          //   name={item.DocumentType}
                          //   extraStyleName={"propertyCreate"}
                          //   accept=".jpg,.png,.pdf"
                          //   onUpload={selectfile}
                          //   onDelete={() => {
                          //     onDeleteown(item.DocumentId);
                          //     setUploadedFile(null);
                          //   }}
                          //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          //   error={error}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}
              {(expirationTypeHusband || expirationTypeWife) && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_SPOUSE_DIED")}`}</span>{" "}
                      </h1>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {expirationTypeHusband && (
                        <div className="row">
                          <div className="col-md-12"></div>
                          <CardLabel>
                            {`${t("CR_UPLOAD_DEATH_CERTIFICATE_OF_GROOM")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                          //   key={item.DocumentId}
                          //   id={item.DocumentId}
                          //   name={item.DocumentType}
                          //   extraStyleName={"propertyCreate"}
                          //   accept=".jpg,.png,.pdf"
                          //   onUpload={selectfile}
                          //   onDelete={() => {
                          //     onDeleteown(item.DocumentId);
                          //     setUploadedFile(null);
                          //   }}
                          //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          //   error={error}
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      {expirationTypeWife && (
                        <div className="row">
                          <div className="col-md-12">
                            <CardLabel>
                              {`${t("CR_UPLOAD_DEATH_CERTIFICATE_OF_BRIDE")}`}
                              <span className="mandatorycss">*</span>
                            </CardLabel>
                            <UploadFile
                            //   key={item.DocumentId}
                            //   id={item.DocumentId}
                            //   name={item.DocumentType}
                            //   extraStyleName={"propertyCreate"}
                            //   accept=".jpg,.png,.pdf"
                            //   onUpload={selectfile}
                            //   onDelete={() => {
                            //     onDeleteown(item.DocumentId);
                            //     setUploadedFile(null);
                            //   }}
                            //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                            //   error={error}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </FormStep>
      </div>
    </div>
  );
};
export default MarriageDocuments;

{
  /* 
  
  
  
  
  
  
  
  
  
  
  
  
  
; */
}

{
  /* <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-6">
                        <CardLabel>
                          {`${t("CR_WITNESS1_AADHAR")}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                        //   key={item.DocumentId}
                        //   id={item.DocumentId}
                        //   name={item.DocumentType}
                        //   extraStyleName={"propertyCreate"}
                        //   accept=".jpg,.png,.pdf"
                        //   onUpload={selectfile}
                        //   onDelete={() => {
                        //     onDeleteown(item.DocumentId);
                        //     setUploadedFile(null);
                        //   }}
                        //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        //   error={error}
                        />
                      </div>
                      <div className="col-md-6">
                        <CardLabel>
                          {`${t("CR_WITNESS1_AADHAR")}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                        //   key={item.DocumentId}
                        //   id={item.DocumentId}
                        //   name={item.DocumentType}
                        //   extraStyleName={"propertyCreate"}
                        //   accept=".jpg,.png,.pdf"
                        //   onUpload={selectfile}
                        //   onDelete={() => {
                        //     onDeleteown(item.DocumentId);
                        //     setUploadedFile(null);
                        //   }}
                        //   message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        //   error={error}
                        />
                      </div>
                    </div>
                  </div> */
}
