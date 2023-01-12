package org.ksmart.death.workflow;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Collections;
import org.apache.commons.collections4.CollectionUtils;

import org.ksmart.death.crdeath.config.CrDeathConfiguration;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
import org.ksmart.death.crdeath.util.CrDeathConstants;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.crdeath.web.models.CrDeathDtl;
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



    private   final CrDeathConfiguration bndConfig;
    private   final RestTemplate restTemplate;

    @Autowired
    public WorkflowIntegrator(RestTemplate restTemplate, CrDeathConfiguration bndConfig) {
        this.restTemplate = restTemplate;
        this.bndConfig = bndConfig;

    }

    /**
     * Method to integrate with workflow
     *
     * takes the filedetails request (now take applicant personal request) as
     * parameter constructs the work-flow request
     *
     * and sets the resultant status from wf-response back to file details object
     *
     * @param request the {@link CrDeathDtlRequest}
     */
    public  void callWorkFlow(CrDeathDtlRequest request) {

        CrDeathDtl currentFile = request.getDeathCertificateDtls().get(0);
        String wfTenantId = currentFile.getTenantId();
        String businessServiceFromMDMS = currentFile.getBusinessService();

        if (businessServiceFromMDMS == null) {
            businessServiceFromMDMS = CrDeathConstants.BUSINESS_SERVICE_BND;
        }

        JSONArray array = new JSONArray();

        for (CrDeathDtl deathDtl : request.getDeathCertificateDtls()) {
            if (businessServiceFromMDMS.equals(CrDeathConstants.BUSINESS_SERVICE_BND) || !request.getDeathCertificateDtls()
                    .get(0).getAction().equalsIgnoreCase(CrDeathConstants.TRIGGER_NOWORKFLOW)) {

                JSONObject obj = new JSONObject();
//                List<Map<String, String>> uuidmaps = new LinkedList<>();
//
//                if (!CollectionUtils.isEmpty(deathDtl.getAssignee())) {
//
//                    // Adding assignes to processInstance
//
//                    deathDtl.getAssignee().forEach(assignee -> {
//
//                        Map<String, String> uuidMap = new HashMap<>();
//
//
//                        uuidMap.put(CrDeathConstants.UUIDKEY, assignees);
//                        uuidmaps.add(uuidMap);
//                    });
//                }

                // Adding assignes to processInstance  assignees
                List<Map<String, String>> uuidMaps = buildUUIDList(deathDtl.getAssignees());
                if (CollectionUtils.isNotEmpty(uuidMaps)) {
                    obj.put(CrDeathConstants.ASSIGNEEKEY, uuidMaps);
                }

                obj.put(CrDeathConstants.BUSINESSIDKEY, deathDtl.getDeathACKNo());
                obj.put(CrDeathConstants.TENANTIDKEY, wfTenantId);
                obj.put(CrDeathConstants.BUSINESSSERVICEKEY, currentFile.getWorkflowCode());
                obj.put(CrDeathConstants.MODULENAMEKEY, CrDeathConstants.BNDMODULENAMEVALUE);
                obj.put(CrDeathConstants.ACTIONKEY, deathDtl.getAction());
                obj.put(CrDeathConstants.COMMENTKEY, deathDtl.getComment());
//                if (!CollectionUtils.isEmpty(deathDtl.getAssignees())) {
//                    obj.put(CrDeathConstants.ASSIGNEEKEY, uuidmaps);
//                }
                obj.put(CrDeathConstants.DOCUMENTSKEY, deathDtl.getWfDocuments());
                array.add(obj);
            }
        }

        if (!CollectionUtils.isEmpty(array)) {
            JSONObject workFlowRequest = new JSONObject();
            workFlowRequest.put(CrDeathConstants.REQUESTINFOKEY, request.getRequestInfo());
            workFlowRequest.put(CrDeathConstants.WORKFLOWREQUESTARRAYKEY, array);
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
            System.out.println("response Check  :" + response);
            DocumentContext responseContext = JsonPath.parse(response);
            List<Map<String, Object>> responseArray = responseContext.read(CrDeathConstants.PROCESSINSTANCESJOSNKEY);
            Map<String, String> idStatusMap = new HashMap<>();
            responseArray.forEach(object -> {

                DocumentContext instanceContext = JsonPath.parse(object);
                idStatusMap.put(instanceContext.read(CrDeathConstants.BUSINESSIDJOSNKEY),
                        instanceContext.read(CrDeathConstants.STATUSJSONKEY));
            });
            // setting the status back to TL object from wf response

                  request.getDeathCertificateDtls().forEach(
                    bndObj -> bndObj.setStatus(idStatusMap.get(bndObj.getDeathACKNo())));

        }

    }

    private List<Map<String, String>> buildUUIDList(List<String> assignees) {
        List<Map<String, String>> result = new LinkedList<>();

        if (CollectionUtils.isNotEmpty(assignees)) {

            assignees.forEach(assignee -> result.add(Collections.singletonMap(CrDeathConstants.UUIDKEY, assignee)));
        }

        return result;
    }



}