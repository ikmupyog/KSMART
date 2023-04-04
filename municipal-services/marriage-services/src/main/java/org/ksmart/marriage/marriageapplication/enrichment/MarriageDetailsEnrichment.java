package org.ksmart.marriage.marriageapplication.enrichment;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.primitives.ImmutableDoubleArray;
import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.common.repository.IdGenRepository;
import org.ksmart.marriage.common.repository.ServiceRequestRepository;
import org.ksmart.marriage.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.Demand.Demand;
import org.ksmart.marriage.marriageapplication.model.Demand.DemandRequest;
import org.ksmart.marriage.marriageapplication.model.Demand.DemandResponse;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDocument;
import org.ksmart.marriage.utils.IDGenerator;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.enums.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ListIterator;
import java.util.UUID;
@Component
public class MarriageDetailsEnrichment implements BaseEnrichment {
    
    @Autowired
    MarriageApplicationConfiguration config;

    @Autowired
    IdGenRepository idGenRepository;

    @Autowired
    IDGenerator idGenerator;

    @Autowired
    ServiceRequestRepository serviceRequestRepository;

    @Autowired
	@Qualifier("objectMapperBnd")
	private ObjectMapper mapper;

    public void enrichCreate(MarriageDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getMarriageDetails().forEach(marriage -> {
            marriage.setId(UUID.randomUUID().toString());
            marriage.setAuditDetails(auditDetails);
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
            List <MarriageDocument> marriagedocument = marriage.getMarriageDocuments();
            if (marriagedocument!=null){
                marriagedocument.forEach(document -> {
                document.setId(UUID.randomUUID().toString());
                document.setActive(true);
                document.setMarriageTenantid(marriage.getTenantid());
                document.setMarriageId(marriage.getId());
                document.setMarriageDocAuditDetails(auditDetails);
               
                });
            }
        });
        setApplicationNumbers(request);
        setBridePermanentAddress(request);
        setBridePresentAddress(request);
        setGroomPermanentAddress(request);
        setGroomPresentAddress(request);
    }
    public void enrichUpdate(MarriageDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        request.getMarriageDetails()
                .forEach(marriage -> marriage.setAuditDetails(auditDetails));

         setRegistrationNumber(request);
        setBridePermanentAddress(request);
        setBridePresentAddress(request);
        setGroomPermanentAddress(request);
        setGroomPresentAddress(request);
    }

