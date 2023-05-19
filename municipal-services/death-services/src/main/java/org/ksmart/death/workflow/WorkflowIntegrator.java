package org.ksmart.death.workflow;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Collections;
import org.apache.commons.collections4.CollectionUtils;

import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.deathapplication.util.DeathConstants;

import org.egov.tracer.model.CustomException;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedRequest;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
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

@Service
@Slf4j
public class WorkflowIntegrator {



    private   final DeathConfiguration bndConfig;
    private   final RestTemplate restTemplate;
    private final DeathApplnRepository repository;
    @Autowired
    public WorkflowIntegrator(RestTemplate restTemplate, DeathConfiguration bndConfig ,DeathApplnRepository repository) {
        this.restTemplate = restTemplate;
        this.bndConfig = bndConfig; 
        this.repository=repository;

    }

    /**
     * Method to integrate with workflow
     *
     * takes the Deathcert det request (now take applicant personal request) as
     * parameter constructs the work-flow request
     *
     * and sets the resultant status from wf-response back to file details object
     *
     * @param request the {@link CrDeathDtlRequest}
     */
    public  void callWorkFlow(DeathDtlRequest request) {

      
        // List<CrDeathDtl> currentFile = request.getDeathCertificateDtls();     
       
        // JSONArray array = new JSONArray();

//         for (CrDeathDtl deathDtl : request.getDeathCertificateDtls()) {
//             String  businessServiceFromMDMS=deathDtl.getBusinessService();
//                if (businessServiceFromMDMS == null) {
//             businessServiceFromMDMS = CrDeathConstants.BUSINESS_SERVICE_BND;
//         }
//             if (businessServiceFromMDMS.equals(CrDeathConstants.BUSINESS_SERVICE_BND) || !request.getDeathCertificateDtls()
//                     .get(0).getAction().equalsIgnoreCase(CrDeathConstants.TRIGGER_NOWORKFLOW)) {

//                 JSONObject obj = new JSONObject();
// //              
//                 // Adding assignes to processInstance  assignees
//                 List<Map<String, String>> uuidMaps = buildUUIDList(deathDtl.getAssignees());
//                 if (CollectionUtils.isNotEmpty(uuidMaps)) {
//                     obj.put(CrDeathConstants.ASSIGNEEKEY, uuidMaps);
//                 }
//               //  System.out.println();
//                 currentFile
//                 .forEach(deathdtls -> {

//                 obj.put(CrDeathConstants.BUSINESSIDKEY, deathdtls.getDeathACKNo());
               
//                 obj.put(CrDeathConstants.TENANTIDKEY, deathdtls.getTenantId());
//                 obj.put(CrDeathConstants.BUSINESSSERVICEKEY, deathdtls.getWorkflowCode());
//             });

//                 obj.put(CrDeathConstants.MODULENAMEKEY, CrDeathConstants.BNDMODULENAMEVALUE);
//                 obj.put(CrDeathConstants.ACTIONKEY, deathDtl.getAction());
//                 obj.put(CrDeathConstants.COMMENTKEY, deathDtl.getComment());

//                 obj.put(CrDeathConstants.DOCUMENTSKEY, deathDtl.getWfDocuments());
//                 array.add(obj);
//             }
//         }
      
        List<DeathDtl> currentFile = request.getDeathCertificateDtls();     
        JSONArray array = new JSONArray();
        for (DeathDtl deathDtl : request.getDeathCertificateDtls()) {
            String  businessServiceFromMDMS=deathDtl.getBusinessService();
            if (businessServiceFromMDMS == null) {
            businessServiceFromMDMS = DeathConstants.BUSINESS_SERVICE_BND;
        }
            if (businessServiceFromMDMS.equals(DeathConstants.BUSINESS_SERVICE_BND) || !request.getDeathCertificateDtls()
           .get(0).getAction().equalsIgnoreCase(DeathConstants.TRIGGER_NOWORKFLOW)) {

                JSONObject obj = new JSONObject();
                //  System.out.println("businessServiceFromMDMS"+businessServiceFromMDMS);    
                // Adding assignes to processInstance  assignees
                // List<Map<String, String>> uuidMaps = buildUUIDList(deathDtl.getAssignees());
                // System.out.println(uuidMaps);
                // if (CollectionUtils.isNotEmpty(uuidMaps)) {
                //     obj.put(CrDeathConstants.ASSIGNEEKEY, uuidMaps.get(0).get("uuid"));
                // }
                currentFile
                .forEach(deathdtls -> {
                obj.put(DeathConstants.BUSINESSIDKEY, deathdtls.getDeathBasicInfo().getDeathACKNo());
                obj.put(DeathConstants.TENANTIDKEY, deathdtls.getDeathBasicInfo().getTenantId());
                obj.put(DeathConstants.BUSINESSSERVICEKEY, deathdtls.getWorkflowcode());
                List<Map<String, String>> uuidMaps = buildUUIDList(deathdtls.getAssignees());
               // System.out.println("uuidMaps"+uuidMaps);
                if (CollectionUtils.isNotEmpty(uuidMaps)) {
                    obj.put(DeathConstants.ASSIGNEEKEY, uuidMaps.get(0).get("uuid"));
                }
            });

                obj.put(DeathConstants.MODULENAMEKEY, DeathConstants.BNDMODULENAMEVALUE);
                obj.put(DeathConstants.ACTIONKEY, deathDtl.getAction());
                obj.put(DeathConstants.COMMENTKEY, deathDtl.getComment());
                obj.put(DeathConstants.DOCUMENTSKEY, deathDtl.getWfDocuments());
                array.add(obj);
            }
        }

        if (!CollectionUtils.isEmpty(array)) {
            JSONObject workFlowRequest = new JSONObject();
            workFlowRequest.put(DeathConstants.REQUESTINFOKEY, request.getRequestInfo());
            workFlowRequest.put(DeathConstants.WORKFLOWREQUESTARRAYKEY, array);
            String response = null;
           // System.out.println("workflow Check  :" + workFlowRequest);
            // log.info("workflow integrator request " + workFlowRequest);

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

            // log.info("workflow integrator response " + response);

            /*
             * on success result from work-flow read the data and set the status back to TL
             * object
             */
           // System.out.println("response Check  :" + response);
            DocumentContext responseContext = JsonPath.parse(response);
            List<Map<String, Object>> responseArray = responseContext.read(DeathConstants.PROCESSINSTANCESJOSNKEY);
            Map<String, String> idStatusMap = new HashMap<>();
            responseArray.forEach(object -> {

                DocumentContext instanceContext = JsonPath.parse(object);
                idStatusMap.put(instanceContext.read(DeathConstants.BUSINESSIDJOSNKEY),
                        instanceContext.read(DeathConstants.STATUSJSONKEY));
            });
            
            // setting the status back to TL object from wf response

                  request.getDeathCertificateDtls().forEach(
                    bndObj -> bndObj.setApplicationStatus(idStatusMap.get(bndObj.getDeathBasicInfo().getDeathACKNo())));

        }

    }
//Jasmine 08.03.2023

