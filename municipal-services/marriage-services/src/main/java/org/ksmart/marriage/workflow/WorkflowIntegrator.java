package org.ksmart.marriage.workflow;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Collections;
import org.apache.commons.collections4.CollectionUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
//import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.PathNotFoundException;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
/**
     * Created by Jasmine
     * on 29.03.2023
     */
@Service
@Slf4j
public class WorkflowIntegrator {

    private   final MarriageApplicationConfiguration bndConfig;
    private   final RestTemplate restTemplate;
    //private final MarriageApplicationRepository repository;
    @Autowired
    public WorkflowIntegrator(RestTemplate restTemplate, MarriageApplicationConfiguration bndConfig
                                ) {
    //  MarriageApplicationRepository repository
  
        this.restTemplate = restTemplate;
        this.bndConfig = bndConfig; 
       // this.repository = repository;

    }

    /**
     * Method to integrate with workflow
     *
     * takes the Deathcert det request (now take applicant personal request) as
     * parameter constructs the work-flow request
     *
     * and sets the resultant status from wf-response back to file details object
     *
     * @param request the {@link MarriageDetailsRequest}
     */
    public  void callWorkFlow(MarriageDetailsRequest request) {
      
        List<MarriageApplicationDetails> currentFile = request.getMarriageDetails();     
        JSONArray array = new JSONArray();
        for (MarriageApplicationDetails marriageDtl : request.getMarriageDetails()) {
            String  businessServiceFromMDMS=marriageDtl.getBusinessservice();
            if (businessServiceFromMDMS == null) {
            businessServiceFromMDMS = MarriageConstants.BUSINESS_SERVICE_BND;
        }
            if (businessServiceFromMDMS.equals(MarriageConstants.BUSINESS_SERVICE_BND) || !request.getMarriageDetails()
           .get(0).getAction().equalsIgnoreCase(MarriageConstants.TRIGGER_NOWORKFLOW)) {

                JSONObject obj = new JSONObject();
                //  System.out.println("businessServiceFromMDMS"+businessServiceFromMDMS);    
                // Adding assignes to processInstance  assignees
                // List<Map<String, String>> uuidMaps = buildUUIDList(deathDtl.getAssignees());
                // System.out.println(uuidMaps);
                // if (CollectionUtils.isNotEmpty(uuidMaps)) {
                //     obj.put(CrDeathConstants.ASSIGNEEKEY, uuidMaps.get(0).get("uuid"));
                // }
                currentFile
                .forEach(marriagedtl -> {
                obj.put(MarriageConstants.BUSINESSIDKEY, marriagedtl.getApplicationNumber());
                obj.put(MarriageConstants.TENANTIDKEY, marriagedtl.getTenantid());
                obj.put(MarriageConstants.BUSINESSSERVICEKEY, marriagedtl.getWorkflowcode());
                List<Map<String, String>> uuidMaps = buildUUIDList(marriagedtl.getAssignees());
               // System.out.println("uuidMaps"+uuidMaps);
                if (CollectionUtils.isNotEmpty(uuidMaps)) {
                    obj.put(MarriageConstants.ASSIGNEEKEY, uuidMaps.get(0).get("uuid"));
                }
            });

                obj.put(MarriageConstants.MODULENAMEKEY, MarriageConstants.BNDMODULENAMEVALUE);
                obj.put(MarriageConstants.ACTIONKEY, marriageDtl.getAction());
                obj.put(MarriageConstants.COMMENTKEY, marriageDtl.getComment());
                obj.put(MarriageConstants.DOCUMENTSKEY, marriageDtl.getWfDocuments());
                array.add(obj);
            }
        }

        if (!CollectionUtils.isEmpty(array)) {
            JSONObject workFlowRequest = new JSONObject();
            workFlowRequest.put(MarriageConstants.REQUESTINFOKEY, request.getRequestInfo());
            workFlowRequest.put(MarriageConstants.WORKFLOWREQUESTARRAYKEY, array);
            String response = null;
            System.out.println("workflow Check  :" + workFlowRequest);
            log.info("workflow integrator request " + workFlowRequest);

            try {
                response = restTemplate.postForObject(bndConfig.getWfHost().concat(bndConfig.getWfTransitionPath()),
                        workFlowRequest, String.class);
            } catch (HttpClientErrorException e) {
                /*
                 * extracting message from client error exception
                 */
                DocumentContext responseContext = JsonPath.parse(e.getResponseBodyAsString());
                List<Object> errros = null;
                try {
                    errros = responseContext.read("$.Errors");
                } catch (PathNotFoundException pnfe) {
                    log.error("EG_BND_WF_ERROR_KEY_NOT_FOUND",
                            " Unable to read the json path in error object : " + pnfe.getMessage());
                    throw new CustomException("EG_BND_WF_ERROR_KEY_NOT_FOUND",
                            " Unable to read the json path in error object : " + pnfe.getMessage());
                }
                throw new CustomException("EG_WF_ERROR", errros.toString());
            } catch (Exception e) {
                throw new CustomException("EG_WF_ERROR",
                        " Exception occured while integrating with workflow : " + e.getMessage());
            }

            log.info("workflow integrator response " + response);

            /*
             * on success result from work-flow read the data and set the status back to TL
             * object
             */
           // System.out.println("response Check  :" + response);
            DocumentContext responseContext = JsonPath.parse(response);
            List<Map<String, Object>> responseArray = responseContext.read(MarriageConstants.PROCESSINSTANCESJOSNKEY);
            Map<String, String> idStatusMap = new HashMap<>();
            responseArray.forEach(object -> {

                DocumentContext instanceContext = JsonPath.parse(object);
                idStatusMap.put(instanceContext.read(MarriageConstants.BUSINESSIDJOSNKEY),
                        instanceContext.read(MarriageConstants.STATUSJSONKEY));
            });
            
            // setting the status back to TL object from wf response

                  request.getMarriageDetails().forEach(
                    bndObj -> bndObj.setStatus(idStatusMap.get(bndObj.getApplicationNumber())));

        }

    }
// //Jasmine 08.03.2023

   

    private List<Map<String, String>> buildUUIDList(List<String> assignees) {
        List<Map<String, String>> result = new LinkedList<>();

        if (CollectionUtils.isNotEmpty(assignees)) {

            assignees.forEach(assignee -> result.add(Collections.singletonMap(MarriageConstants.UUIDKEY, assignee)));
        }

        return result;
    }
}