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
public class BrideRegistryDetails {

    @Size(max = 64)
    @JsonProperty("brideId")
    private String brideId;

    @Size(max = 64)
    @JsonProperty("tenentId")
    private String tenentId;

    @Size(max = 64)
    @JsonProperty("marriageid")
    private String marriageid;

    @Size(max = 64)
    @JsonProperty("brideResidentShip")
    private String residentship;

    @Size(max = 15)
    @JsonProperty("brideAadharNo")
    private String aadharno;

    @Size(max = 1000)
    @JsonProperty("bridePassportNo")
    private String passportno;

    @Size(max = 64)
    @JsonProperty("brideSocialSecurityNo")
    private String socialsecurityno;

    @Size(max = 200)
    @JsonProperty("brideFirstnameEn")
    private String firstname_en;

    @Size(max = 200)
    @JsonProperty("brideFirstnameMl")
    private String firstname_ml;

    @Size(max = 200)
    @JsonProperty("brideMiddlenameEn")
    private String middlename_en;

    @Size(max = 200)
    @JsonProperty("brideMiddlenameMl")
    private String middlename_ml;

    @Size(max = 200)
    @JsonProperty("brideLastnameEn")
    private String lastname_en;

    @Size(max = 200)
    @JsonProperty("brideLastnameMl")
    private String lastname_ml;

    @JsonProperty("brideMobile")
    private Long mobile;

    @Size(max = 300)
    @JsonProperty("brideEmailid")
    private String emailid;

    @Size(max = 20)
    @JsonProperty("brideGender")
    private String gender;

    @JsonProperty("brideDOB")
    private long dateofbirth;

    @JsonProperty("brideAge")
    private Integer age;

    @Size(max = 64)
    @JsonProperty("brideParentGuardian")
    private String parent_guardian;

    @Size(max = 200)
    @JsonProperty("brideFathernameEn")
    private String fathername_en;

    @Size(max = 200)
    @JsonProperty("brideFathernameMl")
    private String fathername_ml;

    @Size(max = 200)
    @JsonProperty("brideMothernameEn")
    private String mothername_en;

    @Size(max = 200)
    @JsonProperty("brideMothernameMl")
    private String mothername_ml;

    @Size(max = 15)
    @JsonProperty("brideFatherAadharNo")
    private String father_aadharno;

    @Size(max = 15)
    @JsonProperty("brideMotherAadharNo")
    private String mother_aadharno;

    @Size(max = 200)
    @JsonProperty("brideGuardiannameEn")
    private String guardianname_en;

    @Size(max = 200)
    @JsonProperty("brideGuardiannameMl")
    private String guardianname_ml;


    @JsonProperty("brideGuardianAadharNo")
    private String guardian_aadharno;


//    @Size(max = 200)
//    @JsonProperty("brideProfessionEn")
//    private String profession_en;
//
//    @Size(max = 200)
//    @JsonProperty("brideProfessionMl")
//    private String profession_ml;

    @Size(max = 64)
    @JsonProperty("brideMaritalstatusID")
    private String maritalstatusid;


    @Size(max = 64)
    @JsonProperty("brideMaritalstatusidMl")
    private String brideMaritalstatusidMl;

    @Size(max = 64)
    @JsonProperty("brideMaritalstatusidEn")
    private String brideMaritalstatusidEn;

    @JsonProperty("brideIsSpouseLiving")
    private Boolean brideIsSpouseLiving;


    @JsonProperty("brideNoOfSpouse")
    private Integer brideNoOfSpouse;

    @Size(max = 150)
    @JsonProperty("bridePhotoUrl")
    private String photo_url;

    @Size(max = 64)
    @JsonProperty("brideGroom")
    private String brideGroom;
    
    @JsonProperty("AuditDetails")
    private AuditDetails registryAuditDetails;




}
