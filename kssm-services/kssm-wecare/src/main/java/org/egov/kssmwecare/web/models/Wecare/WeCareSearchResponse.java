package org.egov.kssmwecare.web.models.Wecare;


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
public class WeCareSearchResponse
 {
    

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("AswasakiranamResponse")
    @Valid
    private List<m_WecareSearch> wecareSearchDetails;

    

    public WeCareSearchResponse addSchoolDetails(m_WecareSearch wecaredetail) {

        if (wecaredetail == null) {
            wecareSearchDetails = new ArrayList<>();
        }
        wecareSearchDetails.add(wecaredetail);
        return this;

    }

}

