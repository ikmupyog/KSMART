package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.web.model.Demand.Demand;
import org.springframework.validation.annotation.Validated;

import javax.swing.text.Document;
import javax.validation.constraints.Size;
import java.util.List;

@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageCorrectionDetails {

    @Size(max = 64)
    @JsonProperty("id")
    private String id;
    @Size(max = 64)
    @JsonProperty("marriageId")
    private String marriageId;
    @Size(max = 64)
    @JsonProperty("tenantid")
    private String tenantid;
    @Size(max = 64)
    @JsonProperty("applicationType")
    private String applicationtype;
    @JsonProperty("moduleCode")
    private String moduleCode;
    @Size(max = 64)
    @JsonProperty("applicationNumber")
    private String applicationNo;

    @JsonProperty("applicationDate")
    private Long applicationDate;
    @Size(max = 64)
    @JsonProperty("businessService")
    private String businessservice;
    @Size(max = 64)
    @JsonProperty("workflowCode")
    private String workflowcode;
    @Size(max = 64)
    @JsonProperty("registerId")
    private String registerId;
    @Size(max = 64)
    @JsonProperty("registrationno")
    private String registrationno;
    
    @JsonProperty("registration_date")
    private Long registrationDate;
    @Size(max = 64)
    @JsonProperty("action")
    private String action;
    @Size(max = 64)
    @JsonProperty("applicationStatus")
    private String status;

    @JsonProperty("CorrectionField")
    private List<CorrectionField> correctionField;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("assignee")
    private List<String> assignees;

   @Size(max = 128)
   private String comment;

    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;

    @JsonProperty("isWorkflow")
    private Boolean isWorkflow;


    @JsonProperty("Demands")
    private List<Demand> demands;


}
