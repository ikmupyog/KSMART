package org.ksmart.death.deathregistry.web.models.naccertmodel;

import org.egov.common.contract.request.RequestInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
/**
     * Creates NACCertRequest  model
     * Rakhi S IKM
     * on 07.04.2024
     */
public class NACCertRequest {
    @JsonProperty("RequestInfo")
     private RequestInfo requestInfo = null;
	 
	 @JsonProperty("deathNACCertificate")
     private DeathNACCertificate deathNACCertificate = null;
}
