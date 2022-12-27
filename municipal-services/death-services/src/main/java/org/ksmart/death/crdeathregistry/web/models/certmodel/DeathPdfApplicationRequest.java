package org.ksmart.death.crdeathregistry.web.models.certmodel;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;

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
     * Creates DeathPdfApplicationRequest  model
     * Rakhi S IKM
     * on 16.12.2022
     */
public class DeathPdfApplicationRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo = null;

	@JsonProperty("DeathCertificate")
	private List<CrDeathRegistryDtl> deathCertificate;
}
