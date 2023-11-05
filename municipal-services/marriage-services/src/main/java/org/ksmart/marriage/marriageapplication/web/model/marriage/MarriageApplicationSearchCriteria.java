package org.ksmart.marriage.marriageapplication.web.model.marriage;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.Valid;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageApplicationSearchCriteria {

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("id")
    private String id;

    @JsonProperty("applicationNo")
    private String applicationNo;

    @JsonProperty("registrationNo")
    private String registrationNo;

    @JsonProperty("certificateNo")
    private String certificateNo;

    @JsonProperty("marriageDOM")
    private Long marriageDOM;

    @JsonProperty("active")
    private Boolean active;

    @JsonProperty("businessService")
    private String businessService;

    @JsonProperty("uuid")
    private String uuid;

    //Groom
    @JsonProperty("groomFirstnameEn")
    private String groomFirstnameEn;

    @JsonProperty("groomFirstnameMl")
    private String groomFirstnameMl;

    @JsonProperty("groomMiddlenameEn")
    private String groomMiddlenameEn;

    @JsonProperty("groomMiddlenameMl")
    private String groomMiddlenameMl;

    @JsonProperty("groomLastnameEn")
    private String groomLastnameEn;

    @JsonProperty("groomLastnameMl")
    private String groomLastnameMl;

    @JsonProperty("groomAdharNo")
    private String groomAdharNo;

    //BRIDE
    @JsonProperty("brideAdharNo")
    private String brideAdharNo;

    @JsonProperty("brideFirstnameEn")
    private String brideFirstnameEn;

    @JsonProperty("brideFirstnameMl")
    private String brideFirstnameMl;

    @JsonProperty("brideMiddlenameEn")
    private String brideMiddlenameEn;

    @JsonProperty("brideMiddlenameMl")
    private String brideMiddlenameMl;

    @JsonProperty("brideLastnameEn")
    private String brideLastnameEn;

    @JsonProperty("brideLastnameMl")
    private String brideLastnameMl;

    //for document

    @JsonProperty("documentOwner") 
    private String documentOwner ;

     @JsonProperty("fileURL")
     private String fileURL;

    @JsonProperty("applicationType")
    private String applicationType;

    @JsonProperty("documentType")
    private String documentType ;

    @JsonProperty("documentName")
    private String documentName ;
 


    @JsonProperty("sortBy")
    private SortBy sortBy;

    public enum SortBy {
        applicationNumber,
        tenantId,
        registrationNo,
        dateofmarriage
    }
    @JsonProperty("sortOrder")
    private  SortOrder sortOrder;;
    public enum SortOrder {
        ASC,
        DESC
    }

    @Valid
    private Integer offset;

    @Valid
    private Integer limit;



    @JsonProperty("fromDate")
    private Long fromDate;

    @JsonProperty("toDate")
    private Long toDate;


    public enum SourceEnum {
        sms("sms"),

        email("email"),

        ivr("ivr"),

        mobileapp("mobileapp"),

        whatsapp("whatsapp"),

        csc("csc"),

        web("web");

        private String value;

        SourceEnum(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }

        public static MarriageApplicationSearchCriteria.SourceEnum fromValue(String text) {
            for (MarriageApplicationSearchCriteria.SourceEnum b : MarriageApplicationSearchCriteria.SourceEnum.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }
    }
    private SourceEnum source;



}
