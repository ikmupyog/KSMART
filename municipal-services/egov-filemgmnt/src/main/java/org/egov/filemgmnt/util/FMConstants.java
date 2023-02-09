package org.egov.filemgmnt.util;

import org.springframework.stereotype.Component;

@Component
public class FMConstants {

    // Patterns for constraint validations
    public static final String PATTERN_NAME = "^[^\\\\$\\\"<>?\\\\\\\\~`!@#$%^()+={}\\\\[\\\\]*,:;“”‘’]*$";
    public static final String PATTERN_AADHAAR = "^[1-9][0-9]{11}$";
    public static final String PATTERN_MOBILE = "^[1-9][0-9]{9,14}$";
    public static final String PATTERN_TENANT = "^kl\\.[a-z]+$";
    public static final String PATTERN_PINCODE = "^[1-9][0-9]{5}$";

    // Encryption / Decryption
    public static final String FM_APPLICANT_ENC_KEY = "FMDetail";

    // MDMS
    public static final String FILEMANAGEMENT_MODULE = "FileManagement";
    public static final String FILEMANAGEMENT_MODULE_CODE = "FM";
    public static final String TENANTS = "tenants";

    public static final String TENANT_MODULE_NAME = "tenant";
    public static final String TENANT_JSONPATH = "$.MdmsRes.tenant";
    public static final String COMMON_MASTER_JSONPATH = "$.MdmsRes.common-masters";

    // mdms master names
    public static final String COMMON_MASTERS_MODULE = "common-masters";

    // mdms path codes
    public static final String FM_MDMS_JSONPATH = "$.MdmsRes.FileManagement";
    public static final String COMMON_MASTER_JSONPATH_CODE = "$.MdmsRes.common-masters";

    // mdms master names
    public static final String FM_MDMS_FILE_SERVICE_SUBTYPE = "FileServiceSubtype";
    public static final String FM_MDMS_FILE_SERVICE_SUBTYPE_CODE_JSONPATH = "$.MdmsRes.FileManagement.FileServiceSubtype[*].code";

    // error constants
    public static final String FILE_CATEGORY = "FileCategory";
    public static final String FILE_ARISING_MODE = "FileArisingmode";

    // workflow integrator
    public static final String BUSINESS_SERVICE_FM = "NewDFM";
    public static final String TENANTIDKEY = "tenantId";
    public static final String BUSINESSSERVICEKEY = "businessService";
    public static final String ACTIONKEY = "action";
    public static final String COMMENTKEY = "comment";
    public static final String MODULENAMEKEY = "moduleName";
    public static final String BUSINESSIDKEY = "businessId";
    public static final String DOCUMENTSKEY = "documents";
    public static final String ASSIGNEEKEY = "assignes";
    public static final String UUIDKEY = "uuid";
    public static final String FMMODULENAMEVALUE = "FM";
    public static final String WORKFLOWREQUESTARRAYKEY = "ProcessInstances";
    public static final String REQUESTINFOKEY = "RequestInfo";
    public static final String PROCESSINSTANCESJOSNKEY = "$.ProcessInstances";
    public static final String BUSINESSIDJOSNKEY = "$.businessId";
    public static final String STATUSJSONKEY = "$.state.applicationStatus";
    public static final String TRIGGER_NOWORKFLOW = "NOWORKFLOW";

    // PDF
    public static final String ID = "id";
    public static final String TENANT = "tenantId";
    public static final String BUILDINGNO = "buildingNo";
    public static final String FILECODE = "fileCode";
    public static final String WARDNO = "wardNo";
    public static final String FINANCIALYEAR = "financialYear";
    public static final String DURATIONYR = "durationYear";
    public static final String DURATIONMNTH = "durationMonth";
    public static final String OWNERNAME = "ownerName";
    public static final String OWNERADDRESS = "ownerAddress";
    public static final String NAME = "name";
    public static final String ADDRESS = "address";
    public static final String PDFREQUESTARRAYKEY = "ResidentialCertificate";

}
