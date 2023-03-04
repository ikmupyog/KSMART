package org.ksmart.death.deathapplication.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.validation.annotation.Validated;
// import org.ksmart.death.death.constraints.Html;
/**
     * Creates DeathAbandonedDtls Model 
     * Rakhi S  on 03.03.2023
     * 
     */
@Schema(name = "Death Registration Abandoned Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathAbandonedDtls {
    @JsonProperty("InformationDeathAbandoned")
    private DeathBasicInfo deathBasicInfo;

   @JsonProperty("AddressBirthDetails")
   private DeathAddressInfo deathAddressInfo;    

   @JsonProperty("FamilyInfoDeathAbandoned")
   private DeathFamilyInfo deathFamilyInfo;

   @JsonProperty("StatisticalInfoDeathAbandoned")
   private DeathStatisticalInfo  deathStatisticalInfo;

   @JsonProperty("InformantDetailsDeathAbandoned")
   private DeathAbandonedInformantDtls deathInformantDtls;
  
   @JsonProperty("AuditDetails")
   private AuditDetails  deathAuditDetails;

}
