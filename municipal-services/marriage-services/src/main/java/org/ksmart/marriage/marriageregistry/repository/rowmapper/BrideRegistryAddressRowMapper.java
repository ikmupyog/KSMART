package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.ksmart.marriage.marriageregistry.web.model.BrideRegistryAddressDetails;

import javax.validation.constraints.Size;

public interface BrideRegistryAddressRowMapper {
    default BrideRegistryAddressDetails getBrideAddressDetails (ResultSet rs) throws SQLException {

        return BrideRegistryAddressDetails.builder()

//              PRESENT

                .countryIdPresent(rs.getString("BPSA_countryid"))
                .stateIdPresent(rs.getString("BPSA_stateid"))
                .districtIdPresent(rs.getString("BPSA_districtid"))
                .poNoPresent(rs.getString("BPSA_poid"))
                .presentaddressCountry(rs.getString("GPMA_countryid"))
                .localityEnPresent(rs.getString("BPSA_locality_en"))
                .localityMlPresent(rs.getString("BPSA_locality_ml"))
                .streetNameEnPresent(rs.getString("BPSA_street_name_en"))
                .streetNameMlPresent(rs.getString("BPSA_street_name_ml"))
                .houseNameNoEnPresent(rs.getString("BPSA_housename_en"))
                .houseNameNoMlPresent(rs.getString("BPSA_housename_ml"))
                .villageNamePresent(rs.getString("BPSA_village_name"))
                .presentUuid(rs.getString("BPSA_id"))
                .presentaddressCountry(rs.getString("BPSA_countryid"))
                .presentaddressStateName(rs.getString("BPSA_stateid"))
                .presentInsideKeralaLBName(rs.getString("BPSA_tenantid"))
                .presentInsideKeralaDistrict(rs.getString("BPSA_districtid"))
                .presentInsideKeralaTaluk(rs.getString("BPSA_talukid"))
                .presentInsideKeralaVillage(rs.getString("BPSA_villageid"))
                .presentInsideKeralaLocalityNameEn(rs.getString("BPSA_locality_en"))
                .presentInsideKeralaStreetNameEn(rs.getString("BPSA_street_name_en"))
                .presentInsideKeralaHouseNameEn(rs.getString("BPSA_housename_en"))
                .presentInsideKeralaLocalityNameMl(rs.getString("BPSA_locality_ml"))
                .presentInsideKeralaStreetNameMl(rs.getString("BPSA_street_name_ml"))
                .presentInsideKeralaHouseNameMl(rs.getString("BPSA_housename_ml"))
                .presentInsideKeralaPincode(rs.getString("BPSA_pinno"))
                .presentInsideKeralaPostOffice(rs.getString("BPSA_poid"))
                .presentWardNo(rs.getString("BPSA_ward_code"))
                .presentOutsideKeralaDistrict(rs.getString("BPSA_districtid"))
                .presentOutsideKeralaTalukName(rs.getString("BPSA_taluk_name"))
                // .presentOutsideKeralaCityVilgeEn(rs.getString("BPSA_village_name "))
                .presentOutsideKeralaPincode(rs.getString("BPSA_pinno"))
                .presentOutsideKeralaPostOfficeEn(rs.getString("BPSA_poname_en"))
                .presentOutsideKeralaPostOfficeMl(rs.getString("BPSA_poname_ml"))
                .presentOutsideKeralaLocalityNameEn(rs.getString("BPSA_locality_en"))
                .presentOutsideKeralaStreetNameEn(rs.getString("BPSA_street_name_en"))
                .presentOutsideKeralaHouseNameEn(rs.getString("BPSA_housename_en"))
                .presentOutsideKeralaLocalityNameMl(rs.getString("BPSA_locality_ml"))
                .presentOutsideKeralaStreetNameMl(rs.getString("BPSA_street_name_en"))
                .presentOutsideKeralaHouseNameMl(rs.getString("BPSA_housename_ml"))
                .presentOutSideIndiaAdressEn(rs.getString("BPSA_ot_address1_en"))
                .presentOutSideIndiaAdressMl(rs.getString("BPSA_ot_address1_ml"))
                .presentOutSideIndiaAdressEnB(rs.getString("BPSA_ot_address2_en"))
                .presentOutSideIndiaAdressMlB(rs.getString("BPSA_ot_address2_ml"))
                .presentOutSideIndiaProvinceEn(rs.getString("BPSA_ot_state_region_province_en"))
                .presentOutSideIndiaProvinceMl(rs.getString("BPSA_ot_state_region_province_ml"))
                .presentOutSideIndiaPostCode(rs.getString("BPSA_ot_zipcode"))
                .brideGroomPresent(rs.getString("BPSA_bride_groom"))

//                PERMANENT

                .countryIdPermanent(rs.getString("BPMA_countryid"))
                .stateIdPermanent(rs.getString("BPMA_stateid"))
                .districtIdPermanent(rs.getString("BPMA_districtid"))
                .poNoPermanent(rs.getString("BPMA_poid"))
                .localityEnPermanent(rs.getString("BPMA_locality_en"))
                .localityMlPermanent(rs.getString("BPMA_locality_ml"))
                .streetNameEnPermanent(rs.getString("BPMA_street_name_en"))
                .streetNameMlPermanent(rs.getString("BPMA_street_name_ml"))
                .houseNameNoEnPermanent(rs.getString("BPMA_housename_en"))
                .houseNameNoMlPermanent(rs.getString("BPMA_housename_ml"))
                .villageNamePermanent(rs.getString("BPMA_village_name"))
                .permanentUuid(rs.getString("BPMA_id"))
                .permtaddressCountry(rs.getString("BPMA_countryid"))
                .permtaddressStateName(rs.getString("BPMA_stateid"))
                .permntInKeralaAdrLBName(rs.getString("BPMA_tenantid"))
                .permntInKeralaAdrDistrict(rs.getString("BPMA_districtid"))
                // .permntOutsideKeralaCityVilgeEn(rs.getString("BPMA_village_name "))
                .permntInKeralaAdrTaluk(rs.getString("BPMA_talukid"))
                .permntInKeralaAdrVillage(rs.getString("BPMA_villageid"))
                .permntInKeralaAdrLocalityNameEn(rs.getString("BPMA_locality_en"))
                .permntInKeralaAdrStreetNameEn(rs.getString("BPMA_street_name_en"))
                .permntInKeralaAdrHouseNameEn(rs.getString("BPMA_housename_en"))
                .permntInKeralaAdrLocalityNameMl(rs.getString("BPMA_locality_en"))
                .permntInKeralaAdrStreetNameMl(rs.getString("BPMA_street_name_ml"))
                .permntInKeralaAdrHouseNameMl(rs.getString("BPMA_housename_ml"))
                .permntInKeralaAdrPincode(rs.getString("BPMA_pinno"))
                .permntInKeralaAdrPostOffice(rs.getString("BPMA_poid"))
                .permntInKeralaWardNo(rs.getString("BPMA_ward_code"))
                .permntOutsideKeralaDistrict(rs.getString("BPMA_districtid"))
                .permntOutsideKeralaTaluk(rs.getString("BPMA_taluk_name"))
                //.permntOutsideKeralaVillage(rs.getString("BPMA_village_name"))
                .permntOutsideKeralaPincode(rs.getString("BPMA_pinno"))
                .permntOutsideKeralaLocalityNameEn(rs.getString("BPMA_locality_en"))
                .permntOutsideKeralaStreetNameEn(rs.getString("BPMA_street_name_en"))
                .permntOutsideKeralaHouseNameEn(rs.getString("BPMA_housename_en"))
                .permntOutsideKeralaLocalityNameMl(rs.getString("BPMA_locality_en"))
                .permntOutsideKeralaStreetNameMl(rs.getString("BPMA_street_name_ml"))
                .permntOutsideKeralaHouseNameMl(rs.getString("BPMA_housename_ml"))
                .permntOutsideKeralaPostOfficeEn(rs.getString("BPMA_poname_en"))
                .permntOutsideKeralaPostOfficeMl(rs.getString("BPMA_poname_ml"))
                .permntOutsideIndiaLineoneEn(rs.getString("BPMA_ot_address1_en"))
                .permntOutsideIndiaLineoneMl(rs.getString("BPMA_ot_address1_ml"))
                .permntOutsideIndiaLinetwoEn(rs.getString("BPMA_ot_address2_en"))
                .permntOutsideIndiaLinetwoMl(rs.getString("BPMA_ot_address2_ml"))
                //  .permntOutsideIndiaVillage(rs.getString(""))
                // .permntOutsideIndiaCityTown(rs.getString(""))
                .permanentOutsideIndiaPostCode(rs.getString("BPMA_ot_zipcode"))
                .permntOutSideIndiaProvinceMl(rs.getString("BPMA_ot_state_region_province_ml"))
                .permntOutSideIndiaProvinceEn(rs.getString("BPMA_ot_state_region_province_en"))
                .brideGroomPermanent(rs.getString("BPMA_bride_groom"))


                .isPermanentAddress(rs.getBoolean("BPSA_same_as_permanent"))
//        
                .build();






    }
}
