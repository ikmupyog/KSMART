package org.egov.filemgmnt.web.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

//import org.hibernate.validator.constraints.SafeHtml;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the fie data against application submited by efile user")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantFileDetail {

    @Schema(type = "string", format = "uuid", description = "File id")
    @Size(max = 64, message = "File id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = "^kl\\.[a-z]+$", message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Applicant id")
    @Size(max = 64, message = "Applicant personal id length cannot exceed 64 characters")
    @JsonProperty("applicantPersonalId")
    private String applicantPersonalId;

    @Schema(type = "string", description = "Foreign key service details")
    @Size(max = 64, message = "Foreign key service details length cannot exceed 64 characters")
    @JsonProperty("serviceDetailsId")
    private String serviceDetailsId;

    @Schema(type = "string", description = "File number")
    @Size(max = 64, message = "File number length cannot exceed 64 characters")
    @JsonProperty("fileNumber")
    private String fileNumber;

    @Schema(type = "string", description = "File code")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "File name")
    @Size(max = 64, message = "File name length cannot exceed 64 characters")
    @JsonProperty("fileName")
    private String fileName;

    @Schema(type = "string", description = "File arising mode whether efile/frontoffice")
    @NotBlank(message = "File arising mode is required")
    @Size(max = 64, message = "File arising mode length cannot exceed 64 characters")
    @JsonProperty("fileArisingMode")
    private String fileArisingMode;

    @Schema(type = "integer", format = "int64", description = "File arising date")
    @NotNull(message = "File arising date is required")
    @Positive(message = "Invalid file arising date")
    @JsonProperty("fileArisingDate")
    private Long fileArisingDate;

    @Schema(type = "string", description = "Financial year")
//  @NotNull(message = "Financial year is required")
//    @Size(min = 4, max = 4, message = "Invalid financial year")
    @Size(max = 10)
//    @Pattern(regexp = "^[1-9][0-9]{3}$", message = "Invalid financial year")
    @JsonProperty("financialYear")
    private String financialYear;

    @Schema(type = "integer", format = "int64", description = "Application submitted date")
    @NotNull(message = "Application submitted date is required")
    @Positive(message = "Invalid application submitted date")
    @JsonProperty("applicationDate")
    private Long applicationDate;

    @Schema(type = "string", description = "Business service")
    // @NotBlank(message = "Business service is required")
    @Size(max = 64, message = "Business service length cannot exceed 64 characters")
    @JsonProperty("businessService")
    private String businessService;

    @Schema(type = "string", description = "Workflow code")
    // @NotBlank(message = "Workflow code is required")
    @Size(max = 64, message = "Workflow code length cannot exceed 64 characters")
    @JsonProperty("workflowCode")
    private String workflowCode;

    @Schema(type = "string", description = "Workflow action")
    // @NotBlank(message = "Workflow action is required")
    @Size(max = 64, message = "Workflow action length cannot exceed 64 characters")
    @JsonProperty("action")
    private String action;

    @Schema(type = "string", description = "Comments")
    // @NotBlank(message = "Comment is required")
    @Size(max = 128, message = "Comment length cannot exceed 128 characters")
    @JsonProperty("comments")
    private String comment;

    @Schema(type = "string", description = "File assignees")
    @JsonProperty("assignees")
    private String assignees;

    @Schema(type = "string", description = "File status")
    @Size(max = 64, message = "File status length cannot exceed 64 characters")
    @JsonProperty("fileStatus")
    private String fileStatus;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

//    @Valid
//    @JsonProperty("wfDocuments")
//    private List<Document> wfDocuments;

}
