package org.ksmart.death.deathapplication.web.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
     * Creates Error codes 
     *Jasmine
     * on 06/02/2023
     */
@Getter
@AllArgsConstructor
public enum ErrorCodes {
    
//  Applicant Personal
    DEATH_DETAILS_REQUIRED("REQUIRED"),
    DEATH_DETAILS_NOT_FOUND("NOT_FOUND"),
    DEATH_DETAILS_INVALID_CREATE("INVALID_CREATE"),
 
//  Updare
    DEATH_REG_NOT_FOUND("NOT_FOUND"),
    DEATH_REG_INVALID_UPDATE("INVALID_UPDATE"),
    DEATH_REG_REQUIRED("REQUIRED"),
 
//  Search
    INVALID_SEARCH("INVALID_SEARCH"),

    ROW_MAPPER_ERROR("ROW-MAPPER_ERROR"),
//  Idgen Service
    IDGEN_ERROR("IDGEN_ERROR");



      private String code;
    
}
