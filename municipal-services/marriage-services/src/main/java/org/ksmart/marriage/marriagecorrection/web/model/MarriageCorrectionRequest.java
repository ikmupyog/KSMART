package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageCorrectionRequest {

    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("CorrectionDetails")
    @Valid
    private List<MarriageCorrectionDetails> marriageCorrectionDetails;

    public MarriageCorrectionRequest addCrMarriageDtl(MarriageCorrectionDetails marriageCorrection) {
        if (marriageCorrectionDetails == null) {
            marriageCorrectionDetails = new ArrayList<>();
        }
        marriageCorrectionDetails.add(marriageCorrection);
        return this;
    }
}
