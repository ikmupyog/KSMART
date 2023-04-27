package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_SEARCH;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.REQUIRED;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.repository.DraftFilesRepository;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.web.models.drafting.DraftFiles;
import org.egov.filemgmnt.web.models.drafting.DraftFilesRequest;
import org.egov.filemgmnt.web.models.drafting.DraftFilesSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DraftFilesValidator {

    @Autowired
    private FMConfiguration fmConfig;

    @Autowired
    private DraftFilesRepository repository;

    public void validateDraftCreate(DraftFilesRequest request) {

        if (CollectionUtils.isEmpty(request.getDrafting())) {
            throw new CustomException(REQUIRED.getCode(), "Atleast one Draft is required");

        }

        for (DraftFiles draftFiles : request.getDrafting()) {
            if (StringUtils.isNotBlank(draftFiles.getTenantId()) && StringUtils.isNotBlank(draftFiles.getAssigner())
                    && StringUtils.isNotBlank(draftFiles.getFileCode())
                    && StringUtils.isNotBlank(draftFiles.getDraftType())) {

                DraftFilesSearchCriteria searchCriteria = new DraftFilesSearchCriteria();

                searchCriteria.setAssigner(draftFiles.getAssigner());
                searchCriteria.setFileCode(draftFiles.getFileCode());
                searchCriteria.setTenantId(draftFiles.getTenantId());
                searchCriteria.setDraftType(draftFiles.getDraftType());

                // final DraftFiles draftDetails = finalDraftDetails(searchCriteria);
                final List<DraftFiles> draftDetails = repository.searchDrafting(searchCriteria);
                if (!draftDetails.isEmpty()) {
                    throw new CustomException(INVALID_SEARCH.getCode(), "Draft Already Existing");
                }

            }
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

    public void validateSearchDraftFiles(final RequestInfo requestInfo, // NOPMD
                                         final DraftFilesSearchCriteria searchCriteria) {
        if (StringUtils.isBlank(searchCriteria.getTenantId())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Tenant id is required for draft search.");
        }

        if (StringUtils.isBlank(searchCriteria.getAssigner())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Assinger is required for draft search.");
        }

        if (StringUtils.isBlank(searchCriteria.getFileCode())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "File Code is required for draft search.");
        }

        if (StringUtils.isBlank(searchCriteria.getDraftType())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Draft Type is required for draft search.");
        }

        final String allowedSearchParams = fmConfig.getAllowedDraftFilesSearchParams();

        if (StringUtils.isNotBlank(allowedSearchParams)) {
            final List<String> allowedSearchTokens = Arrays.asList(allowedSearchParams.split(","));
            validateSearchParams(searchCriteria, allowedSearchTokens);
        }

        if (StringUtils.isNotBlank(searchCriteria.getTenantId()) && StringUtils.isBlank(searchCriteria.getAssigner())
                && StringUtils.isBlank(searchCriteria.getFileCode())
                && StringUtils.isBlank(searchCriteria.getDraftType())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search based only on tenant id is not allowed.");
        }
    }

    private void validateSearchParams(final DraftFilesSearchCriteria searchCriteria, final List<String> allowedParams) {
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
