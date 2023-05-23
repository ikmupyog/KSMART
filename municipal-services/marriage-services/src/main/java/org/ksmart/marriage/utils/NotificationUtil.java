package org.ksmart.marriage.utils;

import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import org.apache.kafka.common.protocol.types.Field;
import org.egov.common.contract.request.RequestInfo;
import org.json.JSONObject;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.common.repository.ServiceRequestRepository;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriagecommon.model.SMSRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.*;

import static org.ksmart.marriage.utils.MarriageConstants.*;

@Component
@Slf4j
public class NotificationUtil {

	private MarriageApplicationConfiguration config;

	private ServiceRequestRepository serviceRequestRepository;

	private MarriageProducer producer;

	private RestTemplate restTemplate;

//	private CalculationService calculationService;

	@Autowired
	public NotificationUtil(MarriageApplicationConfiguration config, ServiceRequestRepository serviceRequestRepository, MarriageProducer producer, RestTemplate restTemplate) {
		this.config = config;
		this.serviceRequestRepository = serviceRequestRepository;
		this.producer = producer;
		this.restTemplate = restTemplate;
//		this.calculationService = calculationService;
	}


	final String receiptNumberKey = "receiptNumber";

	final String amountPaidKey = "amountPaid";

	/**
	 * Creates customized message based on marriage application
	 * 
	 * @param marriageApplication
	 *            The marriage application for which message is to be sent
	 * @param localizationMessage
	 *            The messages from localization
	 * @return customized message based on marriage application
	 */
	public String getCustomizedMsg(RequestInfo requestInfo, MarriageApplicationDetails marriageApplication, String localizationMessage) {
//		MarriageApplicationDetails marriageApplication= marriageDetailsRequest.getMarriageDetails().get(0);
		String message = null, messageTemplate;
		String ACTION_STATUS = marriageApplication.getAction() + "_" + marriageApplication.getStatus();
		switch (ACTION_STATUS) {

		case ACTION_STATUS_INITIATED:
			messageTemplate = getMessageTemplate(NOTIFICATION_INITIATED, localizationMessage);
			message = getInitiatedMsg(marriageApplication, messageTemplate);
			break;

			case ACTION_STATUS_APPLIED:
			messageTemplate = getMessageTemplate(NOTIFICATION_APPLIED, localizationMessage);
			message = getAppliedMsg(marriageApplication, messageTemplate);
			break;

		/*
		 * case ACTION_STATUS_PAID : messageTemplate =
		 * getMessageTemplate(TLConstants.NOTIFICATION_PAID,localizationMessage);
		 * message = getApprovalPendingMsg(marriageApplication,messageTemplate); break;
		 */

			case ACTION_STATUS_APPROVED:
			BigDecimal amountToBePaid = BigDecimal.valueOf(0);//getAmountToBePaid(requestInfo, marriageApplication);
			messageTemplate = getMessageTemplate(NOTIFICATION_APPROVED, localizationMessage);
			message = getApprovedMsg(marriageApplication, amountToBePaid, messageTemplate);
			break;

		case ACTION_STATUS_REJECTED:
			messageTemplate = getMessageTemplate(NOTIFICATION_REJECTED, localizationMessage);
			message = getRejectedMsg(marriageApplication, messageTemplate);
			break;

//		case ACTION_STATUS_FIELDINSPECTION:
//			messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_FIELD_INSPECTION, localizationMessage);
//			message = getFieldInspectionMsg(marriageApplication, messageTemplate);
//			break;
//
//		case ACTION_STATUS_PENDINGAPPROVAL:
//			messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_PENDING_APPROVAL, localizationMessage);
//			message = getPendingApprovalMsg(marriageApplication, messageTemplate);
//			break;
//
//		case ACTION_SENDBACKTOCITIZEN_FIELDINSPECTION:
//			messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_SENDBACK_CITIZEN, localizationMessage);
//			message = getCitizenSendBack(marriageApplication, messageTemplate);
//			break;
//
//		case ACTION_FORWARD_CITIZENACTIONREQUIRED:
//			messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_FORWARD_CITIZEN, localizationMessage);
//			message = getCitizenForward(marriageApplication, messageTemplate);
//			break;

//		case ACTION_CANCEL_CANCELLED:
//			messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_CANCELLED, localizationMessage);
//			message = getCancelledMsg(marriageApplication, messageTemplate);
//			break;
//
//		case ACTION_STATUS_EXPIRED:
//			messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_EXPIRED, localizationMessage);
//			message = getExpiredMsg(requestInfo,marriageApplication, messageTemplate);
//			break;
//
//		case ACTION_STATUS_MANUAL_EXPIRED:
//			messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_MANUAL_EXPIRED, localizationMessage);
//			message = getExpiredMsg(requestInfo,marriageApplication, messageTemplate);
//			break;

		}

		return message;
	}


