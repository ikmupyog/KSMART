package org.ksmart.marriage.marriageapplication.validator;

import org.ksmart.marriage.config.MarriageConfiguration;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.utils.enums.ErrorCodes;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.List;
import static org.ksmart.marriage.utils.enums.ErrorCodes.BIRTH_DETAILS_REQUIRED;

@Component
public class BirthApplicationValidator {
    private final MarriageConfiguration bndCofig;
    private final MdmsValidator mdmsValidator;

    @Autowired
    BirthApplicationValidator(MarriageConfiguration bndCofig, MdmsValidator mdmsValidator) {

        this.bndCofig = bndCofig;

        this.mdmsValidator = mdmsValidator;
    }

    /**
     * Validate abirth details create request.
     *
     * @param request the {@link MarriageDetailsRequest}
     */
    public void validateCreate(MarriageDetailsRequest request, Object mdmsData) {
        List<MarriageApplicationDetail> applicantPersonals = request.getBirthDetails();
        if (CollectionUtils.isEmpty(request.getBirthDetails())) {
            throw new CustomException(ErrorCodes.BIRTH_DETAILS_REQUIRED.getCode(),
                    "Birth details is required.");
        }

        if (applicantPersonals.size() > 1) { // NOPMD
            throw new CustomException(BIRTH_DETAILS_REQUIRED.getCode(),
                    "Supports only single Birth  application create request.");
        }

        mdmsValidator.validateMdmsData(request, mdmsData);
    }


}
