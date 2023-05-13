import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getChildDetails = (application, t) => {
  application.owners = application?.BornOutsideChildDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {
 
  return {
    title: "CR_BIRTH_CHILD_DETAILS",
    values: [
      { title: "Child Aadhaar", value: application?.childAadharNo ? application?.childAadharNo : t("CR_NOT_RECORDED") },
      { title: "Date of Birth", value: application?.childDOB ? Digit.DateUtils.ConvertTimestampToDate(application?.childDOB, "dd/MM/yyyy") : t("CR_NOT_RECORDED") },
      { title: "Sex", value: application?.gender ? application?.gender : t("CR_NOT_RECORDED") },
      { title: "Child Passport No", value: application?.childPassportNo ? application?.childPassortNo : t("CR_NOT_RECORDED") },
      { title: "Date of Arrival", value: application?.childArrivalDate ? Digit.DateUtils.ConvertTimestampToDate(application?.childArrivalDate, "dd/MM/yyyy") : t("CR_NOT_RECORDED") },
      { title: "Child Name", value:  application?.childFirstNameEn + "" + application?.childMiddleNameEn + "" + application?.childLastNameEn
      ? application?.childFirstNameEn + "" + application?.childMiddleNameEn + "" + application?.childLastNameEn
      : t("CR_NOT_RECORDED"),},
      { title: "Country", value: application?.country ? application?.country : t("CR_NOT_RECORDED") },
      { title: "State/Province/Region", value: application?.provinceEn?application?.provinceEn : t("CR_NOT_RECORDED")},
      { title: "City/Town/Village Name ", value: application?.cityTownEn?application?.cityTownEn : t("CR_NOT_RECORDED")},
      { title: "Outside Birth Place", value: application?.outsideBirthPlaceEn ? application?.outsideBirthPlaceEn : t("CR_NOT_RECORDED") },
      { title: "Postal Code", value: application?.postCode ? application?.postCode : t("CR_NOT_RECORDED") },
    ],
  };
};
const getParentsDetails = (application, t) => {
  return{
    title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
    values: [
      { title: "Mother's Name", value: application?.BornOutsideParentsDetails?.motherFirstNameEn ? application?.BornOutsideParentsDetails?.motherFirstNameEn : t("CR_NOT_RECORDED") },
        { title: "Passport No", value: application?.BornOutsideParentsDetails?.motherPassport ? application?.BornOutsideParentsDetails?.motherPassport : t("CR_NOT_RECORDED") },
        { title: "Nationality", value: application?.BornOutsideParentsDetails?.motherNationality ? application?.BornOutsideParentsDetails?.motherNationality : t("CR_NOT_RECORDED") },
        { title: "Father's Name", value: application?.BornOutsideParentsDetails?.fatherFirstNameEn ? application?.BornOutsideParentsDetails?.fatherFirstNameEn : t("CR_NOT_RECORDED") },
          { title: "Passport No", value: application?.BornOutsideParentsDetails?.fatherPassport ? application?.BornOutsideParentsDetails?.fatherPassport : t("CR_NOT_RECORDED") },
          { title: "Nationality", value: application?.BornOutsideParentsDetails?.fatherNationality ? application?.BornOutsideParentsDetails?.fatherNationality : t("CR_NOT_RECORDED") },
          { title: "Age of the mother at the time of marriage", value: application?.BornOutsideParentsDetails?.motherMarriageAge ? application?.BornOutsideParentsDetails?.motherMarriageAge : t("CR_NOT_RECORDED") },
          { title: "Age of the mother at the time of this birth", value: application?.BornOutsideParentsDetails?.motherMarriageBirth ? application?.BornOutsideParentsDetails?.motherMarriageBirth : t("CR_NOT_RECORDED") },
          { title: "Mother Education", value: application?.BornOutsideParentsDetails?.motherEducation ? application?.BornOutsideParentsDetails?.motherEducation : t("CR_NOT_RECORDED") },
          { title: "MothersOccupation", value: application?.BornOutsideParentsDetails?.motherProfession ? application?.BornOutsideParentsDetails?.motherProfession : t("CR_NOT_RECORDED") },
          { title: "Father Education", value: application?.BornOutsideParentsDetails?.fatherEducation ? application?.BornOutsideParentsDetails?.fatherEducation : t("CR_NOT_RECORDED") },
          { title: "FathersOccupation", value: application?.BornOutsideParentsDetails?.fatherProfession ? application?.BornOutsideParentsDetails?.fatherProfession : t("CR_NOT_RECORDED") },
          { title: "Religion ", value: application?.BornOutsideParentsDetails?.Religion ? application?.BornOutsideParentsDetails?.Religion : t("CR_NOT_RECORDED") },
          { title: "Parent's Contact No", value: application?.BornOutsideParentsDetails?.fatherMobile ? application?.BornOutsideParentsDetails?.fatherMobile : t("CR_NOT_RECORDED") },
          { title: "Parent's Email ID", value: application?.BornOutsideParentsDetails?.fatherEmail ? application?.BornOutsideParentsDetails?.fatherEmail : t("CR_NOT_RECORDED") },
    ]
  }
}
const getPermanantAddressDetails = (application, t) => {
  console.log(application, "application");
  return {
    title: "CR_PERMANENT_ADDRESS",
    values: [
      { title: "House No & Name", value:
      application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn : t("CR_NOT_RECORDED") },
        { title: "Locality", value:
        application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameEn ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameEn : t("CR_NOT_RECORDED") },
        { title: "Street Name", value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameEn ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrStreetNameEn : t("CR_NOT_RECORDED") },
        { title: "Post Office", value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPostOffice ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPostOffice : t("CR_NOT_RECORDED") },
        { title: "Pin Code", value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPincode ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrPincode : t("CR_NOT_RECORDED") },
        { title: "Ward", value: application?.BornOutsideAddressBirthDetails?.permntInKeralaWardNoEn ? application?.BornOutsideAddressBirthDetails?.permntInKeralaWardNoEn : t("CR_NOT_RECORDED") },
        { title: "Village", value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrVillage ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrVillage : t("CR_NOT_RECORDED") },
        { title: "Taluk", value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrTaluk ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrTaluk : t("CR_NOT_RECORDED") },
        { title: "District", value: application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrDistrict ? application?.BornOutsideAddressBirthDetails?.permntInKeralaAdrDistrict : t("CR_NOT_RECORDED") },
        { title: "State", value: application?.BornOutsideAddressBirthDetails?.permtaddressStateName ? application?.BornOutsideAddressBirthDetails?.permtaddressStateName : t("CR_NOT_RECORDED") },
        { title: "Country", value: application?.BornOutsideAddressBirthDetails?.permtaddressCountry ? application?.BornOutsideAddressBirthDetails?.permtaddressCountry : t("CR_NOT_RECORDED") },
    ],
  };
};
    const getForeignAddressDetails = (application, t) => {
      return{
    title: "CR_PARENTS_FOREIGN_ADDRESS",
    values: [
      { title: "Country", value: application?.BornOutsideAddressBirthDetails?.presentOutSideCountry ? application?.BornOutsideAddressBirthDetails?.presentOutSideCountry : t("CR_NOT_RECORDED") },
      { title: "State/Province/Region", value:
      application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn : t("CR_NOT_RECORDED") },
        { title: "Whether City/Town or Village", value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage : t("CR_NOT_RECORDED") },
        { title: "City/Town/Village Name ", value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown : t("CR_NOT_RECORDED") },
        { title: "Postal Code", value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode : t("CR_NOT_RECORDED") },
        { title: "Address Line 1", value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn : t("CR_NOT_RECORDED") },
        { title: "Address Line 2", value: application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB ? application?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB : t("CR_NOT_RECORDED") },
    ]
  };
};
// const getstatisticalInfo = (application, t) => {
//   return{
//     title: "CR_STATSTICAL_INFORMATION_HEADER",
//     values: [
//       { title: "Weight at the time of Birth (KG)", value: application?.BornOutsideStaticInfn?.birthWeight ? application?.BornOutsideStaticInfn?.birthWeight : t("CR_NOT_RECORDED") },
//       { title: "Duration of Pregnancy (Weeks)", value: application?.BornOutsideStaticInfn?.pregnancyDuration ? application?.BornOutsideStaticInfn?.pregnancyDuration : t("CR_NOT_RECORDED") },
//       { title: "Delivery Method", value: application?.BornOutsideStaticInfn?.deliveryMethods ? application?.BornOutsideStaticInfn?.deliveryMethods : t("CR_NOT_RECORDED") },
//       { title: "Nature of Medical Attention at Delivery ", value: application?.BornOutsideStaticInfn?.medicalAttensionSub ? application?.BornOutsideStaticInfn?.medicalAttensionSub : t("CR_NOT_RECORDED") },
//       { title: "No of Child Born Alive Including this Child", value: application?.BornOutsideStaticInfn?.orderofChildren ? application?.BornOutsideStaticInfn?.orderofChildren : t("CR_NOT_RECORDED") },
//       { title: "Relation", value: application?.BornOutsideStaticInfn?.relation ? application?.BornOutsideStaticInfn?.relation : t("CR_NOT_RECORDED") },
//       { title: "Aadhaar No.", value: application?.BornOutsideStaticInfn?.informarAadhar ? application?.BornOutsideStaticInfn?.informarAadhar : t("CR_NOT_RECORDED") },
//       { title: "Informer Name", value: application?.BornOutsideStaticInfn?.informarNameEn ? application?.BornOutsideStaticInfn?.informarNameEn : t("CR_NOT_RECORDED") },
//       { title: "Mobile No", value: application?.BornOutsideStaticInfn?.informarMobile ? application?.BornOutsideStaticInfn?.informarMobile : t("CR_NOT_RECORDED") },
//       { title: "Communication address", value: application?.BornOutsideStaticInfn?.informarAddress ? application?.BornOutsideStaticInfn?.informarAddress : t(t("CR_NOT_RECORDED")) },
//     ]
//   }
// }
const getCRBornOutsideAcknowledgementData = async (application, tenantInfo, t) => {
  //   const filesArray = application?.tradeLicenseDetail?.applicationDocuments?.map((value) => value?.fileStoreId);
  //   let res;
  //   if (filesArray) {
  //     res = await Digit.UploadServices.Filefetch(filesArray, Digit.ULBService.getStateId());
  //   }
  return {
    t: t,
    tenantId: tenantInfo?.code,
    title: `${tenantInfo?.i18nKey} ${ulbCamel(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`)}`,
    name: `${tenantInfo?.i18nKey} ${ulbCamel(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`)}`,
    email: "",
    phoneNumber: "",
    details: [
      {
        title:"Acknowledgment Details",
        values: [
          { title: "Application No", value: application?.applicationNumber },
          {
            title: "Application Date",
            value: Digit.DateUtils.ConvertTimestampToDate(application?.dateofreport, "dd/MM/yyyy"),
          },
        ],
      },
      getChildDetails(application, t),
      getParentsDetails(application, t),
      getPermanantAddressDetails(application, t),
      getForeignAddressDetails(application, t),
      // getstatisticalInfo(application, t),
      
    ],
  };
};

export default getCRBornOutsideAcknowledgementData;
