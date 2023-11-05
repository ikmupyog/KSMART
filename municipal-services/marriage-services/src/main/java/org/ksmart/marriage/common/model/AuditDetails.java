package org.ksmart.marriage.common.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.Valid;

/**
 * Collection of audit related fields used by most models
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuditDetails {

  @JsonProperty("createdBy")
  @Valid
  private String createdBy = null;

  @JsonProperty("lastModifiedBy")
  @Valid
  private String lastModifiedBy = null;

  @JsonProperty("createdTime")
  @Valid
  private Long createdTime = null;

  @JsonProperty("lastModifiedTime")
  @Valid
  private Long lastModifiedTime = null;

}
