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
     * Creates response 
     * Jasmine on 03.03.2023
     * 
     */

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathCorrectionResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("deathCorrection")
    @Valid
    private List<DeathCorrectionDtls> deathCorrection;

    @JsonProperty("Count")
    private int count;

    public DeathCorrectionResponse addCrDeathDtl(DeathCorrectionDtls deathCorrDtls) {
        if (deathCorrection == null) {
            deathCorrection = new ArrayList<>();
        }
        deathCorrection.add(deathCorrDtls);

        return this;
    }
    
}
