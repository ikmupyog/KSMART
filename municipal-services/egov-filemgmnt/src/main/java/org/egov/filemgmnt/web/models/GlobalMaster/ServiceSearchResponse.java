package org.egov.filemgmnt.web.models.GlobalMaster;

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

@Schema(description = "Service Master search results")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceSearchResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("ServiceDetails")
    private List<ServiceDetails> serviceDetails;

    public ServiceSearchResponse addService(final ServiceDetails serviceDetail) {
        if (serviceDetails == null) {
            serviceDetails = new ArrayList<>();
        }
        serviceDetails.add(serviceDetail);
        return this;
    }

}
