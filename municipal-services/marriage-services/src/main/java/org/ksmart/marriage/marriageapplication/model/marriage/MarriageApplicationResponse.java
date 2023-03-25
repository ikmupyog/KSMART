package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.response.ResponseInfo;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
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


public class MarriageApplicationResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("MarriageDetails")
    @Valid
    private List<MarriageApplicationDetail> marriageApplicationDetails;

    @JsonProperty("Count")
    private int count;

    public MarriageApplicationResponse addMarriageApplication(MarriageApplicationDetail details) {
        if (marriageApplicationDetails == null) {
            marriageApplicationDetails = new ArrayList<>();
        }
        marriageApplicationDetails.add(details);
        return this;
    }
}
