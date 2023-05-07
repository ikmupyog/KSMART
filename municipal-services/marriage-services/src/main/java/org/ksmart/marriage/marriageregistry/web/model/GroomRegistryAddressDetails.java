package org.ksmart.marriage.marriageregistry.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

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
public class GroomRegistryAddressDetails {

    @Size(max = 64)
    @JsonProperty("presentaddressCountry")
    private String presentaddressCountry;

    @Size(max = 64)
    @JsonProperty("presentaddressStateName")
    private String presentaddressStateName;

    @Size(max = 64)
    @JsonProperty("presentInsideKeralaLBName")
    private String presentInsideKeralaLBName;

    @Size(max = 64)
    @JsonProperty("presentInsideKeralaDistrict")
    private String presentInsideKeralaDistrict;

    @Size(max = 64)
    @JsonProperty("presentInsideKeralaTaluk")
    private String presentInsideKeralaTaluk;

    @Size(max = 64)
    @JsonProperty("presentInsideKeralaVillage")
    private String presentInsideKeralaVillage;

    @Size(max = 1000)
    @JsonProperty("presentInsideKeralaLocalityNameEn")
    private String presentInsideKeralaLocalityNameEn;

    @Size(max = 2000)
    @JsonProperty("presentInsideKeralaStreetNameEn")
    private String presentInsideKeralaStreetNameEn;

    @Size(max = 2500)
    @JsonProperty("presentInsideKeralaHouseNameEn")
    private String presentInsideKeralaHouseNameEn;

    @Size(max = 1000)
    @JsonProperty("presentInsideKeralaLocalityNameMl")
    private String presentInsideKeralaLocalityNameMl;

    @Size(max = 2000)
    @JsonProperty("presentInsideKeralaStreetNameMl")
    private String presentInsideKeralaStreetNameMl;

    @Size(max = 2500)
    @JsonProperty("presentInsideKeralaHouseNameMl")
    private String presentInsideKeralaHouseNameMl;

    @Size(max = 10)
    @JsonProperty("presentInsideKeralaPincode")
    private String presentInsideKeralaPincode;

    @Size(max = 64)
    @JsonProperty("presentInsideKeralaPostOffice")
    private String presentInsideKeralaPostOffice;

    @Size(max = 64)
    @JsonProperty("presentWardNo")
    private String presentWardNo;

    @Size(max = 64)
    @JsonProperty("presentOutsideKeralaDistrict")
    private String presentOutsideKeralaDistrict;

    @Size(max = 1000)
    @JsonProperty("presentOutsideKeralaTaluk")
    private String presentOutsideKeralaTalukName;

    @Size(max = 1000)
    @JsonProperty("presentOutsideKeralaVillage")
    private String presentOutsideKeralaVillageorTown;

    @Size(max = 1000)
    @JsonProperty("presentOutsideKeralaCityVilgeEn")
    private String presentOutsideKeralaCityVilgeNameEn;

    @Size(max = 64)
    @JsonProperty("presentOutsideKeralaPincode")
    private String presentOutsideKeralaPincode;

    @Size(max = 64)
    @JsonProperty("presentOutsideKeralaPostOfficeEn")
    private String presentOutsideKeralaPostOfficeEn;

    @Size(max = 64)
    @JsonProperty("presentOutsideKeralaPostOfficeMl")
    private String presentOutsideKeralaPostOfficeMl;

    @Size(max = 1000)
    @JsonProperty("presentOutsideKeralaLocalityNameEn")
    private String presentOutsideKeralaLocalityNameEn;

    @Size(max = 2000)
    @JsonProperty("presentOutsideKeralaStreetNameEn")
    private String presentOutsideKeralaStreetNameEn;

    @Size(max = 2500)
    @JsonProperty("presentOutsideKeralaHouseNameEn")
    private String presentOutsideKeralaHouseNameEn;

