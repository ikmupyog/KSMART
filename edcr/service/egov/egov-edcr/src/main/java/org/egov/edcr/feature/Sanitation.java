/*
 * eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 * accountability and the service delivery of the government  organizations.
 *
 *  Copyright (C) <2019>  eGovernments Foundation
 *
 *  The updated version of eGov suite of products as by eGovernments Foundation
 *  is available at http://www.egovernments.org
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see http://www.gnu.org/licenses/ or
 *  http://www.gnu.org/licenses/gpl.html .
 *
 *  In addition to the terms of the GPL license to be adhered to in using this
 *  program, the following additional terms are to be complied with:
 *
 *      1) All versions of this program, verbatim or modified must carry this
 *         Legal Notice.
 *      Further, all user interfaces, including but not limited to citizen facing interfaces,
 *         Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *         derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *      For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *      For any further queries on attribution, including queries on brand guidelines,
 *         please contact contact@egovernments.org
 *
 *      2) Any misrepresentation of the origin of the material is prohibited. It
 *         is required that all modified versions of this material be marked in
 *         reasonable ways as different from the original version.
 *
 *      3) This license does not grant any rights to any user of the program
 *         with regards to rights under trademark law for use of the trade names
 *         or trademarks of eGovernments Foundation.
 *
 *  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */

package org.egov.edcr.feature;

import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.B1;
import static org.egov.edcr.constants.DxfFileConstants.B2;
import static org.egov.edcr.constants.DxfFileConstants.B3;
import static org.egov.edcr.constants.DxfFileConstants.C1;
import static org.egov.edcr.constants.DxfFileConstants.C2;
import static org.egov.edcr.constants.DxfFileConstants.C3;
import static org.egov.edcr.constants.DxfFileConstants.D;
import static org.egov.edcr.constants.DxfFileConstants.D1;
import static org.egov.edcr.constants.DxfFileConstants.D2;
import static org.egov.edcr.constants.DxfFileConstants.D3;
import static org.egov.edcr.constants.DxfFileConstants.D4;
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.E1;
import static org.egov.edcr.constants.DxfFileConstants.E2;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.G3;
import static org.egov.edcr.constants.DxfFileConstants.G4;
import static org.egov.edcr.constants.DxfFileConstants.G5;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.constants.DxfFileConstants.I3;
import static org.egov.edcr.constants.DxfFileConstants.I4;
import static org.egov.edcr.constants.DxfFileConstants.I5;
import static org.egov.edcr.constants.DxfFileConstants.I6;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.ParkingArea;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.SanityDetails;
import org.egov.common.entity.edcr.SanityHelper;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.stereotype.Service;

/**
 * @author mani
 */

@Service
public class Sanitation extends FeatureProcess {
    public static final String MSG_ERROR_MANDATORY = "msg.error.mandatory.object.not.defined";
    public static final String FEMALE = "Female ";
    public static final String MALE = "Male ";
    public static final String BLOCK = "Block ";
    public static final String SANITY_RULE_DESC = "Sanity facility for Occupancy ";
    public static final String NEWLINE = "\n";
    public static final String SANITATION = "Sanitation";
    public static final String BLOCK_U_S = "Block_";
    private static final String WITH = " with ";
    private static final String BLDG_PART_WATER_CLOSET = "Water Closet";
    private static final String BLDG_PART_VISITOR_WATER_CLOSET = "Visitor Water Closets";
    private static final String BLDG_PART_VISITOR_URINAL = "Visitor Urinal";
    private static final String BLDG_PART_VISITOR_SPECIAL_WATER_CLOSET = "Visitor Special Water Closet";

    private static final String BLDG_PART_SPECIAL_WATER_CLOSET = "Special Water Closet";
    private static final String BLDG_PART_URINAL = "Urinal";
    private static final String BLDG_PART_BATHROOM = "Bath Room";
    private static final String MALE_BATH_WITH_WC = BLDG_PART_BATHROOM + WITH + BLDG_PART_WATER_CLOSET;
    private static final String BLDG_PART_WASHBASIN = "Wash Basin";
    private static final String MINIMUM_SIDE_DIMENSION_VIOLATED = "Minimum Side Dimension of {0} M violated";
    private static final String MINIMUM_AREA_DIMENSION_VIOLATED = "Minimum Area of {0} M violated";
    private static final String DIMESION_DESC_KEY = "msg.sanity.dimension.desc";
    /*
     * private static final String DIMESION_DESC_BATH =
     * "The area of bath-room shall not be less than 1.50 sq.m. with either side not less than 1.1m"; private static final String
     * DIMESION_DESC_BATH_WC = "The area of combined bathroom and latrine shall be not less than 2.2 square " +
     * "metres with one side not less than 1. 1 metres";
     */
    private static final Logger LOG = LogManager.getLogger(Sanitation.class);
    /*
     * private static final String RULE_NAME_KEY = "sanitation.rulename"; private static final String RULE_DESCRIPTION_KEY =
     * "sanitation.description"; private static final String RULE_EXPECTED_KEY = "sanitation.expected"; private static final
     * String RULE_ACTUAL_KEY = "sanitation.actual";
     */
    private static final String FEATURE_NAME = "Sanitary Detail";
    /*
     * private static final String SIDE = "SIDE"; private static final String AREA = "AREA";
     */
    private static final String RULE_38_1 = "38-1";
    private static final String NOOFBEDS = "No Of Beds";
    public static final String RULE_55_12 = "55-12";
    public static final String RULE_40_A_4 = "40A-4";
    public static final String RULE_42 = "42";
    public static final String RULE_54_6 = "54-6";
    public static final String RULE_34_3_1_TABLE_13_14__RULE_42 = "34(3)(1) Table 13, 14 And Rule 42";
    public static final String RULE_34_3_1_TABLE_13_15__RULE_42 = "34(3)(1) Table 13, 15 And Rule 42";
    public static final String RULE_34_3_1_TABLE_13_14 = "34(3)(1) Table 13, 14";
    public static final String RULE_34_3_3_TABLE_13_14 = "34(3)(3) Table 13, 14";

    public static final String RULE_34_3_34_3_5 ="34(3)(2) 34(3)(5) ";
    public static final String RULE_34_3_34_3_3 ="34(3)(2) 34(3)(3) ";
    public static final String RULE_34_3_1_34_3_3_TABLE_13_14__RULE_42 ="34(3)(1) Table 13, 14 ,34(3)(3), Rule 42";
    public static final String RULE_34_1_1 = "34(1)(1)";
    public static final String RULE_34_3_1 = "34(3)(1)";
    public static final String RULE_34_1_2 = "34(1)(2)";

    public static final String RULE_34_3_3_A_B="34(3)(3)a & b";
    public static final String RULE_34_3_2 = "34(3)(2)";
    public static final BigDecimal MINAREAOFSPWC = BigDecimal.valueOf(2.625);
    public static final BigDecimal MINDIMENSIONOFSPWC = BigDecimal.valueOf(1.5);
    public static final String MINIMUM_AREA_SPWC = "2.625 M2";
    public static final String MINIMUM_DIMENSION_SPWC = "1.5 M";

