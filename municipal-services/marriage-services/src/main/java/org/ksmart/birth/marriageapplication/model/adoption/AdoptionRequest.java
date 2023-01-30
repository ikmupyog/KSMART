package org.ksmart.birth.marriageapplication.model.adoption;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.ksmart.birth.marriageapplication.model.AdoptionDetail;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.List;
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdoptionRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("AdoptionDetails")
    @Valid
    private List<AdoptionDetail> adoptionDetails;

    public AdoptionRequest addAdoptionDetails(AdoptionDetail adoptionDetail) {
        if (adoptionDetails == null) {
            adoptionDetails = null;
        }
        return this;
    }
}
