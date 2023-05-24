package org.ksmart.death.deathapplication.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
     * Creates DeathConstants
     * Rakhi S IKM
     * on 08.02.2023
     */
public class DeathConstants {
    public static final String TENANTS = "tenants";
    public static final String TENANT_MODULE_NAME = "tenant";    

    public static final String GENDERTYPE = "GenderType";
    public static final String COMMON_MASTER_MODULE_NAME = "common-masters";

    public static final String BND_MODULE_NAME = "birth-death-service";
    public static final String HOSPITAL_LIST = "HospitalMaster";
    public static final String DEATH_PLACE = "PlaceMaster";    
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

    //mdms tenantId
    public static final String MDMS_TENANTID = "kl";
    //workflow
    public static final String BUSINESS_SERVICE_BND = "NewDeath";

    public static final String TENANTIDKEY = "tenantId";

    public static final String BUSINESSSERVICEKEY = "businessService";

    public static final String ACTIONKEY = "action";

    public static final String COMMENTKEY = "comment";

    public static final String MODULENAMEKEY = "moduleName";

    public static final String BUSINESSIDKEY = "businessId";

    public static final String DOCUMENTSKEY = "documents";

    public static final String ASSIGNEEKEY = "assignees";

    public static final String UUIDKEY = "uuid";

    public static final String BNDMODULENAMEVALUE = "death-services";

    public static final String WORKFLOWREQUESTARRAYKEY = "ProcessInstances";

    public static final String REQUESTINFOKEY = "RequestInfo";

    public static final String PROCESSINSTANCESJOSNKEY = "$.ProcessInstances";

    public static final String BUSINESSIDJOSNKEY = "$.businessId";

    public static final String STATUSJSONKEY = "$.state.applicationStatus";

    public static final String TRIGGER_NOWORKFLOW = "NOWORKFLOW";

    public static final String DEATH_PLACE_HOSPITAL = "HOSPITAL";

    public static final String DEATH_PLACE_INSTITUTION = "INSTITUTION";

    public static final String DEATH_PLACE_HOME = "HOME";

    public static final String DEATH_PLACE_VEHICLE = "VEHICLE";

    public static final String DEATH_PLACE_OTHER = "OTHER";

    public static final Integer VALUE_TRUE = 1;

    public static final Integer VALUE_FALSE = 0;

    public static final String VALUE_NULL = "NULL";

    public static final String ADDRESS_INSIDE_LB = "ILB";

    public static final String ADDRESS_INSIDE_KERALA = "IK";

    public static final String ADDRESS_INSIDE_INDIA = "IIN";

    public static final String ADDRESS_OUTSIDE_INDIA = "OIN";

    public static final String WORKFLOW_STATUS_APPROVED = "APPROVED";

    public static final String APPLICATION_NEW = "new";
    
    public static final String APPLICATION_CORRECTION = "corr";

    public static final String LB_TYPE_CORPORATION = "LB_TYPE_CORPORATION";

    public static final String LB_TYPE_MUNICIPALITY = "LB_TYPE_MUNICIPALITY";

    public static final String LB_TYPE_CORPORATION_CAPTION = "C";

    public static final String LB_TYPE_MUNICIPALITY_CAPTION = "M";

    public static final String STATE_CODE= "KL";
    //ACKNumber
    public static final String ACK_NUMBER_FIRST = "1";

    public static final String ACK_NUMBER_CAPTION = "AK";

    public static final String DEATH_PLACE_LIST = "PlaceMasterDeath";
    //Rakhi S on 14.02.2023
    public static final String DISTRICT = "District";

    public static final String STATE = "State";

    public static final String COUNTRY = "Country";

    public static final String RELIGION = "Religion";

    public static final String DEATH_PLACE_PUBLICPLACES = "PUBLIC_PLACES";

    public static final String DEATH_PLACE_OUTSIDE_JURISDICATION = "OUTSIDE_JURISDICTION";

    public static final String REG_UNIT_CAPTION = "RG";

    public static final String FUN_MODULE_NEWAPPLN = "CRDRNR";
    public static final String FUN_MODULE_NAC = "CRDRNA";
    public static final String FUN_MODULE_ABANDONED = "CRDRAB";

    // public static final String FUN_MODULE_CORRECTION = "BFIFLN";

    // public static final String DEATH_REGNO_UID= "CRDRNR";
    public static final String COUNTRY_CODE = "COUNTRY_INDIA";
    public static final String STATE_CODE_SMALL = "kl";

    //Rakhi S on 02.03.2023
    public static final String TENANT_EGOV_LOCATION= "egov-location";
    public static final String EGOV_LOCATION_JSONPATH = "$.MdmsRes.egov-location";