	/**
	 * Replaces placeholders from message template
	 * *
	 * @param marriageApplication
	 *            The marriageApplication for which message is to be sent
	 * @param messageTemplate
	 *            The messages from localization
	 * @return customized message with replaced placeholders
	 * */
//	private String getReplacedMessage(marriageApplication marriageApplication, String messageTemplate) {
//		String message = messageTemplate.replace("YYYY", marriageApplication.getBusinessService());
//		message = message.replace("ZZZZ", marriageApplication.getApplicationNumber());
//
//		if (message.contains("RRRR")) {
//			message = message.replace("RRRR", marriageApplication.getmarriageApplicationNumber());
//		}
//		message = message.replace("XYZ", capitalize(marriageApplication.getTenantId().split("\\.")[1]));
//		message = message.replace("{PORTAL_LINK}",config.getUiAppHost());
//
//		//CCC - Designaion configurable according to ULB
//		// message = message.replace("CCC","");
//		return message;
//	}

	/**
	 * Extracts message for the specific code
	 * 
	 * @param notificationCode
	 *            The code for which message is required
	 * @param localizationMessage
	 *            The localization messages
	 * @return message for the specific code
	 */
	private String getMessageTemplate(String notificationCode, String localizationMessage) {
		String path = "$..messages[?(@.code==\"{}\")].message";
		path = path.replace("{}", notificationCode);
		String message = null;
		try {
			Object messageObj = JsonPath.parse(localizationMessage).read(path);
			message = ((ArrayList<String>) messageObj).get(0);
		} catch (Exception e) {
			log.warn("Fetching from localization failed", e);
		}
		return message;
	}

	/**
	 * Returns the uri for the localization call
	 * 
	 * @param tenantId
	 *            TenantId of the propertyRequest
	 * @return The uri for localization search call
	 */
	public StringBuilder getUri(String tenantId, RequestInfo requestInfo) {

		if (config.getIsLocalizationStateLevel())
			tenantId = tenantId.split("\\.")[0];

		String locale = NOTIFICATION_LOCALE;
		if (!StringUtils.isEmpty(requestInfo.getMsgId()) && requestInfo.getMsgId().split("|").length >= 2)
			locale = requestInfo.getMsgId().split("\\|")[1];

		StringBuilder uri = new StringBuilder();
		uri.append(config.getLocalizationHost()).append(config.getLocalizationContextPath())
				.append(config.getLocalizationSearchEndpoint()).append("?").append("locale=").append(locale)
				.append("&tenantId=").append(tenantId).append("&module=").append(MODULE)
				.append("&codes=").append(StringUtils.join(NOTIFICATION_CODES,','));

		return uri;
	}

	/**
	 * Fetches messages from localization service
	 * 
	 * @param tenantId
	 *            tenantId of the marriageApplication
	 * @param requestInfo
	 *            The requestInfo of the request
	 * @return Localization messages for the module
	 */
	public String getLocalizationMessages(String tenantId, RequestInfo requestInfo) {
		LinkedHashMap responseMap = (LinkedHashMap) serviceRequestRepository.fetchResult(getUri(tenantId, requestInfo),
				requestInfo);
		String jsonString = new JSONObject(responseMap).toString();
		return jsonString;
	}

