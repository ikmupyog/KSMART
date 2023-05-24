package org.ksmart.death.common.services;

import com.jayway.jsonpath.Filter;
import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.util.NotificationUtil;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathNACRequest;
import org.ksmart.death.deathapplication.web.models.SMSRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import java.awt.image.BufferStrategy;
import java.util.*;
import java.util.stream.Collectors;

import static com.jayway.jsonpath.Criteria.where;
import static com.jayway.jsonpath.Filter.filter;

@Slf4j
@Service
public class DeathNotificationService {

	private NotificationUtil util;
	private DeathConfiguration config;
	private ServiceRequestRepository serviceRequestRepository;

	@Autowired
	public DeathNotificationService(DeathConfiguration config, ServiceRequestRepository serviceRequestRepository,
			NotificationUtil util) {
		this.config = config;
		this.serviceRequestRepository = serviceRequestRepository;
		this.util = util;

	}

	/**
	 * Creates and send the sms based on the BirthRequest
	 * 
	 * @param request The Death Request listenend on the kafka topic
	 */
	public void process(DeathDtlRequest request,DeathNACRequest nac) {
		
		Long mobNo =null;
		String name =null;
		String tenantId = null;
		String action =null;
		String status = null;
		String appNo= null;
		String appType =null;
		 
		RequestInfo requestInfo = new RequestInfo();
		if(request.getDeathCertificateDtls()  != null) {
			mobNo= request.getDeathCertificateDtls().get(0).getDeathInitiatorDtls().getInitiatorMobile();
			name = request.getDeathCertificateDtls().get(0).getDeathInitiatorDtls().getInitiatorName();
			action=request.getDeathCertificateDtls().get(0).getAction();
			status = request.getDeathCertificateDtls().get(0).getApplicationStatus();	
			appNo= request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeathACKNo();
			appType="NewDeath Registration";			
			tenantId = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId();
			requestInfo = request.getRequestInfo();
		}
		else if(nac.getDeathNACDtls() != null) {
			mobNo=nac.getDeathNACDtls().get(0).getDeathApplicantDtls().getApplicantMobileNo();
			name= nac.getDeathNACDtls().get(0).getDeathApplicantDtls().getApplicantName();
			action=nac.getDeathNACDtls().get(0).getAction();
			status = nac.getDeathNACDtls().get(0).getApplicationStatus();
			tenantId = nac.getDeathNACDtls().get(0).getDeathBasicInfo().getTenantId();
			appType="NacDeath Registration";
			appNo= nac.getDeathNACDtls().get(0).getDeathBasicInfo().getDeathACKNo();
			requestInfo = nac.getRequestInfo();
		} 
		Map<Object, Object> configuredChannelList = new HashMap<>(); 
		Set<Long> mobileNumbers = new HashSet<>();		
		mobileNumbers.add(mobNo);
		 
		List<SMSRequest> smsRequestDeath = new LinkedList<>();
		if (null != config.getIsDeathSMSEnabled()) {
			if (config.getIsDeathSMSEnabled()) {
				enrichSMSRequest(tenantId, smsRequestDeath,requestInfo, mobNo,name,appNo,appType,action,status,configuredChannelList);
				if (!CollectionUtils.isEmpty(smsRequestDeath))
					util.sendSMS(smsRequestDeath, true);
			}
		}
	}

	/**
	 * Enriches the smsRequest with the customized messages
	 * 
	 * @param request               The Death Services Request from kafka topic
	 * @param smsRequests           List of SMSRequests
	 * @param configuredChannelList Map of actions mapped to configured channels for
	 *                              this business service for Death REG flow
	 */
	private void enrichSMSRequest(String tenantId, List<SMSRequest> smsRequests, RequestInfo requestInfo,Long mobNo,String name,
			String appNo,String appType,String action,String status,Map<Object, Object> configuredChannelList) {
	 
			String message = null;
			String localizationMessages = util.getLocalizationMessages(tenantId, requestInfo);			 
			message = util.getCustomizedMsg(requestInfo, action, status,appNo,name,appType,localizationMessages);		 
			if (message == null)
				return;
			Map<Long, String> mobileNumberToOwner = new HashMap<>();
		 
				mobileNumberToOwner.put(mobNo,name);
 
			smsRequests.addAll(util.createSMSRequest(message, mobileNumberToOwner));
		 
	}

}
