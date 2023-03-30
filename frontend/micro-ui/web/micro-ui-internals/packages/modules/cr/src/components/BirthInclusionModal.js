import { DropIcon, EmployeeModuleCard, PopUp, EditButton } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";
import { BIRTH_INCLUSION_FIELD_NAMES } from "../config/constants";

const BirthInclusionModal = ({ title, showModal, hideModal, selectedConfig }) => {
  const { t } = useTranslation();
  const fieldName = BIRTH_INCLUSION_FIELD_NAMES[selectedConfig?.CorrectionField];

  const InclusionCard = ({ data }) => {
    return (
      <div style={{padding:".5rem, 0,.5rem, 0"}}>
        <h1 style={{fontWeight: "bold"}}>
            {data.DocumentType}
            </h1>
        <UploadDoc
          id={"tl-doc"}
          extraStyleName={"propertyCreate"}
          accept=".jpg,.png,.pdf"
          // onUpload={handleFileEvent}
          // onUpload={selectfile}
          // onDelete={() => {
          //   setUploadedFile(null);
          // }}
          message={`${t(`TL_ACTION_FILEUPLOADED`)}`}
          // error={error}
        />
      </div>
    );
  };

  if (!showModal) {
    return null;
  }
  return (
    <PopUp>
      <div className="popup-module p-5" style={{padding:"1rem", borderRadius:"1rem"}}>
        {/* <h1 style={{fontWeight:600,marginBottom:"1rem"}}></h1> */}
        <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${fieldName} CHANGE`}</span>{" "}
            </h1>
        <h2 style={{marginBottom:"1rem"}}>{`You have to upload the following documents to edit ${fieldName?.toLowerCase()}.`}</h2>
        {selectedConfig?.Documents?.map((item) => (
          <InclusionCard data={item}/>
        ))}
      
        <EditButton
          selected={true}
          label={"Submit"}
          onClick={() => {
            hideModal();
          }}
        />
          <EditButton
          selected={false}
          label={"Cancel"}
          onClick={() => {
            hideModal();
          }}
        />
      </div>
     </PopUp>
  );
};

export default BirthInclusionModal;
