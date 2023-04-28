package org.egov.filemgmnt.web.models.draftfile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

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

@Schema(description = "A Object holds the file data of draft file  submitted by the user")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DraftFile {

    @Schema(type = "string", description = "Draft file id")
    @Size(max = 64, message = "Draft file id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string",
            pattern = FMConstants.PATTERN_TENANT,
            description = "Tenant identification number",
            example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = FMConstants.PATTERN_TENANT,
             message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Business service")
    @NotBlank(message = "Business service is required")
    @Size(max = 64, message = "Business length cannot exceed 64 characters")
    @JsonProperty("businessService")
    private String businessService;

    @Schema(type = "string", description = "Module name")
    @NotBlank(message = "Module name is required")
    @Size(max = 64, message = "Module name length cannot exceed 64 characters")
    @JsonProperty("moduleName")
    private String moduleName;

    @Schema(type = "string", description = "File code")
    @NotBlank(message = "File code is required")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "Draft type")
    @NotBlank(message = "Draft type is required")
    @Size(max = 64, message = "Draft type length cannot exceed 64 characters")
    @JsonProperty("draftType")
    private String draftType;

    @Schema(type = "string", description = "Draft content")
    @NotBlank(message = "Draft content is required")
    @Size(max = 1024, message = "Draft content length cannot exceed 1024 characters")
    @JsonProperty("draftText")
    private String draftText;

    @Schema(type = "string", description = "Assigner")
    @NotBlank(message = "Assigner is required")
    @Size(max = 64, message = "Assigner length cannot exceed 64 characters")
    @JsonProperty("assigner")
    private String assigner;

    @Schema(type = "string", description = "File store id")
    @Size(max = 64, message = "File store id length cannot exceed 64 characters")
    @JsonProperty("fileStoreId")
    private String fileStoreId;

    @Schema(type = "string", description = "Status")
    @NotBlank(message = "Status is required")
    @Size(max = 64, message = "Status length cannot exceed 64 characters")
    @JsonProperty("status")
    private String status;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}