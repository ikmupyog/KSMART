package org.ksmart.marriage.marriageregistry.enrichment;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.common.repository.IdGenRepository;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
// import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetail;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertPDFRequest;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertRequest;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertificate;
import org.ksmart.marriage.utils.IDGenerator;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;

import static org.ksmart.marriage.utils.MarriageConstants.COUNTRY_CODE;

/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Component
@Slf4j
public class MarriageRegistryEnrichment implements BaseEnrichment {
    @Autowired
    MarriageApplicationConfiguration config;
    @Autowired
    IdGenRepository idGenRepository;
    @Autowired
    IDGenerator idGenerator;
    @Autowired
    MarriageMdmsUtil util;

    public void enrichCreate(MarriageRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
    // try {
    //         ObjectMapper mapper = new ObjectMapper();
    //         Object obj = request;
    //         mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    //        System.out.println("JasmineRegistryCreation "+ mapper.writeValueAsString(obj));
    // }catch(Exception e) {
    //     log.error("Exception while fetching from searcher: ",e);
    // }
        request.getMarriageDetails().forEach(marriage -> {

            marriage.setId(UUID.randomUUID().toString());
            marriage.setAuditDetails(auditDetails);
            if(marriage.getBrideDetails()!=null){
                marriage.getBrideDetails().setBrideId((UUID.randomUUID().toString()));
            }
            if(marriage.getGroomDetails()!=null){
                marriage.getGroomDetails().setGroomId((UUID.randomUUID().toString()));
            }
            if(marriage.getBrideDetails()!=null){
                marriage.getBrideDetails().setBrideId((UUID.randomUUID().toString()));
                 marriage.getBrideDetails().setBrideGroom("B");
            }
            if(marriage.getGroomDetails()!=null){
                marriage.getGroomDetails().setGroomId((UUID.randomUUID().toString()));
                 marriage.getGroomDetails().setBrideGroom("G");
            }
            if(marriage.getWitnessDetails()!=null){
                marriage.getWitnessDetails().setWitnessId1(UUID.randomUUID().toString());
                marriage.getWitnessDetails().setWitnessId2(UUID.randomUUID().toString());
                marriage.getWitnessDetails().setSerial_no1(1);
                marriage.getWitnessDetails().setSerial_no2(2);
                marriage.getWitnessDetails().setWitnessAuditDetails(auditDetails);
                    if(StringUtils.isNotBlank(marriage.getWitnessDetails().getBrideUrl())){
                        marriage.getWitnessDetails().setBrideUrl(marriage.getWitnessDetails().getBrideUrl().replaceAll(config.getImageURLStartPath(),""));
                    }
                    if(StringUtils.isNotBlank(marriage.getWitnessDetails().getGroomUrl())){
                        marriage.getWitnessDetails().setGroomUrl(marriage.getWitnessDetails().getGroomUrl().replaceAll(config.getImageURLStartPath(),""));
                    }
            }
            //Added on 09.05.2023 Jasmine
            if(marriage.getBrideAddressDetails()!=null){
                marriage.getBrideAddressDetails().setPresentUuid(UUID.randomUUID().toString());
                marriage.getBrideAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                marriage.getGroomAddressDetails().setBrideGroomPresent("B");
            }
            if(marriage.getGroomAddressDetails()!=null){
                marriage.getGroomAddressDetails().setPresentUuid(UUID.randomUUID().toString());
                marriage.getGroomAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                marriage.getGroomAddressDetails().setBrideGroomPresent("G");
            }

        });
        setRegistrationNumber(request);
        // setBridePermanentAddress(request);
        // setBridePresentAddress(request);
        // setGroomPermanentAddress(request);
        // setGroomPresentAddress(request);
        createCertificateNo(request);
    }

    private void setRegistrationNumber(MarriageRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        List<MarriageRegistryDetails> marriageDetails = request.getMarriageDetails();
        String tenantId = marriageDetails.get(0).getTenantid();

        List<String> filecodes = getIds(requestInfo,
                                tenantId,
                                config.getGetMarriageRegNumberName(),
                                request.getMarriageDetails().get(0).getModuleCode(),
                         "REG",
                marriageDetails.size());
        validateFileCodes(filecodes, marriageDetails.size());
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        ListIterator<String> itr = filecodes.listIterator();
        request.getMarriageDetails()
                .forEach(marriage -> {
                    //if((marriage.getStatus().equals("APPROVED"))&&(marriage.getAction().equals("APPROVE"))) {
                        marriage.setRegistrationno(itr.next());
                        marriage.setRegistrationDate(currentTime);
                  //  }
                });
    }

