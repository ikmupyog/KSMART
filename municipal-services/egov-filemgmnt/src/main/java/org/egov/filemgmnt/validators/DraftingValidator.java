package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_SEARCH;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.REQUIRED;

import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.springframework.stereotype.Component;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DraftingValidator {

    public void validateDraftCreate(DraftingRequest request, Object mdmsData) {

        if (CollectionUtils.isEmpty(request.getDrafting())) {
            throw new CustomException(REQUIRED.getCode(), "Atleast one Draft is required");

        }
    }
    
    
}
