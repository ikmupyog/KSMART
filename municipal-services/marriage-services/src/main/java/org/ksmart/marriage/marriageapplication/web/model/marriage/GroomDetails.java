package org.ksmart.marriage.marriageapplication.web.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.utils.MarriageConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroomDetails {

    @Schema(type = "string", format = "uuid", description = "Groom Details Id")
    @Size(max = 64, message = "GROOM DETAILS :Groom id length cannot exceed 64 characters")
    @JsonProperty("groomId")
    private String groomId;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "GROOM DETAILS :Tenant identification number is required")
    @Size(max = 64, message = "GROOM DETAILS :Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_TENANT,
             message = "GROOM DETAILS :Invalid tenant identification number format, eg: kl.cochin")
    @JsonProperty("tenentId")
    private String tenentId;

    @NotNull
    @Size(max = 64)
    @NotBlank(message = "GROOM DETAILS :BrideGroom field is required")
    @Size(max = 64)
    @JsonProperty("brideGroom")
    private String brideGroom;

    @Size(max = 64)
    @JsonProperty("marriageid")
    private String marriageid;

    @NotNull
    @Size(max = 64)
    @NotBlank(message = "GROOM DETAILS :Residentship is required")
    @Size(max = 64)
    @JsonProperty("groomResidentShip")
    private String residentship;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "GROOM DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "GROOM DETAILS :Invalid aadhaar number")
    @JsonProperty("groomAadharNo")
    private String aadharno;

    @Schema(type = "string", description = "Passport number")
    @Size(min=8,max=8, message = "GROOM DETAILS :Passport number  must be an 8 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_PASSPORT, message = "GROOM DETAILS :Invalid Passport number")
    @JsonProperty("groomPassportNo")
    private String passportno;

    @Schema(type = "string", description = "Social Security Number")
    @Size(min=9,max=9, message = "GROOM DETAILS :Social Security Number must be a 9 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_SSN, message = "GROOM DETAILS :Invalid Social Security Number")
    @JsonProperty("groomSocialSecurityNo")
    private String socialsecurityno;

    @Schema(type = "string", description = "Groom's First name")
    @NotBlank(message = "GROOM DETAILS :First name is required")
    @Size(max = 100, message = "GROOM DETAILS :First name length cannot exceed 100 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid first name")
    @JsonProperty("groomFirstnameEn")
    private String firstnameEn;

    @Schema(type = "string", description = "Groom's First name")
    @NotBlank(message = "GROOM DETAILS :First name in malayalam is required")
    @Size(max = 100)
    @JsonProperty("groomFirstnameMl")
    private String firstnameMl;

    @Schema(type = "string", description = "Groom's Middle name ")
    @Size(max = 64, message = "GROOM DETAILS :Middle name length cannot exceed 64 characters")
    @Size(max = 200)
    @JsonProperty("groomMiddlenameEn")
    private String middlenameEn;

    @Schema(type = "string", description = "Groom's Middle name malayalam")
    @Size(max = 100)
    @JsonProperty("groomMiddlenameMl")
    private String middlenameMl;

    @Schema(type = "string", description = "Groom's last name ")
    @Size(max = 64, message = "GROOM DETAILS :Last name length cannot exceed 64 characters")
    @JsonProperty("groomLastnameEn")
    private String lastnameEn;

    @Schema(type = "string", description = "Groom's Last name malayalam")
    @Size(max = 64)
    @JsonProperty("groomLastnameMl")
    private String lastnameMl;

    @Schema(type = "string", description = "Mobile number")
    @NotBlank(message = "GROOM DETAILS :Mobile number is required")
    @Size(min = 10, max = 10, message = "GROOM DETAILS :mobile number length cannot exceed 10 digit")
    @Pattern(regexp = MarriageConstants.PATTERN_MOBILE, message = "GROOM DETAILS :Invalid mobile number")
    @JsonProperty("groomMobile")
    private Long mobile;

    @Schema(type = "string", description = "Email")
    @Size(min = 10, max = 10, message = "GROOM DETAILS :Invalid Email Id")
    @Pattern(regexp = MarriageConstants.PATTERN_EMAIL, message = "GROOM DETAILS :Invalid Email Id")
    @JsonProperty("groomEmailid")
    private String emailid;

    @Schema(type = "string", description = "Email")
    @NotBlank(message = "GROOM DETAILS :Gender is required")
    @Size(max = 20, message = "GROOM DETAILS :length cannot exceed 64 characters")
    @JsonProperty("groomGender")
    private String gender;

    @Schema(type = "integer",description = "Groom's Date of birth", format = "int64")
    @JsonProperty("groomDOB")
    private long dateofbirth;

    @Schema(type = "integer", description = "Age")
    @Size(min = 2, max = 3, message = "GROOM DETAILS :Invalid age")
    @Pattern(regexp = MarriageConstants.PATTERN_AGE, message = "GROOM DETAILS :Invalid Age")
    @JsonProperty("groomAge")
    private Integer age;

    @Schema(type = "string", description = "Parent or Guardian")
    @Size(max = 64, message = "GROOM DETAILS:Parent/guardian flag cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  Parent or Guardian")
    @JsonProperty("groomParentGuardian")
    private String parentGuardian;

    @Schema(type = "string", description = "Name of Father")
    @Size(max = 200, message = "First name length of Groom's father cannot exceed 200 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  name")
    @JsonProperty("groomFathernameEn")
    private String fathernameEn;

    @Schema(type = "string", description = "Name of Father in malayalam")
    @Size(max = 200)
    @JsonProperty("groomFathernameMl")
    private String fathernameMl;

    @Schema(type = "string", description = "Name of Mother")
    @Size(max = 200, message = "GROOM DETAILS: Length of Mother's name cannot exceed 200 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  name")
    @JsonProperty("groomMothernameEn")
    private String mothernameEn;

    @Schema(type = "string", description = "Name of Mother in malayalam")
    @Size(max = 200)
    @JsonProperty("groomMothernameMl")
    private String mothernameMl;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "GROOM DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "GROOM DETAILS :Invalid aadhaar number")
    @JsonProperty("groomFatherAadharNo")
    private String fatherAadharno;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "GROOM DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "GROOM DETAILS :Invalid aadhaar number")
    @JsonProperty("groomMotherAadharNo")
    private String motherAadharno;

    @Schema(type = "string", description = "Name of Guardian")
    @Size(max = 200, message = "GROOM DETAILS:Name length of guardian  cannot exceed 200 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "GROOM DETAILS:Invalid  name of guardian")
    @JsonProperty("groomGuardiannameEn")
    private String guardiannameEn;

    @Schema(type = "string", description = "Name of Guardian in malayalam")
    @Size(max = 200)
    @JsonProperty("groomGuardiannameMl")
    private String guardiannameMl;
    @Size(max = 15)

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "GROOM DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "GROOM DETAILS :Invalid aadhaar number")
    @JsonProperty("groomGuardianAadharNo")
    private String guardianAadharno;

    @Schema(type = "string", description = "Marital Status")
    @NotBlank(message = "GROOM DETAILS:Marital Status is required")
    @Size(min = 64, message = "GROOM DETAILS:Marital Status cannot exceed 64 characters")
    @JsonProperty("groomMaritalstatusID")
    private String maritalstatusid;

    @Schema(type = "boolean", description = "Is spouseliving")
    @JsonProperty("groomIsSpouseLiving")
    private Boolean groomIsSpouseLiving;

    @Schema(type = "integer", description = "No: of Spouse")
    @Size(max = 2,message = "GROOM DETAILS :Invalid No: of Spouse")
    @Pattern(regexp = MarriageConstants.PATTERN_AGE, message = "GROOM DETAILS :Invalid No: of Spouse")
    @JsonProperty("groomNoOfSpouse")
    private Integer groomNoOfSpouse;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;


}