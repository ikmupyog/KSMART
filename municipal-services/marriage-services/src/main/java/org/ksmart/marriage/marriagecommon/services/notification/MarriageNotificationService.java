package org.ksmart.marriage.marriagecommon.services.notification;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.common.calculation.collections.models.PaymentRequest;
import org.ksmart.marriage.common.repository.ServiceRequestRepository;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriagecommon.model.SMSRequest;
import org.ksmart.marriage.utils.NotificationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import java.util.*;


@Slf4j
@Service
public class MarriageNotificationService {


	private MarriageApplicationConfiguration config;

	private ServiceRequestRepository serviceRequestRepository;

	private NotificationUtil util;

	public static final String businessService_MR = "CR";
	@Value("${egov.mdms.host}")
	private String mdmsHost;

	@Value("${egov.mdms.search.endpoint}")
	private String mdmsUrl;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	public MarriageNotificationService(MarriageApplicationConfiguration config, ServiceRequestRepository serviceRequestRepository, NotificationUtil util) {
		this.config = config;
		this.serviceRequestRepository = serviceRequestRepository;
		this.util = util;
	}

	/**
	 * Creates and send the sms based on the marriage application
	 * @param request The Marriageapplication listenend on the kafka topic
	 */
	public void process(MarriageDetailsRequest request) {
		try {
			System.out.println("Inside process for notificaton..................");
			System.out.println(new Gson().toJson(request));
		RequestInfo requestInfo = request.getRequestInfo();
//		Map<String, String> mobileNumberToOwner = new HashMap<>();
//		String tenantId = request.getMarriageDetails().get(0).getTenantid();
//		String action = request.getMarriageDetails().get(0).getAction();
		Map<Object, Object> configuredChannelList = new HashMap<>();
//		List<String> configuredChannelNames = Arrays.asList(new String[]{"SMS","EVENT","EMAIL"});
		Set<String> mobileNumbers = new HashSet<>();

		for(MarriageApplicationDetails marriageApplicationDetails : request.getMarriageDetails()){
			if(marriageApplicationDetails.getGroomDetails().getMobile()!=null){
				mobileNumbers.add(marriageApplicationDetails.getGroomDetails().getMobile().toString());
		}
		}

		String businessService = request.getMarriageDetails().isEmpty() ? null : request.getMarriageDetails().get(0).getBusinessservice();
		if (businessService == null)
			businessService = businessService_MR;
		System.out.println(businessService);
//		switch (businessService) {
//			case businessService_MR:
				List<SMSRequest> smsRequestsTL = new LinkedList<>();
				System.out.println("config.getIsMRSMSEnabled() ===="+config.getIsMRSMSEnabled());
					if (null != config.getIsMRSMSEnabled()) {
						if (config.getIsMRSMSEnabled()) {
							enrichSMSRequest(request, smsRequestsTL,configuredChannelList);
							System.out.println(" smsRequestsTL ===="+new Gson().toJson(smsRequestsTL));
							if (!CollectionUtils.isEmpty(smsRequestsTL))
								util.sendSMS(smsRequestsTL, true);
						}
					}

//					if (null != config.getIsUserEventsNotificationEnabledForMR()) {
//						if (config.getIsUserEventsNotificationEnabledForMR()) {
//							EventRequest eventRequest = getEventsForTL(request);
//							if (null != eventRequest)
//								util.sendEventNotification(eventRequest);
//						}
//					}
//				break;

//			case businessService_BPA:
//				configuredChannelList = fetchChannelList(new RequestInfo(), tenantId, "BPAREG", action);
//				List<SMSRequest> smsRequestsBPA = new LinkedList<>();
//				if (null != config.getIsBPASMSEnabled()) {
//					if (config.getIsBPASMSEnabled()) {
//						enrichSMSRequest(request, smsRequestsBPA,configuredChannelList);
//						if (!CollectionUtils.isEmpty(smsRequestsBPA))
//							util.sendSMS(smsRequestsBPA, true);
//					}
//				}
//				if (null != config.getIsUserEventsNotificationEnabledForBPA()) {
//					if (config.getIsUserEventsNotificationEnabledForBPA()) {
//						EventRequest eventRequest = getEventsForBPA(request, false, null);
//						if (null != eventRequest)
//							util.sendEventNotification(eventRequest);
//					}
//				}
//				List<EmailRequest> emailRequestsForBPA = new LinkedList<>();
//				if (null != config.getIsEmailNotificationEnabledForBPA()) {
//					if (config.getIsEmailNotificationEnabledForBPA()) {
//						Map<String, String> mapOfPhnoAndEmail = util.fetchUserEmailIds(mobileNumbers, requestInfo, tenantId);
//						enrichEmailRequest(request, emailRequestsForBPA, mapOfPhnoAndEmail, configuredChannelList);
//					if (!CollectionUtils.isEmpty(emailRequestsForBPA))
//						util.sendEmail(emailRequestsForBPA, config.getIsEmailNotificationEnabledForBPA());
//					}
//				}
//			break;
//		}
		} catch (Exception e) {
			log.error("KAFKA_PROCESS_ERROR", e);
		}
	}

