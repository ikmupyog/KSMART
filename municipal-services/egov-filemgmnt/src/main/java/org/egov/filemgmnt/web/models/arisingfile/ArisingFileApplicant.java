package org.egov.filemgmnt.web.models.arisingfile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
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

@Schema(description = "A Object holds the applicant details of the file arised by the operator")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ArisingFileApplicant {

    @Schema(type = "string", format = "uuid", description = "Arising File applicant id")
    @Size(max = 64, message = " id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = "^kl\\.[a-z]+$", message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", format = "uuid", description = "Arising File id")
    @Size(max = 64, message = "File id length cannot exceed 64 characters")
    @JsonProperty("arisingFileId")
    private String arisingFileId;

    @Schema(type = "string", description = "File code")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "Applicant Type")
    @Size(max = 64)
    @JsonProperty("applicantType")
    private String applicantType;

    @Schema(type = "string", description = "First Name of applicant")
    @Size(max = 64)
    @JsonProperty("firstName")
    private String firstName;

    @Schema(type = "string", description = "Middle Name of applicant ")
    @Size(max = 64)
    @JsonProperty("middleName")
    private String middleName;

    @Schema(type = "string", description = "Last Name of applicant ")
    @Size(max = 64)
    @JsonProperty("lastName")
    private String lastName;

    @Schema(type = "string", description = "Mobile Number of applicant ")
    @Size(max = 64)
    @JsonProperty("mobileNo")
    private String mobileNo;

    @Schema(type = "string", description = "Whatsapp number of applicant ")
    @Size(max = 64)
    @JsonProperty("whatsappNo")
    private String whatsappNo;

    @Schema(type = "string", description = "EmailID of applicant ")
    @Size(max = 64)
    @JsonProperty("emailId")
    private String emailId;

    @Schema(type = "string", description = "Ward Number")
    @Size(max = 64, message = "Ward number length cannot exceed 64 characters")
    @JsonProperty("wardNo")
    private String wardNo;

    @Schema(type = "string", description = "Door Number")
    @Size(max = 64, message = "Door number length cannot exceed 64 characters")
    @JsonProperty("doorNo")
    private String doorNo;

    @Schema(type = "string", description = "Door Sub Number")
    @Size(max = 64, message = "Door Sub number length cannot exceed 64 characters")
    @JsonProperty("doorSubNo")
    private String doorSubNo;

    @Schema(type = "string", description = "Applicant Street Name")
    @Size(max = 64)
    @JsonProperty("streetName")
    private String streetName;

    @Schema(type = "string", description = "Applicant localplace ")
    @Size(max = 64)
    @JsonProperty("localPlace")
    private String localPlace;

    @Schema(type = "string", description = "Applicant mainplace ")
    @Size(max = 64)
    @JsonProperty("mainPlace")
    private String mainPlace;

    @Schema(type = "string", description = "Applicant City Name")
    @Size(max = 64)
    @JsonProperty("cityName")
    private String cityName;

    @Schema(type = "string", description = "Applicant Pincode")
    @Size(max = 64, message = "Pincode length cannot exceed 64 characters")
    @JsonProperty("pinCode")
    private String pinCode;

    @Schema(type = "string", description = "Document type ID from MDMS")
    @Size(max = 64)
    @JsonProperty("documentTypeId")
    private String documentTypeId;

    @Schema(type = "string", description = "Document Number")
    @Size(max = 64)
    @JsonProperty("documentNumber")
    private String documentNumber;

    @Schema(type = "string", description = "Stores the file store id of the document Uploaded by the assigner")
    @Size(max = 64)
    @JsonProperty("documentFileStoreId")
    private String documentFileStoreId;

    @Schema(type = "string", description = "Institution Name")
    @Size(max = 64)
    @JsonProperty("institutionName")
    private String institutionName;

    @Schema(type = "string", description = "Officer Name")
    @Size(max = 64)
    @JsonProperty("officerName")
    private String officerName;

    @Schema(type = "string", description = "Officer Designation")
    @Size(max = 64)
    @JsonProperty("designation")
    private String designation;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @Schema(type = "string", description = "Applicant house name")
    @Size(max = 64)
    @JsonProperty("houseName")
    private String houseName;

}
