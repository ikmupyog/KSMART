package org.ksmart.death.crdeath.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.death.crdeath.web.models.CrDeathAddress;
import org.ksmart.death.crdeath.web.models.CrDeathDtl;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
import org.ksmart.death.crdeath.web.models.CrDeathStatistical;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryAddress;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryAddressInfo;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryStatistical;
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
public class CrDeathRegistryRequestService {

    public CrDeathRegistryRequest createRegistryRequest( CrDeathDtlRequest deathrequest ){

        List<CrDeathDtl> deathDtls = deathrequest.getDeathCertificateDtls();
        RequestInfo requestInfo = deathrequest.getRequestInfo();
        CrDeathRegistryRequest request = new CrDeathRegistryRequest();
        List<CrDeathRegistryDtl> deathRegistryDetails =  new LinkedList<>();
        CrDeathRegistryDtl deathcertreading=new CrDeathRegistryDtl();
        deathDtls.forEach(deathdet->{
            deathcertreading.setTenantId(deathdet.getTenantId());
            deathcertreading.setRegistrationUnit(deathdet.getRegistrationUnit());
            deathcertreading.setDeathDateUnavailable(deathdet.getDeathDateUnavailable());
            deathcertreading.setDateOfDeath(deathdet.getDateOfDeath());
            deathcertreading.setTimeOfDeath(deathdet.getTimeOfDeath());
            deathcertreading.setTimeOfDeathUnit(deathdet.getTimeOfDeathUnit());
            deathcertreading.setDateOfDeath1(deathdet.getDateOfDeath1());
            deathcertreading.setTimeOfDeath1(deathdet.getTimeOfDeath1());
            deathcertreading.setTimeOfDeathUnit1(deathdet.getTimeOfDeathUnit1());
            deathcertreading.setDeceasedUnIdentified(deathdet.getDeceasedUnIdentified());        
            deathcertreading.setDeceasedTitle(deathdet.getDeceasedTitle());
            deathcertreading.setDeceasedFirstNameEn(deathdet.getDeceasedFirstNameEn());
            deathcertreading.setDeceasedFirstNameMl(deathdet.getDeceasedFirstNameMl());
            deathcertreading.setDeceasedMiddleNameEn(deathdet.getDeceasedMiddleNameEn());
            deathcertreading.setDeceasedMiddleNameMl(deathdet.getDeceasedMiddleNameMl());
            deathcertreading.setDeceasedLastNameEn(deathdet.getDeceasedLastNameEn());        
            deathcertreading.setDeceasedLastNameMl(deathdet.getDeceasedLastNameMl());
            deathcertreading.setDeceasedAadharNumber(deathdet.getDeceasedAadharNumber());
            deathcertreading.setDeceasedGender(deathdet.getDeceasedGender());
            deathcertreading.setAge(deathdet.getAge());
            deathcertreading.setAgeUnit(deathdet.getAgeUnit());
            deathcertreading.setDateOfBirth(deathdet.getDateOfBirth());
            deathcertreading.setDeathPlace(deathdet.getDeathPlace());
            deathcertreading.setDeathPlaceType(deathdet.getDeathPlaceType());
            deathcertreading.setDeathPlaceInstId(deathdet.getDeathPlaceInstId());
            deathcertreading.setDeathPlaceOfficerName(deathdet.getDeathPlaceOfficerName());
            deathcertreading.setDeathPlaceOtherMl(deathdet.getDeathPlaceOtherMl());
            deathcertreading.setDeathPlaceOtherEn(deathdet.getDeathPlaceOtherEn());
            deathcertreading.setInformantTitle(deathdet.getInformantTitle());
            deathcertreading.setInformantNameEn(deathdet.getInformantNameEn());
            deathcertreading.setInformantNameMl(deathdet.getInformantNameMl());
            deathcertreading.setInformantAadharSubmitted(deathdet.getInformantAadharSubmitted());
            deathcertreading.setInformantAadharNo(deathdet.getInformantAadharNo());
            deathcertreading.setInformantMobileNo(deathdet.getInformantMobileNo());
            deathcertreading.setGeneralRemarks(deathdet.getGeneralRemarks());
            deathcertreading.setApplicationStatus(deathdet.getApplicationStatus());
            deathcertreading.setSubmittedOn(deathdet.getSubmittedOn());
            deathcertreading.setBurialDistrict(deathdet.getBurialDistrict());
            deathcertreading.setBurialLBType(deathdet.getBurialLBType());
            deathcertreading.setBurialLBName(deathdet.getBurialLBName());
            deathcertreading.setBurialState(deathdet.getBurialState());
            deathcertreading.setRegistrationNo(deathdet.getRegistrationNo());
            deathcertreading.setIpNo(deathdet.getIpNo());
            deathcertreading.setOpNo(deathdet.getOpNo());
            deathcertreading.setMaleDependentUnavailable(deathdet.getMaleDependentUnavailable());       
            deathcertreading.setMaleDependentType(deathdet.getMaleDependentType());
            deathcertreading.setMaleDependentTitle(deathdet.getMaleDependentTitle());
            deathcertreading.setMaleDependentNameEn(deathdet.getMaleDependentNameEn());
            deathcertreading.setMaleDependentNameMl(deathdet.getMaleDependentNameMl());
            deathcertreading.setMaleDependentAadharNo(deathdet.getMaleDependentAadharNo());
            deathcertreading.setMaleDependentMobileNo(deathdet.getMaleDependentMobileNo());
            deathcertreading.setMaleDependentMailId(deathdet.getMaleDependentMailId());
            deathcertreading.setFemaleDependentUnavailable(deathdet.getFemaleDependentUnavailable());
            deathcertreading.setFemaleDependentType(deathdet.getFemaleDependentType());
            deathcertreading.setFemaleDependentTitle(deathdet.getFemaleDependentTitle());
            deathcertreading.setFemaleDependentNameEn(deathdet.getFemaleDependentNameEn());
            deathcertreading.setFemaleDependentNameMl(deathdet.getFemaleDependentNameMl());
            deathcertreading.setFemaleDependentAadharNo(deathdet.getFemaleDependentAadharNo());
            deathcertreading.setFemaleDependentMobileNo(deathdet.getFemaleDependentMobileNo());
            deathcertreading.setFemaleDependentMailId(deathdet.getFemaleDependentMailId());
            deathcertreading.setIsvehicle(deathdet.getIsvehicle());
            deathcertreading.setVehicleHospitalMl(deathdet.getVehicleHospitalMl());
            deathcertreading.setVehicleHospitalEn(deathdet.getVehicleHospitalEn());
            deathcertreading.setVehicleFromplaceMl(deathdet.getVehicleFromplaceMl());
            deathcertreading.setVehicleFromplaceEn(deathdet.getVehicleFromplaceEn());
            deathcertreading.setVehicleToPlaceMl(deathdet.getVehicleToPlaceMl());
            deathcertreading.setVehicleToPlaceMl(deathdet.getVehicleToPlaceEn());
            deathcertreading.setVehicleNumber(deathdet.getVehicleNumber());
            deathcertreading.setVehicleDriverLicenceNo(deathdet.getVehicleDriverLicenceNo());
            deathcertreading.setVehicleFirstHalt(deathdet.getVehicleFirstHalt());
            deathcertreading.setInformantAge(deathdet.getInformantAge());
            deathcertreading.setDeathPlaceWardId(deathdet.getDeathPlaceWardId());
            deathcertreading.setDeathSignedOfficerDesignation(deathdet.getDeathSignedOfficerDesignation());
            deathcertreading.setDeathSignedOfficerMob(deathdet.getDeathSignedOfficerMob());
            deathcertreading.setDeathSignedOfficerAadhaar(deathdet.getDeathSignedOfficerAadhaar());
            deathcertreading.setDeceasedIdproofType(deathdet.getDeceasedIdproofType());
            deathcertreading.setDeceasedIdproofNo(deathdet.getDeceasedIdproofNo());
            deathcertreading.setDeceasedIdproofNo(deathdet.getDeceasedIdproofNo());
            deathcertreading.setDeathACKNo(deathdet.getDeathACKNo());
            deathcertreading.setDeathApplicationNo(deathdet.getDeathApplicationNo());
            deathcertreading.setFileNo(deathdet.getFileNo());
            deathcertreading.setStatisticalInfo(createRegistryStatisticalInfo(deathrequest));
            CrDeathRegistryAddressInfo addressinfo=new CrDeathRegistryAddressInfo();
            addressinfo.setPresentAddress(createRegistryPresentAddress(deathrequest));
            addressinfo.setPermanentAddress(createRegistryPermanentAddress(deathrequest));
            addressinfo.setDeathplaceAddress(createRegistryDeathPlaceAddress(deathrequest));
            addressinfo.setInformantAddress(createRegistryInformantAddress(deathrequest));
            deathcertreading.setAddressInfo(addressinfo);
            deathRegistryDetails.add(deathcertreading);
        });
         request = CrDeathRegistryRequest
                    .builder()
                    .requestInfo(requestInfo)                                                            
                    .deathCertificateDtls(deathRegistryDetails)
                    .build();
       
        return  request;
    }
    public CrDeathRegistryStatistical createRegistryStatisticalInfo(CrDeathDtlRequest deathrequest){

        CrDeathStatistical statisticalDtls = deathrequest.getDeathCertificateDtls().get(0).getStatisticalInfo();
        CrDeathRegistryStatistical registryStatisticalInfo = new CrDeathRegistryStatistical();
        registryStatisticalInfo.setResidenceLocalBody(statisticalDtls.getResidenceLocalBody());
        registryStatisticalInfo.setResidencePlaceType(statisticalDtls.getResidencePlaceType());
        registryStatisticalInfo.setResidenceDistrict(statisticalDtls.getResidenceDistrict()); 
        registryStatisticalInfo.setResidenceLBType(statisticalDtls.getResidenceLBType()); 
        registryStatisticalInfo.setResidenceState(statisticalDtls.getResidenceState()); 
        registryStatisticalInfo.setReligion(statisticalDtls.getReligion()); 
        registryStatisticalInfo.setReligionOther(statisticalDtls.getReligionOther()); 
        registryStatisticalInfo.setOccupation(statisticalDtls.getOccupation()); 
        registryStatisticalInfo.setOccupationSub(statisticalDtls.getOccupationSub()); 
        registryStatisticalInfo.setOccupationMinor(statisticalDtls.getOccupationMinor()); 
        registryStatisticalInfo.setOccupationOther(statisticalDtls.getOccupationOther()); 
        registryStatisticalInfo.setEducationMain(statisticalDtls.getEducationMain()); 
        registryStatisticalInfo.setEducationSub(statisticalDtls.getEducationSub()); 
        registryStatisticalInfo.setMedicalAttentionType(statisticalDtls.getMedicalAttentionType()); 
        registryStatisticalInfo.setDeathMedicallyCertified(statisticalDtls.getDeathMedicallyCertified()); 
        registryStatisticalInfo.setDeathCauseMain(statisticalDtls.getDeathCauseMain()); 
        registryStatisticalInfo.setDeathCauseSub(statisticalDtls.getDeathCauseSub()); 
        registryStatisticalInfo.setDeathCauseOther(statisticalDtls.getDeathCauseOther()); 
        registryStatisticalInfo.setDeathDuringDelivery(statisticalDtls.getDeathDuringDelivery());  
        registryStatisticalInfo.setSmokingNumYears(statisticalDtls.getSmokingNumYears()); 
        registryStatisticalInfo.setTobaccoNumYears(statisticalDtls.getTobaccoNumYears()); 
        registryStatisticalInfo.setArecanutNumYears(statisticalDtls.getArecanutNumYears()); 
        registryStatisticalInfo.setAlcoholNumYears(statisticalDtls.getAlcoholNumYears());
        return registryStatisticalInfo;
    }
    public CrDeathRegistryAddress createRegistryPresentAddress(CrDeathDtlRequest deathrequest){

        CrDeathAddress presentAddress = deathrequest.getDeathCertificateDtls().get(0).getAddressInfo().getPresentAddress();
        System.out.println("presentAddress"+presentAddress);
        CrDeathRegistryAddress registryPresentAddress = new CrDeathRegistryAddress();
        registryPresentAddress.setAddrTypeId(presentAddress.getAddrTypeId());
        registryPresentAddress.setHouseNo(presentAddress.getHouseNo());
        registryPresentAddress.setResidenceAsscNo(presentAddress.getResidenceAsscNo());
        registryPresentAddress.setStreetNameEn(presentAddress.getStreetNameEn());
        registryPresentAddress.setStreetNameMl(presentAddress.getStreetNameMl());
        registryPresentAddress.setLocalityEn(presentAddress.getLocalityEn());
        registryPresentAddress.setLocalityMl(presentAddress.getLocalityMl());
        registryPresentAddress.setCityEn(presentAddress.getCityEn());
        registryPresentAddress.setCityMl(presentAddress.getCityMl());
        registryPresentAddress.setWardId(presentAddress.getWardId());
        registryPresentAddress.setTalukId(presentAddress.getTalukId());
        registryPresentAddress.setVillageId(presentAddress.getVillageId());
        registryPresentAddress.setPostOfficeId(presentAddress.getPostOfficeId());
        registryPresentAddress.setPincode(presentAddress.getPincode());
        registryPresentAddress.setDistrictId(presentAddress.getDistrictId());
        registryPresentAddress.setStateId(presentAddress.getStateId());
        registryPresentAddress.setCountryId(presentAddress.getCountryId());
        registryPresentAddress.setTalukNameEn(presentAddress.getTalukNameEn());
        registryPresentAddress.setTalukNameMl(presentAddress.getTalukNameMl());
        registryPresentAddress.setVillageNameEn(presentAddress.getVillageNameEn());
        registryPresentAddress.setVillageNameMl(presentAddress.getVillageNameMl());
        registryPresentAddress.setPostofficeNameEn(presentAddress.getPostofficeNameEn());
        registryPresentAddress.setPostofficeNameMl(presentAddress.getPostofficeNameMl());
        registryPresentAddress.setLocationType(presentAddress.getLocationType());
        registryPresentAddress.setHoueNameMl(presentAddress.getHoueNameMl());
        registryPresentAddress.setHoueNameEn(presentAddress.getHoueNameEn());
        return registryPresentAddress;
    }

