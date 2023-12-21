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

import static org.egov.edcr.constants.DxfFileConstants.A4;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Flight;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.common.entity.edcr.StairLanding;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.entity.blackbox.FireStairDetail;
import org.egov.edcr.entity.blackbox.FloorDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.egov.edcr.utility.math.Polygon;
import org.egov.edcr.utility.math.Ray;
import org.kabeja.dxf.DXFLWPolyline;
import org.kabeja.dxf.DXFVertex;
import org.kabeja.dxf.helpers.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class FireStair extends FeatureProcess {
	private static final Logger LOG = LogManager.getLogger(FireStair.class);
	final Ray rayCasting = new Ray(new Point(-1.123456789, -1.987654321, 0d));
	private static final String RULE_35_2_1 = "35(2)(1)";
	private static final String FLOOR = "Floor";
	private static final String RULE_35_2_2 = "35(2)(2)";
	private static final String RULE_35_2_3 = "35(2)(3)";
	private static final String RULE_35_2_4 = "35(2)(4)";
	private static final String RULE_35_2_5 = "35(2)(5)";
	private static final String EXPECTED_WIDTH = "1";
	private static final String EXPECTED_LINE = "1";
	private static final String EXPECTED_TREAD = "0.25";
	private static final String EXPECTED_TREAD_HIGHRISE = "0.2";
	private static final String WIDTH_DESCRIPTION = "Minimum width for fire stair %s";
	private static final String TREAD_DESCRIPTION = "Minimum tread for fire stair %s";
	private static final String HEIGHT_FLOOR_DESCRIPTION = "Height of floor in layer ";
	private static final String FLIGHT_POLYLINE_NOT_DEFINED_DESCRIPTION = "Firestair steps are not defined in layer ";
	private static final String LANDING_NOT_DEFINED_DESCRIPTION = "Landing polyline is not defined in layer ";
	private static final String LANDING_DESCRIPTION = "Minimum width for fire stair landing %s";
	private static final String FLIGHT_MAX_ALLOWED_STEPS = "Maximum Number of risers allowed flight of stairs;";
	
    private static final BigDecimal GENERAL_STAIR_RISER = BigDecimal.valueOf(0.15);
    private static final BigDecimal generalStairMinWidth = new BigDecimal(1.2);
    private static final BigDecimal generalStairMinTread = new BigDecimal(0.3);
    
    private static final BigDecimal RISER = BigDecimal.valueOf(0.19);
    private static final BigDecimal minimumWidth = new BigDecimal(1);
    private static final BigDecimal minimumTread = new BigDecimal(0.25);
    private static final String RISER_DESCRIPTION = "Maximum Height of Riser";
	@Autowired
	private LayerNames layerNames;
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

	@Override
	public Plan validate(Plan plan) {
		for (Block block : plan.getBlocks()) {
			if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
				for (Floor floor : block.getBuilding().getFloors()) {
					List<org.egov.common.entity.edcr.FireStair> fireStairs = floor.getFireStairs();
					if (fireStairs != null && !fireStairs.isEmpty()) {
						for (org.egov.common.entity.edcr.FireStair fireStair : fireStairs) {
							for (Flight f : fireStair.getFlights()) {
								List<Measurement> flightPolyLines = f.getFlights();
								if (flightPolyLines != null && !flightPolyLines.isEmpty()) {
									validateDimensions(plan, block.getNumber(), floor.getNumber(),
											fireStair.getNumber(), flightPolyLines);
								}
							}
						}
					}
				}
			}
		}
		return plan;
	}

	@Override
	public Plan process(Plan pl) {
		// validate(planDetail);
		HashMap<String, String> errors = new HashMap<>();
		blk: for (Block block : pl.getBlocks()) {
			if (block.getBuilding() != null && !block.getBuilding().getOccupancies().isEmpty()) {
				if (Util.singleFamilyWithLessThanOrEqualToThreeFloor(block)) {
					continue blk;
				}
				ScrutinyDetail scrutinyDetail2 = new ScrutinyDetail();
				scrutinyDetail2.addColumnHeading(1, RULE_NO);
				scrutinyDetail2.addColumnHeading(2, FLOOR);
				scrutinyDetail2.addColumnHeading(3, DESCRIPTION);
				scrutinyDetail2.addColumnHeading(4, REQUIRED);
				scrutinyDetail2.addColumnHeading(5, PROVIDED);
				scrutinyDetail2.addColumnHeading(6, STATUS);
				scrutinyDetail2.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Width");

				ScrutinyDetail scrutinyDetail3 = new ScrutinyDetail();
				scrutinyDetail3.addColumnHeading(1, RULE_NO);
				scrutinyDetail3.addColumnHeading(2, FLOOR);
				scrutinyDetail3.addColumnHeading(3, DESCRIPTION);
				scrutinyDetail3.addColumnHeading(4, REQUIRED);
				scrutinyDetail3.addColumnHeading(5, PROVIDED);
				scrutinyDetail3.addColumnHeading(6, STATUS);
				scrutinyDetail3.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Tread");

				ScrutinyDetail scrutinyDetail5 = new ScrutinyDetail();
				scrutinyDetail5.addColumnHeading(1, RULE_NO);
				scrutinyDetail5.addColumnHeading(2, FLOOR);
				scrutinyDetail5.addColumnHeading(3, REQUIRED);
				scrutinyDetail5.addColumnHeading(4, PROVIDED);
				scrutinyDetail5.addColumnHeading(5, STATUS);
				scrutinyDetail5.setKey("Block_" + block.getNumber() + "_" + "Spiral Fire Stair - Diameter");

				ScrutinyDetail scrutinyDetail4 = new ScrutinyDetail();
				scrutinyDetail4.addColumnHeading(1, RULE_NO);
				scrutinyDetail4.addColumnHeading(2, REQUIRED);
				scrutinyDetail4.addColumnHeading(3, PROVIDED);
				scrutinyDetail4.addColumnHeading(4, STATUS);
				scrutinyDetail4.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Defined Or Not");

				ScrutinyDetail scrutinyDetail6 = new ScrutinyDetail();
				scrutinyDetail6.addColumnHeading(1, RULE_NO);
				scrutinyDetail6.addColumnHeading(2, FLOOR);
				scrutinyDetail6.addColumnHeading(3, DESCRIPTION);
				scrutinyDetail6.addColumnHeading(4, REQUIRED);
				scrutinyDetail6.addColumnHeading(5, PROVIDED);
				scrutinyDetail6.addColumnHeading(6, STATUS);
				scrutinyDetail6
						.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Maximum Height of Riser");

				ScrutinyDetail scrutinyDetail7 = new ScrutinyDetail();
				scrutinyDetail7.addColumnHeading(1, RULE_NO);
				scrutinyDetail7.addColumnHeading(2, REQUIRED);
				scrutinyDetail7.addColumnHeading(3, PROVIDED);
				scrutinyDetail7.addColumnHeading(4, STATUS);
				scrutinyDetail7.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Abuting");

				ScrutinyDetail landingSD = new ScrutinyDetail();
				landingSD.addColumnHeading(1, RULE_NO);
				landingSD.addColumnHeading(2, REQUIRED);
				landingSD.addColumnHeading(3, PROVIDED);
				landingSD.addColumnHeading(4, STATUS);
				landingSD.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Landing Minimum Side");
				
				ScrutinyDetail riserSD = new ScrutinyDetail();
				riserSD.addColumnHeading(1, RULE_NO);
				riserSD.addColumnHeading(2, REQUIRED);
				riserSD.addColumnHeading(3, PROVIDED);
				riserSD.addColumnHeading(4, STATUS);
				riserSD.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Maximum Allowed Risers per Flight");

				List<Occupancy> occupancies = block.getBuilding().getOccupancies();
				List<OccupancyTypeHelper> collect = occupancies.stream().map(occupancy -> occupancy.getTypeHelper())
						.collect(Collectors.toList());
				OccupancyTypeHelper mostRestrictiveOccupancy = Util.getMostRestrictiveOccupancy(pl, collect);
				List<Boolean> abutingList = new ArrayList<>();
				int fireStairCount = 0;
				int spiralStairCount = 0;

				String occupancyType = mostRestrictiveOccupancy != null ? mostRestrictiveOccupancy.getType().getCode()
						: null;

				List<Floor> floors = block.getBuilding().getFloors();
				BigDecimal floorSize = block.getBuilding().getFloorsAboveGround();
				Floor topMostFloor = floors.stream().filter(floor -> floor.getTerrace() || floor.getUpperMost())
						.findAny().orElse(null);
				BigDecimal generalStairCount = BigDecimal.ZERO;
				for (Floor floor : floors) {
					generalStairCount = Util.roundOffTwoDecimal(generalStairCount.add(BigDecimal.valueOf(floor.getGeneralStairs().size())));
					boolean isTypicalRepititiveFloor = false;
					Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor,
							isTypicalRepititiveFloor);

					List<org.egov.common.entity.edcr.FireStair> fireStairs = floor.getFireStairs();
					fireStairCount = fireStairCount + fireStairs.size();
					spiralStairCount = spiralStairCount + floor.getSpiralStairs().size();
					List<DXFLWPolyline> builtUpAreaPolyLine = ((FloorDetail) floor).getBuiltUpAreaPolyLine();
					if (fireStairs.size() != 0) {

						for (org.egov.common.entity.edcr.FireStair fireStair : fireStairs) {

							List<List<Measurement>> flightPolylines = fireStair.getFlights().stream()
									.map(f -> f.getFlights()).collect(Collectors.toList());
							Map<Integer, List<Measurement>> flightMapByColorCode = new HashMap<>();
							for (List<Measurement> steps : flightPolylines) {
								for (Measurement step : steps) {
									Integer colorCode = Integer.valueOf(step.getColorCode());
									if (flightMapByColorCode.containsKey(colorCode)) {
										List<Measurement> existingSteps = flightMapByColorCode.get(colorCode);
										existingSteps.add(step);
										flightMapByColorCode.put(colorCode, existingSteps);
									} else {
										List<Measurement> ms = new ArrayList<>();
										ms.add(step);
										flightMapByColorCode.put(colorCode, ms);
									}
								}
							}

							List<StairLanding> landingPolyLines = fireStair.getLandings();

							// Boolean flightPolyLineClosed = fireStair.getFlightPolyLineClosed();
							List<DXFLWPolyline> fireStairPolylines = ((FireStairDetail) fireStair).getStairPolylines();
							String flightLayerName = String.format(
									layerNames.getLayerName("LAYER_NAME_FIRESTAIR_FLIGHT"), block.getNumber(),
									floor.getNumber(), fireStair.getNumber());

							if (builtUpAreaPolyLine != null && builtUpAreaPolyLine.size() > 0
									&& fireStairPolylines != null && fireStairPolylines.size() > 0) {

								for (DXFLWPolyline builtUpPolyLine : builtUpAreaPolyLine) {
									Polygon builtUpPolygon = Util.getPolygon(builtUpPolyLine);

									for (DXFLWPolyline fireStairPolyLine : fireStairPolylines) {
										Iterator vertexIterator = fireStairPolyLine.getVertexIterator();
										while (vertexIterator.hasNext()) {
											DXFVertex dxfVertex = (DXFVertex) vertexIterator.next();
											Point point = dxfVertex.getPoint();
											if (rayCasting.contains(point, builtUpPolygon)) {
												abutingList.add(true);
											} else {
												abutingList.add(false);
											}
										}
									}
								}
							}
							boolean belowTopMostFloor = false;
							if (topMostFloor != null) {
								if (topMostFloor.getTerrace())
									belowTopMostFloor = (floor.getNumber() >= topMostFloor.getNumber() - 1);
								else
									belowTopMostFloor = (floor.getNumber() == topMostFloor.getNumber());

							}
							// boolean belowTopMostFloor = topMostFloor != null ? floor.getTerrace()?(
							// floor.getNumber() ==
							// topMostFloor.getNumber() -1):(floor.getNumber() == topMostFloor.getNumber()):
							// false;

							// Flight/Step minimum width and tread validation
							int totalStepsInFloor = 0;
							if (!floor.getTerrace() && !floor.getUpperMost() && !belowTopMostFloor) {
								if (!flightMapByColorCode.isEmpty()) {
									for (Map.Entry<Integer, List<Measurement>> stepsMap : flightMapByColorCode
											.entrySet()) {
										int failedWidthCount = 0;
										int failedTreadCount = 0;
										int totalSteps = stepsMap.getValue().size();
										totalStepsInFloor = totalStepsInFloor + totalSteps;
										Integer flightColor = stepsMap.getKey();
										for (Measurement sm : stepsMap.getValue()) {
											if (sm.getHeight().setScale(2, RoundingMode.HALF_UP)
													.compareTo(minimumWidth) < 0)
												failedWidthCount++;
											if (sm.getWidth().setScale(2, RoundingMode.HALF_UP)
													.compareTo(minimumTread) < 0)
												failedTreadCount++;
											if (sm.getHeight().compareTo(generalStairMinWidth) >= 0
													&& sm.getWidth().compareTo(generalStairMinTread) >= 0
													&& !floor.getTerrace()) {
												fireStair.setGeneralStair(true);
											}
										}

										if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
											String value = typicalFloorValues.get("typicalFloors") != null
													? (String) typicalFloorValues.get("typicalFloors")
													: " floor " + floor.getNumber();

											if (failedWidthCount > 0) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_3, value,
														String.format(WIDTH_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_WIDTH,
														failedWidthCount + " out of " + totalSteps
																+ " steps in the flight-" + flightColor
																+ " are not having the minimum width",
														Result.Not_Accepted.getResultVal(), scrutinyDetail2);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_3, value,
														String.format(WIDTH_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_WIDTH,
														totalSteps + " steps in the flight-" + flightColor
																+ " are having the minimum width",
														Result.Accepted.getResultVal(), scrutinyDetail2);

											}

											if (failedTreadCount > 0) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_3, value,
														String.format(TREAD_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_TREAD,
														failedTreadCount + " out of " + totalSteps
																+ " steps in the flight-" + flightColor
																+ " are not having the minimum tread",
														Result.Not_Accepted.getResultVal(), scrutinyDetail3);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_3, value,
														String.format(TREAD_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_TREAD,
														totalSteps + " steps in the flight-" + flightColor
																+ " are having the minimum tread",
														Result.Accepted.getResultVal(), scrutinyDetail3);
											}
											
											if(totalSteps > 16) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_4, value,
														FLIGHT_MAX_ALLOWED_STEPS,
														"Less than or equal to 16",
														 "Flight-"+flightColor+" having the "+String.valueOf(totalSteps)+" risers",
														Result.Not_Accepted.getResultVal(), riserSD);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_4, value,
														FLIGHT_MAX_ALLOWED_STEPS,
														"Less than or equal to 16",
														"Flight-"+flightColor+" having the "+String.valueOf(totalSteps)+" risers",
														Result.Accepted.getResultVal(), riserSD);
											}
										}
									}

									// Maximum height of riser validation
									try {
										int landingSize = 0;
										for (StairLanding lds : fireStair.getLandings())
											landingSize = landingSize + lds.getLandings().size();
										int noOfRisesInFloor = totalStepsInFloor + landingSize + 1;

										if (fireStair != null && fireStair.getFloorHeight() != null
												&& fireStair.getFloorHeight().doubleValue() > 0) {

											BigDecimal providedRise = fireStair.getFloorHeight().divide(
													BigDecimal.valueOf(noOfRisesInFloor),
													DcrConstants.DECIMALDIGITS_MEASUREMENTS,
													DcrConstants.ROUNDMODE_MEASUREMENTS);
											String value = typicalFloorValues.get("typicalFloors") != null
													? (String) typicalFloorValues.get("typicalFloors")
													: " floor " + floor.getNumber();

											if (providedRise.compareTo(RISER) <= 0) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_4, value,
														String.format(RISER_DESCRIPTION, fireStair.getNumber()),
														String.valueOf(RISER), String.valueOf(providedRise),
														Result.Accepted.getResultVal(), scrutinyDetail6);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_4, value,
														String.format(RISER_DESCRIPTION, fireStair.getNumber()),
														String.valueOf(RISER), String.valueOf(providedRise),
														Result.Not_Accepted.getResultVal(), scrutinyDetail6);
											}

										} else {
											String layerName = String.format(DxfFileConstants.LAYER_FIRESTAIR_FLOOR,
													block.getNumber(), floor.getNumber(), fireStair.getNumber());
											errors.put("FLR_HT_M " + layerName,
													edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
															new String[] { HEIGHT_FLOOR_DESCRIPTION + layerName },
															LocaleContextHolder.getLocale()));
											pl.addErrors(errors);
										}
									} catch (ArithmeticException e) {
										LOG.info("Denominator is zero");
									}

								} else {
									errors.put("Flight PolyLine width" + flightLayerName,
											FLIGHT_POLYLINE_NOT_DEFINED_DESCRIPTION + flightLayerName);
									pl.addErrors(errors);
								}
								
								// Landing dimension validation
								if (landingPolyLines != null && landingPolyLines.size() > 0) {
									// if (flightPolyLineClosed) {
									List<Measurement> landings = new ArrayList<>();
									int failedLandingCount = 0;
									for(StairLanding sl : landingPolyLines)
										for (Measurement land : sl.getLandings()) {
											if (land.getMinimumSide().setScale(2, RoundingMode.HALF_UP)
													.compareTo(minimumWidth) < 0)
												failedLandingCount++;
											landings.add(land);
										}
									int landingSize = landings.size();
									if (!landings.isEmpty()) {
										if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
											String value = typicalFloorValues.get("typicalFloors") != null
													? (String) typicalFloorValues.get("typicalFloors")
													: " floor " + floor.getNumber();
											if (failedLandingCount > 0) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_2, value,
														String.format(LANDING_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_LINE, failedLandingCount + " out of "+ landingSize +" landings are not having minimum width",
														Result.Not_Accepted.getResultVal(), landingSD);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_2, value,
														String.format(LANDING_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_LINE, landingSize +" landings are having minimum width",
														Result.Accepted.getResultVal(), landingSD);
											}
										}
									} else {
										errors.put("Flight PolyLine width" + flightLayerName,
												LANDING_NOT_DEFINED_DESCRIPTION + flightLayerName);
										pl.addErrors(errors);
									}
								}
							}

						}
					}
				}
				boolean isAbuting = abutingList.stream().anyMatch(aBoolean -> aBoolean == true);

				if (occupancyType != null) {
					if (occupancyType.equalsIgnoreCase(A4)) {
						if (floorSize.compareTo(BigDecimal.valueOf(3)) > 0) {
							if (fireStairCount > 0) {
								setReportOutputDetails(pl, RULE_35_2_1,
										String.format(RULE_35_2_1, block.getNumber()), "",
										DcrConstants.OBJECTDEFINED_DESC, Result.Accepted.getResultVal(),
										scrutinyDetail4);
							} else {
								if (spiralStairCount == 0 && generalStairCount.doubleValue() == 0)
									setReportOutputDetails(pl, RULE_35_2_1,
											String.format(RULE_35_2_1, block.getNumber()),
											"Minimum 1 fire stair is required", DcrConstants.OBJECTNOTDEFINED_DESC,
											Result.Not_Accepted.getResultVal(), scrutinyDetail4);
							}
						}
					} else {
						if (floorSize.compareTo(BigDecimal.valueOf(2)) > 0) {
							if (fireStairCount > 0) {
								setReportOutputDetails(pl, RULE_35_2_1,
										String.format(RULE_35_2_1, block.getNumber()), "",
										DcrConstants.OBJECTDEFINED_DESC, Result.Accepted.getResultVal(),
										scrutinyDetail4);
								setReportOutputDetails(pl, RULE_35_2_5, String.format(RULE_35_2_5, block.getNumber()), "The height of stair handrails shall not be less than 1.0 m and greater than 1.20 m",
		                                "", Result.Verify.getResultVal(), scrutinyDetail4);
							} else {
								if (spiralStairCount == 0 && generalStairCount.doubleValue() == 0)
									setReportOutputDetails(pl, RULE_35_2_1,
											String.format(RULE_35_2_1, block.getNumber()), "",
											DcrConstants.OBJECTNOTDEFINED_DESC, Result.Not_Accepted.getResultVal(),
											scrutinyDetail4);
							}
						}
					}
				}
				if (fireStairCount > 0) {
					if (isAbuting) {
						setReportOutputDetails(pl, RULE_35_2_1, String.format(RULE_35_2_1, block.getNumber()),
								"should abut built up area", "is abutting built up area",
								Result.Accepted.getResultVal(), scrutinyDetail7);
					} else {
						setReportOutputDetails(pl, RULE_35_2_1, String.format(RULE_35_2_1, block.getNumber()),
								"should abut built up area", "is not abutting built up area",
								Result.Not_Accepted.getResultVal(), scrutinyDetail7);
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

	private void setReportOutputDetailsFloorStairWise(Plan pl, String ruleNo, String floor, String description,
			String expected, String actual, String status, ScrutinyDetail scrutinyDetail) {
		Map<String, String> details = new HashMap<>();
		details.put(RULE_NO, ruleNo);
		details.put(FLOOR, floor);
		details.put(DESCRIPTION, description);
		details.put(REQUIRED, expected);
		details.put(PROVIDED, actual);
		details.put(STATUS, status);
		scrutinyDetail.getDetail().add(details);
		pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
	}

	private void validateDimensions(Plan planDetail, String blockNo, int floorNo, String stairNo,
			List<Measurement> flightPolyLines) {
		int count = 0;
		for (Measurement m : flightPolyLines) {
			if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0) {
				count++;
			}
		}
		if (count > 0) {
			String flightLayerName = String.format(layerNames.getLayerName("LAYER_NAME_FIRESTAIR_FLIGHT"), blockNo,
					floorNo, stairNo);
			planDetail.addError(flightLayerName,
					count + " number of flight polyline not having only 4 points in layer " + flightLayerName);

		}
	}

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}

}