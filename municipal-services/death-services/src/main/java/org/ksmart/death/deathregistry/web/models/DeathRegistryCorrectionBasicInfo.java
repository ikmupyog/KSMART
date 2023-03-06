package org.ksmart.death.deathregistry.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;
@Schema(name = "Death Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
/*
     * Creates Correction model class  
     * Jasmine on 04.03.2023      
*/

public class DeathRegistryCorrectionBasicInfo {

    @Schema(type = "string", format = "uuid", description = "death registration request id")
    @Size(max = 64)
    @JsonProperty("Id")
    private String id;

    @Schema(type = "string", description = "Home / Hospital kiosk/ front office")
    @Size(max = 64)
    @JsonProperty("RegistrationUnit")
    private String registrationUnit;

    @Schema(type = "string", description = "Tenant identification number")
    @Size(max = 64)
    @JsonProperty("TenantId")
    private String tenantId ;

    @Schema(type = "Boolean", description= " " )
    @JsonProperty("DeceasedAadharNotAvailable")
    private Boolean deceasedAadharNotAvailable  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeceasedAadharNumber")
    private String  deceasedAadharNumber ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeceasedFirstNameEn")
    private String  deceasedFirstNameEn ;


    @Schema(type = "string", description= " " )
    @JsonProperty("DeceasedMiddleNameEn")
    private String deceasedMiddleNameEn  ;


    @Schema(type = "string", description= " " )
    @JsonProperty("DeceasedLastNameEn")
    private String  deceasedLastNameEn ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeceasedFirstNameMl")
    private String deceasedFirstNameMl  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeceasedMiddleNameMl")
    private String deceasedMiddleNameMl  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeceasedLastNameMl")
    private String deceasedLastNameMl  ;

    @Schema(type = "boolean", description="1 for Yes /0 for No")
    @JsonProperty("DeathDateUnavailable")
    private boolean deathDateUnavailable ;

    @Schema(type = "Long",description = "Death date (If death date is not known enter the from date)")
    @JsonProperty("DateOfDeath")
    private Long dateOfDeath ;

    @Schema(type = "string", description= "time of death" )
    @JsonProperty("TimeOfDeath")
    private Integer  timeOfDeath ;

    @Schema(type = "string", description= "am/pm" )
    @Size(max = 64)
    @JsonProperty("TimeOfDeathUnit")
    private String timeOfDeathUnit ;

    @Schema(type = "long",description = "If death date is not known enter the todate" )
    @JsonProperty("DateOfDeath1")
    private Long dateOfDeath1;

    @Schema(type = "string", description= "time of death" )
    @JsonProperty("timeOfDeath1")
    private Integer timeOfDeath1 ;

    @Schema(type = "string", description= "AM/PM" )
    @Size(max = 64)
    @JsonProperty("timeOfDeathUnit1")
    private String timeOfDeathUnit1 ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeceasedGender")
    private String  deceasedGender ;

    @JsonProperty("MotherNameEn")
    private String motherNameEn;
    
    @JsonProperty("MotherNameMl")
    private String motherNameMl;

    @JsonProperty("FatherNameEn")
    private String fatherNameEn ;

    @JsonProperty("FatherNameMl")
    private String fatherNameMl ;

    @JsonProperty("SpouseNameEn")
    private String spouseNameEn ;

    @JsonProperty("SpouseNameML")
    private String spouseNameML ;

    @Size(max = 64)
    @JsonProperty("DeathACKNoOld")
    private String deathACKNoOld = null;

    @Size(max = 64)
    @JsonProperty("DeathACKNo")
    private String deathACKNo = null;

    
    @Schema(type = "Integer", description= "ack no id" )
    @JsonProperty("ackNoID")
    private Long  ackNoID ;

    @Schema(type = "Long",description = "Death Application Date  ")
    @JsonProperty("ApplicationDate")
    private Long applicationDate ;

    @Size(max = 64)
    @JsonProperty("RegistrationNo")
    private String  registrationNo ;

    //DeathPlace 

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlace")
    private String  deathPlace ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceType")
    private String  deathPlaceType ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceInstId")
    private String  deathPlaceInstId ;

    @Schema(type = "string", description= " " )
    @JsonProperty("VehicleNumber")
    private String  vehicleNumber ;

    @Schema(type = "string", description= " " )
    @JsonProperty("VehicleFromplaceEn")
    private String  vehicleFromplaceEn ;

    @Schema(type = "string", description= " " )
    @JsonProperty("VehicleFromplaceMl")
    private String  vehicleFromplaceMl ;

    @Schema(type = "string", description= " " )
    @JsonProperty("VehicleToPlaceEn")
    private String  vehicleToPlaceEn ;

    @Schema(type = "string", description= " " )
    @JsonProperty("VehicleToPlaceMl")
    private String  vehicleToPlaceMl ;

    @Schema(type = "string", description= " " )
    @JsonProperty("VehicleFirstHaltEn")
    private String  vehicleFirstHaltEn ;

    @Schema(type = "string", description= " " )
    @JsonProperty("VehicleFirstHaltMl")
    private String  vehicleFirstHaltMl ;

    @Schema(type = "string", description= " " )
    @JsonProperty("VehicleHospitalEn")
    private String  vehicleHospitalEn ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceCountry")
    private String  deathPlaceCountry ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceState")
    private String  deathPlaceState ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceDistrict")
    private String  deathPlaceDistrict ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceCity")
    private String  deathPlaceCity ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceRemarksEn")
    private String  deathPlaceRemarksEn ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceRemarksMl")
    private String  deathPlaceRemarksMl ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceWardId")
    private String  deathPlaceWardId ;

    @Schema(type = "string", description= " " )
    @JsonProperty("PlaceOfBurialEn")
    private String placeOfBurialEn  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("PlaceOfBurialMl")
    private String  placeOfBurialMl ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceLocalityEn")
    private String  deathPlaceLocalityEn ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceLocalityMl")
    private String  deathPlaceLocalityMl ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceStreetEn")
    private String  deathPlaceStreetEn ;
    
    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceStreetMl")
    private String  deathPlaceStreetMl ;

    @Schema(type = "string", description= " " )
    @JsonProperty("GeneralRemarks")
    private String  generalRemarks ;

      //HOME
    


    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeWardId")
    private String deathPlaceHomeWardId  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomePostofficeId")
    private String deathPlaceHomePostofficeId  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomePincode")
    private String deathPlaceHomePincode  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeLocalityEn")
    private String deathPlaceHomeLocalityEn  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeLocalityMl")
    private String deathPlaceHomeLocalityMl  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeStreetNameEn")
    private String deathPlaceHomeStreetNameEn  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeStreetNameMl")
    private String deathPlaceHomeStreetNameMl  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeHosueNameEn")
    private String deathPlaceHomeHouseNameEn  ;

    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeHosueNameMl")
    private String deathPlaceHomeHouseNameMl  ;

    @JsonProperty("DocumentId")
    private String documentId ;

    @JsonProperty("DocumentDeathDtlId")
    private String documentDeathDtlId ;

    @JsonProperty("DocumentTenantId")
    private String documentTenantId ;

    @JsonProperty("DocumentAckNo")
    private String documentAckNo ;

    @JsonProperty("DocumentType")
    private String documentType ;

    @JsonProperty("DocumentUserType")
    private String documentUserType ;

    @JsonProperty("DocumentFileStoreId")
    private String documentFileStoreId ;

    
    @JsonProperty("funcionUID")
    private String funcionUID;


    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHospitalNameEn")
    private String  deathPlaceHospitalNameEn ;
 
    @Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHospitalNameMl")
    private String  deathPlaceHospitalNameMl ;


}