    public static final String HOSPITAL_DATA="hospitalList";

    //Rakhi S  on 21.03.2023
    public static final String STATUS_FOR_PAYMENT = "PENDINGPAYMENT";
    
    //Rakhi S  on 02.04.2023
    public static final String INSTITUTION_NAME = "institutionList";
    //Rakhi S  on 04.04.2023
    public static final String APPLICATION_TYPE = "nac";

    public static final String CR_MDMS_DEATH_NEW_WF_JSONPATH = "$.MdmsRes.birth-death-service.WorkFlowDeath";
    public static final String CR_MDMS_WORKFLOW_NEW = "WorkFlowDeath";



    public static final String NOT_APPLICABLE = "NOT_APPLICABLE";
    public static final String TALUK = "Taluk";
    public static final String POSTOFFICE = "PostOffice";
    public static final String VILLAGE = "Village";
    public static final String COMMON_MASTERS_MODULE = "common-masters";
    public static final String PO_EN = "P O";
    
    public static final String CR_MDMS_COUNTRY_CODE_JSONPATH = "$.MdmsRes.common-masters.Country[*].code";
    public static final String CR_MDMS_COUNTRY_CODES_JSONPATH = "$.MdmsRes.common-masters.Country";

    public static final String CR_MDMS_STATE_CODE_JSONPATH = "$.MdmsRes.common-masters.State[*].code";
    public static final String CR_MDMS_STATE_JSONPATH = "$.MdmsRes.common-masters.State";

    public static final String CR_MDMS_DISTRICT_CODE_JSONPATH = "$.MdmsRes.common-masters.District[*].code";
    public static final String CR_MDMS_DISTRICT_JSONPATH = "$.MdmsRes.common-masters.District";

    public static final String CR_MDMS_TALUK_CODE_JSONPATH = "$.MdmsRes.common-masters.Taluk[*].code";
    public static final String CR_MDMS_TALUK_JSONPATH = "$.MdmsRes.common-masters.Taluk";

    public static final String CR_MDMS_VILLAGE_CODE_JSONPATH = "$.MdmsRes.common-masters.Village[*].code";
    public static final String CR_MDMS_VILLAGE_JSONPATH = "$.MdmsRes.common-masters.Village";

    public static final String CR_MDMS_POSTOFFICE_CODE_JSONPATH = "$.MdmsRes.common-masters.PostOffice[*].code";
    public static final String CR_MDMS_POSTOFFICE_JSONPATH = "$.MdmsRes.common-masters.PostOffice";

    public static final String CR_MDMS_DEATH_CAUSE_MAIN_CODE_JSONPATH = "$.MdmsRes.birth-death-service.DeathCause[*].code";
    public static final String CR_MDMS_DEATH_CAUSE_MAIN_JSONPATH = "$.MdmsRes.birth-death-service.DeathCause";

    public static final String CR_MDMS_DEATH_CAUSE_SUB_CODE_JSONPATH = "$.MdmsRes.birth-death-service.DeathCauseSub[*].code";
    public static final String CR_MDMS_DEATH_CAUSE_SUB_JSONPATH = "$.MdmsRes.birth-death-service.DeathCauseSub";

    public static final String CR_MDMS_DEATH_MED_ATTENTION_CODE_JSONPATH = "$.MdmsRes.birth-death-service.MedicalAttentionType[*].code";
    public static final String CR_MDMS_DEATH_MED_ATTENTION_JSONPATH = "$.MdmsRes.birth-death-service.MedicalAttentionType";

    public static final String CR_MDMS_DEATH_MANNER_OF_DEATH_CODE_JSONPATH = "$.MdmsRes.birth-death-service.MannerOfDeath[*].code";
    public static final String CR_MDMS_DEATH_MANNER_OF_DEATH_JSONPATH = "$.MdmsRes.birth-death-service.MannerOfDeath";
    public static final String MANNER_OF_DEATH = "MannerOfDeath";
    
    public static final String CR_MDMS_RELIGION_CODE_JSONPATH = "$.MdmsRes.common-masters.Religion[*].code";
    public static final String CR_MDMS_RELIGION_CODES_JSONPATH = "$.MdmsRes.common-masters.Religion";
    
    public static final String OCCUPATION = "Occupation";
    public static final String CR_MDMS_OCCUPATION_CODE_JSONPATH = "$.MdmsRes.common-masters.Occupation[*].code";
    public static final String CR_MDMS_OCCUPATION_CODES_JSONPATH = "$.MdmsRes.common-masters.Occupation";

