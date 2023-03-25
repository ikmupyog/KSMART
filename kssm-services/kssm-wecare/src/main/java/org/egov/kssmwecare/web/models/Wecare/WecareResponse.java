package org.egov.kssmwecare.web.models.Wecare;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonProperty;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WecareResponse {
    
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("wecare")
    @Valid
    private List<m_Wecare> tr_Wecares;
   
    public WecareResponse addobcredit(m_Wecare ob) {
        if (ob == null) {
            tr_Wecares = new ArrayList<>();
        }
        tr_Wecares.add(ob);

        return this;
    }


}
