import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { SubmitBar, CardLabel, Dropdown, TextInput, Table } from "@egovernments/digit-ui-react-components";
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
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const locale = Digit.SessionStorage.get("locale");
  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
  let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;
  const deleteItem = Digit.Hooks.dfm.useDeleteSubFunct(tenantId);
  const mutation = Digit.Hooks.dfm.useCreateSubModule(tenantId);
  const updatemutation = Digit.Hooks.dfm.useUpdateSubFunct();
  const [majorFunction, setmajorFunction] = useState("");
  const [sfCode, setSfcode] = useState("");
  const [subFuncNm, setsubFuncNm] = useState("");
  const [subFuncNmMl, setsubFuncNmMl] = useState("");
  const [moduleNameEnglish, setmoduleNameEnglish] = useState("");
  const [subid, setsubid] = useState("");
  const [majorFunctId, setmajorFunctId] = useState("");
  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  const Value = data?.ModuleDetails?.map((item) => ({
    label: item.id,
    value: item.moduleNameEnglish,
  }));

  const { data: searchData } = Digit.Hooks.dfm.useSearchmajorFunction({ tenantId, moduleId: moduleNameEnglish.label });
  const majorData = searchData?.MajorFunctionDetails?.map((item) => ({
    label: item.id,
    value: item.majorFunctionNameEnglish,
  }));

  const { data: searchsubfunct, refetch } = Digit.Hooks.dfm.useSearchsubModule({ tenantId, majorFunctionId: majorFunction.label });
  console.log("majorFunction", majorFunction.label);

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
  const setsetsubFuncNmMl = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setsubFuncNmMl("");
    } else {
      setsubFuncNmMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  function setsetmoduleNameEnglish(value) {
    setmoduleNameEnglish(value);
  }
  function selectMajorFunction(value) {
    setmajorFunction(value);
  }
  function handleClick() {
    updateDraft();
  }
  const [edit, setIsEdit] = useState(false);
  function handleLinkClick(row) {
    setIsEdit(true);
    setmajorFunctId(row.majorFunctionId);
    setsubid(row.id);
    setSfcode(row.subFunctionCode);
    setsubFuncNm(row.subFunctionNameEnglish);
    setsubFuncNmMl(row.subFunctionNameMalayalam);
  }
  const textValue = searchsubfunct?.SubFunctionDetails;
  console.log(textValue);
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = [
    {
      Header: t("MODULE_CODE"),
      Cell: ({ row }) => {
        return (
          <div>
            <span className="link">
              <div>
                <a onClick={() => handleLinkClick(row.original)}> {row.original.subFunctionCode}</a>
              </div>
            </span>
          </div>
        );
      },
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
    {
      Header: t("Download Certificate"),
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div onClick={Delete}>
            <button class="btn btn-delete">
              <span class="mdi mdi-delete mdi-24px"></span>
              <span class="mdi mdi-delete-empty mdi-24px"></span>
              <span>Delete</span>
            </button>
          </div>
        );
      },
    },
  ];
  const saveModule = () => {
    const formData = {
      SubFunctionDetails: {
        id: null,
        tenantId: tenantId,
        subFunctionCode: sfCode,
        majorFunctionId: majorFunction.label,
        subFunctionNameEnglish: subFuncNm,
        subFunctionNameMalayalam: subFuncNmMl,
        status: "",
        auditDetails: {
          createdBy: null,
          createdTime: 111111111,
          lastModifiedBy: null,
          lastModifiedTime: null,
        },
      },
    };
    mutation.mutate(formData);
    refetch();
  };
  const Delete = () => {
    const formData = {
      SubFunctionDetails: {
        id: "",
        tenantId: tenantId,
        subFunctionCode: sfCode,
        majorFunctionId: majorFunction.label,
        subFunctionNameEnglish: subFuncNm,
        subFunctionNameMalayalam: subFuncNmMl,
        status: "",
      },
    };
    deleteItem.mutate(formData);
  };
  const updateDraft = () => {
    const formData = {
      SubFunctionDetails: {
        id: subid,
        tenantId: tenantId,
        subFunctionCode: sfCode,
        majorFunctionId: majorFunctId,
        subFunctionNameEnglish: subFuncNm,
        subFunctionNameMalayalam: subFuncNmMl,
        status: "",
      },
    };
    updatemutation.mutate(formData);
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
              <Dropdown optionKey="value" option={Value} selected={moduleNameEnglish} select={setsetmoduleNameEnglish} />
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <CardLabel>
                {t("MAJOR_FUNCTION_NAME_ENG")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="value"
                option={majorData}
                selected={majorFunction}
                select={selectMajorFunction}
                placeholder={t("MAJOR_FUNCTION_NAME_ENG")}
              />
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <CardLabel>
                {" "}
                {t("SF_CODE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                onChange={setsetSfcode}
                value={sfCode}
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="RegistrationNo"
                placeholder={t("SF_CODE")}
              />
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
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
          <div className="btn-flex">
            <button className="btn-row" onClick={handleClick}>
              Update
            </button>

            <SubmitBar onSubmit={saveModule} disabled={edit} label={t("save")} className="btn-row" />
            <SubmitBar label={t("CLOSE")} disabled={!edit} className="btn-row" />
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

export default SubFunctionAdding;
