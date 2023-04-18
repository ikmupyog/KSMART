package org.ksmart.death.deathapplication.web.models.DeathCorrection;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
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
public class CorrectionRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("CorrectionDetails")
    @Valid
    private List<CorrectionDetails> correctionDetails;

    public CorrectionRequest addCrDeathDtl(CorrectionDetails details) {
        if (correctionDetails == null) {
            correctionDetails = new ArrayList<>();
        }
        correctionDetails.add(details);

        return this;
    }
    
}
