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
                           // .isAutopsyPerformed(rs.getString(""))
                           // .isAutopsyCompleted(rs.getString(""))
                           // .mannerOfDeath(rs.getString(""))
                            .deathMedicallyCertified(rs.getString("death_medically_certified"))
                            .deathCauseMain(rs.getString("death_cause_main"))
                           // .deathCauseMainCustom(rs.getString(""))
                           // .deathCauseMainInterval(rs.getString(""))
                          //  .deathCauseMainTimeUnit(rs.getInt(""))
                            .deathCauseSub(rs.getString("death_cause_sub"))
                          //  .deathCauseSubCustom(rs.getString(""))
                          //  .deathCauseSubInterval(rs.getInt(""))
                          //  .deathCauseSubTimeUnit(rs.getString(""))
                            .deathCauseSub2(rs.getString("death_cause_sub"))
                           // .deathCauseSubCustom2(rs.getString(""))
                           // .deathCauseSubInterval2(rs.getInt(""))
                           // .deathCauseSubTimeUnit2(rs.getString(""))
                            .deathCauseOther(rs.getString("death_cause_other"))
                           // .isdeceasedPregnant(rs.getString(""))
                           // .isDelivery(rs.getBoolean(""))
                            .deathDuringDelivery(rs.getString("death_during_delivery"))
                            .smokingType(rs.getInt("smoking_type"))
                            .tobaccoType(rs.getInt("tobacco_type"))
                            .alcoholType(rs.getInt("alcohol_type"))
                            .build();
    }

    
}
