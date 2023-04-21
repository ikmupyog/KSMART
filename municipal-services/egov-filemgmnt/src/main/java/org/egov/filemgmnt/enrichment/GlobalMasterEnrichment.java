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
    @Autowired
    private FMConfiguration fmConfiguration;
    public  void enrichCreateModule(ModuleDetailsRequest request){
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

       final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
       final ModuleDetails moduleDetails = request.getModuleDetails();
       final AuditDetails moduleAuditDetails = moduleDetails.getAuditDetails();
        moduleDetails.setId(UUID.randomUUID()
                .toString());
        moduleDetails.setAuditDetails(auditDetails);
        moduleDetails.getAuditDetails().setLastModifiedBy(auditDetails.getLastModifiedBy());
        moduleDetails.getAuditDetails().setLastModifiedTime(auditDetails.getLastModifiedTime());
    }
    //Enrich Create MajorFunction
    public  void enrichCreateMajorFunction(MajorFunctionDetailsRequest request ){
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final MajorFunctionDetails majorFunctionDetails =request.getMajorFunctionDetails();
        final AuditDetails majorFunctionAuditDetails= majorFunctionDetails.getAuditDetails();
        majorFunctionDetails.setId(UUID.randomUUID()
                .toString());
        majorFunctionDetails.setAuditDetails(majorFunctionAuditDetails);
        majorFunctionDetails.getAuditDetails().setLastModifiedBy(auditDetails.getLastModifiedBy());
        majorFunctionDetails.getAuditDetails().setLastModifiedTime(auditDetails.getLastModifiedTime());
        majorFunctionDetails.setStatus("1");
    }
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
        public  void enrichCreateService(ServiceDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final  ServiceDetails serviceDetails=request.getServiceDetails();
        final AuditDetails serviceAuditDetails = serviceDetails.getAuditDetails();
        serviceDetails.setId(UUID.randomUUID()
                            .toString());
        serviceDetails.setAuditDetails(serviceAuditDetails);
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
    final  ModuleDetails moduleDetails= request.getModuleDetails();
     moduleDetails.setAuditDetails(auditDetails);
     moduleDetails.getModuleNameEnglish();
     moduleDetails.getModuleNameMalayalam();
}



    public void enrichUpdateMF(MajorFunctionDetailsRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final  MajorFunctionDetails mfDetails= request.getMajorFunctionDetails();
        mfDetails.setAuditDetails(auditDetails);
        mfDetails.getMajorFunctionNameEnglish();
        mfDetails.getMajorFunctionNameMalayalam();
    }


    public void enrichDeleteMF(MajorFunctionDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final  MajorFunctionDetails mfDetails= request.getMajorFunctionDetails();
        mfDetails.setAuditDetails(auditDetails);
        mfDetails.setStatus("0");

    }
    public void enrichUpdateService(ServiceDetailsRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final  ServiceDetails mfDetails= request.getServiceDetails();
        mfDetails.setAuditDetails(auditDetails);
        mfDetails.getServiceNameEnglish();
        mfDetails.getServiceNameMalayalam();
    }

    public void enrichDeleteService(ServiceDetailsRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final  ServiceDetails serviceDetails= request.getServiceDetails();
        serviceDetails.setAuditDetails(auditDetails);
        serviceDetails.setStatus("0");
    }


}


