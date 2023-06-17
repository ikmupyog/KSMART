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
public class BrideDetails {

    @Schema(type = "string", format = "uuid", description = "Bride Details Id")
    @Size(max = 64, message = "BRIDE DETAILS :Bride id length cannot exceed 64 characters")
    @JsonProperty("brideId")
    private String brideId;

    @NotNull
    @Size(max = 64)
    @NotBlank(message = "BRIDE DETAILS :BrideGroom field is required")
    @JsonProperty("brideGroom")
    private String brideGroom;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "BRIDE DETAILS :Tenant identification number is required")
    @Size(max = 64, message = "BRIDE DETAILS :Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_TENANT,
             message = "BRIDE DETAILS :Invalid tenant identification number format, eg: kl.cochin")
    @JsonProperty("tenentId")
    private String tenentId;

    @Size(max = 64)
    @JsonProperty("marriageid")
    private String marriageid;

    @NotNull
    @Size(max = 64)
    @NotBlank(message = "BRIDE DETAILS :Residentship is required")
    @JsonProperty("brideResidentShip")
    private String residentship;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "BRIDE DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "BRIDE DETAILS :Invalid aadhaar number")
    @JsonProperty("brideAadharNo")
    private String aadharno;

    @Schema(type = "string", description = "Passport number")
    @Size(min=8,max=8, message = "BRIDE DETAILS :Passport number  must be an 8 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_PASSPORT, message = "BRIDE DETAILS :Invalid Passport number")
    @JsonProperty("bridePassportNo")
    private String passportno;

    @Schema(type = "string", description = "Social Security Number")
    @Size(min=9,max=9, message = "BRIDE DETAILS :Social Security Number must be a 9 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_SSN, message = "BRIDE DETAILS :Invalid Social Security Number")
    @JsonProperty("brideSocialSecurityNo")
    private String socialsecurityno;

    @Schema(type = "string", description = "First name")
    @NotBlank(message = "BRIDE DETAILS :First name is required")
    @Size(max = 100, message = "BRIDE DETAILS :First name length cannot exceed 100 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid first name")
    @JsonProperty("brideFirstnameEn")
    private String firstnameEn;


    @Schema(type = "string", description = "First name")
    @NotBlank(message = "BRIDE DETAILS :First name in malayalam is required")
    @Size(max = 100)//, message = "First name length cannot exceed 100 characters")
   // @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid first name")
    @JsonProperty("brideFirstnameMl")
    private String firstnameMl;

  
    @Schema(type = "string", description = "Bride's Middle name ")
    @Size(max = 64, message = "BRIDE DETAILS :Middle name length cannot exceed 64 characters")
    @JsonProperty("brideMiddlenameEn")
    private String middlenameEn;

  
    @Schema(type = "string", description = "Bride's Middle name malayalam")
    @Size(max = 64)//, message =````````````````````````````````````````````````````````````````````````````````````````````````
    @JsonProperty("brideMiddlenameMl")
    private String middlenameMl;

    @Schema(type = "string", description = "Bride's last name ")
    @Size(max = 64, message = "BRIDE DETAILS :Last name length cannot exceed 64 characters")
    @JsonProperty("brideLastnameEn")
    private String lastnameEn;

    @Schema(type = "string", description = "Bride's Last name malayalam")
    @Size(max = 64)
    @JsonProperty("brideLastnameMl")
    private String lastnameMl;

    @Schema(type = "string", description = "Mobile number")
    @NotBlank(message = "BRIDE DETAILS :Mobile number is required")
    @Size(min = 10, max = 10, message = "BRIDE DETAILS :Invalid mobile number")
    @Pattern(regexp = MarriageConstants.PATTERN_MOBILE, message = "BRIDE DETAILS :Invalid mobile number")
    @JsonProperty("brideMobile")
    private Long mobile;

    @Schema(type = "string", description = "Email")
    @Size(min = 10, max = 10, message = "BRIDE DETAILS :Invalid Email Id")
    @Pattern(regexp = MarriageConstants.PATTERN_EMAIL, message = "BRIDE DETAILS :Invalid Email Id")
    @JsonProperty("brideEmailid")
    private String emailid;

    @Schema(type = "string", description = "Email")
    @NotBlank(message = "BRIDE DETAILS :Gender is required")
    @Size(max = 20, message = "BRIDE DETAILS :length cannot exceed 64 characters")
    @JsonProperty("brideGender")
    private String gender;

    @Schema(type = "integer",description = "Bride's Date of birth", format = "int64")
    @JsonProperty("brideDOB")
    private long dateofbirth;


    @Schema(type = "integer", description = "Age")
    @Size(min = 2, max = 3, message = "BRIDE DETAILS :Invalid age")
    @Pattern(regexp = MarriageConstants.PATTERN_AGE, message = "BRIDE DETAILS :Invalid Age")
    @JsonProperty("brideAge")
    private Integer age;

    @Schema(type = "string", description = "Parent or Guardian")
    @Size(max = 64, message = "BRIDE DETAILS:Parent/guardian flag cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  Parent or Guardian")
    @JsonProperty("brideParentGuardian")
    private String parentGuardian;

    @Schema(type = "string", description = "Name of Father")
    @Size(max = 200, message = "First name length of Bride's father cannot exceed 200 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  name")
    @JsonProperty("brideFathernameEn")
    private String fathernameEn;

    @Schema(type = "string", description = "Name of Father in malayalam")
    @Size(max = 200)
   // @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  name")
    @JsonProperty("brideFathernameMl")
    private String fathernameMl;


    @Schema(type = "string", description = "Name of Mother")
    @Size(max = 200, message = "BRIDE DETAILS: Length of Mother's name cannot exceed 200 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  name")
    @JsonProperty("brideMothernameEn")
    private String mothernameEn;

    @Schema(type = "string", description = "Name of Mother in malayalam")
    @Size(max = 200)
   // @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  name")
    @JsonProperty("brideMothernameMl")
    private String mothernameMl;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "BRIDE DETAILS:Aadhaar number of father must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "Invalid aadhaar number")
    @JsonProperty("brideFatherAadharNo")
    private String fatherAadharno;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "BRIDE DETAILS:Aadhaar number of  mother must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "Invalid aadhaar number")
    @JsonProperty("brideMotherAadharNo")
    private String motherAadharno;

    @Schema(type = "string", description = "Name of Guardian")
    @Size(max = 200, message = "BRIDE DETAILS:Name length of guardian  cannot exceed 200 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "BRIDE DETAILS:Invalid  name of guardian")
    @JsonProperty("brideGuardiannameEn")
    private String guardiannameEn;

    @Schema(type = "string", description = "Name of Guardian in malayalam")
    @Size(max = 200)
   // @Pattern(regexp = MarriageConstants.PATTERN_NAME, message = "Invalid  name")
    @JsonProperty("brideGuardiannameMl")
    private String guardiannameMl;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "BRIDE DETAILS:Aadhaar number of guardian must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "BRIDE DETAILS:Invalid aadhaar number of guardian")
    @JsonProperty("brideGuardianAadharNo")
    private String guardianAadharno;

    @Schema(type = "string", description = "Marital Status")
    @NotBlank(message = "BRIDE DETAILS:Marital Status is required")
    @Size(min = 64, message = "BRIDE DETAILS:Marital Status cannot exceed 64 characters")
    @JsonProperty("brideMaritalstatusID")
    private String maritalstatusid;

    @Schema(type = "boolean", description = "Is spouseliving")
    @JsonProperty("brideIsSpouseLiving")
    private Boolean brideIsSpouseLiving;

    @Schema(type = "integer", description = "No: of Spouse")
    @Size(max = 2,message = "BRIDE DETAILS :Invalid No: of Spouse")
    @Pattern(regexp = MarriageConstants.PATTERN_AGE, message = "BRIDE DETAILS :Invalid No: of Spouse")
    @JsonProperty("brideNoOfSpouse")
    private Integer brideNoOfSpouse;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
