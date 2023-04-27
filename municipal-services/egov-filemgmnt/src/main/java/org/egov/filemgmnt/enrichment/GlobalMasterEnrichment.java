package org.egov.filemgmnt.enrichment;

import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetailsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GlobalMasterEnrichment extends BaseEnrichment {
    @Autowired
    private FMConfiguration fmConfiguration;

    public void enrichCreateModule(ModuleDetailsRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final ModuleDetails moduleDetails = request.getModuleDetails();
        final AuditDetails moduleAuditDetails = moduleDetails.getAuditDetails();
        moduleDetails.setId(UUID.randomUUID()
                                .toString());
        moduleDetails.setAuditDetails(auditDetails);
        moduleDetails.getAuditDetails()
                     .setLastModifiedBy(auditDetails.getLastModifiedBy());
        moduleDetails.getAuditDetails()
                     .setLastModifiedTime(auditDetails.getLastModifiedTime());
        moduleDetails.setStatus("1");
    }

    // Enrich Create MajorFunction
    public void enrichCreateMajorFunction(MajorFunctionDetailsRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final MajorFunctionDetails majorFunctionDetails = request.getMajorFunctionDetails();
        final AuditDetails majorFunctionAuditDetails = majorFunctionDetails.getAuditDetails();
        majorFunctionDetails.setId(UUID.randomUUID()
                                       .toString());
        majorFunctionDetails.setAuditDetails(auditDetails);
        majorFunctionDetails.getAuditDetails()
                            .setLastModifiedBy(auditDetails.getLastModifiedBy());
        majorFunctionDetails.getAuditDetails()
                            .setLastModifiedTime(auditDetails.getLastModifiedTime());
        majorFunctionDetails.setStatus("1");
    }

    public void enrichCreateSubFunction(SubFunctionDetailsRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final SubFunctionDetails subFunctionDetails = request.getSubFunctionDetails();
        final AuditDetails subFunctionAuditDetails = subFunctionDetails.getAuditDetails();
        subFunctionDetails.setId(UUID.randomUUID()
                                     .toString());
        subFunctionDetails.setAuditDetails(auditDetails);
        subFunctionDetails.getAuditDetails()
                          .setLastModifiedBy(auditDetails.getLastModifiedBy());
        subFunctionDetails.getAuditDetails()
                          .setLastModifiedTime(auditDetails.getLastModifiedTime());
        subFunctionDetails.setStatus("1");
    }

    public void enrichCreateService(ServiceDetailsRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final ServiceDetails serviceDetails = request.getServiceDetails();
        final AuditDetails serviceAuditDetails = serviceDetails.getAuditDetails();
        serviceDetails.setId(UUID.randomUUID()
                                 .toString());
        serviceDetails.setAuditDetails(auditDetails);
        serviceDetails.getAuditDetails()
                      .setLastModifiedBy(auditDetails.getLastModifiedBy());
        serviceDetails.getAuditDetails()
                      .setLastModifiedTime(auditDetails.getLastModifiedTime());
        serviceDetails.setStatus("1");
    }

    public void enrichUpdateModule(ModuleDetailsRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final ModuleDetails moduleDetails = request.getModuleDetails();
        moduleDetails.setAuditDetails(auditDetails);
        moduleDetails.getModuleNameEnglish();
        moduleDetails.getModuleNameMalayalam();
    }

    public void enrichUpdateMF(MajorFunctionDetailsRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final MajorFunctionDetails mfDetails = request.getMajorFunctionDetails();
        mfDetails.setAuditDetails(auditDetails);
        mfDetails.getMajorFunctionNameEnglish();
        mfDetails.getMajorFunctionNameMalayalam();
    }

    public void enrichUpdateSubFunction(SubFunctionDetailsRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final SubFunctionDetails subFunctionDetails = request.getSubFunctionDetails();
        subFunctionDetails.setAuditDetails(auditDetails);
        subFunctionDetails.getSubFunctionNameEnglish();
        subFunctionDetails.getSubFunctionNameMalayalam();

    }

    public void enrichUpdateService(ServiceDetailsRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final ServiceDetails mfDetails = request.getServiceDetails();
        mfDetails.setAuditDetails(auditDetails);
        mfDetails.getServiceNameEnglish();
        mfDetails.getServiceNameMalayalam();
    }

    public void enrichDeleteModule(ModuleDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final ModuleDetails moduleDetails = request.getModuleDetails();
        moduleDetails.setAuditDetails(auditDetails);
        moduleDetails.setStatus("0");
    }

    public void enrichDeleteMF(MajorFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final MajorFunctionDetails mfDetails = request.getMajorFunctionDetails();
        mfDetails.setAuditDetails(auditDetails);
        mfDetails.setStatus("0");
    }

    public void enrichDeleteSF(SubFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final SubFunctionDetails sfDetails = request.getSubFunctionDetails();
        sfDetails.setAuditDetails(auditDetails);
        sfDetails.setStatus("0");
    }

    public void enrichDeleteService(ServiceDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final ServiceDetails serviceDetails = request.getServiceDetails();
        serviceDetails.setAuditDetails(auditDetails);
        serviceDetails.setStatus("0");
    }

}
