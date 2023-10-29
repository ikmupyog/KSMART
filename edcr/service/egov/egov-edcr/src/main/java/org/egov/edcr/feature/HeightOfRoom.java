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
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.Room;
import org.egov.common.entity.edcr.RoomHeight;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.stereotype.Service;

@Service
public class HeightOfRoom extends FeatureProcess {

    private static final String SUBRULE_35_2 = "35(2)";
    private static final String SUBRULE_36 = "36";
    private static final String SUBRULE_55_3 = "55(3)";
    private static final String SUBRULE_55_4 = "55(4)";
    private static final String SUBRULE_55_5 = "55(5)";
    private static final String SUBRULE_55_6 = "55(6)";
    private static final String SUBRULE_55_7 = "55(7)";
    private static final String SUBRULE_55_8 = "55(8)";
    private static final String SUBRULE_55_9 = "55(9)";

    private static final String SUBRULE_35_2_DESC = "Minimum height of head room below mezzanine floor";
    private static final String SUBRULE_36_DESC_NORMAL_ROOMS = "Minimum height of room under occupancy Educational,Medical/Hospital,Office/Business,Mercantile/Commercial,Storage,Hazardous";
    private static final String SUBRULE_36_DESC_AC_ROOMS = "Minimum height of AC room under occupancy Educational,Medical/Hospital,Office/Business,Mercantile/Commercial,Storage,Hazardous";
    private static final String SUBRULE_36_DESC_PARKING_ROOMS = "Minimum height of car and two wheeler parking room";
    private static final String SUBRULE_55_3_DESC_ASSEMBLY_ROOMS = "Minimum height of room under assembly occupancy";
    private static final String SUBRULE_55_3_DESC_ASSEMBLY_AC_ROOMS = "Minimum height of AC room under assembly occupancy";
    private static final String SUBRULE_55_4_DESC = "Minimum height of headroom beneath or above balcony";
    private static final String SUBRULE_55_5_DESC = "Minimum height of headroom in general ac rooms in assembly occupancy";
    private static final String SUBRULE_55_6_DESC = "Minimum height of general ac rooms,store rooms,toilets,lamber and cellar rooms";
    private static final String SUBRULE_55_7_DESC = "Minimum height of work room under occupancy G";
    private static final String SUBRULE_55_8_DESC = "Minimum height of laboratory,entrance hall,canteen,cloak room";
    private static final String SUBRULE_55_9_DESC = "Minimum height of store rooms and toilets in industrial buildings";

    public static final BigDecimal MINIMUM_HEIGHT_2_2 = BigDecimal.valueOf(2.2);
    public static final BigDecimal MINIMUM_HEIGHT_3 = BigDecimal.valueOf(3);
    public static final BigDecimal MINIMUM_HEIGHT_2_4 = BigDecimal.valueOf(2.4);
    public static final BigDecimal MINIMUM_HEIGHT_4 = BigDecimal.valueOf(4);
    public static final BigDecimal MINIMUM_HEIGHT_3_6 = BigDecimal.valueOf(3.6);
    private static final String FLOOR = "Floor";
    private static final String HGHT_OF_ROOM_UNDEFINED = "%s is not defined for block %s floor %s with colour code %s";

    @Override
    public Plan validate(Plan pl) {
        return pl;
    }

