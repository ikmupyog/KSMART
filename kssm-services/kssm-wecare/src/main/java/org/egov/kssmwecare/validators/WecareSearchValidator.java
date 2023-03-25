package org.egov.kssmwecare.validators;
import javax.validation.Valid;
import static org.egov.kssmwecare.web.enums.ErrorCodes.INVALID_SEARCH;

import org.egov.kssmwecare.web.models.Wecare.WecareSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;


@Component
public class WecareSearchValidator {

   
     public void validateSearch(@Valid WecareSearchCriteria searchCriteria) {
        if (searchCriteria.isEmpty()) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search without any paramters is not allowed");
        }

    }
}
