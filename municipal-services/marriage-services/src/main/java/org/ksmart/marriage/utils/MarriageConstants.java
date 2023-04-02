package org.ksmart.marriage.utils;

public class MarriageConstants {
    public static final String TENANTS = "tenants";
    public static final String TENANT_MODULE_NAME = "tenant";    

    public static final String GENDERTYPE = "GenderType";
    public static final String COMMON_MASTER_MODULE_NAME = "common-masters";
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
   
       public static final String BNDMODULENAMEVALUE = "marriage-services";
   
       public static final String WORKFLOWREQUESTARRAYKEY = "ProcessInstances";
   
       public static final String REQUESTINFOKEY = "RequestInfo";
   
       public static final String PROCESSINSTANCESJOSNKEY = "$.ProcessInstances";
   
       public static final String BUSINESSIDJOSNKEY = "$.businessId";
   
       public static final String STATUSJSONKEY = "$.state.applicationStatus";
   
       public static final String TRIGGER_NOWORKFLOW = "NOWORKFLOW";

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

       public static final String BND_MODULE_NAME = "birth-death-service";

       public static final String MARRIAGE_PLACE_TYPE = "MarriagePlaceType";

       public static final String MARRIAGE_PLACE = "MarriagePlace";

       public static final String MARITAL_STATUS = "MaritalStatus";

       public static final String MARRIAGE_TYPE = "TypeOfMarriage";

       public static final String WORKFLOW_STATUS_APPROVED = "APPROVED";
       
       public static final String APPLICATION_NEW = "new";


}
