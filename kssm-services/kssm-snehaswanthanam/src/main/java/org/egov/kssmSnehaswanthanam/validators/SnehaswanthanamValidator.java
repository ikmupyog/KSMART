package org.egov.kssmSnehaswanthanam.validators;

import javax.validation.Valid;
import static  org.egov.kssmSnehaswanthanam.web.enums.ErrorCodes.INVALID_SEARCH;
import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;

@Component
public class SnehaswanthanamValidator {

    public void validateSearch(@Valid SnehaswanthanamSearchCriteria searchCriteria) {
        if (searchCriteria.isEmpty()) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search without any paramters is not allowed");
        }

    }
    
}
