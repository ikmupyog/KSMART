package org.egov.kssmAswasakiranam.validators;

import javax.validation.Valid;
import static org.egov.kssmAswasakiranam.web.enums.ErrorCodes.INVALID_SEARCH;

import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;


@Component
public class AswasakiranamSearchValidator {

    public void validateSearch(@Valid AswasakiranamSearchCriteria searchCriteria) {
        if (searchCriteria.isEmpty()) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search without any paramters is not allowed");
        }

    }
    
}
