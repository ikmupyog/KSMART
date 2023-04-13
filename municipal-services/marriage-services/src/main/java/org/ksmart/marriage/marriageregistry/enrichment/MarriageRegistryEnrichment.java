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
            }
        });
        setRegistrationNumber(request);
        setBridePermanentAddress(request);
        setBridePresentAddress(request);
        setGroomPermanentAddress(request);
        setGroomPresentAddress(request);
    }

    private void setRegistrationNumber(MarriageRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        List<MarriageRegistryDetails> marriageDetails = request.getMarriageDetails();
        String tenantId = marriageDetails.get(0).getTenantid();

        List<String> filecodes = getIds(requestInfo,
                                tenantId,
                                config.getGetMarriageRegisNumberName(),
                                request.getMarriageDetails().get(0).getModulecode(),
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
    private void setGroomPresentAddress(MarriageRegistryRequest request) {
    
        request.getMarriageDetails()
            .forEach(marriage ->{
                if (marriage.getGroomAddressDetails()!=null) {

                    marriage.getGroomAddressDetails().setPresentUuid(UUID.randomUUID().toString());
                    marriage.getGroomAddressDetails().setBrideGroomPresent("G");
                }

                if (marriage.getGroomAddressDetails() != null && marriage.getGroomAddressDetails().getIsPermanentAddress() != null)  {
                    marriage.getGroomAddressDetails().setIsPermanentAddressInt(marriage.getGroomAddressDetails().getIsPermanentAddress() == true ? 1 : 0);
                    if(marriage.getGroomAddressDetails().getIsPermanentAddress()) {
                        marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getCountryIdPermanent());
                        marriage.getGroomAddressDetails().setStateIdPresent(marriage.getGroomAddressDetails().getStateIdPermanent());
                        if (marriage.getGroomAddressDetails().getCountryIdPermanent().equals(MarriageConstants.COUNTRY_CODE)) {
                            marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPermtaddressCountry());
                            if (marriage.getGroomAddressDetails().getStateIdPresent().equals(MarriageConstants.STATE_CODE_SMALL)) {
                                marriage.getGroomAddressDetails().setPresentaddressStateName(marriage.getGroomAddressDetails().getStateIdPresent());
                            }
                        }
                    }

                    if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null && marriage.getGroomAddressDetails().getPresentaddressStateName() != null) {
                        if (marriage.getGroomAddressDetails().getPresentaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                            if (marriage.getGroomAddressDetails().getPresentaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {
                                if(!marriage.getGroomAddressDetails().getIsPermanentAddress()){
                                    marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentaddressCountry());
                                    marriage.getGroomAddressDetails().setStateIdPresent(marriage.getGroomAddressDetails().getPresentaddressStateName());
                                }

                                marriage.getGroomAddressDetails().setDistrictIdPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());

                                marriage.getGroomAddressDetails().setLocalityEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaLocalityNameEn());
                                marriage.getGroomAddressDetails().setLocalityMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaLocalityNameMl());

                                marriage.getGroomAddressDetails().setStreetNameEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaStreetNameEn());
                                marriage.getGroomAddressDetails().setStreetNameMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaStreetNameMl());

                                marriage.getGroomAddressDetails().setHouseNameNoEnPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaHouseNameEn());
                                marriage.getGroomAddressDetails().setHouseNameNoMlPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaHouseNameMl());

                                marriage.getGroomAddressDetails().setPinNoPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaPincode());
                                marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaCityVilgeEn());
                                marriage.getGroomAddressDetails().setPoNoPresent(marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());


                            }
                            else {
                                if (!marriage.getGroomAddressDetails().getIsPermanentAddress()) {
                                    marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentaddressCountry());
                                    marriage.getGroomAddressDetails().setStateIdPresent(marriage.getGroomAddressDetails().getPresentaddressStateName());
                                }
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


                                marriage.getGroomAddressDetails().setVillageNamePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageName());
                                marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaCityVilgeEn());

                            }
                        }

                        else {
    //                            if (marriage.getGroomAddressDetails().getPresentOutSideCountry() != null) {
                                marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentaddressCountry());
                                marriage.getGroomAddressDetails().setVillageNamePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsVillage());
                                marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsCityTown());


                                marriage.getGroomAddressDetails().setPresentOthrIndiaAdressEn(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressEn());
                                marriage.getGroomAddressDetails().setPresentOthrIndiaAdressMl(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressMl());

                                marriage.getGroomAddressDetails().setPresentOthrIndiaAdressEnB(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressEnB());
                                marriage.getGroomAddressDetails().setPresentOthrIndiaAdressMlB(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressMlB());

                                marriage.getGroomAddressDetails().setPresentOthrIndiaProvinceEn(marriage.getGroomAddressDetails().getPresentOutSideIndiaProvinceEn());
                                marriage.getGroomAddressDetails().setPresentOthrIndiaProvinceMl(marriage.getGroomAddressDetails().getPresentOutSideIndiaProvinceMl());

