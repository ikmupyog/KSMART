package org.ksmart.death.deathapplication.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedRequest;
import org.ksmart.death.deathapplication.web.models.DeathAddressInfo;
import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACRequest;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathStatisticalInfo;
import org.ksmart.death.deathregistry.web.models.DeathRegistryAddressInfo;
import org.ksmart.death.deathregistry.web.models.DeathRegistryInformantDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryFamilyInfo;
import org.ksmart.death.deathregistry.web.models.DeathRegistryBasicInfo;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryStatisticalInfo;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionRequest;







import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
/**
     * Creates CrDeathRegistryRequestService
     * Jasmine 
     * on 19/01/2023
     */
@Slf4j
@Service
public class DeathRegistryRequestService {

    public DeathRegistryRequest createRegistryRequest( DeathDtlRequest deathrequest ){

        RequestInfo requestInfo = deathrequest.getRequestInfo();
        DeathRegistryRequest request = new DeathRegistryRequest();
        List<DeathDtl> deathDtls = deathrequest.getDeathCertificateDtls();
        List<DeathRegistryDtl> deathRegistryDetails =  new LinkedList<>();
        DeathRegistryDtl deathRegistryReading =  new DeathRegistryDtl();
        deathDtls.forEach(deathdet->{  

            if  (deathdet.getDeathBasicInfo()!=null){
                deathRegistryReading.setDeathBasicInfo(createRegistryBasicInfo(deathrequest));
            } 
            if  (deathdet.getDeathStatisticalInfo()!=null){
                deathRegistryReading.setDeathStatisticalInfo(createRegistryStatisticalInfo(deathrequest));
            }
            if  (deathdet.getDeathFamilyInfo()!=null){
                deathRegistryReading.setDeathFamilyInfo(createRegistryFamilyInfo(deathrequest));
            }
            if  (deathdet.getDeathAddressInfo()!=null){
                deathRegistryReading.setDeathAddressInfo(createRegistryAddress(deathrequest));
            }
            if  (deathdet.getDeathInformantDtls()!=null){
                deathRegistryReading.setDeathInformantDtls(createRegistryInformantDtls(deathrequest));
            }
            deathRegistryDetails.add(deathRegistryReading);
        });
         request = DeathRegistryRequest
                    .builder()
                    .requestInfo(requestInfo)                                                            
                    .deathCertificateDtls(deathRegistryDetails)
                    .build();
       
        return  request;
    }


