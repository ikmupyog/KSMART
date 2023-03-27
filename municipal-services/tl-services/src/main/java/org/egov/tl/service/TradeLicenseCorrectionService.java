package org.egov.tl.service;

import java.util.*;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tl.config.TLConfiguration;
import org.egov.tl.repository.TLRepository;
import org.egov.tl.service.notification.EditNotificationService;
import org.egov.tl.util.TLConstants;
import org.egov.tl.util.TradeUtil;
import org.egov.tl.util.IDGenerator;
import org.egov.tl.validator.TLValidator;
import org.egov.tl.web.models.*;
import org.egov.tl.web.models.user.UserDetailResponse;
import org.egov.tl.web.models.workflow.BusinessService;
import org.egov.tl.workflow.ActionValidator;
import org.egov.tl.workflow.TLWorkflowService;
import org.egov.tl.workflow.WorkflowIntegrator;
import org.egov.tl.workflow.WorkflowService;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import static org.egov.tl.util.TLConstants.*;
import static org.egov.tracer.http.HttpUtils.isInterServiceCall;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.CollectionUtils;

import com.jayway.jsonpath.JsonPath;

@Service
@Slf4j
public class TradeLicenseCorrectionService {

    private WorkflowIntegrator wfIntegrator;

    private EnrichmentCorrectionService enrichmentCorrectionService;

    private UserService userService;

    private TLRepository repository;

    private ActionValidator actionValidator;

    private TLValidator tlValidator;

    private TLWorkflowService TLWorkflowService;

    private CalculationService calculationService;

    private TradeUtil util;

    private DiffService diffService;

    private TLConfiguration config;

    private WorkflowService workflowService;

    private EditNotificationService editNotificationService;

    private TradeUtil tradeUtil;

    private TLBatchService tlBatchService;

    private IDGenerator idGenerator;

    @Value("${workflow.bpa.businessServiceCode.fallback_enabled}")
    private Boolean pickWFServiceNameFromTradeTypeOnly;

    @Autowired
    public TradeLicenseCorrectionService(WorkflowIntegrator wfIntegrator,
            EnrichmentCorrectionService enrichmentCorrectionService,
            UserService userService, TLRepository repository, ActionValidator actionValidator,
            TLValidator tlValidator, TLWorkflowService TLWorkflowService,
            CalculationService calculationService, TradeUtil util, DiffService diffService,
            TLConfiguration config, EditNotificationService editNotificationService, WorkflowService workflowService,
            TradeUtil tradeUtil, TLBatchService tlBatchService, IDGenerator idGenerator) {
        this.wfIntegrator = wfIntegrator;
        this.enrichmentCorrectionService = enrichmentCorrectionService;
        this.userService = userService;
        this.repository = repository;
        this.actionValidator = actionValidator;
        this.tlValidator = tlValidator;
        this.TLWorkflowService = TLWorkflowService;
        this.calculationService = calculationService;
        this.util = util;
        this.diffService = diffService;
        this.config = config;
        this.editNotificationService = editNotificationService;
        this.workflowService = workflowService;
        this.tradeUtil = tradeUtil;
        this.tlBatchService = tlBatchService;
        this.idGenerator = idGenerator;
    }

    /**
     * creates the tradeLicense for the given request
     * 
     * @param tradeLicenseRequest The TradeLicense Create Request
     * @return The list of created traddeLicense
     */
    public List<Correction> create(CorrectionRequest correctionRequest, String businessServicefromPath) {
        if (businessServicefromPath == null)
            businessServicefromPath = businessService_TL;
        // tlValidator.validateBusinessService(correctionRequest,
        // businessServicefromPath);
        Object mdmsData = util.mDMSCall(correctionRequest.getRequestInfo(),
                correctionRequest.getLicenseCorrection().get(0).getTenantId());
        // actionValidator.validateCreateRequest(correctionRequest);
        enrichmentCorrectionService.enrichTLCreateRequest(correctionRequest, mdmsData);

        /*
         * call workflow service if it's enable else uses internal workflow process
         */
        switch (businessServicefromPath) {
            case businessService_TL:
                if (config.getIsExternalWorkFlowEnabled())
                    // wfIntegrator.callWorkFlow(correctionRequest);
                    break;
        }
        repository.saveCorrection(correctionRequest);

        return correctionRequest.getLicenseCorrection();
    }

    /**
     * Searches the tradeLicense for the given criteria if search is on owner
     * paramter then first user service
     * is called followed by query to db
     * 
     * @param criteria    The object containing the paramters on which to search
     * @param requestInfo The search request's requestInfo
     * @return List of tradeLicense for the given criteria
     */

    public List<TradeLicense> search(TradeLicenseSearchCriteria criteria, RequestInfo requestInfo,
            String serviceFromPath, HttpHeaders headers) {
        List<TradeLicense> licenses;
        // allow mobileNumber based search by citizen if interserviceCall
        criteria.setUserId(requestInfo.getUserInfo().getUuid());
        boolean isInterServiceCall = isInterServiceCall(headers);
        criteria.setBusinessService(serviceFromPath);
        licenses = repository.getLicensesPde(criteria);
        return licenses;
    }

