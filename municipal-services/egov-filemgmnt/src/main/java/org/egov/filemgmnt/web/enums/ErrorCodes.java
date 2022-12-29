package org.egov.filemgmnt.web.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCodes {

    // File Detail
    INVALID_FILE_ACTION("FM_INVALID_FILE_ACTION"),

    // Idgen Service
    IDGEN_ERROR("FM_IDGEN_ERROR"),

    // Mdms Service
    MDMS_DATA_ERROR("FM_MDMS_DATA_ERROR"),
    MDMS_INVALID_TENANT_ID("FM_MDMS_INVALID_TENANTID"),

    // Wrrkflow Service
    WORKFLOW_ERROR("FM_WORKFLOW_ERROR"),
    WORKFLOW_ERROR_KEY_NOT_FOUND("FM_WORKFLOW_ERROR_KEY_NOT_FOUND"),

    // Common
    REQUIRED("FM_REQUIRED"),
    NOT_FOUND("FM_NOT_FOUND"),
    INVALID_CREATE("FM_INVALID_CREATE"),
    INVALID_UPDATE("FM_INVALID_UPDATE"),
    INVALID_SEARCH("FM_INVALID_SEARCH"),
    ILLEGAL_ARGUMENT("FM_ILLEGAL_ARGUMENT");

    private String code;
}
