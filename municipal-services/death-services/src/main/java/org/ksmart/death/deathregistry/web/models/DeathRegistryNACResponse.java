package org.ksmart.death.deathregistry.web.models;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.response.ResponseInfo;
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
public class DeathRegistryNACResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("deathNACDtls")
    @Valid
    private List<DeathRegistryNACDtls> deathNACDtls;

    @JsonProperty("Count")
    private int count;

    public DeathRegistryNACResponse addCrDeathDtl(DeathRegistryNACDtls deathDtls) {
        if (deathNACDtls == null) {
            deathNACDtls = new ArrayList<>();
        }
        deathNACDtls.add(deathDtls);

        return this;
    }
}
