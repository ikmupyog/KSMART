package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathRowMapper
     * Jasmine
     * on  06/02/2023
     */
    
@Component
public class DeathApplnRowMapper  implements ResultSetExtractor<List<DeathDtl>>, BaseRowMapper{

     private final DeathStatisticalRowMapper statisticalRowMapper;
     private final DeathBasicInfoRowMapper basicInfoRowMapper;
     private final DeathAddressRowMapper addressRowMapper;
     private final DeathFamilyInfoRowMapper familyInfoRowMapper;
     private final DeathInformantRowMapper informantRowMapper;

     @Autowired
     DeathApplnRowMapper(DeathStatisticalRowMapper statisticalRowMapper , 
                        DeathBasicInfoRowMapper basicInfoRowMapper ,DeathAddressRowMapper addressRowMapper ,
                        DeathFamilyInfoRowMapper familyInfoRowMapper , DeathInformantRowMapper informantRowMapper 
                        ) {

         this.statisticalRowMapper = statisticalRowMapper;
         this.basicInfoRowMapper = basicInfoRowMapper;
         this.addressRowMapper = addressRowMapper;
         this.familyInfoRowMapper = familyInfoRowMapper;
         this.informantRowMapper = informantRowMapper;
     
     }
  
     @Override
     public List<DeathDtl> extractData(ResultSet rs) throws SQLException, DataAccessException { 
 
         List<DeathDtl> result = new ArrayList<>();
         while (rs.next()) {
    
             result.add(DeathDtl.builder()
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

