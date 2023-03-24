package org.ksmart.marriage.marriageregistry.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

import javax.validation.constraints.NotNull;
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
    @JsonProperty("groomAdharNo")
    private String adharno;
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
    @JsonProperty("groomFirstnameMal")
    private String firstname_mal;
    @Size(max = 200)
    @JsonProperty("groomMiddlenameEn")
    private String middlename_en;
    @Size(max = 200)
    @JsonProperty("groomMiddlenameMal")
    private String middlename_mal;

    @Size(max = 200)
    @JsonProperty("groomLastnameEn")
    private String lastname_en;
    @Size(max = 200)
    @JsonProperty("groomLastnameMal")
    private String lastname_mal;
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
    @JsonProperty("groomFathernameMal")
    private String fathername_mal;
    @Size(max = 200)
    @JsonProperty("groomMothernameEn")
    private String mothername_en;
    @Size(max = 200)
    @JsonProperty("groomMothernameMal")
    private String mothername_mal;

    @Size(max = 15)
    @JsonProperty("groomFatherAdharNo")
    private String father_adharno;
    @Size(max = 15)
    @JsonProperty("groomMotherAdharNo")
    private String mother_adharno;
    @Size(max = 200)
    @JsonProperty("groomGuardiannameEn")
    private String guardianname_en;
    @Size(max = 200)
    @JsonProperty("groomGuardiannameMal")
    private String guardianname_mal;
    @Size(max = 15)
    @JsonProperty("groomGardianAdhar")
    private String guardian_adhar;

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
    @JsonProperty("groomSpouseLiving")
    private Boolean is_spouse_living;
    @JsonProperty("groomNoOfSpouse")
    private Boolean no_of_spouse_living;
    @Size(max = 150)
    @JsonProperty("groomPhotoUrl")
    private String photo_url;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;


}
