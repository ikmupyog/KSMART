package org.ksmart.death.deathapplication.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.ksmart.death.deathapplication.web.models.Demand.Demand;
import org.springframework.validation.annotation.Validated;
import java.math.BigDecimal;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Size;

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

    @JsonProperty("AddressBirthDetails")
    private DeathAddressInfo deathAddressInfo;    

    @JsonProperty("FamilyInformationDeath")
    private DeathFamilyInfo deathFamilyInfo;

    @JsonProperty("StatisticalInfo")
    private DeathStatisticalInfo  deathStatisticalInfo;

    @JsonProperty("InformantDetails")
    private DeathInformantDtls deathInformantDtls;

    @JsonProperty("Initiator")
    private DeathInitiatorDtls deathInitiatorDtls;

    @JsonProperty("AuditDetails")
    private AuditDetails  deathAuditDetails;

    @JsonProperty("Demands")
    private List<Demand> demands;

    @JsonProperty("DeathNACDocuments")
    private List<DeathDocument> deathNACDocuments;


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
    // @Html
    private String comment;

    @Valid
    @JsonProperty("wfDocuments")
    private List<WorkFlowDocuments> wfDocuments;

    public void setStatus(String s) {
    }

    @JsonProperty("dateOfDeath1")
    private Long dateOfDeath1;

    @JsonProperty("timeOfDeath1")
    private Integer timeOfDeath1 ;

    @Size(max = 64)
    @JsonProperty("timeOfDeathUnit1")
    private String timeOfDeathUnit1 ;

}