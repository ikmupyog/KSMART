// import SelectAddress from "../../../pageComponents/Steps/SelectAddress";
// import SelectComplaintType from "../../../pageComponents/Steps/SelectComplaintType";
// import SelectDetails from "../../../pageComponents/Steps/SelectDetails";
// import SelectImages from "../../../pageComponents/Steps/SelectImages";
// import SelectLandmark from "../../../pageComponents/Steps/SelectLandmark";
// import SelectPincode from "../../../pageComponents/Steps/SelectPincode";
// import SelectSubType from "../../../pageComponents/Steps/SelectSubType";
// import SelectGeolocation from "../../../pageComponents/Steps/SelectGeolocation";

export const config = {
  routes: {
    "complaint-type": {
      component: "SelectComplaintType",
      texts: {
        headerCaption: "",
        header: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
        cardText: "CS_COMPLAINT_TYPE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
      },
      nextStep: "sub-type",
    },
    "sub-type": {
      component: "SelectSubType",
      texts: {
        header: "CS_ADDCOMPLAINT_COMPLAINT_SUBTYPE_PLACEHOLDER",
        cardText: "CS_COMPLAINT_SUBTYPE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
      },
      nextStep: "address",
    },
    address: {
      component: "SelectLandmark",
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS",
        header: "CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS",
        cardText: "CS_ADDCOMPLAINT_CITY_MOHALLA_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
      },
      nextStep: "upload-photos",
    },

    "upload-photos": {
      component: "SelectImages",
      texts: {
        header: "CS_ADDCOMPLAINT_UPLOAD_PHOTO",
        cardText: "CS_ADDCOMPLAINT_UPLOAD_PHOTO_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE",
      },
      nextStep: "informer-details",
    },
    "informer-details": {
      component: "Informer",
      texts: {
        header: "CS_ADDCOMPLAINT_INFORMER",
        cardText: "CS_ADDCOMPLAINT_INFORMER_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
      },
      nextStep: "additional-details",
    },
    "additional-details": {
      component: "SelectDetails",
      texts: {
        header: "CS_ADDCOMPLAINT_PROVIDE_ADDITIONAL_DETAILS",
        cardText: "CS_ADDCOMPLAINT_DETAILS_TEXT",
        submitBarLabel: "CS_COMMON_SUBMIT",
      },
      inputs: [
        {
          label: "CS_ADDCOMPLAINT_DETAILS",
          type: "textarea",
          name: "details",
        },
      ],
      nextStep: null,
    },
  },
  indexRoute: "complaint-type",
};
