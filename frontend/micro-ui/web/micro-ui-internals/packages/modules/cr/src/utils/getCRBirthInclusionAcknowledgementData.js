const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getCorrectionDetails = (application, t) => {
  console.log("correction details==", application);
  const correctionField = application?.CorrectionField;
  const returnDetails = correctionField?.map((correctionItem) => {
    const isDate = correctionItem?.correctionFieldName === "CHILD_DOB" ? true : false;
    const correctionData = correctionItem.correctionFieldValue?.map((correction) => {
      return (
        // { title: t(correction?.column), value: isDate ? Digit.DateUtils.ConvertTimestampToDate(parseInt(correction?.oldValue,10), "dd/MM/yyyy") : correction?.oldValue},
        {
          title: t(correction?.column),
          value: isDate ? Digit.DateUtils.ConvertTimestampToDate(parseInt(correction?.newValue, 10), "dd/MM/yyyy") : correction?.newValue,
        }
      );
    });
    return { title: t(correctionItem?.correctionFieldName), values: correctionData };
  });
  // console.log("correctionData==", correctionData);
  // returnedData = {...correctionData}

  console.log("returnDetails---", returnDetails);
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
