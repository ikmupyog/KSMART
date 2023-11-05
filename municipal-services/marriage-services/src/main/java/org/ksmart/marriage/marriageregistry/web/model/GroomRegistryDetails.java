package org.ksmart.marriage.marriageregistry.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

import javax.validation.constraints.Size;

/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroomRegistryDetails {
    @Size(max = 64)
    @JsonProperty("groomId")
    private String groomId;

    @Size(max = 64)
    @JsonProperty("tenentId")
    private String tenentId;

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

   
    @JsonProperty("groomGuardianAadharNo")
    private String guardian_aadharno;

//    @Size(max = 200)
//    @JsonProperty("groomProfessionEn")
//    private String profession_en;
//
//
//    @Size(max = 200)
//    @JsonProperty("groomProfessionMl")
//    private String profession_ml;

    @Size(max = 64)
    @JsonProperty("groomMaritalstatusID")
    private String maritalstatusid;

    @Size(max = 64)
    @JsonProperty("groomMaritalstatusidEn")
    private String groomMaritalstatusidEn;

    @Size(max = 64)
    @JsonProperty("groomMaritalstatusidMl")
    private String groomMaritalstatusidMl;

    @JsonProperty("groomIsSpouseLiving")
    private Boolean groomIsSpouseLiving;

    @JsonProperty("groomNoOfSpouse")
    private Integer groomNoOfSpouse;

    @Size(max = 150)
    @JsonProperty("groomPhotoUrl")
    private String photo_url;

    @Size(max = 64)
    @JsonProperty("brideGroom")
    private String brideGroom;

    @JsonProperty("AuditDetails")
    private AuditDetails auditDetails;


}
