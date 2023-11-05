package org.ksmart.marriage.marriageapplication.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.web.model.Demand.Demand;
import org.ksmart.marriage.marriageapplication.web.model.marriage.*;
import org.ksmart.marriage.marriagecommon.model.common.CommonPay;
import io.swagger.v3.oas.annotations.media.Schema;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.validation.annotation.Validated;
//import org.ksmart.marriage.common.model.AuditDetails;
//import org.ksmart.marriage.common.model.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.List;
import javax.swing.text.Document;
import javax.validation.Valid;

@Schema(description = "An Object holds the data for marriage registration submitted by the user")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageApplicationDetails {

    // @Schema(type = "string", format = "uuid", description = "File id")
    // @Size(max = 64, message = "Marriage id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Size(max = 64)
    @JsonProperty("userId")
    private String userId;

    @Schema(type = "integer", format = "int64", description = "Marriage date")
    @NotNull(message = "Date of Marriage is required-Testing")
    @Positive(message = "Invalid Marriage date")
    @JsonProperty("marriageDOM")
    private Long dateofmarriage;

    @Schema(type = "integer", format = "int64", description = "Marriage registration date")
    @NotNull(message = "Date of Marriage registration is required")
    @Positive(message = "Invalid Marriage registration date")
    @JsonProperty("marriageDOR")
    private Long dateofreporting;

    @Schema(type = "string", description = "District Name")
    @NotBlank(message = "District Name is required")
    @Size(max = 64, message = "District Name length cannot exceed 64 characters")
    @JsonProperty("marriageDistrictid")
    private String districtid;

    @Schema(type = "string", description = "Localbody Type")
    @NotBlank(message = "LB type is required")
    @Size(max = 64, message = "Length of LB type  cannot exceed 64 characters")
    @JsonProperty("marriageLBtype")
    private String lbtype;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_TENANT,
             message = "Invalid tenant identification number format, eg: kl.cochin")
    @JsonProperty("marriageTenantid")
    private String tenantid;


    @JsonProperty("marriageTenantIdEn")
    private String marriageTenantIdEn;

    @JsonProperty("marriageTenantIdMl")
    private String marriageTenantIdMl;

    @Schema(type = "string", description = "Marriage Registration Place Type")
    @NotBlank(message = "Marriage Registration Place Type is required")
    @Size(max = 64, message = "Marriage Registration Place Type length cannot exceed 64 characters")
    @JsonProperty("marriagePlacetype")
    private String placetype;

    @Schema(type = "string", description = "Marriage place type")
    @Size(max = 200, message = "Marriage place type length cannot exceed 200 characters")
    @JsonProperty("placetypeEn")
    private String placetypeEn;

    @Schema(type = "string", description = "Marriage place type malayalam")
    @Size(max = 200, message = "Marriage place type malayalam length cannot exceed 200 characters")
    @JsonProperty("placetypeMl")
    private String placetypeMl;

    @Schema(type = "string", description = "Marriage place type")
    @Size(max = 1000, message = "Marriage place Name length cannot exceed 1000 characters")
    @JsonProperty("marriagePlacenameEn")
    private String placenameEn;

    @Schema(type = "string", description = "Marriage place type")
    @Size(max = 1000) //, message = "Marriage place Name malayalam length cannot exceed 1000 characters")
    @JsonProperty("marriagePlacenameMl")
    private String placenameMl;

    @Schema(type = "string", description = "Ward number")
    @NotBlank(message = "Ward number is required")
    @Size(max = 64, message = "Ward number length cannot exceed 64 characters")
    @JsonProperty("marriageWardCode")
    private String wardCode;

   // @NotNull(message = "StreetName is required")
    @Schema(type = "string", description = "Marriage place street name")
    @Size(max = 1000, message = "Marriage place street name length cannot exceed 1000 characters")
    @Pattern(regexp = MarriageConstants.PATTERN_ENGLISH,
                    message = "Invalid street name format,it must be in English")
    @JsonProperty("marriageStreetEn")
    private String streetNameEn;

   // @NotNull(message = "StreetName is required")
    @Schema(type = "string", description = "Marriage place street name")
    @Size(max = 1000, message = "Marriage place street name length cannot exceed 1000 characters")
    //@Pattern(regexp = MarriageConstants.PATTERN_MALAYALAM,
              //      message = "Invalid street name format,it must be in Malayalam")
    @JsonProperty("marriageStreetMl")
    private String streetNameMl;

    @Schema(type = "string", description = "Taluk Name")
    @NotBlank(message = "Taluk Name is required")
    @Size(max = 64, message = "Taluk Name length cannot exceed 64 characters")
    @JsonProperty("marriageTalukID")
    private String talukid;

    @Schema(type = "string", description = "Village Name")
    @NotBlank(message = "Village Name is required")
    @Size(max = 64, message = "Village Name length cannot exceed 64 characters")
    @JsonProperty("marriageVillageName")
    private String villageName;

    @Schema(type = "string", description = "Marriage place landmark")
    @Size(max = 1000, message = "Marriage place landmark length cannot exceed 1000 characters")
    @JsonProperty("marriageLandmark")
    private String landmark;

    @Schema(type = "string", description = "Marriage place locality")
    @Size(max = 1000, message = "Marriage place locality length cannot exceed 1000 characters")
    @JsonProperty("marriageLocalityEn")
    private String localityEn;

    @Schema(type = "string", description = "Marriage place locality")
    @Size(max = 1000) //, message = "Marriage place locality length cannot exceed 1000 characters")
    @JsonProperty("marriageLocalityMl")
    private String localityMl;

    @NotNull(message = "Marriage Type is required")
    @Schema(type = "string", description = "Marriage type")
    @Size(max = 64, message = "Marriage type length cannot exceed 64 characters")
    @JsonProperty("marriageType")
    private String marriageType;

    @Schema(type = "string", description = "Marriage type")
    @Size(max = 200, message = "Marriage type length cannot exceed 200 characters")
    @JsonProperty("marriageTypeEn")
    private String marriageTypeEn;

    @Schema(type = "string", description = "Marriage type")
    @Size(max = 200) // message = "Marriage type malayalam length cannot exceed 200 characters")
    @JsonProperty("marriageTypeMl")
    private String marriageTypeMl;

    @Size(max = 200)
    @JsonProperty("othMarriageType")
    private String othMarriageType;

    @Size(max = 64)
    @JsonProperty("registrationNo")
    private String registrationNo;

    @JsonProperty("registrationDate")
    private Long registrationDate;

    @Schema(type = "string", description = "Marriage place Name")
    @Size(max = 1000, message = "Marriage Place Name length cannot exceed 1000 characters")
    @JsonProperty("placeid")
    private String placeid;

    @Schema(type = "string", description = "House No & Name")
    @Size(max = 2500, message = "House No & Name length cannot exceed 2500 characters")
    @JsonProperty("marriageHouseNoAndNameEn")
    private String marriageHouseNoAndNameEn;

    @Schema(type = "string", description = "House No & Name")
    @Size(max = 2500) //, message = "House No & Name malayalam length cannot exceed 2500 characters")
    @JsonProperty("marriageHouseNoAndNameMl")
    private String marriageHouseNoAndNameMl;

    @Size(max = 64)
    @JsonProperty("applicationNumber")
    private String applicationNumber;
    
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("BrideDetails")
    private BrideDetails brideDetails;

    @JsonProperty("GroomDetails")
    private GroomDetails groomDetails;
    
    @JsonProperty("BrideAddressDetails")
    private BrideAddressDetails brideAddressDetails;

    @JsonProperty("GroomAddressDetails")
    private GroomAddressDetails groomAddressDetails;

    @JsonProperty("WitnessDetails")
    private WitnessDetails witnessDetails;

    @JsonProperty("CommonPay")
    private CommonPay commonPay;

    // @JsonProperty("MarriageDocument")
    // private MarriageDocument marriageDocument;
    //Workflow 29/03.2023 Jasmine
    @Size(max = 64)
    @JsonProperty("action")
    private String action;

    @Size(max = 64)
    @JsonProperty("status")
    private String status;

    @Size(max = 64)
    @JsonProperty("villageId")
    private String villageId;

    @Size(max = 1000)
    @JsonProperty("talukName")
    private String talukName;

    @JsonProperty("assignee")
    private List<String> assignees;

    
    @NotNull
    @Size(max = 64)
    @JsonProperty("applicationType")
    private String applicationtype;

    @JsonProperty("moduleCode")
    private String moduleCode;

    @Size(max = 64)
    @JsonProperty("zonalOffice")
    private String zonalOffice;

    @NotNull
    @Size(max = 64)
    @JsonProperty("businessService")
    private String businessservice;

    @NotNull
    @Size(max = 64)
    @JsonProperty("workflowCode")
    private String workflowcode;

    @JsonProperty("isWorkflow")
    private Boolean isWorkflow;

    private String assignuser;

    @Size(max = 128)
    // @Html
    private String comment;

    @Valid
    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;

    @JsonProperty("MarriageDocuments")
    @Valid
    private List<MarriageDocument> MarriageDocuments ;

    @JsonProperty("Demands")
    private List<Demand> demands;

    private boolean wfnormalRegn ;

    private boolean wfdelayedWithinFiveYear ;

    private boolean wfdelayedAfterFiveYear ;

    //Jasmine 03.05.2023

    @JsonProperty("marriageDistrictEn")
    private String marriageDistrictEn;

    @JsonProperty("marriageDistrictMl")
    private String marriageDistrictMl;

    @JsonProperty("marriageLBtypeEn")
    private String marriageLBtypeEn;

    @JsonProperty("marriageLBtypeMl")
    private String marriageLBtypeMl;

    @JsonProperty("marriageVillageNameEn")
    private String marriageVillageNameEn;

    @JsonProperty("marriageVillageNameMl")
    private String marriageVillageNameMl;

    @JsonProperty("marriageTalukNameEn")
    private String marriageTalukNameEn;

    @JsonProperty("marriageTalukNameMl")
    private String marriageTalukNameMl;

    @JsonProperty("marriagePlaceTypenameEn")
    private String marriagePlaceTypenameEn;

    @JsonProperty("marriagePlaceTypenameMl")
    private String marriagePlaceTypenameMl;

    @JsonProperty("marriageWardCodeEn")
    private String marriageWardCodeEn;

    @JsonProperty("marriageWardCodeMl")
    private String marriageWardCodeMl;

    @JsonProperty("marriagePlaceIdEn")
    private String marriagePlaceIdEn;

    @JsonProperty("marriagePlaceIdMl")
    private String marriagePlaceIdMl;

    @JsonProperty("marriagePlaceIdSubRegiEn")
    private String marriagePlaceIdSubRegiEn;

    @JsonProperty("marriagePlaceIdSubRegiMl")
    private String marriagePlaceIdSubRegiMl;

}