    //Jasmine 28.03.2023
//     private void setGroomPresentAddress(MarriageRegistryRequest request) {
    
//         request.getMarriageDetails()
//             .forEach(marriage ->{
//                 if (marriage.getGroomAddressDetails()!=null) {

//                     marriage.getGroomAddressDetails().setPresentUuid(UUID.randomUUID().toString());
//                     marriage.getGroomAddressDetails().setBrideGroomPresent("G");
//                 }

//                 if (marriage.getGroomAddressDetails() != null && marriage.getGroomAddressDetails().getIsPermanentAddress() != null)  {
//                     marriage.getGroomAddressDetails().setIsPermanentAddressInt(marriage.getGroomAddressDetails().getIsPermanentAddress() == true ? 1 : 0);
//                     if(marriage.getGroomAddressDetails().getIsPermanentAddress()) {
//                         marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getCountryIdPermanent());
//                         marriage.getGroomAddressDetails().setStateIdPresent(marriage.getGroomAddressDetails().getStateIdPermanent());
//                         if (marriage.getGroomAddressDetails().getCountryIdPermanent().equals(MarriageConstants.COUNTRY_CODE)) {
//                             marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPermtaddressCountry());
//                             if (marriage.getGroomAddressDetails().getStateIdPresent().equals(MarriageConstants.STATE_CODE_SMALL)) {
//                                 marriage.getGroomAddressDetails().setPresentaddressStateName(marriage.getGroomAddressDetails().getStateIdPresent());
//                             }
//                         }
//                     }

//                     if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null && marriage.getGroomAddressDetails().getPresentaddressStateName() != null) {
//                         if (marriage.getGroomAddressDetails().getPresentaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
//                             if (marriage.getGroomAddressDetails().getPresentaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {
//                                 if(!marriage.getGroomAddressDetails().getIsPermanentAddress()){
//                                     marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentaddressCountry());
//                                     marriage.getGroomAddressDetails().setStateIdPresent(marriage.getGroomAddressDetails().getPresentaddressStateName());
//                                 }

//                                 marriage.getGroomAddressDetails().setDistrictIdPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());

//                                 marriage.getGroomAddressDetails().setLocalityEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaLocalityNameEn());
//                                 marriage.getGroomAddressDetails().setLocalityMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaLocalityNameMl());

//                                 marriage.getGroomAddressDetails().setStreetNameEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaStreetNameEn());
//                                 marriage.getGroomAddressDetails().setStreetNameMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaStreetNameMl());

//                                 marriage.getGroomAddressDetails().setHouseNameNoEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaHouseNameEn());
//                                 marriage.getGroomAddressDetails().setHouseNameNoMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaHouseNameMl());

//                                 marriage.getGroomAddressDetails().setPinNoPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaPincode());
                               
//                                 // marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaCityVilgeEn());
//                                 // marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getpresentOutsideKeralaVillage());
                                
//                               //  marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaCityVilgeEn());
//                                 marriage.getGroomAddressDetails().setPoNoPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());


//                             }
//                             else {
//                                 if (!marriage.getGroomAddressDetails().getIsPermanentAddress()) {
//                                     marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentaddressCountry());
//                                     marriage.getGroomAddressDetails().setStateIdPresent(marriage.getGroomAddressDetails().getPresentaddressStateName());
//                                 }
//                                 marriage.getGroomAddressDetails().setDistrictIdPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());

//                                 marriage.getGroomAddressDetails().setLocalityEnPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaLocalityNameEn());
//                                 marriage.getGroomAddressDetails().setLocalityMlPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaLocalityNameMl());

//                                 marriage.getGroomAddressDetails().setStreetNameEnPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaStreetNameEn());
//                                 marriage.getGroomAddressDetails().setStreetNameMlPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaStreetNameMl());

//                                 marriage.getGroomAddressDetails().setHouseNameNoEnPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaHouseNameEn());
//                                 marriage.getGroomAddressDetails().setHouseNameNoMlPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaHouseNameMl());

//                                 marriage.getGroomAddressDetails().setPinNoPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaPincode());

//                                 marriage.getGroomAddressDetails().setPresentOthrTalukName(marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());
//                                 marriage.getGroomAddressDetails().setPresentOthPostOfficeEn(marriage.getGroomAddressDetails().getPresentOutsideKeralaPostOfficeEn());


//                                 marriage.getGroomAddressDetails().setVillageNamePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageName());
//                                 marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaCityVilgeEn());

//                             }
//                         }

//                         else {
//     //                            if (marriage.getGroomAddressDetails().getPresentOutSideCountry() != null) {
//                             marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentOutSideCountry());
//                             marriage.getGroomAddressDetails().setVillageNamePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsVillage());
//                             marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsCityTown());

//                             marriage.getGroomAddressDetails().setOutSideIndiaPostCodePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaPostCode());

//                             marriage.getGroomAddressDetails().setPresentOthrIndiaAdressEn(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressEn());
//                             marriage.getGroomAddressDetails().setPresentOthrIndiaAdressMl(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressMl());

//                             marriage.getGroomAddressDetails().setPresentOthrIndiaAdressEnB(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressEnB());
//                             marriage.getGroomAddressDetails().setPresentOthrIndiaAdressMlB(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressMlB());

//                             marriage.getGroomAddressDetails().setPresentOthrIndiaProvinceEn(marriage.getGroomAddressDetails().getPresentOutSideIndiaProvinceEn());
//                             marriage.getGroomAddressDetails().setPresentOthrIndiaProvinceMl(marriage.getGroomAddressDetails().getPresentOutSideIndiaProvinceMl());

// //                            }
//                         }
//                     }
//                 }
//             });
//     }

//     private void setGroomPermanentAddress(MarriageRegistryRequest request) {
//         request.getMarriageDetails()
//             .forEach(marriage-> {

//                 if (marriage.getGroomAddressDetails()!=null){
//                     if (marriage.getGroomAddressDetails()!=null) {

//                         marriage.getGroomAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
//                         //marriage.getGroomAddressDetails().setPresentUuid(UUID.randomUUID().toString());
//                         marriage.getGroomAddressDetails().setBrideGroomPermanent("G");
//                         //marriage.getGroomAddressDetails().setBrideGroomPresent("B");
//                     }

//                     if(marriage.getGroomAddressDetails().getPermtaddressCountry()!=null && marriage.getGroomAddressDetails().getPermtaddressStateName() != null){
//                         if (marriage.getGroomAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
//                             if (marriage.getGroomAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

//                                 marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());

//                                 marriage.getGroomAddressDetails().setStateIdPermanent(marriage.getGroomAddressDetails().getPermtaddressStateName());

//                                 marriage.getGroomAddressDetails().setDistrictIdPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());

//                                 marriage.getGroomAddressDetails().setLocalityEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn());
//                                 marriage.getGroomAddressDetails().setLocalityMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameMl());

//                                 marriage.getGroomAddressDetails().setStreetNameEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn());
//                                 marriage.getGroomAddressDetails().setStreetNameMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameMl());

//                                 marriage.getGroomAddressDetails().setHouseNameNoEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn());
//                                 marriage.getGroomAddressDetails().setHouseNameNoMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameMl());
//                                 marriage.getGroomAddressDetails().setPinNoPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrPincode());
//                                 marriage.getGroomAddressDetails().setPoNoPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
//                             } else {
//                                 marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());

//                                 marriage.getGroomAddressDetails().setStateIdPermanent(marriage.getGroomAddressDetails().getPermtaddressStateName());

//                                 marriage.getGroomAddressDetails().setDistrictIdPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());

//                                 marriage.getGroomAddressDetails().setLocalityEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameEn());
//                                 marriage.getGroomAddressDetails().setLocalityMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameMl());

//                                 marriage.getGroomAddressDetails().setStreetNameEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameEn());
//                                 marriage.getGroomAddressDetails().setStreetNameMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameMl());

//                                 marriage.getGroomAddressDetails().setHouseNameNoEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameEn());
//                                 marriage.getGroomAddressDetails().setHouseNameNoMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameMl());

//                                 marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());

//                                 marriage.getGroomAddressDetails().setPermntOthrTalukName(marriage.getGroomAddressDetails().getPermntOutsideKeralaTaluk());
//                                 marriage.getGroomAddressDetails().setPermntOthPostOfficeEn(marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());


//                                 marriage.getGroomAddressDetails().setPinNoPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaPincode());

//                             }
//                         }

//                         }
//                         else {
// //                            if (marriage.getGroomAddressDetails().getPermtaddressCountry() != COUNTRY_CODE) {
//                                 marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());
//                                 marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaVillage());
//                                 marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaCityTown());

//                                 marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
//                                 marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());

//                                 marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
//                                 marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());

//                                 marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
//                                 marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());

//                              marriage.getGroomAddressDetails().setOutSideIndiaPostCodePermanent(marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
// //                            }
//                         }
//                 }

//             });
//     }

//     public void setBridePresentAddress(MarriageRegistryRequest request) {
//         request.getMarriageDetails()
//             .forEach(marriage ->{
//                 if (marriage.getBrideAddressDetails()!=null) {

//                     marriage.getBrideAddressDetails().setPresentUuid(UUID.randomUUID().toString());
//                     marriage.getBrideAddressDetails().setBrideGroomPresent("B");
//                 }

//                 if (marriage.getBrideAddressDetails() != null && marriage.getBrideAddressDetails().getIsPermanentAddress() != null)  {
//                     marriage.getBrideAddressDetails().setIsPermanentAddressInt(marriage.getBrideAddressDetails().getIsPermanentAddress() == true ? 1 : 0);
//                     if(marriage.getBrideAddressDetails().getIsPermanentAddress()) {
//                         marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getCountryIdPermanent());
//                         marriage.getBrideAddressDetails().setStateIdPresent(marriage.getBrideAddressDetails().getStateIdPermanent());
//                         if (marriage.getBrideAddressDetails().getCountryIdPermanent().equals(MarriageConstants.COUNTRY_CODE)) {
//                             marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPermtaddressCountry());
//                             if (marriage.getBrideAddressDetails().getStateIdPresent().equals(MarriageConstants.STATE_CODE_SMALL)) {
//                                     marriage.getBrideAddressDetails().setPresentaddressStateName(marriage.getBrideAddressDetails().getStateIdPresent());
//                             }
//                         }
//                     }

//                     if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null && marriage.getBrideAddressDetails().getPresentaddressStateName() != null) {
//                         if (marriage.getBrideAddressDetails().getPresentaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
//                             if (marriage.getBrideAddressDetails().getPresentaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {
//                                 if(!marriage.getBrideAddressDetails().getIsPermanentAddress()){
//                                     marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());
//                                     marriage.getBrideAddressDetails().setStateIdPresent(marriage.getBrideAddressDetails().getPresentaddressStateName());
//                                 }

//                                 marriage.getBrideAddressDetails().setDistrictIdPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());

//                                 marriage.getBrideAddressDetails().setLocalityEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaLocalityNameEn());
//                                 marriage.getBrideAddressDetails().setLocalityMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaLocalityNameMl());

//                                 marriage.getBrideAddressDetails().setStreetNameEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaStreetNameEn());
//                                 marriage.getBrideAddressDetails().setStreetNameMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaStreetNameMl());

//                                 marriage.getBrideAddressDetails().setHouseNameNoEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaHouseNameEn());
//                                 marriage.getBrideAddressDetails().setHouseNameNoMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaHouseNameMl());

//                                 marriage.getBrideAddressDetails().setPinNoPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaPincode());
//                                 marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaCityVilgeEn());
//                                 marriage.getBrideAddressDetails().setPoNoPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());


//                             }
//                             else {
//                                 if (!marriage.getBrideAddressDetails().getIsPermanentAddress()) {
//                                     marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());
//                                     marriage.getBrideAddressDetails().setStateIdPresent(marriage.getBrideAddressDetails().getPresentaddressStateName());
//                                 }
//                                 marriage.getBrideAddressDetails().setDistrictIdPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict());

//                                 marriage.getBrideAddressDetails().setLocalityEnPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaLocalityNameEn());
//                                 marriage.getBrideAddressDetails().setLocalityMlPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaLocalityNameMl());

//                                 marriage.getBrideAddressDetails().setStreetNameEnPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaStreetNameEn());
//                                 marriage.getBrideAddressDetails().setStreetNameMlPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaStreetNameMl());

//                                 marriage.getBrideAddressDetails().setHouseNameNoEnPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaHouseNameEn());
//                                 marriage.getBrideAddressDetails().setHouseNameNoMlPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaHouseNameMl());

//                                 marriage.getBrideAddressDetails().setPinNoPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaPincode());

//                                 marriage.getBrideAddressDetails().setPresentOthrTalukName(marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName());
//                                 marriage.getBrideAddressDetails().setPresentOthPostOfficeEn(marriage.getBrideAddressDetails().getPresentOutsideKeralaPostOfficeEn());


//                                 marriage.getBrideAddressDetails().setVillageNamePresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaVillageName());
//                                 marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaCityVilgeEn());

//                             }
//                         }

//                         else {
// //                            if (marriage.getBrideAddressDetails().getPresentOutSideCountry() != null) {
//                             marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());
//                             marriage.getBrideAddressDetails().setVillageNamePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsVillage());
//                             marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsCityTown());


//                             marriage.getBrideAddressDetails().setPresentOthrIndiaAdressEn(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressEn());
//                             marriage.getBrideAddressDetails().setPresentOthrIndiaAdressMl(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressMl());

//                             marriage.getBrideAddressDetails().setPresentOthrIndiaAdressEnB(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressEnB());
//                             marriage.getBrideAddressDetails().setPresentOthrIndiaAdressMlB(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressMlB());

//                             marriage.getBrideAddressDetails().setPresentOthrIndiaProvinceEn(marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceEn());
//                             marriage.getBrideAddressDetails().setPresentOthrIndiaProvinceMl(marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceMl());

//                             marriage.getBrideAddressDetails().setOutSideIndiaPostCodePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaPostCode());
// //                            }
//                         }
//                     }
//                 }
//         });
//     }

//     private void setBridePermanentAddress(MarriageRegistryRequest request) {
//         request.getMarriageDetails()
//             .forEach(marriage-> {

//                    if (marriage.getBrideAddressDetails()!=null){
//                        if (marriage.getBrideAddressDetails()!=null) {

//                            marriage.getBrideAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
//                            //marriage.getBrideAddressDetails().setPresentUuid(UUID.randomUUID().toString());
//                            marriage.getBrideAddressDetails().setBrideGroomPermanent("B");
//                            //marriage.getBrideAddressDetails().setBrideGroomPresent("B");
//                        }

//                        if(marriage.getBrideAddressDetails().getPermtaddressCountry()!=null && marriage.getBrideAddressDetails().getPermtaddressStateName() != null){
//                            if (marriage.getBrideAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
//                                if (marriage.getBrideAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

//                                    marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());

//                                    marriage.getBrideAddressDetails().setStateIdPermanent(marriage.getBrideAddressDetails().getPermtaddressStateName());

//                                    marriage.getBrideAddressDetails().setDistrictIdPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());

//                                    marriage.getBrideAddressDetails().setLocalityEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameEn());
//                                    marriage.getBrideAddressDetails().setLocalityMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameMl());

//                                    marriage.getBrideAddressDetails().setStreetNameEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameEn());
//                                    marriage.getBrideAddressDetails().setStreetNameMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameMl());

//                                    marriage.getBrideAddressDetails().setHouseNameNoEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameEn());
//                                    marriage.getBrideAddressDetails().setHouseNameNoMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameMl());
//                                    marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrPincode());
//                                    marriage.getBrideAddressDetails().setPoNoPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
//                                }
//                                else {
//                                    marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());

//                                    marriage.getBrideAddressDetails().setStateIdPermanent(marriage.getBrideAddressDetails().getPermtaddressStateName());

//                                    marriage.getBrideAddressDetails().setDistrictIdPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());

//                                    marriage.getBrideAddressDetails().setLocalityEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameEn());
//                                    marriage.getBrideAddressDetails().setLocalityMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameMl());

//                                    marriage.getBrideAddressDetails().setStreetNameEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameEn());
//                                    marriage.getBrideAddressDetails().setStreetNameMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameMl());

//                                    marriage.getBrideAddressDetails().setHouseNameNoEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameEn());
//                                    marriage.getBrideAddressDetails().setHouseNameNoMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameMl());

//                                    marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage());

//                                    marriage.getBrideAddressDetails().setPermntOthrTalukName(marriage.getBrideAddressDetails().getPermntOutsideKeralaTaluk());
//                                    marriage.getBrideAddressDetails().setPermntOthPostOfficeEn(marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());


//                                    marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaPincode());
//                                }
//                                }
//                             }
//                            else {
// //                               if (marriage.getBrideAddressDetails().getPermtaddressCountry() != COUNTRY_CODE) {
//                                    marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());
//                                    marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaVillage());
//                                    marriage.getBrideAddressDetails().setTownOrVillagePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaCityTown());

//                                    marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
//                                    marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneMl());

//                                    marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoEn());
//                                    marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoMl());

//                                    marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
//                                    marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());

//                                 marriage.getBrideAddressDetails().setOutSideIndiaPostCodePermanent(marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());

// //                               }
//                            }
//                    }
//             });
//     }
//UPDATED ON 06.05.2023
private void setGroomPresentAddress(MarriageRegistryRequest request) {
    request.getMarriageDetails()
            .forEach(marriage -> {
                       //  if (marriage.getGroomAddressDetails() != null) {
                        if (marriage.getGroomAddressDetails() != null) {

                                marriage.getGroomAddressDetails().setPresentUuid(UUID.randomUUID().toString());
                                marriage.getGroomAddressDetails().setBrideGroomPresent("G");
                            if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null ) {
                                if (marriage.getGroomAddressDetails().getPresentaddressCountry().equals(COUNTRY_CODE)) {
                                    if (marriage.getGroomAddressDetails().getPresentaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

                                        marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentaddressCountry());
                                        marriage.getGroomAddressDetails().setStateIdPresent(marriage.getGroomAddressDetails().getPresentaddressStateName());

                                        marriage.getGroomAddressDetails().setDistrictIdPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());

                                        marriage.getGroomAddressDetails().setLocalityEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaLocalityNameEn());
                                        marriage.getGroomAddressDetails().setLocalityMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaLocalityNameMl());

                                        marriage.getGroomAddressDetails().setStreetNameEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaStreetNameEn());
                                        marriage.getGroomAddressDetails().setStreetNameMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaStreetNameMl());

