package org.egov.filemgmnt.web.models.draftfile;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.AuditDetails;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class DraftFileAddress {

    @Schema(type = "string", description = "Drafting Reference id")
    @Size(max = 64, message = "Drafting reference id length cannot exceed 64 characters")
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

    @Schema(type = "string", description = "File code")
    @NotBlank(message = "File code is required")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "Draft file id")
    @Size(max = 64, message = "Draft file id length cannot exceed 64 characters")
    @JsonProperty("draftId")
    private String draftId;

    @Schema(type = "string", description = "Salutation")
    @Size(max = 64, message = "Salutation length cannot exceed 64 characters")
    @JsonProperty("salutation")
    private String salutation;

    @Schema(type = "string", description = "name of addressee")
    @NotBlank(message = "Name of addressee is required")
    @Size(max = 64, message = "Name of addressee length cannot exceed 64 characters")
    @JsonProperty("name")
    private String name;

    @Schema(type = "string", description = "Address")
    @Size(max = 64, message = "Address length cannot exceed 64 characters")
    @JsonProperty("address")
    private String address;

    @Schema(type = "string", description = "Status")
    @NotBlank(message = "Status is required")
    @Size(max = 64, message = "Status length cannot exceed 64 characters")
    @JsonProperty("status")
    private String status;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;
}
