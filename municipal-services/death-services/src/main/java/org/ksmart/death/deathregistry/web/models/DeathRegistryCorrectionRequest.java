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
     * Creates request 
     * Jasmine on 03.03.2023
     * 
     */

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryCorrectionRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("deathCorrection")
    @Valid
    private List<DeathRegistryCorrectionDtls> deathCorrection;

    public DeathRegistryCorrectionRequest addCrDeathDtl(DeathRegistryCorrectionDtls deathCorrDtls) {
        if (deathCorrection == null) {
            deathCorrection = new ArrayList<>();
        }
        deathCorrection.add(deathCorrDtls);

        return this;
    }
    
}
