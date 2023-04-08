package org.ksmart.death.deathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ksmart.death.deathregistry.web.models.DeathRegistryNACApplicantDtls;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

/**
     * Creates DeathRegistryNACApplicantRowMApper
     * Rakhi S ikm on 08.04.2023
     */
    
@Component
public class DeathRegistryNACApplicantRowMApper {
    public DeathRegistryNACApplicantDtls extractData(ResultSet rs) throws SQLException, DataAccessException { 

        return DeathRegistryNACApplicantDtls.builder()
                            .applicantName(rs.getString("applicant_name"))
                            .applicantAadhaarNo(rs.getString("applicant_aadhar_no"))    
                            .applicantRelation(rs.getString("applicant_relation"))  
                            .applicantAddress(rs.getString("applicant_address")) 
                            .applicantMobileNo(rs.getLong("applicant_mobile_no"))     
                            .applicantEmail(rs.getString("applicant_email")) 
                            .build();
        }
}
