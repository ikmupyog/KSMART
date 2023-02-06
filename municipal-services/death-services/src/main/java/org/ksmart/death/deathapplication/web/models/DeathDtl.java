package org.ksmart.death.deathapplication.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;

/*
     * Creates main model class  
     * Jasmine on 4.02.2023      
*/

@Schema(name = "Death Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathDtl {


     @JsonProperty("InformationDeath")
     private DeathBasicInfo deathBasicInfo;

    @JsonProperty("addressOfDeceased")
    private DeathAddressInfo deathAddressInfo;    

    @JsonProperty("familyInformationDeath")
    private DeathFamilyInfo deathFamilyInfo;

    @JsonProperty("statisticalInfo")
    private DeathStatisticalInfo  deathStatisticalInfo;

    @JsonProperty("informantDetails")
    private DeathInformantDtls deathInformantDtls;

    @JsonProperty("auditDetails")
    private AuditDetails  auditDetails;

    @JsonProperty("workflowDetails")
    private DeathWorkFlowDtls  deathWorkFlowDtls;


}