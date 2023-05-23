package org.ksmart.death.deathapplication.repository.rowmapper;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class DeathInitiatorRowMapper {
    public DeathInitiatorDtls extractData(ResultSet rs) throws SQLException, DataAccessException { 

        return DeathInitiatorDtls.builder()
                            .initiatorRelation(rs.getString("initiator_relation"))
                            .initiatorAadhaar(rs.getString("initiator_aadhar_no"))
                            .initiatorName(rs.getString("initiator_name"))
                            .initiatorMobile(rs.getLong("initiator_mobile_no"))
                            .initiatorAddress(rs.getString("initiator_address"))
                            .isDeclarationInitiator(rs.getBoolean("is_declaration_initiator"))   
                            .initiatorDesi(rs.getString("initiator_designation"))      
                            .initiatorInstitutionName(rs.getString("initiator_institution_name"))   
                            .isCaretaker(rs.getBoolean("initiator_iscaretaker"))    
                            .isGuardian(rs.getBoolean("initiator_isguardian")) 
                            .ipopList(rs.getString("ip_op_list"))     
                            .ipopNumber(rs.getString("ip_op_no")) 
                            .registrationNoHospital(rs.getString("reg_no_hospital")) 
                            .registrationNoInstitution(rs.getString("reg_no_institution")) 
                            .admissionNoInstitution(rs.getString("admission_no_institution"))   
                            .build();
                    }
}
