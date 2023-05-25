package org.egov.filemgmnt.web.models.draftfile;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.AuditDetails;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class DraftFileReference {
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


    @Schema(type = "string", description = "Draft Reference")
    @Size(max = 64, message = "Draft reference length cannot exceed 64 characters")
    @JsonProperty("referenceText")
    private String referenceText;

    @Schema(type = "string", description = "Status")
    @NotBlank(message = "Status is required")
    @Size(max = 64, message = "Status length cannot exceed 64 characters")
    @JsonProperty("status")
    private String status;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
