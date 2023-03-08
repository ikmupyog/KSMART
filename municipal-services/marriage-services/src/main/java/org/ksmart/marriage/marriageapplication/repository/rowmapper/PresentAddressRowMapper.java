package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.PermanentAdressDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.PresentAddressDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface PresentAddressRowMapper {
    default PresentAddressDetails getPresentAddress (ResultSet rs) throws SQLException{

        return PresentAddressDetails.builder()
                .id(rs.getString("id"))
                .houseno(rs.getString("houseno"))
                .housename_no_en(rs.getString("housename_no_en"))
                .housename_no_ml(rs.getString("housename_no_ml"))
                .villageid(rs.getString("villageid"))
                .village_name(rs.getString("village_name"))
                .talukid(rs.getString("talukid"))
                .taluk_name(rs.getString("taluk_name"))
                .ward_code(rs.getString("ward_code"))
                .doorno(rs.getInt("doorno"))
                .locality_en(rs.getString("locality_en"))
                .locality_ml(rs.getString("locality_ml"))
                .street_name_en(rs.getString("street_name_en"))
                .street_name_ml(rs.getString("street_name_ml"))
                .districtid(rs.getString("districtid"))
                .stateid(rs.getString("stateid"))
                .poid(rs.getString("poid"))
                .pinno(rs.getString("pinno"))
                .countryid(rs.getString("countryid"))
                .marriageid(rs.getString("marriageid"))                .build();
    }
}
