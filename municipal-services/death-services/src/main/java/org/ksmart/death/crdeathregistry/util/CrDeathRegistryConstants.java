package org.ksmart.death.crdeathregistry.util;
/**
     * Creates CrDeathService
     * Rakhi S IKM
     * 
     */
public class CrDeathRegistryConstants {
    

    public static final String TENANTS = "tenants";
    public static final String TENANT_MODULE_NAME = "tenant";    

    public static final String GENDERTYPE = "GenderType";
    public static final String GENDER_MODULE_NAME = "common-masters";

    public static final String BND_MODULE_NAME = "birth-death-service";
    //Modified  by Rakhi S on 20.12.2022
    public static final String HOSPITAL_LIST = "HospitalMaster";
    public static final String DEATH_PLACE = "DeathPlaceType";    
    //Rakhi S on 07.12.2022
    public static final String DEATH_CAUSE_MAIN = "DeathCause";
    public static final String DEATH_CAUSE_SUB = "DeathCauseSub";
    public static final String MALE_DEPENDENT_TYPE = "MaleDependentType";
    public static final String FEMALE_DEPENDENT_TYPE = "FemaleDependentType";   
    public static final String AGE_UNIT = "AgeUnit"; 
    public static final String MEDICAL_ATTENTION_TYPE = "MedicalAttentionType"; 
    public static final String PROFESSION = "Profession";

    //mdms path codes
    public static final String COMMON_MASTER_JSONPATH = "$.MdmsRes.common-masters";
    public static final String TENANT_JSONPATH = "$.MdmsRes.tenant";
    public static final String BND_LIST_JSONPATH = "$.MdmsRes.birth-death-service";

    //error constants
    public static final String INVALID_TENANT_ID_MDMS_KEY = "INVALID TENANTID";
    public static final String INVALID_TENANT_ID_MDMS_MSG = "No data found for this tenantID";

    //RegistrationNumber
    public static final String REGISTRATION_NUMBER_FIRST = "1";

    //Rakhi  S on 09.01.2023
    public static final String DISTRICT = "District";
    public static final String COMMON_MASTERS_MODULE = "common-masters";

     //Rakhi  S on 11.01.2023
     public static final String STATE = "State";
     public static final String COUNTRY = "Country";

     //Rakhi S on 13.01.2023
     public static final String  DEATH_PLACE_HOME = "HOME";
     public static final String  DEATH_PLACE_HOSPITAL = "HOSPITAL";
     public static final String  DEATH_PLACE_INSTITUTION = "INSTITUTION";
     public static final String  DEATH_PLACE_VEHICLE = "VEHICLE";
     public static final String  DEATH_PLACE_OTHER_PLACES = "OTHER_PLACES";

     public static final String MALE_DEPENDENT_FATHER ="MALE_DEPENDENT_FATHER";
     public static final String MALE_DEPENDENT_HUSBAND ="MALE_DEPENDENT_HUSBAND";
     public static final String MALE_DEPENDENT_FATHER_ML = " (പിതാവ്) ";
     public static final String MALE_DEPENDENT_FATHER_EN = " (Father) ";
     public static final String MALE_DEPENDENT_HUSBAND_ML = " (ഭർത്താവ്) ";
     public static final String MALE_DEPENDENT_HUSBAND_EN  = " (Husband) ";
     public static final String FEMALE_DEPENDENT_ML = " (മാതാവ്)";
     public static final String FEMALE_DEPENDENT_EN = " (Mother)";  

     public static final String INSTITUTION_TYPE = "InstitutionType";
     public static final String INSTITUTION_NAME = "Institution";
     public static final String VEHICLE_TYPE = "VehicleType";
     public static final String OTHER_PLACE_TYPE = "OtherDeathPlace";
     public static final String VEHICLE_DEATH_CAPTION1 = "വാഹനത്തിൽ  യാത്രചെയ്യവേ ";
     public static final String VEHICLE_DEATH_CAPTION2 ="-ത്തിനും ";
     public static final String VEHICLE_DEATH_CAPTION3 =" മദ്ധ്യേ ";
     public static final String VEHICLE_DEATH_CAPTION4 ="പരിധിയിൽ.";
     public static final String VEHICLE_DEATH_CAPTION5 ="In the vehicle on the way from ";
     public static final String VEHICLE_DEATH_CAPTION6 =" in the jurisdiction of ";
     public static final String VEHICLE_DEATH_CAPTION7 =" to ";

     //Rakhi S on 18.01.2023
     public static final String GENDER_MALE ="MALE";
     public static final String GENDER_FEMALE ="FEMALE";
     public static final String TRANSGENDER ="TRANSGENDER";
     public static final String GENDER_MALE_CAPTION ="ആൺ/Male";
     public static final String GENDER_FEMALE_CAPTION ="പെൺ/Female";
     public static final String TRANSGENDER_CAPTION ="Transgender";

     //RAkhi S on 21.01.2023
     public static final String HUSBAND ="HUSBAND";
     public static final String WIFE ="WIFE";
     public static final String WIFE_ML = " (ഭാര്യ) ";
     public static final String WIFE_EN  = " (Wife) ";

}
