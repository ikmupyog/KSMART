package org.egov.filemgmnt.web.models;

import java.util.List;

import javax.swing.text.Document;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.constraints.Html;

//import org.hibernate.validator.constraints.SafeHtml;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the fie data against application submited by efile user")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class FileDetail {

    @Schema(type = "string", format = "uuid", description = "File id")
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number")
    @Size(max = 64)
    @NotNull
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Applicant id")
    @Size(max = 64)
    @JsonProperty("applicantPersonalId")
    private String applicantPersonalId;

    @Schema(type = "string", description = "Foreign key service details")
    @Size(max = 64)
    @JsonProperty("serviceDetailsId")
    private String serviceDetailsId;

    @Schema(type = "string", description = "File number")
    @Size(max = 64)
    @NotNull
    @JsonProperty("fileNumber")
    private String fileNumber;

    @Schema(type = "string", description = "File code")
    @Size(max = 64)
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "File name")
    @Size(max = 64)
    @NotNull
    @JsonProperty("fileName")
    private String fileName;

    @Schema(type = "string", description = "File arising mode whether efile/frontoffice")
    @Size(max = 64)
    @NotNull
    @JsonProperty("fileArisingMode")
    private String fileArisingMode;

    @Schema(type = "integer", format = "int64", description = "File arising date")
    // @NotNull
    @JsonProperty("fileArisingDate")
    private Long fileArisingDate;

    @Schema(type = "string", description = "Financial year")
//    @Size(min = 4, max = 4, message = "Invalid financial year")
//    @Pattern(regexp = "^[1-9][0-9]{3}$", message = "Invalid financial year")
    @Size(max = 10)
    @NotNull(message = "Financial year is required")
    @JsonProperty("financialYear")
    private String financialYear;

    @Schema(type = "integer", format = "int64", description = "Application submitted date")
    // @NotNull
    @JsonProperty("applicationDate")
    private Long applicationDate;

    @Schema(type = "string", description = "Workflow code")
    @Size(max = 64)
    @NotNull
    @JsonProperty("workflowCode")
    private String workflowCode;

    @Schema(type = "string", description = "Workflow action")
    @Size(max = 64)
    @JsonProperty("action")
    private String action;

    @Schema(type = "string", description = "Status of file")
    @Size(max = 64)
    @JsonProperty("fileStatus")
    private String fileStatus;

    @Schema(type = "string", description = "Business service")
    @Size(max = 64)
    @JsonProperty("businessService")
    private String businessService;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("assignees")
    private List<String> assignees;

    @Schema(type = "string", description = "Comments")
    @Size(max = 128)
    @Html
    private String comment;

    @Valid
    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;

}
