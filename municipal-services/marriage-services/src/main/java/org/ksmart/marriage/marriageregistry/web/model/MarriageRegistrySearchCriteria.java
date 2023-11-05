package org.ksmart.marriage.marriageregistry.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.validation.Valid;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageRegistrySearchCriteria {

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("id")
    private String id;

    @JsonProperty("applicationNo")
    private String applicationNumber;

    @JsonProperty("registrationNo")
    private String registrationNo;

    @JsonProperty("certificateNo")
    private String certificateNo;
    
    @JsonProperty("marriageDOM")
    private Long marriageDOM;

    //Groom
    @JsonProperty("groomFirstnameEn")
    private String groomFirstnameEn;

    @JsonProperty("groomAadharNo")
    private String groomAdharNo;
    
    //BRIDE
    @JsonProperty("brideAadharNo")
    private String brideAdharNo;

    @JsonProperty("brideFirstnameEn")
    private String brideFirstnameEn;

    @JsonProperty("sortBy")
    private SortBy sortBy;

    public enum SortBy {
        applicationNumber,
        tenantId,
        registrationNo,
        dateofmarriage
    }
    @JsonProperty("sortOrder")
    private SortOrder sortOrder;

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
  
          public static SourceEnum fromValue(String text) {
            for (SourceEnum b : SourceEnum.values()) {
              if (String.valueOf(b.value).equals(text)) {
                return b;
              }
            }
            return null;
          }
        }
      private SourceEnum source;
}
