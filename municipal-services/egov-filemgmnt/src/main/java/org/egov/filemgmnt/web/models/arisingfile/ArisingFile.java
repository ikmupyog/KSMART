package org.egov.filemgmnt.web.models.arisingfile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.web.models.ApplicantAddress;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Schema(description = "A Object holds the file data of arising file submitted by the user")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ArisingFile {

    @Schema(type = "string", format = "uuid", description = "File id")
    @Size(max = 64, message = "File id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = "^kl\\.[a-z]+$", message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "File number")
    @Size(max = 64, message = "File number length cannot exceed 64 characters")
    @JsonProperty("fileNumber")
    private String fileNumber;

    @Schema(type = "string", description = "File code")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

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

    @Schema(type = "string", description = "Calendar year")
//  @NotNull(message = "Calendar year is required")
//    @Size(min = 4, max = 4, message = "Invalid calendar year")
    @Size(max = 10)
//    @Pattern(regexp = "^[1-9][0-9]{3}$", message = "Invalid Calendar year")
    @JsonProperty("Year")
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

    @Schema(type = "string", description = "File status")
    @Size(max = 64, message = "File status length cannot exceed 64 characters")
    @JsonProperty("fileStatus")
    private String fileStatus;

    @JsonProperty("serviceId")
    private String serviceId;

    @Schema(type = "string", description = "File Subject")
    @JsonProperty("subject")
    private String subject;

    @Schema(type = "string", description = "Detailed description of Application")
    @JsonProperty("applicationDetails")
    private String applicationDetails;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @Valid
    @NotNull(message = "Arising file Applicant detail is required")
    @JsonProperty("arisingFileApplicant")
    private ArisingFileApplicant arisingFileApplicant;

}
