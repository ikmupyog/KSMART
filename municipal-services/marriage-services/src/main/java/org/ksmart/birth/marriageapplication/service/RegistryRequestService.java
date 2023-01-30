package org.ksmart.birth.marriageapplication.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.birth.marriageapplication.model.birth.BirthDetailsRequest;
import org.ksmart.birth.marriageregistry.model.*;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Slf4j
@Service
public class RegistryRequestService {
    public RegisterBirthDetailsRequest createRegistryRequest(BirthDetailsRequest requestBirthReq){
        RegisterBirthDetailsRequest request = new RegisterBirthDetailsRequest();
        List<RegisterBirthDetail> registerBirthDetails =  new LinkedList<>();
        RegisterBirthDetail registerBirthDetail = new RegisterBirthDetail();
        registerBirthDetail.setDateOfReport(requestBirthReq.getBirthDetails().get(0).getDateOfReport());
        registerBirthDetail.setDateOfBirth(requestBirthReq.getBirthDetails().get(0).getDateOfBirth());
        registerBirthDetail.setDateOfReport(requestBirthReq.getBirthDetails().get(0).getDateOfReport());
        registerBirthDetail.setDateOfBirth(requestBirthReq.getBirthDetails().get(0).getDateOfBirth());
        registerBirthDetail.setTimeOfBirth(requestBirthReq.getBirthDetails().get(0).getTimeOfBirth());
        registerBirthDetail.setAmpm(requestBirthReq.getBirthDetails().get(0).getAmpm());
        registerBirthDetail.setFirstNameEn(requestBirthReq.getBirthDetails().get(0).getFirstNameEn());
        registerBirthDetail.setFirstNameMl(requestBirthReq.getBirthDetails().get(0).getFirstNameMl());
        registerBirthDetail.setMiddleNameEn(requestBirthReq.getBirthDetails().get(0).getMiddleNameEn());
        registerBirthDetail.setMiddleNameMl(requestBirthReq.getBirthDetails().get(0).getMiddleNameMl());
        registerBirthDetail.setLastNameEn(requestBirthReq.getBirthDetails().get(0).getLastNameEn());
        registerBirthDetail.setLastNameMl(requestBirthReq.getBirthDetails().get(0).getLastNameMl());
        registerBirthDetail.setTenantId(requestBirthReq.getBirthDetails().get(0).getTenantId());
        registerBirthDetail.setGender(requestBirthReq.getBirthDetails().get(0).getGender());
        registerBirthDetail.setRemarksEn(requestBirthReq.getBirthDetails().get(0).getRemarksEn());
        registerBirthDetail.setRemarksMl(requestBirthReq.getBirthDetails().get(0).getRemarksMl());
        registerBirthDetail.setAadharNo(requestBirthReq.getBirthDetails().get(0).getAadharNo());
        registerBirthDetail.setEsignUserCode(requestBirthReq.getBirthDetails().get(0).getEsignUserCode());
        registerBirthDetail.setEsignUserDesigCode(requestBirthReq.getBirthDetails().get(0).getEsignUserDesigCode());
        registerBirthDetail.setIsAdopted(requestBirthReq.getBirthDetails().get(0).getIsAdopted());
        registerBirthDetail.setIsAbandoned(requestBirthReq.getBirthDetails().get(0).getIsAbandoned());
        registerBirthDetail.setIsMultipleBirth(requestBirthReq.getBirthDetails().get(0).getIsMultipleBirth());
        registerBirthDetail.setIsFatherInfoMissing(requestBirthReq.getBirthDetails().get(0).getIsFatherInfoMissing());
        registerBirthDetail.setIsMotherInfoMissing(requestBirthReq.getBirthDetails().get(0).getIsMotherInfoMissing());
        registerBirthDetail.setNoOfAliveBirth(requestBirthReq.getBirthDetails().get(0).getNoOfAliveBirth());
        registerBirthDetail.setMultipleBirthDetId(requestBirthReq.getBirthDetails().get(0).getMultipleBirthDetailsIid());
        registerBirthDetail.setIsBornOutside(requestBirthReq.getBirthDetails().get(0).getIsBornOutside());
        registerBirthDetail.setOtPassportNo(requestBirthReq.getBirthDetails().get(0).getPassportNo());
        registerBirthDetail.setRegistrationNo(requestBirthReq.getBirthDetails().get(0).getRegistrationNo());
        registerBirthDetail.setRegistrationStatus("ACTIVE");
        registerBirthDetail.setRegistrationDate(requestBirthReq.getBirthDetails().get(0).getRegistrationDate());
        registerBirthDetail.setRegisterBirthPlace(createBirthPlace(requestBirthReq));
        registerBirthDetail.setRegisterBirthFather(createFatherInfor(requestBirthReq));
        registerBirthDetail.setRegisterBirthMother(createMotherInfor(requestBirthReq));
        registerBirthDetail.setRegisterBirthPermanent(createRegisterBirthPermanentAddress(requestBirthReq));
        registerBirthDetail.setRegisterBirthPresent(createRegisterBirthPresentAddress(requestBirthReq));
        registerBirthDetail.setRegisterBirthStatitical(createRegisterBirthStatiticalInformation(requestBirthReq));
        registerBirthDetails.add(registerBirthDetail);
        request.setRequestInfo(requestBirthReq.getRequestInfo());
        request.setRegisterBirthDetails(registerBirthDetails);
        return  request;
    }
    private RegisterBirthPlace createBirthPlace(BirthDetailsRequest requestBirthReq) {
        RegisterBirthPlace registerBirthPlace = new RegisterBirthPlace();
        registerBirthPlace.setPlaceOfBirthId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getPlaceOfBirthId());
        registerBirthPlace.setHospitalId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHospitalId());
        registerBirthPlace.setVehicleTypeId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleTypeId());
        registerBirthPlace.setVehicleRegistrationNo(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleRegistrationNo());
        registerBirthPlace.setVehicleFromEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleFromEn());
        registerBirthPlace.setVehicleToEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleToEn());
        registerBirthPlace.setVehicleFromMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleFromMl());
        registerBirthPlace.setVehicleToMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleToMl());
        registerBirthPlace.setVehicleOtherEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleOtherEn());
        registerBirthPlace.setVehicleOtherMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleOtherMl());
        registerBirthPlace.setVehicleAdmitHospitalEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleAdmitHospitalEn());
        registerBirthPlace.setVehicleAdmitHospitalMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getVehicleAdmitHospitalMl());
        registerBirthPlace.setPublicPlaceId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getPublicPlaceId());
        registerBirthPlace.setHoHouseHolderEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoHouseHolderEn());
        registerBirthPlace.setHoHouseHolderMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoHouseHolderMl());
        registerBirthPlace.setHoBuildingNo(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoBuildingNo());
        registerBirthPlace.setHoResAssoNo(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoResAssoNo());
        registerBirthPlace.setHoHousenNo(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoHousenNo());
        registerBirthPlace.setHouseNameEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHouseNameEn());
        registerBirthPlace.setHouseNameMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHouseNameMl());
        registerBirthPlace.setHoVillageId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoVillageId());
        registerBirthPlace.setHoTalukId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoTalukId());
        registerBirthPlace.setHoDistrictId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoDistrictId());
        registerBirthPlace.setHoStateId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoStateId());
        registerBirthPlace.setHoPoId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoPoId());
        registerBirthPlace.setHoPinNo(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoPinNo());
        registerBirthPlace.setHoCountryId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getHoCountryId());
        registerBirthPlace.setWardId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getWardId());
        registerBirthPlace.setOthDetailsEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getOthDetailsEn());
        registerBirthPlace.setOthDetailsMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getOthDetailsMl());
        registerBirthPlace.setInstitutionTypeId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getInstitutionTypeId());
        registerBirthPlace.setInstitutionId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getInstitutionId());
        registerBirthPlace.setAuthOfficerId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getAuthOfficerId());
        registerBirthPlace.setAuthOfficerDesigId(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getAuthOfficerDesigId());
        registerBirthPlace.setOthAuthOfficerName(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getOthAuthOfficerName());
        registerBirthPlace.setOthAuthOfficerDesig(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getOthAuthOfficerDesig());
        registerBirthPlace.setInformantsNameEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getInformantsNameEn());
        registerBirthPlace.setInformantsNameMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getInformantsNameMl());
        registerBirthPlace.setInformantsAddressEn(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getInformantsAddressEn());
        registerBirthPlace.setInformantsAddressMl(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getInformantsAddressMl());
        registerBirthPlace.setInformantsMobileNo(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getInformantsMobileNo());
        registerBirthPlace.setInformantsAadhaarNo(requestBirthReq.getBirthDetails().get(0).getBirthPlace().getInformantsAadhaarNo());
        return registerBirthPlace;
    }

    private RegisterBirthMotherInfo createMotherInfor(BirthDetailsRequest requestBirthReq) {
        RegisterBirthMotherInfo registerBirthMotherInfo = new RegisterBirthMotherInfo();
        registerBirthMotherInfo.setFirstNameEn(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getFirstNameEn());
        registerBirthMotherInfo.setFirstNameMl(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getFirstNameMl());
        registerBirthMotherInfo.setMiddleNameEn(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getMiddleNameEn());
        registerBirthMotherInfo.setMiddleNameMl(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getMiddleNameMl());
        registerBirthMotherInfo.setLastNameEn(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getLastNameEn());
        registerBirthMotherInfo.setLastNameMl(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getLastNameMl());
        registerBirthMotherInfo.setAadharNo(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getAadharNo());
        registerBirthMotherInfo.setOtPassportNo(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getPassportNo());
        registerBirthMotherInfo.setEmailId(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getEmailId());
        registerBirthMotherInfo.setMobileNo(requestBirthReq.getBirthDetails().get(0).getBirthMotherInfo().getMobileNo());
        return registerBirthMotherInfo;
    }

    private RegisterBirthFatherInfo createFatherInfor(BirthDetailsRequest requestBirthReq) {
        RegisterBirthFatherInfo registerBirthFatherInfo = new RegisterBirthFatherInfo();
        registerBirthFatherInfo.setFirstNameEn(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getFirstNameEn());
        registerBirthFatherInfo.setFirstNameMl(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getFirstNameMl());
        registerBirthFatherInfo.setMiddleNameEn(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getMiddleNameEn());
        registerBirthFatherInfo.setMiddleNameMl(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getMiddleNameMl());
        registerBirthFatherInfo.setLastNameEn(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getLastNameEn());
        registerBirthFatherInfo.setLastNameMl(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getLastNameMl());
        registerBirthFatherInfo.setAadharNo(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getAadharNo());
        registerBirthFatherInfo.setOtPassportNo(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getPassportNo());
        registerBirthFatherInfo.setEmailId(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getEmailId());
        registerBirthFatherInfo.setMobileNo(requestBirthReq.getBirthDetails().get(0).getBirthFatherInfo().getMobileNo());
        return registerBirthFatherInfo;
    }

    private RegisterBirthPermanentAddress createRegisterBirthPermanentAddress(BirthDetailsRequest requestBirthReq) {
        RegisterBirthPermanentAddress registerBirthPermanentAddress = new RegisterBirthPermanentAddress();
        registerBirthPermanentAddress.setResAssoNo(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getResAssoNo());
        registerBirthPermanentAddress.setHouseNameEn(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getHouseNameEn());
        registerBirthPermanentAddress.setHouseNameMl(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getHouseNameMl());
        registerBirthPermanentAddress.setOtAddress1En(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getOtAddress1En());
        registerBirthPermanentAddress.setOtAddress1Ml(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getOtAddress1Ml());
        registerBirthPermanentAddress.setOtAddress2En(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getOtAddress2En());
        registerBirthPermanentAddress.setOtAddress2Ml(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getOtAddress2Ml());
        registerBirthPermanentAddress.setVillageId(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getVillageId());
        registerBirthPermanentAddress.setTenantId(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getTenantId());
        registerBirthPermanentAddress.setTalukId(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getTalukId());
        registerBirthPermanentAddress.setDistrictId(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getDistrictId());
        registerBirthPermanentAddress.setStateId(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getStateId());
        registerBirthPermanentAddress.setPoId(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getPoId());
        registerBirthPermanentAddress.setPinNo(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getPinNo());
        registerBirthPermanentAddress.setOtStateRegionProvinceEn(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getOtStateRegionProvinceEn());
        registerBirthPermanentAddress.setOtStateRegionProvinceMl(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getOtStateRegionProvinceMl());
        registerBirthPermanentAddress.setCountryId(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getCountryId());
        registerBirthPermanentAddress.setResAssoNoMl(requestBirthReq.getBirthDetails().get(0).getBirthPermanentAddress().getResAssoNoMl());
        return registerBirthPermanentAddress;
    }

    private RegisterBirthPresentAddress createRegisterBirthPresentAddress(BirthDetailsRequest requestBirthReq) {
        RegisterBirthPresentAddress registerBirthPresentAddress = new RegisterBirthPresentAddress();
        registerBirthPresentAddress.setResAssoNo(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getResAssoNo());
        registerBirthPresentAddress.setHouseNameEn(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getHouseNameEn());
        registerBirthPresentAddress.setHouseNameMl(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getHouseNameMl());
        registerBirthPresentAddress.setOtAddress1En(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getOtAddress1En());
        registerBirthPresentAddress.setOtAddress1Ml(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getOtAddress1Ml());
        registerBirthPresentAddress.setOtAddress2En(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getOtAddress2En());
        registerBirthPresentAddress.setOtAddress2Ml(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getOtAddress2Ml());
        registerBirthPresentAddress.setVillageId(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getVillageId());
        registerBirthPresentAddress.setTenantId(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getTenantId());
        registerBirthPresentAddress.setTalukId(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getTalukId());
        registerBirthPresentAddress.setDistrictId(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getDistrictId());
        registerBirthPresentAddress.setStateId(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getStateId());
        registerBirthPresentAddress.setPoId(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getPoId());
        registerBirthPresentAddress.setPinNo(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getPinNo());
        registerBirthPresentAddress.setOtStateRegionProvinceEn(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getOtStateRegionProvinceEn());
        registerBirthPresentAddress.setOtStateRegionProvinceMl(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getOtStateRegionProvinceMl());
        registerBirthPresentAddress.setCountryId(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getCountryId());
        registerBirthPresentAddress.setResAssoNoMl(requestBirthReq.getBirthDetails().get(0).getBirthPresentAddress().getResAssoNoMl());
        return registerBirthPresentAddress;
    }

    private RegisterBirthStatiticalInformation createRegisterBirthStatiticalInformation(BirthDetailsRequest requestBirthReq) {
        RegisterBirthStatiticalInformation registerBirthStatiticalInformation = new RegisterBirthStatiticalInformation();

        registerBirthStatiticalInformation.setDeliveryMethod(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getDeliveryMethod());
        registerBirthStatiticalInformation.setWeightOfChild(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getWeightOfChild());
        registerBirthStatiticalInformation.setDurationOfPregnancyInWeek(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getDurationOfPregnancyInWeek());
        registerBirthStatiticalInformation.setNatureOfMedicalAttention(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getNatureOfMedicalAttention());
        registerBirthStatiticalInformation.setWayOfPregnancy(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getWayOfPregnancy());
        registerBirthStatiticalInformation.setDeliveryMethod(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getDeliveryMethod());
        registerBirthStatiticalInformation.setDeliveryTypeOthersEn(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getDeliveryTypeOthersEn());
        registerBirthStatiticalInformation.setDeliveryTypeOthersMl(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getDeliveryTypeOthersMl());
        registerBirthStatiticalInformation.setReligionId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getReligionId());
        registerBirthStatiticalInformation.setFatherEducationId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getFatherEducationId());
        registerBirthStatiticalInformation.setFatherEducationSubId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getFatherEducationSubId());
        registerBirthStatiticalInformation.setFatherProffessionId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getFatherProffessionId());
        registerBirthStatiticalInformation.setMotherEducationId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherEducationId());
        registerBirthStatiticalInformation.setMotherProffessionId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherProffessionId());
        registerBirthStatiticalInformation.setMotherNationalityId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherNationalityId());
        registerBirthStatiticalInformation.setMotherAgeMarriage(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherAgeMarriage());
        registerBirthStatiticalInformation.setMotherAgeDelivery(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherAgeDelivery());
        registerBirthStatiticalInformation.setMotherNoOfBirthGiven(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherNoOfBirthGiven());
        registerBirthStatiticalInformation.setMotherMaritalStatusId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherMaritalStatusId());
        registerBirthStatiticalInformation.setMotherUnmarried(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherUnmarried());
        registerBirthStatiticalInformation.setMotherResLbId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResLbId());
        registerBirthStatiticalInformation.setMotherResLbCode(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResLbCode());
        registerBirthStatiticalInformation.setMotherResPlaceTypeId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResPlaceTypeId());
        registerBirthStatiticalInformation.setMotherResLbTypeId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResLbTypeId());
        registerBirthStatiticalInformation.setMotherResDistrictId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResDistrictId());
        registerBirthStatiticalInformation.setMotherResStateId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResStateId());
        registerBirthStatiticalInformation.setMotherResCountryId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResCountryId());
        registerBirthStatiticalInformation.setMotherResdnceAddrType(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdnceAddrType());
        registerBirthStatiticalInformation.setMotherResdnceTenentId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdnceTenentId());
        registerBirthStatiticalInformation.setMotherResdncePlaceType(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdncePlaceType());
        registerBirthStatiticalInformation.setMotherResdncePlaceEn(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdncePlaceEn());
        registerBirthStatiticalInformation.setMotherResdncePlaceMl(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdncePlaceMl());
        registerBirthStatiticalInformation.setMotherResdnceLbType(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdnceLbType());
        registerBirthStatiticalInformation.setMotherResdnceDistrictId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdnceDistrictId());
        registerBirthStatiticalInformation.setMotherResdnceStateId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdnceStateId());
        registerBirthStatiticalInformation.setMotherResdnceCountryId(requestBirthReq.getBirthDetails().get(0).getBirthStatisticalInformation().getMotherResdnceCountryId());
        return registerBirthStatiticalInformation;
    }

}

