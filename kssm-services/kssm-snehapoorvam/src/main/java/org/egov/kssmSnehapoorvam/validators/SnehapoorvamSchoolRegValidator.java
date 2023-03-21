package org.egov.kssmSnehapoorvam.validators;

import javax.validation.Valid;
import static org.egov.kssmSnehapoorvam.web.enums.ErrorCodes.INVALID_SEARCH;

import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.SchoolSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;


@Component
public class SnehapoorvamSchoolRegValidator {

    public void validateSearch(@Valid SchoolSearchCriteria searchCriteria) {
        if (searchCriteria.isEmpty()) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search without any paramters is not allowed");
        }

    }
    
}
