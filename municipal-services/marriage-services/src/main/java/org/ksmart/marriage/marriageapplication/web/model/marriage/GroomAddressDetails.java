package org.ksmart.marriage.marriageapplication.web.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.ksmart.marriage.utils.MarriageConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroomAddressDetails {

    @Schema(type = "string", description = "Present country")
    @NotBlank(message = "GROOM ADDRESS :Present country is required")
    @Size(max = 64, message = "GROOM ADDRESS: Present country length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present country")
    @JsonProperty("presentaddressCountry")
    private String presentaddressCountry;

    @Schema(type = "string", description = "Present State")
    @Size(max = 64, message = "GROOM ADDRESS: Present state length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present state")
    @JsonProperty("presentaddressStateName")
    private String presentaddressStateName;

    @Schema(type = "string", description = "Localbody Name")
    @Size(max = 64, message = "GROOM ADDRESS:Present LB length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present LB")
    @JsonProperty("presentInsideKeralaLBName")
    private String presentInsideKeralaLBName;

    @Schema(type = "string", description = "District")
    @Size(max = 64, message = "GROOM ADDRESS:Present district length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present district")
    @JsonProperty("presentInsideKeralaDistrict")
    private String presentInsideKeralaDistrict;

    @Schema(type = "string", description = "Taluk Name")
    @Size(max = 64, message = "GROOM ADDRESS:Present Taluk length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Taluk")
    @JsonProperty("presentInsideKeralaTaluk")
    private String presentInsideKeralaTaluk;

    @Schema(type = "string", description ="Village Name")
    @Size(max = 64, message = "GROOM ADDRESS:Present village length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present LB")
    @JsonProperty("presentInsideKeralaVillage")
    private String presentInsideKeralaVillage;

    @Schema(type = "string", description = "Locality Name")
    @Size(max = 1000, message = "GROOM ADDRESS:Present Locality length cannot exceed 1000 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Locality")
    @JsonProperty("presentInsideKeralaLocalityNameEn")
    private String presentInsideKeralaLocalityNameEn;

    @Schema(type = "string", description = "Street Name")
    @Size(max = 2000, message = "GROOM ADDRESS:Present street name length cannot exceed 2000 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present street name")
    @JsonProperty("presentInsideKeralaStreetNameEn")
    private String presentInsideKeralaStreetNameEn;

    @Schema(type = "string", description = "House Name")
    @Size(max = 2500, message = "GROOM ADDRESS:Present House Name length cannot exceed 2500 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present House Name")
    @JsonProperty("presentInsideKeralaHouseNameEn")
    private String presentInsideKeralaHouseNameEn;

    @Schema(type = "string", description = "Locality Name in malayalam")
    @Size(max = 1000)//, message = "GROOM ADDRESS:Invalid Present Locality Name in malayalam length cannot exceed 1000 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present Locality Name in malayalam")
    @JsonProperty("presentInsideKeralaLocalityNameMl")
    private String presentInsideKeralaLocalityNameMl;

    @Schema(type = "string", description = "Street Name in malayalam")
    @Size(max = 2000)//, message = "GROOM ADDRESS:Street Name in malayalam length cannot exceed 2000 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present Street Name in malayalam")
    @JsonProperty("presentInsideKeralaStreetNameMl")
    private String presentInsideKeralaStreetNameMl;

    @Schema(type = "string", description = "House Name in malayalam")
    @Size(max = 2500 )//, message = "GROOM ADDRESS:Invalid Present House Name in malayalam")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present House Name in malayalam")
    @JsonProperty("presentInsideKeralaHouseNameMl")
    private String presentInsideKeralaHouseNameMl;

    @Schema(type = "string", description = "Pincode")
    @Size(min = 6, max = 6, message = "Invalid pincode")
    @Pattern(regexp = MarriageConstants.PATTERN_PINCODE, message = "Invalid pincode")
    @JsonProperty("presentInsideKeralaPincode")
    private String presentInsideKeralaPincode;

    @Schema(type = "string", description = "PostOffice Name")
    @Size(max = 64, message = "GROOM ADDRESS:Present Postoffice Name length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Postoffice Name")
    @JsonProperty("presentInsideKeralaPostOffice")
    private String presentInsideKeralaPostOffice;

    @Schema(type = "string", description = "Ward Number")
    @Size(max = 64, message = "GROOM ADDRESS:Invalid Present Ward Number length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Ward Number")
    @JsonProperty("presentWardNo")
    private String presentWardNo;

    @Schema(type = "string", description = "Outside Kerala District")
    @Size(max = 64, message = "GROOM ADDRESS:Outside Kerala District length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside Kerala District")
    @JsonProperty("presentOutsideKeralaDistrict")
    private String presentOutsideKeralaDistrict;

    @Schema(type = "string", description = "Outside Kerala Taluk")
    @Size(max = 250, message = "GROOM ADDRESS:Outside Kerala Taluk length cannot exceed 250 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside Kerala Taluk")
    @JsonProperty("presentOutsideKeralaTaluk")
    private String presentOutsideKeralaTalukName;

    @Schema(type = "string", description = "Outside Kerala Village/Town")
    @Size(max = 64, message = "GROOM ADDRESS:Outside Kerala Village/Town length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside Kerala Village/Town")
    @JsonProperty("presentOutsideKeralaVillage")
    private String presentOutsideKeralaVillageorTown;

    @Schema(type = "string", description = "Outside Kerala Village Name")
    @Size(max = 250, message = "GROOM ADDRESS:Outside Kerala Village name length cannot exceed 250 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside Kerala Village Name")
    @JsonProperty("presentOutsideKeralaCityVilgeEn")
    private String presentOutsideKeralaCityVilgeNameEn;

    @Schema(type = "string", description = "Pincode")
    @Size(min = 6, max = 6, message = "Invalid pincode")
    @Pattern(regexp = MarriageConstants.PATTERN_PINCODE, message = "Invalid pincode")
    @JsonProperty("presentOutsideKeralaPincode")
    private String presentOutsideKeralaPincode;

    @Schema(type = "string", description = "Outside Kerala Postoffice Name")
    @Size(max = 64, message = "GROOM ADDRESS:Outside Kerala Postoffice name length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside Kerala Postoffice Name")
    @JsonProperty("presentOutsideKeralaPostOfficeEn")
    private String presentOutsideKeralaPostOfficeEn;

    @Schema(type = "string", description = "Outside Kerala Postoffice Name in malayalam")
    @Size(max = 64)//, message = "GROOM ADDRESS:"Invalid Present LB")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present Outside Kerala Postoffice Name in malayalam")
    @JsonProperty("presentOutsideKeralaPostOfficeMl")
    private String presentOutsideKeralaPostOfficeMl;

    @Schema(type = "string", description = "Outside Kerala Locality Name")
    @Size(max = 1000, message = "GROOM ADDRESS:Outside Kerala Locality name length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside Kerala Locality Name")
    @JsonProperty("presentOutsideKeralaLocalityNameEn")
    private String presentOutsideKeralaLocalityNameEn;

    @Schema(type = "string", description = "Outside Kerala Street Name")
    @Size(max = 64, message = "GROOM ADDRESS:Outside Kerala street name length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside Kerala Street Name")
    @JsonProperty("presentOutsideKeralaStreetNameEn")
    private String presentOutsideKeralaStreetNameEn;

    @Schema(type = "string", description = "Outside Kerala House Name")
    @Size(max = 2500, message = "GROOM ADDRESS:Outside Kerala House Name length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside Kerala House Name")
    @JsonProperty("presentOutsideKeralaHouseNameEn")
    private String presentOutsideKeralaHouseNameEn;

    @Size(max = 1000)
    @Schema(type = "string", description = "Outside Kerala locality in malayalam")
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Outside Kerala locality in malayalam")
    @JsonProperty("presentOutsideKeralaLocalityNameMl")
    private String presentOutsideKeralaLocalityNameMl;

    @Schema(type = "string", description = "Outside Kerala StreetName in malayalam")
    @Size(max = 2000)
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present Outside Kerala StreetName in malayalam")
    @JsonProperty("presentOutsideKeralaStreetNameMl")
    private String presentOutsideKeralaStreetNameMl;

    @Schema(type = "string", description = "Outside Kerala Housename in malayalam")
    @Size(max = 2500)
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present Outside Kerala Housename in malayalam")
    @JsonProperty("presentOutsideKeralaHouseNameMl")
    private String presentOutsideKeralaHouseNameMl;

    @Schema(type = "string", description = "Outside India Address-1")
    @Size(max = 2500, message = "GROOM ADDRESS:Present Outside India Address-1 cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside India Address-1")
    @JsonProperty("presentOutSideIndiaAdressEn")
    private String presentOutSideIndiaAdressEn;

    @Schema(type = "string", description = "Outside India Address-2 in malayalam")
    @Size(max = 2500)
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present Outside India Address-2 in malayalam")
    @JsonProperty("presentOutSideIndiaAdressMl")
    private String presentOutSideIndiaAdressMl;

    @Schema(type = "string", description = "Outside India Address-2")
    @Size(max = 2500, message = "GROOM ADDRESS:Present Outside India Address-2 cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside India Address-2")
    @JsonProperty("presentOutSideIndiaAdressEnB")
    private String presentOutSideIndiaAdressEnB;

    @Schema(type = "string", description = "Outside India Address-2 in malayalam")
    @Size(max = 2500)
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present Outside India Address-2 in malayalam")
    @JsonProperty("presentOutSideIndiaAdressMlB")
    private String presentOutSideIndiaAdressMlB;


    @Schema(type = "string", description = "Province")
    @Size(max = 2500, message = "GROOM ADDRESS:Present Province  cannot exceed 2500 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Province")
    @JsonProperty("presentOutSideIndiaProvinceEn")
    private String presentOutSideIndiaProvinceEn;

    @Schema(type = "string", description = "Outside India Locality in malayalam")
    @Size(max = 1000)
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Present Outside India Locality")
    @JsonProperty("presentOutSideIndiaLocalityMl")
    private String presentOutSideIndiaLocalityMl;

    @Schema(type = "string", description = "Province in Malayalam")
    @Size(max = 2500)
    @Pattern(regexp = MarriageConstants.PATTERN_NAME_ML, message = "GROOM ADDRESS:Invalid Province in Malayalam ")
    @JsonProperty("presentOutSideIndiaProvinceMl")
    private String presentOutSideIndiaProvinceMl;

    @Size(max = 64)
    @JsonProperty("presentOutSideCountry")
    private String presentOutSideCountry;

    @Schema(type = "string", description = "Outside India Village Name")
    @Size(max = 1000, message = "GROOM ADDRESS: Present Outside India Village Name cannot exceed 1000 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside India Village Name")
    @JsonProperty("presentOutSideIndiaadrsVillage")
    private String presentOutSideIndiaadrsVillage;

    @Schema(type = "string", description = "OutsideIndia City/Town")
    @Size(max = 64, message = "GROOM ADDRESS: Present OutsideIndia City/Town cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present OutsideIndia City/Town")
    @JsonProperty("presentOutSideIndiaadrsCityTown")
    private String presentOutSideIndiaadrsCityTown;

    @Schema(type = "string", description = "Outside India PostalCode")
    @Size(max = 10, message = "GROOM ADDRESS:Present Outside India PostalCode cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH, message = "GROOM ADDRESS:Invalid Present Outside India PostalCode")
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

    @JsonProperty("presentAddrVillageId")
    private String presentAddrVillageId ;
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
    private String permntOutsideKeralaCityVilgeEn;

    @Size(max = 64)
    @JsonProperty("permntInKeralaAdrTaluk")
    private String permntInKeralaAdrTaluk;

    @Size(max = 64)
    @JsonProperty("permntInKeralaAdrVillage")
    private String permntInKeralaAdrVillage;

    @Size(max = 2500)
    @JsonProperty("permntOutSideIndiaprovinceMl")
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



    ////Db Fields//////

    @Size(max = 64)
    @JsonProperty("permanentUuid")
    private String permanentUuid;

    // @JsonProperty("isPermanentAddressInt")
    // private Integer isPermanentAddressInt;

    @JsonProperty("permanentAddrTalukId")
    private String permanentAddrTalukId ;


    @JsonProperty("permanentAddrVillageId")
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

    // @JsonProperty("presentOutSideCountryNameEn")
    // private String presentOutSideCountryNameEn ;

    // @JsonProperty("presentOutSideCountryNameMl")
    // private String presentOutSideCountryNameMl ;

    // @JsonProperty("permanentOutSideCountryNameEn")
    // private String permanentOutSideCountryNameEn ;

    // @JsonProperty("permanentOutSideCountryNameMl")
    // private String permanentOutSideCountryNameMl ;

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

//    @JsonProperty("permntOutsideKeralaTalukEn")
//    private String permntOutsideKeralaTalukEn;
//
//    @JsonProperty("permntOutsideKeralaTalukMl")
//    private String permntOutsideKeralaTalukMl;

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

    @JsonProperty("permntInKeralaAdrLBNameEn")
    private String permntInKeralaAdrLBNameEn;

    @JsonProperty("permntInKeralaAdrLBNameMl")
    private String permntInKeralaAdrLBNameMl;
}
