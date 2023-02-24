package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Size;

public class PermanentAdressDetails {
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


}
