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
        // {
        //     "type": "component",
        //     "route": "proof",
        //     "component": "Proof",
        //     "withoutLabel": true,
        //     "texts": {
        //         "headerCaption": "TL_OWNERS_DETAILS",
        //         "header": "TL_OWNERS_PHOTOGRAPH_HEADER",
        //         "cardText": "",
        //         "nextText": "CS_COMMON_NEXT",
        //         "submitBarLabel": "CS_COMMON_NEXT"
        //     },
        //     "key": "owners",
        //     "nextStep": null,
        //     "hideInEmployee": true
        // }
    ]
  },
  {
    head: "ES_NEW_APPLICATION_PROPERTY_ASSESSMENT",
    body: [
      {
        route: "info",
        component: "TradeLicense",
        nextStep: "map",
        hideInEmployee: true,
        key: "dfm",
      },
      {
        route: "ApplicationDetails",
        component: "DFMApplicationDetails",
        texts: {
          headerCaption: "",
          header: "Applicant Basic Details",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "FileManagement",
        nextStep: "AddressDetails",
        type: "component",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "AddressDetails",
        isMandatory: true,
        component: "DFMAddressDetails",
        texts: {
          headerCaption: "Address Details",
          header: "",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          // addMultipleText: "PT_COMMON_ADD_APPLICANT_LABEL",
        },
        key: "FileManagement",
        withoutLabel: true,
        nextStep: "ServiceDetails",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "ServiceDetails",
        isMandatory: true,
        component: "DFMServiceDetails",
        texts: {
          headerCaption: "",
          header: "Service Details",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "FileManagement",
        withoutLabel: true,
        nextStep: "DocumentDetails",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "DocumentDetails",
        isMandatory: true,
        component: "DFMDocumentDetails",
        texts: {
          headerCaption: "",
          header: "Document Details",
          cardText: "",
          submitBarLabel: "CS_COMMON_SUBMIT",
        },
        key: "FileManagement",
        withoutLabel: true,
        nextStep: null,
        hideInEmployee: true,
      },
    ],
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
        component: "TLOwnerDetailsEmployee",
        key: "owners",
        withoutLabel: true,
        hideInCitizen: true,
      },
      /* {
          type: "component",
          route: "inistitution-details",
          isMandatory: true,
          component: "SelectInistitutionOwnerDetails",
          texts: {
            headerCaption: "",
            header: "PT_INSTITUTION_DETAILS_HEADER",
            cardText: "PT_FORM3_HEADER_MESSAGE",
            submitBarLabel: "PT_COMMON_NEXT",
          },
          key: "owners",
          withoutLabel: true,
          nextStep: "institutional-owner-address",
          hideInEmployee: true,
        }, */
      /* {
          type: "component",
          route: "institutional-owner-address",
          isMandatory: true,
          component: "SelectOwnerAddress",
          texts: {
            headerCaption: "PT_OWNERS_DETAILS",
            header: "PT_OWNERS_ADDRESS",
            cardText: "",
            submitBarLabel: "PT_COMMON_NEXT",
          },
          key: "owners",
          withoutLabel: true,
          nextStep: "institutional-proof-of-identity",
          hideInEmployee: true,
        }, */
      /* {
          type: "component",
          route: "institutional-proof-of-identity",
          isMandatory: true,
          component: "SelectProofIdentity",
          texts: {
            headerCaption: "PT_OWNERS_DETAILS",
            header: "PT_PROOF_IDENTITY_HEADER",
            cardText: "",
            submitBarLabel: "PT_COMMON_NEXT",
          },
          key: "owners",
          withoutLabel: true,
          //nextStep: "",
          nextStep: null,
          hideInEmployee: true,
        }, */
      /*  {
          type: "component",
          component: "PTEmployeeOwnershipDetails",
          key: "owners",
          withoutLabel: true,
          hideInCitizen: true,
        }, */
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
        isCreateEnabled : true,
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
        isSkipEnabled : true,
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
  // {
  //   head: "ES_NEW_APPLICATION_DOCUMENTS_REQUIRED",
  //   body: [
  //     {
  //       component: "SelectDocuments",
  //       withoutLabel: true,
  //       key: "documents",
  //       type: "component",
  //     },
  //   ],
  // },
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
