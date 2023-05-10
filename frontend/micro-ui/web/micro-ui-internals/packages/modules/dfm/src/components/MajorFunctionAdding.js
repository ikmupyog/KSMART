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
  const [majorFunctionCode, setMajorFunctionCode] = useState("");
  const [majorFunctionNameEnglish, setMajorFunctionNameEnglish] = useState("");
  const [majorFunctionNameMalayalam, setMajorFunctionNameMalayalam] = useState("");
  const [moduleNameEnglish, setmoduleNameEnglish] = useState("");
  console.log("datamodule", moduleNameEnglish.label);
  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  const { refetch } = Digit.Hooks.dfm.useSearchmajorFunction({ tenantId, moduleId: moduleNameEnglish.label });
  // const Value = data?.ModuleDetails?.map((item) => item.moduleNameEnglish);
  const Value = data?.ModuleDetails?.map((item) => ({
    label: item.id,
    value: item.moduleNameEnglish,
  }));
  console.log("valluuee", Value);
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

  //   const { data, isLoading } = Digit.Hooks.dfm.useApplicationFetchDraft({ tenantId });

  //   const draftTextValue = data?.Drafting[0]?.draftText;
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
      },
    ],
    []
  );

  const saveDraft = () => {
    const formData = {
      MajorFunctionDetails: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        tenantId: "kl",
        majorFunctionCode: majorFunctionCode,
        moduleId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        majorFunctionNameEnglish: majorFunctionNameEnglish,
        majorFunctionNameMalayalam: majorFunctionNameMalayalam,
        status: "string",
        auditDetails: {
          createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createdTime: 0,
          lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          lastModifiedTime: 0,
        },
      },
    };

    mutation.mutate(formData);
    refetch();
  };
  //   useEffect(() => {
  //     if (mutation.isSuccess == true) {
  //       history.push("/digit-ui/employee/dfm/note-drafting");
  //     }
  //   }, [mutation.isSuccess]);
  function setsetmoduleNameEnglish(value) {
    setmoduleNameEnglish(value);
  }
  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper module-wrapper">
          <div className="row wrapper-file">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MODULE_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown optionKey="value" option={Value} selected={moduleNameEnglish} select={setsetmoduleNameEnglish} />
                {/* <Dropdown optionKey="moduleCode" option={Value} selected={moduleNameEnglish} select={setsetmoduleNameEnglish} /> */}
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
            <SubmitBar label={t("NEW")} className="btn-row" />
            <SubmitBar onSubmit={saveDraft} label={t("save")} className="btn-row" />
            <SubmitBar label={t("CLOSE")} className="btn-row" />
          </div>
        </div>
      </div>
      <div className="moduleLinkHomePageModuleLinks">
        {/* <div className="FileFlowWrapper customSubFunctionTable">
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
        </div>   */}
      </div>
    </React.Fragment>
  );
};

export default MajorFunctionAdding;