	/**
	 * Creates customized message for initiate
	 * 
	 * @param marriageApplication
	 *            tenantId of the marriageApplication
	 * @param message
	 *            Message from localization for initiate
	 * @return customized message for initiate
	 */
	private String getInitiatedMsg(MarriageApplicationDetails marriageApplication, String message) {
		//String groomfullname = getFullName(marriageApplication.getGroomDetails().getFirstnameEn(),marriageApplication.getGroomDetails().getMiddlenameEn(),marriageApplication.getGroomDetails().getLastnameEn());
//		 message = message.replace("{1}",groomfullname);

		message = message.replace("{2}", "Marriage");
		message = message.replace("{3}", marriageApplication.getApplicationNumber());

		return message;
	}

	private String getFullName(String firstname, String middleName, String lastName){
		StringBuilder fullName = new StringBuilder();
		fullName.append(firstname.trim());
		if (StringUtils.isNotBlank(middleName)) {
			fullName.append(" " + middleName.trim());
		}
		if (StringUtils.isNotBlank(lastName)) {
			fullName.append(" " + lastName.trim());
		}
		return  fullName.toString();
	}

	/**
	 * Creates customized message for apply
	 * 
	 * @param marriageApplication
	 *            tenantId of the marriageApplication
	 * @param message
	 *            Message from localization for apply
	 * @return customized message for apply
	 */
	private String getAppliedMsg(MarriageApplicationDetails marriageApplication, String message) {
//		String groomfullname = getFullName(marriageApplication.getGroomDetails().getFirstnameEn(),marriageApplication.getGroomDetails().getMiddlenameEn(),marriageApplication.getGroomDetails().getLastnameEn());
//		message = message.replace("{1}",groomfullname);

		message = message.replace("{2}", "Marriage");
		message = message.replace("{3}", marriageApplication.getApplicationNumber());
		return message;
	}



	/**
	 * Creates customized message for approved
	 * 
	 * @param marriageApplication
	 *            tenantId of the marriageApplication
	 * @param message
	 *            Message from localization for approved
	 * @return customized message for approved
	 */
	private String getApprovedMsg(MarriageApplicationDetails marriageApplication, BigDecimal amountToBePaid, String message) {
//		String groomfullname = getFullName(marriageApplication.getGroomDetails().getFirstnameEn(),marriageApplication.getGroomDetails().getMiddlenameEn(),marriageApplication.getGroomDetails().getLastnameEn());
//		message = message.replace("{1}",groomfullname);

		message = message.replace("{2}", "Marriage");
		message = message.replace("{3}", marriageApplication.getApplicationNumber());
		//String UIHost = config.getUiAppHost();

//		String paymentPath = config.getPayLinkSMS();
//		paymentPath = paymentPath.replace("$consumercode",marriageApplication.getApplicationNumber());
//		paymentPath = paymentPath.replace("$tenantId",marriageApplication.getTenantId());
//		paymentPath = paymentPath.replace("$businessservice",businessService_TL);
//
//		String finalPath = UIHost + paymentPath;
//
//		message = message.replace(PAYMENT_LINK_PLACEHOLDER,getShortenedUrl(finalPath));
		return message;
	}

	/**
	 * Creates customized message for rejected
	 * 
	 * @param marriageApplication
	 *            tenantId of the marriageApplication
	 * @param message
	 *            Message from localization for rejected
	 * @return customized message for rejected
	 */
	private String getRejectedMsg(MarriageApplicationDetails marriageApplication, String message) {
		// message = message.replace("{1}",);
//		String groomfullname = getFullName(marriageApplication.getGroomDetails().getFirstnameEn(),marriageApplication.getGroomDetails().getMiddlenameEn(),marriageApplication.getGroomDetails().getLastnameEn());
//		message = message.replace("{1}",groomfullname);

		message = message.replace("{2}", "Marriage");
		message = message.replace("{3}", marriageApplication.getApplicationNumber());
		return message;
	}


