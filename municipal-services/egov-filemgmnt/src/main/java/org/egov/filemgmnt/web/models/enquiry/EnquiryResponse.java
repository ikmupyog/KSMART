package org.egov.filemgmnt.web.models.enquiry;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Enquiry service response for create and update")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EnquiryResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("Enquiry")
    private List<Enquiry> enquiryList;

    public EnquiryResponse addEnquiry(Enquiry newEnquiry) {

        if (enquiryList == null) {
            enquiryList = new ArrayList<>();
        }
        enquiryList.add(newEnquiry);
        return this;
    }
}
