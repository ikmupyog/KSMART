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
import static org.egov.edcr.constants.DxfFileConstants.D3;
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.PARKING_SLOT;
import static org.egov.edcr.constants.DxfFileConstants.UNITFA_HALL;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.OBJECTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.ROUNDUP;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.FloorUnit;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.ParkingDetails;
import org.egov.common.entity.edcr.ParkingHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.egov.edcr.utility.math.Ray;
import org.kabeja.dxf.helpers.Point;
import org.springframework.stereotype.Service;

@Service
public class Parking extends FeatureProcess {

	private static final String MINIMUM_REQUIRED_AREA_30_M = "Minimum required area <= 30 m²";

	private static final int THOUSAND_200 = 1200;

	private static final Logger LOGGER = LogManager.getLogger(Parking.class);

	private static final String LOADING_UNLOADING_DESC = "Minimum required Loading/Unloading area";
	private static final String MINIMUM_AREA_OF_EACH_DA_PARKING = " Minimum Area of Each DA parking";
	private static final String DA_PARKING_SLOT_AREA = "DA Parking Slot Area";
	private static final String NO_VIOLATION_OF_AREA = "No violation of area in ";
	private static final String MIN_AREA_EACH_CAR_PARKING = " Minimum Area of Each Car parking";
	private static final String PARKING_VIOLATED_MINIMUM_AREA = " parking violated minimum area.";
	private static final String PARKING = " parking ";
	private static final String NUMBERS = " Numbers ";
	private static final String MECHANICAL_PARKING = "Mechanical parking";
	private static final String MAX_ALLOWED_MECH_PARK = "Maximum allowed mechanical parking";
	private static final String TWO_WHEELER_PARK_AREA = "Two Wheeler Parking Area";
	private static final String DA_PARKING = "DA parking";
	private static final String OBJECT_NOT_DEFINED = "msg.error.mandatory.object1.not.defined";
	private static final String SUB_RULE_34_1 = "34(1)";
	private static final String SUB_RULE_34_1_DESCRIPTION = "Parking Slots Area";
	private static final String SUB_RULE_34_2 = "34(2)";
	private static final String SUB_RULE_42__5 = "42(5)";
	private static final String SUB_RULE_34_2_DESCRIPTION = "Car Parking ";
	private static final String PARKING_MIN_AREA = " 2.70 M x 5.50 M";
	private static final double PARKING_SLOT_WIDTH = 2.7;
	private static final double PARKING_SLOT_HEIGHT = 5.5;
	private static final double DA_PARKING_SLOT_WIDTH = 3.6;
	private static final double DA_PARKING_SLOT_HEIGHT = 5.5;
	private static final String DA_PARKING_MIN_AREA = " 3.60 M x 5.50 M";
	private static final String ZERO_TO_75 = "0-75";
	private static final String SEVENTY_SIX_TO_185 = "76-185";
	private static final String HUNDRED_EIGHTY_SIX_TO_300 = "186-300";
	private static final String GREATER_THAN_THREE_HUNDRED_FIFTY = ">250";
	private static final String ZERO_TO_5 = "0-5";
	private static final String FIVE_TO_12 = "5-12";
	private static final String GREATER_THAN_TWELVE = ">12";
	private static final String ZERO_TO_12 = "0-12";
	private static final String TWELVE_TO_20 = "12-20";
	private static final String GREATER_THAN_TWENTY = ">20";
	private static final String ZERO_TO_N = ">0";
	final Ray rayCasting = new Ray(new Point(-1.123456789, -1.987654321, 0d));
	public static final String NO_OF_UNITS = "No of apartment units";
	private static final String SUB_RULE_34_2_VISIT_DESCRIPTION = "Visitor Car Parking ";
	private static final String UNITFA_HALL_NOT_DEFINED = "UNITFA_HALL to calculate required parking";
	private static final String LOADING_UNLOADING_DIMENSION= "Minimum required Loading/Unloading Dimension";
	private static final String SUB_RULE_29_3_9 = "29(3) Table 9";
	private static final String SUB_RULE_29_3_10 = "29(3) Table 10";
	private static final String SUB_RULE_29_5 = "29(5)";
	private static final String SUB_RULE_29_7 = "29(7)";
	private static final String SUB_RULE_29_10 = "29(10)";
	private static final String SUB_RULE_29_11 = "29(11)";
	private static final String SUB_RULE_29_12 = "29(12)";

	@Override
	public Plan validate(Plan pl) {

		Boolean isExempted = checkIsParkingValidationRequired(pl);
		if (!isExempted) {
			HashMap<String, String> errors = new HashMap<>();
			if (pl.getParkingDetails().getCars().isEmpty()) {
				errors.put(DcrConstants.PARKINGSLOT_UNIT,
						getLocaleMessage(OBJECT_NOT_DEFINED, DcrConstants.PARKINGSLOT_UNIT));
				pl.addErrors(errors);
			}
			if (pl.getParkingDetails().getTwoWheelers().isEmpty()) {
				errors.put(DcrConstants.RULE34,
						getLocaleMessage(OBJECT_NOT_DEFINED, DcrConstants.TWO_WHEELER_PARKING_SLOT));
				pl.addErrors(errors);
			}
			validateDimensions(pl);
		}

		return pl;
	}

