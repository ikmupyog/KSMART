package org.egov.kssmwecare.web.models.Wecare;


import java.util.List;
import java.util.concurrent.atomic.LongAccumulator;

import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WecareSearchCriteria {

    @JsonProperty("numkssmpensionerid")
    private List<Long> numkssmpensionerid;
    
    public boolean isEmpty() {

        return (CollectionUtils.isEmpty(numkssmpensionerid));

    }

}
