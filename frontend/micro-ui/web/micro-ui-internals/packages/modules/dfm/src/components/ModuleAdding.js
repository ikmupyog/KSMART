import React, { useState,useMemo } from "react";
import { SubmitBar, CardLabel, TextInput, Table } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";

const ModuleAdding = ({ path, handleNext, formData, config, onSelect }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const mutation = Digit.Hooks.dfm.useCreateModule(tenantId);
  const updatemutation = Digit.Hooks.dfm.useUpdateModule(tenantId);
  const deleteItem = Digit.Hooks.dfm.useDeleteModule(tenantId);
  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  const [moduleCode, setModulecode] = useState("");
  const [moduleNameEn, setModuleNameEn] = useState("");
  const [moduleNameMl, setModuleNameMl] = useState("");

  const setsetModulecode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setModulecode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetModuleNameEn = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setModuleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetModuleNameMl = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C @]*$/;
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match(pattern) != null) {
      setModuleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const [edit, setIsEdit] = useState(false);
  function handleLinkClick(row) {
    setIsEdit(true);
    setModulecode(row.moduleCode);
    setModuleNameEn(row.moduleNameEnglish);
    setModuleNameMl(row.moduleNameMalayalam);
  }
  const textValue = data?.ModuleDetails;
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const Delete = () => {
    const formData = {
      ModuleDetails: {
        status: "",
        moduleCode: moduleCode,
      },
    };
    deleteItem.mutate(formData);
  };
  const columns = useMemo(
    () => [
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

  const saveModule = () => {
    const formData = {
      ModuleDetails: {
        id: null,
        tenantId: tenantId,
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
