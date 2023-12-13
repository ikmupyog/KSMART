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
import static org.egov.edcr.constants.DxfFileConstants.E1;
import static org.egov.edcr.constants.DxfFileConstants.E2;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.G3;
import static org.egov.edcr.constants.DxfFileConstants.G4;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.constants.DxfFileConstants.J;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ExitWidth extends FeatureProcess {

	private static final String EXIT_WIDTH_DESC = "Exit Width";
	private static final String SUBRULE_46_2 = "46(2)";
	private static final String SUBRULE_37_2 = "37(2) Table 16";
	private static final String SUBRULE_37_2_38_2 = "37(2) 37(3) Table 16 & 17";
	private static final String SUB_RULE_DESCRIPTION = "Minimum exit width";
	public static final BigDecimal VAL_0_75 = BigDecimal.valueOf(0.75);
	public static final BigDecimal VAL_1_2 = BigDecimal.valueOf(1.2);
	private static final String SUBRULE_45_1 = "45(1)";
	private static final String SUB_RULE_OCCUPANTS_DESCRIPTION = "Maximum number of occupants that can be allowed through";
	private static final String OCCUPANCY = "Occupancy";
	private static final String EXIT_WIDTH = "Exit Width";
	private static final String FLOOR = "Floor";

	private Plan validateExitWidth(Plan pl) {
		HashMap<String, String> errors = new HashMap<>();
		// validate either exit width door or exit width stair should be compulsory
		if (!pl.getBlocks().isEmpty()) {
			blk: for (Block block : pl.getBlocks()) {
				if (!block.getCompletelyExisting()) {
					if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
						if ((pl.getPlot() != null
								&& Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block))
								|| Util.checkExemptionConditionForBuildingParts(block)) {
							continue blk;
						}
						for (Floor floor : block.getBuilding().getFloors()) {
							if (floor.getExitWidthDoor().isEmpty() && floor.getExitWidthStair().isEmpty()) {
								errors.put(
										String.format(DcrConstants.EXIT_WIDTH_DOORSTAIRWAYS, block.getNumber(),
												floor.getNumber()),
										edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
												new String[] { String.format(DcrConstants.EXIT_WIDTH_DOORSTAIRWAYS,
														block.getNumber(), floor.getNumber()) },
												LocaleContextHolder.getLocale()));
								pl.addErrors(errors);
							}
						}
					}
				}
			}
		}
		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		String rule = EXIT_WIDTH_DESC;
		String subRule = null;
		validateExitWidth(pl);
		if (!pl.getBlocks().isEmpty()) {
			for (Block block : pl.getBlocks()) {
				if (!block.getCompletelyExisting()) {
					if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
						for (Floor flr : block.getBuilding().getFloors()) {
							Map<OccupancyTypeHelper, OccupancyTypeHelper> mapOfOriginalAndConvertedOccupancyTypes = new HashMap<>();
							List<Occupancy> occupanciesList = new ArrayList<>();
							// floor wise occupanies
							// example if we have two occupancies in a floor - E with floor area 250 and D
							// with floor area 100
							for (Occupancy occupancy : flr.getOccupancies()) {
								// converted occupancty type
								OccupancyTypeHelper occupancyTypeAsPerFloorArea = Util.getOccupancyAsPerFloorArea(
										occupancy.getTypeHelper(), occupancy.getFloorArea(), pl); // occupancy
																									// conversion logic
								mapOfOriginalAndConvertedOccupancyTypes.put(occupancyTypeAsPerFloorArea,
										occupancy.getTypeHelper());
								// mapOfOriginalAndConvertedOccupancyTypes will contain (F,E) as first entity
								// and (F,D) as second
								// entry
							}
							List<OccupancyTypeHelper> listOfOccupancies = flr.getOccupancies().stream()
									.map(occupancy -> occupancy.getTypeHelper()).collect(Collectors.toList());
							List<String> listOfOccupancyCodes = listOfOccupancies.stream()
									.map(occ -> occ.getType().getCode()).collect(Collectors.toList());
							Map<OccupancyTypeHelper, List<OccupancyTypeHelper>> mapOfConvertedOccupancyAndOriginalListOfOccupancies = new HashMap<>();
							for (Map.Entry<OccupancyTypeHelper, OccupancyTypeHelper> originalAndConvertedOccupancyType : mapOfOriginalAndConvertedOccupancyTypes
									.entrySet()) {
								if (listOfOccupancyCodes
										.contains(originalAndConvertedOccupancyType.getValue().getType().getCode())) {
									// TODO: Need to re-look occupancy type check
									if (!mapOfConvertedOccupancyAndOriginalListOfOccupancies
											.containsKey(originalAndConvertedOccupancyType.getKey())) {
										// in first iteration mapOfConvertedOccupancyAndOriginalListOfOccupancies will
										// contain
										// (F,<empty list>)
										mapOfConvertedOccupancyAndOriginalListOfOccupancies
												.put(originalAndConvertedOccupancyType.getKey(), new ArrayList<>());
									}
									// in second and all other iterations,
									// mapOfConvertedOccupancyAndOriginalListOfOccupancies
									// will show like (F,<E>),(F,<E,D>)
									mapOfConvertedOccupancyAndOriginalListOfOccupancies
											.get(originalAndConvertedOccupancyType.getKey())
											.add(originalAndConvertedOccupancyType.getValue());
								}
							}
							for (Map.Entry<OccupancyTypeHelper, List<OccupancyTypeHelper>> convertedOccupancyAndOriginalListOfOccupancies : mapOfConvertedOccupancyAndOriginalListOfOccupancies
									.entrySet()) {
								List<OccupancyTypeHelper> originalOccupanciesList = convertedOccupancyAndOriginalListOfOccupancies
										.getValue();
								BigDecimal totalFloorArea = BigDecimal.ZERO;
								BigDecimal totalBuiltUpArea = BigDecimal.ZERO;
								BigDecimal totalExistingFloorArea = BigDecimal.ZERO;
								BigDecimal totalExistingBuiltUpArea = BigDecimal.ZERO;
								for (Occupancy occupancy : flr.getOccupancies()) {
									if (originalOccupanciesList.contains(occupancy.getTypeHelper())) {
										// adding floor area for F ie 250 + 100 = 350
										totalFloorArea = totalFloorArea.add((occupancy.getFloorArea()));
										totalBuiltUpArea = totalBuiltUpArea
												.add(occupancy.getBuiltUpArea() == null ? BigDecimal.valueOf(0)
														: occupancy.getBuiltUpArea());
										totalExistingFloorArea = totalExistingFloorArea
												.add(occupancy.getExistingFloorArea());
										totalExistingBuiltUpArea = totalExistingBuiltUpArea
												.add(occupancy.getExistingBuiltUpArea() == null ? BigDecimal.valueOf(0)
														: occupancy.getExistingBuiltUpArea());
									}
								}
								if (totalFloorArea.compareTo(BigDecimal.ZERO) > 0
										&& totalBuiltUpArea.compareTo(BigDecimal.ZERO) > 0
										&& convertedOccupancyAndOriginalListOfOccupancies.getKey() != null) {
									Occupancy occupancy = new Occupancy();
									occupancy.setFloorArea(totalFloorArea);
									occupancy.setCarpetArea(totalFloorArea.multiply(BigDecimal.valueOf(0.80)));
									occupancy.setTypeHelper(convertedOccupancyAndOriginalListOfOccupancies.getKey());
									occupancy.setBuiltUpArea(totalBuiltUpArea);
									occupancy.setExistingBuiltUpArea(totalExistingBuiltUpArea);
									occupancy.setExistingFloorArea(totalExistingFloorArea);
									occupancy.setExistingCarpetArea(
											totalExistingFloorArea.multiply(BigDecimal.valueOf(0.80)));
									occupanciesList.add(occupancy);
								}
							}
							flr.setConvertedOccupancies(occupanciesList);
						}
					}
				}
			}
			blk: for (Block block : pl.getBlocks()) {
				if (!block.getCompletelyExisting()) {
					scrutinyDetail = new ScrutinyDetail();
					scrutinyDetail.addColumnHeading(1, RULE_NO);
					scrutinyDetail.addColumnHeading(2, FLOOR);
					scrutinyDetail.addColumnHeading(3, OCCUPANCY);
					scrutinyDetail.addColumnHeading(4, REQUIRED);
					scrutinyDetail.addColumnHeading(5, PROVIDED);
					scrutinyDetail.addColumnHeading(6, STATUS);
					scrutinyDetail.setKey("Block_" + block.getNumber() + "_" + "Exit Width- Minimum Exit Width");
					ScrutinyDetail scrutinyDetail2 = new ScrutinyDetail();
					scrutinyDetail2.addColumnHeading(1, RULE_NO);
					scrutinyDetail2.addColumnHeading(2, FLOOR);
					scrutinyDetail2.addColumnHeading(3, REQUIRED);
					scrutinyDetail2.addColumnHeading(4, PROVIDED);
					scrutinyDetail2.addColumnHeading(5, STATUS);
					scrutinyDetail2.setKey("Block_" + block.getNumber() + "_" + "Exit Width- Maximum Occupant Load");
					if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
						if ((pl.getPlot() != null
								&& Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), block))
								|| Util.checkExemptionConditionForBuildingParts(block)) {
							continue blk;
						}
						for (Floor flr : block.getBuilding().getFloors()) {
							BigDecimal totalOccupantLoadForAFloor = BigDecimal.ZERO;
							List<BigDecimal> listOfMaxOccupantsAllowedThrghExits = new ArrayList<>();
							BigDecimal value;
							List<Map<String, Object>> occupancyTypeValueListMap = new ArrayList<>();
							if (!flr.getConvertedOccupancies().isEmpty()) {
								for (Occupancy occupancy : flr.getConvertedOccupancies()) {
									Map<String, Object> occupancyTypeValueMap = new HashMap<>();
									String occupancyCode = occupancy.getTypeHelper().getType().getCode();
									if (occupancyCode.equals(A1) || occupancyCode.equals(A5)) {
										value = VAL_0_75;
									} else {
										value = VAL_1_2;
									}
									occupancyTypeValueMap.put(OCCUPANCY, occupancyCode);
									occupancyTypeValueMap.put(EXIT_WIDTH, value);
									occupancyTypeValueListMap.add(occupancyTypeValueMap);
								}
								/*
								 * calculating maximum exit width, if map has two enteries with same exit width
								 * , occupancy needs to be comma separated if it is different and it need not be
								 * duplicated if occupancy is same
								 */
								if (!occupancyTypeValueListMap.isEmpty()) {
									Map<String, Object> mostRestrictiveOccupancyAndMaxValueMap = occupancyTypeValueListMap
											.get(0);
									for (Map<String, Object> occupancyValueMap : occupancyTypeValueListMap) {
										if (((BigDecimal) occupancyValueMap.get(EXIT_WIDTH))
												.compareTo((BigDecimal) mostRestrictiveOccupancyAndMaxValueMap
														.get(EXIT_WIDTH)) == 0) {
											if (!(occupancyValueMap.get(OCCUPANCY))
													.equals(mostRestrictiveOccupancyAndMaxValueMap.get(OCCUPANCY))) {
												SortedSet<String> uniqueOccupancies = new TreeSet<>();
												String[] occupancyString = (occupancyValueMap.get(OCCUPANCY) + " , "
														+ mostRestrictiveOccupancyAndMaxValueMap.get(OCCUPANCY))
																.split(" , ");
												for (String str : occupancyString) {
													uniqueOccupancies.add(str);
												}
												String occupancyStr = removeDuplicates(uniqueOccupancies);
												mostRestrictiveOccupancyAndMaxValueMap.put(OCCUPANCY, occupancyStr);
											}
											continue;
										}
										if (((BigDecimal) mostRestrictiveOccupancyAndMaxValueMap.get(EXIT_WIDTH))
												.compareTo((BigDecimal) occupancyValueMap.get(EXIT_WIDTH)) < 0) {
											mostRestrictiveOccupancyAndMaxValueMap.putAll(occupancyValueMap);

										}
									}
									validateRule_37_2(flr, pl, subRule, rule, block,
											(BigDecimal) mostRestrictiveOccupancyAndMaxValueMap.get(EXIT_WIDTH),
											(String) mostRestrictiveOccupancyAndMaxValueMap.get(OCCUPANCY));
								}
							}
							for (Occupancy occupancy : flr.getConvertedOccupancies()) {
								BigDecimal occupantLoad = BigDecimal.ZERO;
								BigDecimal maxOccupantsAllowedThrghExits = BigDecimal.ZERO;
								BigDecimal occupantLoadDivisonFactor;
								String occupancyCode = occupancy.getTypeHelper().getType().getCode();
								if (occupancyCode.equals(A1) || occupancyCode.equals(A4) || occupancyCode.equals(A5)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(12.5);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(25);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(A2) || occupancyCode.equals(F3)
										|| occupancyCode.equals(A3)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(4);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(50);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(B1) || occupancyCode.equals(B2)
										|| occupancyCode.equals(B3)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(4);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(25);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(C) || occupancyCode.equals(C1)
										|| occupancyCode.equals(C2) || occupancyCode.equals(C3)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(15);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(25);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(D) || occupancyCode.equals(D1)
										|| occupancyCode.equals(D2)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(1.5);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(90);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(60);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(E)|| occupancyCode.equals(E1) || occupancyCode.equals(E2)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(1.5);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(50);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(F) || occupancyCode.equals(F1)
										|| occupancyCode.equals(F2) || occupancyCode.equals(F3)
										|| occupancyCode.equals(F3)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(4.5);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(50);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(G1) || occupancyCode.equals(G2)|| occupancyCode.equals(G3)|| occupancyCode.equals(G4)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(10);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(50);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(H)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(30);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(50);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								} else if (occupancyCode.equals(I1) || occupancyCode.equals(I2)) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(10);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(40);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(25);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								}else if (occupancyCode.equals(J) ) {
									occupantLoadDivisonFactor = BigDecimal.valueOf(4.5);
									occupantLoad = getOccupantLoadOfAFloor(occupancy, occupantLoadDivisonFactor);
									BigDecimal noOfDoors = BigDecimal.valueOf(75);
									BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay = BigDecimal.valueOf(50);
									maxOccupantsAllowedThrghExits = getMaximumNumberOfOccupantsAllwdThroughExits(flr,
											noOfDoors, noOfOccupantsPerUnitExitWidthOfStairWay);
								}
								totalOccupantLoadForAFloor = totalOccupantLoadForAFloor.add(occupantLoad);
								listOfMaxOccupantsAllowedThrghExits.add(maxOccupantsAllowedThrghExits);
							}
							if (!listOfMaxOccupantsAllowedThrghExits.isEmpty()) {
								BigDecimal minimumOfMaxOccupantsAllowedThrghExits = listOfMaxOccupantsAllowedThrghExits
										.get(0);
								for (BigDecimal occupantsAllowedThroughExits : listOfMaxOccupantsAllowedThrghExits) {
									if (occupantsAllowedThroughExits
											.compareTo(minimumOfMaxOccupantsAllowedThrghExits) < 0) {
										minimumOfMaxOccupantsAllowedThrghExits = occupantsAllowedThroughExits;
									}
								}
								validateRule_37_2_38_2(rule, subRule, totalOccupantLoadForAFloor,
										minimumOfMaxOccupantsAllowedThrghExits, pl, block, flr, scrutinyDetail2);
							}

						}
					}
				}
			}
		}
		return pl;
	}

	private void validateRule_37_2_38_2(String rule, String subRule, BigDecimal occupantLoadInAFlr,
			BigDecimal maxOccupantsAllowedThrghExits, Plan pl, Block block, Floor floor,
			ScrutinyDetail scrutinyDetail2) {
		boolean valid = false;
		boolean isTypicalRepititiveFloor = false;
		subRule = SUBRULE_37_2_38_2;

		if (maxOccupantsAllowedThrghExits != null && occupantLoadInAFlr != null
				&& maxOccupantsAllowedThrghExits.compareTo(BigDecimal.ZERO) > 0
				&& occupantLoadInAFlr.compareTo(BigDecimal.ZERO) > 0) {
			Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor, isTypicalRepititiveFloor);
			if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
				if (maxOccupantsAllowedThrghExits.compareTo(occupantLoadInAFlr) >= 0) {
					valid = true;
				}
				String value = typicalFloorValues.get("typicalFloors") != null
						? (String) typicalFloorValues.get("typicalFloors")
						: " floor " + floor.getNumber();
				if (valid) {
					setReportOutputDetailsWithoutOccupancy(pl, subRule, value, occupantLoadInAFlr.toString(),
							maxOccupantsAllowedThrghExits.toString(), Result.Accepted.getResultVal(), scrutinyDetail2);
				} else {
					setReportOutputDetailsWithoutOccupancy(pl, subRule, value, occupantLoadInAFlr.toString(),
							maxOccupantsAllowedThrghExits.toString(), Result.Not_Accepted.getResultVal(),
							scrutinyDetail2);

				}
			}
		}
	}

	private BigDecimal getMaximumNumberOfOccupantsAllwdThroughExits(Floor floor, BigDecimal noOfDoors,
			BigDecimal noOfOccupantsPerUnitExitWidthOfStairWay) {
		if (!floor.getExitWidthDoor().isEmpty() || !floor.getExitWidthStair().isEmpty()) {
			Double sumOfAccessWidthDoor = Double.valueOf(0);
			Double sumOfAccessWidthStair = Double.valueOf(0);
			BigDecimal augend1 = BigDecimal.ZERO;
			BigDecimal augend2 = BigDecimal.ZERO;
			if (!floor.getExitWidthDoor().isEmpty()) {
				sumOfAccessWidthDoor = floor.getExitWidthDoor().stream().mapToDouble(BigDecimal::doubleValue).sum();
			}
			if (!floor.getExitWidthStair().isEmpty()) {
				sumOfAccessWidthStair = floor.getExitWidthStair().stream().mapToDouble(BigDecimal::doubleValue).sum();
			}
			if (sumOfAccessWidthDoor.compareTo(Double.valueOf(0)) > 0) {
				Double roundedValue = Math.floor(sumOfAccessWidthDoor * Double.valueOf(4)) / Double.valueOf(4);
				augend1 = BigDecimal.valueOf(Math.ceil(roundedValue * noOfDoors.doubleValue() / 0.5d));
				/*
				 * augend1 =
				 * (BigDecimal.valueOf(roundedValue).multiply(noOfDoors)).divide(BigDecimal.
				 * valueOf(0.5));
				 */
			}
			if (sumOfAccessWidthStair.compareTo(Double.valueOf(0)) > 0) {
				Double roundedValue = Math.floor(sumOfAccessWidthStair * Double.valueOf(4)) / Double.valueOf(4);
				augend2 = BigDecimal.valueOf(
						Math.ceil(roundedValue * noOfOccupantsPerUnitExitWidthOfStairWay.doubleValue() / 0.5d));
				/*
				 * augend2 = (BigDecimal.valueOf(roundedValue).multiply(
				 * noOfOccupantsPerUnitExitWidthOfStairWay)).divide(BigDecimal.valueOf( 0.5));
				 */
			}
			return augend1.add(augend2);
		}
		return BigDecimal.ZERO;
	}

	private BigDecimal getOccupantLoadOfAFloor(Occupancy occupancy, BigDecimal occupantLoadDivisonFactor) {
		return BigDecimal.valueOf(Math.ceil(occupancy.getBuiltUpArea()
				.divide(occupantLoadDivisonFactor, DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS).doubleValue()));
	}

	private void validateRule_37_2(Floor floor, Plan pl, String subRule, String rule, Block block, BigDecimal value,
			String occupancyType) {
		// calculate minimum of exit widths provided and validate for that.
		boolean isTypicalRepititiveFloor = false;
		subRule = SUBRULE_37_2;
		BigDecimal minimumExitWidth = floor.getExitWidthDoor().isEmpty() ? BigDecimal.ZERO : floor.getExitWidthDoor().get(0);
		for (BigDecimal exitWidthDoor : floor.getExitWidthDoor()) {
			if (exitWidthDoor.compareTo(minimumExitWidth) < 0) {
				minimumExitWidth = exitWidthDoor;
			}
		}
		Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor, isTypicalRepititiveFloor);
		if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
			Boolean valid = false;
			if (minimumExitWidth.compareTo(value) >= 0) {
				valid = true;
			}
			String typclFloor = typicalFloorValues.get("typicalFloors") != null
					? (String) typicalFloorValues.get("typicalFloors")
					: " floor " + floor.getNumber();
			String[] occCodesArr = occupancyType.split(",");
			StringBuilder sb = new StringBuilder();
			for(String code : occCodesArr) {
				sb.append(Util.getOccupancyByCode(pl, code.trim()).getType().getName());
				if (!code.equals(occCodesArr[occCodesArr.length - 1])) {
					sb.append(" , ");
				}
			}
			if (valid) {
				setReportOutputDetails(pl, subRule, typclFloor, String.valueOf(sb), value + DcrConstants.IN_METER,
						minimumExitWidth + DcrConstants.IN_METER, Result.Accepted.getResultVal());
			} else {
				setReportOutputDetails(pl, subRule, typclFloor, String.valueOf(sb), value + DcrConstants.IN_METER,
						minimumExitWidth + DcrConstants.IN_METER, Result.Not_Accepted.getResultVal());
			}
		}
	
	}

	private void setReportOutputDetails(Plan pl, String ruleNo, String floor, String occupancy, String expected,
			String actual, String status) {
		Map<String, String> details = new HashMap<>();
		details.put(RULE_NO, ruleNo);
		details.put(FLOOR, floor);
		details.put(OCCUPANCY, occupancy);
		details.put(REQUIRED, expected);
		details.put(PROVIDED, actual);
		details.put(STATUS, status);
		scrutinyDetail.getDetail().add(details);
		pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
	}

	private void setReportOutputDetailsWithoutOccupancy(Plan pl, String ruleNo, String floor, String expected,
			String actual, String status, ScrutinyDetail scrutinyDetail2) {
		Map<String, String> details = new HashMap<>();
		details.put(RULE_NO, ruleNo);
		details.put(FLOOR, floor);
		details.put(REQUIRED, expected);
		details.put(PROVIDED, actual);
		details.put(STATUS, status);
		scrutinyDetail2.getDetail().add(details);
		pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail2);
	}

	private String removeDuplicates(SortedSet<String> uniqueData) {
		StringBuilder str = new StringBuilder();
		List<String> unqList = new ArrayList<>(uniqueData);
		for (String unique : unqList) {
			str.append(unique);
			if (!unique.equals(unqList.get(unqList.size() - 1))) {
				str.append(" , ");
			}
		}
		return str.toString();
	}

	@Override
	public Plan validate(Plan pl) {
		validateExitWidth(pl);
		return pl;
	}

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
}