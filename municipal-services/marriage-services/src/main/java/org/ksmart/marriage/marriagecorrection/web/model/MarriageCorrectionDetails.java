package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.springframework.validation.annotation.Validated;

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
    @JsonProperty("tenantid")
    private String tenantid;
    @Size(max = 64)
    @JsonProperty("applicationType")
    private String applicationtype;
    @Size(max = 64)
    @JsonProperty("businessService")
    private String businessservice;
    @Size(max = 64)
    @JsonProperty("workflowCode")
    private String workflowcode;
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


}
