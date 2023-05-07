import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getChildDetails = (application, t) => {
  application.owners = application?.BornOutsideChildDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {
 
  return {
    title: "CR_BIRTH_CHILD_DETAILS",
    values: [
      
      { title: t("PDF_BIRTH_DATE_OF_BIRTH"), value: application?.childDOB ? Digit.DateUtils.ConvertTimestampToDate(application?.childDOB, "dd/MM/yyyy") : t("CS_NA") },
      { title: t("PDF_BIRTH_CHILD_SEX"), value: application?.gender ? application?.gender : t("CS_NA") },
      { title: t("PDF_BIRTH_PLACE_OF_BIRTH"), value: application?.outsideBirthPlaceEn ? application?.outsideBirthPlaceEn + "/" + application?.outsideBirthPlaceMl : t("CS_NA") },
      { title: t("CR_CHILD_PASSPORT_NO"), value: application?.childPassportNo ? application?.childPassportNo : t("CS_NA") },
      { title: t("PDF_BIRTH_CHILD_NAME"), value: application?.childFirstNameEn + application?.childMiddleNameEn + application?.childLastNameEn},
      { title: t("CR_DATE_OF_ARRIVAL"), value: application?.childArrivalDate ? Digit.DateUtils.ConvertTimestampToDate(application?.childArrivalDate, "dd/MM/yyyy") : t("CS_NA") },
      { title: t("CS_COMMON_COUNTRY"), value: application?.country ? application?.country : t("CS_NA") },
      { title: t("CR_STATE_REGION_PROVINCE"), value: application?.provinceEn + "/" + application?.provinceMl || t("CS_NA")},
      { title: t("CR_CITY_TOWN"), value: application?.cityTownEn + "/" + application?.cityTownMl || t("CS_NA")},
      { title: t("CR_ZIP_CODE"), value: application?.postCode ? application?.postCode : t("CS_NA") },
    ],
  };
};
const getParentsDetails = (application, t) => {
  return{
    title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
    values: [
      { title: t("PDF_BIRTH_NAME_OF_MOTHER"), value:
      application?.BornOutsideParentsDetails?.motherFirstNameEn +
        " / " +
        application?.BornOutsideParentsDetails?.motherFirstNameMl || t("CS_NA") },
        { title: t("CR_MOTHER_PASSPORT_NO"), value: application?.BornOutsideParentsDetails?.motherPassport ? application?.BornOutsideParentsDetails?.motherPassport : t("CS_NA") },
        { title: t("CR_MOTHER_NATIONALITY"), value: application?.BornOutsideParentsDetails?.motherNationality ? application?.BornOutsideParentsDetails?.motherNationality : t("CS_NA") },
        { title: t("PDF_BIRTH_NAME_OF_FATHER"), value:
        application?.BornOutsideParentsDetails?.fatherFirstNameEn +
          " / " +
          application?.BornOutsideParentsDetails?.fatherFirstNameMl || t("CS_NA") },
          { title: t("CR_FATHER_PASSPORT_NO"), value: application?.BornOutsideParentsDetails?.fatherPassport ? application?.BornOutsideParentsDetails?.fatherPassport : t("CS_NA") },
          { title: t("CR_FATHER_NATIONALITY"), value: application?.BornOutsideParentsDetails?.fatherNationality ? application?.BornOutsideParentsDetails?.fatherNationality : t("CS_NA") },
          { title: t("CR_MOTHER_AGE_MARRIAGE"), value: application?.BornOutsideParentsDetails?.motherMarriageAge ? application?.BornOutsideParentsDetails?.motherMarriageAge : t("CS_NA") },
          { title: t("CR_MOTHER_AGE_BIRTH"), value: application?.BornOutsideParentsDetails?.motherMarriageBirth ? application?.BornOutsideParentsDetails?.motherMarriageBirth : t("CS_NA") },
          { title: t("CR_MOTHER_EDUCATION"), value: application?.BornOutsideParentsDetails?.motherEducation ? application?.BornOutsideParentsDetails?.motherEducation : t("CS_NA") },
          { title: t("CR_MOTHER_PROFESSIONAL"), value: application?.BornOutsideParentsDetails?.motherProfession ? application?.BornOutsideParentsDetails?.motherProfession : t("CS_NA") },
          { title: t("CR_FATHER_EDUCATION"), value: application?.BornOutsideParentsDetails?.fatherEducation ? application?.BornOutsideParentsDetails?.fatherEducation : t("CS_NA") },
          { title: t("CR_FATHER_PROFESSIONAL"), value: application?.BornOutsideParentsDetails?.fatherProfession ? application?.BornOutsideParentsDetails?.fatherProfession : t("CS_NA") },
          { title: t("CS_COMMON_RELIGION"), value: application?.BornOutsideParentsDetails?.Religion ? application?.BornOutsideParentsDetails?.Religion : t("CS_NA") },
          { title: t("CR_PARENTS_CONTACT_NO"), value: application?.BornOutsideParentsDetails?.fatherMobile ? application?.BornOutsideParentsDetails?.fatherMobile : t("CS_NA") },
          { title: t("CR_PARENTS_EMAIL"), value: application?.BornOutsideParentsDetails?.fatherEmail ? application?.BornOutsideParentsDetails?.fatherEmail : t("CS_NA") },
    ]
  }
}
const getPermanantAddressDetails = (application, t) => {
  console.log(application, "application");
  return {
    title: "CR_PERMANENT_ADDRESS",
    values: [
      { title: t("CR_BIRTH_PERM_HO_NAME_LABEL"), value:
      application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn +
        " / " +
        application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameMl || t("CS_NA") },
        { title: t("CR_BIRTH_PERM_LOCALITY_LABEL"), value:
        application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameEn +
          " / " +
          application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameMl || t("CS_NA") },
        { title: t("CR_BIRTH_PERM_STREET_LABEL"), value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameEn ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameEn : t("CS_NA") },
        { title: t("CS_COMMON_POST_OFFICE"), value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPostOffice ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPostOffice : t("CS_NA") },
        { title: t("CR_BIRTH_PERM_PINCODE_LABEL"), value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPincode ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPincode : t("CS_NA") },
        { title: t("CS_COMMON_VILLAGE"), value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrVillage ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrVillage : t("CS_NA") },
        { title: t("CS_COMMON_TALUK"), value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrTaluk ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrTaluk : t("CS_NA") },
        { title: t("CS_COMMON_DISTRICT"), value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrDistrict ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrDistrict : t("CS_NA") },
        { title: t("CR_BIRTH_PERM_STATE_LABEL"), value: application?.BornOutsideAddressBirthDetails?.permtaddressStateName ? application?.BornOutsideAddressBirthDetails?.permtaddressStateName : t("CS_NA") },
        { title: t("CR_BIRTH_PERM_COUNTRY_LABEL"), value: application?.BornOutsideAddressBirthDetails?.permtaddressCountry ? application?.BornOutsideAddressBirthDetails?.permtaddressCountry : t("CS_NA") },
    ],
  };
};
    const getForeignAddressDetails = (application, t) => {
      return{
    title: "CR_PARENTS_FOREIGN_ADDRESS",
    values: [
      { title: t("CS_COMMON_COUNTRY"), value: application?.BornOutsideAddressBirthDetails?.presentOutSideCountry ? application?.BornOutsideAddressBirthDetails?.presentOutSideCountry : t("CS_NA") },
      { title: t("CR_STATE_REGION_PROVINCE_EN"), value:
      application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn +
        " / " +
        application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceMl || t("CS_NA") },
        { title: t("CR_TOWN_VILLAGE_EN"), value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage : t("CS_NA") },
        { title: t("CR_CITY_TOWN_EN"), value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown : t("CS_NA") },
        { title: t("CR_ZIP_CODE"), value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode : t("CS_NA") },
        { title: t("CR_ADDRES_LINE_ONE_EN"), value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn : t("CS_NA") },
        { title: t("CR_ADDRES_LINE_ONE_ML"), value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMl ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMl : t("CS_NA") },
        { title: t("CR_ADDRES_LINE_TWO_EN"), value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB : t("CS_NA") },
        { title: t("CR_ADDRES_LINE_TWO_ML"), value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMlB ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMlB : t("CS_NA") },
    ]
  };
};
const getstatisticalInfo = (application, t) => {
  return{
    title: "CR_STATSTICAL_INFORMATION_HEADER",
    values: [
      { title: t("CR_BIRTH_WEIGHT"), value: application?.BornOutsideStaticInfn?.birthWeight ? application?.BornOutsideStaticInfn?.birthWeight : t("CS_NA") },
      { title: t("CR_PREGNANCY_DURATION"), value: application?.BornOutsideStaticInfn?.pregnancyDuration ? application?.BornOutsideStaticInfn?.pregnancyDuration : t("CS_NA") },
      { title: t("CR_DELIVERY_METHOD"), value: application?.BornOutsideStaticInfn?.deliveryMethods ? application?.BornOutsideStaticInfn?.deliveryMethods : t("CS_NA") },
      { title: t("CR_NATURE_OF_MEDICAL_ATTENTION"), value: application?.BornOutsideStaticInfn?.medicalAttensionSub ? application?.BornOutsideStaticInfn?.medicalAttensionSub : t("CS_NA") },
      { title: t("CR_ORDER_CURRENT_DELIVERY"), value: application?.BornOutsideStaticInfn?.orderofChildren ? application?.BornOutsideStaticInfn?.orderofChildren : t("CS_NA") },
      { title: t("CR_RELATION"), value: application?.BornOutsideStaticInfn?.relation ? application?.BornOutsideStaticInfn?.relation : t("CS_NA") },
      { title: t("CS_COMMON_AADHAAR"), value: application?.BornOutsideStaticInfn?.informarAadhar ? application?.BornOutsideStaticInfn?.informarAadhar : t("CS_NA") },
      { title: t("CR_INFORMANT_NAME"), value: application?.BornOutsideStaticInfn?.informarNameEn ? application?.BornOutsideStaticInfn?.informarNameEn : t("CS_NA") },
      { title: t("CR_MOBILE_NO"), value: application?.BornOutsideStaticInfn?.informarMobile ? application?.BornOutsideStaticInfn?.informarMobile : t("CS_NA") },
      { title: t("CR_INFORMER_ADDRESS"), value: application?.BornOutsideStaticInfn?.informarAddress ? application?.BornOutsideStaticInfn?.informarAddress : t("CS_NA") },
    ]
  }
}
const getCRBornOutsideAcknowledgementData = async (application, tenantInfo, t) => {
  //   const filesArray = application?.tradeLicenseDetail?.applicationDocuments?.map((value) => value?.fileStoreId);
  //   let res;
  //   if (filesArray) {
  //     res = await Digit.UploadServices.Filefetch(filesArray, Digit.ULBService.getStateId());
  //   }
  return {
    t: t,
    tenantId: tenantInfo?.code,
    title: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    name: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    email: "",
    phoneNumber: "",
    details: [
      {
        title:t("Acknowledgment Details"),
        values: [
          { title: t("Application No"), value: application?.applicationNumber },
          {
            title: t("Application Date"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.dateofreport, "dd/MM/yyyy"),
          },
        ],
      },
      getChildDetails(application, t),
      getParentsDetails(application, t),
      getPermanantAddressDetails(application, t),
      getForeignAddressDetails(application, t),
      getstatisticalInfo(application, t),
      
    ],
  };
};

export default getCRBornOutsideAcknowledgementData;
