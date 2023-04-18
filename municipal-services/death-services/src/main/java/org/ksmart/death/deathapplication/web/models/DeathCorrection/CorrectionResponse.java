package org.ksmart.death.deathapplication.web.models.DeathCorrection;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

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
public class CorrectionResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("deathCorrection")
    @Valid
    private List<CorrectionDetails> deathCorrection;

    @JsonProperty("Count")
    private int count;

    public CorrectionResponse addCrDeathDtl(CorrectionDetails deathCorrDtls) {
        if (deathCorrection == null) {
            deathCorrection = new ArrayList<>();
        }
        deathCorrection.add(deathCorrDtls);

        return this;
    }
    
}
