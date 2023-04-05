package org.egov.filemgmnt.web.models.enquiry;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
