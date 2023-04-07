export const config = {
  routes: {
    "complaint-type": {
      component: "PGRSelectComplaintType",
      texts: {
        headerCaption: "",
        header: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
        cardText: "CS_COMPLAINT_TYPE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
      },
      nextStep: "sub-type",
    },
    "sub-type": {
      component: "PGRSelectSubType",
      texts: {
        header: "CS_ADDCOMPLAINT_COMPLAINT_SUBTYPE_PLACEHOLDER",
        cardText: "CS_COMPLAINT_SUBTYPE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
      },
      nextStep: "map",
    },
    map: {
      component: "PGRSelectGeolocation",
      nextStep: "pincode",
    },
    pincode: {
      component: "PGRSelectPincode",
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "CS_FILE_APPLICATION_PINCODE_LABEL",
        cardText: "CS_ADDCOMPLAINT_CHANGE_PINCODE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE",
      },
      nextStep: "address",
    },
    address: {
      component: "PGRSelectAddress",
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS",
        cardText: "CS_ADDCOMPLAINT_CITY_MOHALLA_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
      },
      nextStep: "upload-photos",
    },
    "upload-photos": {
      component: "PGRSelectImages",
      texts: {
        header: "CS_ADDCOMPLAINT_UPLOAD_PHOTO",
        cardText: "CS_ADDCOMPLAINT_UPLOAD_PHOTO_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE",
      },
      nextStep: "additional-details",
    },
    "additional-details": {
      component: "PGRSelectDetails",
      texts: {
        header: "CS_ADDCOMPLAINT_PROVIDE_ADDITIONAL_DETAILS",
        cardText: "CS_ADDCOMPLAINT_DETAILS_TEXT",
        submitBarLabel: "CS_COMMON_SUBMIT",
      },
      nextStep: null,
    },
  },
  indexRoute: "complaint-type",
};