    public DeathRegistryBasicInfo createRegistryBasicInfo(DeathDtlRequest deathrequest){

            DeathRegistryBasicInfo deathRegistryBasicInfo=new DeathRegistryBasicInfo();
            DeathBasicInfo deathBasicInfo = deathrequest.getDeathCertificateDtls().get(0).getDeathBasicInfo();
            
   
            deathRegistryBasicInfo.setRegistrationUnit(deathBasicInfo.getRegistrationUnit());
            deathRegistryBasicInfo.setDateOfDeath(deathBasicInfo.getDateOfDeath());
            deathRegistryBasicInfo.setTimeOfDeath(deathBasicInfo.getTimeOfDeath());
            deathRegistryBasicInfo.setTenantId(deathBasicInfo.getTenantId());
            deathRegistryBasicInfo.setRegistrationUnit(deathBasicInfo.getRegistrationUnit());
            deathRegistryBasicInfo.setDateOfDeath(deathBasicInfo.getDateOfDeath());
            deathRegistryBasicInfo.setTimeOfDeath(deathBasicInfo.getTimeOfDeath());
            deathRegistryBasicInfo.setTimeOfDeathUnit(deathBasicInfo.getTimeOfDeathUnit());
            deathRegistryBasicInfo.setDeathPlace(deathBasicInfo.getDeathPlace());
            deathRegistryBasicInfo.setDeathPlaceType(deathBasicInfo.getDeathPlaceType());
            deathRegistryBasicInfo.setDeathPlaceInstId(deathBasicInfo.getDeathPlaceInstId());
            deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
            deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
            deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
            deathRegistryBasicInfo.setVehicleFromplaceMl(deathBasicInfo.getVehicleFromplaceMl());
            deathRegistryBasicInfo.setVehicleToPlaceEn(deathBasicInfo.getVehicleToPlaceEn());
            deathRegistryBasicInfo.setVehicleToPlaceMl(deathBasicInfo.getVehicleToPlaceMl());
            deathRegistryBasicInfo.setVehicleFirstHaltEn(deathBasicInfo.getVehicleFirstHaltEn());
            deathRegistryBasicInfo.setVehicleFirstHaltMl(deathBasicInfo.getVehicleFirstHaltMl());
            deathRegistryBasicInfo.setVehicleHospitalEn(deathBasicInfo.getVehicleHospitalEn());
            deathRegistryBasicInfo.setDeathPlaceCountry(deathBasicInfo.getDeathPlaceCountry());
            deathRegistryBasicInfo.setDeathPlaceState(deathBasicInfo.getDeathPlaceState());
            deathRegistryBasicInfo.setDeathPlaceDistrict(deathBasicInfo.getDeathPlaceDistrict());
            deathRegistryBasicInfo.setDeathPlaceCity(deathBasicInfo.getDeathPlaceCity());
            deathRegistryBasicInfo.setDeathPlaceRemarksEn(deathBasicInfo.getDeathPlaceRemarksEn());
            deathRegistryBasicInfo.setDeathPlaceRemarksMl(deathBasicInfo.getDeathPlaceRemarksMl());
            deathRegistryBasicInfo.setDeathPlaceWardId(deathBasicInfo.getDeathPlaceWardId());
            deathRegistryBasicInfo.setPlaceOfBurialEn(deathBasicInfo.getPlaceOfBurialEn());
            deathRegistryBasicInfo.setPlaceOfBurialMl(deathBasicInfo.getPlaceOfBurialMl());
            deathRegistryBasicInfo.setDeathPlaceLocalityEn(deathBasicInfo.getDeathPlaceLocalityEn());
            deathRegistryBasicInfo.setDeathPlaceLocalityMl(deathBasicInfo.getDeathPlaceLocalityMl());
            deathRegistryBasicInfo.setDeathPlaceStreetEn(deathBasicInfo.getDeathPlaceStreetEn());
            deathRegistryBasicInfo.setDeathPlaceStreetMl(deathBasicInfo.getDeathPlaceStreetMl());
            deathRegistryBasicInfo.setGeneralRemarks(deathBasicInfo.getGeneralRemarks());
            deathRegistryBasicInfo.setDeathPlaceHomeId(deathBasicInfo.getDeathPlaceHomeId());
            deathRegistryBasicInfo.setDeathDtlId(deathBasicInfo.getDeathDtlId());
            deathRegistryBasicInfo.setDeathPlaceHomeAddrTypeId(deathBasicInfo.getDeathPlaceHomeAddrTypeId());
            deathRegistryBasicInfo.setDeathPlaceHomeCountryId(deathBasicInfo.getDeathPlaceHomeCountryId());
            deathRegistryBasicInfo.setDeathPlaceHomeStateId(deathBasicInfo.getDeathPlaceHomeStateId());
            deathRegistryBasicInfo.setDeathPlaceHomeDistrictId(deathBasicInfo.getDeathPlaceHomeDistrictId());
            deathRegistryBasicInfo.setDeathPlaceHomeTalukId(deathBasicInfo.getDeathPlaceHomeTalukId());
            deathRegistryBasicInfo.setDeathPlaceHomeVillageId(deathBasicInfo.getDeathPlaceHomeVillageId());
            deathRegistryBasicInfo.setDeathPlaceHomeLbType(deathBasicInfo.getDeathPlaceHomeLbType());
            deathRegistryBasicInfo.setDeathPlaceHomeWardId(deathBasicInfo.getDeathPlaceHomeWardId());
            deathRegistryBasicInfo.setDeathPlaceHomePostofficeId(deathBasicInfo.getDeathPlaceHomePostofficeId());
            deathRegistryBasicInfo.setDeathPlaceHomePincode(deathBasicInfo.getDeathPlaceHomePincode());
            deathRegistryBasicInfo.setDeathPlaceHomeLocalityEn(deathBasicInfo.getDeathPlaceHomeLocalityEn());
            deathRegistryBasicInfo.setDeathPlaceHomeLocalityMl(deathBasicInfo.getDeathPlaceHomeLocalityMl());
            deathRegistryBasicInfo.setDeathPlaceHomeStreetNameEn(deathBasicInfo.getDeathPlaceHomeStreetNameEn());
            deathRegistryBasicInfo.setDeathPlaceHomeStreetNameMl(deathBasicInfo.getDeathPlaceHomeStreetNameMl());
            deathRegistryBasicInfo.setDeathPlaceHomeHoueNameEn(deathBasicInfo.getDeathPlaceHomeHoueNameEn());
            deathRegistryBasicInfo.setDeathPlaceHomeHoueNameMl(deathBasicInfo.getDeathPlaceHomeHoueNameMl());
            deathRegistryBasicInfo.setDeceasedAadharNotAvailable(deathBasicInfo.getDeceasedAadharNotAvailable());
            deathRegistryBasicInfo.setDeceasedAadharNumber(deathBasicInfo.getDeceasedAadharNumber());
            deathRegistryBasicInfo.setDeceasedIdproofType(deathBasicInfo.getDeceasedIdproofType());
            deathRegistryBasicInfo.setDeceasedIdproofNo(deathBasicInfo.getDeceasedIdproofNo());
            deathRegistryBasicInfo.setDeceasedFirstNameEn(deathBasicInfo.getDeceasedFirstNameEn());
            deathRegistryBasicInfo.setDeceasedMiddleNameEn(deathBasicInfo.getDeceasedMiddleNameEn());
            deathRegistryBasicInfo.setDeceasedLastNameEn(deathBasicInfo.getDeceasedLastNameEn());
            deathRegistryBasicInfo.setDeceasedFirstNameMl(deathBasicInfo.getDeceasedFirstNameMl());
            deathRegistryBasicInfo.setDeceasedMiddleNameMl(deathBasicInfo.getDeceasedMiddleNameMl());
            deathRegistryBasicInfo.setDeceasedLastNameMl(deathBasicInfo.getDeceasedLastNameMl());
            deathRegistryBasicInfo.setAge(deathBasicInfo.getAge());
            deathRegistryBasicInfo.setAgeUnit(deathBasicInfo.getAgeUnit());
            deathRegistryBasicInfo.setDeceasedGender(deathBasicInfo.getDeceasedGender());
            deathRegistryBasicInfo.setNationality(deathBasicInfo.getNationality());
            deathRegistryBasicInfo.setReligion(deathBasicInfo.getReligion());
            deathRegistryBasicInfo.setOccupation(deathBasicInfo.getOccupation());
            deathRegistryBasicInfo.setDeathACKNo(deathBasicInfo.getDeathACKNo());
            deathRegistryBasicInfo.setFuncionUID(deathBasicInfo.getFuncionUID());
            return deathRegistryBasicInfo;
        
    }
    public DeathRegistryStatisticalInfo createRegistryStatisticalInfo(DeathDtlRequest deathrequest){

        DeathStatisticalInfo statisticalDtls = deathrequest.getDeathCertificateDtls().get(0).getDeathStatisticalInfo();
        DeathRegistryStatisticalInfo registryStatisticalInfo = new DeathRegistryStatisticalInfo();
        registryStatisticalInfo.setDeathDtlId(statisticalDtls.getDeathDtlId());
        registryStatisticalInfo.setTenantId(statisticalDtls.getTenantId());
        registryStatisticalInfo.setMedicalAttentionType(statisticalDtls.getMedicalAttentionType());
        registryStatisticalInfo.setIsAutopsyPerformed(statisticalDtls.getIsAutopsyPerformed());
        registryStatisticalInfo.setIsAutopsyCompleted(statisticalDtls.getIsAutopsyCompleted());
        registryStatisticalInfo.setMannerOfDeath(statisticalDtls.getMannerOfDeath());
        registryStatisticalInfo.setDeathMedicallyCertified(statisticalDtls.getDeathMedicallyCertified());
        registryStatisticalInfo.setDeathCauseMain(statisticalDtls.getDeathCauseMain());
        registryStatisticalInfo.setDeathCauseMainCustom(statisticalDtls.getDeathCauseMainCustom());
        registryStatisticalInfo.setDeathCauseMainInterval(statisticalDtls.getDeathCauseMainInterval());
        registryStatisticalInfo.setDeathCauseMainTimeUnit(statisticalDtls.getDeathCauseMainTimeUnit());
        registryStatisticalInfo.setDeathCauseSub(statisticalDtls.getDeathCauseSub());
        registryStatisticalInfo.setDeathCauseSubCustom(statisticalDtls.getDeathCauseSubCustom());
        registryStatisticalInfo.setDeathCauseSubInterval(statisticalDtls.getDeathCauseSubInterval());
        registryStatisticalInfo.setDeathCauseSubTimeUnit(statisticalDtls.getDeathCauseSubTimeUnit());
        registryStatisticalInfo.setDeathCauseSub2(statisticalDtls.getDeathCauseSub2());
        registryStatisticalInfo.setDeathCauseSubCustom2(statisticalDtls.getDeathCauseSubCustom2());
        registryStatisticalInfo.setDeathCauseSubInterval2(statisticalDtls.getDeathCauseSubInterval2());
        registryStatisticalInfo.setDeathCauseSubTimeUnit2(statisticalDtls.getDeathCauseSubTimeUnit2());
        registryStatisticalInfo.setDeathCauseOther(statisticalDtls.getDeathCauseOther());
        registryStatisticalInfo.setIsdeceasedPregnant(statisticalDtls.getIsdeceasedPregnant());
        registryStatisticalInfo.setIsDelivery(statisticalDtls.getIsDelivery());
        registryStatisticalInfo.setDeathDuringDelivery(statisticalDtls.getDeathDuringDelivery());
        registryStatisticalInfo.setSmokingType(statisticalDtls.getSmokingType());
        registryStatisticalInfo.setTobaccoType(statisticalDtls.getTobaccoType());
        registryStatisticalInfo.setAlcoholType(statisticalDtls.getAlcoholType());
        return registryStatisticalInfo;
        
    }
    public DeathRegistryAddressInfo createRegistryAddress(DeathDtlRequest deathrequest){

        DeathAddressInfo deathAddress = deathrequest.getDeathCertificateDtls().get(0).getDeathAddressInfo();
        DeathRegistryAddressInfo registryAddress = new DeathRegistryAddressInfo();
        registryAddress.setPresentAddrId(deathAddress.getPresentAddrId());
        registryAddress.setPresentAddrDeathDtlId(deathAddress.getPresentAddrDeathDtlId());
        registryAddress.setPresentAddrTenantId(deathAddress.getPresentAddrTenantId());
        registryAddress.setPresentAddrTypeId(deathAddress.getPresentAddrTypeId());
        registryAddress.setPresentAddrLocationType(deathAddress.getPresentAddrLocationType());
        registryAddress.setPresentAddrCountryId(deathAddress.getPresentAddrCountryId());
        registryAddress.setPresentAddrStateId(deathAddress.getPresentAddrStateId());
        registryAddress.setPresentAddrDistrictId(deathAddress.getPresentAddrDistrictId());
        registryAddress.setPresentAddrTalukId(deathAddress.getPresentAddrTalukId());
        registryAddress.setPresentAddrVillageId(deathAddress.getPresentAddrVillageId());
        registryAddress.setPresentAddrLbType(deathAddress.getPresentAddrLbType());
        registryAddress.setPresentAddrWardId(deathAddress.getPresentAddrWardId());
        registryAddress.setPresentAddrPostofficeId(deathAddress.getPresentAddrPostofficeId());
        registryAddress.setPresentAddrPincode(deathAddress.getPresentAddrPincode());
        registryAddress.setPresentAddrLocalityEn(deathAddress.getPresentAddrLocalityEn());
        registryAddress.setPresentAddrLocalityMl(deathAddress.getPresentAddrLocalityMl());
        registryAddress.setPresentAddrStreetNameEn(deathAddress.getPresentAddrStreetNameEn());
        registryAddress.setPresentAddrStreetNameMl(deathAddress.getPresentAddrStreetNameMl());
        registryAddress.setPresentAddrHoueNameEn(deathAddress.getPresentAddrHoueNameEn());
        registryAddress.setPresentAddrHoueNameMl(deathAddress.getPresentAddrHoueNameMl());
        registryAddress.setPresentAddrPostalCode(deathAddress.getPresentAddrPostalCode());
        registryAddress.setPermanentAddrId(deathAddress.getPermanentAddrId());
        registryAddress.setPermanentAddrDeathDtlId(deathAddress.getPermanentAddrDeathDtlId());
        registryAddress.setPermanentAddrTenantId(deathAddress.getPermanentAddrTenantId());
        registryAddress.setPermanentAddrTypeId(deathAddress.getPermanentAddrTypeId());
        registryAddress.setPermanentAddrCountryId(deathAddress.getPermanentAddrCountryId());
        registryAddress.setPermanentAddrStateId(deathAddress.getPermanentAddrStateId());
        registryAddress.setPermanentAddrDistrictId(deathAddress.getPermanentAddrDistrictId());
        registryAddress.setPermanentAddrTalukId(deathAddress.getPermanentAddrTalukId());
        registryAddress.setPermanentAddrVillageId(deathAddress.getPermanentAddrVillageId());
        registryAddress.setPermanentAddrLbType(deathAddress.getPermanentAddrLbType());
        registryAddress.setPermanentAddrWardId(deathAddress.getPermanentAddrWardId());
        registryAddress.setPermanentAddrPostofficeId(deathAddress.getPermanentAddrPostofficeId());
        registryAddress.setPermanentAddrPincode(deathAddress.getPermanentAddrPincode());
        registryAddress.setPermanentAddrLocalityEn(deathAddress.getPermanentAddrLocalityEn());
        registryAddress.setPermanentAddrLocalityMl(deathAddress.getPermanentAddrLocalityMl());
        registryAddress.setPermanentAddrStreetNameEn(deathAddress.getPermanentAddrStreetNameEn());
        registryAddress.setPermanentAddrStreetNameMl(deathAddress.getPermanentAddrStreetNameMl());
        registryAddress.setPermanentAddrHoueNameEn(deathAddress.getPermanentAddrHoueNameEn());
        registryAddress.setPermanentAddrHoueNameMl(deathAddress.getPermanentAddrHoueNameMl());
        registryAddress.setPermanentAddrPostalCode(deathAddress.getPermanentAddrPostalCode());
        return registryAddress;
    }

