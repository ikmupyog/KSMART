package org.egov.filemgmnt.web.models.masterdata;

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

@Schema(description = "Major function master data details")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MajorFunctionDetails {

    @Schema(type = "string", format = "uuid", description = "Major function id")
    @Size(max = 64, message = "Major function id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 15, message = "Tenant identification number length cannot exceed 15 characters")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Major function code")
    @NotBlank(message = "Major function code is required")
    @Size(max = 20, message = "Major function code length cannot exceed 20 characters")
    @Pattern(regexp = FMConstants.PATTERN_MODULE_CODE, message = "Invalid major function code")
    @JsonProperty("majorFunctionCode")
    private String majorFunctionCode;

    @Schema(type = "string", format = "uuid", description = "Module id")
    @NotBlank(message = "Module id is required")
    @Size(max = 64, message = "Module id length cannot exceed 64 characters")
    @JsonProperty("moduleId")
    private String moduleId;

    @Schema(type = "string", description = "Major function name english")
    @NotBlank(message = "Major function name in english is required")
    @Size(max = 64, message = "Major function name english length cannot exceed 64 characters")
    @JsonProperty("majorFunctionNameEnglish")
    private String majorFunctionNameEnglish;

    @Schema(type = "string", description = "Major function name malayalam")
    @NotBlank(message = "Major function name in malayalam is required")
    @Size(max = 64, message = "Major function name malayalam length cannot exceed 64 characters")
    @JsonProperty("majorFunctionNameMalayalam")
    private String majorFunctionNameMalayalam;

    @Schema(type = "string", description = "status")
    @Size(max = 10, message = "status length cannot exceed 10 characters")
    @JsonProperty("status")
    private String status;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}