package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.WitnessDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface WitnessDetailsRowMapper {
    default WitnessDetails getWitnessDetails(ResultSet rs) throws SQLException {

        return WitnessDetails.builder()
                .marriageid(rs.getString("MD_id"))
                .witnessId1(rs.getString("WD1_id"))
                .witness1AadharNo(rs.getString("WD1_aadharno"))
                .witness1NameEn(rs.getString("WD1_name_en"))
                .witness1NameMl(rs.getString("WD1_name_ml"))
                .witness1Age(rs.getInt("WD1_age"))
                .witness1AddresSEn(rs.getString("WD1_address_en"))
                .witness1AddressMl(rs.getString("WD1_address_ml"))
                .witness1Mobile(rs.getLong("WD1_mobile"))
                .witness1Esigned(Boolean.valueOf(rs.getString("WD1_is_esigned")))
                .witnessId2(rs.getString("WD2_id"))
                .witness2AadharNo(rs.getString("WD2_aadharno"))
                .witness2NameEn(rs.getString("WD2_name_en"))
                .witness2NameMl(rs.getString("WD2_name_ml"))
                .witness2Age(rs.getInt("WD2_age"))
                .witness2AddresSEn(rs.getString("WD2_address_en"))
                .witness2AddressMl(rs.getString("WD2_address_ml"))
                .witness2Mobile(rs.getLong("WD2_mobile"))
                .witness2Esigned(Boolean.valueOf(rs.getString("WD2_is_esigned")))
                .build();
    }

}