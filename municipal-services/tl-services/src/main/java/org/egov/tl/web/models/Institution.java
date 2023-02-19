package org.egov.tl.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.validator.constraints.SafeHtml;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Institution {

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("id")
  private String id;

  @Size(max = 256)
  @SafeHtml
  @JsonProperty("tenantId")
  private String tenantId;

  @JsonProperty("active")
  private Boolean active;

  @Size(max = 250)
  @SafeHtml
  @JsonProperty("institutionName")
  private String institutionName;

  @Size(max = 50)
  @SafeHtml
  @JsonProperty("contactNo")
  private String contactNo;

  @Size(max = 50)
  @SafeHtml
  @JsonProperty("organisationRegistrationNo")
  private String organisationRegistrationNo;

  @Size(max = 512)
  @SafeHtml
  @JsonProperty("address")
  private String address;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("natureOfInstitution")
  private String natureOfInstitution;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("email")
  private String email;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("licenseUnitId")
  private String licenseUnitId = null;
}
