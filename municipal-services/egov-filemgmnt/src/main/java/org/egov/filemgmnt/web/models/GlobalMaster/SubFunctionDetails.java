package org.egov.filemgmnt.web.models.GlobalMaster;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.springframework.validation.annotation.Validated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Schema(description = "Sub function Master Details")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubFunctionDetails {

    @Schema(type = "string", format = "uuid", description = "Sub function id")
    @Size(max = 64, message = "Sub function id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 15, message = "Tenant identification number length cannot exceed 15 characters")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Sub function code")
    @Size(max = 20, message = "Sub function code length cannot exceed 20 characters")
    @JsonProperty("subFunctionCode")
    private String subFunctionCode;

    @Schema(type = "string", format = "uuid", description = "Major function id")
    @Size(max = 64, message = "Major function id length cannot exceed 64 characters")
    @JsonProperty("majorFunctionId")
    private String majorFunctionId;

    @Schema(type = "string", description = "Sub function name english")
    @Size(max = 64, message = "Sub function name english length cannot exceed 64 characters")
    @JsonProperty("subFunctionNameEnglish")
    private String subFunctionNameEnglish;

    @Schema(type = "string", description = "Sub function name malayalam")
    @Size(max = 64, message = "Sub function name malayalam length cannot exceed 64 characters")
    @JsonProperty("subFunctionNameMalayalam")
    private String subFunctionNameMalayalam;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