	/**
	 * Enriches the emailRequest with the customized messages
	 * @param request The MarriageDetailsRequest from kafka topic
	 * @param emailRequests List of SMSRequests
	 * @param mapOfPhnoAndEmail Map of Phone Numbers and Emails
	 * @param configuredChannelList Map of actions mapped to configured channels for BPAREG flow
	 */
//
//	public void enrichEmailRequest(MarriageDetailsRequest request,List<EmailRequest> emailRequests, Map<String, String> mapOfPhnoAndEmail,Map<Object,Object> configuredChannelList) {
//		String tenantId = request.getLicenses().get(0).getTenantId();
//
//		for(TradeLicense license : request.getLicenses()){
//			String businessService = license.getBusinessService();
//			if (businessService == null)
//				businessService = businessService_TL;
//			String message = null;
//			String applicationType = String.valueOf(license.getApplicationType());
//			if (businessService.equals(businessService_TL)) {
//				if(applicationType.equals(APPLICATION_TYPE_RENEWAL)){
//					String localizationMessages = tlRenewalNotificationUtil.getLocalizationMessages(tenantId, request.getRequestInfo());
//					message = tlRenewalNotificationUtil.getEmailCustomizedMsg(request.getRequestInfo(), license, localizationMessages);
//				}
//				else{
//					String localizationMessages = util.getLocalizationMessages(tenantId, request.getRequestInfo());
//					message = util.getEmailCustomizedMsg(request.getRequestInfo(), license, localizationMessages);
//				}
//			}
//			if(businessService.equals(businessService_DIRECT_RENEWAL) || businessService.equals(businessService_EDIT_RENEWAL)){
//				String localizationMessages = tlRenewalNotificationUtil.getLocalizationMessages(tenantId, request.getRequestInfo());
//				message = tlRenewalNotificationUtil.getEmailCustomizedMsg(request.getRequestInfo(), license, localizationMessages);
//			}
//			if (businessService.equals(businessService_BPA)) {
//				String action = license.getAction();
//				List<String> configuredChannelNames = (List<String>) configuredChannelList.get(action);
//				if(!CollectionUtils.isEmpty(configuredChannelNames) && configuredChannelNames.contains(CHANNEL_NAME_EMAIL))
//				{
//					String localizationMessages = bpaNotificationUtil.getLocalizationMessages(tenantId, request.getRequestInfo());
//					message = bpaNotificationUtil.getEmailCustomizedMsg(request.getRequestInfo(), license, localizationMessages);
//				}
//			}
//			if(message==null || message == "") continue;
//
//				license.getTradeLicenseDetail().getOwners().forEach(owner -> {
//					if (owner.getMobileNumber() != null)
//						mapOfPhnoAndEmail.put(owner.getMobileNumber(), owner.getEmailId());
//				});
//			emailRequests.addAll(util.createEmailRequest(request.getRequestInfo(),message,mapOfPhnoAndEmail));
//			}
//		}

