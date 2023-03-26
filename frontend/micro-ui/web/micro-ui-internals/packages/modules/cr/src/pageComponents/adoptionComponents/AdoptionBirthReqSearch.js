import React from "react";
import { CardLabel, TextInput } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const AdoptionBirthReqSearch = ({ BirthRegNo, setSelectSetBirthRegNo, setSearchRegId }) => {
  const { t } = useTranslation();
  let tenantId = Digit.ULBService.getCurrentTenantId();
  let validation = "";
  let searchParams = {
    applicationNumber: BirthRegNo ? BirthRegNo : "",
  };
  const { data: { ChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useAdoptionSearch({
    tenantId,
    filters: searchParams,
  });
  // console.log(searchResult); KL-KOCHI-C-000214-CRBRNR-2023-APPL
  let birthReg = BirthRegNo ? searchResult : [];
  if (birthReg?.length > 0) {
    setSearchRegId(birthReg[0]);
  } else {
    setSearchRegId("");
  }
  // console.log(setSearchRegId);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="col-md-4">
          <CardLabel>{`${t("CR_SEARCH_BIRTH_REG_ID")}`}</CardLabel>
          <TextInput
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="CR_SEARCH_BIRTH_REG_ID"
            value={BirthRegNo}
            // onKeyPress={setCheckMalayalamInputField}
            onChange={setSelectSetBirthRegNo}
            //    disable={isDisableEdit || AdoptionDeedNo !==""}
            placeholder={`${t("CR_SEARCH_BIRTH_REG_ID")}`}
            {...(validation = {
              // pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
              isRequired: true,
              type: "text",
              title: t("CR_INVALID_ADOPTION_DECREE"),
            })}
          />
        </div>
      </div>
    </div>
  );
};
export default AdoptionBirthReqSearch;
