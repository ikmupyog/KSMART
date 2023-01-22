package org.ksmart.death.crdeathregistry.validators;

import java.util.Arrays;
import java.util.List;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.DEATH_DETAILS_REQUIRED;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.DEATH_DETAILS_INVALID_CREATE;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.DEATH_REG_REQUIRED;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.DEATH_REG_INVALID_UPDATE;
import static org.ksmart.death.crdeathregistry.web.enums.ErrorCodes.INVALID_SEARCH;



import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.ksmart.death.crdeath.config.CrDeathConfiguration;
import org.ksmart.death.crdeathregistry.util.CrDeathRegistryUtil;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryCriteria;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;
/**
    * * Creates CrDeathRegistryValidator
        *  Jasmine
     * on  04/12/2022
     */
@Component
public class CrDeathRegistryValidator {

    private final CrDeathConfiguration config;
    
    //@Autowired
    public CrDeathRegistryValidator( CrDeathConfiguration config
                                      ) {

        this.config = config;
    }

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
    //UPDATE  Jasmine
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
    //07/01/2023 Jasmine
    /**
     * Validates if the search parameters are valid
     * 
     * @param requestInfo The requestInfo of the incoming request
     * @param criteria    The TradeLicenseSearch Criteria
     */
    public void validateSearch(RequestInfo requestInfo, CrDeathRegistryCriteria criteria) {
        if (StringUtils.isBlank(criteria.getTenantId())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Tenant id is required.");
        }

        String allowedSearchParams = config.getAllowedCitizenSearchParams();

        if (StringUtils.isNotBlank(allowedSearchParams)) {
            List<String> allowedSearchTokens = Arrays.asList(allowedSearchParams.split(","));
            validateSearchParams(criteria, allowedSearchTokens);
        }

        if (StringUtils.isNotBlank(criteria.getTenantId()) && StringUtils.isBlank(criteria.getId())
                && StringUtils.isBlank(criteria.getRegistrationNo()) && criteria.getFromDate() == null
                && StringUtils.isBlank(criteria.getAadhaarNo()) && StringUtils.isBlank(criteria.getDeathACKNo())
                && StringUtils.isBlank(criteria.getDeathApplicationNo())) {
                throw new CustomException(INVALID_SEARCH.getCode(), "Search based only on tenant id is not allowed.");
        }
    }

    private void validateSearchParams(CrDeathRegistryCriteria criteria, List<String> allowedParams) {
        BeanWrapper bw = new BeanWrapperImpl(criteria);

        CrDeathRegistryUtil.validateSearchParam(bw, "tenantId", allowedParams);
        CrDeathRegistryUtil.validateSearchParam(bw, "id", allowedParams);
        CrDeathRegistryUtil.validateSearchParam(bw, "fromDate", allowedParams);
        CrDeathRegistryUtil.validateSearchParam(bw, "toDate", allowedParams);
        CrDeathRegistryUtil.validateSearchParam(bw, "aadhaarNo", allowedParams);
        CrDeathRegistryUtil.validateSearchParam(bw, "registrationNo", allowedParams);
        CrDeathRegistryUtil.validateSearchParam(bw, "deathApplicationNo", allowedParams);
        CrDeathRegistryUtil.validateSearchParam(bw, "deathACKNo", allowedParams);
        CrDeathRegistryUtil.validateSearchParam(bw, "deceasedFirstNameEn", allowedParams);
    }

}
