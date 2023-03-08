package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ksmart.death.deathapplication.web.models.DeathAbandonedInformantDtls;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;
/**
     * Creates DeathAbandonedInformantRowMapper
     * Rakhi S ikm
     * on  12/02/2023
     */
    
@Component
public class DeathAbandonedInformantRowMapper {
    public DeathAbandonedInformantDtls extractData(ResultSet rs) throws SQLException, DataAccessException { 

        return DeathAbandonedInformantDtls.builder()
                            .informantAadhaarNo(rs.getString("informant_aadhar_no"))
                            .informantName(rs.getString("informant_name_en"))
                            .informantDesignation(rs.getString("informant_designation"))
                            .informantMobileNo(rs.getLong("informant_mobile_no"))
                            .informantAddress(rs.getString("informant_address"))
                            .informantOfficeAddress(rs.getString("informant_office_address"))   
                            .informantOfficeAuthority(rs.getString("informant_office"))
                            .informantPENNo(rs.getString("informant_pen_no"))                    
                            .build();
                    }
}
