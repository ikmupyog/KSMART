import { DropIcon, EmployeeModuleCard, PopUp, EditButton, FormStep,
  UploadFile, } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";

const DeathCorrectionModal = ({ title, showModal, hideModal, selectedConfig }) => {
  const { t } = useTranslation();
  const InclusionCard = ({ data }) => {
    return (
      <React.Fragment>
      
        <h1>{data.title}</h1>
        <UploadDoc
          id={"tl-doc"}
          extraStyleName={"propertyCreate"}
          accept=".jpg,.png,.pdf"
          // onUpload={handleFileEvent}
          // onUpload={selectfile}
          // onDelete={() => {
          //   setUploadedFile(null);
          // }}
          message={`${t(`TL_ACTION_FILE_UPLOADED`)}`}
          // error={error}
        />
      </React.Fragment>
    );
  };

  if (!showModal) {
    return null;
  }
  return (
    <PopUp>
    <div className="popup-module">
      <h1>populated modal</h1>
      <UploadFile
          id={"tl-doc"}
          extraStyleName={"propertyCreate"}
          accept=".jpg,.png,.pdf"
          // onUpload={handleFileEvent}
          // onUpload={selectfile}
          // onDelete={() => {
          //   setUploadedFile(null);
          // }}
          message={`${t(`TL_ACTION_FILE_UPLOADED`)}`}
          // error={error}
        />
      <EditButton
      selected={true}
      label={"Cancel"}
      onClick={() => {
        setShowModal(false);
      }}
    />
    </div>
  </PopUp>
  );
};

export default DeathCorrectionModal;