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
    @JsonProperty("districtid")
    private String districtid;

    @Size(max = 64)
    @JsonProperty("lbtype")
    private String lbtype;


    @Size(max = 64)
    @JsonProperty("tenantid")
    private String tenantid;

    @Size(max = 64)
    @JsonProperty("marraigePlacetype")
    private String placetype;

    @Size(max = 1000)
    @JsonProperty("marraigePlacename")
    private String placename;

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

    @Size(max = 15)
    @JsonProperty("WitnessDetails")
    private String adharno;

    @Size(max = 200)
    @JsonProperty("witnessNameEn")
    private String name_en;



    @Size(max = 200)
    @JsonProperty("witnessNameMal")
    private String name_mal;


    @JsonProperty("witnessAge")
    private Integer age;

    @Size(max = 200)
    @JsonProperty("witnessAddresSEn")
    private String address_en;

    @Size(max = 200)
    @JsonProperty("witnessAddressMal")
    private String address_mal;

    @Size(max = 150)
    @JsonProperty("witnessMobile")
    private String mobile;


    @JsonProperty("witnessISmessageReceived")
    private Boolean is_message_received;




    @JsonProperty("witnessISEsigned")
    private     Boolean is_esigned;




    @Size(max = 64)
    @JsonProperty("applicationtype")
    private String applicationtype;

    @Size(max = 64)
    @JsonProperty("businessservice")
    private String businessservice;

    @Size(max = 64)
    @JsonProperty("workflowcode")
    private String workflowcode;

    @Size(max = 64)
    @JsonProperty("fileno")
    private String fileno;


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

    @Size(max = 64)
    @JsonProperty("applicationnumber")
    private String applicationnumber;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("brideDetails")
    private BrideDetails brideDetails;

    @JsonProperty("groomDetails")
    private GroomDetails groomDetails;




}

