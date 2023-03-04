package org.ksmart.death.deathapplication.web.models;

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
     * Creates DeathAbandonedResponse  Model
     * Rakhi S  on 03.03.2023
     * 
     */
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathAbandonedResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("deathAbandonedDtls")
    @Valid
    private List<DeathAbandonedDtls> deathAbandonedDtls;

    @JsonProperty("Count")
    private int count;

    public DeathAbandonedResponse addCrDeathDtl(DeathAbandonedDtls deathDtls) {
        if (deathAbandonedDtls == null) {
            deathAbandonedDtls = new ArrayList<>();
        }
        deathAbandonedDtls.add(deathDtls);

        return this;
    }
}
