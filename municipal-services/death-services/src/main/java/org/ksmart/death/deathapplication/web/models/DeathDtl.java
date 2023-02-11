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

// import io.swagger.v3.oas.annotations.media.Schema;

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
    private AuditDetails  deathAuditDetails;


//Jasmine 11.02.2023
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