    public static final String CR_MDMS_BOUNDARY_CODE_JSONPATH = "$.MdmsRes.egov-location.TenantBoundary[*].boundary.children[*].children[*].code";
    public static final String CR_MDMS_BOUNDARY_CODES_JSONPATH = "$.MdmsRes.egov-location.TenantBoundary[*].boundary.children[*].children[*]";

    public static final String LOCATION_MDMS_HOSPITAL = "hospitalList";
    public static final String LOCATION_MDMS_BOUNDARY = "TenantBoundary";

    public static final String CR_MDMS_DEATH_AGE_UNIT_CODE_JSONPATH = "$.MdmsRes.birth-death-service.AgeUnit[*].code";
    public static final String CR_MDMS_DEATH_AGE_UNIT_JSONPATH = "$.MdmsRes.birth-death-service.AgeUnit";

    public static final String CR_MDMS_DEATH_OTHER_PLACE_CODE_JSONPATH = "$.MdmsRes.birth-death-service.OtherDeathPlace[*].code";
    public static final String CR_MDMS_DEATH_OTHER_PLACE_JSONPATH = "$.MdmsRes.birth-death-service.OtherDeathPlace";
    public static final String BND_MDMS_PUBLIC_PLACES = "OtherDeathPlace";

    public static final String CR_MDMS_DEATH_TENANT_CODE_JSONPATH = "$.MdmsRes.tenant.tenants.city[*].code";
    public static final String CR_MDMS_DEATH_TENANT_JSONPATH = "$.MdmsRes.tenant.tenants.city";

    public static final String CR_MDMS_HOSPITALS_CODE_JSONPATH = "$.MdmsRes.egov-location.hospitalList[*].code";
    public static final String CR_MDMS_HOSPITALS_CODES_JSONPATH = "$.MdmsRes.egov-location.hospitalList";

    public static final String CR_MDMS_INSTITUTIONS_CODES_JSONPATH = "$.MdmsRes.egov-location.institutionList";
    public static final String CR_MDMS_INSTITUTIONS_CODE_JSONPATH = "$.MdmsRes.egov-location.institutionList[*].code";

    public static final String CR_MDMS_INST_TYPE_CODE_JSONPATH = "$.MdmsRes.birth-death-service.InstitutionTypePlaceOfEvent[*].code";
    public static final String CR_MDMS_INST_TYPE_JSONPATH = "$.MdmsRes.birth-death-service.InstitutionTypePlaceOfEvent";

    public static final String BND_MDMS_VEHICLES = "VehicleType";
    public static final String CR_MDMS_DEATH_VEHICLES_CODE_JSONPATH = "$.MdmsRes.birth-death-service.VehicleType[*].code";
    public static final String CR_MDMS_DEATH_VEHICLES_JSONPATH = "$.MdmsRes.birth-death-service.VehicleType";

    // ACTION_STATUS combinations for notification

    public static final String ACTION_STATUS_INITIATED = "INITIATE_INITIATED";
    
    public static final String ACTION_STATUS_PAYMENT = "INITIATE_PENDINGPAYMENT";

    public static final String ACTION_STATUS_APPLIED = "APPLY_APPLIED";
    
    public static final String ACTION_STATUS_APPROVED = "APPROVE_APPROVED";
    
    public static final String ACTION_STATUS_REJECTED = "REJECT_REJECTED";
    
    public static final String ACTION_STATUS_FIELDINSPECTION = "FORWARD_FIELDINSPECTION";
    
    public static final String ACTION_STATUS_PENDINGAPPROVAL = "FORWARD_PENDINGAPPROVAL";
    
    public static final String ACTION_SENDBACKTOCITIZEN_FIELDINSPECTION = "SENDBACKTOCITIZEN_CITIZENACTIONREQUIRED";
    
    public static final String ACTION_FORWARD_CITIZENACTIONREQUIRED = "FORWARDTOEMPLOYEE_FIELDINSPECTION";
    
    public static final String ACTION_CANCEL_CANCELLED = "CANCEL_CANCELLED";
    
    public static final String ACTION_STATUS_EXPIRED = "EXPIRE_EXPIRED";
    
    public static final String ACTION_STATUS_MANUAL_EXPIRED = "MANUALEXPIRE_MANUALEXPIRED";

    public static final String NOTIFICATION_LOCALE = "en_IN";

    public static final String NOTIFICATION_INITIATED_TEST = "cr.en.counter.approved";
    public static final List<String> NOTIFICATION_CODES = Collections.unmodifiableList(Arrays.asList(
    		NOTIFICATION_INITIATED_TEST
           ));
    public static final String MODULE = "rainmaker-cr";      

}
