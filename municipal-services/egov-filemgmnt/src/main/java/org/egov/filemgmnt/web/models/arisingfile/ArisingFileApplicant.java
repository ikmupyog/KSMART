package org.egov.filemgmnt.web.models.arisingfile;

import javax.validation.constraints.Email;
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

@Schema(description = "A Object holds the applicant details of the file arised by the operator")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArisingFileApplicant {

    @Schema(type = "string", format = "uuid", description = "Arising file applicant id")
    @Size(max = 64, message = "Arising file applicant id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = FMConstants.PATTERN_TENANT,
             message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", format = "uuid", description = "Arising file id")
    @Size(max = 64, message = "Arising file id length cannot exceed 64 characters")
    @JsonProperty("arisingFileId")
    private String arisingFileId;

    @Schema(type = "string", description = "File code")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "Applicant type")
    @NotBlank(message = "Applicant type is required")
    @Size(max = 64, message = "Applicant type length cannot exceed 64 characters")
    @JsonProperty("applicantType")
    private String applicantType;

    @Schema(type = "string", description = "First name")
//    @NotBlank(message = "First name is required")
    @Size(max = 64, message = "First name length cannot exceed 64 characters")
    @JsonProperty("firstName")
    private String firstName;

    @Schema(type = "string", description = "Middle name")
    @Size(max = 64, message = "Middle name length cannot exceed 64 characters")
    @JsonProperty("middleName")
    private String middleName;

    @Schema(type = "string", description = "Last name")
    @Size(max = 64, message = "Last name length cannot exceed 64 characters")
    @JsonProperty("lastName")
    private String lastName;

    @Schema(type = "string", description = "Mobile number")
    @NotBlank(message = "Mobile number is required")
    @Size(min = 10, max = 10, message = "Invalid mobile number")
    @Pattern(regexp = FMConstants.PATTERN_MOBILE, message = "Invalid mobile number")
    @JsonProperty("mobileNo")
    private String mobileNo;

    @Schema(type = "string", description = "Whatsapp number")
    @Size(min = 10, max = 10, message = "Invalid whatsapp number")
    @Pattern(regexp = FMConstants.PATTERN_MOBILE, message = "Invalid whatsapp number")
    @JsonProperty("whatsappNo")
    private String whatsappNo;

    @Schema(type = "string", format = "email", description = "Email address")
    @Email(message = "Invalid email address")
    @Size(max = 64, message = "Email length cannot exceed 64 characters")
    @JsonProperty("emailId")
    private String emailId;

    @Schema(type = "string", description = "Ward number")
    @Size(max = 64, message = "Ward number length cannot exceed 64 characters")
    @JsonProperty("wardNo")
    private String wardNo;

    @Schema(type = "string", description = "Door number")
    @Size(max = 64, message = "Door number length cannot exceed 64 characters")
    @JsonProperty("doorNo")
    private String doorNo;

    @Schema(type = "string", description = "Door sub number")
    @Size(max = 64, message = "Door sub number length cannot exceed 64 characters")
    @JsonProperty("doorSubNo")
    private String doorSubNo;

    @Schema(type = "string", description = "House name")
    @Size(max = 64, message = "House name length cannot exceed 64 characters")
    @JsonProperty("houseName")
    private String houseName;

    @Schema(type = "string", description = "Street name")
    @Size(max = 64, message = "Street name length cannot exceed 64 characters")
    @JsonProperty("streetName")
    private String streetName;

    @Schema(type = "string", description = "Local place")
    @Size(max = 64, message = "Local place length cannot exceed 64 characters")
    @JsonProperty("localPlace")
    private String localPlace;

    @Schema(type = "string", description = "Main place")
    @Size(max = 64, message = "Main place length cannot exceed 64 characters")
    @JsonProperty("mainPlace")
    private String mainPlace;

    @Schema(type = "string", description = "City name")
    @Size(max = 64, message = "City name length cannot exceed 64 characters")
    @JsonProperty("cityName")
    private String cityName;

    @Schema(type = "string", description = "Pincode")
    @Size(min = 6, max = 6, message = "Invalid pincode")
//    @Pattern(regexp = FMConstants.PATTERN_PINCODE, message = "Invalid pincode")
    @JsonProperty("pinCode")
    private String pinCode;

    @Schema(type = "string", description = "Document type id")
    @Size(max = 64, message = "Document type id length cannot exceed 64 characters")
    @JsonProperty("documentTypeId")
    private String documentTypeId;

    @Schema(type = "string", description = "Document number")
    @Size(max = 64, message = "Document number length cannot exceed 64 characters")
    @JsonProperty("documentNumber")
    private String documentNumber;

    @Schema(type = "string", description = "Document file store id")
    @Size(max = 64, message = "Document file store id length cannot exceed 64 characters")
    @JsonProperty("documentFileStoreId")
    private String documentFileStoreId;

    @Schema(type = "string", description = "Institution name")
    @Size(max = 64, message = "Institution name length cannot exceed 64 characters")
    @JsonProperty("institutionName")
    private String institutionName;

    @Schema(type = "string", description = "Officer name")
    @Size(max = 64, message = "Officer name length cannot exceed 64 characters")
    @JsonProperty("officerName")
    private String officerName;

    @Schema(type = "string", description = "Officer designation")
    @Size(max = 64, message = "Officer designation length cannot exceed 64 characters")
    @JsonProperty("designation")
    private String designation;

    @Schema(type = "string", description = "Name of Country")
    @Size(max = 64, message = "Country name length cannot exceed 64 characters")
    @JsonProperty("country")
    private String country;

    @Schema(type = "string", description = "Name of state")
    @Size(max = 64, message = "state name length cannot exceed 64 characters")
    @JsonProperty("state")
    private String state;

    @Schema(type = "string", description = "Name of District")
    @Size(max = 64, message = "District name length cannot exceed 64 characters")
    @JsonProperty("district")
    private String district;

    @Schema(type = "string", description = "Name of Postoffice")
    @Size(max = 64, message = "Postoffice name length cannot exceed 64 characters")
    @JsonProperty("postOffice")
    private String postOffice;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;
}
