package org.ksmart.marriage.marriageregistry.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
//import org.ksmart.marriage.marriageregistry.web.model.BirthCertificate;
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


public class MarriageRegistryResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("MarriageDetails")
    @Valid
    private List<MarriageRegistryDetails> marriageApplicationDetails;

//    @JsonProperty("BirthCertificate")
//    @Valid
//    private BirthCertificate birthCertificate;

    @JsonProperty("Count")
    private int count;

    public MarriageRegistryResponse addMarriageApplication(MarriageRegistryDetails details) {
        if (marriageApplicationDetails == null) {
            marriageApplicationDetails = new ArrayList<>();
        }
        marriageApplicationDetails.add(details);
        return this;
    }
}
