package org.egov.filemgmnt.validators;


import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.REQUIRED;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.springframework.stereotype.Component;
import org.egov.tracer.model.CustomException;
import org.springframework.util.CollectionUtils;


import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Component
public class DraftingValidator {

    public void validateDraftCreate(DraftingRequest request, Object mdmsData) {

        if (CollectionUtils.isEmpty(request.getDrafting())) {
            throw new CustomException(REQUIRED.getCode(), "Atleast one Draft is required");

        }
    }

  public void validateUpdate(DraftingRequest request, List<Drafting> searchResult) {
        List<Drafting> files = request.getDrafting();

        if (CollectionUtils.isEmpty(request.getDrafting())) {
            throw new CustomException(REQUIRED.getCode(), "Draft file is required");
        }

        if (files.size() > 1) { // NOPMD
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Supports only single draft file update request.");

        }
        if (files.size() != searchResult.size()) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Draft file is  not found in database.");


        }

    }
}
