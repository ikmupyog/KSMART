package org.ksmart.marriage.marriageapplication.validator;


import org.apache.commons.collections4.CollectionUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.ksmart.marriage.utils.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_UPDATE;
import static org.ksmart.marriage.utils.enums.ErrorCodes.MARRIAGE_DETAILS_REQUIRED;

//import static org.ksmart.marriage.utils.enums.ErrorCodes.BIRTH_DETAILS_REQUIRED;

@Component
public class MarriageApplicationValidator {


    public void validateUpdate(MarriageDetailsRequest request, List<MarriageApplicationDetails> searchResult) {
        List<MarriageApplicationDetails> deathdetails = request.getMarriageDetails();

        if (CollectionUtils.isEmpty(deathdetails)) {
            throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(), "Marriage registration is required.");
        }

        if (deathdetails.size() > 1) { // NOPMD
            throw new CustomException( MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Supports only single Marriage registration update request.");
        }

        if (deathdetails.size() != searchResult.size()) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Marriage registration(s) not found in database.");
        }
        //IMP:Have to enable after URI submission
        //validateCommonFields( request);
    }
}
