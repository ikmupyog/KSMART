package org.ksmart.death.deathregistry.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
     * Creates 
     * Jasmine
     * on  07/03/2023
     */
    
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryCriteria {
    
    @JsonProperty("TenantId")
    private String tenantId;

    @JsonProperty("Id")
    private String id;

    @JsonProperty("DeceasedAadharNumber")
    private String deceasedAadharNumber;

    @JsonProperty("DateOfDeath")
    private Long DateOfDeath;

    @JsonProperty("RegistrationNo")
    private String registrationNo;

    @JsonProperty("DeathApplicationNo")
    private String deathApplicationNo;

    @JsonProperty("DeathACKNo")
    private String deathACKNo;

    @JsonProperty("DeceasedFirstNameEn")
    private String deceasedFirstNameEn;

    @JsonProperty("fromDate")
    private Long fromDate;

    @JsonProperty("toDate")
    private Long toDate;

    //Rakhi S on 10.02.2023
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

    //Rakhi S on 10.02.2023 consumerCode as same as Certificateno
    private String consumerCode;

    //Rakhi S on 10.02.2023
    @JsonProperty("FatherNameEn")
    private String fatherNameEn;

    @JsonProperty("MotherNameEn")
    private String motherNameEn;

    @JsonProperty("spouseNameEn")
    private String spouseNameEn;

    @JsonProperty("DeceasedGender")
    private String deceasedGender;

    @JsonProperty("hospital")
    private String hospital;
}
