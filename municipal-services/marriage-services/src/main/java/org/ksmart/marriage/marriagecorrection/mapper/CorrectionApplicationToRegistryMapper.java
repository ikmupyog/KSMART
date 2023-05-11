package org.ksmart.marriage.marriagecorrection.mapper;

import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideAddressDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomAddressDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CorrectionApplicationToRegistryMapper {

    public MarriageRegistryRequest convert(List<MarriageRegistryDetails> registryDetails, List<MarriageApplicationDetails> aplnDetails) {


        MarriageRegistryRequest marriageRegistryRequest = new MarriageRegistryRequest();

        if (registryDetails.get(0) != null && aplnDetails.get(0) != null) {
            //Marriage Details
            registryDetails.get(0).setDateofmarriage(aplnDetails.get(0).getDateofmarriage());
            //registryDetails.get(0).setDistrictid(aplnDetails.get(0).getDistrictid());
            //registryDetails.get(0).setTalukid(aplnDetails.get(0).getTalukid());
            //registryDetails.get(0).setVillage_name(aplnDetails.get(0).getVillageName());
            //registryDetails.get(0).setLbtype(aplnDetails.get(0).getLbtype());
            //registryDetails.get(0).setWard_code(aplnDetails.get(0).getWardCode());
            //registryDetails.get(0).setPlacetype(aplnDetails.get(0).getPlacetype());
            //registryDetails.get(0).setPlaceid(aplnDetails.get(0).getPlaceid());
            //registryDetails.get(0).setPlacenameEn(aplnDetails.get(0).getPlacenameEn());
            //registryDetails.get(0).setPlacenameMl(aplnDetails.get(0).getPlacenameMl());
            //registryDetails.get(0).setLocality_en(aplnDetails.get(0).getLocalityEn());
            //registryDetails.get(0).setLocality_ml(aplnDetails.get(0).getLocalityMl());
            //registryDetails.get(0).setStreet_name_en(aplnDetails.get(0).getStreetNameEn());
            //registryDetails.get(0).setStreet_name_ml(aplnDetails.get(0).getStreetNameMl());
            //registryDetails.get(0).setMarriageHouseNoAndNameEn(aplnDetails.get(0).getMarriageHouseNoAndNameEn());
            //registryDetails.get(0).setMarriageHouseNoAndNameMl(aplnDetails.get(0).getMarriageHouseNoAndNameMl());
            //registryDetails.get(0).setLandmark(aplnDetails.get(0).getLandmark());


            //Marriage Bride Details
            if (registryDetails.get(0).getBrideDetails() != null && aplnDetails.get(0).getBrideDetails() != null) {
                //registryDetails.get(0).getBrideDetails().setResidentship(aplnDetails.get(0).getBrideDetails().getResidentship());
                registryDetails.get(0).getBrideDetails().setFirstname_en(aplnDetails.get(0).getBrideDetails().getFirstnameEn());
                registryDetails.get(0).getBrideDetails().setFirstname_ml(aplnDetails.get(0).getBrideDetails().getFirstnameMl());
                registryDetails.get(0).getBrideDetails().setMiddlename_en(aplnDetails.get(0).getBrideDetails().getMiddlenameEn());
                registryDetails.get(0).getBrideDetails().setMiddlename_ml(aplnDetails.get(0).getBrideDetails().getMiddlenameMl());
                registryDetails.get(0).getBrideDetails().setLastname_en(aplnDetails.get(0).getBrideDetails().getLastnameEn());
                registryDetails.get(0).getBrideDetails().setLastname_ml(aplnDetails.get(0).getBrideDetails().getLastnameMl());
                registryDetails.get(0).getBrideDetails().setDateofbirth(aplnDetails.get(0).getBrideDetails().getDateofbirth());
                registryDetails.get(0).getBrideDetails().setAge(aplnDetails.get(0).getBrideDetails().getAge());
                registryDetails.get(0).getBrideDetails().setFathername_en(aplnDetails.get(0).getBrideDetails().getFathernameEn());
                registryDetails.get(0).getBrideDetails().setFathername_ml(aplnDetails.get(0).getBrideDetails().getFathernameMl());
                registryDetails.get(0).getBrideDetails().setMothername_en(aplnDetails.get(0).getBrideDetails().getMothernameEn());
                registryDetails.get(0).getBrideDetails().setMothername_ml(aplnDetails.get(0).getBrideDetails().getMothernameMl());
                registryDetails.get(0).getBrideDetails().setGuardianname_en(aplnDetails.get(0).getBrideDetails().getGuardiannameEn());
                registryDetails.get(0).getBrideDetails().setGuardianname_ml(aplnDetails.get(0).getBrideDetails().getGuardiannameMl());
                //registryDetails.get(0).getBrideDetails().setParent_guardian(aplnDetails.get(0).getBrideDetails().getParentGuardian());
            }

            //Marriage Groom Details
            if (registryDetails.get(0).getGroomDetails() != null && aplnDetails.get(0).getGroomDetails() != null) {
                //registryDetails.get(0).getGroomDetails().setResidentship(aplnDetails.get(0).getGroomDetails().getResidentship());
                registryDetails.get(0).getGroomDetails().setFirstname_en(aplnDetails.get(0).getGroomDetails().getFirstnameEn());
                registryDetails.get(0).getGroomDetails().setFirstname_ml(aplnDetails.get(0).getGroomDetails().getFirstnameMl());
                registryDetails.get(0).getGroomDetails().setMiddlename_en(aplnDetails.get(0).getGroomDetails().getMiddlenameEn());
                registryDetails.get(0).getGroomDetails().setMiddlename_ml(aplnDetails.get(0).getGroomDetails().getMiddlenameMl());
                registryDetails.get(0).getGroomDetails().setLastname_en(aplnDetails.get(0).getGroomDetails().getLastnameEn());
                registryDetails.get(0).getGroomDetails().setLastname_ml(aplnDetails.get(0).getGroomDetails().getLastnameMl());
                registryDetails.get(0).getGroomDetails().setDateofbirth(aplnDetails.get(0).getGroomDetails().getDateofbirth());
                registryDetails.get(0).getGroomDetails().setAge(aplnDetails.get(0).getGroomDetails().getAge());
                registryDetails.get(0).getGroomDetails().setFathername_en(aplnDetails.get(0).getGroomDetails().getFathernameEn());
                registryDetails.get(0).getGroomDetails().setFathername_ml(aplnDetails.get(0).getGroomDetails().getFathernameMl());
                registryDetails.get(0).getGroomDetails().setMothername_en(aplnDetails.get(0).getGroomDetails().getMothernameEn());
                registryDetails.get(0).getGroomDetails().setMothername_ml(aplnDetails.get(0).getGroomDetails().getMothernameMl());
                registryDetails.get(0).getGroomDetails().setGuardianname_en(aplnDetails.get(0).getGroomDetails().getGuardiannameEn());
                registryDetails.get(0).getGroomDetails().setGuardianname_ml(aplnDetails.get(0).getGroomDetails().getGuardiannameMl());
                //registryDetails.get(0).getGroomDetails().setParent_guardian(aplnDetails.get(0).getGroomDetails().getParentGuardian());
            }

            //Bride Address details
            if (registryDetails.get(0).getBrideAddressDetails() != null && aplnDetails.get(0).getBrideAddressDetails() != null) {
                //registryDetails.get(0).getBrideAddressDetails().setCountryIdPermanent(aplnDetails.get(0).getBrideAddressDetails().getCountryIdPermanent());
                //registryDetails.get(0).getBrideAddressDetails().setStateIdPermanent(aplnDetails.get(0).getBrideAddressDetails().getStateIdPermanent());
                //registryDetails.get(0).getBrideAddressDetails().setDistrictIdPermanent(aplnDetails.get(0).getBrideAddressDetails().getDistrictIdPermanent());
                //registryDetails.get(0).getBrideAddressDetails().setPoNoPermanent(aplnDetails.get(0).getBrideAddressDetails().getPoNoPermanent());
                registryDetails.get(0).getBrideAddressDetails().setLocalityEnPermanent(aplnDetails.get(0).getBrideAddressDetails().getLocalityEnPermanent());
                registryDetails.get(0).getBrideAddressDetails().setLocalityMlPermanent(aplnDetails.get(0).getBrideAddressDetails().getLocalityMlPermanent());
                registryDetails.get(0).getBrideAddressDetails().setStreetNameEnPermanent(aplnDetails.get(0).getBrideAddressDetails().getStreetNameEnPermanent());
                registryDetails.get(0).getBrideAddressDetails().setStreetNameMlPermanent(aplnDetails.get(0).getBrideAddressDetails().getStreetNameMlPermanent());
                registryDetails.get(0).getBrideAddressDetails().setHouseNameNoEnPermanent(aplnDetails.get(0).getBrideAddressDetails().getHouseNameNoEnPermanent());
                registryDetails.get(0).getBrideAddressDetails().setHouseNameNoMlPermanent(aplnDetails.get(0).getBrideAddressDetails().getHouseNameNoMlPermanent());
                //registryDetails.get(0).getBrideAddressDetails().setVillageNamePermanent(aplnDetails.get(0).getBrideAddressDetails().getVillageNamePermanent());
                //registryDetails.get(0).getBrideAddressDetails().setPermntInKeralaAdrPostOffice(aplnDetails.get(0).getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                //registryDetails.get(0).getBrideAddressDetails().setPermntInKeralaAdrPincode(aplnDetails.get(0).getBrideAddressDetails().getPermntInKeralaAdrPincode());
                //registryDetails.get(0).getBrideAddressDetails().setPermntInKeralaAdrLBName(aplnDetails.get(0).getBrideAddressDetails().getPermntInKeralaAdrLBName());
                //registryDetails.get(0).getBrideAddressDetails().setPermntInKeralaAdrTaluk(aplnDetails.get(0).getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                //registryDetails.get(0).getBrideAddressDetails().setPermntInKeralaAdrVillage(aplnDetails.get(0).getBrideAddressDetails().getPermntInKeralaAdrVillage());
                //registryDetails.get(0).getBrideAddressDetails().setPermntInKeralaWardNo(aplnDetails.get(0).getBrideAddressDetails().getPermntInKeralaWardNo());
                //registryDetails.get(0).getBrideAddressDetails().setPermntOutsideKeralaTaluk(aplnDetails.get(0).getBrideAddressDetails().getPermntOutsideKeralaTaluk());
                //registryDetails.get(0).getBrideAddressDetails().setPermntOutsideKeralaPostOfficeEn(aplnDetails.get(0).getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                //registryDetails.get(0).getBrideAddressDetails().setPermntOutsideKeralaPostOfficeMl(aplnDetails.get(0).getBrideAddressDetails().getPermntOutsideKeralaPostOfficeMl());
                registryDetails.get(0).getBrideAddressDetails().setPermntOutsideIndiaLineoneEn(aplnDetails.get(0).getBrideAddressDetails().getPermntOthrIndiaLineoneEn());
                registryDetails.get(0).getBrideAddressDetails().setPermntOutsideIndiaLineoneMl(aplnDetails.get(0).getBrideAddressDetails().getPermntOthrIndiaLineoneMl());
                registryDetails.get(0).getBrideAddressDetails().setPermntOutsideIndiaLinetwoEn(aplnDetails.get(0).getBrideAddressDetails().getPermntOthrIndiaLinetwoEn());
                registryDetails.get(0).getBrideAddressDetails().setPermntOutsideIndiaLinetwoMl(aplnDetails.get(0).getBrideAddressDetails().getPermntOthrIndiaLinetwoMl());
                //registryDetails.get(0).getBrideAddressDetails().setPermntOutSideIndiaProvinceEn(aplnDetails.get(0).getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                //registryDetails.get(0).getBrideAddressDetails().setPermntOutSideIndiaProvinceMl(aplnDetails.get(0).getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());
                //registryDetails.get(0).getBrideAddressDetails().setPermanentOutsideIndiaPostCode(aplnDetails.get(0).getBrideAddressDetails().getPermanentOutsideIndiaPostCode());
                //registryDetails.get(0).getBrideAddressDetails().setPinNoPermanent(aplnDetails.get(0).getBrideAddressDetails().getPinNoPermanent());
            }

            //Groom Address details
            if (registryDetails.get(0).getGroomAddressDetails() != null && aplnDetails.get(0).getGroomAddressDetails() != null) {
                //registryDetails.get(0).getGroomAddressDetails().setCountryIdPermanent(aplnDetails.get(0).getGroomAddressDetails().getCountryIdPermanent());
                //registryDetails.get(0).getGroomAddressDetails().setStateIdPermanent(aplnDetails.get(0).getGroomAddressDetails().getStateIdPermanent());
                //registryDetails.get(0).getGroomAddressDetails().setDistrictIdPermanent(aplnDetails.get(0).getGroomAddressDetails().getDistrictIdPermanent());
                //registryDetails.get(0).getGroomAddressDetails().setPoNoPermanent(aplnDetails.get(0).getGroomAddressDetails().getPoNoPermanent());
                registryDetails.get(0).getGroomAddressDetails().setLocalityEnPermanent(aplnDetails.get(0).getGroomAddressDetails().getLocalityEnPermanent());
                registryDetails.get(0).getGroomAddressDetails().setLocalityMlPermanent(aplnDetails.get(0).getGroomAddressDetails().getLocalityMlPermanent());
                registryDetails.get(0).getGroomAddressDetails().setStreetNameEnPermanent(aplnDetails.get(0).getGroomAddressDetails().getStreetNameEnPermanent());
                registryDetails.get(0).getGroomAddressDetails().setStreetNameMlPermanent(aplnDetails.get(0).getGroomAddressDetails().getStreetNameMlPermanent());
                registryDetails.get(0).getGroomAddressDetails().setHouseNameNoEnPermanent(aplnDetails.get(0).getGroomAddressDetails().getHouseNameNoEnPermanent());
                registryDetails.get(0).getGroomAddressDetails().setHouseNameNoMlPermanent(aplnDetails.get(0).getGroomAddressDetails().getHouseNameNoMlPermanent());
                //registryDetails.get(0).getGroomAddressDetails().setVillageNamePermanent(aplnDetails.get(0).getGroomAddressDetails().getVillageNamePermanent());
                //registryDetails.get(0).getGroomAddressDetails().setPermntInKeralaAdrPostOffice(aplnDetails.get(0).getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                //registryDetails.get(0).getGroomAddressDetails().setPermntInKeralaAdrPincode(aplnDetails.get(0).getGroomAddressDetails().getPermntInKeralaAdrPincode());
                //registryDetails.get(0).getGroomAddressDetails().setPermntInKeralaAdrLBName(aplnDetails.get(0).getGroomAddressDetails().getPermntInKeralaAdrLBName());
                //registryDetails.get(0).getGroomAddressDetails().setPermntInKeralaAdrTaluk(aplnDetails.get(0).getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                //registryDetails.get(0).getGroomAddressDetails().setPermntInKeralaAdrVillage(aplnDetails.get(0).getGroomAddressDetails().getPermntInKeralaAdrVillage());
                //registryDetails.get(0).getGroomAddressDetails().setPermntInKeralaWardNo(aplnDetails.get(0).getGroomAddressDetails().getPermntInKeralaWardNo());
                //registryDetails.get(0).getGroomAddressDetails().setPermntOutsideKeralaTaluk(aplnDetails.get(0).getGroomAddressDetails().getPermntOutsideKeralaTaluk());
                //registryDetails.get(0).getGroomAddressDetails().setPermntOutsideKeralaPostOfficeEn(aplnDetails.get(0).getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                //registryDetails.get(0).getGroomAddressDetails().setPermntOutsideKeralaPostOfficeMl(aplnDetails.get(0).getGroomAddressDetails().getPermntOutsideKeralaPostOfficeMl());
                registryDetails.get(0).getGroomAddressDetails().setPermntOutsideIndiaLineoneEn(aplnDetails.get(0).getGroomAddressDetails().getPermntOthrIndiaLineoneEn());
                registryDetails.get(0).getGroomAddressDetails().setPermntOutsideIndiaLineoneMl(aplnDetails.get(0).getGroomAddressDetails().getPermntOthrIndiaLineoneMl());
                registryDetails.get(0).getGroomAddressDetails().setPermntOutsideIndiaLinetwoEn(aplnDetails.get(0).getGroomAddressDetails().getPermntOthrIndiaLinetwoEn());
                registryDetails.get(0).getGroomAddressDetails().setPermntOutsideIndiaLinetwoMl(aplnDetails.get(0).getGroomAddressDetails().getPermntOthrIndiaLinetwoMl());
                //registryDetails.get(0).getGroomAddressDetails().setPermntOutSideIndiaProvinceEn(aplnDetails.get(0).getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                //registryDetails.get(0).getGroomAddressDetails().setPermntOutSideIndiaProvinceMl(aplnDetails.get(0).getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());
                //registryDetails.get(0).getGroomAddressDetails().setPermanentOutsideIndiaPostCode(aplnDetails.get(0).getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
                //registryDetails.get(0).getGroomAddressDetails().setPinNoPermanent(aplnDetails.get(0).getGroomAddressDetails().getPinNoPermanent());
            }
            marriageRegistryRequest.addMarriageDetails(registryDetails.get(0));
        }
        return marriageRegistryRequest;
    }
}
