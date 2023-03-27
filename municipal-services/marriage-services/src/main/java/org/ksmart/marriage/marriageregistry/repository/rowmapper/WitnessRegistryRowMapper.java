package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import org.ksmart.marriage.marriageregistry.model.WitnessRegistryDetails;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.stereotype.Component;

    
@Component
public interface WitnessRegistryRowMapper {
    default WitnessRegistryDetails getWitnessDetails(ResultSet rs) throws SQLException {

        return WitnessRegistryDetails.builder()
                .marriageid(rs.getString("WD_marriageid"))
                .witnessId1(rs.getString("WD_id"))
                .witness1AadharNo(rs.getString("WD_adharno"))
                .witness1NameEn(rs.getString("WD_name_en"))
                .witness1NameMl(rs.getString("WD_name_mal"))
                .witness1Age(rs.getInt("WD_age"))
                .witness1AddresSEn(rs.getString("WD_address_en"))
                .witness1AddressMl(rs.getString("WD_address_ml"))
                .witness1Mobile(rs.getLong("WD_mobile"))
                .witness1Esigned(Boolean.valueOf(rs.getString("WD_is_esigned")))
                .witnessId2(rs.getString("WD_id"))
                .witness2AadharNo(rs.getString("WD_adharno"))
                .witness2NameEn(rs.getString("WD_name_en"))
                .witness2NameMl(rs.getString("WD_name_mal"))
                .witness2Age(rs.getInt("WD_age"))
                .witness2AddresSEn(rs.getString("WD_address_en"))
                .witness2AddressMl(rs.getString("WD_address_ml"))
                .witness2Mobile(rs.getLong("WD_mobile"))
                .witness2Esigned(Boolean.valueOf(rs.getString("WD_is_esigned")))
                .build();
    }

}