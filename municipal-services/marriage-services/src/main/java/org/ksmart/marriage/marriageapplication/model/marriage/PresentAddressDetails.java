package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PresentAddressDetails {
    @Size(max = 64)
    @JsonProperty("id")
    private String id;
    @Size(max = 200)
    @JsonProperty("presentHouseNo")
    private String houseno;

    @Size(max = 2500)
    @JsonProperty("presentHouseNameEn")
    private String housename_no_en;



    @Size(max = 2500)
    @JsonProperty("presentHouseNameMal")
    private String housename_no_ml;

    @Size(max = 64)
    @JsonProperty("presentVillageId")
    private String villageid;

    @Size(max = 1000)
    @JsonProperty("presentVillageName")
    private String village_name;

    @Size(max = 64)
    @JsonProperty("presentTalukID")
    private String talukid;

    @Size(max = 1000)
    @JsonProperty("presentTalukName")
    private String taluk_name;

    @Size(max = 64)
    @JsonProperty("presentWardCode")
    private String ward_code;




    @JsonProperty("presentDoorNO")
    private     Integer doorno;

    @Size(max = 1000)
    @JsonProperty("presentLocalityEn")
    private String locality_en;

    @Size(max = 1000)
    @JsonProperty("presentLocalityMal")
    private String locality_ml;

    @Size(max = 2000)
    @JsonProperty("presentStreetNameEn")
    private String street_name_en;

    @Size(max = 2000)
    @JsonProperty("presentStreetNameMal")
    private String street_name_ml;


    @Size(max = 64)
    @JsonProperty("presentDistrictId")
    private String districtid;




    @Size(max = 64)
    @JsonProperty("presentStateId")
    private String stateid;

    @Size(max = 64)
    @JsonProperty("presentPOid")
    private String poid;

    @Size(max = 10)
    @JsonProperty("presentPin")
    private String pinno;

    @Size(max = 64)
    @JsonProperty("presentCountryId")
    private String countryid;

    @Size(max = 64)
    @JsonProperty("marriageid")
    private String marriageid;

}
