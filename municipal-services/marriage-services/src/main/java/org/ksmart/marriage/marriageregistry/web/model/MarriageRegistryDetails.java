package org.ksmart.marriage.marriageregistry.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
//import org.ksmart.marriage.common.model.AuditDetails;
//import org.ksmart.marriage.common.model.Document;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageRegistryDetails {

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

    @Size(max = 64)
    @JsonProperty("marriagePlacetype")
    private String placetype;

    @Size(max = 1000)
    @JsonProperty("marriagePlacenameEn")
    private String placenameEn;
    @Size(max = 1000)
    @JsonProperty("marriagePlacenameMl")
    private String placenameMl;

    @Size(max = 64)
    @JsonProperty("marriageWardCode")
    private String ward_code;


    @Size(max = 1000)
    @JsonProperty("marriageStreetEn")
    private String street_name_en;

    @Size(max = 1000)
    @JsonProperty("marriageStreetMl")
    private String street_name_ml;

    @Size(max = 64)
    @JsonProperty("marriageTalukID")
    private String talukid;

    @Size(max = 64)
    @JsonProperty("marriageVillageName")
    private String village_name;

    @Size(max = 1000)
    @JsonProperty("marriageLandmark")
    private String landmark;

    @Size(max = 1000)
    @JsonProperty("marriageLocalityEn")
    private String locality_en;

    @Size(max = 1000)
    @JsonProperty("marriageLocalityMl")
    private String locality_ml;

    @Size(max = 64)
    @JsonProperty("marriageType")
    private String marriage_type;

    @Size(max = 64)
    @JsonProperty("marriagePlaceothers")
    private String placeothers;

    @Size(max = 200)
    @JsonProperty("othMarriageType")
    private String oth_marriage_type;

    @Size(max = 1000)
    @JsonProperty("marriageOthersSpecify")
    private String othersspecify;

    @NotNull
    @Size(max = 64)
    @JsonProperty("applicationType")
    private String applicationtype;

    @NotNull
    @Size(max = 64)
    @JsonProperty("businessService")
    private String businessservice;

    @NotNull
    @Size(max = 64)
    @JsonProperty("workflowCode")
    private String workflowcode;

//    @Size(max = 64)
//    @JsonProperty("fileNo")
//    private String fileno;


    @Size(max = 64)
    @JsonProperty("registrationno")
    private String registrationno;

    @JsonProperty("registration_date")
    private Long registrationDate;


    @Size(max = 64)
    @JsonProperty("action")
    private String action;

    @Size(max = 64)
    @JsonProperty("status")
    private String status;

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
    @JsonProperty("zonalOffice")
    private String zonalOffice;

    // @Size(max = 1000)
    // @JsonProperty("marriageReligiousInstitutionOther")
    // private String marriageReligiousInstitutionOther;

    // @Size(max = 1000)
    // @JsonProperty("marriagePublicOrPrivatePlace")
    // private String marriagePublicOrPrivatePlace;

    // @Size(max = 2500)
    // @JsonProperty("marriagePublicOrPrivateNamePlaceEn")
    // private String marriagePublicOrPrivateNamePlaceEn;
    // @Size(max = 2500)
    // @JsonProperty("marriagePublicOrPrivateNamePlaceMl")
    // private String marriagePublicOrPrivateNamePlaceMl;

    // @Size(max = 1000)
    // @JsonProperty("marriageReligiousInstitution")
    // private String marriageReligiousInstitution;

    // @Size(max = 2500)
    // @JsonProperty("marriageReligiousInstitutionOtherNameEn")
    // private String marriageReligiousInstitutionOtherNameEn;
    // @Size(max = 2500)
    // @JsonProperty("marriageReligiousInstitutionOtherNameMl")
    // private String marriageReligiousInstitutionOtherNameMl;

    @Size(max = 64)
    @JsonProperty("applicationNumber")
    private String applicationNumber;

    @JsonProperty("moduleCode")
    private String moduleCode;

    @Size(max = 64)
    @JsonProperty("villageId")
    private String villageId;

    @Size(max = 1000)
    @JsonProperty("talukName")
    private String talukName;

    @JsonProperty("BrideDetails")
    private BrideRegistryDetails brideDetails;

    @JsonProperty("GroomDetails")
    private GroomRegistryDetails groomDetails;

    @JsonProperty("WitnessDetails")
    private WitnessRegistryDetails witnessDetails;

    @JsonProperty("BrideAddressDetails")
    private BrideRegistryAddressDetails brideAddressDetails;

    @JsonProperty("GroomAddressDetails")
    private GroomRegistryAddressDetails groomAddressDetails;

    @JsonProperty("AuditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("certificateNo")
    private  String certificateNo;





}

