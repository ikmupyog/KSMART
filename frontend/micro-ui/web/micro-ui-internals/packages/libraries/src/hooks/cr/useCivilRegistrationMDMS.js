import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const useCivilRegistrationMDMS = (tenantId, moduleCode, type, filter, config = {}) => {
  const useCRQualificationSub = () => {
    return useQuery("CR_QUALIFICATION_SUB", () => MdmsService.getCRQualificationSub(tenantId, moduleCode), config);
  };
  const useCRModeOfPregnancy = () => {
    return useQuery("CR_MODE_PREGNANCY", () => MdmsService.getCRModeOfPregnancy(tenantId, moduleCode), config);
  };
  const useCRPlaceMaster = () => {
    return useQuery("CR_PLACEMASTER", () => MdmsService.getCRPlaceMaster(tenantId, moduleCode), config);
  };
  const useCRHospital = () => {
    return useQuery("CR_HOSPITALMASTER", () => MdmsService.getCRHospitalMaster(tenantId, moduleCode), config);
  };
  const usePLaceOfDeath = () => {
    return useQuery("CR_PLACE_DEATH", () => MdmsService.getCRPlaceOfDeath(tenantId, moduleCode, type), config);
  };
  const useCRGender = () => {
    return useQuery("CR_Gender", () => MdmsService.getCRGender(tenantId, moduleCode, type), config);
  };
  const useCRNationality = () => {
    return useQuery("CR_Nationality", () => MdmsService.getCRNationlity(tenantId, moduleCode, type), config);
  };
  const useCRTaluk = () => {
    return useQuery("CR_TALUK", () => MdmsService.getCRTaluk(tenantId, moduleCode, type), config);
  };
  const useCRTitle = () => {
    return useQuery("CR_TITLE", () => MdmsService.getCRTitle(tenantId, moduleCode, type), config);
  };
  const useCRWard = () => {
    return useQuery("CR_WARD", () => MdmsService.getCRWard(tenantId, moduleCode, type), config);
  };
  const useCRReligion = () => {
    return useQuery("CR_RELIGION", () => MdmsService.getCRReligion(tenantId, moduleCode), config);
  };
  const useCRcauseOfDeathMain = () => {
    return useQuery("CR_RELIGION", () => MdmsService.getCRcauseOfDeathMain(tenantId, moduleCode), config);
  };
  //////institution-type
  const useCRInstitution = () => {
    return useQuery("CR_INSTITUTION", () => MdmsService.getCRInstitution(tenantId, moduleCode), config);
  };
  /////institution-id
  const useCRInstitutionId = () => {
    return useQuery("CR_INSTITUTION_ID", () => MdmsService.getCRInstitutionId(tenantId, moduleCode), config);
  };
  const useCROtherPlace = () => {
    return useQuery("CR_OTHER_PLACE", () => MdmsService.getCROtherPlace(tenantId, moduleCode), config);
  };
  const useCRVillage = () => {
    return useQuery("CR_VILLAGE", () => MdmsService.getCRVillage(tenantId, moduleCode, type), config);
  };
  const useCRDistrict = () => {
    return useQuery("CR_DISTRICT", () => MdmsService.getCRDistrict(tenantId, moduleCode, type), config);
  };
  const useCRPostOffice = () => {
    return useQuery("CR_POST_OFFICE", () => MdmsService.getCRPostOffice(tenantId, moduleCode, type), config);
  };
  const useCRState = () => {
    return useQuery("CR_STATE", () => MdmsService.getCRState(tenantId, moduleCode, type), config);
  };
  const useCROccupation = () => {
    return useQuery("CR_OCCUPATION", () => MdmsService.getCROccupation(tenantId, moduleCode, type), config);
  };
  const useCRLBType = () => {
    return useQuery("CR_LBTYPE", () => MdmsService.getCRLBType(tenantId, moduleCode, type), config);
  };
  const useCRQualification = () => {
    return useQuery("CR_QUALIFICATION", () => MdmsService.getCRQualification(tenantId, moduleCode, type), config);
  };
  const useCRProfession = () => {
    return useQuery("CR_PROFESSION", () => MdmsService.getCRProfession(tenantId, moduleCode, type), config);
  };
  const useCRCountry = () => {
    return useQuery("CR_COUNTRY", () => MdmsService.getCRCountry(tenantId, moduleCode, type), config);
  };
  const useCRNatureofMedicalAttention = () => {
    return useQuery("CR_NATURE_OF_MEDICAL_ATTENTION", () => MdmsService.getCRNatureofMedicalAttention(tenantId, moduleCode, type), config);
  };
  const useCRNatureofMedicalAttentionSub = () => {
    return useQuery("CR_NATURE_OF_MEDICAL_ATTENTION_SUB", () => MdmsService.getCRNatureofMedicalAttentionSub(tenantId, moduleCode, type), config);
  };
  const useCRNatureofMedicalAttentionSubA = () => {
    return useQuery("CR_NATURE_OF_MEDICAL_ATTENTION_SUB", () => MdmsService.getCRNatureofMedicalAttentionSubA(tenantId, moduleCode, type), config);
  };
  const useCRDeliveryMethod = () => {
    return useQuery("CR_DELIVERY_METHOD", () => MdmsService.getCRDeliveryMethod(tenantId, moduleCode, type), config);
  };
  const useCRAgeUnit = () => {
    return useQuery("CR_Age_unit", () => MdmsService.getCRAgeUnit(tenantId, moduleCode, type), config);
  };
  const useDocumentTypeB = () =>{
    return useQuery("CR_Document_Type", () => MdmsService.getCRDocumentTypeB(tenantId, moduleCode, type), config);
  };
  ////////////////////////////////////////////////////////////////////death
  const useTLDocuments = () => {
    return useQuery("TL_DOCUMENTS", () => MdmsService.getTLDocumentRequiredScreen(tenantId, moduleCode, type), config);
  };
  const useStructureType = () => {
    return useQuery("TL_STRUCTURE_TYPE", () => MdmsService.getTLStructureType(tenantId, moduleCode, type), config);
  };
  const useStructureTypePlace = () => {
    return useQuery("TL_STRUCTURE_TYPE_PLACE", () => MdmsService.getTLStructureTypePlace(tenantId, moduleCode, type), config);
  };
  const useNatureOfStructure = () => {
    return useQuery("TL_STRUCTURE_TYPE_NATURE", () => MdmsService.getTLNatureOfStructure(tenantId, moduleCode, type), config);
  };
  const useZonalOffice = () => {
    return useQuery("TL_ZONAL_OFFICE", () => MdmsService.getTLZonalOffice(tenantId, moduleCode, type), config);
  };
  const useTradeUnitsData = () => {
    return useQuery("TL_TRADE_UNITS", () => MdmsService.getTradeUnitsData(tenantId, moduleCode, type, filter), config);
  };
  const useSector = () => {
    return useQuery("TL_STRUCTURE_TYPE_SECTOR", () => MdmsService.getTLSector(tenantId, moduleCode, type), config);
  };
  const useTradeOwnerShipCategory = () => {
    return useQuery("TL_TRADE_OWNERSHIP_CATEGORY", () => MdmsService.GetTradeOwnerShipCategory(tenantId, moduleCode, type), config);
  };
  const useTradeOwnershipSubType = () => {
    return useQuery("TL_TRADE_OWNERSHIP_CATEGORY", () => MdmsService.GetTradeOwnerShipCategory(tenantId, moduleCode, type), {
      select: (data) => {
        const { "common-masters": { OwnerShipCategory: categoryData } = {} } = data;
        const filteredSubtypesData = categoryData
          .filter((e) => e.code.includes(filter.keyToSearchOwnershipSubtype))
          .map((e) => ({ ...e, i18nKey: `COMMON_MASTERS_OWNERSHIPCATEGORY_${e.code.replaceAll(".", "_")}` }));
        return filteredSubtypesData;
      },
      ...config,
    });
  };

  const useOwnerTypeWithSubtypes = () => {
    return useQuery("TL_TRADE_OWNERSSHIP_TYPE", () => MdmsService.GetTradeOwnerShipCategory(tenantId, moduleCode, type), {
      select: (data) => {
        const { "common-masters": { OwnerShipCategory: categoryData } = {} } = data;
        let OwnerShipCategory = {};
        let ownerShipdropDown = [];

        function getDropdwonForProperty(ownerShipdropDown) {
          if (filter?.userType === "employee") {
            const arr = ownerShipdropDown
              ?.filter((e) => e.code.split(".").length <= 2)
              ?.map((ownerShipDetails) => ({
                ...ownerShipDetails,
                i18nKey: `COMMON_MASTERS_OWNERSHIPCATEGORY_INDIVIDUAL_${ownerShipDetails.value.split(".")[1] ? ownerShipDetails.value.split(".")[1] : ownerShipDetails.value.split(".")[0]
                  }`,
              }));
            const finalArr = arr.filter((data) => data.code.includes("INDIVIDUAL") || data.code.includes("OTHER"));

            return finalArr;
          }

          const res = ownerShipdropDown?.length
            ? ownerShipdropDown
              ?.map((ownerShipDetails) => ({
                ...ownerShipDetails,
                i18nKey: `PT_OWNERSHIP_${ownerShipDetails.value.split(".")[1] ? ownerShipDetails.value.split(".")[1] : ownerShipDetails.value.split(".")[0]
                  }`,
              }))
              .reduce((acc, ownerShipDetails) => {
                if (ownerShipDetails.code.includes("INDIVIDUAL")) {
                  return [...acc, ownerShipDetails];
                } else if (ownerShipDetails.code.includes("OTHER")) {
                  const { code, value, ...everythingElse } = ownerShipDetails;
                  const mutatedOwnershipDetails = { code: code.split(".")[0], value: value.split(".")[0], ...everythingElse };
                  return [...acc, mutatedOwnershipDetails];
                } else {
                  return acc;
                }
              }, [])
            : null;

          return res;
        }

        function formDropdown(category) {
          const { name, code } = category;
          return {
            label: name,
            value: code,
            code: code,
          };
        }

        categoryData.length > 0
          ? categoryData?.map((category) => {
            OwnerShipCategory[category.code] = category;
          })
          : null;

        if (OwnerShipCategory) {
          Object.keys(OwnerShipCategory).forEach((category) => {
            // const categoryCode = OwnerShipCategory[category].code;
            ownerShipdropDown.push(formDropdown(OwnerShipCategory[category]));
          });
        }

        return getDropdwonForProperty(ownerShipdropDown);
      },
      ...config,
    });
  };
  const useTLAccessoriesType = () => {
    return useQuery("TL_TRADE_ACCESSORY_CATEGORY", () => MdmsService.getTLAccessoriesType(tenantId, moduleCode, type), config);
  };
  const useTLFinancialYear = () => {
    return useQuery("TL_TRADE_FINANCIAL_YEAR", () => MdmsService.getTLFinancialYear(tenantId, moduleCode, type), config);
  };
  const _default = () => {
    return useQuery([tenantId, moduleCode, type], () => MdmsService.getMultipleTypes(tenantId, moduleCode, type), config);
  };

  switch (type) {
    case "QualificationSub":
      return useCRQualificationSub();
    case "ModeOfPregnancy":
      return useCRModeOfPregnancy();
    case "PlaceMaster":
      return useCRPlaceMaster();
    case "hospitalList":
      return useCRHospital();
    case "PlaceMaster":
      return usePLaceOfDeath();
    case "GenderType":
      return useCRGender();
    case "Country":
      return useCRNationality();
    case "Taluk":
      return useCRTaluk();
    case "Title":
      return useCRTitle();
    case "DocumentType":
      return useDocumentTypeB();
    case "Religion":
      return useCRReligion();
    case "DeathCause":
      return useCRcauseOfDeathMain();
    case "Village":
      return useCRVillage();
    case "District":
      return useCRDistrict();
    case "PostOffice":
      return useCRPostOffice();
    case "State":
      return useCRState();
    case "LBType":
      return useCRLBType();
    case "Country":
      return useCRCountry();
    case "Occupation":
      return useCROccupation();
    case "Qualification":
      return useCRQualification();
    case "Profession":
      return useCRProfession();
    case "AttentionOfDelivery":
      return useCRNatureofMedicalAttention();
    case "MedicalAttentionType":
      return useCRNatureofMedicalAttentionSub();
    case "DeathCauseSub":
      return useCRNatureofMedicalAttentionSubA();
    case "DeliveryMethod":
      return useCRDeliveryMethod();
    case "Title":
      return useCRWard();
    case "AgeUnit":
      return  useCRAgeUnit();
    case "Religion":
      return useCRReligion();
    case "InstitutionType":
      return useCRInstitution();
    case "Institution":
      return useCRInstitutionId();
    case "OtherBithPlace":
      return useCROtherPlace();
    case "TLDocuments":
      return useTLDocuments();
    case "StructureType":
      return useStructureType();
    case "TradeStructureSubtype":
      return useStructureTypePlace();
    case "PlaceOfActivity":
      return useNatureOfStructure();
    case "boundary-data":
      return useZonalOffice();
    case "TradeUnits":
      return useTradeUnitsData();
    case "EnterpriseType":
      return useSector();
    case "TLOwnerShipCategory":
      return useTradeOwnerShipCategory();
    case "TLOwnerTypeWithSubtypes":
      return useOwnerTypeWithSubtypes();
    case "AccessoryCategory":
      return useTLAccessoriesType();
    case "FinancialYear":
      return useTLFinancialYear();
    case "TradeOwnershipSubType":
      return useTradeOwnershipSubType();
    default:
      return _default();
  }
};

export default useCivilRegistrationMDMS;
