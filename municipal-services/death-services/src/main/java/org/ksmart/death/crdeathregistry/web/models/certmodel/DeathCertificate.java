package org.ksmart.death.crdeathregistry.web.models.certmodel;

import org.egov.common.contract.request.User;
import org.ksmart.death.crdeathregistry.web.models.AuditDetails;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
/**
     * Creates DeathCertificate  model
     * Rakhi S IKM
     * on 15.12.2022
     */
public class DeathCertificate {
   
  @JsonProperty("citizen")

  private User citizen = null;

  @JsonProperty("id")

  private String id = null;

  @JsonProperty("tenantId")

  private String tenantId = null;

  @JsonProperty("source")

  private String source = null;

  @JsonProperty("deathDtlId")

  private String deathDtlId = null;
  
  @JsonProperty("filestoreid")

  private String filestoreid = null;

  @JsonProperty("auditDetails")

  private AuditDetails auditDetails = null;

  @JsonProperty("fullName")
  private String fullName = null;

  @JsonProperty("gender")
  private String gender = null;

  @JsonProperty("dateofdeath")
  private Long dateofdeath = null;

  @JsonProperty("placeofdeath")
  private String placeofdeath = null;

  @JsonProperty("motherName")
  private String motherName = null;

  @JsonProperty("fatherorHusbandName")
  private String fatherorHusbandName = null;

  @JsonProperty("registrationno")
  private String registrationno = null;

  @JsonProperty("registrationdate")
  private Long registrationdate = null;
  
  @JsonProperty("dateofissue")
  private Long dateofissue = null;

  @JsonProperty("issuingauthority")
  private String issuingauthority = null;

  @JsonProperty("embeddedUrl")
  private String embeddedUrl;


  //Rakhi S on 19.12.2022

  public enum StatusEnum {
	  ACTIVE("ACTIVE"),
	  
	  CANCELLED("CANCELLED"),
	  
	  FREE_DOWNLOAD("FREE_DOWNLOAD");

	  // PAID_DOWNLOAD("PAID_DOWNLOAD"),

	  // PAID_PDF_GENERATED("PAID_PDF_GENERATED"),
	  
	  // PAID("PAID");

      private String value;

      StatusEnum(String value) {
          this.value = value;
      }

      @Override
      @JsonValue
      public String toString() {
          return String.valueOf(value);
      }

      @JsonCreator
      public static StatusEnum fromValue(String text) {
          for (StatusEnum b : StatusEnum.values()) {
              if (String.valueOf(b.value).equals(text)) {
                  return b;
              }
          }
          return null;
      }
  }
  
  @JsonProperty("applicationStatus")
  private StatusEnum applicationStatus = null;

  
  //Rakhi S on 21.12.2022
  @JsonProperty("deathcertificateno")
  private String deathcertificateno;
}
