import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

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

const SubFunctionAdding = ({ onSubmit, filestoreId, count }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [draftText, setDraftText] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const locale = Digit.SessionStorage.get("locale");
  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
  let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;
  const mutation = Digit.Hooks.dfm.useCreateSubModule(tenantId);
  const [ModuleName, setModuleName] = useState("");
  const [majorFunction, setmajorFunction] = useState("");
  const [sfCode, setSfcode] = useState("");
  const [subFuncNm, setsubFuncNm] = useState("");
  const [subFuncMl, setsubFuncMl] = useState("");
  const [subFuncNmMl, setsubFuncNmMl] = useState("");
  const payload = "KL-KOCHI-C-000017- FMARISING-2023-AR";
  const { data, isLoading } = Digit.Hooks.dfm.useSearchsubModule({ tenantId });

  const setsetSfcode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setSfcode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetsubFuncNm = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setsubFuncNm(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetsubFuncMl = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setsubFuncMl("");
    } else {
      setsubFuncMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetsubFuncNmMl = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setsubFuncNmMl("");
    } else {
      setsubFuncNmMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "applicationNumber",
      sortOrder: "DESC",
    },
  });
  function selectModuleName(value) {
    setModuleName(value);
  }
  function selectMajorFunction(value) {
    setmajorFunction(value);
  }
  function onPageSizeChange(e) {
    setValue("limit", Number(e.target.value));
    handleSubmit(onSubmit)();
  }
  function nextPage() {
    setValue("offset", getValues("offset") + getValues("limit"));
    handleSubmit(onSubmit)();
  }
  function previousPage() {
    setValue("offset", getValues("offset") - getValues("limit"));
    handleSubmit(onSubmit)();
  }

  const onSort = useCallback((args) => {
    if (args.length === 0) return;
    setValue("sortBy", args.id);
    setValue("sortOrder", args.desc ? "DESC" : "ASC");
  }, []);
  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "applicationNumber");
    register("sortOrder", "DESC");
  }, [register]);
  const textValue = data?.SubFunctionDetails;
  console.log(textValue);
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = [
    {
      Header: t("MODULE_CODE"),
      Cell: ({ row }) => GetCell(t(row.original.subFunctionCode) || "NA"),
      disableSortBy: true,
    },
    {
      Header: t("MODULE_NAME_ENG"),
      Cell: ({ row }) => GetCell(t(row?.original.subFunctionNameEnglish || "NA")),
      disableSortBy: true,
    },
    {
      Header: t("MODULE_NAME_MAL"),
      disableSortBy: true,
      Cell: ({ row }) => GetCell(t(row.original.subFunctionNameMalayalam) || ""),
    },
  ];
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
      SubFunctionDetails: {
        id: null,
        tenantId: "kl.cochin",
        subFunctionCode: sfCode,
        majorFunctionId: majorFunction,
        subFunctionNameEnglish: subFuncNm,
        subFunctionNameMalayalam: subFuncMl,
        auditDetails: {
          createdBy: null,
          createdTime: 111111111,
          lastModifiedBy: null,
          lastModifiedTime: null,
        },
      },
    };
    mutation.mutate(formData);
  };

  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper sub-wrapper">
          <div className="row wrapper-file">
            <div className="col-md-3 col-sm-12 col-xs-12">
              <CardLabel>
                {t("MODULE_NAME_ENG")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                selected={ModuleName}
                select={selectModuleName}
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="RegistrationNo"
                placeholder={t("MODULE_NAME_ENG")}
              />
            </div>

            <div className="col-md-3 col-sm-12 col-xs-12">
              <CardLabel>
                {t("MAJOR_FUNCTION_NAME_ENG")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                selected={majorFunction}
                select={selectMajorFunction}
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="RegistrationNo"
                placeholder={t("MAJOR_FUNCTION_NAME_ENG")}
              />
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <CardLabel>
                {t("SF_CODE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                inputRef={register({})}
                onChange={setsetSfcode}
                value={sfCode}
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="RegistrationNo"
                placeholder={t("SF_CODE")}
              />
            </div>
            {/* <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SUB_FUNCTION_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  onChange={setsetsubFuncNm}
                  value={subFuncNm}
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="RegistrationNo"
                  placeholder={t("SUB_FUNCTION_NAME_ENG")}
                />
              </div> */}
            <div className="col-md-3 col-sm-12 col-xs-12">
              <CardLabel>
                {t("SUB_FUNCTION_NAME_MAL")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                inputRef={register({})}
                onChange={setsetsubFuncMl}
                value={subFuncMl}
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="RegistrationNo"
                placeholder={t("SUB_FUNCTION_NAME_MAL")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SUB_FUNCTION_NAME_MAL")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  inputRef={register({})}
                  onChange={setsetsubFuncNmMl}
                  value={subFuncNmMl}
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="RegistrationNo"
                  placeholder={t("SUB_FUNCTION_NAME_MAL")}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 module-adding">
              <div className="col-md-3 col-sm-4">
                <SubmitBar label={t("NEW")} style={{ marginBottom: "10px", width: "65%" }} />
              </div>
              <div className="col-md-3 col-sm-4 ">
                <SubmitBar onSubmit={saveModule} label={t("save")} style={{ marginBottom: "10px", width: "65%" }} />
              </div>
              <div className="col-md-3  col-sm-4">
                <SubmitBar label={t("CLOSE")} style={{ marginBottom: "10px", width: "65%" }} />
              </div>
            </div>
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
              onPageSizeChange={onPageSizeChange}
              currentPage={getValues("offset") / getValues("limit")}
              onNextPage={nextPage}
              onPrevPage={previousPage}
              pageSizeLimit={getValues("limit")}
              onSort={onSort}
              sortParams={[{ id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false }]}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubFunctionAdding;
