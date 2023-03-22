package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.PresentAddressDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface PresentAddressRowMapper {
    default PresentAddressDetails getPresentAddress (ResultSet rs) throws SQLException{

        return PresentAddressDetails.builder()
                .id(rs.getString("pes_id"))
                .houseno(rs.getString("pes_houseno"))
                .housename_no_en(rs.getString("pes_housename_no_en"))
                .housename_no_ml(rs.getString("pes_housename_no_ml"))
                .villageid(rs.getString("pes_villageid"))
                .village_name(rs.getString("pes_village_name"))
                .talukid(rs.getString("pes_talukid"))
                .taluk_name(rs.getString("pes_taluk_name"))
                .ward_code(rs.getString("pes_ward_code"))
                .doorno(rs.getInt("pes_doorno"))
                .locality_en(rs.getString("pes_locality_en"))
                .locality_ml(rs.getString("pes_locality_ml"))
                .street_name_en(rs.getString("pes_street_name_en"))
                .street_name_ml(rs.getString("pes_street_name_ml"))
                .districtid(rs.getString("pes_districtid"))
                .stateid(rs.getString("pes_stateid"))
                .poid(rs.getString("pes_poid"))
                .pinno(rs.getString("pes_pinno"))
                .countryid(rs.getString("pes_countryid"))
                .marriageid(rs.getString("pes_marriageid"))
                .build();
    }
}
