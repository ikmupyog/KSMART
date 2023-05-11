const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const marriageFieldLabels = {
  marriageDOM: "CR_DATE_OF_MARRIAGE",
  "GroomDetails.groomFirstnameEn": "CR_FIRST_NAME_EN",
  "GroomDetails.groomFirstnameMl": "CR_FIRST_NAME_ML",
  "GroomDetails.groomMiddlenameEn": "CR_MIDDLE_NAME_EN",
  "GroomDetails.groomMiddlenameMl": "CR_MIDDLE_NAME_ML",
  "GroomDetails.groomLastnameEn": "CR_LAST_NAME_EN",
  "GroomDetails.groomLastnameMl": "CR_LAST_NAME_ML",
  "GroomDetails.groomDOB": "CR_DATE_OF_BIRTH_TIME",
  "GroomDetails.groomAge": "CR_AGE",
  "GroomDetails.groomMothernameEn": "CR_MOTHER_NAME_EN",
  "GroomDetails.groomMothernameMl": "CR_MOTHER_NAME_ML",
  "GroomDetails.groomFathernameEn": "CR_FATHER_NAME_EN",
  "GroomDetails.groomFathernameMl": "CR_FATHER_NAME_ML",
  "GroomDetails.groomGuardiannameEn": "CR_GUARDIAN_NAME_EN",
  "GroomDetails.groomGuardiannameMl": "CR_GUARDIAN_NAME_ML",
  "GroomAddressDetails.permntInKeralaAdrHouseNameEn": "CR_HOUSE_NO_AND_NAME_EN",
  "GroomAddressDetails.permntInKeralaAdrHouseNameMl": "CR_HOUSE_NO_AND_NAME_MAL",
  "GroomAddressDetails.permntInKeralaAdrLocalityNameEn": "CR_LOCALITY_EN",
  "GroomAddressDetails.permntInKeralaAdrLocalityNameMl": "CR_LOCALITY_ML",
  "GroomAddressDetails.permntInKeralaAdrStreetNameEn": "CR_STREET_EN",
  "GroomAddressDetails.permntInKeralaAdrStreetNameMl": "CR_STREET_MAL",
  "GroomAddressDetails.permntOutsideKeralaHouseNameEn": "CR_HOUSE_NO_AND_NAME_EN",
  "GroomAddressDetails.permntOutsideKeralaHouseNameMl": "CR_HOUSE_NO_AND_NAME_MAL",
  "GroomAddressDetails.permntOutsideKeralaLocalityNameEn": "CR_LOCALITY_EN",
  "GroomAddressDetails.permntOutsideKeralaLocalityNameMl": "CR_LOCALITY_ML",
  "GroomAddressDetails.permntOutsideKeralaStreetNameEn": "CR_STREET_EN",
  "GroomAddressDetails.permntOutsideKeralaStreetNameMl": "CR_STREET_MAL",
  "GroomAddressDetails.permntOutsideIndiaLineoneEn": "CR_ADDRES_LINE_ONE_EN",
  "GroomAddressDetails.permntOutsideIndiaLineoneMl": "CR_ADDRES_LINE_ONE_ML",
  "GroomAddressDetails.permntOutsideIndiaLinetwoEn": "CR_ADDRES_LINE_TWO_EN",
  "GroomAddressDetails.permntOutsideIndiaLinetwoMl": "CR_ADDRES_LINE_TWO_ML",

  "BrideDetails.brideFirstnameEn": "CR_FIRST_NAME_EN",
  "BrideDetails.brideFirstnameMl": "CR_FIRST_NAME_ML",
  "BrideDetails.brideMiddlenameEn": "CR_MIDDLE_NAME_EN",
  "BrideDetails.brideMiddlenameMl": "CR_MIDDLE_NAME_ML",
  "BrideDetails.brideLastnameEn": "CR_LAST_NAME_EN",
  "BrideDetails.brideLastnameMl": "CR_LAST_NAME_ML",
  "BrideDetails.brideDOB": "CR_DATE_OF_BIRTH_TIME",
  "BrideDetails.brideAge": "CR_AGE",
  "BrideDetails.brideMothernameEn": "CR_MOTHER_NAME_EN",
  "BrideDetails.brideMothernameMl": "CR_MOTHER_NAME_ML",
  "BrideDetails.brideFathernameEn": "CR_FATHER_NAME_EN",
  "BrideDetails.brideFathernameMl": "CR_FATHER_NAME_ML",
  "BrideDetails.brideGuardiannameEn": "CR_GUARDIAN_NAME_EN",
  "BrideDetails.brideGuardiannameMl": "CR_GUARDIAN_NAME_ML",
  "BrideAddressDetails.permntInKeralaAdrHouseNameEn": "CR_HOUSE_NO_AND_NAME_EN",
  "BrideAddressDetails.permntInKeralaAdrHouseNameMl": "CR_HOUSE_NO_AND_NAME_MAL",
  "BrideAddressDetails.permntInKeralaAdrLocalityNameEn": "CR_LOCALITY_EN",
  "BrideAddressDetails.permntInKeralaAdrLocalityNameMl": "CR_LOCALITY_ML",
  "BrideAddressDetails.permntInKeralaAdrStreetNameEn": "CR_STREET_EN",
  "BrideAddressDetails.permntInKeralaAdrStreetNameMl": "CR_STREET_ML",
  "BrideAddressDetails.permntOutsideKeralaHouseNameEn": "CR_HOUSE_NO_AND_NAME_EN",
  "BrideAddressDetails.permntOutsideKeralaHouseNameMl": "CR_HOUSE_NO_AND_NAME_MAL",
  "BrideAddressDetails.permntOutsideKeralaLocalityNameEn": "CR_LOCALITY_EN",
  "BrideAddressDetails.permntOutsideKeralaLocalityNameMl": "CR_LOCALITY_ML",
  "BrideAddressDetails.permntOutsideKeralaStreetNameEn": "CR_STREET_EN",
  "BrideAddressDetails.permntOutsideKeralaStreetNameMl": "CR_STREET_ML",
  "BrideAddressDetails.permntOutsideIndiaLineoneEn": "CR_ADDRES_LINE_ONE_EN",
  "BrideAddressDetails.permntOutsideIndiaLineoneMl": "CR_ADDRES_LINE_ONE_ML",
  "BrideAddressDetails.permntOutsideIndiaLinetwoEn": "CR_ADDRES_LINE_TWO_EN",
  "BrideAddressDetails.permntOutsideIndiaLinetwoMl": "CR_ADDRES_LINE_TWO_ML",
};

