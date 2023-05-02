package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_CREATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_SEARCH;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.repository.DraftFilesRepository;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileRequest;
import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

@Component
public class DraftFilesValidator {

    @Autowired
    private FMConfiguration fmConfig;

    @Autowired
    private DraftFilesRepository repository;

    public void validateCreate(final DraftFileRequest request) {
        final DraftFile draftFile = request.getDraftFile();

        Assert.notNull(draftFile, "Draft file must not be null.");

        if (StringUtils.isNotBlank(draftFile.getTenantId()) && StringUtils.isNotBlank(draftFile.getAssigner())
                && StringUtils.isNotBlank(draftFile.getFileCode()) && draftFile.getDraftType() != null) {

            DraftFileSearchCriteria criteria = new DraftFileSearchCriteria();
            criteria.setAssigner(draftFile.getAssigner());
            criteria.setFileCode(draftFile.getFileCode());
            criteria.setTenantId(draftFile.getTenantId());
            criteria.setDraftType(draftFile.getDraftType());

            // final DraftFiles draftDetails = finalDraftDetails(searchCriteria);
            final List<DraftFile> results = repository.search(criteria);
            if (!CollectionUtils.isEmpty(results)) {
                throw new CustomException(INVALID_CREATE.getCode(), "Draft file already exists");
            }

        }
    }

    public void validateUpdate(final DraftFileRequest request, final List<DraftFile> results) {
        final DraftFile draftFile = request.getDraftFile();

        Assert.notNull(draftFile, "Draft file must not be null.");

    }

    public void validateSearch(final RequestInfo requestInfo, // NOPMD
                               final DraftFileSearchCriteria criteria) {
        if (StringUtils.isBlank(criteria.getTenantId())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Tenant id is required for draft search.");
        }

        if (StringUtils.isBlank(criteria.getAssigner())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Assinger is required for draft search.");
        }

        if (StringUtils.isBlank(criteria.getFileCode())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "File Code is required for draft search.");
        }

        if (criteria.getDraftType() == null) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Draft Type is required for draft search.");
        }

        final String allowedSearchParams = fmConfig.getAllowedDraftFilesSearchParams();

        if (StringUtils.isNotBlank(allowedSearchParams)) {
            final List<String> allowedSearchTokens = Arrays.asList(allowedSearchParams.split(","));
            validateSearchParams(criteria, allowedSearchTokens);
        }

        if (StringUtils.isNotBlank(criteria.getTenantId()) && StringUtils.isBlank(criteria.getAssigner())
                && StringUtils.isBlank(criteria.getFileCode()) && criteria.getDraftType() == null) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search based only on tenant id is not allowed.");
        }
    }

    private void validateSearchParams(final DraftFileSearchCriteria searchCriteria, final List<String> allowedParams) {
        final BeanWrapper bw = new BeanWrapperImpl(searchCriteria);

        FMUtils.validateSearchParam(bw, "tenantId", allowedParams);
        FMUtils.validateSearchParam(bw, "businessService", allowedParams);
        FMUtils.validateSearchParam(bw, "assigner", allowedParams);
        FMUtils.validateSearchParam(bw, "fileCode", allowedParams);
        FMUtils.validateSearchParam(bw, "draftType", allowedParams);
        FMUtils.validateSearchParam(bw, "uuid", allowedParams);
        FMUtils.validateSearchParam(bw, "moduleName", allowedParams);
    }

}
