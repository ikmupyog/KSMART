package org.ksmart.marriage.marriageapplication.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.*;
//import org.ksmart.marriage.common.model.AuditDetails;
//import org.ksmart.marriage.common.model.Document;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageApplicationDetail {

    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @JsonProperty("marraigeDOM")
    private Long dateofmarriage;

    @JsonProperty("marraigeDOR")
    private Long dateofreporting;



    @Size(max = 64)
    @JsonProperty("marraigeDistrictid")
    private String districtid;

    @Size(max = 64)
    @JsonProperty("marraigeLBtype")
    private String lbtype;


    @Size(max = 64)
    @JsonProperty("marraigeTenantid")
    private String tenantid;

    @Size(max = 64)
    @JsonProperty("marraigePlacetype")
    private String placetype;

    @Size(max = 1000)
    @JsonProperty("marraigePlacenameEn")
    private String placenameEn;
    @Size(max = 1000)
    @JsonProperty("marraigePlacenameMal")
    private String placenameMl;

    @Size(max = 64)
    @JsonProperty("marraigeWardCode")
    private String ward_code;


    @Size(max = 1000)
    @JsonProperty("marriageStreetEn")
    private String street_name_en;

    @Size(max = 1000)
    @JsonProperty("marriageStreetMal")
    private String street_name_ml;

    @Size(max = 64)
    @JsonProperty("marraigeTalukID")
    private String talukid;

    @Size(max = 64)
    @JsonProperty("marraigeVillageName")
    private String village_name;

    @Size(max = 1000)
    @JsonProperty("marriageLandmark")
    private String landmark;

    @Size(max = 1000)
    @JsonProperty("marriageLocalityEn")
    private String locality_en;

    @Size(max = 1000)
    @JsonProperty("marriageLocalityMal")
    private String locality_ml;

    @Size(max = 64)
    @JsonProperty("marraigeType")
    private String marriage_type;

    @Size(max = 64)
    @JsonProperty("marriagePlaceothers")
    private String placeothers;

    @Size(max = 200)
    @JsonProperty("othMarriageType")
    private String oth_marriage_type;

    @Size(max = 1000)
    @JsonProperty("marraigeOthersSpecify")
    private String othersspecify;

    @Size(max = 64)
    @JsonProperty("marraigeApplicationType")
    private String applicationtype;

    @Size(max = 64)
    @JsonProperty("marraigeBusinessService")
    private String businessservice;

    @Size(max = 64)
    @JsonProperty("marraigeWorkflowCode")
    private String workflowcode;

    @Size(max = 64)
    @JsonProperty("marraigeFileNo")
    private String fileno;


    @Size(max = 64)
    @JsonProperty("registrationno")
    private String registrationno;

    @JsonProperty("registration_date")
    private Long registrationDate;

    @JsonProperty("marraigeFileDate")
    private long file_date;

    @Size(max = 64)
    @JsonProperty("marraigeFileStatus")
    private String file_status;

    @Size(max = 64)
    @JsonProperty("marraigeAction")
    private String action;

    @Size(max = 64)
    @JsonProperty("marraigeStatus")
    private String status;
    @Size(max = 1000)
    @JsonProperty("placeid")
    private String placeid;


    @Size(max = 2500)
    @JsonProperty("marriageHouseNoAndNameEn")
    private String marriageHouseNoAndNameEn;
    @Size(max = 2500)
    @JsonProperty("marriageHouseNoAndNameMal")
    private String marriageHouseNoAndNameMal;

    @Size(max = 1000)
    @JsonProperty("marriageReligiousInstitutionOther")
    private String marriageReligiousInstitutionOther;

    @Size(max = 1000)
    @JsonProperty("marriagePublicOrPrivatePlace")
    private String marriagePublicOrPrivatePlace;

    @Size(max = 2500)
    @JsonProperty("marriagePublicOrPrivateNamePlaceEn")
    private String marriagePublicOrPrivateNamePlaceEn;
    @Size(max = 2500)
    @JsonProperty("marriagePublicOrPrivateNamePlaceMal")
    private String marriagePublicOrPrivateNamePlaceMal;


    @Size(max = 1000)
    @JsonProperty("marriageReligiousInstitution")
    private String marriageReligiousInstitution;

    @Size(max = 2500)
    @JsonProperty("marriageReligiousInstitutionOtherNameEn")
    private String marriageReligiousInstitutionOtherNameEn;
    @Size(max = 2500)
    @JsonProperty("marriageReligiousInstitutionOtherNameMal")
    private String marriageReligiousInstitutionOtherNameMal;

    @Size(max = 64)
    @JsonProperty("applicationnumber")
    private String applicationnumber;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("BrideDetails")
    private BrideDetails brideDetails;

    @JsonProperty("GroomDetails")
    private GroomDetails groomDetails;
    @JsonProperty("PermanentAddressDetails")
    private PermanentAdressDetails permanent;
    @JsonProperty("PresentAddressDetails")
    private PresentAddressDetails present ;

    @JsonProperty("WitnessDetail")
    private WitnessDetails witness;

//    @JsonProperty("WitnessDetails")
//    private WitnessDetails witness;


}

