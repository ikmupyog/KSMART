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

    @Schema(type = "string", format = "uuid", description = "Bride Details Id")
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
    @JsonProperty("brideGroom")
    private String brideGroom;

    @Size(max = 64)
    @JsonProperty("marriageid")
    private String marriageid;

    @Size(max = 64)
    @JsonProperty("groomResidentShip")
    private String residentship;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "BRIDE DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "BRIDE DETAILS :Invalid aadhaar number")
    @JsonProperty("groomAadharNo")
    private String aadharno;

    @Size(max = 1000)
    @JsonProperty("groomPassportNo")
    private String passportno;

    @Size(max = 64)
    @JsonProperty("groomSocialSecurityNo")
    private String socialsecurityno;

    @Size(max = 200)
    @JsonProperty("groomFirstnameEn")
    private String firstnameEn;

    @Size(max = 200)
    @JsonProperty("groomFirstnameMl")
    private String firstnameMl;

    @Size(max = 200)
    @JsonProperty("groomMiddlenameEn")
    private String middlenameEn;

    @Size(max = 200)
    @JsonProperty("groomMiddlenameMl")
    private String middlenameMl;

    @Size(max = 200)
    @JsonProperty("groomLastnameEn")
    private String lastnameEn;

    @Size(max = 200)
    @JsonProperty("groomLastnameMl")
    private String lastnameMl;

    
    @JsonProperty("groomMobile")
    private Long mobile;

    @Size(max = 300)
    @JsonProperty("groomEmailid")
    private String emailid;

    @Size(max = 20)
    @JsonProperty("groomGender")
    private String gender;

    @JsonProperty("groomDOB")
    private long dateofbirth;

    @JsonProperty("groomAge")
    private Integer age;

    @Size(max = 64)
    @JsonProperty("groomParentGuardian")
    private String parentGuardian;

    @Size(max = 200)
    @JsonProperty("groomFathernameEn")
    private String fathernameEn;

    @Size(max = 200)
    @JsonProperty("groomFathernameMl")
    private String fathernameMl;

    @Size(max = 200)
    @JsonProperty("groomMothernameEn")
    private String mothernameEn;
    
    @Size(max = 200)
    @JsonProperty("groomMothernameMl")
    private String mothernameMl;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "BRIDE DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "BRIDE DETAILS :Invalid aadhaar number")
    @JsonProperty("groomFatherAadharNo")
    private String fatherAadharno;

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "BRIDE DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "BRIDE DETAILS :Invalid aadhaar number")
    @JsonProperty("groomMotherAadharNo")
    private String motherAadharno;

    @Size(max = 200)
    @JsonProperty("groomGuardiannameEn")
    private String guardiannameEn;
    
    @Size(max = 200)
    @JsonProperty("groomGuardiannameMl")
    private String guardiannameMl;
    @Size(max = 15)

    @Schema(type = "string", description = "Aadhaar number")
    @Size(min = 12, max = 12, message = "BRIDE DETAILS :Aadhaar number must be a 12 digit number")
    @Pattern(regexp = MarriageConstants.PATTERN_AADHAAR, message = "BRIDE DETAILS :Invalid aadhaar number")
    @JsonProperty("groomGuardianAadharNo")
    private String guardianAadharno;

    @Size(max = 64)
    @JsonProperty("groomMaritalstatusID")
    private String maritalstatusid;

    @JsonProperty("groomIsSpouseLiving")
    private Boolean groomIsSpouseLiving;

    @JsonProperty("groomNoOfSpouse")
    private Integer groomNoOfSpouse;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;


}