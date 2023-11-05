package org.ksmart.marriage.marriagecorrection.validator;

import org.apache.commons.lang3.StringUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.List;

import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.*;

@Component
public class MarriageCorrectionApplnValidator {


    public void validateCorrectionCreate(MarriageCorrectionRequest request) {
        List<MarriageCorrectionDetails> correctionApplications = request.getMarriageCorrectionDetails();
        if (CollectionUtils.isEmpty(request.getMarriageCorrectionDetails())) {
            throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(),
                    "Marriage Correction Details is required.");
        }
        if (correctionApplications.size() > 1) { // NOPMD
            throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(),
                    "Supports only single Marriage correction application create request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getRegisterId())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Register Id is required for create correction request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getRegistrationno())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Registration Number is required for create correction request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getTenantid())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Tenant Id is required for create correction request.");
        }
        if (CollectionUtils.isEmpty(correctionApplications.get(0).getCorrectionField())) {
            throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(),
                    "Marriage Correction Details is required.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getApplicationtype())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Application Type is required for create correction request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getModuleCode())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Module Code is required for create correction request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getWorkflowcode())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Workflow Code is required for create correction request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getBusinessservice())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Business Service is required for create correction request.");
        }
//        if (StringUtils.isBlank(correctionApplications.get(0).getStatus())) {
//            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
//                    "Application Status is required for create correction request.");
//        }
    }

    public void validateCorrectionUpdate(MarriageCorrectionRequest request) {
        List<MarriageCorrectionDetails> correctionApplications = request.getMarriageCorrectionDetails();
        if (CollectionUtils.isEmpty(request.getMarriageCorrectionDetails())) {
            throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(),
                    "Marriage details is required.");
        }
        if (correctionApplications.size() > 1) {
            throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(),
                    "Supports only single application update request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getRegisterId())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Register Id is required for update correction request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getRegistrationno())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Registration number is required for update correction request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getTenantid())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Tenant Id is required for update request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getId())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Application Id is required for update request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getApplicationtype())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Application Type is required for update request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getBusinessservice())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Bussiness Service is required for update request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getApplicationNo())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Application Number is required for update request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getWorkflowcode())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Workflow Code is required for update request.");
        }
        if (StringUtils.isBlank(correctionApplications.get(0).getAction())) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Workflow action is required for update request.");
        }
//        if (StringUtils.isBlank(correctionApplications.get(0).getStatus())) {
//            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
//                    "Application Status is required for update request.");
//        }
        //mdmsValidator.validateMdmsData(request, mdmsData);
    }


    public void validateCommonFields(MarriageDetailsRequest request) {

        List<MarriageApplicationDetails> marriageApplication = request.getMarriageDetails();
        if (marriageApplication != null) {
            marriageApplication
                    .forEach(marriagedtls -> {
                        if (marriagedtls.getDateofmarriage() <= 0) {
                            throw new CustomException(" DATE OF MARRIAGE INVALID ",
                                    "The  Date of marriage " +
                                            marriagedtls.getDateofmarriage()
                                            + " is invalid");
                        }
                        if (marriagedtls.getBrideDetails().getDateofbirth() <= 0) {
                            throw new CustomException(" DATE OF BIRTH INVALID ",
                                    "The  Date of birth " +
                                            marriagedtls.getBrideDetails().getDateofbirth()
                                            + " is invalid");
                        }
                        if (marriagedtls.getGroomDetails().getDateofbirth() <= 0) {
                            throw new CustomException(" DATE OF BIRTH INVALID ",
                                    "The  Date of birth " +
                                            marriagedtls.getGroomDetails().getDateofbirth()
                                            + " is invalid");
                        }
                    });
        }
    }

    public void validateCorrectionApplnSearch(List<MarriageApplicationDetails> applicationDetails) {
        if (applicationDetails.isEmpty()) {
            throw new CustomException(MARRIAGE_DETAILS_NOT_FOUND.getCode(),
                    "Marriage Correction Application(s) not found in database.");
        }
        if (applicationDetails.size() > 1) {
            throw new CustomException(MARRIAGE_DETAILS_NOT_FOUND.getCode(),
                    "Supports only single Marriage Application(s) for correction.");
        }
    }

    public void validateCorrectionRegistrySearch(List<MarriageRegistryDetails> registryDetails) {
        if (registryDetails.isEmpty()) {
            throw new CustomException(MARRIAGE_DETAILS_NOT_FOUND.getCode(),
                    "Marriage registration(s) not found in database.");
        }
        if (registryDetails.size() > 1) {
            throw new CustomException(MARRIAGE_DETAILS_NOT_FOUND.getCode(),
                    "Supports only single Marriage registration(s) for correction.");
        }
    }
}