	/**
	 * Send the SMSRequest on the SMSNotification kafka topic
	 * 
	 * @param smsRequestList
	 *            The list of SMSRequest to be sent
	 */
	public void sendSMS(List<SMSRequest> smsRequestList, boolean isSMSEnabled) {
		if (isSMSEnabled) {
			if (CollectionUtils.isEmpty(smsRequestList)) {
				log.info("Messages from localization couldn't be fetched!");
			}else {
				for (SMSRequest smsRequest : smsRequestList) {
					producer.push(config.getSmsNotifTopic(), smsRequest);
					log.info("SMS SENT!");
				}
			}
		}
	}
//
//	/**
//	 * Creates email request for the each owners
//	 *
//	 * @param message
//	 *            The message for the specific marriageApplication
//	 * @param mobileNumberToEmailId
//	 *            Map of mobileNumber to Email Ids
//	 * @return List of EmailRequest
//	 */
//	public List<EmailRequest> createEmailRequest(RequestInfo requestInfo,String message, Map<String, String> mobileNumberToEmailId) {
//
//		List<EmailRequest> emailRequest = new LinkedList<>();
//		for (Map.Entry<String, String> entryset : mobileNumberToEmailId.entrySet()) {
//			String customizedMsg = message.replace("XXXX",entryset.getValue());
//			customizedMsg = customizedMsg.replace("{MOBILE_NUMBER}",entryset.getKey());
//
//			String subject = customizedMsg.substring(customizedMsg.indexOf("<h2>")+4,customizedMsg.indexOf("</h2>"));
//			String body = customizedMsg.substring(customizedMsg.indexOf("</h2>")+4);
//			Email emailobj = Email.builder().emailTo(Collections.singleton(entryset.getValue())).isHTML(true).body(body).subject(subject).build();
//			EmailRequest email = new EmailRequest(requestInfo,emailobj);
//			emailRequest.add(email);
//		}
//		return emailRequest;
//	}
//
//
//
//	/**
//	 * Send the EmailRequest on the EmailNotification kafka topic
//	 *
//	 * @param emailRequestList
//	 *            The list of EmailRequest to be sent
//	 */
//	public void sendEmail(List<EmailRequest> emailRequestList, boolean isEmailEnabled) {
//		if (isEmailEnabled) {
//			if (CollectionUtils.isEmpty(emailRequestList))
//				log.info("Messages from localization couldn't be fetched!");
//			for (EmailRequest emailRequest : emailRequestList) {
//				producer.push(config.getEmailNotifTopic(), emailRequest);
//				log.info("EMAIL notification sent!");
//			}
//		}
//	}
//
//	/**
//	 * Fetches the amount to be paid from getBill API
//	 *
//	 * @param requestInfo
//	 *            The RequestInfo of the request
//	 * @param marriageApplication
//	 *            The marriageApplication object for which
//	 * @return
//	 */
//	BigDecimal getAmountToBePaid(RequestInfo requestInfo, marriageApplication marriageApplication) {
//
//		LinkedHashMap responseMap = (LinkedHashMap) serviceRequestRepository.fetchResult(getBillUri(marriageApplication),
//				new RequestInfoWrapper(requestInfo));
//		String jsonString = new JSONObject(responseMap).toString();
//
//		BigDecimal amountToBePaid = null;
//		try {
//			Object obj = JsonPath.parse(jsonString).read(BILL_AMOUNT_JSONPATH);
//			amountToBePaid = new BigDecimal(obj.toString());
//		} catch (Exception e) {
//			throw new CustomException("PARSING ERROR",
//					"Failed to parse the response using jsonPath: " + BILL_AMOUNT_JSONPATH);
//		}
//		return amountToBePaid;
//	}
//
//	/**
//	 * Creates the uri for getBill by adding query params from the marriageApplication
//	 *
//	 * @param marriageApplication
//	 *            The marriageApplication for which getBill has to be called
//	 * @return The uri for the getBill
//	 */
//	private StringBuilder getBillUri(marriageApplication marriageApplication) {
//		StringBuilder builder = new StringBuilder(config.getBillingHost());
//		builder.append(config.getFetchBillEndpoint());
//		builder.append("?tenantId=");
//		builder.append(marriageApplication.getTenantId());
//		builder.append("&consumerCode=");
//		builder.append(marriageApplication.getApplicationNumber());
//		builder.append("&businessService=");
//		builder.append(marriageApplication.getBusinessService());
//		return builder;
//	}
//
	/**
	 * Creates sms request for the each owners
	 *
	 * @param message
	 *            The message for the specific marriageApplication
	 * @param mobileNumberToOwnerName
	 *            Map of mobileNumber to OwnerName
	 * @return List of SMSRequest
	 */
	public List<SMSRequest> createSMSRequest(String message, Map<String, String> mobileNumberToOwnerName) {
		List<SMSRequest> smsRequest = new LinkedList<>();
		for (Map.Entry<String, String> entryset : mobileNumberToOwnerName.entrySet()) {
			String customizedMsg = message.replace("{1}", entryset.getValue());
			customizedMsg = customizedMsg.replace(NOTIF_OWNER_NAME_KEY, entryset.getValue());
			smsRequest.add(new SMSRequest(entryset.getKey(), customizedMsg));
		}
		return smsRequest;
	}
//
//	public String getCustomizedMsg(Difference diff, marriageApplication marriageApplication, String localizationMessage) {
//		String message = null, messageTemplate;
//		// StringBuilder finalMessage = new StringBuilder();
//
//		/*
//		 * if(!CollectionUtils.isEmpty(diff.getFieldsChanged())){ messageTemplate =
//		 * getMessageTemplate(TLConstants.NOTIFICATION_FIELD_CHANGED,localizationMessage
//		 * ); message = getEditMsg(marriageApplication,diff.getFieldsChanged(),messageTemplate);
//		 * finalMessage.append(message); }
//		 *
//		 * if(!CollectionUtils.isEmpty(diff.getClassesAdded())){ messageTemplate =
//		 * getMessageTemplate(TLConstants.NOTIFICATION_OBJECT_ADDED,localizationMessage)
//		 * ; message = getEditMsg(marriageApplication,diff.getClassesAdded(),messageTemplate);
//		 * finalMessage.append(message); }
//		 *
//		 * if(!CollectionUtils.isEmpty(diff.getClassesRemoved())){ messageTemplate =
//		 * getMessageTemplate(TLConstants.NOTIFICATION_OBJECT_REMOVED,
//		 * localizationMessage); message =
//		 * getEditMsg(marriageApplication,diff.getClassesRemoved(),messageTemplate);
//		 * finalMessage.append(message); }
//		 */
//		String applicationType = String.valueOf(marriageApplication.getApplicationType());
//		if(applicationType.equals(APPLICATION_TYPE_RENEWAL)){
//			if (!CollectionUtils.isEmpty(diff.getFieldsChanged()) || !CollectionUtils.isEmpty(diff.getClassesAdded())
//					|| !CollectionUtils.isEmpty(diff.getClassesRemoved())) {
//				messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_OBJECT_RENEW_MODIFIED, localizationMessage);
//				if (messageTemplate == null)
//					messageTemplate = DEFAULT_OBJECT_RENEWAL_MODIFIED_MSG;
//				message = getEditMsg(marriageApplication, messageTemplate);
//			}
//
//		}
//		else{
//			if (!CollectionUtils.isEmpty(diff.getFieldsChanged()) || !CollectionUtils.isEmpty(diff.getClassesAdded())
//					|| !CollectionUtils.isEmpty(diff.getClassesRemoved())) {
//				messageTemplate = getMessageTemplate(TLConstants.NOTIFICATION_OBJECT_MODIFIED, localizationMessage);
//				if (messageTemplate == null)
//					messageTemplate = DEFAULT_OBJECT_MODIFIED_MSG;
//				message = getEditMsg(marriageApplication, messageTemplate);
//			}
//		}
//
//
//
//		return message;
//	}
//
//	/**
//	 * Creates customized message for field chnaged
//	 *
//	 * @param message
//	 *            Message from localization for field change
//	 * @return customized message for field change
//	 */
//	private String getEditMsg(marriageApplication marriageApplication, List<String> list, String message) {
//		message = message.replace("{APPLICATION_NUMBER}", marriageApplication.getApplicationNumber());
//		message = message.replace("{FIELDS}", StringUtils.join(list, ","));
//		return message;
//	}
//
//	private String getEditMsg(marriageApplication marriageApplication, String message) {
//		message = message.replace("{APPLICATION_NUMBER}", marriageApplication.getApplicationNumber());
//		return message;
//	}
//
//	/**
//	 * Pushes the event request to Kafka Queue.
//	 *
//	 * @param request
//	 */
//	public void sendEventNotification(EventRequest request) {
//		producer.push(config.getSaveUserEventsTopic(), request);
//	}
//
//
//	/**
//	 * Method to shortent the url
//	 * returns the same url if shortening fails
//	 * @param url
//	 */
//	public String getShortenedUrl(String url){
//
//		HashMap<String,String> body = new HashMap<>();
//		body.put("url",url);
//		StringBuilder builder = new StringBuilder(config.getUrlShortnerHost());
//		builder.append(config.getUrlShortnerEndpoint());
//		String res = restTemplate.postForObject(builder.toString(), body, String.class);
//
//		if(StringUtils.isEmpty(res)){
//			log.error("URL_SHORTENING_ERROR","Unable to shorten url: "+url); ;
//			return url;
//		}
//		else return res;
//	}
//
//	/**
//	 * Fetches Email Ids of CITIZENs based on the phone number.
//	 *
//	 * @param mobileNumbers
//	 * @param requestInfo
//	 * @param tenantId
//	 * @return  Map of mobileNumber to Email Ids
//	 */
//	public Map<String, String> fetchUserEmailIds(Set<String> mobileNumbers, RequestInfo requestInfo, String tenantId) {
//		Map<String, String> mapOfPhnoAndEmailIds = new HashMap<>();
//		StringBuilder uri = new StringBuilder();
//		uri.append(config.getUserHost()).append(config.getUserSearchEndpoint());
//		Map<String, Object> userSearchRequest = new HashMap<>();
//		userSearchRequest.put("RequestInfo", requestInfo);
//		userSearchRequest.put("tenantId", tenantId);
//		userSearchRequest.put("userType", "CITIZEN");
//		for(String mobileNo: mobileNumbers) {
//			userSearchRequest.put("userName", mobileNo);
//			try {
//				Object user = serviceRequestRepository.fetchResult(uri, userSearchRequest);
//				if(null != user) {
//					if(JsonPath.read(user, "$.user[0].emailId")!=null) {
//						String email = JsonPath.read(user, "$.user[0].emailId");
//						mapOfPhnoAndEmailIds.put(mobileNo, email);
//					}
//				}else {
//					log.error("Service returned null while fetching user for username - "+mobileNo);
//				}
//			}catch(Exception e) {
//				log.error("Exception while fetching user for username - "+mobileNo);
//				log.error("Exception trace: ",e);
//				continue;
//			}
//		}
//		return mapOfPhnoAndEmailIds;
//	}
//
//
//	/**
//	 * Fetches UUIDs of CITIZENs based on the phone number.
//	 *
//	 * @param mobileNumbers
//	 * @param requestInfo
//	 * @param tenantId
//	 * @return
//	 */
//	public Map<String, String> fetchUserUUIDs(Set<String> mobileNumbers, RequestInfo requestInfo, String tenantId) {
//		Map<String, String> mapOfPhnoAndUUIDs = new HashMap<>();
//		StringBuilder uri = new StringBuilder();
//		uri.append(config.getUserHost()).append(config.getUserSearchEndpoint());
//		Map<String, Object> userSearchRequest = new HashMap<>();
//		userSearchRequest.put("RequestInfo", requestInfo);
//		userSearchRequest.put("tenantId", tenantId);
//		userSearchRequest.put("userType", "CITIZEN");
//		for(String mobileNo: mobileNumbers) {
//			userSearchRequest.put("userName", mobileNo);
//			try {
//				Object user = serviceRequestRepository.fetchResult(uri, userSearchRequest);
//				if(null != user) {
//					String uuid = JsonPath.read(user, "$.user[0].uuid");
//					mapOfPhnoAndUUIDs.put(mobileNo, uuid);
//				}else {
//					log.error("Service returned null while fetching user for username - "+mobileNo);
//				}
//			}catch(Exception e) {
//				log.error("Exception while fetching user for username - "+mobileNo);
//				log.error("Exception trace: ",e);
//				continue;
//			}
//		}
//		return mapOfPhnoAndUUIDs;
//	}

}