    public DeathRegistryFamilyInfo createRegistryFamilyInfo(DeathDtlRequest deathrequest){

        DeathFamilyInfo deathFamilyInfo = deathrequest.getDeathCertificateDtls().get(0).getDeathFamilyInfo();
        DeathRegistryFamilyInfo registryFamilyInfo = new DeathRegistryFamilyInfo();
       // registryFamilyInfo.setSpouseUnavailable(deathFamilyInfo.getSpouseUnavailable());
        registryFamilyInfo.setSpouseType(deathFamilyInfo.getSpouseType());
        registryFamilyInfo.setSpouseNameEn(deathFamilyInfo.getSpouseNameEn());
        registryFamilyInfo.setSpouseNameML(deathFamilyInfo.getSpouseNameML());
        registryFamilyInfo.setSpouseAadhaar(deathFamilyInfo.getSpouseAadhaar());
        registryFamilyInfo.setSpouseNameML(deathFamilyInfo.getSpouseNameML());
       // registryFamilyInfo.setFatherUnavailable(deathFamilyInfo.getFatherUnavailable());
        registryFamilyInfo.setFatherNameEn(deathFamilyInfo.getFatherNameEn());
        registryFamilyInfo.setFatherNameMl(deathFamilyInfo.getFatherNameMl());
        registryFamilyInfo.setFatherAadharNo(deathFamilyInfo.getFatherAadharNo());
       // registryFamilyInfo.setMotherUnavailable(deathFamilyInfo.getMotherUnavailable());
        registryFamilyInfo.setMotherNameEn(deathFamilyInfo.getMotherNameEn());
        registryFamilyInfo.setMotherNameMl(deathFamilyInfo.getMotherNameMl());
        registryFamilyInfo.setMotherAadharNo(deathFamilyInfo.getMotherAadharNo());
        registryFamilyInfo.setFamilyMobileNo(deathFamilyInfo.getFamilyMobileNo());
        registryFamilyInfo.setFamilyEmailId(deathFamilyInfo.getFamilyEmailId());
        return registryFamilyInfo;
    }
    public DeathRegistryInformantDtls createRegistryInformantDtls(DeathDtlRequest deathrequest){

        DeathInformantDtls deathInformantDtls = deathrequest.getDeathCertificateDtls().get(0).getDeathInformantDtls();
        DeathRegistryInformantDtls registryInformantDtls = new DeathRegistryInformantDtls();
       registryInformantDtls.setInformantAadharNo(deathInformantDtls.getInformantAadharNo());
       registryInformantDtls.setInformantNameEn(deathInformantDtls.getInformantNameEn());
       registryInformantDtls.setInformantMobileNo(deathInformantDtls.getInformantMobileNo());
       registryInformantDtls.setDeathSignedOfficerDesignation(deathInformantDtls.getDeathSignedOfficerDesignation());
       registryInformantDtls.setInformantAddress(deathInformantDtls.getInformantAddress());
       registryInformantDtls.setDeclarationInformant(deathInformantDtls.isDeclarationInformant());
        return registryInformantDtls;
    }

//Jasmine 04.03.2023 

public DeathRegistryCorrectionRequest createRegistrycorrectionRequest( DeathCorrectionRequest deathrequest ){

    RequestInfo requestInfo = deathrequest.getRequestInfo();
    DeathRegistryCorrectionRequest request = new DeathRegistryCorrectionRequest();
    List<DeathCorrectionDtls> deathDtls = deathrequest.getDeathCorrection();
    List<DeathRegistryCorrectionDtls> deathRegistryDetails =  new LinkedList<>();
    DeathRegistryCorrectionDtls deathRegistryReading =  new DeathRegistryCorrectionDtls();

    deathDtls.forEach(deathdet->{  

        if  (deathdet.getDeathCorrectionBasicInfo()!=null){
            deathRegistryReading.setDeathCorrectionBasicInfo(createCorrectionRegistryBasicInfo(deathrequest));
        } 

        if  (deathdet.getDeathCorrAddressInfo()!=null){
            deathRegistryReading.setDeathCorrAddressInfo(createCorrectionRegistryAddress(deathrequest));
        }

        deathRegistryDetails.add(deathRegistryReading);
    });
     request = DeathRegistryCorrectionRequest
                .builder()
                .requestInfo(requestInfo)                                                            
                .deathCorrection(deathRegistryDetails)
                .build();
   
    return  request;
}

public DeathRegistryAddressInfo createCorrectionRegistryAddress(DeathCorrectionRequest deathrequest){

    
    DeathAddressInfo deathAddress = deathrequest.getDeathCorrection().get(0).getDeathCorrAddressInfo();
    DeathRegistryAddressInfo registryAddress = new DeathRegistryAddressInfo();
    registryAddress.setPresentAddrId(deathAddress.getPresentAddrId());
    registryAddress.setPresentAddrDeathDtlId(deathAddress.getPresentAddrDeathDtlId());
    registryAddress.setPresentAddrTenantId(deathAddress.getPresentAddrTenantId());
    registryAddress.setPresentAddrTypeId(deathAddress.getPresentAddrTypeId());
    registryAddress.setPresentAddrLocationType(deathAddress.getPresentAddrLocationType());
    registryAddress.setPresentAddrCountryId(deathAddress.getPresentAddrCountryId());
    registryAddress.setPresentAddrStateId(deathAddress.getPresentAddrStateId());
    registryAddress.setPresentAddrDistrictId(deathAddress.getPresentAddrDistrictId());
    registryAddress.setPresentAddrTalukId(deathAddress.getPresentAddrTalukId());
    registryAddress.setPresentAddrVillageId(deathAddress.getPresentAddrVillageId());
    registryAddress.setPresentAddrLbType(deathAddress.getPresentAddrLbType());
    registryAddress.setPresentAddrWardId(deathAddress.getPresentAddrWardId());
    registryAddress.setPresentAddrPostofficeId(deathAddress.getPresentAddrPostofficeId());
    registryAddress.setPresentAddrPincode(deathAddress.getPresentAddrPincode());
    registryAddress.setPresentAddrLocalityEn(deathAddress.getPresentAddrLocalityEn());
    registryAddress.setPresentAddrLocalityMl(deathAddress.getPresentAddrLocalityMl());
    registryAddress.setPresentAddrStreetNameEn(deathAddress.getPresentAddrStreetNameEn());
    registryAddress.setPresentAddrStreetNameMl(deathAddress.getPresentAddrStreetNameMl());
    registryAddress.setPresentAddrHoueNameEn(deathAddress.getPresentAddrHoueNameEn());
    registryAddress.setPresentAddrHoueNameMl(deathAddress.getPresentAddrHoueNameMl());
    registryAddress.setPresentAddrPostalCode(deathAddress.getPresentAddrPostalCode());
    registryAddress.setPermanentAddrId(deathAddress.getPermanentAddrId());
    registryAddress.setPermanentAddrDeathDtlId(deathAddress.getPermanentAddrDeathDtlId());
    registryAddress.setPermanentAddrTenantId(deathAddress.getPermanentAddrTenantId());
    registryAddress.setPermanentAddrTypeId(deathAddress.getPermanentAddrTypeId());
    registryAddress.setPermanentAddrCountryId(deathAddress.getPermanentAddrCountryId());
    registryAddress.setPermanentAddrStateId(deathAddress.getPermanentAddrStateId());
    registryAddress.setPermanentAddrDistrictId(deathAddress.getPermanentAddrDistrictId());
    registryAddress.setPermanentAddrTalukId(deathAddress.getPermanentAddrTalukId());
    registryAddress.setPermanentAddrVillageId(deathAddress.getPermanentAddrVillageId());
    registryAddress.setPermanentAddrLbType(deathAddress.getPermanentAddrLbType());
    registryAddress.setPermanentAddrWardId(deathAddress.getPermanentAddrWardId());
    registryAddress.setPermanentAddrPostofficeId(deathAddress.getPermanentAddrPostofficeId());
    registryAddress.setPermanentAddrPincode(deathAddress.getPermanentAddrPincode());
    registryAddress.setPermanentAddrLocalityEn(deathAddress.getPermanentAddrLocalityEn());
    registryAddress.setPermanentAddrLocalityMl(deathAddress.getPermanentAddrLocalityMl());
    registryAddress.setPermanentAddrStreetNameEn(deathAddress.getPermanentAddrStreetNameEn());
    registryAddress.setPermanentAddrStreetNameMl(deathAddress.getPermanentAddrStreetNameMl());
    registryAddress.setPermanentAddrHoueNameEn(deathAddress.getPermanentAddrHoueNameEn());
    registryAddress.setPermanentAddrHoueNameMl(deathAddress.getPermanentAddrHoueNameMl());
    registryAddress.setPermanentAddrPostalCode(deathAddress.getPermanentAddrPostalCode());
    return registryAddress;
}

public DeathRegistryCorrectionBasicInfo createCorrectionRegistryBasicInfo(DeathCorrectionRequest deathrequest){

    DeathRegistryCorrectionBasicInfo deathRegistryBasicInfo=new DeathRegistryCorrectionBasicInfo();
    DeathCorrectionBasicInfo deathBasicInfo = deathrequest.getDeathCorrection().get(0).getDeathCorrectionBasicInfo();
    deathRegistryBasicInfo.setTenantId(deathBasicInfo.getTenantId());
    deathRegistryBasicInfo.setRegistrationUnit(deathBasicInfo.getRegistrationUnit());
    deathRegistryBasicInfo.setDateOfDeath(deathBasicInfo.getDateOfDeath());
    // deathRegistryBasicInfo.setTimeOfDeath(deathBasicInfo.getTimeOfDeath());
    deathRegistryBasicInfo.setTenantId(deathBasicInfo.getTenantId());
    deathRegistryBasicInfo.setRegistrationUnit(deathBasicInfo.getRegistrationUnit());
    deathRegistryBasicInfo.setDateOfDeath(deathBasicInfo.getDateOfDeath());
    // deathRegistryBasicInfo.setTimeOfDeath(deathBasicInfo.getTimeOfDeath());
    // deathRegistryBasicInfo.setTimeOfDeathUnit(deathBasicInfo.getTimeOfDeathUnit());
    deathRegistryBasicInfo.setDeathPlace(deathBasicInfo.getDeathPlace());
    deathRegistryBasicInfo.setDeathPlaceType(deathBasicInfo.getDeathPlaceType());
    deathRegistryBasicInfo.setDeathPlaceInstId(deathBasicInfo.getDeathPlaceInstId());
    deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
    // deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
    deathRegistryBasicInfo.setVehicleFromplaceEn(deathBasicInfo.getVehicleFromplaceEn());
    deathRegistryBasicInfo.setVehicleFromplaceMl(deathBasicInfo.getVehicleFromplaceMl());
    deathRegistryBasicInfo.setVehicleToPlaceEn(deathBasicInfo.getVehicleToPlaceEn());
    deathRegistryBasicInfo.setVehicleToPlaceMl(deathBasicInfo.getVehicleToPlaceMl());
    deathRegistryBasicInfo.setVehicleFirstHaltEn(deathBasicInfo.getVehicleFirstHaltEn());
    deathRegistryBasicInfo.setVehicleFirstHaltMl(deathBasicInfo.getVehicleFirstHaltMl());
    deathRegistryBasicInfo.setVehicleHospitalEn(deathBasicInfo.getVehicleHospitalEn());
    deathRegistryBasicInfo.setDeathPlaceCountry(deathBasicInfo.getDeathPlaceCountry());
    deathRegistryBasicInfo.setDeathPlaceState(deathBasicInfo.getDeathPlaceState());
    deathRegistryBasicInfo.setDeathPlaceDistrict(deathBasicInfo.getDeathPlaceDistrict());
    deathRegistryBasicInfo.setDeathPlaceCity(deathBasicInfo.getDeathPlaceCity());
    deathRegistryBasicInfo.setDeathPlaceRemarksEn(deathBasicInfo.getDeathPlaceRemarksEn());
    deathRegistryBasicInfo.setDeathPlaceRemarksMl(deathBasicInfo.getDeathPlaceRemarksMl());
    deathRegistryBasicInfo.setDeathPlaceWardId(deathBasicInfo.getDeathPlaceWardId());
    deathRegistryBasicInfo.setPlaceOfBurialEn(deathBasicInfo.getPlaceOfBurialEn());
    deathRegistryBasicInfo.setPlaceOfBurialMl(deathBasicInfo.getPlaceOfBurialMl());
    deathRegistryBasicInfo.setDeathPlaceLocalityEn(deathBasicInfo.getDeathPlaceLocalityEn());
    deathRegistryBasicInfo.setDeathPlaceLocalityMl(deathBasicInfo.getDeathPlaceLocalityMl());
    deathRegistryBasicInfo.setDeathPlaceStreetEn(deathBasicInfo.getDeathPlaceStreetEn());
    deathRegistryBasicInfo.setDeathPlaceStreetMl(deathBasicInfo.getDeathPlaceStreetMl());
    deathRegistryBasicInfo.setGeneralRemarks(deathBasicInfo.getGeneralRemarks());
    deathRegistryBasicInfo.setDeathPlaceHomeWardId(deathBasicInfo.getDeathPlaceHomeWardId());
    deathRegistryBasicInfo.setDeathPlaceHomePostofficeId(deathBasicInfo.getDeathPlaceHomePostofficeId());
    deathRegistryBasicInfo.setDeathPlaceHomePincode(deathBasicInfo.getDeathPlaceHomePincode());
    deathRegistryBasicInfo.setDeathPlaceHomeLocalityEn(deathBasicInfo.getDeathPlaceHomeLocalityEn());
    deathRegistryBasicInfo.setDeathPlaceHomeLocalityMl(deathBasicInfo.getDeathPlaceHomeLocalityMl());
    deathRegistryBasicInfo.setDeathPlaceHomeStreetNameEn(deathBasicInfo.getDeathPlaceHomeStreetNameEn());
    deathRegistryBasicInfo.setDeathPlaceHomeStreetNameMl(deathBasicInfo.getDeathPlaceHomeStreetNameMl());
    deathRegistryBasicInfo.setDeathPlaceHomeHouseNameEn(deathBasicInfo.getDeathPlaceHomeHouseNameEn());
    deathRegistryBasicInfo.setDeathPlaceHomeHouseNameMl(deathBasicInfo.getDeathPlaceHomeHouseNameMl());
    deathRegistryBasicInfo.setDeceasedAadharNotAvailable(deathBasicInfo.getDeceasedAadharNotAvailable());
    deathRegistryBasicInfo.setDeceasedAadharNumber(deathBasicInfo.getDeceasedAadharNumber());
    deathRegistryBasicInfo.setDeceasedFirstNameEn(deathBasicInfo.getDeceasedFirstNameEn());
    deathRegistryBasicInfo.setDeceasedMiddleNameEn(deathBasicInfo.getDeceasedMiddleNameEn());
    deathRegistryBasicInfo.setDeceasedLastNameEn(deathBasicInfo.getDeceasedLastNameEn());
    deathRegistryBasicInfo.setDeceasedFirstNameMl(deathBasicInfo.getDeceasedFirstNameMl());
    deathRegistryBasicInfo.setDeceasedMiddleNameMl(deathBasicInfo.getDeceasedMiddleNameMl());
    deathRegistryBasicInfo.setDeceasedLastNameMl(deathBasicInfo.getDeceasedLastNameMl());
    deathRegistryBasicInfo.setDeceasedGender(deathBasicInfo.getDeceasedGender());
    deathRegistryBasicInfo.setDeathACKNo(deathBasicInfo.getDeathACKNo());
    deathRegistryBasicInfo.setMotherNameEn(deathBasicInfo.getMotherNameEn());
    deathRegistryBasicInfo.setMotherNameMl(deathBasicInfo.getMotherNameMl());
    deathRegistryBasicInfo.setFatherNameEn(deathBasicInfo.getFatherNameEn());
    deathRegistryBasicInfo.setFatherNameMl(deathBasicInfo.getFatherNameMl());
    deathRegistryBasicInfo.setRegistrationNo(deathBasicInfo.getRegistrationNo());
    deathRegistryBasicInfo.setFuncionUID(deathBasicInfo.getFuncionUID());
    return deathRegistryBasicInfo;

}

//Rakhi S ikm on 08.03.2023 Abandoned Registry Request create

public DeathRegistryRequest createRegistryAbandonedRequest(DeathAbandonedRequest deathrequest ){

    RequestInfo requestInfo = deathrequest.getRequestInfo();
    DeathRegistryRequest request = new DeathRegistryRequest();
    List<DeathAbandonedDtls> deathDtls = deathrequest.getDeathAbandonedDtls();
    List<DeathRegistryDtl> deathRegistryDetails =  new LinkedList<>();
    DeathRegistryDtl deathRegistryReading =  new DeathRegistryDtl();

    deathDtls.forEach(deathdet->{  

        if  (deathdet.getDeathBasicInfo()!=null){
            deathRegistryReading.setDeathBasicInfo(createRegistryBasicInfoAbandoned(deathrequest));
        } 
        if  (deathdet.getDeathStatisticalInfo()!=null){
            deathRegistryReading.setDeathStatisticalInfo(createRegistryStatisticalInfoAbandoned(deathrequest));
        }

        if  (deathdet.getDeathFamilyInfo()!=null){
            deathRegistryReading.setDeathFamilyInfo(createRegistryFamilyInfoAbandoned(deathrequest));
        }
        if  (deathdet.getDeathAddressInfo()!=null){
            deathRegistryReading.setDeathAddressInfo(createRegistryAddressAbandoned(deathrequest));
        }
        if  (deathdet.getDeathInformantDtls()!=null){
            deathRegistryReading.setDeathInformantDtls(createRegistryInformantDtlsAbandoned(deathrequest));
        }


        deathRegistryDetails.add(deathRegistryReading);
    });
     request = DeathRegistryRequest
                .builder()
                .requestInfo(requestInfo)                                                            
                .deathCertificateDtls(deathRegistryDetails)
                .build();
   
    return  request;
}

//Rakhi S ikm on 08.03.2023 Abandoned Registry Basic info Request create

public DeathRegistryBasicInfo createRegistryBasicInfoAbandoned(DeathAbandonedRequest deathrequest){

    DeathRegistryBasicInfo deathRegistryBasicInfo=new DeathRegistryBasicInfo();
    DeathBasicInfo deathBasicInfo = deathrequest.getDeathAbandonedDtls().get(0).getDeathBasicInfo();
    deathRegistryBasicInfo.setTenantId(deathBasicInfo.getTenantId());
    deathRegistryBasicInfo.setRegistrationUnit(deathBasicInfo.getRegistrationUnit());
    deathRegistryBasicInfo.setDateOfDeath(deathBasicInfo.getDateOfDeath());
    deathRegistryBasicInfo.setTimeOfDeath(deathBasicInfo.getTimeOfDeath());
    deathRegistryBasicInfo.setTenantId(deathBasicInfo.getTenantId());
    deathRegistryBasicInfo.setRegistrationUnit(deathBasicInfo.getRegistrationUnit());
    deathRegistryBasicInfo.setDateOfDeath(deathBasicInfo.getDateOfDeath());
    deathRegistryBasicInfo.setTimeOfDeath(deathBasicInfo.getTimeOfDeath());
    deathRegistryBasicInfo.setTimeOfDeathUnit(deathBasicInfo.getTimeOfDeathUnit());
    deathRegistryBasicInfo.setDeathPlace(deathBasicInfo.getDeathPlace());
    deathRegistryBasicInfo.setDeathPlaceType(deathBasicInfo.getDeathPlaceType());
    deathRegistryBasicInfo.setDeathPlaceInstId(deathBasicInfo.getDeathPlaceInstId());
    deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
    deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
    deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
    deathRegistryBasicInfo.setVehicleFromplaceMl(deathBasicInfo.getVehicleFromplaceMl());
    deathRegistryBasicInfo.setVehicleToPlaceEn(deathBasicInfo.getVehicleToPlaceEn());
    deathRegistryBasicInfo.setVehicleToPlaceMl(deathBasicInfo.getVehicleToPlaceMl());
    deathRegistryBasicInfo.setVehicleFirstHaltEn(deathBasicInfo.getVehicleFirstHaltEn());
    deathRegistryBasicInfo.setVehicleFirstHaltMl(deathBasicInfo.getVehicleFirstHaltMl());
    deathRegistryBasicInfo.setVehicleHospitalEn(deathBasicInfo.getVehicleHospitalEn());
    deathRegistryBasicInfo.setDeathPlaceCountry(deathBasicInfo.getDeathPlaceCountry());
    deathRegistryBasicInfo.setDeathPlaceState(deathBasicInfo.getDeathPlaceState());
    deathRegistryBasicInfo.setDeathPlaceDistrict(deathBasicInfo.getDeathPlaceDistrict());
    deathRegistryBasicInfo.setDeathPlaceCity(deathBasicInfo.getDeathPlaceCity());
    deathRegistryBasicInfo.setDeathPlaceRemarksEn(deathBasicInfo.getDeathPlaceRemarksEn());
    deathRegistryBasicInfo.setDeathPlaceRemarksMl(deathBasicInfo.getDeathPlaceRemarksMl());
    deathRegistryBasicInfo.setDeathPlaceWardId(deathBasicInfo.getDeathPlaceWardId());
    deathRegistryBasicInfo.setPlaceOfBurialEn(deathBasicInfo.getPlaceOfBurialEn());
    deathRegistryBasicInfo.setPlaceOfBurialMl(deathBasicInfo.getPlaceOfBurialMl());
    deathRegistryBasicInfo.setDeathPlaceLocalityEn(deathBasicInfo.getDeathPlaceLocalityEn());
    deathRegistryBasicInfo.setDeathPlaceLocalityMl(deathBasicInfo.getDeathPlaceLocalityMl());
    deathRegistryBasicInfo.setDeathPlaceStreetEn(deathBasicInfo.getDeathPlaceStreetEn());
    deathRegistryBasicInfo.setDeathPlaceStreetMl(deathBasicInfo.getDeathPlaceStreetMl());
    deathRegistryBasicInfo.setGeneralRemarks(deathBasicInfo.getGeneralRemarks());
    deathRegistryBasicInfo.setDeathPlaceHomeId(deathBasicInfo.getDeathPlaceHomeId());
    deathRegistryBasicInfo.setDeathDtlId(deathBasicInfo.getDeathDtlId());
    deathRegistryBasicInfo.setDeathPlaceHomeAddrTypeId(deathBasicInfo.getDeathPlaceHomeAddrTypeId());
    deathRegistryBasicInfo.setDeathPlaceHomeCountryId(deathBasicInfo.getDeathPlaceHomeCountryId());
    deathRegistryBasicInfo.setDeathPlaceHomeStateId(deathBasicInfo.getDeathPlaceHomeStateId());
    deathRegistryBasicInfo.setDeathPlaceHomeDistrictId(deathBasicInfo.getDeathPlaceHomeDistrictId());
    deathRegistryBasicInfo.setDeathPlaceHomeTalukId(deathBasicInfo.getDeathPlaceHomeTalukId());
    deathRegistryBasicInfo.setDeathPlaceHomeVillageId(deathBasicInfo.getDeathPlaceHomeVillageId());
    deathRegistryBasicInfo.setDeathPlaceHomeLbType(deathBasicInfo.getDeathPlaceHomeLbType());
    deathRegistryBasicInfo.setDeathPlaceHomeWardId(deathBasicInfo.getDeathPlaceHomeWardId());
    deathRegistryBasicInfo.setDeathPlaceHomePostofficeId(deathBasicInfo.getDeathPlaceHomePostofficeId());
    deathRegistryBasicInfo.setDeathPlaceHomePincode(deathBasicInfo.getDeathPlaceHomePincode());
    deathRegistryBasicInfo.setDeathPlaceHomeLocalityEn(deathBasicInfo.getDeathPlaceHomeLocalityEn());
    deathRegistryBasicInfo.setDeathPlaceHomeLocalityMl(deathBasicInfo.getDeathPlaceHomeLocalityMl());
    deathRegistryBasicInfo.setDeathPlaceHomeStreetNameEn(deathBasicInfo.getDeathPlaceHomeStreetNameEn());
    deathRegistryBasicInfo.setDeathPlaceHomeStreetNameMl(deathBasicInfo.getDeathPlaceHomeStreetNameMl());
    deathRegistryBasicInfo.setDeathPlaceHomeHoueNameEn(deathBasicInfo.getDeathPlaceHomeHoueNameEn());
    deathRegistryBasicInfo.setDeathPlaceHomeHoueNameMl(deathBasicInfo.getDeathPlaceHomeHoueNameMl());
    deathRegistryBasicInfo.setDeceasedAadharNotAvailable(deathBasicInfo.getDeceasedAadharNotAvailable());
    deathRegistryBasicInfo.setDeceasedAadharNumber(deathBasicInfo.getDeceasedAadharNumber());
    deathRegistryBasicInfo.setDeceasedIdproofType(deathBasicInfo.getDeceasedIdproofType());
    deathRegistryBasicInfo.setDeceasedIdproofNo(deathBasicInfo.getDeceasedIdproofNo());
    deathRegistryBasicInfo.setDeceasedFirstNameEn(deathBasicInfo.getDeceasedFirstNameEn());
    deathRegistryBasicInfo.setDeceasedMiddleNameEn(deathBasicInfo.getDeceasedMiddleNameEn());
    deathRegistryBasicInfo.setDeceasedLastNameEn(deathBasicInfo.getDeceasedLastNameEn());
    deathRegistryBasicInfo.setDeceasedFirstNameMl(deathBasicInfo.getDeceasedFirstNameMl());
    deathRegistryBasicInfo.setDeceasedMiddleNameMl(deathBasicInfo.getDeceasedMiddleNameMl());
    deathRegistryBasicInfo.setDeceasedLastNameMl(deathBasicInfo.getDeceasedLastNameMl());
    deathRegistryBasicInfo.setAge(deathBasicInfo.getAge());
    deathRegistryBasicInfo.setAgeUnit(deathBasicInfo.getAgeUnit());
    deathRegistryBasicInfo.setDeceasedGender(deathBasicInfo.getDeceasedGender());
    deathRegistryBasicInfo.setNationality(deathBasicInfo.getNationality());
    deathRegistryBasicInfo.setReligion(deathBasicInfo.getReligion());
    deathRegistryBasicInfo.setOccupation(deathBasicInfo.getOccupation());
    deathRegistryBasicInfo.setDeathACKNo(deathBasicInfo.getDeathACKNo());
    deathRegistryBasicInfo.setFuncionUID(deathBasicInfo.getFuncionUID());
    return deathRegistryBasicInfo;

}
//Rakhi S ikm on 08.03.2023 Abandoned Registry statistical info Request create

public DeathRegistryStatisticalInfo createRegistryStatisticalInfoAbandoned(DeathAbandonedRequest deathrequest){

    DeathStatisticalInfo statisticalDtls = deathrequest.getDeathAbandonedDtls().get(0).getDeathStatisticalInfo();
    DeathRegistryStatisticalInfo registryStatisticalInfo = new DeathRegistryStatisticalInfo();
    registryStatisticalInfo.setDeathDtlId(statisticalDtls.getDeathDtlId());
    registryStatisticalInfo.setTenantId(statisticalDtls.getTenantId());
    registryStatisticalInfo.setMedicalAttentionType(statisticalDtls.getMedicalAttentionType());
    registryStatisticalInfo.setIsAutopsyPerformed(statisticalDtls.getIsAutopsyPerformed());
    registryStatisticalInfo.setIsAutopsyCompleted(statisticalDtls.getIsAutopsyCompleted());
    registryStatisticalInfo.setMannerOfDeath(statisticalDtls.getMannerOfDeath());
    registryStatisticalInfo.setDeathMedicallyCertified(statisticalDtls.getDeathMedicallyCertified());
    registryStatisticalInfo.setDeathCauseMain(statisticalDtls.getDeathCauseMain());
    registryStatisticalInfo.setDeathCauseMainCustom(statisticalDtls.getDeathCauseMainCustom());
    registryStatisticalInfo.setDeathCauseMainInterval(statisticalDtls.getDeathCauseMainInterval());
    registryStatisticalInfo.setDeathCauseMainTimeUnit(statisticalDtls.getDeathCauseMainTimeUnit());
    registryStatisticalInfo.setDeathCauseSub(statisticalDtls.getDeathCauseSub());
    registryStatisticalInfo.setDeathCauseSubCustom(statisticalDtls.getDeathCauseSubCustom());
    registryStatisticalInfo.setDeathCauseSubInterval(statisticalDtls.getDeathCauseSubInterval());
    registryStatisticalInfo.setDeathCauseSubTimeUnit(statisticalDtls.getDeathCauseSubTimeUnit());
    registryStatisticalInfo.setDeathCauseSub2(statisticalDtls.getDeathCauseSub2());
    registryStatisticalInfo.setDeathCauseSubCustom2(statisticalDtls.getDeathCauseSubCustom2());
    registryStatisticalInfo.setDeathCauseSubInterval2(statisticalDtls.getDeathCauseSubInterval2());
    registryStatisticalInfo.setDeathCauseSubTimeUnit2(statisticalDtls.getDeathCauseSubTimeUnit2());
    registryStatisticalInfo.setDeathCauseOther(statisticalDtls.getDeathCauseOther());
    registryStatisticalInfo.setIsdeceasedPregnant(statisticalDtls.getIsdeceasedPregnant());
    registryStatisticalInfo.setIsDelivery(statisticalDtls.getIsDelivery());
    registryStatisticalInfo.setDeathDuringDelivery(statisticalDtls.getDeathDuringDelivery());
    registryStatisticalInfo.setSmokingType(statisticalDtls.getSmokingType());
    registryStatisticalInfo.setTobaccoType(statisticalDtls.getTobaccoType());
    registryStatisticalInfo.setAlcoholType(statisticalDtls.getAlcoholType());
    return registryStatisticalInfo;    
    }
//Rakhi S ikm on 08.03.2023 Abandoned Registry family info Request create
    public DeathRegistryFamilyInfo createRegistryFamilyInfoAbandoned(DeathAbandonedRequest deathrequest){

        DeathFamilyInfo deathFamilyInfo = deathrequest.getDeathAbandonedDtls().get(0).getDeathFamilyInfo();
        DeathRegistryFamilyInfo registryFamilyInfo = new DeathRegistryFamilyInfo();
       // registryFamilyInfo.setSpouseUnavailable(deathFamilyInfo.getSpouseUnavailable());
        registryFamilyInfo.setSpouseType(deathFamilyInfo.getSpouseType());
        registryFamilyInfo.setSpouseNameEn(deathFamilyInfo.getSpouseNameEn());
        registryFamilyInfo.setSpouseNameML(deathFamilyInfo.getSpouseNameML());
        registryFamilyInfo.setSpouseAadhaar(deathFamilyInfo.getSpouseAadhaar());
        registryFamilyInfo.setSpouseNameML(deathFamilyInfo.getSpouseNameML());
       // registryFamilyInfo.setFatherUnavailable(deathFamilyInfo.getFatherUnavailable());
        registryFamilyInfo.setFatherNameEn(deathFamilyInfo.getFatherNameEn());
        registryFamilyInfo.setFatherNameMl(deathFamilyInfo.getFatherNameMl());
        registryFamilyInfo.setFatherAadharNo(deathFamilyInfo.getFatherAadharNo());
       // registryFamilyInfo.setMotherUnavailable(deathFamilyInfo.getMotherUnavailable());
        registryFamilyInfo.setMotherNameEn(deathFamilyInfo.getMotherNameEn());
        registryFamilyInfo.setMotherNameMl(deathFamilyInfo.getMotherNameMl());
        registryFamilyInfo.setMotherAadharNo(deathFamilyInfo.getMotherAadharNo());
        registryFamilyInfo.setFamilyMobileNo(deathFamilyInfo.getFamilyMobileNo());
        registryFamilyInfo.setFamilyEmailId(deathFamilyInfo.getFamilyEmailId());
        return registryFamilyInfo;
    }
//Rakhi S ikm on 08.03.2023 Abandoned Registry family info Request create
    public DeathRegistryAddressInfo createRegistryAddressAbandoned(DeathAbandonedRequest deathrequest){

        DeathAddressInfo deathAddress = deathrequest.getDeathAbandonedDtls().get(0).getDeathAddressInfo();
        DeathRegistryAddressInfo registryAddress = new DeathRegistryAddressInfo();
        registryAddress.setPresentAddrId(deathAddress.getPresentAddrId());
        registryAddress.setPresentAddrDeathDtlId(deathAddress.getPresentAddrDeathDtlId());
        registryAddress.setPresentAddrTenantId(deathAddress.getPresentAddrTenantId());
        registryAddress.setPresentAddrTypeId(deathAddress.getPresentAddrTypeId());
        registryAddress.setPresentAddrLocationType(deathAddress.getPresentAddrLocationType());
        registryAddress.setPresentAddrCountryId(deathAddress.getPresentAddrCountryId());
        registryAddress.setPresentAddrStateId(deathAddress.getPresentAddrStateId());
        registryAddress.setPresentAddrDistrictId(deathAddress.getPresentAddrDistrictId());
        registryAddress.setPresentAddrTalukId(deathAddress.getPresentAddrTalukId());
        registryAddress.setPresentAddrVillageId(deathAddress.getPresentAddrVillageId());
        registryAddress.setPresentAddrLbType(deathAddress.getPresentAddrLbType());
        registryAddress.setPresentAddrWardId(deathAddress.getPresentAddrWardId());
        registryAddress.setPresentAddrPostofficeId(deathAddress.getPresentAddrPostofficeId());
        registryAddress.setPresentAddrPincode(deathAddress.getPresentAddrPincode());
        registryAddress.setPresentAddrLocalityEn(deathAddress.getPresentAddrLocalityEn());
        registryAddress.setPresentAddrLocalityMl(deathAddress.getPresentAddrLocalityMl());
        registryAddress.setPresentAddrStreetNameEn(deathAddress.getPresentAddrStreetNameEn());
        registryAddress.setPresentAddrStreetNameMl(deathAddress.getPresentAddrStreetNameMl());
        registryAddress.setPresentAddrHoueNameEn(deathAddress.getPresentAddrHoueNameEn());
        registryAddress.setPresentAddrHoueNameMl(deathAddress.getPresentAddrHoueNameMl());
        registryAddress.setPresentAddrPostalCode(deathAddress.getPresentAddrPostalCode());
        registryAddress.setPermanentAddrId(deathAddress.getPermanentAddrId());
        registryAddress.setPermanentAddrDeathDtlId(deathAddress.getPermanentAddrDeathDtlId());
        registryAddress.setPermanentAddrTenantId(deathAddress.getPermanentAddrTenantId());
        registryAddress.setPermanentAddrTypeId(deathAddress.getPermanentAddrTypeId());
        registryAddress.setPermanentAddrCountryId(deathAddress.getPermanentAddrCountryId());
        registryAddress.setPermanentAddrStateId(deathAddress.getPermanentAddrStateId());
        registryAddress.setPermanentAddrDistrictId(deathAddress.getPermanentAddrDistrictId());
        registryAddress.setPermanentAddrTalukId(deathAddress.getPermanentAddrTalukId());
        registryAddress.setPermanentAddrVillageId(deathAddress.getPermanentAddrVillageId());
        registryAddress.setPermanentAddrLbType(deathAddress.getPermanentAddrLbType());
        registryAddress.setPermanentAddrWardId(deathAddress.getPermanentAddrWardId());
        registryAddress.setPermanentAddrPostofficeId(deathAddress.getPermanentAddrPostofficeId());
        registryAddress.setPermanentAddrPincode(deathAddress.getPermanentAddrPincode());
        registryAddress.setPermanentAddrLocalityEn(deathAddress.getPermanentAddrLocalityEn());
        registryAddress.setPermanentAddrLocalityMl(deathAddress.getPermanentAddrLocalityMl());
        registryAddress.setPermanentAddrStreetNameEn(deathAddress.getPermanentAddrStreetNameEn());
        registryAddress.setPermanentAddrStreetNameMl(deathAddress.getPermanentAddrStreetNameMl());
        registryAddress.setPermanentAddrHoueNameEn(deathAddress.getPermanentAddrHoueNameEn());
        registryAddress.setPermanentAddrHoueNameMl(deathAddress.getPermanentAddrHoueNameMl());
        registryAddress.setPermanentAddrPostalCode(deathAddress.getPermanentAddrPostalCode());
        return registryAddress;
    }
    //Rakhi S ikm on 08.03.2023 Abandoned Registry informant details Request create
    public DeathRegistryInformantDtls createRegistryInformantDtlsAbandoned(DeathAbandonedRequest deathrequest){

        DeathAbandonedInformantDtls deathInformantDtls = deathrequest.getDeathAbandonedDtls().get(0).getDeathInformantDtls();
        DeathRegistryInformantDtls registryInformantDtls = new DeathRegistryInformantDtls();
       registryInformantDtls.setInformantAadharNo(deathInformantDtls.getInformantAadhaarNo());
       registryInformantDtls.setInformantName(deathInformantDtls.getInformantName());
       registryInformantDtls.setInformantMobileNo(deathInformantDtls.getInformantMobileNo());
       registryInformantDtls.setInformantOfficeAuthority(deathInformantDtls.getInformantOfficeAuthority());
       registryInformantDtls.setInformantAddress(deathInformantDtls.getInformantAddress());
       registryInformantDtls.setInformantDesignation(deathInformantDtls.getInformantDesignation());
       registryInformantDtls.setInformantOfficeAddress(deathInformantDtls.getInformantOfficeAddress());
       registryInformantDtls.setInformantPENNo(deathInformantDtls.getInformantPENNo());
        return registryInformantDtls;
    }

