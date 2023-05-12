package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.ksmart.death.deathapplication.web.models.DeathStatisticalInfo;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
// STATISTICAL
@Component
public class DeathStatisticalRowMapper implements ResultSetExtractor  , BaseRowMapper{

    public DeathStatisticalInfo extractData(ResultSet rs) throws SQLException, DataAccessException { 

        return DeathStatisticalInfo.builder()
        .statisticalId(rs.getString("statid"))
        .deathDtlId(rs.getString("death_dtl_id"))
        .tenantId(rs.getString("tenantid"))
        .medicalAttentionType(rs.getString("medical_attention_type"))
        .isAutopsyPerformed(rs.getString("autopsy_performed"))
        .isAutopsyCompleted(rs.getString("autopsy_completed"))
        .mannerOfDeath(rs.getString("manner_of_death"))      
        .deathMedicallyCertified(rs.getString("death_medically_certified"))
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
        //Rakhi S on 17.03.2023
        .mPName(rs.getString("medical_practitioner_name"))
        .mPAadharNumber(rs.getString("medical_practitioner_aadhaar"))
        .mPMobileNo(rs.getLong("medical_practitioner_mobile"))
        .mPRegistrationNumber(rs.getString("medical_practitioner_regno"))
        .mPDesignation(rs.getString("medical_practitioner_desig"))
        .mPAddress(rs.getString("medical_practitioner_address"))
        //Rakhi S on 12.05.2023
        .alcoholNumYears(rs.getInt("alcohol_num_years"))
        .smokingNumYears(rs.getInt("smoking_num_years"))
        .tobaccoNumYears(rs.getInt("tobacco_num_years"))
        .build();
    }

    
}
