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
import org.egov.tl.web.models.correction.Correction;
import org.egov.tl.web.models.correction.CorrectionRequest;
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
     * @param correctionRequest The TradeLicense Create Request
     * @return The list of created correction details
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
                    wfIntegrator.callCorrectionWorkFlow(correctionRequest);
                break;
        }
        repository.saveCorrection(correctionRequest);

        return correctionRequest.getLicenseCorrection();
    }

    /**
     * Updates the tradeLicenses
     * 
     * @param tradeLicenseRequest The update Request
     * @return Updated TradeLcienses
     */
    public List<Correction> update(CorrectionRequest correctionRequest, String businessServicefromPath) {
        Correction correction = correctionRequest.getLicenseCorrection().get(0);
        // TradeLicense.ApplicationTypeEnum applicationType =
        // licence.getApplicationType();
        List<Correction> correctionResponse = null;
        if (businessServicefromPath == null)
            businessServicefromPath = businessService_TL;
        // tlValidator.validateBusinessService(correctionRequest,
        // businessServicefromPath);
        Object mdmsData = util.mDMSCall(correctionRequest.getRequestInfo(),
                correctionRequest.getLicenseCorrection().get(0).getTenantId());
        String businessServiceName = null;
        switch (businessServicefromPath) {
            case businessService_TL:
                businessServiceName = config.getTlBusinessServiceValue();
                break;
        }

        enrichmentCorrectionService.enrichTLCorrectionUpdateRequest(correctionRequest);

        /*
         * call workflow service if it's enable else uses internal workflow process
         */
        switch (businessServicefromPath) {
            case businessService_TL:
                if (config.getIsExternalWorkFlowEnabled())
                    wfIntegrator.callCorrectionWorkFlow(correctionRequest);
                break;
        }
        repository.updateCorrection(correctionRequest);
        correctionResponse = correctionRequest.getLicenseCorrection();
        return correctionResponse;

    }

}