    //Rakhi S ikm on 04.04.2023 Death NAC Registry Create 
    public DeathRegistryNACRequest createRegistryNACRequest( DeathNACRequest deathrequest ){

        RequestInfo requestInfo = deathrequest.getRequestInfo();
        DeathRegistryNACRequest request = new DeathRegistryNACRequest();
        List<DeathNACDtls> deathDtls = deathrequest.getDeathNACDtls();
        List<DeathRegistryNACDtls> deathRegistryDetails =  new LinkedList<>();
        DeathRegistryNACDtls deathRegistryReading =  new DeathRegistryNACDtls();
        deathDtls.forEach(deathdet->{  

            if  (deathdet.getDeathBasicInfo()!=null){
                deathRegistryReading.setDeathBasicInfo(createRegistryNACBasicInfo(deathrequest));
            }           
            if  (deathdet.getDeathAddressInfo()!=null){
                deathRegistryReading.setDeathAddressInfo(createRegistryNACAddress(deathrequest));
            }           
            deathRegistryDetails.add(deathRegistryReading);
        });
         request = DeathRegistryNACRequest
                    .builder()
                    .requestInfo(requestInfo)                                                            
                    .deathNACDtls(deathRegistryDetails)
                    .build();
       
        return  request;
    }

     //Rakhi S ikm on 04.04.2023 Death NAC BAsic Info Create 
    public DeathRegistryBasicInfo createRegistryNACBasicInfo(DeathNACRequest deathrequest){

        DeathRegistryBasicInfo deathRegistryBasicInfo=new DeathRegistryBasicInfo();
        DeathBasicInfo deathBasicInfo = deathrequest.getDeathNACDtls().get(0).getDeathBasicInfo();
        
        deathRegistryBasicInfo.setDateOfDeath(deathBasicInfo.getDateOfDeath());
        deathRegistryBasicInfo.setTenantId(deathBasicInfo.getTenantId());
        deathRegistryBasicInfo.setDeathPlace(deathBasicInfo.getDeathPlace());
        deathRegistryBasicInfo.setDeathPlaceType(deathBasicInfo.getDeathPlaceType());
        deathRegistryBasicInfo.setDeathPlaceInstId(deathBasicInfo.getDeathPlaceInstId());
        deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
        deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
        deathRegistryBasicInfo.setVehicleNumber(deathBasicInfo.getVehicleNumber());
        deathRegistryBasicInfo.setVehicleFromplaceMl(deathBasicInfo.getVehicleFromplaceMl());
        deathRegistryBasicInfo.setVehicleToPlaceEn(deathBasicInfo.getVehicleToPlaceEn());
        deathRegistryBasicInfo.setVehicleToPlaceMl(deathBasicInfo.getVehicleToPlaceMl());
        deathRegistryBasicInfo.setVehicleFirstHaltEn(deathBasicInfo.getVehicleFirstHaltEn());
        deathRegistryBasicInfo.setVehicleFirstHaltMl(deathBasicInfo.getVehicleFirstHaltMl());
        deathRegistryBasicInfo.setVehicleHospitalEn(deathBasicInfo.getVehicleHospitalEn());
        deathRegistryBasicInfo.setDeathPlaceCountry(deathBasicInfo.getDeathPlaceCountry());
        deathRegistryBasicInfo.setDeathPlaceState(deathBasicInfo.getDeathPlaceState());
        deathRegistryBasicInfo.setDeathPlaceDistrict(deathBasicInfo.getDeathPlaceDistrict());
        deathRegistryBasicInfo.setDeathPlaceCity(deathBasicInfo.getDeathPlaceCity());
        deathRegistryBasicInfo.setDeathPlaceRemarksEn(deathBasicInfo.getDeathPlaceRemarksEn());
        deathRegistryBasicInfo.setDeathPlaceRemarksMl(deathBasicInfo.getDeathPlaceRemarksMl());
        deathRegistryBasicInfo.setDeathPlaceWardId(deathBasicInfo.getDeathPlaceWardId());
        deathRegistryBasicInfo.setPlaceOfBurialEn(deathBasicInfo.getPlaceOfBurialEn());
        deathRegistryBasicInfo.setPlaceOfBurialMl(deathBasicInfo.getPlaceOfBurialMl());
        deathRegistryBasicInfo.setDeathPlaceLocalityEn(deathBasicInfo.getDeathPlaceLocalityEn());
        deathRegistryBasicInfo.setDeathPlaceLocalityMl(deathBasicInfo.getDeathPlaceLocalityMl());
        deathRegistryBasicInfo.setDeathPlaceStreetEn(deathBasicInfo.getDeathPlaceStreetEn());
        deathRegistryBasicInfo.setDeathPlaceStreetMl(deathBasicInfo.getDeathPlaceStreetMl());
        deathRegistryBasicInfo.setGeneralRemarks(deathBasicInfo.getGeneralRemarks());
        deathRegistryBasicInfo.setDeathPlaceHomeId(deathBasicInfo.getDeathPlaceHomeId());
        // deathRegistryBasicInfo.setDeathDtlId(deathBasicInfo.getDeathDtlId());
        deathRegistryBasicInfo.setDeathPlaceHomeAddrTypeId(deathBasicInfo.getDeathPlaceHomeAddrTypeId());
        deathRegistryBasicInfo.setDeathPlaceHomeCountryId(deathBasicInfo.getDeathPlaceHomeCountryId());
        deathRegistryBasicInfo.setDeathPlaceHomeStateId(deathBasicInfo.getDeathPlaceHomeStateId());
        deathRegistryBasicInfo.setDeathPlaceHomeDistrictId(deathBasicInfo.getDeathPlaceHomeDistrictId());
        deathRegistryBasicInfo.setDeathPlaceHomeTalukId(deathBasicInfo.getDeathPlaceHomeTalukId());
        deathRegistryBasicInfo.setDeathPlaceHomeVillageId(deathBasicInfo.getDeathPlaceHomeVillageId());
        deathRegistryBasicInfo.setDeathPlaceHomeLbType(deathBasicInfo.getDeathPlaceHomeLbType());
        deathRegistryBasicInfo.setDeathPlaceHomeWardId(deathBasicInfo.getDeathPlaceHomeWardId());
        deathRegistryBasicInfo.setDeathPlaceHomePostofficeId(deathBasicInfo.getDeathPlaceHomePostofficeId());
        deathRegistryBasicInfo.setDeathPlaceHomePincode(deathBasicInfo.getDeathPlaceHomePincode());
        deathRegistryBasicInfo.setDeathPlaceHomeLocalityEn(deathBasicInfo.getDeathPlaceHomeLocalityEn());
        deathRegistryBasicInfo.setDeathPlaceHomeLocalityMl(deathBasicInfo.getDeathPlaceHomeLocalityMl());
        deathRegistryBasicInfo.setDeathPlaceHomeStreetNameEn(deathBasicInfo.getDeathPlaceHomeStreetNameEn());
        deathRegistryBasicInfo.setDeathPlaceHomeStreetNameMl(deathBasicInfo.getDeathPlaceHomeStreetNameMl());
        deathRegistryBasicInfo.setDeathPlaceHomeHoueNameEn(deathBasicInfo.getDeathPlaceHomeHoueNameEn());
        deathRegistryBasicInfo.setDeathPlaceHomeHoueNameMl(deathBasicInfo.getDeathPlaceHomeHoueNameMl());
        // deathRegistryBasicInfo.setDeceasedAadharNotAvailable(deathBasicInfo.getDeceasedAadharNotAvailable());
        deathRegistryBasicInfo.setDeceasedAadharNumber(deathBasicInfo.getDeceasedAadharNumber());
        // deathRegistryBasicInfo.setDeceasedIdproofType(deathBasicInfo.getDeceasedIdproofType());
        // deathRegistryBasicInfo.setDeceasedIdproofNo(deathBasicInfo.getDeceasedIdproofNo());
        deathRegistryBasicInfo.setDeceasedFirstNameEn(deathBasicInfo.getDeceasedFirstNameEn());
        deathRegistryBasicInfo.setDeceasedMiddleNameEn(deathBasicInfo.getDeceasedMiddleNameEn());
        deathRegistryBasicInfo.setDeceasedLastNameEn(deathBasicInfo.getDeceasedLastNameEn());
        deathRegistryBasicInfo.setDeceasedFirstNameMl(deathBasicInfo.getDeceasedFirstNameMl());
        deathRegistryBasicInfo.setDeceasedMiddleNameMl(deathBasicInfo.getDeceasedMiddleNameMl());
        deathRegistryBasicInfo.setDeceasedLastNameMl(deathBasicInfo.getDeceasedLastNameMl());
        // deathRegistryBasicInfo.setAge(deathBasicInfo.getAge());
        // deathRegistryBasicInfo.setAgeUnit(deathBasicInfo.getAgeUnit());
        deathRegistryBasicInfo.setDeceasedGender(deathBasicInfo.getDeceasedGender());   
        deathRegistryBasicInfo.setAckNoID(deathBasicInfo.getAckNoID());
        deathRegistryBasicInfo.setDeathACKNo(deathBasicInfo.getDeathACKNo());
        deathRegistryBasicInfo.setFuncionUID(deathBasicInfo.getFuncionUID());
        deathRegistryBasicInfo.setDeathDtlId(deathBasicInfo.getId());
        deathRegistryBasicInfo.setFatherNameEn(deathBasicInfo.getFatherNameEn());
        deathRegistryBasicInfo.setFatherNameMl(deathBasicInfo.getFatherNameMl());
        deathRegistryBasicInfo.setFatherAadharNo(deathBasicInfo.getFatherAadharNo());
        deathRegistryBasicInfo.setMotherNameEn(deathBasicInfo.getMotherNameEn());
        deathRegistryBasicInfo.setMotherNameMl(deathBasicInfo.getMotherNameMl());
        deathRegistryBasicInfo.setMotherAadharNo(deathBasicInfo.getMotherAadharNo());
        deathRegistryBasicInfo.setSpouseType(deathBasicInfo.getSpouseType());
        deathRegistryBasicInfo.setSpouseNameEn(deathBasicInfo.getSpouseNameEn());
        deathRegistryBasicInfo.setSpouseNameML(deathBasicInfo.getSpouseNameML());
        deathRegistryBasicInfo.setSpouseAadhaar(deathBasicInfo.getSpouseAadhaar());
        return deathRegistryBasicInfo;
    
    }

