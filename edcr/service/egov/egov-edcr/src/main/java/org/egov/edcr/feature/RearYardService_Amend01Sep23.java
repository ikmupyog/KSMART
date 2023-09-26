package org.egov.edcr.feature;

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_010923;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_SEP23;
import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.A5;
import static org.egov.edcr.constants.DxfFileConstants.B;
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
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Building;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Plot;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.common.entity.edcr.SetBack;
import org.egov.edcr.service.ProcessHelper;
import org.egov.edcr.utility.Util;
import org.springframework.stereotype.Service;

@Service
public class RearYardService_Amend01Sep23 extends GeneralRule {
	private static final double VALUE_0_5 = 0.5;
	private static final String LEVEL = " Level ";
	private static final String RULE_24_4 = "24(4)";

	private static final String RULE_57_4 = "57-(4)";
	private static final String RULE_59_3 = "59-(3)";
	private static final String RULE_59_11 = "59-(11)";
	private static final String SUB_RULE_26_4_TABLE_4_4A = "26(4)Table-4 AND 4A";

	private static final String SUB_RULE_26_11 = "26(11)";
	private static final String RULE_26_4 = "26(4)Table-4";
	private static final String RULE_26_4A = "26(4)Table-4A";
	private static final String RULE_50_2 = "50(2)";
	private static final String RULE_26_10_PRO2 = "26(10) Proviso 2";
	private static final String RULE_26_4_PRO5 = "26(4) Proviso 5";

	private static final String SUB_RULE_26_11_DESCRIPTION = "Basement rear yard distance";

	private static final String SUB_RULE_24_4_DESCRIPTION = "Rear yard distance";
	private static final String MEANMINIMUMLABEL = "(Minimum distance,Mean distance) ";
	private static final String MINIMUMLABEL = "Minimum distance in MTR ";

	private static final BigDecimal FIVE = BigDecimal.valueOf(5);

	private static final BigDecimal REARYARDMINIMUM_DISTANCE_0 = BigDecimal.valueOf(0);
	private static final BigDecimal REARYARDMINIMUM_DISTANCE_1_5 = BigDecimal.valueOf(1.5);

	private static final BigDecimal REARYARDMINIMUM_DISTANCE_1 = BigDecimal.valueOf(1);
	private static final BigDecimal REARYARDMINIMUM_DISTANCE_FIFTY_CM = BigDecimal.valueOf(0.50);
	private static final BigDecimal REARYARDMINIMUM_DISTANCE_SIXTY_CM = BigDecimal.valueOf(0.60);

	private static final BigDecimal REARYARDMINIMUM_DISTANCE_3 = BigDecimal.valueOf(3);
	private static final BigDecimal REARYARDMINIMUM_DISTANCE_2 = BigDecimal.valueOf(2);
	private static final BigDecimal REARYARDMINIMUM_DISTANCE_5 = FIVE;
	private static final BigDecimal REARYARDMINIMUM_DISTANCE_7_5 = BigDecimal.valueOf(7.5);

	private static final BigDecimal REARYARDMEAN_DISTANCE_1 = BigDecimal.valueOf(1);
	private static final BigDecimal REARYARDMEAN_DISTANCE_2 = BigDecimal.valueOf(2);
	private static final BigDecimal REARYARDMEAN_DISTANCE_3 = BigDecimal.valueOf(3);
	private static final BigDecimal REARYARDMEAN_DISTANCE_5 = BigDecimal.valueOf(5);
	private static final BigDecimal REARYARDMEAN_DISTANCE_7_5 = BigDecimal.valueOf(7.5);
	private static final BigDecimal ONEHUNDREDFIFTY = BigDecimal.valueOf(150);
	private static final BigDecimal THREEHUNDRED = BigDecimal.valueOf(300);
	private static final BigDecimal TWOHUNDRED = BigDecimal.valueOf(200);

	private static final int SITEAREA_125 = 125;
	private static final int BUILDUPAREA_200 = 200;
	private static final int BUILDUPAREA_500 = 500;
	private static final int FLOORAREA_800 = 800;
	private static final int FLOORAREA_500 = 500;
	private static final int FLOORAREA_300 = 300;
	private static final BigDecimal BUILDING_HEIGHT_7 = BigDecimal.valueOf(7);

	private class RearYardResult {
		String rule;
		String subRule;
		String blockName;
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
		pl.getFeatureAmendments().put(REAR_YARD_DESC, AMEND_DATE_010923.toString());