		/**
         * Enriches the smsRequest with the customized messages
         * @param request The MarriageDetailsRequest from kafka topic
         * @param smsRequests List of SMSRequests
		 * @param configuredChannelList Map of actions mapped to configured channels for this business service for BPAREG flow
         */
    private void enrichSMSRequest(MarriageDetailsRequest request,List<SMSRequest> smsRequests,Map<Object,Object> configuredChannelList){
        String tenantId = request.getMarriageDetails().get(0).getTenantid();
        for(MarriageApplicationDetails marriageApplicationDetails : request.getMarriageDetails()) {
			String businessService = marriageApplicationDetails.getBusinessservice();
				if (businessService == null)
					businessService = businessService_MR;
				String message = null;
				String applicationType = String.valueOf(marriageApplicationDetails.getApplicationtype());
				if (businessService.equals(businessService_MR)) {
//					if (applicationType.equals(APPLICATION_TYPE_RENEWAL)) {
//						String localizationMessages = tlRenewalNotificationUtil.getLocalizationMessages(tenantId, request.getRequestInfo());
//						message = tlRenewalNotificationUtil.getCustomizedMsg(request.getRequestInfo(), marriageApplicationDetails, localizationMessages);
//					} else {
						String localizationMessages = util.getLocalizationMessages(tenantId, request.getRequestInfo());
						message = util.getCustomizedMsg(request.getRequestInfo(), marriageApplicationDetails, localizationMessages);
//					}

				}
//				if (businessService.equals(businessService_BPA)) {
//					String action = marriageApplicationDetails.getAction();
//					List<String> configuredChannelNames = (List<String>) configuredChannelList.get(action);
//					if (!CollectionUtils.isEmpty(configuredChannelNames) && configuredChannelNames.contains(CHANNEL_NAME_SMS)) {
//						String localizationMessages = bpaNotificationUtil.getLocalizationMessages(tenantId, request.getRequestInfo());
//						message = bpaNotificationUtil.getCustomizedMsg(request.getRequestInfo(), marriageApplicationDetails, localizationMessages);
//					}
//				}
//				if (businessService.equals(businessService_DIRECT_RENEWAL) || businessService.equals(businessService_EDIT_RENEWAL)) {
//					String localizationMessages = tlRenewalNotificationUtil.getLocalizationMessages(tenantId, request.getRequestInfo());
//					message = tlRenewalNotificationUtil.getCustomizedMsg(request.getRequestInfo(), marriageApplicationDetails, localizationMessages);
//				}
				if (message == null) continue;

				Map<String, String> mobileNumberToOwner = new HashMap<>();
					String groomName = marriageApplicationDetails.getGroomDetails().getFirstnameEn();
					if(StringUtils.isNotBlank(marriageApplicationDetails.getGroomDetails().getMiddlenameEn())){
						groomName=groomName+" "+marriageApplicationDetails.getGroomDetails().getMiddlenameEn();
					}
			if(StringUtils.isNotBlank(marriageApplicationDetails.getGroomDetails().getLastnameEn())){
				groomName=groomName+" "+marriageApplicationDetails.getGroomDetails().getLastnameEn();
			}
					if (marriageApplicationDetails.getGroomDetails().getMobile() != null)
						mobileNumberToOwner.put(marriageApplicationDetails.getGroomDetails().getMobile().toString(),groomName);
				smsRequests.addAll(util.createSMSRequest(message, mobileNumberToOwner));
		}
		System.out.println(" end of enrichSMSRequest ====");
    }
    