    public CrDeathRegistryAddress createRegistryPermanentAddress(CrDeathDtlRequest deathrequest){

        CrDeathAddress permanentAddress = deathrequest.getDeathCertificateDtls().get(0).getAddressInfo().getPermanentAddress();
        CrDeathRegistryAddress registryPermanentAddress = new CrDeathRegistryAddress();
        registryPermanentAddress.setAddrTypeId(permanentAddress.getAddrTypeId());
        registryPermanentAddress.setHouseNo(permanentAddress.getHouseNo());
        registryPermanentAddress.setResidenceAsscNo(permanentAddress.getResidenceAsscNo());
        registryPermanentAddress.setStreetNameEn(permanentAddress.getStreetNameEn());
        registryPermanentAddress.setStreetNameMl(permanentAddress.getStreetNameMl());
        registryPermanentAddress.setLocalityEn(permanentAddress.getLocalityEn());
        registryPermanentAddress.setLocalityMl(permanentAddress.getLocalityMl());
        registryPermanentAddress.setCityEn(permanentAddress.getCityEn());
        registryPermanentAddress.setCityMl(permanentAddress.getCityMl());
        registryPermanentAddress.setWardId(permanentAddress.getWardId());
        registryPermanentAddress.setTalukId(permanentAddress.getTalukId());
        registryPermanentAddress.setVillageId(permanentAddress.getVillageId());
        registryPermanentAddress.setPostOfficeId(permanentAddress.getPostOfficeId());
        registryPermanentAddress.setPincode(permanentAddress.getPincode());
        registryPermanentAddress.setDistrictId(permanentAddress.getDistrictId());
        registryPermanentAddress.setStateId(permanentAddress.getStateId());
        registryPermanentAddress.setCountryId(permanentAddress.getCountryId());
        registryPermanentAddress.setTalukNameEn(permanentAddress.getTalukNameEn());
        registryPermanentAddress.setTalukNameMl(permanentAddress.getTalukNameMl());
        registryPermanentAddress.setVillageNameEn(permanentAddress.getVillageNameEn());
        registryPermanentAddress.setVillageNameMl(permanentAddress.getVillageNameMl());
        registryPermanentAddress.setPostofficeNameEn(permanentAddress.getPostofficeNameEn());
        registryPermanentAddress.setPostofficeNameMl(permanentAddress.getPostofficeNameMl());
        registryPermanentAddress.setLocationType(permanentAddress.getLocationType());
        registryPermanentAddress.setHoueNameMl(permanentAddress.getHoueNameMl());
        registryPermanentAddress.setHoueNameEn(permanentAddress.getHoueNameEn());
        return registryPermanentAddress;
    }

