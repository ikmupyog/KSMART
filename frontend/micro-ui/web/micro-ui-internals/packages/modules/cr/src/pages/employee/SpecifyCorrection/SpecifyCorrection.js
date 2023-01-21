import React, { useState } from "react";
import {
  CardLabel,
  TypeSelectCard,
  Dropdown,
  CheckBox,
  TextInput,
  TextArea,
  LabelFieldPair,
  UploadFile,
} from "@egovernments/digit-ui-react-components";
import { FormStep, RadioOrSelect, RadioButtons, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const SpecifyCorrection = ({ handleNext }) => {
  const { t } = useTranslation();
  const [CorrectionType, setCorrectionType] = useState();
  const [CorrectionTypeValue, setCorrectionTypeValue] = useState();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [handleNextPage, setHandleNextPage] = useState(1);
  const [fileLimit, setFileLimit] = useState(0);
  const [error, setError] = useState(null);
  const menu = [
    {
      i18nKey: "Minor Correction",
      discription: "( SPELLING CORRECTION, INITIAL INCLUSION AND CORRECTION, WITH OUT CHANGING THE ACTUAL RECORDS )",
      code: "MinorCorrection",
    },
    {
      i18nKey: "Major Correction ",
      discription:
        "( DATE OF DEATH, PLACE OF DEATH, NAME OF DECEASED, ADDRESS FIELDS, OTHER NAME CORRECTIONS WHICH ARE ENTIRELY DIFFERENT FROM THE ACTUAL RECORDS )",
      code: "MajorCorrection",
    },
  ];
  const selectCorrectionType = (value) => {
    setCorrectionType(value);
    setCorrectionTypeValue(value.code);
    console.log(value);
  };
  const handleFileEvent = (e) => {
    const chooseFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chooseFiles);
  };
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadFiles];
    let limitExceed = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
      if (uploaded.length === 5) setFileLimit(true);
      if (uploaded.length > 5) {
        setFileLimit(false);
        limitExceed = true;
        return true;
      }
    });
    if (!limitExceed) setUploadFiles(uploaded);
  };
  const onSubmit = () => {
    console.log("ds");
  };
  const onNextPage = () => {
    setHandleNextPage((value) => value + 1);
  };
  const onBackPage = () => {
    setHandleNextPage((value) => value - 1);
  };
  return (
    <FormStep t={t}>
      <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
        <div className="col-md-12">
          <h1 className="headingh1">
            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Death Corrections")}`}</span>{" "}
          </h1>
        </div>
      </div>

      <CardLabel style={{ fontSize: "17px", fontWeight: "700", width: "none !important", marginBottom: "20px" }}>{`${t(
        "SPECIFY THE CORRECTION"
      )}`}</CardLabel>
      <LabelFieldPair>
        <RadioButtons
          t={t}
          optionsKey="i18nKey"
          isMandatory={true}
          options={menu}
          selectedOption={CorrectionType}
          onSelect={selectCorrectionType}
          style={{ marginTop: "-8px", paddingLeft: "5px", display: "flex", flexDirection: "column", gap: "20px" }}
          inputStyle={{ fontWeight: "500" }}
        />
      </LabelFieldPair>
      {CorrectionTypeValue === "MinorCorrection" && (
        <React.Fragment>
          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                  "SPELLING MISTAKES, INITIAL INCLUSION AND OMISSION IN NAME FIELDS AND OTHER FIELDS"
                )}`}</span>{" "}
              </h1>
            </div>
          </div>
          <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", marginBottom: "15px" }}>
            ATTACH FOLLOWING DOCUMENTS ( PROOF THAT ARE VALID AT THE TIME OF DEATH )
          </h3>
          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("SCHOOL CERTIFICATE OF DECEASED / RELEVANT PERSON")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="" style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-end", gap: "10px" }}>
            <CardLabel>MULTIPLE CORRECTION</CardLabel>
            <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
              // message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
              // error={error}
            />
          </div>
          <div className="">
            {/* <input type="checkbox" /> */}
            <CheckBox
              className="form-field"
              label={`${t(
                "  I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous error caused by mistake while reporting the death."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
            {/* <h5 style={{fontSize:"15px",fontWeight:"300"}}>
              I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous
              error caused by mistake while reporting the death.
            </h5> */}
          </div>
          <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", marginBottom: "15px", fontWeight: "600" }}>
            OR
          </h2>
          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                  "OTHER GOVT APPROVED PHOTO IDENTITY CARDS OF DECEASED/ RELEVANT PERSONS ( IF SCHOOL CERTIFICATE IS NOT AVAILABLE)"
                )}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="">
            {/* <input type="checkbox" />
            <h5 >
              I here by affirm that the ……………………………… (Deceased, address) have not undergone any formal education /School records are lost and are not
              recoverable by means of time, and the given correction as in the attached ID proof is same as that in the School record.
            </h5> */}
            <CheckBox
              className="form-field"
              label={`${t(
                "  I here by affirm that the ……………………………… (Deceased, address) have not undergone any formal education /School records are lost and are not recoverable by means of time, and the given correction as in the attached ID proof is same as that in the School record."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
          </div>
          <div className="">
            {/* <input type="checkbox" />
            <h5>
              I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous
              error caused by mistake while reporting the birth by informant.
            </h5> */}
            <CheckBox
              className="form-field"
              label={`${t(
                "  I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous error caused by mistake while reporting the birth by informant."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
          </div>
        </React.Fragment>
      )}
      {CorrectionTypeValue === "MajorCorrection" && handleNextPage === 1 && (
        <React.Fragment>
          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("DATE OF DEATH, PLACE OF DEATH")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", marginBottom: "15px" }}>
            ATTACH FOLLOWING DOCUMENTS ( PROOF THAT ARE VALID AT THE TIME OF DEATH )
          </h3>
          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                  "CERTIFIED COPY OF THE RECORDS KEPT BY INFORMANT (In case of institutional deaths)"
                )}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "10px" }}>
            <div style={{ width: "820px" }}>
              <CardLabel>
                {" "}
                A declaration setting forth the nature of the error and true facts of the case made by two credible persons having knowledge of facts
                of the case (Death at home only)
              </CardLabel>
            </div>

            <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
              // message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
              // error={error}
            />
          </div>
          <div className="" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "10px" }}>
            <div style={{ width: "820px" }}>
              <CardLabel> SCHOOL CERTIFICATE OF DECEASED / RELEVANT PERSON</CardLabel>
            </div>

            <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
              // message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
              // error={error}
            />
          </div>
          {/* <CardLabel>SCHOOL CERTIFICATE OF DECEASED / RELEVANT PERSON</CardLabel>
          <UploadFile
            id={"tl-doc"}
            extraStyleName={"propertyCreate"}
            accept=".jpg,.png,.pdf"
            onUpload={handleFileEvent}
            // onUpload={selectfile}
            // onDelete={() => {
            //   setUploadedFile(null);
            // }}
            message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
            // error={error}
          /> */}
          {/* <div className="">
            <input type="checkbox" />
            <h5>
              I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous
              error caused by mistake while reporting the death.
            </h5>
          </div> */}
          <div className="">
            <CheckBox
              className="form-field"
              label={`${t(
                " I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous error caused by mistake while reporting the death."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
          </div>
          <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", marginBottom: "15px", fontWeight: "600" }}>
            OR
            <span style={{ fontSize: "12px", fontWeight: "400", marginLeft: "5px" }}>( IF SCHOOL CERTIFICATE IS NOT AVAILABLE )</span>
          </h2>
          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                  "OTHER GOVT APPROVED PHOTO IDENTITY CARDS OF DECEASED/RELEVANT PERSONS"
                )}`}</span>{" "}
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
              // message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
              // error={error}
            />
          </div>
          <div className="">
            <CheckBox
              className="form-field"
              label={`${t(
                " I here by affirm that the ……………………………… (Deceased, address) have not undergone any formal education / School records are lost and are not recoverable by means of time, and the given correction as in the attached ID proof is same as that in the School record."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
          </div>
          <div className="">
            <CheckBox
              className="form-field"
              label={`${t(
                " I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous error caused by mistake while reporting the death."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
          </div>

          <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={onNextPage} />
        </React.Fragment>
      )}
      {CorrectionTypeValue === "MajorCorrection" && handleNextPage === 2 && (
        <React.Fragment>
          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Name of the deceased, other name fields and address fields")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", marginBottom: "15px" }}>
            ATTACH FOLLOWING DOCUMENTS ( PROOF THAT ARE VALID AT THE TIME OF DEATH )
          </h3>

          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                  "One and the same declaration by applicant attested by gazetted officer (in case of name correction)"
                )}`}</span>{" "}
              </h1>
            </div>
          </div>

          <div className="" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "10px" }}>
            <div style={{ width: "820px" }}>
              <CardLabel>
                {" "}
                A declaration setting forth the nature of the error and true facts of the case made by two credible persons having knowledge of facts
                of the case
              </CardLabel>
            </div>

            <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
              // message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
              // error={error}
            />
          </div>
          <div className="" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "10px" }}>
            <div style={{ width: "820px" }}>
              <CardLabel>SCHOOL CERTIFICATE OF DECEASED / RELEVANT PERSON</CardLabel>
            </div>

            <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
              // message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
              // error={error}
            />
          </div>

          <div className="">
            <CheckBox
              className="form-field"
              label={`${t(
                " I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous error caused by mistake while reporting the death."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
          </div>
          <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", marginBottom: "15px", fontWeight: "600" }}>
            OR
            <span style={{ fontSize: "12px", fontWeight: "400", marginLeft: "5px" }}>( IF SCHOOL CERTIFICATE IS NOT AVAILABLE )</span>
          </h2>

          <div className="row" style={{ display: "flex", marginBottom: "15px" }}>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                  "OTHER GOVT APPROVED PHOTO IDENTITY CARDS OF DECEASED/RELEVANT PERSONS"
                )}`}</span>{" "}
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
              // message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
              // error={error}
            />
          </div>
          <div className="">
            <CheckBox
              className="form-field"
              label={`${t(
                " I here by affirm that the ……………………………… (Deceased, address) have not undergone any formal education / School records are lost and are not recoverable by means of time, and the given correction as in the attached ID proof is same as that in the School record."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
          </div>
          <div className="">
            <CheckBox
              className="form-field"
              label={`${t(
                "I here by affirm that I will not produce any previously obtained death certificate of the same for any other purpose and the previous error caused by mistake while reporting the death."
              )}`}
              // onChange={(e) => setCorrespondenceAddress(e, index)}
              // value={ownerDetails?.[index]?.isCoresAddr}
              // checked={ownerDetails?.[index]?.isCoresAddr || false}
              style={window.location.href.includes("/citizen/") ? { paddingTop: "10px" } : {}}
            />
          </div>
          {handleNextPage === 2 && (
            <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
              <SubmitBar label={t("CS_COMMON_BACK")} onSubmit={onBackPage} />
              <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={handleNext} />
            </div>
          )}
        </React.Fragment>
      )}
      {CorrectionTypeValue === "MinorCorrection" && <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={handleNext} />}
    </FormStep>
  );
};

export default SpecifyCorrection;
