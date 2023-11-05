package org.ksmart.marriage.marriageapplication.web.model.Demand;

import java.util.ArrayList;
import java.util.List;
import org.egov.common.contract.response.ResponseInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *  Created by Jasmine on 30.03.2023
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
