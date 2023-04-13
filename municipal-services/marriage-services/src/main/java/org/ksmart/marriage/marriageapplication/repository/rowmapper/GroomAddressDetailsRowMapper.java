package org.ksmart.marriage.marriageapplication.repository.rowmapper;

//import org.ksmart.marriage.marriageapplication.web.model.marriage.PresentAddressDetails;

import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomAddressDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface GroomAddressDetailsRowMapper {
    default GroomAddressDetails getGroomAddressDetailsRowMapper (ResultSet rs) throws SQLException {

        return GroomAddressDetails.builder()
                .countryIdPresent(rs.getString("GPSA_countryid"))
                .stateIdPresent(rs.getString("GPSA_stateid"))
                .districtIdPresent(rs.getString("GPSA_districtid"))
                .poNoPresent(rs.getString("GPSA_poid"))
                .presentaddressCountry(rs.getString("GPMA_countryid"))
                .localityEnPresent(rs.getString("GPSA_locality_en"))
                .localityMlPresent(rs.getString("GPSA_locality_ml"))
                .streetNameEnPresent(rs.getString("GPSA_street_name_en"))
                .streetNameMlPresent(rs.getString("GPSA_street_name_ml"))
                .houseNameNoEnPresent(rs.getString("GPSA_housename_en"))
                .houseNameNoMlPresent(rs.getString("GPSA_housename_ml"))
                .villageNamePresent(rs.getString("GPSA_village_name"))
                .presentInsideKeralaLBName(rs.getString("GPSA_tenantid"))
                .presentInsideKeralaTaluk(rs.getString("GPSA_talukid"))
                .presentInsideKeralaPostOffice(rs.getString("GPSA_poid"))
                .presentInsideKeralaPincode(rs.getString("GPSA_pinno"))
                .presentInsideKeralaVillage(rs.getString("GPSA_villageid"))
                .presentWardNo(rs.getString("GPSA_ward_code"))
                .presentOutsideKeralaPostOfficeEn(rs.getString("GPSA_poname_en"))
                .presentOutsideKeralaPostOfficeMl(rs.getString("GPSA_poname_ml"))
                .presentOutsideKeralaTalukName(rs.getString("GPSA_taluk_name"))
//              .townOrVillagePresent(rs.getString("stat_mother_resdnce_placetype"))


                .presentOutSideIndiaAdressEn(rs.getString("GPSA_ot_address1_en"))
                .presentOutSideIndiaAdressMl(rs.getString("GPSA_ot_address1_ml"))
                .presentOutSideIndiaAdressEnB(rs.getString("GPSA_ot_address2_en"))
                .presentOutSideIndiaAdressMlB(rs.getString("GPSA_ot_address2_ml"))
                .presentOutSideIndiaProvinceEn(rs.getString("GPSA_ot_state_region_province_en"))
                .presentOutSideIndiaProvinceMl(rs.getString("GPSA_ot_state_region_province_ml"))
//                .presentOutSideIndiaadrsCityTown(rs.getString("stat_mother_resdnce_placetype"))

                .countryIdPermanent(rs.getString("GPMA_countryid"))
                .stateIdPermanent(rs.getString("GPMA_stateid"))
                .districtIdPermanent(rs.getString("GPMA_districtid"))
                .poNoPermanent(rs.getString("GPMA_poid"))
                .localityEnPermanent(rs.getString("GPMA_locality_en"))
                .localityMlPermanent(rs.getString("GPMA_locality_ml"))
                .streetNameEnPermanent(rs.getString("GPMA_street_name_en"))
                .streetNameMlPermanent(rs.getString("GPMA_street_name_ml"))
                .houseNameNoEnPermanent(rs.getString("GPMA_housename_en"))
                .houseNameNoMlPermanent(rs.getString("GPMA_housename_ml"))
                .villageNamePermanent(rs.getString("GPMA_village_name"))
                .permntInKeralaAdrPostOffice(rs.getString("GPMA_poid"))
                .permntInKeralaAdrPincode(rs.getString("GPMA_pinno"))
                .permntInKeralaAdrLBName(rs.getString("GPMA_tenantid"))
                .permntInKeralaAdrTaluk(rs.getString("GPMA_talukid"))
                .permntInKeralaAdrVillage(rs.getString("GPMA_villageid"))
                .permntInKeralaWardNo(rs.getString("GPMA_ward_code"))
                .permntOutsideKeralaTaluk(rs.getString("GPMA_taluk_name"))
//                .permntOutsideKeralaCityVilgeEn(rs.getString("stat_mother_resdnce_placetype"))
                .permntOutsideKeralaPostOfficeEn(rs.getString("GPMA_poname_en"))
                .permntOutsideKeralaPostOfficeMl(rs.getString("GPMA_poname_ml"))
//                .isPermanentAddress(rs.getInt("GPMA_same_as_present")==1?true:false)
//                .isPermanentAddressInt(rs.getInt("GPMA_same_as_present"))
                .permntOutsideIndiaLineoneEn(rs.getString("GPMA_ot_address1_en"))
                .permntOutsideIndiaLineoneMl(rs.getString("GPMA_ot_address1_ml"))
                .permntOutsideIndiaLinetwoEn(rs.getString("GPMA_ot_address2_en"))
                .permntOutsideIndiaLinetwoMl(rs.getString("GPMA_ot_address2_ml"))
                .permntOutSideIndiaProvinceEn(rs.getString("GPMA_ot_state_region_province_en"))
                .permanentOutsideIndiaPostCode(rs.getString("GPMA_ot_zipcode"))

                .presentUuid(rs.getString("GPSA_id"))
                .permanentUuid(rs.getString("GPMA_id"))

                .build();
    }
}
