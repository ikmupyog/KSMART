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

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_010923;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_011020;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_OCT20;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_SEP23;
import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.A5;
import static org.egov.edcr.constants.DxfFileConstants.B1;
import static org.egov.edcr.constants.DxfFileConstants.B2;
import static org.egov.edcr.constants.DxfFileConstants.B3;
import static org.egov.edcr.constants.DxfFileConstants.C;
import static org.egov.edcr.constants.DxfFileConstants.C1;
import static org.egov.edcr.constants.DxfFileConstants.C2;
import static org.egov.edcr.constants.DxfFileConstants.C3;
import static org.egov.edcr.constants.DxfFileConstants.D;
import static org.egov.edcr.constants.DxfFileConstants.D1;
import static org.egov.edcr.constants.DxfFileConstants.D2;
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.F4;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.utility.DcrConstants.BSMT_REAR_YARD_DESC;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.NA;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.REAR_YARD_DESC;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.YES;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Building;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Plot;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.common.entity.edcr.SetBack;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.stereotype.Service;

@Service
public class RearYardService extends GeneralRule {
	private static final double VALUE_0_5 = 0.5;
    private static final String LEVEL = " Level ";
    private static final String RULE_24_4 = "24(4)";
    private static final String RULE_54_3_II = "54-(3-ii)";

    private static final String RULE_55_2_1 = "55-2-(1)";
    private static final String RULE_55_2_2 = "55-2-(2)";
    private static final String RULE_55_2_PROV = "55-2(Prov)";
    private static final String RULE_55_2_3 = "55-2-(3)";
    private static final String RULE563D = "56-(3d)";
    private static final String RULE_57_4 = "57-(4)";
    private static final String RULE_59_3 = "59-(3)";
    private static final String RULE_62_1_A = "62-(1-a)";
    private static final String RULE_62_3 = "62-(3)";
    private static final String RULE_59_11 = "59-(11)";

    private static final String SUB_RULE_24_4 = "24(4)";
    private static final String SUB_RULE_24_5 = "24(5)";
    private static final String SUB_RULE_24_12 = "24(12)";
    private static final String SUB_RULE_24_12_DESCRIPTION = "Basement rear yard distance";

    private static final String SUB_RULE_24_4_DESCRIPTION = "Rear yard distance";
    private static final String MEANMINIMUMLABEL = "(Minimum distance,Mean distance) ";
    private static final String MINIMUMLABEL = "Minimum distance ";

    private static final BigDecimal FIVE = BigDecimal.valueOf(5);

    private static final BigDecimal REARYARDMINIMUM_DISTANCE_0 = BigDecimal.valueOf(0);
    private static final BigDecimal REARYARDMINIMUM_DISTANCE_1_5 = BigDecimal.valueOf(1.5);

    private static final BigDecimal REARYARDMINIMUM_DISTANCE_1 = BigDecimal.valueOf(1);
    private static final BigDecimal REARYARDMINIMUM_DISTANCE_FIFTY_CM = BigDecimal.valueOf(0.50);
    private static final BigDecimal REARYARDMINIMUM_DISTANCE_SEVENTYFIVE_CM = BigDecimal.valueOf(0.75);
    private static final BigDecimal REARYARDMINIMUM_DISTANCE_3 = BigDecimal.valueOf(3);
    private static final BigDecimal REARYARDMINIMUM_DISTANCE_5 = FIVE;
    private static final BigDecimal REARYARDMINIMUM_DISTANCE_7_5 = BigDecimal.valueOf(7.5);

    private static final BigDecimal REARYARDMEAN_DISTANCE_0 = BigDecimal.valueOf(0);
    private static final BigDecimal REARYARDMEAN_DISTANCE_1 = BigDecimal.valueOf(1);
    private static final BigDecimal REARYARDMEAN_DISTANCE_1_5 = BigDecimal.valueOf(1.5);
    private static final BigDecimal REARYARDMEAN_DISTANCE_SEVENTYFIVE_CM = BigDecimal.valueOf(0.75);
    private static final BigDecimal REARYARDMEAN_DISTANCE_2 = BigDecimal.valueOf(2);
    private static final BigDecimal REARYARDMEAN_DISTANCE_3 = BigDecimal.valueOf(3);
    private static final BigDecimal REARYARDMEAN_DISTANCE_5 = BigDecimal.valueOf(5);
    private static final BigDecimal REARYARDMEAN_DISTANCE_7_5 = BigDecimal.valueOf(7.5);
    private static final BigDecimal ONEHUNDREDFIFTY = BigDecimal.valueOf(150);
    private static final BigDecimal THREEHUNDRED = BigDecimal.valueOf(300);