    @Override
    public Plan process(Plan pl) {
        validate(pl);
        HashMap<String, String> errors = new HashMap<>();
        if (pl != null && pl.getBlocks() != null)
            blk: for (Block block : pl.getBlocks())
                if (!block.getCompletelyExisting())
                    if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
                        scrutinyDetail = new ScrutinyDetail();
                        scrutinyDetail.addColumnHeading(1, RULE_NO);
                        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
                        scrutinyDetail.addColumnHeading(3, FLOOR);
                        scrutinyDetail.addColumnHeading(4, REQUIRED);
                        scrutinyDetail.addColumnHeading(5, PROVIDED);
                        scrutinyDetail.addColumnHeading(6, STATUS);
                        List<Integer> colorCodesForExemption = getColorCodesListForExemption();
                        if (pl.getPlot() != null)
                            if (Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block))
                                continue blk;
                        scrutinyDetail.setKey("Block_" + block.getNumber() + "_" + "Height Of Room");
                        for (Floor floor : block.getBuilding().getFloors())
                            if (!floor.getTerrace())
                                if (!floor.getHabitableRooms().isEmpty()) {
                                	List<RoomHeight> roomHghts = new ArrayList<>();
                                	for(Room hr : floor.getHabitableRooms())
                                		roomHghts.addAll(hr.getHeights());
                                    Map<Integer, Long> requirementCountMap = roomHghts.stream()
                                            .collect(Collectors.groupingBy(RoomHeight::getColorCode, Collectors.counting()));
                                    for (Integer colorCode : requirementCountMap.keySet()) {
                                        BigDecimal minimumHeight = BigDecimal.ZERO;
                                        String subRule = null;
                                        String subRuleDesc = null;
                                        List<BigDecimal> distancesList = new ArrayList<>();
										for (Room room : floor.getHabitableRooms()) {
											for (RoomHeight height : room.getHeights()) {
												if (requirementCountMap.containsKey(height.getColorCode())) {
													if (height
															.getColorCode() == DxfFileConstants.MEZZANINE_HEAD_ROOM_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_2_2;
														subRule = SUBRULE_35_2;
														subRuleDesc = SUBRULE_35_2_DESC;
													} else if (height
															.getColorCode() == DxfFileConstants.NORMAL_ROOM_BCEFHI_OCCUPANCIES_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_3;
														subRule = SUBRULE_36;
														subRuleDesc = SUBRULE_36_DESC_NORMAL_ROOMS;
													} else if (height
															.getColorCode() == DxfFileConstants.AC_ROOM_BCEFHI_OCCUPANCIES_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_2_4;
														subRule = SUBRULE_36;
														subRuleDesc = SUBRULE_36_DESC_AC_ROOMS;
													} else if (height
															.getColorCode() == DxfFileConstants.CAR_AND_TWO_WHEELER_PARKING_ROOM_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_2_2;
														subRule = SUBRULE_36;
														subRuleDesc = SUBRULE_36_DESC_PARKING_ROOMS;
													} else if (height
															.getColorCode() == DxfFileConstants.ASSEMBLY_ROOM_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_4;
														subRule = SUBRULE_55_3;
														subRuleDesc = SUBRULE_55_3_DESC_ASSEMBLY_ROOMS;
													} else if (height
															.getColorCode() == DxfFileConstants.ASSEMBLY_AC_HALL_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_3;
														subRule = SUBRULE_55_3;
														subRuleDesc = SUBRULE_55_3_DESC_ASSEMBLY_AC_ROOMS;
													} else if (height
															.getColorCode() == DxfFileConstants.HEAD_ROOM_BENEATH_OR_ABOVE_BALCONY_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_3;
														subRule = SUBRULE_55_4;
														subRuleDesc = SUBRULE_55_4_DESC;
													} else if (height
															.getColorCode() == DxfFileConstants.HEAD_ROOM_IN_GENERAL_AC_ROOM_IN_ASSEMBLY_OCCUPANCY_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_2_4;
														subRule = SUBRULE_55_5;
														subRuleDesc = SUBRULE_55_5_DESC;
													} else if (height
															.getColorCode() == DxfFileConstants.GENERALAC_STORE_TOILET_LAMBER_CELLAR_ROOM_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_2_4;
														subRule = SUBRULE_55_6;
														subRuleDesc = SUBRULE_55_6_DESC;
													} else if (height
															.getColorCode() == DxfFileConstants.WORK_ROOM_UNDER_OCCUPANCY_G_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_3_6;
														subRule = SUBRULE_55_7;
														subRuleDesc = SUBRULE_55_7_DESC;
													} else if (height
															.getColorCode() == DxfFileConstants.LAB_ENTRANCE_HALL_CANTEEN_CLOAK_ROOM_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_3;
														subRule = SUBRULE_55_8;
														subRuleDesc = SUBRULE_55_8_DESC;
													} else if (height
															.getColorCode() == DxfFileConstants.STORE_TOILET_ROOM_IN_INDUSTRIES_COLOR_CODE) {
														minimumHeight = MINIMUM_HEIGHT_2_4;
														subRule = SUBRULE_55_9;
														subRuleDesc = SUBRULE_55_9_DESC;
													}
													distancesList.add(height.getHeight());
												}
												if (colorCodesForExemption.contains(height.getColorCode())
														&& Util.checkExemptionConditionForBuildingParts(block)) {
													minimumHeight = BigDecimal.ZERO;
													subRule = null;
													subRuleDesc = null;
												}
											}
											BigDecimal minimumHght = distancesList.get(0);
											for (BigDecimal distance : distancesList)
												if (distance.compareTo(minimumHght) < 0)
													minimumHght = distance;
											boolean valid = false;
											boolean isTypicalRepititiveFloor = false;
											Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block,
													floor, isTypicalRepititiveFloor);
											if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")
													&& minimumHeight.compareTo(BigDecimal.valueOf(0)) > 0
													&& subRule != null && subRuleDesc != null) {
												if (minimumHeight.compareTo(minimumHght) <= 0)
													valid = true;
												String value = typicalFloorValues.get("typicalFloors") != null
														? (String) typicalFloorValues.get("typicalFloors")
														: " floor " + floor.getNumber();
												if (valid) {
													setReportOutputDetails(pl, subRule, subRuleDesc, value,
															minimumHeight + DcrConstants.IN_METER,
															minimumHght + DcrConstants.IN_METER + (colorCode > 0
																	? "\n\nnumber of rooms : "
																			+ requirementCountMap.get(colorCode)
																			+ " nos"
																	: org.apache.commons.lang.StringUtils.EMPTY),
															Result.Accepted.getResultVal());

												} else {
													setReportOutputDetails(pl, subRule, subRuleDesc, value,
															minimumHeight + DcrConstants.IN_METER,
															minimumHght + DcrConstants.IN_METER + (colorCode > 0
																	? "\n\nnumber of rooms : "
																			+ requirementCountMap.get(colorCode)
																			+ " nos"
																	: org.apache.commons.lang.StringUtils.EMPTY),
															Result.Not_Accepted.getResultVal());
												}
											}
										}
                                    }
                                    validateRoomHghtMandatory(pl, errors, block, floor, requirementCountMap.keySet());
                                } else {
                                    List<OccupancyTypeHelper> occupancies = floor.getOccupancies().stream()
                                            .map(occupancy -> occupancy.getTypeHelper()).collect(Collectors.toList());
                                    List<String> occupancyTypes = occupancies.stream().map(occ -> occ.getType().getCode()).collect(Collectors.toList());
                                    if (occupancyTypes != null && occupancyTypes.size() > 0)
										if (!(occupancyTypes.contains(A1) || occupancyTypes.contains(A2)
												|| occupancyTypes.contains(F3) || occupancyTypes.contains(A4))) {
											errors.put(
													"HGHT_OF_ROOM for block " + block.getNumber() + " floor "
															+ floor.getNumber(),
													"Height of room is not defined for block " + block.getNumber()
															+ " floor " + floor.getNumber());
											pl.addErrors(errors);
										}
                                }
                    }
        return pl;

    }
    
    private void validateRoomHghtMandatory(Plan pl, HashMap<String, String> errors, Block block, Floor floor,
            Set<Integer> coloursUniqueSet) {
        boolean isPresent = false;
        List<OccupancyTypeHelper> occupancies = floor.getOccupancies().stream().map(Occupancy::getTypeHelper).collect(Collectors.toList());
        boolean isAssembly = occupancies.stream().anyMatch(occupancy -> Arrays.asList(D, D1, D2).contains(occupancy.getType().getCode()));

        if (isAssembly) {

            isPresent = coloursUniqueSet.stream()
                    .anyMatch(colorCode -> colorCode == DxfFileConstants.CAR_AND_TWO_WHEELER_PARKING_ROOM_COLOR_CODE
                            || colorCode == DxfFileConstants.ASSEMBLY_AC_HALL_COLOR_CODE
                            || colorCode == DxfFileConstants.ASSEMBLY_ROOM_COLOR_CODE);

            if (!isPresent) {
                errors.put(
                        "assembly room height" + block.getNumber() + " floor " + floor.getNumber(),
                        String.format(HGHT_OF_ROOM_UNDEFINED, "Assembly Ac Hall or parking floor or Assembly room height",
                                block.getNumber(), floor.getNumber(),
                                DxfFileConstants.ASSEMBLY_AC_HALL_COLOR_CODE + " or "
                                        + DxfFileConstants.CAR_AND_TWO_WHEELER_PARKING_ROOM_COLOR_CODE + " or "
                                        + DxfFileConstants.ASSEMBLY_ROOM_COLOR_CODE));
                pl.addErrors(errors);
            }
        }

        if (floor.getMezzanineFloor() != null && floor.getMezzanineFloor().size() > 0) {
            isPresent = coloursUniqueSet.stream()
                    .anyMatch(colorCode -> colorCode == DxfFileConstants.MEZZANINE_HEAD_ROOM_COLOR_CODE);

            if (!isPresent) {
                errors.put(
                        DxfFileConstants.MEZZANINE_HEAD_ROOM_COLOR_CODE + block.getNumber() + " floor " + floor.getNumber(),
                        String.format(HGHT_OF_ROOM_UNDEFINED, "Mezzanine floor room height", block.getNumber(), floor.getNumber(),
                                DxfFileConstants.MEZZANINE_HEAD_ROOM_COLOR_CODE));
                pl.addErrors(errors);
            }
        }

        boolean isIndustrial = occupancies.stream().anyMatch(occupancy -> Arrays.asList(G1, G2).contains(occupancy.getType().getCode()));
        if (isIndustrial) {
            isPresent = coloursUniqueSet.stream()
                    .anyMatch(colorCode -> colorCode == DxfFileConstants.WORK_ROOM_UNDER_OCCUPANCY_G_COLOR_CODE);

            if (!isPresent) {
                errors.put(
                        DxfFileConstants.WORK_ROOM_UNDER_OCCUPANCY_G_COLOR_CODE + block.getNumber() + " floor "
                                + floor.getNumber(),
                        String.format(HGHT_OF_ROOM_UNDEFINED, "Work room height", block.getNumber(), floor.getNumber(),
                                DxfFileConstants.WORK_ROOM_UNDER_OCCUPANCY_G_COLOR_CODE));
                pl.addErrors(errors);
            }
        }

        // For other occupancies, atleast one room required in the plan.
		boolean isBCDEFHIOccupancies = occupancies.stream()
				.anyMatch(occupancy -> Arrays.asList(A2, B1, B2, B3, C, C1, C2, C3, E, F, F1, F2, F3, F3, H, I1, I2)
						.contains(occupancy.getType().getCode()));

        if (isBCDEFHIOccupancies) {
            isPresent = coloursUniqueSet.stream()
                    .anyMatch(colorCode -> colorCode == DxfFileConstants.CAR_AND_TWO_WHEELER_PARKING_ROOM_COLOR_CODE
                            || colorCode == DxfFileConstants.NORMAL_ROOM_BCEFHI_OCCUPANCIES_COLOR_CODE
                            || colorCode == DxfFileConstants.AC_ROOM_BCEFHI_OCCUPANCIES_COLOR_CODE);
            if (!isPresent) {
                errors.put(
                        "normal or ac rooms for other occupancies of " + block.getNumber() + " floor " + floor.getNumber(),
                        String.format(HGHT_OF_ROOM_UNDEFINED, "Normal room or ac room height or parking floor", block.getNumber(),
                                floor.getNumber(),
                                DxfFileConstants.NORMAL_ROOM_BCEFHI_OCCUPANCIES_COLOR_CODE + " or "
                                        + DxfFileConstants.AC_ROOM_BCEFHI_OCCUPANCIES_COLOR_CODE + " or "
                                        + DxfFileConstants.CAR_AND_TWO_WHEELER_PARKING_ROOM_COLOR_CODE));
                pl.addErrors(errors);

            }
        }
    }

    private List<Integer> getColorCodesListForExemption() {
        List<Integer> colorCodesForExemption = new ArrayList<>();
        colorCodesForExemption.add(DxfFileConstants.MEZZANINE_HEAD_ROOM_COLOR_CODE);
        colorCodesForExemption.add(DxfFileConstants.NORMAL_ROOM_BCEFHI_OCCUPANCIES_COLOR_CODE);
        colorCodesForExemption.add(DxfFileConstants.AC_ROOM_BCEFHI_OCCUPANCIES_COLOR_CODE);
        colorCodesForExemption.add(DxfFileConstants.CAR_AND_TWO_WHEELER_PARKING_ROOM_COLOR_CODE);
        return colorCodesForExemption;
    }

    private void buildResult(Plan pl, Floor floor, BigDecimal expected, String subRule, String subRuleDesc,
            BigDecimal actual, boolean valid, Map<String, Object> typicalFloorValues) {
        if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")
                && expected.compareTo(BigDecimal.valueOf(0)) > 0 &&
                subRule != null && subRuleDesc != null) {
            if (actual.compareTo(expected) >= 0) {
                valid = true;
            }
            String value = typicalFloorValues.get("typicalFloors") != null
                    ? (String) typicalFloorValues.get("typicalFloors")
                    : " floor " + floor.getNumber();
            if (valid) {
                setReportOutputDetails(pl, subRule, subRuleDesc, value,
                        expected + DcrConstants.IN_METER,
                        actual + DcrConstants.IN_METER, Result.Accepted.getResultVal());
            } else {
                setReportOutputDetails(pl, subRule, subRuleDesc, value,
                        expected + DcrConstants.IN_METER,
                        actual + DcrConstants.IN_METER, Result.Not_Accepted.getResultVal());
            }
        }
    }

    private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String floor, String expected, String actual,
            String status) {
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

    @Override
    public Map<String, Date> getAmendments() {
        return new LinkedHashMap<>();
    }
}