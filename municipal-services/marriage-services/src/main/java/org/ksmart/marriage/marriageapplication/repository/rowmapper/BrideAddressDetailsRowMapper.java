package org.ksmart.marriage.marriageapplication.repository.rowmapper;


import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideAddressDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface BrideAddressDetailsRowMapper {
    default BrideAddressDetails getBrideAddressDetails (ResultSet rs) throws SQLException {

        return BrideAddressDetails.builder()

//              PRESENT

                .countryIdPresent(rs.getString("BPSA_countryid"))
                .stateIdPresent(rs.getString("BPSA_stateid"))
                .districtIdPresent(rs.getString("BPSA_districtid"))
                .poNoPresent(rs.getString("BPSA_poid"))
                .pinNoPresent(rs.getString("BPSA_pinno"))
                .localityEnPresent(rs.getString("BPSA_locality_en"))
                .localityMlPresent(rs.getString("BPSA_locality_ml"))
                .streetNameEnPresent(rs.getString("BPSA_street_name_en"))
                .streetNameMlPresent(rs.getString("BPSA_street_name_ml"))
                .houseNameNoEnPresent(rs.getString("BPSA_housename_en"))
                .houseNameNoMlPresent(rs.getString("BPSA_housename_ml"))
                .presentInsideKeralaTaluk(rs.getString("BPSA_talukid"))
                .presentInsideKeralaVillage(rs.getString("BPSA_villageid"))
                .villageNamePresent(rs.getString("BPSA_village_name"))
                .presentInsideKeralaLBName(rs.getString("BPSA_present_tenentid"))
                .presentWardNo(rs.getString("BPSA_ward_code"))
                .presentInsideKeralaPostOffice(rs.getString("BPSA_poid"))
                .presentUuid(rs.getString("BPSA_id"))
                .presentOutsideKeralaTalukName(rs.getString("BPSA_taluk_name"))
                .townOrVillagePresent(rs.getString("BPSA_city_town_village"))
                .presentOutsideKeralaCityVilgeNameEn(rs.getString("BPSA_village_name"))
                .presentOutsideKeralaPostOfficeEn(rs.getString("BPSA_poname_en"))
                .presentOutsideKeralaPostOfficeMl(rs.getString("BPSA_poname_ml"))
                .presentOthrIndiaAdressEn(rs.getString("BPSA_ot_address1_en"))
                .presentOthrIndiaAdressMl(rs.getString("BPSA_ot_address1_ml"))
                .presentOthrIndiaAdressEnB(rs.getString("BPSA_ot_address2_en"))
                .presentOthrIndiaAdressMlB(rs.getString("BPSA_ot_address2_ml"))
                .presentOthrIndiaProvinceEn(rs.getString("BPSA_ot_state_region_province_en"))
                .presentOthrIndiaProvinceMl(rs.getString("BPSA_ot_state_region_province_ml"))
                .outSideIndiaPostCodePresent(rs.getString("BPSA_ot_zipcode"))
                .brideGroomPresent(rs.getString("BPSA_bride_groom"))


//                PERMANENT

                .countryIdPermanent(rs.getString("BPMA_countryid"))
                .stateIdPermanent(rs.getString("BPMA_stateid"))
                .districtIdPermanent(rs.getString("BPMA_districtid"))
                .poNoPermanent(rs.getString("BPMA_poid"))
                .pinNoPermanent(rs.getString("BPMA_pinno"))
                .localityEnPermanent(rs.getString("BPMA_locality_en"))
                .localityMlPermanent(rs.getString("BPMA_locality_ml"))
                .streetNameEnPermanent(rs.getString("BPMA_street_name_en"))
                .streetNameMlPermanent(rs.getString("BPMA_street_name_ml"))
                .houseNameNoEnPermanent(rs.getString("BPMA_housename_en"))
                .houseNameNoMlPermanent(rs.getString("BPMA_housename_ml"))
                .villageNamePermanent(rs.getString("BPMA_village_name"))
                .permanentUuid(rs.getString("BPMA_id"))
                .permntInKeralaAdrLBName(rs.getString("BPMA_permanent_tenentid"))
                .townOrVillagePermanent(rs.getString("BPMA_city_town_village"))
                .permntInKeralaAdrTaluk(rs.getString("BPMA_talukid"))
                .permntInKeralaAdrVillage(rs.getString("BPMA_villageid"))
                .permntInKeralaAdrPostOffice(rs.getString("BPMA_poid"))
                .permntInKeralaWardNo(rs.getString("BPMA_ward_code"))
                .permntOutsideKeralaCityVilgeEn(rs.getString("BPMA_village_name"))
                .permntOutsideKeralaPostOfficeEn(rs.getString("BPMA_poname_en"))
                .permntOutsideKeralaPostOfficeMl(rs.getString("BPMA_poname_ml"))
                .permntOthrIndiaLineoneEn(rs.getString("BPMA_ot_address1_en"))
                .permntOthrIndiaLineoneMl(rs.getString("BPMA_ot_address1_ml"))
                .permntOthrIndiaLinetwoEn(rs.getString("BPMA_ot_address2_en"))
                .permntOthrIndiaLinetwoMl(rs.getString("BPMA_ot_address2_ml"))
                .permntOthrIndiaprovinceEn(rs.getString("BPMA_ot_state_region_province_en"))
                .permntOthrIndiaprovinceMl(rs.getString("BPMA_ot_state_region_province_ml"))
                .outSideIndiaPostCodePermanent(rs.getString("BPMA_ot_zipcode"))
                .brideGroomPermanent(rs.getString("BPMA_bride_groom"))
                .isPermanentAddress(rs.getBoolean("BPSA_same_as_permanent"))
                .build();
                // .presentaddressCountry(rs.getString("GPMA_countryid"))
                // .presentaddressCountry(rs.getString("BPSA_countryid"))
                // .presentaddressStateName(rs.getString("BPSA_stateid"))
                // .presentInsideKeralaDistrict(rs.getString("BPSA_districtid"))
                // .presentInsideKeralaLocalityNameEn(rs.getString("BPSA_locality_en"))
                // .presentInsideKeralaStreetNameEn(rs.getString("BPSA_street_name_en"))
                // .presentInsideKeralaHouseNameEn(rs.getString("BPSA_housename_en"))
                // .presentInsideKeralaLocalityNameMl(rs.getString("BPSA_locality_ml"))
                // .presentInsideKeralaStreetNameMl(rs.getString("BPSA_street_name_ml"))
                // .presentInsideKeralaHouseNameMl(rs.getString("BPSA_housename_ml"))
                // .presentOutSideIndiaadrsCityTown(rs.getString("BPSA_village_name"))
              //  .presentOutSideIndiaadrsVillage(rs.getString("BPSA_city_town_village"))
              //  .presentOutsideKeralaVillageorTown(rs.getString("BPSA_city_town_village"))
//                .presentOutsideKeralaPincode(rs.getString("BPSA_pinno"))
//                .presentInsideKeralaPincode(rs.getString("BPSA_pinno"))
                //.presentOutsideKeralaPincode(rs.getString("BPSA_pinno"))
                //.presentOutsideKeralaCityVilgeNameEn(rs.getString("BPSA_city_town_village"))
                //.presentOutsideKeralaDistrict(rs.getString("BPSA_districtid"))
                //.presentOutsideKeralaVillageorTown(rs.getString("BPSA_tenantid"))
                // .presentOutsideKeralaLocalityNameEn(rs.getString("BPSA_locality_en"))
                // .presentOutsideKeralaStreetNameEn(rs.getString("BPSA_street_name_en"))
                // .presentOutsideKeralaHouseNameEn(rs.getString("BPSA_housename_en"))
                // .presentOutsideKeralaLocalityNameMl(rs.getString("BPSA_locality_ml"))
                // .presentOutsideKeralaStreetNameMl(rs.getString("BPSA_street_name_en"))
                // .presentOutsideKeralaHouseNameMl(rs.getString("BPSA_housename_ml"))
                // .permtaddressCountry(rs.getString("BPMA_countryid"))
                // .permtaddressStateName(rs.getString("BPMA_stateid"))
                // .permntInKeralaAdrDistrict(rs.getString("BPMA_districtid"))
              // .permntInKeralaAdrLocalityNameEn(rs.getString("BPMA_locality_en"))
                // .permntInKeralaAdrStreetNameEn(rs.getString("BPMA_street_name_en"))
                // .permntInKeralaAdrHouseNameEn(rs.getString("BPMA_housename_en"))
                // .permntInKeralaAdrLocalityNameMl(rs.getString("BPMA_locality_en"))
                // .permntInKeralaAdrStreetNameMl(rs.getString("BPMA_street_name_ml"))
                // .permntInKeralaAdrHouseNameMl(rs.getString("BPMA_housename_ml"))
               // .permntInKeralaAdrPincode(rs.getString("BPMA_pinno"))
                // .permntOutsideKeralaDistrict(rs.getString("BPMA_districtid"))
                // .permntOutsideKeralaTaluk(rs.getString("BPMA_taluk_name"))
                //* */.permntOutsideKeralaVillage(rs.getString("BPMA_city_town_village"))
                //.permntOutsideKeralaPincode(rs.getString("BPMA_pinno"))
                // .permntOutsideKeralaLocalityNameEn(rs.getString("BPMA_locality_en"))
                // .permntOutsideKeralaStreetNameEn(rs.getString("BPMA_street_name_en"))
                // .permntOutsideKeralaHouseNameEn(rs.getString("BPMA_housename_en"))
                // .permntOutsideKeralaLocalityNameMl(rs.getString("BPMA_locality_en"))
                // .permntOutsideKeralaStreetNameMl(rs.getString("BPMA_street_name_ml"))
                // .permntOutsideKeralaHouseNameMl(rs.getString("BPMA_housename_ml"))
                // .permntOutsideIndiaLineoneEn(rs.getString("BPMA_ot_address1_en"))
                // .permntOutsideIndiaLineoneMl(rs.getString("BPMA_ot_address1_ml"))
                // .permntOutsideIndiaLinetwoEn(rs.getString("BPMA_ot_address2_en"))
                // .permntOutsideIndiaLinetwoMl(rs.getString("BPMA_ot_address2_ml"))
                //  .permntOutsideIndiaVillage(rs.getString(""))
                // .permntOutsideIndiaCityTown(rs.getString(""))
               // .permanentOutsideIndiaPostCode(rs.getString("BPMA_ot_zipcode"))
                // .permntOutSideIndiaProvinceMl(rs.getString("BPMA_ot_state_region_province_ml"))
                // .permntOutSideIndiaProvinceEn(rs.getString("BPMA_ot_state_region_province_en"))



                // .isPermanentAddress(rs.getBoolean("BPMA_same_as_present"))
//                .isPermanentAddressInt(rs.getInt("BPMA_same_as_present"))
            





    }
}
