package org.ksmart.death.deathapplication.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
// import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
/*
     * Creates main model class  
     * Jasmine on 4.02.2023      
*/
//@Schema(name = "Death Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathBasicInfo {
    //@Schema(type = "string", format = "uuid", description = "death registration request id")
    @Size(max = 64)
    @JsonProperty("Id")
    private String id;

    //@Schema(type = "string", description = "Home / Hospital kiosk/ front office")
    @Size(max = 64)
    @JsonProperty("RegistrationUnit")
    private String registrationUnit;

    //@Schema(type = "string", description = "Tenant identification number")
    @Size(max = 64)
    @JsonProperty("TenantId")
    private String tenantId ;

    //@Schema(type = "Long",description = "Death date (If death date is not known enter the from date)")
    @JsonProperty("DateOfDeath")
    private Long dateOfDeath ;

    //@Schema(type = "string", description= "time of death" )
    @JsonProperty("TimeOfDeath")
    private Integer  timeOfDeath ;

    //@Schema(type = "string", description= "am/pm" )
    @Size(max = 64)
    @JsonProperty("TimeOfDeathUnit")
    private String timeOfDeathUnit ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlace")
    private String  deathPlace ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceType")
    private String  deathPlaceType ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceInstId")
    private String  deathPlaceInstId ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("VehicleNumber")
    private String  vehicleNumber ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("VehicleFromplaceEn")
    private String  vehicleFromplaceEn ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("VehicleFromplaceMl")
    private String  vehicleFromplaceMl ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("VehicleToPlaceEn")
    private String  vehicleToPlaceEn ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("VehicleToPlaceMl")
    private String  vehicleToPlaceMl ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("VehicleFirstHaltEn")
    private String  vehicleFirstHaltEn ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("VehicleFirstHaltMl")
    private String  vehicleFirstHaltMl ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("VehicleHospitalEn")
    private String  vehicleHospitalEn ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceCountry")
    private String  deathPlaceCountry ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceState")
    private String  deathPlaceState ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceDistrict")
    private String  deathPlaceDistrict ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceCity")
    private String  deathPlaceCity ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceRemarksEn")
    private String  deathPlaceRemarksEn ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceRemarksMl")
    private String  deathPlaceRemarksMl ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceWardId")
    private String  deathPlaceWardId ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("PlaceOfBurialEn")
    private String placeOfBurialEn  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("PlaceOfBurialMl")
    private String  placeOfBurialMl ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceLocalityEn")
    private String  deathPlaceLocalityEn ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceLocalityMl")
    private String  deathPlaceLocalityMl ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceStreetEn")
    private String  deathPlaceStreetEn ;
    
    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceStreetMl")
    private String  deathPlaceStreetMl ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("GeneralRemarks")
    private String  generalRemarks ;
    
    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeId")
    private String deathPlaceHomeId  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathDtlId")
    private String  deathDtlId ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeAddrTypeId")
    private String deathPlaceHomeAddrTypeId  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeCountryId")
    private String  deathPlaceHomeCountryId ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeStateId")
    private String deathPlaceHomeStateId  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeDistrictId")
    private String  deathPlaceHomeDistrictId ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeTalukId")
    private String deathPlaceHomeTalukId   ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeVillageId")
    private String deathPlaceHomeVillageId  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeLbType")
    private String deathPlaceHomeLbType  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeWardId")
    private String deathPlaceHomeWardId  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomePostofficeId")
    private String deathPlaceHomePostofficeId  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomePincode")
    private String deathPlaceHomePincode  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeLocalityEn")
    private String deathPlaceHomeLocalityEn  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeLocalityMl")
    private String deathPlaceHomeLocalityMl  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeStreetNameEn")
    private String deathPlaceHomeStreetNameEn  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeStreetNameMl")
    private String deathPlaceHomeStreetNameMl  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeHoueNameEn")
    private String deathPlaceHomeHoueNameEn  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeathPlaceHomeHoueNameMl")
    private String deathPlaceHomeHoueNameMl  ;

    //@Schema(type = "Boolean", description= " " )
    @JsonProperty("DeceasedAadharNotAvailable")
    private Boolean deceasedAadharNotAvailable  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedAadharNumber")
    private String  deceasedAadharNumber ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedIdproofType")
    private String  deceasedIdproofType ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedIdproofNo")
    private String  deceasedIdproofNo ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedFirstNameEn")
    private String  deceasedFirstNameEn ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedMiddleNameEn")
    private String deceasedMiddleNameEn  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedLastNameEn")
    private String  deceasedLastNameEn ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedFirstNameMl")
    private String deceasedFirstNameMl  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedMiddleNameMl")
    private String deceasedMiddleNameMl  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedLastNameMl")
    private String deceasedLastNameMl  ;

    //@Schema(type = "Integer", description= " " )
    @JsonProperty("Age")
    private Integer age  ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("AgeUnit")
    private String  ageUnit ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("DeceasedGender")
    private String  deceasedGender ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("Nationality")
    private String  nationality ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("Religion")
    private String  religion ;

    //@Schema(type = "string", description= " " )
    @JsonProperty("Occupation")
    private String  occupation ;

    @Size(max = 64)
    @JsonProperty("RegistrationNo")
    private String  registrationNo ;

    @Size(max = 64)
    @JsonProperty("DeathApplicationNo")
    private String deathApplicationNo = null;

    @Size(max = 64)
    @JsonProperty("DeathACKNo")
    private String deathACKNo = null;

    //@Schema(type = "Long",description = "Death registration date ")
    @JsonProperty("RegistrationDate")
    private Long registrationDate ;

    //@Schema(type = "Integer", description= "registration no id" )
    @JsonProperty("registrationNoID")
    private Integer  registrationNoID ;

    //@Schema(type = "Integer", description= "ack no id" )
    @JsonProperty("ackNoID")
    private Long  ackNoID ;

    //@Schema(type = "Long",description = "Death Application Date  ")
    @JsonProperty("ApplicationDate")
    private Long ApplicationDate ;

    @Size(max = 64)
    @JsonProperty("fileNo")
    private String fileNo = null;

    @JsonProperty("auditDetails")
    private AuditDetails  deathAuditDetails;

    @JsonProperty("funcionUID")
    private String funcionUID;


    //Rakhi S on 02.03.2023
   //@Schema(type = "string", description= " " )
   @JsonProperty("DeathPlaceHospitalNameEn")
   private String  deathPlaceHospitalNameEn ;

   //@Schema(type = "string", description= " " )
   @JsonProperty("DeathPlaceHospitalNameMl")
   private String  deathPlaceHospitalNameMl ;

