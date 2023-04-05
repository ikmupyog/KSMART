package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.ksmart.marriage.marriageregistry.web.model.BrideRegistryAddressDetails;

public interface BrideRegistryAddressRowMapper {
    default BrideRegistryAddressDetails getBrideAddressDetails (ResultSet rs) throws SQLException {

        return BrideRegistryAddressDetails.builder()
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
                .presentInsideKeralaLBName(rs.getString("BPSA_tenantid"))
                .presentInsideKeralaTaluk(rs.getString("BPSA_talukid"))
                .presentInsideKeralaPostOffice(rs.getString("BPSA_poid"))
                .presentInsideKeralaVillage(rs.getString("BPSA_villageid"))
                .presentWardNo(rs.getString("BPSA_ward_code"))
                .presentOutsideKeralaPostOfficeEn(rs.getString("BPSA_poname_en"))
                .presentOutsideKeralaPostOfficeMl(rs.getString("BPSA_poname_ml"))
                .presentOutsideKeralaTalukName(rs.getString("BPSA_taluk_name"))
//                .townOrVillagePresent(rs.getString("stat_mother_resdnce_placetype"))


                .presentOutSideIndiaAdressEn(rs.getString("BPSA_ot_address1_en"))
                .presentOutSideIndiaAdressMl(rs.getString("BPSA_ot_address1_ml"))
                .presentOutSideIndiaAdressEnB(rs.getString("BPSA_ot_address2_en"))
                .presentOutSideIndiaAdressMlB(rs.getString("BPSA_ot_address2_ml"))
                .presentOutSideIndiaProvinceEn(rs.getString("BPSA_ot_state_region_province_en"))
                .presentOutSideIndiaProvinceMl(rs.getString("BPSA_ot_state_region_province_ml"))
//                .presentOutSideIndiaadrsCityTown(rs.getString("stat_mother_resdnce_placetype"))

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
                .permntInKeralaAdrPostOffice(rs.getString("BPMA_poid"))
                .permntInKeralaAdrPincode(rs.getString("BPMA_pinno"))
                .permntInKeralaAdrLBName(rs.getString("BPMA_tenantid"))
                .permntInKeralaAdrTaluk(rs.getString("BPMA_talukid"))
                .permntInKeralaAdrVillage(rs.getString("BPMA_villageid"))
                .permntInKeralaWardNo(rs.getString("BPMA_ward_code"))
                .permntOutsideKeralaTaluk(rs.getString("BPMA_taluk_name"))
//                .permntOutsideKeralaCityVilgeEn(rs.getString("stat_mother_resdnce_placetype"))
                .permntOutsideKeralaPostOfficeEn(rs.getString("BPMA_poname_en"))
                .permntOutsideKeralaPostOfficeMl(rs.getString("BPMA_poname_ml"))
//                .isPermanentAddress(rs.getInt("BPMA_same_as_present")==1?true:false)
//                .isPermanentAddressInt(rs.getInt("BPMA_same_as_present"))
                .permntOutsideIndiaLineoneEn(rs.getString("BPMA_ot_address1_en"))
                .permntOutsideIndiaLineoneMl(rs.getString("BPMA_ot_address1_ml"))
                .permntOutsideIndiaLinetwoEn(rs.getString("BPMA_ot_address2_en"))
                .permntOutsideIndiaLinetwoMl(rs.getString("BPMA_ot_address2_ml"))
                .permntOutSideIndiaProvinceEn(rs.getString("BPMA_ot_state_region_province_en"))
                .permanentOutsideIndiaPostCode(rs.getString("BPMA_ot_zipcode"))

                .presentUuid(rs.getString("BPSA_id"))
                .permanentUuid(rs.getString("BPMA_id"))


                .build();


    }
}
