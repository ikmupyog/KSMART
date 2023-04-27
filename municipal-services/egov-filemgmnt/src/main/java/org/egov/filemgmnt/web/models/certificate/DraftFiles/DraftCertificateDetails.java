package org.egov.filemgmnt.web.models.certificate.DraftFiles;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.enums.CertificateStatus;
import org.egov.filemgmnt.web.models.AuditDetails;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DraftCertificateDetails {

    @Schema(type = "string", format = "uuid", description = "Certificate id") // NOPMD
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = FMConstants.PATTERN_TENANT,
             message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "File Code", example = "KL-KOCHI-C-000015- FMARISING-2023-AR")
    @NotBlank(message = "File Code is required")
    @Size(max = 64, message = "File Code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "Certificate number")
    @Size(max = 64, message = "Certificate number length cannot exceed 64 characters")
    @JsonProperty("certificateNo")
    private String certificateNo;

    @Schema(type = "string",
            allowableValues = { "ACTIVE", "CANCELLED", "FREE_DOWNLOAD", "PAID_DOWNLOAD", "PAID_PDF_GENERATED", "PAID" },
            description = "Status of certificate")
    @JsonProperty("certificateStatus")
    private CertificateStatus certificateStatus;

    @Schema(type = "string", format = "uuid", description = "File store id")
    @Size(max = 64)
    @JsonProperty("filestoreId")
    private String filestoreId;

    @Schema(type = "integer", format = "int64", description = "Certificate issuing date")
    @JsonProperty("dateofIssue")
    private Long dateofIssue;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
