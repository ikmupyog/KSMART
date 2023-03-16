package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.WitnessDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface WitnessDetailsRowMapper {
    default WitnessDetails getWitnessDetails(ResultSet rs) throws SQLException {

        return WitnessDetails.builder()
                .id(rs.getString("id"))
                .adharno(rs.getString("adharno"))
                .name_en(rs.getString("name_en"))
                .name_mal(rs.getString("name_mal"))
                .age(rs.getInt("age"))
                .address_en(rs.getString("address_en"))
                .address_mal(rs.getString("address_mal"))
                .mobile(rs.getString("mobile"))
                .is_message_received(Boolean.valueOf(rs.getString("is_message_received")))
                .is_esigned(Boolean.valueOf(rs.getString("is_esigned")))
                .marriageid(rs.getString("marriageid"))
                .w2Adharno(rs.getString("w2_adharno"))
                .w2Age(Integer.valueOf(rs.getString("w2_age")))
                .w2Name_en(rs.getString("w2_name_en"))
                .w2Address_mal(rs.getString("w2_name_mal"))
                .w2Address_en(rs.getString("w2_address_en"))
                .w2Name_mal(rs.getString("w2_address_mal"))
                .w2Mobile(rs.getString("w2_mobile"))
                .w2Is_esigned(Boolean.valueOf(rs.getString("w2_is_esigned")))
                .w2Is_message_received(Boolean.valueOf(rs.getString("w2_is_message_received")))
                .build();
    }

}