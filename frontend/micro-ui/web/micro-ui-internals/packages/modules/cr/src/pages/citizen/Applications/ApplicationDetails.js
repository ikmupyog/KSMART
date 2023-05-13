import {
  Card,
  Loader,
  Row,
  CardSubHeader,
  StatusTable,
  BackButton,
  Accordion
} from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import CRWFApplicationTimeline from "../../../pageComponents/birthComponents/CRWFApplicationTimeline";
import CRDocument from "../../../pageComponents/birthComponents/CRDocuments";
import _ from "lodash";
import { convertEpochToDate } from "../../../utils";

const CRCitizenApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { tenantId } = useParams();
  const history = useHistory();

  //todo: hook should return object to render the data
  const { isLoading, isError, error, data: application, error: errorApplication } = Digit.Hooks.cr.useCRApplicationDetails({
    tenantId: tenantId,
    applicationNumber: id,
  });

  const { NA, getFormattedValue } = Digit.Utils.dataFormatter;

  const data = _.head(application) || {};

  useEffect(() => { }, [application, errorApplication]);

  const businessservice = application?.[0]?.businessservice;
  const { isLoading: iswfLoading, data: wfdata } = Digit.Hooks.useWorkflowDetails({
    tenantId: application?.[0]?.tenantId,
    id: id,
    moduleCode: businessservice,
  });

  let workflowDocs = [];
  if (wfdata) {
    wfdata?.timeline?.map((ob) => {
      if (ob?.wfDocuments?.length > 0) workflowDocs.push(ob?.wfDocuments?.[0])
    })
  }

  if (isLoading || iswfLoading) {
    return <Loader />;
  }

  if (application?.applicationDetails?.length === 0) {
    history.goBack();
  }

  const generateRows = (rows = []) => rows.map((row, index) => row.subTitle ? <Card style={{ position: "relative" }}><div className="employee-data-table" key={index} style={{ fontSize: 14 }} color="primary">{t(row.title || '')}</div> </Card > : <Row key={index}
    className="employee-data-table"
    label={t(row.title || '')}
    text={row.value}
    textStyle={{ whiteSpace: "pre", border: "none" }}
  />)

  const childInfo = [
    { title: "TL_COMMON_TABLE_COL_APP_NO", value: getFormattedValue(data, 'applicationNumber', false) },
    { title: "CR_DATE_OF_BIRTH_TIME", value: data?.childDOB ? convertEpochToDate(data?.childDOB) : NA },
    { title: "CR_TIME_OF_BIRTH", value: getFormattedValue(data, 'birthDateTime', false) },
    { title: "CR_GENDER", value: data?.gender },
    { title: "CS_COMMON_CHILD_AADHAAR", value: data?.childAadharNo ? data?.childAadharNo : NA },
    { title: "PDF_BIRTH_CHILD_NAME", value: data?.childFirstNameEn + " " + data?.childMiddleNameEn + " " + data?.childLastNameEn },
    { title: "PDF_BIRTH_CHILD_NAME", value: data?.childFirstNameMl + " " + data?.childMiddleNameMl + " " + data?.childLastNameMl }
  ];

  const birthPlaceHospDetails = [
    { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: data?.birthPlace ? data?.birthPlace : NA },
    { title: "CR_HOSPITAL_EN", value: data?.hospitalName || NA },
    { title: "CR_HOSPITAL_ML", value: data?.hospitalNameMl || NA },
  ];

  const birthPlaceInstitutionDetails = [
    { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: data?.birthPlace ? data?.birthPlace : NA },
    { title: "CR_INSTITUTION_TYPE", value: data?.institutionTypeEn + " / " + data?.institutionTypeMl || NA },
    { title: "CR_INSTITUTION_NAME_EN", value: data?.institutionId ? data?.institutionId : NA },
    { title: "CR_INSTITUTION_NAME_ML", value: data?.institutionIdMl ? data?.institutionIdMl : NA },
  ];

  const birthPlaceHomeDetails = [
    { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: data?.birthPlace ? data?.birthPlace : NA },
    { title: "CS_COMMON_WARD", value: data?.wardNameEn + " / " + data?.wardNameMl || NA },
    { title: "CS_COMMON_POST_OFFICE", value: data?.adrsPostOffice || NA },
    { title: "CS_COMMON_PIN_CODE", value: data?.adrsPincode || NA },
    { title: "CR_LOCALITY_EN", value: data?.adrsLocalityNameEn || NA },
    { title: "CR_LOCALITY_ML", value: data?.adrsLocalityNameMl || NA },
    { title: "CR_STREET_NAME_EN", value: data?.adrsStreetNameEn || NA },
    { title: "CR_STREET_NAME_ML", value: data?.adrsStreetNameMl || NA },
    { title: "CR_HOUSE_NAME_EN", value: data?.adrsHouseNameEn || NA },
    { title: "CR_HOUSE_NAME_ML", value: data?.adrsHouseNameMl || NA },
  ];
  const birthPlaceVehicleDetails = [
    { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: data?.birthPlace ? data?.birthPlace : NA },
    { title: "CR_VEHICLE_TYPE", value: data?.hospitalName || NA },
    { title: "CR_VEHICLE_REGISTRATION_NO", value: data?.vehicleRegistrationNo || NA },
    { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: data?.vehicleHaltPlace || NA },
    { title: "CR_VEHICLE_FROM_EN", value: data?.vehicleFromEn || NA },
    { title: "CR_VEHICLE_TO_EN", value: data?.vehicleToEn || NA },
    { title: "CR_VEHICLE_FROM_ML", value: data?.vehicleFromMl || NA },
    { title: "CR_VEHICLE_TO_ML", value: data?.vehicleToMl || NA },
    { title: "CR_ADMITTED_HOSPITAL_EN", value: data?.hospitalName || NA },
    { title: "CS_COMMON_WARD", value: data?.wardNameEn + " / " + data?.wardNameMl || NA },
  ];

  const birthPlacePublicPlacesDetails = [
    { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: data?.birthPlace ? data?.birthPlace : NA },
    { title: "CR_PUBLIC_PLACE_TYPE", value: data?.publicPlaceTypeEn + " / " + data?.publicPlaceTypeMl || NA },
    { title: "CS_COMMON_WARD", value: data?.wardNameEn + " / " + data?.wardNameMl || NA },
    { title: "CR_LOCALITY_EN", value: data?.localityNameEn || NA },
    { title: "CR_LOCALITY_ML", value: data?.localityNameMl || NA },
    { title: "CR_STREET_NAME_EN", value: data?.streetNameEn || NA },
    { title: "CR_STREET_NAME_ML", value: data?.streetNameMl || NA },
    { title: "CR_DESCRIPTION", value: data?.publicPlaceDecpEn || NA },
  ];


  const getBirthPlaceDetails = (place) => {
    switch (place) {
      case "HOSPITAL":
        return generateRows(birthPlaceHospDetails);
      case "INSTITUTION":
        return generateRows(birthPlaceInstitutionDetails);
      case "HOME":
        return generateRows(birthPlaceHomeDetails);
      case "VEHICLE":
        return generateRows(birthPlaceVehicleDetails);
      case "PUBLIC_PLACES":
        return generateRows(birthPlacePublicPlacesDetails);
      default:
        generateRows(birthPlaceHospDetails);
    }
  }

  const parentInfo = [
    { title: "CS_COMMON_AADHAAR", value: data?.ParentsDetails?.motherAadhar || NA },
    { title: "CR_MOTHER_NAME_EN", value: data?.ParentsDetails.motherFirstNameEn || NA },
    { title: "CR_MOTHER_NAME_ML", value: data?.ParentsDetails.motherFirstNameMl || NA },
    { title: "CR_NATIONALITY", value: data?.ParentsDetails?.motherNationalityEn + " / " + (data?.ParentsDetails?.motherNationalityMl != null ? data?.ParentsDetails?.motherNationalityMl : "") || NA },
    { title: "CR_MOTHER_MARITAL_STATUS", value: data?.ParentsDetails?.motherMaritalStatus || NA },
    { title: "CR_MOTHER_AGE_MARRIAGE", value: data?.ParentsDetails?.motherMarriageAge || NA },
    { title: "CR_MOTHER_AGE_BIRTH", value: data?.ParentsDetails?.motherMarriageBirth || NA },
    { title: "CR_ORDER_CURRENT_DELIVERY", value: data?.ParentsDetails?.orderofChildren || NA },
    { title: "CR_EDUCATION", value: data?.ParentsDetails?.motherEducationEn + " / " + data?.ParentsDetails?.motherEducationMl || NA },
    { title: "CR_PROFESSIONAL", value: data?.ParentsDetails?.motherProfessionEn + " / " + data?.ParentsDetails?.motherProfessionMl || NA },
    { title: "CS_COMMON_AADHAAR", value: data?.ParentsDetails?.fatherAadhar || NA },
    { title: "CR_FATHER_NAME_EN", value: data?.ParentsDetails.fatherFirstNameEn || NA },
    { title: "CR_FATHER_NAME_ML", value: data?.ParentsDetails.fatherFirstNameMl || NA },
    { title: "CR_NATIONALITY", value: data?.ParentsDetails?.fatherNationalityEn + " / " + (data?.ParentsDetails?.motherNationalityMl != null ? data?.ParentsDetails?.fatherNationalityMl : "") || NA },
    { title: "CR_EDUCATION", value: data?.ParentsDetails?.fatherEducationEn + " / " + data?.ParentsDetails?.fatherEducationMl || NA },
    { title: "CR_PROFESSIONAL", value: data?.ParentsDetails?.fatherProfessionEn + " / " + data?.ParentsDetails?.fatherProfessionMl || NA },
    { title: "CS_COMMON_RELIGION", value: data?.ParentsDetails?.ReligionEn + " / " + data?.ParentsDetails?.ReligionMl || NA },
    { title: "CR_PARENTS_CONTACT_NO", value: data?.ParentsDetails?.fatherMobile || NA },
    { title: "CR_PARENTS_EMAIL", value: data?.ParentsDetails?.fatherEmail || NA },
  ];

  const AddressBirthDetailsPresentInfo = [
    { subTitle: true, title: "CR_PRESENT_ADDRESS", value: "CR_PRESENT_ADDRESS" },
    { title: "CS_COMMON_COUNTRY", value: data?.AddressBirthDetails.countryIdPresentEn + " / " + (data?.AddressBirthDetails?.countryIdPresentMl != null ? data?.AddressBirthDetails?.countryIdPresentMl : "") || NA },
    { title: "CS_COMMON_STATE", value: data?.AddressBirthDetails.stateIdPresentEn + " / " + data?.AddressBirthDetails.stateIdPresentMl || NA },
    { title: "CS_COMMON_DISTRICT", value: data?.AddressBirthDetails?.districtIdPresentEn + " / " + data?.AddressBirthDetails.districtIdPresentMl || NA },
    { title: "CS_COMMON_TALUK", value: data?.AddressBirthDetails?.presentInsideKeralaTalukEn + " / " + data?.AddressBirthDetails.presentInsideKeralaTalukMl || NA },
    { title: "CS_COMMON_VILLAGE", value: data?.AddressBirthDetails?.presentInsideKeralaVillageEn + " / " + data?.AddressBirthDetails.presentInsideKeralaVillageMl || NA },
    { title: "CS_COMMON_LB_NAME", value: data?.AddressBirthDetails?.presentInsideKeralaLBNameEn + " / " + data?.AddressBirthDetails?.presentInsideKeralaLBNameMl || NA },
    { title: "CS_COMMON_WARD", value: data?.AddressBirthDetails?.presentWardNoEn + " / " + data?.AddressBirthDetails?.presentInsideKeralaLBNameMl || NA },
    { title: "CS_COMMON_POST_OFFICE", value: data?.AddressBirthDetails?.presentInsideKeralaPostOfficeEn + " / " + data?.AddressBirthDetails?.presentWardNoMl || NA },
    { title: "CS_COMMON_PIN_CODE", value: data?.AddressBirthDetails.presentInsideKeralaPincode || NA },
    { title: "CR_LOCALITY_EN", value: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || NA },
    { title: "CR_LOCALITY_ML", value: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl || NA },
    { title: "CR_STREET_NAME_EN", value: data?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || NA },
    { title: "CR_STREET_NAME_ML", value: data?.AddressBirthDetails?.presentInsideKeralaStreetNameMl || NA },
    { title: "CR_HOUSE_NAME_EN", value: data?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || NA },
    { title: "CR_HOUSE_NAME_ML", value: data?.AddressBirthDetails?.presentInsideKeralaHouseNameMl || NA },
    //Permanent Address
    { subTitle: true, title: "CR_PERMANENT_ADDRESS", value: "CR_PERMANENT_ADDRESS" },
    { title: "CS_COMMON_COUNTRY", value: data?.AddressBirthDetails.countryIdPermanentEn + " / " + (data?.AddressBirthDetails?.countryIdPermanentMl != null ? data?.AddressBirthDetails?.countryIdPermanentMl : "") || NA },
    { title: "CS_COMMON_STATE", value: data?.AddressBirthDetails.stateIdPermanentEn + " / " + data?.AddressBirthDetails.stateIdPermanentMl || NA },
    { title: "CS_COMMON_DISTRICT", value: data?.AddressBirthDetails?.districtIdPermanentEn + " / " + data?.AddressBirthDetails.districtIdPermanentMl || NA },
    { title: "CS_COMMON_TALUK", value: data?.AddressBirthDetails?.permntInKeralaAdrTalukEn + " / " + data?.AddressBirthDetails.permntInKeralaAdrTalukMl || NA },
    { title: "CS_COMMON_VILLAGE", value: data?.AddressBirthDetails?.permntInKeralaAdrVillageEn + " / " + data?.AddressBirthDetails.permntInKeralaAdrVillageMl || NA },
    { title: "CS_COMMON_LB_NAME", value: data?.AddressBirthDetails?.permntInKeralaAdrLBNameEn + " / " + data?.AddressBirthDetails?.permntInKeralaAdrLBNameMl || NA },
    { title: "CS_COMMON_WARD", value: data?.AddressBirthDetails?.permntInKeralaWardNoEn + " / " + data?.AddressBirthDetails?.permntInKeralaWardNoMl || NA },
    { title: "CS_COMMON_POST_OFFICE", value: data?.AddressBirthDetails?.permntInKeralaAdrPostOfficeEn + " / " + data?.AddressBirthDetails?.permntInKeralaAdrPostOfficeMl || NA },
    { title: "CS_COMMON_PIN_CODE", value: data?.AddressBirthDetails.permntInKeralaAdrPincode || NA },
    { title: "CR_LOCALITY_EN", value: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn || NA },
    { title: "CR_LOCALITY_ML", value: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl || NA },
    { title: "CR_STREET_NAME_EN", value: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn || NA },
    { title: "CR_STREET_NAME_ML", value: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl || NA },
    { title: "CR_HOUSE_NAME_EN", value: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn || NA },
    { title: "CR_HOUSE_NAME_ML", value: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl || NA },
  ]
  const AddressBirthDetailsPresentOutsideKeralaInfo = {
    title: "CR_ADDRESS_DETAILS",
    values: [
      { title: "CS_COMMON_COUNTRY", value: data?.AddressBirthDetails.presentaddressCountry || NA },
      { title: "CS_COMMON_STATE", value: data?.AddressBirthDetails?.presentaddressStateName || NA },
      { title: "CS_COMMON_DISTRICT", value: data?.AddressBirthDetails?.presentOutsideKeralaDistrict || NA },
      { title: "CR_TALUK_TEHSIL", value: data?.AddressBirthDetails?.presentOutsideKeralaTaluk || NA },
      { title: "CR_TOWN_VILLAGE_EN", value: data?.AddressBirthDetails?.presentOutsideKeralaVillage || NA },
      { title: "CR_CITY_VILLAGE_NAME_EN", value: data?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn || NA },
      { title: "CS_COMMON_POST_OFFICE", value: data?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn || NA },
      { title: "CS_COMMON_PIN_CODE", value: data?.AddressBirthDetails?.presentOutsideKeralaPincode || NA },
      { title: "CR_LOCALITY_EN", value: data?.AddressBirthDetails.presentOutsideKeralaLocalityNameEn || NA },
      { title: "CR_LOCALITY_ML", value: data?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl || NA },
      { title: "CR_STREET_NAME_EN", value: data?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn || NA },
      { title: "CR_STREET_NAME_ML", value: data?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl || NA },
      { title: "CR_HOUSE_NAME_EN", value: data?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn || NA },
      { title: "CR_HOUSE_NAME_ML", value: data?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl || NA },

      { title: "CS_COMMON_COUNTRY", value: data?.AddressBirthDetails.presentaddressCountry || NA },
      { title: "CS_COMMON_STATE", value: data?.AddressBirthDetails?.presentaddressStateName || NA },
      { title: "CS_COMMON_DISTRICT", value: data?.AddressBirthDetails?.permntOutsideKeralaDistrict || NA },
      { title: "CR_TALUK_TEHSIL", value: data?.AddressBirthDetails?.permntOutsideKeralaTaluk || NA },
      { title: "CR_TOWN_VILLAGE_EN", value: data?.AddressBirthDetails?.permntOutsideKeralaVillage || NA },
      { title: "CR_CITY_VILLAGE_NAME_EN", value: data?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn || NA },
      { title: "CS_COMMON_POST_OFFICE", value: data?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn || NA },
      { title: "CS_COMMON_PIN_CODE", value: data?.AddressBirthDetails?.permntOutsideKeralaPincode || NA },
      { title: "CR_LOCALITY_EN", value: data?.AddressBirthDetails.permntOutsideKeralaLocalityNameEn || NA },
      { title: "CR_LOCALITY_ML", value: data?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl || NA },
      { title: "CR_STREET_NAME_EN", value: data?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn || NA },
      { title: "CR_STREET_NAME_ML", value: data?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl || NA },
      { title: "CR_HOUSE_NAME_EN", value: data?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn || NA },
      { title: "CR_HOUSE_NAME_ML", value: data?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl || NA },
    ]
  }
  // } else if (data?.AddressBirthDetails?.presentaddressCountry?.code != "COUNTRY_INDIA") {

  const AddressBirthDetailsPresentOutsideIndiaInfo = {
    title: "CR_ADDRESS_DETAILS",
    values: [
      { title: "CS_COMMON_COUNTRY", value: data?.AddressBirthDetails.presentaddressCountry || NA },
      { title: "CR_STATE_REGION_PROVINCE_EN", value: data?.AddressBirthDetails?.presentOutSideIndiaProvinceEn || NA },
      { title: "CR_STATE_REGION_PROVINCE_ML", value: data?.AddressBirthDetails?.presentOutSideIndiaProvinceMl || NA },
      { title: "CR_TOWN_VILLAGE_EN", value: data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage || NA },
      { title: "CR_CITY_TOWN_EN", value: data?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown || NA },
      { title: "CR_ZIP_CODE", value: data?.AddressBirthDetails?.presentOutSideIndiaPostCode || NA },
      { title: "CR_ADDRES_LINE_ONE_EN", value: data?.AddressBirthDetails.presentOutSideIndiaAdressEn || NA },
      { title: "CR_ADDRES_LINE_ONE_ML", value: data?.AddressBirthDetails?.presentOutSideIndiaAdressMl || NA },
      { title: "CR_ADDRES_LINE_TWO_EN", value: data?.AddressBirthDetails?.presentOutSideIndiaAdressEnB || NA },
      { title: "CR_ADDRES_LINE_TWO_ML", value: data?.AddressBirthDetails?.presentOutSideIndiaAdressMlB || NA },

      { title: "CS_COMMON_COUNTRY", value: data?.AddressBirthDetails.presentaddressCountry || NA },
      { title: "CR_STATE_REGION_PROVINCE_EN", value: data?.AddressBirthDetails?.permntOutsideIndiaprovinceEn || NA },
      { title: "CR_STATE_REGION_PROVINCE_ML", value: data?.AddressBirthDetails?.permntOutsideIndiaprovinceMl || NA },
      { title: "CR_TOWN_VILLAGE_EN", value: data?.AddressBirthDetails?.permntOutsideIndiaVillage || NA },
      { title: "CR_CITY_TOWN_EN", value: data?.AddressBirthDetails?.permntOutsideIndiaCityTown || NA },
      { title: "CR_ZIP_CODE", value: data?.AddressBirthDetails?.permanentOutsideIndiaPostCode || NA },
      { title: "CR_ADDRES_LINE_ONE_EN", value: data?.AddressBirthDetails.permntOutsideIndiaLineoneEn || NA },
      { title: "CR_ADDRES_LINE_ONE_ML", value: data?.AddressBirthDetails?.permntOutsideIndiaLineoneMl || NA },
      { title: "CR_ADDRES_LINE_TWO_EN", value: data?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn || NA },
      { title: "CR_ADDRES_LINE_TWO_ML", value: data?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl || NA },
    ]
  }

  let addressBirthDetails = [];
  if (data?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && data?.AddressBirthDetails?.presentaddressStateName === "kl") {
    addressBirthDetails = AddressBirthDetailsPresentInfo;
  } else if (data?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && data?.AddressBirthDetails?.presentaddressStateName != "kl") {
    addressBirthDetails = AddressBirthDetailsPresentOutsideKeralaInfo;
  } else if (data?.AddressBirthDetails?.presentaddressCountry != "COUNTRY_INDIA") {
    addressBirthDetails = AddressBirthDetailsPresentOutsideIndiaInfo;
  }

  const statisticalInfo = [
    { title: "CR_NATURE_OF_MEDICAL_ATTENTION", value: data?.medicalAttensionSubEn + " / " + data?.medicalAttensionSubMl || NA },
    { title: "CR_PREGNANCY_DURATION", value: data?.pregnancyDuration || NA },
    { title: "CR_DELIVERY_METHOD", value: data?.deliveryMethodsEn + " / " + data?.deliveryMethodsMl || NA },
    { title: "CR_BIRTH_WEIGHT", value: data?.birthWeight || NA },
  ];
  console.log({ data })
  const timelineData = {
    ChildDetails: {
      businessservice: _.get(data, 'businessservice', ''),
      channel: _.get(data, 'channel', ''),
      auditDetails: _.get(data, 'auditDetails', {}),
    },
    tenantId: _.get(data, 'tenantid', '')
  }

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      <Accordion
        expanded={true}
        title={t("CR_BIRTH_CHILD_DETAILS")}
        content={
          <div className="employee-data-table">
            {generateRows(childInfo)}
          </div>
        } />
      <Accordion
        title={t("CR_BIRTH_PLACE_DETAILS")}
        content={
          <div className="employee-data-table">
            {getBirthPlaceDetails(data.birthPlace)}
          </div>
        } />
      <Accordion
        title={t("CR_BIRTH_PARENT_INFORMATION_HEADER")}
        content={
          <div className="employee-data-table">
            {generateRows(parentInfo)}
          </div>
        } />
      <Accordion
        title={t("CR_ADDRESS_DETAILS")}
        content={
          <div className="employee-data-table">
            {generateRows(addressBirthDetails)}
          </div>
        } />
      <Accordion
        title={t("CR_STATSTICAL_INFORMATION_HEADER")}
        content={
          <div className="employee-data-table">
            {generateRows(statisticalInfo)}
          </div>
        } />

      <Card style={{ position: "relative" }}>
        <div className="employee-data-table">
          {workflowDocs?.length > 0 && <div>
            <CardSubHeader>{t("TL_TIMELINE_DOCS")}</CardSubHeader>
            <div>
              {workflowDocs?.length > 0 ? (
                <CRDocument value={{ "workflowDocs": workflowDocs }}></CRDocument>
              ) : (
                <StatusTable>
                  <Row text={t("TL_NO_DOCUMENTS_MSG")} />
                </StatusTable>
              )}
            </div>
          </div>}
          <CRWFApplicationTimeline application={timelineData} id={id} />
        </div>
      </Card>
    </React.Fragment>
  );
};

export default CRCitizenApplicationDetails;
