package org.egov.filemgmnt.web.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the basic data for a Applicant Document")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ApplicantDocument {

    @Schema(type = "string", format = "uuid", description = "Applicant document id")
    @Size(max = 64, message = "Applicant document id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", format = "uuid", description = "Applicant id")
    @Size(max = 64, message = "Applicant personal id length cannot exceed 64 characters")
    @JsonProperty("applicantPersonalId")
    private String applicantPersonalId;

    @Schema(type = "string", description = "Document type id")
    @NotBlank(message = "Document type id is required")
    @Size(max = 64, message = "Document type id length cannot exceed 64 characters")
    @JsonProperty("documentTypeId")
    private String documentTypeId;

    @Schema(type = "string", description = "Document number")
    @Size(max = 64, message = "Document nuber length cannot exceed 64 characters")
    @JsonProperty("documentNumber")
    private String documentNumber;

    @Schema(type = "integer", format = "int64", description = "Document expiry date")
    // @PositiveOrZero(message = "Invalid document expiry date")
    @JsonProperty("docExpiryDate")
    private Long docExpiryDate;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
