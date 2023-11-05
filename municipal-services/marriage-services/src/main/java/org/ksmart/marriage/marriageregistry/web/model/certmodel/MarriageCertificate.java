package org.ksmart.marriage.marriageregistry.web.model.certmodel;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageCertificate {
    @NotNull
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @JsonProperty("marriageRegistryId")
    private String marriageRegId;

    @JsonProperty("marriageRegistryDetails")
    private MarriageRegistryDetails marriageRegistryDetails;

    @JsonProperty("marriagecertificateno")
    private String marriagecertificateno;

    @Size(max = 2500)
    @JsonProperty("embeddedUrl")
    private String embeddedUrl;

//    @JsonProperty("marriageDOM")
//    private Long dateofmarriage;
//
//    @JsonProperty("marriageDOR")
//    private Long dateofreporting;
//
//    @Size(max = 64)
//    @JsonProperty("certId")
//    private String certId;
//    @Size(max = 64)
//    @JsonProperty("marriageDistrictid")
//    private String districtid;
//
//    @Size(max = 64)
//    @JsonProperty("marriageLBtype")
//    private String lbtype;
//
//
    @Size(max = 64)
    @JsonProperty("marriageTenantid")
    private String tenantid;

    @Size(max = 64)
    @JsonProperty("marriageTenantNameEn")
    private String tenantNameEn;

    @JsonProperty("talukNameEn")
    private String talukNameEn;


    @JsonProperty("districtNameEn")
    private String districtNameEn;


    @JsonProperty("villageNameEn")
    private String villageNameEn;

    @JsonProperty("groomFullName")
    private String groomFullName;
    @JsonProperty("brideFullName")
    private String brideFullName;
    @JsonProperty("groomPermntFullAddr")
    private String groomPermntFullAddr;

    @JsonProperty("bridePermntFullAddr")
    private String bridePermntFullAddr;
    @JsonProperty("brideNRIAddress")
    private String brideNRIAddress;

    @JsonProperty("marriagePlaceFullAddr")
    private String marriagePlaceFullAddr;
    @JsonProperty("groomNRIAddress")
    private String groomNRIAddress;

    @JsonProperty("lbType")
    private String lbType;

//
//    @Size(max = 64)
//    @JsonProperty("marriagePlacetype")
//    private String placetype;
//
//    @Size(max = 1000)
//    @JsonProperty("marriagePlacenameEn")
//    private String placenameEn;
//    @Size(max = 1000)
//    @JsonProperty("marriagePlacenameMl")
//    private String placenameMl;
//
//    @Size(max = 64)
//    @JsonProperty("marriageWardCode")
//    private String ward_code;
//
//
//    @Size(max = 1000)
//    @JsonProperty("marriageStreetEn")
//    private String street_name_en;
//
//    @Size(max = 1000)
//    @JsonProperty("marriageStreetMl")
//    private String street_name_ml;
//
//    @Size(max = 64)
//    @JsonProperty("marriageTalukID")
//    private String talukid;
//
//    @Size(max = 64)
//    @JsonProperty("marriageVillageName")
//    private String village_name;
//
//    @Size(max = 1000)
//    @JsonProperty("marriageLandmark")
//    private String landmark;
//
//    @Size(max = 1000)
//    @JsonProperty("marriageLocalityEn")
//    private String locality_en;
//
//    @Size(max = 1000)
//    @JsonProperty("marriageLocalityMl")
//    private String locality_ml;
//
//    @Size(max = 64)
//    @JsonProperty("marriageType")
//    private String marriage_type;
//
//    @Size(max = 64)
//    @JsonProperty("marriagePlaceothers")
//    private String placeothers;
//
//    @Size(max = 200)
//    @JsonProperty("othMarriageType")
//    private String oth_marriage_type;
//
//    @Size(max = 1000)
//    @JsonProperty("marriageOthersSpecify")
//    private String othersspecify;
//
//    @NotNull
//    @Size(max = 64)
//    @JsonProperty("applicationType")
//    private String applicationtype;
//
//    @NotNull
//    @Size(max = 64)
//    @JsonProperty("businessService")
//    private String businessservice;
//
//    @NotNull
//    @Size(max = 64)
//    @JsonProperty("workflowCode")
//    private String workflowcode;
//
////    @Size(max = 64)
////    @JsonProperty("fileNo")
////    private String fileno;
//
//
    @Size(max = 64)
    @JsonProperty("registrationno")
    private String registrationno;
//
//    @JsonProperty("registration_date")
//    private Long registrationDate;
//

    @Size(max = 64)
    @JsonProperty("action")
    private String action;

    @Size(max = 64)
    @JsonProperty("status")
    private String status;

    @Size(max = 1000)
    @JsonProperty("placeid")
    private String placeid;

    @JsonProperty("count")
    private int count;

//    @Size(max = 2500)
//    @JsonProperty("marriageHouseNoAndNameEn")
//    private String marriageHouseNoAndNameEn;
//
//    @Size(max = 2500)
//    @JsonProperty("marriageHouseNoAndNameMl")
//    private String marriageHouseNoAndNameMl;
//
//    @Size(max = 64)
//    @JsonProperty("applicationNumber")
//    private String applicationNumber;
//
//    @JsonProperty("BrideDetails")
//    private BrideRegistryDetails brideDetails;
//
//    @JsonProperty("GroomDetails")
//    private GroomRegistryDetails groomDetails;
//
//    @JsonProperty("WitnessDetails")
//    private WitnessRegistryDetails witnessDetails;
//
//    @JsonProperty("BrideAddressDetails")
//    private BrideRegistryAddressDetails brideAddressDetails;
//
//    @JsonProperty("GroomAddressDetails")
//    private GroomRegistryAddressDetails groomAddressDetails;

    @JsonProperty("AuditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("filestoreid")
    private String filestoreid = null;


    @JsonProperty("ackNo")
    private String ackNo;

    @JsonProperty("source")
    private String source = null;
    @JsonProperty("applicationId")
    private String applicationId=null;
//    @JsonProperty("year")
    private String year;
    @JsonProperty("dateOfIssue")
    private Long dateofissue;
    @JsonProperty("dateOfIssueInWords")
    private String dateOfIssueInWords;

    @JsonProperty("certificateStatus")
    private StatusEnum certificateStatus = null;





    public enum StatusEnum {
        ACTIVE("ACTIVE"),

        CANCELLED("CANCELLED"),

        FREE_DOWNLOAD("FREE_DOWNLOAD"),

        PAID_DOWNLOAD("PAID_DOWNLOAD"),

        PAID_PDF_GENERATED("PAID_PDF_GENERATED"),

        PAID("PAID");

        private String value;

        StatusEnum(String value) {
            this.value = value;
        }

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }

//        @JsonCreator
//        public static StatusEnum fromValue(String text) {
//            for (StatusEnum b : StatusEnum.values()) {
//                if (String.valueOf(b.value).equals(text)) {
//                    return b;
//                }
//            }
//            return null;
//        }
    }

    @JsonProperty("modulecode")
    private String modulecode;

//    @Value("${marriagecert.egov.mdms.url}")
    @JsonProperty("mdmsBasePath")
    private String mdmsBasePath;



}
