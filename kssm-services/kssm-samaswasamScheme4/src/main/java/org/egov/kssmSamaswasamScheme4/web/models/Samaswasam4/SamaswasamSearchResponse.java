package org.egov.kssmSamaswasamScheme4.web.models.Samaswasam4;


import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SamaswasamSearchResponse
 {
    

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("Samaswasam4Response")
    @Valid
    private List<m_SamaswasamSearchResponse> SamaswasamDetails;

    

    public SamaswasamSearchResponse addSchoolDetails(m_SamaswasamSearchResponse samaswasamdetail) {

        if (samaswasamdetail == null) {
            SamaswasamDetails = new ArrayList<>();
        }
        SamaswasamDetails.add(samaswasamdetail);
        return this;

    }

}

