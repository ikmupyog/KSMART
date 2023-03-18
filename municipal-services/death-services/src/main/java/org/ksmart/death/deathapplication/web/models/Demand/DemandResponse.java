package org.ksmart.death.deathapplication.web.models.Demand;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *  DemandResponse model created by Rakhi S ikm on 17.03.2023
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DemandResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("Demands")
    private List<Demand> demands = new ArrayList<>();
}