                                        marriage.getGroomAddressDetails().setHouseNameNoEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaHouseNameEn());
                                        marriage.getGroomAddressDetails().setHouseNameNoMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaHouseNameMl());

                                        marriage.getGroomAddressDetails().setPinNoPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaPincode());
                                        marriage.getGroomAddressDetails().setPoNoPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());

                                        marriage.getGroomAddressDetails().setPresentAddrVillageId(marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());

                                    } 
                                    else {
                                        marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentaddressCountry());
                                        marriage.getGroomAddressDetails().setStateIdPresent(marriage.getGroomAddressDetails().getPresentaddressStateName());
                                        marriage.getGroomAddressDetails().setDistrictIdPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());

                                        marriage.getGroomAddressDetails().setLocalityEnPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaLocalityNameEn());
                                        marriage.getGroomAddressDetails().setLocalityMlPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaLocalityNameMl());

                                        marriage.getGroomAddressDetails().setStreetNameEnPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaStreetNameEn());
                                        marriage.getGroomAddressDetails().setStreetNameMlPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaStreetNameMl());

                                        marriage.getGroomAddressDetails().setHouseNameNoEnPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaHouseNameEn());
                                        marriage.getGroomAddressDetails().setHouseNameNoMlPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaHouseNameMl());

                                        marriage.getGroomAddressDetails().setPinNoPresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaPincode());

                                        marriage.getGroomAddressDetails().setPresentOthrTalukName(marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());
                                        marriage.getGroomAddressDetails().setPresentOthPostOfficeEn(marriage.getGroomAddressDetails().getPresentOutsideKeralaPostOfficeEn());


                                        marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageorTown());
                                        marriage.getGroomAddressDetails().setVillageNamePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaCityVilgeNameEn());

                                    }
                                }
                            else {
                                    marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentaddressCountry());

                                    marriage.getGroomAddressDetails().setOutSideIndiaPostCodePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaPostCode());

                                    marriage.getGroomAddressDetails().setPresentOthrIndiaAdressEn(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressEn());
                                    marriage.getGroomAddressDetails().setPresentOthrIndiaAdressMl(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressMl());

                                    marriage.getGroomAddressDetails().setPresentOthrIndiaAdressEnB(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressEnB());
                                    marriage.getGroomAddressDetails().setPresentOthrIndiaAdressMlB(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressMlB());

                                    marriage.getGroomAddressDetails().setPresentOthrIndiaProvinceEn(marriage.getGroomAddressDetails().getPresentOutSideIndiaProvinceEn());
                                    marriage.getGroomAddressDetails().setPresentOthrIndiaProvinceMl(marriage.getGroomAddressDetails().getPresentOutSideIndiaProvinceMl());

                                    marriage.getGroomAddressDetails().setVillageNamePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsCityTown());
                                    marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsVillage());

                                    // marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsCityTown());
                                    // marriage.getGroomAddressDetails().setVillageNamePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsVillage());
                                }
                            }


                    }
            });
}
private void setGroomPermanentAddress(MarriageRegistryRequest request) {
    request.getMarriageDetails()
        .forEach(marriage-> {

            if (marriage.getGroomAddressDetails()!=null){
                    marriage.getGroomAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                    marriage.getGroomAddressDetails().setBrideGroomPermanent("G");
                    if(marriage.getGroomAddressDetails().getPermtaddressCountry()!=null){
                        if (marriage.getGroomAddressDetails().getPermtaddressCountry().equals(COUNTRY_CODE)) {
                            if (marriage.getGroomAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

                                marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());
                                marriage.getGroomAddressDetails().setPermanentAddrTalukId(marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                                marriage.getGroomAddressDetails().setPermanentAddrVillageId(marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());

                                marriage.getGroomAddressDetails().setStateIdPermanent(marriage.getGroomAddressDetails().getPermtaddressStateName());

                                marriage.getGroomAddressDetails().setDistrictIdPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());

                                marriage.getGroomAddressDetails().setLocalityEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                                marriage.getGroomAddressDetails().setLocalityMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameMl());

                                marriage.getGroomAddressDetails().setStreetNameEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn());
                                marriage.getGroomAddressDetails().setStreetNameMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameMl());

                                marriage.getGroomAddressDetails().setHouseNameNoEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn());
                                marriage.getGroomAddressDetails().setHouseNameNoMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameMl());
                                marriage.getGroomAddressDetails().setPinNoPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrPincode());
                                marriage.getGroomAddressDetails().setPoNoPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                            }

                            else {
                                marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());

                                marriage.getGroomAddressDetails().setStateIdPermanent(marriage.getGroomAddressDetails().getPermtaddressStateName());

                                marriage.getGroomAddressDetails().setDistrictIdPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());

                                marriage.getGroomAddressDetails().setLocalityEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                                marriage.getGroomAddressDetails().setLocalityMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameMl());

                                marriage.getGroomAddressDetails().setStreetNameEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameEn());
                                marriage.getGroomAddressDetails().setStreetNameMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameMl());

                                marriage.getGroomAddressDetails().setHouseNameNoEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameEn());
                                marriage.getGroomAddressDetails().setHouseNameNoMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameMl());


                                marriage.getGroomAddressDetails().setPermntOthrTalukName(marriage.getGroomAddressDetails().getPermntOutsideKeralaTaluk());
                                marriage.getGroomAddressDetails().setPermntOthPostOfficeEn(marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());


                                marriage.getGroomAddressDetails().setPinNoPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaPincode());

                                marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaVillageorTown());
                                marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaVillageEn());
                            }
                        }
                        else {
                                marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());

                               // marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaCityTown());
                               // marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaVillage());


                                marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaCityTown());
                                marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaVillage());

                                marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                                marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());

                                marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());

                                marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                                marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());
                                
                                // marriage.getGroomAddressDetails().setPermntOutsideIndiaLineoneEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                                // marriage.getGroomAddressDetails().setPermntOutsideIndiaLineoneMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());

                                // marriage.getGroomAddressDetails().setPermntOutsideIndiaLinetwoEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                // marriage.getGroomAddressDetails().setPermntOutsideIndiaLinetwoMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());

                                // marriage.getGroomAddressDetails().setPermntOutSideIndiaProvinceEn(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                                // marriage.getGroomAddressDetails().setPermntOutSideIndiaProvinceMl(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());

                                marriage.getGroomAddressDetails().setOutSideIndiaPostCodePermanent(marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
                        }

                    }
                }
        });
}

