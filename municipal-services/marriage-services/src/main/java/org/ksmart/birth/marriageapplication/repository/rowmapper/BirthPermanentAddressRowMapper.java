package org.ksmart.birth.marriageapplication.repository.rowmapper;

import org.ksmart.birth.marriageapplication.model.birth.BirthPermanentAddress;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface BirthPermanentAddressRowMapper {

    default BirthPermanentAddress getBirthPermanentAddress(ResultSet rs) throws SQLException {
        return BirthPermanentAddress.builder()
                .id(rs.getString("per_id"))
                .resdnceAddrType(rs.getString("per_resdnce_addr_type"))
                .resAssoNo(rs.getString("per_res_asso_no"))
                .houseNameEn(rs.getString("per_housename_en"))
                .houseNameMl(rs.getString("per_housename_ml"))
                .otAddress1En(rs.getString("per_ot_address1_en"))
                .otAddress1Ml(rs.getString("per_ot_address1_ml"))
                .otAddress2En(rs.getString("per_ot_address2_en"))
                .otAddress2Ml(rs.getString("per_ot_address2_ml"))
                .villageId(rs.getString("per_villageid"))
                .tenantId(rs.getString("per_tenantid"))
                .talukId(rs.getString("per_talukid"))
                .districtId(rs.getString("per_districtid"))
                .stateId(rs.getString("per_stateid"))
                .poId(rs.getString("per_poid"))
                .pinNo(rs.getString("per_pinno"))
                .otStateRegionProvinceEn(rs.getString("per_ot_state_region_province_en"))
                .otStateRegionProvinceMl(rs.getString("per_ot_state_region_province_ml"))
                .countryId(rs.getString("per_countryid"))
                .birthDtlId(rs.getString("per_birthdtlid"))
                .sameAsPresent(rs.getInt("same_as_present"))
                .build();
    }
}
