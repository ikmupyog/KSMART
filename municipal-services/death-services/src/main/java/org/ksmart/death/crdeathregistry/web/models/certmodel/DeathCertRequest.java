package org.ksmart.death.crdeathregistry.web.models.certmodel;

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
     * Creates DeathCertRequest  model
     * Rakhi S IKM
     * on 15.12.2022
     */
public class DeathCertRequest {

     @JsonProperty("RequestInfo")
     private RequestInfo requestInfo = null;
	 
	 @JsonProperty("deathCertificate")
     private DeathCertificate deathCertificate = null;
}
