package org.ksmart.death.common.services;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role; 
import org.egov.tracer.model.CustomException;
import org.json.JSONObject;
import org.ksmart.death.common.calculation.collections.models.PaymentDetail;
import org.ksmart.death.common.calculation.collections.models.PaymentRequest;
import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.enrichment.DeathEnrichment;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.service.DeathApplnService;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.workflow.WorkflowIntegrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class PaymentUpdateService {
	private DeathApplnService newDeathService;	
	private DeathConfiguration config;
	private DeathApplnRepository repository;	
	private WorkflowIntegrator wfIntegrator;	
	private DeathEnrichment enrichmentService;
	// private DeathSearchCriteria searchCriteria;

	public PaymentUpdateService(DeathApplnService newDeathService,DeathConfiguration config, DeathApplnRepository repository,
								WorkflowIntegrator wfIntegrator,DeathEnrichment enrichmentService
								// ,DeathSearchCriteria searchCriteria
								) {
		this.newDeathService=newDeathService;
		this.config=config;
		this.repository=repository;
		this.wfIntegrator=wfIntegrator;
		this.enrichmentService= enrichmentService;
		// this.searchCriteria=searchCriteria;
	}
	
	final String tenantId = "tenantId";
	final String businessService = "businessService";
	final String consumerCode = "consumerCode";	
	
	/**
	 * Process the message from kafka and updates the status to paid
	 * 
	 * @param record The incoming message from receipt create consumer
	 */
	public void process(HashMap<String, Object> record) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			PaymentRequest paymentRequest = mapper.convertValue(record, PaymentRequest.class);
			RequestInfo requestInfo = paymentRequest.getRequestInfo();
			
			List<PaymentDetail> paymentDetails = paymentRequest.getPayment().getPaymentDetails();
			String tenantId = paymentRequest.getPayment().getTenantId();
			for (PaymentDetail paymentDetail : paymentDetails) {
			DeathSearchCriteria searchCriteria = new DeathSearchCriteria();
			searchCriteria.setTenantId(tenantId);
			 
			// searchCriteria.setAppNumber(paymentDetail.getBill().getConsumerCode());
			searchCriteria.setDeathACKNo(paymentDetail.getBill().getConsumerCode());
			searchCriteria.setBusinessService(paymentDetail.getBusinessService());
			// System.out.println(" payment detail tenantId:"+tenantId);
			// System.out.println(" payment detail tenantId:"+paymentDetail.getBill().getConsumerCode());
			// System.out.println(" payment detail tenantId:"+paymentDetail.getBusinessService());
			
			List<DeathDtl> death = newDeathService.searchPayment(searchCriteria,requestInfo);
			
			DeathDtlRequest updateRequest = DeathDtlRequest.builder().requestInfo(requestInfo).deathCertificateDtls(death).build();
			// System.out.println(" payment detail updateRequest:"+updateRequest);
			wfIntegrator.callWorkFlow(updateRequest);
			}	

		} catch (Exception e) {
			log.error("KAFKA_PROCESS_ERROR", e);
		}

	}

}
