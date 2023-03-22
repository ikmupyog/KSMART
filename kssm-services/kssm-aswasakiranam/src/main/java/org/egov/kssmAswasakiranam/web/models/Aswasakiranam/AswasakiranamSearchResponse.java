package org.egov.kssmAswasakiranam.web.models.Aswasakiranam;


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
public class AswasakiranamSearchResponse
 {
    

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("AswasakiranamResponse")
    @Valid
    private List<m_AswasakiranamSearchResponse> AswasakiranamDetails;

    

    public AswasakiranamSearchResponse addSchoolDetails(m_AswasakiranamSearchResponse aswasakiranamdetail) {

        if (aswasakiranamdetail == null) {
            AswasakiranamDetails = new ArrayList<>();
        }
        AswasakiranamDetails.add(aswasakiranamdetail);
        return this;

    }

}

