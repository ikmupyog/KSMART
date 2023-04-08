package org.ksmart.death.deathregistry.web.models;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
     * Creates DeathRegistryNACApplicantDtls  model class  
     * RAkhi S ikm  on 08.04.2023
*/
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryNACApplicantDtls {
    @JsonProperty("ApplicantName")
    private String applicantName ;

    @JsonProperty("ApplicantAadhaarNo")
    private String applicantAadhaarNo ;

    @JsonProperty("ApplicantRelation")
    private String applicantRelation ;

    @JsonProperty("ApplicantAddress")
    private String applicantAddress ;

    @JsonProperty("ApplicantMobileNo")
    private Long applicantMobileNo ;

    @JsonProperty("ApplicantEmail")
    private String applicantEmail ;
}