//                            }
                        }
                    }
                }
            });
    }

    private void setGroomPermanentAddress(MarriageRegistryRequest request) {
        request.getMarriageDetails()
            .forEach(marriage-> {

                if (marriage.getGroomAddressDetails()!=null){
                    if (marriage.getGroomAddressDetails()!=null) {

                        marriage.getGroomAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                        //marriage.getGroomAddressDetails().setPresentUuid(UUID.randomUUID().toString());
                        marriage.getGroomAddressDetails().setBrideGroomPermanent("G");
                        //marriage.getGroomAddressDetails().setBrideGroomPresent("B");
                    }

                    if(marriage.getGroomAddressDetails().getPermtaddressCountry()!=null && marriage.getGroomAddressDetails().getPermtaddressStateName() != null){
                        if (marriage.getGroomAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                            if (marriage.getGroomAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

                                marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());

                                marriage.getGroomAddressDetails().setStateIdPermanent(marriage.getGroomAddressDetails().getPermtaddressStateName());

                                marriage.getGroomAddressDetails().setDistrictIdPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());

                                marriage.getGroomAddressDetails().setLocalityEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                                marriage.getGroomAddressDetails().setLocalityMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameMl());

                                marriage.getGroomAddressDetails().setStreetNameEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn());
                                marriage.getGroomAddressDetails().setStreetNameMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameMl());

                                marriage.getGroomAddressDetails().setHouseNameNoEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn());
                                marriage.getGroomAddressDetails().setHouseNameNoMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameMl());
                                marriage.getGroomAddressDetails().setPinNoPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrPincode());
                                marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                            } else {
                                marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());

                                marriage.getGroomAddressDetails().setStateIdPermanent(marriage.getGroomAddressDetails().getPermtaddressStateName());

                                marriage.getGroomAddressDetails().setDistrictIdPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());

                                marriage.getGroomAddressDetails().setLocalityEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                                marriage.getGroomAddressDetails().setLocalityMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameMl());

                                marriage.getGroomAddressDetails().setStreetNameEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameEn());
                                marriage.getGroomAddressDetails().setStreetNameMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameMl());

                                marriage.getGroomAddressDetails().setHouseNameNoEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameEn());
                                marriage.getGroomAddressDetails().setHouseNameNoMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameMl());

                                marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());

                                marriage.getGroomAddressDetails().setPermntOthrTalukName(marriage.getGroomAddressDetails().getPermntOutsideKeralaTaluk());
                                marriage.getGroomAddressDetails().setPermntOthPostOfficeEn(marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());


                                marriage.getGroomAddressDetails().setPinNoPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaPincode());

                            }
                        }

                        }
                        else {
//                            if (marriage.getGroomAddressDetails().getPermtaddressCountry() != COUNTRY_CODE) {
                                marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());
                                marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaVillage());
                                marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaCityTown());

                                marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                                marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());

                                marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());

                                marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                                marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());

                             marriage.getGroomAddressDetails().setOutSideIndiaPostCodepermanent(marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());



