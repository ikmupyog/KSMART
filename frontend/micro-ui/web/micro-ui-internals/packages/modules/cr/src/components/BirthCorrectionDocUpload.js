import {
    DropIcon,
    EmployeeModuleCard,
    PopUp,
    EditButton,
    UploadFile,
    RadioButtons,
    DatePicker,
    Loader,
    CheckBox
  } from "@egovernments/digit-ui-react-components";
  import React, { useEffect, useState } from "react";
  import { useTranslation } from "react-i18next";
  import { checkForEmployee } from "../utils";
  import { BIRTH_INCLUSION_FIELD_NAMES, BIRTH_INCLUSION_DOC_FLAGS } from "../config/constants";
  import moment from "moment";
  import { convertEpochToDate } from "../utils";
  
  const BirthCorrectionDocUpload = ({ title, showModal, onSubmit, hideModal, selectedConfig, selectedDocs, selectedDocData, selectedBirthData }) => {
    const { t } = useTranslation();
    const fieldName = BIRTH_INCLUSION_FIELD_NAMES[selectedConfig?.documentData?.[0]?.CorrectionField];
    return (
    <div style={{width:"30%", height:"150%", backgroundColor:'white', borderRadius: "0.5rem", marginTop: "0.5rem"}}>
    <fieldset style={{ border: "3px solid black"}}>
      <legend style={{ margin: "5px"}}>Correction Procedures and Guidelines</legend>
      {/* <p>Date Of Birth</p> */}
      <h1 className="headingh1">
    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(`CR_${fieldName}`)}`}</span>{" "}
  </h1>
      <p>gfhgfh</p>
    </fieldset>
   
  </div>
    );
  };
  
  export default BirthCorrectionDocUpload;
  