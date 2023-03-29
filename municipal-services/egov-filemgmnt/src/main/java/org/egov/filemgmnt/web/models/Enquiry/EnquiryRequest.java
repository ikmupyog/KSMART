package org.egov.filemgmnt.web.models.Enquiry;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Schema(description = "Enquiry service request for create and update")
@Validated

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EnquiryRequest {

    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("Enquiry")
    private List<Enquiry> enquiryList;

    public EnquiryRequest addEnquiry(Enquiry newEnquiry) {

        if (enquiryList == null) {
            enquiryList = new ArrayList<>();
        }
        enquiryList.add(newEnquiry);
        return this;
    }
}
