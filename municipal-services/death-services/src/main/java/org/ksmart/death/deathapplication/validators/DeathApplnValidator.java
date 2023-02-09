package org.ksmart.death.deathapplication.validators;

import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.DEATH_DETAILS_REQUIRED;
import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.DEATH_DETAILS_INVALID_CREATE;
import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.DEATH_REG_REQUIRED;
import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.DEATH_REG_INVALID_UPDATE;

import org.apache.commons.collections4.CollectionUtils;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.web.models.DeathAddressInfo;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.StringUtils;
/**
     * Creates Jasmine
     * on  04/12/2022
     */
@Component

public class DeathApplnValidator {


    public void validateUpdate(DeathDtlRequest request, List<DeathDtl> searchResult) {
        List<DeathDtl> deathdetails = request.getDeathCertificateDtls();

        if (CollectionUtils.isEmpty(deathdetails)) {
            throw new CustomException(DEATH_REG_REQUIRED.getCode(), "Death registration is required.");
        }

        if (deathdetails.size() > 1) { // NOPMD
            throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                    "Supports only single Death registration update request.");
        }

        if (deathdetails.size() != searchResult.size()) {
            throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                    "Death registration(s) not found in database.");
        }
  //IMP:Have to enable after URI submission
       // validateCommonFields( request);
    }
//UPDATE END
    
}
