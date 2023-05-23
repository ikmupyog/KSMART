package org.ksmart.marriage.marriageapplication.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.web.model.Demand.Demand;
import org.ksmart.marriage.marriageapplication.web.model.marriage.*;
import org.ksmart.marriage.marriagecommon.model.common.CommonPay;
//import org.ksmart.marriage.common.model.AuditDetails;
//import org.ksmart.marriage.common.model.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import javax.swing.text.Document;
import javax.validation.Valid;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageApplicationDetails {

    @NotNull
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @JsonProperty("marriageDOM")
    private Long dateofmarriage;

    @JsonProperty("marriageDOR")
    private Long dateofreporting;

    @Size(max = 64)
    @JsonProperty("marriageDistrictid")
    private String districtid;

    @Size(max = 64)
    @JsonProperty("marriageLBtype")
    private String lbtype;

    @Size(max = 64)
    @JsonProperty("marriageTenantid")
    private String tenantid;

    @JsonProperty("marriageTenantIdEn")
    private String marriageTenantIdEn;

    @JsonProperty("marriageTenantIdMl")
    private String marriageTenantIdMl;

    @Size(max = 64)
    @JsonProperty("marriagePlacetype")
    private String placetype;

    @Size(max = 200)
    @JsonProperty("placetypeEn")
    private String placetypeEn;

    @Size(max = 200)
    @JsonProperty("placetypeMl")
    private String placetypeMl;

    @Size(max = 1000)
    @JsonProperty("marriagePlacenameEn")
    private String placenameEn;

    @Size(max = 1000)
    @JsonProperty("marriagePlacenameMl")
    private String placenameMl;

    @Size(max = 64)
    @JsonProperty("marriageWardCode")
    private String wardCode;


    @Size(max = 1000)
    @JsonProperty("marriageStreetEn")
    private String streetNameEn;

    @Size(max = 1000)
    @JsonProperty("marriageStreetMl")
    private String streetNameMl;

    @Size(max = 64)
    @JsonProperty("marriageTalukID")
    private String talukid;

    @Size(max = 64)
    @JsonProperty("marriageVillageName")
    private String villageName;

    @Size(max = 1000)
    @JsonProperty("marriageLandmark")
    private String landmark;

    @Size(max = 1000)
    @JsonProperty("marriageLocalityEn")
    private String localityEn;

    @Size(max = 1000)
    @JsonProperty("marriageLocalityMl")
    private String localityMl;

    @Size(max = 64)
    @JsonProperty("marriageType")
    private String marriageType;

    @Size(max = 200)
    @JsonProperty("marriageTypeEn")
    private String marriageTypeEn;

    @Size(max = 200)
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

    @Size(max = 1000)
    @JsonProperty("placeid")
    private String placeid;

    @Size(max = 2500)
    @JsonProperty("marriageHouseNoAndNameEn")
    private String marriageHouseNoAndNameEn;
    @Size(max = 2500)
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

