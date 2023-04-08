package org.ksmart.death.deathregistry.web.models.naccertmodel;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACDtls;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
/**
     * Creates NACPdfApplicationRequest  model
     * Rakhi S IKM
     * on 07.04.2023
     */
public class NACPdfApplicationRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo = null;

	@JsonProperty("DeathNACCertificate")
	private List<DeathRegistryNACDtls> deathNACCertificate;
}
