import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
  Table,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";
import viewToPlainText from "@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext";

const ModuleAdding = ({ path, handleNext, formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [draftText, setDraftText] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const locale = Digit.SessionStorage.get("locale");
  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
  let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;
  const mutation = Digit.Hooks.dfm.useCreateModule(tenantId);
  const updatemutation = Digit.Hooks.dfm.useUpdateModule(tenantId);
  const deleteItem = Digit.Hooks.dfm.useDeleteModule(tenantId);

  function handleDeleteClick() {
    deleteItem();
  }
  // const deleteItem = Digit.Hooks.dfm.useDeleteModule(tenantId);
  // const handleDelete = () => {
  //   console.log("deleted");
  //   deleteItem.mutate(moduleCode);
  // };
  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  console.log(data);
  const [moduleCode, setModulecode] = useState("");
  const [moduleNameEn, setModuleNameEn] = useState("");
  const [moduleNameMl, setModuleNameMl] = useState("");

  const setsetModulecode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setModulecode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // setDesignation(e.target.value);
  };
  const setsetModuleNameEn = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setModuleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // setDesignation(e.target.value);
  };
  const setsetModuleNameMl = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C @]*$/;
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match(pattern) != null) {
      setModuleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // if (!e.target.value.match(pattern)) {
    //   setModuleNameMl("");
    // } else {
    //   setModuleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    // }
  };
  const [edit, setIsEdit] = useState(false);
  function handleLinkClick(row) {
    setIsEdit(true);
    setModulecode(row.moduleCode);
    setModuleNameEn(row.moduleNameEnglish);
    setModuleNameMl(row.moduleNameMalayalam);
  }
  const textValue = data?.ModuleDetails;
  console.log(textValue);
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const Delete = () => {
    const formData = {
      RequestInfo: {
        apiId: "apiId",
        ver: "1.0",
        ts: null,
        action: null,
        did: null,
        key: null,
        msgId: null,
        authToken: "5d11c6dc-a87c-4b1e-8353-d1e2d8fb3bff",
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
      ModuleDetails: {
        status: "",
        moduleCode: moduleCode,
      },
    };
    deleteItem.mutate(formData);
  };
  const columns = [
    {
      Header: t("MODULE_CODE"),
      Cell: ({ row }) => {
        return (
          <div>
            <span className="link">
              <div>
                <a onClick={() => handleLinkClick(row.original)}> {row.original.moduleCode}</a>
              </div>
            </span>
          </div>
        );
      },
      // Cell: ({ row }) => GetCell(t(row.original.moduleCode) || "NA"),
      disableSortBy: true,
    },
    {
      Header: t("MODULE_NAME_ENG"),
      Cell: ({ row }) => GetCell(t(row?.original.moduleNameEnglish || "NA")),
      disableSortBy: true,
    },
    {
      Header: t("MODULE_NAME_MAL"),
      disableSortBy: true,
      Cell: ({ row }) => GetCell(t(row.original.moduleNameMalayalam) || ""),
    },
    {
      Header: t("Download Certificate"),
      disableSortBy: true,
      Cell: ({ row }) => {
        // let id = _.get(row, "original.id", null);
        return (
          <div onClick={Delete}>
            <button class="btn btn-delete">
              <span class="mdi mdi-delete mdi-24px"></span>
              <span class="mdi mdi-delete-empty mdi-24px"></span>
              <span>Delete</span>
            </button>
            {/* {id !== null && <span className="link" onClick={() => {
              fileSource.mutate({ filters: { id, source: "sms" } }, {
                onSuccess: (fileDownloadInfo) => {
                  const { filestoreId } = fileDownloadInfo;
                  if (filestoreId) {
                    downloadDocument(filestoreId);
                  } else {
                    console.log("filestoreId is null");
                  }
                }
              });
            }}>
              Download
            </span>} */}
          </div>
        );
      },
    },
  ];

  // rest of your code using searchModule and columns

  const saveModule = () => {
    const formData = {
      RequestInfo: {
        apiId: "apiId",
        ver: "1.0",
        ts: null,
        action: null,
        did: null,
        key: null,
        msgId: null,
        authToken: "5d11c6dc-a87c-4b1e-8353-d1e2d8fb3bff",
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
      ModuleDetails: {
        id: null,
        tenantId: "kl.cochin",
        moduleCode: moduleCode,
        moduleNameEnglish: moduleNameEn,
        moduleNameMalayalam: moduleNameMl,
        status: null,
        auditDetails: {
          createdBy: null,
          createdTime: "111111111",
          lastModifiedBy: null,
          lastModifiedTime: null,
        },
      },
    };

    if (edit === false) {
      mutation.mutate(formData);
    } else {
      updatemutation.mutate(formData);
    }
  };

  // useEffect(() => {
  //   if (mutation.isSuccess == true) {
  //     history.push("/digit-ui/employee/dfm/note-drafting");
  //   }
  // }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper module-wrapper">
          <div className="row wrapper-file">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MODULE_CODE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  onChange={setsetModulecode}
                  value={moduleCode}
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="ModuleCode"
                  placeholder={t("ENTER_MODULE_CODE")}
                  disable={edit}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MODULE_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  onChange={setsetModuleNameEn}
                  value={moduleNameEn}
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="ModuleNameEn"
                  placeholder={t("MODULE_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MODULE_NAME_MAL")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  onChange={setsetModuleNameMl}
                  value={moduleNameMl}
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="ModuleNameEN"
                  placeholder={t("MODULE_NAME_MAL")}
                />
              </div>
            </div>
          </div>
          <div className="btn-flex">
            <SubmitBar label={t("NEW")} className="btn-row" />
            <SubmitBar onSubmit={saveModule} label={t("save")} className="btn-row" />
            <SubmitBar label={t("CLOSE")} className="btn-row" />
          </div>
        </div>
      </div>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper customSubFunctionTable">
          {textValue?.length > 0 && (
            <Table
              t={t}
              data={textValue}
              columns={columns}
              getCellProps={(cellInfo) => {
                return {
                  style: {
                    minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
                    padding: "20px 18px",
                    fontSize: "16px",
                  },
                };
              }}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModuleAdding;
