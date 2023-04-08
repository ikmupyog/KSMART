package org.ksmart.death.deathregistry.web.models.naccertmodel;

import java.util.List;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

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
     * Creates NACCertResponse  model
     * Rakhi S IKM
     * on 07.04.2023
     */
public class NACCertResponse {
  @JsonProperty("responseInfo")
  private ResponseInfo responseInfo = null;

  @JsonProperty("deathNACCertificate")
  private List<DeathNACCertificate> deathNACCertificate = null;
  
  @JsonProperty("filestoreId")
  private String filestoreId;
  
  @JsonProperty("consumerCode")
  private String consumerCode;
  
  @JsonProperty("tenantId")
  private String tenantId;
}
