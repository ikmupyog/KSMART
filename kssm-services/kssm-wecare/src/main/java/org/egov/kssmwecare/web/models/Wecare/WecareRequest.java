package org.egov.kssmwecare.web.models.Wecare;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

// import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonProperty;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WecareRequest {

    @JsonProperty("RequestInfo")
    @Valid
    private RequestInfo requestInfo;

    @JsonProperty("wecare")
    @Valid
    private List<m_Wecare> tr_Wecares;

    // private OpeningBalanceRequest addobcredit (OpeningBalance ob) {
    //     if (ob == null) {
    //         OpeningBalances = new ArrayList<>();
    //     }
    //     OpeningBalances.add(ob);

    //     return this;
    // }
    
}
