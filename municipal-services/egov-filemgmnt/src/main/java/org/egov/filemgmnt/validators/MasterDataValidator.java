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
    }

    public void validateCreate(final MajorFunctionDetailsRequest request, final MajorFunctionDetails existing) {
        final String errorCode = INVALID_CREATE.getCode();

        if (existing != null) {
            throw new CustomException(errorCode, "Duplicate major function, major function already exists.");
        }
    }

    public void validateCreate(final SubFunctionDetailsRequest request, final SubFunctionDetails existing) {
        final String errorCode = INVALID_CREATE.getCode();

        if (existing != null) {
            throw new CustomException(errorCode, "Duplicate sub function, sub function already exists.");
        }
    }

    public void validateCreate(final ServiceDetailsRequest request, final ServiceDetails existing) {
        final String errorCode = INVALID_CREATE.getCode();

        if (existing != null) {
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
}
