package org.ksmart.death.crdeathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryStatistical;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathStatisticalRowMapper
     * Rakhi S IKM
     * on  09/12/2022
     */
    
@Component
public class CrDeathRegistryStatisticalRowMapper 
        implements ResultSetExtractor  , RegistryBaseRowMapper{
    @Override
    public CrDeathRegistryStatistical extractData(ResultSet rs) throws SQLException, DataAccessException { // STATISTICAL

        return CrDeathRegistryStatistical.builder()
                            .id(rs.getString("statid"))
                            .deathDtlId(rs.getString("death_dtl_id"))
                            .residenceLocalBody(rs.getString("residencelocalbody"))
                            .residencePlaceType(rs.getString("residence_place_type"))
                            .residenceDistrict(rs.getString("residencedistrict"))
                            .residenceState(rs.getString("residencestate"))
                            .religion(rs.getString("religion"))
                            .religionOther(rs.getString("religion_other"))
                            .occupation(rs.getString("occupation"))
                            .occupationOther(rs.getString("occupation_other"))
                            .medicalAttentionType(rs.getString("medical_attention_type"))
                            .deathMedicallyCertified(rs.getInt("death_medically_certified"))
                            .deathCauseMain(rs.getString("death_cause_main"))
                            .deathCauseSub(rs.getString("death_cause_sub"))
                            .deathCauseOther(rs.getString("death_cause_other"))
                            .deathDuringDelivery(rs.getInt("death_during_delivery"))
                            .smokingNumYears(rs.getInt("smoking_num_years"))
                            .tobaccoNumYears(rs.getInt("tobacco_num_years"))
                            .arecanutNumYears(rs.getInt("arecanut_num_years"))
                            .alcoholNumYears(rs.getInt("alcohol_num_years"))
                            .nationality(rs.getString("nationality"))
                            .occupationSub(rs.getString("occupation_sub"))
                            .occupationMinor(rs.getString("occupation_minor"))
                            .educationMain(rs.getString("education_main"))
                            .educationSub(rs.getString("education_sub"))
                            .residenceLBType(rs.getString("residencelbtype"))
                            //Rakhi S on 20.01.2023
                            .smokingType(rs.getInt("smoking_type"))
                            .tobaccoType(rs.getInt("tobacco_type"))
                            .arecanutType(rs.getInt("arecanut_type"))
                            .alcoholType(rs.getInt("alcohol_type"))
                            .build();
    }

    
}
