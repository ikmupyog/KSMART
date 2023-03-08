package org.ksmart.death.deathapplication.web.models;

import org.springframework.validation.annotation.Validated;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
     * Creates public class DeathAbandonedInformantDtls  Model
     * Rakhi S  on 03.03.2023
     * 
     */

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathAbandonedInformantDtls {
    
    @JsonProperty("InformantOfficeAuthority")
    private String informantOfficeAuthority ;

    @JsonProperty("InformantDesignation")
    private String informantDesignation ;

    @JsonProperty("InformantName")
    private String informantName ;

    @JsonProperty("InformantPENNo")
    private String informantPENNo ;
    
    @JsonProperty("InformantOfficeAddress")
    private String informantOfficeAddress ;

    @JsonProperty("InformantAadhaarNo")
    private String informantAadhaarNo ;

    @JsonProperty("InformantMobileNo")
    private String informantMobileNo;

    @JsonProperty("InformantAddress")
    private String informantAddress;
}