    //Rakhi S ikm on 04.04.2023 Death NAC Address Info Create 
    public DeathRegistryAddressInfo createRegistryNACAddress(DeathNACRequest deathrequest){

        DeathAddressInfo deathAddress = deathrequest.getDeathNACDtls().get(0).getDeathAddressInfo();
        DeathRegistryAddressInfo registryAddress = new DeathRegistryAddressInfo();
        registryAddress.setPresentAddrId(deathAddress.getPresentAddrId());
        registryAddress.setPresentAddrDeathDtlId(deathAddress.getPresentAddrDeathDtlId());
        registryAddress.setPresentAddrTenantId(deathAddress.getPresentAddrTenantId());
        registryAddress.setPresentAddrTypeId(deathAddress.getPresentAddrTypeId());
        registryAddress.setPresentAddrLocationType(deathAddress.getPresentAddrLocationType());
        registryAddress.setPresentAddrCountryId(deathAddress.getPresentAddrCountryId());
        registryAddress.setPresentAddrStateId(deathAddress.getPresentAddrStateId());
        registryAddress.setPresentAddrDistrictId(deathAddress.getPresentAddrDistrictId());
        registryAddress.setPresentAddrTalukId(deathAddress.getPresentAddrTalukId());
        registryAddress.setPresentAddrVillageId(deathAddress.getPresentAddrVillageId());
        registryAddress.setPresentAddrLbType(deathAddress.getPresentAddrLbType());
        registryAddress.setPresentAddrWardId(deathAddress.getPresentAddrWardId());
        registryAddress.setPresentAddrPostofficeId(deathAddress.getPresentAddrPostofficeId());
        registryAddress.setPresentAddrPincode(deathAddress.getPresentAddrPincode());
        registryAddress.setPresentAddrLocalityEn(deathAddress.getPresentAddrLocalityEn());
        registryAddress.setPresentAddrLocalityMl(deathAddress.getPresentAddrLocalityMl());
        registryAddress.setPresentAddrStreetNameEn(deathAddress.getPresentAddrStreetNameEn());
        registryAddress.setPresentAddrStreetNameMl(deathAddress.getPresentAddrStreetNameMl());
        registryAddress.setPresentAddrHoueNameEn(deathAddress.getPresentAddrHoueNameEn());
        registryAddress.setPresentAddrHoueNameMl(deathAddress.getPresentAddrHoueNameMl());
        registryAddress.setPresentAddrPostalCode(deathAddress.getPresentAddrPostalCode());
        registryAddress.setPermanentAddrId(deathAddress.getPermanentAddrId());
        registryAddress.setPermanentAddrDeathDtlId(deathAddress.getPermanentAddrDeathDtlId());
        registryAddress.setPermanentAddrTenantId(deathAddress.getPermanentAddrTenantId());
        registryAddress.setPermanentAddrTypeId(deathAddress.getPermanentAddrTypeId());
        registryAddress.setPermanentAddrCountryId(deathAddress.getPermanentAddrCountryId());
        registryAddress.setPermanentAddrStateId(deathAddress.getPermanentAddrStateId());
        registryAddress.setPermanentAddrDistrictId(deathAddress.getPermanentAddrDistrictId());
        registryAddress.setPermanentAddrTalukId(deathAddress.getPermanentAddrTalukId());
        registryAddress.setPermanentAddrVillageId(deathAddress.getPermanentAddrVillageId());
        registryAddress.setPermanentAddrLbType(deathAddress.getPermanentAddrLbType());
        registryAddress.setPermanentAddrWardId(deathAddress.getPermanentAddrWardId());
        registryAddress.setPermanentAddrPostofficeId(deathAddress.getPermanentAddrPostofficeId());
        registryAddress.setPermanentAddrPincode(deathAddress.getPermanentAddrPincode());
        registryAddress.setPermanentAddrLocalityEn(deathAddress.getPermanentAddrLocalityEn());
        registryAddress.setPermanentAddrLocalityMl(deathAddress.getPermanentAddrLocalityMl());
        registryAddress.setPermanentAddrStreetNameEn(deathAddress.getPermanentAddrStreetNameEn());
        registryAddress.setPermanentAddrStreetNameMl(deathAddress.getPermanentAddrStreetNameMl());
        registryAddress.setPermanentAddrHoueNameEn(deathAddress.getPermanentAddrHoueNameEn());
        registryAddress.setPermanentAddrHoueNameMl(deathAddress.getPermanentAddrHoueNameMl());
        registryAddress.setPermanentAddrPostalCode(deathAddress.getPermanentAddrPostalCode());
        return registryAddress;
    }
}