    private void setGroomPresentAddress(MarriageDetailsRequest request) {
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
                            if (marriage.getGroomAddressDetails().getCountryIdPermanent().contains(MarriageConstants.COUNTRY_CODE)) {
                                marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPermtaddressCountry());
                                if (marriage.getGroomAddressDetails().getStateIdPresent().contains(MarriageConstants.STATE_CODE_SMALL)) {
                                    marriage.getGroomAddressDetails().setPresentaddressStateName(marriage.getGroomAddressDetails().getStateIdPresent());
                                }
                            }
                        }

                        if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null && marriage.getGroomAddressDetails().getPresentaddressStateName() != null) {
                            if (marriage.getGroomAddressDetails().getPresentaddressCountry().contains(MarriageConstants.COUNTRY_CODE)) {
                                if (marriage.getGroomAddressDetails().getPresentaddressStateName().contains(MarriageConstants.STATE_CODE_SMALL)) {
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


                                    marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutsideKeralaCityVilgeEn());

                                }
                            }

                            else {
                                if (marriage.getGroomAddressDetails().getPresentOutSideCountry() != null) {
                                    marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPresentOutSideCountry());
                                    marriage.getGroomAddressDetails().setVillageNamePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsVillage());
                                    marriage.getGroomAddressDetails().setTownOrVillagePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaadrsCityTown());

                                    marriage.getGroomAddressDetails().setOutSideIndiaPostCodePresent(marriage.getGroomAddressDetails().getPresentOutSideIndiaPostCode());

                                    marriage.getGroomAddressDetails().setPresentOthrIndiaAdressEn(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressEn());
                                    marriage.getGroomAddressDetails().setPresentOthrIndiaAdressMl(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressMl());

                                    marriage.getGroomAddressDetails().setPresentOthrIndiaAdressEnB(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressEnB());
                                    marriage.getGroomAddressDetails().setPresentOthrIndiaAdressMlB(marriage.getGroomAddressDetails().getPresentOutSideIndiaAdressMlB());

                                    marriage.getGroomAddressDetails().setPresentOthrIndiaProvinceEn(marriage.getGroomAddressDetails().getPresentOutSideIndiaProvinceEn());
                                    marriage.getGroomAddressDetails().setPresentOthrIndiaProvinceMl(marriage.getGroomAddressDetails().getPresentOutSideIndiaProvinceMl());

                                }
                            }
                        }



                    }


                });




    }

    private void setGroomPermanentAddress(MarriageDetailsRequest request) {
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
                            if (marriage.getGroomAddressDetails().getPermtaddressCountry().contains(MarriageConstants.COUNTRY_CODE)) {
                                if (marriage.getGroomAddressDetails().getPermtaddressStateName().contains(MarriageConstants.STATE_CODE_SMALL)) {

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
                                    marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaCityVilgeEn());

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
                            else {
                                if (marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry() != null) {
                                    marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry());
                                    marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaVillage());
                                    marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaCityTown());

                                    marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                                    marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());

                                    marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                    marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());

                                    marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                                    marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());

                                    marriage.getGroomAddressDetails().setOutSideIndiaPostCodepermanent(marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());



                                }
                            }

                        }

                    }

                });

    }

    private void setBridePresentAddress(MarriageDetailsRequest request) {
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
                            if (marriage.getBrideAddressDetails().getCountryIdPermanent().contains(MarriageConstants.COUNTRY_CODE)) {
                                marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPermtaddressCountry());
                                if (marriage.getBrideAddressDetails().getStateIdPresent().contains(MarriageConstants.STATE_CODE_SMALL)) {
                                        marriage.getBrideAddressDetails().setPresentaddressStateName(marriage.getBrideAddressDetails().getStateIdPresent());

                                }
                            }
                        }

                        if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null && marriage.getBrideAddressDetails().getPresentaddressStateName() != null) {
                            if (marriage.getBrideAddressDetails().getPresentaddressCountry().contains(MarriageConstants.COUNTRY_CODE)) {
                                if (marriage.getBrideAddressDetails().getPresentaddressStateName().contains(MarriageConstants.STATE_CODE_SMALL)) {
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
                                if (marriage.getBrideAddressDetails().getPresentOutSideCountry() != null) {
                                    marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPresentOutSideCountry());
                                    marriage.getBrideAddressDetails().setVillageNamePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsVillage());
                                    marriage.getBrideAddressDetails().setTownOrVillagePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaadrsCityTown());


                                    marriage.getBrideAddressDetails().setPresentOthrIndiaAdressEn(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressEn());
                                    marriage.getBrideAddressDetails().setPresentOthrIndiaAdressMl(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressMl());

                                    marriage.getBrideAddressDetails().setPresentOthrIndiaAdressEnB(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressEnB());
                                    marriage.getBrideAddressDetails().setPresentOthrIndiaAdressMlB(marriage.getBrideAddressDetails().getPresentOutSideIndiaAdressMlB());

                                    marriage.getBrideAddressDetails().setPresentOthrIndiaProvinceEn(marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceEn());
                                    marriage.getBrideAddressDetails().setPresentOthrIndiaProvinceMl(marriage.getBrideAddressDetails().getPresentOutSideIndiaProvinceMl());

                                    marriage.getBrideAddressDetails().setOutSideIndiaPostCodePresent(marriage.getBrideAddressDetails().getPresentOutSideIndiaPostCode());



                                }
                            }
                                }



                    }


        });



    }

    private void setBridePermanentAddress(MarriageDetailsRequest request) {
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
                               if (marriage.getBrideAddressDetails().getPermtaddressCountry().contains(MarriageConstants.COUNTRY_CODE)) {
                                   if (marriage.getBrideAddressDetails().getPermtaddressStateName().contains(MarriageConstants.STATE_CODE_SMALL)) {

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

                                       marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage());

                                        marriage.getBrideAddressDetails().setPermntOthrTalukName(marriage.getBrideAddressDetails().getPermntOutsideKeralaTaluk());
                                       marriage.getBrideAddressDetails().setPermntOthPostOfficeEn(marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());


                                       marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaPincode());

                                   }


                                   }
                               else {
                                   if (marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry() != null) {
                                       marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry());
                                       marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaVillage());
                                       marriage.getBrideAddressDetails().setTownOrVillagePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaCityTown());

                                       marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
                                       marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneMl());

                                       marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                       marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoMl());

                                       marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                                       marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());


                                       marriage.getBrideAddressDetails().setOutSideIndiaPostCodepermanent(marriage.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());


                                   }
                               }

                               }

                       }

                });

        }


     private void setRegistrationNumber(MarriageDetailsRequest request) {

         RequestInfo requestInfo = request.getRequestInfo();
         List<MarriageApplicationDetails> marriageDetails = request.getMarriageDetails();
         String tenantId = marriageDetails.get(0)
                 .getTenantid();

         List<String> filecodes = getIds(requestInfo,
                 tenantId,
                 config.getGetMarriageRegisNumberName(),
                 request.getMarriageDetails().get(0).getApplicationtype(),
                 "REG",
                 marriageDetails.size());
         validateFileCodes(filecodes, marriageDetails.size());
         Long currentTime = Long.valueOf(System.currentTimeMillis());
         ListIterator<String> itr = filecodes.listIterator();
         request.getMarriageDetails()
                 .forEach(marriage -> {
                    // if((marriage.getStatus().equals("APPROVED"))&&(marriage.getAction().equals("APPROVE"))) {
                         marriage.setRegistrationno(itr.next());
                         marriage.setRegistrationDate(currentTime);
                    // }
                 });
     }

