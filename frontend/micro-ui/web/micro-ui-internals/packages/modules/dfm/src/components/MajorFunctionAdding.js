import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
    TextArea,
    CustomButton,
    CardTextButton,
    ActionBar,
    Table
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/de';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';

const MajorFunctionAdding = ({ path, handleNext, formData, config, onSelect }) => {
    const stateId = Digit.ULBService.getStateId();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [draftText, setDraftText] = useState("");
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);
    const locale = Digit.SessionStorage.get("locale");
    let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
    let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;
    const mutation = Digit.Hooks.dfm.useApplicationDrafting(tenantId);
    const payload = "KL-KOCHI-C-000017- FMARISING-2023-AR";
    const { data, isLoading } = Digit.Hooks.dfm.useApplicationFetchDraft({ tenantId, id: payload });

    const draftTextValue = data?.Drafting[0]?.draftText;
    const columns = useMemo(
        () => [


            {
                Header: t("SL_NO"),
                disableSortBy: true,
                Cell: ({ row }) => GetCell(row.original.fileNumber || ""),
            },

            {
                Header: t("MODULE_CODE"),
                disableSortBy: true,
                Cell: ({ row }) => GetCell(t(row.original.function) || ""),
            },
            {
                Header: t("MF_CODE"),
                Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
                disableSortBy: true,
            },

            {
                Header: t("MAJOR_FUNCTION_NAME_ENG"),
                disableSortBy: true,
                Cell: ({ row }) => GetCell(t(row.original.function) || ""),
            },
            {
                Header: t("MAJOR_FUNCTION_NAME_MAL"),
                Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
                disableSortBy: true,
            },
            {
                Header: t("-"),
                Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
                disableSortBy: true,
            }

        ],
        []
    );
    const saveDraft = () => {
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
            Drafting: {
                uuid: null,
                tenantId: "kl.cochin",
                businessService: "DFM",
                moduleName: "fm",
                fileCode: "KL-KOCHI-C-000017- FMARISING-2023-AR",
                draftType: "Letter",
                draftText: draftText,
                assigner: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
                fileStoreId: null,
                status: "created",
                auditDetails: {
                    createdBy: null,
                    createdTime: null,
                    lastModifiedBy: null,
                    lastModifiedTime: null
                }
            }
        }
        mutation.mutate(formData)
    }

    useEffect(() => {

        if (mutation.isSuccess == true) {
            history.push("/digit-ui/employee/dfm/note-drafting")
        }
    }, [mutation.isSuccess])


    return (
        <React.Fragment>

            <div className="moduleLinkHomePageModuleLinks">

                <div className="FileFlowWrapper major-wrapper" >

                    <div className="row wrapper-file" >
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-md-4 col-sm-12 col-xs-12"  >
                                <CardLabel>
                                    {t("MODULE_NAME_ENG")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("MODULE_NAME_ENG")}
                                />
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12"  >
                                <CardLabel>
                                    {t("MF_CODE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("MF_CODE")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12"  >
                                <CardLabel>
                                    {t("MAJOR_FUNCTION_NAME_ENG")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("MAJOR_FUNCTION_NAME_ENG")}

                                />

                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12"  >
                                <CardLabel>
                                    {t("MAJOR_FUNCTION_NAME_MAL")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("MAJOR_FUNCTION_NAME_MAL")}

                                />

                            </div>
                        </div>


                    </div>



                    <div className="row">
                        <div className="col-md-12 module-adding" >

                            <div className="col-md-3 col-sm-4" >
                                <SubmitBar label={t("NEW")} style={{ marginBottom: "10px" }} />
                            </div>
                            <div className="col-md-3 col-sm-4 " >
                                <SubmitBar label={t("SAVE")} style={{ marginBottom: "10px" }} />
                            </div>
                            <div className="col-md-3  col-sm-4"  >
                                <SubmitBar label={t("CLOSE")} style={{ marginBottom: "10px" }} />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="moduleLinkHomePageModuleLinks">
                <div className="FileFlowWrapper customSubFunctionTable">
                    <Table

                        t={t}
                        data={[]}
                        columns={columns}

                    />
                </div>
            </div>


        </React.Fragment>

    );

};

export default MajorFunctionAdding;
