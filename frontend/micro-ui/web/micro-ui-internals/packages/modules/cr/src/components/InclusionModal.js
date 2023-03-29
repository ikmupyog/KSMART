import { DropIcon, EmployeeModuleCard, PopUp, EditButton } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";

const InclusionModal = ({ title, showModal, hideModal }) => {
  const { t } = useTranslation();
 const selectedConfig=[{title: "Marriage Certificate"}]
  const InclusionCard = ({ data }) => {
    return (
      <React.Fragment>
        <h1 style={{fontSize: "1.5rem",marginTop: "2rem"}}>{data.title}</h1>
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
      </React.Fragment>
    );
  };

  if (!showModal) {
    return null;
  }
  return (
      <div className="popup-module">
        {selectedConfig?.map((item) => (
          <InclusionCard data={item}/>
        ))}
        <EditButton
          selected={true}
          label={"Cancel"}
          onClick={() => {
            hideModal();
          }}
        />
      </div>
  );
};

export default InclusionModal;