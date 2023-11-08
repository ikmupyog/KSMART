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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import static org.egov.edcr.constants.DxfFileConstants.A4;
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
import org.kabeja.dxf.DXFLine;
import org.kabeja.dxf.DXFVertex;
import org.kabeja.dxf.helpers.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class FireStair extends FeatureProcess {
	private static final Logger LOG = LogManager.getLogger(FireStair.class);
	final Ray rayCasting = new Ray(new Point(-1.123456789, -1.987654321, 0d));
	private static final String RULE_35_2_1 = "35(2)(1)";
	private static final String FLOOR = "Floor";
	private static final String RULE_35_2_2 = "35(2)(2)";
	private static final String RULE_35_2_3 = "35(2)(3)";
	private static final String RULE_35_2_4 = "35(2)(4)";
	private static final String RULE_35_2_5 = "35(2)(5)";
	private static final String RULE42 = "42";
	private static final String EXPECTED_WIDTH = "0.25";
	private static final String EXPECTED_LINE = "1";
	private static final String EXPECTED_TREAD = "0.25";
	private static final String EXPECTED_TREAD_HIGHRISE = "0.2";
	private static final String WIDTH_DESCRIPTION = "Minimum width for fire stair %s";
	private static final String TREAD_DESCRIPTION = "Minimum tread for fire stair %s";
	private static final String LINE_DESCRIPTION = "Minimum length of line for fire stair %s flight layer";
	private static final String HEIGHT_FLOOR_DESCRIPTION = "Height of floor in layer ";
	private static final String FLIGHT_POLYLINE_NOT_DEFINED_DESCRIPTION = "Flight polyline is not defined in layer ";
	private static final String FLIGHT_LENGTH_DEFINED_DESCRIPTION = "Flight polyline length is not defined in layer ";
	private static final String FLIGHT_WIDTH_DEFINED_DESCRIPTION = "Flight polyline width is not defined in layer ";
	private static final String LANDING_WIDTH_DEFINED_DESCRIPTION = "Landing polyline width is not defined in layer ";
	private static final String LANDING_DESCRIPTION = "Minimum width for fire stair landing %s";
	@Autowired
	private LayerNames layerNames;

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
						.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Length Of Line In Flight Layer");

				ScrutinyDetail scrutinyDetail7 = new ScrutinyDetail();
				scrutinyDetail7.addColumnHeading(1, RULE_NO);
				scrutinyDetail7.addColumnHeading(2, REQUIRED);
				scrutinyDetail7.addColumnHeading(3, PROVIDED);
				scrutinyDetail7.addColumnHeading(4, STATUS);
				scrutinyDetail7.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Abuting");

				ScrutinyDetail scrutinyDetail8 = new ScrutinyDetail();
				scrutinyDetail8.addColumnHeading(1, RULE_NO);
				scrutinyDetail8.addColumnHeading(2, REQUIRED);
				scrutinyDetail8.addColumnHeading(3, PROVIDED);
				scrutinyDetail8.addColumnHeading(4, STATUS);
				scrutinyDetail8.setKey("Block_" + block.getNumber() + "_" + "Fire Stair - Landing Minimum Side");

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
				for (Floor floor : floors) {

					boolean isTypicalRepititiveFloor = false;
					Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor,
							isTypicalRepititiveFloor);

					List<org.egov.common.entity.edcr.FireStair> fireStairs = floor.getFireStairs();
					fireStairCount = fireStairCount + fireStairs.size();
					spiralStairCount = spiralStairCount + floor.getSpiralStairs().size();
					List<DXFLWPolyline> builtUpAreaPolyLine = ((FloorDetail) floor).getBuiltUpAreaPolyLine();
					if (fireStairs.size() != 0) {

						for (org.egov.common.entity.edcr.FireStair fireStair : fireStairs) {
							List<Measurement> flightPolyLines = fireStair.getStairMeasurements();
							List<StairLanding> landingPolyLines = fireStair.getLandings();
							List<List<BigDecimal>> flightLengths = fireStair.getFlights().stream()
									.map(Flight::getLengthOfFlights).collect(Collectors.toList());
							List<List<BigDecimal>> flightWidths = fireStair.getFlights().stream()
									.map(Flight::getWidthOfFlights).collect(Collectors.toList());
							// Boolean flightPolyLineClosed = fireStair.getFlightPolyLineClosed();
							List<DXFLWPolyline> fireStairPolylines = ((FireStairDetail) fireStair).getStairPolylines();
							BigDecimal minTread = BigDecimal.ZERO;
							BigDecimal minFlightWidth = BigDecimal.ZERO;
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
							if (!floor.getTerrace() && !floor.getUpperMost() && !belowTopMostFloor) {
								if (flightPolyLines != null && flightPolyLines.size() > 0) {
									// if (flightPolyLineClosed) {
									if (flightWidths != null && flightWidths.size() > 0) {
										List<BigDecimal> widths = new ArrayList<>();
										for (List<BigDecimal> fw : flightWidths)
											widths.addAll(fw);
										BigDecimal flightPolyLine = widths.stream().reduce(BigDecimal::min).get();

										boolean valid = false;

										if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
											minFlightWidth = Util.roundOffTwoDecimal(flightPolyLine);
											BigDecimal minimumWidth = Util.roundOffTwoDecimal(BigDecimal.valueOf(0.25));

											if (minFlightWidth.compareTo(minimumWidth) >= 0) {
												valid = true;
											}
											String value = typicalFloorValues.get("typicalFloors") != null
													? (String) typicalFloorValues.get("typicalFloors")
													: " floor " + floor.getNumber();

											if (valid) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_3, value,
														String.format(WIDTH_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_WIDTH, String.valueOf(minFlightWidth),
														Result.Accepted.getResultVal(), scrutinyDetail2);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_3, value,
														String.format(WIDTH_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_WIDTH, String.valueOf(minFlightWidth),
														Result.Not_Accepted.getResultVal(), scrutinyDetail2);
											}
										}

									} else {
										errors.put("Flight PolyLine width" + flightLayerName,
												FLIGHT_WIDTH_DEFINED_DESCRIPTION + flightLayerName);
										pl.addErrors(errors);
									}

									/*
									 * (Total length of polygons in layer BLK_n_FLR_i_FIRESTAIR_k_FLIGHT) / (Number
									 * of rises - number of polygons in layer BLK_n_FLR_i_FIRESTAIR_k_FLIGHT -
									 * number of lines in layer BLK_n_FLR_i_FIRESTAIR_k_FLIGHT) shall not be more
									 * than 0.15 m
									 */

									if (flightLengths != null && flightLengths.size() > 0) {
										try {
											List<BigDecimal> lengths = new ArrayList<>();
											for (List<BigDecimal> fl : flightLengths)
												lengths.addAll(fl);
											BigDecimal totalLength = lengths.stream().reduce(BigDecimal.ZERO,
													BigDecimal::add);

											totalLength = Util.roundOffTwoDecimal(totalLength);

											if (fireStair.getFlights() != null
													&& fireStair.getFlights().get(0).getNoOfRises() != null) {
												BigDecimal rises = fireStair.getFlights().stream()
														.map(Flight::getNoOfRises)
														.reduce(BigDecimal.ZERO, BigDecimal::add);
												BigDecimal denominator = rises
														.subtract(BigDecimal.valueOf(flightLengths.size()))
														.subtract(BigDecimal
																.valueOf(fireStair.getStairMeasurements().size()));

												minTread = totalLength.divide(denominator,
														DcrConstants.DECIMALDIGITS_MEASUREMENTS,
														DcrConstants.ROUNDMODE_MEASUREMENTS);

												boolean valid = false;

												if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
													// High Rise Building
													boolean highRise = Util
															.roundOffTwoDecimal(block.getBuilding().getBuildingHeight())
															.compareTo(BigDecimal.valueOf(16)) > 0;

													if (highRise && Util.roundOffTwoDecimal(minTread).compareTo(
															Util.roundOffTwoDecimal(BigDecimal.valueOf(0.25))) >= 0) {
														scrutinyDetail3.setKey("Block_" + block.getNumber() + "_"
																+ "Fire Stair - Tread (High Rise)");
														valid = true;
													} else {
														if (Util.roundOffTwoDecimal(minTread).compareTo(Util
																.roundOffTwoDecimal(BigDecimal.valueOf(0.25))) >= 0) {
															valid = true;
														}
													}

													String value = typicalFloorValues.get("typicalFloors") != null
															? (String) typicalFloorValues.get("typicalFloors")
															: " floor " + floor.getNumber();
													if (valid) {
														setReportOutputDetailsFloorStairWise(pl, RULE_35_2_3, value,
																String.format(TREAD_DESCRIPTION, fireStair.getNumber()),
																highRise ? EXPECTED_TREAD_HIGHRISE : EXPECTED_TREAD,
																String.valueOf(minTread),
																Result.Accepted.getResultVal(), scrutinyDetail3);
													} else {
														setReportOutputDetailsFloorStairWise(pl, RULE_35_2_3, value,
																String.format(TREAD_DESCRIPTION, fireStair.getNumber()),
																highRise ? EXPECTED_TREAD_HIGHRISE : EXPECTED_TREAD,
																String.valueOf(minTread),
																Result.Not_Accepted.getResultVal(), scrutinyDetail3);
													}
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
										errors.put("Flight PolyLine length" + flightLayerName,
												FLIGHT_LENGTH_DEFINED_DESCRIPTION + flightLayerName);
										pl.addErrors(errors);

									}

									// }
								} else {
									errors.put("Flight PolyLine " + flightLayerName,
											FLIGHT_POLYLINE_NOT_DEFINED_DESCRIPTION + flightLayerName);
									pl.addErrors(errors);
								}

								if (landingPolyLines != null && landingPolyLines.size() > 0) {
									// if (flightPolyLineClosed) {
									List<List<BigDecimal>> landingWidths = fireStair.getLandings().stream().map(StairLanding::getWidths).collect(Collectors.toList());
									if (landingWidths != null && flightWidths.size() > 0) {
										List<BigDecimal> widths = new ArrayList<>();
										for (List<BigDecimal> fw : landingWidths)
											widths.addAll(fw);
										BigDecimal flightPolyLine = widths.stream().reduce(BigDecimal::min).get();

										boolean valid = false;

										if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
											minFlightWidth = Util.roundOffTwoDecimal(flightPolyLine);
											BigDecimal minimumWidth = Util.roundOffTwoDecimal(BigDecimal.valueOf(1));

											if (minFlightWidth.compareTo(minimumWidth) >= 0) {
												valid = true;
											}
											String value = typicalFloorValues.get("typicalFloors") != null
													? (String) typicalFloorValues.get("typicalFloors")
													: " floor " + floor.getNumber();

											if (valid) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_2, value,
														String.format(LANDING_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_LINE, String.valueOf(minFlightWidth),
														Result.Accepted.getResultVal(), scrutinyDetail8);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_2_2, value,
														String.format(LANDING_DESCRIPTION, fireStair.getNumber()),
														EXPECTED_LINE, String.valueOf(minFlightWidth),
														Result.Not_Accepted.getResultVal(), scrutinyDetail8);
											}
										}

									} else {
										errors.put("Flight PolyLine width" + flightLayerName,
												LANDING_WIDTH_DEFINED_DESCRIPTION + flightLayerName);
										pl.addErrors(errors);
									}
								}

								if (!floor.getTerrace() && !floor.getUpperMost() && !belowTopMostFloor) {

									List<DXFLine> lines = ((FireStairDetail) fireStair).getLines();
									if (lines != null && lines.size() > 0) {

										DXFLine line = lines.stream().min(Comparator.comparing(DXFLine::getLength))
												.get();

										boolean valid = false;

										if (line != null) {
											BigDecimal lineLength = Util
													.roundOffTwoDecimal(BigDecimal.valueOf(line.getLength()));

											if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
												BigDecimal minLineLength = Util
														.roundOffTwoDecimal(BigDecimal.valueOf(0.75));

												if (lineLength.compareTo(minLineLength) >= 0) {
													valid = true;
												}
												String value = typicalFloorValues.get("typicalFloors") != null
														? (String) typicalFloorValues.get("typicalFloors")
														: " floor " + floor.getNumber();

												if (valid)
													setReportOutputDetailsFloorStairWise(pl, RULE_35_2_2, value,
															String.format(LINE_DESCRIPTION, fireStair.getNumber()),
															EXPECTED_LINE, String.valueOf(lineLength),
															Result.Accepted.getResultVal(), scrutinyDetail6);
												else
													setReportOutputDetailsFloorStairWise(pl, RULE_35_2_2, value,
															String.format(LINE_DESCRIPTION, fireStair.getNumber()),
															EXPECTED_LINE, String.valueOf(lineLength),
															Result.Not_Accepted.getResultVal(), scrutinyDetail6);
											}

										}
									}
								}
								if (minFlightWidth.compareTo(BigDecimal.valueOf(1.2)) >= 0
										&& minTread.compareTo(BigDecimal.valueOf(0.3)) >= 0 && !floor.getTerrace()) {
									fireStair.setGeneralStair(true);
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
								setReportOutputDetails(pl, RULE_35_2_1, String.format(RULE_35_2_1, block.getNumber()),
										"", DcrConstants.OBJECTDEFINED_DESC, Result.Accepted.getResultVal(),
										scrutinyDetail4);
							} else {
								if (spiralStairCount == 0)
									setReportOutputDetails(pl, RULE_35_2_1,
											String.format(RULE_35_2_1, block.getNumber()),
											"Minimum 1 fire stair is required", DcrConstants.OBJECTNOTDEFINED_DESC,
											Result.Not_Accepted.getResultVal(), scrutinyDetail4);
							}
						}
					} else {
						if (floorSize.compareTo(BigDecimal.valueOf(2)) > 0) {
							if (fireStairCount > 0) {
								setReportOutputDetails(pl, RULE_35_2_1, String.format(RULE_35_2_1, block.getNumber()),
										"", DcrConstants.OBJECTDEFINED_DESC, Result.Accepted.getResultVal(),
										scrutinyDetail4);
							} else {
								if (spiralStairCount == 0)
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