package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.ksmart.death.deathapplication.web.models.DeathStatisticalInfo;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathStatisticalRowMapper
     * Jasmine
     * on  06/02/2023
     */
    
@Component
public class DeathStatisticalRowMapper implements ResultSetExtractor  , BaseRowMapper{
  //  @Override
    public DeathStatisticalInfo extractData(ResultSet rs) throws SQLException, DataAccessException { // STATISTICAL

        return DeathStatisticalInfo.builder()
        .statisticalId(rs.getString("statid"))
        .deathDtlId(rs.getString("death_dtl_id"))
        .tenantId(rs.getString("tenantid"))
        .medicalAttentionType(rs.getString("medical_attention_type"))
        .isAutopsyPerformed(rs.getBoolean("autopsy_performed"))
        .isAutopsyCompleted(rs.getBoolean("autopsy_completed"))
        .mannerOfDeath(rs.getString("manner_of_death"))      
        .deathMedicallyCertified(rs.getBoolean("death_medically_certified"))
        .deathCauseMain(rs.getString("death_cause_main"))
        .deathCauseMainCustom(rs.getString("death_cause_main_custom"))
        .deathCauseMainInterval(rs.getInt("death_cause_main_interval"))
        .deathCauseMainTimeUnit(rs.getString("death_cause_main_timeunit"))          
        .deathCauseSub(rs.getString("death_cause_sub"))
        .deathCauseSubCustom(rs.getString("death_cause_sub_custom"))
        .deathCauseSubInterval(rs.getInt("death_cause_sub_interval"))
        .deathCauseSubTimeUnit(rs.getString("death_cause_sub_timeunit"))
        .deathCauseSub2(rs.getString("death_cause_sub2"))
        .deathCauseSubCustom2(rs.getString("death_cause_sub2_custom"))
        .deathCauseSubInterval2(rs.getInt("death_cause_sub2_interval"))
        .deathCauseSubTimeUnit2(rs.getString("death_cause_sub2_timeunit"))
        .deathCauseOther(rs.getString("death_cause_other"))
        .isdeceasedPregnant(rs.getString("deceased_pregnant"))
        .isDelivery(rs.getString("is_delivery"))
        .deathDuringDelivery(rs.getString("death_during_delivery"))
        .smokingType(rs.getString("smoking_type"))
        .tobaccoType(rs.getString("tobacco_type"))
        .alcoholType(rs.getString("alcohol_type"))
        .build();
    }

    
}