    public  void callCorrectionWorkFlow(DeathCorrectionRequest request) {
      
        List<DeathCorrectionDtls> currentFile = request.getDeathCorrection();     
        JSONArray array = new JSONArray();
        for (DeathCorrectionDtls deathDtl : request.getDeathCorrection()) {
            String  businessServiceFromMDMS=deathDtl.getBusinessService();
            if (businessServiceFromMDMS == null) {
            businessServiceFromMDMS = DeathConstants.BUSINESS_SERVICE_BND;
        }
            if (businessServiceFromMDMS.equals(DeathConstants.BUSINESS_SERVICE_BND) || !request.getDeathCorrection()
           .get(0).getAction().equalsIgnoreCase(DeathConstants.TRIGGER_NOWORKFLOW)) {

                JSONObject obj = new JSONObject();
                currentFile
                .forEach(deathdtls -> {
                obj.put(DeathConstants.BUSINESSIDKEY, deathdtls.getDeathCorrectionBasicInfo().getDeathACKNo());
                obj.put(DeathConstants.TENANTIDKEY, deathdtls.getDeathCorrectionBasicInfo().getTenantId());
                obj.put(DeathConstants.BUSINESSSERVICEKEY, deathdtls.getWorkflowcode());
                List<Map<String, String>> uuidMaps = buildUUIDList(deathdtls.getAssignees());
               // System.out.println("uuidMaps"+uuidMaps);
                if (CollectionUtils.isNotEmpty(uuidMaps)) {
                    obj.put(DeathConstants.ASSIGNEEKEY, uuidMaps.get(0).get("uuid"));
                }
            });

                obj.put(DeathConstants.MODULENAMEKEY, DeathConstants.BNDMODULENAMEVALUE);
                obj.put(DeathConstants.ACTIONKEY, deathDtl.getAction());
                obj.put(DeathConstants.COMMENTKEY, deathDtl.getComment());
                obj.put(DeathConstants.DOCUMENTSKEY, deathDtl.getWfDocuments());
                array.add(obj);
            }
        }

        if (!CollectionUtils.isEmpty(array)) {
            JSONObject workFlowRequest = new JSONObject();
            workFlowRequest.put(DeathConstants.REQUESTINFOKEY, request.getRequestInfo());
            workFlowRequest.put(DeathConstants.WORKFLOWREQUESTARRAYKEY, array);
            String response = null;
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

            // log.info("workflow integrator response " + response);

            /*
             * on success result from work-flow read the data and set the status back to TL
             * object
             */
            // System.out.println("response Check  :" + response);
            DocumentContext responseContext = JsonPath.parse(response);
            List<Map<String, Object>> responseArray = responseContext.read(DeathConstants.PROCESSINSTANCESJOSNKEY);
            Map<String, String> idStatusMap = new HashMap<>();
            responseArray.forEach(object -> {

                DocumentContext instanceContext = JsonPath.parse(object);
                idStatusMap.put(instanceContext.read(DeathConstants.BUSINESSIDJOSNKEY),
                        instanceContext.read(DeathConstants.STATUSJSONKEY));
            });
            
            // setting the status back to TL object from wf response

                  request.getDeathCorrection().forEach(
                    bndObj -> bndObj.setApplicationStatus(idStatusMap.get(bndObj.getDeathCorrectionBasicInfo().getDeathACKNo())));

        }

    }

