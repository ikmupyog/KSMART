const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getCorrectionFieldValue = (newValue, isDate,t) =>{
  let correctionNewValue = newValue ? newValue : t("CR_NOT_RECORDED");
  if(isDate){
    correctionNewValue = newValue ? Digit.DateUtils.ConvertTimestampToDate(parseInt(newValue, 10), "dd/MM/yyyy") : t("CR_NOT_RECORDED");
  }
  return correctionNewValue;
}

const getCorrectionDetails = (application, t) => {
  const correctionField = application?.CorrectionField;
  const returnDetails = correctionField?.map((correctionItem) => {
    const isDate = correctionItem?.correctionFieldName === "CHILD_DOB" ? true : false;
    const correctionData = correctionItem.correctionFieldValue?.map((correction) => {
      const correctionFieldName = getCorrectionFieldValue(correction?.newValue, isDate, t);
      const birthLabels = correction?.column?.split('_');
      const isMalField = ["MAL","ML"].includes(birthLabels[birthLabels?.length - 1]);
      if(!isMalField){
        return (
          // { title: t(correction?.column), value: isDate ? Digit.DateUtils.ConvertTimestampToDate(parseInt(correction?.oldValue,10), "dd/MM/yyyy") : correction?.oldValue},
          {
            title: t(correction?.column),
            value: correctionFieldName,
          }
        );
      } else {
        return "NA";
      }
      
    });
    const formattedCorrectionData = correctionData.filter((item) => item !== 'NA')
    return { title: t(`CR_${correctionItem?.correctionFieldName}`), values: formattedCorrectionData };
  });
  return returnDetails;
};

const getCRBirthInclusionAcknowledgementData = async (application, tenantInfo, t) => {
  // const birthInclusionData = ...getCorrectionDetails(application, t)
  return {
    t: t,
    tenantId: tenantInfo?.code,
    title: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    name: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    email: "",
    phoneNumber: "",
    details: [
      {
        title: t("Acknowledgment Details"),
        values: [
          { title: t("Application No"), value: application?.applicationNumber },
          {
            title: t("Application Date"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.dateOfReport, "dd/MM/yyyy"),
          },
        ],
      },
      //   getChildDetails(application, t),
      //   getAddressDetails(application, t),
      ...getCorrectionDetails(application, t),
    ],
  };
};

export default getCRBirthInclusionAcknowledgementData;
