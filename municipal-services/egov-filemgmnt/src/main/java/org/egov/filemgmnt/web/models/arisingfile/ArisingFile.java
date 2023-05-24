package org.egov.filemgmnt.web.models.arisingfile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.constraints.Html;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the file data of arising file submitted by the user")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArisingFile {

    @Schema(type = "string", format = "uuid", description = "File id")
    @Size(max = 64, message = "Arising file id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = FMConstants.PATTERN_TENANT,
             message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

//    @Schema(type = "string", description = "File number")
//    @Size(max = 64, message = "File number length cannot exceed 64 characters")
//    @JsonProperty("fileNumber")
//    private String fileNumber;

    @Schema(type = "string", description = "File code")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "File arising mode, efile or frontoffice")
    @NotBlank(message = "File arising mode is required")
    @Size(max = 64, message = "File arising mode length cannot exceed 64 characters")
    @JsonProperty("fileArisingMode")
    private String fileArisingMode;

    @Schema(type = "integer", format = "int64", description = "File arising date")
    @NotNull(message = "File arising date is required")
    @Positive(message = "Invalid file arising date")
    @JsonProperty("fileArisingDate")
    private Long fileArisingDate;

    @Schema(type = "string", description = "Calendar year")
//  @NotNull(message = "Calendar year is required")
//    @Size(min = 4, max = 4, message = "Invalid calendar year")
    @Size(max = 10)
    // @Pattern(regexp = FMConstants.PATTERN_YEAR, message = "Invalid Calendar
    // year")
    @JsonProperty("year")
    private String year;

    @Schema(type = "string", description = "Workflow code")
    // @NotBlank(message = "Workflow code is required")
    @Size(max = 64, message = "Workflow code length cannot exceed 64 characters")
    @JsonProperty("workflowCode")
    private String workflowCode;

    @Schema(type = "string", description = "Business service")
    // @NotBlank(message = "Business service is required")
    @Size(max = 64, message = "Business service length cannot exceed 64 characters")
    @JsonProperty("businessService")
    private String businessService;

    @Schema(type = "string", description = "Assignee")
    // @NotBlank(message = "Assignee is required")
    @Size(max = 64, message = "Assignee length cannot exceed 64 characters")
    @JsonProperty("assignee")
    private String assignee;

    @Schema(type = "string", description = "Action")
    // @NotBlank(message = "Action is required")
    @Size(max = 64, message = "Action length cannot exceed 64 characters")
    @JsonProperty("action")
    private String action;

    @Schema(type = "string", description = "Comments")
//  @NotBlank(message = "Comment is required")
    @Size(max = 128, message = "Comment length cannot exceed 128 characters")
    @Html(message = "Comments may have unsafe html content")
    @JsonProperty("comments")
    private String comments;

    @Schema(type = "string", description = "File status")
    @Size(max = 64, message = "File status length cannot exceed 64 characters")
    @JsonProperty("fileStatus")
    private String fileStatus;

    @Schema(type = "string", description = "Service id")
    @NotBlank(message = "Service id is required")
    @Size(max = 64, message = "Service id length cannot exceed 64 characters")
    @JsonProperty("serviceId")
    private String serviceId;

    @Schema(type = "string", description = "File title")
    @NotBlank(message = "File title is required")
    @Size(max = 64, message = "File title length cannot exceed 64 characters")
    @JsonProperty("title")
    private String title;

    @Schema(type = "string", description = "File description")
    @Size(max = 64, message = "File description length cannot exceed 64 characters")
    @JsonProperty("description")
    private String description;

    @Schema(type = "string", description = "PEN Number")
    @Size(max = 64, message = "Pen Number  length cannot exceed 64 characters")
    @JsonProperty("penNumber")
    private String penNumber;

    @Schema(type = "string", description = "Employee Name ")
    @Size(max = 64, message = "Employee Name length cannot exceed 64 characters")
    @JsonProperty("employeeName")
    private String employeeName;

    @Schema(type = "string", description = "Employee Designation ")
    @Size(max = 64, message = "Employee Designation length cannot exceed 64 characters")
    @JsonProperty("employeeDesignation")
    private String employeeDesignation;

    @JsonProperty("fileType")
    private String fileType;

    @JsonProperty("fileCloseDate")
    private Long fileCloseDate;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @Valid
    @NotNull(message = "Arising file applicant detail is required")
    @JsonProperty("arisingFileApplicant")
    private ArisingFileApplicant arisingFileApplicant;



}