    private static final int SITEAREA_125 = 125;
    private static final int BUILDUPAREA_300 = 300;
    private static final int BUILDUPAREA_150 = 150;

    private static final int FLOORAREA_800 = 800;
    private static final int FLOORAREA_500 = 500;
    private static final int FLOORAREA_300 = 300;

	private class RearYardResult {
		String rule;
		String subRule;
		Integer level;
		BigDecimal actualMeanDistance = BigDecimal.ZERO;
		BigDecimal actualMinDistance = BigDecimal.ZERO;
		String occupancy;
		BigDecimal expectedminimumDistance = BigDecimal.ZERO;
		BigDecimal expectedmeanDistance = BigDecimal.ZERO;
		boolean status = false;
	}

	public void processRearYard(final Plan pl) {

        final Plot plot = pl.getPlot();
        if (plot == null)
            return;

        validateRearYard(pl);

        if (plot != null && !pl.getBlocks().isEmpty())
            for (Block block : pl.getBlocks()) {  // for each block

                scrutinyDetail = new ScrutinyDetail();
                scrutinyDetail.addColumnHeading(1, RULE_NO);
                scrutinyDetail.addColumnHeading(2, LEVEL);
                scrutinyDetail.addColumnHeading(3, OCCUPANCY);
                scrutinyDetail.addColumnHeading(4, FIELDVERIFIED);
                scrutinyDetail.addColumnHeading(5, REQUIRED);
                scrutinyDetail.addColumnHeading(6, PROVIDED);
                scrutinyDetail.addColumnHeading(7, STATUS);
                RearYardResult rearYardResult = new RearYardResult();

                for (SetBack setback : block.getSetBacks()) {
                    BigDecimal min;
                    BigDecimal mean;

                    if (setback.getRearYard() != null
                            && setback.getRearYard().getMean().compareTo(BigDecimal.ZERO) > 0) {
                        min = setback.getRearYard().getMinimumDistance();
                        mean = setback.getRearYard().getMean();

                        // if height defined at rear yard level, then use elase use buidling height.
                        BigDecimal buildingHeight = setback.getRearYard().getHeight() != null
                                && setback.getRearYard().getHeight().compareTo(BigDecimal.ZERO) > 0
                                        ? setback.getRearYard().getHeight()
                                        : block.getBuilding().getBuildingHeight();

                        if (buildingHeight != null && (min.doubleValue() > 0 || mean.doubleValue() > 0)) {
                            List<Occupancy> occupanciesList = groupOccupanciesForOccupancy_C_D(pl, block);

                            for (final Occupancy occupancy : occupanciesList) {
                                OccupancyTypeHelper occpncy = occupancy.getTypeHelper();

                                if (occupancy.getBuiltUpArea() != null
                                        && occupancy.getBuiltUpArea().compareTo(ONEHUNDREDFIFTY) <= 0
                                        && D.equals(occupancy.getTypeHelper().getType().getCode()))
                                    occpncy = Util.getOccupancyByCode(pl, F);
                                else if (C.equals(occupancy.getTypeHelper().getType().getCode()) && occupancy.getBuiltUpArea() != null &&
                                        occupancy.getBuiltUpArea().compareTo(ONEHUNDREDFIFTY) <= 0)
                                    occpncy = Util.getOccupancyByCode(pl, F);
                                else if (H.equals(occupancy.getTypeHelper().getType().getCode()))
                                    if (occupancy.getBuiltUpArea() != null
                                            && occupancy.getBuiltUpArea().compareTo(THREEHUNDRED) <= 0)
                                        occpncy = Util.getOccupancyByCode(pl, F);
                                    else
                                        occpncy = Util.getOccupancyByCode(pl, H);
                                scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Rear Yard");

                                if (-1 == setback.getLevel()) {
                                    scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Basement Rear Yard");

                                    checkRearYardLessThanTenMts(pl, block.getBuilding(), block, setback.getLevel(), plot,
                                            BSMT_REAR_YARD_DESC, min, mean,
                                            occpncy, rearYardResult, BigDecimal.valueOf(10));

                                } else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) <= 0)
                                    checkRearYardLessThanTenMts(pl, block.getBuilding(), block, setback.getLevel(), plot,
                                            REAR_YARD_DESC, min, mean,
                                            occpncy, rearYardResult, buildingHeight);
                                else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) > 0
                                        && buildingHeight.compareTo(BigDecimal.valueOf(16)) <= 0)
                                    checkRearYardBetweenTenToSixteenMts(setback, block, pl,
                                            setback.getLevel(), plot, REAR_YARD_DESC,
                                            SUB_RULE_24_4_DESCRIPTION,
                                            min, mean,
                                            occpncy, rearYardResult);
                                else if (buildingHeight.compareTo(BigDecimal.valueOf(16)) > 0)
                                    checkRearYardMoreThanSixteenMts(setback, block,
                                            pl, setback.getLevel(), plot, REAR_YARD_DESC, min,
                                            mean,
                                            occpncy, rearYardResult);

                            }
                            Map<String, String> details = new HashMap<>();
                            details.put(RULE_NO, rearYardResult.subRule);
                            details.put(LEVEL, rearYardResult.level != null ? rearYardResult.level.toString() : "");
                            details.put(OCCUPANCY, rearYardResult.occupancy);
                            if (rearYardResult.expectedmeanDistance != null &&
                                    rearYardResult.expectedmeanDistance.compareTo(BigDecimal.valueOf(0)) == 0) {
                                details.put(FIELDVERIFIED, MINIMUMLABEL);
                                details.put(REQUIRED, rearYardResult.expectedminimumDistance.toString());
                                details.put(PROVIDED, rearYardResult.actualMinDistance.toString());

                            } else {
                                details.put(FIELDVERIFIED, MEANMINIMUMLABEL);
                                details.put(REQUIRED, "(" + rearYardResult.expectedminimumDistance + ","
                                        + rearYardResult.expectedmeanDistance + ")");
                                details.put(PROVIDED,
                                        "(" + rearYardResult.actualMinDistance + "," + rearYardResult.actualMeanDistance + ")");
                            }
                            if (rearYardResult.status)
                                details.put(STATUS, Result.Accepted.getResultVal());
                            else
                                details.put(STATUS, Result.Not_Accepted.getResultVal());
                            scrutinyDetail.getDetail().add(details);
                            pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

                        }
                    }
                }
            }

    }

    private List<Occupancy> groupOccupanciesForOccupancy_C_D(Plan pl, Block block) {
        List<Occupancy> occupanciesList = new ArrayList<>();
        BigDecimal totalFloorArea_C = BigDecimal.ZERO;
        BigDecimal totalBuiltUpArea_C = BigDecimal.ZERO;
        BigDecimal totalExistingFloorArea_C = BigDecimal.ZERO;
        BigDecimal totalExistingBuiltUpArea_C = BigDecimal.ZERO;

        BigDecimal totalFloorArea_D = BigDecimal.ZERO;
        BigDecimal totalBuiltUpArea_D = BigDecimal.ZERO;
        BigDecimal totalExistingFloorArea_D = BigDecimal.ZERO;
        BigDecimal totalExistingBuiltUpArea_D = BigDecimal.ZERO;

        for (Occupancy occupancy : block.getBuilding().getTotalArea())
            if (occupancy.getTypeHelper().getType().getCode().equals(C) ||
            		occupancy.getTypeHelper().getType().getCode().equals(C1) ||
            		occupancy.getTypeHelper().getType().getCode().equals(C2) ||
            		occupancy.getTypeHelper().getType().getCode().equals(C3)) {
                totalFloorArea_C = totalFloorArea_C.add(occupancy.getFloorArea());
                totalBuiltUpArea_C = totalBuiltUpArea_C
                        .add(occupancy.getBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getBuiltUpArea());
                totalExistingFloorArea_C = totalExistingFloorArea_C.add(occupancy.getExistingFloorArea());
                totalExistingBuiltUpArea_C = totalExistingBuiltUpArea_C.add(
                        occupancy.getExistingBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getExistingBuiltUpArea());
            } else if (occupancy.getTypeHelper().getType().getCode().equals(D) ||
            		occupancy.getTypeHelper().getType().getCode().equals(D1) ||
            		occupancy.getTypeHelper().getType().getCode().equals(D2)) {
                totalFloorArea_D = totalFloorArea_D.add(occupancy.getFloorArea());
                totalBuiltUpArea_D = totalBuiltUpArea_D
                        .add(occupancy.getBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getBuiltUpArea());
                totalExistingFloorArea_D = totalExistingFloorArea_D.add(occupancy.getExistingFloorArea());
                totalExistingBuiltUpArea_D = totalExistingBuiltUpArea_D.add(
                        occupancy.getExistingBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getExistingBuiltUpArea());
            } else
                occupanciesList.add(occupancy);
        if (totalFloorArea_C.compareTo(BigDecimal.ZERO) > 0 && totalBuiltUpArea_C.compareTo(BigDecimal.ZERO) > 0) {
            Occupancy occupancy = new Occupancy();
            occupancy.setFloorArea(totalFloorArea_C);
            occupancy.setCarpetArea(totalFloorArea_C.multiply(BigDecimal.valueOf(0.80)));
            occupancy.setTypeHelper(Util.getOccupancyByCode(pl, C));
            occupancy.setBuiltUpArea(totalBuiltUpArea_C);
            occupancy.setExistingBuiltUpArea(totalExistingBuiltUpArea_C);
            occupancy.setExistingFloorArea(totalExistingFloorArea_C);
            occupancy.setExistingCarpetArea(totalExistingFloorArea_C.multiply(BigDecimal.valueOf(0.80)));
            occupanciesList.add(occupancy);
        }
        if (totalFloorArea_D.compareTo(BigDecimal.ZERO) > 0 && totalBuiltUpArea_D.compareTo(BigDecimal.ZERO) > 0) {
            Occupancy occupancy = new Occupancy();
            occupancy.setFloorArea(totalFloorArea_D);
            occupancy.setCarpetArea(totalFloorArea_D.multiply(BigDecimal.valueOf(0.80)));
            occupancy.setTypeHelper(Util.getOccupancyByCode(pl, D));
            occupancy.setBuiltUpArea(totalBuiltUpArea_D);
            occupancy.setExistingBuiltUpArea(totalExistingBuiltUpArea_D);
            occupancy.setExistingFloorArea(totalExistingFloorArea_D);
            occupancy.setExistingCarpetArea(totalExistingFloorArea_D.multiply(BigDecimal.valueOf(0.80)));
            occupanciesList.add(occupancy);
        }
        return occupanciesList;
    }

    private Boolean checkRearYardMoreThanSixteenMts(SetBack setback, Block block, final Plan pl,
            Integer level, final Plot plot, final String rearYardFieldName,
            final BigDecimal min, final BigDecimal mean, final OccupancyTypeHelper mostRestrictiveOccupancy,
            RearYardResult rearYardResult) {
        Building building = block.getBuilding();
        Boolean valid = false;
        final String subRuleDesc = SUB_RULE_24_4_DESCRIPTION;
        BigDecimal buildingHeight = setback.getRearYard().getHeight() != null
                && setback.getRearYard().getHeight().compareTo(BigDecimal.ZERO) > 0 ? setback.getRearYard().getHeight()
                        : building.getBuildingHeight();

        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F) || mostRestrictiveOccupancy.getType().getCode().equals(F3))
            processRearYardForOccupancyA1A2FHightGtThanTenMtrs(setback, buildingHeight, pl, mostRestrictiveOccupancy,
                    block, level, plot, rearYardFieldName, subRuleDesc, block.getHighRiseBuilding(), rearYardResult);
        else {

            final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal
                            .valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
                                    .divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
                                    .doubleValue())));

            valid = processRearYardForOccupanciesOtherThanA1A2F(pl, building, block, level, plot, rearYardFieldName,
                    subRuleDesc, min, mean,
                    mostRestrictiveOccupancy, distanceIncrementBasedOnHeight, block.getHighRiseBuilding(), rearYardResult, buildingHeight);

        }
        return valid;
    }

    private Boolean checkRearYardLessThanTenMts(final Plan pl, Building building, Block block, Integer level,
            final Plot plot, final String rearYardFieldName,
            final BigDecimal min, final BigDecimal mean, final OccupancyTypeHelper mostRestrictiveOccupancy,
            RearYardResult rearYardResult, BigDecimal buildingHeight) {
        String subRule = SUB_RULE_24_4;
        String rule = REAR_YARD_DESC;
        String subRuleDesc = SUB_RULE_24_4_DESCRIPTION;
        Boolean valid = false;
        BigDecimal minVal = BigDecimal.valueOf(0);
        BigDecimal meanVal = BigDecimal.valueOf(0);

        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3)) {
            if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {

                if (building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(3)) <= 0) {
                    // rule = RULE62;
                    subRule = RULE_62_3;
                    minVal = REARYARDMINIMUM_DISTANCE_FIFTY_CM;
                    meanVal = REARYARDMEAN_DISTANCE_1;

                } else if (pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(YES) ||
                        pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(NA)) {
                    minVal = REARYARDMINIMUM_DISTANCE_1;
                    meanVal = REARYARDMEAN_DISTANCE_2;

                } else if (pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(YES) ||
                        pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(NA)) {
                    minVal = REARYARDMINIMUM_DISTANCE_SEVENTYFIVE_CM;
                    meanVal = REARYARDMEAN_DISTANCE_SEVENTYFIVE_CM;
                } else if (pl.getPlanInformation().getNocToAbutRearDesc().equalsIgnoreCase(YES)) {
                    minVal = REARYARDMINIMUM_DISTANCE_0;
                    meanVal = REARYARDMEAN_DISTANCE_0;

                } else {
                    minVal = REARYARDMINIMUM_DISTANCE_SEVENTYFIVE_CM;
                    meanVal = REARYARDMEAN_DISTANCE_SEVENTYFIVE_CM;

                }

            } else {
                subRule = SUB_RULE_24_4;
                // rule = DcrConstants.RULE24;
                // Plot area greater than 125 mts

                if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) {

                    if (pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(YES) ||
                            pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(NA)) {
                        minVal = REARYARDMINIMUM_DISTANCE_1;
                        meanVal = REARYARDMEAN_DISTANCE_1_5;

                    } else if (pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(DcrConstants.YES)
                            ||
                            pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(DcrConstants.NA)) {
                        minVal = REARYARDMINIMUM_DISTANCE_SEVENTYFIVE_CM;
                        meanVal = REARYARDMEAN_DISTANCE_SEVENTYFIVE_CM;

                    } else if (pl.getPlanInformation().getNocToAbutRearDesc().equalsIgnoreCase(DcrConstants.YES)) {
                        minVal = REARYARDMINIMUM_DISTANCE_0;
                        meanVal = REARYARDMEAN_DISTANCE_0;

                    } else {
                        minVal = REARYARDMINIMUM_DISTANCE_SEVENTYFIVE_CM;
                        meanVal = REARYARDMEAN_DISTANCE_SEVENTYFIVE_CM;
                    }

                } else if(block.getHighRiseBuilding() && level >= 0) {
                    minVal = REARYARDMINIMUM_DISTANCE_5;
                    meanVal = REARYARDMEAN_DISTANCE_5;
                }  else {
                    minVal = REARYARDMINIMUM_DISTANCE_1;
                    meanVal = REARYARDMEAN_DISTANCE_2;
                }
            }
            valid = validateMinimumAndMeanValue(min, mean, minVal, meanVal);
            if (-1 == level) {
                subRule = SUB_RULE_24_12;
                rule = BSMT_REAR_YARD_DESC;
                subRuleDesc = SUB_RULE_24_12_DESCRIPTION;
            }

            compareRearYardResult(block.getName(), min, mean, mostRestrictiveOccupancy, rearYardResult, valid, subRule, rule,
                    minVal,
                    meanVal, level);

        } else
            valid = processRearYardForOccupanciesOtherThanA1A2F(pl, building, block, level, plot, rearYardFieldName,
                    subRuleDesc, min, mean,
                    mostRestrictiveOccupancy, BigDecimal.ZERO, block.getHighRiseBuilding(), rearYardResult, buildingHeight);
        return valid;
    }

    private void compareRearYardResult(String blockName, BigDecimal min, BigDecimal mean, OccupancyTypeHelper mostRestrictiveOccupancy,
            RearYardResult rearYardResult, Boolean valid, String subRule, String rule, BigDecimal minVal, BigDecimal meanVal,
            Integer level) {
        if (minVal.compareTo(rearYardResult.expectedminimumDistance) >= 0) {
            if (minVal.compareTo(rearYardResult.expectedminimumDistance) == 0) {
                rearYardResult.rule = rearYardResult.rule != null ? rearYardResult.rule + "," + rule : rule;
                rearYardResult.occupancy = rearYardResult.occupancy != null
                        ? rearYardResult.occupancy + "," + mostRestrictiveOccupancy.getType().getName()
                        : mostRestrictiveOccupancy.getType().getName();

                if (meanVal.compareTo(rearYardResult.expectedmeanDistance) >= 0) {
                    rearYardResult.expectedmeanDistance = meanVal;
                    rearYardResult.actualMeanDistance = mean;
                }
            } else {
                rearYardResult.rule = rule;
                rearYardResult.occupancy = mostRestrictiveOccupancy.getType().getName();
                rearYardResult.expectedmeanDistance = meanVal;
                rearYardResult.actualMeanDistance = mean;

            }

            rearYardResult.subRule = subRule;
            rearYardResult.level = level;
            rearYardResult.expectedminimumDistance = minVal;
            rearYardResult.actualMinDistance = min;
            rearYardResult.status = valid;

        }
    }

    private Boolean checkRearYardBetweenTenToSixteenMts(SetBack setback, Block block, final Plan pl,
            Integer level, final Plot plot,
            final String rearYardFieldName,
            final String subRuleDesc, final BigDecimal min, final BigDecimal mean, final OccupancyTypeHelper mostRestrictiveOccupancy,
            RearYardResult rearYardResult) {
        Building building = block.getBuilding();
        Boolean valid = false;
        BigDecimal buildingHeight = setback.getRearYard().getHeight() != null
                && setback.getRearYard().getHeight().compareTo(BigDecimal.ZERO) > 0 ? setback.getRearYard().getHeight()
                        : building.getBuildingHeight();

        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5))
            processRearYardForOccupancyA1A2FHightGtThanTenMtrs(setback, buildingHeight, pl, mostRestrictiveOccupancy,
                    block, level, plot, rearYardFieldName, subRuleDesc, block.getHighRiseBuilding(), rearYardResult);
        else {

            final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal
                            .valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
                                    .divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
                                    .doubleValue())));
            valid = processRearYardForOccupanciesOtherThanA1A2F(pl, building, block, level, plot, rearYardFieldName,
                    subRuleDesc, min, mean,
                    mostRestrictiveOccupancy, distanceIncrementBasedOnHeight, block.getHighRiseBuilding(), rearYardResult, buildingHeight);

        }
        return valid;
    }

    private void processRearYardForOccupancyA1A2FHightGtThanTenMtrs(SetBack setbacks, BigDecimal buildingHeight,
            final Plan pl, OccupancyTypeHelper mostRestrictiveOccupancy, Block block, Integer level, final Plot plot,
            final String rearYardFieldName,
            final String subRuleDesc, final boolean isHighRisingBuilding, RearYardResult rearYardResult) {
        String subRule = SUB_RULE_24_4;
        String rule = REAR_YARD_DESC;
        BigDecimal minval;
        BigDecimal meanval;
        if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) > 0) {
            // rule = RULE24;
            subRule = SUB_RULE_24_4;
            minval = BigDecimal.valueOf(1);
            meanval = BigDecimal.valueOf(2);

        } else {
            // rule = RULE_62;
            subRule = RULE_62_1_A;
            minval = BigDecimal.valueOf(0.5);
            meanval = BigDecimal.valueOf(1);
        }

        if (mostRestrictiveOccupancy.getType().getCode().equals(F) || mostRestrictiveOccupancy.getType().getCode().equals(F1)
                || mostRestrictiveOccupancy.getType().getCode().equals(F4)
                || mostRestrictiveOccupancy.getType().getCode().equals(F2)/* || mostRestrictiveOccupancy.getType().getCode().equals(F3) */) {
            minval = BigDecimal.valueOf(1.5);
            meanval = BigDecimal.valueOf(1.5);
        }

        if (buildingHeight.compareTo(BigDecimal.TEN) > 0) {
            BigDecimal minValue = BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
                            .divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS).doubleValue())))
                    .add(minval);

            BigDecimal meanValue = BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
                            .divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS).doubleValue())))
                    .add(meanval);

            if (level >= 0 && isHighRisingBuilding) {
                minValue = minValue.compareTo(FIVE) <= 0 ? FIVE : minValue;
                meanValue = meanValue.compareTo(FIVE) <= 0 ? FIVE : meanValue;
            }
            
            if (setbacks.getRearYard().getMinimumDistance().compareTo(minValue) >= 0
                    && setbacks.getRearYard().getMean().compareTo(meanValue) >= 0)
                compareRearYardResult(block.getName(), setbacks.getRearYard().getMinimumDistance(),
                        setbacks.getRearYard().getMean(), mostRestrictiveOccupancy, rearYardResult, true, subRule, rule, minValue,
                        meanValue, level);
            else
                compareRearYardResult(block.getName(), setbacks.getRearYard().getMinimumDistance(),
                        setbacks.getRearYard().getMean(), mostRestrictiveOccupancy, rearYardResult, false, subRule, rule,
                        minValue,
                        meanValue, level);
        }
    }

    private Boolean processRearYardForOccupanciesOtherThanA1A2F(final Plan pl, Building building, Block block,
            Integer level, final Plot plot,
            final String rearYardFieldName,
            final String subRuleDesc, final BigDecimal min, final BigDecimal mean, final OccupancyTypeHelper mostRestrictiveOccupancy,
            final BigDecimal distanceIncrementBasedOnHeight,
            final Boolean checkMinimum5mtsCondition, RearYardResult rearYardResult, BigDecimal buildingHeight) {
        String subRule = SUB_RULE_24_5;
        String rule = REAR_YARD_DESC;
        BigDecimal minVal = BigDecimal.valueOf(0);
        BigDecimal meanVal = BigDecimal.valueOf(0);
        Boolean valid = false;

        if (mostRestrictiveOccupancy.getType().getCode().equals(B1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(B3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(B2)) {
            subRule = SUB_RULE_24_5;
            // rule = DcrConstants.RULE24;
            if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) {
                if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) <= 0) {
                    if (pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(YES)) {
                        minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                        meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5);

                    } else if (pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(YES)) {

                        minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_SEVENTYFIVE_CM);
                        meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_SEVENTYFIVE_CM);

                    } else if (pl.getPlanInformation().getNocToAbutRearDesc().equalsIgnoreCase(YES)) {
                        minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_0);
                        meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_0);
                    } else {
                        minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_SEVENTYFIVE_CM);
                        meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_SEVENTYFIVE_CM);
                    }

                } else if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) > 0
                        &&
                        building.getTotalBuitUpArea()
                                .compareTo(BigDecimal.valueOf(BUILDUPAREA_300)) <= 0) {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5);
                } else {
                    // rule = RULE_54;
                    subRule = RULE_54_3_II;
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
                }
            } else {
                // rule = RULE_54;
                subRule = RULE_54_3_II;
                if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) <= 0) {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);
                } else if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) > 0
                        &&
                        building.getTotalBuitUpArea()
                                .compareTo(BigDecimal.valueOf(BUILDUPAREA_300)) <= 0) {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);
                } else {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
                }

            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(C)
                || mostRestrictiveOccupancy.getType().getCode().equals(C1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C3)) {

            if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) {
                subRule = SUB_RULE_24_5;
                // rule = DcrConstants.RULE24;
                if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) <= 0) {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5);
                } else if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) > 0
                        &&
                        building.getTotalBuitUpArea()
                                .compareTo(BigDecimal.valueOf(BUILDUPAREA_300)) <= 0) {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5);
                } else {
                    // rule = RULE_54;
                    subRule = RULE_54_3_II;
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
                }
            } else {
                // rule = RULE_54;
                subRule = RULE_54_3_II;
                if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) <= 0) {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5);
                } else if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) > 0
                        &&
                        building.getTotalBuitUpArea()
                                .compareTo(BigDecimal.valueOf(BUILDUPAREA_300)) <= 0) {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);
                } else {
                    minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                    meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
                }

            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(D) || mostRestrictiveOccupancy.getType().getCode().equals(D2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(D1)) {
            if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_800)) > 0) {
                // rule = RULE_55;
                subRule = RULE_55_2_3;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);

            } else if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) > 0 &&
                    building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_800)) <= 0) {
                // rule = RULE_55;
                subRule = RULE_55_2_2;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
            } else if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_300)) > 0 &&
                    building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) <= 0) {
                // rule = RULE_55;
                subRule = RULE_55_2_1;

                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);
            } else if (mostRestrictiveOccupancy.getType().getCode().equals(D1)) {
                // rule = RULE_55;
                subRule = RULE_55_2_PROV;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5);
            } else {
                // rule = RULE_55;
                subRule = RULE_55_2_PROV;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);

            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(E) ||
                mostRestrictiveOccupancy.getType().getCode().equals(H)) {
            // rule = RULE24;
            subRule = SUB_RULE_24_5;

            if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_300)) <= 0) {

                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5);
            } else {
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
            }

        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F) /* || mostRestrictiveOccupancy.getType().getCode().equals(F3) */) {
            if (Util.isSmallPlot(pl)) { // latest change asked by client on feb22
                subRule = RULE563D;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_FIFTY_CM);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1);
            } else {
                subRule = RULE_24_4;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5);
            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F1)) {
            // rule = RULE_56;
            subRule = RULE563D;
            minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_5);
            meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_5);

        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F2)) {
            if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {
                // rule = RULE_56;
                subRule = RULE563D;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_FIFTY_CM);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1);
            } else {
                // rule = RULE_56;
                subRule = RULE563D;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1);
            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(G1)) {
            if (smallIndustrialBuilding(pl, building)) {
                subRule = RULE_24_4;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);
            } else {
                // rule = RULE_57;
                subRule = RULE_57_4;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_5);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_5);
            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(G2)) {
            // rule = RULE_57;
            if (smallIndustrialBuilding(pl, building)) {
                subRule = RULE_24_4;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);
            } else {
                subRule = RULE_57_4;
                minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_3);
                meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(I1)) {
            // rule = RULE_59;
            subRule = RULE_59_3;
            minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_3);
            meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(I2)) {
            // rule = RULE_59;
            subRule = RULE_59_3;
            minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_7_5);
            meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_7_5);
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F4)) {
            subRule = RULE_59_11;
            minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
            meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1);
        }

        if (level >= 0 && checkMinimum5mtsCondition) {
            minVal = minVal.compareTo(FIVE) <= 0 ? FIVE : minVal;
            meanVal = meanVal.compareTo(FIVE) <= 0 ? FIVE : meanVal;
        }

        valid = validateMinimumAndMeanValue(min, mean, minVal, meanVal);
        if (-1 == level) {
            subRule = SUB_RULE_24_12;
            rule = BSMT_REAR_YARD_DESC;

        }

        compareRearYardResult(block.getName(), min, mean, mostRestrictiveOccupancy, rearYardResult, valid, subRule, rule, minVal,
                meanVal, level);
        return valid;
    }

    private Boolean smallIndustrialBuilding(Plan pl, Building building) {
        BigDecimal totalarea = building.getTotalExistingBuiltUpArea() != null
                ? building.getTotalExistingBuiltUpArea().add(building.getTotalBuitUpArea())
                : building.getTotalBuitUpArea();
        if (building.getBuildingHeight().compareTo(BigDecimal.valueOf(10)) < 0
                && pl.getPlanInformation().getPowerUsedHp() != null &&
                pl.getPlanInformation().getPowerUsedHp() <= 30 &&
                pl.getPlanInformation().getNumberOfWorkers() != null &&
                pl.getPlanInformation().getNumberOfWorkers() <= 20
                && totalarea.compareTo(BigDecimal.valueOf(200)) < 0)
            return true;
        return false;
    }

    private Boolean validateMinimumAndMeanValue(final BigDecimal min, final BigDecimal mean, final BigDecimal minval,
            final BigDecimal meanval) {
        Boolean valid = false;
        if (min.compareTo(minval) >= 0 && mean.compareTo(meanval) >= 0)
            valid = true;
        return valid;
    }

    private void validateRearYard(final Plan pl) {
        for (Block block : pl.getBlocks())
            if (!block.getCompletelyExisting()) {
                Boolean rearYardDefined = false;
                for (SetBack setback : block.getSetBacks())
                    if (setback.getRearYard() != null
                            && setback.getRearYard().getMean().compareTo(BigDecimal.valueOf(0)) > 0)
                        rearYardDefined = true;
                if (!rearYardDefined && !pl.getPlanInformation().getNocToAbutRearDesc().equalsIgnoreCase(YES)) {
                    HashMap<String, String> errors = new HashMap<>();
                    errors.put(REAR_YARD_DESC,
                            prepareMessage(OBJECTNOTDEFINED, REAR_YARD_DESC + " for Block " + block.getName()));
                    pl.addErrors(errors);
                }
            }

    }
    
    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> rearYardAmendments = new ConcurrentHashMap<>();
        rearYardAmendments.put(AMEND_NOV19, AMEND_DATE_081119);
        rearYardAmendments.put(AMEND_OCT20, AMEND_DATE_011020);
        rearYardAmendments.put(AMEND_SEP23, AMEND_DATE_010923);
        return rearYardAmendments;
    }
}
