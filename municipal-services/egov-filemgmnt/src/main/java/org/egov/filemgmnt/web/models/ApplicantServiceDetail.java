package org.egov.filemgmnt.web.models;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.constraints.Html;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(name = "ApplicantServiceDetail", description = "A Object holds the data for a Service Details")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantServiceDetail {

    @Schema(type = "string", format = "uuid", description = "Service details id")
    @Size(max = 64, message = "Service details id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Applicant id")
    @Size(max = 64, message = "Applicant personal id length cannot exceed 64 characters")
    @JsonProperty("applicantPersonalId")
    private String applicantPersonalId;

    @Schema(type = "string", description = "Service id")
    @Size(max = 64, message = "Service id length cannot exceed 64 characters")
    @JsonProperty("serviceId")
    private String serviceId;

    @Schema(type = "string", description = "Service code")
    @NotBlank(message = "Service code is required")
    @Size(max = 64, message = "Service code length cannot exceed 64 characters")
    @JsonProperty("serviceCode")
    private String serviceCode;

    @Schema(type = "string", description = "Service sub type")
    @NotBlank(message = "Service sub type is required")
    @Size(max = 64, message = "Service sub type length cannot exceed 64 characters")
    @JsonProperty("serviceSubType")
    private String serviceSubType;

    @Schema(type = "string", description = "Service minor type")
    @NotBlank(message = "Service minor type is required")
    @Size(max = 64, message = "Service minor type length cannot exceed 64 characters")
    @JsonProperty("serviceMinorType")
    private String serviceMinorType;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    // File detail fields >> START
    @Schema(type = "string", description = "Business service")
    @NotBlank(message = "Business service is required")
    @Size(max = 64, message = "Business service length cannot exceed 64 characters")
    @JsonProperty("businessService")
    private String businessService;

    @Schema(type = "string", description = "Workflow code")
    @NotBlank(message = "Workflow code is required")
    @Size(max = 64, message = "Workflow code length cannot exceed 64 characters")
    @JsonProperty("workflowCode")
    private String workflowCode;

    @Schema(type = "string", description = "Workflow action")
    @NotBlank(message = "Workflow action is required")
    @Size(max = 64, message = "Workflow action length cannot exceed 64 characters")
    @JsonProperty("action")
    private String action;

    @Schema(type = "string", description = "Comments")
//    @NotBlank(message = "Comment is required")
    @Size(max = 128, message = "Comment length cannot exceed 128 characters")
    @Html(message = "Comments may have unsafe html content")
    @JsonProperty("comments")
    private String comment;

    @ArraySchema(minItems = 1, schema = @Schema(type = "string"))
    @NotEmpty(message = "Atleast one assignee is required")
    @JsonProperty("assignees")
    private List<String> assignees;
    // File detail fields >> END

    @Valid
    @NotNull(message = "Applicant personal is required")
    @JsonProperty("applicant")
    private ApplicantPersonal applicant;

    @Valid
    @NotNull(message = "Applicant service document is required")
    @JsonProperty("serviceDocument")
    private ApplicantServiceDocument serviceDocument;

    @Valid
    @NotNull(message = "File detail is required")
    @JsonProperty("fileDetail")
    private ApplicantFileDetail fileDetail;

    @Valid
    @JsonProperty("applicantDetails")
    private ApplicantChild applicantChild;

}
