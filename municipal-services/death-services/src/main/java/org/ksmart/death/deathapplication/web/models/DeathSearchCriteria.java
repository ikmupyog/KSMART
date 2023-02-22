package org.ksmart.death.deathapplication.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
     * Creates 
     * Jasmine
     * on  06/03/2023
     */
    
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathSearchCriteria {
    
    @JsonProperty("TenantId")
    private String tenantId;

    @JsonProperty("Id")
    private String id;

    @JsonProperty("DeceasedAadharNumber")
    private String deceasedAadharNumber;

    @JsonProperty("DateOfDeath")
    private Long DateOfDeath;


    @JsonProperty("registrationNo")
    private String registrationNo;

    // @JsonProperty("deathApplicationNo")
    // private String deathApplicationNo;

    @JsonProperty("DeathACKNo")
    private String deathACKNo;

    @JsonProperty("DeceasedFirstNameEn")
    private String deceasedFirstNameEn;

    @JsonProperty("DeathPlaceType")
    private String hospitalName;

    @JsonProperty("DeathPlaceWardId")
    private String deathPlaceWardId;

    @JsonProperty("DeathPlaceInstId")
    private String deathPlaceInstId;

    //Rakhi S on 22.02.2023
    @JsonProperty("fromDate")
    private Long fromDate;

    @JsonProperty("toDate")
    private Long toDate;
}
