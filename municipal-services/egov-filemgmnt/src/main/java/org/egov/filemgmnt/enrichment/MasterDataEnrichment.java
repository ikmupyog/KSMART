package org.egov.filemgmnt.enrichment;

import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetails;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetails;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetailsRequest;
import org.springframework.stereotype.Component;

@Component
public class MasterDataEnrichment extends BaseEnrichment { // NOPMD

    public void enrichCreateModule(final ModuleDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        final ModuleDetails module = request.getModuleDetails();

        module.setId(UUID.randomUUID()
                         .toString());
        module.setAuditDetails(auditDetails);
        module.setStatus("1");
    }

    public void enrichCreateMajorFunction(final MajorFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();

        majorFunction.setId(UUID.randomUUID()
                                .toString());
        majorFunction.setAuditDetails(auditDetails);
        majorFunction.setStatus("1");
    }

    public void enrichCreateSubFunction(final SubFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final SubFunctionDetails subFunction = request.getSubFunctionDetails();

        subFunction.setId(UUID.randomUUID()
                              .toString());
        subFunction.setAuditDetails(auditDetails);
        subFunction.setStatus("1");
    }

    public void enrichCreateService(final ServiceDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        final ServiceDetails service = request.getServiceDetails();

        service.setId(UUID.randomUUID()
                          .toString());
        service.setAuditDetails(auditDetails);
        service.setStatus("1");
    }

    public void enrichUpdateModule(final ModuleDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final ModuleDetails module = request.getModuleDetails();

        module.setAuditDetails(auditDetails);
    }

    public void enrichUpdateMajorFunction(final MajorFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();

        majorFunction.setAuditDetails(auditDetails);
    }

    public void enrichUpdateSubFunction(final SubFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        final SubFunctionDetails subFunction = request.getSubFunctionDetails();
        subFunction.setAuditDetails(auditDetails);
    }

    public void enrichUpdateService(final ServiceDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        final ServiceDetails service = request.getServiceDetails();
        service.setAuditDetails(auditDetails);
    }

    public void enrichDeleteModule(final ModuleDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final ModuleDetails module = request.getModuleDetails();

        module.setAuditDetails(auditDetails);
        module.setStatus("0");
    }

    public void enrichDeleteMajorFunction(final MajorFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();
        majorFunction.setAuditDetails(auditDetails);
        majorFunction.setStatus("0");
    }

    public void enrichDeleteSubFunction(final SubFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        final SubFunctionDetails subFunction = request.getSubFunctionDetails();
        subFunction.setAuditDetails(auditDetails);
        subFunction.setStatus("0");
    }

    public void enrichDeleteService(final ServiceDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        final ServiceDetails service = request.getServiceDetails();
        service.setAuditDetails(auditDetails);
        service.setStatus("0");
    }

}
