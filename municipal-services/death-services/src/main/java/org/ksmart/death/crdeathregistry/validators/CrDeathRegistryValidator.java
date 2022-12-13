package org.ksmart.death.crdeathregistry.validators;

import java.util.List;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.DEATH_DETAILS_REQUIRED;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.DEATH_DETAILS_INVALID_CREATE;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.DEATH_REG_REQUIRED;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.DEATH_REG_INVALID_UPDATE;

import org.apache.commons.collections4.CollectionUtils;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
/**
     * Creates CrDeathService
     * Rakhi S IKM
     * on  04/12/2022
     */
@Component
public class CrDeathRegistryValidator {
    
     /**
     * Validate death  create request.
     *
     * @param request the
     *                {
     *                CrDeathDtlRequest}
     * 
     */
    public void validateCreate(CrDeathRegistryRequest request, Object mdmsData) {
        List<CrDeathRegistryDtl> deathDtls = request.getDeathCertificateDtls();

        if (CollectionUtils.isEmpty(deathDtls)) {
            throw new CustomException(DEATH_DETAILS_REQUIRED.getCode(), "Death details is required.");
        }

        if (deathDtls.size() > 1) { // NOPMD
            throw new CustomException(DEATH_DETAILS_INVALID_CREATE.getCode(),
                    "Supports only single death application create request.");
        }

        // mdmsValidator.validateMdmsData(request, mdmsData);
    }
    //UPDATE
    /**
     * Validate applicant personal update request.
     *
     * @param request the
     *                {@link CrDeathDtlRequest
     *                ApplicantPersonalRequest}
     */
    public void validateUpdate(CrDeathRegistryRequest request, List<CrDeathRegistryDtl> searchResult) {
        List<CrDeathRegistryDtl> deathdetails = request.getDeathCertificateDtls();

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
    }
//UPDATE END

}
