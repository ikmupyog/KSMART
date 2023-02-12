package org.ksmart.death.deathregistry.web.models;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AllArgsConstructor;
import lombok.Builder;
 import javax.validation.constraints.Size;


    @Validated
    @Getter
    @Setter
    @ToString
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
public class DeathRegistryAddressInfo {

    @Size(max = 64)
    @JsonProperty("PresentAddrId")
    private String presentAddrId ;

    @JsonProperty("PresentAddrDeathDtlId")
    private String presentAddrDeathDtlId ;

    @JsonProperty("PresentAddrTenantId")
    private String presentAddrTenantId ;

    @JsonProperty("PresentAddrTypeId")
    private String presentAddrTypeId ;

    @JsonProperty("PresentAddrLocationType")
    private String presentAddrLocationType ;

    @JsonProperty("PresentAddrCountryId")
    private String presentAddrCountryId ;

    @JsonProperty("PresentAddrStateId")
    private String presentAddrStateId ;

    @JsonProperty("PresentAddrDistrictId")
    private String presentAddrDistrictId;

    @JsonProperty("PresentAddrTalukId")
    private String presentAddrTalukId ;

    @JsonProperty("PresentAddrVillageId")
    private String presentAddrVillageId ;

    @JsonProperty("PresentAddrLbType")
    private String presentAddrLbType ;

    @JsonProperty("PresentAddrWardId")
    private String presentAddrWardId ;

    @JsonProperty("PresentAddrPostofficeId")
    private String presentAddrPostofficeId ;

    @JsonProperty("PresentAddrPincode")
    private Long presentAddrPincode ;

    @JsonProperty("PresentAddrLocalityEn")
    private String presentAddrLocalityEn ;

    @JsonProperty("PresentAddrLocalityMl")
    private String presentAddrLocalityMl ;

    @JsonProperty("PresentAddrStreetNameEn")
    private String presentAddrStreetNameEn ;

    @JsonProperty("PresentAddrStreetNameMl")
    private String presentAddrStreetNameMl ;

    @JsonProperty("PresentAddrHoueNameEn")
    private String presentAddrHoueNameEn ;

    @JsonProperty("PresentAddrHoueNameMl")
    private String presentAddrHoueNameMl ;

    @JsonProperty("PresentAddrPostalCode")
    private String presentAddrPostalCode ;

    @JsonProperty("PermanentAddrId")
    private String permanentAddrId ;

    @JsonProperty("PermanentAddrDeathDtlId")
    private String permanentAddrDeathDtlId ;

    @JsonProperty("PermanentAddrTenantId")
    private String permanentAddrTenantId ;

    @JsonProperty("PermanentAddrTypeId")
    private String permanentAddrTypeId ;

    @JsonProperty("PermanentAddrLocationType")
    private String permanentAddrLocationType ;

    @JsonProperty("PermanentAddrCountryId")
    private String permanentAddrCountryId ;

    @JsonProperty("PermanentAddrStateId")
    private String permanentAddrStateId ;

    @JsonProperty("PermanentAddrDistrictId")
    private String permanentAddrDistrictId ;

    @JsonProperty("PermanentAddrTalukId")
    private String permanentAddrTalukId ;

    @JsonProperty("PermanentAddrVillageId")
    private String permanentAddrVillageId ;

    @JsonProperty("PermanentAddrLbType")
    private String permanentAddrLbType ;

    @JsonProperty("PermanentAddrWardId")
    private String permanentAddrWardId ;

    @JsonProperty("PermanentAddrPostofficeId")
    private String permanentAddrPostofficeId ;

    @JsonProperty("PermanentAddrPincode")
    private Long permanentAddrPincode ;

    @JsonProperty("PermanentAddrLocalityEn")
    private String permanentAddrLocalityEn ;

    @JsonProperty("PermanentAddrLocalityMl")
    private String permanentAddrLocalityMl ;

    @JsonProperty("PermanentAddrStreetNameEn")
    private String permanentAddrStreetNameEn ;

    @JsonProperty("PermanentAddrStreetNameMl")
    private String permanentAddrStreetNameMl ;

    @JsonProperty("PermanentAddrHoueNameEn")
    private String permanentAddrHoueNameEn ;

    @JsonProperty("PermanentAddrHoueNameMl")
    private String permanentAddrHoueNameMl ;

    @JsonProperty("PermanentAddrPostalCode")
    private String permanentAddrPostalCode ;

    
     //RAkhi S on 11.02.2023
    @JsonProperty("PresentAddrTalukNameEn")
    private String presentAddrTalukNameEn ;

    @JsonProperty("PresentAddrTalukNameMl")
    private String presentAddrTalukNameMl ;

    @JsonProperty("PresentAddrVillageNameEn")
    private String presentAddrVillageNameEn ;

    @JsonProperty("PresentAddrVillageNameMl")
    private String presentAddrVillageNameMl ;

    @JsonProperty("PresentAddrPostofficeNameEn")
    private String presentAddrPostofficeNameEn ;

    @JsonProperty("PresentAddrPostofficeNameMl")
    private String presentAddrPostofficeNameMl ;
 
    private String presentAddrDistrictMl;

    private String presentAddrStateMl;

    private String presentAddrcountryMl;

    @JsonProperty("PermanentAddrTalukNameEn")
    private String permanentAddrTalukNameEn ;

    @JsonProperty("PermanentAddrTalukNameMl")
    private String permanentAddrTalukNameMl ;

    @JsonProperty("PermanentAddrVillageNameEn")
    private String permanentAddrVillageNameEn ;

    @JsonProperty("PermanentAddrVillageNameMl")
    private String permanentAddrVillageNameMl ;

    @JsonProperty("PermanentAddrPostofficeNameEn")
    private String permanentAddrPostofficeNameEn ;

    @JsonProperty("PermanentAddrPostofficeNameMl")
    private String permanentAddrPostofficeNameMl ;
 
    private String permanentAddrDistrictMl;

    private String permanentAddrStateMl;

    private String permanentAddrcountryMl;

    @JsonProperty("PresentAddrResidenceAsscNo")
    private String presentAddrResidenceAsscNo ;

    @JsonProperty("PermanentAddrResidenceAsscNo")
    private String permanentAddrResidenceAsscNo ;
    

    @JsonProperty("PresentAddrHouseNo")
    private String presentAddrHouseNo ;

    @JsonProperty("PermanentAddrHouseNo")
    private String permanentAddrHouseNo ;
    
    @JsonProperty("PresentAddrCityEn")
    private String presentAddrCityEn ;

    @JsonProperty("PermanentAddrCityEn")
    private String permanentAddrCityEn;

    @JsonProperty("PresentAddrCityMl")
    private String presentAddrCityMl ;

    @JsonProperty("PermanentAddrCityMl")
    private String permanentAddrCityMl;
    
}
