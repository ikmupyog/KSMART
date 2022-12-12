package org.egov.filemgmnt.workflow;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
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

    private final RestTemplate restTemplate;
    private final FMConfiguration fmConfig;

    @Autowired
    WorkflowIntegrator(RestTemplate restTemplate, FMConfiguration fmConfig) {
        this.restTemplate = restTemplate;
        this.fmConfig = fmConfig;
    }

    /**
     * Method to integrate with workflow
     *
     * takes the filedetails request (now take applicant personal request) as
     * parameter constructs the work-flow request
     *
     * and sets the resultant status from wf-response back to file details object
     *
     * @param request the {@link ApplicantPersonalRequest}
     */
    public void callWorkFlow(ApplicantPersonalRequest request) {

        ApplicantPersonal applicantPersonal = request.getApplicantPersonals()
                                                     .get(0);
        Assert.notNull(applicantPersonal, "Applicant personal must not be null");

        String tenantId = applicantPersonal.getTenantId();
        String businessService = applicantPersonal.getFileDetail()
                                                  .getBusinessService();
        String fileAction = applicantPersonal.getFileDetail()
                                             .getAction();

        if (businessService == null) {
            businessService = FMConstants.BUSINESS_SERVICE_FM;
        }

        JSONArray array = new JSONArray();

        for (ApplicantPersonal personal : request.getApplicantPersonals()) {
            if (businessService.equals(FMConstants.BUSINESS_SERVICE_FM)
                    || !fileAction.equalsIgnoreCase(FMConstants.TRIGGER_NOWORKFLOW)) {

                List<Map<String, String>> uuidmaps = new LinkedList<>();

                if (CollectionUtils.isNotEmpty(personal.getFileDetail()
                                                       .getAssignees())) {

                    // Adding assignes to processInstance

                    personal.getFileDetail()
                            .getAssignees()
                            .forEach(assignee -> {

                                Map<String, String> uuidMap = new HashMap<>();

                                uuidMap.put(FMConstants.UUIDKEY, assignee);
                                uuidmaps.add(uuidMap);
                            });
                }
                // json Object for workflow transition start
                JSONObject obj = new JSONObject();
                obj.put(FMConstants.BUSINESSIDKEY,
                        personal.getFileDetail()
                                .getFileCode());
                obj.put(FMConstants.TENANTIDKEY, tenantId);
                obj.put(FMConstants.BUSINESSSERVICEKEY,
                        applicantPersonal.getFileDetail()
                                         .getWorkflowCode());
                obj.put(FMConstants.MODULENAMEKEY, FMConstants.FMMODULENAMEVALUE);
                obj.put(FMConstants.ACTIONKEY,
                        personal.getFileDetail()
                                .getAction());
                obj.put(FMConstants.COMMENTKEY,
                        personal.getFileDetail()
                                .getComment());
                if (!CollectionUtils.isEmpty(personal.getFileDetail()
                                                     .getAssignees())) {
                    obj.put(FMConstants.ASSIGNEEKEY, uuidmaps);
                }
                obj.put(FMConstants.DOCUMENTSKEY,
                        personal.getFileDetail()
                                .getWfDocuments());

                // json object end

                // create an array for Json-ProcessInstances ( workflow service's request part
                // has two json values 1.RequestInfo,2.ProcessInstances)
                array.add(obj);
            }
        }

        if (!CollectionUtils.isEmpty(array)) {

            // Create WorkflowRequest Json
            JSONObject workFlowRequest = new JSONObject();
            workFlowRequest.put(FMConstants.REQUESTINFOKEY, request.getRequestInfo());
            workFlowRequest.put(FMConstants.WORKFLOWREQUESTARRAYKEY, array);
            String response = null;
            System.out.println("workflow Check  :" + workFlowRequest);
            log.info("workflow integrator request " + workFlowRequest);

            try {
                // workflow service integration and get response from ws
                response = restTemplate.postForObject(fmConfig.getWfHost()
                                                              .concat(fmConfig.getWfTransitionPath()),
                                                      workFlowRequest,
                                                      String.class);
            } catch (HttpClientErrorException e) {
                /*
                 * extracting message from client error exception
                 */
                DocumentContext responseContext = JsonPath.parse(e.getResponseBodyAsString());
                List<Object> errros = null;
                try {
                    errros = responseContext.read("$.Errors");
                } catch (PathNotFoundException pnfe) {
                    log.error("EG_FM_WF_ERROR_KEY_NOT_FOUND",
                              " Unable to read the json path in error object : " + pnfe.getMessage());
                    throw new CustomException("EG_FM_WF_ERROR_KEY_NOT_FOUND",
                            " Unable to read the json path in error object : " + pnfe.getMessage());
                }
                throw new CustomException("EG_WF_ERROR", errros.toString());
            } catch (Exception e) {
                throw new CustomException("EG_WF_ERROR",
                        " Exception occured while integrating with workflow : " + e.getMessage());
            }

            log.info("workflow integrator response " + response);

            // on success result from work-flow read the data and set the status back to
            // Filedetails (filestatus)
            // object

            System.out.println("response Check  :" + response);
            DocumentContext responseContext = JsonPath.parse(response);
            List<Map<String, Object>> responseArray = responseContext.read(FMConstants.PROCESSINSTANCESJOSNKEY);
            Map<String, String> idStatusMap = new HashMap<>();
            responseArray.forEach(object -> {

                DocumentContext instanceContext = JsonPath.parse(object);
                idStatusMap.put(instanceContext.read(FMConstants.BUSINESSIDJOSNKEY),
                                instanceContext.read(FMConstants.STATUSJSONKEY));
            });
            // setting the status back to FileDetails object from wf response
            request.getApplicantPersonals()
                   .forEach(fmObj -> fmObj.getFileDetail()
                                          .setFileStatus(idStatusMap.get(fmObj.getFileDetail()
                                                                              .getFileCode())));

        }

    }

}
