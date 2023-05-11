package org.ksmart.death.deathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
    
@Component
public class DeathRegistryRowMapper  implements ResultSetExtractor<List<DeathRegistryDtl>>, BaseRowMapper{

     private final DeathRegistryStatisticalRowMapper statisticalRowMapper;
     private final DeathRegistryBasicInfoRowMapper basicInfoRowMapper;
     private final DeathRegistryAddressRowMapper addressRowMapper;
     private final DeathRegistryFamilyInfoRowMapper familyInfoRowMapper;
     private final DeathRegistryInformantRowMapper informantRowMapper;

     @Autowired
     DeathRegistryRowMapper(DeathRegistryStatisticalRowMapper statisticalRowMapper , 
                        DeathRegistryBasicInfoRowMapper basicInfoRowMapper ,DeathRegistryAddressRowMapper addressRowMapper ,
                        DeathRegistryFamilyInfoRowMapper familyInfoRowMapper , DeathRegistryInformantRowMapper informantRowMapper 
                        ) {

         this.statisticalRowMapper = statisticalRowMapper;
         this.basicInfoRowMapper = basicInfoRowMapper;
         this.addressRowMapper = addressRowMapper;
         this.familyInfoRowMapper = familyInfoRowMapper;
         this.informantRowMapper = informantRowMapper;
     
     }
  
     @Override
     public List<DeathRegistryDtl> extractData(ResultSet rs) throws SQLException, DataAccessException { 
 
         List<DeathRegistryDtl> result = new ArrayList<>();
         while (rs.next()) {
    
             result.add(DeathRegistryDtl.builder()
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