//Rakhi S on 03.03.2023
   @JsonProperty("DeathDateUnavailable")
   private boolean deathDateUnavailable ;

   //@Schema(type = "Long",description = "Death date (If death date is not known enter the to date)")
   @JsonProperty("DateOfDeath1")
   private Long dateOfDeath1 ;

   //@Schema(type = "Integer", description= "time of death")
   @JsonProperty("TimeOfDeath1")
   private Integer  timeOfDeath1 ;

   //@Schema(type = "string", description= "am/pm")
   @Size(max = 64)
   @JsonProperty("TimeOfDeathUnit1")
   private String timeOfDeathUnit1 ;

   //@Schema(type = "Integer", description= "Abandoned body flag")
   @JsonProperty("DeceasedUnIdentified")
   private Integer  deceasedUnIdentified ;

   //@Schema(type = "string", description= "Burial District")
   @JsonProperty("BurialDistrict")
   private String burialDistrict ;

   //@Schema(type = "string", description= "Burial LB Type")
   @JsonProperty("BurialLBType")
   private String burialLBType ;

   //@Schema(type = "string", description= "Burial LB Name")
   @JsonProperty("BurialLBName")
   private String burialLBName ;

   //@Schema(type = "string", description= "Burial LB Ward")
   @JsonProperty("BurialLBWard")
   private String burialLBWard ;

   //@Schema(type = "string", description= "Burial Description")
   @JsonProperty("BurialDescription")
   private String burialDescription ;

   @JsonProperty("DeathPlaceGeoReferenceLocation")
   private String deathPlaceGeoReferenceLocation ;  

   //Details for NAC only Rakhi S on 27.03.2023
   @JsonProperty("SpouseType")
   private String spouseType ;

   @JsonProperty("SpouseNameEn")
   private String spouseNameEn ;

   @JsonProperty("SpouseNameML")
   private String spouseNameML ;

   @JsonProperty("FatherNameEn")
   private String fatherNameEn ;

   @JsonProperty("FatherNameMl")
   private String fatherNameMl ;
   
   @JsonProperty("MotherNameEn")
   private String motherNameEn;   
   
   @JsonProperty("MotherNameMl")
   private String motherNameMl;

   @Size(max = 12)
   @JsonProperty("SpouseAadhaar")
   private String spouseAadhaar;
   
   @Size(max = 12)
   @JsonProperty("FatherAadharNo")
   private String fatherAadharNo;

   @Size(max = 12)
   @JsonProperty("MotherAadharNo")
   private String motherAadharNo;
   
   @JsonProperty("SpouseUnavailable")
   private boolean spouseUnavailable ;

   @JsonProperty("FatherUnavailable")
   private boolean fatherUnavailable ;

   @JsonProperty("MotherUnavailable")
   private boolean motherUnavailable;

   @JsonProperty("DeathPlaceInstitutionNameEn")
   private String  deathPlaceInstitutionNameEn ;

   @JsonProperty("DeathPlaceInstitutionNameMl")
   private String  deathPlaceInstitutionNameMl ;

   private boolean normalRegn ;
   private boolean delayedWithinThirty ;
   private boolean delayedWithinOneyear ;
   private boolean delayedAfterOneyear ;
   
   //new fields from Sruthi 16.04.2023
   
   @JsonProperty("hospitalNameEn")
   private String  hospitalNameEn ;

   @JsonProperty("institution")
   private String  institution ;

   @JsonProperty("vehicleType")
   private String  vehicleType ;

   @JsonProperty("publicPlaceType")
   private String  publicPlaceType ;

   @JsonProperty("isDeathNAC")
   private boolean isDeathNAC ;

   @JsonProperty("isDeathNIA")
   private boolean isDeathNIA ;
}
