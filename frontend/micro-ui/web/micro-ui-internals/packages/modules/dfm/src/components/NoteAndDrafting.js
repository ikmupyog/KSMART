import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    BackButton,
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
    CustomButton,
    TextArea,
    DatePicker
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";
import { cardStyle } from "../utils";

const NoteAndDrafting = ({ path, handleNext, formData, config, onSelect }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);
    const [noteText, setNoteText] = useState("");
    const [checkDraft, setCheckDraft] = useState(false);
    const [checkNote, setCheckNote] = useState(true);
    const [checkEnquiry, setCheckEnquiry] = useState(false);
    const [showGeoLocation, setShowGeoLocation] = useState(false);

    const setNoteTextField = (e) => {
        setNoteText(e.target.value);
    }
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const mutation = Digit.Hooks.dfm.useApplicationNoteDrafting(tenantId);

    const saveNote = () => {
        const formData = {

            RequestInfo: {
                apiId: "apiId",
                ver: "1.0",
                ts: null,
                action: null,
                did: null,
                key: null,
                msgId: null,
                authToken: "cb24fc0e-9275-4c9b-a08b-837213e8451a",
                correlationId: null,
                userInfo: {
                    id: null,
                    tenantId: "kl.cochin",
                    uuid: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
                    roles: [{
                        id: null,
                        name: null,
                        code: "EMPLOYEE",
                        tenantId: null
                    }]
                }
            },
            ProcessInstances: {
                id: null,
                tenantId: "kl.cochin",
                businessService: "DFM",
                businessId: "123",
                action: "KL-KOCHI-C-000015- FMARISING-2023-AR",
                moduleName: "Note",
                comment: noteText,
                assigner: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
                stateSla: "1",
                businesssServiceSla: "1",
                previousStatus: "1",
                rating: "1",
                auditDetails: {
                    createdBy: null,
                    createdTime: null,
                    lastModifiedBy: null,
                    lastModifiedTime: null
                },

                documents: [
                    {
                        id: null,
                        tenantId: "kl.cochin",
                        documentType: "file",
                        fileStoreId: "1234567",
                        processInstanceId: "123",
                        documentUid: "456",
                        active: "true",
                        auditDetails: {
                            createdBy: null,
                            createdTime: null,
                            lastModifiedBy: null,
                            lastModifiedTime: null
                        }
                    }
                ],

                assignes: [
                    {
                        id: null,
                        tenantId: "kl.cochin",
                        uuid: "123",
                        auditDetails: {
                            createdBy: null,
                            createdTime: null,
                            lastModifiedBy: null,
                            lastModifiedTime: null
                        }

                    }
                ]



            }

        }
        mutation.mutate(formData)
    }
    function handleDraftChange(e) {
        setCheckDraft(e.target.checked);
        if (e.target.checked == true) {
            history.push("/digit-ui/employee/dfm/drafting")
        }
    }
    function handleNoteChange(e) {
        setCheckNote(e.target.checked)

    }
    function handleEnquiryChange(e) {
        setCheckEnquiry(e.target.ckecked);
        if (e.target.checked == true) {
            setShowGeoLocation(true);
        } else {
            setShowGeoLocation(false);
        }
    }

    return (
        <React.Fragment>

            <div className="moduleLinkHomePageModuleLinks">
         
                <div className="FileFlowWrapper">

                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1" style={{ marginTop: "40px", marginBottom: "40px" }}>
                                <span style={{ background: "#fff", padding: "0 10px", color: "black" }}>{`${t("CHILD_INFORMATION")}`}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section"  >
                        <div className="col-md-12">
                            <div className="col-md-2" >
                                <h6 style={{ marginLeft: "20px" }}>{t("APPLICATION_NUMBER")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"   >

                                <h3 class="date-picker">{t("NAME_OF_CHILD")}</h3>
                            </div>
                            <div className="col-md-2">

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-1"  >
                                <h6 class="date-picker">{t("SEX")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>



                    <div className="row subject-section"  >
                        <div className="col-md-12">
                            <div className="col-md-2"  >
                                <h6 style={{ marginLeft: "20px" }}>{t("DATE_OF_BIRTH")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <DatePicker

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"  >

                                <h3 class="date-picker">{t("PLACE_OF_BIRTH")}</h3>
                            </div>
                            <div className="col-md-2"  >

                                <DatePicker

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>



                        </div>


                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1" style={{ marginTop: "40px", marginBottom: "40px" }}>
                                <span style={{ background: "#fff", padding: "0 10px", color: "black" }}>{`${t("PARENT_INFORMATION")}`}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section"  >
                        <div className="col-md-12">
                            <div className="col-md-2"  >
                                <h6 style={{ marginLeft: "20px" }}>{t("NAME_OF_MOTHER")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"  >

                                <h3 class="date-picker">{t("NAME_OF_FATHER")}</h3>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>



                        </div>


                    </div>





                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1" style={{ marginTop: "40px", marginBottom: "40px" }}>
                                <span style={{ background: "#fff", padding: "0 10px", color: "black", fontSize: "12px" }}>{`${t("ADDRESS_OF_THE_PARENT_AT_THE_TIME_OF_BIRTH")}`}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section"  >
                        <div className="col-md-12">
                            <div className="col-md-2" >
                                <h6 style={{ marginLeft: "20px" }}>{t("WARD_NO")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"   >

                                <h3 class="date-picker">{t("HOUSE_NAME")}</h3>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-2"  >
                                <h6 class="date-picker">{t("LOCAL_PLACE")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>

                    <div className="row subject-section"  >
                        <div className="col-md-12">
                            <div className="col-md-2" >
                                <h6 style={{ marginLeft: "20px" }}>{t("POST_OFFICE")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"   >

                                <h3 class="date-picker">{t("PINCODE")}</h3>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-2"  >
                                <h6 class="date-picker">{t("DISTRICT")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>



                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1" style={{ marginTop: "40px", marginBottom: "40px" }}>
                                <span style={{ background: "#fff", padding: "0 10px", color: "black", fontSize: "12px" }}>{`${t("PERMANENT_ADDRESS_OF_THE_PARENTS")}`}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12">
                            <div className="col-md-2" >
                                <h6 style={{ marginLeft: "20px" }}>{t("WARD_NO")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"   >

                                <h3 class="date-picker">{t("HOUSE_NAME")}</h3>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-2"  >
                                <h6 class="date-picker">{t("LOCAL_PLACE")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>
                    <div className="row subject-section"  >
                        <div className="col-md-12">
                            <div className="col-md-2" >
                                <h6 style={{ marginLeft: "20px" }}>{t("POST_OFFICE")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"   >

                                <h3 class="date-picker">{t("PINCODE")}</h3>
                            </div>
                            <div className="col-md-2"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-2"  >
                                <h6 class="date-picker">{t("DISTRICT")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>
                    
                  
                    <div className="row card-document"   >
                      
                        <div className="col-md-12 card-document-column">
                        <h2 style={{marginTop:"40px"}} >{t("DOCUMENTS_INFORMATION")}</h2>
                            <div className="col-md-4">

                                <h3 class="document">{t("DOCUMENT")} 1</h3>
                            </div>
                            <div className="col-md-4 link-view">

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4" >

                                <h3 class="check-mark" >&#10003;</h3>
                            </div>
                        </div>
                        <div className="col-md-12 card-document-column">

                            <div className="col-md-4">

                                <h3 class="document">{t("DOCUMENT")} 2</h3>
                            </div>
                            <div className="col-md-4 link-view" >

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4">

                                <h3 class="check-mark">&#10003;</h3>
                            </div>
                        </div>
                        <div className="col-md-12" >

                            <div className="col-md-4">

                                <h3 class="document card-document-column">{t("DOCUMENT")} 3</h3>
                            </div>
                            <div className="col-md-4 link-view">

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4">

                                <h3 class="check-mark">&#10003;</h3>
                            </div>
                        </div>
                    </div>



                    <div className="row reference-row" style={{ marginTop: "800px" }}>
                    
                        <div className="col-md-12 reference-div"  >
                            <div class="reference-column" >

                                <h3 class="reference" >{t("REFERENCE")} 1</h3>
                            </div>
                            <div class="link-file">
                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div class="reference-column">

                                <h3 class="reference">{t("DRAFTING")} 1</h3>
                            </div>
                            <div class="link-file-sec"  >
                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>

                        </div>

                        <div className="col-md-12 reference-div" >
                            <div class="reference-column" >

                                <h3 class="reference">{t("REFERENCE")} 2</h3>
                            </div>
                            <div class="link-file">
                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div class="reference-column" >

                                <h3 class="reference">{t("DRAFTING")} 2</h3>
                            </div>
                            <div class="link-file-sec"  >
                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>

                        </div>


                    </div>

                    <div class="custom-draft-button" style={{ marginTop: "-20px" }}>

                        <CustomButton

                            text="View all notes"

                        ></CustomButton>
                    </div>


                    {showGeoLocation && <div className="row geo-location">

                        <div className="col-md-12 geo-column">

                            <div className="col-md-2">

                                <h3 class="geo-tag">{t("GEO_TAG_LOCATION")}</h3>
                            </div>
                            <div className="col-md-2" >
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3703.5056482171453!2d73.71688411494024!3d21.83802336503438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39601d55e43af21f%3A0xb8e23c01a1f6eb18!2sStatue%20of%20Unity!5e0!3m2!1sen!2sin!4v1641230123226!5m2!1sen!2sin"
                                    width="80" height="80" allowfullscreen="" loading="lazy"></iframe>

                            </div>
                            <div className="col-md-4" >

                                <CardLabel className="card-label-file">{`${t("LONGITUDE")}`}</CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("longitude")}
                                />
                            </div>
                            <div className="col-md-4" >

                                <CardLabel className="card-label-file">{`${t("LATITUDE")}`}</CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("latitude")}
                                />
                            </div>
                        </div>

                    </div>}


                    <div class="card-checkbox" >

                        <CardLabel className="card-label-file">{`${t("NOTE")}`}</CardLabel>
                        <CheckBox t={t} optionKey="name" checked={checkNote}
                            value={checkNote} onChange={(e) => handleNoteChange(e)} disable={checkNote} />

                    </div>
                    <div class="card-checkbox">
                        <CardLabel className="card-label-file" >{`${t("ENQUIRY")}`}</CardLabel>  <CheckBox t={t} optionKey="name" checked={checkEnquiry}
                            value={checkEnquiry} onChange={(e) => handleEnquiryChange(e)} />
                    </div>
                    <div >
                        <CardLabel className="card-label-file"  >{`${t("DRAFTING")}`} </CardLabel> <CheckBox t={t} optionKey="name" checked={checkDraft}
                            value={checkDraft} onChange={(e) => handleDraftChange(e)} />

                    </div>
                    <div className="row card-file"  >
                        <div className="col-md-12">
                            <div className="col-md-6 search-file">

                                <TextInput
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-6 search-file" >

                                <ul>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="link-file">

                            <LinkButton
                                label={t("+ADD_REFERENCE_HERE")}
                                className="file-link-button"
                            />
                        </div>
                        <div class="link-file">
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
                        </div>
                        <div class="textarea-draft">

                            <TextArea
                                t={t}
                                type={"text"}
                                optionKey="i18nKey"
                                name="NoteText"
                                placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                onChange={setNoteTextField}
                                value={noteText}
                            />

                        </div>
                        <div class="custom-draft-button">

                            <CustomButton
                                onClick={saveNote}
                                text={t("SAVE")}

                            ></CustomButton>
                        </div>
                    </div>

                    <CardLabel>{`${t("ATTACH_SUPPORTING_DOCUMENTS")}`}</CardLabel>
                    <UploadFile
                        id={"tl-doc"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                    />


                </div>
            </div>
        </React.Fragment>
     
    );

};

export default NoteAndDrafting;
