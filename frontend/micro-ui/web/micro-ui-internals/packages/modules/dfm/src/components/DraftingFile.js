import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import {
  BackButton,
  FormBackButton,
  PrivateRoute,
  BreadCrumb,
  CommonDashboard,
  FormInputGroup,
  SubmitBar,
  CardLabel,
  CardLabelError,
  Dropdown,
  CheckBox,
  LinkButton,
  SearchAction,
  TextInput,
  UploadFile,
  SearchIconSvg,
  TextArea,
  CustomButton,
  CardTextButton,
  ActionBar,
  PopUp,
  Modal,
  Card,
  HtmlParser,
  Toast,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import SearchApplication from "./SearchApplication";
// import Search from "../pages/employee/Search";
// import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";
import DraftTemplate from "../../../templates/ApplicationDetails/components/DraftTemplate";
// import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';

const DraftingFile = ({ path, handleNext, formData, config, onSelect, fileCode }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [draftText, setDraftText] = useState("");
  const mobileView = Digit.Utils.browser.isMobile() ? true : false;
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  // console.log("dash", location?.state?.fileCode);
  // const state = useSelector((state) => state);
  let authToken = Digit.UserService.getUser()?.access_token || null;
  const locale = Digit.SessionStorage.get("locale");
  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
  let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;
  const mutation = Digit.Hooks.dfm.useApplicationDrafting(tenantId);
  const payload = location?.state?.fileCode;
  // const payload = "KL-KOCHI-C-000017- FMARISING-2023-AR";
  const { data, isLoading } = Digit.Hooks.dfm.useApplicationFetchDraft({ tenantId, id: payload });
  // console.log(data, authToken);
  const { data: DraftType = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "DraftType");
  let cmbDraftList = [];
  DraftType &&
    DraftType["FileManagement"] &&
    DraftType["FileManagement"].DraftType.map((ob) => {
      cmbDraftList.push(ob);
    });
  const [popup, setPopup] = useState(false);
  const [toast, setToast] = useState(false);
  const [draftErr, setDraftErr] = useState(false);
  const [draftTypeErr, setDraftTypeErr] = useState(false);
  const [subjectErr, setSubjectErr] = useState(false);
  const [selectedDraftType, setSelectedDraftType] = useState("");
  const [displayDraftPreviewPopup, setDisplayDraftPreviewPopup] = useState(false);
  const [successToastMsg, setSuccessToastMsg] = useState(false);
  const [errorToastMsg, setErrorToastMsg] = useState(false);
  const [subject, setSubject] = useState("");
  const [refField, setRefFields] = useState([
    {
      id: "",
      tenantId: tenantId,
      fileCode: location?.state?.fileCode,
      draftId: "",
      referenceText: "",
      status: "created",
      auditDetails: {
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdTime: 0,
        lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastModifiedTime: 0,
      },
    },
  ]);
 
  const [refAddressField, setRefAddressFields] = useState([
    {
      id: "",
      tenantId: tenantId,
      fileCode: location?.state?.fileCode,
      draftId: "",
      salutation: "",
      name: "",
      address: "",
      status: "created",
      auditDetails: {
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdTime: 0,
        lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastModifiedTime: 0,
      },
    },
  ]);
  const [displayAddressPopup, setDisplayAddressPopup] = useState(false);

  const draftTextValue = data?.Drafting[0]?.draftText;

  const onSubmit = () => {
    if (selectedDraftType == "") {
      setDraftTypeErr(true);
      // setDraftErr(true)
      setToast(true);
    } else if (subject == "") {
      setDraftTypeErr(false);
      setSubjectErr(true);
    } else if (draftText == "") {
      setDraftTypeErr(false);
      setSubjectErr(false);
      setDraftErr(true);
    } else {
      setToast(false);
      setDraftTypeErr(false);
      setDraftErr(false);
      setSubjectErr(false);
      const formData = {
        RequestInfo: {
          apiId: "apiId",
          ver: "1.0",
          ts: null,
          action: null,
          did: null,
          key: null,
          msgId: null,
          authToken: authToken,
          //  authToken : "9edb9e10-aa63-4ebc-a32f-b738af111996",
          correlationId: null,
          userInfo: {
            id: null,
            tenantId: "kl.cochin",
            uuid: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
            roles: [
              {
                id: null,
                name: null,
                code: "EMPLOYEE",
                tenantId: null,
              },
            ],
          },
        },
        DraftFile: {
          tenantId: "kl.cochin",
          businessService: "DFM",
          moduleName: "fm",
          fileCode: location?.state?.fileCode,
          draftType: selectedDraftType?.id.toString(),
          //   draftType : "1",
          draftText: draftText,
          subject: subject,
          assigner: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
          fileStoreId: null,
          status: "created",
          auditDetails: {
            createdBy: null,
            createdTime: null,
            lastModifiedBy: null,
            lastModifiedTime: null,
          },
          draftFileAddress: refAddressField && refField[0].address === "" ? "" : refAddressField,
          draftFileReference: refField && refField[0].referenceText === "" ? "" : refField,
        },
      };
      mutation.mutate(formData);
    }
  };

  const onPreview = () => {
    if (selectedDraftType == "") {
      setDraftTypeErr(true);
      // setDraftErr(true)
      setToast(true);
    } else if (draftText == "") {
      setDraftTypeErr(false);
      setDraftErr(true);
    } else {
      setToast(false);
      setDraftTypeErr(false);
      setDraftErr(false);
      setDisplayDraftPreviewPopup(true);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess == true) {
      setSuccessToastMsg(true);
      setToast(true);
      // history.push(`/digit-ui/employee/cr/application-Adoptiondetails/${location?.state?.fileCode}`);
      setTimeout(() => {
        history.push(`/digit-ui/employee/cr/application-Adoptiondetails/${location?.state?.fileCode}`);
        setToast(false);
        setSuccessToastMsg(false);
      }, 2000);

      // history.push("/digit-ui/employee/dfm/note-drafting");
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) {
      setErrorToastMsg(true);
      setToast(true);
    }
  }, [mutation.isError]);

  const sendSMS = () => {
    setPopup(true);
  };

  const closeModal = () => {
    setPopup(false);
  };

  const Close = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );

  const CloseBtn = (props) => {
    return (
      <div className="icon-bg-secondary" onClick={props.onClick}>
        <Close />
      </div>
    );
  };
  const Heading = (props) => {
    return <h1 className="heading-m">{props.t(props.heading)}</h1>;
  };
  const handleSubjectChange = (value) => {
    setSubject(value);
  };
  const setSelectedFunction = (value) => {
    setSelectedDraftType(value);
  };
  const closeDraftPopup = () => {
    setDisplayDraftPreviewPopup(false);
  };
  const closeAddressPopup = () => {
    setRefAddressFields([ {
      id: "",
      tenantId: tenantId,
      fileCode: location?.state?.fileCode,
      draftId: "",
      salutation: "",
      name: "",
      address: "",
      status: "created",
      auditDetails: {
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdTime: 0,
        lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastModifiedTime: 0,
      },
    }])
    setDisplayAddressPopup(false);
  };
  // var link = "mailto:target@gmail.com";
  // In addition to this you can add subject or body as parameter .
  // For e.g.
  // "mailto:target@example.com?subject=test subject&body=my text"
  // window.location.href = link;

  const addField = () => {
    console.log("aa");
    setRefFields([...refField, {
      id: "",
      tenantId: tenantId,
      fileCode: location?.state?.fileCode,
      draftId: "",
      referenceText: "",
      status: "created",
      auditDetails: {
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdTime: 0,
        lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastModifiedTime: 0,
      },
    },]); // Add a new empty field to the list
  };
  const handleChange = (index, value) => {
    console.log("handfle");
    const updatedFields = [...refField];
    updatedFields[index].referenceText = value; // Update the value of the field at the specified index
    setRefFields(updatedFields);
  };
  const removeField = (index) => {
    const updatedFields = [...refField];
    updatedFields.splice(index, 1); // Remove the field at the specified index
    setRefFields(updatedFields);
  };
  const handleAddressChange = (index, value,type) => {
    console.log("handfle");
    const updatedFields = [...refAddressField];
    if( type == "salutation"){
      updatedFields[index].salutation = value; 
    }else if (type == "name"){
      updatedFields[index].name = value; 
    }else if (type == "address"){
      updatedFields[index].address = value; 
    }
    // Update the value of the field at the specified index
    setRefAddressFields(updatedFields);
  };
  const removeAddressField = (index) => {
    const updatedFields = [...refAddressField];
    updatedFields.splice(index, 1); // Remove the field at the specified index
    setRefAddressFields(updatedFields);
  };
  const addAddressField = () => {
    console.log("aa");
    setRefAddressFields([...refAddressField,
      {
      id: "",
      tenantId: tenantId,
      fileCode: location?.state?.fileCode,
      draftId: "",
      salutation: "",
      name: "",
      address: "",
      status: "created",
      auditDetails: {
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdTime: 0,
        lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastModifiedTime: 0,
      }}]); // Add a new empty field to the list
  };
  console.log(refAddressField);
  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper draft-editor">
          {/* <button onClick={() => window.location = 'mailto:preethi.pillai@trois.in'}>test</button>
                    <a href="sms:+918547847375">
                        8547847375
                    </a> */}
          {popup && (
            <Modal headerBarEnd={<CloseBtn onClick={closeModal} />} actionCancelOnSubmit={closeModal} actionSaveLabel={t("SUBMIT")}>
              <Card>
                <React.Fragment>
                  <CardLabel>{t("PHONE_NUMBER")}</CardLabel>
                  <Dropdown />
                </React.Fragment>
                <CardLabel>{t("DRAFT_LINK")}</CardLabel>
                <TextArea />
              </Card>
            </Modal>
          )}
          <div className="row wrapper-file">
            <div className="col-md-2 col-sm-12 col-xs-12" style={{marginLeft:"20px",marginTop:"10px"}}>
              <h3 className="type">{t("TYPE_OF_CORRESPONDENCE")}</h3>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12" style={{ display: "flex", alignItems: "center" }}>
              <div className="col-md-6 col-sm-12 col-xs-12">
                <Dropdown
                  t={t}
                  type={"text"}
                  optionKey="name"
                  name="TYPE_OF_CORRESPONDENCE"
                  option={cmbDraftList}
                  select={setSelectedFunction}
                  selected={selectedDraftType}
                  placeholder={t("shows_subject_from_application_with_edit_bitton")}
                />
              </div>
              {/* <div className="col-md-5 col-sm-12 col-xs-12" style={{marginTop:'20px', alignItems:'center'}} >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}

                                />

                            </div> */}
              <div className="col-md-1 col-sm-12 col-xs-12" style={{ display: "flex" }}>
                <div
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  onClick={() => (window.location = "mailto:preethi.pillai@trois.in")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                </div>
                <div style={{ width: "20px", height: "20px", cursor: "pointer", marginLeft: "20px", marginTop: "3px" }} onClick={sendSMS}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chat-right-text" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </div>
              </div>
              {/* <div className="col-md-1 col-sm-12 col-xs-12"  >
                                <div style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={() => window.location = 'mailto:preethi.pillai@trois.in'}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chat-right-text" viewBox="0 0 16 16">
                                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </div>
                            </div> */}
            </div>
          </div>
          <div className="row wrapper-file ">
            <div className="col-md-12">
              <div className="col-md-6 search-file">
                <CardLabel>{t("Subject")}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="subject"
                  placeholder={t("subject")}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* <div className="col-md-2 col-sm-12 col-xs-12" style={{marginLeft:"20px",marginTop:"10px"}}>
              <h3 className="type">{t("TYPE_OF_CORRESPONDENCE")}</h3>
            </div> */}
          <div className="row wrapper-file " style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", paddingLeft: "15px" ,flexDirection:"column"}}>
         
            {refField.map((field, index) => (<React.Fragment>
              <CardLabel>{t(`reference ${index}`)}</CardLabel>
              <div key={index} className="col-md-6 search-file" style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="reference"
                  value={field.referenceText}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={t("refrence")}
                />
                {refField.length > 1 && <SubmitBar label={t("Remove")} onSubmit={() => removeField(index)} />}
              </div>
              </React.Fragment>
             
            ))}

            <SubmitBar label={t("Add")} onSubmit={addField} />
          </div>
          <div className="row  " style={{ display: "flex" }}>
            <div className="col-md-12">
              <SubmitBar label={t("Add Addresss")} onSubmit={() => setDisplayAddressPopup(true)} />
            </div>
          </div>

          <div className="row card-file-draft">
            {/* <div className="col-md-12" style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="col-md-10 search-file">
                <SubmitBar label={t("Add Addresss")} />
              </div>
            </div> */}

            {/* <div class="link-file" >

                            <LinkButton
                                label={t("+ADD_REFERENCE_HERE")}
                                className="file-link-button"


                            />
                        </div>
                        <div class="link-file-sec">
                            <LinkButton
                                label={t("ADD")}
                                className="file-link-button"


                            />
                        </div>
                        <div class="link-file-sec" >
                            <LinkButton
                                label={t("REMOVE")}
                                className="file-link-button"


                            />
                        </div> */}
            <div className="textarea-draft">
              <CKEditor
                editor={ClassicEditor}
                data={draftText}
                config={{
                  removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table", "htmlwriter"],
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();

                  setDraftText(data);
                }}
              />
            </div>
            {/* <div class="custom-draft-button">

                            {!draftTextValue ? <CustomButton
                                onClick={saveDraft}

                                text={t("SAVE_&_GENERATE_DRAFT_REPORT")}

                            ></CustomButton> :
                                ""}
                        </div> */}
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="button-div">
                <FormBackButton>{t("CS_COMMON_BACK")}</FormBackButton>
                <SubmitBar label={t("Preview")} onSubmit={onPreview} />
                <SubmitBar label={t("SAVE")} onSubmit={onSubmit} />
              </div>

              {/* <div className="col-md-3 col-sm-4" >
                              
                            </div> */}

              {/* <div className="col-md-3 col-sm-4 " >
                                <SubmitBar label={t("FORWARD")} style={{ marginBottom: "10px" }} />
                            </div> */}
              {/* <div className="col-md-3  col-sm-4"  >
                                <Dropdown
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DEFAULT/SELECT")}
                                />

                            </div> */}
            </div>
          </div>
        </div>
        {displayDraftPreviewPopup && (
          <Modal
            //  headerBarMain={<Heading t={t} heading={""} />}
            headerBarEnd={<CloseBtn onClick={closeDraftPopup} />}
            popupStyles={
              mobileView ? { height: "fit-content", minHeight: "100vh" } : { width: "1300px", height: "650px", margin: "auto", overflowY: "scroll" }
            }
            formId="modal-action"
            hideSubmit={true}
          >
            <div className="col-md-12 col-sm-12 col-xs-12 ">
              <div
                className=""
                style={{
                  maxHeight: "550px",
                  minHeight: "200px",
                  overflowY: "scroll",
                  border: "1px solid rgb(69 69 69 / 18%)",
                  padding: "10px",
                  paddingLeft: "20px",
                }}
              >
                <DraftTemplate draftType={selectedDraftType?.name} fileCode={location?.state?.fileCode}>
                  <HtmlParser htmlString={draftText} />
                </DraftTemplate>
              </div>
            </div>
          </Modal>
        )}
        {displayAddressPopup && (
          <Modal
            headerBarMain={<Heading t={t} heading={"Draft File Address"} />}
            headerBarEnd={<CloseBtn onClick={closeAddressPopup} />}
            popupStyles={
              mobileView ? { height: "fit-content", minHeight: "100vh" } : { width: "1300px", height: "650px", margin: "auto", overflowY: "scroll" }
            }
            formId="modal-action"
            hideSubmit={true}
          >
            <div className="col-md-12 col-sm-12 col-xs-12 ">
              <div
                className=""
                style={{
                  maxHeight: "550px",
                  minHeight: "200px",
                  overflowY: "scroll",
                  border: "1px solid rgb(69 69 69 / 18%)",
                  padding: "10px",
                  paddingLeft: "20px",
                }}
              >
                <div className="row wrapper-file " style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                  {refAddressField.map((field, index) => (
                    <div key={index} className="col-md-10 search-file" style={{display:"flex", gap:"10px",alignItems:"baseline"}}>
                      <TextInput
                        t={t}
                        type={"text"}
                        optionKey="i18nKey"
                        name="salutation"
                        value={field.salutation}
                        onChange={(e) => handleAddressChange(index, e.target.value,"salutation")}
                        placeholder={t("")}
                      />{" "}
                      <TextInput
                        t={t}
                        type={"text"}
                        optionKey="i18nKey"
                        name="name"
                        value={field.name}
                        onChange={(e) => handleAddressChange(index, e.target.value,"name")}
                        placeholder={t("Name")}
                      />
                      <TextArea
                      style={{height:"40px"}}
                        t={t}
                        type={"text"}
                        optionKey="i18nKey"
                        name="address"
                        value={field.address}
                        onChange={(e) => handleAddressChange(index, e.target.value,"address")}
                        placeholder={t("address")}
                      />
                      {refAddressField.length > 1 && <SubmitBar label={t("Remove")} style ={{fontSize:"10px !important"}} onSubmit={() => removeAddressField(index)} />}
                    </div>
                  ))}

                  <SubmitBar label={t("Add")} onSubmit={addAddressField} />
                </div>
               <div>
               <SubmitBar label={t("Save")} onSubmit={ ()=> setDisplayDraftPreviewPopup(false)} />
               </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
      {toast && (
        <Toast
          error={draftTypeErr || draftErr || errorToastMsg}
          success={successToastMsg}
          label={
            draftTypeErr
              ? t("DFM_INVALID_DRAFT_TYPE")
              : subjectErr
              ? t("DFM_INVALID_SUBJECT")
              : draftErr
              ? t("DFM_INVALID_DRAFT_TEXT")
              : errorToastMsg
              ? t("DFM_DRAFT_ERROR")
              : successToastMsg
              ? t("DFM_DRAFT_SUCCESS")
              : setToast(false)
          }
          isDleteBtn={true}
          onClose={() => setToast(false)}
        />
      )}
    </React.Fragment>
  );
};

export default DraftingFile;
