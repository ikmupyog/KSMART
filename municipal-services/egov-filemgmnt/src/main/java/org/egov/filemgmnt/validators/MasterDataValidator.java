package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_CREATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;

import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetails;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetails;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetailsRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

@Component
public class MasterDataValidator {

    // CREATE
    public void validateCreate(final ModuleDetailsRequest request, final ModuleDetails existing) {
        final String errorCode = INVALID_CREATE.getCode();

        if (existing != null) {
            throw new CustomException(errorCode, "Duplicate module, module already exists.");
        }

        if ((existing != null) && (existing.getModuleCode()
                                           .toLowerCase()
                                           .equals(request.getModuleDetails()
                                                          .getModuleCode()))
                && existing.getStatus() == "1") {
            throw new CustomException(errorCode, "Duplicate module, module already exists.");
        }
    }

    public void validateCreate(final MajorFunctionDetailsRequest request, final MajorFunctionDetails existing) {
        final String errorCode = INVALID_CREATE.getCode();

        if (existing != null) {
            throw new CustomException(errorCode, "Duplicate major function, major function already exists.");
        }

        if ((existing != null) && (existing.getMajorFunctionCode()
                                           .equalsIgnoreCase(request.getMajorFunctionDetails()
                                                                    .getMajorFunctionCode()))
                && existing.getStatus() == "1") {
            throw new CustomException(errorCode, "Duplicate major function, major function already exists.");
        }
    }

    public void validateCreate(final SubFunctionDetailsRequest request, final SubFunctionDetails existing) {
        final String errorCode = INVALID_CREATE.getCode();

        if (existing != null) {
            throw new CustomException(errorCode, "Duplicate sub function, sub function already exists.");
        }
        if ((existing != null) && (existing.getSubFunctionCode()
                                           .equalsIgnoreCase(request.getSubFunctionDetails()
                                                                    .getSubFunctionCode()))
                && existing.getStatus() == "1") {
            throw new CustomException(errorCode, "Duplicate sub function, sub function already exists.");
        }
    }

    public void validateCreate(final ServiceDetailsRequest request, final ServiceDetails existing) {
        final String errorCode = INVALID_CREATE.getCode();

        if (existing != null) {
            throw new CustomException(errorCode, "Duplicate service, service already exists.");
        }
        if ((existing != null) && (existing.getServiceCode()
                                           .equalsIgnoreCase(request.getServiceDetails()
                                                                    .getServiceCode()))
                && existing.getStatus() == "1") {
            throw new CustomException(errorCode, "Duplicate service, service already exists.");
        }
    }

    // UPDATE
    public void validateUpdate(final ModuleDetailsRequest request, final ModuleDetails existing) {
        final String errorCode = INVALID_UPDATE.getCode();

        if (existing == null) {
            throw new CustomException(errorCode, "Module not found for module code.");
        }

        final ModuleDetails module = request.getModuleDetails();
        if (module.getModuleCode() == null) {
            throw new CustomException(errorCode, "Module id is required for update.");
        }

        if (!ObjectUtils.nullSafeEquals(module.getModuleCode(), existing.getModuleCode())) {
            throw new CustomException(errorCode, "Invalid module code for existing module.");
        }
    }

    public void validateUpdate(final MajorFunctionDetailsRequest request, final MajorFunctionDetails existing) { // NOPMD
        final String errorCode = INVALID_UPDATE.getCode();

        if (existing == null) {
            throw new CustomException(errorCode, "Major function not found for module code.");
        }

        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();
        if (majorFunction.getMajorFunctionCode() == null) {
            throw new CustomException(errorCode, "Major function code is required for update.");
        }

        if (!ObjectUtils.nullSafeEquals(majorFunction.getMajorFunctionCode(), existing.getMajorFunctionCode())) {
            throw new CustomException(errorCode, "Invalid major function code for existing module.");
        }

        // Validate module
        if (majorFunction.getModuleId() == null) {
            throw new CustomException(errorCode, "Module id is required for major function update.");
        }

        if (!ObjectUtils.nullSafeEquals(majorFunction.getModuleId(), existing.getModuleId())) {
            throw new CustomException(errorCode, "Invalid module id for existing major function.");
        }
    }

    public void validateUpdate(final SubFunctionDetailsRequest request, final SubFunctionDetails existing) { // NOPMD
        final String errorCode = INVALID_UPDATE.getCode();

        if (existing == null) {
            throw new CustomException(errorCode, "Sub function not found for sub function code.");
        }

        final SubFunctionDetails subFunction = request.getSubFunctionDetails();
        if (subFunction.getId() == null) {
            throw new CustomException(errorCode, "Sub function id is required for update.");
        }

        if (!ObjectUtils.nullSafeEquals(subFunction.getId(), existing.getId())) {
            throw new CustomException(errorCode, "Invalid sub function id for existing module.");
        }

        // Validate major function
        if (subFunction.getMajorFunctionId() == null) {
            throw new CustomException(errorCode, "Major Function id is required for major function update.");
        }

        if (!ObjectUtils.nullSafeEquals(subFunction.getMajorFunctionId(), existing.getMajorFunctionId())) {
            throw new CustomException(errorCode, "Invalid major function id for existing sub function.");
        }
    }

    public void validateUpdate(final ServiceDetailsRequest request, final ServiceDetails existing) { // NOPMD
        final String errorCode = INVALID_UPDATE.getCode();

        if (existing == null) {
            throw new CustomException(errorCode, "Service Details not found for service code.");
        }

        final ServiceDetails serviceDetails = request.getServiceDetails();
        if (serviceDetails.getId() == null) {
            throw new CustomException(errorCode, "Service id is required for update.");
        }

        if (!ObjectUtils.nullSafeEquals(serviceDetails.getId(), existing.getId())) {
            throw new CustomException(errorCode, "Invalid service id for existing module.");
        }

        // Validate sub function
        if (serviceDetails.getSubFunctionId() == null) {
            throw new CustomException(errorCode, "Sub Function id is required for Service details update.");
        }

        if (!ObjectUtils.nullSafeEquals(serviceDetails.getSubFunctionId(), existing.getSubFunctionId())) {
            throw new CustomException(errorCode, "Invalid sub function id for existing service.");
        }
    }
}
