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
import static org.egov.edcr.constants.DxfFileConstants.A;
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
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.NA;
import static org.egov.edcr.utility.DcrConstants.NO;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.SIDE_YARD1_DESC;
import static org.egov.edcr.utility.DcrConstants.SIDE_YARD2_DESC;
import static org.egov.edcr.utility.DcrConstants.SIDE_YARD_DESC;
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
import org.egov.common.entity.edcr.OccupancyType;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Plot;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.common.entity.edcr.SetBack;
import org.egov.common.entity.edcr.Yard;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class SideYardService extends GeneralRule {

	private static final double VALUE_0_5 = 0.5;
    private static final String RULE_54_3 = "54(3)";
    private static final String RULE_52_3 = "52(3)";

    private static final String RULE_54_3_II = "54-(3-ii)";
    private static final String RULE_56_3_D = "56-(3d)";
    private static final String RULE_55_2_1 = "55-2-(1)";
    private static final String RULE_55_2_2 = "55-2-(2)";
    private static final String RULE_55_2_PROV = "55-2(Prov)";
    private static final String RULE_55_2_3 = "55-2-(3)";
    private static final String RULE_57_4 = "57(4)";
    private static final String RULE_59_3 = "59(3)";
    private static final String RULE_62_1_A = "62-(1-a)";
    private static final String SUB_RULE_24_5 = "24(5)";
    private static final String RULE_59_11 = "59(11)";
    private static final String SUB_RULE_24_5_PROVISION1 = "24(5) Provision1";
    private static final String SUB_RULE_24_5_PROVISION2 = "24(5) Provision2";
    private static final String SUB_RULE_24_12 = "24(12)";
    private static final BigDecimal FIVE = BigDecimal.valueOf(5);
    private static final BigDecimal SIDEVALUE_ZERO = BigDecimal.valueOf(0);
    private static final BigDecimal SIDEVALUE_SIXTY_CM = BigDecimal.valueOf(0.60);
    private static final BigDecimal SIDEVALUE_SIXTYONE_CM = BigDecimal.valueOf(0.601);

    private static final BigDecimal SIDEVALUE_SEVENTYFIVE_CM = BigDecimal.valueOf(0.75);
    private static final BigDecimal SIDEVALUE_NINTY_CM = BigDecimal.valueOf(0.90);

    private static final BigDecimal SIDEVALUE_ONE = BigDecimal.valueOf(1);
    private static final BigDecimal SIDEVALUE_ONE_TWO = BigDecimal.valueOf(1.2);

    private static final BigDecimal SIDEVALUE_ONEPOINTFIVE = BigDecimal.valueOf(1.5);
    private static final BigDecimal SIDEVALUE_TWO = BigDecimal.valueOf(2);
    private static final BigDecimal SIDEVALUE_THREE = BigDecimal.valueOf(3);
    private static final BigDecimal SIDEVALUE_FOUR = BigDecimal.valueOf(4);
    private static final BigDecimal SIDEVALUE_FIVE = BigDecimal.valueOf(5);
    private static final BigDecimal SIDEVALUE_SEVEN_FIVE = BigDecimal.valueOf(7.5);

    private static final int SITEAREA_125 = 125;
    private static final int BUILDUPAREA_300 = 300;
    private static final int BUILDUPAREA_150 = 150;

    private static final int FLOORAREA_800 = 800;
    private static final int FLOORAREA_500 = 500;
    private static final int FLOORAREA_300 = 300;
    private static final String SIDENUMBER = "Side Number";
    private static final String MEANMINIMUMLABEL = "(Minimum distance,Mean distance) ";
    private static final BigDecimal ONEHUNDREDFIFTY = BigDecimal.valueOf(150);
    private static final BigDecimal THREEHUNDRED = BigDecimal.valueOf(300);

    private class SideYardResult {
        String rule;
        String subRule;
        String blockName;
        Integer level;
        BigDecimal actualMeanDistance = BigDecimal.ZERO;
        BigDecimal actualDistance = BigDecimal.ZERO;
        String occupancy;
        BigDecimal expectedDistance = BigDecimal.ZERO;
        BigDecimal expectedmeanDistance = BigDecimal.ZERO;
        boolean status = false;
    }

    public void processSideYard(final Plan pl) {

        Plot plot = pl.getPlot();
        if (plot == null)
            return;

        validateSideYardRule(pl);

        // Side yard 1 and side yard 2 both may not mandatory in same levels. Get previous level side yards in this case.
        // In case of side yard 1 defined and other side not required, then consider other side as zero distance ( in case of noc
        // provided cases).

        if (plot != null && !pl.getBlocks().isEmpty())
            for (Block block : pl.getBlocks()) {  // for each block
                scrutinyDetail = new ScrutinyDetail();
                scrutinyDetail.addColumnHeading(1, RULE_NO);
                scrutinyDetail.addColumnHeading(2, LEVEL);
                scrutinyDetail.addColumnHeading(3, OCCUPANCY);
                scrutinyDetail.addColumnHeading(4, SIDENUMBER);
                scrutinyDetail.addColumnHeading(5, FIELDVERIFIED);
                scrutinyDetail.addColumnHeading(6, REQUIRED);
                scrutinyDetail.addColumnHeading(7, PROVIDED);
                scrutinyDetail.addColumnHeading(8, STATUS);
                SideYardResult sideYard1Result = new SideYardResult();
                SideYardResult sideYard2Result = new SideYardResult();

                boolean buildingIsOnlyCommercialType = getAllOccupanciesInBuildingAreCommercial(block);
                for (SetBack setback : block.getSetBacks()) {
                    Yard sideYard1 = null;
                    Yard sideYard2 = null;

                    if (setback.getSideYard1() != null && setback.getSideYard1().getMean().compareTo(BigDecimal.ZERO) > 0)
                        sideYard1 = setback.getSideYard1();
                    if (setback.getSideYard2() != null && setback.getSideYard2().getMean().compareTo(BigDecimal.ZERO) > 0)
                        sideYard2 = setback.getSideYard2();

                    if (sideYard1 != null || sideYard2 != null) {
                        if (sideYard1 == null)// mean side yard2 present and defined only in that level. Get sideyard1 from
                                              // previous level.
                        {
                            SetBack sideYardSetback = block.getLowerLevelSetBack(setback.getLevel(), SIDE_YARD1_DESC);
                            if (sideYardSetback != null && sideYardSetback.getSideYard1() != null &&
                                    sideYardSetback.getSideYard1().getMean().compareTo(BigDecimal.ZERO) > 0)
                                sideYard1 = sideYardSetback.getSideYard1();
                        }
                        if (sideYard2 == null)// mean side yard1 present and defined only in that level. Get sideyard2 from
                                              // previous level.
                        {
                            SetBack sideYardSetback = block.getLowerLevelSetBack(setback.getLevel(), SIDE_YARD2_DESC);
                            if (sideYardSetback != null && sideYardSetback.getSideYard2() != null &&
                                    sideYardSetback.getSideYard2().getMean().compareTo(BigDecimal.ZERO) > 0)
                                sideYard2 = sideYardSetback.getSideYard2();
                            else {
                                sideYard2 = new Yard();
                                sideYard2.setHeight(BigDecimal.ZERO);
                                sideYard2.setMinimumDistance(BigDecimal.ZERO);
                                sideYard2.setMean(BigDecimal.ZERO);
                            }// If side yard 2 not defined in case of NOC to abut side, then using empty yard.
                        }
                    }

                    BigDecimal buildingHeight;
                    if (sideYard1 != null && sideYard2 != null) {
                        // If there is changes in height of building, then consider the maximum height among both side
                        if (sideYard1.getHeight() != null && sideYard1.getHeight().compareTo(BigDecimal.ZERO) > 0
                                && sideYard2.getHeight() != null && sideYard2.getHeight().compareTo(BigDecimal.ZERO) > 0)
                            buildingHeight = sideYard1.getHeight().compareTo(sideYard2.getHeight()) >= 0 ? sideYard1.getHeight()
                                    : sideYard2.getHeight();
                        else
                            buildingHeight = sideYard1.getHeight() != null && sideYard1.getHeight().compareTo(BigDecimal.ZERO) > 0
                                    ? sideYard1.getHeight()
                                    : sideYard2.getHeight() != null && sideYard2.getHeight().compareTo(BigDecimal.ZERO) > 0
                                            ? sideYard2.getHeight()
                                            : block.getBuilding().getBuildingHeight();

                        double minlength = 0;
                        double max = 0;
                        double minMeanlength = 0;
                        double maxMeanLength = 0;
                        if (sideYard2 != null && sideYard1 != null)
                            /*
                             * minlength = sideYard2.getMinimumDistance().doubleValue(); max =
                             * sideYard1.getMinimumDistance().doubleValue(); minMeanlength= sideYard2.getMean().doubleValue();
                             * maxMeanLength=sideYard1.getMean().doubleValue(); }
                             */
                            if (sideYard2.getMinimumDistance().doubleValue() > sideYard1.getMinimumDistance().doubleValue()) {
                                minlength = sideYard1.getMinimumDistance().doubleValue();
                                max = sideYard2.getMinimumDistance().doubleValue();
                                minMeanlength = sideYard1.getMean().doubleValue();
                                maxMeanLength = sideYard2.getMean().doubleValue();

                            } else {
                                minlength = sideYard2.getMinimumDistance().doubleValue();
                                max = sideYard1.getMinimumDistance().doubleValue();
                                minMeanlength = sideYard2.getMean().doubleValue();
                                maxMeanLength = sideYard1.getMean().doubleValue();
                            }

                        if (buildingHeight != null && (minlength > 0 || max > 0)) {

                            if (pl.getPlanInformation().getPlotInCommercialZone().equalsIgnoreCase(DcrConstants.YES)
                                    && block.getBuilding().getBuildingHeight().compareTo(BigDecimal.valueOf(16)) < 0
                                    && buildingIsOnlyCommercialType) {
                                scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Side Yard");
                                if (-1 == setback.getLevel())
                                    scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Basement Side Yard");

                                checkOnlyCommercialOccupancyTypeForLessThan16MtBuilding(pl, block, sideYard1Result,
                                        sideYard2Result, setback, minlength, max, minMeanlength, maxMeanLength);

                            } else {

                                List<Occupancy> occupanciesList = groupOccupanciesForOccupancy_C_D(pl, block);

                                for (final Occupancy occupancy : occupanciesList) {
                                    OccupancyTypeHelper occpncy = occupancy.getTypeHelper();

                                    if (occupancy.getBuiltUpArea() != null && D.equals(occupancy.getTypeHelper().getType().getCode())
                                            && occupancy.getBuiltUpArea().compareTo(ONEHUNDREDFIFTY) <= 0)
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

                                    scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Side Yard");
                                    if (-1 == setback.getLevel()) {
                                        scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Basement Side Yard");
                                        checkSideYardLessThanTenOrEqualToMts(pl, block.getBuilding(),
                                                BigDecimal.valueOf(10), block.getName(), setback.getLevel(), plot,
                                                minlength, max, minMeanlength, maxMeanLength, occpncy, sideYard1Result,
                                                sideYard2Result);

                                    } else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) <= 0)
                                        checkSideYardLessThanTenOrEqualToMts(pl, block.getBuilding(), buildingHeight,
                                                block.getName(), setback.getLevel(), plot,
                                                minlength, max, minMeanlength, maxMeanLength, occpncy, sideYard1Result,
                                                sideYard2Result);
                                    else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) > 0
                                            && buildingHeight.compareTo(BigDecimal.valueOf(16)) <= 0)
                                        checkSideYardBetweenTenToSixteenMts(pl, block.getBuilding(), buildingHeight,
                                                block.getName(),
                                                setback.getLevel(), plot, minlength, max, minMeanlength, maxMeanLength, occpncy,
                                                sideYard1Result, sideYard2Result);
                                    else if (buildingHeight.compareTo(BigDecimal.valueOf(16)) > 0)
                                        checkSideYardMoreThanSixteenMts(pl, block.getBuilding(), buildingHeight,
                                                block.getName(),
                                                setback.getLevel(), plot, minlength, max, minMeanlength, maxMeanLength, occpncy,
                                                sideYard1Result, sideYard2Result);

                                }
                            }

                            if (sideYard1Result != null) {
                                Map<String, String> details = new HashMap<>();
                                details.put(RULE_NO, sideYard1Result.subRule);
                                details.put(LEVEL, sideYard1Result.level != null ? sideYard1Result.level.toString() : "");
                                details.put(OCCUPANCY, sideYard1Result.occupancy);
                                /*
                                 * if (sideYard1Result.expectedmeanDistance != null &&
                                 * sideYard1Result.expectedmeanDistance.compareTo(BigDecimal.valueOf(0)) == 0) {
                                 * details.put(FIELDVERIFIED, MINIMUMLABEL); details.put(REQUIRED,
                                 * sideYard1Result.expectedDistance.toString()); details.put(PROVIDED,
                                 * sideYard1Result.actualDistance.toString()); } else {
                                 */
                                details.put(FIELDVERIFIED, MEANMINIMUMLABEL);
                                details.put(REQUIRED, "(" + sideYard1Result.expectedDistance + ","
                                        + sideYard1Result.expectedmeanDistance + ")");
                                details.put(PROVIDED,
                                        "(" + sideYard1Result.actualDistance + "," + sideYard1Result.actualMeanDistance + ")");
                                // }
                                details.put(SIDENUMBER, SIDE_YARD1_DESC);
                                /*
                                 * details.put(REQUIRED, sideYard1Result.expectedDistance.toString()); details.put(PROVIDED,
                                 * sideYard1Result.actualDistance.toString());
                                 */
                                if (sideYard1Result.status)
                                    details.put(STATUS, Result.Accepted.getResultVal());
                                else
                                    details.put(STATUS, Result.Not_Accepted.getResultVal());

                                scrutinyDetail.getDetail().add(details);
                                pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
                            }
                            if (sideYard2Result != null) {
                                Map<String, String> detailsSideYard2 = new HashMap<>();
                                detailsSideYard2.put(RULE_NO, sideYard2Result.subRule);
                                detailsSideYard2.put(LEVEL,
                                        sideYard2Result.level != null ? sideYard2Result.level.toString() : "");
                                detailsSideYard2.put(OCCUPANCY, sideYard2Result.occupancy);
                                detailsSideYard2.put(SIDENUMBER, SIDE_YARD2_DESC);
                                /*
                                 * detailsSideYard2.put(REQUIRED, sideYard2Result.expectedDistance.toString());
                                 * detailsSideYard2.put(PROVIDED, sideYard2Result.actualDistance.toString());
                                 */
                                /*
                                 * if (sideYard2Result.expectedmeanDistance != null &&
                                 * sideYard2Result.expectedmeanDistance.compareTo(BigDecimal.valueOf(0)) == 0) {
                                 * detailsSideYard2.put(FIELDVERIFIED, MINIMUMLABEL); detailsSideYard2.put(REQUIRED,
                                 * sideYard2Result.expectedDistance.toString()); detailsSideYard2.put(PROVIDED,
                                 * sideYard2Result.actualDistance.toString()); } else {
                                 */
                                detailsSideYard2.put(FIELDVERIFIED, MEANMINIMUMLABEL);
                                detailsSideYard2.put(REQUIRED, "(" + sideYard2Result.expectedDistance + ","
                                        + sideYard2Result.expectedmeanDistance + ")");
                                detailsSideYard2.put(PROVIDED,
                                        "(" + sideYard2Result.actualDistance + "," + sideYard2Result.actualMeanDistance + ")");
                                // }
                                if (sideYard2Result.status)
                                    detailsSideYard2.put(STATUS, Result.Accepted.getResultVal());
                                else
                                    detailsSideYard2.put(STATUS, Result.Not_Accepted.getResultVal());

                                scrutinyDetail.getDetail().add(detailsSideYard2);
                                pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
                            }
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

    private void checkOnlyCommercialOccupancyTypeForLessThan16MtBuilding(final Plan pl, Block block,
            SideYardResult sideYard1Result, SideYardResult sideYard2Result, SetBack setback, double minlength, double max,
            double minMeanlength, double maxMeanLength) {
        Boolean valid2 = false;
        Boolean valid1 = false;

        String subRule = RULE_52_3;
        BigDecimal side2val = SIDEVALUE_ZERO;
        BigDecimal side1val = SIDEVALUE_ZERO;
        BigDecimal side2Meanval = SIDEVALUE_ZERO;
        BigDecimal side1Meanval = SIDEVALUE_ZERO;

        if (pl.getPlanInformation().getCommercialZoneBldgOpenOnSide1().equalsIgnoreCase(DcrConstants.YES)) {
            side1val = SIDEVALUE_ONEPOINTFIVE;
            side1Meanval = SIDEVALUE_ONEPOINTFIVE;
        }
        if (pl.getPlanInformation().getCommercialZoneBldgOpenOnSide2().equalsIgnoreCase(DcrConstants.YES)) {
            side2val = SIDEVALUE_ONEPOINTFIVE;
            side2Meanval = SIDEVALUE_ONEPOINTFIVE;
        }

        if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
            valid1 = true;
        if (minlength >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
            valid2 = true;

        if (-1 == setback.getLevel())
            subRule = SUB_RULE_24_12;
        OccupancyTypeHelper commOccupancy = Util.getOccupancyByCode(pl, F);
        compareSideYard2Result(block.getName(), side2val, BigDecimal.valueOf(minlength), side2Meanval,
                BigDecimal.valueOf(minMeanlength), commOccupancy, sideYard2Result, valid2, subRule, SIDE_YARD_DESC,
                setback.getLevel());
        compareSideYard1Result(block.getName(), side1val, BigDecimal.valueOf(max), side1Meanval,
                BigDecimal.valueOf(maxMeanLength), commOccupancy, sideYard1Result, valid1, subRule, SIDE_YARD_DESC,
                setback.getLevel());
    }

    private boolean getAllOccupanciesInBuildingAreCommercial(Block block) {
        int allCommercialOccTypes = 0;
        for (Occupancy occupancy : block.getBuilding().getOccupancies())
            if (occupancy.getTypeHelper() != null) {
                // setting commercial Occupancy Type
                int commercialTypeOccupancyType = 0;
                if (occupancy.getTypeHelper().getType().getCode().equals(F)
                        || occupancy.getTypeHelper().getType().getCode().equals(F1) ||
                        occupancy.getTypeHelper().getType().getCode().equals(F2)
                        || occupancy.getTypeHelper().getType().getCode().equals(F3)
                        || occupancy.getTypeHelper().getType().getCode().equals(F3))
                    commercialTypeOccupancyType = 1;
                if (commercialTypeOccupancyType == 0) {
                    allCommercialOccTypes = 0;
                    break;
                } else
                    allCommercialOccTypes = 1;
            }
        return allCommercialOccTypes == 1 ? true : false;
    }

    private void checkSideYardMoreThanSixteenMts(final Plan pl, Building building, BigDecimal buildingHeight,
            String blockName, Integer level, final Plot plot, final double min, final double max, double minMeanlength,
            double maxMeanLength,
            final OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard1Result, SideYardResult sideYard2Result) {
        String subRule = SUB_RULE_24_5;
        String rule = SIDE_YARD_DESC;
        Boolean valid2 = false;
        Boolean valid1 = false;
        BigDecimal side2val = SIDEVALUE_ONE;
        BigDecimal side1val = SIDEVALUE_ONE_TWO;
        BigDecimal side2Meanval = SIDEVALUE_ZERO;
        BigDecimal side1Meanval = SIDEVALUE_ZERO;

        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F3)) {

            if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {
                // rule = RULE_62;
                subRule = RULE_62_1_A;
                side2val = SIDEVALUE_SIXTY_CM;
                side1val = SIDEVALUE_NINTY_CM;
                side2Meanval = side2val;
                side1Meanval = side1val;
            } else {
                subRule = SUB_RULE_24_5;
                // rule = RULE24;
                side2val = SIDEVALUE_ONE;
                side1val = SIDEVALUE_ONE_TWO;
                side2Meanval = side2val;
                side1Meanval = side1val;
            }
            if (buildingHeight != null && buildingHeight.compareTo(BigDecimal.TEN) >= 0) {
                // rule = RULE_24;
                subRule = SUB_RULE_24_5;
                final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
                        .multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
                                .divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
                                .doubleValue())));

                side2val = side2val.add(distanceIncrementBasedOnHeight);
                side1val = side1val.add(distanceIncrementBasedOnHeight);

                side2Meanval = side2Meanval.add(distanceIncrementBasedOnHeight);
                side1Meanval = side1Meanval.add(distanceIncrementBasedOnHeight);

                // if building is high rise building, then from level 0, minimum length should be 5 mts in one side.
                if (level >= 0 && building.getBuildingHeight().compareTo(BigDecimal.valueOf(16)) > 0)
                    if (side1val.compareTo(FIVE) <= 0) {
                        side1val = FIVE;
                        side1Meanval = FIVE;
                    }

                if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
                    valid1 = true;
                if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
                    valid2 = true;

                compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval,
                        BigDecimal.valueOf(minMeanlength), mostRestrictiveOccupancy, sideYard2Result, valid2, subRule, rule,
                        level);
                compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval,
                        BigDecimal.valueOf(maxMeanLength), mostRestrictiveOccupancy, sideYard1Result, valid1, subRule, rule,
                        level);
            }
        } else {
            final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal
                            .valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
                                    .divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
                                    .doubleValue())));

            processSideYardForOccupanciesOtherThanA1A2F(pl, building, plot, blockName, level, min, max, minMeanlength,
                    maxMeanLength, mostRestrictiveOccupancy, buildingHeight, side2val, side1val,
                    distanceIncrementBasedOnHeight, true, sideYard1Result, sideYard2Result);

        }

    }

    private void checkSideYardBetweenTenToSixteenMts(final Plan pl, Building building, BigDecimal buildingHeight,
            String blockName, Integer level, final Plot plot, final double min,
            final double max, double minMeanlength, double maxMeanLength,
            final OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard1Result, SideYardResult sideYard2Result) {
        String subRule = SUB_RULE_24_5;
        String rule = SIDE_YARD_DESC;

        Boolean valid2 = false;
        Boolean valid1 = false;
        BigDecimal side2val = SIDEVALUE_ONE;
        BigDecimal side1val = SIDEVALUE_ONE_TWO;
        BigDecimal side2Meanval = SIDEVALUE_ZERO;
        BigDecimal side1Meanval = SIDEVALUE_ZERO;

        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F) || mostRestrictiveOccupancy.getType().getCode().equals(F3)) {

            if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {
                // rule = RULE_62;
                subRule = RULE_62_1_A;
                side2val = SIDEVALUE_SIXTY_CM;
                side1val = SIDEVALUE_NINTY_CM;
                side2Meanval = side2val;
                side1Meanval = side1val;
            } else {
                subRule = SUB_RULE_24_5;
                // rule = RULE24;
                side2val = SIDEVALUE_ONE;
                side1val = SIDEVALUE_ONE_TWO;
                side2Meanval = side2val;
                side1Meanval = side1val;
            }
            if (buildingHeight != null && buildingHeight.compareTo(BigDecimal.TEN) >= 0) {
                // rule = RULE_24;
                subRule = SUB_RULE_24_5;
                final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
                        .multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
                                .divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
                                .doubleValue())));
                side1val = side1val.add(distanceIncrementBasedOnHeight);
                side2val = side2val.add(distanceIncrementBasedOnHeight);

                side2Meanval = side2Meanval.add(distanceIncrementBasedOnHeight);
                side1Meanval = side1Meanval.add(distanceIncrementBasedOnHeight);

                // if building is high rise building, then from level 1, minimum length should be 5 mts in one side.
                if (level >= 0 && building.getBuildingHeight().compareTo(BigDecimal.valueOf(16)) > 0)
                    if (side1val.compareTo(FIVE) <= 0) {
                        side1val = FIVE;
                        side1Meanval = FIVE;
                    }

                if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
                    valid1 = true;
                if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
                    valid2 = true;

                compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval,
                        BigDecimal.valueOf(minMeanlength), mostRestrictiveOccupancy, sideYard2Result, valid2, subRule, rule,
                        level);
                compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval,
                        BigDecimal.valueOf(maxMeanLength), mostRestrictiveOccupancy, sideYard1Result, valid1, subRule, rule,
                        level);
            }
        } else {
            final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
                    .multiply(BigDecimal
                            .valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
                                    .divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
                                    .doubleValue())));

            processSideYardForOccupanciesOtherThanA1A2F(pl, building, plot, blockName, level, min, max, minMeanlength,
                    maxMeanLength, mostRestrictiveOccupancy, buildingHeight, side2val, side1val,
                    distanceIncrementBasedOnHeight, false, sideYard1Result, sideYard2Result);

        }
    }

    private void processSideYardForOccupanciesOtherThanA1A2F(final Plan pl, Building building, final Plot plot,
            String blockName, Integer level, final double min,
            final double max, double minMeanlength, double maxMeanLength,
            final OccupancyTypeHelper mostRestrictiveOccupancy,
            final BigDecimal buildingHeight,
            BigDecimal side2val, BigDecimal side1val, final BigDecimal distanceIncrementBasedOnHeight,
            final Boolean checkMinimum5mtsCondition, SideYardResult sideYard1Result, SideYardResult sideYard2Result) {

        Boolean valid2 = false;
        Boolean valid1 = false;

        String subRule = SUB_RULE_24_5;
        String rule = SIDE_YARD_DESC;

        BigDecimal side2Meanval = SIDEVALUE_ZERO;
        BigDecimal side1Meanval = SIDEVALUE_ZERO;

        if (mostRestrictiveOccupancy.getType().getCode().equals(B1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(B2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(B3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(C3)) {

            if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) {
                subRule = SUB_RULE_24_5;
                // rule = RULE24;
                if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) < 0) {// check this
                    if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(DcrConstants.YES)) {
                        side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                        side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else if (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc()
                            .equalsIgnoreCase(DcrConstants.YES)) {

                        side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVENTYFIVE_CM);
                        side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else if (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(DcrConstants.YES)) {
                        side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ZERO);
                        side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else {
                        side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVENTYFIVE_CM);
                        side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    }

                } else if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) >= 0
                        &&
                        building.getTotalBuitUpArea()
                                .compareTo(BigDecimal.valueOf(BUILDUPAREA_300)) <= 0) {
                    side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                    side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                    side2Meanval = side2val;
                    side1Meanval = side1val;
                } else {
                    // rule = RULE_54;
                    subRule = RULE_54_3_II;
                    side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                    side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                    side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
                    side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
                }
            } else {
                // rule = RULE_54;
                subRule = RULE_54_3_II;
                if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) < 0) {

                    side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                    side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                    side2Meanval = side2val;
                    side1Meanval = side1val;
                } else if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_150)) >= 0
                        &&
                        building.getTotalBuitUpArea()
                                .compareTo(BigDecimal.valueOf(BUILDUPAREA_300)) <= 0) {
                    side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                    side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                    side2Meanval = side2val;
                    side1Meanval = side1val;
                } else {
                    side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                    side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                    side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
                    side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
                }

            }
            /*
             * if (max >= side2val.doubleValue()) valid2 = true; if (min >= side1val.doubleValue()) valid1 = true;
             */

        } else if (mostRestrictiveOccupancy.getType().getCode().equals(E) ||
                mostRestrictiveOccupancy.getType().getCode().equals(H)) {
            subRule = SUB_RULE_24_5;
            // rule = DcrConstants.RULE24;
            if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_300)) < 0) {
                if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) {
                    if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(DcrConstants.YES)) {
                        side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                        side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else if (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc()
                            .equalsIgnoreCase(DcrConstants.YES)) {

                        side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVENTYFIVE_CM);
                        side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                        side2Meanval = side2val;
                        side1Meanval = side1val;

                    } else if (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(DcrConstants.YES)) {
                        side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ZERO);
                        side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else {
                        side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVENTYFIVE_CM);
                        side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    }
                } else {
                    side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                    side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                    side2Meanval = side2val;
                    side1Meanval = side1val;
                }
            } else {
                // rule = RULE_54;
                subRule = RULE_54_3;
                side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
                side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
            }
            /*
             * if (max >= side2val.doubleValue()) valid2 = true; if (min >= side1val.doubleValue()) valid1 = true;
             */

        } else if (mostRestrictiveOccupancy.getType().getCode().equals(D) ||
                mostRestrictiveOccupancy.getType().getCode().equals(D1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(D2)) {

            if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_800)) > 0) {
                // rule = RULE_55;
                subRule = RULE_55_2_3;
                side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
                side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);

            } else if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) > 0 &&
                    building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_800)) <= 0) {
                // rule = RULE_55;
                subRule = RULE_55_2_2;
                side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FOUR);
                side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FOUR);

            } else if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_300)) > 0 &&
                    building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) <= 0) {
                // rule = RULE_55;
                subRule = RULE_55_2_1;
                side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
                side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);

            } else {
                // rule = RULE_55;
                subRule = RULE_55_2_PROV;
                if (mostRestrictiveOccupancy.getType().getCode().equals(D1)) {
                    side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                    side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
                } else {
                    side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                    side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                }

            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F1)) {
            // rule = RULE_56;
            subRule = RULE_56_3_D;
            side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
            side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F2)) {
            if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {
                side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                side2Meanval = side2val;
                side1Meanval = side1val;
            } else {
                side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                side2Meanval = side2val;
                side1Meanval = side1val;
            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(G1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(G2)) {
            // rule = RULE_57;
            if (smallIndustrialBuilding(pl, building)) {
                subRule = SUB_RULE_24_5;
                side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
                side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
                side2Meanval = side2val;
                side1Meanval = side1val;
            } else {
                subRule = RULE_57_4;
                side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
                side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
                side2Meanval = side2val;
                side1Meanval = side1val;
            }
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(I1)) {
            // rule = RULE_59;
            subRule = RULE_59_3;
            side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
            side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
            side2Meanval = side2val;
            side1Meanval = side1val;
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(I2)) {
            // rule = RULE_59;
            subRule = RULE_59_3;
            side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVEN_FIVE);
            side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVEN_FIVE);
            side2Meanval = side2val;
            side1Meanval = side1val;
        } else if (mostRestrictiveOccupancy.getType().getCode().equals(F3)) {
            subRule = RULE_59_11;
            side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
            side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
            side2Meanval = side2val;
            side1Meanval = side1val;
        }

        if (level >= 0 && building.getBuildingHeight().compareTo(BigDecimal.valueOf(16)) > 0)
            if (side1val.compareTo(FIVE) <= 0) {
                side1val = FIVE;
                side1Meanval = FIVE;
            }

        if (checkMinimum5mtsCondition)
            // Checking maximum value of both sides and comparing whether that value less than or equal to 5. If yes, then
            // expecting 5mt minimum.
            if (side1val.compareTo(side2val) > 0 && side1val.compareTo(FIVE) <= 0) {
                side1val = FIVE;
                side1Meanval = FIVE;

            } /*
               * else { if( side2val.compareTo(FIVE) <= 0) { side2val =FIVE; } }
               */
        /*
         * side1val = side1val.compareTo(FIVE) <= 0 ? FIVE : side1val; side2val = side2val.compareTo(FIVE) <= 0 ? FIVE : side2val;
         */

        if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
            valid1 = true;
        if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
            valid2 = true;

        if (-1 == level)
            subRule = SUB_RULE_24_12;

        compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval, BigDecimal.valueOf(minMeanlength),
                mostRestrictiveOccupancy, sideYard2Result, valid2, subRule, rule, level);
        compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval, BigDecimal.valueOf(maxMeanLength),
                mostRestrictiveOccupancy, sideYard1Result, valid1, subRule, rule, level);
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

    private void checkSideYardLessThanTenOrEqualToMts(final Plan pl, Building building, BigDecimal buildingHeight,
            String blockName, Integer level, final Plot plot,
            final double min, final double max, double minMeanlength, double maxMeanLength,
            final OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard1Result, SideYardResult sideYard2Result) {
        String subRule = SUB_RULE_24_5;
        String rule = SIDE_YARD_DESC;
        Boolean valid2 = false;
        Boolean valid1 = false;
        BigDecimal side2val = SIDEVALUE_ONE;
        BigDecimal side1val = SIDEVALUE_ONE_TWO;
        BigDecimal side2Meanval = SIDEVALUE_ZERO;
        BigDecimal side1Meanval = SIDEVALUE_ZERO;

        if (mostRestrictiveOccupancy.getType().getCode().equals(A1) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A2) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A3) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A4) ||
                mostRestrictiveOccupancy.getType().getCode().equals(A5) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F) ||
                mostRestrictiveOccupancy.getType().getCode().equals(F3)) {
            // Plot area less than or equal to 125
            if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {

                if (building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(3)) <= 0) {
                    // yes
                    subRule = RULE_62_1_A;
                    if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(YES) ||
                            pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(NA)) { // CHECK THIS.
                        side2val = SIDEVALUE_SIXTYONE_CM;
                        side1val = SIDEVALUE_NINTY_CM;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                        // valueGreaterThan=true;
                    } else if (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(DcrConstants.YES)
                            ||
                            pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(DcrConstants.NA)) {
                        side2val = SIDEVALUE_SIXTY_CM;
                        side1val = SIDEVALUE_NINTY_CM;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else if (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(YES)) {
                        side2val = SIDEVALUE_ZERO;
                        side1val = SIDEVALUE_NINTY_CM;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } /*
                       * else if (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(NA)) { side2val =
                       * SIDEVALUE_SIXTY_CM; side1val = SIDEVALUE_NINTY_CM; side2Meanval = side2val; side1Meanval = side1val; }
                       */
                    else {
                        side2val = SIDEVALUE_SIXTY_CM;
                        side1val = SIDEVALUE_NINTY_CM;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    }
                } else if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(YES)) {
                    side2val = SIDEVALUE_ONE;
                    side1val = SIDEVALUE_ONE_TWO;
                    subRule = SUB_RULE_24_5;
                    side2Meanval = side2val;
                    side1Meanval = side1val;
                } else if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(NA)) {
                    side2val = SIDEVALUE_ONE;
                    side1val = SIDEVALUE_ONE_TWO;
                    subRule = SUB_RULE_24_5_PROVISION2;
                    side2Meanval = side2val;
                    side1Meanval = side1val;
                } else {
                    subRule = SUB_RULE_24_5_PROVISION1;
                    if (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(YES)) {
                        side2val = SIDEVALUE_SEVENTYFIVE_CM;
                        side1val = SIDEVALUE_ONE_TWO;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else if (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(NA)) {
                        side2val = SIDEVALUE_ONE;
                        side1val = SIDEVALUE_ONE_TWO;
                        subRule = SUB_RULE_24_5_PROVISION2;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else if (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(YES)) {
                        side2val = SIDEVALUE_ZERO;
                        side1val = SIDEVALUE_ONE_TWO;
                        subRule = SUB_RULE_24_5_PROVISION2;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else if (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(NO)) {
                        side2val = SIDEVALUE_SEVENTYFIVE_CM;
                        side1val = SIDEVALUE_ONE_TWO;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else {
                        side2val = SIDEVALUE_ONE;
                        side1val = SIDEVALUE_ONE_TWO;
                        subRule = SUB_RULE_24_5_PROVISION2;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    }
                }
            } else {
                subRule = SUB_RULE_24_5;
                // rule = DcrConstants.RULE24;
                // Plot area greater than 125 mts

                if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) {

                    if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(YES) ||
                            pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(NA)) {
                        side2val = SIDEVALUE_ONE;
                        side1val = SIDEVALUE_ONE_TWO;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else if (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(DcrConstants.YES)
                            ||
                            pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(DcrConstants.NA)) {
                        side2val = SIDEVALUE_SEVENTYFIVE_CM;
                        side1val = SIDEVALUE_ONE_TWO;
                        side2Meanval = side2val;
                        side1Meanval = side1val;

                    } else if (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(DcrConstants.YES)) {
                        side2val = SIDEVALUE_ZERO;
                        side1val = SIDEVALUE_ONE_TWO;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    } else {
                        side2val = SIDEVALUE_SEVENTYFIVE_CM;
                        side1val = SIDEVALUE_ONE_TWO;
                        side2Meanval = side2val;
                        side1Meanval = side1val;
                    }

                } else {
                    side2val = SIDEVALUE_ONE;
                    side1val = SIDEVALUE_ONE_TWO;
                    side2Meanval = side2val;
                    side1Meanval = side1val;
                }
            }
            // if building is high rise building, then from level 1, minimum length should be 5 mts in one side.
            if (level >= 0 && building.getBuildingHeight().compareTo(BigDecimal.valueOf(16)) > 0)
                if (side1val.compareTo(FIVE) <= 0) {
                    side1val = FIVE;
                    side1Meanval = FIVE;
                }
            /*
             * if (valueGreaterThan) { if (max > side1val.doubleValue() && maxMeanLength > side1Meanval.doubleValue()) valid1 =
             * true; if (min > side2val.doubleValue() && minMeanlength > side2Meanval.doubleValue()) valid2 = true; } else {
             */
            if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
                valid1 = true;
            if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
                valid2 = true;
            // }
            /*
             * if (max >= side2val.doubleValue()) valid2 = true; if (min >= side1val.doubleValue()) valid1 = true;
             */
            /*
             * if (max >= side2val.doubleValue()) valid2 = true; if (min >= side1val.doubleValue()) valid1 = true;
             */

            if (-1 == level)
                subRule = SUB_RULE_24_12;

            compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval, BigDecimal.valueOf(minMeanlength),
                    mostRestrictiveOccupancy, sideYard2Result, valid2, subRule, rule, level);
            compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval, BigDecimal.valueOf(maxMeanLength),
                    mostRestrictiveOccupancy, sideYard1Result, valid1, subRule, rule, level);
        } else
            processSideYardForOccupanciesOtherThanA1A2F(pl, building, plot, blockName, level, min, max, minMeanlength,
                    maxMeanLength, mostRestrictiveOccupancy, buildingHeight, side2val, side1val,
                    BigDecimal.ZERO, false, sideYard1Result, sideYard2Result);
    }

    private void compareSideYard1Result(String blockName, BigDecimal exptDistance, BigDecimal actualDistance,
            BigDecimal expectedMeanDistance, BigDecimal actualMeanDistance,
            OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard1Result, Boolean valid, String subRule,
            String rule, Integer level) {
        String occupancyName;
        if (mostRestrictiveOccupancy.getSubtype() != null)
            occupancyName = mostRestrictiveOccupancy.getSubtype().getName();
        else
            occupancyName = mostRestrictiveOccupancy.getType().getName();
        if (exptDistance.compareTo(sideYard1Result.expectedDistance) >= 0) {
            if (exptDistance.compareTo(sideYard1Result.expectedDistance) == 0) {
                sideYard1Result.rule = sideYard1Result.rule != null ? sideYard1Result.rule + "," + rule : rule;
                sideYard1Result.occupancy = sideYard1Result.occupancy != null
                        ? sideYard1Result.occupancy + "," + occupancyName
                        : occupancyName;
            } else {
                sideYard1Result.rule = rule;
                sideYard1Result.occupancy = occupancyName;
            }

            sideYard1Result.subRule = subRule;
            sideYard1Result.blockName = blockName;
            sideYard1Result.level = level;
            sideYard1Result.actualDistance = actualDistance;
            sideYard1Result.expectedDistance = exptDistance;
            sideYard1Result.status = valid;
        }
    }

    private void compareSideYard2Result(String blockName, BigDecimal exptDistance, BigDecimal actualDistance,
            BigDecimal expectedMeanDistance, BigDecimal actualMeanDistance,
            OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard2Result, Boolean valid, String subRule,
            String rule, Integer level) {
        String occupancyName;
        if (mostRestrictiveOccupancy.getSubtype() != null)
            occupancyName = mostRestrictiveOccupancy.getSubtype().getName();
        else
            occupancyName = mostRestrictiveOccupancy.getType().getName();
        if (exptDistance.compareTo(sideYard2Result.expectedDistance) >= 0) {
            if (exptDistance.compareTo(sideYard2Result.expectedDistance) == 0) {
                sideYard2Result.rule = sideYard2Result.rule != null ? sideYard2Result.rule + "," + rule : rule;
                sideYard2Result.occupancy = sideYard2Result.occupancy != null
                        ? sideYard2Result.occupancy + "," + occupancyName
                        : occupancyName;
            } else {
                sideYard2Result.rule = rule;
                sideYard2Result.occupancy = occupancyName;
            }

            sideYard2Result.subRule = subRule;
            sideYard2Result.blockName = blockName;
            sideYard2Result.level = level;
            sideYard2Result.actualDistance = actualDistance;
            sideYard2Result.expectedDistance = exptDistance;
            sideYard2Result.status = valid;
        }
    }

    private void validateSideYardRule(final Plan pl) {

        for (Block block : pl.getBlocks()) {
            if (!block.getCompletelyExisting()) {
                Boolean sideYardDefined = false;
                for (SetBack setback : block.getSetBacks()) {
                    if (setback.getSideYard1() != null
                            && setback.getSideYard1().getMean().compareTo(BigDecimal.valueOf(0)) > 0) {
                        sideYardDefined = true;
                    } else if (setback.getSideYard2() != null
                            && setback.getSideYard2().getMean().compareTo(BigDecimal.valueOf(0)) > 0) {
                        sideYardDefined = true;
                    }
                }
                if (!sideYardDefined) {
                    HashMap<String, String> errors = new HashMap<>();
                    errors.put(SIDE_YARD_DESC,
                            prepareMessage(OBJECTNOTDEFINED, SIDE_YARD_DESC + " for Block " + block.getName()));
                    pl.addErrors(errors);
                }
            }

        }

    }

    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> sideYardAmendments = new ConcurrentHashMap<>();
        sideYardAmendments.put(AMEND_NOV19, AMEND_DATE_081119);
        sideYardAmendments.put(AMEND_OCT20, AMEND_DATE_011020);
        sideYardAmendments.put(AMEND_SEP23, AMEND_DATE_010923);
        return sideYardAmendments;
    }
}
