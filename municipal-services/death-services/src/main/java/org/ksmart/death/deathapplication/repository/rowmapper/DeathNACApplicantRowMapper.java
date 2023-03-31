package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ksmart.death.deathapplication.web.models.DeathNACApplicantDtls;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

/**
     * Creates DeathNACApplicantRowMapper
     * Rakhi S ikm
     * on  30.03.2023
     */
    
@Component
public class DeathNACApplicantRowMapper {
    public DeathNACApplicantDtls extractData(ResultSet rs) throws SQLException, DataAccessException { 

        return DeathNACApplicantDtls.builder()
                            .applicantName(rs.getString("initiator_name"))
                            .applicantAadhaarNo(rs.getString("initiator_aadhar_no"))    
                            .applicantRelation(rs.getString("initiator_relation"))  
                            .applicantAddress(rs.getString("initiator_address")) 
                            .applicantMobileNo(rs.getLong("initiator_mobile_no"))     
                            .applicantEmail(rs.getString("initiator_email")) 
                            .build();
        }
}
