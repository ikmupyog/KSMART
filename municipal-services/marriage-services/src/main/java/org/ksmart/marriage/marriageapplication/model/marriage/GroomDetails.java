package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroomDetails {
    @Size(max = 64)
    @JsonProperty("groomId")
    private String groomId;
    @Size(max = 64)
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
    @Size(max = 15)
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
    private String firstname_en;
    @Size(max = 200)
    @JsonProperty("groomFirstnameMl")
    private String firstname_ml;
    @Size(max = 200)
    @JsonProperty("groomMiddlenameEn")
    private String middlename_en;
    @Size(max = 200)
    @JsonProperty("groomMiddlenameMl")
    private String middlename_ml;

    @Size(max = 200)
    @JsonProperty("groomLastnameEn")
    private String lastname_en;
    @Size(max = 200)
    @JsonProperty("groomLastnameMl")
    private String lastname_ml;
    @Size(max = 150)
    @JsonProperty("groomMobile")
    private String mobile;
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
    private String parent_guardian;
    @Size(max = 200)
    @JsonProperty("groomFathernameEn")
    private String fathername_en;

    @Size(max = 200)
    @JsonProperty("groomFathernameMl")
    private String fathername_ml;
    @Size(max = 200)
    @JsonProperty("groomMothernameEn")
    private String mothername_en;
    @Size(max = 200)
    @JsonProperty("groomMothernameMl")
    private String mothername_ml;

    @Size(max = 15)
    @JsonProperty("groomFatherAadharNo")
    private String father_aadharno;
    @Size(max = 15)
    @JsonProperty("groomMotherAadharNo")
    private String mother_aadharno;
    @Size(max = 200)
    @JsonProperty("groomGuardiannameEn")
    private String guardianname_en;
    @Size(max = 200)
    @JsonProperty("groomGuardiannameMl")
    private String guardianname_ml;
    @Size(max = 15)
    @JsonProperty("groomGuardianAadharNo")
    private String guardian_aadharno;

//    @Size(max = 200)
//    @JsonProperty("groomProfessionEn")
//    private String profession_en;
//
//
//    @Size(max = 200)
//    @JsonProperty("groomProfessionMal")
//    private String profession_mal;

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
