package org.ksmart.death.deathapplication.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
// import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
// import org.ksmart.death.crdeath.constraints.Html;
import java.util.List;
import javax.swing.text.Document;
import javax.validation.Valid;

import javax.validation.constraints.Size;

/*
     * Creates main model class  
     * Jasmine on 03.03.2023      
*/

//@Schema(name = "Death Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DeathCorrectionDtls {
    
    @JsonProperty("InformationDeathCorrection")
    private DeathCorrectionBasicInfo deathCorrectionBasicInfo;

   @JsonProperty("AddressBirthDetails")
   private DeathAddressInfo deathCorrAddressInfo;   
   
   @JsonProperty("CorrectionDocuments")
   @Valid
   private List<DeathDocument> CorrectionDocuments = null;

   @JsonProperty("AuditDetails")
   private AuditDetails  deathCorrAuditDetails;

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
//  @Html
   private String comment;

   @Valid
   @JsonProperty("wfDocuments")
   private List<Document> wfDocuments;

   public void setStatus(String s) {
   }
    
}
