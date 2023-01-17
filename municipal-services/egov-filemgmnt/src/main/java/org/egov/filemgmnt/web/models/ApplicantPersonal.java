package org.egov.filemgmnt.web.models;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Applicant details")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantPersonal {

    @Schema(type = "string", format = "uuid", description = "Applicant id") // NOPMD
    @Size(max = 64, message = "Applicant personal id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "First name")
    @NotBlank(message = "First name is required")
    @Size(max = 64, message = "First name length cannot exceed 64 characters")
    @JsonProperty("firstName")
    private String firstName;

    @Schema(type = "string", description = "First name in malayalam")
    @NotBlank(message = "First name in malayalam is required")
    @Size(max = 64, message = "First name in malayalam length cannot exceed 64 characters")
    @JsonProperty("firstNameMal")
    private String firstNameMal;

    @Schema(type = "string", description = "Last name")
    @Size(max = 64, message = "Last name length cannot exceed 64 characters")
    @JsonProperty("lastName")
    private String lastName;

    @Schema(type = "string", description = "Last name malayalam")
    @Size(max = 64, message = "Last name in malayalam length cannot exceed 64 characters")
    @JsonProperty("lastNameMal")
    private String lastNameMal;

    @Schema(type = "integer", format = "int64", description = "Date of birth")
    // @NotNull(message = "Date of birth is required")
    // @Positive(message = "Invalid date of birth")
    @JsonProperty("dateOfBirth")
    private Long dateOfBirth;

    @Schema(type = "string", description = "Aadhaar number")
    @NotBlank(message = "Aadhaar number is required")
    @Size(min = 12, max = 12, message = "Aadhaar number must be a 12 digit number")
    @Pattern(regexp = "^[1-9][0-9]{11}$", message = "Invalid aadhaar number")
    @JsonProperty("aadhaarNo")
    private String aadhaarNo;

    @Schema(type = "string", description = "Mobile number")
    @NotBlank(message = "Mobile number is required")
    @Size(min = 10, max = 15, message = "Invalid mobile number")
    @Pattern(regexp = "^[1-9][0-9]{9,14}$", message = "Invalid mobile number")
    @JsonProperty("mobileNo")
    private String mobileNo;

    @Schema(type = "string", format = "email", description = "Email address")
    @Email(message = "Invalid email address")
    @Size(max = 64, message = "Email length cannot exceed 64 characters")
    @JsonProperty("email")
    private String email;

    @Schema(type = "string", description = "Bank account number")
    @Size(max = 64, message = "Bank account number length cannot exceed 64 characters")
    @JsonProperty("bankAccountNo")
    private String bankAccountNo;

    @Schema(type = "string", description = "Title")
    @Size(max = 64, message = "Title cannot exceed 64 characters")
    @JsonProperty("title")
    private String title;

    @Schema(type = "string", description = "Tenant identification number")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Father first name")
    @Size(max = 64, message = "Father first name length cannot exceed 64 characters")
    @JsonProperty("fatherFirstName")
    private String fatherFirstName;

    @Schema(type = "string", description = "Father first name malayalam")
    @Size(max = 64, message = "Father first name in malayalam length cannot exceed 64 characters")
    @JsonProperty("fatherFirstNameMal")
    private String fatherFirstNameMal;

    @Schema(type = "string", description = "Father last name")
    @Size(max = 64, message = "Father last name length cannot exceed 64 characters")
    @JsonProperty("fatherLastName")
    private String fatherLastName;

    @Schema(type = "string", description = "Father last name malayalam")
    @Size(max = 64, message = "Father last name in malayalam length cannot exceed 64 characters")
    @JsonProperty("fatherLastNameMal")
    private String fatherLastNameMal;

    @Schema(type = "string", description = "Mother first name")
    @Size(max = 64, message = "Mother first name length cannot exceed 64 characters")
    @JsonProperty("motherFirstName")
    private String motherFirstName;

    @Schema(type = "string", description = "Mother first name malayalam")
    @Size(max = 64, message = "Mother first name in malayalam length cannot exceed 64 characters")
    @JsonProperty("motherFirstNameMal")
    private String motherFirstNameMal;

    @Schema(type = "string", description = "Mother last name")
    @Size(max = 64, message = "Mother last name length cannot exceed 64 characters")
    @JsonProperty("motherLastName")
    private String motherLastName;

    @Schema(type = "string", description = "Mother last name malayalam")
    @Size(max = 64, message = "Mother last name in malayalam length cannot exceed 64 characters")
    @JsonProperty("motherLastNameMal")
    private String motherLastNameMal;

    @Schema(type = "string", description = "Applicant category")
    @Size(max = 64, message = "Applicant category length cannot exceed 64 characters")
    @JsonProperty("applicantCategory")
    private String applicantCategory;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @Valid
    @NotNull
    @JsonProperty("address")
    private ApplicantAddress address;

    @Valid
    @NotNull
    @JsonProperty("document")
    private ApplicantDocument document;

}
