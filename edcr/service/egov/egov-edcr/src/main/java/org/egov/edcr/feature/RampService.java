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

import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
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

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.DARamp;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.FloorUnit;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Ramp;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class RampService extends FeatureProcess {

    private static final String SUBRULE_40_A3 = "40A(3)";
    private static final String SUBRULE_40_A7 = "40A(7)";
    private static final String SUBRULE_40 = "40";
    private static final String SUBRULE_40_A1 = "40A(1)";
    private static final String SUBRULE_40_A_7_DESC = "Minimum number of DA Rooms in block %s ";
    private static final String SUBRULE_40_A_3_WIDTH_DESC = "Minimum Width of Ramp %s for block %s ";
    private static final String SUBRULE_40_DESC = "Maximum slope of ramp %s for block %s ";
    private static final String SUBRULE_40_DESCRIPTION = "Maximum slope of ramp %s";

    private static final String SUBRULE_40_A_1_DESC = "DA Ramp";
    private static final String SUBRULE_40_A_3_SLOPE_DESC = "Maximum Slope of DA Ramp %s for block %s";
    private static final String SUBRULE_40_A_3_SLOPE_DESCRIPTION = "Maximum Slope of DA Ramp %s";
    private static final String FLOOR = "Floor";
    private static final String SUBRULE_40_A_3_WIDTH_DESCRIPTION = "Minimum Width of Ramp %s";
    private static final String SUBRULE_40_A_3_SLOPE_MAN_DESC = "Slope of DA Ramp";

    @Override
    public Plan validate(Plan pl) {
        for (Block block : pl.getBlocks())
            if (!block.getCompletelyExisting())
                if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty())
                    for (Floor floor : block.getBuilding().getFloors())
                        if (!floor.getTerrace()) {
                            List<Ramp> ramps = floor.getRamps();
                            if (ramps != null && !ramps.isEmpty())
                                for (Ramp ramp : ramps) {
                                    List<Measurement> rampPolyLines = ramp.getRamps();
                                    if (rampPolyLines != null && !rampPolyLines.isEmpty())
                                        validateDimensions(pl, block.getNumber(), floor.getNumber(), ramp.getNumber().toString(),
                                                rampPolyLines);
                                }
                        }

        // validate necessary
        HashMap<String, String> errors = new HashMap<>();
        if (pl != null && !pl.getBlocks().isEmpty())
            blk: for (Block block : pl.getBlocks())
                if (!block.getCompletelyExisting()) {
                    if (block.getBuilding() != null && !block.getBuilding().getOccupancies().isEmpty()) {
                        if (Util.checkExemptionConditionForBuildingParts(block) ||
                                Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block))
                            continue blk;
                        List<OccupancyTypeHelper> occupancyTypeList = block.getBuilding().getOccupancies().stream()
                                .map(occupancy -> occupancy.getTypeHelper()).collect(Collectors.toList());
                        for (OccupancyTypeHelper occupancyType : occupancyTypeList)
                            if (getOccupanciesForRamp(occupancyType))
                                if (block.getDARamps().isEmpty()) {
                                    errors.put(String.format(DcrConstants.RAMP, block.getNumber()),
                                            edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
                                                    new String[] { String.format(DcrConstants.RAMP, block.getNumber()) },
                                                    LocaleContextHolder.getLocale()));
                                    pl.addErrors(errors);
                                    break;
                                }
                    }
                    if (pl.getPlot() != null && !Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block))
                        if (!block.getDARamps().isEmpty()) {
                            boolean isSlopeDefined = false;
                            for (DARamp daRamp : block.getDARamps())
                                if (daRamp != null && daRamp.getSlope() != null
                                        && daRamp.getSlope().compareTo(BigDecimal.valueOf(0)) > 0)
                                    isSlopeDefined = true;
                            if (!isSlopeDefined) {
                                errors.put(String.format(DcrConstants.RAMP_SLOPE, "", block.getNumber()),
                                        edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
                                                new String[] { String.format(DcrConstants.RAMP_SLOPE, "", block.getNumber()) },
                                                LocaleContextHolder.getLocale()));
                                pl.addErrors(errors);
                            }
                        }
                }
        return pl;
    }

	private boolean getOccupanciesForRamp(OccupancyTypeHelper occupancyType) {
		return occupancyType.getType().getCode().equals(A2) || occupancyType.getType().getCode().equals(A3)
				|| occupancyType.getType().getCode().equals(A4) || occupancyType.getType().getCode().equals(B1)
				|| occupancyType.getType().getCode().equals(B2) || occupancyType.getType().getCode().equals(B3)
				|| occupancyType.getType().getCode().equals(C) || occupancyType.getType().getCode().equals(C1)
				|| occupancyType.getType().getCode().equals(C2) || occupancyType.getType().getCode().equals(C3)
				|| occupancyType.getType().getCode().equals(D) || occupancyType.getType().getCode().equals(D1)
				|| occupancyType.getType().getCode().equals(D2) || occupancyType.getType().getCode().equals(E)
				|| occupancyType.getType().getCode().equals(F) || occupancyType.getType().getCode().equals(F1)
				|| occupancyType.getType().getCode().equals(F2) || occupancyType.getType().getCode().equals(F3)
				|| occupancyType.getType().getCode().equals(F3);
	}

    @Override
    public Plan process(Plan pl) {
        validate(pl);
        boolean valid;
        if (pl != null && !pl.getBlocks().isEmpty())
            blk: for (Block block : pl.getBlocks())
                if (!block.getCompletelyExisting()) {

                    scrutinyDetail = new ScrutinyDetail();
                    scrutinyDetail.addColumnHeading(1, RULE_NO);
                    scrutinyDetail.addColumnHeading(2, DESCRIPTION);
                    scrutinyDetail.addColumnHeading(3, REQUIRED);
                    scrutinyDetail.addColumnHeading(4, PROVIDED);
                    scrutinyDetail.addColumnHeading(5, STATUS);
                    scrutinyDetail.setKey("Block_" + block.getNumber() + "_" + "DA Ramp - Defined or not");

                    ScrutinyDetail scrutinyDetail1 = new ScrutinyDetail();
                    scrutinyDetail1.addColumnHeading(1, RULE_NO);
                    scrutinyDetail1.addColumnHeading(2, DESCRIPTION);
                    scrutinyDetail1.addColumnHeading(3, REQUIRED);
                    scrutinyDetail1.addColumnHeading(4, PROVIDED);
                    scrutinyDetail1.addColumnHeading(5, STATUS);
                    scrutinyDetail1.setKey("Block_" + block.getNumber() + "_" + "DA Ramp - Slope");

                    ScrutinyDetail scrutinyDetail2 = new ScrutinyDetail();
                    scrutinyDetail2.addColumnHeading(1, RULE_NO);
                    scrutinyDetail2.addColumnHeading(2, DESCRIPTION);
                    scrutinyDetail2.addColumnHeading(3, REQUIRED);
                    scrutinyDetail2.addColumnHeading(4, PROVIDED);
                    scrutinyDetail2.addColumnHeading(5, STATUS);
                    scrutinyDetail2.setKey("Block_" + block.getNumber() + "_" + "DA Ramp - Maximum Slope");

                    ScrutinyDetail scrutinyDetail3 = new ScrutinyDetail();
                    scrutinyDetail3.addColumnHeading(1, RULE_NO);
                    scrutinyDetail3.addColumnHeading(2, DESCRIPTION);
                    scrutinyDetail3.addColumnHeading(3, REQUIRED);
                    scrutinyDetail3.addColumnHeading(4, PROVIDED);
                    scrutinyDetail3.addColumnHeading(5, STATUS);
                    scrutinyDetail3.setSubHeading("Minimum number of da rooms");
                    scrutinyDetail3.setKey("Block_" + block.getNumber() + "_" + "DA Room");

                    ScrutinyDetail scrutinyDetail4 = new ScrutinyDetail();
                    scrutinyDetail4.addColumnHeading(1, RULE_NO);
                    scrutinyDetail4.addColumnHeading(2, DESCRIPTION);
                    scrutinyDetail4.addColumnHeading(3, FLOOR);
                    scrutinyDetail4.addColumnHeading(4, REQUIRED);
                    scrutinyDetail4.addColumnHeading(5, PROVIDED);
                    scrutinyDetail4.addColumnHeading(6, STATUS);
                    scrutinyDetail4.setKey("Block_" + block.getNumber() + "_" + "Ramp - Minimum Width");

                    ScrutinyDetail scrutinyDetail5 = new ScrutinyDetail();
                    scrutinyDetail5.addColumnHeading(1, RULE_NO);
                    scrutinyDetail5.addColumnHeading(2, DESCRIPTION);
                    scrutinyDetail5.addColumnHeading(3, FLOOR);
                    scrutinyDetail5.addColumnHeading(4, REQUIRED);
                    scrutinyDetail5.addColumnHeading(5, PROVIDED);
                    scrutinyDetail5.addColumnHeading(6, STATUS);
                    scrutinyDetail5.setKey("Block_" + block.getNumber() + "_" + "Ramp - Maximum Slope");

                    if (block.getBuilding() != null && !block.getBuilding().getOccupancies().isEmpty()) {
                        if (Util.checkExemptionConditionForBuildingParts(block) ||
                                Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block))
                            continue blk;
                        List<OccupancyTypeHelper> occupancyTypeList = block.getBuilding().getOccupancies().stream()
                                .map(occupancy -> occupancy.getTypeHelper()).collect(Collectors.toList());
                        for (OccupancyTypeHelper occupancyType : occupancyTypeList)
                            if (getOccupanciesForRamp(occupancyType))
                                if (!block.getDARamps().isEmpty()) {
                                    setReportOutputDetails(pl, SUBRULE_40_A1, SUBRULE_40_A_1_DESC, "",
                                            DcrConstants.OBJECTDEFINED_DESC, Result.Accepted.getResultVal(), scrutinyDetail);

                                    break;
                                } else {
                                    setReportOutputDetails(pl, SUBRULE_40_A1, SUBRULE_40_A_1_DESC, "",
                                            DcrConstants.OBJECTNOTDEFINED_DESC, Result.Not_Accepted.getResultVal(),
                                            scrutinyDetail);
                                    break;
                                }
                    }
                    if (pl.getPlot() != null && !Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block))
                        if (!block.getDARamps().isEmpty()) {
                            boolean isSlopeDefined = false;
                            for (DARamp daRamp : block.getDARamps())
                                if (daRamp != null && daRamp.getSlope() != null
                                        && daRamp.getSlope().compareTo(BigDecimal.valueOf(0)) > 0)
                                    isSlopeDefined = true;
                            if (isSlopeDefined)
                                setReportOutputDetails(pl, SUBRULE_40_A3, SUBRULE_40_A_3_SLOPE_MAN_DESC, "",
                                        DcrConstants.OBJECTDEFINED_DESC, Result.Accepted.getResultVal(), scrutinyDetail1);
                            else
                                setReportOutputDetails(pl, SUBRULE_40_A3, SUBRULE_40_A_3_SLOPE_MAN_DESC, "",
                                        DcrConstants.OBJECTNOTDEFINED_DESC, Result.Not_Accepted.getResultVal(), scrutinyDetail1);
                            valid = false;
                            if (isSlopeDefined) {
                                Map<String, String> mapOfRampNumberAndSlopeValues = new HashMap<>();
                                BigDecimal expectedSlope = BigDecimal.valueOf(1).divide(BigDecimal.valueOf(12), 2,
                                        RoundingMode.HALF_UP);
                                for (DARamp daRamp : block.getDARamps()) {
                                    BigDecimal slope = daRamp.getSlope();
                                    if (slope != null && slope.compareTo(BigDecimal.valueOf(0)) > 0 && expectedSlope != null)
                                        if (slope.compareTo(expectedSlope) <= 0) {
                                            valid = true;
                                            mapOfRampNumberAndSlopeValues.put("daRampNumber", daRamp.getNumber().toString());
                                            mapOfRampNumberAndSlopeValues.put("slope", slope.toString());
                                            break;
                                        }
                                }
                                if (valid) {
                                    setReportOutputDetails(pl, SUBRULE_40_A3, String.format(SUBRULE_40_A_3_SLOPE_DESCRIPTION,
                                            mapOfRampNumberAndSlopeValues.get("daRampNumber")), expectedSlope.toString(),
                                            mapOfRampNumberAndSlopeValues.get("slope"), Result.Accepted.getResultVal(),
                                            scrutinyDetail2);
                                } else {
                                    setReportOutputDetails(pl, SUBRULE_40_A3, String.format(SUBRULE_40_A_3_SLOPE_DESCRIPTION, ""),
                                            expectedSlope.toString(),
                                            "Less than 0.08 for all da ramps", Result.Not_Accepted.getResultVal(),
                                            scrutinyDetail2);
                                }
                            }

                        }

                    if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
                        int noOfDaRooms = 0;
                        int noOfFloorUnitsInColorCode23And3 = 0;

                        for (Floor floor : block.getBuilding().getFloors())
                            if (!floor.getTerrace()) {

                                if (!floor.getDaRooms().isEmpty())
                                    noOfDaRooms = noOfDaRooms + floor.getDaRooms().size();
                                if (!floor.getUnits().isEmpty())
                                    for (FloorUnit floorUnit : floor.getUnits())
                                        if (floorUnit.getColorCode() != 0 &&
                                                (floorUnit.getColorCode() == 23
                                                        || floorUnit.getColorCode() == 3))
                                            noOfFloorUnitsInColorCode23And3++;
                            }

                        if (noOfFloorUnitsInColorCode23And3 >= 25) {
                            BigDecimal expectedNoOfDARooms = BigDecimal.valueOf(Double.valueOf(noOfFloorUnitsInColorCode23And3))
                                    .divide(BigDecimal.valueOf(25), 2, RoundingMode.HALF_UP);

                            if (BigDecimal.valueOf(noOfDaRooms).compareTo(expectedNoOfDARooms) >= 0) {
                                setReportOutputDetails(pl, SUBRULE_40_A7, String.format(SUBRULE_40_A_7_DESC, block.getNumber()),
                                        expectedNoOfDARooms.toString() + " (" + noOfFloorUnitsInColorCode23And3
                                                + " Rooms declared) ",
                                        String.valueOf(noOfDaRooms), Result.Accepted.getResultVal(), scrutinyDetail3);
                            } else {
                                setReportOutputDetails(pl, SUBRULE_40_A7, String.format(SUBRULE_40_A_7_DESC, block.getNumber()),
                                        expectedNoOfDARooms.toString() + " (" + noOfFloorUnitsInColorCode23And3
                                                + " Rooms declared) ",
                                        String.valueOf(noOfDaRooms), Result.Not_Accepted.getResultVal(), scrutinyDetail3);

                            }

                        }

                    }

                    if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty())
                        for (Floor floor : block.getBuilding().getFloors())
                            if (!floor.getTerrace())
                                for (Ramp ramp : floor.getRamps())
                                    if (ramp.getRampClosed()) {
                                        List<BigDecimal> rampWidths = new ArrayList<>();
                                        List<BigDecimal> rampLengths = new ArrayList<>();
                                        for (Measurement measurement : ramp.getRamps()) {
                                            rampWidths.add(measurement.getWidth());
                                            rampLengths.add(measurement.getHeight());
                                        }

                                        /*
                                         * for (DXFLWPolyline polyline : ramp.getPolylines()) { if (polyline.getBounds() != null
                                         * && polyline.getBounds().getWidth() > 0 && polyline.getBounds().getHeight() > 0) { if
                                         * (polyline.getBounds().getHeight() < polyline.getBounds().getWidth()) {
                                         * rampWidths.add(BigDecimal.valueOf(polyline.getBounds().getHeight()));
                                         * rampLengths.add(BigDecimal.valueOf(polyline.getBounds().getWidth())); } else {
                                         * rampWidths.add(BigDecimal.valueOf(polyline.getBounds().getWidth()));
                                         * rampLengths.add(BigDecimal.valueOf(polyline.getBounds().getHeight())); } } }
                                         */
                                        if (!rampWidths.isEmpty()) {
                                            BigDecimal minimumWidth = rampWidths.get(0);
                                            for (BigDecimal width : rampWidths)
                                                if (width.compareTo(minimumWidth) < 0)
                                                    minimumWidth = width;
                                            boolean isTypicalRepititiveFloor = false;
                                            valid = false;
                                            Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor,
                                                    isTypicalRepititiveFloor);
                                            if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
                                                if (minimumWidth.compareTo(BigDecimal.valueOf(1.2)) >= 0)
                                                    valid = true;
                                                String value = typicalFloorValues.get("typicalFloors") != null
                                                        ? (String) typicalFloorValues.get("typicalFloors")
                                                        : " floor " + floor.getNumber();
                                                if (valid) {
                                                    setReportOutputDetailsFloorWiseWithDescription(pl, SUBRULE_40_A3,
                                                            String.format(SUBRULE_40_A_3_WIDTH_DESCRIPTION, ramp.getNumber()),
                                                            value, BigDecimal.valueOf(1.2).toString() + DcrConstants.IN_METER,
                                                            String.valueOf(
                                                                    Math.round(minimumWidth.doubleValue() * Double.valueOf(100))
                                                                            / Double.valueOf(100))
                                                                    +
                                                                    DcrConstants.IN_METER,
                                                            Result.Accepted.getResultVal(), scrutinyDetail4);

                                                } else {
                                                    setReportOutputDetailsFloorWiseWithDescription(pl, SUBRULE_40_A3,
                                                            String.format(SUBRULE_40_A_3_WIDTH_DESCRIPTION, ramp.getNumber()),
                                                            value, BigDecimal.valueOf(1.2).toString() + DcrConstants.IN_METER,
                                                            String.valueOf(
                                                                    Math.round(minimumWidth.doubleValue() * Double.valueOf(100))
                                                                            / Double.valueOf(100))
                                                                    +
                                                                    DcrConstants.IN_METER,
                                                            Result.Not_Accepted.getResultVal(), scrutinyDetail4);
                                                }
                                            }
                                        }
                                        if (pl.getPlot() != null
                                                && !Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block)) {
                                            BigDecimal rampTotalLength = BigDecimal.ZERO;
                                            for (BigDecimal length : rampLengths)
                                                rampTotalLength = rampTotalLength.add(length);
                                            if (rampTotalLength.compareTo(BigDecimal.valueOf(0)) > 0
                                                    && ramp.getFloorHeight() != null) {
                                                boolean isTypicalRepititiveFloor = false;
                                                BigDecimal rampSlope = ramp.getFloorHeight().divide(rampTotalLength, 2,
                                                        RoundingMode.HALF_UP);
                                                ramp.setSlope(rampSlope);
                                                valid = false;
                                                Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor,
                                                        isTypicalRepititiveFloor);
                                                if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
                                                    if (rampSlope.compareTo(BigDecimal.valueOf(0.1)) <= 0)
                                                        valid = true;
                                                    String value = typicalFloorValues.get("typicalFloors") != null
                                                            ? (String) typicalFloorValues.get("typicalFloors")
                                                            : " floor " + floor.getNumber();
                                                    if (valid) {
                                                        setReportOutputDetailsFloorWiseWithDescription(pl, SUBRULE_40,
                                                                String.format(SUBRULE_40_DESCRIPTION, ramp.getNumber()), value,
                                                                BigDecimal.valueOf(0.1).toString(), rampSlope.toString(),
                                                                Result.Accepted.getResultVal(), scrutinyDetail5);
                                                    } else {
                                                        setReportOutputDetailsFloorWiseWithDescription(pl, SUBRULE_40,
                                                                String.format(SUBRULE_40_DESCRIPTION, ramp.getNumber()), value,
                                                                BigDecimal.valueOf(0.1).toString(), rampSlope.toString(),
                                                                Result.Not_Accepted.getResultVal(), scrutinyDetail5);
                                                    }
                                                }
                                            }
                                        }
                                    }
                }
        return pl;
    }

    private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected, String actual,
            String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    private void setReportOutputDetailsFloorWiseWithDescription(Plan pl, String ruleNo, String ruleDesc, String floor,
            String expected, String actual, String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
        details.put(FLOOR, floor);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    private void validateDimensions(Plan pl, String blockNo, int floorNo, String rampNo,
            List<Measurement> rampPolylines) {
        int count = 0;
        for (Measurement m : rampPolylines)
            if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0)
                count++;
        if (count > 0)
            pl.addError(String.format(DxfFileConstants.LAYER_RAMP_WITH_NO, blockNo, floorNo, rampNo),
                    count + " number of ramp polyline not having only 4 points in layer "
                            + String.format(DxfFileConstants.LAYER_RAMP_WITH_NO, blockNo, floorNo, rampNo));
    }

    @Override
    public Map<String, Date> getAmendments() {
        return new LinkedHashMap<>();
    }
}
