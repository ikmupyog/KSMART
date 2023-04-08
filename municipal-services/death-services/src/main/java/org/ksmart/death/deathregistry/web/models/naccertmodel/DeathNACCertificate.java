package org.ksmart.death.deathregistry.web.models.naccertmodel;

import org.egov.common.contract.request.User;
import org.ksmart.death.deathregistry.web.models.AuditDetails;

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
     * Creates DeathNACCertificate  model
     * Rakhi S IKM
     * on 07.04.2023
     */
public class DeathNACCertificate {
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

  @JsonProperty("dateofissue")
  private Long dateofissue = null;

  @JsonProperty("issuingauthority")
  private String issuingauthority = null;

  @JsonProperty("embeddedUrl")
  private String embeddedUrl;

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

  @JsonProperty("deathcertificateno")
  private String deathcertificateno;

  private Integer counter = 0;

  @JsonProperty("ackNo")
  private String ackNo;
}
