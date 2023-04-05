package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.REQUIRED;

import java.util.List;

import org.egov.filemgmnt.web.models.drafting.DraftFiles;
import org.egov.filemgmnt.web.models.drafting.DraftFilesRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DraftFilesValidator {

    public void validateDraftCreate(DraftFilesRequest request, Object mdmsData) {

        if (CollectionUtils.isEmpty(request.getDrafting())) {
            throw new CustomException(REQUIRED.getCode(), "Atleast one Draft is required");

        }
    }

    public void validateUpdate(DraftFilesRequest request, List<DraftFiles> searchResult) {
        List<DraftFiles> files = request.getDrafting();

        if (CollectionUtils.isEmpty(request.getDrafting())) {
            throw new CustomException(REQUIRED.getCode(), "Draft file is required");
        }

        if (files.size() > 1) { // NOPMD
            throw new CustomException(INVALID_UPDATE.getCode(), "Supports only single draft file update request.");

        }
        if (files.size() != searchResult.size()) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Draft file is  not found in database.");

        }

    }
}
