package org.ksmart.marriage.marriagecorrection.mapper;


import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.*;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RegistryToApplicationMapper {

    public MarriageApplicationDetails convert(List<MarriageRegistryDetails> registry){

        MarriageApplicationDetails marriageApplicationDetails=new MarriageApplicationDetails();
        if(marriageApplicationDetails != null && registry.get(0) != null) {
            marriageApplicationDetails.setBrideDetails(new BrideDetails());
            marriageApplicationDetails.setGroomDetails(new GroomDetails());
            marriageApplicationDetails.setBrideAddressDetails(new BrideAddressDetails());
            marriageApplicationDetails.setGroomAddressDetails(new GroomAddressDetails());
            marriageApplicationDetails.setWitnessDetails(new WitnessDetails());
            MarriageRegistryDetails marriageRegistryDetails = registry.get(0);

            //MARRIAGE DETAILS
            marriageApplicationDetails.setDateofmarriage(marriageRegistryDetails.getDateofmarriage());
            marriageApplicationDetails.setDistrictid(marriageRegistryDetails.getDistrictid());
            marriageApplicationDetails.setLbtype(marriageRegistryDetails.getLbtype());
            marriageApplicationDetails.setTenantid(marriageRegistryDetails.getTenantid());
            marriageApplicationDetails.setLandmark(marriageRegistryDetails.getLandmark());
            marriageApplicationDetails.setPlacetype(marriageRegistryDetails.getPlacetype());
            marriageApplicationDetails.setPlaceid(marriageRegistryDetails.getPlaceid());
            marriageApplicationDetails.setPlacenameEn(marriageRegistryDetails.getPlacenameEn());
            marriageApplicationDetails.setPlacenameMl(marriageRegistryDetails.getPlacenameMl());
            marriageApplicationDetails.setMarriageHouseNoAndNameEn(marriageRegistryDetails.getMarriageHouseNoAndNameEn());
            marriageApplicationDetails.setMarriageHouseNoAndNameMl(marriageRegistryDetails.getMarriageHouseNoAndNameMl());
            marriageApplicationDetails.setStreetNameEn(marriageRegistryDetails.getStreet_name_en());
            marriageApplicationDetails.setStreetNameMl(marriageRegistryDetails.getStreet_name_ml());
            marriageApplicationDetails.setWardCode(marriageRegistryDetails.getWard_code());
            marriageApplicationDetails.setTalukid(marriageRegistryDetails.getTalukid());
            marriageApplicationDetails.setVillageName(marriageRegistryDetails.getVillage_name());
            marriageApplicationDetails.setMarriageType(marriageRegistryDetails.getMarriage_type());
            marriageApplicationDetails.setOthMarriageType(marriageRegistryDetails.getOth_marriage_type());
            marriageApplicationDetails.setLandmark(marriageRegistryDetails.getLandmark());
            marriageApplicationDetails.setLocalityEn(marriageRegistryDetails.getLocality_en());
            marriageApplicationDetails.setLocalityMl(marriageRegistryDetails.getLocality_ml());
            marriageApplicationDetails.setRegistrationDate(marriageRegistryDetails.getRegistrationDate());
            marriageApplicationDetails.setRegistrationNo(marriageRegistryDetails.getRegistrationno());
            marriageApplicationDetails.setTalukName(marriageRegistryDetails.getTalukName());
            marriageApplicationDetails.setVillageId(marriageRegistryDetails.getVillageId());

            marriageApplicationDetails.setModuleCode(marriageRegistryDetails.getModuleCode());
            marriageApplicationDetails.setZonalOffice(marriageRegistryDetails.getZonalOffice());
            if (marriageApplicationDetails.getWitnessDetails() != null && marriageRegistryDetails.getWitnessDetails() != null) {
                marriageApplicationDetails.getWitnessDetails().setBrideUrl(marriageRegistryDetails.getWitnessDetails().getBrideUrl());
                marriageApplicationDetails.getWitnessDetails().setGroomUrl(marriageRegistryDetails.getWitnessDetails().getGroomUrl());
                marriageApplicationDetails.getWitnessDetails().setImageUuid(marriageRegistryDetails.getWitnessDetails().getImageUuid());
                marriageApplicationDetails.getWitnessDetails().setBrideFilestoreId(marriageRegistryDetails.getWitnessDetails().getBrideFilestoreId());
                marriageApplicationDetails.getWitnessDetails().setGroomFilestoreId(marriageRegistryDetails.getWitnessDetails().getGroomFilestoreId());
                marriageApplicationDetails.getWitnessDetails().setBrideExpired(marriageRegistryDetails.getWitnessDetails().getBrideExpired());
                marriageApplicationDetails.getWitnessDetails().setGroomExpired(marriageRegistryDetails.getWitnessDetails().getGroomExpired());
                marriageApplicationDetails.getWitnessDetails().setIsBackward(marriageRegistryDetails.getWitnessDetails().getIsBackward());
            }

            //BRIDE DETAILS
            if (marriageApplicationDetails.getBrideDetails() != null && marriageRegistryDetails.getBrideDetails() != null) {
                marriageApplicationDetails.getBrideDetails().setBrideGroom(marriageRegistryDetails.getBrideDetails().getBrideGroom());
                marriageApplicationDetails.getBrideDetails().setResidentship(marriageRegistryDetails.getBrideDetails().getResidentship());
                marriageApplicationDetails.getBrideDetails().setPassportno(marriageRegistryDetails.getBrideDetails().getPassportno());
                marriageApplicationDetails.getBrideDetails().setAadharno(marriageRegistryDetails.getBrideDetails().getAadharno());
                marriageApplicationDetails.getBrideDetails().setSocialsecurityno(marriageRegistryDetails.getBrideDetails().getSocialsecurityno());
                marriageApplicationDetails.getBrideDetails().setFirstnameEn(marriageRegistryDetails.getBrideDetails().getFirstname_en());
                marriageApplicationDetails.getBrideDetails().setFirstnameMl(marriageRegistryDetails.getBrideDetails().getFirstname_ml());
                marriageApplicationDetails.getBrideDetails().setMiddlenameEn(marriageRegistryDetails.getBrideDetails().getMiddlename_en());
                marriageApplicationDetails.getBrideDetails().setMiddlenameMl(marriageRegistryDetails.getBrideDetails().getMiddlename_ml());
                marriageApplicationDetails.getBrideDetails().setLastnameEn(marriageRegistryDetails.getBrideDetails().getLastname_en());
                marriageApplicationDetails.getBrideDetails().setLastnameMl(marriageRegistryDetails.getBrideDetails().getLastname_ml());
                marriageApplicationDetails.getBrideDetails().setMobile(marriageRegistryDetails.getBrideDetails().getMobile());
                marriageApplicationDetails.getBrideDetails().setEmailid(marriageRegistryDetails.getBrideDetails().getEmailid());
                marriageApplicationDetails.getBrideDetails().setGender(marriageRegistryDetails.getBrideDetails().getGender());
                marriageApplicationDetails.getBrideDetails().setDateofbirth(marriageRegistryDetails.getBrideDetails().getDateofbirth());
                marriageApplicationDetails.getBrideDetails().setAge(marriageRegistryDetails.getBrideDetails().getAge());
                marriageApplicationDetails.getBrideDetails().setParentGuardian(marriageRegistryDetails.getBrideDetails().getParent_guardian());
                marriageApplicationDetails.getBrideDetails().setBrideIsSpouseLiving(marriageRegistryDetails.getBrideDetails().getBrideIsSpouseLiving());
                marriageApplicationDetails.getBrideDetails().setBrideNoOfSpouse(marriageRegistryDetails.getBrideDetails().getBrideNoOfSpouse());
                marriageApplicationDetails.getBrideDetails().setFatherAadharno(marriageRegistryDetails.getBrideDetails().getFather_aadharno());
                marriageApplicationDetails.getBrideDetails().setFathernameEn(marriageRegistryDetails.getBrideDetails().getFathername_en());
                marriageApplicationDetails.getBrideDetails().setFathernameMl(marriageRegistryDetails.getBrideDetails().getFathername_ml());
                marriageApplicationDetails.getBrideDetails().setGuardiannameEn(marriageRegistryDetails.getBrideDetails().getGuardianname_en());
                marriageApplicationDetails.getBrideDetails().setGuardiannameMl(marriageRegistryDetails.getBrideDetails().getGuardianname_ml());
                marriageApplicationDetails.getBrideDetails().setGuardianAadharno(marriageRegistryDetails.getBrideDetails().getGuardian_aadharno());
                marriageApplicationDetails.getBrideDetails().setMothernameEn(marriageRegistryDetails.getBrideDetails().getMothername_en());
                marriageApplicationDetails.getBrideDetails().setMothernameMl(marriageRegistryDetails.getBrideDetails().getMothername_ml());
                marriageApplicationDetails.getBrideDetails().setMotherAadharno(marriageRegistryDetails.getBrideDetails().getMother_aadharno());
                marriageApplicationDetails.getBrideDetails().setMaritalstatusid(marriageRegistryDetails.getBrideDetails().getMaritalstatusid());
                marriageApplicationDetails.getBrideDetails().setTenentId(marriageRegistryDetails.getBrideDetails().getTenentId());
            }

            //GROOM DETAILS
            if (marriageApplicationDetails.getGroomDetails() != null && marriageRegistryDetails.getGroomDetails() != null) {
                marriageApplicationDetails.getGroomDetails().setBrideGroom(marriageRegistryDetails.getGroomDetails().getBrideGroom());
                marriageApplicationDetails.getGroomDetails().setDateofbirth(marriageRegistryDetails.getGroomDetails().getDateofbirth());
                marriageApplicationDetails.getGroomDetails().setFirstnameEn(marriageRegistryDetails.getGroomDetails().getFirstname_en());
                marriageApplicationDetails.getGroomDetails().setFirstnameMl(marriageRegistryDetails.getGroomDetails().getFirstname_ml());
                marriageApplicationDetails.getGroomDetails().setMiddlenameEn(marriageRegistryDetails.getGroomDetails().getMiddlename_en());
                marriageApplicationDetails.getGroomDetails().setMiddlenameMl(marriageRegistryDetails.getGroomDetails().getMiddlename_ml());
                marriageApplicationDetails.getGroomDetails().setLastnameEn(marriageRegistryDetails.getGroomDetails().getLastname_en());
                marriageApplicationDetails.getGroomDetails().setLastnameMl(marriageRegistryDetails.getGroomDetails().getLastname_ml());
                marriageApplicationDetails.getGroomDetails().setAge(marriageRegistryDetails.getGroomDetails().getAge());
                marriageApplicationDetails.getGroomDetails().setAadharno(marriageRegistryDetails.getGroomDetails().getAadharno());
                marriageApplicationDetails.getGroomDetails().setSocialsecurityno(marriageRegistryDetails.getGroomDetails().getSocialsecurityno());
                marriageApplicationDetails.getGroomDetails().setMobile(marriageRegistryDetails.getGroomDetails().getMobile());
                marriageApplicationDetails.getGroomDetails().setGroomIsSpouseLiving(marriageRegistryDetails.getGroomDetails().getGroomIsSpouseLiving());
                marriageApplicationDetails.getGroomDetails().setGroomNoOfSpouse(marriageRegistryDetails.getGroomDetails().getGroomNoOfSpouse());
                marriageApplicationDetails.getGroomDetails().setEmailid(marriageRegistryDetails.getGroomDetails().getEmailid());
                marriageApplicationDetails.getGroomDetails().setFatherAadharno(marriageRegistryDetails.getGroomDetails().getFather_aadharno());
                marriageApplicationDetails.getGroomDetails().setFathernameEn(marriageRegistryDetails.getGroomDetails().getFathername_en());
                marriageApplicationDetails.getGroomDetails().setFathernameMl(marriageRegistryDetails.getGroomDetails().getFathername_ml());
                marriageApplicationDetails.getGroomDetails().setGuardiannameEn(marriageRegistryDetails.getGroomDetails().getGuardianname_en());
                marriageApplicationDetails.getGroomDetails().setGuardiannameMl(marriageRegistryDetails.getGroomDetails().getGuardianname_ml());
                marriageApplicationDetails.getGroomDetails().setGuardianAadharno(marriageRegistryDetails.getGroomDetails().getGuardian_aadharno());
                marriageApplicationDetails.getGroomDetails().setMothernameEn(marriageRegistryDetails.getGroomDetails().getMothername_en());
                marriageApplicationDetails.getGroomDetails().setMothernameMl(marriageRegistryDetails.getGroomDetails().getMothername_ml());
                marriageApplicationDetails.getGroomDetails().setMotherAadharno(marriageRegistryDetails.getGroomDetails().getMother_aadharno());
                marriageApplicationDetails.getGroomDetails().setGender(marriageRegistryDetails.getGroomDetails().getGender());
                marriageApplicationDetails.getGroomDetails().setMaritalstatusid(marriageRegistryDetails.getGroomDetails().getMaritalstatusid());
                marriageApplicationDetails.getGroomDetails().setParentGuardian(marriageRegistryDetails.getGroomDetails().getParent_guardian());
                marriageApplicationDetails.getGroomDetails().setPassportno(marriageRegistryDetails.getGroomDetails().getPassportno());
                marriageApplicationDetails.getGroomDetails().setResidentship(marriageRegistryDetails.getGroomDetails().getResidentship());
                marriageApplicationDetails.getGroomDetails().setTenentId(marriageRegistryDetails.getGroomDetails().getTenentId());
            }

            //BRIDE ADDRESS DETAILS
            if (marriageApplicationDetails.getBrideAddressDetails() != null && marriageRegistryDetails.getBrideAddressDetails() != null) {
                marriageApplicationDetails.getBrideAddressDetails().setCountryIdPermanent(marriageRegistryDetails.getBrideAddressDetails().getCountryIdPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setStateIdPermanent(marriageRegistryDetails.getBrideAddressDetails().getStateIdPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setDistrictIdPermanent(marriageRegistryDetails.getBrideAddressDetails().getDistrictIdPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setPoNoPermanent(marriageRegistryDetails.getBrideAddressDetails().getPoNoPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setLocalityEnPermanent(marriageRegistryDetails.getBrideAddressDetails().getLocalityEnPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setLocalityMlPermanent(marriageRegistryDetails.getBrideAddressDetails().getLocalityMlPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setStreetNameEnPermanent(marriageRegistryDetails.getBrideAddressDetails().getStreetNameEnPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setStreetNameMlPermanent(marriageRegistryDetails.getBrideAddressDetails().getStreetNameMlPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setHouseNameNoEnPermanent(marriageRegistryDetails.getBrideAddressDetails().getHouseNameNoEnPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setHouseNameNoMlPermanent(marriageRegistryDetails.getBrideAddressDetails().getHouseNameNoMlPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setVillageNamePermanent(marriageRegistryDetails.getBrideAddressDetails().getVillageNamePermanent());
                marriageApplicationDetails.getBrideAddressDetails().setPermntInKeralaAdrPostOffice(marriageRegistryDetails.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                marriageApplicationDetails.getBrideAddressDetails().setPermntInKeralaAdrPincode(marriageRegistryDetails.getBrideAddressDetails().getPermntInKeralaAdrPincode());
                marriageApplicationDetails.getBrideAddressDetails().setPermntInKeralaAdrLBName(marriageRegistryDetails.getBrideAddressDetails().getPermntInKeralaAdrLBName());
                marriageApplicationDetails.getBrideAddressDetails().setPermntInKeralaAdrTaluk(marriageRegistryDetails.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                marriageApplicationDetails.getBrideAddressDetails().setPermntInKeralaAdrVillage(marriageRegistryDetails.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                marriageApplicationDetails.getBrideAddressDetails().setPermntInKeralaWardNo(marriageRegistryDetails.getBrideAddressDetails().getPermntInKeralaWardNo());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOutsideKeralaTaluk(marriageRegistryDetails.getBrideAddressDetails().getPermntOutsideKeralaTaluk());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOutsideKeralaPostOfficeEn(marriageRegistryDetails.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOutsideKeralaPostOfficeMl(marriageRegistryDetails.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeMl());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOthrIndiaLineoneEn(marriageRegistryDetails.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOthrIndiaLineoneMl(marriageRegistryDetails.getBrideAddressDetails().getPermntOutsideIndiaLineoneMl());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOthrIndiaLinetwoEn(marriageRegistryDetails.getBrideAddressDetails().getPermntOutsideIndiaLinetwoEn());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOthrIndiaLinetwoMl(marriageRegistryDetails.getBrideAddressDetails().getPermntOutsideIndiaLinetwoMl());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOutSideIndiaProvinceEn(marriageRegistryDetails.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                marriageApplicationDetails.getBrideAddressDetails().setPermntOutSideIndiaProvinceMl(marriageRegistryDetails.getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());
                marriageApplicationDetails.getBrideAddressDetails().setPermanentOutsideIndiaPostCode(marriageRegistryDetails.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());
                marriageApplicationDetails.getBrideAddressDetails().setPinNoPermanent(marriageRegistryDetails.getBrideAddressDetails().getPinNoPermanent());
                marriageApplicationDetails.getBrideAddressDetails().setTownOrVillagePermanent(marriageRegistryDetails.getBrideAddressDetails().getTownOrVillagePermanent());
            }

            //GROOM ADDRESS DETAILS
            if (marriageApplicationDetails.getGroomAddressDetails() != null && marriageRegistryDetails.getGroomAddressDetails() != null) {
                marriageApplicationDetails.getGroomAddressDetails().setCountryIdPermanent(marriageRegistryDetails.getGroomAddressDetails().getCountryIdPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setStateIdPermanent(marriageRegistryDetails.getGroomAddressDetails().getStateIdPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setDistrictIdPermanent(marriageRegistryDetails.getGroomAddressDetails().getDistrictIdPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setPoNoPermanent(marriageRegistryDetails.getGroomAddressDetails().getPoNoPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setLocalityEnPermanent(marriageRegistryDetails.getGroomAddressDetails().getLocalityEnPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setLocalityMlPermanent(marriageRegistryDetails.getGroomAddressDetails().getLocalityMlPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setStreetNameEnPermanent(marriageRegistryDetails.getGroomAddressDetails().getStreetNameEnPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setStreetNameMlPermanent(marriageRegistryDetails.getGroomAddressDetails().getStreetNameMlPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setHouseNameNoEnPermanent(marriageRegistryDetails.getGroomAddressDetails().getHouseNameNoEnPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setHouseNameNoMlPermanent(marriageRegistryDetails.getGroomAddressDetails().getHouseNameNoMlPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setVillageNamePermanent(marriageRegistryDetails.getGroomAddressDetails().getVillageNamePermanent());
                marriageApplicationDetails.getGroomAddressDetails().setPermntInKeralaAdrPostOffice(marriageRegistryDetails.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                marriageApplicationDetails.getGroomAddressDetails().setPermntInKeralaAdrPincode(marriageRegistryDetails.getGroomAddressDetails().getPermntInKeralaAdrPincode());
                marriageApplicationDetails.getGroomAddressDetails().setPermntInKeralaAdrLBName(marriageRegistryDetails.getGroomAddressDetails().getPermntInKeralaAdrLBName());
                marriageApplicationDetails.getGroomAddressDetails().setPermntInKeralaAdrTaluk(marriageRegistryDetails.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                marriageApplicationDetails.getGroomAddressDetails().setPermntInKeralaAdrVillage(marriageRegistryDetails.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                marriageApplicationDetails.getGroomAddressDetails().setPermntInKeralaWardNo(marriageRegistryDetails.getGroomAddressDetails().getPermntInKeralaWardNo());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOutsideKeralaTaluk(marriageRegistryDetails.getGroomAddressDetails().getPermntOutsideKeralaTaluk());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOutsideKeralaPostOfficeEn(marriageRegistryDetails.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOutsideKeralaPostOfficeMl(marriageRegistryDetails.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeMl());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOthrIndiaLineoneEn(marriageRegistryDetails.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOthrIndiaLineoneMl(marriageRegistryDetails.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOthrIndiaLinetwoEn(marriageRegistryDetails.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOthrIndiaLinetwoMl(marriageRegistryDetails.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOutSideIndiaProvinceEn(marriageRegistryDetails.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                marriageApplicationDetails.getGroomAddressDetails().setPermntOutSideIndiaProvinceMl(marriageRegistryDetails.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());
                marriageApplicationDetails.getGroomAddressDetails().setPermanentOutsideIndiaPostCode(marriageRegistryDetails.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
                marriageApplicationDetails.getGroomAddressDetails().setPinNoPermanent(marriageRegistryDetails.getGroomAddressDetails().getPinNoPermanent());
                marriageApplicationDetails.getGroomAddressDetails().setTownOrVillagePermanent(marriageRegistryDetails.getGroomAddressDetails().getTownOrVillagePermanent());
            }
        }
        return marriageApplicationDetails;
    }
}
