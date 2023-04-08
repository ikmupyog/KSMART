package org.ksmart.death.deathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.deathregistry.web.models.DeathRegistryNACDtls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathRegistryNACRowMapper
     * Rakhi S ikm on 07.04.2023
     */
    
@Component
public class DeathRegistryNACRowMapper implements ResultSetExtractor<List<DeathRegistryNACDtls>>, BaseRowMapper{
    
    private final DeathRegistryNACBasicInfoRowMapper basicInfoRowMapper;
    private final DeathRegistryNACApplicantRowMApper applicantInfoRowMapper;

    @Autowired
    DeathRegistryNACRowMapper(DeathRegistryNACBasicInfoRowMapper basicInfoRowMapper
                                ,DeathRegistryNACApplicantRowMApper applicantInfoRowMapper) {       
        this.basicInfoRowMapper = basicInfoRowMapper;
        this.applicantInfoRowMapper = applicantInfoRowMapper;
    }
    @Override
    public List<DeathRegistryNACDtls> extractData(ResultSet rs) throws SQLException, DataAccessException { 

        List<DeathRegistryNACDtls> result = new ArrayList<>();
        while (rs.next()) {   
            result.add(DeathRegistryNACDtls.builder()
            .deathBasicInfo(basicInfoRowMapper.extractData(rs))      
            .deathApplicantDtls(applicantInfoRowMapper.extractData(rs))              
            .deathAuditDetails(getAuditDetails(rs))
            .build());            
        }
        return result;
    }    
}