//                            }
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

                if (marriage.getBrideAddressDetails() != null && marriage.getBrideAddressDetails().getIsPermanentAddress() != null)  {
                    marriage.getBrideAddressDetails().setIsPermanentAddressInt(marriage.getBrideAddressDetails().getIsPermanentAddress() == true ? 1 : 0);
                    if(marriage.getBrideAddressDetails().getIsPermanentAddress()) {
                        marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getCountryIdPermanent());
                        marriage.getBrideAddressDetails().setStateIdPresent(marriage.getBrideAddressDetails().getStateIdPermanent());
                        if (marriage.getBrideAddressDetails().getCountryIdPermanent().equals(MarriageConstants.COUNTRY_CODE)) {
                            marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPermtaddressCountry());
                            if (marriage.getBrideAddressDetails().getStateIdPresent().equals(MarriageConstants.STATE_CODE_SMALL)) {
                                    marriage.getBrideAddressDetails().setPresentaddressStateName(marriage.getBrideAddressDetails().getStateIdPresent());
                            }
                        }
                    }

                    if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null && marriage.getBrideAddressDetails().getPresentaddressStateName() != null) {
                        if (marriage.getBrideAddressDetails().getPresentaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                            if (marriage.getBrideAddressDetails().getPresentaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {
                                if(!marriage.getBrideAddressDetails().getIsPermanentAddress()){
                                    marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setStateIdPresent(marriage.getBrideAddressDetails().getPresentaddressStateName());
                                }

                                marriage.getBrideAddressDetails().setDistrictIdPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());

                                marriage.getBrideAddressDetails().setLocalityEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaLocalityNameEn());
                                marriage.getBrideAddressDetails().setLocalityMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaLocalityNameMl());

                                marriage.getBrideAddressDetails().setStreetNameEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaStreetNameEn());
                                marriage.getBrideAddressDetails().setStreetNameMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaStreetNameMl());

                                marriage.getBrideAddressDetails().setHouseNameNoEnPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaHouseNameEn());
                                marriage.getBrideAddressDetails().setHouseNameNoMlPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaHouseNameMl());

                                marriage.getBrideAddressDetails().setPinNoPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaPincode());
                                marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaCityVilgeEn());
                                marriage.getBrideAddressDetails().setPoNoPresent(marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());


                            }
                            else {
                                if (!marriage.getBrideAddressDetails().getIsPermanentAddress()) {
                                    marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setStateIdPresent(marriage.getBrideAddressDetails().getPresentaddressStateName());
                                }
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


                                marriage.getBrideAddressDetails().setVillageNamePresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaVillageName());
                                marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutsideKeralaCityVilgeEn());

                            }
                        }

                        else {
//                            if (marriage.getBrideAddressDetails().getPresentOutSideCountry() != null) {
                                marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentaddressCountry());
                                marriage.getBrideAddressDetails().setVillageNamePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsVillage());
                                marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsCityTown());


                                marriage.getBrideAddressDetails().setPresentOthrIndiaAdressEn(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressEn());
                                marriage.getBrideAddressDetails().setPresentOthrIndiaAdressMl(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressMl());

                                marriage.getBrideAddressDetails().setPresentOthrIndiaAdressEnB(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressEnB());
                                marriage.getBrideAddressDetails().setPresentOthrIndiaAdressMlB(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressMlB());

                                marriage.getBrideAddressDetails().setPresentOthrIndiaProvinceEn(marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceEn());
                                marriage.getBrideAddressDetails().setPresentOthrIndiaProvinceMl(marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceMl());




//                            }
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

                       if(marriage.getBrideAddressDetails().getPermtaddressCountry()!=null && marriage.getBrideAddressDetails().getPermtaddressStateName() != null){
                           if (marriage.getBrideAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                               if (marriage.getBrideAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {

                                   marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());

                                   marriage.getBrideAddressDetails().setStateIdPermanent(marriage.getBrideAddressDetails().getPermtaddressStateName());

                                   marriage.getBrideAddressDetails().setDistrictIdPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());

                                   marriage.getBrideAddressDetails().setLocalityEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                                   marriage.getBrideAddressDetails().setLocalityMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameMl());

                                   marriage.getBrideAddressDetails().setStreetNameEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameEn());
                                   marriage.getBrideAddressDetails().setStreetNameMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameMl());

                                   marriage.getBrideAddressDetails().setHouseNameNoEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameEn());
                                   marriage.getBrideAddressDetails().setHouseNameNoMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameMl());
                                   marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrPincode());
                                   marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
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

                                   marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage());

                                   marriage.getBrideAddressDetails().setPermntOthrTalukName(marriage.getBrideAddressDetails().getPermntOutsideKeralaTaluk());
                                   marriage.getBrideAddressDetails().setPermntOthPostOfficeEn(marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());


                                   marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaPincode());
                               }
                               }
                            }
                           else {
//                               if (marriage.getBrideAddressDetails().getPermtaddressCountry() != COUNTRY_CODE) {
                                   marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());
                                   marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaVillage());
                                   marriage.getBrideAddressDetails().setTownOrVillagePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaCityTown());

                                   marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
                                   marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneMl());

                                   marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                   marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoMl());

                                   marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                                   marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());

                                marriage.getBrideAddressDetails().setOutSideIndiaPostCodepermanent(marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());

