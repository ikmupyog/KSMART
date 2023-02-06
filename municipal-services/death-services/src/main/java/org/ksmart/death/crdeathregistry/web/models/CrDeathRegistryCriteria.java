package org.ksmart.death.crdeathregistry.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
     * Jasmine  IKM
     * on  13/10/2022
     */
    
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CrDeathRegistryCriteria {
    
    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("id")
    private String id;

    @JsonProperty("deceasedAadharNumber")
    private String aadhaarNo;

    @JsonProperty("fromDate")
    private Long fromDate;

    @JsonProperty("toDate")
    private Long toDate;

    @JsonProperty("registration_no")
    private String registrationNo;

    //Jasmine 07.01.2023
    @JsonProperty("deathApplicationNo")
    private String deathApplicationNo;

    @JsonProperty("deathACKNo")
    private String deathACKNo;

    @JsonProperty("deceasedFirstNameEn")
    private String deceasedFirstNameEn;

    //Rakhi S on 15.12.2022
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

    //Rakhi S on 24.01.2023 consumerCode as same as Certificateno
    private String consumerCode;

    //Rakhi S on 30.01.2023
    @JsonProperty("deceasedFatherName")
    private String deceasedFatherName;

    @JsonProperty("deceasedMotherName")
    private String deceasedMotherName;

    @JsonProperty("deceasedHusbandWifeName")
    private String deceasedHusbandWifeName;

    @JsonProperty("deceasedGender")
    private String deceasedGender;

    @JsonProperty("hospital")
    private String hospital;
}