package org.egov.filemgmnt.enrichment;


import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class GlobalMasterEnrichment extends BaseEnrichment{

    private FMConfiguration fmConfiguration;
    public static void enrichCreateModule(ModuleDetailsRequest request){
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
       final ModuleDetails moduleDetails = request.getModuleDetails();
       final AuditDetails moduleAuditDetails = moduleDetails.getAuditDetails();
        moduleDetails.setId(UUID.randomUUID()
                .toString());
        moduleDetails.setAuditDetails(moduleAuditDetails);
        moduleDetails.getAuditDetails().setLastModifiedBy(auditDetails.getLastModifiedBy());
        moduleDetails.getAuditDetails().setLastModifiedTime(auditDetails.getLastModifiedTime());
    }
//    public static void enrichCreateMajorFunction(MajorFunctionDetailsRequest request ){
//        RequestInfo requestInfo = request.getRequestInfo();
//        User userInfo = requestInfo.getUserInfo();
//
//        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
//        final MajorFunctionDetails majorFunctionDetails =request.getMajorFunctionDetails();
//        final AuditDetails majorFunctionAuditDetails= majorFunctionDetails.getAuditDetails();
//        majorFunctionDetails.setId(UUID.randomUUID()
//                            .toString());
//        majorFunctionDetails.setAuditDetails(majorFunctionAuditDetails);
//        majorFunctionDetails.getAuditDetails().setLastModifiedBy(auditDetails.getLastModifiedBy());
//        majorFunctionDetails.getAuditDetails().setLastModifiedTime(auditDetails.getLastModifiedTime());
//      }
//       public static void enrichCreateSubFunction(SubFunctionDetailsRequest request){
//        RequestInfo requestInfo = request.getRequestInfo();
//        User userInfo = requestInfo.getUserInfo();
//
//        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
//        final SubFunctionDetails subFunctionDetails=request.getSubFunctionDetails();
//           final AuditDetails subFunctionAuditDetails= subFunctionDetails.getAuditDetails();
//           subFunctionDetails.setId(UUID.randomUUID()
//                           .toString());
//           subFunctionDetails.setAuditDetails(subFunctionAuditDetails);
//           subFunctionDetails.getAuditDetails()
//                   .setLastModifiedBy(auditDetails.getLastModifiedBy());
//           subFunctionDetails.getAuditDetails()
//                   .setLastModifiedTime(auditDetails.getLastModifiedTime());
//                }
//        public static void enrichCreateServiceDetails(ServiceDetailsRequest request) {
//
//        RequestInfo requestInfo = request.getRequestInfo();
//        User userInfo = requestInfo.getUserInfo();
//
//        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
//        final  ServiceDetails serviceDetails=request.getServiceDetails();
//        final AuditDetails serviceAuditDetails = serviceDetails.getAuditDetails();
//        serviceDetails.setId(UUID.randomUUID()
//                            .toString());
//        serviceDetails.setAuditDetails(serviceAuditDetails);
//        serviceDetails.getAuditDetails()
//                .setLastModifiedBy(auditDetails.getLastModifiedBy());
//        serviceDetails.getAuditDetails()
//                    .setLastModifiedTime(auditDetails.getLastModifiedTime());
//
//    }

}


