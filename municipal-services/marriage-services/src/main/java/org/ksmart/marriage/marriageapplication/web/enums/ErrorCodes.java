package org.ksmart.marriage.marriageapplication.web.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCodes {

    // marriage Details
    MARRIAGE_DETAILS_REQUIRED("REQUIRED"),
    MARRIAGE_DETAILS_NOT_FOUND("NOT_FOUND"),
    MARRIAGE_DETAILS_INVALID_SEARCH_CRITERIA("INVALID_CRITERIA"),
    MARRIAGE_DETAILS_INVALID_CREATE("INVALID_CREATE"),
    MARRIAGE_DETAILS_INVALID_UPDATE("INVALID_UPDATE"),
    MDMS_DATA_ERROR("MDMS_DATA_ERROR"),
    INVALID_SEARCH("INVALID_SEARCH"),
    // Idgen Service
    IDGEN_ERROR("IDGEN_ERROR"),
    ROW_MAPPER_ERROR("ROW-MAPPER_ERROR"),
    //common
    NOT_FOUND("NOT_FOUND");
    private String code;







}
