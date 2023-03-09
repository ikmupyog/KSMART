package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathAbandonedRowMapper
     * Rakhi S ikm on 08.03.2023 
     */
    
@Component
public class DeathAbandonedRowMapper implements ResultSetExtractor<List<DeathAbandonedDtls>>, BaseRowMapper{

    private final DeathStatisticalRowMapper statisticalRowMapper;
    private final DeathBasicInfoRowMapper basicInfoRowMapper;
    private final DeathAddressRowMapper addressRowMapper;
    private final DeathFamilyInfoRowMapper familyInfoRowMapper;
    private final DeathAbandonedInformantRowMapper informantRowMapper;

    @Autowired
    DeathAbandonedRowMapper(DeathStatisticalRowMapper statisticalRowMapper , 
                       DeathBasicInfoRowMapper basicInfoRowMapper ,DeathAddressRowMapper addressRowMapper ,
                       DeathFamilyInfoRowMapper familyInfoRowMapper , DeathAbandonedInformantRowMapper informantRowMapper 
                       ) {

        this.statisticalRowMapper = statisticalRowMapper;
        this.basicInfoRowMapper = basicInfoRowMapper;
        this.addressRowMapper = addressRowMapper;
        this.familyInfoRowMapper = familyInfoRowMapper;
        this.informantRowMapper = informantRowMapper;
    
    }
 
    @Override
    public List<DeathAbandonedDtls> extractData(ResultSet rs) throws SQLException, DataAccessException { 

        List<DeathAbandonedDtls> result = new ArrayList<>();
        while (rs.next()) {
   
            result.add(DeathAbandonedDtls.builder()
            .applicationType(rs.getString("appl_type"))
            .applicationStatus(rs.getString("status"))
            .businessService(rs.getString("businessService"))
            .action(rs.getString("action"))
            .workflowcode(rs.getString("workflowcode"))
            .assignuser(rs.getString("assignee"))
            .deathBasicInfo(basicInfoRowMapper.extractData(rs))
            .deathAddressInfo(addressRowMapper.extractData(rs))
            .deathFamilyInfo(familyInfoRowMapper.extractData(rs))
            .deathStatisticalInfo(statisticalRowMapper.extractData(rs))
            .deathInformantDtls(informantRowMapper.extractData(rs))
            .deathAuditDetails(getAuditDetails(rs))
            .build());
            
        }

        return result;
    }
   }


