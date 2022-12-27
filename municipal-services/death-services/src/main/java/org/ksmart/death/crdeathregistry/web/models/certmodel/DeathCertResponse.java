package org.ksmart.death.crdeathregistry.web.models.certmodel;
import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
/**
     * Creates DeathCertResponse  model
     * Rakhi S IKM
     * on 15.12.2022
     */
public class DeathCertResponse {
  @JsonProperty("responseInfo")
  private ResponseInfo responseInfo = null;

  @JsonProperty("deathCertificate")
  private List<DeathCertificate> deathCertificates = null;
  
  @JsonProperty("filestoreId")
  private String filestoreId;
  
  @JsonProperty("consumerCode")
  private String consumerCode;
  
  @JsonProperty("tenantId")
  private String tenantId;
}
