package org.egov.pgr.service;

import org.egov.common.contract.request.RequestInfo;
import org.egov.pgr.config.PGRConfiguration;
import org.egov.pgr.repository.IdGenRepository;
import org.egov.pgr.util.HRMSUtil;
import org.egov.pgr.util.PGRUtils;
import org.egov.pgr.web.models.*;
import org.egov.pgr.web.models.Idgen.IdResponse;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.egov.pgr.util.PGRConstants.USERTYPE_CITIZEN;
import static org.egov.pgr.util.PGRConstants.ACTION_REJECT;
import static org.egov.pgr.util.PGRConstants.ACTION_RESOLVE;
import static org.egov.pgr.util.PGRConstants.PGR_BUSINESSSERVICE_ENGG;
import static org.egov.pgr.util.PGRConstants.PGR_BUSINESSSERVICE_HEALTH;
import static org.egov.pgr.util.PGRConstants.PGR_SERVICE_ENGG_DEPT;
import static org.egov.pgr.util.PGRConstants.PGR_SERVICE_HEALTH_DEPT;
import static org.egov.pgr.util.PGRConstants.PGR_ENG_ROLE;
import static org.egov.pgr.util.PGRConstants.PGR_HEALTH_ROLE;

@org.springframework.stereotype.Service
public class EnrichmentService {


    private PGRUtils utils;

    private IdGenRepository idGenRepository;

    private PGRConfiguration config;

    private UserService userService;

    private HRMSUtil hrmsUtil;
    
    @Autowired
    public EnrichmentService(PGRUtils utils, IdGenRepository idGenRepository, PGRConfiguration config, UserService userService,HRMSUtil hrmsUtil) {
        this.utils = utils;
        this.idGenRepository = idGenRepository;
        this.config = config;
        this.userService = userService;
        this.hrmsUtil= hrmsUtil;
    }


    /**
     * Enriches the create request with auditDetails. uuids and custom ids from idGen service
     * @param serviceRequest The create request
     */
    public void enrichCreateRequest(ServiceRequest serviceRequest){

        RequestInfo requestInfo = serviceRequest.getRequestInfo();
        Service service = serviceRequest.getService();
        Workflow workflow = serviceRequest.getWorkflow();
        String tenantId = service.getTenantId();

        // Enrich accountId of the logged in citizen
//        if(requestInfo.getUserInfo().getType().equalsIgnoreCase(USERTYPE_CITIZEN))
//            serviceRequest.getService().setAccountId(requestInfo.getUserInfo().getUuid());

        userService.callUserService(serviceRequest);


        AuditDetails auditDetails = utils.getAuditDetails(requestInfo.getUserInfo().getUuid(), service,true);

        service.setAuditDetails(auditDetails);
        service.setId(UUID.randomUUID().toString());
        service.getAddress().setId(UUID.randomUUID().toString());
        service.getAddress().setTenantId(tenantId);
        service.getEmployee().setEmpId(UUID.randomUUID().toString());
        service.setActive(true);
        if(!StringUtils.isEmpty(service.getInformer())) {
	        service.getInformer().setId(UUID.randomUUID().toString());
	        service.getInformer().setTenantId(tenantId);
        }

        if(workflow.getVerificationDocuments()!=null){
            workflow.getVerificationDocuments().forEach(document -> {
                document.setId(UUID.randomUUID().toString());
            });
        }
//
//        if(StringUtils.isEmpty(service.getAccountId())) {
//        	if(!StringUtils.isEmpty(service.getCitizen())) {
//        		service.setAccountId(service.getCitizen().getUuid());
//        	}
//        	else {
//             service.setAccountId(requestInfo.getUserInfo().getUuid());
//        	}
//        }
        
        
        // account Id set
        String wardCode = serviceRequest.getService().getAddress().getLocality().getCode();
        String uuid = serviceRequest.getService().getEmployee().getUuid();
       
        String role =null;
        		   if (serviceRequest.getService().getDeptCode().equals(PGR_SERVICE_ENGG_DEPT)) {
        	            role = PGR_ENG_ROLE;
        	        } else if (serviceRequest.getService().getDeptCode().equals(PGR_SERVICE_HEALTH_DEPT)) {
        	           role= PGR_HEALTH_ROLE;
        	        }
        String UserId = hrmsUtil.getHRMSUser(uuid,tenantId,role, wardCode,requestInfo);
       
         if  (!StringUtils.isEmpty(UserId)) {	    	   
	        	 service.setAccountId(UserId);	         
	      }
         
         //Account Id
      List<String> customIds = getIds(requestInfo,
                tenantId,
                config.getServiceRequestIdGenName(),
                "PGR",
                "ACK",
                1);
 
        service.setServiceRequestId(customIds.get(0));


    }


