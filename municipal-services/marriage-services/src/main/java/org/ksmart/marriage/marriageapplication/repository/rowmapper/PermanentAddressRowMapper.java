package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.PermanentAdressDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface PermanentAddressRowMapper {
    default PermanentAdressDetails getPermanentAddress (ResultSet rs) throws SQLException{

        return PermanentAdressDetails.builder()
                .id(rs.getString("per_id"))
                .houseno(rs.getString("per_houseno"))
                .housename_no_en(rs.getString("per_housename_no_en"))
                .housename_no_ml(rs.getString("per_housename_no_ml"))
                .villageid(rs.getString("per_villageid"))
                .village_name(rs.getString("per_village_name"))
                .talukid(rs.getString("per_talukid"))
                .taluk_name(rs.getString("per_taluk_name"))
                .ward_code(rs.getString("per_ward_code"))
                .doorno(rs.getInt("per_doorno"))
                .locality_en(rs.getString("per_locality_en"))
                .locality_ml(rs.getString("per_locality_ml"))
                .street_name_en(rs.getString("per_street_name_en"))
                .street_name_ml(rs.getString("per_street_name_ml"))
                .districtid(rs.getString("per_districtid"))
                .stateid(rs.getString("per_stateid"))
                .poid(rs.getString("per_poid"))
                .pinno(rs.getString("per_pinno"))
                .countryid(rs.getString("per_countryid"))
                .marriageid(rs.getString("per_marriageid"))

                .build();

               
    }
}