//     private void setFileNumbers(MarriageDetailsRequest request) {

//         RequestInfo requestInfo = request.getRequestInfo();
//         List<MarriageApplicationDetails> marriageDetails = request.getMarriageDetails();
//         String tenantId = marriageDetails.get(0)
//                 .getTenantid();
//         System.out.println(("request"+request));

//         List<String> filecodes = getIds(requestInfo,
//                 tenantId,
//                 config.getMarriageFileNumberName(),
//                 request.getMarriageDetails().get(0).getApplicationtype(),
//                 "FILE",
//                 marriageDetails.size());
//         validateFileCodes(filecodes, marriageDetails.size());
//         Long currentTime = Long.valueOf(System.currentTimeMillis());
//         ListIterator<String> itr = filecodes.listIterator();
//         request.getMarriageDetails()
//                 .forEach(marriage -> {
// //                    marriage.setFileno(itr.next());
// //                    marriage.setFile_date(currentTime);
//                 });
//     }

    private void setApplicationNumbers(MarriageDetailsRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<MarriageApplicationDetails> marriageDetails = request.getMarriageDetails();
        String tenantId = marriageDetails.get(0)
                .getTenantid();
        List<String> filecodes = getIds(requestInfo,
                tenantId,
                config.getMarriageApplNumberIdName(),
                request.getMarriageDetails().get(0).getModulecode(),
                "APPL",
                marriageDetails.size());
        validateFileCodes(filecodes, marriageDetails.size());

        ListIterator<String> itr = filecodes.listIterator();
        request.getMarriageDetails()
                .forEach(marriage -> {
                    marriage.setApplicationNumber(itr.next());
                    List <MarriageDocument> marriagedocument = marriage.getMarriageDocuments();
                        if (marriagedocument!=null){
                            marriagedocument
                            .forEach(document -> {
                            document.setApplicationNumber(marriage.getApplicationNumber());
                            });
                        }
                    
                });
    }


//Jasmine 30.03.2023
    public List<Demand> saveDemand(RequestInfo requestInfo, List<Demand> demands){
        StringBuilder url = new StringBuilder(config.getBillingHost());
        url.append(config.getDemandCreateEndpoint());
        DemandRequest request = new DemandRequest(requestInfo,demands);
        Object result = serviceRequestRepository.fetchResult(url,request);
        DemandResponse response = null;
        try{
            response = mapper.convertValue(result,DemandResponse.class);
        }
        catch(IllegalArgumentException e){
            throw new CustomException("PARSING ERROR","Failed to parse response of create demand");
        }
        return response.getDemands();
    }

//        private void setApplicationNumbers(MarriageDetailsRequest request) {
//            Long currentTime = Long.valueOf(System.currentTimeMillis());
//            String id = idGenerator.setIDGeneratorStill(request, MarriageConstants.FUN_MODULE_NEW,MarriageConstants.APP_NUMBER_CAPTION);
//            request.getMarriageDetails()
//                    .forEach(marriage -> {
//                        marriage.setApplicationnumber(id);
//                        marriage.
//                    setDateofreporting(currentTime);
//                    });
//        }





    private List<String> getIds(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String fnType, int count) {
        return idGenRepository.getIdList(requestInfo, tenantId, idName, moduleCode, fnType, count);
    }

    private void validateFileCodes(List<String> fileCodes, int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(ErrorCodes.IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }

    }
}