    /**
     * Enriches the update request (updates the lastModifiedTime in auditDetails0
     * @param serviceRequest The update request
     */
    public void enrichUpdateRequest(ServiceRequest serviceRequest){

        RequestInfo requestInfo = serviceRequest.getRequestInfo();
        Service service = serviceRequest.getService();
        Workflow workflow =serviceRequest.getWorkflow();
        AuditDetails auditDetails = utils.getAuditDetails(requestInfo.getUserInfo().getUuid(), service,false);

        service.setAuditDetails(auditDetails);     
//        System.out.println("action  "+ workflow.getAssignes().size());
//        if( !workflow.getAssignes().isEmpty() || workflow.getAssignes() != null) {
//	      if(workflow.getAssignes() != null ) {
	    	  
	     if  (workflow.getAssignes()!=null && !workflow.getAssignes().isEmpty()) {
	    	  
	        if(workflow.getAssignes().get(0) != null) {
	        	 service.setAccountId(workflow.getAssignes().get(0));
	        }    
	      }
	     
       if((workflow.getAction().equals(ACTION_REJECT)) || (workflow.getAction().equals(ACTION_RESOLVE))){
    	  
    	  service.setAccountId(service.getAuditDetails().getCreatedBy());
      }
        if(serviceRequest.getService().getEmployee().getRolecode() == USERTYPE_CITIZEN) {
        	userService.callUserService(serviceRequest);
        }
        
      
        
        
    }

    /**
     * Enriches the search criteria in case of default search and enriches the userIds from mobileNumber in case of seach based on mobileNumber.
     * Also sets the default limit and offset if none is provided
     * @param requestInfo
     * @param criteria
     */
    public void enrichSearchRequest(RequestInfo requestInfo, RequestSearchCriteria criteria){

        if(criteria.isEmpty() && requestInfo.getUserInfo().getType().equalsIgnoreCase(USERTYPE_CITIZEN)){
            String citizenMobileNumber = requestInfo.getUserInfo().getUserName();
            criteria.setMobileNumber(citizenMobileNumber);
        }

        criteria.setAccountId(requestInfo.getUserInfo().getUuid());

        String tenantId = (criteria.getTenantId()!=null) ? criteria.getTenantId() : requestInfo.getUserInfo().getTenantId();

        if(criteria.getMobileNumber()!=null){
            userService.enrichUserIds(tenantId, criteria);
        }

        if(criteria.getLimit()==null)
            criteria.setLimit(config.getDefaultLimit());

        if(criteria.getOffset()==null)
            criteria.setOffset(config.getDefaultOffset());

        if(criteria.getLimit()!=null && criteria.getLimit() > config.getMaxLimit())
            criteria.setLimit(config.getMaxLimit());

    }


    /**
     * Returns a list of numbers generated from idgen
     *
     * @param requestInfo RequestInfo from the request
     * @param tenantId    tenantId of the city
     * @param idKey       code of the field defined in application properties for which ids are generated for
     * @param idformat    format in which ids are to be generated
     * @param count       Number of ids to be generated
     * @return List of ids generated using idGen service
     */
    private List<String> getIdList(RequestInfo requestInfo, String tenantId, String idKey,
                                   String idformat, int count) {
        List<IdResponse> idResponses = idGenRepository.getId(requestInfo, tenantId, idKey, idformat, count).getIdResponses();

        if (CollectionUtils.isEmpty(idResponses))
            throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");

        return idResponses.stream()
                .map(IdResponse::getId).collect(Collectors.toList());
    }

    private List<String> getIds(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String  fnType, int count) {
    	  return idGenRepository.getIdList(requestInfo, tenantId, idName, moduleCode, fnType, count);
//    	    if (CollectionUtils.isEmpty(idResponses))
//                throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
//
//            return idResponses.stream()
//                    .map(IdResponse::getId).collect(Collectors.toList());
    }
    

}
