package org.ksmart.birth.marriagecorrection.repository.rowmapper;

import org.ksmart.birth.marriageapplication.model.birth.BirthPresentAddress;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface BirthPresentAddressRowMapper {

    default BirthPresentAddress getBirthPresentAddress(ResultSet rs) throws SQLException {
        return BirthPresentAddress.builder()
                .id(rs.getString("id"))
                //.re(rs.getString("resdnce_addr_type"))
                .resAssoNo(rs.getString("res_asso_no"))
                .houseNameEn(rs.getString("housename_en"))
                .houseNameMl(rs.getString("housename_ml"))
                .otAddress1En(rs.getString("ot_address1_en"))
                .otAddress1Ml(rs.getString("ot_address1_ml"))
                .otAddress2En(rs.getString("ot_address2_en"))
                .otAddress2Ml(rs.getString("ot_address2_ml"))
                .villageId(rs.getString("villageid"))
                .tenantId(rs.getString("tenantid"))
                .talukId(rs.getString("talukid"))
                .districtId(rs.getString("districtid"))
                .stateId(rs.getString("stateid"))
                .poId(rs.getString("poid"))
                .pinNo(rs.getString("pinno"))
                .otStateRegionProvinceEn(rs.getString("ot_state_region_province_en"))
                .otStateRegionProvinceMl(rs.getString("ot_state_region_province_ml"))
                .countryId(rs.getString("countryid"))
                .birthDtlId(rs.getString("birthdtlid"))
                .build();
    }
}
