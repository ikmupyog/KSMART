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
     * Creates DeathAbandonedRequest  Model
     * Rakhi S  on 03.03.2023
     * 
     */

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathAbandonedRequest {
    
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("deathAbandonedDtls")
    @Valid
    private List<DeathAbandonedDtls> deathAbandonedDtls;

    public DeathAbandonedRequest addCrDeathDtl(DeathAbandonedDtls deathDtl) {
        if (deathAbandonedDtls == null) {
            deathAbandonedDtls = new ArrayList<>();
        }
        deathAbandonedDtls.add(deathDtl);

        return this;
    }

}