private void setBridePresentAddress(MarriageRegistryRequest request) {
    request.getMarriageDetails()
            .forEach(marriage ->{
                if (marriage.getBrideAddressDetails()!=null) {

                    marriage.getBrideAddressDetails().setPresentUuid(UUID.randomUUID().toString());
                    marriage.getBrideAddressDetails().setBrideGroomPresent("B");
                }
                if (marriage.getBrideAddressDetails()!=null) {
                   // System.out.println("BridePresentAddress");
                    if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null) {
                        if (marriage.getBrideAddressDetails().getPresentaddressCountry().equals(COUNTRY_CODE)) {
                            if (marriage.getBrideAddressDetails().getPresentaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

                                    marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setStateIdPresent(marriage.getBrideAddressDetails().getPresentaddressStateName());


                                    marriage.getBrideAddressDetails().setDistrictIdPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());

                                    marriage.getBrideAddressDetails().setLocalityEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaLocalityNameEn());
                                    marriage.getBrideAddressDetails().setLocalityMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaLocalityNameMl());

                                    marriage.getBrideAddressDetails().setStreetNameEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaStreetNameEn());
                                    marriage.getBrideAddressDetails().setStreetNameMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaStreetNameMl());

                                    marriage.getBrideAddressDetails().setHouseNameNoEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaHouseNameEn());
                                    marriage.getBrideAddressDetails().setHouseNameNoMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaHouseNameMl());

                                    marriage.getBrideAddressDetails().setPinNoPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaPincode());
                                    marriage.getBrideAddressDetails().setPoNoPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());
                            } 
                            else {

                                marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());
                                marriage.getBrideAddressDetails().setStateIdPresent(marriage.getBrideAddressDetails().getPresentaddressStateName());

                                marriage.getBrideAddressDetails().setDistrictIdPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict());

                                marriage.getBrideAddressDetails().setLocalityEnPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaLocalityNameEn());
                                marriage.getBrideAddressDetails().setLocalityMlPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaLocalityNameMl());

                                marriage.getBrideAddressDetails().setStreetNameEnPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaStreetNameEn());
                                marriage.getBrideAddressDetails().setStreetNameMlPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaStreetNameMl());

                                marriage.getBrideAddressDetails().setHouseNameNoEnPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaHouseNameEn());
                                marriage.getBrideAddressDetails().setHouseNameNoMlPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaHouseNameMl());

                                marriage.getBrideAddressDetails().setPinNoPresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaPincode());

                                marriage.getBrideAddressDetails().setPresentOthrTalukName(marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName());
                                marriage.getBrideAddressDetails().setPresentOthPostOfficeEn(marriage.getBrideAddressDetails().getPresentOutsideKeralaPostOfficeEn());
 
                                marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaVillageorTown());
                                marriage.getBrideAddressDetails().setVillageNamePresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaCityVilgeNameEn());

                            }
                        }
                        else {
                       // System.out.println("outsideIndia-"+marriage.getBrideAddressDetails().getPresentaddressCountry());
                       // System.out.println("outsideIndia-Province En"+marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceEn());

                        marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());

                        marriage.getBrideAddressDetails().setPresentOthrIndiaAdressEn(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressEn());
                        marriage.getBrideAddressDetails().setPresentOthrIndiaAdressMl(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressMl());

                        marriage.getBrideAddressDetails().setPresentOthrIndiaAdressEnB(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressEnB());
                        marriage.getBrideAddressDetails().setPresentOthrIndiaAdressMlB(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressMlB());

                        marriage.getBrideAddressDetails().setPresentOthrIndiaProvinceEn(marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceEn());
                        marriage.getBrideAddressDetails().setPresentOthrIndiaProvinceMl(marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceMl());

                        marriage.getBrideAddressDetails().setOutSideIndiaPostCodePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaPostCode());
                        
                        marriage.getBrideAddressDetails().setVillageNamePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsCityTown());
                        marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsVillage());

                        // marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsCityTown());

                    }
                }
            }

    });
}

