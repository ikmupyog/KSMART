package org.ksmart.death.crdeathregistry.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
// import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
     * Creates main model class 
     * Rakhi S IKM
     * on 28.11.2022
     */

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CrDeathRegistryDtl {
    
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Size(max = 64)
    @JsonProperty("registrationUnit")
    private String registrationUnit;

    @Size(max = 64)
    @JsonProperty("tenantId")
    private String tenantId ;

    @JsonProperty("deathDateUnavailable")
    private Integer deathDateUnavailable ;

    @JsonProperty("dateOfDeath")
    private Long dateOfDeath ;

    @JsonProperty("timeOfDeath")
    private Integer  timeOfDeath ;

    @Size(max = 64)
    @JsonProperty("timeOfDeathUnit")
    private String timeOfDeathUnit ;

    @JsonProperty("dateOfDeath1")
    private Long dateOfDeath1;

    @JsonProperty("timeOfDeath1")
    private Integer timeOfDeath1 ;

    @Size(max = 64)
    @JsonProperty("timeOfDeathUnit1")
    private String timeOfDeathUnit1 ;

    @JsonProperty("deceasedUnIdentified")
    private Integer deceasedUnIdentified ;

    @Size(max = 64)
    @JsonProperty("deceasedTitle")
    private String deceasedTitle ;

    @Size(max = 64)
    @JsonProperty("deceasedFirstNameEn")
    private String deceasedFirstNameEn ;

    @Size(max = 64)
    @JsonProperty("deceasedFirstNameMl")
    private String deceasedFirstNameMl ;

    @Size(max = 64)
    @JsonProperty("deceasedMiddleNameEn")
    private String deceasedMiddleNameEn ;

    @Size(max = 64)
    @JsonProperty("deceasedMiddleNameMl")
    private String deceasedMiddleNameMl ;

    @Size(max = 64)
    @JsonProperty("deceasedLastNameEn")
    private String deceasedLastNameEn ;

    @Size(max = 64)
    @JsonProperty("deceasedLastNameMl")
    private String deceasedLastNameMl ;

    // @JsonProperty("deceasedAadharSubmitted")
    // private Integer deceasedAadharSubmitted ;

    @Size(max = 12)
    @JsonProperty("deceasedAadharNumber")
    private String deceasedAadharNumber ;

    @Size(max = 64)
    @JsonProperty("deceasedGender")
    private String deceasedGender ;

    @JsonProperty("age")
    private Integer age ;

    @Size(max = 64)
    @JsonProperty("ageUnit")
    private String ageUnit ;

    @JsonProperty("dateOfBirth")
    private Long dateOfBirth ;

    @Size(max = 64)
    @JsonProperty("deathPlace")
    private String deathPlace ;

    @Size(max = 64)
    @JsonProperty("deathPlaceType")
    private String deathPlaceType ;

    @Size(max = 64)
    @JsonProperty("deathPlaceInstId")
    private String deathPlaceInstId ;

    @Size(max = 200)
    @JsonProperty("deathPlaceOfficerName")
    private String deathPlaceOfficerName ;

    @Size(max = 200)
    @JsonProperty("deathPlaceOtherMl")
    private String deathPlaceOtherMl ;

    @Size(max = 200)
    @JsonProperty("deathPlaceOtherEn")
    private String deathPlaceOtherEn ;

    @Size(max = 64)
    @JsonProperty("informantTitle")
    private String  informantTitle ;

    @Size(max = 64)
    @JsonProperty("informantNameEn")
    private String  informantNameEn ;

    @Size(max = 64)
    @JsonProperty("informantNameMl")
    private String  informantNameMl ;

    @JsonProperty("informantAadharSubmitted")
    private Integer  informantAadharSubmitted ;

    @Size(max = 12)
    @JsonProperty("informantAadharNo")
    private String  informantAadharNo ;

    @Size(max = 15)
    @JsonProperty("informantMobileNo")
    private String  informantMobileNo ;

    @Size(max = 500)
    @JsonProperty("generalRemarks")
    private String   generalRemarks ;

    @Size(max = 64)
    @JsonProperty("applicationStatus")
    private String   applicationStatus ;

    
    @JsonProperty("submittedOn")
    private Long  submittedOn ;    

//     @Size(max = 64)
//     @JsonProperty("placeBurial")
//     private String  placeBurial;

//     @Size(max = 64)
//     @JsonProperty("placeBurialInstitutionType")
//     private String   placeBurialInstitutionType ;

//     @Size(max = 200)
//     @JsonProperty("placePurialInstitutionName")
//     private String  placePurialInstitutionName ;

    @Size(max = 64)
    @JsonProperty("registrationNo")
    private String  registrationNo ;

    @Size(max = 64)
    @JsonProperty("ipNo")
    private String  ipNo ;

    @Size(max = 64)
    @JsonProperty("opNo")
    private String  opNo ;

    @Size(max = 64)
    @JsonProperty("maleDependentType")
    private String  maleDependentType ;

    @Size(max = 64)
    @JsonProperty("maleDependentTitle")
    private String  maleDependentTitle ;

    @Size(max = 200)
    @JsonProperty("maleDependentNameEn")
    private String  maleDependentNameEn ;

    @Size(max = 200)
    @JsonProperty("maleDependentNameMl")
    private String  maleDependentNameMl ;

    @Size(max = 12)
    @JsonProperty("maleDependentAadharNo")
    private String  maleDependentAadharNo ;

    @Size(max = 15)
    @JsonProperty("maleDependentMobileNo")
    private String  maleDependentMobileNo ;

    @Size(max = 64)
    @JsonProperty("maleDependentMailId")
    private String  maleDependentMailId ;

    @Size(max = 64)
    @JsonProperty("femaleDependentType")
    private String  femaleDependentType ;

    @Size(max = 64)
    @JsonProperty("femaleDependentTitle")
    private String  femaleDependentTitle ;

    @Size(max = 200)
    @JsonProperty("femaleDependentNameEn")
    private String  femaleDependentNameEn ;
    
    @Size(max = 200)
    @JsonProperty("femaleDependentNameMl")
    private String  femaleDependentNameMl ;

    @Size(max = 12)
    @JsonProperty("femaleDependentAadharNo")
    private String  femaleDependentAadharNo;

    @Size(max = 15)
    @JsonProperty("femaleDependentMobileNo")
    private String  femaleDependentMobileNo ;

    @Size(max = 64)
    @JsonProperty("femaleDependentMailId")
    private String  femaleDependentMailId ;

    @Size(max = 64)
    @JsonProperty("deathApplicationNo")
    private String deathApplicationNo = null;

    @Size(max = 64)
    @JsonProperty("deathACKNo")
    private String deathACKNo = null;

    //Rakhi S on 07.12.2022
    @JsonProperty("isvehicle")
    private Integer  isvehicle ;

    @Size(max = 200)
    @JsonProperty("vehicleHospitalMl")
    private String  vehicleHospitalMl ;

    @Size(max = 200)
    @JsonProperty("vehicleHospitalEn")
    private String  vehicleHospitalEn ;

    @Size(max = 200)
    @JsonProperty("vehicleFromplaceMl")
    private String  vehicleFromplaceMl ;

    @Size(max = 200)
    @JsonProperty("vehicleFromplaceEn")
    private String  vehicleFromplaceEn ;

    @Size(max = 200)
    @JsonProperty("vehicleToPlaceMl")
    private String  vehicleToPlaceMl ;

    @Size(max = 200)
    @JsonProperty("vehicleToPlaceEn")
    private String  vehicleToPlaceEn ;

    @Size(max = 64)
    @JsonProperty("vehicleNumber")
    private String  vehicleNumber ;

    @Size(max = 64)
    @JsonProperty("vehicleDriverLicenceNo")
    private String  vehicleDriverLicenceNo ;

    @JsonProperty("informantAge")
    private Integer  informantAge ;

    @Size(max = 64)
    @JsonProperty("deathPlaceWardId")
    private String  deathPlaceWardId ;

    @Size(max = 64)
    @JsonProperty("deathSignedOfficerDesignation")
    private String  deathSignedOfficerDesignation ;

    @Size(max = 15)
    @JsonProperty("deathSignedOfficerMob")
    private String  deathSignedOfficerMob ;

    @Size(max = 12)
    @JsonProperty("deathSignedOfficerAadhaar")
    private String  deathSignedOfficerAadhaar ;

    // @Size(max = 64)
    // @JsonProperty("deseasedPassportNo")
    // private String  deseasedPassportNo ;

    //Rakhi S on 08.12.2022
    @Size(max = 64)
    @JsonProperty("fileNo")
    private String  fileNo ;

    //Jasmine on 15/12/2022
    @JsonProperty("registrationDate")
    private Long registrationDate ;

    @JsonProperty("registrationNoId")
    private Long registrationNoId ;
    

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;    

    @JsonProperty("statisticalInfo")
    private CrDeathRegistryStatistical statisticalInfo;

    @JsonProperty("addressInfo")
    @Valid
    private CrDeathRegistryAddressInfo  addressInfo;


    //private List<CrDeathRegistryAddressInfo>  addressInfo;

    // public CrDeathRegistryDtl addCrDeathDtl(CrDeathRegistryAddressInfo crDeathAddressInfo) {
    //     if (addressInfo == null) {
    //         addressInfo = new ArrayList<>();
    //     }
    //     addressInfo.add(crDeathAddressInfo);

    //     return this;
    // }

    //RAkhi S on 16.12.2022

    private String embeddedUrl;   

    private String fullName;

    private String motherName;

    private String maledependentname;

    private String gender;

    private String presentAddressFullMl;

    private String presentAddressFullEn;

    private String permanentAddressFullMl;

    private String permanentAddressFullEn;

    private Long registrationdate;

    //RAkhi S on 19.12.2022

    private String localBodyName;

    private Long dateofissue;

    //Jasmine on 04/12/2023
    @Size(max = 64)
    @JsonProperty("deceasedIdproofNo")
    private String  deceasedIdproofNo ;
    
    @Size(max = 64)
    @JsonProperty("deceasedIdproofType")
    private String  deceasedIdproofType ;

    //Jasmine need confirmation
     // @Size(max = 64)
    // @JsonProperty("familyContactMobileNumber")
    // private String familyContactMobileNumber ;

    // @Size(max = 64)
    // @JsonProperty("familyContactEmailId")
    // private String familyContactEmailId ;

    //RAkhi S on 07.01.2023

    private String localBodyNameMl;

    //Jasmine  on 11.01.2023
     @JsonProperty("badRecord")
     private Integer  badRecord ;

         //jasmine 12/01/2023
    @Size(max = 64)
    @JsonProperty("burialState")
    private String  burialState;

    @Size(max = 64)
    @JsonProperty("burialDistrict")
    private String  burialDistrict;

    @Size(max = 64)
    @JsonProperty("burialLBType")
    private String burialLBType;

    @Size(max = 64)
    @JsonProperty("burialState")
    private String  burialLBName;

    @Size(max = 64)
    @JsonProperty("vehicleFirstHalt")
    private String  vehicleFirstHalt;


    @JsonProperty("maleDependentUnavailable")
    private String  maleDependentUnavailable;


    @JsonProperty("femaleDependentUnavailable")
    private String  femaleDependentUnavailable;

    
   
}