    public CrDeathRegistryAddress createRegistryDeathPlaceAddress(CrDeathDtlRequest deathrequest){

        CrDeathAddress deathplaceAddress = deathrequest.getDeathCertificateDtls().get(0).getAddressInfo().getDeathplaceAddress();
        CrDeathRegistryAddress registryDeathPlaceAddress = new CrDeathRegistryAddress();
        registryDeathPlaceAddress.setAddrTypeId(deathplaceAddress.getAddrTypeId());
        registryDeathPlaceAddress.setHouseNo(deathplaceAddress.getHouseNo());
        registryDeathPlaceAddress.setResidenceAsscNo(deathplaceAddress.getResidenceAsscNo());
        registryDeathPlaceAddress.setStreetNameEn(deathplaceAddress.getStreetNameEn());
        registryDeathPlaceAddress.setStreetNameMl(deathplaceAddress.getStreetNameMl());
        registryDeathPlaceAddress.setLocalityEn(deathplaceAddress.getLocalityEn());
        registryDeathPlaceAddress.setLocalityMl(deathplaceAddress.getLocalityMl());
        registryDeathPlaceAddress.setCityEn(deathplaceAddress.getCityEn());
        registryDeathPlaceAddress.setCityMl(deathplaceAddress.getCityMl());
        registryDeathPlaceAddress.setWardId(deathplaceAddress.getWardId());
        registryDeathPlaceAddress.setTalukId(deathplaceAddress.getTalukId());
        registryDeathPlaceAddress.setVillageId(deathplaceAddress.getVillageId());
        registryDeathPlaceAddress.setPostOfficeId(deathplaceAddress.getPostOfficeId());
        registryDeathPlaceAddress.setPincode(deathplaceAddress.getPincode());
        registryDeathPlaceAddress.setDistrictId(deathplaceAddress.getDistrictId());
        registryDeathPlaceAddress.setStateId(deathplaceAddress.getStateId());
        registryDeathPlaceAddress.setCountryId(deathplaceAddress.getCountryId());
        registryDeathPlaceAddress.setTalukNameEn(deathplaceAddress.getTalukNameEn());
        registryDeathPlaceAddress.setTalukNameMl(deathplaceAddress.getTalukNameMl());
        registryDeathPlaceAddress.setVillageNameEn(deathplaceAddress.getVillageNameEn());
        registryDeathPlaceAddress.setVillageNameMl(deathplaceAddress.getVillageNameMl());
        registryDeathPlaceAddress.setPostofficeNameEn(deathplaceAddress.getPostofficeNameEn());
        registryDeathPlaceAddress.setPostofficeNameMl(deathplaceAddress.getPostofficeNameMl());
        registryDeathPlaceAddress.setLocationType(deathplaceAddress.getLocationType());
        registryDeathPlaceAddress.setHoueNameMl(deathplaceAddress.getHoueNameMl());
        registryDeathPlaceAddress.setHoueNameEn(deathplaceAddress.getHoueNameEn());
        return registryDeathPlaceAddress;
    }
    public CrDeathRegistryAddress createRegistryInformantAddress(CrDeathDtlRequest deathrequest){

        CrDeathAddress informantAddress = deathrequest.getDeathCertificateDtls().get(0).getAddressInfo().getInformantAddress();
        CrDeathRegistryAddress registryInformantAddress = new CrDeathRegistryAddress();
        registryInformantAddress.setAddrTypeId(informantAddress.getAddrTypeId());
        registryInformantAddress.setHouseNo(informantAddress.getHouseNo());
        registryInformantAddress.setResidenceAsscNo(informantAddress.getResidenceAsscNo());
        registryInformantAddress.setStreetNameEn(informantAddress.getStreetNameEn());
        registryInformantAddress.setStreetNameMl(informantAddress.getStreetNameMl());
        registryInformantAddress.setLocalityEn(informantAddress.getLocalityEn());
        registryInformantAddress.setLocalityMl(informantAddress.getLocalityMl());
        registryInformantAddress.setCityEn(informantAddress.getCityEn());
        registryInformantAddress.setCityMl(informantAddress.getCityMl());
        registryInformantAddress.setWardId(informantAddress.getWardId());
        registryInformantAddress.setTalukId(informantAddress.getTalukId());
        registryInformantAddress.setVillageId(informantAddress.getVillageId());
        registryInformantAddress.setPostOfficeId(informantAddress.getPostOfficeId());
        registryInformantAddress.setPincode(informantAddress.getPincode());
        registryInformantAddress.setDistrictId(informantAddress.getDistrictId());
        registryInformantAddress.setStateId(informantAddress.getStateId());
        registryInformantAddress.setCountryId(informantAddress.getCountryId());
        registryInformantAddress.setTalukNameEn(informantAddress.getTalukNameEn());
        registryInformantAddress.setTalukNameMl(informantAddress.getTalukNameMl());
        registryInformantAddress.setVillageNameEn(informantAddress.getVillageNameEn());
        registryInformantAddress.setVillageNameMl(informantAddress.getVillageNameMl());
        registryInformantAddress.setPostofficeNameEn(informantAddress.getPostofficeNameEn());
        registryInformantAddress.setPostofficeNameMl(informantAddress.getPostofficeNameMl());
        registryInformantAddress.setLocationType(informantAddress.getLocationType());
        registryInformantAddress.setHoueNameMl(informantAddress.getHoueNameMl());
        registryInformantAddress.setHoueNameEn(informantAddress.getHoueNameEn());
        return registryInformantAddress;
    }

}
