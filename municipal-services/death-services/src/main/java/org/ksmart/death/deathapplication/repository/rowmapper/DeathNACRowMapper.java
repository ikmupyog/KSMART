package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathNACRowMapper
     * Rakhi S ikm on 30.03.2023 
     */
    
@Component
public class DeathNACRowMapper implements ResultSetExtractor<List<DeathNACDtls>>, BaseRowMapper{
    
    private final DeathBasicInfoRowMapper basicInfoRowMapper;
    private final DeathAddressRowMapper addressRowMapper;
    private final DeathNACApplicantRowMapper applicantRowMapper;

    @Autowired
    DeathNACRowMapper(DeathBasicInfoRowMapper basicInfoRowMapper ,DeathAddressRowMapper addressRowMapper,
                        DeathNACApplicantRowMapper applicantRowMapper) {       
        this.basicInfoRowMapper = basicInfoRowMapper;
        this.addressRowMapper = addressRowMapper; 
        this.applicantRowMapper = applicantRowMapper;  
    }
    @Override
    public List<DeathNACDtls> extractData(ResultSet rs) throws SQLException, DataAccessException { 

        List<DeathNACDtls> result = new ArrayList<>();
        while (rs.next()) {
   
            result.add(DeathNACDtls.builder()
            .applicationType(rs.getString("appl_type"))
            .applicationStatus(rs.getString("status"))
            .businessService(rs.getString("businessService"))
            .action(rs.getString("action"))
            .workflowcode(rs.getString("workflowcode"))
            .assignuser(rs.getString("assignee"))
            .deathBasicInfo(basicInfoRowMapper.extractData(rs))
            .deathAddressInfo(addressRowMapper.extractData(rs))   
            .deathApplicantDtls(applicantRowMapper.extractData(rs))         
            .deathAuditDetails(getAuditDetails(rs))
            .build());
            
        }

        return result;
    }
}
