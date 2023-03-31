package org.ksmart.death.deathapplication.web.models;
import java.util.List;

import javax.swing.text.Document;
import javax.validation.Valid;

import org.springframework.validation.annotation.Validated;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
/*
     * Creates DeathNACDtls model class  
     * Rakhi S  on 27.03.2023
*/

@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathNACDtls {
    
    @JsonProperty("InformationDeath")
    private DeathBasicInfo deathBasicInfo;

    @JsonProperty("AddressBirthDetails")
    private DeathAddressInfo deathAddressInfo;    
    
    @JsonProperty("DeathApplicantDtls")
    private DeathNACApplicantDtls deathApplicantDtls;  

    @JsonProperty("AuditDetails")
    private AuditDetails  deathAuditDetails;

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

    private String comment;

    @Valid
    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;
 
    public void setStatus(String s) {
    }

}
