package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PermanentAdressDetails {
    @NotNull
    @Size(max = 64)
    @JsonProperty("id1")
    private String id1;

    @Size(max = 200)
    @JsonProperty("permanentHouseNoBride")
    private String housenoBride;

    @Size(max = 2500)
    @JsonProperty("permanentHouseNameEnBride")
    private String housename_no_enBride;

    @Size(max = 2500)
    @JsonProperty("permanentHouseNameMalBride")
    private String housename_no_mlBride;

    @Size(max = 64)
    @JsonProperty("permanentVillageIdBride")
    private String villageidBride;

    @Size(max = 1000)
    @JsonProperty("permanentVillageNameBride")
    private String village_nameBride;

    @Size(max = 64)
    @JsonProperty("permanentTalukIDBride")
    private String talukidBride;

    @Size(max = 1000)
    @JsonProperty("permanentTalukNameBride")
    private String taluk_nameBride;

    @Size(max = 64)
    @JsonProperty("permanentWardCodeBride")
    private String ward_codeBride;

    @JsonProperty("permanentDoorNOBride")
    private Integer doornoBride;

    @Size(max = 1000)
    @JsonProperty("permanentLocalityEnBride")
    private String locality_enBride;

    @Size(max = 1000)
    @JsonProperty("permanentLocalityMalBride")
    private String locality_mlBride;

    @Size(max = 2000)
    @JsonProperty("permanentStreetNameEnBride")
    private String street_name_enBride;

    @Size(max = 2000)
    @JsonProperty("permanentStreetNameMalBride")
    private String street_name_mlBride;


    @Size(max = 64)
    @JsonProperty("permanentDistrictIdBride")
    private String districtidBride;




    @Size(max = 64)
    @JsonProperty("permanentStateIdBride")
    private String stateidBride;

    @Size(max = 64)
    @JsonProperty("permanentPOidBride")
    private String poidBride;

    @Size(max = 10)
    @JsonProperty("permanentPinBride")
    private String pinnoBride;

    @Size(max = 64)
    @JsonProperty("permanentCountryIdBride")
    private String countryidBride;
    @NotNull
    @Size(max = 64)
    @JsonProperty("marriageidBride")
    private String marriageidBride;
    @NotNull
    @Size(max = 64)
    @JsonProperty("brideGroom1")
    private String brideGroom1;
    @Size(max = 64)
    @JsonProperty("marriageTenantidBride")
    private String tenantidBride;
    @Size(max = 64)
    @JsonProperty("ponameEnBride")
    private String poname_enBride;




    @NotNull
    @Size(max = 64)
    @JsonProperty("id2")
    private String id2;
    @Size(max = 200)
    @JsonProperty("permanentHouseNoGroom")
    private String housenoGroom;

    @Size(max = 2500)
    @JsonProperty("permanentHouseNameEnGroom")
    private String housename_no_enGroom;

    @Size(max = 2500)
    @JsonProperty("permanentHouseNameMalGroom")
    private String housename_no_mlGroom;

    @Size(max = 64)
    @JsonProperty("permanentVillageIdGroom")
    private String villageidGroom;

    @Size(max = 1000)
    @JsonProperty("permanentVillageNameGroom")
    private String village_nameGroom;

    @Size(max = 64)
    @JsonProperty("permanentTalukIDGroom")
    private String talukidGroom;

    @Size(max = 1000)
    @JsonProperty("permanentTalukNameGroom")
    private String taluk_nameGroom;

    @Size(max = 64)
    @JsonProperty("permanentWardCodeGroom")
    private String ward_codeGroom;

    @JsonProperty("permanentDoorNOGroom")
    private Integer doornoGroom;

    @Size(max = 1000)
    @JsonProperty("permanentLocalityEnGroom")
    private String locality_enGroom;

    @Size(max = 1000)
    @JsonProperty("permanentLocalityMalGroom")
    private String locality_mlGroom;

    @Size(max = 2000)
    @JsonProperty("permanentStreetNameEnGroom")
    private String street_name_enGroom;

    @Size(max = 2000)
    @JsonProperty("permanentStreetNameMalGroom")
    private String street_name_mlGroom;


    @Size(max = 64)
    @JsonProperty("permanentDistrictIdGroom")
    private String districtidGroom;




    @Size(max = 64)
    @JsonProperty("permanentStateIdGroom")
    private String stateidGroom;

    @Size(max = 64)
    @JsonProperty("permanentPOidGroom")
    private String poidGroom;

    @Size(max = 10)
    @JsonProperty("permanentPinGroom")
    private String pinnoGroom;

    @Size(max = 64)
    @JsonProperty("permanentCountryIdGroom")
    private String countryidGroom;
    @NotNull
    @Size(max = 64)
    @JsonProperty("marriageidGroom")
    private String marriageidGroom;
    @NotNull
    @Size(max = 64)
    @JsonProperty("brideGroom2")
    private String brideGroom2;
    @Size(max = 64)
    @JsonProperty("marriageTenantidGroom")
    private String tenantidGroom;
    @Size(max = 64)
    @JsonProperty("ponameEnGroom")
    private String poname_enGroom;
}