private void setBridePermanentAddress(MarriageRegistryRequest request) {
    request.getMarriageDetails()
            .forEach(marriage-> {

                   if (marriage.getBrideAddressDetails()!=null){
                       if (marriage.getBrideAddressDetails()!=null) {

                           marriage.getBrideAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                           //marriage.getBrideAddressDetails().setPresentUuid(UUID.randomUUID().toString());
                           marriage.getBrideAddressDetails().setBrideGroomPermanent("B");
                           //marriage.getBrideAddressDetails().setBrideGroomPresent("B");
                       }

                       if(marriage.getBrideAddressDetails().getPermtaddressCountry()!=null ){
                           if (marriage.getBrideAddressDetails().getPermtaddressCountry().equals(COUNTRY_CODE)) {
                               if (marriage.getBrideAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

                                   marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());

                                   marriage.getBrideAddressDetails().setStateIdPermanent(marriage.getBrideAddressDetails().getPermtaddressStateName());
                                   marriage.getBrideAddressDetails().setPermanentAddrTalukId(marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                                   marriage.getBrideAddressDetails().setPermanentAddrVillageId(marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());

                                   marriage.getBrideAddressDetails().setDistrictIdPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());

                                   marriage.getBrideAddressDetails().setLocalityEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                                   marriage.getBrideAddressDetails().setLocalityMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameMl());

                                   marriage.getBrideAddressDetails().setStreetNameEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameEn());
                                   marriage.getBrideAddressDetails().setStreetNameMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameMl());

                                   marriage.getBrideAddressDetails().setHouseNameNoEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameEn());
                                   marriage.getBrideAddressDetails().setHouseNameNoMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameMl());
                                   marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrPincode());
                                   marriage.getBrideAddressDetails().setPoNoPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                               } 
                               else {
                                   marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());

                                   marriage.getBrideAddressDetails().setStateIdPermanent(marriage.getBrideAddressDetails().getPermtaddressStateName());

                                   marriage.getBrideAddressDetails().setDistrictIdPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());

                                   marriage.getBrideAddressDetails().setLocalityEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                                   marriage.getBrideAddressDetails().setLocalityMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameMl());

                                   marriage.getBrideAddressDetails().setStreetNameEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameEn());
                                   marriage.getBrideAddressDetails().setStreetNameMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameMl());

                                   marriage.getBrideAddressDetails().setHouseNameNoEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameEn());
                                   marriage.getBrideAddressDetails().setHouseNameNoMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameMl());


                                   marriage.getBrideAddressDetails().setPermntOthrTalukName(marriage.getBrideAddressDetails().getPermntOutsideKeralaTaluk());
                                   marriage.getBrideAddressDetails().setPermntOthPostOfficeEn(marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());

                                   marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaPincode());

                                   marriage.getBrideAddressDetails().setTownOrVillagePermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaVillageorTown());
                                   marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaCityVilgeEn());
                                   //marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaVillageEn());  
                               }
                           }
                        else {
//                                   
                                   marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());

                                   marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
                                   marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneMl());

                                   marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                   marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoMl());

                                   marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                                   marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());

                                //    marriage.getBrideAddressDetails().setTownOrVillagePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaCityTown());
                                //    marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaVillage());

                                    marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaCityTown());
                                    marriage.getBrideAddressDetails().setTownOrVillagePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaVillage());

                                    marriage.getBrideAddressDetails().setOutSideIndiaPostCodePermanent(marriage.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());

                           }
                        }
                   }

            });

    }
    public void enrichUpdate(MarriageRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        request.getMarriageDetails()
                .forEach(marriage -> {
                    marriage.setAuditDetails(auditDetails);
                    if(marriage.getWitnessDetails()!=null){
                        if(StringUtils.isNotBlank(marriage.getWitnessDetails().getBrideUrl())){
                            marriage.getWitnessDetails().setBrideUrl(marriage.getWitnessDetails().getBrideUrl().trim().replaceAll(config.getImageURLStartPath(),""));
                        }
                        if(StringUtils.isNotBlank(marriage.getWitnessDetails().getGroomUrl())){
                            marriage.getWitnessDetails().setGroomUrl(marriage.getWitnessDetails().getGroomUrl().trim().replaceAll(config.getImageURLStartPath(),""));
                        }
                    }

                });
    }

    private List<String> getIds(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String fnType, int count) {
        return idGenRepository.getIdList(requestInfo, tenantId, idName, moduleCode, fnType, count);
    }

    private void validateFileCodes(List<String> fileCodes, int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(ErrorCodes.IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }
    }
    public String setGroomPermanentAddressForCertificate(RequestInfo req,MarriageRegistryDetails registryDetails) {

        StringBuilder groomAddressBuilder = new StringBuilder();
        if (registryDetails.getGroomAddressDetails() != null) {

//            if (registryDetails.getGroomAddressDetails().getPermtaddressCountry() != null && registryDetails.getGroomAddressDetails().getPermtaddressStateName() != null) {
                if (StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressCountry())&&registryDetails.getGroomAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                    if (StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressStateName())&&registryDetails.getGroomAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {
                        Object mdmsGroomAddressData = util.mDMSCallGetAddress(req
                                , registryDetails.getGroomAddressDetails().getPermntInKeralaAdrLBName()
                                , registryDetails.getGroomAddressDetails().getDistrictIdPermanent()
                                , registryDetails.getGroomAddressDetails().getStateIdPermanent()
                                , registryDetails.getGroomAddressDetails().getCountryIdPermanent()
                                , registryDetails.getGroomAddressDetails().getPoNoPermanent()
                                , registryDetails.getGroomAddressDetails().getVillageNamePermanent()
                                , registryDetails.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                        if(null!=mdmsGroomAddressData) {
                            Map<String, List<String>> mdmsGroomAddressMap = util.getMarriageMDMSData(mdmsGroomAddressData);
                            registryDetails.getGroomAddressDetails().setPermntInKeralaAdrLBName(getValueFromMap(MarriageConstants.TENANTS, mdmsGroomAddressMap));
                            registryDetails.getGroomAddressDetails().setDistrictIdPermanent(getValueFromMap(MarriageConstants.DISTRICT, mdmsGroomAddressMap));
                            registryDetails.getGroomAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE, mdmsGroomAddressMap));
                            registryDetails.getGroomAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY, mdmsGroomAddressMap));
                            registryDetails.getGroomAddressDetails().setPoNoPermanent(getValueFromMap(MarriageConstants.POSTOFFICE, mdmsGroomAddressMap));
//                      registryDetails.getGroomAddressDetails().setVillageNamePermanent(getValueFromMap(MarriageConstants.VILLAGE,mdmsGroomAddressMap));
//                      registryDetails.getGroomAddressDetails().setPermntInKeralaAdrTaluk(getValueFromMap(MarriageConstants.TALUK,mdmsGroomAddressMap));
                            registryDetails.getGroomAddressDetails().setHouseNameNoEnPermanent(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn());
                            registryDetails.getGroomAddressDetails().setStreetNameEnPermanent(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn());
                            registryDetails.getGroomAddressDetails().setLocalityEnPermanent(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                            registryDetails.getGroomAddressDetails().setPinNoPermanent(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrPincode());
                       //     registryDetails.getGroomAddressDetails().setPoNoPermanent(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());


                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getHouseNameNoEnPermanent(), groomAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getStreetNameEnPermanent(), groomAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getLocalityEnPermanent(), groomAddressBuilder, true);

                            if(StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPoNoPermanent())){
                                appendIfNotBlank(getValueFromMap(MarriageConstants.POSTOFFICE.concat(" P O"), mdmsGroomAddressMap), groomAddressBuilder, true);
                            }
                            if(StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrDistrict())){
                                appendIfNotBlank(getValueFromMap(MarriageConstants.DISTRICT, mdmsGroomAddressMap), groomAddressBuilder, true);
                            }
                            else {
                                appendIfNotBlank(registryDetails.getGroomAddressDetails().getDistrictName(), groomAddressBuilder, true);

                            }
                            if(StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressStateName())){
                                appendIfNotBlank(getValueFromMap(MarriageConstants.STATE, mdmsGroomAddressMap), groomAddressBuilder, true);
                            }
                            else{
                                appendIfNotBlank(registryDetails.getGroomAddressDetails().getStateName(), groomAddressBuilder, true);
                            }
                            if(StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressCountry()) ){
                                appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsGroomAddressMap), groomAddressBuilder, true);
                            }
                            else{
                                appendIfNotBlank(registryDetails.getGroomAddressDetails().getCountryName(), groomAddressBuilder, true);
                            }

                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getPinNoPermanent(), groomAddressBuilder, false);
                        }

                    } else {

                        Object mdmsGroomAddressData = util.mDMSCallGetAddress(req
                                , registryDetails.getGroomAddressDetails().getPermntInKeralaAdrLBName()
                                , registryDetails.getGroomAddressDetails().getDistrictIdPermanent()
                                , registryDetails.getGroomAddressDetails().getStateIdPermanent()
                                , registryDetails.getGroomAddressDetails().getCountryIdPermanent()
                                , registryDetails.getGroomAddressDetails().getPoNoPermanent()
                                , registryDetails.getGroomAddressDetails().getVillageNamePermanent()
                                , registryDetails.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                        if(null!=mdmsGroomAddressData) {
                            Map<String, List<String>> mdmsGroomAddressMap = util.getMarriageMDMSData(mdmsGroomAddressData);
                            registryDetails.getGroomAddressDetails().setPermntInKeralaAdrLBName(null);
                            registryDetails.getGroomAddressDetails().setDistrictIdPermanent(getValueFromMap(MarriageConstants.DISTRICT, mdmsGroomAddressMap));
                            registryDetails.getGroomAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE, mdmsGroomAddressMap));
                            registryDetails.getGroomAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY, mdmsGroomAddressMap));
                            registryDetails.getGroomAddressDetails().setPoNoPermanent(null);
                            registryDetails.getGroomAddressDetails().setHouseNameNoEnPermanent(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaHouseNameEn());
                            registryDetails.getGroomAddressDetails().setStreetNameEnPermanent(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaStreetNameEn());
                            registryDetails.getGroomAddressDetails().setLocalityEnPermanent(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                            registryDetails.getGroomAddressDetails().setPinNoPermanent(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaPincode());
                            registryDetails.getGroomAddressDetails().setPermntOthPostOfficeEn(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());

                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getHouseNameNoEnPermanent(), groomAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getStreetNameEnPermanent(), groomAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getLocalityEnPermanent(), groomAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOthPostOfficeEn(), groomAddressBuilder, true);

                            if(StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaDistrict())){

                                appendIfNotBlank(getValueFromMap(MarriageConstants.DISTRICT, mdmsGroomAddressMap), groomAddressBuilder, true);
                            }
                            else {
                                appendIfNotBlank(registryDetails.getGroomAddressDetails().getDistrictName(), groomAddressBuilder, true);

                            }
                            if(StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressStateName())){

                                appendIfNotBlank(getValueFromMap(MarriageConstants.STATE, mdmsGroomAddressMap), groomAddressBuilder, true);
                            }
                            else{
                                appendIfNotBlank(registryDetails.getGroomAddressDetails().getStateName(), groomAddressBuilder, true);
                            }
                            if(StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressCountry())){
                                appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsGroomAddressMap), groomAddressBuilder, true);
                            }
                            else{
                                appendIfNotBlank(registryDetails.getGroomAddressDetails().getCountryName(), groomAddressBuilder, true);
                            }

                            appendIfNotBlank(registryDetails.getGroomAddressDetails().getPinNoPermanent(), groomAddressBuilder, false);

                        }

                    }
