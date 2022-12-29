package org.egov.filemgmnt.workflow;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_FILE_ACTION;
import static org.egov.filemgmnt.web.enums.ErrorCodes.WORKFLOW_ERROR;
import static org.egov.filemgmnt.web.enums.ErrorCodes.WORKFLOW_ERROR_KEY_NOT_FOUND;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.egov.filemgmnt.web.models.FileDetail;
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

        String businessService = applicantPersonal.getFileDetail()
                                                  .getBusinessService();
        String fileAction = applicantPersonal.getFileDetail()
                                             .getAction();

        if (businessService == null) {
            businessService = FMConstants.BUSINESS_SERVICE_FM;
        }

        if (fileAction == null) {
            throw new CustomException(INVALID_FILE_ACTION.getCode(), " File action is required.");
        }
        JSONArray jsonArray = new JSONArray();
        for (ApplicantPersonal personal : request.getApplicantPersonals()) {
            if (businessService.equals(FMConstants.BUSINESS_SERVICE_FM)
                    || !fileAction.equalsIgnoreCase(FMConstants.TRIGGER_NOWORKFLOW)) {

                // json Object for workflow transition start
                JSONObject jsonObj = buildJsonObjectForWorkflow(personal);

                // create an array for Json-ProcessInstances ( workflow service's request part
                // has two json values 1.RequestInfo,2.ProcessInstances)
                jsonArray.add(jsonObj);
            }
        }

        if (CollectionUtils.isNotEmpty(jsonArray)) {
            Map<String, String> idStatusMap = workflowRequest(request.getRequestInfo(), jsonArray);

            // setting the status back to FileDetails object from wf response
            request.getApplicantPersonals()
                   .forEach(personal -> personal.getFileDetail()
                                                .setFileStatus(idStatusMap.get(personal.getFileDetail()
                                                                                       .getFileCode())));
        }

    }

    private Map<String, String> workflowRequest(RequestInfo requestInfo, JSONArray wfRequestArray) {
        // Create WorkflowRequest Json
        JSONObject request = new JSONObject();
        request.put(FMConstants.REQUESTINFOKEY, requestInfo);
        request.put(FMConstants.WORKFLOWREQUESTARRAYKEY, wfRequestArray);

        log.debug("workflow integrator request: {}", request);

        String response;
        try {
            // workflow service integration and get response from ws
            response = restTemplate.postForObject(fmConfig.getWfHost()
                                                          .concat(fmConfig.getWfTransitionPath()),
                                                  request,
                                                  String.class);
        } catch (HttpClientErrorException e) {
            // extracting message from client error exception
            DocumentContext responseContext = JsonPath.parse(e.getResponseBodyAsString());
            List<Object> errros;
            try {
                errros = responseContext.read("$.Errors");
            } catch (PathNotFoundException pe) {
                log.error(WORKFLOW_ERROR_KEY_NOT_FOUND.getCode(),
                          " Unable to read the json path in error object : " + pe.getMessage());
                throw new CustomException(WORKFLOW_ERROR_KEY_NOT_FOUND.getCode(),
                        " Unable to read the json path in error object : " + pe.getMessage());
            }
            throw new CustomException(WORKFLOW_ERROR.getCode(), errros.toString());
        } catch (Exception e) {
            throw new CustomException(WORKFLOW_ERROR.getCode(),
                    " Exception occured while integrating with workflow : " + e.getMessage());
        }

        log.info("workflow integrator response: {}", response);

        // on success result from work-flow read the data and set the status back to
        // Filedetails (filestatus)
        // object
        DocumentContext responseContext = JsonPath.parse(response);
        List<Map<String, Object>> responseArray = responseContext.read(FMConstants.PROCESSINSTANCESJOSNKEY);

        Map<String, String> idStatusMap = new HashMap<>();
        responseArray.forEach(status -> {
            DocumentContext instanceContext = JsonPath.parse(status);
            idStatusMap.put(instanceContext.read(FMConstants.BUSINESSIDJOSNKEY),
                            instanceContext.read(FMConstants.STATUSJSONKEY));
        });

        return idStatusMap;
    }

    private JSONObject buildJsonObjectForWorkflow(ApplicantPersonal personal) {
        FileDetail fileDetail = personal.getFileDetail();

        JSONObject jsonObj = new JSONObject();
        jsonObj.put(FMConstants.BUSINESSIDKEY, fileDetail.getFileCode());
        jsonObj.put(FMConstants.TENANTIDKEY, personal.getTenantId());
        jsonObj.put(FMConstants.BUSINESSSERVICEKEY, fileDetail.getWorkflowCode());
        jsonObj.put(FMConstants.MODULENAMEKEY, FMConstants.FMMODULENAMEVALUE);
        jsonObj.put(FMConstants.ACTIONKEY, fileDetail.getAction());
        jsonObj.put(FMConstants.COMMENTKEY, fileDetail.getComment());
        jsonObj.put(FMConstants.DOCUMENTSKEY, fileDetail.getWfDocuments());

        // Adding assignes to processInstance
        List<Map<String, String>> uuidMaps = buildUUIDList(fileDetail.getAssignees());
        if (CollectionUtils.isNotEmpty(uuidMaps)) {
            jsonObj.put(FMConstants.ASSIGNEEKEY, uuidMaps);
        }

        return jsonObj;
    }

    private List<Map<String, String>> buildUUIDList(List<String> assignees) {
        List<Map<String, String>> result = new LinkedList<>();

        if (CollectionUtils.isNotEmpty(assignees)) {
//            assignees.forEach(assignee -> {
//                Map<String, String> uuidMap = new HashMap<>();
//                uuidMap.put(FMConstants.UUIDKEY, assignee);
//                  result.add(uuidMap);
//            });
            assignees.forEach(assignee -> result.add(Collections.singletonMap(FMConstants.UUIDKEY, assignee)));
        }

        return result;
    }

}