    @Override
    public Plan validate(Plan pl) {

        for (Block b : pl.getBlocks())
            if (!b.getCompletelyExisting()) {

                int totalSpecialWC = 0;
                int totalWashBasins = 0;
                int totalVisitorSPWC=0;
                for (Floor f : b.getBuilding().getFloors()) {
                    totalSpecialWC += f.getSpecialWaterClosets().size();
                    totalWashBasins += f.getWashBasins().size();
                    totalVisitorSPWC += f.getCommonVisitorSpecialWaterClosets().size();
                }
                b.getSanityDetails().setTotalSPWC(totalSpecialWC);
                b.getSanityDetails().setTotalwashBasins(totalWashBasins);
                b.getSanityDetails().setTotalVisitorSPWC(totalVisitorSPWC);

                
                /*
                 * If block is small plot and floors above ground less than or equal to three and occupancy type of entire block
                 * is either Residential or Commercial then sanitation validation not require.
                 */
                if (!Util.singleFamilyWithLessThanOrEqualToThreeFloor(b)) {
                    List<Occupancy> occupancies = b.getBuilding().getOccupancies();//TODO: CONVERSION OCCUPANCY TO BE USED ???
 
                    SanityDetails sanityDetails = b.getSanityDetails();
                    validateDimensions(pl, b, sanityDetails);
                    for (Occupancy occupancy : occupancies) {
                    	
                         if (I2.equals(occupancy.getTypeHelper().getType().getCode()) && occupancy.getFloorArea().doubleValue() == 0
                                && occupancy.getBuiltUpArea().doubleValue() == 0)
                            break; 
                        switch (occupancy.getTypeHelper().getType().getCode()) {
                        case A1:
                        case A2:
                        case A4:
                            if (sanityDetails.getTotalSPWC() == 0)
                                pl.addError(BLDG_PART_SPECIAL_WATER_CLOSET, getLocaleMessage(MSG_ERROR_MANDATORY,
                                        FEATURE_NAME, BLDG_PART_SPECIAL_WATER_CLOSET, b.getNumber()));
                            break;
                        case A3:
                            commonSanitationValidations(pl, b, sanityDetails, occupancy.getTypeHelper());
                            validateBathRoom(pl, b, sanityDetails);
                            break;
                        case B1:
                        case B2:
                        case B3:
                            commonSanitationValidations(pl, b, sanityDetails, occupancy.getTypeHelper());
                            break;
                        case C1:
                            validateVisitorUrinalWaterClosets(pl, b, sanityDetails);
                            commonSanitationValidations(pl, b, sanityDetails, occupancy.getTypeHelper());
                            if (pl.getPlanInformation().getNoOfBeds() == null)
                                pl.addError(NOOFBEDS,
                                        getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, NOOFBEDS, b.getNumber()));
                            break;
                        case C2:
                        case C3:
                            commonSanitationValidations(pl, b, sanityDetails, occupancy.getTypeHelper());
                            validateVisitorUrinalWaterClosets(pl, b, sanityDetails);
                            break;
                        case D:
                        case D1:
                            commonSanitationValidations(pl, b, sanityDetails, occupancy.getTypeHelper());
                            break;
                        case D2:
                            commonSanitationValidations(pl, b, sanityDetails, occupancy.getTypeHelper());
                            validateVisitorUrinalWaterClosets(pl, b, sanityDetails);
                            break;
                        case E:
                        case F:
                            commonSanitationValidations(pl, b, sanityDetails, occupancy.getTypeHelper());
                            break;
                        case E2:
                            validateVisitorUrinalWaterClosets(pl, b, sanityDetails);
                            break;
                        case F3:
                            commonSanitationValidations(pl, b, sanityDetails, occupancy.getTypeHelper());
                            validateBathRoom(pl, b, sanityDetails);
                            break;
                        case G1:
//                        case G2:
                        case H:
                        	if (sanityDetails.getMaleWaterClosets().isEmpty()
                                    && sanityDetails.getFemaleWaterClosets().isEmpty())
                                pl.addError(BLDG_PART_WATER_CLOSET,
                                        getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_WATER_CLOSET,
                                                b.getNumber()));

                            if (sanityDetails.getMaleUrinals().isEmpty() && sanityDetails.getCommonUrinals().isEmpty())
                                pl.addError(BLDG_PART_URINAL,
                                        getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_URINAL, b.getNumber()));
                            break;
                        case I1:
                        case I2:
                            validateVisitorUrinalWaterClosets(pl, b, sanityDetails);
                            if (sanityDetails.getMaleWaterClosets().isEmpty()
                                    && sanityDetails.getFemaleWaterClosets().isEmpty())
                                pl.addError(BLDG_PART_WATER_CLOSET,
                                        getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_WATER_CLOSET,
                                                b.getNumber()));

                            if (sanityDetails.getMaleUrinals().isEmpty() && sanityDetails.getCommonUrinals().isEmpty())
                                pl.addError(BLDG_PART_URINAL,
                                        getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_URINAL, b.getNumber()));
                            break;
                        }
                    }
                }
            }
        return pl;
    }

	private void validateVisitorUrinalWaterClosets(Plan pl, Block b, SanityDetails sanityDetails) {
		
	 	
		if (sanityDetails.getTotalVisitorSPWC() == 0)
            pl.addError(BLDG_PART_VISITOR_SPECIAL_WATER_CLOSET,
                    getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_VISITOR_SPECIAL_WATER_CLOSET, b.getNumber()));
 	}

    private void validateBathRoom(Plan pl, Block b, SanityDetails sanityDetails) {
        if (sanityDetails.getMaleBathRooms().isEmpty() && sanityDetails.getFemaleBathRooms().isEmpty()
                && sanityDetails.getMaleRoomsWithWaterCloset().isEmpty()
                && sanityDetails.getFemaleRoomsWithWaterCloset().isEmpty()) {
            pl.addError(BLDG_PART_BATHROOM,
                    getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_BATHROOM, b.getNumber()));
        }
    }

    private void commonSanitationValidations(Plan pl, Block b, SanityDetails sanityDetails, OccupancyTypeHelper occupancy) {
        if (sanityDetails.getMaleWaterClosets().isEmpty() && sanityDetails.getFemaleWaterClosets().isEmpty()
                && sanityDetails.getMaleRoomsWithWaterCloset().isEmpty()
                && sanityDetails.getFemaleRoomsWithWaterCloset().isEmpty())
            pl.addError(BLDG_PART_WATER_CLOSET,
                    getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_WATER_CLOSET, b.getNumber()));

		if (sanityDetails.getMaleUrinals().isEmpty() && sanityDetails.getCommonUrinals().isEmpty()
				&& sanityDetails.getMaleVisitorUrinals().isEmpty()
				&& sanityDetails.getMaleOrFemaleVisitorsUrinals().isEmpty())
            pl.addError(BLDG_PART_URINAL,
                    getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_URINAL, b.getNumber()));

        if (!F.equals(occupancy.getType().getCode()) && !E1.equals(occupancy.getType().getCode()) && !E2.equals(occupancy.getType().getCode()) && !E.equals(occupancy.getType().getCode())
                && sanityDetails.getTotalwashBasins() == 0)
            pl.addError(BLDG_PART_WASHBASIN,
                    getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_WASHBASIN, b.getNumber()));

        if (sanityDetails.getTotalSPWC() == 0)
            pl.addError(BLDG_PART_SPECIAL_WATER_CLOSET,
                    getLocaleMessage(MSG_ERROR_MANDATORY, FEATURE_NAME, BLDG_PART_SPECIAL_WATER_CLOSET, b.getNumber()));

    }

    private void validateDimensions(Plan pl, Block b, SanityDetails sanityDetails) {
        
        List<Measurement> urinalList = new ArrayList<>();
        urinalList.addAll(sanityDetails.getMaleUrinals());
        urinalList.addAll(sanityDetails.getCommonUrinals());
        urinalList.addAll(sanityDetails.getMaleOrFemaleVisitorsUrinals());
        urinalList.addAll(sanityDetails.getMaleVisitorUrinals());


    	if (!urinalList.isEmpty()) {
            int count = 0;
            for (Measurement m : urinalList)
                if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0)
                    count++;
            if (count > 0)
                pl.addError("Sanity_" + BLDG_PART_URINAL + b.getNumber(),
                        count + " number of " + BLDG_PART_URINAL + " polyline not having only 4 points in block" + b.getNumber());
        }
        List<Measurement> wcList = new ArrayList<>();
        wcList.addAll(sanityDetails.getMaleWaterClosets());
        wcList.addAll(sanityDetails.getFemaleWaterClosets());
        wcList.addAll(sanityDetails.getCommonWaterClosets());
        if (!wcList.isEmpty()) {
            int count = 0;
            for (Measurement m : wcList)
                if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0)
                    count++;
            if (count > 0)
                pl.addError("Sanity_" + BLDG_PART_WATER_CLOSET + b.getNumber(), count + " number of "
                        + BLDG_PART_WATER_CLOSET + " polyline not having only 4 points in block" + b.getNumber());
        }

        List<Measurement> bath = new ArrayList<>();
        bath.addAll(sanityDetails.getMaleBathRooms());
        bath.addAll(sanityDetails.getFemaleBathRooms());
        bath.addAll(sanityDetails.getCommonBathRooms());

        List<Measurement> wcrList = new ArrayList<>();
        wcrList.addAll(sanityDetails.getMaleRoomsWithWaterCloset());
        wcrList.addAll(sanityDetails.getFemaleRoomsWithWaterCloset());
        wcrList.addAll(sanityDetails.getCommonRoomsWithWaterCloset());

        if (!bath.isEmpty()) {
            int count = 0;
            for (Measurement m : bath)
                if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0)
                    count++;
            if (count > 0)
                pl.addError("Sanity_" + BLDG_PART_BATHROOM + b.getNumber(), count + " number of " + BLDG_PART_BATHROOM
                        + " polyline not having only 4 points in block" + b.getNumber());
        }

        if (!wcrList.isEmpty()) {
            int count = 0;
            for (Measurement m : wcrList)
                if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0)
                    count++;
            if (count > 0)
                pl.addError("Sanity_" + MALE_BATH_WITH_WC + b.getNumber(), count + " number of " + MALE_BATH_WITH_WC
                        + " polyline not having only 4 points in block" + b.getNumber());
        }
    }

    @Override
    public Plan process(Plan pl) {
        verifyDimesions(pl);
        checkCount(pl);
        checkSegregatedSanitation(pl);
        return pl;
    }

    private Plan verifyDimesions(Plan pl) {
        validate(pl);

        /*
         * for (Block b : pl.getBlocks()) { If block is small plot and floors above ground less than or equal to three and
         * occupancy type of entire block is either Residential or Commercial then sanitation process not require. if
         * (!Util.checkExemptionConditionForBuildingParts(b) && !Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(),
         * b)) { SanityDetails sanityDetails = b.getSanityDetails(); ScrutinyDetail scrutinyDetail =
         * getNewScrutinyDetail(BLOCK_U_S + b.getNumber() + "_" + SANITATION); checkDimension(pl, scrutinyDetail,
         * sanityDetails.getMaleWaterClosets(), 1d, 1.1d, MALE + BLDG_PART_WATER_CLOSET, DIMESION_DESC_KEY, RULE_38_1);
         * checkDimension(pl, scrutinyDetail, sanityDetails.getFemaleWaterClosets(), 1d, 1.1d, FEMALE + BLDG_PART_WATER_CLOSET,
         * DIMESION_DESC_KEY, RULE_38_1); checkDimension(pl, scrutinyDetail, sanityDetails.getUrinals(), 0.6d, 0.5d,
         * BLDG_PART_URINAL, DIMESION_DESC_KEY, RULE_38_1); checkDimension(pl, scrutinyDetail, sanityDetails.getMaleBathRooms(),
         * 1.1d, 1.5d, MALE + BLDG_PART_BATHROOM, DIMESION_DESC_KEY, RULE_38_1); checkDimension(pl, scrutinyDetail,
         * sanityDetails.getFemaleBathRooms(), 1.1d, 1.5d, FEMALE + BLDG_PART_BATHROOM, DIMESION_DESC_KEY, RULE_38_1);
         * checkDimension(pl, scrutinyDetail, sanityDetails.getMaleRoomsWithWaterCloset(), 1.1d, 2.2d, MALE_BATH_WITH_WC,
         * DIMESION_DESC_KEY, RULE_38_1); checkDimension(pl, scrutinyDetail, sanityDetails.getMaleRoomsWithWaterCloset(), 1.1,
         * 2.2d, FEMALE + BLDG_PART_BATHROOM + WITH + BLDG_PART_WATER_CLOSET, DIMESION_DESC_KEY, RULE_38_1); // checkCount(pl); }
         * }
         */

        return pl;
    }
    private void checkCount(Plan pl) {

        Boolean accepted = true;
        for (Block b : pl.getBlocks())
            if (!b.getCompletelyExisting()) {

                LOG.info("Starting  Sanitation of ....." + b.getNumber());
                /*
                 * If block is small plot and floors above ground less than or equal to three and occupancy type of entire block
                 * is either Residential or Commercial then sanitation process not require.
                 */

                if (!Util.singleFamilyWithLessThanOrEqualToThreeFloor(b)) {
                    ScrutinyDetail scrutinyDetail = getNewScrutinyDetail(BLOCK_U_S + b.getNumber() + "_" + SANITATION);
                    SanityHelper helper = new SanityHelper();
                    Map<Integer, Integer> requiredSpWcMap = new ConcurrentHashMap<>();
                    Map<Integer, Integer> providedSpWcMap = new ConcurrentHashMap<>();
                    Map<Integer, Integer> failedAreaSpWcMap = new ConcurrentHashMap<>();
                    Map<Integer, Integer> failedDimensionSpWcMap = new ConcurrentHashMap<>();
                    Map<String, BigDecimal> sanityDetailParkingArea = getParkingAreaDeclaredInsideBuilding(b);
                    
                    for (Occupancy type : b.getBuilding().getOccupancies()) {//TODO: CONVERSION OCCUPANCY TO BE USED ???
                        double buildUpArea = 0d;
						BigDecimal deductionArea = BigDecimal.valueOf(0);

						if (!sanityDetailParkingArea.isEmpty()
								&& sanityDetailParkingArea.containsKey(type.getTypeHelper().getType().getCode())) {
							deductionArea = sanityDetailParkingArea.get(type.getTypeHelper().getType().getCode());
						}
     
                        if (I2.equals(type.getTypeHelper().getType().getCode()) && type.getFloorArea().doubleValue() == 0
                                && type.getBuiltUpArea().doubleValue() == 0)//TODO:CHECK THIS VALIDATION
                            break;
                        else if (type.getBuiltUpArea() != null && type.getBuiltUpArea().doubleValue() > 0)
                        {
                        	if(deductionArea.doubleValue() > 0 && (type.getBuiltUpArea().doubleValue()-deductionArea.doubleValue())>0)
                               buildUpArea = (type.getBuiltUpArea().doubleValue()-deductionArea.doubleValue());
                        	else
                               buildUpArea = type.getBuiltUpArea().doubleValue();
                        
                        }else {
                            pl.addError("Invalid Buildup area",
                                    "Buildup area is not calculated . Some thing wrong with builtup area");
                            return;
                        }
                        LOG.info(type.getTypeHelper().getType().getCode()+ " area " + buildUpArea);

                        switch (type.getTypeHelper().getType().getCode()) {

                        case A4:
                            if (b.getResidentialBuilding())
                                accepted = processSpecialWaterClosetForResidential(b, helper, scrutinyDetail, requiredSpWcMap,
                                        providedSpWcMap, failedAreaSpWcMap, failedDimensionSpWcMap);
                            break;
                        case A2: //Special Residential
                           /* processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                            break;*/
                        	helper.maleWc += buildUpArea * 2 / (5.9 * 3 * 10);
                            helper.femaleWc += buildUpArea * 1 / (5.9 * 3 * 8);
                            helper.urinal += buildUpArea * 2 / (5.9 * 3 * 25);
                            helper.maleWash += buildUpArea * 2 / (5.9 * 3 * 10);
                            helper.femaleWash += buildUpArea / (5.9 * 3 * 10);
                            helper.maleBath += buildUpArea * 2 / (5.9 * 3 * 10);
                            helper.femaleBath += buildUpArea / (5.9 * 3 * 10);
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                            helper.ruleNo.add(RULE_34_3_1_TABLE_13_14__RULE_42); 
                            break;
                        case A3: //Hotel
                            helper.maleWc += buildUpArea * 2 / (5.9 * 3 * 100);
                            helper.femaleWc += buildUpArea * 1 / (5.9 * 3 * 100);
                            helper.urinal += buildUpArea * 1 / (5.9 * 1 * 25);
                            helper.commonWash += buildUpArea * 1 / (5.9 * 1 * 25); 
                            helper.commonBath += buildUpArea / (5.9 * 1 * 100);
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                            helper.ruleNo.add(RULE_34_3_1_TABLE_13_14__RULE_42); 
                            break;
                        case B1:
                        case B2:
                        case B3:
                            helper.maleWc += buildUpArea * 2 / (5.9 * 3 * 40);
                            helper.femaleWc += buildUpArea / (5.9 * 3 * 25);
                            helper.urinal += buildUpArea * 2 / (5.9 * 3 * 50);
                            helper.maleWash += buildUpArea * 2 / (5.9 * 3 * 40);
                            helper.femaleWash += buildUpArea / (5.9 * 3 * 40);
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                            helper.ruleNo.add(RULE_34_3_1_TABLE_13_14__RULE_42);
                            break;
                        case C1://medical IP
                            if (pl.getPlanInformation().getNoOfBeds() == null)
                                break;
                            double noofBeds = pl.getPlanInformation().getNoOfBeds().doubleValue();
                            
								    helper.commonWc += ((noofBeds / 8)>= b.getSanityDetails().getTotalSPWC())?  
								    		((noofBeds / 8) - b.getSanityDetails().getTotalSPWC()):Double.valueOf(0); //
								
								if (noofBeds < 30) {
									helper.commonWash += 2;
								} else {
									helper.commonWash += 2 + (noofBeds - 30) / 30;
								}
								
	                        helper.commonBath += noofBeds / 8;
                            helper.abultionTap += (((noofBeds / 8)>= b.getSanityDetails().getTotalSPWC())?  
						    		((noofBeds / 8) - b.getSanityDetails().getTotalSPWC()):Double.valueOf(0)) + buildUpArea / (5.9 * 50);
                            
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                            helper.ruleNo.add(RULE_34_3_1_TABLE_13_15__RULE_42);
                            //TODO: ADD Seggregated sanitation logic.
                            break;

                        case C2://Medical OP
                            helper.maleWc += buildUpArea * 2 / (5.9 * 3 * 100);
                            helper.femaleWc += buildUpArea / (5.9 * 3 * 50);
                            helper.urinal += buildUpArea * 1 / (5.9 * 50);
                            helper.commonWash += buildUpArea * 1 / (5.9 * 100);
                            //helper.femaleWash += buildUpArea / (5.9 * 100);
                            // helper.maleBath = carpetArea * 2 / (5.9 * 3 * 10);
                            // helper.femaleBath = carpetArea / (5.9 * 3 * 10);
                            helper.abultionTap += helper.maleWc + helper.femaleWc + buildUpArea / (5.9 * 50);
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                            helper.ruleNo.add(RULE_34_3_1_TABLE_13_15__RULE_42);
                            break;

                        case C3://Medical admin
                            helper.ruleNo.add(RULE_34_3_1_TABLE_13_15__RULE_42);
                            helper.maleWc += buildUpArea * 2 / (5.9 * 3 * 25);
                            helper.femaleWc += buildUpArea / (5.9 * 3 * 15);

                            helper.commonWash += buildUpArea * 1 / (5.9 * 25);
                            //helper.femaleWash += buildUpArea * 2 / (5.9 * 3 * 25);
                            Double noOfPersons = buildUpArea/(5.9);
                            BigDecimal noOfPersonsBig = BigDecimal.valueOf(noOfPersons).divide(BigDecimal.ONE,
                                    RoundingMode.HALF_UP);
                            int noofPerson = noOfPersonsBig.intValue();

                            if (noofPerson >= 7 && noofPerson <= 20)
                                helper.urinal += 1d;
                            else if (noofPerson <= 45)
                                helper.urinal += 2d;
                            else if (noofPerson <= 70)
                                helper.urinal += 3d;
                            else if (noofPerson <= 100)
                                helper.urinal += 4d;
                            else if (noofPerson <= 200)
                                helper.urinal += 5d;    //4d + noofPerson * 0.3d;
                            else if (noofPerson > 200)
                                helper.urinal += 6d;

                            helper.abultionTap += helper.maleWc + helper.femaleWc + buildUpArea / (5.9 * 50);
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                            break;
                        case D:
                        case D1:
                        case D3:
                        case D4:
                            if (buildUpArea <= 1000)
                            {
                            	if(((buildUpArea * 2) / (1.8 * 3 * 200))>b.getSanityDetails().getTotalSPWC())
                            		helper.maleWc += ((buildUpArea * 2) / (1.8 * 3 * 200)) - b.getSanityDetails().getTotalSPWC();
                            	helper.femaleWc += ((buildUpArea * 1) / (1.8 * 3 * 100)) ;  
                                helper.urinal += buildUpArea * 1 / (1.8 * 50);
                                helper.maleWash += buildUpArea * 2 / (1.8* 3 * 200);
                                helper.femaleWash += buildUpArea * 1 / (1.8* 3 * 200);

                            }else
                            {
                            	helper.maleWc += 2d + (buildUpArea - 1000) * 2 / (1.8 * 3 * 400);
                            	helper.femaleWc += 2d + (buildUpArea - 1000) * 1 / (1.8 * 3 * 200);
                                helper.urinal += 12d+( buildUpArea-1000) * 1 / (1.8 * 100);
                                helper.maleWash += 2d+( buildUpArea-1000) * 2 / (1.8* 3 * 400);
                                helper.femaleWash += 2d+( buildUpArea-1000) * 1 / (1.8* 3 * 400);

                            }
                            // helper.maleBath += carpetArea * 2 / (5.9 * 3 * 10);
                            // helper.femaleBath += carpetArea / (5.9 * 3 * 10);
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                            helper.ruleNo.add(RULE_34_3_1_34_3_3_TABLE_13_14__RULE_42);
                            break;
                        case D2://bus terminal
                            if (buildUpArea/1.8 <= 1000)
                                helper.commonWc += 4d;
                            else
                                helper.commonWc += 4d + ((buildUpArea/1.8) - 1000)/1000;//TODO: CHECK THIS LOGIC AGAIN.

                            if (buildUpArea <= 1000)
                                helper.urinal += 6d;
                            else
                                helper.urinal += 6d + (((buildUpArea/1.8) - 1000) / (1000));
 
                            helper.maleWash += 4d;
                            helper.femaleWash += 4d;
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                    failedDimensionSpWcMap);
                             helper.ruleNo.add(RULE_34_3_1_34_3_3_TABLE_13_14__RULE_42);
                            break;
                        case E:
                        case E1:
                        	helper.maleWc += ((buildUpArea * 2 / (5.9 * 3 * 25)) * 0.75 ) - b.getSanityDetails().getTotalSPWC();
                            helper.femaleWc += ((buildUpArea * 1 / (5.9 * 3 * 15)) * 0.75 );
                            helper.urinal += buildUpArea * 0.75 / (5.9 * 25);

                            helper.ruleNo.add(RULE_34_3_34_3_5);
                            helper.ruleDescription = SANITY_RULE_DESC + type.getTypeHelper().getType().getName();
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                        failedDimensionSpWcMap);

                            break;
                        case E2:
                        case F:
                        	if((buildUpArea * 2 / (5.9 * 3 * 25))> b.getSanityDetails().getTotalSPWC())
                        		helper.maleWc += (buildUpArea * 2 / (5.9 * 3 * 25)) - b.getSanityDetails().getTotalSPWC() ;
                            helper.femaleWc += buildUpArea / (5.9 * 3 * 15);
                            helper.urinal += buildUpArea * 1 / (5.9 * 25);

                            helper.ruleNo.add(RULE_34_3_1_TABLE_13_14);
                            helper.ruleDescription = SANITY_RULE_DESC + type.getTypeHelper().getType().getName();
                            processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                        failedDimensionSpWcMap);

                            break;
                        case F2:
                        	if (buildUpArea <= 1000)
                            {
                            	if(((buildUpArea * 2) / (1.8 * 3 * 200))>b.getSanityDetails().getTotalSPWC())
                            		helper.maleWc += ((buildUpArea * 2) / (1.8 * 3 * 200)) - b.getSanityDetails().getTotalSPWC();
                            	helper.femaleWc += ((buildUpArea * 1) / (1.8 * 3 * 100)) ;  
                                helper.urinal += buildUpArea * 1 / (1.8 * 50);
                                helper.maleWash += buildUpArea * 2 / (1.8* 3 * 200);
                                helper.femaleWash += buildUpArea * 1 / (1.8* 3 * 200);

                            }else
                            {
                            	helper.maleWc += 2d +(buildUpArea - 1000) * 2 / (1.8 * 3 * 400);
                            	helper.femaleWc += 2d + (buildUpArea - 1000) * 1 / (1.8 * 3 * 200);
                                helper.urinal += 12d+( buildUpArea-1000) * 1 / (1.8 * 100);
                                helper.maleWash += 2d+( buildUpArea-1000) * 2 / (1.8* 3 * 400);
                                helper.femaleWash += 2d+( buildUpArea-1000) * 1 / (1.8* 3 * 400);
                            }
                        	helper.ruleNo.add(RULE_34_3_1_TABLE_13_14);
                            helper.ruleDescription = SANITY_RULE_DESC + type.getTypeHelper().getType().getName();
                        	processSpecialWaterCloset(b, requiredSpWcMap, providedSpWcMap, failedAreaSpWcMap,
                                        failedDimensionSpWcMap);
                            break;
                        case G1:
                        case G2:
                        case G3:
                        case G4:
                        case G5:
                            helper.maleWc += buildUpArea * 2 / (30 * 3 * 25);
                            helper.femaleWc += buildUpArea / (30 * 3 * 15);
                            helper.urinal += buildUpArea * 1 / (30 * 25);
                        	helper.ruleNo.add(RULE_34_3_1_TABLE_13_14);
                            helper.ruleDescription = SANITY_RULE_DESC + type.getTypeHelper().getType().getName();
                            // accepted = processSanity(pl, b, carpetArea, helper, scrutinyDetail, type);
                            break;
                        case H:
                            helper.maleWc += buildUpArea * 2 / (3 * 30 * 50);
                            helper.femaleWc += buildUpArea / (3 * 30 * 25);
                            helper.urinal += buildUpArea * 2 / (3 * 30 * 100);
                        	helper.ruleNo.add(RULE_34_3_1_TABLE_13_14);
                            helper.ruleDescription = SANITY_RULE_DESC + type.getTypeHelper().getType().getName();
                                                   break;
                        case I1:
                        case I2:
                        case I3:
                        case I4:
                        case I5:
                        case I6:
                            double worker = pl.getPlanInformation().getNumberOfWorkers().doubleValue();
                           
                            if(worker<=5)
                            	helper.commonWc+=1d;
                            if(worker==0 || worker>5)
                            {
                            	if((buildUpArea/30)<=50){
                            	       helper.femaleWc += 2d;
                                       helper.maleWc += 1d;
                            	}
                            	else{
                            		helper.maleWc +=1d+ ((buildUpArea/30)-50) * 2 / (3 * 70);
                            		helper.femaleWc +=2d+ ((buildUpArea/30)-50) * 1 / (3 * 70);
                                    
                            	}
                            }
                            helper.urinal += ((buildUpArea/30) * 2 / (3 * 100));
                            helper.ruleNo.add(RULE_34_3_34_3_3);
                            // accepted = processSanity(pl, b, floorArea, helper, scrutinyDetail, type);
                            break;

                        }
                    }
                    for (Map.Entry<Integer, Integer> req : requiredSpWcMap.entrySet())
                        helper.requiredSpecialWc += req.getValue();
                    for (Map.Entry<Integer, Integer> pro : providedSpWcMap.entrySet())
                        helper.providedSpecialWc += pro.getValue();
                    for (Map.Entry<Integer, Integer> pro : failedAreaSpWcMap.entrySet())
                        helper.failedAreaSpecialWc += pro.getValue();
                    for (Map.Entry<Integer, Integer> pro : failedDimensionSpWcMap.entrySet())
                        helper.failedDimensionSpecialWc += pro.getValue();

                    if (helper.requiredSpecialWc > 0) {
                        Set<String> ruleNo = new HashSet<>();
                        ruleNo.add(RULE_42);
                        if (helper.providedSpecialWc < helper.requiredSpecialWc)
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET
                                    + " - Minimum one at Ground Floor + Minimum 1 at every floors in multiples of 3, (GF, 3rd, 6th etc)",
                                    String.valueOf(helper.requiredSpecialWc.intValue()),
                                    String.valueOf(helper.providedSpecialWc.intValue()),
                                    Result.Not_Accepted.getResultVal(), scrutinyDetail);
                        else
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET
                                    + " - Minimum one at Ground Floor + Minimum 1 at every floors in multiples of 3, (GF, 3rd, 6th etc)",
                                    String.valueOf(helper.requiredSpecialWc.intValue()),
                                    String.valueOf(helper.providedSpecialWc.intValue()),
                                    Result.Accepted.getResultVal(), scrutinyDetail);
                        if(helper.providedSpecialWc > 0)
                        {  
                        if (helper.failedAreaSpecialWc > 0 && helper.failedAreaSpecialWc <= helper.requiredSpecialWc)
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum Area", MINIMUM_AREA_SPWC,
                                    String.valueOf(helper.failedAreaSpecialWc.intValue()) + " not having area 2.625 M2",
                                    Result.Not_Accepted.getResultVal(), scrutinyDetail);
                        else
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum Area", MINIMUM_AREA_SPWC,
                                    String.valueOf(helper.providedSpecialWc.intValue() - helper.failedAreaSpecialWc.intValue())
                                            + " having area 2.625 M2",
                                    Result.Accepted.getResultVal(), scrutinyDetail);

                        if (helper.failedDimensionSpecialWc > 0 && helper.failedDimensionSpecialWc <= helper.requiredSpecialWc)
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum Dimension",
                                    MINIMUM_DIMENSION_SPWC,
                                    String.valueOf(helper.failedDimensionSpecialWc.intValue()) + " not having dimension 1.5M",
                                    Result.Not_Accepted.getResultVal(), scrutinyDetail);
                        else
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum Dimension",
                                    MINIMUM_DIMENSION_SPWC,
                                    String.valueOf(
                                            helper.providedSpecialWc.intValue() - helper.failedDimensionSpecialWc.intValue())
                                            + " having dimension 1.5M",
                                    Result.Accepted.getResultVal(), scrutinyDetail);
                        }
                    } 
                    accepted = processSanity(pl, b, helper, scrutinyDetail);

                    pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
                    LOG.info("Keys of the Sanitation Message ....." + scrutinyDetail.getKey() + "   "
                            + scrutinyDetail.getDetail().size());
                }
            }
    }

    private ScrutinyDetail getNewScrutinyDetail(String key) {
        ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);
        scrutinyDetail.setKey(key);
        return scrutinyDetail;
    }
    
    // Get parking area occupancy wise declared inside the building 
    private Map<String, BigDecimal> getParkingAreaDeclaredInsideBuilding(Block blk) {
    	 Map<String, BigDecimal> sanityDetailParkingArea = new ConcurrentHashMap<>();
    	 for (Floor f : blk.getBuilding().getFloors()) {
             for(ParkingArea parking : f.getParkingProvidedInsideBuilding()) {
             	if(parking.getOccupancyType() != null)
             		sanityDetailParkingArea.put(parking.getOccupancyType().getType().getCode(), parking.getParkingArea());
             }
           }
         return sanityDetailParkingArea;
    }

    //Check plot level converted occupancy contain c1+c2+c3>=10000
    //If occupancy D2, E2, I1 AND I2 THEN VALIDATE.
    private void checkSegregatedSanitation(Plan pl) {
        if (pl.getVirtualBuilding() != null && !pl.getVirtualBuilding().getOccupancyTypes().isEmpty()) {
        	
            if (pl.getVirtualBuilding().getOccupancyTypes().stream()
                    .anyMatch(occ -> (occ.getType().getCode().equals(D2) || occ.getType().getCode().equals(C1) ||
                    		occ.getType().getCode().equals(C2) ||occ.getType().getCode().equals(C3)
                            || occ.getType().getCode().equals(E2) || occ.getType().getCode().equals(I1) || occ.getType().getCode().equals(I2)))) {
            	
                BigDecimal totalMedicalOccupancyBuildUpArea = BigDecimal.ZERO;

                for (Block block : pl.getBlocks()) {
                	 for (Occupancy type : block.getBuilding().getOccupancies())
                	 {
                		 if(type.getTypeHelper().getType().getCode().equals(C1) || 
                				 type.getTypeHelper().getType().getCode().equals(C2) || 
                				 type.getTypeHelper().getType().getCode().equals(C3))
                    		 totalMedicalOccupancyBuildUpArea=totalMedicalOccupancyBuildUpArea.add(type.getBuiltUpArea());
                	 }
                   }

                 SanityHelper helper = new SanityHelper();
                 Integer providedWcMale =  0;
                 Integer providedWcFemale =  0;
                 Integer providedCommonWc =  0;

                 Integer providedCommonUrinal =  0;
                 Integer providedUrinalForMale =  0;
                 
                 Integer providedCommonWashBasin =  0;
                 Integer providedMaleWashBasin =  0;
                 Integer providedFemaleWashBasin =  0;

          for (Block b : pl.getBlocks())
             if (!b.getCompletelyExisting()) {
                if (!Util.singleFamilyWithLessThanOrEqualToThreeFloor(b)) {
                    ScrutinyDetail scrutinyDetail = getNewScrutinyDetail(BLOCK_U_S + b.getNumber() + "_" + SANITATION);
                    Map<Integer, Integer> requiredSpWcMap = new ConcurrentHashMap<>();
                    Map<Integer, Integer> providedSpWcMap = new ConcurrentHashMap<>();
                    Map<Integer, Integer> failedAreaSpWcMap = new ConcurrentHashMap<>();
                    Map<Integer, Integer> failedDimensionSpWcMap = new ConcurrentHashMap<>();

                    //TODO: CHECK DIMENSION OF THESE MEASUREMENTS.
                    providedWcMale +=b.getSanityDetails().getMaleVisitorsWaterClosets().size();
                    providedWcFemale +=b.getSanityDetails().getFemaleVisitorsWaterClosets().size();
                    providedCommonWc +=b.getSanityDetails().getMaleOrFemaleVisitorsWaterClosets().size();
                    providedCommonUrinal+= b.getSanityDetails().getMaleOrFemaleVisitorsUrinals().size();
                    providedUrinalForMale +=b.getSanityDetails().getMaleVisitorUrinals().size();
                    
                    for (Floor f : b.getBuilding().getFloors()) {
	                    providedCommonWashBasin +=f.getVisitorCommonWashBasins().size(); 
	                    providedMaleWashBasin +=f.getMaleVisitorWashBasins().size();
	                    providedFemaleWashBasin+=f.getFemaleVisitorWashBasins().size();
	                  }
                    Map<String, BigDecimal> sanityDetailParkingArea = getParkingAreaDeclaredInsideBuilding(b);
                    for (Occupancy type : b.getBuilding().getOccupancies()) {
                        double buildUpArea = 0d;
						BigDecimal deductionArea = BigDecimal.valueOf(0);

						if (!sanityDetailParkingArea.isEmpty()
								&& sanityDetailParkingArea.containsKey(type.getTypeHelper().getType().getCode())) {
							deductionArea = sanityDetailParkingArea.get(type.getTypeHelper().getType().getCode());
						}
						
						if (type.getBuiltUpArea() != null && type.getBuiltUpArea().doubleValue() > 0)
                        {
                        	if(deductionArea.doubleValue() > 0 && (type.getBuiltUpArea().doubleValue()-deductionArea.doubleValue())>0)
                               buildUpArea = (type.getBuiltUpArea().doubleValue()-deductionArea.doubleValue());
                        	else
                               buildUpArea = type.getBuiltUpArea().doubleValue();
                        
                        }else {
                            pl.addError("Invalid Buildup area",
                                    "Buildup area is not calculated . Some thing wrong with builtup area");
                            return;
                        }
 
						switch (type.getTypeHelper().getType().getCode()) {
                         case C3://Medical admin
                         case C2://Medical OP
                         case C1://medical IP
                        	 if(totalMedicalOccupancyBuildUpArea.compareTo(BigDecimal.valueOf(1000))>0){
	                             processSpecialWaterClosetForVisitorsl(b, helper, scrutinyDetail, requiredSpWcMap,
	                                     providedSpWcMap, failedAreaSpWcMap, failedDimensionSpWcMap,RULE_34_3_1_TABLE_13_15__RULE_42);
	                         	 helper.maleWc += buildUpArea * 0.1 * 2 / (5.9 * 3 * 100);
	                             helper.femaleWc += buildUpArea * 0.1 / (5.9 * 3 * 50);
	                             helper.urinal += buildUpArea * 0.1 * 1 / (5.9 * 50);
	                             helper.commonWash += buildUpArea * 0.1 * 1 / (5.9 * 100);
	                        	 helper.ruleNo.add(RULE_34_3_1_TABLE_13_15__RULE_42);
	                        	 helper.occupanciesType.add(type.getTypeHelper().getType().getName());
                        	 }
                             break;
                        case D2://bus terminal
                             processSpecialWaterClosetForVisitorsl(b, helper, scrutinyDetail, requiredSpWcMap,
                                     providedSpWcMap, failedAreaSpWcMap, failedDimensionSpWcMap,RULE_34_3_1_34_3_3_TABLE_13_14__RULE_42);
                        	 if (buildUpArea/1.8 <= 1000)
                                helper.commonWc += 1d; //As per doc (4 x 0.1) rounded up to the next higher digit 
                            else
                                helper.commonWc += 4d + (((buildUpArea/1.8) - 1000)/1000)*0.1; 
                        	 
                            if (buildUpArea/1.8 <= 1000)
                                helper.urinal += 1d; //As per doc  (6 x 0.1) rounded up to the next higher digit 
                            else
                                helper.urinal += 6d + (((buildUpArea/1.8) - 1000) / (1000)) * 0.1;
                            
                            helper.maleWash += 1d;
                            helper.femaleWash += 1d; 
                            helper.ruleNo.add(RULE_34_3_1_34_3_3_TABLE_13_14__RULE_42);
                        	helper.occupanciesType.add(type.getTypeHelper().getType().getName());
 
                            break;
                        case E2:
                            processSpecialWaterClosetForVisitorsl(b, helper, scrutinyDetail, requiredSpWcMap,
                                    providedSpWcMap, failedAreaSpWcMap, failedDimensionSpWcMap,RULE_34_3_3_TABLE_13_14);
                    
                            helper.maleWc += ((buildUpArea * 2 / (5.9 * 3 * 25)) * 0.1);
                            helper.femaleWc += (buildUpArea / (5.9 * 3 * 15) * 0.1);
                            helper.urinal += buildUpArea * 1 / (5.9 * 25); 
                            helper.maleWash += 1d;
                            helper.femaleWash += 1d; 
                            helper.ruleNo.add(RULE_34_3_3_TABLE_13_14);
                            helper.ruleDescription = SANITY_RULE_DESC + type.getTypeHelper().getType().getName();
                            helper.occupanciesType.add(type.getTypeHelper().getType().getName());

                            break;
                        case I1:
                        case I2:
                        	   processSpecialWaterClosetForVisitorsl(b, helper, scrutinyDetail, requiredSpWcMap,
                                       providedSpWcMap, failedAreaSpWcMap, failedDimensionSpWcMap,RULE_34_3_34_3_3);
                      
                        	double worker = pl.getPlanInformation().getNumberOfWorkers().doubleValue();
                           
                            if(worker<=5)
                            	helper.commonWc+=1d;
                            if(worker==0 || worker>5)
                            {
                            	if((buildUpArea/30)<=50){
                            	       helper.femaleWc += 1d;
                                       helper.maleWc += 1d;
                            	}
                            	else{
                            		helper.maleWc += (1d+ ((buildUpArea/30)-50) * 2 / (3 * 70))  * 0.1;
                            		helper.femaleWc +=(2d+ ((buildUpArea/30)-50) * 1 / (3 * 70)) * 0.1;
                                    
                            	}
                            }
                            helper.maleWash += 1d;
                            helper.femaleWash += 1d; 
                            helper.urinal += (((buildUpArea/30) * 2 / (3 * 100)) * 0.1);
                            helper.ruleNo.add(RULE_34_3_34_3_3);
                       	    helper.occupanciesType.add(type.getTypeHelper().getType().getName());

                            break;

                        }
                    }
                    for (Map.Entry<Integer, Integer> req : requiredSpWcMap.entrySet())
                        helper.requiredSpecialWc += req.getValue();
                    for (Map.Entry<Integer, Integer> pro : providedSpWcMap.entrySet())
                        helper.providedSpecialWc += pro.getValue();
                    for (Map.Entry<Integer, Integer> pro : failedAreaSpWcMap.entrySet())
                        helper.failedAreaSpecialWc += pro.getValue();
                    for (Map.Entry<Integer, Integer> pro : failedDimensionSpWcMap.entrySet())
                        helper.failedDimensionSpecialWc += pro.getValue();

                    if (helper.requiredSpecialWc > 0 && helper.requiredSpecialWc>0) {
                        Set<String> ruleNo = new HashSet<>();
                        ruleNo.add(RULE_42);
                        if (helper.failedAreaSpecialWc > 0 && helper.failedAreaSpecialWc <= helper.requiredSpecialWc)
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum Area", MINIMUM_AREA_SPWC,
                                    String.valueOf(helper.failedAreaSpecialWc.intValue()) + " not having area 2.625 M2",
                                    Result.Not_Accepted.getResultVal(), scrutinyDetail);
                        else
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum Area", MINIMUM_AREA_SPWC,
                                    String.valueOf(helper.providedSpecialWc.intValue() - helper.failedAreaSpecialWc.intValue())
                                            + " having area 2.625 M2",
                                    Result.Accepted.getResultVal(), scrutinyDetail);

                        if (helper.failedDimensionSpecialWc > 0 && helper.failedDimensionSpecialWc <= helper.requiredSpecialWc)
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum Dimension",
                                    MINIMUM_DIMENSION_SPWC,
                                    String.valueOf(helper.failedDimensionSpecialWc.intValue()) + " not having dimension 1.5M",
                                    Result.Not_Accepted.getResultVal(), scrutinyDetail);
                        else
                            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum Dimension",
                                    MINIMUM_DIMENSION_SPWC,
                                    String.valueOf(
                                            helper.providedSpecialWc.intValue() - helper.failedDimensionSpecialWc.intValue())
                                            + " having dimension 1.5M",
                                    Result.Accepted.getResultVal(), scrutinyDetail);
							}

						}
					}

         	   processUrinalsForVisitors(pl, helper, scrutinyDetail,providedCommonUrinal,providedUrinalForMale);
         	   processVisitorWaterCloset(pl, helper, scrutinyDetail,providedWcMale,providedWcFemale,providedCommonWc);
         	   processVisitorWash(pl, helper, scrutinyDetail,providedCommonWashBasin,providedMaleWashBasin,providedFemaleWashBasin);
 
         	   pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

			}
		}
	}

    /*
     * private Boolean processSpecialWaterCloset(Block block, SanityHelper helper, ScrutinyDetail detail, Map<Integer, Integer>
     * spWcMap) { boolean notFound = false; StringBuilder expectedResult = new StringBuilder(); StringBuilder actualResult = new
     * StringBuilder(); expectedResult.append(
     * " Minimum one at Ground Floor + Minimum 1 at every floors in multiples of 3, (GF, 3rd, 6th etc)" ); StringBuilder
     * notFoundFloors = new StringBuilder(); StringBuilder foundFloors = new StringBuilder(); int required = 0; int provided = 0;
     * for (Floor f : block.getBuilding().getFloors()) { if (f.getNumber().intValue() < 0) continue; if (f.getNumber() % 3 == 0) {
     * if(spWcMap.containsKey(f.getNumber())) continue; else spWcMap.put(f.getNumber(), 1); required++; if
     * (f.getSpecialWaterClosets().isEmpty()) { notFound = true; if (notFoundFloors.length() != 0) notFoundFloors.append(", ");
     * notFoundFloors.append(" Floor " + f.getNumber()); } else { provided++; foundFloors.append(" Floor " + f.getNumber()); } } }
     * if (notFound) { actualResult.append("Not found at following Mandatory levels " + notFoundFloors);
     * addReportDetail(RULE_40_A_4, BLDG_PART_SPECIAL_WATER_CLOSET +
     * " - Minimum one at Ground Floor + Minimum 1 at every floors in multiples of 3, (GF, 3rd, 6th etc)" ,
     * String.valueOf(required), String.valueOf(provided), Result.Not_Accepted.getResultVal(), detail); } else {
     * actualResult.append(" found at following Mandatory levels " + foundFloors); addReportDetail(RULE_40_A_4,
     * BLDG_PART_SPECIAL_WATER_CLOSET +
     * " - Minimum one at Ground Floor + Minimum 1 at every floors in multiples of 3, (GF, 3rd, 6th etc)" ,
     * String.valueOf(required), String.valueOf(provided), Result.Accepted.getResultVal(), detail); } return !notFound; }
     */

    private void processVisitorWash(Plan pl, SanityHelper helper, ScrutinyDetail detail,
			Integer providedCommonWashBasin, Integer providedMaleWashBasin, Integer providedFemaleWashBasin) {
         String description = "";
         String expected = "";
         String actual = "";
        if (helper.maleWash > 0 || helper.femaleWash > 0|| helper.commonWash>0) {

            int actualWash = providedCommonWashBasin+providedMaleWashBasin+providedFemaleWashBasin;
            description = "Visitor "+BLDG_PART_WASHBASIN + " - Count";
            Double totalWashExpected = Math.ceil(helper.maleWash + helper.femaleWash + helper.commonWash);
            expected = "" + totalWashExpected.intValue();
            actual = "" + actualWash;
            if (totalWashExpected.intValue() >= 0) {
                if (totalWashExpected.intValue() > actualWash) {
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Not_Accepted.getResultVal(),
                            detail);
                } else {
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Accepted.getResultVal(),
                            detail);
                }
            }
        }		
	}

	private Boolean processUrinalsForVisitors(Plan pl, SanityHelper helper, ScrutinyDetail detail,
			Integer providedCommonUrinal, Integer providedUrinalForMale) {
        Boolean accepted = true;
        String description = "";
        String expected = "";
        String actual = "";
          if (helper.urinal > 0 || helper.commonUrinal>0) {
            helper.urinal = Math.ceil(helper.urinal); //todo: check this logic required
            description = BLDG_PART_VISITOR_URINAL + " - Count";
        
        
            Integer urinalActual = providedCommonUrinal + providedUrinalForMale;
            Double urinalsExpected = Math.ceil(helper.urinal + helper.commonUrinal ); 
            expected = "" + urinalsExpected.intValue();
            actual = "" + urinalActual.intValue();
            if (urinalsExpected.intValue() >= 0) {
                if (urinalActual.intValue()>= urinalsExpected.intValue()){
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Accepted.getResultVal(),
                            detail);
                } else {
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Not_Accepted.getResultVal(),
                            detail);
                }
            }
        }
       return accepted;
    
		}

	private Boolean processVisitorWaterCloset(Plan pl, SanityHelper helper, ScrutinyDetail detail, 
			Integer providedWcMale, Integer providedWcFemale, Integer providedCommonWc) {
        Boolean accepted = true;
        String description = "";
        String expected = "";
        String actual = "";
 
        if (helper.maleWc > 0 || helper.femaleWc > 0 || helper.commonWc > 0 ) {
    	 	             		
    		            Double totalWCActual = Math.ceil(providedWcMale + providedWcFemale + providedCommonWc);
    		            Double totalWCExpected = Math.ceil(helper.maleWc + helper.femaleWc+ helper.commonWc); 
    		            if (totalWCExpected > 0) {
    		                expected = "" + totalWCExpected.intValue();
    		                actual = "" + totalWCActual.intValue();
    		                description = BLDG_PART_VISITOR_WATER_CLOSET + " - Count";
    		                if (totalWCExpected.intValue() > totalWCActual.intValue()) {
    		                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Not_Accepted.getResultVal(),
    		                            detail);
    		                } else {
    		                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Accepted.getResultVal(),
    		                            detail);
    		
    		                } 
    		            }
    	        }
         return accepted;
    
	}

	private void processSpecialWaterCloset(Block block, Map<Integer, Integer> requiredSpWcMap,
            Map<Integer, Integer> providedSpWcMap, Map<Integer, Integer> failedAreaSpWcMap,
            Map<Integer, Integer> failedDimensionSpWcMap) {
        for (Floor f : block.getBuilding().getFloors()) {
            if (f.getNumber().intValue() < 0)
                continue;
            if (!f.getTerrace() && f.getNumber() % 3 == 0) {
                if (requiredSpWcMap.containsKey(f.getNumber()))
                    continue;
                else
                    requiredSpWcMap.put(f.getNumber(), 1);
                if (f.getSpecialWaterClosets().isEmpty()) {
                    // not defined
                } else if (providedSpWcMap.containsKey(f.getNumber()))
                    continue;
                else
                    providedSpWcMap.put(f.getNumber(), 1);

                validateDimensionOfSPWC(f.getSpecialWaterClosets(), f.getNumber(), failedAreaSpWcMap, failedDimensionSpWcMap,
                        providedSpWcMap);
            }
        }
    }

    private Boolean processSpecialWaterClosetForResidential(Block block, SanityHelper helper, ScrutinyDetail detail,
            Map<Integer, Integer> requiredSpWcMap, Map<Integer, Integer> providedSpWcMap,
            Map<Integer, Integer> failedAreaSpWcMap, Map<Integer, Integer> failedDimensionSpWcMap) {
        boolean notFound = false;
        StringBuilder expectedResult = new StringBuilder();
        StringBuilder actualResult = new StringBuilder();
        expectedResult.append(" Minimum one at Ground Floor");
        int required = 0;
        int provided = 0;
        for (Floor f : block.getBuilding().getFloors()) {
            if (f.getNumber().intValue() < 0)
                continue;
            if (f.getNumber() == 0) {
                required++;
                provided++;
                if (f.getSpecialWaterClosets().isEmpty())
                    notFound = true;

                validateDimensionOfSPWC(f.getSpecialWaterClosets(), f.getNumber(), failedAreaSpWcMap, failedDimensionSpWcMap,
                        providedSpWcMap);

            }
        }
        Set<String> ruleNo = new HashSet<>();
        ruleNo.add(RULE_42);
        if (notFound) {
            actualResult.append("Not Found");
            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum one at Ground Floor", String.valueOf(required),
                    String.valueOf(provided),
                    Result.Not_Accepted.getResultVal(), detail);
        } else {
            actualResult.append("Found");
            addReportDetail(ruleNo, BLDG_PART_SPECIAL_WATER_CLOSET + " - Minimum one at Ground Floor", String.valueOf(required),
                    String.valueOf(provided),
                    Result.Accepted.getResultVal(), detail);
        }

        return !notFound;
    }
    private Boolean processSpecialWaterClosetForVisitorsl(Block block, SanityHelper helper, ScrutinyDetail detail,
            Map<Integer, Integer> requiredSpWcMap, Map<Integer, Integer> providedSpWcMap,
            Map<Integer, Integer> failedAreaSpWcMap, Map<Integer, Integer> failedDimensionSpWcMap,String ruleNumber) {
        boolean notFound = false;
        StringBuilder expectedResult = new StringBuilder();
        StringBuilder actualResult = new StringBuilder();
        expectedResult.append(" Minimum one at Ground Floor");
        int required = 0;
        int provided = 0;
        for (Floor f : block.getBuilding().getFloors()) {
            if (f.getNumber().intValue() < 0)
                continue;
            if (f.getNumber() == 0) {
                required++;
                provided++;
                if (f.getCommonVisitorSpecialWaterClosets().isEmpty())
                    notFound = true;

                validateDimensionOfSPWC(f.getCommonVisitorSpecialWaterClosets(), f.getNumber(), failedAreaSpWcMap, failedDimensionSpWcMap,
                        providedSpWcMap);

            }
        }
        Set<String> ruleNo = new HashSet<>();
        ruleNo.add(ruleNumber);
        if (notFound) {   
            actualResult.append("Not Found");
            addReportDetail(ruleNo, BLDG_PART_VISITOR_SPECIAL_WATER_CLOSET + " - Minimum one at Ground Floor", String.valueOf(required),
                    String.valueOf(provided),
                    Result.Not_Accepted.getResultVal(), detail);
        } else {
            actualResult.append("Found");
            addReportDetail(ruleNo, BLDG_PART_VISITOR_SPECIAL_WATER_CLOSET + " - Minimum one at Ground Floor", String.valueOf(required),
                    String.valueOf(provided),
                    Result.Accepted.getResultVal(), detail);
        }

        return !notFound;
    }

    /*
     * private Boolean processWashBasinsFloorWise(PlanDetail planDetail, Block block, SanityHelper helper, ScrutinyDetail detail,
     * Occupancy occupancy) { helper.ruleDescription = "" + BLDG_PART_WASHBASIN; Set<String> ruleNo = new HashSet<>();
     * ruleNo.add(RULE_54_6); boolean found = false; StringBuilder expectedResult = new StringBuilder(); StringBuilder
     * actualResult = new StringBuilder(); expectedResult.append("Preferably one at each floor "); StringBuilder foundFloors = new
     * StringBuilder(); for (Floor f : block.getBuilding().getFloors()) { if (f.getNumber().intValue() < 0) continue; if
     * (!f.getWashBasins().isEmpty()) { found = true; if (foundFloors.length() != 0) foundFloors.append(", ");
     * foundFloors.append(" Floor " + f.getNumber()); } } if (found) { actualResult.append("Found at " + foundFloors);
     * addReportDetail(ruleNo, helper.ruleDescription, expectedResult.toString(), actualResult.toString(),
     * Result.Accepted.getResultVal(), detail); } return found; }
     */

    private Boolean processSanity(Plan pl, Block b, SanityHelper helper, ScrutinyDetail detail) {

        // int specialWC = sanityDetails.getTotalSpecialWC().size();

        Boolean accepted = true;
        String description = "";
        String expected = "";
        String actual = "";
        SanityDetails sanityDetails = b.getSanityDetails();

        if (helper.maleWc > 0 || helper.femaleWc > 0 || helper.commonWc > 0 ) {
        	processWaterClosets(helper, detail, sanityDetails);
        }
        if (helper.urinal > 0 || helper.commonUrinal>0) {
            helper.urinal = Math.ceil(helper.urinal);
            description = BLDG_PART_URINAL + " - Count";
            
            List<Measurement> urinalList = new ArrayList<>();
            urinalList.addAll(sanityDetails.getMaleUrinals());
            urinalList.addAll(sanityDetails.getCommonUrinals());

        
            Integer urinalActual = (urinalList!=null?urinalList.size():0);
            Double urinalsExpected = Math.ceil(helper.urinal + helper.commonUrinal ); 
            expected = "" + urinalsExpected.intValue();
            actual = "" + urinalActual.intValue();
            if (urinalsExpected.intValue() >= 0) {
                checkDimension(urinalsExpected.intValue(), detail, urinalList, 0.6d, 0.42d,
                        BLDG_PART_URINAL, DIMESION_DESC_KEY, RULE_34_1_1);
                if (urinalActual.intValue()>= urinalsExpected.intValue()){
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Accepted.getResultVal(),
                            detail);
                } else {
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Not_Accepted.getResultVal(),
                            detail);
                }
            }
        }

        if (helper.maleWash > 0 || helper.femaleWash > 0|| helper.commonWash>0) {

            int actualWash = 0;
            for (Floor f : b.getBuilding().getFloors()) {
                actualWash += f.getWashBasins().size();
            }
            description = BLDG_PART_WASHBASIN + " - Count";
            Double totalWashExpected = Math.ceil(helper.maleWash + helper.femaleWash + helper.commonWash);
            expected = "" + totalWashExpected.intValue();
            actual = "" + actualWash;
            if (totalWashExpected.intValue() >= 0) {
                if (totalWashExpected.intValue() > actualWash) {
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Not_Accepted.getResultVal(),
                            detail);
                } else {
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Accepted.getResultVal(),
                            detail);
                }
            }
        }

        if (helper.maleBath > 0 || helper.femaleBath > 0 || helper.commonBath>0) {
            description = BLDG_PART_BATHROOM + " - Count";
            int maleBathActual = sanityDetails.getMaleBathRooms().size()
                    + sanityDetails.getMaleRoomsWithWaterCloset().size();
            int femaleBathActual = sanityDetails.getFemaleBathRooms().size()
                    + sanityDetails.getFemaleRoomsWithWaterCloset().size();
            int commomBathActual = sanityDetails.getCommonBathRooms().size()
                    + sanityDetails.getCommonRoomsWithWaterCloset().size();
            int totalActualBath = maleBathActual + femaleBathActual + commomBathActual;
            Double totalBathExpected = Math.ceil(helper.maleBath + helper.femaleBath +helper.commonBath);

            expected = "" + totalBathExpected.intValue();
            actual = "" + totalActualBath;
            List<Measurement> wcList = new ArrayList<>();
            wcList.addAll(sanityDetails.getMaleBathRooms());
            wcList.addAll(sanityDetails.getFemaleBathRooms());
            wcList.addAll(sanityDetails.getCommonBathRooms());

            List<Measurement> wcrList = new ArrayList<>();
            wcrList.addAll(sanityDetails.getMaleRoomsWithWaterCloset());
            wcrList.addAll(sanityDetails.getFemaleRoomsWithWaterCloset());
            wcrList.addAll(sanityDetails.getCommonRoomsWithWaterCloset());
            if (totalBathExpected.intValue() >= 0) {
                checkDimension(totalBathExpected.intValue(), detail, wcList, 1.1d, 1.5d, BLDG_PART_BATHROOM,
                        DIMESION_DESC_KEY, RULE_34_1_1);

                checkDimension(totalBathExpected.intValue(), detail, wcrList, 1.1d, 2.2d, MALE_BATH_WITH_WC,
                        DIMESION_DESC_KEY, RULE_34_1_1);

                if (totalBathExpected.intValue() > totalActualBath) {
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Not_Accepted.getResultVal(),
                            detail);
                } else {
                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Accepted.getResultVal(),
                            detail);

                }
            }
        }

        /*
         * if (pl.getPlanInformation().getNoOfBeds() != null && C1.equals(occupancy.getType()))
         * addReportDetail(RULE_55_12, NOOFBEDS, "-", pl.getPlanInformation().getNoOfBeds().toString(),
         * Result.Accepted.getResultVal(), detail);
         */
        return accepted;
    }

	private void processWaterClosets(SanityHelper helper, ScrutinyDetail detail, SanityDetails sanityDetails) {
		String description = "";
		String expected = "";
		String actual = "";
		//TODO: VERIFY All SP_WC provided may be included in no of male WATER_CLOSET provided.
		            int maleWcActual = sanityDetails.getMaleWaterClosets().size()
		                    + sanityDetails.getMaleRoomsWithWaterCloset().size();
		            int femaleWcActual = sanityDetails.getFemaleWaterClosets().size()
		                    + sanityDetails.getFemaleRoomsWithWaterCloset().size();
		            int commonWcActual = sanityDetails.getCommonWaterClosets().size()
		                    + sanityDetails.getCommonRoomsWithWaterCloset().size();
		            Double specialWC = helper.providedSpecialWc;
		
		            Double totalWCActual = Math.ceil(maleWcActual + femaleWcActual + commonWcActual + specialWC );
		            Double totalWCExpected = Math.ceil(helper.maleWc + helper.femaleWc+ helper.commonWc);//TODO irrespective of type, validations added. Not specifically like common water closet not considered.
		            if (totalWCExpected > 0) {
		                List<Measurement> wcList = new ArrayList<>();
		                wcList.addAll(sanityDetails.getMaleWaterClosets());
		                wcList.addAll(sanityDetails.getFemaleWaterClosets());
		                wcList.addAll(sanityDetails.getCommonWaterClosets());
		             
		                checkDimension(totalWCExpected.intValue(), detail, wcList, 1d, 1.1d, BLDG_PART_WATER_CLOSET,
		                        DIMESION_DESC_KEY, RULE_34_1_1); 
		
		                expected = "" + totalWCExpected.intValue();
		                actual = "" + totalWCActual.intValue();
		                description = BLDG_PART_WATER_CLOSET + " - Count";
		                if (totalWCExpected.intValue() > totalWCActual.intValue()) {
		                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Not_Accepted.getResultVal(),
		                            detail);
		                } else {
		                    addReportDetail(helper.ruleNo, description, expected, actual, Result.Accepted.getResultVal(),
		                            detail);
		
		                } 
		            }
	}

    private boolean checkDimension(Integer required, ScrutinyDetail scrutinyDetail, List<Measurement> list,
            double minSide, double minArea, String type, String desc, String ruleNum) {
        if (!list.isEmpty()) {
            int wcNotMeetingSide = checkDimensionSide(list, minSide);
            int wcNotMeetingArea = checkDimensionArea(list, minArea);

            int totalSize = list.size();
            desc = type + "- Minimum Dimension";

            String expectedResult = minSide + " M";
            String actualResult = "";
            Set<String> ruleNo = new HashSet<>();
            ruleNo.add(ruleNum);
            if (totalSize - wcNotMeetingSide < required && wcNotMeetingSide > 0) {
                actualResult = wcNotMeetingSide + " not having " + expectedResult;
                addReportDetail(ruleNo, desc, expectedResult, actualResult, Result.Not_Accepted.getResultVal(),
                        scrutinyDetail);

            } else {
                actualResult = totalSize + " having " + expectedResult;
                addReportDetail(ruleNo, desc, expectedResult, actualResult, Result.Accepted.getResultVal(),
                        scrutinyDetail);
            }

            desc = type + "- Minimum Area";
            expectedResult = minArea + " M2";
            if (totalSize - wcNotMeetingArea < required && wcNotMeetingArea > 0) {
                actualResult = wcNotMeetingArea + " not having " + expectedResult;
                addReportDetail(ruleNo, desc, expectedResult, actualResult, Result.Not_Accepted.getResultVal(),
                        scrutinyDetail);

            } else {
                actualResult = totalSize + "  having " + expectedResult;
                addReportDetail(ruleNo, desc, expectedResult, actualResult, Result.Accepted.getResultVal(),
                        scrutinyDetail);
            }

        }
        return true;
    }

    private void addReportDetail(Set<String> ruleNo, String ruleDesc, String expected, String actual, String status,
            ScrutinyDetail detail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo.stream().map(String::new).collect(Collectors.joining(",")));
        details.put(DESCRIPTION, ruleDesc);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        detail.getDetail().add(details);

    }

    private int checkDimensionSide(List<Measurement> measurements, Double minValue) {
        int failedCount = 0;
        for (Measurement m : measurements) {
            if (minValue == 0) {

            }
            double minSide = m.getMinimumSide()
                    .setScale(DcrConstants.ONE_DECIMALDIGITS_MEASUREMENTS, DcrConstants.ROUNDMODE_MEASUREMENTS)
                    .doubleValue();
            if (minSide < minValue) {
                m.setIsValid(false);
                m.appendInvalidReason(String.format(MINIMUM_SIDE_DIMENSION_VIOLATED, minValue));
                failedCount++;
            }
        }
        return failedCount;
    }

    private int checkDimensionArea(List<Measurement> measurements, Double minValue) {
        int failedCount = 0;
        for (Measurement m : measurements) {

            double area = m.getArea()
                    .setScale(DcrConstants.THREE_DECIMALDIGITS_MEASUREMENTS, DcrConstants.ROUNDMODE_MEASUREMENTS)
                    .doubleValue();
            if (area < minValue) {
                m.setIsValid(false);
                m.appendInvalidReason(String.format(MINIMUM_AREA_DIMENSION_VIOLATED, minValue));
                failedCount++;
                LOG.debug("Area not matching is " + m.getArea());
            }
        }
        return failedCount;
    }

    private void validateDimensionOfSPWC(List<Measurement> spwcs, int flrNo, Map<Integer, Integer> failedAreaSpWcMap,
            Map<Integer, Integer> failedDimensionSpWcMap, Map<Integer, Integer> providedSpWcMap) {

        Integer failedAreaCount = 0;
        Integer failedDimensionCount = 0;
        Integer providedSpecialWc = 0;

        for (Map.Entry<Integer, Integer> pro : providedSpWcMap.entrySet()) {
            providedSpecialWc += pro.getValue();
        }

        for (Measurement spwc : spwcs) {
            BigDecimal area = spwc.getArea().setScale(DcrConstants.THREE_DECIMALDIGITS_MEASUREMENTS,
                    DcrConstants.ROUNDMODE_MEASUREMENTS);
            BigDecimal width = spwc.getWidth().setScale(DcrConstants.ONE_DECIMALDIGITS_MEASUREMENTS,
                    DcrConstants.ROUNDMODE_MEASUREMENTS);
            if (area.compareTo(MINAREAOFSPWC.setScale(DcrConstants.THREE_DECIMALDIGITS_MEASUREMENTS,
                    DcrConstants.ROUNDMODE_MEASUREMENTS)) < 0) {
                failedAreaCount++;
            }
            if (width.compareTo(MINDIMENSIONOFSPWC.setScale(DcrConstants.ONE_DECIMALDIGITS_MEASUREMENTS,
                    DcrConstants.ROUNDMODE_MEASUREMENTS)) < 0) {
                failedDimensionCount++;
            }

            if (providedSpecialWc == failedAreaCount) { //TODO: As of now, if all defined special water closet area wrong, it validating.. if any others are correct then ignoring.
                failedAreaSpWcMap.put(flrNo, failedAreaCount);
            }

            if (providedSpecialWc == failedDimensionCount) {
                failedDimensionSpWcMap.put(flrNo, failedAreaCount);
            }

        }

    }

    @Override
    public Map<String, Date> getAmendments() {
        return new LinkedHashMap<>();
    }
}
