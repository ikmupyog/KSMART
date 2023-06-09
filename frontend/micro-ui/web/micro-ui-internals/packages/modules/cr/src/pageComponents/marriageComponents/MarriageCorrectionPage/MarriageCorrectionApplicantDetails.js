import React, { useState, useEffect, useCallback, useDebugValue } from "react";
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
  Toast,
  UploadFile,
  EditIcon,
  TextArea,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useParams, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { convertEpochToDate } from "../../../utils";
import { sortDropdownNames } from "../../../utils";
import moment from "moment";

const MarriageCorrectionApplicantDetails = () => {
  let validation = {};  
  let birthInclusionFormData = {};
  const { t } = useTranslation();
  const history = useHistory();
  let location = useLocation();
  let navigationData = location?.state?.marriageCorrectionData;
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: RelationDetails = {}, isRelationDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Relation");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_BIRTH_INCLUSION_APPLICATION_DETAILS", {});
  const [showModal, setShowModal] = useState(false);
  const [relationShiptoChild, setRelationShiptoChild] = useState('')
  const [aadharNo, setAadharNo] = useState(params?.birthInlcusionDetails?.aadharNo?params?.birthInlcusionDetails?.aadharNo:'')
  const [name, setName] = useState(params?.birthInlcusionDetails?.name?params?.birthInlcusionDetails?.name:'')
  const [mobileNo, setMobileNo] = useState(params?.birthInlcusionDetails?.mobileNo?params?.birthInlcusionDetails?.mobileNo:'')
  const [address, setAddress] = useState(params?.birthInlcusionDetails?.address ?params?.birthInlcusionDetails?.address:'')
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [AadharUploadedFile, setAadharUploadedFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [aadharDocumentFile, setAadharDocumentFile] = useState(null);
  const [documentFileError, setDocumentFileError] = useState(null);
  const [documentAadharFileError, setDocumentAadharFileError] = useState(null);
  const config = { texts: { submitBarLabel: "Next" } };

  console.log("navigation data==",location?.state);

  let cmbRelation = [];
  RelationDetails &&
    RelationDetails["birth-death-service"] && RelationDetails["birth-death-service"].Relation &&
    RelationDetails["birth-death-service"].Relation.map((ob) => {
      cmbRelation.push(ob);
    });
  useEffect(() => {
    (async () => {
      setDocumentAadharFileError(null);
      if (aadharDocumentFile) {
        if (aadharDocumentFile.size >= 2000000) {
          setDocumentAadharFileError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", documentFile, tenantId);
            if (response?.data?.files?.length > 0) {
                setAadharUploadedFile(response?.data?.files[0]?.fileStoreId);
              //   const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              //   setDocPreview(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [aadharDocumentFile]);
  useEffect(() => {
    (async () => {
      setDocumentFileError(null);
      if (documentFile) {
        if (documentFile.size >= 2000000) {
          setDocumentFileError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", documentFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
              //   const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              //   setDocPreview(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [documentFile]);
  const selectfile = (e) => {
    setDocumentFile(e.target.files[0]);
  };
  const setSelectMobile =(e) => {
    if (e.target.value.trim().length >= 0) {
        setMobileNo(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }
  const setSelectAadharNo =(e) => {
    if (e.target.value.trim().length >= 0) {
        setAadharNo(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  const selectAadharfile = (e) => {
    setAadharDocumentFile(e.target.files[0]);
  };
  const gotoEditInclusion = async (data) => {
    history.push({
        pathname: `/digit-ui/citizen/cr/marriage-correction-edit`,
    //   pathname: `/digit-ui/citizen/cr/birth-inclusion-details`,
      
      state: { marriageCorrectionDocuments: navigationData, isfetchData: true },
    });
  };
  const onSelect =(key, data)=>{
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
  }
  const onSubmitBirthInclusion =()=>{

    onSelect("birthInlcusionDetails", {
        relationShiptoChild:relationShiptoChild.code,
        documentFile,
        aadharNo,
        name,
        mobileNo,
        address,
        AadharUploadedFile,
    })
    gotoEditInclusion()
  }
  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ width: "100%" }}>
          <FormStep onSelect={onSubmitBirthInclusion}  config={config}>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Application Details")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" style={{ display: "flex" }}>
                <div className="col-md-4">
                  <CardLabel>{t("RelationShip to the child")}</CardLabel>
                  <Dropdown
                    //   selected={birthInclusionFormsObj?.CHILD_SEX?.curValue}
                    select={(e)=>setRelationShiptoChild(e)}
                    selected={relationShiptoChild}
                    option={sortDropdownNames(cmbRelation ? cmbRelation : [], "code", t)}
                    optionKey="code"
                    t={t}
                    placeholder={`${t("CR_RELATION")}`}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{t("Proof of Guardianship (IF Guardian)")}</CardLabel>
                  <UploadFile
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile}
                    onDelete={() => {
                      setUploadedFile(null);
                    }}
                    message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Personal Details of the Applicant")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="aadharNo"
                      value={aadharNo}
                    //disable={childAadharNo === "" ? false : isDisableEdit}
                      onChange={(e)=> setSelectAadharNo(e)}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    {...(validation = { isRequired: true, pattern: "^[0-9]{12}$", type: "test", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CR_NAME")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="name"
                      value={name}
                    //   onChange={setSelectChildFirstNameEn}
                     onChange={(e) => setName(e.target.value)}
                    //disable={childFirstNameEn === "" ? true : isDisableEdit}
                    placeholder={`${t("CR_NAME")}`}
                    {...(validation = {
                      pattern: "^[a-zA-Z-.`' ]*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_NAME"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{t("CR_MOBILE_NO")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="mobileNo"
                    value={mobileNo}
                    onChange={(e) =>setSelectMobile(e)}
                    // disable={isEdit}
                    placeholder={`${t("CR_MOBILE_NO")}`}
                    {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                <CardLabel>{`${t("CR_ADDRESS")}`}</CardLabel>
                  <TextArea
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    // onChange={setSelectVehicleOtherDetailsEn}
                    // disable={isEdit}
                    placeholder={`${t("CR_ADDRESS")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRESS") })}
                  />
                </div>
                <div className="col-md-6"  style={{display:"flex",flexDirection:"column",height:"135px",justifyContent:"space-between"}}>
                <CardLabel>{`${t("Attach Aadhaar Document of the Applicant")}`}
                <div style={{fontSize:"12px",color:"grey"}}>{`${t("(Attach Aadhaar Document of the Applicant)")}`}</div></CardLabel>
               
                <UploadFile
                   
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectAadharfile}
                    onDelete={() => {
                        setAadharUploadedFile(null);
                    }}
                    message={AadharUploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                  />
                </div>
              </div>
            </div>
          </FormStep>
        </div>
      </div>
      {toast.show && <Toast error={toast.show} label={toast.message} onClose={() => setToast(false)} />}
    </React.Fragment>
  );
};

export default MarriageCorrectionApplicantDetails;