	public boolean checkIsParkingValidationRequired(Plan pl) {
		boolean exempted = true;

		for (Block blk : pl.getBlocks()) {

			if (pl.getPlot().getSmallPlot()) {
				if (!Util.checkExemptionConditionForSmallPlotAtBlkLevel(pl.getPlot(), blk)) {
					exempted = false;
					break;
				}

			} else {
				List<Occupancy> proposedOccupancies = blk.getBuilding().getOccupancies();

				Map<String, BigDecimal> occupancies = new HashMap<>();
				proposedOccupancies.stream().forEach(occ -> {
					if (occupancies.containsKey(occ.getTypeHelper().getType().getCode())) {
						occupancies.put(occ.getTypeHelper().getType().getCode(),
								occupancies.get(occ.getTypeHelper().getType().getCode()).add(occ.getBuiltUpArea()));
					} else {
						occupancies.put(occ.getTypeHelper().getType().getCode(), occ.getBuiltUpArea());
					}
				});

				BigDecimal floorCount = blk.getBuilding().getFloorsAboveGround();
				BigDecimal bldgHht = blk.getBuilding().getBuildingHeight();
				if (!occupancies.isEmpty()) {
					if (occupancies.size() == 1 && occupancies.containsKey(A4)
							&& (occupancies.get(A4).compareTo(BigDecimal.valueOf(200)) <= 0
							|| bldgHht.compareTo(BigDecimal.valueOf(10)) <= 0 || floorCount.compareTo(BigDecimal.valueOf(3)) <= 0)) {
						exempted = true;
					} else if (occupancies.size() <= 2 && floorCount != null && floorCount.intValue() <= 3) {
						if ((occupancies.size() == 2 && (occupancies.containsKey(A1) && occupancies.containsKey(A5)))
								|| (occupancies.size() == 1
										&& (occupancies.containsKey(A1) || occupancies.containsKey(A5)))) {
							exempted = true;
						} else if (occupancies.size() == 2
								&& (occupancies.containsKey(A1) || occupancies.containsKey(A5))
								&& occupancies.containsKey(F)) {
							exempted = true;
						} else {
							exempted = false;
							break;
						}
					} else {
						exempted = false;
						break;
					}
				}
			}
		}

		return exempted;
	}

	@Override
	public Plan process(Plan pl) {
		validate(pl);
		/*
		 * All blocks is small plot in entire plot and floors above ground less than or
		 * equal to three and occupancy type of entire block is either Residential or
		 * Commercial then parking process not require.
		 */
		Boolean isExempted = checkIsParkingValidationRequired(pl);
		if (!isExempted) {
			scrutinyDetail = new ScrutinyDetail();
			scrutinyDetail.setKey("Common_Parking");
			scrutinyDetail.addColumnHeading(1, RULE_NO);
			scrutinyDetail.addColumnHeading(2, DESCRIPTION);
			scrutinyDetail.addColumnHeading(3, REQUIRED);
			scrutinyDetail.addColumnHeading(4, PROVIDED);
			scrutinyDetail.addColumnHeading(5, STATUS);
			processParking(pl);
		}
		return pl;
	}

	private void validateDimensions(Plan pl) {
		ParkingDetails parkDtls = pl.getParkingDetails();
		if (!parkDtls.getCars().isEmpty()) {
			int count = 0;
			for (Measurement m : parkDtls.getCars())
				if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0)
					count++;
			if (count > 0)
				pl.addError(PARKING_SLOT, count + " number of Parking slot polygon not having only 4 points.");
		}