//                }

            } else {
                    return  setGroomOutSideInAddressForCertificate(req,registryDetails);

//                Object mdmsGroomAddressData = util.mDMSCallGetAddress(req
//                        , registryDetails.getGroomAddressDetails().getPermntInKeralaAdrLBName()
//                        , registryDetails.getGroomAddressDetails().getDistrictIdPermanent()
//                        , registryDetails.getGroomAddressDetails().getStateIdPermanent()
//                        , registryDetails.getGroomAddressDetails().getCountryIdPermanent()
//                        , registryDetails.getGroomAddressDetails().getPoNoPermanent()
//                        , registryDetails.getGroomAddressDetails().getVillageNamePermanent()
//                        , registryDetails.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
//                if(null!=mdmsGroomAddressData) {
//                    Map<String, List<String>> mdmsGroomAddressMap = util.getMarriageMDMSData(mdmsGroomAddressData);
//                    registryDetails.getGroomAddressDetails().setPermntInKeralaAdrLBName(null);
//                    registryDetails.getGroomAddressDetails().setDistrictIdPermanent(getValueFromMap(MarriageConstants.DISTRICT, mdmsGroomAddressMap));
//                    registryDetails.getGroomAddressDetails().setStateIdPermanent(null);
//                    registryDetails.getGroomAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY, mdmsGroomAddressMap));
//                    registryDetails.getGroomAddressDetails().setPoNoPermanent(null);
//
//                    registryDetails.getGroomAddressDetails().setPermntOthrIndiaLineoneEn(registryDetails.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
//                    registryDetails.getGroomAddressDetails().setOutSideIndiaPostCodePermanent(registryDetails.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
//                    registryDetails.getGroomAddressDetails().setPermntOthrIndiaprovinceEn(registryDetails.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
//                    registryDetails.getGroomAddressDetails().setOutSideIndiaPostCodePermanent(registryDetails.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
//
//                    appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOthrIndiaLineoneEn(), groomAddressBuilder, true);
//
//                    appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOthrIndiaprovinceEn(), groomAddressBuilder, true);
//
//                    appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsGroomAddressMap), groomAddressBuilder, true);
//
//                    appendIfNotBlank(registryDetails.getGroomAddressDetails().getOutSideIndiaPostCodePermanent(), groomAddressBuilder, true);
//                }
//

            }

        }
        if(StringUtils.isNotBlank(groomAddressBuilder.toString()) && ((Character) groomAddressBuilder.toString().charAt(groomAddressBuilder.toString().length()-1)).equals(',')){
            return groomAddressBuilder.toString().substring(0, groomAddressBuilder.toString().length()-1);
        }

        return groomAddressBuilder.toString();

    }

    public String setGroomOutSideInAddressForCertificate(RequestInfo req,MarriageRegistryDetails registryDetails) {
        StringBuilder groomAddressBuilder = new StringBuilder();
        if (registryDetails.getGroomAddressDetails() != null) {
            if (StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressCountry())&&!registryDetails.getGroomAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                registryDetails.getGroomAddressDetails().setPermntOthrIndiaLineoneEn(registryDetails.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                registryDetails.getGroomAddressDetails().setOutSideIndiaPostCodePermanent(registryDetails.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
                registryDetails.getGroomAddressDetails().setPermntOthrIndiaprovinceEn(registryDetails.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                registryDetails.getGroomAddressDetails().setOutSideIndiaPostCodePermanent(registryDetails.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
                Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req, registryDetails.getGroomAddressDetails().getCountryIdPermanent());
                    appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOthrIndiaLineoneEn(), groomAddressBuilder, true);
                    appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOthrIndiaprovinceEn(), groomAddressBuilder, true);
                    appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), groomAddressBuilder, true);
                    appendIfNotBlank(registryDetails.getGroomAddressDetails().getOutSideIndiaPostCodePermanent(), groomAddressBuilder, false);
                }
        }
        if(StringUtils.isNotBlank(groomAddressBuilder.toString()) && ((Character) groomAddressBuilder.toString().charAt(groomAddressBuilder.toString().length()-1)).equals(',')){
            return groomAddressBuilder.toString().substring(0, groomAddressBuilder.toString().length()-1);
        }
        return groomAddressBuilder.toString();
    }


    public String setBrideOutSideInAddressForCertificate(RequestInfo req,MarriageRegistryDetails registryDetails) {
        StringBuilder brideAddressBuilder = new StringBuilder();
        if (registryDetails.getBrideAddressDetails() != null) {
            if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressCountry())&&!registryDetails.getBrideAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                registryDetails.getBrideAddressDetails().setPermntOthrIndiaLineoneEn(registryDetails.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
                registryDetails.getBrideAddressDetails().setOutSideIndiaPostCodePermanent(registryDetails.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());
                registryDetails.getBrideAddressDetails().setPermntOthrIndiaprovinceEn(registryDetails.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                registryDetails.getBrideAddressDetails().setOutSideIndiaPostCodePermanent(registryDetails.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());
                Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req, registryDetails.getBrideAddressDetails().getCountryIdPermanent());
                appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOthrIndiaLineoneEn(), brideAddressBuilder, true);
                appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOthrIndiaprovinceEn(), brideAddressBuilder, true);
                appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), brideAddressBuilder, true);
                appendIfNotBlank(registryDetails.getBrideAddressDetails().getOutSideIndiaPostCodePermanent(), brideAddressBuilder, true);
            }
        }
        if(StringUtils.isNotBlank(brideAddressBuilder.toString()) && ((Character) brideAddressBuilder.toString().charAt(brideAddressBuilder.toString().length()-1)).equals(',')){
            return brideAddressBuilder.toString().substring(0, brideAddressBuilder.toString().length()-1);
        }
        return brideAddressBuilder.toString();
    }
    public String setGroomNRIAddressForCertificate(RequestInfo req,MarriageRegistryDetails registryDetails) {
        StringBuilder groomAddressBuilder = new StringBuilder();
        if (registryDetails.getGroomAddressDetails() != null) {
            if (StringUtils.isNotBlank(registryDetails.getGroomAddressDetails().getPresentaddressCountry())&&!registryDetails.getGroomAddressDetails().getPresentaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req, registryDetails.getGroomAddressDetails().getPresentaddressCountry());
                appendIfNotBlank(registryDetails.getGroomAddressDetails().getPresentOutSideIndiaAdressEn(), groomAddressBuilder, true);
                appendIfNotBlank(registryDetails.getGroomAddressDetails().getPresentOutSideIndiaAdressEnB(), groomAddressBuilder, true);
                appendIfNotBlank(registryDetails.getGroomAddressDetails().getPresentOutSideIndiaProvinceEn(), groomAddressBuilder, true);
                appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), groomAddressBuilder, true);
                appendIfNotBlank(registryDetails.getGroomAddressDetails().getPresentOutSideIndiaPostCode(), groomAddressBuilder, false);
            }
        }
        if(StringUtils.isNotBlank(groomAddressBuilder.toString()) && ((Character) groomAddressBuilder.toString().charAt(groomAddressBuilder.toString().length()-1)).equals(',')){
            return groomAddressBuilder.toString().substring(0, groomAddressBuilder.toString().length()-1);
        }
        return groomAddressBuilder.toString();
    }
    public String setBrideNRIAddressForCertificate(RequestInfo req,MarriageRegistryDetails registryDetails) {
        StringBuilder brideAddressBuilder = new StringBuilder();
        if (registryDetails.getBrideAddressDetails() != null) {
            if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPresentaddressCountry())&&!registryDetails.getBrideAddressDetails().getPresentaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req, registryDetails.getBrideAddressDetails().getPresentaddressCountry());
                appendIfNotBlank(registryDetails.getBrideAddressDetails().getPresentOutSideIndiaAdressEn(), brideAddressBuilder, true);
                appendIfNotBlank(registryDetails.getBrideAddressDetails().getPresentOutSideIndiaAdressEnB(), brideAddressBuilder, true);
                appendIfNotBlank(registryDetails.getBrideAddressDetails().getPresentOutSideIndiaProvinceEn(), brideAddressBuilder, true);
                appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), brideAddressBuilder, true);
                appendIfNotBlank(registryDetails.getBrideAddressDetails().getPresentOutSideIndiaPostCode(), brideAddressBuilder, false);
            }
        }
        if(StringUtils.isNotBlank(brideAddressBuilder.toString()) && ((Character) brideAddressBuilder.toString().charAt(brideAddressBuilder.toString().length()-1)).equals(',')){
            return brideAddressBuilder.toString().substring(0, brideAddressBuilder.toString().length()-1);
        }
        return brideAddressBuilder.toString();
    }
    public String setBridePermanentAddressForCertificate(RequestInfo req,MarriageRegistryDetails registryDetails) {

        StringBuilder brideAddressBuilder = new StringBuilder();
        if (registryDetails.getBrideAddressDetails() != null) {
            if (registryDetails.getBrideAddressDetails().getPermtaddressCountry() != null && registryDetails.getBrideAddressDetails().getPermtaddressStateName() != null) {
                if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressCountry()) && registryDetails.getBrideAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                    if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressStateName()) && registryDetails.getBrideAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

                        Object mdmsBrideAddressData = util.mDMSCallGetAddress(req
                                , registryDetails.getBrideAddressDetails().getPermntInKeralaAdrLBName()
                                , registryDetails.getBrideAddressDetails().getDistrictIdPermanent()
                                , registryDetails.getBrideAddressDetails().getStateIdPermanent()
                                , registryDetails.getBrideAddressDetails().getCountryIdPermanent()
                                , registryDetails.getBrideAddressDetails().getPoNoPermanent()
                                , registryDetails.getBrideAddressDetails().getVillageNamePermanent()
                                , registryDetails.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                        if (null != mdmsBrideAddressData) {
                            Map<String, List<String>> mdmsBrideAddressMap = util.getMarriageMDMSData(mdmsBrideAddressData);
                            registryDetails.getBrideAddressDetails().setPermntInKeralaAdrLBName(getValueFromMap(MarriageConstants.TENANTS, mdmsBrideAddressMap));
                            registryDetails.getBrideAddressDetails().setDistrictIdPermanent(getValueFromMap(MarriageConstants.DISTRICT, mdmsBrideAddressMap));
                            registryDetails.getBrideAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE, mdmsBrideAddressMap));
                            registryDetails.getBrideAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY, mdmsBrideAddressMap));
                            registryDetails.getBrideAddressDetails().setPoNoPermanent(getValueFromMap(MarriageConstants.POSTOFFICE, mdmsBrideAddressMap));
