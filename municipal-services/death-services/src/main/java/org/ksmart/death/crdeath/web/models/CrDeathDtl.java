package org.ksmart.death.crdeath.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

import javax.swing.text.Document;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.ksmart.death.crdeath.constraints.Html;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;

/**
     * Creates main model class  Rakhi S IKM
     * Updated by Jasmine
     * 
     */
    // @Schema(description = "Applicantion details")
@Schema(name = "CrDeath Registration Request", description = "An Object holds the  data for death registration ")
@Validated

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CrDeathDtl {
    @Schema(type = "string", format = "uuid", description = "death registration request id")
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Home / Hospital kiosk/ front office")
    @Size(max = 64)
    @JsonProperty("registrationUnit")
    private String registrationUnit;

    @Schema(type = "string", description = "Tenant identification number")
    @Size(max = 64)
    @JsonProperty("tenantId")
    private String tenantId ;

    @Schema(type = "integer", description="1 for Yes /0 for No")
    @JsonProperty("correctDeathDateKnown")
    private Integer correctDeathDateKnown ;

    @Schema(type = "Long",description = "Death date (If death date is not known enter the from date)")
    @JsonProperty("dateOfDeath")
    private Long dateOfDeath ;

    @Schema(type = "string", description= "time of death" )
    @JsonProperty("timeOfDeath")
    private Integer  timeOfDeath ;

    @Schema(type = "string", description= "am/pm" )
    @Size(max = 64)
    @JsonProperty("timeOfDeathUnit")
    private String timeOfDeathUnit ;

    @Schema(type = "long",description = "If death date is not known enter the todate" )
    @JsonProperty("dateOfDeath1")
    private Long dateOfDeath1;

    @Schema(type = "string", description= "time of death" )
    @JsonProperty("timeOfDeath1")
    private Integer timeOfDeath1 ;

    @Schema(type = "string", description= "am/pm" )
    @Size(max = 64)
    @JsonProperty("timeOfDeathUnit1")
    private String timeOfDeathUnit1 ;

    @Schema(type = "integer" ,description = "If it is unidentified enter 0 else 1" )
    @JsonProperty("deceasedIdentified")
    private Integer deceasedIdentified ;

    @Schema(type = "String" ,description = "Mr/Mrs/Adv etc" )
    @Size(max = 64)
    @JsonProperty("deceasedTitle")
    private String deceasedTitle ;

    @Schema(type = "String" ,description = "First Name in English" )
    @Size(max = 64)
    @JsonProperty("deceasedFirstNameEn")
    private String deceasedFirstNameEn ;

    @Schema(type = "String" ,description = "First Name in Local Language" )
    @Size(max = 64)
    @JsonProperty("deceasedFirstNameMl")
    private String deceasedFirstNameMl ;

    @Schema(type = "String" ,description = "Middle Name in English" )
    @Size(max = 64)
    @JsonProperty("deceasedMiddleNameEn")
    private String deceasedMiddleNameEn ;

    @Schema(type = "String" ,description = "Middle Name in Local Language" )
    @Size(max = 64)
    @JsonProperty("deceasedMiddleNameMl")
    private String deceasedMiddleNameMl ;

    @Schema(type = "String" ,description = "Last Name in English" )
    @Size(max = 64)
    @JsonProperty("deceasedLastNameEn")
    private String deceasedLastNameEn ;

    @Schema(type = "String" ,description = "Last Name in Local Language" )
    @Size(max = 64)
    @JsonProperty("deceasedLastNameMl")
    private String deceasedLastNameMl ;

    // @JsonProperty("deceasedAadharSubmitted")
    // private Integer deceasedAadharSubmitted ;
    @Schema(type = "String" ,description = "Aadhar Number" )
    @Size(max = 12)
    @JsonProperty("deceasedAadharNumber")
    private String deceasedAadharNumber ;

    @Schema(type = "String" ,description = "Gender")
    @Size(max = 64)
    @JsonProperty("deceasedGender")
    private String deceasedGender ;

    @Schema(type = "String" ,description = "Age")
    @JsonProperty("age")
    private Integer age ;

    @Schema(type = "String" ,description = "Age unit (hrs/days/years")
    @Size(max = 64)
    @JsonProperty("ageUnit")
    private String ageUnit ;

    @Schema(type = "Long" ,description = "Date of birth")
    @JsonProperty("dateOfBirth")
    private Long dateOfBirth ;

    @Schema(type = "Long" ,description = "Place of death from mdms data home/hospital/vehicle etc")
    @Size(max = 64)
    @JsonProperty("deathPlace")
    private String deathPlace ;

    @Schema(type = "Long" ,description = "Place of death from mdms data oldagehome/orphanage etc")
    @Size(max = 64)
    @JsonProperty("deathPlaceType")
    private String deathPlaceType ;

    @Schema(type = "Long" ,description = "Place of death from mdms data hospitalname/orphanageName etc")
    @Size(max = 64)
    @JsonProperty("deathPlaceInstId")
    private String deathPlaceInstId ;

    @Size(max = 200)
    @JsonProperty("deathPlaceOfficeName")
    private String deathPlaceOfficeName ;

    @Size(max = 200)
    @JsonProperty("deathPlaceOtherMl")
    private String deathPlaceOtherMl ;

    @Size(max = 200)
    @JsonProperty("deathPlaceOtherEn")
    private String deathPlaceOtherEn ;

    @Schema(type = "String" ,description = "Title of Informant")
    @Size(max = 64)
    @JsonProperty("informantTitle")
    private String  informantTitle ;

    @Schema(type = "String" ,description = "Informant name in English")
    @Size(max = 64)
    @JsonProperty("informantNameEn")
    private String  informantNameEn ;

    @Schema(type = "String" ,description = "Informant name in Local Language")
    @Size(max = 64)
    @JsonProperty("informantNameMl")
    private String  informantNameMl ;

    @Schema(type = "Integer" ,description = "Informant aadhar submitted(0/1)")
    @JsonProperty("informantAadharSubmitted")
    private Integer  informantAadharSubmitted ;

    @Schema(type = "Integer" ,description = "Informant aadhar ")
    @Size(max = 12)
    @JsonProperty("informantAadharNo")
    private String  informantAadharNo ;

    
    @Schema(type = "Integer" ,description = "Informant Mobile Number")
    @Size(max = 15)
    @JsonProperty("informantMobileNo")
    private String  informantMobileNo ;

    @Size(max = 500)
    @JsonProperty("generalRemarks")
    private String   generalRemarks ;

    @Schema(type = "String" ,description = "applicationStatus-workflow")
    @Size(max = 64)
    @JsonProperty("applicationStatus")
    private String   applicationStatus ;

    @Size(max = 64)
    @JsonProperty("submittedOn")
    private String  submittedOn ;    

    @Size(max = 64)
    @JsonProperty("placeBurial")
    private String  placeBurial;

    @Size(max = 64)
    @JsonProperty("placeBurialInstitutionType")
    private String   placeBurialInstitutionType ;

    @Size(max = 200)
    @JsonProperty("placePurialInstitutionName")
    private String  placePurialInstitutionName ;

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

    //Rakhi S on 02.12.2022
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

    @Size(max = 64)
    @JsonProperty("deseasedPassportNo")
    private String  deseasedPassportNo ;
   
    //Rakhi S on 08.12.2022
    @Size(max = 64)
    @JsonProperty("fileNo")
    private String  fileNo ;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;    

    @JsonProperty("statisticalInfo")
    private CrDeathStatistical statisticalInfo;

    @JsonProperty("addressInfo")
    @Valid
    private CrDeathAddressInfo  addressInfo;

    //  private List<CrDeathAddressInfo>  addressInfo;

    // public CrDeathDtl addCrDeathDtl(CrDeathAddressInfo crDeathAddressInfo) {
    //     if (addressInfo == null) {
    //         addressInfo = new ArrayList<>();
    //     }
    //     addressInfo.add(crDeathAddressInfo);

    //     return this;
    // }
    @JsonProperty("registrationDate")
    private Long registrationDate ;

    @JsonProperty("registrationNoId")
    private Long registrationNoId ;
    
   //@Schema(type = "string", description = "Workflow code")
    @Size(max = 64)
   // @NotNull
    @JsonProperty("workflowCode")
    private String workflowCode;

    //@Schema(type = "string", description = "Workflow action")
    @Size(max = 64)
    @JsonProperty("action")
    private String action;

    //@Schema(type = "string", description = "Status of file")
    // @Size(max = 64)
    // @JsonProperty("fileStatus")
    // private String fileStatus;

   // @Schema(type = "string", description = "Business service")
    @Size(max = 64)
    @JsonProperty("businessService")
    private String businessService;

    @JsonProperty("assignees")
    private List<String> assignees;

    //@Schema(type = "string", description = "Comments")
    @Size(max = 128)
    @Html
    private String comment;

    @Valid
    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;

}