		if (!parkDtls.getDisabledPersons().isEmpty()) {
			int count = 0;
			for (Measurement m : parkDtls.getDisabledPersons())
				if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0)
					count++;
			if (count > 0)
				pl.addError(DA_PARKING, count + " number of DA Parking slot polygon not having only 4 points.");
		}
	}

	public void processParking(Plan pl) {
		Map<String, Integer> unitsCountMap = new ConcurrentHashMap<>();

		Map<String, BigDecimal> unitsAreaMap = new ConcurrentHashMap<>();
		ParkingHelper result = new ParkingHelper();
		BigDecimal noOfSeats = BigDecimal.ZERO;

		// use proposed occupancies excluding existing single family.
		// INCLUDE EXISTING AND SINGLEFAMILY ALSO
		String rule = SUB_RULE_29_3_10;
		for (Occupancy occupancy : pl.getOccupancies()) {
			switch (occupancy.getTypeHelper().getType().getCode()) {
			case A1:
			case A4:
				unitsCountMap.put(ZERO_TO_75, 0);
				unitsCountMap.put(SEVENTY_SIX_TO_185, 0);
				unitsCountMap.put(HUNDRED_EIGHTY_SIX_TO_300, 0);
				unitsCountMap.put(GREATER_THAN_THREE_HUNDRED_FIFTY, 0);
				for (Block b : pl.getBlocks()) {
					for (Floor f : b.getBuilding().getFloors()) {
						for (FloorUnit unit : f.getUnits()) {
							/*
							 * Even though if building type is single family (A1) and no of floors more than
							 * 3 excluding stair room then parking validation is required.
							 **/
							if (occupancy.getTypeHelper().getType().getCode()
									.equals(unit.getOccupancy().getTypeHelper().getType().getCode())) {
								if (unit.getArea().doubleValue() <= 75d) {
									unitsCountMap.put(ZERO_TO_75, unitsCountMap.get(ZERO_TO_75) + 1);
								} else if (unit.getArea().doubleValue() < 150) {
									unitsCountMap.put(SEVENTY_SIX_TO_185, unitsCountMap.get(SEVENTY_SIX_TO_185) + 1);
								} else if (unit.getArea().doubleValue() < 250d) {
									unitsCountMap.put(HUNDRED_EIGHTY_SIX_TO_300,
											unitsCountMap.get(HUNDRED_EIGHTY_SIX_TO_300) + 1);
								} else {
									unitsCountMap.put(GREATER_THAN_THREE_HUNDRED_FIFTY,
											unitsCountMap.get(GREATER_THAN_THREE_HUNDRED_FIFTY) + 1);
								}
							}
						}
					}
				}

				result.a1TotalParking = Math
						.ceil(unitsCountMap.get(ZERO_TO_75) / 3.0 + unitsCountMap.get(SEVENTY_SIX_TO_185) * 1.0
								+ unitsCountMap.get(HUNDRED_EIGHTY_SIX_TO_300) * 1.5
								+ unitsCountMap.get(GREATER_THAN_THREE_HUNDRED_FIFTY) * 2.0);
				result.carParkingForDACal += result.a1TotalParking;
				result.visitorParking = Math.ceil(result.a1TotalParking * 15 / 100);
				result.totalRequiredCarParking += result.a1TotalParking + result.visitorParking;
				rule = SUB_RULE_29_3_9;
				break;
			case A2:
			case A3:
				BigDecimal noOfCarParkingForA2 = BigDecimal.ZERO;
				if (occupancy != null && occupancy.getFloorArea() != null
						&& occupancy.getFloorArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) <= 0)
					noOfCarParkingForA2 = occupancy.getFloorArea().divide(BigDecimal.valueOf(90),
							DECIMALDIGITS_MEASUREMENTS, ROUNDUP);
				else if (occupancy != null && occupancy.getFloorArea() != null
						&& occupancy.getFloorArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) > 0)
					noOfCarParkingForA2 = BigDecimal.valueOf(THOUSAND_200)
							.divide(BigDecimal.valueOf(90), DECIMALDIGITS_MEASUREMENTS, ROUNDUP)
							.add(occupancy.getFloorArea().subtract(BigDecimal.valueOf(THOUSAND_200))
									.divide(BigDecimal.valueOf(60), DECIMALDIGITS_MEASUREMENTS, ROUNDUP));
				double e = noOfCarParkingForA2 == null ? 0 : noOfCarParkingForA2.doubleValue();
				result.totalRequiredCarParking += e;
				result.carParkingForDACal += e;
				break;
			case B1:
			case B2:
			case B3:
				BigDecimal builtupAreaForB1 = getTotalBuilltUpAreaByOccupancy(pl, B1);
				if (builtupAreaForB1 != null) {
					double b1 = builtupAreaForB1.divide(BigDecimal.valueOf(300), DECIMALDIGITS_MEASUREMENTS, ROUNDUP)
							.doubleValue();
					result.totalRequiredCarParking += b1;
					result.carParkingForDACal += b1;
				}
				BigDecimal builtupAreaForB2 = getTotalBuilltUpAreaByOccupancy(pl, B2);
				if (builtupAreaForB2 != null) {
					double b2 = builtupAreaForB2.divide(BigDecimal.valueOf(300), DECIMALDIGITS_MEASUREMENTS, ROUNDUP)
							.doubleValue();
					result.totalRequiredCarParking += b2;
					result.carParkingForDACal += b2;
				}
				BigDecimal builtupAreaForB3 = getTotalBuilltUpAreaByOccupancy(pl, B3);
				if (builtupAreaForB3 != null) {
					double b3 = builtupAreaForB3.divide(BigDecimal.valueOf(120), DECIMALDIGITS_MEASUREMENTS, ROUNDUP)
							.doubleValue();
					result.totalRequiredCarParking += b3;
					result.carParkingForDACal += b3;
				}
				break;
			case D:
			case D1:
			case D2:
				BigDecimal builtupAreaForD = occupancy.getFloorArea();
				if (builtupAreaForD != null) {
					double b1 = builtupAreaForD.divide(BigDecimal.valueOf(20), DECIMALDIGITS_MEASUREMENTS, ROUNDUP)
							.doubleValue();
					result.totalRequiredCarParking += b1;
					result.carParkingForDACal += b1;
				}
			case D3:
				BigDecimal hallArea = BigDecimal.ZERO;
				BigDecimal balconyArea = BigDecimal.ZERO;
				BigDecimal diningSpace = BigDecimal.ZERO;
				for (Block b : pl.getBlocks()) {
					for (Measurement measurement : b.getHallAreas())
						hallArea = hallArea.add(measurement.getArea());
					for (Measurement measurement : b.getBalconyAreas())
						balconyArea = balconyArea.add(measurement.getArea());
					for (Measurement measurement : b.getDiningSpaces())
						diningSpace = diningSpace.add(measurement.getArea());
				}

				BigDecimal totalArea = hallArea.add(balconyArea);
				if (totalArea.doubleValue() > 0) {
					if (totalArea.compareTo(diningSpace) > 0) {
						BigDecimal hall = totalArea.divide((BigDecimal.valueOf(20)), DECIMALDIGITS_MEASUREMENTS,
								ROUNDUP);
						result.totalRequiredCarParking += hall.doubleValue();
						result.carParkingForDACal += hall.doubleValue();
					} else {
						BigDecimal dining = diningSpace.divide((BigDecimal.valueOf(1)), DECIMALDIGITS_MEASUREMENTS,
								ROUNDUP);
						result.totalRequiredCarParking += dining.doubleValue();
						result.carParkingForDACal += dining.doubleValue();
					}
				} else {
					pl.addError(UNITFA_HALL, getLocaleMessage(OBJECT_NOT_DEFINED, UNITFA_HALL_NOT_DEFINED));
				}
				break;
			case F:
				BigDecimal noOfCarParkingForF = BigDecimal.ZERO;
				if (occupancy != null && occupancy.getBuiltUpArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) <= 0
						|| pl.getPlot().getPlotBndryArea().doubleValue() <= 125)
					result.totalRequiredCarParking = 0d;
				else {
					if (occupancy != null && occupancy.getFloorArea() != null
							&& occupancy.getFloorArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) <= 0)
						noOfCarParkingForF = occupancy.getFloorArea().divide(BigDecimal.valueOf(90), DECIMALDIGITS_MEASUREMENTS,
								ROUNDUP);
					else if (occupancy != null && occupancy.getFloorArea() != null
							&& occupancy.getFloorArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) > 0)
						noOfCarParkingForF = BigDecimal.valueOf(THOUSAND_200)
								.divide(BigDecimal.valueOf(90), DECIMALDIGITS_MEASUREMENTS, ROUNDUP)
								.add(occupancy.getFloorArea().subtract(BigDecimal.valueOf(THOUSAND_200))
										.divide(BigDecimal.valueOf(60), 0, ROUNDUP));
					double f = noOfCarParkingForF == null ? 0 : noOfCarParkingForF.doubleValue();
					result.totalRequiredCarParking += f;
					result.carParkingForDACal += f;
				}
				break;
			case F1:
			case F2:
			case F3:
				BigDecimal noOfCarParking = BigDecimal.ZERO;
				if (occupancy != null && occupancy.getFloorArea() != null
						&& occupancy.getFloorArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) <= 0)
					noOfCarParking = occupancy.getFloorArea().divide(BigDecimal.valueOf(90), DECIMALDIGITS_MEASUREMENTS,
							ROUNDUP);
				else if (occupancy != null && occupancy.getFloorArea() != null
						&& occupancy.getFloorArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) > 0)
					noOfCarParking = BigDecimal.valueOf(THOUSAND_200)
							.divide(BigDecimal.valueOf(90), DECIMALDIGITS_MEASUREMENTS, ROUNDUP)
							.add(occupancy.getFloorArea().subtract(BigDecimal.valueOf(THOUSAND_200))
									.divide(BigDecimal.valueOf(60), 0, ROUNDUP));
				double f = noOfCarParking == null ? 0 : noOfCarParking.doubleValue();
				result.totalRequiredCarParking += f;
				result.carParkingForDACal += f;
				break;
			case E:
				BigDecimal noOfCarParking1 = BigDecimal.ZERO;
				if (occupancy != null && occupancy.getFloorArea() != null
						&& occupancy.getFloorArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) <= 0)
					noOfCarParking1 = occupancy.getFloorArea().divide(BigDecimal.valueOf(90),
							DECIMALDIGITS_MEASUREMENTS, ROUNDUP);
				else if (occupancy != null && occupancy.getFloorArea() != null
						&& occupancy.getFloorArea().compareTo(BigDecimal.valueOf(THOUSAND_200)) > 0)
					noOfCarParking1 = BigDecimal.valueOf(THOUSAND_200)
							.divide(BigDecimal.valueOf(90), DECIMALDIGITS_MEASUREMENTS, ROUNDUP)
							.add(occupancy.getFloorArea().subtract(BigDecimal.valueOf(THOUSAND_200))
									.divide(BigDecimal.valueOf(60), DECIMALDIGITS_MEASUREMENTS, ROUNDUP));
				double office = noOfCarParking1 == null ? 0 : noOfCarParking1.doubleValue();
				result.totalRequiredCarParking += office;
				result.carParkingForDACal += office;
				break;
			}
		}

		double medical = processParkingForMedical(pl);
		result.totalRequiredCarParking += medical;
		result.carParkingForDACal += medical;
		result.totalRequiredCarParking += processParkingForIndustrialAndStorage(pl);
		result.totalRequiredCarParking = Math.ceil(result.totalRequiredCarParking);
		result.carParkingForDACal = Math.ceil(result.carParkingForDACal);
		pl.setParkingRequired(result.totalRequiredCarParking);
		if (result.totalRequiredCarParking > 0) {
			validateDAParking(pl, result);
			checkDimensionForCarParking(pl, result);
			Integer providedMechParking = 0;
			if (!pl.getParkingDetails().getMechParking().isEmpty())
				providedMechParking = pl.getPlanInformation().getNoOfMechanicalParking();
			Integer totalProvidedParking = pl.getParkingDetails().getValidCarParkingSlots()
					+ pl.getParkingDetails().getValidDAParkingSlots() + providedMechParking;
			if (result.totalRequiredCarParking > totalProvidedParking) {
				setReportOutputDetails(pl, rule, SUB_RULE_34_2_DESCRIPTION,
						result.totalRequiredCarParking.intValue() + NUMBERS,
						String.valueOf(totalProvidedParking) + NUMBERS, Result.Not_Accepted.getResultVal());
			} else {
				setReportOutputDetails(pl, rule, SUB_RULE_34_2_DESCRIPTION,
						result.totalRequiredCarParking.intValue() + NUMBERS,
						String.valueOf(totalProvidedParking) + NUMBERS, Result.Accepted.getResultVal());
			}
			if (result.visitorParking > 0) {
				setReportOutputDetails(pl, rule, SUB_RULE_34_2_VISIT_DESCRIPTION,
						result.visitorParking.intValue() + NUMBERS, "Included", Result.Accepted.getResultVal());
			}
			processTwoWheelerParking(pl, result);
			processMechanicalParking(pl, result);
		}
		if(!pl.getParkingDetails().getEvChargers().isEmpty())
			setReportOutputDetails(pl, SUB_RULE_29_12, "Charging Point", "", OBJECTDEFINED_DESC,
					Result.Accepted.getResultVal());
			
		processUnits(pl);
		if (result.totalRequiredCarParking > 0 && (pl.getParkingDetails().getEvChargers() == null
				|| pl.getParkingDetails().getEvChargers().isEmpty())) {
			HashMap<String, String> errors = new HashMap<>();
			errors.put(DcrConstants.EV_CHARGE_SLOT, getLocaleMessage(OBJECT_NOT_DEFINED, DcrConstants.EV_CHARGE_SLOT));
			pl.addErrors(errors);
		}
		LOGGER.info("******************Require no of Car Parking***************" + result.totalRequiredCarParking);
	}

	private void processUnits(Plan pl) {
		int occupancyA4UnitsCount = 0;
		int occupancyA2UnitsCount = 0;
		int noOfRoomsWithAttchdBthrms = 0;
		int noOfRoomsWithoutAttchdBthrms = 0;
		int noOfDineRooms = 0;
		HashMap<String, String> errors = new HashMap<>();

		for (Block block : pl.getBlocks()) {
			if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
				for (Floor floor : block.getBuilding().getFloors()) {
					if (floor.getUnits() != null && !floor.getUnits().isEmpty()) {
						for (FloorUnit unit : floor.getUnits()) {
							if (unit.getOccupancy().getTypeHelper().getType().getCode().equals(A4)) {
								occupancyA4UnitsCount++;
							}
							if (unit.getOccupancy().getTypeHelper().getType().getCode().equals(A2)
									|| unit.getOccupancy().getTypeHelper().getType().getCode().equals(F3)) {
								occupancyA2UnitsCount++;
								if (unit.getOccupancy().getWithAttachedBath()) {
									noOfRoomsWithAttchdBthrms++;
								}
								if (unit.getOccupancy().getWithOutAttachedBath()) {
									noOfRoomsWithoutAttchdBthrms++;
								}
								if (unit.getOccupancy().getWithDinningSpace()) {
									noOfDineRooms++;
								}

							}
						}
					}
				}
			}
		}
		List<String> occupancyCodes = pl.getVirtualBuilding().getOccupancyTypes().stream()
				.map(occ -> occ.getType().getCode()).collect(Collectors.toList());

		if (occupancyCodes.contains(A4)) {
			if (occupancyA4UnitsCount == 0) {
				setReportOutputDetails(pl, SUB_RULE_34_2, "UNITFA is not defined", String.valueOf(1),
						String.valueOf(occupancyA4UnitsCount), Result.Not_Accepted.getResultVal());
			}

			if (occupancyA4UnitsCount > 0) {
				setReportOutputDetails(pl, SUB_RULE_34_2, NO_OF_UNITS, String.valueOf("-"),
						String.valueOf(occupancyA4UnitsCount), Result.Accepted.getResultVal());
			}

		}

		if (occupancyCodes.contains(A2) || occupancyCodes.contains(F3)) {

			if (occupancyA2UnitsCount == 0)
				setReportOutputDetails(pl, SUB_RULE_34_2, "UNITFA is not defined", String.valueOf(1),
						String.valueOf(occupancyA2UnitsCount), Result.Not_Accepted.getResultVal());

			if (occupancyA2UnitsCount > 0 && noOfRoomsWithoutAttchdBthrms > 0)
				setReportOutputDetails(pl, SUB_RULE_34_2, "No of rooms without attached bathrooms", String.valueOf("-"),
						String.valueOf(noOfRoomsWithoutAttchdBthrms), Result.Accepted.getResultVal());

			if (occupancyA2UnitsCount > 0 && noOfRoomsWithAttchdBthrms > 0)
				setReportOutputDetails(pl, SUB_RULE_34_2, "No of rooms with attached bathrooms", String.valueOf("-"),
						String.valueOf(noOfRoomsWithAttchdBthrms), Result.Accepted.getResultVal());

			if (noOfDineRooms > 0 && (pl.getPlanInformation().getNoOfSeats() == null
					|| pl.getPlanInformation().getNoOfSeats() == 0)) {
				errors.put("SEATS_SP_RESI", "SEATS_SP_RESI not defined in PLAN_INFO");
				pl.addErrors(errors);
			}
		}

	}

	private double processParkingForIndustrialAndStorage(Plan pl) {
		List<Occupancy> occupancyList = new ArrayList<>();
		Occupancy f = pl.getOccupancies().stream()
				.filter(occupancy -> F3.equals(occupancy.getTypeHelper().getType().getCode())
						|| F.equals(occupancy.getTypeHelper().getType().getCode()))
				.findAny().orElse(null);
		Occupancy g1 = pl.getOccupancies().stream()
				.filter(occupancy -> G1.equals(occupancy.getTypeHelper().getType().getCode())).findAny().orElse(null);
		Occupancy g2 = pl.getOccupancies().stream()
				.filter(occupancy -> G2.equals(occupancy.getTypeHelper().getType().getCode())).findAny().orElse(null);
		Occupancy h = pl.getOccupancies().stream()
				.filter(occupancy -> H.equals(occupancy.getTypeHelper().getType().getCode())).findAny().orElse(null);

		if (f != null)
			occupancyList.add(f);

		BigDecimal noOfCarParking = BigDecimal.ZERO;
		if (g1 != null && g1.getFloorArea() != null) {
			occupancyList.add(g1);
			noOfCarParking = g1.getFloorArea().divide(BigDecimal.valueOf(240), 0, RoundingMode.UP);
		}
		if (g2 != null && g2.getFloorArea() != null) {
			noOfCarParking = g2.getFloorArea().divide(BigDecimal.valueOf(240), 0, RoundingMode.UP);
			occupancyList.add(g2);
		}
		if (h != null && h.getFloorArea() != null) {
			occupancyList.add(h);
			noOfCarParking = h.getFloorArea().divide(BigDecimal.valueOf(240), 0, RoundingMode.UP);
		}
		processLoadingAndUnloading(pl, occupancyList);
		return noOfCarParking == null ? 0 : noOfCarParking.doubleValue();
	}

	private double processParkingForMedical(Plan planDetail) {
		Occupancy c = planDetail.getOccupancies().stream()
				.filter(occupancy -> C.equals(occupancy.getTypeHelper().getType().getCode())).findAny().orElse(null);
		Occupancy c1 = planDetail.getOccupancies().stream()
				.filter(occupancy -> C1.equals(occupancy.getTypeHelper().getType().getCode())).findAny().orElse(null);
		Occupancy c2 = planDetail.getOccupancies().stream()
				.filter(occupancy -> C2.equals(occupancy.getTypeHelper().getType().getCode())).findAny().orElse(null);
		Occupancy c3 = planDetail.getOccupancies().stream()
				.filter(occupancy -> C3.equals(occupancy.getTypeHelper().getType().getCode())).findAny().orElse(null);
		BigDecimal totalCarpetArea = BigDecimal.ZERO;
		if (c != null && c.getFloorArea() != null)
			totalCarpetArea = totalCarpetArea.add(c.getFloorArea());
		if (c1 != null && c1.getFloorArea() != null)
			totalCarpetArea = totalCarpetArea.add(c1.getFloorArea());
		if (c2 != null && c2.getFloorArea() != null)
			totalCarpetArea = totalCarpetArea.add(c2.getFloorArea());
		if (c3 != null && c3.getFloorArea() != null)
			totalCarpetArea = totalCarpetArea.add(c3.getFloorArea());
		return totalCarpetArea == null ? 0
				: totalCarpetArea.divide(BigDecimal.valueOf(75), DECIMALDIGITS_MEASUREMENTS, ROUNDUP).doubleValue();
	}

	private void processLoadingAndUnloading(Plan pl, List<Occupancy> occupancies) {
		double providedArea = 0;
		int valid = 0;
		int count = 0;
		int validDimension = 0;
		for (Measurement measurement : pl.getParkingDetails().getLoadUnload()) {
			count++;
			if(measurement.getArea().doubleValue() > 30)
				valid++;
			if(measurement.getMinimumSide().doubleValue() >= 2.7)
				validDimension++;
			providedArea = providedArea + measurement.getArea().doubleValue();
		}
		
		if (pl.getParkingDetails().getLoadUnload().isEmpty()) {
			HashMap<String, String> errors = new HashMap<>();
			errors.put(DcrConstants.RULE34,
					getLocaleMessage(DcrConstants.OBJECTNOTDEFINED, DcrConstants.LOAD_UNLOAD_AREA));
			pl.addErrors(errors);
		} else if (valid < count) {
			setReportOutputDetails(pl, SUB_RULE_29_7, LOADING_UNLOADING_DESC, MINIMUM_REQUIRED_AREA_30_M,
					"Out of " + count + PARKING + (count-valid) + PARKING_VIOLATED_MINIMUM_AREA, Result.Not_Accepted.getResultVal());
		} else {
			setReportOutputDetails(pl, SUB_RULE_29_7, LOADING_UNLOADING_DESC, MINIMUM_REQUIRED_AREA_30_M,
					"No violation of area in " + count + PARKING, Result.Accepted.getResultVal());
		}
		
		if(count > 0) {
			if(validDimension == count)
				setReportOutputDetails(pl, SUB_RULE_29_7, LOADING_UNLOADING_DIMENSION, ">=2.70m",
						"No violation of area in " + count + PARKING, Result.Accepted.getResultVal());
			else
				setReportOutputDetails(pl, SUB_RULE_29_7, LOADING_UNLOADING_DIMENSION, ">=2.70m",
						"Out of " + count + PARKING + (count-validDimension) + PARKING_VIOLATED_MINIMUM_AREA, Result.Not_Accepted.getResultVal());
		}
		
		BigDecimal totalBuiltuptArea = BigDecimal.ZERO;
		for (Occupancy occupancy : occupancies) {
			totalBuiltuptArea = totalBuiltuptArea
					.add(occupancy.getFloorArea() == null ? BigDecimal.ZERO : occupancy.getFloorArea());
		}
		if (count > 0) {
			double requiredArea = Math.ceil(((totalBuiltuptArea.doubleValue() - 700) / 1000) * 30);
			HashMap<String, String> errors = new HashMap<>();
			if (pl.getParkingDetails().getLoadUnload().isEmpty()) {
				errors.put(DcrConstants.RULE34,
						getLocaleMessage(DcrConstants.OBJECTNOTDEFINED, DcrConstants.LOAD_UNLOAD_AREA));
				pl.addErrors(errors);
			} else if (providedArea < requiredArea) {
				setReportOutputDetails(pl, SUB_RULE_29_7, LOADING_UNLOADING_DESC, String.valueOf(requiredArea),
						String.valueOf(providedArea), Result.Not_Accepted.getResultVal());
			} else {
				setReportOutputDetails(pl, SUB_RULE_29_7, LOADING_UNLOADING_DESC, String.valueOf(requiredArea),
						String.valueOf(providedArea), Result.Accepted.getResultVal());
			}
			
		}
	}

	private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected, String actual,
			String status) {
		Map<String, String> details = new HashMap<>();
		details.put(RULE_NO, ruleNo);
		details.put(DESCRIPTION, ruleDesc);
		details.put(REQUIRED, expected);
		details.put(PROVIDED, actual);
		details.put(STATUS, status);
		scrutinyDetail.getDetail().add(details);
		pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
	}

	private void validateDAParking(Plan pl, ParkingHelper result) {
		result.daParking = Math.ceil(result.carParkingForDACal * 3 / 100);
		checkDimensionForDAParking(pl, result);
		HashMap<String, String> errors = new HashMap<>();
		Boolean isValid = true;
		if (pl.getParkingDetails().getDisabledPersons().isEmpty()) {
			isValid = false;
			errors.put(SUB_RULE_42__5, getLocaleMessage(DcrConstants.OBJECTNOTDEFINED, DcrConstants.DAPARKING_UNIT));
			pl.addErrors(errors);
		} else if (pl.getParkingDetails().getDistFromDAToMainEntrance() == null
				|| pl.getParkingDetails().getDistFromDAToMainEntrance().compareTo(BigDecimal.ZERO) == 0) {
			isValid = false;
			errors.put(SUB_RULE_42__5,
					getLocaleMessage(DcrConstants.OBJECTNOTDEFINED, DcrConstants.DIST_FROM_DA_TO_ENTRANCE));
			pl.addErrors(errors);
		} else if (pl.getParkingDetails().getDistFromDAToMainEntrance().compareTo(BigDecimal.valueOf(30)) > 0) {
			isValid = false;
			setReportOutputDetails(pl, SUB_RULE_42__5, DcrConstants.DIST_FROM_DA_TO_ENTRANCE,
					"Should be less than 30" + DcrConstants.IN_METER,
					pl.getParkingDetails().getDistFromDAToMainEntrance() + DcrConstants.IN_METER,
					Result.Not_Accepted.getResultVal());
		} else if (pl.getParkingDetails().getValidDAParkingSlots() < result.daParking) {
			setReportOutputDetails(pl, SUB_RULE_42__5, DA_PARKING, result.daParking.intValue() + NUMBERS,
					pl.getParkingDetails().getValidDAParkingSlots() + NUMBERS, Result.Not_Accepted.getResultVal());
		} else {
			setReportOutputDetails(pl, SUB_RULE_42__5, DA_PARKING, result.daParking.intValue() + NUMBERS,
					pl.getParkingDetails().getValidDAParkingSlots() + NUMBERS, Result.Accepted.getResultVal());
		}
		if (isValid) {
			setReportOutputDetails(pl, SUB_RULE_42__5, DcrConstants.DIST_FROM_DA_TO_ENTRANCE,
					"Less than 30" + DcrConstants.IN_METER,
					pl.getParkingDetails().getDistFromDAToMainEntrance() + DcrConstants.IN_METER,
					Result.Accepted.getResultVal());
		}
	}

	private void processTwoWheelerParking(Plan pl, ParkingHelper result) {
		result.twoWheelerParking = BigDecimal.valueOf(0.25 * result.totalRequiredCarParking * 2.70 * 5.50)
				.setScale(4, ROUNDUP).doubleValue();
		double providedArea = 0;
		for (Measurement measurement : pl.getParkingDetails().getTwoWheelers()) {
			providedArea = providedArea + measurement.getArea().doubleValue();
		}
		if (providedArea < result.twoWheelerParking) {
			setReportOutputDetails(pl, SUB_RULE_29_5, TWO_WHEELER_PARK_AREA,
					result.twoWheelerParking + " " + DcrConstants.SQMTRS,
					BigDecimal.valueOf(providedArea).setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDUP) + " "
							+ DcrConstants.SQMTRS,
					Result.Not_Accepted.getResultVal());
		} else {
			setReportOutputDetails(pl, SUB_RULE_29_5	, TWO_WHEELER_PARK_AREA,
					result.twoWheelerParking + " " + DcrConstants.SQMTRS,
					BigDecimal.valueOf(providedArea).setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDUP) + " "
							+ DcrConstants.SQMTRS,
					Result.Accepted.getResultVal());
		}
	}

	private double processMechanicalParking(Plan planDetail, ParkingHelper result) {
		Integer noOfMechParkingFromPlInfo = planDetail.getPlanInformation().getNoOfMechanicalParking();
		Integer providedSlots = planDetail.getParkingDetails().getMechParking().size();
		double maxAllowedMechPark = BigDecimal.valueOf(result.totalRequiredCarParking / 2).setScale(0, RoundingMode.UP)
				.intValue();
		if (noOfMechParkingFromPlInfo > 0) {
			if (noOfMechParkingFromPlInfo > 0 && providedSlots == 0) {
				setReportOutputDetails(planDetail, SUB_RULE_29_10, MECHANICAL_PARKING, 1 + NUMBERS,
						providedSlots + NUMBERS, Result.Not_Accepted.getResultVal());
			} else if (noOfMechParkingFromPlInfo > 0 && providedSlots > 0
					&& noOfMechParkingFromPlInfo > maxAllowedMechPark) {
				setReportOutputDetails(planDetail, SUB_RULE_29_10, MAX_ALLOWED_MECH_PARK, maxAllowedMechPark + NUMBERS,
						noOfMechParkingFromPlInfo + NUMBERS, Result.Not_Accepted.getResultVal());
			} else if (noOfMechParkingFromPlInfo > 0 && providedSlots > 0) {
				setReportOutputDetails(planDetail, SUB_RULE_29_10, MECHANICAL_PARKING, "",
						noOfMechParkingFromPlInfo + NUMBERS, Result.Accepted.getResultVal());
			}
		}
		return 0;
	}

	/*
	 * private void buildResultForYardValidation(Plan Plan, BigDecimal
	 * parkSlotAreaInFrontYard, BigDecimal maxAllowedArea, String type) {
	 * Plan.reportOutput .add(buildRuleOutputWithSubRule(DcrConstants.RULE34,
	 * SUB_RULE_34_1,
	 * "Parking space should not exceed 50% of the area of mandatory " + type,
	 * "Parking space should not exceed 50% of the area of mandatory " + type,
	 * "Maximum allowed area for parking in " + type +" " + maxAllowedArea +
	 * DcrConstants.SQMTRS, "Parking provided in more than the allowed area " +
	 * parkSlotAreaInFrontYard + DcrConstants.SQMTRS, Result.Not_Accepted, null)); }
	 * private BigDecimal validateParkingSlotsAreWithInYard(Plan Plan, Polygon
	 * yardPolygon) { BigDecimal area = BigDecimal.ZERO; for (Measurement
	 * parkingSlot : Plan.getParkingDetails().getCars()) { Iterator parkSlotIterator
	 * = parkingSlot.getPolyLine().getVertexIterator(); while
	 * (parkSlotIterator.hasNext()) { DXFVertex dxfVertex = (DXFVertex)
	 * parkSlotIterator.next(); Point point = dxfVertex.getPoint(); if
	 * (rayCasting.contains(point, yardPolygon)) { area =
	 * area.add(parkingSlot.getArea()); } } } return area; }
	 */

	private void checkDimensionForCarParking(Plan pl, ParkingHelper helper) {

		/*
		 * for (Block block : planDetail.getBlocks()) { for (SetBack setBack :
		 * block.getSetBacks()) { if (setBack.getFrontYard() != null &&
		 * setBack.getFrontYard().getPresentInDxf()) { Polygon frontYardPolygon =
		 * Util.getPolygon(setBack.getFrontYard().getPolyLine()); BigDecimal
		 * parkSlotAreaInFrontYard = validateParkingSlotsAreWithInYard(planDetail,
		 * frontYardPolygon); BigDecimal maxAllowedArea =
		 * setBack.getFrontYard().getArea().divide(BigDecimal.valueOf(2),
		 * DcrConstants.DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS); if
		 * (parkSlotAreaInFrontYard.compareTo(maxAllowedArea) > 0) {
		 * buildResultForYardValidation(planDetail, parkSlotAreaInFrontYard,
		 * maxAllowedArea, "front yard space"); } } if (setBack.getRearYard() != null &&
		 * setBack.getRearYard().getPresentInDxf()) { Polygon rearYardPolygon =
		 * Util.getPolygon(setBack.getRearYard().getPolyLine()); BigDecimal
		 * parkSlotAreaInRearYard = validateParkingSlotsAreWithInYard(planDetail,
		 * rearYardPolygon); BigDecimal maxAllowedArea =
		 * setBack.getRearYard().getArea().divide(BigDecimal.valueOf(2),
		 * DcrConstants.DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS); if
		 * (parkSlotAreaInRearYard.compareTo(maxAllowedArea) > 0) {
		 * buildResultForYardValidation(planDetail, parkSlotAreaInRearYard,
		 * maxAllowedArea, "rear yard space"); } } if (setBack.getSideYard1() != null &&
		 * setBack.getSideYard1().getPresentInDxf()) { Polygon sideYard1Polygon =
		 * Util.getPolygon(setBack.getSideYard1().getPolyLine()); BigDecimal
		 * parkSlotAreaInSideYard1 = validateParkingSlotsAreWithInYard(planDetail,
		 * sideYard1Polygon); BigDecimal maxAllowedArea =
		 * setBack.getSideYard1().getArea().divide(BigDecimal.valueOf(2),
		 * DcrConstants.DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS); if
		 * (parkSlotAreaInSideYard1.compareTo(maxAllowedArea) > 0) {
		 * buildResultForYardValidation(planDetail, parkSlotAreaInSideYard1,
		 * maxAllowedArea, "side yard1 space"); } } if (setBack.getSideYard2() != null
		 * && setBack.getSideYard2().getPresentInDxf()) { Polygon sideYard2Polygon =
		 * Util.getPolygon(setBack.getSideYard2().getPolyLine()); BigDecimal
		 * parkSlotAreaInFrontYard = validateParkingSlotsAreWithInYard(planDetail,
		 * sideYard2Polygon); BigDecimal maxAllowedArea =
		 * setBack.getSideYard2().getArea().divide(BigDecimal.valueOf(2),
		 * DcrConstants.DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS); if
		 * (parkSlotAreaInFrontYard.compareTo(maxAllowedArea) > 0) {
		 * buildResultForYardValidation(planDetail, parkSlotAreaInFrontYard,
		 * maxAllowedArea, "side yard2 space"); } } } }
		 */

		int parkingCount = pl.getParkingDetails().getCars().size();
		int failedCount = 0;
		int success = 0;

		for (Measurement slot : pl.getParkingDetails().getCars()) {
			if (slot.getHeight().setScale(2, RoundingMode.UP).doubleValue() >= PARKING_SLOT_HEIGHT
					&& slot.getWidth().setScale(2, RoundingMode.UP).doubleValue() >= PARKING_SLOT_WIDTH)
				success++;
			else
				failedCount++;
		}
		pl.getParkingDetails().setValidCarParkingSlots(parkingCount - failedCount);
		if (parkingCount > 0)
			if (failedCount > 0) {
				if (helper.totalRequiredCarParking.intValue() == pl.getParkingDetails().getValidCarParkingSlots()) {
					setReportOutputDetails(pl, SUB_RULE_34_1, SUB_RULE_34_1_DESCRIPTION,
							PARKING_MIN_AREA + MIN_AREA_EACH_CAR_PARKING,
							"Out of " + parkingCount + PARKING + failedCount + PARKING_VIOLATED_MINIMUM_AREA,
							Result.Accepted.getResultVal());
				} else {
					setReportOutputDetails(pl, SUB_RULE_34_1, SUB_RULE_34_1_DESCRIPTION,
							PARKING_MIN_AREA + MIN_AREA_EACH_CAR_PARKING,
							"Out of " + parkingCount + PARKING + failedCount + PARKING_VIOLATED_MINIMUM_AREA,
							Result.Not_Accepted.getResultVal());
				}
			} else {
				setReportOutputDetails(pl, SUB_RULE_34_1, SUB_RULE_34_1_DESCRIPTION,
						PARKING_MIN_AREA + MIN_AREA_EACH_CAR_PARKING, NO_VIOLATION_OF_AREA + parkingCount + PARKING,
						Result.Accepted.getResultVal());
			}

	}

	private void checkDimensionForDAParking(Plan planDetail, ParkingHelper result) {

		int success = 0;
		int daFailedCount = 0;
		int daParkingCount = planDetail.getParkingDetails().getDisabledPersons().size();
		for (Measurement daParkingSlot : planDetail.getParkingDetails().getDisabledPersons()) {
			if (daParkingSlot.getWidth().setScale(2, RoundingMode.UP).doubleValue() >= DA_PARKING_SLOT_WIDTH
					&& daParkingSlot.getHeight().setScale(2, RoundingMode.UP).doubleValue() >= DA_PARKING_SLOT_HEIGHT)
				success++;
			else
				daFailedCount++;
		}
		planDetail.getParkingDetails().setValidDAParkingSlots(daParkingCount - daFailedCount);
		if (daParkingCount > 0)
			if (daFailedCount > 0) {
				if (result.daParking.intValue() == planDetail.getParkingDetails().getValidDAParkingSlots()) {
					setReportOutputDetails(planDetail, SUB_RULE_42__5, DA_PARKING_SLOT_AREA,
							DA_PARKING_MIN_AREA + MINIMUM_AREA_OF_EACH_DA_PARKING,
							NO_VIOLATION_OF_AREA + planDetail.getParkingDetails().getValidDAParkingSlots() + PARKING,
							Result.Accepted.getResultVal());
				} else {
					setReportOutputDetails(planDetail, SUB_RULE_42__5, DA_PARKING_SLOT_AREA,
							DA_PARKING_MIN_AREA + MINIMUM_AREA_OF_EACH_DA_PARKING,
							"Out of " + daParkingCount + PARKING + daFailedCount + PARKING_VIOLATED_MINIMUM_AREA,
							Result.Not_Accepted.getResultVal());
				}
			} else {
				setReportOutputDetails(planDetail, SUB_RULE_42__5, DA_PARKING_SLOT_AREA,
						DA_PARKING_MIN_AREA + MINIMUM_AREA_OF_EACH_DA_PARKING,
						NO_VIOLATION_OF_AREA + daParkingCount + PARKING, Result.Accepted.getResultVal());
			}
	}

	private BigDecimal getTotalBuilltUpAreaByOccupancy(Plan pl, String occupancyCode) {
		BigDecimal totalArea = BigDecimal.ZERO;
		for (Block b : pl.getBlocks())
			for (Occupancy occupancy : b.getBuilding().getTotalArea())
				if (occupancy.getTypeHelper().getType().getCode()
						.equals(Util.getOccupancyByCode(pl, occupancyCode).getType().getCode()))
					totalArea = totalArea.add(occupancy.getFloorArea());
		return totalArea;
	}

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
}
