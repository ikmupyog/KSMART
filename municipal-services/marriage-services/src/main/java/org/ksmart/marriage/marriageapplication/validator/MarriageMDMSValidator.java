package org.ksmart.marriage.marriageapplication.validator;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertPDFRequest;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;

/**
 * Creates Jasmine 30.03.2023
 */
@Component
@Slf4j
public class MarriageMDMSValidator {

    public void validateMarriageMDMSData(MarriageDetailsRequest request, Object mdmsdata) {
        Map<String, String> errorMap = new HashMap<>();
        Map<String, List<String>> masterData = getAttributeValues(mdmsdata);

        String[] masterArray = { MarriageConstants.TENANTS, MarriageConstants.GENDERTYPE,
                MarriageConstants.MARITAL_STATUS, MarriageConstants.MARRIAGE_TYPE,
                MarriageConstants.MARRIAGE_PLACE_TYPE };
        // MarriageConstants.MARRIAGE_PLACE
        // System.out.println("Jasminemdmsdata"+mdmsdata)

        validateIfMasterPresent(masterArray, masterData);

        if (!masterData.get(MarriageConstants.TENANTS)
                .contains(request.getMarriageDetails().get(0).getTenantid()))
            errorMap.put("INVALID TENAND ID", "The tenand id  " + request.getMarriageDetails().get(0).getTenantid() +
                    " does not exists");

        if (request.getMarriageDetails().get(0).getGroomDetails().getGender() != null) {
            if (!masterData.get(MarriageConstants.GENDERTYPE)
                    .contains(request.getMarriageDetails().get(0).getGroomDetails().getGender()))
                errorMap.put("GROOM:INVALID GENDER TYPE", "The gender of the groom " +
                        request.getMarriageDetails().get(0).getGroomDetails().getGender() + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid() != null) {
            if (!masterData.get(MarriageConstants.MARITAL_STATUS)
                    .contains(request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid()))
                errorMap.put("GROOM:MARITAL STATUS INVALID", "The marital status of groom  " +
                        request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid() + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getMarriageType() != null) {
            if (!masterData.get(MarriageConstants.MARRIAGE_TYPE)
                    .contains(request.getMarriageDetails().get(0).getMarriageType()))
                errorMap.put("TYPE OF MARRIAGE INVALID", "The marriage type " +
                        request.getMarriageDetails().get(0).getMarriageType() + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getPlacetype() != null) {
            if (!masterData.get(MarriageConstants.MARRIAGE_PLACE_TYPE)
                    .contains(request.getMarriageDetails().get(0).getPlacetype()))
                errorMap.put(" MARRIAGE PLACE TYPE INVALID ", "The marriage place type " +
                        request.getMarriageDetails().get(0).getPlacetype() + " is invalid");
        }

        // Jasmine 03.04.2023

        if (request.getMarriageDetails().get(0).getBrideDetails().getGender() != null) {
            if (!masterData.get(MarriageConstants.GENDERTYPE)
                    .contains(request.getMarriageDetails().get(0).getBrideDetails().getGender()))
                errorMap.put("BRIDE:INVALID GENDER TYPE", "The gender of the groom " +
                        request.getMarriageDetails().get(0).getBrideDetails().getGender() + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getBrideDetails().getMaritalstatusid() != null) {
            if (!masterData.get(MarriageConstants.MARITAL_STATUS)
                    .contains(request.getMarriageDetails().get(0).getBrideDetails().getMaritalstatusid()))
                errorMap.put("BRIDE:MARITAL STATUS INVALID", "The marital status of groom  " +
                        request.getMarriageDetails().get(0).getBrideDetails().getMaritalstatusid() + " is invalid");
        }
        // MASTER DETAILS VALIDATION

        if (request.getMarriageDetails().get(0).getDistrictid() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getDistrictid()))
                errorMap.put(" DISTRICT NAME INVALID", "The district name of marriage place " +
                        request.getMarriageDetails().get(0).getDistrictid() + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getTalukid() != null) {
            if (!masterData.get(MarriageConstants.TALUK)
                    .contains(request.getMarriageDetails().get(0).getTalukid()))
                errorMap.put(" TALUK NAME INVALID", "The taluk name of marriage place " +
                        request.getMarriageDetails().get(0).getTalukid() + " is invalid");
        }
        // have to change as villageId
        if (request.getMarriageDetails().get(0).getVillageName() != null) {
            if (!masterData.get(MarriageConstants.VILLAGE)
                    .contains(request.getMarriageDetails().get(0).getVillageName()))
                errorMap.put(" VILLAGE NAME INVALID", "The village name of marriage place " +
                        request.getMarriageDetails().get(0).getVillageName() + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getLbtype() != null) {
            if (!masterData.get(MarriageConstants.LBTYPE)
                    .contains(request.getMarriageDetails().get(0).getLbtype()))
                errorMap.put(" LBTYPE INVALID", "The LBTYpe  of marriage place " +
                        request.getMarriageDetails().get(0).getLbtype() + " is invalid");
        }
        // if(request.getMarriageDetails().get(0).getWard_code() != null) {
        // if(!masterData.get(MarriageConstants.WARD)
        // .contains(request.getMarriageDetails().get(0).getWard_code()))
        // errorMap.put(" LB TYPE INVALID", "The LBTYpe of marriage place " +
        // request.getMarriageDetails().get(0).getWard_code()+ " is invalid");
        // }

        // ADDRESS VALIDATION
        // Anu.l.s
        // ***********************************groom PERMANENT address detail*********************************************************//
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermtaddressCountry() != null) {
            if (!masterData.get(MarriageConstants.COUNTRY)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getPermtaddressCountry()))
                errorMap.put("GROOM PERMANENT ADDRESS: COUNTRY NAME INVALID", "The country name of  groom " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPermtaddressCountry()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermtaddressStateName() != null) {
            if (!masterData.get(MarriageConstants.STATE)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getPermtaddressStateName()))
                errorMap.put("GROOM PERMANENT ADDRESS: STATE NAME INVALID", "The state name of  groom " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPermtaddressStateName()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrDistrict() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
                            .getPermntInKeralaAdrDistrict()))
                errorMap.put("GROOM PERMANENT ADDRESS: DISTRICT NAME INVALID",
                        "groom district inside kerala " +
                                request.getMarriageDetails().get(0).getGroomAddressDetails()
                                        .getPermntInKeralaAdrDistrict()
                                + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOutsideKeralaDistrict() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
                            .getPermntOutsideKeralaDistrict()))
                errorMap.put("GROOM PERMANENT ADDRESS: DISTRICT  INVALID", "groom district outside kerala is  " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOutsideKeralaDistrict()
                        + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrTaluk() != null) {
            if (!masterData.get(MarriageConstants.TALUK)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrTaluk()))
                errorMap.put("GROOM PERMANENT ADDRESS: TALUK NAME INVALID", "groom taluk inside kerala " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrTaluk()
                        + " is invalid");
        }

        // if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOutsideKeralaTaluk() != null) {
        //     if (!masterData.get(MarriageConstants.TALUK)
        //             .contains(
        //                     request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOutsideKeralaTaluk()))
        //         errorMap.put("GROOM PERMANENT ADDRESS: TALUK NAME INVALID", "groom taluk outside kerala  " +
        //                 request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOutsideKeralaTaluk()
        //                 + " is invalid");
        // }
        // if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOutsideKeralaVillage() != null) {
        //     if (!masterData.get(MarriageConstants.VILLAGE)
        //             .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
        //                     .getPermntOutsideKeralaVillage()))
        //         errorMap.put("GROOM PERMANENT ADDRESS: VILLAGE NAME INVALID",
        //                 "groom village outside kerala " +
        //                         request.getMarriageDetails().get(0).getGroomAddressDetails()
        //                                 .getPermntOutsideKeralaVillage()
        //                         + " is invalid");
        // }
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrVillage() != null) {
            if (!masterData.get(MarriageConstants.VILLAGE)
                    .contains(
                            request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrVillage()))
                errorMap.put("GROOM PERMANENT ADDRESS: VILLAGE NAME INVALID",
                        "groom village inside kerala  " +
                                request.getMarriageDetails().get(0).getGroomAddressDetails()
                                        .getPermntInKeralaAdrVillage()
                                + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrLBName() != null) {
            if (!masterData.get(MarriageConstants.TENANTS)
                    .contains(
                            request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrLBName()))
                errorMap.put("GROOM PERMANENT ADDRESS: LB NAME INVALID", "groom lbname inside kerala  " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrLBName()
                        + " is invalid");
        }
        // System.out.println("ousidetaluk"+request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaWardNo()
        // );
        // if
        // (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaWardNo()
        // != null) {
        // if (!masterData.get(MarriageConstants.WARD)
        // .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaWardNo()))
        // errorMap.put("GROOM PERMANENT ADDRESS: WARD INVALID", "The ward of groom " +
        // request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaWardNo()
        // + " is invalid");
        // }
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
            if (!masterData.get(MarriageConstants.POSTOFFICE)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
                            .getPermntInKeralaAdrPostOffice()))
                errorMap.put("GROOM PERMANENT ADDRESS: POST OFFICE INVALID",
                        "groom post office inside kerala is invalid" +
                                request.getMarriageDetails().get(0).getGroomAddressDetails()
                                        .getPermntInKeralaAdrPostOffice()
                                + " is invalid");
        }

        //************************************************* */ GROOM PRESENT ADDRESS***************************************************//
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentaddressCountry() != null) {
          //  System.out.println("isExists");
            if (!masterData.get(MarriageConstants.COUNTRY)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentaddressCountry()))
                errorMap.put("GROOM PRESENT ADDRESS: COUNTRY NAME INVALID", "The country name of  groom " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentaddressCountry()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentaddressStateName() != null) {
            if (!masterData.get(MarriageConstants.STATE)
                    .contains(
                            request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentaddressStateName()))
                errorMap.put("GROOM PRESENT ADDRESS: STATE NAME INVALID", "The state name of  groom " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentaddressStateName()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaDistrict() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
                            .getPresentInsideKeralaDistrict()))
                errorMap.put("GROOM PRESENT ADDRESS: DISTRICT INVALID", "groom district inside kerala " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaDistrict()
                        + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOutsideKeralaDistrict() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
                            .getPresentOutsideKeralaDistrict()))
                errorMap.put("GROOM PRESENT ADDRESS: DISTRICT  INVALID", "groom district outside kerala " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOutsideKeralaDistrict()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaTaluk() != null) {
            if (!masterData.get(MarriageConstants.TALUK)
                    .contains(
                            request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaTaluk()))
                errorMap.put("GROOM PRESENT ADDRESS: TALUK NAME INVALID", "groom taluk inside kerala " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaTaluk()
                        + " is invalid");
        }
        // if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOutsideKeralaTalukName() != null) {
        //     if (!masterData.get(MarriageConstants.TALUK)
        //             .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
        //                     .getPresentOutsideKeralaTalukName()))
        //         errorMap.put("GROOM PRESENT ADDRESS: TALUK NAME INVALID", "groom taluk outside kerala " +
        //                 request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOutsideKeralaTalukName()
        //                 + " is invalid");
        // }
        // if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOutsideKeralaVillageName() != null) {
        //     if (!masterData.get(MarriageConstants.VILLAGE)
        //             .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
        //                     .getPresentOutsideKeralaVillageName()))
        //         errorMap.put("GROOM PRESENT ADDRESS: VILLAGE NAME INVALID", "groom village outdide kerala " +
        //                 request.getMarriageDetails().get(0).getGroomAddressDetails()
        //                         .getPresentOutsideKeralaVillageName()
        //                 + " is invalid");
        // }
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaVillage() != null) {
            if (!masterData.get(MarriageConstants.VILLAGE)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
                            .getPresentInsideKeralaVillage()))
                errorMap.put("GROOM PRESENT ADDRESS: VILLAGE NAME INVALID", "groom village inside kerala" +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaVillage()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaLBName() != null) {
            if (!masterData.get(MarriageConstants.TENANTS)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaLBName()))
                errorMap.put("GROOM PRESENT ADDRESS: LB NAME INVALID", "groom lbname inside kerala " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaLBName()
                        + " is invalid");
        }
        // //
        // System.out.println("ousidetaluk"+request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaWardNo()
        // );
        // // if
        // (request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaWardNo()
        // != null) {
        // // if (!masterData.get(MarriageConstants.WARD)
        // //
        // .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaWardNo()))
        // // errorMap.put("GROOM PERMANENT ADDRESS: WARD INVALID", "The ward of groom "
        // +
        // //
        // request.getMarriageDetails().get(0).getGroomAddressDetails().getPermntInKeralaWardNo()
        // // + " is invalid");
        // // }
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaPostOffice() != null) {
            if (!masterData.get(MarriageConstants.POSTOFFICE)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails()
                            .getPresentInsideKeralaPostOffice()))
                errorMap.put("GROOM PRESENT ADDRESS: POST OFFICE INVALID", "groom post office inside kerala " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getPresentInsideKeralaPostOffice()
                        + " is invalid");
        }
        //****************************** */ end of groom address details***************************************//
        //****************************** */ bride PERMANENT address details********************************************//
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermtaddressCountry() != null) {
            if (!masterData.get(MarriageConstants.COUNTRY)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails().getPermtaddressCountry()))
                errorMap.put("BRIDE PERMANENT ADDRESS: COUNTRY NAME INVALID", "The country name of  bride " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPermtaddressCountry()
                        + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermtaddressStateName() != null) {
            if (!masterData.get(MarriageConstants.STATE)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails().getPermtaddressStateName()))
                errorMap.put("BRIDE PERMANENT ADDRESS: STATE NAME INVALID", "The state name of  bride " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPermtaddressStateName()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrDistrict() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
                            .getPermntInKeralaAdrDistrict()))
                errorMap.put("BRIDE PERMANENT ADDRESS: DISTRICT NAME INVALID", "bride district inside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrDistrict()
                        + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOutsideKeralaDistrict() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
                            .getPermntOutsideKeralaDistrict()))
                errorMap.put("BRIDE PERMANENT ADDRESS: DISTRICT  INVALID", "bride district ouside kerala" +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOutsideKeralaDistrict()
                        + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrTaluk() != null) {
            if (!masterData.get(MarriageConstants.TALUK)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrTaluk()))
                errorMap.put("BRIDE PERMANENT ADDRESS: TALUK NAME INVALID", "bride taluk inside kerala" +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrTaluk()
                        + " is invalid");
        }

        // if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOutsideKeralaTaluk() != null) {
        //     if (!masterData.get(MarriageConstants.TALUK)
        //             .contains(
        //                     request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOutsideKeralaTaluk()))
        //         errorMap.put("BRIDE PERMANENT ADDRESS: TALUK NAME INVALID", "bride taluk ouside kerala " +
        //                 request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOutsideKeralaTaluk()
        //                 + " is invalid");
        // }
        // if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOutsideKeralaVillage() != null) {
        //     if (!masterData.get(MarriageConstants.VILLAGE)
        //             .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
        //                     .getPermntOutsideKeralaVillage()))
        //         errorMap.put("BRIDE PERMANENT ADDRESS: VILLAGE NAME INVALID", "bride village outside kerala " +
        //                 request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOutsideKeralaVillage()
        //                 + " is invalid");
        // }
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrVillage() != null) {
            if (!masterData.get(MarriageConstants.VILLAGE)
                    .contains(
                            request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrVillage()))
                errorMap.put("BRIDE PERMANENT ADDRESS: VILLAGE NAME INVALID", "bride village inside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrVillage()
                        + " is invalid");
        }
       System.out.println("LBName"+request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrLBName());
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrLBName() != null) {
            if (!masterData.get(MarriageConstants.TENANTS)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrLBName()))
                errorMap.put("BRIDE PERMANENT ADDRESS: LB NAME INVALID", "bride lbname inside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrLBName()
                        + " is invalid");
        }
        // //
        // System.out.println("ousidetaluk"+request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentWardNo()
        // // );
        // // if
        // (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentWardNo()
        // != null) {
        // if (!masterData.get(MarriageConstants.WARD)
        // .contains(request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentWardNo()))
        // errorMap.put("BRIDE PERMANENT ADDRESS: WARD INVALID", "The ward of bride " +
        // request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentWardNo()
        // + " is invalid");
        // }
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
            if (!masterData.get(MarriageConstants.POSTOFFICE)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
                            .getPermntInKeralaAdrPostOffice()))
                errorMap.put("BRIDE PERMANENT ADDRESS: POST OFFICE INVALID", "bride post office inside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaAdrPostOffice()
                        + " is invalid");
        }

        // BRIDE PRESENT ADDRESS////////////
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentaddressCountry() != null) {
          //  System.out.println("isExists");
            if (!masterData.get(MarriageConstants.COUNTRY)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentaddressCountry()))
                errorMap.put("BRIDE PRESENT ADDRESS: COUNTRY NAME INVALID", "The country name of  bride " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentaddressCountry()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentaddressStateName() != null) {
            if (!masterData.get(MarriageConstants.STATE)
                    .contains(
                            request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentaddressStateName()))
                errorMap.put("BRIDE PRESENT ADDRESS: STATE NAME INVALID", "The state name of  bride " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentaddressStateName()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaDistrict() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
                            .getPresentInsideKeralaDistrict()))
                errorMap.put("BRIDE PRESENT ADDRESS: DISTRICT INVALID", "bride district inside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaDistrict()
                        + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOutsideKeralaDistrict() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
                            .getPresentOutsideKeralaDistrict()))
                errorMap.put("BRIDE PRESENT ADDRESS: DISTRICT  INVALID", "bride district outside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOutsideKeralaDistrict()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaTaluk() != null) {
            if (!masterData.get(MarriageConstants.TALUK)
                    .contains(
                            request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaTaluk()))
                errorMap.put("BRIDE PRESENT ADDRESS: TALUK NAME INVALID", "bride taluk inside kerala" +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaTaluk()
                        + " is invalid");
        }
        // if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOutsideKeralaTalukName() != null) {
        //     if (!masterData.get(MarriageConstants.TALUK)
        //             .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
        //                     .getPresentOutsideKeralaTalukName()))
        //         errorMap.put("BRIDE PRESENT ADDRESS: TALUK NAME INVALID", "bride taluk outside kerala " +
        //                 request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOutsideKeralaTalukName()
        //                 + " is invalid");
        // }
        // if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOutsideKeralaVillageName() != null) {
        //     if (!masterData.get(MarriageConstants.VILLAGE)
        //             .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
        //                     .getPresentOutsideKeralaVillageName()))
        //         errorMap.put("BRIDE PRESENT ADDRESS: VILLAGE NAME INVALID", "bride village outside kerala" +
        //                 request.getMarriageDetails().get(0).getBrideAddressDetails()
        //                         .getPresentOutsideKeralaVillageName()
        //                 + " is invalid");
        // }
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaVillage() != null) {
            if (!masterData.get(MarriageConstants.VILLAGE)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
                            .getPresentInsideKeralaVillage()))
                errorMap.put("BRIDE PRESENT ADDRESS: VILLAGE NAME INVALID", "bride village inside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaVillage()
                        + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaLBName() != null) {
            if (!masterData.get(MarriageConstants.TENANTS)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
                            .getPresentInsideKeralaLBName()))
                errorMap.put("BRIDE PRESENT ADDRESS: LB NAME INVALID", "bride lbname inside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaLBName()
                        + " is invalid");
        }

        // System.out.println("ousidetaluk"+request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaWardNo()
        // );
        // // if
        // (request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaWardNo()
        // != null) {
        // // if (!masterData.get(MarriageConstants.WARD)
        // //
        // .contains(request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaWardNo()))
        // // errorMap.put("GROOM PERMANENT ADDRESS: WARD INVALID", "The ward of bride "
        // +
        // //
        // request.getMarriageDetails().get(0).getBrideAddressDetails().getPermntInKeralaWardNo()
        // // + " is invalid");
        // }
        if (request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaPostOffice() != null) {
            if (!masterData.get(MarriageConstants.POSTOFFICE)
                    .contains(request.getMarriageDetails().get(0).getBrideAddressDetails()
                            .getPresentInsideKeralaPostOffice()))
                errorMap.put("BRIDE PRESENT ADDRESS: POST OFFICE INVALID", "bride post office inside kerala " +
                        request.getMarriageDetails().get(0).getBrideAddressDetails().getPresentInsideKeralaPostOffice()
                        + " is invalid");
        }
        //********************************* * end of bride address details************************************************//

        // if(request.getMarriageDetails().get(0).getTalukid() != null) {
        // if(!masterData.get(MarriageConstants.TALUK)
        // .contains(request.getMarriageDetails().get(0).getTalukid()))
        // errorMap.put(" TALUK NAME INVALID", "The taluk name of marriage place " +
        // request.getMarriageDetails().get(0).getTalukid()+ " is invalid");
        // }
        // //have to change as villageId
        // if(request.getMarriageDetails().get(0).getVillage_name() != null) {
        // if(!masterData.get(MarriageConstants.VILLAGE)
        // .contains(request.getMarriageDetails().get(0).getVillage_name()))
        // errorMap.put(" VILLAGE NAME INVALID", "The village name of marriage place " +
        // request.getMarriageDetails().get(0).getVillage_name()+ " is invalid");
        // }
        // if(request.getMarriageDetails().get(0).getLbtype() != null) {
        // if(!masterData.get(MarriageConstants.LBTYPE)
        // .contains(request.getMarriageDetails().get(0).getLbtype()))
        // errorMap.put(" LBTYPE INVALID", "The LBTYpe of marriage place " +
        // request.getMarriageDetails().get(0).getLbtype()+ " is invalid");

        if (!CollectionUtils.isEmpty(errorMap))
            throw new CustomException(errorMap);

    }

    // Rakhi S ikm on 14.02.2023
    private Map<String, List<String>> getAttributeValues(Object mdmsdata) {
        List<String> modulepaths = Arrays.asList(
                //MarriageConstants.CR_MDMS_TENANTS_CODE_JSONPATH,
                MarriageConstants.TENANT_JSONPATH,
                MarriageConstants.COMMON_MASTER_JSONPATH,
                MarriageConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
        // System.out.println("Jasminemodulepaths"+modulepaths);
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata, modulepath));
               // log.error("jsonpath1" + JsonPath.read(mdmsdata, modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data", e);
                throw new CustomException(MarriageConstants.INVALID_TENANT_ID_MDMS_KEY,
                        MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
            }

        });
        return mdmsResMap;
    }

    // Rakhi S ikm on 14.02.2023
    private void validateIfMasterPresent(String[] masterNames, Map<String, List<String>> codes) {
        Map<String, String> errorMap = new HashMap<>();
        for (String masterName : masterNames) {
            if (!codes.containsKey(masterName)) {
                errorMap.put("MDMS DATA ERROR ", "Unable to fetch " + masterName + " codes from MDMS ");
            }
        }
        if (!errorMap.isEmpty())
            throw new CustomException(errorMap);
    }