    private List<Map<String, String>> buildUUIDList(List<String> assignees) {
        List<Map<String, String>> result = new LinkedList<>();

        if (CollectionUtils.isNotEmpty(assignees)) {

            assignees.forEach(assignee -> result.add(Collections.singletonMap(DeathConstants.UUIDKEY, assignee)));
        }

        return result;
    }
  //RAkhi S on 08.03.2023
    public  void callWorkFlowAbandoned(DeathAbandonedRequest request) {     
      
        List<DeathAbandonedDtls> currentFile = request.getDeathAbandonedDtls();    
        JSONArray array = new JSONArray();
        for (DeathAbandonedDtls deathDtl : request.getDeathAbandonedDtls()) {
            String  businessServiceFromMDMS=deathDtl.getBusinessService();
            if (businessServiceFromMDMS == null) {
            businessServiceFromMDMS = DeathConstants.BUSINESS_SERVICE_BND;
        }
            if (businessServiceFromMDMS.equals(DeathConstants.BUSINESS_SERVICE_BND) || !request.getDeathAbandonedDtls()
           .get(0).getAction().equalsIgnoreCase(DeathConstants.TRIGGER_NOWORKFLOW)) {

                JSONObject obj = new JSONObject();               
                currentFile
                .forEach(deathdtls -> {
                obj.put(DeathConstants.BUSINESSIDKEY, deathdtls.getDeathBasicInfo().getDeathACKNo());
                obj.put(DeathConstants.TENANTIDKEY, deathdtls.getDeathBasicInfo().getTenantId());
                obj.put(DeathConstants.BUSINESSSERVICEKEY, deathdtls.getWorkflowcode());
                List<Map<String, String>> uuidMaps = buildUUIDList(deathdtls.getAssignees());
                if (CollectionUtils.isNotEmpty(uuidMaps)) {
                    obj.put(DeathConstants.ASSIGNEEKEY, uuidMaps.get(0).get("uuid"));
                }
            });

                obj.put(DeathConstants.MODULENAMEKEY, DeathConstants.BNDMODULENAMEVALUE);
                obj.put(DeathConstants.ACTIONKEY, deathDtl.getAction());
                obj.put(DeathConstants.COMMENTKEY, deathDtl.getComment());
                obj.put(DeathConstants.DOCUMENTSKEY, deathDtl.getWfDocuments());
                array.add(obj);
            }
        }

        if (!CollectionUtils.isEmpty(array)) {
            JSONObject workFlowRequest = new JSONObject();
            workFlowRequest.put(DeathConstants.REQUESTINFOKEY, request.getRequestInfo());
            workFlowRequest.put(DeathConstants.WORKFLOWREQUESTARRAYKEY, array);
            String response = null;
            // System.out.println("workflow Check  :" + workFlowRequest);
            // log.info("workflow integrator request " + workFlowRequest);

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

            // log.info("workflow integrator response " + response);

            /*
             * on success result from work-flow read the data and set the status back to TL
             * object
             */
            // System.out.println("response Check  :" + response);
            DocumentContext responseContext = JsonPath.parse(response);
            List<Map<String, Object>> responseArray = responseContext.read(DeathConstants.PROCESSINSTANCESJOSNKEY);
            Map<String, String> idStatusMap = new HashMap<>();
            responseArray.forEach(object -> {

                DocumentContext instanceContext = JsonPath.parse(object);
                idStatusMap.put(instanceContext.read(DeathConstants.BUSINESSIDJOSNKEY),
                        instanceContext.read(DeathConstants.STATUSJSONKEY));
            });
            
            // setting the status back to TL object from wf response

                  request.getDeathAbandonedDtls().forEach(
                    bndObj -> bndObj.setApplicationStatus(idStatusMap.get(bndObj.getDeathBasicInfo().getDeathACKNo())));

        }

    }

