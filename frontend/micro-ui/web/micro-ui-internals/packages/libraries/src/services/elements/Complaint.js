export const Complaint = {
  create: async ({
    cityCode,
    complaintType,
    description,
    landmark,
    city,
    district,
    region,
    state,
    pincode,
    localityCode,
    localityName,
    uploadedImages,
    mobileNumber,
    name,
    deptCode,
    address,
    assignes
  }) => {

    const tenantId = Digit.ULBService.getCurrentTenantId();
    const citizenCityId = Digit.ULBService.getCitizenCurrentTenant(true);
    const userType = Digit.SessionStorage.get("user_type")
    const { info } = Digit.SessionStorage.get("User")

    const roleCode = info.roles[0]
    info.rolecode = roleCode?.code

    const defaultData = {
      service: {
        deptCode: deptCode,
        tenantId: userType === "employee" ? tenantId : citizenCityId,
        serviceCode: complaintType,
        description: description,
        additionalDetail: {},
        source: Digit.Utils.browser.isWebview() ? "mobile" : "web",
        address: {
          tenantId: cityCode,
          landmark: landmark,
          city: city,
          district: district,
          region: region,
          state: state,
          pincode: pincode,
          locality: {
            code: localityCode,
            name: localityName,
          },
          geoLocation: {},
        },
        employee: info
      },
      workflow: {
        action: "APPLY",
        verificationDocuments: uploadedImages,
        assignes: assignes
      },
    };

    if (userType === "employee") {
      defaultData.service.informer = {
        name: name,
        type: "CITIZEN",
        mobileNumber: mobileNumber,
        address: address,
        roles: [
          {
            id: null,
            name: "Citizen",
            code: "CITIZEN",
            tenantId: tenantId,
          },
        ],
        tenantId: tenantId,
      };
    }
    const response = await Digit.PGRService.create(defaultData, tenantId);
    return response;
  },

  assign: async (complaintDetails, action, employeeData, comments, uploadedDocument, tenantId) => {
    complaintDetails.workflow.action = action;
    complaintDetails.workflow.assignes = employeeData ? [employeeData.uuid] : null;
    complaintDetails.workflow.comments = comments;
    uploadedDocument
      ? (complaintDetails.workflow.verificationDocuments = [
        {
          documentType: "PHOTO",
          fileStoreId: uploadedDocument,
          documentUid: "",
          additionalDetails: {},
        },
      ])
      : null;

    if (!uploadedDocument) complaintDetails.workflow.verificationDocuments = [];

    //TODO: get tenant id
    const response = await Digit.PGRService.update(complaintDetails, tenantId);
    return response;
  },
};
