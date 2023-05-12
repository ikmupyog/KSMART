package org.ksmart.death.deathapplication.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathStatisticalInfo {
    @Size(max = 64)
    @JsonProperty("StatisticalId")
    private String statisticalId;

    @JsonProperty("DeathDtlId")
    private String deathDtlId ; 

    @JsonProperty("TenantId")
    private String tenantId;

    @JsonProperty("MedicalAttentionType")
    private String medicalAttentionType;

    @JsonProperty("IsAutopsyPerformed")
    private String isAutopsyPerformed;

    @JsonProperty("IsAutopsyCompleted")
    private String isAutopsyCompleted;

    @JsonProperty("MannerOfDeath")
    private String mannerOfDeath;

    @JsonProperty("DeathMedicallyCertified")
    private String deathMedicallyCertified;

    @JsonProperty("DeathCauseMain")
    private String deathCauseMain;

    @JsonProperty("DeathCauseMainCustom")
    private String deathCauseMainCustom;

    @JsonProperty("DeathCauseMainInterval")
    private Integer deathCauseMainInterval;

    @JsonProperty("DeathCauseMainTimeUnit")
    private  String deathCauseMainTimeUnit;

    @JsonProperty("DeathCauseSub")
    private String deathCauseSub;

    @JsonProperty("DeathCauseSubCustom")
    private String deathCauseSubCustom;

    @JsonProperty("DeathCauseSubInterval")
    private Integer deathCauseSubInterval;

    @JsonProperty("DeathCauseSubTimeUnit")
    private String deathCauseSubTimeUnit;

    @JsonProperty("DeathCauseSub2")
    private String deathCauseSub2;

    @JsonProperty("DeathCauseSubCustom2")
    private String deathCauseSubCustom2;

    @JsonProperty("DeathCauseSubInterval2")
    private Integer deathCauseSubInterval2;

    @JsonProperty("DeathCauseSubTimeUnit2")
    private String deathCauseSubTimeUnit2;

    @JsonProperty("DeathCauseOther")
    private String deathCauseOther;
    
    @JsonProperty("IsdeceasedPregnant")
    private String isdeceasedPregnant;

    @JsonProperty("IsDelivery")
    private String isDelivery;

    @JsonProperty("DeathDuringDelivery")
    private String deathDuringDelivery;

    @JsonProperty("SmokingType")
    private String smokingType;

    @JsonProperty("TobaccoType")
    private String tobaccoType;

    @JsonProperty("AlcoholType")
    private String alcoholType;

    @JsonProperty("auditDetails")
    private AuditDetails  deathAuditDetails;

    @JsonProperty("MPName")
    private String mPName;

    @JsonProperty("MPAadharNumber")
    private String mPAadharNumber;
    
    @JsonProperty("MPMobileNo")
    private Long mPMobileNo;

    @JsonProperty("MPRegistrationNumber")
    private String mPRegistrationNumber;

    @JsonProperty("MPDesignation")
    private String mPDesignation;

    @JsonProperty("MPAddress")
    private String mPAddress;

    //Rakhi S ikm on 02.05.2023 for Summery page
    
    @JsonProperty("deathCauseMainEn")
    private String deathCauseMainEn;

    @JsonProperty("deathCauseMainMl")
    private String deathCauseMainMl;
    
    @JsonProperty("deathCauseSubEn")
    private String deathCauseSubEn;

    @JsonProperty("deathCauseSubMl")
    private String deathCauseSubMl;

    @JsonProperty("deathCauseSub2En")
    private String deathCauseSub2En;

    @JsonProperty("deathCauseSub2Ml")
    private String deathCauseSub2Ml;
    
    @JsonProperty("medicalAttentionTypeMl")
    private String medicalAttentionTypeMl;
    
    @JsonProperty("medicalAttentionTypeEn")
    private String medicalAttentionTypeEn;
    
    @JsonProperty("mannerOfDeathEn")
    private String mannerOfDeathEn;

    @JsonProperty("mannerOfDeathMl")
    private String mannerOfDeathMl;

    //Rakhi S ikm on 12.05.2023 modification
    @JsonProperty("smokingNumYears")
    private Integer smokingNumYears;

    @JsonProperty("tobaccoNumYears")
    private Integer tobaccoNumYears;

    @JsonProperty("alcoholNumYears")
    private Integer alcoholNumYears;

}
