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
import org.ksmart.death.crdeath.constraints.Html;
import java.util.List;
import javax.swing.text.Document;
import javax.validation.Valid;

import javax.validation.constraints.Size;
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

   //Rakhi S on 08.03.2023

   @Size(max = 64)
   @JsonProperty("applicationType")
   private String applicationType;

   @JsonProperty("applicationStatus")
   private String applicationStatus;

   @JsonProperty("businessService")
   private String businessService;

   @JsonProperty("action")
   private String action;

   @JsonProperty("assignee")
   private List<String> assignees;

   @JsonProperty("workflowcode")
   private String workflowcode;

   private String assignuser;

   @Size(max = 128)
   @Html
   private String comment;

   @Valid
   @JsonProperty("wfDocuments")
   private List<Document> wfDocuments;

   public void setStatus(String s) {
   }

}