const getCorrectionFieldValue = (newValue, isDate,t) =>{
  let correctionNewValue = newValue ? newValue : t("CR_NOT_RECORDED");
  if(isDate){
    correctionNewValue = newValue ? Digit.DateUtils.ConvertTimestampToDate(parseInt(newValue, 10), "dd/MM/yyyy") : t("CR_NOT_RECORDED");
  }
  return correctionNewValue;
}

const getCorrectionDetails = (application, t) => {
  const correctionField = application?.CorrectionField;

  const checkIsDate = (fieldName, value) => {
    let fieldType = false;
    if (
      fieldName === "DOM" ||
      (fieldName === "GROOM_AGE" && value.column === "GroomDetails.groomDOB") ||
      (fieldName === "BRIDE_AGE" && value.column === "BrideDetails.brideDOB")
    ){
      fieldType = true;
    }
      return fieldType;
  };
  const returnDetails = correctionField?.map((correctionItem) => {
    
    const correctionData = correctionItem.correctionFieldValue?.map((correction) => {
      const isDate = checkIsDate(correctionItem?.correctionFieldName, correction);
      const correctionFieldValue = getCorrectionFieldValue(correction?.newValue, isDate,t);
      const marriageLabels = marriageFieldLabels[correction?.column]?.split('_');
      const isMalField = ["MAL","ML"].includes(marriageLabels[marriageLabels?.length - 1]);
      if(!isMalField){
      return (
        // { title: t(correction?.column), value: isDate ? Digit.DateUtils.ConvertTimestampToDate(parseInt(correction?.oldValue,10), "dd/MM/yyyy") : correction?.oldValue},
        {
          title: t(marriageFieldLabels[correction?.column]),
          value: correctionFieldValue,
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

const getCRMarriageCorrectionAcknowledgementData = async (application, tenantInfo, t) => {
  const resp = await getCorrectionDetails(application, t);
  console.log("response --->", resp);
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
            value: Digit.DateUtils.ConvertTimestampToDate(application?.applicationDate, "dd/MM/yyyy"),
          },
        ],
      },
      ...getCorrectionDetails(application, t),
    ],
  };
};

export default getCRMarriageCorrectionAcknowledgementData;