//                        registryDetails.getBrideAddressDetails().setVillageNamePermanent(getValueFromMap(MarriageConstants.VILLAGE,mdmsGroomAddressMap));
//                        registryDetails.getBrideAddressDetails().setPermntInKeralaAdrTaluk(getValueFromMap(MarriageConstants.TALUK,mdmsGroomAddressMap));
                            registryDetails.getBrideAddressDetails().setHouseNameNoEnPermanent(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrHouseNameEn());
                            registryDetails.getBrideAddressDetails().setStreetNameEnPermanent(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrStreetNameEn());
                            registryDetails.getBrideAddressDetails().setLocalityEnPermanent(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                            registryDetails.getBrideAddressDetails().setPinNoPermanent(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrPincode());
//                            registryDetails.getBrideAddressDetails().setPoNoPermanent(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());


                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getHouseNameNoEnPermanent(), brideAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getStreetNameEnPermanent(), brideAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getLocalityEnPermanent(), brideAddressBuilder, true);

                            if(StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPoNoPermanent())){
                                appendIfNotBlank(getValueFromMap(MarriageConstants.POSTOFFICE.concat(" P O"), mdmsBrideAddressMap), brideAddressBuilder, true);
                            }

                            if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrDistrict())) {
                                appendIfNotBlank(getValueFromMap(MarriageConstants.DISTRICT, mdmsBrideAddressMap), brideAddressBuilder, true);
                            } else {
                                appendIfNotBlank(registryDetails.getBrideAddressDetails().getDistrictName(), brideAddressBuilder, true);

                            }
                            if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressStateName())) {
                                appendIfNotBlank(getValueFromMap(MarriageConstants.STATE, mdmsBrideAddressMap), brideAddressBuilder, true);
                            } else {
                                appendIfNotBlank(registryDetails.getBrideAddressDetails().getStateName(), brideAddressBuilder, true);
                            }
                            if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressCountry())) {
                                appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsBrideAddressMap), brideAddressBuilder, true);
                            } else {
                                appendIfNotBlank(registryDetails.getBrideAddressDetails().getCountryName(), brideAddressBuilder, true);
                            }
                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getPinNoPermanent(), brideAddressBuilder, true);
                        }

                    } else {
                        Object mdmsBrideAddressData = util.mDMSCallGetAddress(req
                                , registryDetails.getBrideAddressDetails().getPermntInKeralaAdrLBName()
                                , registryDetails.getBrideAddressDetails().getDistrictIdPermanent()
                                , registryDetails.getBrideAddressDetails().getStateIdPermanent()
                                , registryDetails.getBrideAddressDetails().getCountryIdPermanent()
                                , registryDetails.getBrideAddressDetails().getPoNoPermanent()
                                , registryDetails.getBrideAddressDetails().getVillageNamePermanent()
                                , registryDetails.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                        if (null != mdmsBrideAddressData) {
                            Map<String, List<String>> mdmsBrideAddressMap = util.getMarriageMDMSData(mdmsBrideAddressData);
                            registryDetails.getBrideAddressDetails().setPermntInKeralaAdrLBName(null);
                            registryDetails.getBrideAddressDetails().setDistrictIdPermanent(getValueFromMap(MarriageConstants.DISTRICT, mdmsBrideAddressMap));
                            registryDetails.getBrideAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE, mdmsBrideAddressMap));
                            registryDetails.getBrideAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY, mdmsBrideAddressMap));
                            registryDetails.getBrideAddressDetails().setPoNoPermanent(null);
                            registryDetails.getBrideAddressDetails().setHouseNameNoEnPermanent(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaHouseNameEn());
                            registryDetails.getBrideAddressDetails().setStreetNameEnPermanent(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaStreetNameEn());
                            registryDetails.getBrideAddressDetails().setLocalityEnPermanent(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                            registryDetails.getBrideAddressDetails().setPinNoPermanent(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaPincode());
                            registryDetails.getBrideAddressDetails().setPermntOthPostOfficeEn(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());


                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getHouseNameNoEnPermanent(), brideAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getStreetNameEnPermanent(), brideAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getLocalityEnPermanent(), brideAddressBuilder, true);

                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOthPostOfficeEn(), brideAddressBuilder, true);

                            if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaDistrict())) {

                                appendIfNotBlank(getValueFromMap(MarriageConstants.DISTRICT, mdmsBrideAddressMap), brideAddressBuilder, true);
                            } else {
                                appendIfNotBlank(registryDetails.getBrideAddressDetails().getDistrictName(), brideAddressBuilder, true);

                            }
                            if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressStateName())) {
                                appendIfNotBlank(getValueFromMap(MarriageConstants.STATE, mdmsBrideAddressMap), brideAddressBuilder, true);
                            } else {
                                appendIfNotBlank(registryDetails.getBrideAddressDetails().getStateName(), brideAddressBuilder, true);
                            }
                            if (StringUtils.isNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressCountry())) {
                                appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsBrideAddressMap), brideAddressBuilder, true);
                            } else {
                                appendIfNotBlank(registryDetails.getBrideAddressDetails().getCountryName(), brideAddressBuilder, true);
                            }
                            appendIfNotBlank(registryDetails.getBrideAddressDetails().getPinNoPermanent(), brideAddressBuilder, true);
                        }
                    }
                }


            } else {
                return  setBrideOutSideInAddressForCertificate(req,registryDetails);
//                Object mdmsBrideAddressData = util.mDMSCallGetAddress(req
//                        , registryDetails.getBrideAddressDetails().getPermntInKeralaAdrLBName()
//                        , registryDetails.getBrideAddressDetails().getDistrictIdPermanent()
//                        , registryDetails.getBrideAddressDetails().getStateIdPermanent()
//                        , registryDetails.getBrideAddressDetails().getCountryIdPermanent()
//                        , registryDetails.getBrideAddressDetails().getPoNoPermanent()
//                        , registryDetails.getBrideAddressDetails().getVillageNamePermanent()
//                        , registryDetails.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
//                if (null != mdmsBrideAddressData) {
//                    Map<String, List<String>> mdmsBrideAddressMap = util.getMarriageMDMSData(mdmsBrideAddressData);
//                    registryDetails.getBrideAddressDetails().setPermntInKeralaAdrLBName(null);
//                    registryDetails.getBrideAddressDetails().setDistrictIdPermanent(getValueFromMap(MarriageConstants.DISTRICT, mdmsBrideAddressMap));
//                    registryDetails.getBrideAddressDetails().setStateIdPermanent(null);
//                    registryDetails.getBrideAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY, mdmsBrideAddressMap));
//                    registryDetails.getBrideAddressDetails().setPoNoPermanent(null);
////
//                    registryDetails.getBrideAddressDetails().setPermntOthrIndiaLineoneEn(registryDetails.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
//                    registryDetails.getBrideAddressDetails().setOutSideIndiaPostCodePermanent(registryDetails.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());
//                    registryDetails.getBrideAddressDetails().setPermntOthrIndiaprovinceEn(registryDetails.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
//                    registryDetails.getBrideAddressDetails().setOutSideIndiaPostCodePermanent(registryDetails.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());
//
//                    appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOthrIndiaLineoneEn(), brideAddressBuilder, true);
//
//                    appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOthrIndiaprovinceEn(), brideAddressBuilder, true);
//
//                    appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsBrideAddressMap), brideAddressBuilder, true);
//
//                    appendIfNotBlank(registryDetails.getBrideAddressDetails().getOutSideIndiaPostCodePermanent(), brideAddressBuilder, true);
//
//                }
            }

        }
        if(StringUtils.isNotBlank(brideAddressBuilder.toString()) && ((Character) brideAddressBuilder.toString().charAt(brideAddressBuilder.toString().length()-1)).equals(',')){
            return brideAddressBuilder.toString().substring(0, brideAddressBuilder.toString().length()-1);
        }
        return brideAddressBuilder.toString();

    }

        private StringBuilder appendIfNotBlank(String v,StringBuilder s,boolean addSemicolon){
            if(StringUtils.isNotBlank(v)){
                s.append(v);
                if(addSemicolon){
                    s.append(", ");
                }
            }
            return  s;
        }
    public String getValueFromMap(String key,Map<String,List<String>> mdmsMap){
        if(StringUtils.isNotBlank(key)&&null!=mdmsMap&&!mdmsMap.isEmpty()){
            return  (mdmsMap.get(key)!=null&&!mdmsMap.get(key).isEmpty())?mdmsMap.get(key).get(0):null;
        }
        return  null;
    }

    public void createCertificateNo(MarriageRegistryRequest marriageRegistryRequest) {
        if (null != marriageRegistryRequest) {
            if (null != marriageRegistryRequest.getMarriageDetails() && marriageRegistryRequest.getMarriageDetails().size() > 0) {
                marriageRegistryRequest.getMarriageDetails().forEach(e-> {


                    RequestInfo requestInfo = marriageRegistryRequest.getRequestInfo();
                    Long currentTime = Long.valueOf(System.currentTimeMillis());
                    String tenantId = marriageRegistryRequest.getMarriageDetails().get(0).getTenantid();

                    List<String> ackNoDetails = idGenRepository.getIdList(requestInfo,
                            tenantId,
                            config.getGetMarriageCertificateName(),
                            e.getModuleCode(),
                            "CER", 1);
                    ListIterator<String> itr = ackNoDetails.listIterator();
                    e.setCertificateNo(itr.next());
//                    e.setDateofIssue(currentTime);
                });
            }
        }
    }


}