//                               }
                           }

                   }
            });
    }

    public void enrichUpdate(MarriageRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        request.getMarriageDetails()
                .forEach(marriage -> marriage.setAuditDetails(auditDetails));
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


            if (registryDetails.getGroomAddressDetails().getPermtaddressCountry() != null && registryDetails.getGroomAddressDetails().getPermtaddressStateName() != null) {
                if (registryDetails.getGroomAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                    if (registryDetails.getGroomAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {


                        Object mdmsGroomAddressData = util.mDMSCallGetAddress(req
                                , registryDetails.getGroomAddressDetails().getPermntInKeralaAdrLBName()
                                , registryDetails.getGroomAddressDetails().getDistrictIdPermanent()
                                , registryDetails.getGroomAddressDetails().getStateIdPermanent()
                                , registryDetails.getGroomAddressDetails().getCountryIdPermanent()
                                , registryDetails.getGroomAddressDetails().getPoNoPermanent()
                                , registryDetails.getGroomAddressDetails().getVillageNamePermanent()
                                , registryDetails.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                        Map<String,List<String>> mdmsGroomAddressMap = util.getMarriageMDMSData(mdmsGroomAddressData);
                        registryDetails.getGroomAddressDetails().setPermntInKeralaAdrLBName(getValueFromMap(MarriageConstants.TENANTS,mdmsGroomAddressMap));
                        registryDetails.getGroomAddressDetails().setDistrictIdPresent(getValueFromMap(MarriageConstants.DISTRICT,mdmsGroomAddressMap));
                        registryDetails.getGroomAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE,mdmsGroomAddressMap));
                        registryDetails.getGroomAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY,mdmsGroomAddressMap));
                        registryDetails.getGroomAddressDetails().setPoNoPermanent(getValueFromMap(MarriageConstants.POSTOFFICE,mdmsGroomAddressMap));
                        registryDetails.getGroomAddressDetails().setVillageNamePermanent(getValueFromMap(MarriageConstants.VILLAGE,mdmsGroomAddressMap));
                        registryDetails.getGroomAddressDetails().setPermntInKeralaAdrTaluk(getValueFromMap(MarriageConstants.TALUK,mdmsGroomAddressMap));

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn(),groomAddressBuilder,true);

                        appendIfNotBlank(getValueFromMap(MarriageConstants.POSTOFFICE,mdmsGroomAddressMap),groomAddressBuilder,true);

                        appendIfNotBlank(getValueFromMap(MarriageConstants.DISTRICT,mdmsGroomAddressMap),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressStateName(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressCountry(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrPincode(),groomAddressBuilder,false);

//                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn(),groomAddressBuilder,true);
//
//                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn(),groomAddressBuilder,true);
//
//                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn(),groomAddressBuilder,true);
//
//                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrPostOffice(),groomAddressBuilder,true);
//
//                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrDistrict(),groomAddressBuilder,true);
//
//                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressStateName(),groomAddressBuilder,true);
//
//                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressCountry(),groomAddressBuilder,true);
//
//                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntInKeralaAdrPincode(),groomAddressBuilder,false);



                    } else {

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaHouseNameEn(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaStreetNameEn(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameEn(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaDistrict(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressStateName(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressCountry(),groomAddressBuilder,true);

                        appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOutsideKeralaPincode(),groomAddressBuilder,false);


                    }
                }

            } else {
                appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn(),groomAddressBuilder,true);

                appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermanentOutsideIndiaPostCode(),groomAddressBuilder,true);

                appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn(),groomAddressBuilder,true);

                appendIfNotBlank(registryDetails.getGroomAddressDetails().getPermtaddressCountry(),groomAddressBuilder,false);




            }

        }
        return groomAddressBuilder.toString();

    }
    public String setBridePermanentAddressForCertificate(RequestInfo req,MarriageRegistryDetails registryDetails) {

        StringBuilder brideAddressBuilder = new StringBuilder();
        if (registryDetails.getBrideAddressDetails() != null) {


            if (registryDetails.getBrideAddressDetails().getPermtaddressCountry() != null && registryDetails.getBrideAddressDetails().getPermtaddressStateName() != null) {
                if (registryDetails.getBrideAddressDetails().getPermtaddressCountry().equals(MarriageConstants.COUNTRY_CODE)) {
                    if (registryDetails.getBrideAddressDetails().getPermtaddressStateName().equals(MarriageConstants.STATE_CODE_SMALL)) {


                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrHouseNameEn(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrStreetNameEn(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameEn(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrPostOffice(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrDistrict(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressStateName(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressCountry(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntInKeralaAdrPincode(),brideAddressBuilder,false);



                    } else {

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaHouseNameEn(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaStreetNameEn(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameEn(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaDistrict(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressStateName(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressCountry(),brideAddressBuilder,true);

                         appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOutsideKeralaPincode(),brideAddressBuilder,false);


                    }
                }

            } else {
                 appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn(),brideAddressBuilder,true);

                 appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermanentOutsideIndiaPostCode(),brideAddressBuilder,true);

                 appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn(),brideAddressBuilder,true);

                 appendIfNotBlank(registryDetails.getBrideAddressDetails().getPermtaddressCountry(),brideAddressBuilder,false);


            }


        }
        return brideAddressBuilder.toString();

    }

        private StringBuilder appendIfNotBlank(String v,StringBuilder s,boolean addSemicolon){
            if(StringUtils.isNotBlank(v)){
                s.append(v);
                if(addSemicolon){
                    s.append(",");
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

}