    /**
     * Creates and registers an event at the egov-user-event service at defined trigger points as that of sms notifs.
     * 
     * Assumption - The MarriageDetailsRequest received will always contain only one MarriageApplicationDetails.
     * 
     * @param request
     * @return
     */
//    private EventRequest getEventsForTL(MarriageDetailsRequest request) {
//    	List<Event> events = new ArrayList<>();
//        String tenantId = request.getMarriageDetails().get(0).getTenantid();
//		String localizationMessages = util.getLocalizationMessages(tenantId,request.getRequestInfo());
//        for(MarriageApplicationDetails marriageApplicationDetails : request.getMarriageDetails()){
//			String message = null;
////			String applicationType = String.valueOf(marriageApplicationDetails.getApplicationType());
//			String businessService = marriageApplicationDetails.getBusinessservice();
//			if(businessService.equals(businessService_MR)){
//					message = util.getCustomizedMsg(request.getRequestInfo(), marriageApplicationDetails, localizationMessages);
//
//            if(message == null) continue;
//            Map<String,String > mobileNumberToOwner = new HashMap<>();
//
//                if(null!=marriageApplicationDetails.getGroomDetails().getMobile()) {
//					String groomName = marriageApplicationDetails.getGroomDetails().getFirstnameEn();
//					if(StringUtils.isNotBlank(marriageApplicationDetails.getGroomDetails().getMiddlenameEn())){
//						groomName=groomName+" "+marriageApplicationDetails.getGroomDetails().getMiddlenameEn();
//					}
//					if(StringUtils.isNotBlank(marriageApplicationDetails.getGroomDetails().getLastnameEn())){
//						groomName=groomName+" "+marriageApplicationDetails.getGroomDetails().getLastnameEn();
//					}
//					mobileNumberToOwner.put(marriageApplicationDetails.getGroomDetails().getMobile().toString(), groomName);
//				}
//
//            List<SMSRequest> smsRequests = util.createSMSRequest(message,mobileNumberToOwner);
//        	Set<String> mobileNumbers = smsRequests.stream().map(SMSRequest :: getMobileNumber).collect(Collectors.toSet());
//        	Map<String, String> mapOfPhnoAndUUIDs = util.fetchUserUUIDs(mobileNumbers, request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
//    		if (CollectionUtils.isEmpty(mapOfPhnoAndUUIDs.keySet())) {
//    			log.info("UUID search failed!");
//    			continue;
//    		}
//            Map<String,String > mobileNumberToMsg = smsRequests.stream().collect(Collectors.toMap(SMSRequest::getMobileNumber, SMSRequest::getMessage));
//            for(String mobile: mobileNumbers) {
//    			if(null == mapOfPhnoAndUUIDs.get(mobile) || null == mobileNumberToMsg.get(mobile)) {
//    				log.error("No UUID/SMS for mobile {} skipping event", mobile);
//    				continue;
//    			}
//    			List<String> toUsers = new ArrayList<>();
//    			toUsers.add(mapOfPhnoAndUUIDs.get(mobile));
//    			Recepient recepient = Recepient.builder().toUsers(toUsers).toRoles(null).build();
//    			List<String> payTriggerList = Arrays.asList(config.getPayTriggers().split("[,]"));
//				List<String> viewTriggerList = Arrays.asList(config.getViewApplicationTriggers().split("[,]"));
//	   			Action action = null;
//    			if(payTriggerList.contains(marriageApplicationDetails.getStatus())) {
//                    List<ActionItem> items = new ArrayList<>();
//        			String actionLink = config.getPayLink().replace("$mobile", mobile)
//        						.replace("$applicationNo", marriageApplicationDetails.getApplicationNumber())
//        						.replace("$tenantId", marriageApplicationDetails.getTenantid())
//        						.replace("$businessService", marriageApplicationDetails.getBusinessservice());
//        			actionLink = config.getUiAppHost() + actionLink;
//        			ActionItem item = ActionItem.builder().actionUrl(actionLink).code(config.getPayCode()).build();
//        			items.add(item);
//        			action = Action.builder().actionUrls(items).build();
//    			}
//    			if(viewTriggerList.contains(marriageApplicationDetails.getStatus())){
//					List<ActionItem> items = new ArrayList<>();
//					String actionLink = config.getViewApplicationLink().replace("$mobile", mobile)
//							.replace("$applicationNo", marriageApplicationDetails.getApplicationNumber())
//							.replace("$tenantId", marriageApplicationDetails.getTenantid());
//					actionLink = config.getUiAppHost() + actionLink;
//					ActionItem item = ActionItem.builder().actionUrl(actionLink).code(config.getViewApplicationCode()).build();
//					items.add(item);
//					action = Action.builder().actionUrls(items).build();
//
//				}
//
//
//				events.add(Event.builder().tenantId(marriageApplicationDetails.getTenantid()).description(mobileNumberToMsg.get(mobile))
//						.eventType(TLConstants.USREVENTS_EVENT_TYPE).name(TLConstants.USREVENTS_EVENT_NAME)
//						.postedBy(TLConstants.USREVENTS_EVENT_POSTEDBY).source(Source.WEBAPP).recepient(recepient)
//						.eventDetails(null).actions(action).build());
//
//    		}
//        }
//        if(!CollectionUtils.isEmpty(events)) {
//    		return EventRequest.builder().requestInfo(request.getRequestInfo()).events(events).build();
//        }else {
//        	return null;
//        }
//
//    }

//	public EventRequest getEventsForBPA(MarriageDetailsRequest request, boolean isStatusPaid, String paidMessage) {
//		Map<Object, Object> configuredChannelList = fetchChannelList(new RequestInfo(), request.getMarriageDetails().get(0).getTenantid(), "BPAREG", request.getMarriageDetails().get(0).getAction());
//		List<Event> events = new ArrayList<>();
//		String tenantId = request.getMarriageDetails().get(0).getTenantid();
//		for(MarriageApplicationDetails marriageApplicationDetails : request.getMarriageDetails()){
//			String actionForChannel = marriageApplicationDetails.getAction();
//			List<String> configuredChannelNames = (List<String>) configuredChannelList.get(actionForChannel);
//			if (!CollectionUtils.isEmpty(configuredChannelNames) && configuredChannelNames.contains(CHANNEL_NAME_EVENT))
//			{
//				String message = null;
//				if(isStatusPaid)
//			{
//				message = paidMessage;
//			}
//			else {
//				String localizationMessages = bpaNotificationUtil.getLocalizationMessages(tenantId,request.getRequestInfo());
//				message = bpaNotificationUtil.getCustomizedMsg(request.getRequestInfo(), marriageApplicationDetails, localizationMessages);
//			}
//			if(message == null) continue;
//			Map<String,String > mobileNumberToOwner = new HashMap<>();
//			marriageApplicationDetails.getMarriageApplicationDetailsDetail().getOwners().forEach(owner -> {
//				if(owner.getMobileNumber()!=null)
//					mobileNumberToOwner.put(owner.getMobileNumber(),owner.getName());
//			});
//			List<SMSRequest> smsRequests = util.createSMSRequest(message,mobileNumberToOwner);
//			Set<String> mobileNumbers = smsRequests.stream().map(SMSRequest :: getMobileNumber).collect(Collectors.toSet());
//			Map<String, String> mapOfPhnoAndUUIDs = util.fetchUserUUIDs(mobileNumbers, request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
//			if (CollectionUtils.isEmpty(mapOfPhnoAndUUIDs.keySet())) {
//				log.info("UUID search failed!");
//				continue;
//			}
//			Map<String,String > mobileNumberToMsg = smsRequests.stream().collect(Collectors.toMap(SMSRequest::getMobileNumber, SMSRequest::getMessage));
//			for(String mobile: mobileNumbers) {
//				if(null == mapOfPhnoAndUUIDs.get(mobile) || null == mobileNumberToMsg.get(mobile)) {
//					log.error("No UUID/SMS for mobile {} skipping event", mobile);
//					continue;
//				}
//				List<String> toUsers = new ArrayList<>();
//				toUsers.add(mapOfPhnoAndUUIDs.get(mobile));
//				Recepient recepient = Recepient.builder().toUsers(toUsers).toRoles(null).build();
//				List<String> payTriggerList = Arrays.asList(config.getPayTriggers().split("[,]"));
//				Action action = null;
//				if(payTriggerList.contains(marriageApplicationDetails.getStatus()) && !isStatusPaid) {
//					List<ActionItem> items = new ArrayList<>();
//					String actionLink = config.getPayLink().replace("$mobile", mobile)
//							.replace("$applicationNo", marriageApplicationDetails.getApplicationNumber())
//							.replace("$tenantId", marriageApplicationDetails.getTenantid())
//					        .replace("$businessService", marriageApplicationDetails.getBusinessservice());;
//					actionLink = config.getUiAppHost() + actionLink;
//					ActionItem item = ActionItem.builder().actionUrl(actionLink).code(config.getPayCode()).build();
//					items.add(item);
//					action = Action.builder().actionUrls(items).build();
//				}
//
//
//				events.add(Event.builder().tenantId(marriageApplicationDetails.getTenantid()).description(mobileNumberToMsg.get(mobile))
//						.eventType(BPAConstants.USREVENTS_EVENT_TYPE).name(BPAConstants.USREVENTS_EVENT_NAME)
//						.postedBy(BPAConstants.USREVENTS_EVENT_POSTEDBY).source(Source.WEBAPP).recepient(recepient)
//						.eventDetails(null).actions(action).build());
//
//			}}
//		}
//		if(!CollectionUtils.isEmpty(events)) {
//			return EventRequest.builder().requestInfo(request.getRequestInfo()).events(events).build();
//		}else {
//			return null;
//		}
//
//	}
//
//
//
//
//
//	/**
//	 * Fetches Channel List based on the module name and action.
//	 *
//	 * @param requestInfo
//	 * @param tenantId
//	 * @param moduleName
//	 * @param action
//	 * @return Map of actions and its channel List
//	 */
//	public Map<Object, Object> fetchChannelList(RequestInfo requestInfo, String tenantId, String moduleName, String action){
//
//		List<Map<String,String>> masterData = new ArrayList<>();
//		Map<Object, Object> map = new HashMap<>();
//
//		StringBuilder uri = new StringBuilder();
//		uri.append(mdmsHost).append(mdmsUrl);
//
//		if(StringUtils.isEmpty(tenantId))
//			return map;
//		MdmsCriteriaReq mdmsCriteriaReq = getMdmsRequestForChannelList(requestInfo, tenantId.split("\\.")[0]);
//
//        Filter masterDataFilter = filter(
//                where(MODULENAME).is(moduleName)
//        );
//
//		try {
//			Object response = restTemplate.postForObject(uri.toString(), mdmsCriteriaReq, Map.class);
//			masterData = JsonPath.parse(response).read("$.MdmsRes.Channel.channelList[?]", masterDataFilter);
//		}catch(Exception e) {
//			log.error("Exception while fetching workflow states to ignore: ",e);
//		}
//
//
//		for(Map obj: masterData)
//		{
//			map.put(obj.get(ACTION),obj.get(CHANNEL_NAMES));
//		}
//		return map;
//	}
//
//	/**
//	 * Return MDMS Criteria Request
//	 * *
//	 * @param requestInfo
//	 * @param tenantId
//	 * @return MdmsCriteriaReq
//	 */
//
//	private MdmsCriteriaReq getMdmsRequestForChannelList(RequestInfo requestInfo, String tenantId){
//		MasterDetail masterDetail = new MasterDetail();
//		masterDetail.setName(CHANNEL_LIST);
//		List<MasterDetail> masterDetailList = new ArrayList<>();
//		masterDetailList.add(masterDetail);
//
//		ModuleDetail moduleDetail = new ModuleDetail();
//		moduleDetail.setMasterDetails(masterDetailList);
//		moduleDetail.setModuleName(CHANNEL);
//		List<ModuleDetail> moduleDetailList = new ArrayList<>();
//		moduleDetailList.add(moduleDetail);
//
//		MdmsCriteria mdmsCriteria = new MdmsCriteria();
//		mdmsCriteria.setTenantId(tenantId);
//		mdmsCriteria.setModuleDetails(moduleDetailList);
//
//		MdmsCriteriaReq mdmsCriteriaReq = new MdmsCriteriaReq();
//		mdmsCriteriaReq.setMdmsCriteria(mdmsCriteria);
//		mdmsCriteriaReq.setRequestInfo(requestInfo);
//
//		return mdmsCriteriaReq;
//	}



}