package org.ksmart.death.deathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.ksmart.death.deathregistry.web.models.DeathRegistryFamilyInfo;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
// Family Info
@Component
public class  DeathRegistryFamilyInfoRowMapper   implements ResultSetExtractor  , BaseRowMapper{

      public DeathRegistryFamilyInfo extractData(ResultSet rs) throws SQLException, DataAccessException { 
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
                            .spouseAgeIfAlive(rs.getString("spouse_if_alive"))
                            .spouseAge(rs.getInt("spouse_age"))
                            .spouseAadhaar(rs.getString("spouse_aadhaar"))
                            .fatherAadharNo(rs.getString("male_dependent_aadharno"))
                            .motherAadharNo(rs.getString("female_dependent_aadharno"))
                            .build();
                    }
                
    
}