    @Size(max = 1000)
    @JsonProperty("presentOutsideKeralaLocalityNameMl")
    private String presentOutsideKeralaLocalityNameMl;

    @Size(max = 2000)
    @JsonProperty("presentOutsideKeralaStreetNameMl")
    private String presentOutsideKeralaStreetNameMl;

    @Size(max = 2500)
    @JsonProperty("presentOutsideKeralaHouseNameMl")
    private String presentOutsideKeralaHouseNameMl;

    @Size(max = 2500)
    @JsonProperty("presentOutSideIndiaAdressEn")
    private String presentOutSideIndiaAdressEn;

    @Size(max = 2500)
    @JsonProperty("presentOutSideIndiaAdressMl")
    private String presentOutSideIndiaAdressMl;

    @Size(max = 2500)
    @JsonProperty("presentOutSideIndiaAdressEnB")
    private String presentOutSideIndiaAdressEnB;

    @Size(max = 2500)
    @JsonProperty("presentOutSideIndiaAdressMlB")
    private String presentOutSideIndiaAdressMlB;

    @Size(max = 2500)
    @JsonProperty("presentOutSideIndiaProvinceEn")
    private String presentOutSideIndiaProvinceEn;

    @Size(max = 1000)
    @JsonProperty("presentOutSideIndiaLocalityMl")
    private String presentOutSideIndiaLocalityMl;

    @Size(max = 2500)
    @JsonProperty("presentOutSideIndiaProvinceMl")
    private String presentOutSideIndiaProvinceMl;

    @Size(max = 64)
    @JsonProperty("presentOutSideCountry")
    private String presentOutSideCountry;

    @Size(max = 1000)
    @JsonProperty("presentOutSideIndiaadrsVillage")
    private String presentOutSideIndiaadrsVillage;

    @Size(max = 64)
    @JsonProperty("presentOutSideIndiaadrsCityTown")
    private String presentOutSideIndiaadrsCityTown;
    @Size(max = 10)
    @JsonProperty("presentOutSideIndiaPostCode")
    private String presentOutSideIndiaPostCode;
    ////Db Fields//////



    @Size(max = 64)
    @JsonProperty("presentUuid")
    private String presentUuid;

    @Size(max = 64)
    @JsonProperty("countryIdPresent")
    private String countryIdPresent;

    @Size(max = 64)
    @JsonProperty("stateIdPresent")
    private String stateIdPresent;

    @Size(max = 64)
    @JsonProperty("districtIdPresent")
    private String districtIdPresent;

    @Size(max = 64)
    @JsonProperty("pinNoPresent")
    private String pinNoPresent;

    @Size(max = 1000)
    @JsonProperty("localityEnPresent")
    private String localityEnPresent;

    @Size(max = 1000)
    @JsonProperty("localityMlPresent")
    private String localityMlPresent;

    @Size(max = 1000)
    @JsonProperty("streetNameEnPresent")
    private String streetNameEnPresent;

    @Size(max = 1000)
    @JsonProperty("streetNameMlPresent")
    private String streetNameMlPresent;

    @Size(max = 1000)
    @JsonProperty("houseNameNoEnPresent")
    private String houseNameNoEnPresent;

    @Size(max = 1000)
    @JsonProperty("houseNameNoMlPresent")
    private String houseNameNoMlPresent;

    @Size(max = 1000)
    @JsonProperty("villageNamePresent")
    private String villageNamePresent;
    @Size(max = 1000)
    @JsonProperty("townOrVillagePresent")
    private String townOrVillagePresent;

    @Size(max = 10)
    @JsonProperty("poNoPresent")
    private String poNoPresent;

    @Size(max = 1000)
    @JsonProperty("presentOthrTalukName")
    private String presentOthrTalukName;
    @Size(max = 64)
    @JsonProperty("presentOthPostOfficeEn")
    private String presentOthPostOfficeEn;
    @Size(max = 64)
    @JsonProperty("brideGroomPresent")
    private String brideGroomPresent;

