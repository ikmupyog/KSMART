package org.ksmart.marriage.marriageregistry.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

import java.util.ArrayList;
import java.util.List;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageRegistryRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("MarriageDetails")
    @Valid
    private List<MarriageRegistryDetails> marriageDetails;

    public MarriageRegistryRequest addMarriageDetails(MarriageRegistryDetails marriageDetail) {
        if (marriageDetails == null) {
            marriageDetails =  new ArrayList<>();
        }
        marriageDetails.add(marriageDetail);
        return this;
    }

}
