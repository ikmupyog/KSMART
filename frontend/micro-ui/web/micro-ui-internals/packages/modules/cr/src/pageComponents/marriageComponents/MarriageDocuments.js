import React, { useState, useEffect } from "react";
import { FormStep, BackButton, CardLabel, UploadFile } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

const MarriageDocuments = ({ formData, config }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();

  const [uniqueId, setUniqueId] = useState(null);

  const goNext = () => {};
  const onSkip = () => onSelect();

  useEffect(() => {
    setUniqueId(uuidv4());
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <BackButton>{t("CS_COMMON_BACK")}</BackButton>
          {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
          {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
          <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_DOCUMENTS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DOCUMENT_OPTIONS")}`}</span>{" "}
                      </h1>
                    </div>
                    <div className="col-md-4">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_    _DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                    <div className="col-md-4">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <h1 className="headingh1">
                          <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_FOR_RESIDENTSHIP")}`}</span>{" "}
                        </h1>
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_UPLOAD_YOUR_AADHAR")}`}
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
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_UPLOAD_YOUR_AADHAR")}`}
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
    </React.Fragment>
  );
};
export default MarriageDocuments;

{
  /* 

                
                  
                    
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_UPLOAD_YOUR_AADHAR")}`}
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
</div> */
}
