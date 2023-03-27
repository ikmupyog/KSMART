package org.egov.tl.service;

import org.egov.common.contract.request.RequestInfo;
import org.egov.tl.config.TLConfiguration;
import org.egov.tl.repository.IdGenRepository;
import org.egov.tl.repository.TLRepository;
import org.egov.tl.util.TLConstants;
import org.egov.tl.util.TradeUtil;
import org.egov.tl.validator.MDMSValidator;
import org.egov.tl.web.models.*;
import org.egov.tl.web.models.Idgen.IdResponse;
import org.egov.tl.web.models.user.UserDetailResponse;
import org.egov.tl.web.models.workflow.BusinessService;
import org.egov.tl.workflow.WorkflowService;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import com.jayway.jsonpath.JsonPath;
import org.egov.tl.util.IDGenerator;

import java.util.*;
import java.util.stream.Collectors;
import static org.egov.tl.util.TLConstants.*;

@Service
public class EnrichmentCorrectionService {

    private IdGenRepository idGenRepository;
    private TLConfiguration config;
    private TradeUtil tradeUtil;
    private BoundaryService boundaryService;
    private UserService userService;
    private WorkflowService workflowService;
    private TLRepository tlrepository;
    private TradeUtil util;
    private IDGenerator idGen;

    @Autowired
    public EnrichmentCorrectionService(IdGenRepository idGenRepository, TLConfiguration config, TradeUtil tradeUtil,
            BoundaryService boundaryService, UserService userService, WorkflowService workflowService,
            TLRepository tlrepository, TradeUtil util, IDGenerator idGen) {
        this.idGenRepository = idGenRepository;
        this.config = config;
        this.tradeUtil = tradeUtil;
        this.boundaryService = boundaryService;
        this.userService = userService;
        this.workflowService = workflowService;
        this.tlrepository = tlrepository;
        this.util = util;
        this.idGen = idGen;
    }

    /**
     * Enriches the incoming createRequest
     * 
     * @param tradeLicenseRequest The create request for the tradeLicense
     */
    public void enrichTLCreateRequest(CorrectionRequest correctionRequest, Object mdmsData) {
        RequestInfo requestInfo = correctionRequest.getRequestInfo();
        String uuid = requestInfo.getUserInfo().getUuid();
        AuditDetails auditDetails = tradeUtil.getAuditDetails(uuid, true);
        correctionRequest.getLicenseCorrection().forEach(correction -> {
            correction.setId(UUID.randomUUID().toString());
            correction.setAuditDetails(auditDetails);
            correction.setActive(true);
            correction.setApplicationNumber(
                    idGen.setIDGenCorrection(correctionRequest, TLConstants.FUN_MODULE_CORRECTION,
                            TLConstants.APP_NUMBER_CAPTION));
            // if (requestInfo.getUserInfo().getType().equalsIgnoreCase("CITIZEN"))
            // tradeLicense.setAccountId(requestInfo.getUserInfo().getUuid());

        });
        // setIdgenPdeIds(tradeLicenseRequest);
        // setStatusForCreate(correctionRequest);
    }

