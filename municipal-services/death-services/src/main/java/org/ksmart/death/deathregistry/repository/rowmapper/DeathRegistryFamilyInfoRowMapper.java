package org.ksmart.death.deathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.ksmart.death.deathregistry.web.models.DeathRegistryFamilyInfo;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
/**
     * Created by
     * JASMINE IKM
     * 08.02.2023
     */
@Component
public class  DeathRegistryFamilyInfoRowMapper   implements ResultSetExtractor  , BaseRowMapper{

      public DeathRegistryFamilyInfo extractData(ResultSet rs) throws SQLException, DataAccessException { // STATISTICAL
        return DeathRegistryFamilyInfo.builder()
                            .spouseUnavailable(rs.getBoolean("spouse_unavailable"))
                            .spouseType(rs.getString("spouse_type"))
                            .spouseNameEn(rs.getString("spouse_name_en"))
                            .spouseNameML(rs.getString("spouse_name_ml"))
                            .fatherUnavailable(rs.getBoolean("male_dependent_unavailable"))
                            .fatherNameEn(rs.getString("male_dependent_name_en"))
                            .fatherNameMl(rs.getString("male_dependent_name_ml"))
                            .motherUnavailable(rs.getBoolean("female_dependent_unavailable"))
                            .motherNameEn(rs.getString("female_dependent_name_en"))
                            .motherNameMl(rs.getString("female_dependent_name_ml"))
                            .familyMobileNo(rs.getLong("family_mobile_no"))
                            .familyEmailId(rs.getString("family_email"))
                            .build();
                    }
                
    
}
