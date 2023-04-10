package org.ksmart.marriage.marriageapplication.web.model.marriage;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.List;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageDetailsRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("MarriageDetails")
    @Valid
    private List<MarriageApplicationDetails> marriageDetails;

    public MarriageDetailsRequest addMarriageDetails(MarriageApplicationDetails marriageDetail) {
        if (marriageDetails == null) {
            marriageDetails = null;
        }
        return this;
    }
}
