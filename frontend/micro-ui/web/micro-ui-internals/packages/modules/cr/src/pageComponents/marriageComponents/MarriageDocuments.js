import React, { useState, useEffect } from "react";
import { FormStep, BackButton, CardLabel, UploadFile, Dropdown, ImageUploadHandler } from "@egovernments/digit-ui-react-components";
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

  function handleUpload(ids) {
    setUploadedImagesIds(ids);
  }

  function setSelectAgeDocument(value) {
    setAgeDocument(value);
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
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PHOTOS")}`}</span>{" "}
                  </h1>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-6" style={{ margin: "10px 0 30px 0" }}>
                  <div style={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                    <h2 style={{ marginBottom: "10px", textAlign: "center" }}>CR_GROOM_IMAGE</h2>
                    <ImageUploadHandler
                      tenantId={tenantId}
                      uploadedImages={uploadedImages}
                      onPhotoChange={handleUpload}
                      isMulti={false}
                      moduleType={`crmarriage/${uniqueId}/groom/${currentYear}`}
                      extraParams={{ fileName: "groom.jpg", UUID: uniqueId }}
                    />
                  </div>
                </div>
                <div className="col-md-6" style={{ margin: "10px 0 30px 0" }}>
                  <div style={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                    <h2 style={{ marginBottom: "10px", textAlign: "center" }}>CR_BRIDE_IMAGE</h2>
                    <ImageUploadHandler
                      tenantId={tenantId}
                      uploadedImages={uploadedImages}
                      onPhotoChange={handleUpload}
                      isMulti={false}
                      moduleType={`crmarriage/${uniqueId}/bride/${currentYear}`}
                      extraParams={{ fileName: "bride.jpg", UUID: uniqueId }}
                    />
                  </div>
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
                  {groomResidentship &&
                    residentshipDocuments[groomResidentship].map((document) => {
                      return (
                        <div className="col-md-12">
                          <CardLabel>
                            {`${t(`CR_UPLOAD_YOUR_${document}`)}`}
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
                      );
                    })}
                </div>
                <div className="col-md-6">
                  {brideResidentship &&
                    residentshipDocuments[brideResidentship].map((document) => {
                      return (
                        <div className="col-md-12">
                          <CardLabel>
                            {`${t(`CR_UPLOAD_YOUR_${document}`)}`}
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
                      );
                    })}
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
    <div className="col-md-4"></div>
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
            <React.Fragment>
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
            </React.Fragment>
            // </div>
          )}

          <div className="col-md-6">
            {(brideMaritalstatusID === "MARRIED" || brideMaritalstatusID === "ANNULLED") && (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )}
  <div className="row">
    <div className="col-md-4"></div>
    <div className="col-md-4">
      <h1 className="headingh1">
        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_SPOUSE_DIED")}`}</span>{" "}
      </h1>
    </div>
    <div className="col-md-4"></div>
  </div>
  {(expirationTypeHusband || expirationTypeWife) && (
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
  )}
; */
}
