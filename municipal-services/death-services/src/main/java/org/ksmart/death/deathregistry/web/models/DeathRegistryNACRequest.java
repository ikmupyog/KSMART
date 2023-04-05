package org.ksmart.death.deathregistry.web.models;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
     * Creates DeathRegistryNACRequest  Model
     * Rakhi S  on 04.04.2023
     * 
     */

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryNACRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("deathNACDtls")
    @Valid
    private List<DeathRegistryNACDtls> deathNACDtls;

    public DeathRegistryNACRequest addCrDeathDtl(DeathRegistryNACDtls deathDtl) {
        if (deathNACDtls == null) {
            deathNACDtls = new ArrayList<>();
        }
        deathNACDtls.add(deathDtl);

        return this;
    }
}