    /**
     * Updates the tradeLicenses
     * 
     * @param tradeLicenseRequest The update Request
     * @return Updated TradeLcienses
     */
    public List<TradeLicense> update(TradeLicenseRequest tradeLicenseRequest, String businessServicefromPath) {
        TradeLicense licence = tradeLicenseRequest.getLicenses().get(0);
        TradeLicense.ApplicationTypeEnum applicationType = licence.getApplicationType();
        List<TradeLicense> licenceResponse = null;
        if (businessServicefromPath == null)
            businessServicefromPath = businessService_TL;
        tlValidator.validateBusinessService(tradeLicenseRequest, businessServicefromPath);
        Object mdmsData = util.mDMSCall(tradeLicenseRequest.getRequestInfo(),
                tradeLicenseRequest.getLicenses().get(0).getTenantId());
        String businessServiceName = null;
        switch (businessServicefromPath) {
            case businessService_TL:
                businessServiceName = config.getTlBusinessServiceValue();
                break;

            case businessService_BPA:
                String tradeType = tradeLicenseRequest.getLicenses().get(0).getTradeLicenseDetail().getTradeUnits()
                        .get(0).getBusinessSubtype();
                if (pickWFServiceNameFromTradeTypeOnly)
                    tradeType = tradeType.split("\\.")[0];
                businessServiceName = tradeType;
                break;
        }

        enrichmentCorrectionService.enrichTLUpdateRequest(tradeLicenseRequest);

        repository.updatePde(tradeLicenseRequest);
        licenceResponse = tradeLicenseRequest.getLicenses();
        return licenceResponse;

    }

    /**
     * Updates the tradeLicenses
     * 
     * @param tradeLicenseRequest The update Request
     * @return Updated TradeLcienses
     */
    public List<TradeLicense> updatewf(TradeLicenseRequest tradeLicenseRequest, String businessServicefromPath) {
        TradeLicense licence = tradeLicenseRequest.getLicenses().get(0);
        RequestInfo requestInfo = tradeLicenseRequest.getRequestInfo();
        TradeLicense.ApplicationTypeEnum applicationType = licence.getApplicationType();
        List<TradeLicense> licenceResponse = null;
        if (businessServicefromPath == null)
            businessServicefromPath = businessService_TL;
        tlValidator.validateBusinessService(tradeLicenseRequest, businessServicefromPath);
        Object mdmsData = util.mDMSCall(tradeLicenseRequest.getRequestInfo(),
                tradeLicenseRequest.getLicenses().get(0).getTenantId());
        String IDGenerated = null;
        if (tradeLicenseRequest.getLicenses().get(0).getAction().equals("APPROVE")) {
            IDGenerated = idGenerator.setIDGenerator(tradeLicenseRequest, TLConstants.FUN_MODULE_NEWL,
                    TLConstants.REG_UNIT_CAPTION);
            tradeLicenseRequest.getLicenses().get(0).getTradeLicenseDetail().getEstablishmentUnit()
                    .setEstablishmentUnitId(IDGenerated);
            tradeLicenseRequest.getLicenses().get(0).getTradeLicenseDetail().getEstablishmentUnit().setActive(true);
            tradeLicenseRequest.getLicenses().get(0).getTradeLicenseDetail().setEstablishmentUnitId(IDGenerated);
        } else {
            tradeLicenseRequest.getLicenses().get(0).getTradeLicenseDetail().getEstablishmentUnit()
                    .setEstablishmentUnitId(null);
            tradeLicenseRequest.getLicenses().get(0).getTradeLicenseDetail().getEstablishmentUnit().setActive(false);
            tradeLicenseRequest.getLicenses().get(0).getTradeLicenseDetail().setEstablishmentUnitId(null);
        }
        if (!CollectionUtils.isEmpty(tradeLicenseRequest.getLicenses().get(0).getAssignee())) {
            tradeLicenseRequest.getLicenses().get(0).getAssignee().forEach(assignee -> {
                tradeLicenseRequest.getLicenses().get(0)
                        .setAssignUser(assignee);
            });
        } else {
            tradeLicenseRequest.getLicenses().get(0).setAssignUser(requestInfo.getUserInfo().getUuid());
        }
        String businessServiceName = null;
        switch (businessServicefromPath) {
            case businessService_TL:
                businessServiceName = config.getTlBusinessServiceValue();
                break;

            case businessService_BPA:
                String tradeType = tradeLicenseRequest.getLicenses().get(0).getTradeLicenseDetail().getTradeUnits()
                        .get(0).getBusinessSubtype();
                if (pickWFServiceNameFromTradeTypeOnly)
                    tradeType = tradeType.split("\\.")[0];
                businessServiceName = tradeType;
                break;
        }

        // enrichmentPdeService.enrichTLUpdateRequest(tradeLicenseRequest);

        /*
         * call workflow service if it's enable else uses internal workflow process
         */

        List<String> endStates = Collections.nCopies(tradeLicenseRequest.getLicenses().size(), STATUS_APPROVED);
        switch (businessServicefromPath) {
            case businessService_TL:
                if (config.getIsExternalWorkFlowEnabled()) {
                    wfIntegrator.callWorkFlow(tradeLicenseRequest);
                } else {
                    TLWorkflowService.updateStatus(tradeLicenseRequest);
                }
                break;

            case businessService_BPA:
                endStates = tradeUtil.getBPAEndState(tradeLicenseRequest);
                wfIntegrator.callWorkFlow(tradeLicenseRequest);
                break;
        }
        repository.updatePdeWf(tradeLicenseRequest);
        licenceResponse = tradeLicenseRequest.getLicenses();
        return licenceResponse;

    }

}