    /**
     * Enriches the update request
     * 
     * @param tradeLicenseRequest The input update request
     */
    public void enrichTLUpdateRequest(TradeLicenseRequest tradeLicenseRequest) {
        RequestInfo requestInfo = tradeLicenseRequest.getRequestInfo();
        AuditDetails auditDetails = tradeUtil.getAuditDetails(requestInfo.getUserInfo().getUuid(), true);
        tradeLicenseRequest.getLicenses().forEach(tradeLicense -> {
            tradeLicense.setAuditDetails(auditDetails);
            // enrichAssignes(tradeLicense);
            String nameOfBusinessService = tradeLicense.getBusinessService();
            if (nameOfBusinessService == null) {
                nameOfBusinessService = businessService_TL;
                tradeLicense.setBusinessService(nameOfBusinessService);
            }
            // if ((nameOfBusinessService.equals(businessService_BPA)
            // && (tradeLicense.getStatus().equalsIgnoreCase(STATUS_INITIATED)))
            // || workflowService.isStateUpdatable(tradeLicense.getStatus(),
            // businessService)) {
            tradeLicense.getTradeLicenseDetail().setAuditDetails(auditDetails);

            EstablishmentUnit ins = new EstablishmentUnit();
            ins.setEstablishmentUnitId(tradeLicense.getTradeLicenseDetail().getEstablishmentUnitId());
            ins.setEstablishmentUnitName(tradeLicense.getLicenseUnitName());
            tradeLicense.getTradeLicenseDetail().setEstablishmentUnit(ins);

            tradeLicense.getTradeLicenseDetail().getStructurePlace().forEach(structurePlace -> {
                structurePlace.setTenantId(tradeLicense.getTenantId());
                structurePlace.setId(UUID.randomUUID().toString());
                structurePlace.setActive(true);
            });

            tradeLicense.getTradeLicenseDetail().getOwnersPde().forEach(owner -> {
                owner.setId(UUID.randomUUID().toString());
                owner.setTenantId(tradeLicense.getTenantId());
                owner.setActive(true);
            });

            List<TaxPde> taxPdelist = new ArrayList<>();
            tradeLicense.getTradeLicenseDetail().getTaxPde().forEach(taxPde -> {
                if (taxPde.getArrear() > 0) {
                    try {
                        taxPdelist.add(
                                TaxPde.builder().id(UUID.randomUUID().toString()).tenantId(tradeLicense.getTenantId())
                                        .service(taxPde.getService()).fromYear(taxPde.getFromYear())
                                        .fromPeriod(taxPde.getFromPeriod()).toYear(taxPde.getToYear())
                                        .toPeriod(taxPde.getToPeriod()).active(true).amount(taxPde.getArrear())
                                        .headCode(TLConstants.class
                                                .getDeclaredField(
                                                        taxPde.getService().toString().replace(".", "_") + "_ARR")
                                                .get(null)
                                                .toString())
                                        .current(taxPde.getCurrent())
                                        .current2(taxPde.getCurrent2())
                                        .build());
                    } catch (IllegalArgumentException | IllegalAccessException | NoSuchFieldException
                            | SecurityException e1) {
                        // TODO Auto-generated catch block
                        e1.printStackTrace();
                    }

                }

                if (taxPde.getCurrent() > 0) {

                    try {
                        taxPdelist.add(
                                TaxPde.builder().id(UUID.randomUUID().toString()).tenantId(tradeLicense.getTenantId())
                                        .service(taxPde.getService()).fromYear(taxPde.getFromYear())
                                        .fromPeriod(taxPde.getFromPeriod()).toYear(taxPde.getToYear())
                                        .toPeriod(taxPde.getToPeriod()).active(true)
                                        .amount(taxPde.getCurrent() + taxPde.getCurrent2())
                                        .headCode(TLConstants.class
                                                .getDeclaredField(
                                                        taxPde.getService().toString().replace(".", "_") + "_CUR")
                                                .get(null)
                                                .toString())
                                        .current(taxPde.getCurrent())
                                        .current2(taxPde.getCurrent2())
                                        .build());
                    } catch (IllegalArgumentException | IllegalAccessException | NoSuchFieldException
                            | SecurityException e1) {
                        // TODO Auto-generated catch block
                        e1.printStackTrace();
                    }

                }

            });
            if (taxPdelist.size() > 0)
                tradeLicense.getTradeLicenseDetail().setTaxPdefinal(taxPdelist);

            // }
        });
    }

    /**
     * Sets status for create request
     * 
     * @param tradeLicenseRequest The create request
     */
    private void setStatusForCreate(TradeLicenseRequest tradeLicenseRequest) {
        tradeLicenseRequest.getLicenses().forEach(license -> {
            String businessService = tradeLicenseRequest.getLicenses().isEmpty() ? null
                    : tradeLicenseRequest.getLicenses().get(0).getBusinessService();
            if (businessService == null)
                businessService = businessService_TL;
            switch (businessService) {
                case businessService_TL:
                    if (license.getAction().equalsIgnoreCase(ACTION_INITIATE))
                        license.setStatus(STATUS_INITIATED);
                    if (license.getAction().equalsIgnoreCase(ACTION_APPLY))
                        license.setStatus(STATUS_APPLIED);
                    break;

                case businessService_BPA:
                    license.setStatus(STATUS_INITIATED);
                    break;
            }
        });
    }

}
