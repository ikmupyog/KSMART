package org.ksmart.marriage.marriageapplication.web.model.marriage;

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
    private String firstnameEn;

    @Size(max = 200)
    @JsonProperty("brideFirstnameMl")
    private String firstnameMl;

    @Size(max = 200)
    @JsonProperty("brideMiddlenameEn")
    private String middlenameEn;

    @Size(max = 200)
    @JsonProperty("brideMiddlenameMl")
    private String middlenameMl;

    @Size(max = 200)
    @JsonProperty("brideLastnameEn")
    private String lastnameEn;

    @Size(max = 200)
    @JsonProperty("brideLastnameMl")
    private String lastnameMl;


    @JsonProperty("brideMobile")
    private Long mobile;


    @Size(max = 10)
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
    private String parentGuardian;

    @Size(max = 200)
    @JsonProperty("brideFathernameEn")
    private String fathernameEn;

    @Size(max = 200)
    @JsonProperty("brideFathernameMl")
    private String fathernameMl;

    @Size(max = 200)
    @JsonProperty("brideMothernameEn")
    private String mothernameEn;

    @Size(max = 200)
    @JsonProperty("brideMothernameMl")
    private String mothernameMl;

    @Size(max = 15)
    @JsonProperty("brideFatherAadharNo")
    private String fatherAadharno;

    @Size(max = 15)
    @JsonProperty("brideMotherAadharNo")
    private String motherAadharno;

    @Size(max = 200)
    @JsonProperty("brideGuardiannameEn")
    private String guardiannameEn;

    @Size(max = 200)
    @JsonProperty("brideGuardiannameMl")
    private String guardiannameMl;

    @Size(max = 15)
    @JsonProperty("brideGuardianAadharNo")
    private String guardianAadharno;

    @Size(max = 64)
    @JsonProperty("brideMaritalstatusID")
    private String maritalstatusid;

    @JsonProperty("brideIsSpouseLiving")
    private Boolean brideIsSpouseLiving;

    @JsonProperty("brideNoOfSpouse")
    private Integer brideNoOfSpouse;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