    @Size(max = 2500)
    @JsonProperty("presentOthrIndiaAdressEn")
    private String presentOthrIndiaAdressEn;

    @Size(max = 2500)
    @JsonProperty("presentOthrIndiaAdressMl")
    private String presentOthrIndiaAdressMl;

    @Size(max = 2500)
    @JsonProperty("presentOthrIndiaAdressEnB")
    private String presentOthrIndiaAdressEnB;

    @Size(max = 2500)
    @JsonProperty("presentOthrIndiaAdressMlB")
    private String presentOthrIndiaAdressMlB;

    @Size(max = 2500)
    @JsonProperty("presentOthrIndiaProvinceEn")
    private String presentOthrIndiaProvinceEn;

    @Size(max = 2500)
    @JsonProperty("presentOthrIndiaProvinceMl")
    private String presentOthrIndiaProvinceMl;
    @Size(max = 10)
    @JsonProperty("outSideIndiaPostCodePresent")
    private String outSideIndiaPostCodePresent;


    ////Permanant

    @JsonProperty("isPermanentAddress")
    private Boolean isPermanentAddress;

    @Size(max = 1000)
    @JsonProperty("permtaddressCountry")
    private String permtaddressCountry;

    @Size(max = 64)
    @JsonProperty("permtaddressStateName")
    private String permtaddressStateName;

    @Size(max = 64)
    @JsonProperty("permntInKeralaAdrLBName")
    private String permntInKeralaAdrLBName;

    @Size(max = 64)
    @JsonProperty("permntInKeralaAdrDistrict")
    private String permntInKeralaAdrDistrict;

    @Size(max = 64)
    @JsonProperty("permntOutsideKeralaCityVilgeEn")
    private String permntOutsideKeralaCityVilgeNameEn;

    @Size(max = 64)
    @JsonProperty("permntInKeralaAdrTaluk")
    private String permntInKeralaAdrTaluk;

    @Size(max = 64)
    @JsonProperty("permntInKeralaAdrVillage")
    private String permntInKeralaAdrVillage;

    @Size(max = 2500)
    @JsonProperty("permntOutSideIndiaProvinceMl")
    private String permntOutSideIndiaProvinceMl;

    @Size(max = 2500)
    @JsonProperty("permntOutSideIndiaProvinceEn")
    private String permntOutSideIndiaProvinceEn;

    @Size(max = 1000)
    @JsonProperty("permntInKeralaAdrLocalityNameEn")
    private String permntInKeralaAdrLocalityNameEn;

    @Size(max = 2000)
    @JsonProperty("permntInKeralaAdrStreetNameEn")
    private String permntInKeralaAdrStreetNameEn;

    @Size(max = 2500)
    @JsonProperty("permntInKeralaAdrHouseNameEn")
    private String permntInKeralaAdrHouseNameEn;

    @Size(max = 2500)
    @JsonProperty("permntInKeralaAdrLocalityNameMl")
    private String permntInKeralaAdrLocalityNameMl;

    @Size(max = 2500)
    @JsonProperty("permntInKeralaAdrStreetNameMl")
    private String permntInKeralaAdrStreetNameMl;

    @Size(max = 2500)
    @JsonProperty("permntInKeralaAdrHouseNameMl")
    private String permntInKeralaAdrHouseNameMl;

    @Size(max = 64)
    @JsonProperty("permntInKeralaAdrPincode")
    private String permntInKeralaAdrPincode;

    @Size(max = 64)
    @JsonProperty("permntInKeralaAdrPostOffice")
    private String permntInKeralaAdrPostOffice;

    @Size(max = 64)
    @JsonProperty("permntInKeralaWardNo")
    private String permntInKeralaWardNo;

    @Size(max = 64)
    @JsonProperty("permntOutsideKeralaDistrict")
    private String permntOutsideKeralaDistrict;

