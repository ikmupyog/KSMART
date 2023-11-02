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
import static org.egov.edcr.constants.DxfFileConstants.D4;
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.E1;
import static org.egov.edcr.constants.DxfFileConstants.E2;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.G3;
import static org.egov.edcr.constants.DxfFileConstants.G4;
import static org.egov.edcr.constants.DxfFileConstants.G5;
import static org.egov.edcr.constants.DxfFileConstants.J;
import static org.egov.edcr.utility.DcrConstants.IN_LITRE;
import static org.egov.edcr.utility.DcrConstants.OBJECTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.RAINWATERCAPACITY;
import static org.egov.edcr.utility.DcrConstants.RAINWATER_HARVESTING;
import static org.egov.edcr.utility.DcrConstants.RAINWATER_HARVESTING_CAPACITY;
import static org.egov.edcr.utility.DcrConstants.RAINWATER_HARVES_TANKCAPACITY;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;

import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class RainWaterHarvesting extends FeatureProcess {
	private static final String SUB_RULE_109_B_DESCRIPTION = "Workable RainWater Storage Arrangement ";
	private static final String SUB_RULE_AMD19_76_2 = "76(2)";
	private static final String SUB_RULE_AMD20_76_1 = "76(1)";
	private static final String RAINWATER_HARVESTING_TANK_CAPACITY = "Minimum capacity of Rain Water Harvesting Tank";
	private static final String OCCUPANCY = "Occupancy";
	private static final BigDecimal TWENTYFIVE = BigDecimal.valueOf(25);
	private static final BigDecimal THREEHUNDRED = BigDecimal.valueOf(300);
	private static final BigDecimal TWOHUNDREDANDTWODOTTHIRTYFIVE = BigDecimal.valueOf(202.35);
	private static final String GW_RECHARGE = "Ground water recharging system";

	@Override
	public Plan validate(Plan pl) {
		HashMap<String, String> errors = new HashMap<>();
		// rain water harvest defined or not
		if (pl != null && pl.getUtility() != null && !pl.getVirtualBuilding().getOccupancyTypes().isEmpty()) {
			for (OccupancyTypeHelper occupancyType : pl.getVirtualBuilding().getOccupancyTypes()) {
				String occupCode = occupancyType.getType().getCode();
				if (checkOccupancyTypeForRWH(occupancyType)) {
					if (validateRWH(pl, errors))
						break;
				} else if ((occupCode.equals(A1) || occupCode.equals(A5))) {
					if ((pl.getVirtualBuilding().getTotalFloorUnits().doubleValue() != 1
							&& (pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(THREEHUNDRED) > 0
									|| pl.getPlot().getArea().compareTo(TWOHUNDREDANDTWODOTTHIRTYFIVE) > 0))
							&& validateRWH(pl, errors)) {
						break;
					}
				}
			}
		}

		if (pl.getUtility().getGroundWaterRecharge().isEmpty()) {
			HashMap<String, String> err = new HashMap<>();
			err.put(GW_RECHARGE, edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] { GW_RECHARGE },
					LocaleContextHolder.getLocale()));
			pl.addErrors(err);
		}
		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		validate(pl);
		scrutinyDetail = new ScrutinyDetail();
		scrutinyDetail.addColumnHeading(1, RULE_NO);
		scrutinyDetail.addColumnHeading(2, DESCRIPTION);
		scrutinyDetail.addColumnHeading(3, OCCUPANCY);
		scrutinyDetail.addColumnHeading(4, REQUIRED);
		scrutinyDetail.addColumnHeading(5, PROVIDED);
		scrutinyDetail.addColumnHeading(6, STATUS);
		scrutinyDetail.setKey("Common_Rain Water Harvesting");
		String subRule = SUB_RULE_AMD19_76_2;
		String subRuleDesc = SUB_RULE_109_B_DESCRIPTION;
		BigDecimal expectedTankCapacity = BigDecimal.ZERO;
		if (!pl.getOccupancies().isEmpty()) {
			for (Occupancy occupancyType : pl.getOccupancies()) {
				String occupCode = occupancyType.getTypeHelper().getType().getCode();
				if (checkOccupancyTypeForRWH(occupancyType.getTypeHelper())) {
					if (processRWH(pl, subRule, subRuleDesc))
						break;
				} else if ((occupCode.equals(A1)
						|| occupCode.equals(A5) && pl.getVirtualBuilding().getTotalFloorUnits().doubleValue() == 1)
						&& (pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(THREEHUNDRED) > 0
								&& pl.getPlot().getArea().compareTo(TWOHUNDREDANDTWODOTTHIRTYFIVE) > 0)
						&& processRWH(pl, subRule, subRuleDesc)) {
					break;
				}
			}
		}
		List<Map<String, Object>> listOfMapOfAllOccupanciesAndTankCapacity = new ArrayList<>();
		if (pl.getUtility() != null && !pl.getUtility().getRainWaterHarvest().isEmpty()
				&& pl.getUtility().getRainWaterHarvestingTankCapacity() != null) {
			if (!pl.getVirtualBuilding().getOccupancyTypes().isEmpty()) {
				for (Occupancy occupancyType : pl.getOccupancies()) {
					String occupCode = occupancyType.getTypeHelper().getType().getCode();
					Map<String, Object> mapOfAllOccupancyAndTankCapacity = new HashMap<>();
					if ((occupCode.equals(A1) || occupCode.equals(A5))
							&& !pl.getUtility().getRainWaterHarvest().isEmpty()
							&& pl.getUtility().getRainWaterHarvestingTankCapacity() != null
							&& pl.getVirtualBuilding().getTotalCoverageArea() != null
							&& pl.getVirtualBuilding().getTotalCoverageArea().compareTo(BigDecimal.valueOf(0)) > 0) {

						if (pl.getVirtualBuilding().getTotalFloorUnits().doubleValue() > 1
								&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(THREEHUNDRED) > 0
								&& pl.getPlot().getArea().compareTo(TWOHUNDREDANDTWODOTTHIRTYFIVE) > 0) {
							expectedTankCapacity = TWENTYFIVE.multiply(pl.getVirtualBuilding().getTotalCoverageArea())
									.setScale(2, RoundingMode.HALF_UP);
							mapOfAllOccupancyAndTankCapacity.put("occupancy", occupancyType.getTypeHelper().getType().getName());
							mapOfAllOccupancyAndTankCapacity.put("expectedTankCapacity", expectedTankCapacity);
						}
					} else if (checkOccupancyTypeForRWH(occupancyType.getTypeHelper())
							&& !pl.getUtility().getRainWaterHarvest().isEmpty()
							&& pl.getUtility().getRainWaterHarvestingTankCapacity() != null
							&& pl.getVirtualBuilding().getTotalCoverageArea() != null
							&& pl.getVirtualBuilding().getTotalCoverageArea().compareTo(BigDecimal.valueOf(0)) > 0) {
						if (occupCode.equals(A2) || occupCode.equals(A3) || occupCode.equals(A4) || occupCode.equals(F)
								|| occupCode.equals(F1) || occupCode.equals(F2) || occupCode.equals(F3)
								|| occupCode.equals(J)) {
							expectedTankCapacity = TWENTYFIVE.multiply(pl.getVirtualBuilding().getTotalCoverageArea())
									.setScale(2, RoundingMode.HALF_UP);
						} else {
							expectedTankCapacity = BigDecimal.valueOf(50)
									.multiply(pl.getVirtualBuilding().getTotalCoverageArea())
									.setScale(2, RoundingMode.HALF_UP);
						}
						mapOfAllOccupancyAndTankCapacity.put("occupancy", occupancyType.getTypeHelper().getType().getName());
						mapOfAllOccupancyAndTankCapacity.put("expectedTankCapacity", expectedTankCapacity);
					}
					if (!mapOfAllOccupancyAndTankCapacity.isEmpty()) {
						listOfMapOfAllOccupanciesAndTankCapacity.add(mapOfAllOccupancyAndTankCapacity);
					}
				}
				Map<String, Object> mapOfMostRestrictiveOccupancyAndItsTankCapacity = new HashMap<>();
				if (!listOfMapOfAllOccupanciesAndTankCapacity.isEmpty()) {
					mapOfMostRestrictiveOccupancyAndItsTankCapacity = listOfMapOfAllOccupanciesAndTankCapacity.get(0);
					for (Map<String, Object> mapOfOccupancyAndTankCapacity : listOfMapOfAllOccupanciesAndTankCapacity) {
						if (mapOfOccupancyAndTankCapacity.get("expectedTankCapacity")
								.equals(mapOfMostRestrictiveOccupancyAndItsTankCapacity.get("expectedTankCapacity"))) {
							if (!(mapOfOccupancyAndTankCapacity.get("occupancy"))
									.equals(mapOfMostRestrictiveOccupancyAndItsTankCapacity.get("occupancy"))) {
								SortedSet<String> uniqueOccupancies = new TreeSet<>();
								String[] occupancyString = (mapOfOccupancyAndTankCapacity.get("occupancy") + " , "
										+ mapOfMostRestrictiveOccupancyAndItsTankCapacity.get("occupancy"))
												.split(" , ");
								for (String str : occupancyString) {
									uniqueOccupancies.add(str);
								}
								StringBuffer str = new StringBuffer();
								List<String> unqList = new ArrayList<>(uniqueOccupancies);
								for (String unique : unqList) {
									str.append(unique);
									if (!unique.equals(unqList.get(unqList.size() - 1))) {
										str.append(" , ");
									}
								}
								mapOfMostRestrictiveOccupancyAndItsTankCapacity.put("occupancy", str.toString());
							}
							continue;
						} else if (((BigDecimal) mapOfMostRestrictiveOccupancyAndItsTankCapacity
								.get("expectedTankCapacity")).compareTo(
										(BigDecimal) mapOfOccupancyAndTankCapacity.get("expectedTankCapacity")) < 0) {
							mapOfMostRestrictiveOccupancyAndItsTankCapacity.putAll(mapOfOccupancyAndTankCapacity);
						}
					}
				}
				Boolean valid = false;
				if (!mapOfMostRestrictiveOccupancyAndItsTankCapacity.isEmpty()
						&& mapOfMostRestrictiveOccupancyAndItsTankCapacity.get("occupancy") != null
						&& mapOfMostRestrictiveOccupancyAndItsTankCapacity.get("expectedTankCapacity") != null) {
					if (((BigDecimal) mapOfMostRestrictiveOccupancyAndItsTankCapacity.get("expectedTankCapacity"))
							.compareTo(pl.getUtility().getRainWaterHarvestingTankCapacity()) <= 0) {
						valid = true;
					}
					processRWHTankCapacity(pl, subRule, subRuleDesc,
							(BigDecimal) mapOfMostRestrictiveOccupancyAndItsTankCapacity.get("expectedTankCapacity"),
							valid, mapOfMostRestrictiveOccupancyAndItsTankCapacity.get("occupancy"));
				}
			}
		} else if (!pl.getUtility().getRainWaterHarvest().isEmpty()
				&& pl.getUtility().getRainWaterHarvestingTankCapacity() == null
				&& pl.getVirtualBuilding().getTotalCoverageArea() != null
				&& pl.getVirtualBuilding().getTotalCoverageArea().compareTo(BigDecimal.valueOf(0)) > 0
				&& pl.getVirtualBuilding().getTotalFloorArea() != null) {
			HashMap<String, String> errors = new HashMap<>();
			errors.put(RAINWATER_HARVESTING_TANK_CAPACITY, edcrMessageSource.getMessage(RAINWATERCAPACITY,
					new String[] { RAINWATER_HARVESTING_CAPACITY }, LocaleContextHolder.getLocale()));
			pl.addErrors(errors);

		}

		if (!pl.getUtility().getGroundWaterRecharge().isEmpty())
			setReportOutputDetails(pl, SUB_RULE_AMD20_76_1, GW_RECHARGE, "", "", OBJECTDEFINED_DESC,
					Result.Accepted.getResultVal());
		return pl;
	}

	private void processRWHTankCapacity(Plan planDetail, String subRule, String subRuleDesc,
			BigDecimal expectedTankCapacity, Boolean valid, Object occupancyType) {
		if (expectedTankCapacity.compareTo(BigDecimal.valueOf(0)) > 0) {
			if (valid) {
				setReportOutputDetails(planDetail, subRule, RAINWATER_HARVESTING_TANK_CAPACITY,
						occupancyType.toString(), expectedTankCapacity.toString(),
						planDetail.getUtility().getRainWaterHarvestingTankCapacity().toString(),
						Result.Accepted.getResultVal());
			} else {
				setReportOutputDetails(planDetail, subRule, RAINWATER_HARVESTING_TANK_CAPACITY,
						occupancyType.toString(), expectedTankCapacity.toString() + IN_LITRE,
						planDetail.getUtility().getRainWaterHarvestingTankCapacity().toString() + IN_LITRE,
						Result.Not_Accepted.getResultVal());
			}
		}
	}

	private boolean processRWH(Plan planDetail, String subRule, String subRuleDesc) {
		if (!planDetail.getUtility().getRainWaterHarvest().isEmpty()) {
			setReportOutputDetails(planDetail, subRule, subRuleDesc, "", "", OBJECTDEFINED_DESC,
					Result.Accepted.getResultVal());
			return true;
		} else if (planDetail.getUtility().getRainWaterHarvest().isEmpty()) {
			setReportOutputDetails(planDetail, subRule, subRuleDesc, "", "", OBJECTNOTDEFINED_DESC,
					Result.Not_Accepted.getResultVal());
			return true;
		}
		return false;
	}

	private boolean checkOccupancyTypeForRWH(OccupancyTypeHelper occupancyType) {
		String occupCode = occupancyType.getType().getCode();
		return occupCode.equals(A2) || occupCode.equals(A3) || occupCode.equals(A4) || occupCode.equals(B1)
				|| occupCode.equals(B2) || occupCode.equals(B3) || occupCode.equals(C) || occupCode.equals(C1)
				|| occupCode.equals(C2) || occupCode.equals(C3) || occupCode.equals(D) || occupCode.equals(D1)
				|| occupCode.equals(D2) || occupCode.equals(D3) || occupCode.equals(D4) || occupCode.equals(E)
				|| occupCode.equals(F) || occupCode.equals(F1) || occupCode.equals(F2) || occupCode.equals(F3)
				|| occupCode.equals(E1) || occupCode.equals(E2) || occupCode.equals(G1) || occupCode.equals(G2)
				|| occupCode.equals(G3) || occupCode.equals(G4) || occupCode.equals(G5) || occupCode.equals(J);
	}

	private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String occupancy, String expected,
			String actual, String status) {
		Map<String, String> details = new HashMap<>();
		details.put(RULE_NO, ruleNo);
		details.put(DESCRIPTION, ruleDesc);
		details.put(OCCUPANCY, occupancy);
		details.put(REQUIRED, expected);
		details.put(PROVIDED, actual);
		details.put(STATUS, status);
		scrutinyDetail.getDetail().add(details);
		pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
	}

	private boolean validateRWH(Plan pl, HashMap<String, String> errors) {
		if (pl.getUtility().getRainWaterHarvest().isEmpty()) {
			errors.put(RAINWATER_HARVESTING, edcrMessageSource.getMessage(OBJECTNOTDEFINED,
					new String[] { RAINWATER_HARVESTING }, LocaleContextHolder.getLocale()));
			pl.addErrors(errors);
			return true;
		} else if (!pl.getUtility().getRainWaterHarvest().isEmpty()
				&& pl.getUtility().getRainWaterHarvestingTankCapacity() == null) {
			errors.put(RAINWATER_HARVES_TANKCAPACITY, edcrMessageSource.getMessage(OBJECTNOTDEFINED,
					new String[] { RAINWATER_HARVES_TANKCAPACITY }, LocaleContextHolder.getLocale()));
			pl.addErrors(errors);
			return true;
		}
		return false;
	}

	@Override
	public Map<String, Date> getAmendments() {
		Map<String, Date> rwhAmendments = new LinkedHashMap<>();
		return rwhAmendments;
	}
}
