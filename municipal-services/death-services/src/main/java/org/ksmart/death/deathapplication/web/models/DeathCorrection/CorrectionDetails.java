package org.ksmart.death.deathapplication.web.models.DeathCorrection;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.ksmart.death.deathapplication.web.models.DeathAddressInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathDocument;
import org.ksmart.death.deathapplication.web.models.Demand.Demand;
import org.springframework.validation.annotation.Validated;

import javax.swing.text.Document;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.List;

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

public class CorrectionDetails {
    
    @JsonProperty("InformationDeathCorrection")
    private DeathCorrectionBasicInfo deathCorrectionBasicInfo;

   @JsonProperty("AddressBirthDetails")
   private DeathAddressInfo deathCorrAddressInfo;
   
   @JsonProperty("CorrectionDocuments")
   @Valid
   private List<DeathDocument> CorrectionDocuments = null;

   @JsonProperty("AuditDetails")
   private AuditDetails deathCorrAuditDetails;

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



   @JsonProperty("Demands")
   private List<Demand> demands;

   @Size(max = 128)
//  @Html
   private String comment;
   @Size(max = 64)
   @JsonProperty("registrationNo")
   private String registrationNo;
   @Valid
   @JsonProperty("wfDocuments")
   private List<Document> wfDocuments;

   @JsonProperty("CorrectionField")
   private List<CorrectionField> correctionField;
   public void setStatus(String s) {
   }
    
}