		if (plot != null && !pl.getBlocks().isEmpty()) {
			for (Block block : pl.getBlocks()) { // for each block
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

					if (setback.getRearYard() != null && setback.getRearYard().getMean().compareTo(BigDecimal.ZERO) > 0
							&& setback.getLevel() <= 0) {
						min = setback.getRearYard().getMinimumDistance();
						mean = setback.getRearYard().getMean();

						// if height defined at rear yard level, then use elase
						// use buidling height.
						BigDecimal buildingHeight = block.getBuilding().getBuildingHeight();

						if (buildingHeight != null && (min.doubleValue() > 0 || mean.doubleValue() > 0)) {
							List<Occupancy> occupanciesList = ProcessHelper.groupOccupanciesForOccupancy_B_C_D(pl, block);

							for (final Occupancy occupancy : occupanciesList) {
								OccupancyTypeHelper occpncy = occupancy.getTypeHelper();

								if (occupancy.getBuiltUpArea() != null && B.equals(occupancy.getTypeHelper().getType().getCode())
                                        && occupancy.getBuiltUpArea().compareTo(TWOHUNDRED) <= 0)
                                    occpncy = Util.getOccupancyByCode(pl, A1);
								else if (occupancy.getBuiltUpArea() != null
										&& occupancy.getBuiltUpArea().compareTo(TWOHUNDRED) <= 0
										&& D.equals(occupancy.getTypeHelper().getType().getCode()))
									occpncy = Util.getOccupancyByCode(pl, F);
								else if (C.equals(occupancy.getTypeHelper().getType().getCode())
										&& occupancy.getBuiltUpArea() != null
										&& occupancy.getBuiltUpArea().compareTo(TWOHUNDRED) <= 0)
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

									checkRearYardLessThanTenMts(pl, setback, block.getBuilding(), block,
											setback.getLevel(), plot, BSMT_REAR_YARD_DESC, min, mean, occpncy,
											rearYardResult, BigDecimal.valueOf(10));

								} else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) <= 0) {
									checkRearYardLessThanTenMts(pl, setback, block.getBuilding(), block,
											setback.getLevel(), plot, REAR_YARD_DESC, min, mean, occpncy,
											rearYardResult, buildingHeight);

								} else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) > 0
										&& buildingHeight.compareTo(BigDecimal.valueOf(16)) <= 0) {
									checkRearYardBetweenTenToSixteenMts(setback, block.getBuilding(), pl, block,
											setback.getLevel(), plot, REAR_YARD_DESC, SUB_RULE_24_4_DESCRIPTION, min,
											mean, occpncy, rearYardResult);

								} else if (buildingHeight.compareTo(BigDecimal.valueOf(16)) > 0) {
									checkRearYardMoreThanSixteenMts(setback, block.getBuilding(), pl, block,
											setback.getLevel(), plot, REAR_YARD_DESC, min, mean, occpncy,
											rearYardResult);

								}

							}
							Map<String, String> details = new HashMap<>();
							details.put(RULE_NO, rearYardResult.subRule);
							details.put(LEVEL, rearYardResult.level != null ? rearYardResult.level.toString() : "");
							details.put(OCCUPANCY, rearYardResult.occupancy);
							if (rearYardResult.expectedmeanDistance != null
									&& rearYardResult.expectedmeanDistance.compareTo(BigDecimal.valueOf(0)) == 0) {
								details.put(FIELDVERIFIED, MINIMUMLABEL);
								details.put(REQUIRED, rearYardResult.expectedminimumDistance.toString());
								details.put(PROVIDED, rearYardResult.actualMinDistance.toString());

							} else {

								details.put(FIELDVERIFIED, MEANMINIMUMLABEL);
								details.put(REQUIRED, "(" + rearYardResult.expectedminimumDistance + ","
										+ rearYardResult.expectedmeanDistance + ")");
								details.put(PROVIDED, "(" + rearYardResult.actualMinDistance + ","
										+ rearYardResult.actualMeanDistance + ")");
							}
							if (rearYardResult.status) {
								details.put(STATUS, Result.Accepted.getResultVal());

							} else {
								details.put(STATUS, Result.Not_Accepted.getResultVal());
							}
							scrutinyDetail.getDetail().add(details);
							pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

						}
					}
				}
			}
		}

	}

	private Boolean checkRearYardMoreThanSixteenMts(SetBack setback, Building building, final Plan pl, Block block,
			Integer level, final Plot plot, final String rearYardFieldName, final BigDecimal min, final BigDecimal mean,
			final OccupancyTypeHelper mostRestrictiveOccupancy, RearYardResult rearYardResult) {
		Boolean valid = false;
		final String subRuleDesc = SUB_RULE_24_4_DESCRIPTION;
		BigDecimal buildingHeight = building.getBuildingHeight();

		if (mostRestrictiveOccupancy.getType().getCode().equals(A1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A4)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A5)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F3)) {
			processRearYardForOccupancyA1A2FHightGtThanTenMtrs(setback, buildingHeight, pl, mostRestrictiveOccupancy,
					block, level, plot, rearYardFieldName, subRuleDesc, false, rearYardResult);
		} else {

			final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
					.multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
							.divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
							.doubleValue())));

			valid = processRearYardForOccupanciesOtherThanA1A2F(pl, building, block, level, plot, rearYardFieldName,
					subRuleDesc, min, mean, mostRestrictiveOccupancy, distanceIncrementBasedOnHeight, false,
					rearYardResult, buildingHeight);

		}
		return valid;
	}

	private Boolean checkRearYardLessThanTenMts(final Plan pl, final SetBack setback, final Building building,
			final Block block, final Integer level, final Plot plot, final String rearYardFieldName,
			final BigDecimal min, final BigDecimal mean, final OccupancyTypeHelper mostRestrictiveOccupancy,
			final RearYardResult rearYardResult, final BigDecimal buildingHeight) {
		String subRule = SUB_RULE_26_4_TABLE_4_4A;
		String rule = REAR_YARD_DESC;
		String subRuleDesc = SUB_RULE_24_4_DESCRIPTION;
		Boolean valid = false;
		BigDecimal minVal = REARYARDMINIMUM_DISTANCE_1_5;
		BigDecimal meanVal = BigDecimal.valueOf(1.5);
		final BigDecimal side1Distance = (setback.getSideYard1() == null) ? BigDecimal.ZERO
				: setback.getSideYard1().getMinimumDistance();
		final BigDecimal side2Distance = (setback.getSideYard2() == null) ? BigDecimal.ZERO
				: setback.getSideYard2().getMinimumDistance();
		if (mostRestrictiveOccupancy.getType().getCode().equals(A1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A4)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A5)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A3)) {
			if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0) {
				if ((mostRestrictiveOccupancy.getType().getCode().equals(A1)
						|| mostRestrictiveOccupancy.getType().getCode().equals(F))
						&& building.getTotalBuitUpArea().compareTo(TWOHUNDRED) <= 0) {
					subRule = RULE_26_4A + " ," + RULE_50_2;
					if (building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(3)) <= 0) {
						if (pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(YES)
								|| pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(NA)) {
							minVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
							meanVal = REARYARDMEAN_DISTANCE_1;
						} else {
							if (pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(YES)
									|| pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(NA)) {
								minVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
								meanVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
							} else if (block.getBuilding().getBuildingHeight().compareTo(BUILDING_HEIGHT_7) <= 0) {
								if (pl.getPlanInformation().getNocToAbutRearDesc().equalsIgnoreCase(YES)) {
									subRule = RULE_26_4_PRO5 + " ," + RULE_50_2;
									minVal = REARYARDMINIMUM_DISTANCE_0;
									meanVal = REARYARDMINIMUM_DISTANCE_0;
								} else {
									minVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
									meanVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
								}
							} else {
								if (side1Distance.compareTo(REARYARDMINIMUM_DISTANCE_SIXTY_CM) >= 0
										&& side2Distance.compareTo(REARYARDMINIMUM_DISTANCE_SIXTY_CM) >= 0) {
									minVal = REARYARDMINIMUM_DISTANCE_FIFTY_CM;
									meanVal = REARYARDMINIMUM_DISTANCE_FIFTY_CM;
								} else {
									minVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
									meanVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
								}
							}
						}
					} else {
						subRule = RULE_26_4 + " ," + RULE_26_4A;
						minVal = REARYARDMINIMUM_DISTANCE_1;
						meanVal = REARYARDMINIMUM_DISTANCE_1_5;
					}
				} else {
					subRule = RULE_26_4 + " ," + RULE_26_4A;
					minVal = REARYARDMINIMUM_DISTANCE_1;
					meanVal = REARYARDMINIMUM_DISTANCE_1_5;
				}
			} else {
				subRule = RULE_26_4A;
				if (pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(YES)
						|| pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(NA)) {
					subRule = RULE_26_4 + " ," + RULE_26_4A;
					minVal = REARYARDMINIMUM_DISTANCE_1;
					meanVal = REARYARDMINIMUM_DISTANCE_1_5;
				} else {
					if (pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(YES)
							|| pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(NA)) {
						subRule = RULE_26_10_PRO2;
						minVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
						meanVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
					} else if (block.getBuilding().getBuildingHeight().compareTo(BUILDING_HEIGHT_7) <= 0) {
						if (pl.getPlanInformation().getNocToAbutRearDesc().equalsIgnoreCase(YES)) {
							subRule = RULE_26_4_PRO5;
							minVal = REARYARDMINIMUM_DISTANCE_0;
							meanVal = REARYARDMINIMUM_DISTANCE_0;
						} else {
							if (side1Distance.compareTo(REARYARDMINIMUM_DISTANCE_1) >= 0
									&& side2Distance.compareTo(REARYARDMINIMUM_DISTANCE_SIXTY_CM) >= 0) {
								minVal = REARYARDMINIMUM_DISTANCE_FIFTY_CM;
								meanVal = REARYARDMINIMUM_DISTANCE_FIFTY_CM;
							} else {
								subRule = RULE_26_4_PRO5;
								minVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
								meanVal = REARYARDMINIMUM_DISTANCE_SIXTY_CM;
							}
						}
					} else if (side1Distance.compareTo(REARYARDMINIMUM_DISTANCE_1) >= 0
							&& side2Distance.compareTo(REARYARDMINIMUM_DISTANCE_1) >= 0) {
						minVal = REARYARDMINIMUM_DISTANCE_FIFTY_CM;
						meanVal = REARYARDMINIMUM_DISTANCE_FIFTY_CM;
					} else {
						subRule = RULE_26_4 + " ," + RULE_26_4A;
						minVal = REARYARDMINIMUM_DISTANCE_1;
						meanVal = REARYARDMINIMUM_DISTANCE_1_5;
					}
				}
			}
			valid = this.validateMinimumAndMeanValue(min, mean, minVal, meanVal);
			if (-1 == level) {// TODO: VALIDATE THIS.
				subRule = SUB_RULE_26_11;
				rule = BSMT_REAR_YARD_DESC;
				subRuleDesc = SUB_RULE_26_11_DESCRIPTION;
			}
			this.compareRearYardResult(block.getName(), min, mean, mostRestrictiveOccupancy, rearYardResult, valid,
					subRule, rule, minVal, meanVal, level);
		} else {
			valid = this.processRearYardForOccupanciesOtherThanA1A2F(pl, building, block, level, plot,
					rearYardFieldName, subRuleDesc, min, mean, mostRestrictiveOccupancy, BigDecimal.ZERO, false,
					rearYardResult, buildingHeight);
		}
		return valid;
	}

	private void compareRearYardResult(String blockName, BigDecimal min, BigDecimal mean,
			OccupancyTypeHelper mostRestrictiveOccupancy, RearYardResult rearYardResult, Boolean valid, String subRule,
			String rule, BigDecimal minVal, BigDecimal meanVal, Integer level) {
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
			rearYardResult.blockName = blockName;
			rearYardResult.level = level;
			rearYardResult.expectedminimumDistance = minVal;
			rearYardResult.actualMinDistance = min;
			rearYardResult.status = valid;

		}
	}

	private Boolean checkRearYardBetweenTenToSixteenMts(SetBack setback, Building building, final Plan pl, Block block,
			Integer level, final Plot plot, final String rearYardFieldName, final String subRuleDesc,
			final BigDecimal min, final BigDecimal mean, final OccupancyTypeHelper mostRestrictiveOccupancy,
			RearYardResult rearYardResult) {
		Boolean valid = false;
		BigDecimal buildingHeight = building.getBuildingHeight();

		if (mostRestrictiveOccupancy.getType().getCode().equals(A1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A4)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A5)) {
			processRearYardForOccupancyA1A2FHightGtThanTenMtrs(setback, buildingHeight, pl, mostRestrictiveOccupancy,
					block, level, plot, rearYardFieldName, subRuleDesc, false, rearYardResult);
		} else {

			final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
					.multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
							.divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
							.doubleValue())));
			valid = processRearYardForOccupanciesOtherThanA1A2F(pl, building, block, level, plot, rearYardFieldName,
					subRuleDesc, min, mean, mostRestrictiveOccupancy, distanceIncrementBasedOnHeight, false,
					rearYardResult, buildingHeight);

		}
		return valid;
	}

	private void processRearYardForOccupancyA1A2FHightGtThanTenMtrs(SetBack setbacks, BigDecimal buildingHeight,
			final Plan pl, OccupancyTypeHelper mostRestrictiveOccupancy, Block block, Integer level, final Plot plot,
			final String rearYardFieldName, final String subRuleDesc, final boolean checkMinimumValue,
			RearYardResult rearYardResult) {
		String subRule;
		String rule = REAR_YARD_DESC;
		BigDecimal minval;
		BigDecimal meanval;
		if (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) > 0) {
			subRule = RULE_26_4 + ", " + RULE_50_2;
			minval = BigDecimal.valueOf(1);
			meanval = BigDecimal.valueOf(2);

		} else {
			subRule = RULE_26_4;
			minval = BigDecimal.valueOf(0.5);
			meanval = BigDecimal.valueOf(1);
		}

		if (mostRestrictiveOccupancy.getType().getCode().equals(F)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F4)
				|| mostRestrictiveOccupancy.getType().getCode()
						.equals(F2)/*
									 * || mostRestrictiveOccupancy.getType().
									 * getCode().equals(F3)
									 */) {
			minval = BigDecimal.valueOf(1.5);
			meanval = BigDecimal.valueOf(1.5);
		}

		if (buildingHeight.compareTo(BigDecimal.TEN) > 0) {
			BigDecimal minValue = BigDecimal.valueOf(VALUE_0_5)
					.multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
							.divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
							.doubleValue())))
					.add(minval);

			BigDecimal meanValue = BigDecimal.valueOf(VALUE_0_5)
					.multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
							.divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
							.doubleValue())))
					.add(meanval);

			if (checkMinimumValue) {
				minValue = minValue.compareTo(FIVE) <= 0 ? FIVE : minValue;
				meanValue = meanValue.compareTo(FIVE) <= 0 ? FIVE : meanValue;
			}

			if (setbacks.getRearYard().getMinimumDistance().compareTo(minValue) >= 0
					&& setbacks.getRearYard().getMean().compareTo(meanValue) >= 0) {
				compareRearYardResult(block.getName(), setbacks.getRearYard().getMinimumDistance(),
						setbacks.getRearYard().getMean(), mostRestrictiveOccupancy, rearYardResult, true, subRule, rule,
						minValue, meanValue, level);
			} else {
				compareRearYardResult(block.getName(), setbacks.getRearYard().getMinimumDistance(),
						setbacks.getRearYard().getMean(), mostRestrictiveOccupancy, rearYardResult, false, subRule,
						rule, minValue, meanValue, level);
			}
		}
	}

	private Boolean processRearYardForOccupanciesOtherThanA1A2F(final Plan pl, Building building, Block block,
			Integer level, final Plot plot, final String rearYardFieldName, final String subRuleDesc,
			final BigDecimal min, final BigDecimal mean, final OccupancyTypeHelper mostRestrictiveOccupancy,
			final BigDecimal distanceIncrementBasedOnHeight, final Boolean checkMinimum5mtsCondition,
			RearYardResult rearYardResult, BigDecimal buildingHeight) {
		String subRule = SUB_RULE_26_4_TABLE_4_4A;
		String rule = REAR_YARD_DESC;
		BigDecimal minVal = BigDecimal.valueOf(0);
		BigDecimal meanVal = BigDecimal.valueOf(0);
		Boolean valid = false;

		if (mostRestrictiveOccupancy.getType().getCode().equals(B1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(B3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(B2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(E)) {
			subRule = SUB_RULE_26_4_TABLE_4_4A;
			if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_200)) > 0
					&& building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_500)) <= 0) {
				minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
				meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);
			} else {
				minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
				meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
			}

		} else if (mostRestrictiveOccupancy.getType().getCode().equals(H)) {
			subRule = SUB_RULE_26_4_TABLE_4_4A;
			minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
			meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
		} /*
			 * else if (mostRestrictiveOccupancy.getType().getCode().equals(F)
			 * || mostRestrictiveOccupancy.getType().getCode().equals(F3) ) { if
			 * (Util.isSmallPlot(pl)) { // latest change asked by client on
			 * feb22 subRule = SUB_RULE_26_4_TABLE_4_4A; minVal =
			 * distanceIncrementBasedOnHeight.add(
			 * REARYARDMINIMUM_DISTANCE_FIFTY_CM); meanVal =
			 * distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1); }
			 * else { subRule = SUB_RULE_26_4_TABLE_4_4A; minVal =
			 * distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1_5);
			 * meanVal =
			 * distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1_5); }
			 * } else if
			 * (mostRestrictiveOccupancy.getType().getCode().equals(F1)) {
			 * subRule = SUB_RULE_26_4_TABLE_4_4A; minVal =
			 * distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_5);
			 * meanVal =
			 * distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_5);
			 * 
			 * } else if
			 * (mostRestrictiveOccupancy.getType().getCode().equals(F2)) { if
			 * (plot.getArea().compareTo(BigDecimal.valueOf(SITEAREA_125)) <= 0)
			 * { subRule = SUB_RULE_26_4_TABLE_4_4A; minVal =
			 * distanceIncrementBasedOnHeight.add(
			 * REARYARDMINIMUM_DISTANCE_FIFTY_CM); meanVal =
			 * distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1); }
			 * else { subRule = SUB_RULE_26_4_TABLE_4_4A; minVal =
			 * distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
			 * meanVal =
			 * distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1); } }
			 */
		else if (mostRestrictiveOccupancy.getType().getCode().equals(G1)) {
			subRule = SUB_RULE_26_4_TABLE_4_4A;
			if (building.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(BUILDUPAREA_200)) <= 0) {
				minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_2);
				meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_2);
			} else {
				minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_3);
				meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_3);
			}
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(G2)) {
			subRule = SUB_RULE_26_4_TABLE_4_4A;
			minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_5);
			meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_5);
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(I1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(I2)) {
			subRule = SUB_RULE_26_4_TABLE_4_4A;
			minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_7_5);
			meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_7_5);
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(F4)) { // TODO:
																				// VERIFY
			subRule = SUB_RULE_26_4_TABLE_4_4A;
			minVal = distanceIncrementBasedOnHeight.add(REARYARDMINIMUM_DISTANCE_1);
			meanVal = distanceIncrementBasedOnHeight.add(REARYARDMEAN_DISTANCE_1);
		}

		if (checkMinimum5mtsCondition) {// TODO: Verify
			minVal = minVal.compareTo(FIVE) <= 0 ? FIVE : minVal;
			meanVal = meanVal.compareTo(FIVE) <= 0 ? FIVE : meanVal;
		}

		valid = validateMinimumAndMeanValue(min, mean, minVal, meanVal);
		if (-1 == level) {
			subRule = SUB_RULE_26_11;
			rule = BSMT_REAR_YARD_DESC;

		}

		compareRearYardResult(block.getName(), min, mean, mostRestrictiveOccupancy, rearYardResult, valid, subRule,
				rule, minVal, meanVal, level);
		return valid;
	}

	private Boolean smallIndustrialBuilding(Plan pl, Building building) {
		BigDecimal totalarea = building.getTotalExistingBuiltUpArea() != null
				? building.getTotalExistingBuiltUpArea().add(building.getTotalBuitUpArea())
				: building.getTotalBuitUpArea();
		if (building.getBuildingHeight().compareTo(BigDecimal.valueOf(10)) < 0
				&& pl.getPlanInformation().getPowerUsedHp() != null && pl.getPlanInformation().getPowerUsedHp() <= 30
				&& pl.getPlanInformation().getNumberOfWorkers() != null
				&& pl.getPlanInformation().getNumberOfWorkers() <= 20
				&& totalarea.compareTo(BigDecimal.valueOf(200)) < 0) {
			return true;
		}
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
		for (Block block : pl.getBlocks()) {
			if (!block.getCompletelyExisting()) {
				Boolean rearYardDefined = false;
				for (SetBack setback : block.getSetBacks()) {
					if (setback.getRearYard() != null
							&& setback.getRearYard().getMean().compareTo(BigDecimal.valueOf(0)) > 0) {
						rearYardDefined = true;
					}
				}
				if (!rearYardDefined && !pl.getPlanInformation().getNocToAbutRearDesc().equalsIgnoreCase(YES)) {
					HashMap<String, String> errors = new HashMap<>();
					errors.put(REAR_YARD_DESC,
							prepareMessage(OBJECTNOTDEFINED, REAR_YARD_DESC + " for Block " + block.getName()));
					pl.addErrors(errors);
				}
			}

		}

	}

	@Override
	public Map<String, Date> getAmendments() {
		final Map<String, Date> rearYardAmendments = new LinkedHashMap<>();
		rearYardAmendments.put(AMEND_SEP23, AMEND_DATE_010923);
		return rearYardAmendments;
	}

}
