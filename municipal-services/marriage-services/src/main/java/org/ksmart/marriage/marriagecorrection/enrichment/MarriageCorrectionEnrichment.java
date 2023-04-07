package org.ksmart.marriage.marriagecorrection.enrichment;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.common.repository.IdGenRepository;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideAddressDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomAddressDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.springframework.beans.PropertyAccessor;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.*;

@Component
public class MarriageCorrectionEnrichment implements BaseEnrichment {

    @Autowired
    MarriageApplicationConfiguration config;
    @Autowired
    IdGenRepository idGenRepository;

    public void enrichCreate(MarriageCorrectionRequest correctionRequest, MarriageApplicationDetails marriageApplicationDetails) {

        RequestInfo requestInfo = correctionRequest.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        correctionRequest.getMarriageCorrectionDetails().forEach(correction -> {

            marriageApplicationDetails.setTenantid(correction.getTenantid());
            marriageApplicationDetails.setApplicationtype(correction.getApplicationtype());
            marriageApplicationDetails.setBusinessservice(correction.getBusinessservice());
            marriageApplicationDetails.setStatus(correction.getStatus());
            marriageApplicationDetails.setAction(correction.getAction());
            marriageApplicationDetails.setWorkflowcode(correction.getWorkflowcode());


            Map<String, String> marriageApplnDetailsFieldMap = getJsonFieldNames(MarriageApplicationDetails.class.getDeclaredFields());
            Map<String, String> brideDetailsFieldMap = getJsonFieldNames(BrideDetails.class.getDeclaredFields());
            Map<String, String> groomDetailsFieldMap = getJsonFieldNames(GroomDetails.class.getDeclaredFields());
            Map<String, String> brideAddressDetailsFieldMap = getJsonFieldNames(BrideAddressDetails.class.getDeclaredFields());
            Map<String, String> groomAddressDetailsFieldMap = getJsonFieldNames(GroomAddressDetails.class.getDeclaredFields());


            PropertyAccessor marriageApplnDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails);
            PropertyAccessor brideDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails.getBrideDetails());
            PropertyAccessor groomDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails.getGroomDetails());
            PropertyAccessor brideAddressDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails.getBrideAddressDetails());
            PropertyAccessor groomAddressDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails.getGroomAddressDetails());

            String changeFieldName = null;

            correction.getCorrectionField().forEach(correctionField -> {

                correctionField.getCorrectionFieldValue().forEach(changeField -> {

                    if (!changeField.getField().isEmpty()) {
                        String[] fieldName = changeField.getField().split("\\.");
                        if (fieldName.length == 1) {
                            if (marriageApplnDetailsFieldMap.containsKey(fieldName[0])) {

                                marriageApplnDetailsAccessor.setPropertyValue(marriageApplnDetailsFieldMap.get(fieldName[0]), changeField.getNewValue());

                            }
                        } else if (fieldName.length == 2) {
                            if (fieldName[0].equalsIgnoreCase("BrideDetails")) {
                                if (brideDetailsFieldMap.containsKey(fieldName[1])) {

                                    brideDetailsAccessor.setPropertyValue(brideDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());

                                }
                            } else if (fieldName[0].equalsIgnoreCase("GroomDetails")) {
                                if (groomDetailsFieldMap.containsKey(fieldName[1])) {

                                    groomDetailsAccessor.setPropertyValue(groomDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());

                                }
                            } else if (fieldName[0].equalsIgnoreCase("GroomAddressDetails")) {
                                if (brideAddressDetailsFieldMap.containsKey(fieldName[1])) {

                                    brideAddressDetailsAccessor.setPropertyValue(brideAddressDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());

                                }
                            } else if (fieldName[0].equalsIgnoreCase("BrideAddressDetails")) {
                                if (groomAddressDetailsFieldMap.containsKey(fieldName[1])) {

                                    groomAddressDetailsAccessor.setPropertyValue(groomAddressDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());

                                }
                            }

                        }
                    }
                });

            });
        });

        setApplicationNumbers(correctionRequest, marriageApplicationDetails);

    }

    private Map<String, String> getJsonFieldNames(Field[] fields) {
        Map<String, String> map = new HashMap<>();
        for (Field field : fields) {
            if (field.isAnnotationPresent(JsonProperty.class)) {
                String annotationValue = field.getAnnotation(JsonProperty.class).value();
                map.put(annotationValue, field.getName());
            }
        }
        return map;
    }

    private Object readObjectVals(Object obj, String propName) {
        PropertyAccessor myAccessor = PropertyAccessorFactory.forDirectFieldAccess(obj);
        return myAccessor.getPropertyValue(propName);
    }


    private void setApplicationNumbers(MarriageCorrectionRequest correctionRequest, MarriageApplicationDetails marriageApplicationDetails) {
        RequestInfo requestInfo = correctionRequest.getRequestInfo();
        List<MarriageCorrectionDetails> marriageCorrection = correctionRequest.getMarriageCorrectionDetails();
        String tenantId = marriageCorrection.get(0)
                .getTenantid();
        List<String> filecodes = getIds(requestInfo,
                tenantId,
                config.getMarriageApplNumberIdName(),
                marriageApplicationDetails.getModulecode(),
                "CRN",
                marriageCorrection.size());
        validateFileCodes(filecodes, marriageCorrection.size());

        ListIterator<String> itr = filecodes.listIterator();
        marriageApplicationDetails.setApplicationNumber(itr.next());

    }

    private List<String> getIds(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String fnType, int count) {
        return idGenRepository.getIdList(requestInfo, tenantId, idName, moduleCode, fnType, count);
    }

    private void validateFileCodes(List<String> fileCodes, int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(ErrorCodes.IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }

    }
}
