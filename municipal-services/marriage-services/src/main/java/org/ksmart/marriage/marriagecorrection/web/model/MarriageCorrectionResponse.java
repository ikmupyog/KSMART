package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
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
public class MarriageCorrectionResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("marriageCorrectionDetails")
    @Valid
    private List<MarriageCorrectionDetails> marriageCorrectionDetails;

    public MarriageCorrectionResponse addCrMarriageDtl(MarriageCorrectionDetails marriageCorrection) {
        if (marriageCorrectionDetails == null) {
            marriageCorrectionDetails = new ArrayList<>();
        }
        marriageCorrectionDetails.add(marriageCorrection);
        return this;
    }
}
