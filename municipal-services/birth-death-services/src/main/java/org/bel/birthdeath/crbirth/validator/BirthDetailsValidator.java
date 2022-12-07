package org.bel.birthdeath.crbirth.validator;

import org.bel.birthdeath.config.BirthDeathConfiguration;
import org.bel.birthdeath.crbirth.model.BirthDetailsRequest;
import org.bel.birthdeath.utils.enums.ErrorCodes;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

public class BirthDetailsValidator {
    private final BirthDeathConfiguration bndCofig;



    @Autowired
    public BirthDetailsValidator(BirthDeathConfiguration bndCofig) {
        this.bndCofig = bndCofig;
    }

    /**
     * Validate abirth details create request.
     *
     * @param request the {@link BirthDetailsRequest}
     */
    public void validateCreate(BirthDetailsRequest request, Object mdmsData) {
        if (CollectionUtils.isEmpty(request.getBirthDetails())) {
            throw new CustomException(ErrorCodes.BIRTH_DETAILS_REQUIRED.getCode(),
                    "Birth details is required.");
        }

       // mdmsValidator.validateMdmsData(request, mdmsData);
    }


}
