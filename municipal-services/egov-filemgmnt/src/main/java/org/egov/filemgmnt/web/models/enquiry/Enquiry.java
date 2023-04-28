package org.egov.filemgmnt.web.models.enquiry;

import javax.validation.constraints.NotBlank;
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

@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Enquiry {

    @Schema(type = "string", description = "Enquiry id")
    // @Size(max = 256)
    @JsonProperty("id")
    private String id;

    @Schema(type = "string",
            pattern = FMConstants.PATTERN_TENANT,
            description = "Tenant identification number",
            example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Business service")
    @NotBlank(message = "Business service is required")
    @Size(max = 256, message = "Business length cannot exceed 256 characters")
    @JsonProperty("businessService")
    private String businessService;

    @Schema(type = "string", description = "Module name")
    @NotBlank(message = "Module name is required")
    @Size(max = 256, message = "Module name length cannot exceed 256 characters")
    @JsonProperty("moduleName")
    private String moduleName;

    @Schema(type = "string", description = "File code")
    @NotBlank(message = "File code is required")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "Latitude")
    @Size(max = 64, message = "Latitude length cannot exceed 64 characters")
    @JsonProperty("latitude")
    private String latitude;

    @Schema(type = "string", description = "Longitude")
    @Size(max = 64, message = "Logitude length cannot exceed 64 characters")
    @JsonProperty("longitude")
    private String longitude;

    @Schema(type = "string", description = "Assigner")
    @Size(max = 64, message = "Assigner length cannot exceed 64 characters")
    @JsonProperty("assigner")
    private String assigner;

    @Schema(type = "string", description = "Status")
    @Size(max = 64, message = "Status length cannot exceed 64 characters")
    @JsonProperty("status")
    private String status;

    @Schema(type = "string", description = "Image file store id")
    @Size(max = 64, message = "Image file store id length cannot exceed 64 characters")
    @JsonProperty("imageFileStoreId")
    private String imageFileStoreId;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
