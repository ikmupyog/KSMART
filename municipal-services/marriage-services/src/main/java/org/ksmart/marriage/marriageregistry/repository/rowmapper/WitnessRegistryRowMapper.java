package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import org.ksmart.marriage.marriageregistry.model.WitnessRegistryDetails;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.stereotype.Component;

    
@Component
public interface WitnessRegistryRowMapper {
    default WitnessRegistryDetails getWitnessDetails(ResultSet rs) throws SQLException {

        return WitnessRegistryDetails.builder()
//                .id(rs.getString("wd_id"))
                .adharno(rs.getString("wd_adharno"))
                .name_en(rs.getString("wd_name_en"))
                .name_mal(rs.getString("wd_name_mal"))
                .age(rs.getInt("wd_age"))
                .address_en(rs.getString("wd_address_en"))
                .address_mal(rs.getString("wd_address_mal"))
                .mobile(rs.getString("wd_mobile"))
                .is_esigned(Boolean.valueOf(rs.getString("wd_is_esigned")))
                .marriageid(rs.getString("wd_marriageid"))
                .build();
    }

}