    //RAkhi S on 30.03.2023
    public  void callWorkFlowNAC(DeathNACRequest request) {     
      
        List<DeathNACDtls> currentFile = request.getDeathNACDtls();
        JSONArray array = new JSONArray();
        for (DeathNACDtls deathDtl : request.getDeathNACDtls()) {
            String  businessServiceFromMDMS=deathDtl.getBusinessService();
            if (businessServiceFromMDMS == null) {
            businessServiceFromMDMS = DeathConstants.BUSINESS_SERVICE_BND;
        }
            if (businessServiceFromMDMS.equals(DeathConstants.BUSINESS_SERVICE_BND) || !request.getDeathNACDtls()
           .get(0).getAction().equalsIgnoreCase(DeathConstants.TRIGGER_NOWORKFLOW)) {

                JSONObject obj = new JSONObject();               
                currentFile
                .forEach(deathdtls -> {
                obj.put(DeathConstants.BUSINESSIDKEY, deathdtls.getDeathBasicInfo().getDeathACKNo());
                obj.put(DeathConstants.TENANTIDKEY, deathdtls.getDeathBasicInfo().getTenantId());
                obj.put(DeathConstants.BUSINESSSERVICEKEY, deathdtls.getWorkflowcode());
                List<Map<String, String>> uuidMaps = buildUUIDList(deathdtls.getAssignees());
                if (CollectionUtils.isNotEmpty(uuidMaps)) {
                    obj.put(DeathConstants.ASSIGNEEKEY, uuidMaps.get(0).get("uuid"));
                }
            });

                obj.put(DeathConstants.MODULENAMEKEY, DeathConstants.BNDMODULENAMEVALUE);
                obj.put(DeathConstants.ACTIONKEY, deathDtl.getAction());
                obj.put(DeathConstants.COMMENTKEY, deathDtl.getComment());
                obj.put(DeathConstants.DOCUMENTSKEY, deathDtl.getWfDocuments());
                array.add(obj);
            }
        }

        if (!CollectionUtils.isEmpty(array)) {
            JSONObject workFlowRequest = new JSONObject();
            workFlowRequest.put(DeathConstants.REQUESTINFOKEY, request.getRequestInfo());
            workFlowRequest.put(DeathConstants.WORKFLOWREQUESTARRAYKEY, array);
            String response = null;
            // System.out.println("workflow Check  :" + workFlowRequest);
            // log.info("workflow integrator request " + workFlowRequest);

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

            // log.info("workflow integrator response " + response);

            /*
             * on success result from work-flow read the data and set the status back to TL
             * object
             */
            // System.out.println("response Check  :" + response);
            DocumentContext responseContext = JsonPath.parse(response);
            List<Map<String, Object>> responseArray = responseContext.read(DeathConstants.PROCESSINSTANCESJOSNKEY);
            Map<String, String> idStatusMap = new HashMap<>();
            responseArray.forEach(object -> {

                DocumentContext instanceContext = JsonPath.parse(object);
                idStatusMap.put(instanceContext.read(DeathConstants.BUSINESSIDJOSNKEY),
                        instanceContext.read(DeathConstants.STATUSJSONKEY));
            });
            
            // setting the status back to TL object from wf response

                  request.getDeathNACDtls().forEach(
                    bndObj -> bndObj.setApplicationStatus(idStatusMap.get(bndObj.getDeathBasicInfo().getDeathACKNo())));

        }

    }
    //RAkhi S on 30.03.2023
    public  void callWorkFlowCorrection(CorrectionRequest request) {

        List<CorrectionDetails> currentFile = request.getCorrectionDetails();
        JSONArray array = new JSONArray();
        for (CorrectionDetails deathDtl : request.getCorrectionDetails()) {
            String  businessServiceFromMDMS=deathDtl.getBusinessService();
            if (businessServiceFromMDMS == null) {
                businessServiceFromMDMS = DeathConstants.BUSINESS_SERVICE_BND;
            }
            if (businessServiceFromMDMS.equals(DeathConstants.BUSINESS_SERVICE_BND) || !request.getCorrectionDetails()
                    .get(0).getAction().equalsIgnoreCase(DeathConstants.TRIGGER_NOWORKFLOW)) {

                JSONObject obj = new JSONObject();
                currentFile
                        .forEach(deathdtls -> {
                            obj.put(DeathConstants.BUSINESSIDKEY, deathdtls.getDeathCorrectionBasicInfo().getDeathACKNo());
                            obj.put(DeathConstants.TENANTIDKEY, deathdtls.getDeathCorrectionBasicInfo().getTenantId());
                            obj.put(DeathConstants.BUSINESSSERVICEKEY, deathdtls.getWorkflowcode());
                            List<Map<String, String>> uuidMaps = buildUUIDList(deathdtls.getAssignees());
                            if (CollectionUtils.isNotEmpty(uuidMaps)) {
                                obj.put(DeathConstants.ASSIGNEEKEY, uuidMaps.get(0).get("uuid"));
                            }
                        });

                obj.put(DeathConstants.MODULENAMEKEY, DeathConstants.BNDMODULENAMEVALUE);
                obj.put(DeathConstants.ACTIONKEY, deathDtl.getAction());
                obj.put(DeathConstants.COMMENTKEY, deathDtl.getComment());
                obj.put(DeathConstants.DOCUMENTSKEY, deathDtl.getWfDocuments());
                array.add(obj);
            }
        }

        if (!CollectionUtils.isEmpty(array)) {
            JSONObject workFlowRequest = new JSONObject();
            workFlowRequest.put(DeathConstants.REQUESTINFOKEY, request.getRequestInfo());
            workFlowRequest.put(DeathConstants.WORKFLOWREQUESTARRAYKEY, array);
            String response = null;
            // System.out.println("workflow Check  :" + workFlowRequest);
            // log.info("workflow integrator request " + workFlowRequest);

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

            // log.info("workflow integrator response " + response);

            /*
             * on success result from work-flow read the data and set the status back to TL
             * object
             */
            // System.out.println("response Check  :" + response);
            DocumentContext responseContext = JsonPath.parse(response);
            List<Map<String, Object>> responseArray = responseContext.read(DeathConstants.PROCESSINSTANCESJOSNKEY);
            Map<String, String> idStatusMap = new HashMap<>();
            responseArray.forEach(object -> {

                DocumentContext instanceContext = JsonPath.parse(object);
                idStatusMap.put(instanceContext.read(DeathConstants.BUSINESSIDJOSNKEY),
                        instanceContext.read(DeathConstants.STATUSJSONKEY));
            });

            // setting the status back to TL object from wf response

            request.getCorrectionDetails().forEach(
                    bndObj -> bndObj.setApplicationStatus(idStatusMap.get(bndObj.getDeathCorrectionBasicInfo().getDeathACKNo())));

        }

    }



}