package org.egov.filemgmnt.workflow;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_FILE_ACTION;
import static org.egov.filemgmnt.web.enums.ErrorCodes.WORKFLOW_ERROR;
import static org.egov.filemgmnt.web.enums.ErrorCodes.WORKFLOW_ERROR_KEY_NOT_FOUND;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFile;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileApplicant;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileRequest;
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
public class ArisingFileWorkflowIntegrator {

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    private RestTemplate restTemplate;

    public void callAriseFileWorkflow(ArisingFileRequest request) {
        final ArisingFile arisingFile = request.getArisingFile();
        Assert.notNull(arisingFile, "Arising file details must not be null");

        final String fileCode = arisingFile.getFileCode();
        Assert.notNull(arisingFile, "File Code must not be null");

        String businessService = arisingFile.getBusinessService();
        final String fileAction = arisingFile.getAction();

        if (StringUtils.isBlank(businessService)) {
            businessService = FMConstants.BUSINESS_SERVICE_FM;
        }

        if (StringUtils.isBlank(fileAction)) {
            throw new CustomException(INVALID_FILE_ACTION.getCode(), "File action is required.");
        }

        final ArisingFileApplicant arisingFileApplicant = arisingFile.getArisingFileApplicant();
        Assert.notNull(arisingFileApplicant, "Arisingfile Applicant  must not be null");

        final JSONArray jsonArray = new JSONArray();
        if (businessService.equals(FMConstants.BUSINESS_SERVICE_FM)
                || !fileAction.equalsIgnoreCase(FMConstants.TRIGGER_NOWORKFLOW)) {

            // json Object for workflow transition start
            final JSONObject jsonObj = buildJsonObjectForArisingFileWorkflow(arisingFile, arisingFileApplicant);

            // create an array for Json-ProcessInstances ( workflow service's request part
            // has two json values 1.RequestInfo,2.ProcessInstances)
            jsonArray.add(jsonObj);
        }
        if (CollectionUtils.isNotEmpty(jsonArray)) {
            final Map<String, String> idStatusMap = arisingFileWorkflowRequest(request.getRequestInfo(), jsonArray);

            // setting the status back to FileDetails object from wf response
            arisingFile.setFileStatus(idStatusMap.get(arisingFile.getFileCode()));
        }
    }

    private JSONObject buildJsonObjectForArisingFileWorkflow(final ArisingFile arisingFile,
                                                             final ArisingFileApplicant arisingFileApplicant) {
        final JSONObject jsonObj = new JSONObject();
        jsonObj.put(FMConstants.BUSINESSIDKEY, arisingFile.getFileCode());
        jsonObj.put(FMConstants.TENANTIDKEY, arisingFileApplicant.getTenantId());
        jsonObj.put(FMConstants.BUSINESSSERVICEKEY, arisingFile.getWorkflowCode());
        jsonObj.put(FMConstants.MODULENAMEKEY, FMConstants.FMMODULENAMEVALUE);
        jsonObj.put(FMConstants.ACTIONKEY, arisingFile.getAction());
        jsonObj.put(FMConstants.COMMENTKEY, arisingFile.getComments());
        // jsonObj.put(FMConstants.DOCUMENTSKEY, fileDetail.getWfDocuments());

        // Adding assignes to processInstance
        System.out.println("****************");
        System.out.println(jsonObj);
        final String assignees = arisingFile.getAssignee();
        final List<String> assigneeList;//
        if (StringUtils.isNotBlank(assignees))
            assigneeList = Arrays.asList(assignees.split(","));
        else
            assigneeList = Collections.emptyList();

        final List<Map<String, String>> uuidMaps = buildUUIDList(assigneeList);
        if (CollectionUtils.isNotEmpty(uuidMaps)) {
            jsonObj.put(FMConstants.ASSIGNEEKEY, uuidMaps);
        }

        return jsonObj;
    }

    private Map<String, String> arisingFileWorkflowRequest(final RequestInfo requestInfo,
                                                           final JSONArray wfRequestArray) { // NOPMD
        // Create WorkflowRequest Json
        final JSONObject request = new JSONObject();
        request.put(FMConstants.REQUESTINFOKEY, requestInfo);
        request.put(FMConstants.WORKFLOWREQUESTARRAYKEY, wfRequestArray);

        if (log.isDebugEnabled()) {
            log.debug("Arising File Workflow integrator request: {}", request);
        }

        String response;
        try {
            // workflow service integration and get response from ws
            response = restTemplate.postForObject(fmConfig.getWfHost()
                                                          .concat(fmConfig.getWfTransitionPath()),
                                                  request,
                                                  String.class);
        } catch (HttpClientErrorException e) {
            // extracting message from client error exception
            final DocumentContext responseContext = JsonPath.parse(e.getResponseBodyAsString());
            List<Object> errros;
            try {
                errros = responseContext.read("$.Errors");
            } catch (PathNotFoundException ex) {
                if (log.isErrorEnabled()) {
                    log.error(WORKFLOW_ERROR_KEY_NOT_FOUND.getCode(),
                              " Unable to read the json path in error object : " + ex.getMessage());
                }
                throw new CustomException(WORKFLOW_ERROR_KEY_NOT_FOUND.getCode(),
                        " Unable to read the json path in error object : " + ex.getMessage());
            }
            throw new CustomException(WORKFLOW_ERROR.getCode(), errros.toString());
        } catch (Exception e) {
            throw new CustomException(WORKFLOW_ERROR.getCode(),
                    " Exception occured while integrating with workflow : " + e.getMessage());
        }

        if (log.isDebugEnabled()) {
            log.debug("Arising file Workflow integrator response: {}", response);
        }

        // on success result from work-flow read the data and set the status back to
        // Filedetails (filestatus)
        // object
        final DocumentContext responseContext = JsonPath.parse(response);
        final List<Map<String, Object>> responseArray = responseContext.read(FMConstants.PROCESSINSTANCESJOSNKEY);

        final Map<String, String> idStatusMap = new HashMap<>();
        responseArray.forEach(status -> {
            final DocumentContext instanceContext = JsonPath.parse(status);
            idStatusMap.put(instanceContext.read(FMConstants.BUSINESSIDJOSNKEY),
                            instanceContext.read(FMConstants.STATUSJSONKEY));
        });

        return idStatusMap;
    }

    private List<Map<String, String>> buildUUIDList(final List<String> assignees) {
        final List<Map<String, String>> result = new LinkedList<>();

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