    @Size(max = 1000)
    @JsonProperty("permntOutsideKeralaTaluk")
    private String permntOutsideKeralaTaluk;

    @Size(max = 1000)
    @JsonProperty("permntOutsideKeralaVillage")
    private String permntOutsideKeralaVillageorTown;

    @Size(max = 64)
    @JsonProperty("permntOutsideKeralaPincode")
    private String permntOutsideKeralaPincode;

    @Size(max = 1000)
    @JsonProperty("permntOutsideKeralaLocalityNameEn")
    private String permntOutsideKeralaLocalityNameEn;

    @Size(max = 2000)
    @JsonProperty("permntOutsideKeralaStreetNameEn")
    private String permntOutsideKeralaStreetNameEn;

    @Size(max = 2500)
    @JsonProperty("permntOutsideKeralaHouseNameEn")
    private String permntOutsideKeralaHouseNameEn;

    @Size(max = 1000)
    @JsonProperty("permntOutsideKeralaLocalityNameMl")
    private String permntOutsideKeralaLocalityNameMl;

    @Size(max = 2000)
    @JsonProperty("permntOutsideKeralaStreetNameMl")
    private String permntOutsideKeralaStreetNameMl;

    @Size(max = 2500)
    @JsonProperty("permntOutsideKeralaHouseNameMl")
    private String permntOutsideKeralaHouseNameMl;

    @Size(max = 64)
    @JsonProperty("permntOutsideKeralaPostOfficeEn")
    private String permntOutsideKeralaPostOfficeEn;

    @Size(max = 64)
    @JsonProperty("permntOutsideKeralaPostOfficeMl")
    private String permntOutsideKeralaPostOfficeMl;

    @Size(max = 2500)
    @JsonProperty("permntOutsideIndiaLineoneEn")
    private String permntOutsideIndiaLineoneEn;

    @Size(max = 2500)
    @JsonProperty("permntOutsideIndiaLineoneMl")
    private String permntOutsideIndiaLineoneMl;

    @Size(max = 2500)
    @JsonProperty("permntOutsideIndiaLinetwoEn")
    private String permntOutsideIndiaLinetwoEn;

    @Size(max = 2500)
    @JsonProperty("permntOutsideIndiaLinetwoMl")
    private String permntOutsideIndiaLinetwoMl;

    @Size(max = 1000)
    @JsonProperty("permntOutsideIndiaVillage")
    private String permntOutsideIndiaVillage;

    @Size(max = 1000)
    @JsonProperty("permntOutsideIndiaCityTown")
    private String permntOutsideIndiaCityTown;

    @Size(max = 10)
    @JsonProperty("permanentOutsideIndiaPostCode")
    private String permanentOutsideIndiaPostCode;

    @Size(max = 64)
    @JsonProperty("permntOutsideIndiaCountry")
    private String permntOutsideIndiaCountry;

    @Size(max = 1000)
    @JsonProperty("stateName")
    private String stateName;

    @Size(max = 1000)
    @JsonProperty("districtName")
    private String districtName;

    @Size(max = 1000)
    @JsonProperty("countryName")
    private String countryName;

    ////Db Fields//////

    @Size(max = 64)
    @JsonProperty("permanentUuid")
    private String permanentUuid;

    @JsonProperty("isPermanentAddressInt")
    private Integer isPermanentAddressInt;
    @JsonProperty("PermanentAddrTalukId")
    private String permanentAddrTalukId ;


    @JsonProperty("PermanentAddrVillageId")
    private String permanentAddrVillageId ;
    @Size(max = 64)
    @JsonProperty("countryIdPermanent")
    private String countryIdPermanent;

    @Size(max = 64)
    @JsonProperty("stateIdPermanent")
    private String stateIdPermanent;

    @Size(max = 64)
    @JsonProperty("districtIdPermanent")
    private String districtIdPermanent;

