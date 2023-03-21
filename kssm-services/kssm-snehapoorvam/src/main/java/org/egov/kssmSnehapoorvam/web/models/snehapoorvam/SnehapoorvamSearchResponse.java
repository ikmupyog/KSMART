package org.egov.kssmSnehapoorvam.web.models.snehapoorvam;
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
public class SnehapoorvamSearchResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("SnehapoorvamDetails")
    @Valid
    private List<m_SnehapoorvamSearchResponse> SnehapoorvamDetails;

    public SnehapoorvamSearchResponse addSnehapoorvamDetails(m_SnehapoorvamSearchResponse snehapoorvamdetail) {

        if (snehapoorvamdetail == null) {
            SnehapoorvamDetails = new ArrayList<>();
        }
        SnehapoorvamDetails.add(snehapoorvamdetail);
        return this;

    }
}