//    public void getMarriageMDMSData(MarriageCertPDFRequest request, Object mdmsdata) {
//        Map<String, String> errorMap = new HashMap<>();
//        Map<String, List<String>> masterData = getAttributeValues(mdmsdata);
//        System.out.println(masterData);


//        if (masterData.get(MarriageConstants.TENANTS)
//                .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTenantid()))
//            request.getMarriageCertificate().get(0).setTenantNameEn();
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getGender() != null) {
//            if (!masterData.get(MarriageConstants.GENDERTYPE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getGender()))
//                errorMap.put("GROOM:INVALID GENDER TYPE", "The gender of the groom " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getGender() + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMaritalstatusid() != null) {
//            if (!masterData.get(MarriageConstants.MARITAL_STATUS)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMaritalstatusid()))
//                errorMap.put("GROOM:MARITAL STATUS INVALID", "The marital status of groom  " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMaritalstatusid() + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriage_type() != null) {
//            if (!masterData.get(MarriageConstants.MARRIAGE_TYPE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriage_type()))
//                errorMap.put("GROOM:TYPE OF MARRIAGE INVALID", "The marriage type " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriage_type() + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype() != null) {
//            if (!masterData.get(MarriageConstants.MARRIAGE_PLACE_TYPE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()))
//                errorMap.put("GROOM: MARRIAGE PLACE TYPE INVALID ", "The marriage place type " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype() + " is invalid");
//        }
//
//        // Jasmine 03.04.2023
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getGender() != null) {
//            if (!masterData.get(MarriageConstants.GENDERTYPE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getGender()))
//                errorMap.put("BRIDE:INVALID GENDER TYPE", "The gender of the groom " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getGender() + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getMaritalstatusid() != null) {
//            if (!masterData.get(MarriageConstants.MARITAL_STATUS)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMaritalstatusid()))
//                errorMap.put("BRIDE:MARITAL STATUS INVALID", "The marital status of groom  " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMaritalstatusid() + " is invalid");
//        }
//        // MASTER DETAILS VALIDATION
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getDistrictid() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getDistrictid()))
//                errorMap.put(" DISTRICT NAME INVALID", "The district name of marriage place " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getDistrictid() + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTalukid() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTalukid()))
//                errorMap.put(" TALUK NAME INVALID", "The taluk name of marriage place " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTalukid() + " is invalid");
//        }
//        // have to change as villageId
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getVillage_name() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getVillage_name()))
//                errorMap.put(" VILLAGE NAME INVALID", "The village name of marriage place " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getVillage_name() + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLbtype() != null) {
//            if (!masterData.get(MarriageConstants.LBTYPE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLbtype()))
//                errorMap.put(" LBTYPE INVALID", "The LBTYpe  of marriage place " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLbtype() + " is invalid");
//        }
//
//        // ***********************************groom PERMANENT address detail*********************************************************//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermtaddressCountry() != null) {
//            if (!masterData.get(MarriageConstants.COUNTRY)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermtaddressCountry()))
//                errorMap.put("GROOM PERMANENT ADDRESS: COUNTRY NAME INVALID", "The country name of  groom " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermtaddressCountry()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermtaddressStateName() != null) {
//            if (!masterData.get(MarriageConstants.STATE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermtaddressStateName()))
//                errorMap.put("GROOM PERMANENT ADDRESS: STATE NAME INVALID", "The state name of  groom " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermtaddressStateName()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrDistrict() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPermntInKeralaAdrDistrict()))
//                errorMap.put("GROOM PERMANENT ADDRESS: DISTRICT NAME INVALID",
//                        "groom district inside kerala " +
//                                request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                                        .getPermntInKeralaAdrDistrict()
//                                + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntOutsideKeralaDistrict() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPermntOutsideKeralaDistrict()))
//                errorMap.put("GROOM PERMANENT ADDRESS: DISTRICT  INVALID", "groom district outside kerala is  " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntOutsideKeralaDistrict()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrTaluk() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrTaluk()))
//                errorMap.put("GROOM PERMANENT ADDRESS: TALUK NAME INVALID", "groom taluk inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrTaluk()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntOutsideKeralaTaluk() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntOutsideKeralaTaluk()))
//                errorMap.put("GROOM PERMANENT ADDRESS: TALUK NAME INVALID", "groom taluk outside kerala  " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntOutsideKeralaTaluk()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntOutsideKeralaVillage() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPermntOutsideKeralaVillage()))
//                errorMap.put("GROOM PERMANENT ADDRESS: VILLAGE NAME INVALID",
//                        "groom village outside kerala " +
//                                request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                                        .getPermntOutsideKeralaVillage()
//                                + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrVillage() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrVillage()))
//                errorMap.put("GROOM PERMANENT ADDRESS: VILLAGE NAME INVALID",
//                        "groom village inside kerala  " +
//                                request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                                        .getPermntInKeralaAdrVillage()
//                                + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrLBName() != null) {
//            if (!masterData.get(MarriageConstants.TENANTS)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrLBName()))
//                errorMap.put("GROOM PERMANENT ADDRESS: LB NAME INVALID", "groom lbname inside kerala  " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrLBName()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
//            if (!masterData.get(MarriageConstants.POSTOFFICE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPermntInKeralaAdrPostOffice()))
//                errorMap.put("GROOM PERMANENT ADDRESS: POST OFFICE INVALID",
//                        "groom post office inside kerala is invalid" +
//                                request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                                        .getPermntInKeralaAdrPostOffice()
//                                + " is invalid");
//        }
//
//        //************************************************* */ GROOM PRESENT ADDRESS***************************************************//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentaddressCountry() != null) {
//            //  System.out.println("isExists");
//            if (!masterData.get(MarriageConstants.COUNTRY)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentaddressCountry()))
//                errorMap.put("GROOM PRESENT ADDRESS: COUNTRY NAME INVALID", "The country name of  groom " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentaddressCountry()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentaddressStateName() != null) {
//            if (!masterData.get(MarriageConstants.STATE)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentaddressStateName()))
//                errorMap.put("GROOM PRESENT ADDRESS: STATE NAME INVALID", "The state name of  groom " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentaddressStateName()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaDistrict() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPresentInsideKeralaDistrict()))
//                errorMap.put("GROOM PRESENT ADDRESS: DISTRICT INVALID", "groom district inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaDistrict()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentOutsideKeralaDistrict() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPresentOutsideKeralaDistrict()))
//                errorMap.put("GROOM PRESENT ADDRESS: DISTRICT  INVALID", "groom district outside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentOutsideKeralaDistrict()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaTaluk() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaTaluk()))
//                errorMap.put("GROOM PRESENT ADDRESS: TALUK NAME INVALID", "groom taluk inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaTaluk()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentOutsideKeralaTalukName() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPresentOutsideKeralaTalukName()))
//                errorMap.put("GROOM PRESENT ADDRESS: TALUK NAME INVALID", "groom taluk outside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentOutsideKeralaTalukName()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentOutsideKeralaVillageName() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPresentOutsideKeralaVillageName()))
//                errorMap.put("GROOM PRESENT ADDRESS: VILLAGE NAME INVALID", "groom village outdide kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                                .getPresentOutsideKeralaVillageName()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaVillage() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPresentInsideKeralaVillage()))
//                errorMap.put("GROOM PRESENT ADDRESS: VILLAGE NAME INVALID", "groom village inside kerala" +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaVillage()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaLBName() != null) {
//            if (!masterData.get(MarriageConstants.TENANTS)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaLBName()))
//                errorMap.put("GROOM PRESENT ADDRESS: LB NAME INVALID", "groom lbname inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaLBName()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaPostOffice() != null) {
//            if (!masterData.get(MarriageConstants.POSTOFFICE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails()
//                            .getPresentInsideKeralaPostOffice()))
//                errorMap.put("GROOM PRESENT ADDRESS: POST OFFICE INVALID", "groom post office inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPresentInsideKeralaPostOffice()
//                        + " is invalid");
//        }
//        //****************************** */ end of groom address details***************************************//
//        //****************************** */ bride PERMANENT address details********************************************//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermtaddressCountry() != null) {
//            if (!masterData.get(MarriageConstants.COUNTRY)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermtaddressCountry()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: COUNTRY NAME INVALID", "The country name of  bride " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermtaddressCountry()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermtaddressStateName() != null) {
//            if (!masterData.get(MarriageConstants.STATE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermtaddressStateName()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: STATE NAME INVALID", "The state name of  bride " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermtaddressStateName()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrDistrict() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPermntInKeralaAdrDistrict()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: DISTRICT NAME INVALID", "bride district inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrDistrict()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntOutsideKeralaDistrict() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPermntOutsideKeralaDistrict()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: DISTRICT  INVALID", "bride district ouside kerala" +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntOutsideKeralaDistrict()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrTaluk() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrTaluk()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: TALUK NAME INVALID", "bride taluk inside kerala" +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrTaluk()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntOutsideKeralaTaluk() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntOutsideKeralaTaluk()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: TALUK NAME INVALID", "bride taluk ouside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntOutsideKeralaTaluk()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntOutsideKeralaVillage() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPermntOutsideKeralaVillage()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: VILLAGE NAME INVALID", "bride village outside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntOutsideKeralaVillage()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrVillage() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrVillage()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: VILLAGE NAME INVALID", "bride village inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrVillage()
//                        + " is invalid");
//        }
//        System.out.println("LBName"+request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrLBName());
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrLBName() != null) {
//            if (!masterData.get(MarriageConstants.TENANTS)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrLBName()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: LB NAME INVALID", "bride lbname inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrLBName()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
//            if (!masterData.get(MarriageConstants.POSTOFFICE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPermntInKeralaAdrPostOffice()))
//                errorMap.put("BRIDE PERMANENT ADDRESS: POST OFFICE INVALID", "bride post office inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrPostOffice()
//                        + " is invalid");
//        }
//
//        // BRIDE PRESENT ADDRESS////////////
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentaddressCountry() != null) {
//            //  System.out.println("isExists");
//            if (!masterData.get(MarriageConstants.COUNTRY)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentaddressCountry()))
//                errorMap.put("BRIDE PRESENT ADDRESS: COUNTRY NAME INVALID", "The country name of  bride " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentaddressCountry()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentaddressStateName() != null) {
//            if (!masterData.get(MarriageConstants.STATE)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentaddressStateName()))
//                errorMap.put("BRIDE PRESENT ADDRESS: STATE NAME INVALID", "The state name of  bride " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentaddressStateName()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaDistrict() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPresentInsideKeralaDistrict()))
//                errorMap.put("BRIDE PRESENT ADDRESS: DISTRICT INVALID", "bride district inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaDistrict()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentOutsideKeralaDistrict() != null) {
//            if (!masterData.get(MarriageConstants.DISTRICT)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPresentOutsideKeralaDistrict()))
//                errorMap.put("BRIDE PRESENT ADDRESS: DISTRICT  INVALID", "bride district outside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentOutsideKeralaDistrict()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaTaluk() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(
//                            request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaTaluk()))
//                errorMap.put("BRIDE PRESENT ADDRESS: TALUK NAME INVALID", "bride taluk inside kerala" +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaTaluk()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentOutsideKeralaTalukName() != null) {
//            if (!masterData.get(MarriageConstants.TALUK)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPresentOutsideKeralaTalukName()))
//                errorMap.put("BRIDE PRESENT ADDRESS: TALUK NAME INVALID", "bride taluk outside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentOutsideKeralaTalukName()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentOutsideKeralaVillageName() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPresentOutsideKeralaVillageName()))
//                errorMap.put("BRIDE PRESENT ADDRESS: VILLAGE NAME INVALID", "bride village outside kerala" +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                                .getPresentOutsideKeralaVillageName()
//                        + " is invalid");
//        }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaVillage() != null) {
//            if (!masterData.get(MarriageConstants.VILLAGE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPresentInsideKeralaVillage()))
//                errorMap.put("BRIDE PRESENT ADDRESS: VILLAGE NAME INVALID", "bride village inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaVillage()
//                        + " is invalid");
//        }
//
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaLBName() != null) {
//            if (!masterData.get(MarriageConstants.TENANTS)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPresentInsideKeralaLBName()))
//                errorMap.put("BRIDE PRESENT ADDRESS: LB NAME INVALID", "bride lbname inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaLBName()
//                        + " is invalid");
//        }
//
//        // System.out.println("ousidetaluk"+request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaWardNo()
//        // );
//        // // if
//        // (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaWardNo()
//        // != null) {
//        // // if (!masterData.get(MarriageConstants.WARD)
//        // //
//        // .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaWardNo()))
//        // // errorMap.put("GROOM PERMANENT ADDRESS: WARD INVALID", "The ward of bride "
//        // +
//        // //
//        // request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaWardNo()
//        // // + " is invalid");
//        // }
//        if (request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaPostOffice() != null) {
//            if (!masterData.get(MarriageConstants.POSTOFFICE)
//                    .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails()
//                            .getPresentInsideKeralaPostOffice()))
//                errorMap.put("BRIDE PRESENT ADDRESS: POST OFFICE INVALID", "bride post office inside kerala " +
//                        request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPresentInsideKeralaPostOffice()
//                        + " is invalid");
//        }
//        //********************************* * end of bride address details************************************************//
//
//        // if(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTalukid() != null) {
//        // if(!masterData.get(MarriageConstants.TALUK)
//        // .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTalukid()))
//        // errorMap.put(" TALUK NAME INVALID", "The taluk name of marriage place " +
//        // request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTalukid()+ " is invalid");
//        // }
//        // //have to change as villageId
//        // if(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getVillage_name() != null) {
//        // if(!masterData.get(MarriageConstants.VILLAGE)
//        // .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getVillage_name()))
//        // errorMap.put(" VILLAGE NAME INVALID", "The village name of marriage place " +
//        // request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getVillage_name()+ " is invalid");
//        // }
//        // if(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLbtype() != null) {
//        // if(!masterData.get(MarriageConstants.LBTYPE)
//        // .contains(request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLbtype()))
//        // errorMap.put(" LBTYPE INVALID", "The LBTYpe of marriage place " +
//        // request.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLbtype()+ " is invalid");
//
//        if (!CollectionUtils.isEmpty(errorMap))
//            throw new CustomException(errorMap);

//    }
}
