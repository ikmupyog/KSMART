package org.ksmart.death.deathregistry.web.models;

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
import java.util.List;
import javax.swing.text.Document;
/*
     * Creates main model class  
     * Jasmine on 7.02.2023      
*/

@Schema(name = "Death Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryDtl {


     @JsonProperty("InformationDeath")
     private DeathRegistryBasicInfo deathBasicInfo;

    @JsonProperty("addressOfDeceased")
    private DeathRegistryAddressInfo deathAddressInfo;    

    @JsonProperty("familyInformationDeath")
    private DeathRegistryFamilyInfo deathFamilyInfo;

    @JsonProperty("statisticalInfo")
    private DeathRegistryStatisticalInfo  deathStatisticalInfo;

    @JsonProperty("informantDetails")
    private DeathRegistryInformantDtls deathInformantDtls;

    @JsonProperty("auditDetails")
    private AuditDetails  deathAuditDetails;

    @JsonProperty("workflowDetails")
    private DeathWorkFlowDtls  deathWorkFlowDtls;

   // @Valid
//     @JsonProperty("wfDocuments")
//     private List<Document> wfDocuments;



}