    @Size(max = 64)
    @JsonProperty("pinNoPermanent")
    private String pinNoPermanent;

    @Size(max = 1000)
    @JsonProperty("localityEnPermanent")
    private String localityEnPermanent;

    @Size(max = 1000)
    @JsonProperty("localityMlPermanent")
    private String localityMlPermanent;

    @Size(max = 1000)
    @JsonProperty("streetNameEnPermanent")
    private String streetNameEnPermanent;

    @Size(max = 1000)
    @JsonProperty("streetNameMlPermanent")
    private String streetNameMlPermanent;

    @Size(max = 1000)
    @JsonProperty("houseNameNoEnPermanent")
    private String houseNameNoEnPermanent;

    @Size(max = 1000)
    @JsonProperty("houseNameNoMlPermanent")
    private String houseNameNoMlPermanent;

    @Size(max = 1000)
    @JsonProperty("villageNamePermanent")
    private String villageNamePermanent;

    @Size(max = 1000)
    @JsonProperty("townOrVillagePermanent")
    private String townOrVillagePermanent;

    @Size(max = 10)
    @JsonProperty("poNoPermanent")
    private String poNoPermanent;

    @Size(max = 1000)
    @JsonProperty("permntOthrTalukName")
    private String permntOthrTalukName;

    @Size(max = 64)
    @JsonProperty("permntOthPostOfficeEn")
    private String permntOthPostOfficeEn;

    @Size(max = 2500)
    @JsonProperty("permntOthrIndiaLineoneEn")
    private String permntOthrIndiaLineoneEn;

    @Size(max = 2500)
    @JsonProperty("permntOthrIndiaLineoneMl")
    private String permntOthrIndiaLineoneMl;

    @Size(max = 2500)
    @JsonProperty("permntOthrIndiaLinetwoEn")
    private String permntOthrIndiaLinetwoEn;

    @Size(max = 2500)
    @JsonProperty("permntOthrIndiaLinetwoMl")
    private String permntOthrIndiaLinetwoMl;

    @Size(max = 2500)
    @JsonProperty("permntOthrIndiaprovinceEn")
    private String permntOthrIndiaprovinceEn;

    @Size(max = 2500)
    @JsonProperty("permntOthrIndiaprovinceMl")
    private String permntOthrIndiaprovinceMl;
    @Size(max = 64)
    @JsonProperty("brideGroomPermanent")
    private String brideGroomPermanent;

    @Size(max = 10)
    @JsonProperty("outSideIndiaPostCodePermanent")
    private String outSideIndiaPostCodePermanent;

    //Jasmine 03.05.2023

    @JsonProperty("permanentAddrCountryNameEn")
    private String permanentAddrCountryNameEn ;

    @JsonProperty("permanentAddrCountryNameMl")
    private String permanentAddrCountryNameMl ;

    @JsonProperty("presentaddressCountryNameEn")
    private String presentaddressCountryNameEn ;

    @JsonProperty("presentaddressCountryNameMl")
    private String presentaddressCountryNameMl ;

    @JsonProperty("presentOutSideCountryNameEn")
    private String presentOutSideCountryNameEn ;

    @JsonProperty("presentOutSideCountryNameMl")
    private String presentOutSideCountryNameMl ;

    @JsonProperty("permanentOutSideCountryNameEn")
    private String permanentOutSideCountryNameEn ;

    @JsonProperty("permanentOutSideCountryNameMl")
    private String permanentOutSideCountryNameMl ;

    @JsonProperty("presentaddressStateNameEn")
    private String presentaddressStateNameEn;

    @JsonProperty("presentaddressStateNameMl")
    private String presentaddressStateNameMl;

    @JsonProperty("permtaddressStateNameEn")
    private String permtaddressStateNameEn;

    @JsonProperty("permtaddressStateNameMl")
    private String permtaddressStateNameMl;

    @JsonProperty("presentInsideKeralaDistrictEn")
    private String presentInsideKeralaDistrictEn;

