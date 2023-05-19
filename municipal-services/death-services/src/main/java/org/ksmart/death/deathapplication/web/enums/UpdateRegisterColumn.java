package org.ksmart.death.deathapplication.web.enums;

import lombok.Getter;

@Getter
public enum UpdateRegisterColumn {
    //DECEASED details
    REG_DECEASED_DOB("DECEASED_DOB","eg_death_dtls_registry","dateofbirth"),
    REG_DECEASED_AADHAR("CR_DECEASED_AADHAR","eg_death_dtls_registry","deceased_aadhar_number"),
    REG_DECEASED_SEX("CR_DECEASED_SEX","eg_death_dtls_registry","deceased_gender"),

    REG_DECEASED_F_NAME_EN("CR_DECEASED_FIRST_NAME_EN","eg_death_dtls_registry","deceased_firstname_en"),
    REG_DECEASED_F_NAME_ML("CR_DECEASED_FIRST_NAME_ML","eg_death_dtls_registry","deceased_firstname_ml"),
    REG_DECEASED_M_NAME_EN("CR_DECEASED_MIDDLE_NAME_EN","eg_death_dtls_registry","deceased_middlename_en"),
    REG_DECEASED_M_NAME_ML("CR_DECEASED_MIDDLE_NAME_ML","eg_death_dtls_registry","deceased_middlename_ml"),
    REG_DECEASED_L_NAME_EN("CR_DECEASED_LAST_NAME_EN","eg_death_dtls_registry","deceased_lastname_en"),
    REG_DECEASED_L_NAME_ML("CR_DECEASED_LAST_NAME_ML","eg_death_dtls_registry","deceased_lastname_ml"),

    //Mother Details
    REG_DECEASED_MOTHER_NAME_EN("CR_DECEASED_MOTHER_EN","eg_death_dtls_registry","firstname_en"),  //wrong
    REG_DECEASED_MOTHER_NAME_ML("CR_DECEASED_MOTHER_ML","eg_death_dtls_registry","firstname_ml"),//wrong

    //Father Details
    REG_DECEASED_FATHER_EN("CR_DECEASED_FATHER_EN","eg_death_dtls_registry","firstname_en"),//wrong
    REG_DECEASED_FATHER_ML("CR_DECEASED_FATHER_EN_ML","eg_death_dtls_registry","firstname_ml"),//wrong

    //SPOUSE Details
    REG_DECEASED_SPOUSE_EN("CR_SPOUSE_NAME_EN","eg_death_dtls_registry","spouse_name_en"),
    REG_DECEASED_SPOUSE_ML("CR_SPOUSE_NAME_Ml","eg_death_dtls_registry","spouse_name_ML"),



    //Permanent Address Details
    REG_ADDRESS_PERMANENT_HN_EN("CR_HOUSE_NO_AND_NAME_EN","eg_death_address_registry","housename_en"),
    REG_ADDRESS_PERMANENT_HN_ML("CR_HOUSE_NO_AND_NAME_ML","eg_death_address_registry","housename_ml"),
    REG_ADDRESS_PERMANENT_LO_EN("CR_LOCALITY_EN","eg_death_address_registry","locality_en"),
    REG_ADDRESS_PERMANENT_LO_ML("CR_LOCALITY_ML","eg_death_address_registry","locality_ml"),
    REG_ADDRESS_PERMANENT_STR_EN("CR_STREET_EN","eg_death_address_registry","streetname_en"),
    REG_ADDRESS_PERMANENT_STR_ML("CR_STREET_ML","eg_death_address_registry","streetname_en");

    private final String uiColoumn;
    private final String regTable;
    private final String regTableColumn;
    UpdateRegisterColumn(String uiColoumn, String regTable, String regTableColumn) {
        this.uiColoumn = uiColoumn;
        this.regTable = regTable;
        this.regTableColumn = regTableColumn;
    }
}