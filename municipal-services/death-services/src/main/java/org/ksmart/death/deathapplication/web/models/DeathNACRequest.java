package org.ksmart.death.deathapplication.web.models;

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
     * Creates Death NAC Request  Model
     * Rakhi S  on 25.03.2023
     * 
     */

    @Validated
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
public class DeathNACRequest {
    
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("deathNACDtls")
    @Valid
    private List<DeathNACDtls> deathNACDtls;

    public DeathNACRequest addCrDeathDtl(DeathNACDtls deathDtl) {
        if (deathNACDtls == null) {
            deathNACDtls = new ArrayList<>();
        }
        deathNACDtls.add(deathDtl);

        return this;
    }
}
