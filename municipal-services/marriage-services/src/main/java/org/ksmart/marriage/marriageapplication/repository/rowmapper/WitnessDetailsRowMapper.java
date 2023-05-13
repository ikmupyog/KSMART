package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.web.model.marriage.WitnessDetails;

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
                .witness1Esigned(rs.getBoolean("WD1_is_esigned"))
                //.witness1Esigned(Boolean.valueOf(rs.getString("WD1_is_esigned")))
                .serialNo1(rs.getInt("WD1_serial_no"))
                .witnessId2(rs.getString("WD2_id"))
                .witness2AadharNo(rs.getString("WD2_aadharno"))
                .witness2NameEn(rs.getString("WD2_name_en"))
                .witness2NameMl(rs.getString("WD2_name_ml"))
                .witness2Age(rs.getInt("WD2_age"))
                .witness2AddresSEn(rs.getString("WD2_address_en"))
                .witness2AddressMl(rs.getString("WD2_address_ml"))
                .witness2Mobile(rs.getLong("WD2_mobile"))
                .serialNo2(rs.getInt("WD1_serial_no"))
                .witness2Esigned(rs.getBoolean("WD2_is_esigned"))
                .brideUrl(rs.getString("MD_brideurl"))
                .groomUrl(rs.getString("MD_groomurl"))
                .imageUuid(rs.getString("MD_imageuuid"))
                .brideFilestoreId(rs.getString("MD_bride_filestoreid"))
                .groomFilestoreId(rs.getString("MD_groom_filestoreid"))
                // .witness2Esigned(Boolean.valueOf(rs.getString("WD2_is_esigned")))
                .tenentId(rs.getString("MD_tenantid"))
                .brideExpired(rs.getBoolean("MD_bride_expired"))
                .brideUrl(createFullURL(rs.getString("MD_brideurl")))
                .brideFilestoreId(rs.getString("MD_bride_filestoreid"))
                .groomExpired(rs.getBoolean("MD_groom_expired"))
                .groomUrl(createFullURL(rs.getString("MD_groomurl")))
                .groomFilestoreId(rs.getString("MD_groom_filestoreid"))
                .imageUuid(rs.getString("MD_imageuuid"))
                .isBackward(rs.getBoolean("MD_is_backward"))
                .build();
    }
    String createFullURL(String url);

}