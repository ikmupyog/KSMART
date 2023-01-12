package org.egov.filemgmnt.web.models;

import javax.validation.Valid;
import javax.validation.constraints.Email;
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
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "First name")
    @Size(max = 64)
    @NotNull
    @JsonProperty("firstName")
    private String firstName;

    @Schema(type = "string", description = "First name malayalam")
    @Size(max = 64)
    @NotNull
    @JsonProperty("firstNameMal")
    private String firstNameMal;

    @Schema(type = "string", description = "Last name")
    @Size(max = 64)
    @JsonProperty("lastName")
    private String lastName;

    @Schema(type = "string", description = "Last name malayalam")
    @Size(max = 64)
    @JsonProperty("lastNameMal")
    private String lastNameMal;

    @Schema(type = "integer", format = "int64", description = "Date of birth")
    // @NotNull
    @JsonProperty("dateOfBirth")
    private Long dateOfBirth;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(max = 12)
    @NotNull
    @Pattern(regexp = "^[1-9][0-9]{11}$")
    @JsonProperty("aadhaarNo")
    private String aadhaarNo;

    @Schema(type = "string", description = "Mobile number")
    @Size(max = 15)
    @NotNull
    @Pattern(regexp = "^[1-9][0-9]{9,14}$")
    @JsonProperty("mobileNo")
    private String mobileNo;

    @Schema(type = "string", format = "email", description = "Email address")
    @Size(max = 64)
    @Email
    @JsonProperty("email")
    private String email;

    @Schema(type = "string", description = "Bank account number")
    @Size(max = 64)
    @JsonProperty("bankAccountNo")
    private String bankAccountNo;

    @Schema(type = "string", description = "Title")
    @Size(max = 64)
    @JsonProperty("title")
    private String title;

    @Schema(type = "string", description = "Tenant identification number")
    @Size(max = 64)
    @NotNull
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", description = "Father first name")
    @Size(max = 64)
    @JsonProperty("fatherFirstName")
    private String fatherFirstName;

    @Schema(type = "string", description = "Father first name malayalam")
    @Size(max = 64)
    @JsonProperty("fatherFirstNameMal")
    private String fatherFirstNameMal;

    @Schema(type = "string", description = "Father last name")
    @Size(max = 64)
    @JsonProperty("fatherLastName")
    private String fatherLastName;

    @Schema(type = "string", description = "Father last name malayalam")
    @Size(max = 64)
    @JsonProperty("fatherLastNameMal")
    private String fatherLastNameMal;

    @Schema(type = "string", description = "Mother first name")
    @Size(max = 64)
    @JsonProperty("motherFirstName")
    private String motherFirstName;

    @Schema(type = "string", description = "Mother first name malayalam")
    @Size(max = 64)
    @JsonProperty("motherFirstNameMal")
    private String motherFirstNameMal;

    @Schema(type = "string", description = "Mother last name")
    @Size(max = 64)
    @JsonProperty("motherLastName")
    private String motherLastName;

    @Schema(type = "string", description = "Mother last name malayalam")
    @Size(max = 64)
    @JsonProperty("motherLastNameMal")
    private String motherLastNameMal;

    @Schema(type = "string", description = "Applicant category")
    @Size(max = 64)
    @JsonProperty("applicantCategory")
    private String applicantCategory;

    @Valid
    // @NotNull
    @JsonProperty("address")
    private ApplicantAddress address;

    @Valid
    // @NotNull
    @JsonProperty("document")
    private ApplicantDocument document;

    // TODO:: remove START
    @Valid
    @NotNull
    @JsonProperty("applicantAddress")
    private ApplicantAddress applicantAddress;

    @Valid
    @NotNull
    @JsonProperty("applicantDocuments")
    private ApplicantDocument applicantDocuments;

    @Valid
    @NotNull
    @JsonProperty("serviceDetails")
    private ApplicantServiceDetail serviceDetails;

    @Valid
    @NotNull
    @JsonProperty("applicantServiceDocuments")
    private ApplicantServiceDocument applicantServiceDocuments;

    @Valid
    @NotNull
    @JsonProperty("fileDetail")
    private FileDetail fileDetail;

    @Valid
    @NotNull
    @JsonProperty("applicantChild")
    private ApplicantChild applicantChild;
    // TODO:: remove END

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
