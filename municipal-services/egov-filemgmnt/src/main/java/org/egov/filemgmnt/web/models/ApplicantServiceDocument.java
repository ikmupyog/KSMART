package org.egov.filemgmnt.web.models;

import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(name = "ApplicantServiceDocument", description = "A Object holds the  data for a Service Document Details")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantServiceDocument {

    @Schema(type = "string", format = "uuid", description = "Applicant service document id")
    @Size(max = 64, message = "Applicant service document id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", format = "uuid", description = "Applicant id")
    @Size(max = 64, message = "Applicant personal id length cannot exceed 64 characters")
    @JsonProperty("applicantPersonalId")
    private String applicantPersonalId;

    @Schema(type = "string", description = "Service details id")
    @Size(max = 64, message = "Service details id length cannot exceed 64 characters")
    @JsonProperty("serviceDetailsId")
    private String serviceDetailsId;

    @Schema(type = "string", description = "Document type id")
    @Size(max = 64, message = "Document type id length cannot exceed 64 characters")
    @JsonProperty("documentTypeId")
    private String documentTypeId;

    @Schema(type = "string", description = "File store id")
    @Size(max = 64, message = "File store id length cannot exceed 64 characters")
    @JsonProperty("fileStoreId")
    private String fileStoreId;

    @Schema(type = "string", description = "Document active or not")
    @Size(max = 64, message = "Document active or not length cannot exceed 64 characters")
    @JsonProperty("active")
    private String active;

    @Schema(type = "string", description = "Document number")
    @Size(max = 64, message = "Document number length cannot exceed 64 characters")
    @JsonProperty("documentNumber")
    private String documentNumber;

    @Schema(type = "string", description = "Application details")
    @Size(max = 64, message = "Applicant details length cannot exceed 64 characters")
    @JsonProperty("applicationDetails")
    private String applicationdetails;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
