export const newConfig = [
  {
    head: "",
    body: [
      {
        type: "component",
        component: "TLInfoLabel",
        key: "tradedetils1",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_COMMON_TR_DETAILS",
    body: [
      {
        type: "component",
        component: "TLTradeDetailsEmployee",
        key: "tradedetils",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_TRADE_UNITS_HEADER",
    body: [
      {
        type: "component",
        component: "TLTradeUnitsEmployee",
        key: "tradeUnits",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_NEW_TRADE_DETAILS_HEADER_ACC",
    body: [
      {
        type: "component",
        component: "TLAccessoriesEmployee",
        key: "accessories",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_NEW_APPLICATION_PROPERTY",
    body: [
      {
        component: "CPTPropertySearchNSummary",
        withoutLabel: true,
        key: "cpt",
        type: "component",
        hideInCitizen: true
      },
    ],
  },
  {
    "head": "ES_NEW_APPLICATION_LOCATION_DETAILS",
    "body": [
      {
        "route": "map",
        component: "TLSelectGeolocation",
        nextStep: "tladdress",
        hideInEmployee: true,
        key: "address",
        withoutLabel: true,
        texts: {
          header: "TL_GEOLOACTION_HEADER",
          cardText: "TL_GEOLOCATION_TEXT",
          nextText: "CS_COMMON_NEXT",
          skipAndContinueText: "CORE_COMMON_SKIP_CONTINUE"
        }
      },
      {
        route: "pincode",
        component: "TLSelectPincode",
        texts: {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_PINCODE_HEADER",
          "cardText": "TL_PINCODE_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT",
          "skipText": "CORE_COMMON_SKIP_CONTINUE"
        },
        withoutLabel: true,
        key: "address",
        nextStep: "address",
        type: "component"
      },
      {
        "route": "tladdress",
        "component": "SelectTradeAddress",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_ADDRESS_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "key": "address",
        "nextStep": "street",
        "isMandatory": true,
        "type": "component"
      },
      {
        "route": "address",
        "component": "TLSelectAddress",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_ADDRESS_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "key": "address",
        "nextStep": "street",
        "isMandatory": true,
        "type": "component"
      },
      {
        "type": "component",
        "route": "street",
        "component": "SelectStreet",
        "key": "address",
        "withoutLabel": true,
        "hideInEmployee": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_STREET_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "inputs": [
          {
            "label": "TL_LOCALIZATION_STREET_NAME",
            "type": "text",
            "name": "street",
            "disable": "window.location.href.includes(`edit-application`)||window.location.href.includes(`renew-trade`)",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_STREET_INVALID"
            // }
          },
          {
            "label": "TL_LOCALIZATION_BUILDING_NO",
            "type": "text",
            "name": "doorNo",
            "disable": "window.location.href.includes(`edit-application`)||window.location.href.includes(`renew-trade`)",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_DOOR_INVALID"
            // }
          }
        ],
        "nextStep": "landmark"
      },
      {
        "type": "component",
        "component": "SelectStreet",
        "key": "address",
        "withoutLabel": true,
        "hideInCitizen": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_STREET_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "inputs": [
          {
            "label": "TL_LOCALIZATION_BUILDING_NO",
            "type": "text",
            "name": "doorNo",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_DOOR_INVALID"
            // }
          },
          {
            "label": "TL_LOCALIZATION_STREET_NAME",
            "type": "text",
            "name": "street",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_STREET_INVALID"
            // }
          }
        ]
      },
      {
        "type": "component",
        "route": "landmark",
        "component": "SelectLandmark",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
          "cardText": "TL_LANDMARK_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT",
          "skipText": "CORE_COMMON_SKIP_CONTINUE"
        },
        "key": "address",
        "nextStep": "owner-ship-details",
        "hideInEmployee": true
      },
      {
        "type": "component",
        "route": "proof",
        "component": "Proof",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_OWNERS_DETAILS",
          "header": "TL_OWNERS_PHOTOGRAPH_HEADER",
          "cardText": "",
          "nextText": "CS_COMMON_NEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "key": "owners",
        "nextStep": null,
        "hideInEmployee": true
      }
    ]
  },
  {
    head: "Birth Routing",
    body: [
      {
        type: "component",
        route: "child-details",
        isMandatory: true,
        component: "ChildDetails",
        texts: {
          headerCaption: "",
          header: "Child Information",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "ChildDetails",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "birth-place",
      },
      {
        route: "birth-place",
        component: "BirthPlace",
        texts: {
          headerCaption: "",
          header: "CR_BIRTH_PLACE",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BirthPlace",
        nextStep: "hospital-details",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "hospital-details",
        component: "HospitalDetails",
        texts: {
          headerCaption: "",
          header: "Hospital Details",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "HospitalDetails",
        nextStep: "birthaddress",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "birthaddress",
        component: "Address",
        texts: {
          headerCaption: "",
          header: "Address",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "AddressDetails",
        nextStep: "father-informations",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "father-informations",
        component: "FatherInformation",
        texts: {
          headerCaption: "",
          header: "Father's Information",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "FatherInfoDetails",
        type: "component",
        nextStep: "mother-informations",
        hideInEmployee: false,
      },
      {
        route: "mother-informations",
        component: "MotherInformation",
        texts: {
          headerCaption: "",
          header: "CR_MOTHER_INFORMATION",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "MotherInfoDetails",
        type: "component",
        nextStep: "statistical-information",
        hideInEmployee: false,
      },
      {
        route: "statistical-information",
        component: "StatisticalInformation",
        texts: {
          headerCaption: "",
          header: "CR_STATISTICAL_INFORMATION",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "StatisticalInfoDetails",
        nextStep: null,
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "place-of-birth",
        component: "PlaceofBirth",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "BirthPlace",
        nextStep: "structure-type",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "mother-details",
        component: "MotherInformation",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "TradeDetails",
        nextStep: "father-details",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "father-details",
        component: "FatherDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "TradeDetails",
        nextStep: "TradeLicense",
        type: "component",
        hideInEmployee: false,
      },
      {
        route: "institution-details",
        component: "InstitutionDetails",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "TradeDetails",
        nextStep: "structure-type",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "public-place",
        component: "PublicPlace",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "TradeDetails",
        nextStep: "structure-type",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "birth-vehicle",
        component: "BirthVehicle",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "TradeDetails",
        nextStep: "structure-type",
        type: "component",
        hideInEmployee: true,
      },

      {
        route: "address-outside-india",
        component: "AddressOutsideIndia",
        texts: {
          headerCaption: "",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "TradeDetails",
        nextStep: "structure-type",
        type: "component",
        hideInEmployee: true,
      },
    ],
  },


  {
    head: "Adoption Routing",
    body: [
      {
        type: "component",
        route: "search-registry",
        isMandatory: true,
        component: "SearchRegistry",
        texts: {
          // headerCaption: "TL_STRUCTURE_TYPE",
          header: "Name Inclusion",
          // cardText: "TL_STRUCTURE_TYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "SearchRegistry",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "address-of-decesed",
      },

    ],
  },

  {
    head: "Death Routing",
    body: [
      {
        type: "component",
        route: "information-death",
        isMandatory: true,
        component: "InformationDeath",
        texts: {
          headerCaption: "",
          header: "CR_LEGAL_INFORMATION",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "InformationDeath",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "address-of-decesed",
      },
      {
        route: "address-of-decesed",
        component: "AddressOfDecesed",
        texts: {
          headerCaption: "",
          header: "CR_ADDRESS_DECESED",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        key: "AddressOfDecesed",
        withoutLabel: true,
        hideInEmployee: false,
        nextStep: "family-information",
      },
      {
        route: "family-information",
        component: "FamilyInformationDeath",
        texts: {
          headerCaption: "",
          header: "CR_FAMILY_INFO",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "FamilyInformationDeath",
        nextStep: "place-of-death",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "place-of-death",
        component: "PlaceOfDeath",
        texts: {
          headerCaption: "",
          header: "CR_PLACE_OF_DEATH",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeath",
        nextStep: "place-death-home",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "place-death-home",
        component: "PlaceOfDeathHome",
        texts: {
          headerCaption: "",
          header: "CR_PLACE_OF_DEATH_HOME",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathHome",
        nextStep: "Informant-Details",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "hospital-details-death",
        component: "PlaceOfDeathHospital",
        texts: {
          headerCaption: "",
          header: "CR_PLACE_OF_DEATH_HOSPITAL",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathHospital",
        nextStep: "institution-details-death",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "institution-details-death",
        component: "PlaceOfDeathInstitution",
        texts: {
          headerCaption: "",
          header: "CR_PLACE_OF_DEATH_INSTITUTION",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathInstitution",
        nextStep: "place-of-death-other",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "place-of-death-other",
        component: "PlaceOfDeathOther",
        texts: {
          headerCaption: "",
          header: "CR_PLACE_OF_DEATH_OTHER",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathOther",
        nextStep: "place-of-death-vehicle",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "place-of-death-vehicle",
        component: "PlaceOfDeathVehicle",
        texts: {
          headerCaption: "",
          header: "CR_PLACE_OF_DEATH_VECHICLE",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "PlaceOfDeathVehicle",
        nextStep: "Informant-Details",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "Informant-Details",
        component: "InformentAddress",
        texts: {
          headerCaption: "",
          header: "CR_INFORMANT_ADDRESS",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "InformentAddress",
        nextStep: "statistical-info",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "statistical-info",
        component: "StatisticalInfo",
        texts: {
          headerCaption: "",
          header: "CR_STATISTICAL_INFORMATION",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "StatisticalInfo",
        nextStep: "statistical-info-continue",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "statistical-info-continue",
        component: "StatisticalInfoContinue",
        texts: {
          headerCaption: "",
          header: "CR_STATISTICAL_INFORMATION_CONTINUE",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "StatisticalInfoContinue",
        nextStep: "general-remarks",
        type: "component",
        hideInEmployee: true,
      },
      {
        route: "general-remarks",
        component: "GeneralRemarks",
        texts: {
          headerCaption: "",
          header: "CR_GENERAL_REMARKS",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "GeneralRemarks",
        nextStep: null,
        type: "component",
        hideInEmployee: true,
      },
    ]
  },
  {
    head: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS",
    body: [
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "owner-ship-details",
        isMandatory: true,
        component: "SelectOwnerShipDetails",
        texts: {
          headerCaption: "TL_TRADE_OWNERSHIP_CAPTION",
          header: "TL_PROVIDE_OWNERSHIP_DETAILS",
          cardText: "TL_PROVIDE_OWNERSHI_DETAILS_SUB_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "ownershipCategory",
        withoutLabel: true,
        nextStep: "owner-details",
      },
      {
        isMandatory: true,
        type: "component",
        route: "owner-details",
        key: "owners",
        component: "SelectOwnerDetails",
        texts: {
          headerCaption: "",
          header: "TL_OWNERSHIP_INFO_SUB_HEADER",
          cardText: "TL_OWNER_DETAILS_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        withoutLabel: true,
        nextStep: "owner-address",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "owner-address",
        isMandatory: true,
        component: "SelectOwnerAddress",
        texts: {
          headerCaption: "TL_OWNERS_DETAILS",
          header: "TL_OWNERS_ADDRESS",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "owners",
        withoutLabel: true,
        nextStep: "proof-of-identity",
        hideInEmployee: true,
      },
      /* {
          type: "component",
          component: "SelectAltContactNumber",
          key: "owners",
          withoutLabel: true,
          hideInEmployee: true,
        }, */
      {
        type: "component",
        route: "proof-of-identity",
        isMandatory: true,
        component: "SelectProofIdentity",
        texts: {
          headerCaption: "TL_OWNERS_DETAILS",
          header: "TL_PROOF_IDENTITY_HEADER",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          addMultipleText: "PT_COMMON_ADD_APPLICANT_LABEL",
        },
        key: "owners",
        withoutLabel: true,
        nextStep: "ownership-proof",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "ownership-proof",
        isMandatory: true,
        component: "SelectOwnershipProof",
        texts: {
          headerCaption: "TL_OWNERS_DETAILS",
          header: "TL_OWNERSHIP_DOCUMENT",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "owners",
        withoutLabel: true,
        nextStep: "proof",
        hideInEmployee: true,
      },
      {
        type: "component",
        component: "TLOwnerDetailsEmployee",
        key: "owners",
        withoutLabel: true,
        hideInCitizen: true,
      },
    ],
  },
  {
    head: "",
    body: [
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "know-your-property",
        isMandatory: true,
        component: "CPTKnowYourProperty",
        texts: {
          header: "PT_DO_YOU_KNOW_YOUR_PROPERTY",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "knowyourproperty",
        isCreateEnabled: true,
        withoutLabel: true,
        nextStep: {
          TL_COMMON_YES: "search-property",
          TL_COMMON_NO: "create-property",
        },
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "search-property",
        isMandatory: true,
        component: "CPTSearchProperty",
        key: "cptsearchproperty",
        withoutLabel: true,
        nextStep: 'search-results',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "search-results",
        isMandatory: true,
        component: "CPTSearchResults",
        key: "cptsearchresults",
        withoutLabel: true,
        nextStep: 'property-details',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "create-property",
        isMandatory: true,
        component: "CPTCreateProperty",
        key: "cptcreateproperty",
        withoutLabel: true,
        isSkipEnabled: true,
        nextStep: 'acknowledge-create-property',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "acknowledge-create-property",
        isMandatory: true,
        component: "CPTAcknowledgement",
        key: "cptacknowledgement",
        withoutLabel: true,
        nextStep: 'property-details',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "property-details",
        isMandatory: true,
        component: "CPTPropertyDetails",
        key: "propertydetails",
        withoutLabel: true,
        nextStep: 'owner-ship-details',
        hideInEmployee: true,
      },
    ],
  },
  {
    head: "TL_NEW_APPLICATION_DOCUMENTS_REQUIRED",
    body: [
      {
        component: "TLDocumentsEmployee",
        withoutLabel: true,
        key: "documents",
        type: "component",
        hideInCitizen: true
      },
    ],
  },
];
