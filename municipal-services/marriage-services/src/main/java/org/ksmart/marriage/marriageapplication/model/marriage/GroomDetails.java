package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroomDetails {
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


    @Size(max = 200)
    @JsonProperty("groomProfessionEn")
    private String profession_en;


    @Size(max = 200)
    @JsonProperty("permanentHouseNo")
    private String houseno;

    @Size(max = 2500)
    @JsonProperty("permanentHouseNameEn")
    private String housename_no_en;



    @Size(max = 2500)
    @JsonProperty("permanentHouseNameMal")
    private String housename_no_ml;

    @Size(max = 64)
    @JsonProperty("permanentVillageId")
    private String villageid;

    @Size(max = 1000)
    @JsonProperty("permanentVillageName")
    private String village_name;

    @Size(max = 64)
    @JsonProperty("permanentTalukID")
    private String talukid;

    @Size(max = 1000)
    @JsonProperty("permanentTalukName")
    private String taluk_name;

    @Size(max = 64)
    @JsonProperty("permanentWardCode")
    private String ward_code;




    @JsonProperty("permanentDoorNO")
    private     Integer doorno;

    @Size(max = 1000)
    @JsonProperty("permanentLocalityEn")
    private String locality_en;

    @Size(max = 1000)
    @JsonProperty("permanentLocalityMal")
    private String locality_ml;

    @Size(max = 2000)
    @JsonProperty("permanentStreetNameEn")
    private String street_name_en;

    @Size(max = 2000)
    @JsonProperty("permanentStreetNameMal")
    private String street_name_ml;


    @Size(max = 64)
    @JsonProperty("permanentDistrictId")
    private String districtid;


    @Size(max = 64)
    @JsonProperty("permanentStateId")
    private String stateid;

    @Size(max = 64)
    @JsonProperty("permanentPOid")
    private String poid;

    @Size(max = 10)
    @JsonProperty("permanentPin")
    private String pinno;

    @Size(max = 64)
    @JsonProperty("permanentCountryId")
    private String countryid;




    @Size(max = 200)
    @JsonProperty("presentHouseNo")
    private String presentHouseNo;

    @Size(max = 2500)
    @JsonProperty("presentHouseNameEn")
    private String presentHouseNameEn;



    @Size(max = 2500)
    @JsonProperty("presentHouseNameMal")
    private String presentHouseNameMal;

    @Size(max = 64)
    @JsonProperty("presentVillageId")
    private String presentVillageId;

    @Size(max = 1000)
    @JsonProperty("presentVillageName")
    private String presentVillageName;

    @Size(max = 64)
    @JsonProperty("presentTalukID")
    private String presentTalukID;

    @Size(max = 1000)
    @JsonProperty("presentTalukName")
    private String presentTalukName;

    @Size(max = 64)
    @JsonProperty("presentWardCode")
    private String presentWardCode;




    @JsonProperty("presentDoorNO")
    private     Integer presentDoorNO;

    @Size(max = 1000)
    @JsonProperty("presentLocalityEn")
    private String presentLocalityEn;

    @Size(max = 1000)
    @JsonProperty("presentLocalityMal")
    private String presentLocalityMal;

    @Size(max = 2000)
    @JsonProperty("presentStreetNameEn")
    private String presentStreetNameEn;

    @Size(max = 2000)
    @JsonProperty("presentStreetNameMal")
    private String presentStreetNameMal;


    @Size(max = 64)
    @JsonProperty("presentDistrictId")
    private String presentDistrictId;




    @Size(max = 64)
    @JsonProperty("presentStateId")
    private String presentStateId;

    @Size(max = 64)
    @JsonProperty("presentPOid")
    private String presentPOid;

    @Size(max = 10)
    @JsonProperty("presentPin")
    private String presentPin;

    @Size(max = 64)
    @JsonProperty("presentCountryId")
    private String presentCountryId;

    @Size(max = 200)
    @JsonProperty("groomProfessionMal")
    private String profession_mal;

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


}
