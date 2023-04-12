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

const ArisingFile = ({ path, handleNext, formData, config, onSelect }) => {
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

                <div className="FileFlowWrapper arising-filewrapper">



                    <div className="row legacy-section" >
                        <div className="col-md-12" >

                            <h1 >{t("ARISING_FILE_OPERATOR")}</h1>
                        </div>



                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12">
                            <div className="col-md-6"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("MAJOR_FUNCTION")}
                                />
                            </div>
                            <div className="col-md-6"  >

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

                    <div className="row subject-section" >
                        <div className="col-md-12">
                            <div className="col-md-12"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("MAJOR_FUNCTION")}
                                />
                            </div>



                        </div>


                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12">
                            <div className="col-md-2"  >

                                <h6>{t("SUBJECT")}</h6>
                            </div>
                            <div className="col-md-10"  >

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
                    <div className="row subject-section" >
                        <div className="col-md-12">
                            <div className="col-md-2"  >

                                <h6>{t("SUBJECT_DESCRIPTION")}</h6>
                            </div>
                            <div className="col-md-10"  >

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
                    <div className="row arising-searchbox">

                        <div className="col-md-12 col-sm-12  col-xs-12" style={{ marginTop: "40px" }} >
                            <div className="col-md-3  col-sm-3  col-xs-12" >

                                <CardLabel className="card-label-file">{`${t("NOTE")}`}</CardLabel>
                                <CheckBox t={t} optionKey="name" checked={checkNote}
                                    value={checkNote} onChange={(e) => handleNoteChange(e)} disable={checkNote} />
                            </div>
                            <div className="col-md-3 col-sm-3  col-xs-12 link-file">
                                <CardLabel className="card-label-file" >{`${t("ENQUIRY")}`}</CardLabel>  <CheckBox t={t} optionKey="name" checked={checkEnquiry}
                                    value={checkEnquiry} onChange={(e) => handleEnquiryChange(e)} />
                            </div>
                            <div className="col-md-3  col-sm-3  col-xs-12" >

                                <CardLabel className="card-label-file"  >{`${t("DRAFTING")}`} </CardLabel> <CheckBox t={t} optionKey="name" checked={checkDraft}
                                    value={checkDraft} onChange={(e) => handleDraftChange(e)} />

                            </div>

                        </div>
                    </div>


                    <div className="row card-file arising-card-file" >
                        <div className="col-md-12 col-sm-12">
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


                    <div className="row arising-buttons">
                        <div className="col-md-12" >

                            <div className="col-md-3 col-sm-4" >
                                <SubmitBar label={t("SAVE")} style={{ marginBottom: "10px" }} />
                            </div>
                            <div className="col-md-3 col-sm-4 " >
                                <SubmitBar label={t("FORWARD")} style={{ marginBottom: "10px" }} />
                            </div>
                            <div className="col-md-3  col-sm-4"  >
                                <Dropdown
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DEFAULT/SELECT")}
                                />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>

    );

};

export default ArisingFile;
