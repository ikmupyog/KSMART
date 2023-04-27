package org.egov.filemgmnt.web.models.GlobalMaster;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.web.models.AuditDetails;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Module Master Details")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ModuleDetails {

    @Schema(type = "string", format = "uuid", description = "Module id")
    @Size(max = 64, message = "Module id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 15, message = "Tenant identification number length cannot exceed 15 characters")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Module code")
    @Size(max = 20, message = "Module code length cannot exceed 20 characters")
    @JsonProperty("moduleCode")
    private String moduleCode;

    @Schema(type = "string", description = "Module name english")
    @Size(max = 64, message = "Module name english length cannot exceed 64 characters")
    @JsonProperty("moduleNameEnglish")
    private String moduleNameEnglish;

    @Schema(type = "string", description = "Module name malayalam")
    @Size(max = 64, message = "Module name malayalam length cannot exceed 64 characters")
    @JsonProperty("moduleNameMalayalam")
    private String moduleNameMalayalam;

    @Schema(type = "string", description = "status")
    @Size(max = 10, message = "status length cannot exceed 10 characters")
    @JsonProperty("status")
    private String status;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
