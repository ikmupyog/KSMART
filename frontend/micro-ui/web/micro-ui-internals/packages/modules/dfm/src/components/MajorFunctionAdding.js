import React, { useEffect, useState, useMemo } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { SubmitBar, CardLabel, Dropdown, TextInput, Table } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";

const MajorFunctionAdding = ({ path, handleNext, formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const history = useHistory();
  const mutation = Digit.Hooks.dfm.useMajorFunctionAdd(tenantId);
  const deleteItem = Digit.Hooks.dfm.useDeleteMajorFunc(tenantId);
  const [moduleIdvalue, setModuleidvalue ] = useState("")
  const [majorFunctionCode, setMajorFunctionCode] = useState("");
  const [majorFunctionNameEnglish, setMajorFunctionNameEnglish] = useState("");
  const [majorFunctionNameMalayalam, setMajorFunctionNameMalayalam] = useState("");
  const [moduleNameEnglish, setmoduleNameEnglish] = useState("");
  // console.log("datamodule", moduleNameEnglish.label);
  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  const { data: searchData, refetch } = Digit.Hooks.dfm.useSearchmajorFunction({ tenantId, moduleId: moduleNameEnglish.label });
  const updatemutation = Digit.Hooks.dfm.useUpdateMajorFunc();

  const Value = data?.ModuleDetails?.map((item) => ({
    label: item.id,
    value: item.moduleNameEnglish,
  }));
  // console.log("valluuee", Value);
  const setsetMajorFunctionCode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setMajorFunctionCode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetMajorFunctionNameEnglish = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setMajorFunctionNameEnglish(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetMajorFunctionNameMalayalam = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C @]*$/;
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match(pattern) != null) {
      setMajorFunctionNameMalayalam(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  function setsetmoduleNameEnglish(value) {
    setmoduleNameEnglish(value);
  }
  const [edit, setIsEdit] = useState(false);
  function handleLinkClick(row) {
    setIsEdit(true);
    // moduleNameEnglish(moduleNameEnglish)
    // setmoduleNameEnglish(row.moduleNameEnglish)
    setModuleidvalue(row.moduleId);
    setMajorFunctionCode(row.majorFunctionCode);
    setMajorFunctionNameEnglish(row.majorFunctionNameEnglish);
    setMajorFunctionNameMalayalam(row.majorFunctionNameMalayalam);
  }
  const majorData = searchData?.MajorFunctionDetails;
  // const moduleId = searchData?.MajorFunctionDetails?.moduleId;
  // console.log("moduleIdsearch", moduleId);
  const Delete = () => {
    const formData = {
      MajorFunctionDetails: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        tenantId: tenantId,
        majorFunctionCode: majorFunctionCode,
        moduleId: moduleNameEnglish.label,
        majorFunctionNameEnglish: majorFunctionNameEnglish,
        majorFunctionNameMalayalam: majorFunctionNameMalayalam,
        status: "string",
      },
    };
    deleteItem.mutate(formData);
  };
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: t("MF_CODE"),
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                <div>
                  <a onClick={() => handleLinkClick(row.original)}> {row.original.majorFunctionCode}</a>
                </div>
              </span>
            </div>
          );
        },
        disableSortBy: true,
      },
      {
        Header: t("MODULE_NAME"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.majorFunctionNameMalayalam) || ""),
      },
      // {
      //   Header: t("MAJOR_FUNCT_EN"),
      //   disableSortBy: true,
      //   Cell: ({ row }) => GetCell(t(row.original.moduleNameEnglish.label) || ""),
      // },
      {
        Header: t("MAJOR_FUNCT_ML"),
        Cell: ({ row }) => GetCell(t(row?.original?.majorFunctionNameMalayalam || "NA")),
        disableSortBy: true,
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
    ],
    []
  );
  const saveDraft = () => {
    const formData = {
      MajorFunctionDetails: {
        id: "",
        tenantId: tenantId,
        majorFunctionCode: majorFunctionCode,
        moduleId: moduleNameEnglish.label,
        majorFunctionNameEnglish: majorFunctionNameEnglish,
        majorFunctionNameMalayalam: majorFunctionNameMalayalam,
        status: "",
        auditDetails: {
          createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createdTime: 0,
          lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          lastModifiedTime: 0,
        },
      },
    };
    mutation.mutate(formData);
    refetch()
  };
  function handleClick() {
    updateDraft();
  }

  const updateDraft = () => {
    const formData = {
      MajorFunctionDetails: {
        id: "",
        tenantId: tenantId,
        majorFunctionCode: majorFunctionCode,
        moduleId: moduleIdvalue,
        majorFunctionNameEnglish: majorFunctionNameEnglish,
        majorFunctionNameMalayalam: majorFunctionNameMalayalam,
        status: "",
        auditDetails: {
          createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createdTime: 0,
          lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          lastModifiedTime: 0,
        },
      },
    };
    updatemutation.mutate(formData);
  };
  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper major-wrapper">
          <div className="row wrapper-file">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MODULE_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown optionKey="value" option={Value} selected={moduleNameEnglish} select={setsetmoduleNameEnglish} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MF_CODE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  onChange={setsetMajorFunctionCode}
                  value={majorFunctionCode}
                  name="RegistrationNo"
                  placeholder={t("MF_CODE")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MAJOR_FUNCTION_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  onChange={setsetMajorFunctionNameEnglish}
                  value={majorFunctionNameEnglish}
                  name="RegistrationNo"
                  placeholder={t("MAJOR_FUNCTION_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MAJOR_FUNCTION_NAME_MAL")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  onChange={setsetMajorFunctionNameMalayalam}
                  value={majorFunctionNameMalayalam}
                  name="RegistrationNo"
                  placeholder={t("MAJOR_FUNCTION_NAME_MAL")}
                />
              </div>
            </div>
          </div>
          <div className="btn-flex">
            <button className="btn-row" onClick={handleClick} >Update</button>
            <SubmitBar onSubmit={saveDraft} label={t("save")} className="btn-row" />
            <SubmitBar label={t("CLOSE")} className="btn-row" />
          </div>
        </div>
      </div>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper customSubFunctionTable">
          {majorData?.length > 0 && (
            <Table
              t={t}
              data={majorData}
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

export default MajorFunctionAdding;
