package org.ksmart.marriage.utils;

public class MarriageConstants {
    public static final String TENANTS = "tenants";
    public static final String TENANT_MODULE_NAME = "tenant";    

    public static final String GENDERTYPE = "GenderType";
    public static final String COMMON_MASTER_MODULE_NAME = "common-masters";
    public static final String CR_MDMS_MARRIAGETYPE_CODE_JSONPATH = "$.MdmsRes.birth-death-service.MarriagePlaceType[*].code";
    public static final String CR_MDMS_MARRIAGE_TYPE_JSONPATH = "$.MdmsRes.birth-death-service.MarriagePlaceType";

    public static final String CR_MDMS_PLACETYPE_CODE_JSONPATH = "$.MdmsRes.birth-death-service.TypeOfMarriage[*].code";
    public static final String CR_MDMS_PLACE_TYPE_JSONPATH = "$.MdmsRes.birth-death-service.TypeOfMarriage";

    //mdms path codes
     public static final String COMMON_MASTER_JSONPATH = "$.MdmsRes.common-masters";
     public static final String TENANT_JSONPATH = "$.MdmsRes.tenant";
     public static final String BND_LIST_JSONPATH = "$.MdmsRes.birth-death-service";
   //error constants
    public static final String INVALID_TENANT_ID_MDMS_KEY = "INVALID TENANTID";
    public static final String INVALID_TENANT_ID_MDMS_MSG = "No data found for this tenantID";
    //mdms tenantId

    public static final String CR_MDMS_TENANTS_CODE_JSONPATH = "$.MdmsRes.tenant.tenants[*].code";

    public static final String CR_MDMS_TENANTS_JSONPATH = "$.MdmsRes.tenant.tenants";

    public static final String APP_NUMBER_CAPTION = "AK";

    public static final String FUN_MODULE_NEW = "CRMR";

    public static final String STATE_CODE = "KL";

    public static final String COUNTRY_CODE = "COUNTRY_INDIA";

    public static final String STATE_CODE_SMALL = "kl";

    //Jasmine 29.03.2023
       //mdms tenantId
       public static final String MDMS_TENANTID = "kl";
       //workflow
       public static final String BUSINESS_SERVICE_BND = "NewMarriage";
   
       public static final String TENANTIDKEY = "tenantId";
   
       public static final String BUSINESSSERVICEKEY = "businessService";
   
       public static final String ACTIONKEY = "action";
   
       public static final String COMMENTKEY = "comment";
   
       public static final String MODULENAMEKEY = "moduleName";
   
       public static final String BUSINESSIDKEY = "businessId";
   
       public static final String DOCUMENTSKEY = "documents";
   
       public static final String ASSIGNEEKEY = "assignees";
   
       public static final String UUIDKEY = "uuid";
   
       public static final String BNDMODULENAMEVALUE = "CR";
   
       public static final String WORKFLOWREQUESTARRAYKEY = "ProcessInstances";
   
       public static final String REQUESTINFOKEY = "RequestInfo";
   
       public static final String PROCESSINSTANCESJOSNKEY = "$.ProcessInstances";
   
       public static final String BUSINESSIDJOSNKEY = "$.businessId";
   
       public static final String STATUSJSONKEY = "$.state.applicationStatus";
   
       public static final String TRIGGER_NOWORKFLOW = "NOWORKFLOW";
       
       public static final String RESIDENTSHIP_INDIAN= "INDIAN";

       public static final String RESIDENTSHIP_NRI = "NRI";

       public static final String RESIDENTSHIP_FOREIGN= "FOREIGN";

       public static final String MARITAL_STATUS_UNMARRIED= "UNMARRIED";

       public static final String MARITAL_STATUS_MARRIED= "MARRIED";

       public static final String MARITAL_STATUS_WIDOWED= "WIDOWED";

       public static final String MARITAL_STATUS_DIVORCED= "DIVORCED";

       public static final String MARITAL_STATUS_ANNULLED= "ANNULLED";

       public static final Integer VALUE_TRUE = 1;

       public static final Integer VALUE_FALSE = 0;

       public static final String PLACE_TYPE_RELIGIOUS_INSTITUTION = "RELIGIOUS_INSTITUTION";


       public static final String PLACE_TYPE_MANDAPAM_OTHER ="MANDAPAM_HALL_AND_OTHER";


       public static final String PLACE_TYPE_REGISTRAR_OFFICE = "SUB_REGISTRAR_OFFICE";


       public static final String PLACE_TYPE_HOUSE = "HOUSE";


       public static final String PLACE_TYPE_PRIVATE_PLACE = "PRIVATE_PLACE";


       public static final String PLACE_TYPE_PUBLIC_PLACE = "PUBLIC_PLACE";

        public static final String ADDRESS_INDIA = "COUNTRY_INDIA";

        public static final String ADDRESS_KERALA = "kl";
/*AFTER UPDATING MDMS HAVE TO BE CHANGE */
       public static final String PLACE_OTHER = "OTHER";
    //    public static final String RESIDENTSHIP_FOREIGN= "FOREIGN";


       public static final String STATUS_FOR_PAYMENT = "PENDINGPAYMENT";
//MDMS Fields  Common
       public static final String DISTRICT = "District";

       public static final String STATE = "State";
   
       public static final String COUNTRY = "Country";
   
       public static final String RELIGION = "Religion";

       public static final String TALUK = "Taluk";

       public static final String LBTYPE = "LBType";
 
       public static final String VILLAGE = "Village";

       public static final String POSTOFFICE = "PostOffice";

       public static final String WARD="TenantBoundary";

       public static final String PARENT="PARENT";

       public static final String GUARDIAN="GUARDIAN";

       public static final String BND_MODULE_NAME = "birth-death-service";

       public static final String MARRIAGE_PLACE_TYPE = "MarriagePlaceType";

       public static final String MARRIAGE_PLACE = "MarriagePlace";

       public static final String MARITAL_STATUS = "MaritalStatus";

       public static final String MARRIAGE_TYPE = "TypeOfMarriage";

       public static final String WORKFLOW_STATUS_APPROVED = "APPROVED";
       
       public static final String APPLICATION_NEW = "new";

       public static final String APPLICATION_CORRECTION = "corr";

       public static final String CR_MDMS_MARRIAGE_NEW_WF_JSONPATH = "$.MdmsRes.birth-death-service.WorkFlowMarriage";

       public static final String CR_MDMS_WORKFLOW_NEW = "WorkFlowMarriage";

    public static final String TENANT_EGOV_LOCATION= "egov-location";
    public static final String EGOV_LOCATION_JSONPATH = "$.MdmsRes.egov-location";
    public static final String MARRIAGE_PLACE_JSONPATH = "$.MdmsRes.egov-location.MarriagePlace[0]";

    public static final String MARRIAGE_PLACE_NAME = "name";
    public static final String MARRIAGE_PLACE_ADDRESS = "address";
    public static final String MARRIAGE_PLACE_MAIN_PLACE = "mainPlace";

    public static final String MARRIAGE_PLACE_DIST_ID = "distId";
    public static final String MARRIAGE_PLACE_STATE_ID = "stateid";
    public static final String MARRIAGE_PLACE_TENENT_CODE = "tenentCode";
    public static final String BILLING_SERVICE = "BillingService";
}
