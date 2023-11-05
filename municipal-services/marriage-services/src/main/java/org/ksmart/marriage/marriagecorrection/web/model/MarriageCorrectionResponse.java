package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertificate;
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

    @JsonProperty("marriageCertificate")
    @Valid
    private MarriageCertificate marriageCertificate;

    public MarriageCorrectionResponse addCrMarriageDtl(MarriageCorrectionDetails marriageCorrection) {
        if (marriageCorrectionDetails == null) {
            marriageCorrectionDetails = new ArrayList<>();
        }
        marriageCorrectionDetails.add(marriageCorrection);
        return this;
    }
    @JsonProperty("MarriageDetails")
    private List<MarriageApplicationDetails> marriageDetails;

}
