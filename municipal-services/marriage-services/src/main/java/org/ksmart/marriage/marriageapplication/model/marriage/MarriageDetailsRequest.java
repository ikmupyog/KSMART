package org.ksmart.marriage.marriageapplication.model.marriage;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
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
    private List<MarriageApplicationDetail> marriageDetails;

    public MarriageDetailsRequest addBirthDetails(MarriageApplicationDetail birthDetail) {
        if (marriageDetails == null) {
            marriageDetails = null;
        }
        return this;
    }
}
