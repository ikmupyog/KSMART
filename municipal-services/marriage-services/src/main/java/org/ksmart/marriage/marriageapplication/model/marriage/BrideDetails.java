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
public class BrideDetails {

    @Size(max = 64)
    @JsonProperty("brideId")
    private String brideId;
    @NotNull
    @Size(max = 64)
    @JsonProperty("brideGroom")
    private String brideGroom;
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

    @Size(max = 150)
    @JsonProperty("brideMobile")
    private String mobile;

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

    @Size(max = 15)
    @JsonProperty("brideGuardianAadharNo")
    private String guardian_aadharno;


//    @Size(max = 200)
//    @JsonProperty("brideProfessionEn")
//    private String profession_en;
//
//    @Size(max = 200)
//    @JsonProperty("brideProfessionMal")
//    private String profession_mal;

    @Size(max = 64)
    @JsonProperty("brideMaritalstatusID")
    private String maritalstatusid;

    @JsonProperty("brideIsSpouseLiving")
    private boolean brideIsSpouseLiving;

    @JsonProperty("brideNoOfSpouse")
    private Integer brideNoOfSpouse;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
