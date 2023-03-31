package org.egov.filemgmnt.web.models.Enquiry;


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
public class EnquirySearchResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("Enquiry")
    @Valid
    private List<Enquiry> enquiries;
    @JsonProperty("Count")
    private int count;
    public EnquirySearchResponse addEnquiry (Enquiry enquiry) {
        if (enquiries==null){
            enquiries =new ArrayList<>();
        }
        enquiries.add(enquiry);
        return this ;

    }
}