    @JsonProperty("presentInsideKeralaDistrictMl")
    private String presentInsideKeralaDistrictMl;

    @JsonProperty("presentOutsideKeralaDistrictEn")
    private String presentOutsideKeralaDistrictEn;

    @JsonProperty("presentOutsideKeralaDistrictMl")
    private String presentOutsideKeralaDistrictMl;

    @JsonProperty("permntInKeralaAdrDistrictEn")
    private String permntInKeralaAdrDistrictEn;

    @JsonProperty("permntInKeralaAdrDistrictMl")
    private String permntInKeralaAdrDistrictMl;

    @JsonProperty("permntOutsideKeralaDistrictEn")
    private String permntOutsideKeralaDistrictEn;

    @JsonProperty("permntOutsideKeralaDistrictMl")
    private String permntOutsideKeralaDistrictMl;

    @JsonProperty("presentInsideKeralaTalukEn")
    private String presentInsideKeralaTalukEn;

    @JsonProperty("presentInsideKeralaTalukMl")
    private String presentInsideKeralaTalukMl;

    @JsonProperty("presentOutsideKeralaTalukEn")
    private String presentOutsideKeralaTalukEn;

    @JsonProperty("presentOutsideKeralaTalukMl")
    private String presentOutsideKeralaTalukMl;

    @JsonProperty("permntInKeralaAdrTalukEn")
    private String permntInKeralaAdrTalukEn;

    @JsonProperty("permntInKeralaAdrTalukMl")
    private String permntInKeralaAdrTalukMl;

    @JsonProperty("permntOutsideKeralaTalukEn")
    private String permntOutsideKeralaTalukEn;

    @JsonProperty("permntOutsideKeralaTalukMl")
    private String permntOutsideKeralaTalukMl;

    @JsonProperty("presentInsideKeralaVillageEn")
    private String presentInsideKeralaVillageEn;

    @JsonProperty("presentInsideKeralaVillageMl")
    private String presentInsideKeralaVillageMl;

    @JsonProperty("presentOutsideKeralaVillageEn")
    private String presentOutsideKeralaVillageEn;

    @JsonProperty("presentOutsideKeralaVillageMl")
    private String presentOutsideKeralaVillageMl;

    @JsonProperty("permntInKeralaAdrVillageEn")
    private String permntInKeralaAdrVillageEn;

    @JsonProperty("permntInKeralaAdrVillageMl")
    private String permntInKeralaAdrVillageMl;

    @JsonProperty("permntOutsideKeralaVillageEn")
    private String permntOutsideKeralaVillageEn;

    @JsonProperty("permntOutsideKeralaVillageMl")
    private String permntOutsideKeralaVillageMl;

    @JsonProperty("presentInsideKeralaPostOfficeEn")
    private String presentInsideKeralaPostOfficeEn;

    @JsonProperty("presentInsideKeralaPostOfficeMl")
    private String presentInsideKeralaPostOfficeMl;

    @JsonProperty("permntInKeralaAdrPostOfficeEn")
    private String permntInKeralaAdrPostOfficeEn;

    @JsonProperty("permntInKeralaAdrPostOfficeMl")
    private String permntInKeralaAdrPostOfficeMl;

    @JsonProperty("presentWardNoEn")
    private String presentWardNoEn;

    @JsonProperty("presentWardNoMl")
    private String presentWardNoMl;

    @JsonProperty("prmttWardNoEn")
    private String prmttWardNoEn;

    @JsonProperty("prmttWardNoMl")
    private String prmttWardNoMl;

    @JsonProperty("presentInsideKeralaLBNameEn")
    private String presentInsideKeralaLBNameEn;

    @JsonProperty("presentInsideKeralaLBNameMl")
    private String presentInsideKeralaLBNameMl;

    @JsonProperty("presentAddrVillageId")
    private String presentAddrVillageId ;

}
