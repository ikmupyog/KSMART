import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { getI18n } from "react-i18next";
import { Body, Loader } from "@egovernments/digit-ui-react-components";
import { DigitApp } from "./App";
import SelectOtp from './pages/citizen/Login/SelectOtp';

import getStore from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundaries";

const DigitUIWrapper = ({ stateCode, enabledModules, moduleReducers }) => {
  const { isLoading, data: initData } = Digit.Hooks.useInitStore(stateCode, enabledModules);
  console.log(initData);
  let tempInitData ={
    "languages": [
        {
            "label": "ENGLISH",
            "value": "en_IN"
        },
        {
            "label": "हिंदी",
            "value": "hi_IN"
        },
        {
            "label": "മലയാളം",
            "value": "ml_IN"
        }
    ],
    "stateInfo": {
        "code": "kl",
        "name": "Kerala",
        "logoUrl": "https://in-egov-assets.s3.ap-south-1.amazonaws.com/nugp.png",
        "statelogo": "https://in-egov-assets.s3.ap-south-1.amazonaws.com/nugp.png",
        "logoUrlWhite": "hhttps://in-egov-assets.s3.ap-south-1.amazonaws.com/nugp.png",
        "bannerUrl": "https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/Kerala.png"
    },
    "localizationModules": [
        {
            "label": "rainmaker-abg",
            "value": "rainmaker-abg"
        },
        {
            "label": "rainmaker-common",
            "value": "rainmaker-common"
        },
        {
            "label": "rainmaker-noc",
            "value": "rainmaker-noc"
        },
        {
            "label": "rainmaker-pt",
            "value": "rainmaker-pt"
        },
        {
            "label": "rainmaker-uc",
            "value": "rainmaker-uc"
        },
        {
            "label": "rainmaker-pgr",
            "value": "rainmaker-pgr"
        },
        {
            "label": "rainmaker-fsm",
            "value": "rainmaker-fsm"
        },
        {
            "label": "rainmaker-tl",
            "value": "rainmaker-tl"
        },
        {
            "label": "rainmaker-hr",
            "value": "rainmaker-hr"
        },
        {
            "label": "rainmaker-test",
            "value": "rainmaker-test"
        },
        {
            "label": "finance-erp",
            "value": "finance-erp"
        },
        {
            "label": "rainmaker-receipt",
            "value": "rainmaker-receipt"
        },
        {
            "label": "rainmaker-dss",
            "value": "rainmaker-dss"
        },
        {
            "label": "rainmaker-cr",
            "value": "rainmaker-cr"
        }
    ],
    "modules": [
        {
            "module": "QuickPayLinks",
            "code": "QuickPayLinks",
            "active": true,
            "order": 1,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kannur"
                }
            ]
        },
        {
            "module": "Payment",
            "code": "Payment",
            "active": true,
            "order": 1,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.thrissur"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        },
        {
            "module": "PGR",
            "code": "PGR",
            "bannerImage": "https://egov-uat-assets.s3.amazonaws.com/PGR.png",
            "active": true,
            "order": 2,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.kozhikode"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        },
        {
            "module": "TL",
            "code": "TL",
            "bannerImage": "https://egov-uat-assets.s3.amazonaws.com/TL.png",
            "active": true,
            "order": 2,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kottayam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.kozhikode"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        },
        {
            "module": "DFM",
            "code": "DFM",
            "bannerImage": "https://egov-uat-assets.s3.amazonaws.com/TL.png",
            "active": true,
            "order": 2,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kottayam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.kozhikode"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        },
        {
            "module": "HRMS",
            "code": "HRMS",
            "active": true,
            "order": 2,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.kozhikode"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        },
        {
            "module": "Receipts",
            "code": "Receipts",
            "active": true,
            "order": 3,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.thrissur"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        },
        {
            "module": "Engagement",
            "code": "Engagement",
            "active": true,
            "order": 3,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.thrissur"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        },
        {
            "module": "CR",
            "code": "CR",
            "active": true,
            "order": 5,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.thrissur"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        },
        {
            "module": "DSS",
            "code": "DSS",
            "active": true,
            "order": 6,
            "tenants": [
                {
                    "code": "kl.cochin"
                },
                {
                    "code": "kl.kollam"
                },
                {
                    "code": "kl.kannur"
                },
                {
                    "code": "kl.thrissur"
                },
                {
                    "code": "kl.thiruvananthapuram"
                }
            ]
        }
    ],
    "districts": [
        {
            "name": "Thiruvananthapuram",
            "localname": "തിരുവനന്തപുരം",
            "code": "DIST_TVM",
            "stateid": 32,
            "districtid": 1,
            "active": "true"
        },
        {
            "name": "Kollam",
            "localname": "കൊല്ലം",
            "code": "DIST_KLM",
            "stateid": 32,
            "districtid": 2,
            "active": "true"
        },
        {
            "name": "Pathanamthitta",
            "localname": "പത്തനംതിട്ട",
            "code": "DIST_PTA",
            "stateid": 32,
            "districtid": 3,
            "active": "true"
        },
        {
            "name": "Alappuzha",
            "localname": "ആലപ്പുഴ",
            "code": "DIST_APL",
            "stateid": 32,
            "districtid": 4,
            "active": "true"
        },
        {
            "name": "Kottayam",
            "localname": "കോട്ടയം",
            "code": "DIST_KTM",
            "stateid": 32,
            "districtid": 5,
            "active": "true"
        },
        {
            "name": "Idukki",
            "localname": "ഇടുക്കി",
            "code": "DIST_IDK",
            "stateid": 32,
            "districtid": 6,
            "active": "true"
        },
        {
            "name": "Ernakulam",
            "localname": "എറണാകുളം",
            "code": "DIST_EKM",
            "stateid": 32,
            "districtid": 7,
            "active": "true"
        },
        {
            "name": "Thrissur",
            "localname": "തൃശ്ശൂര്‍",
            "code": "DIST_TSR",
            "stateid": 32,
            "districtid": 8,
            "active": "true"
        },
        {
            "name": "Palakkad",
            "localname": "പാലക്കാട്",
            "code": "DIST_PKD",
            "stateid": 32,
            "districtid": 9,
            "active": "true"
        },
        {
            "name": "Malappuram",
            "localname": "മലപ്പുറം",
            "code": "DIST_MLP",
            "stateid": 32,
            "districtid": 10,
            "active": "true"
        },
        {
            "name": "Kozhikode",
            "localname": "കോഴിക്കോട്",
            "code": "DIST_KZD",
            "stateid": 32,
            "districtid": 11,
            "active": "true"
        },
        {
            "name": "Wayanad",
            "localname": "വയനാട്",
            "code": "DIST_WND",
            "stateid": 32,
            "districtid": 12,
            "active": "true"
        },
        {
            "name": "Kannur",
            "localname": "കണ്ണൂര്‍",
            "code": "DIST_KNR",
            "stateid": 32,
            "districtid": 13,
            "active": "true"
        },
        {
            "name": "Kasaragod",
            "localname": "കാസര്‍കോഡ്",
            "code": "DIST_KSD",
            "stateid": 32,
            "districtid": 14,
            "active": "true"
        },
        {
            "name": "Kasaragod",
            "localname": "കാസര്‍കോഡ്",
            "code": "DIST_KSD",
            "stateid": 32,
            "districtid": 14,
            "active": "true"
        }
    ],
    "selectedLanguage": "en_IN",
    "tenants": [
        {
            "i18nKey": "TENANT_TENANTS_KL_ADOOR",
            "code": "kl.adoor",
            "name": "Adoor Municipality",
            "description": "Adoor",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/pathanamthitta/adoor.jpg",
            "imageId": null,
            "domainUrl": "adoormunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secyadr@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Adoor Municipality",
                "localName": "അടൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 3,
                "districtCode": "564",
                "districtName": "Pathanamthitta",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.8101575,
                "latitude": 9.3303298,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M030100",
                "ddrName": "Adoor"
            },
            "address": "Adoor,Pathanamthitta-691523",
            "pincode": [
                691523
            ],
            "contactNumber": "04734-228362",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_ALAPPUZHA",
            "code": "kl.alappuzha",
            "name": "Alappuzha Municipality",
            "description": "Alappuzha",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/alappuzha/alappuzha.jpg",
            "imageId": null,
            "domainUrl": "alappuzhamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretaryalappuzha@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Alappuzha Municipality",
                "localName": "ആലപ്പുഴ മുനിസിപ്പാലിറ്റി",
                "districtid": 4,
                "districtCode": "554",
                "districtName": "Alappuzha",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.3362342,
                "latitude": 9.4946059,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M040500",
                "ddrName": "Alappuzha"
            },
            "address": "Alappuzha P.O.,Alappuzha-688001",
            "pincode": [
                688001
            ],
            "contactNumber": "0477-2251123",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_ALUVA",
            "code": "kl.aluva",
            "name": "Aluva Municipality",
            "description": "Aluva",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/aluva.jpg",
            "imageId": null,
            "domainUrl": "aluvamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "aluvamunicipaloffice@yahoo.com ",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Aluva Municipality",
                "localName": "ആലുവ മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.3594999,
                "latitude": 10.1087827,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070800",
                "ddrName": "Aluva"
            },
            "address": "Aluva P.O, Ernakulam.",
            "pincode": [
                null
            ],
            "contactNumber": "0484-2623192",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_ANGAMALY",
            "code": "kl.angamaly",
            "name": "Angamaly Municipality",
            "description": "Angamaly",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/angamaly.jpg",
            "imageId": null,
            "domainUrl": "angamalymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretaryagly@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Angamaly Municipality",
                "localName": "അങ്കമാലി മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.387137,
                "latitude": 10.19523,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070300",
                "ddrName": "Angamaly"
            },
            "address": "Angamaly P.O, Eranakulam - 683572",
            "pincode": [
                683572
            ],
            "contactNumber": "0484-2459573",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_ANTHOOR",
            "code": "kl.anthoor",
            "name": "Anthoor Municipality",
            "description": "Anthoor",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/anthoor.jpg",
            "imageId": null,
            "domainUrl": "anthoormunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "anthoormunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Anthoor Municipality",
                "localName": "ആന്തൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.377213,
                "latitude": 11.98576,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130900",
                "ddrName": "Anthoor"
            },
            "address": "Parassinikadavu Road,Kannur-670567",
            "pincode": [
                670567
            ],
            "contactNumber": "0497-2784450",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_ATTINGAL",
            "code": "kl.attingal",
            "name": "Attingal Municipality",
            "description": "Attingal",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thiruvananthapuram/attingal.jpg",
            "imageId": null,
            "domainUrl": "attingalmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretaryattl@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Attingal Municipality",
                "localName": "ആറ്റിങ്ങല്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 1,
                "districtCode": "565",
                "districtName": "Thiruvananthapuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.8162989616394,
                "latitude": 8.69672359684223,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M010200",
                "ddrName": "Attingal"
            },
            "address": "Attingal P.O,Thiruvananthapuram - 695101",
            "pincode": [
                695101
            ],
            "contactNumber": "0470-2622417",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_CHALAKUDY",
            "code": "kl.chalakudy",
            "name": "Chalakudy Municipality",
            "description": "Chalakudy",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/chalakudy.jpg",
            "imageId": null,
            "domainUrl": "chalakudymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarycmcchalakudy@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Chalakudy Municipality",
                "localName": "ചാലക്കുടി മുനിസിപ്പാലിറ്റി",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M080400",
                "ddrName": "Chalakudy"
            },
            "address": "Municipal Office,Chalakudy-680307",
            "pincode": [
                680307
            ],
            "contactNumber": "0480-2708152",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_CHANGANASSERY",
            "code": "kl.changanassery",
            "name": "Changanassery Municipality",
            "description": "Changanassery",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kottayam/changanassery.jpg",
            "imageId": null,
            "domainUrl": "changanasserymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarychgry@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Changanassery Municipality",
                "localName": "ചങ്ങനാശ്ശേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 5,
                "districtCode": "560",
                "districtName": "Kottayam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": null,
                "latitude": 10.0751,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M050300",
                "ddrName": "Changanassery"
            },
            "address": "Changanassery, Kottayam - 686101",
            "pincode": [
                686101
            ],
            "contactNumber": "0481-2420897",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_CHAVAKKAD",
            "code": "kl.chavakkad",
            "name": "Chavakkad Municipality",
            "description": "Chavakkad",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/chavakkad.jpg",
            "imageId": null,
            "domainUrl": "chavakkadmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "chavakkadsecretary@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Chavakkad Municipality",
                "localName": "ചാവക്കാട് മുനിസിപ്പാലിറ്റി",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.0191,
                "latitude": 10.5782,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M080200",
                "ddrName": "Chavakkad"
            },
            "address": "Chavakkad,Thrissur-680506",
            "pincode": [
                680506
            ],
            "contactNumber": "0487-2507367",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_CHENGANNUR",
            "code": "kl.chengannur",
            "name": "Chengannur Municipality",
            "description": "Chengannur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/alappuzha/chengannur.jpg",
            "imageId": null,
            "domainUrl": "chengannurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "seccgnrmlty@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Chengannur Municipality",
                "localName": "ചെങ്ങന്നൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 4,
                "districtCode": "554",
                "districtName": "Alappuzha",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.63333,
                "latitude": 9.33333,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M040100",
                "ddrName": "Chengannur"
            },
            "address": "Municipal Office,Chengannur-689121",
            "pincode": [
                689121
            ],
            "contactNumber": "0479-2452260",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_CHERPULASSERY",
            "code": "kl.cherpulassery",
            "name": "Cherpulassery Municipality",
            "description": "Cherpulassery",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/palakkad/cherpulassery.jpg",
            "imageId": null,
            "domainUrl": "cherpulasserymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "seccpymun@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Cherpulassery Municipality",
                "localName": "ചെര്‍പുളശ്ശേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 9,
                "districtCode": "563",
                "districtName": "Palakkad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.3114,
                "latitude": 10.8789,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M090600",
                "ddrName": "Cherpulassery"
            },
            "address": "Cherpulassery,Palakkad-679503",
            "pincode": [
                679503
            ],
            "contactNumber": "0466-2282238",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_CHERTHALA",
            "code": "kl.cherthala",
            "name": "Cherthala Municipality",
            "description": "Cherthala",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/alappuzha/cherthala.jpg",
            "imageId": null,
            "domainUrl": "cherthalamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarycmc1@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Cherthala Municipality",
                "localName": "ചേര്‍ത്തല മുനിസിപ്പാലിറ്റി",
                "districtid": 4,
                "districtCode": "554",
                "districtName": "Alappuzha",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.3427157,
                "latitude": 9.686984,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M040300",
                "ddrName": "Cherthala"
            },
            "address": "Cherthala,Alappuzha-688524",
            "pincode": [
                688524
            ],
            "contactNumber": "0478 - 2822536",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_CHITTUR",
            "code": "kl.chittur",
            "name": "Chittur Tattamangalam Municipality",
            "description": "Chittur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/palakkad/chittur.jpg",
            "imageId": null,
            "domainUrl": "chitturthathamangalam.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretary.chittur@rediffmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Chittur Tattamangalam Municipality",
                "localName": "ചിറ്റൂര്‍ തത്തമംഗലം മുനിസിപ്പാലിറ്റി",
                "districtid": 9,
                "districtCode": "563",
                "districtName": "Palakkad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.725945,
                "latitude": 10.693343,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M090300",
                "ddrName": "Chittur"
            },
            "address": "Chittur College P.O.,Palakkad- 678104",
            "pincode": [
                678104
            ],
            "contactNumber": "04923-222343",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_COCHIN",
            "code": "kl.cochin",
            "name": "Cochin Corporation",
            "description": "Cochin",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/cochin.jpg",
            "imageId": null,
            "domainUrl": "https://kochicorporation.lsgkerala.gov.in/",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "epayhelpkochi@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Cochin Corporation",
                "localName": "കൊച്ചി കോര്‍പ്പറേഷന്‍",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Corporation",
                "longitude": 76.280362,
                "latitude": 9.992699,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "C070100",
                "ddrName": "Cochin"
            },
            "address": "Kochi Municipal Corporation\nPB No-1016, Cochin\nErnakulam Dt-Kerala State\nPin - 682011",
            "pincode": [
                682011
            ],
            "contactNumber": "4842369007",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_ELOOR",
            "code": "kl.eloor",
            "name": "Eloor Municipality",
            "description": "Eloor",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/eloor.jpg",
            "imageId": null,
            "domainUrl": "www.eloor.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "eloortax@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Eloor Municipality",
                "localName": "ഏലൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.2932,
                "latitude": 10.0751,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M071000",
                "ddrName": "Eloor"
            },
            "address": "Udyogamandal P.O.,Ernakulam-683501",
            "pincode": [
                683501
            ],
            "contactNumber": "0484-2545559",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_ERATTUPETTA",
            "code": "kl.erattupetta",
            "name": "Erattupetta Municipality",
            "description": "Erattupetta",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kottayam/erattupetta.jpg",
            "imageId": null,
            "domainUrl": "erattupettamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "etpamun@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Erattupetta Municipality",
                "localName": "ഈരാറ്റുപേട്ട മുനിസിപ്പാലിറ്റി",
                "districtid": 5,
                "districtCode": "560",
                "districtName": "Kottayam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.7798937,
                "latitude": 9.6875876,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M050600",
                "ddrName": "Erattupetta"
            },
            "address": "Erattupetta P.O., Kottayam-686121",
            "pincode": [
                686121
            ],
            "contactNumber": "0482-2272063",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_ETTUMANOOR",
            "code": "kl.ettumanoor",
            "name": "Ettumanoor Municipality",
            "description": "Ettumanoor",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kottayam/ettumanoor.jpg",
            "imageId": null,
            "domainUrl": "ettumanoormunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "etmrmunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Ettumanoor Municipality",
                "localName": "ഏറ്റുമാനൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 5,
                "districtCode": "560",
                "districtName": "Kottayam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.5570069,
                "latitude": 9.669184,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M050500",
                "ddrName": "Ettumanoor"
            },
            "address": "Municipal Office, Ettumanoor-686631",
            "pincode": [
                686631
            ],
            "contactNumber": "0481-2535565",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_FEROKE",
            "code": "kl.feroke",
            "name": "Feroke Municipality",
            "description": "Feroke",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kozhikkode/feroke.jpg",
            "imageId": null,
            "domainUrl": "ferokemunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "ferokemunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Feroke Municipality",
                "localName": "ഫറോക്ക് മുനിസിപ്പാലിറ്റി",
                "districtid": 11,
                "districtCode": "561",
                "districtName": "Kozhikkode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M110700",
                "ddrName": "Feroke"
            },
            "address": "Feroke,Kozhikkode-673631",
            "pincode": [
                673631
            ],
            "contactNumber": "04952-482243",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_GURUVAYUR",
            "code": "kl.guruvayur",
            "name": "Guruvayur Municipality",
            "description": "Guruvayur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/guruvayur.jpg",
            "imageId": null,
            "domainUrl": "guruvayoormunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "guruvayursecretary@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Guruvayur Municipality",
                "localName": "ഗുരുവായൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.045352,
                "latitude": 10.614784,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M080100",
                "ddrName": "Guruvayur"
            },
            "address": "Guruvayur MunicipalitymThrissur. Pin-680101",
            "pincode": [
                680101
            ],
            "contactNumber": "4872556375",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_HARIPAD",
            "code": "kl.haripad",
            "name": "Haripad Municipality",
            "description": "Haripad",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/alappuzha/haripad.jpg",
            "imageId": null,
            "domainUrl": "haripadmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretaryharipad@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Haripad Municipality",
                "localName": "ഹരിപ്പാട് മുനിസിപ്പാലിറ്റി",
                "districtid": 4,
                "districtCode": "554",
                "districtName": "Alappuzha",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.4676903,
                "latitude": 9.2787134,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M040600",
                "ddrName": "Haripad"
            },
            "address": "Haripad Municipality, \nHaripad P.O Alappuzha Pin-690514",
            "pincode": [
                690514
            ],
            "contactNumber": " 0479-2412766",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_IRINJALAKUDA",
            "code": "kl.irinjalakuda",
            "name": "Irinjalakuda Municipality",
            "description": "Irinjalakuda",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/irinjalakuda.jpg",
            "imageId": null,
            "domainUrl": "irinjalakudamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretaryijk@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Irinjalakuda Municipality",
                "localName": "ഇരിങ്ങാലക്കുട മുനിസിപ്പാലിറ്റി",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.1899278,
                "latitude": 10.3512378,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M080500",
                "ddrName": "Irinjalakuda"
            },
            "address": "Irinjalakuda,Pin:680121",
            "pincode": [
                null
            ],
            "contactNumber": "0480 2825238",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_IRITTY",
            "code": "kl.iritty",
            "name": "Iritty Municipality",
            "description": "Iritty",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/iritty.jpg",
            "imageId": null,
            "domainUrl": "irittymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "irittymunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Iritty Municipality",
                "localName": "ഇരിട്ടി മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.6556514288457,
                "latitude": 11.9641510762533,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130800",
                "ddrName": "Iritty"
            },
            "address": "Punnad P.O.,Kannur-670703",
            "pincode": [
                670703
            ],
            "contactNumber": "0490-2433344",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KALAMASSERY",
            "code": "kl.kalamassery",
            "name": "Kalamassery Municipality",
            "description": "Kalamassery",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/kalamassery.jpg",
            "imageId": null,
            "domainUrl": "kalamasserymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarykalamassery@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kalamassery Municipality",
                "localName": "കളമശ്ശേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 29.96393,
                "latitude": 27.83597,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070100",
                "ddrName": "Kalamassery"
            },
            "address": "Changampuzha Nagar P.O., Ernakulam",
            "pincode": [
                null
            ],
            "contactNumber": "0484 2532026",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KALPETTA",
            "code": "kl.kalpetta",
            "name": "Kalpetta Municipality",
            "description": "Kalpetta",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/wayanad/kalpetta.jpg",
            "imageId": null,
            "domainUrl": "kalpettamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "kalpettamunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kalpetta Municipality",
                "localName": "കല്‍പ്പറ്റ മുനിസിപ്പാലിറ്റി",
                "districtid": 12,
                "districtCode": "567",
                "districtName": "Wayanad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.084265,
                "latitude": 11.618048,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M120100",
                "ddrName": "Kalpetta"
            },
            "address": "Kalpetta,Wayanad- 673121",
            "pincode": [
                673121
            ],
            "contactNumber": "04936-202349",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KANHANGAD",
            "code": "kl.kanhangad",
            "name": "Kanhangad Municipality",
            "description": "Kanhangad",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kasargode/kanhangad.jpg",
            "imageId": null,
            "domainUrl": "kanhangadmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "knhdmlty@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kanhangad Municipality",
                "localName": "കാഞ്ഞങ്ങാട് മുനിസിപ്പാലിറ്റി",
                "districtid": 14,
                "districtCode": "558",
                "districtName": "Kasargode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M140100",
                "ddrName": "Kanhangad"
            },
            "address": "Kanhangad P.O., Kasaragod-671315",
            "pincode": [
                671315
            ],
            "contactNumber": "04672-204530",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KANNUR",
            "code": "kl.kannur",
            "name": "Kannur Corporation",
            "description": "Kannur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/kannur.jpg",
            "imageId": null,
            "domainUrl": "http://kannurcorporation.lsgkerala.gov.in/",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "kannurmunicipalcorporation@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kannur Corporation",
                "localName": "കണ്ണൂര്‍ കോര്‍പ്പറേഷന്‍",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Corporation",
                "longitude": 75.370369,
                "latitude": 11.874477,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "C130100",
                "ddrName": "Kannur"
            },
            "address": "Kannur Municipal Corporation\nPB No- 39\nPin- 670001\nKannur",
            "pincode": [
                null
            ],
            "contactNumber": "4972700142",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KARUNAGAPPALLY",
            "code": "kl.karunagappally",
            "name": "Karunagappally Municipality",
            "description": "Karunagappally",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kollam/karunagappally.jpg",
            "imageId": null,
            "domainUrl": "www.karunagappally.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secknpym07@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Karunagappally Municipality",
                "localName": "കരുനാഗപ്പള്ളി മുനിസിപ്പാലിറ്റി",
                "districtid": 2,
                "districtCode": "559",
                "districtName": "Kollam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M020100",
                "ddrName": "Karunagappally"
            },
            "address": "Karunagappally P.O.,Kollam-690518",
            "pincode": [
                690518
            ],
            "contactNumber": "0476-2620243",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KASARAGOD",
            "code": "kl.kasaragod",
            "name": "Kasaragod Municipality",
            "description": "Kasaragod",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kasargode/kasaragod.jpg",
            "imageId": null,
            "domainUrl": "kasaragodmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretaryksdkmc@yahoo.co.in",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kasaragod Municipality",
                "localName": "കാസര്‍കോഡ് മുനിസിപ്പാലിറ്റി",
                "districtid": 14,
                "districtCode": "558",
                "districtName": "Kasargode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M140200",
                "ddrName": "Kasaragod"
            },
            "address": "Municipal Office, Kasaragod P.O.",
            "pincode": [
                null
            ],
            "contactNumber": "04994-230051",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KATTAPPANA",
            "code": "kl.kattappana",
            "name": "Kattappana Municipality",
            "description": "Kattappana",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/idukki/kattappana.jpg",
            "imageId": null,
            "domainUrl": "kattapanamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "munsecktpna@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kattappana Municipality",
                "localName": "കട്ടപ്പന മുനിസിപ്പാലിറ്റി",
                "districtid": 6,
                "districtCode": "556",
                "districtName": "Idukki",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 77.117929,
                "latitude": 9.752404,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M060200",
                "ddrName": "Kattappana"
            },
            "address": "Kattappana P.O.,Idukki - 685508",
            "pincode": [
                685508
            ],
            "contactNumber": "0486-8272235",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KAYAMKULAM",
            "code": "kl.kayamkulam",
            "name": "Kayamkulam Municipality",
            "description": "Kayamkulam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/alappuzha/kayamkulam.jpg",
            "imageId": null,
            "domainUrl": "kayamkulammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "kylmsecretary@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kayamkulam Municipality",
                "localName": "കായംകുളം മുനിസിപ്പാലിറ്റി",
                "districtid": 4,
                "districtCode": "554",
                "districtName": "Alappuzha",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.500876545906,
                "latitude": 9.17263876596298,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M040400",
                "ddrName": "Kayamkulam"
            },
            "address": "Municipal Office,Kayamkulam-690502",
            "pincode": [
                690502
            ],
            "contactNumber": "0479-2445060",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KODUNGALLUR",
            "code": "kl.kodungallur",
            "name": "Kodungallur Municipality",
            "description": "Kodungallur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/kodungallur.jpg",
            "imageId": null,
            "domainUrl": "kodungalloormunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarykdlrmty@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kodungallur Municipality",
                "localName": "കൊടുങ്ങല്ലൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M080300",
                "ddrName": "Kodungallur"
            },
            "address": "Kodungalloor,Thrissur-680664",
            "pincode": [
                680664
            ],
            "contactNumber": "0480-2802341",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KODUVALLY",
            "code": "kl.koduvally",
            "name": "Koduvally Municipality",
            "description": "Koduvally",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kozhikkode/koduvally.jpg",
            "imageId": null,
            "domainUrl": "koduvallymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "koduvallymunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Koduvally Municipality",
                "localName": "കൊടുവള്ളി മുനിസിപ്പാലിറ്റി",
                "districtid": 11,
                "districtCode": "561",
                "districtName": "Kozhikkode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.9105196764491,
                "latitude": 11.3612227524779,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M110400",
                "ddrName": "Koduvally"
            },
            "address": "Koduvally P.O.,Kozhikkode-673572",
            "pincode": [
                673572
            ],
            "contactNumber": "0495-2210238",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KOLLAM",
            "code": "kl.kollam",
            "name": "Kollam Corporation",
            "description": "Kollam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kollam/kollam.jpg",
            "imageId": null,
            "domainUrl": "www.kollamcorporation.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarykollam@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kollam Corporation",
                "localName": "കൊല്ലം കോര്‍പ്പറേഷന്‍",
                "districtid": 2,
                "districtCode": "559",
                "districtName": "Kollam",
                "regionName": "Kerala",
                "ulbGrade": "Corporation",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "C020100",
                "ddrName": "Kollam"
            },
            "address": "Kollamcorporation\nKollam P O\nPin 691001",
            "pincode": [
                null
            ],
            "contactNumber": "4742768530",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KONDOTTY",
            "code": "kl.kondotty",
            "name": "Kondotty Municipality",
            "description": "Kondotty",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/kondotty.jpg",
            "imageId": null,
            "domainUrl": "kondottymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "kondottynagarasabha@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kondotty Municipality",
                "localName": "കൊണ്ടോട്ടി മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100800",
                "ddrName": "Kondotty"
            },
            "address": "Kondotty P.O.,Malappuram- 673638",
            "pincode": [
                673638
            ],
            "contactNumber": "0483-2712037",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KOOTHATTUKULAM",
            "code": "kl.koothattukulam",
            "name": "Koothattukulam Municipality",
            "description": "Koothattukulam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/koothattukulam.jpg",
            "imageId": null,
            "domainUrl": "koothatukulammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "kklmmunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Koothattukulam Municipality",
                "localName": "കൂത്താട്ടുകുളം മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.5937638,
                "latitude": 9.861635,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M071200",
                "ddrName": "Koothattukulam"
            },
            "address": "Koothattukulam P.O, Ernakulam-686662",
            "pincode": [
                686662
            ],
            "contactNumber": "4852252350",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KOTHAMANGALAM",
            "code": "kl.kothamangalam",
            "name": "Kothamangalam Municipality",
            "description": "Kothamangalam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/kothamangalam.jpg",
            "imageId": null,
            "domainUrl": "kothamangalammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarykothamangalam@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kothamangalam Municipality",
                "localName": "കോതമംഗലം മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.619508,
                "latitude": 10.065098,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070200",
                "ddrName": "Kothamangalam"
            },
            "address": "Kothamangalam, Ernakulam-686691",
            "pincode": [
                686691
            ],
            "contactNumber": "0485-2822160",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KOTTAKKAL",
            "code": "kl.kottakkal",
            "name": "Kottakkal Municipality",
            "description": "Kottakkal",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/kottakkal.jpg",
            "imageId": null,
            "domainUrl": "www.kottakkal.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "sectretarykottakkal@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kottakkal Municipality",
                "localName": "കോട്ടക്കല്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100700",
                "ddrName": "Kottakkal"
            },
            "address": "Kottakkal,Malappuram - 676503",
            "pincode": [
                676503
            ],
            "contactNumber": "0483-2742271",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KOTTARAKARA",
            "code": "kl.kottarakara",
            "name": "Kottarakara Municipality",
            "description": "Kottarakara",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kollam/kottarakara.jpg",
            "imageId": null,
            "domainUrl": "kottarakaramunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "kottarakaramp@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kottarakara Municipality",
                "localName": "കൊട്ടാരക്കര മുനിസിപ്പാലിറ്റി",
                "districtid": 2,
                "districtCode": "559",
                "districtName": "Kollam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.7789760231971,
                "latitude": 9.00527544761595,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M020400",
                "ddrName": "Kottarakara"
            },
            "address": "Kottarakara,Kollam-691531",
            "pincode": [
                691531
            ],
            "contactNumber": "0474-2452366",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KOTTAYAM",
            "code": "kl.kottayam",
            "name": "Kottayam Municipality",
            "description": "Kottayam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kottayam/kottayam.jpg",
            "imageId": null,
            "domainUrl": "kottayammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "ktmmunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kottayam Municipality",
                "localName": "കോട്ടയം മുനിസിപ്പാലിറ്റി",
                "districtid": 5,
                "districtCode": "560",
                "districtName": "Kottayam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.5221811352927,
                "latitude": 9.59110843527921,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M050400",
                "ddrName": "Kottayam"
            },
            "address": "Kottayam Municipality, Kottayam P.O\nKottayam PIN - 686001",
            "pincode": [
                686001
            ],
            "contactNumber": "0481-2561002",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KOYILANDY",
            "code": "kl.koyilandy",
            "name": "Koyilandy Municipality",
            "description": "Koyilandy",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kozhikkode/koyilandy.jpg",
            "imageId": null,
            "domainUrl": "quilandymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarykldy@rediffmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Koyilandy Municipality",
                "localName": "കൊയിലാണ്ടി മുനിസിപ്പാലിറ്റി",
                "districtid": 11,
                "districtCode": "561",
                "districtName": "Kozhikkode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 75.700373,
                "latitude": 11.441839,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M110200",
                "ddrName": "Koyilandy"
            },
            "address": "Koyilandy,Kozhikkode-673305",
            "pincode": [
                673305
            ],
            "contactNumber": "0496-2620244",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KOZHIKODE",
            "code": "kl.kozhikode",
            "name": "Kozhikode Corporation",
            "description": "Kozhikode",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kozhikkode/kozhikode.jpg",
            "imageId": null,
            "domainUrl": "https://kozhikodecorporation.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarykkd@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kozhikode Corporation",
                "localName": "കോഴിക്കോട് കോര്‍പ്പറേഷന്‍",
                "districtid": 11,
                "districtCode": "561",
                "districtName": "Kozhikkode",
                "regionName": "Kerala",
                "ulbGrade": "Corporation",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "C110100",
                "ddrName": "Kozhikode"
            },
            "address": "Kozhikode Municipal Corporation,\nCalicut Beach,Kozhikod  -673032",
            "pincode": [
                673032
            ],
            "contactNumber": "4952365040",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KUNNAMKULAM",
            "code": "kl.kunnamkulam",
            "name": "Kunnamkulam Municipality",
            "description": "Kunnamkulam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/kunnamkulam.jpg",
            "imageId": null,
            "domainUrl": "kunnamkulammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "kunnamkulamsecretary@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kunnamkulam Municipality",
                "localName": "കുന്നംകുളം മുനിസിപ്പാലിറ്റി",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.0694,
                "latitude": 10.6508,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M080600",
                "ddrName": "Kunnamkulam"
            },
            "address": "Kunnamkulam,Thrissur-680503",
            "pincode": [
                680503
            ],
            "contactNumber": "04885-222221",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_KUTHUPARAMBA",
            "code": "kl.kuthuparamba",
            "name": "Kuthuparamba Municipality",
            "description": "Kuthuparamba",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/kuthuparamba.jpg",
            "imageId": null,
            "domainUrl": "koothuparambamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "kpbamly@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Kuthuparamba Municipality",
                "localName": "കൂത്തുപറമ്പ് മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 75.565178,
                "latitude": 11.827115,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130300",
                "ddrName": "Kuthuparamba"
            },
            "address": "Koothuprambu,Kannur - 670643",
            "pincode": [
                670643
            ],
            "contactNumber": "0490-2361246",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MALAPPURAM",
            "code": "kl.malappuram",
            "name": "Malappuram Municipality",
            "description": "Malappuram",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/malappuram.jpg",
            "imageId": null,
            "domainUrl": "malappurammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "mlpmmunci@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Malappuram Municipality",
                "localName": "മലപ്പുറം മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100500",
                "ddrName": "Malappuram"
            },
            "address": "Downhill (PO),Malappuram",
            "pincode": [
                null
            ],
            "contactNumber": "0483 2734228",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MANANTHAVADY",
            "code": "kl.mananthavady",
            "name": "Mananthavady Municipality",
            "description": "Mananthavady",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/wayanad/mananthavady.jpg",
            "imageId": null,
            "domainUrl": "mananthavadymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "mndymunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Mananthavady Municipality",
                "localName": "മാനന്തവാടി മുനിസിപ്പാലിറ്റി",
                "districtid": 12,
                "districtCode": "567",
                "districtName": "Wayanad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.00599288,
                "latitude": 11.7999776748879,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M120200",
                "ddrName": "Mananthavady"
            },
            "address": "Mananthavady,Wayanad-670645",
            "pincode": [
                670645
            ],
            "contactNumber": "04935-240253",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MANJERI",
            "code": "kl.manjeri",
            "name": "Manjeri Municipality",
            "description": "Manjeri",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/manjeri.jpg",
            "imageId": null,
            "domainUrl": "manjerimunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "musecmanjeri@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Manjeri Municipality",
                "localName": "മഞ്ചേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.11823,
                "latitude": 11.12067,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100300",
                "ddrName": "Manjeri"
            },
            "address": "Kozhikode Road,Malappuram-676121",
            "pincode": [
                676121
            ],
            "contactNumber": "0483-2766238",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MANNARKAD",
            "code": "kl.mannarkad",
            "name": "Mannarkad Municipality",
            "description": "Mannarkad",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/palakkad/mannarkad.jpg",
            "imageId": null,
            "domainUrl": "mannarkkadmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "ddpmannarkkadpkd@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Mannarkad Municipality",
                "localName": "മണ്ണാര്‍ക്കാട് മുനിസിപ്പാലിറ്റി",
                "districtid": 9,
                "districtCode": "563",
                "districtName": "Palakkad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.454465847058,
                "latitude": 10.9914737573563,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M090700",
                "ddrName": "Mannarkad"
            },
            "address": "Mannarkkad P.O.,Palakkad-678582",
            "pincode": [
                678582
            ],
            "contactNumber": "04924-222336",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MARADU",
            "code": "kl.maradu",
            "name": "Maradu Municipality",
            "description": "Maradu",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/maradu.jpg",
            "imageId": null,
            "domainUrl": "www.maradu.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarymaradu@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Maradu Municipality",
                "localName": "മരട് മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.316291,
                "latitude": 9.936227,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M071100",
                "ddrName": "Maradu"
            },
            "address": "Maradu, Eranakulam-682304",
            "pincode": [
                682304
            ],
            "contactNumber": "0484-2706544",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MATTANUR",
            "code": "kl.mattanur",
            "name": "Mattanur Municipality",
            "description": "Mattanur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/mattanur.jpg",
            "imageId": null,
            "domainUrl": "mattannurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "munofmtnr@gmail.com ",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Mattanur Municipality",
                "localName": "മട്ടന്നൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 75.571335,
                "latitude": 11.934948,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130100",
                "ddrName": "Mattanur"
            },
            "address": "Mattannur,Kannur",
            "pincode": [
                null
            ],
            "contactNumber": "4902471226",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MAVELIKARA",
            "code": "kl.mavelikara",
            "name": "Mavelikara Municipality",
            "description": "Mavelikara",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/alappuzha/mavelikara.jpg",
            "imageId": null,
            "domainUrl": "mavelikaramunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarymmc@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Mavelikara Municipality",
                "localName": "മാവേലിക്കര മുനിസിപ്പാലിറ്റി",
                "districtid": 4,
                "districtCode": "554",
                "districtName": "Alappuzha",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.5402,
                "latitude": 9.24627,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M040200",
                "ddrName": "Mavelikara"
            },
            "address": "Mavelikara,Alappuzha- 690101",
            "pincode": [
                690101
            ],
            "contactNumber": "0479-2302218",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MUKKAM",
            "code": "kl.mukkam",
            "name": "Mukkam Municipality",
            "description": "Mukkam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kozhikkode/mukkam.jpg",
            "imageId": null,
            "domainUrl": "mukkammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "mukkammunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Mukkam Municipality",
                "localName": "മുക്കം മുനിസിപ്പാലിറ്റി",
                "districtid": 11,
                "districtCode": "561",
                "districtName": "Kozhikkode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.99725,
                "latitude": 11.32098,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M110500",
                "ddrName": "Mukkam"
            },
            "address": "Mukkam,Kozhikkode - 673602",
            "pincode": [
                673602
            ],
            "contactNumber": "0495-2297132",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_MUVATTUPUZHA",
            "code": "kl.muvattupuzha",
            "name": "Muvattupuzha Municipality",
            "description": "Muvattupuzha",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/muvattupuzha.jpg",
            "imageId": null,
            "domainUrl": "muvattupuzhamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "muvattupuzhamunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Muvattupuzha Municipality",
                "localName": "മൂവാറ്റുപുഴ മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.578228,
                "latitude": 9.987282,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070500",
                "ddrName": "Muvattupuzha"
            },
            "address": "Muvattupuzha P.O., Ernakulam-686681",
            "pincode": [
                686681
            ],
            "contactNumber": "0485-2835347",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_NEDUMANGAD",
            "code": "kl.nedumangad",
            "name": "Nedumangad Municipality",
            "description": "Nedumangad",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thiruvananthapuram/nedumangad.jpg",
            "imageId": null,
            "domainUrl": "nedumangadmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "nddsec@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Nedumangad Municipality",
                "localName": "നെടുമങ്ങാട് മുനിസിപ്പാലിറ്റി",
                "districtid": 1,
                "districtCode": "565",
                "districtName": "Thiruvananthapuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 77.0020349143792,
                "latitude": 8.60939400658787,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M010300",
                "ddrName": "Nedumangad"
            },
            "address": "Sathram Junction,Nedumangad,Thiruvananthapuram - 695541",
            "pincode": [
                695541
            ],
            "contactNumber": "04722-802238",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_NEYYATTINKARA",
            "code": "kl.neyyattinkara",
            "name": "Neyyattinkara Municipality",
            "description": "Neyyattinkara",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thiruvananthapuram/neyyattinkara.jpg",
            "imageId": null,
            "domainUrl": "neyyattinkaramunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarynytamc@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Neyyattinkara Municipality",
                "localName": "നെയ്യാറ്റിന്‍കര മുനിസിപ്പാലിറ്റി",
                "districtid": 1,
                "districtCode": "565",
                "districtName": "Thiruvananthapuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.954736,
                "latitude": 8.515329,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M010400",
                "ddrName": "Neyyattinkara"
            },
            "address": "Municipal Office, Neyyattinkara,Pin-695121",
            "pincode": [
                695121
            ],
            "contactNumber": "0471 2222242",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_NILAMBUR",
            "code": "kl.nilambur",
            "name": "Nilambur Municipality",
            "description": "Nilambur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/nilambur.jpg",
            "imageId": null,
            "domainUrl": "www.nilambur.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "nilamburmunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Nilambur Municipality",
                "localName": "നിലമ്പൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.229368,
                "latitude": 11.273285,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100600",
                "ddrName": "Nilambur"
            },
            "address": "Nilambur P.O.,Malappuram-679329",
            "pincode": [
                679329
            ],
            "contactNumber": "04931-220365",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_NILESHWAR",
            "code": "kl.nileshwar",
            "name": "Nileshwar Municipality",
            "description": "Nileshwar",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kasargode/nileshwar.jpg",
            "imageId": null,
            "domainUrl": "www.nileshwar.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "nileshwarammlty@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Nileshwar Municipality",
                "localName": "നീലേശ്വരം മുനിസിപ്പാലിറ്റി",
                "districtid": 14,
                "districtCode": "558",
                "districtName": "Kasargode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M140300",
                "ddrName": "Nileshwar"
            },
            "address": "Nileshwar Municipality,Kasaragod",
            "pincode": [
                null
            ],
            "contactNumber": "4672280360",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_NORTH",
            "code": "kl.north",
            "name": "North Paravur Municipality",
            "description": "North",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/north.jpg",
            "imageId": null,
            "domainUrl": "northparavurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "nparavurmunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "North Paravur Municipality",
                "localName": "വടക്കന്‍ പറവൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": "76.230.530",
                "latitude": 10.140487,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070600",
                "ddrName": "North"
            },
            "address": "Municipal Junction,North Paravur,Eranakulam - 683513",
            "pincode": [
                683513
            ],
            "contactNumber": "0484-2442327",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_OTTAPALAM",
            "code": "kl.ottapalam",
            "name": "Ottapalam Municipality",
            "description": "Ottapalam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/palakkad/ottapalam.jpg",
            "imageId": null,
            "domainUrl": "ottapalammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "otplmuncsec@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Ottapalam Municipality",
                "localName": "ഒറ്റപ്പാലം മുനിസിപ്പാലിറ്റി",
                "districtid": 9,
                "districtCode": "563",
                "districtName": "Palakkad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.3746524,
                "latitude": 10.7804572,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M090100",
                "ddrName": "Ottapalam"
            },
            "address": "Ottappalam Municipality, Ottapalam",
            "pincode": [
                null
            ],
            "contactNumber": "4662246549",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PALA",
            "code": "kl.pala",
            "name": "Pala Municipality",
            "description": "Pala",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kottayam/pala.jpg",
            "imageId": null,
            "domainUrl": "palamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "munsecpala12@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Pala Municipality",
                "localName": "പാലാ മുനിസിപ്പാലിറ്റി",
                "districtid": 5,
                "districtCode": "560",
                "districtName": "Kottayam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": "76.68.",
                "latitude": 9.713,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M050100",
                "ddrName": "Pala"
            },
            "address": "Pala P.O, Kottayam - 686575",
            "pincode": [
                686575
            ],
            "contactNumber": "0482-2212328",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PALAKKAD",
            "code": "kl.palakkad",
            "name": "Palakkad Municipality",
            "description": "Palakkad",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/palakkad/palakkad.jpg",
            "imageId": null,
            "domainUrl": "palakkadmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secypkd@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Palakkad Municipality",
                "localName": "പാലക്കാട് മുനിസിപ്പാലിറ്റി",
                "districtid": 9,
                "districtCode": "563",
                "districtName": "Palakkad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.657158,
                "latitude": 10.768197,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M090400",
                "ddrName": "Palakkad"
            },
            "address": "Opp. District Hospital,Palakkad",
            "pincode": [
                null
            ],
            "contactNumber": "0491-2534638",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PANDALAM",
            "code": "kl.pandalam",
            "name": "Pandalam Municipality",
            "description": "Pandalam",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/pathanamthitta/pandalam.jpg",
            "imageId": null,
            "domainUrl": "pandalammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "pandalammunicipality@gmailc.om",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Pandalam Municipality",
                "localName": "പന്തളം മുനിസിപ്പാലിറ്റി",
                "districtid": 3,
                "districtCode": "564",
                "districtName": "Pathanamthitta",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.677474,
                "latitude": 9.2246437,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M030400",
                "ddrName": "Pandalam"
            },
            "address": "Pandalam P.O.,Pathanamthitta- 689501",
            "pincode": [
                689501
            ],
            "contactNumber": "04734-252251",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PANOOR",
            "code": "kl.panoor",
            "name": "Panoor Municipality",
            "description": "Panoor",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/panoor.jpg",
            "imageId": null,
            "domainUrl": "panoormunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "panoormunicipality2015@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Panoor Municipality",
                "localName": "പാനൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.581814,
                "latitude": 11.759683,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130700",
                "ddrName": "Panoor"
            },
            "address": "Panoor P.O.,Kannur -670692",
            "pincode": [
                670692
            ],
            "contactNumber": "0490-2311340",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PARAPPANANGADI",
            "code": "kl.parappanangadi",
            "name": "Parappanangadi Municipality",
            "description": "Parappanangadi",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/parappanangadi.jpg",
            "imageId": null,
            "domainUrl": "parappanangadimunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "parappanangadimunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Parappanangadi Municipality",
                "localName": "പരപ്പനങ്ങാടി മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M101100",
                "ddrName": "Parappanangadi"
            },
            "address": "Parappanangadi,Malappuram-676303",
            "pincode": [
                676303
            ],
            "contactNumber": "0494-2410239",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PARAVUR",
            "code": "kl.paravur",
            "name": "Paravur Municipality",
            "description": "Paravur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kollam/paravur.jpg",
            "imageId": null,
            "domainUrl": "paravurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secyparavur@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Paravur Municipality",
                "localName": "പരവൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 2,
                "districtCode": "559",
                "districtName": "Kollam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.671094,
                "latitude": 8.81409,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M020200",
                "ddrName": "Paravur"
            },
            "address": "Paravur PO,Kollam-695301",
            "pincode": [
                695301
            ],
            "contactNumber": "0474-2512340",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PATHANAMTHITTA",
            "code": "kl.pathanamthitta",
            "name": "Pathanamthitta Municipality",
            "description": "Pathanamthitta",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/pathanamthitta/pathanamthitta.jpg",
            "imageId": null,
            "domainUrl": "pathanamthittamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "pathanamthittamunicipality2011@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Pathanamthitta Municipality",
                "localName": "പത്തനംതിട്ട മുനിസിപ്പാലിറ്റി",
                "districtid": 3,
                "districtCode": "564",
                "districtName": "Pathanamthitta",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.78678,
                "latitude": 9.264162,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M030300",
                "ddrName": "Pathanamthitta"
            },
            "address": "Municipal Office,Pathanamthitta- 689645",
            "pincode": [
                689645
            ],
            "contactNumber": "0468-2222249",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PATTAMBI",
            "code": "kl.pattambi",
            "name": "Pattambi Municipality",
            "description": "Pattambi",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/palakkad/pattambi.jpg",
            "imageId": null,
            "domainUrl": "pattambimunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "pattambimunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Pattambi Municipality",
                "localName": "പട്ടാമ്പി മുനിസിപ്പാലിറ്റി",
                "districtid": 9,
                "districtCode": "563",
                "districtName": "Palakkad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.1820544,
                "latitude": 10.8028583,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M090500",
                "ddrName": "Pattambi"
            },
            "address": "Pattambi P.O,Palakkad-679303",
            "pincode": [
                679303
            ],
            "contactNumber": "0466-2212233",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PAYYANNUR",
            "code": "kl.payyannur",
            "name": "Payyannur Municipality",
            "description": "Payyannur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/payyannur.jpg",
            "imageId": null,
            "domainUrl": "payyanurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secypynr@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Payyannur Municipality",
                "localName": "പയ്യന്നൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 75.21542,
                "latitude": 12.10917,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130400",
                "ddrName": "Payyannur"
            },
            "address": "Payyannur,Kannur",
            "pincode": [
                null
            ],
            "contactNumber": "4985202067",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PAYYOLI",
            "code": "kl.payyoli",
            "name": "Payyoli Municipality",
            "description": "Payyoli",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kozhikkode/payyoli.jpg",
            "imageId": null,
            "domainUrl": "payyolimunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "payyolimunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Payyoli Municipality",
                "localName": "പയ്യോളി മുനിസിപ്പാലിറ്റി",
                "districtid": 11,
                "districtCode": "561",
                "districtName": "Kozhikkode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.62194,
                "latitude": 11.51547,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M110300",
                "ddrName": "Payyoli"
            },
            "address": "Payyoli,Kozhikkode-673522",
            "pincode": [
                673522
            ],
            "contactNumber": "0496-2602043",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PERINTHALMANNA",
            "code": "kl.perinthalmanna",
            "name": "Perinthalmanna Municipality",
            "description": "Perinthalmanna",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/perinthalmanna.jpg",
            "imageId": null,
            "domainUrl": "perinthalmannamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "perinthalmannamunicipality@yahoo.co.in",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Perinthalmanna Municipality",
                "localName": "പെരിന്തല്‍മണ്ണ മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.240412,
                "latitude": 10.975912,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100100",
                "ddrName": "Perinthalmanna"
            },
            "address": "Perinthalmanna,Malappuram",
            "pincode": [
                null
            ],
            "contactNumber": "4933327363",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PERUMBAVOOR",
            "code": "kl.perumbavoor",
            "name": "Perumbavoor Municipality",
            "description": "Perumbavoor",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/perumbavoor.jpg",
            "imageId": null,
            "domainUrl": "perumbavoormunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "perumbavoormunicipality@gmail.com ",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Perumbavoor Municipality",
                "localName": "പെരുമ്പാവൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.475101,
                "latitude": 10.11543,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070700",
                "ddrName": "Perumbavoor"
            },
            "address": "Perumbavoor P O , Ernakulam-683542 ",
            "pincode": [
                683542
            ],
            "contactNumber": "0484-2522230",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PIRAVOM",
            "code": "kl.piravom",
            "name": "Piravom Municipality",
            "description": "Piravom",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/piravom.jpg",
            "imageId": null,
            "domainUrl": "piravommunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "piravommunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Piravom Municipality",
                "localName": "പിറവം മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.484767,
                "latitude": 9.877368,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M071300",
                "ddrName": "Piravom"
            },
            "address": "Piravom, Ernakulam- 686664",
            "pincode": [
                686664
            ],
            "contactNumber": "0485-2242339",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PONNANI",
            "code": "kl.ponnani",
            "name": "Ponnani Municipality",
            "description": "Ponnani",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/ponnani.jpg",
            "imageId": null,
            "domainUrl": "ponnanimunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "ponnanisecy@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Ponnani Municipality",
                "localName": "പൊന്നാനി മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 75.925858,
                "latitude": 10.767797,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100200",
                "ddrName": "Ponnani"
            },
            "address": "Ponnani P.O,.Malappuram,Pin-679586",
            "pincode": [
                679586
            ],
            "contactNumber": "0494-2666336",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_PUNALUR",
            "code": "kl.punalur",
            "name": "Punalur Municipality",
            "description": "Punalur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kollam/punalur.jpg",
            "imageId": null,
            "domainUrl": "punalurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secypnlr@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Punalur Municipality",
                "localName": "പുനലൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 2,
                "districtCode": "559",
                "districtName": "Kollam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.925136,
                "latitude": 9.0197795,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M020300",
                "ddrName": "Punalur"
            },
            "address": "Municipal Office,Punalur,Kollam - 691305",
            "pincode": [
                691305
            ],
            "contactNumber": "0475-2222683",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_RAMANATTUKARA",
            "code": "kl.ramanattukara",
            "name": "Ramanattukara Municipality",
            "description": "Ramanattukara",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kozhikkode/ramanattukara.jpg",
            "imageId": null,
            "domainUrl": "ramanattukaramunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "ramanattukaracity@gmail.com ",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Ramanattukara Municipality",
                "localName": "രാമനാട്ടുകര മുനിസിപ്പാലിറ്റി",
                "districtid": 11,
                "districtCode": "561",
                "districtName": "Kozhikkode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M110600",
                "ddrName": "Ramanattukara"
            },
            "address": "Ramanattukara Municipality, Parammal Rd\nRamanattukara, Kerala -673632",
            "pincode": [
                673632
            ],
            "contactNumber": "04952440095",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_SHORANUR",
            "code": "kl.shoranur",
            "name": "Shoranur Municipality",
            "description": "Shoranur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/palakkad/shoranur.jpg",
            "imageId": null,
            "domainUrl": "shornurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretaryshornur1@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Shoranur Municipality",
                "localName": "ഷൊര്‍ണ്ണൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 9,
                "districtCode": "563",
                "districtName": "Palakkad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.2738115,
                "latitude": 10.7684824,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M090200",
                "ddrName": "Shoranur"
            },
            "address": "Shornur,Palakkad-679121",
            "pincode": [
                679121
            ],
            "contactNumber": "0466-2222427",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_SREEKANDAPURAM",
            "code": "kl.sreekandapuram",
            "name": "Sreekandapuram Municipality",
            "description": "Sreekandapuram",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/sreekandapuram.jpg",
            "imageId": null,
            "domainUrl": "sreekandapurammunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "skpm.gov@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Sreekandapuram Municipality",
                "localName": "ശ്രീകണ്ഠാപുരം മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.50859,
                "latitude": 12.0448,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130600",
                "ddrName": "Sreekandapuram"
            },
            "address": "Sreekandapuram,Kannur-670631",
            "pincode": [
                670631
            ],
            "contactNumber": "0460-2230261",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_SULTHAN",
            "code": "kl.sulthan",
            "name": "Sulthan Bathery Municipality",
            "description": "Sulthan",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/wayanad/sulthan.jpg",
            "imageId": null,
            "domainUrl": "sulthanbatherymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "batherymunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Sulthan Bathery Municipality",
                "localName": "സുല്‍ത്താന്‍ ബത്തേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 12,
                "districtCode": "567",
                "districtName": "Wayanad",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.255239,
                "latitude": 11.662874,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M120300",
                "ddrName": "Sulthan"
            },
            "address": "Sulthanbathery,Wayanad,Pin-673592",
            "pincode": [
                673592
            ],
            "contactNumber": "04936-220240",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_TANUR",
            "code": "kl.tanur",
            "name": "Tanur Municipality",
            "description": "Tanur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/tanur.jpg",
            "imageId": null,
            "domainUrl": "tanurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "tanurgptanurblock@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Tanur Municipality",
                "localName": "താനൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.5249,
                "latitude": 10.5837,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M101200",
                "ddrName": "Tanur"
            },
            "address": "Tanur P.O,Malappuram",
            "pincode": [
                null
            ],
            "contactNumber": "4942440235",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_THALASSERY",
            "code": "kl.thalassery",
            "name": "Thalassery Municipality",
            "description": "Thalassery",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/thalassery.jpg",
            "imageId": null,
            "domainUrl": "thalasserymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarythalassery@yahoo.co.in",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Thalassery Municipality",
                "localName": "തലശ്ശേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 11.74805,
                "latitude": 75.48938,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130500",
                "ddrName": "Thalassery"
            },
            "address": "Thalassery P.O.,Kannur- 670101",
            "pincode": [
                670101
            ],
            "contactNumber": "0490-2320051",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_THALIPPARAMBA",
            "code": "kl.thalipparamba",
            "name": "Thalipparamba Municipality",
            "description": "Thalipparamba",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kannur/thalipparamba.jpg",
            "imageId": null,
            "domainUrl": "taliparambamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secthaliparamba@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Thalipparamba Municipality",
                "localName": "തളിപ്പറമ്പ് മുനിസിപ്പാലിറ്റി",
                "districtid": 13,
                "districtCode": "557",
                "districtName": "Kannur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 75.36532,
                "latitude": 12.03921,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M130200",
                "ddrName": "Thalipparamba"
            },
            "address": "Thaliparamba P.O,Kannur - 670141",
            "pincode": [
                670141
            ],
            "contactNumber": "0460-2202259",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_THIRUVALLA",
            "code": "kl.thiruvalla",
            "name": "Thiruvalla Municipality",
            "description": "Thiruvalla",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/pathanamthitta/thiruvalla.jpg",
            "imageId": null,
            "domainUrl": "thiruvallamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarytvla@yahoo.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Thiruvalla Municipality",
                "localName": "തിരുവല്ല മുനിസിപ്പാലിറ്റി",
                "districtid": 3,
                "districtCode": "564",
                "districtName": "Pathanamthitta",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.564289,
                "latitude": 9.3785323,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M030200",
                "ddrName": "Thiruvalla"
            },
            "address": "Thiruvalla,Pathanamthitta - 689101",
            "pincode": [
                689101
            ],
            "contactNumber": "04692-701315",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_THIRUVANANTHAPURAM",
            "code": "kl.thiruvananthapuram",
            "name": "Thiruvananthapuram Corporation",
            "description": "Thiruvananthapuram",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thiruvananthapuram/thiruvananthapuram.jpg",
            "imageId": null,
            "domainUrl": "https://tmc.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "tvpmcorpn@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Thiruvananthapuram Corporation",
                "localName": "തിരുവനന്തപുരം കോര്‍പ്പറേഷന്‍",
                "districtid": 1,
                "districtCode": "565",
                "districtName": "Thiruvananthapuram",
                "regionName": "Kerala",
                "ulbGrade": "Corporation",
                "longitude": 76.95284,
                "latitude": 8.50384,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "C010100",
                "ddrName": "Thiruvananthapuram"
            },
            "address": "Vikas Bhavan P O,Thiruvananthapuram - 695033",
            "pincode": [
                695033
            ],
            "contactNumber": "4712320821",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_THODUPUZHA",
            "code": "kl.thodupuzha",
            "name": "Thodupuzha Municipality",
            "description": "Thodupuzha",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/idukki/thodupuzha.jpg",
            "imageId": null,
            "domainUrl": "thodupuzhamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "munsectdpa@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Thodupuzha Municipality",
                "localName": "തൊടുപുഴ മുനിസിപ്പാലിറ്റി",
                "districtid": 6,
                "districtCode": "556",
                "districtName": "Idukki",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.712961,
                "latitude": 9.897354,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M060100",
                "ddrName": "Thodupuzha"
            },
            "address": "Thodupuzha P.O,Idukki - 685584",
            "pincode": [
                685584
            ],
            "contactNumber": "04862-222711",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_THRIKKAKARA",
            "code": "kl.thrikkakara",
            "name": "Thrikkakara Municipality",
            "description": "Thrikkakara",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/thrikkakara.jpg",
            "imageId": null,
            "domainUrl": "www.thrikkakara.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "sectkramncplty@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Thrikkakara Municipality",
                "localName": "തൃക്കാക്കര മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.34374,
                "latitude": 10.02094,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070900",
                "ddrName": "Thrikkakara"
            },
            "address": "Kakkanad P.O., Ernakulam-682030",
            "pincode": [
                682030
            ],
            "contactNumber": "0484-2422383",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_THRISSUR",
            "code": "kl.thrissur",
            "name": "Thrissur Corporation",
            "description": "Thrissur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/thrissur.jpg",
            "imageId": null,
            "domainUrl": "thrissurcorporation.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "thrissursecretary@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Thrissur Corporation",
                "localName": "തൃശ്ശൂര്‍ കോര്‍പ്പറേഷന്‍",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Corporation",
                "longitude": 76.214342,
                "latitude": 10.52094,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "C080100",
                "ddrName": "Thrissur"
            },
            "address": "Opp.Municipal Bus Stand,Thrissur-680001",
            "pincode": [
                680001
            ],
            "contactNumber": "0487-2422020",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_TIRUR",
            "code": "kl.tirur",
            "name": "Tirur Municipality",
            "description": "Tirur",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/tirur.jpg",
            "imageId": null,
            "domainUrl": "tirurmunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretarytirmun@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Tirur Municipality",
                "localName": "തിരൂര്‍ മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100400",
                "ddrName": "Tirur"
            },
            "address": "Trikkandiyur P.O,Malappuram - 676104",
            "pincode": [
                676104
            ],
            "contactNumber": "0494-2422303",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_TIRURANGADI",
            "code": "kl.tirurangadi",
            "name": "Tirurangadi Municipality",
            "description": "Tirurangadi",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/tirurangadi.jpg",
            "imageId": null,
            "domainUrl": "tirurangadimunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "tirurangadiurban@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Tirurangadi Municipality",
                "localName": "തിരൂരങ്ങാടി മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 75.9137,
                "latitude": 11.0424,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M101000",
                "ddrName": "Tirurangadi"
            },
            "address": "Tirurangadi,Malappuram - 676306",
            "pincode": [
                676306
            ],
            "contactNumber": "0494-2460339",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_TRIPUNITHURA",
            "code": "kl.tripunithura",
            "name": "Tripunithura Municipality",
            "description": "Tripunithura",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/tripunithura.jpg",
            "imageId": null,
            "domainUrl": "thrippunithuramunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "musectripunithura@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Tripunithura Municipality",
                "localName": "തൃപ്പൂണിത്തുറ മുനിസിപ്പാലിറ്റി",
                "districtid": 7,
                "districtCode": "555",
                "districtName": "Ernakulam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": 76.34499,
                "latitude": 9.95066,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M070400",
                "ddrName": "Tripunithura"
            },
            "address": "Thrippunithura P.O, Ernakulam",
            "pincode": [
                null
            ],
            "contactNumber": "0484-2780318",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_VADAKARA",
            "code": "kl.vadakara",
            "name": "Vadakara Municipality",
            "description": "Vadakara",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kozhikkode/vadakara.jpg",
            "imageId": null,
            "domainUrl": "vadakaramunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secretaryvatakara@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Vadakara Municipality",
                "localName": "വടകര മുനിസിപ്പാലിറ്റി",
                "districtid": 11,
                "districtCode": "561",
                "districtName": "Kozhikkode",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 1",
                "longitude": null,
                "latitude": null,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M110100",
                "ddrName": "Vadakara"
            },
            "address": "Vatakara Beach P.O.,Kozhikkode-673103",
            "pincode": [
                673103
            ],
            "contactNumber": "0496-2512378",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_VAIKOM",
            "code": "kl.vaikom",
            "name": "Vaikom Municipality",
            "description": "Vaikom",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/kottayam/vaikom.jpg",
            "imageId": null,
            "domainUrl": "vaikommunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "mailtovaikommunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Vaikom Municipality",
                "localName": "വൈക്കം മുനിസിപ്പാലിറ്റി",
                "districtid": 5,
                "districtCode": "560",
                "districtName": "Kottayam",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.391032,
                "latitude": 9.749518,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M050200",
                "ddrName": "Vaikom"
            },
            "address": "Vaikom P.O, Kottayam",
            "pincode": [
                null
            ],
            "contactNumber": "9019746581",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_VALANCHERY",
            "code": "kl.valanchery",
            "name": "Valanchery Municipality",
            "description": "Valanchery",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/malappuram/valanchery.jpg",
            "imageId": null,
            "domainUrl": "valancherymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "valancherymunicipality@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Valanchery Municipality",
                "localName": "വളാഞ്ചേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 10,
                "districtCode": "562",
                "districtName": "Malappuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.070362,
                "latitude": 10.890304,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M100900",
                "ddrName": "Valanchery"
            },
            "address": "Valanchery P.O.,Malappuram- 676552",
            "pincode": [
                676552
            ],
            "contactNumber": "0494-2644325",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_VARKALA",
            "code": "kl.varkala",
            "name": "Varkala Municipality",
            "description": "Varkala",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thiruvananthapuram/varkala.jpg",
            "imageId": null,
            "domainUrl": "varkalamunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "secyvarkala@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Varkala Municipality",
                "localName": "വര്‍ക്കല മുനിസിപ്പാലിറ്റി",
                "districtid": 1,
                "districtCode": "565",
                "districtName": "Thiruvananthapuram",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 2",
                "longitude": 76.7256327830809,
                "latitude": 8.73325923235827,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M010100",
                "ddrName": "Varkala"
            },
            "address": "Railway Station Road,Varkala- 695141",
            "pincode": [
                695141
            ],
            "contactNumber": "0470-2603115",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_WADAKANCHERY",
            "code": "kl.wadakanchery",
            "name": "Wadakanchery Municipality",
            "description": "Wadakanchery",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/wadakanchery.jpg",
            "imageId": null,
            "domainUrl": "wadakancherymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "wckymp@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Wadakanchery Municipality",
                "localName": "വടക്കാഞ്ചേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.245492,
                "latitude": 10.661915,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M080700",
                "ddrName": "Wadakanchery"
            },
            "address": "Wadakkanchery P.O.,Thrissur-680582",
            "pincode": [
                680582
            ],
            "contactNumber": "04884-232252",
            "pdfHeader": "",
            "pdfContactDetails": ""
        },
        {
            "i18nKey": "TENANT_TENANTS_KL_WADAKANCHERY",
            "code": "kl.wadakanchery",
            "name": "Wadakanchery Municipality",
            "description": "Wadakanchery",
            "logoId": "https://ulb-logos.s3.ap-south-1.amazonaws.com/thrissur/wadakanchery.jpg",
            "imageId": null,
            "domainUrl": "wadakancherymunicipality.lsgkerala.gov.in",
            "twitterUrl": null,
            "facebookUrl": null,
            "emailId": "wckymp@gmail.com",
            "OfficeTimings": {
                "Mon - Fri": "9.00 AM - 6.00 PM"
            },
            "city": {
                "name": "Wadakanchery Municipality",
                "localName": "വടക്കാഞ്ചേരി മുനിസിപ്പാലിറ്റി",
                "districtid": 8,
                "districtCode": "566",
                "districtName": "Thrissur",
                "regionName": "Kerala",
                "ulbGrade": "Municipality Grade 3",
                "longitude": 76.245492,
                "latitude": 10.661915,
                "captcha": null,
                "shapeFileLocation": null,
                "code": "M080700",
                "ddrName": "Wadakanchery"
            },
            "address": "Wadakkanchery P.O.,Thrissur-680582",
            "pincode": [
                680582
            ],
            "contactNumber": "04884-232252",
            "pdfHeader": "",
            "pdfContactDetails": ""
        }
    ],
    "revenue_localities": {},
    "localities": {}
}

  if (isLoading) {
    return <Loader page={true} />;
  }

  const i18n = getI18n();
  return (
    <Provider store={getStore(tempInitData, moduleReducers(tempInitData))}>
      <Router>
        <Body>
          <DigitApp
            initData={tempInitData}
            stateCode={stateCode}
            modules={tempInitData?.modules}
            appTenants={tempInitData.tenants}
            logoUrl={tempInitData?.stateInfo?.logoUrl}
          />
        </Body>
      </Router>
    </Provider>
  );
};

export const DigitUI = ({ stateCode, registry, enabledModules, moduleReducers }) => {
  const userType = Digit.UserService.getType();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 60 * 1000,
        cacheTime: 50 * 60 * 1000,
        retryDelay: attemptIndex => Infinity
        /*
          enable this to have auto retry incase of failure
          retryDelay: attemptIndex => Math.min(1000 * 3 ** attemptIndex, 60000)
         */
      },
    },
  });

  const ComponentProvider = Digit.Contexts.ComponentProvider;
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]);

  return (
    <div>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ComponentProvider.Provider value={registry}>
            <DigitUIWrapper stateCode={stateCode} enabledModules={enabledModules} moduleReducers={moduleReducers} />
          </ComponentProvider.Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
};

const componentsToRegister = {
  SelectOtp
}

export const initCoreComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
}
