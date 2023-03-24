package org.ksmart.death.deathapplication.repository.rowmapper;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathInitiatorRowMapper
     * Jasmine
     * on  12/02/2023,updated 15/12/2023
     */
    
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
                            .build();
                    }
}
