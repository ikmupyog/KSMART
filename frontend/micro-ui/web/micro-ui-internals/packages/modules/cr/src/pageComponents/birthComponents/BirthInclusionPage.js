import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  EditButton,
  PopUp,
  UploadFile
} from "@egovernments/digit-ui-react-components";
// import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import FormFieldContainer from "../../components/FormFieldContainer";

const BirthInclusionEditPage = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus,setUploadStatus] = useState({
    hospitalCorrectionLetter: false
  });

const FieldComponentContainer = (props) =>{
  return(
    <div className="col-md-9">
      {props.children}
    </div>
  )
};

const ButtonContainer = (props) =>{
  return(
    <div className="col-md-3">
      {props.children}
    </div>
  )
}

  const UploadfilesConfig= [
    {
      key: "dob",
      files:[
         { 
         name:"hospitalCorrectionLetter",
         title: "correction Letter Issued by hospital auithority",
         isuploaded: uploadStatus.hospitalCorrectionLetter
        }
      ]
    },
    {
      key: "ownAdhar"
    },
    {
      key: "name"
    }
  ];

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
            </h1>
          </div>
        </div>
      </div>
      <FormFieldContainer>
        <FieldComponentContainer>
          <div className="col-md-5">
            <CardLabel>
              {t("CR_DATE_OF_BIRTH_TIME")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <DatePicker
              //   date={childDOB}
              name="childDOB"
              //   max={convertEpochToDate(new Date())}
              //min={convertEpochToDate("1900-01-01")}
              //   onChange={setselectChildDOB}
              //   disable={isDisableEdit}
              //  inputFormat="DD-MM-YYYY"
              placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
              //   {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
            />
          </div>
        </FieldComponentContainer>
        <ButtonContainer>
          <EditButton
            selected={true}
            label={"Edit"}
            onClick={() => {
              return null;
            }}
          />
        </ButtonContainer>
      </FormFieldContainer>
      <FormFieldContainer>
      <FieldComponentContainer>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_DATE_OF_BIRTH_TIME")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <DatePicker
              //   date={childDOB}
              name="childDOB"
              //   max={convertEpochToDate(new Date())}
              //min={convertEpochToDate("1900-01-01")}
              //   onChange={setselectChildDOB}
              //   disable={isDisableEdit}
              //  inputFormat="DD-MM-YYYY"
              placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
              //   {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
            />
          </div>
          <div className="col-md-2">
            <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
            <CustomTimePicker
              name="birthDateTime"
              // onChange={val => handleTimeChange(val, setbirthDateTime)}
              //   value={birthDateTime}
              //   disable={isDisableEdit}
            />
          </div>
          </FieldComponentContainer>

          <ButtonContainer>
          <EditButton
            selected={true}
            label={"Edit"}
            onClick={() => {
              setShowModal(true);
            }}
          />
        </ButtonContainer>
      </FormFieldContainer>
      {showModal && (
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
                message={`${t(`TL_ACTION_FILEUPLOADED`)}`}
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
      )}
    </React.Fragment>
  );
};
export default BirthInclusionEditPage;
