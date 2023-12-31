package org.egov.edcr.feature;

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;
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
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.constants.DxfFileConstants.I3;
import static org.egov.edcr.constants.DxfFileConstants.I4;
import static org.egov.edcr.constants.DxfFileConstants.I5;
import static org.egov.edcr.constants.DxfFileConstants.I6;
import static org.egov.edcr.constants.DxfFileConstants.J;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.NA;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.SIDE_YARD1_DESC;
import static org.egov.edcr.utility.DcrConstants.SIDE_YARD2_DESC;
import static org.egov.edcr.utility.DcrConstants.SIDE_YARD_DESC;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
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
import org.egov.common.entity.edcr.Yard;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class SideYardService_Amend01Sep23 extends GeneralRule {
	private static final double VALUE_0_5 = 0.5;
	private static final String RULE_52_3 = "52(3)";
	private static final String SUB_RULE_24_5 = "24(5)";
	private static final String SUB_RULE_26_11 = "26(11)";
	private static final String RULE_26_4 = "26(4)Table-4";
	private static final String RULE_26_4A = "26(4)Table-4A";
	private static final String RULE_26_4_4A = "26(4)Table-4 & 4A";
	private static final String RULE_26_4_PROVISO2 = "26(4)Table-4 Proviso 2";
	private static final String RULE_26_4_PROVISO5 = "26(4)Table-4 Proviso 5";
	private static final String RULE_26_6 = "26(6)";
	private static final String RULE_26_10_PROVISO2 = "26(10) Proviso 2";
	private static final String RULE_50_2 = "50(2)";
    private static final String SUB_RULE_47_3 = "47(3)";
    private static final String SUB_RULE_47_2 = "47(2) Proviso 1";
	private static final BigDecimal FIVE = BigDecimal.valueOf(5);
	private static final BigDecimal SIDEVALUE_ZERO = BigDecimal.valueOf(0);
	private static final BigDecimal SIDEVALUE_SIXTY_CM = BigDecimal.valueOf(0.60);
	private static final BigDecimal SIDEVALUE_FIFTY_CM = BigDecimal.valueOf(0.50);
	private static final BigDecimal SIDEVALUE_NINTY_CM = BigDecimal.valueOf(0.90);

	private static final BigDecimal SIDEVALUE_ONE = BigDecimal.valueOf(1);
	private static final BigDecimal SIDEVALUE_ONE_TWO = BigDecimal.valueOf(1.2);

	private static final BigDecimal SIDEVALUE_ONEPOINTFIVE = BigDecimal.valueOf(1.5);
	private static final BigDecimal SIDEVALUE_TWO = BigDecimal.valueOf(2);
	private static final BigDecimal SIDEVALUE_THREE = BigDecimal.valueOf(3);
	private static final BigDecimal SIDEVALUE_FOUR = BigDecimal.valueOf(4);
	private static final BigDecimal SIDEVALUE_FIVE = BigDecimal.valueOf(5);
	private static final BigDecimal SIDEVALUE_SEVEN_FIVE = BigDecimal.valueOf(7.5);

	private static final BigDecimal SITEAREA_125 = BigDecimal.valueOf(125);
	private static final BigDecimal BUILDUPAREA_200 = BigDecimal.valueOf(200);

	private static final int FLOORAREA_800 = 800;
	private static final int FLOORAREA_500 = 500;
	private static final int FLOORAREA_200 = 200;
	private static final String SIDENUMBER = "Side Number";
	private static final String MEANMINIMUMLABEL = "(Minimum distance,Mean distance)";

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
		pl.getFeatureAmendments().put(SIDE_YARD_DESC, AMEND_DATE_081119.toString());

		// Side yard 1 and side yard 2 both may not mandatory in same levels. Get
		// previous level side yards in this case.
		// In case of side yard 1 defined and other side not required, then consider
		// other side as zero distance ( in case of noc
		// provided cases).

		Boolean valid = false;
		if (plot != null && !pl.getBlocks().isEmpty()) {
			for (Block block : pl.getBlocks()) { // for each block
				scrutinyDetail = new ScrutinyDetail();
				scrutinyDetail.addColumnHeading(1, RULE_NO);
				scrutinyDetail.addColumnHeading(2, LEVEL);
				scrutinyDetail.addColumnHeading(3, OCCUPANCY);
				scrutinyDetail.addColumnHeading(4, SIDENUMBER);
				scrutinyDetail.addColumnHeading(5, DESCRIPTION);
				scrutinyDetail.addColumnHeading(6, REQUIRED);
				scrutinyDetail.addColumnHeading(7, PROVIDED);
				scrutinyDetail.addColumnHeading(8, STATUS);
				SideYardResult sideYard1Result = new SideYardResult();
				SideYardResult sideYard2Result = new SideYardResult();

				boolean buildingIsOnlyCommercialType = getAllOccupanciesInBuildingAreCommercial(block);
				for (SetBack setback : block.getSetBacks()) {

					if (setback.getLevel() <= 0) {
						Yard sideYard1 = null;
						Yard sideYard2 = null;

						if (setback.getSideYard1() != null
								&& setback.getSideYard1().getMinimumDistance().compareTo(BigDecimal.ZERO) > 0) {
							sideYard1 = setback.getSideYard1();
						}
						if (setback.getSideYard2() != null
								&& setback.getSideYard2().getMinimumDistance().compareTo(BigDecimal.ZERO) > 0) {
							sideYard2 = setback.getSideYard2();
						}

						if (sideYard1 != null || sideYard2 != null) {
							if (sideYard1 == null)// mean side yard2 present and defined only in that level. Get
													// sideyard1 from
													// previous level.
							{
								SetBack sideYardSetback = block.getLowerLevelSetBack(setback.getLevel(),
										SIDE_YARD1_DESC);
								if (sideYardSetback != null && sideYardSetback.getSideYard1() != null && sideYardSetback
										.getSideYard1().getMinimumDistance().compareTo(BigDecimal.ZERO) > 0) {
									sideYard1 = sideYardSetback.getSideYard1();
								}
							}
							if (sideYard2 == null)// mean side yard1 present and defined only in that level. Get
													// sideyard2 from
													// previous level.
							{
								SetBack sideYardSetback = block.getLowerLevelSetBack(setback.getLevel(),
										SIDE_YARD2_DESC);
								if (sideYardSetback != null && sideYardSetback.getSideYard2() != null && sideYardSetback
										.getSideYard2().getMinimumDistance().compareTo(BigDecimal.ZERO) > 0) {
									sideYard2 = sideYardSetback.getSideYard2();
								} else {
									sideYard2 = new Yard();
									sideYard2.setHeight(BigDecimal.ZERO);
									sideYard2.setMinimumDistance(BigDecimal.ZERO);
									sideYard2.setMean(BigDecimal.ZERO);
								} // If side yard 2 not defined in case of NOC to abut side, then using empty
									// yard.
							}
						}

						BigDecimal buildingHeight;
						if (sideYard1 != null && sideYard2 != null) {
							buildingHeight = block.getBuilding().getBuildingHeight();

							double minlength = 0;
							double max = 0;
							double minMeanlength = 0;
							double maxMeanLength = 0;
							if (sideYard2 != null && sideYard1 != null) {
								/*
								 * minlength = sideYard2.getMinimumDistance().doubleValue(); max =
								 * sideYard1.getMinimumDistance().doubleValue(); minMeanlength=
								 * sideYard2.getMean().doubleValue();
								 * maxMeanLength=sideYard1.getMean().doubleValue(); }
								 */
								if (sideYard2.getMinimumDistance().doubleValue() > sideYard1.getMinimumDistance()
										.doubleValue()) {
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
							}

							if (buildingHeight != null && (minlength > 0 || max > 0)) {

								if (pl.getPlanInformation().getPlotInCommercialZone().equalsIgnoreCase(DcrConstants.YES)
										&& block.getBuilding().getBuildingHeight().compareTo(BigDecimal.valueOf(16)) < 0
										&& buildingIsOnlyCommercialType) {
									scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Side Yard");
									if (-1 == setback.getLevel()) {
										scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Basement Side Yard");
									}

									checkOnlyCommercialOccupancyTypeForLessThan16MtBuilding(pl, block, sideYard1Result,
											sideYard2Result, setback, minlength, max, minMeanlength, maxMeanLength);

								} else {

									for (final Occupancy occupancy : block.getBuilding().getOccupancies()) {
										OccupancyTypeHelper occpncy = occupancy.getTypeHelper();

										scrutinyDetail.setKey("Block_" + block.getName() + "_" + "Side Yard");
										if (-1 == setback.getLevel()) {
											scrutinyDetail
													.setKey("Block_" + block.getName() + "_" + "Basement Side Yard");

											checkSideYardLessThanTenOrEqualToMts(pl, setback, block.getBuilding(),
													BigDecimal.valueOf(10), block.getName(), setback.getLevel(), plot,
													minlength, max, minMeanlength, maxMeanLength, occpncy,
													sideYard1Result, sideYard2Result);

										} else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) <= 0) {
											checkSideYardLessThanTenOrEqualToMts(pl, setback, block.getBuilding(),
													buildingHeight, block.getName(), setback.getLevel(), plot,
													minlength, max, minMeanlength, maxMeanLength, occpncy,
													sideYard1Result, sideYard2Result);

										} else if (buildingHeight.compareTo(BigDecimal.valueOf(10)) > 0
												&& buildingHeight.compareTo(BigDecimal.valueOf(16)) <= 0)
											checkSideYardBetweenTenToSixteenMts(pl, block.getBuilding(), buildingHeight,
													block.getName(), setback.getLevel(), plot, minlength, max,
													minMeanlength, maxMeanLength, occpncy, sideYard1Result,
													sideYard2Result);
										else if (buildingHeight.compareTo(BigDecimal.valueOf(16)) > 0)
											checkSideYardMoreThanSixteenMts(pl, block.getBuilding(), buildingHeight,
													block.getName(), setback.getLevel(), plot, minlength, max,
													minMeanlength, maxMeanLength, occpncy, sideYard1Result,
													sideYard2Result);

									}
								}

								if (sideYard1Result != null) {
									Map<String, String> details = new HashMap<>();
									details.put(RULE_NO, sideYard1Result.subRule);
									details.put(LEVEL,
											sideYard1Result.level != null ? sideYard1Result.level.toString() : "");
									details.put(OCCUPANCY, sideYard1Result.occupancy);
									details.put(DESCRIPTION, MEANMINIMUMLABEL);
									details.put(REQUIRED, "(" + sideYard1Result.expectedDistance + ", "
											+ sideYard1Result.expectedmeanDistance + ")");
									details.put(PROVIDED, "(" + sideYard1Result.actualDistance + ", "
											+ sideYard1Result.actualMeanDistance + ")");
									details.put(SIDENUMBER, SIDE_YARD1_DESC);
									if (sideYard1Result.status) {
										details.put(STATUS, Result.Accepted.getResultVal());
									} else {
										details.put(STATUS, Result.Not_Accepted.getResultVal());
									}

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
									detailsSideYard2.put(DESCRIPTION, MEANMINIMUMLABEL);
									detailsSideYard2.put(REQUIRED, "(" + sideYard2Result.expectedDistance + ", "
											+ sideYard2Result.expectedmeanDistance + ")");
									detailsSideYard2.put(PROVIDED, "(" + sideYard2Result.actualDistance + ", "
											+ sideYard2Result.actualMeanDistance + ")");
									if (sideYard2Result.status) {
										detailsSideYard2.put(STATUS, Result.Accepted.getResultVal());
									} else {
										detailsSideYard2.put(STATUS, Result.Not_Accepted.getResultVal());
									}

									scrutinyDetail.getDetail().add(detailsSideYard2);
									pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
								}
							}
						}
					}
				}
			}
		}
	}

	private void checkOnlyCommercialOccupancyTypeForLessThan16MtBuilding(final Plan pl, Block block,
			SideYardResult sideYard1Result, SideYardResult sideYard2Result, SetBack setback, double minlength,
			double max, double minMeanlength, double maxMeanLength) {
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
			subRule = SUB_RULE_26_11;
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
						|| occupancy.getTypeHelper().getType().getCode().equals(F1)
						|| occupancy.getTypeHelper().getType().getCode().equals(F2)
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
			double maxMeanLength, final OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard1Result,
			SideYardResult sideYard2Result) {
		String subRule = SUB_RULE_24_5;
		String rule = SIDE_YARD_DESC;
		Boolean valid2 = false;
		Boolean valid1 = false;
		BigDecimal side2val = SIDEVALUE_ONE;
		BigDecimal side1val = SIDEVALUE_ONE_TWO;
		BigDecimal side2Meanval = SIDEVALUE_ZERO;
		BigDecimal side1Meanval = SIDEVALUE_ZERO;

		if (mostRestrictiveOccupancy.getType().getCode().equals(A1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A4)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A5)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F3)) {

			if (plot.getArea().compareTo(SITEAREA_125) <= 0) {
				subRule = RULE_26_4 + ", " + RULE_50_2;
				side2val = SIDEVALUE_SIXTY_CM;
				side1val = SIDEVALUE_NINTY_CM;
				side2Meanval = side2val;
				side1Meanval = side1val;
			} else {
				subRule = RULE_26_4;
				side2val = SIDEVALUE_ONE;
				side1val = SIDEVALUE_ONE_TWO;
				side2Meanval = side2val;
				side1Meanval = side1val;
			}
			if (buildingHeight != null && buildingHeight.compareTo(BigDecimal.TEN) >= 0) {
				subRule = RULE_26_6;
				final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
						.multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
								.divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
								.doubleValue())));

				side2val = side2val.add(distanceIncrementBasedOnHeight);
				side1val = side1val.add(distanceIncrementBasedOnHeight);

				side2Meanval = side2Meanval.add(distanceIncrementBasedOnHeight);
				side1Meanval = side1Meanval.add(distanceIncrementBasedOnHeight);

				// if building is high rise building, then from level 0, minimum length should
				// be 5 mts in one side.
				if (level >= 0 && building.getBuildingHeight().compareTo(BigDecimal.valueOf(16)) > 0
						&& side1val.compareTo(FIVE) <= 0) {
					side1val = FIVE;
					side1Meanval = FIVE;
				}

				if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
					valid1 = true;
				if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
					valid2 = true;

				compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval,
						BigDecimal.valueOf(minMeanlength), mostRestrictiveOccupancy, sideYard2Result, valid2, subRule,
						rule, level);
				compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval,
						BigDecimal.valueOf(maxMeanLength), mostRestrictiveOccupancy, sideYard1Result, valid1, subRule,
						rule, level);
			}
		} else {
			final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
					.multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
							.divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
							.doubleValue())));

			processSideYardForOccupanciesOtherThanA1A2F(pl, building, plot, blockName, level, min, max, minMeanlength,
					maxMeanLength, mostRestrictiveOccupancy, buildingHeight, side2val, side1val,
					distanceIncrementBasedOnHeight, true, sideYard1Result, sideYard2Result);

		}

	}

	private void checkSideYardBetweenTenToSixteenMts(final Plan pl, Building building, BigDecimal buildingHeight,
			String blockName, Integer level, final Plot plot, final double min, final double max, double minMeanlength,
			double maxMeanLength, final OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard1Result,
			SideYardResult sideYard2Result) {
		String subRule = RULE_26_4;
		String rule = SIDE_YARD_DESC;

		Boolean valid2 = false;
		Boolean valid1 = false;
		BigDecimal side2val = SIDEVALUE_ONE;
		BigDecimal side1val = SIDEVALUE_ONE_TWO;
		BigDecimal side2Meanval = SIDEVALUE_ZERO;
		BigDecimal side1Meanval = SIDEVALUE_ZERO;

		if (mostRestrictiveOccupancy.getType().getCode().equals(A1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A4)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A5)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F3)) {

			subRule = RULE_26_4;
			side2val = SIDEVALUE_ONE;
			side1val = SIDEVALUE_ONE;
			side2Meanval = side2val;
			side1Meanval = side1val;
			if (buildingHeight != null && buildingHeight.compareTo(BigDecimal.TEN) >= 0) {
				final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
						.multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
								.divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
								.doubleValue())));
				side1val = side1val.add(distanceIncrementBasedOnHeight);
				side2val = side2val.add(distanceIncrementBasedOnHeight);

				side2Meanval = side2Meanval.add(distanceIncrementBasedOnHeight);
				side1Meanval = side1Meanval.add(distanceIncrementBasedOnHeight);

				// if building is high rise building, then from level 1, minimum length should
				// be 5 mts in one side.
				if (level >= 0 && building.getBuildingHeight().compareTo(BigDecimal.valueOf(16)) > 0
						&& side1val.compareTo(FIVE) <= 0) {
					side1val = FIVE;
					side1Meanval = FIVE;
				}

				if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
					valid1 = true;
				if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
					valid2 = true;

				compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval,
						BigDecimal.valueOf(minMeanlength), mostRestrictiveOccupancy, sideYard2Result, valid2, subRule,
						rule, level);
				compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval,
						BigDecimal.valueOf(maxMeanLength), mostRestrictiveOccupancy, sideYard1Result, valid1, subRule,
						rule, level);
			}
		} else {
			final BigDecimal distanceIncrementBasedOnHeight = BigDecimal.valueOf(VALUE_0_5)
					.multiply(BigDecimal.valueOf(Math.ceil(buildingHeight.subtract(BigDecimal.TEN)
							.divide(BigDecimal.valueOf(3), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
							.doubleValue())));

			processSideYardForGTTenBldgHghtOccupanciesOtherThanA1A2F(pl, building, plot, blockName, level, min, max,
					minMeanlength, maxMeanLength, mostRestrictiveOccupancy, buildingHeight, side2val, side1val,
					distanceIncrementBasedOnHeight, false, sideYard1Result, sideYard2Result);

		}
	}

	private void processSideYardForOccupanciesOtherThanA1A2F(final Plan pl, Building building, final Plot plot,
			String blockName, Integer level, final double min, final double max, double minMeanlength,
			double maxMeanLength, final OccupancyTypeHelper mostRestrictiveOccupancy, final BigDecimal buildingHeight,
			BigDecimal side2val, BigDecimal side1val, final BigDecimal distanceIncrementBasedOnHeight,
			final Boolean checkMinimum5mtsCondition, SideYardResult sideYard1Result, SideYardResult sideYard2Result) {

		Boolean valid2 = false;
		Boolean valid1 = false;

		String subRule = RULE_26_4;
		String rule = SIDE_YARD_DESC;

		BigDecimal side2Meanval = SIDEVALUE_ZERO;
		BigDecimal side1Meanval = SIDEVALUE_ZERO;

		if (mostRestrictiveOccupancy.getType().getCode().equals(B1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(B2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(B3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(E)
				|| mostRestrictiveOccupancy.getType().getCode().equals(E1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(E2)) {

			side2val = SIDEVALUE_ONEPOINTFIVE;
			side1val = SIDEVALUE_ONEPOINTFIVE;
			side2Meanval = SIDEVALUE_TWO;
			side1Meanval = SIDEVALUE_TWO;

			/*
			 * if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) { subRule =
			 * SUB_RULE_24_5; if (building.getTotalBuitUpArea().compareTo(BUILDUPAREA_150) <
			 * 0) {// check this if
			 * (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(
			 * DcrConstants.YES)) { side2val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE); side1val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO); side2Meanval =
			 * side2val; side1Meanval = side1val; } else { if
			 * (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(
			 * DcrConstants.YES)) {
			 * 
			 * side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVENTYFIVE_CM);
			 * side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
			 * side2Meanval = side2val; side1Meanval = side1val; } else { if
			 * (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(DcrConstants
			 * .YES)) { side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ZERO);
			 * side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO);
			 * side2Meanval = side2val; side1Meanval = side1val; } else { side2val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVENTYFIVE_CM); side1val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO); side2Meanval =
			 * side2val; side1Meanval = side1val; } } }
			 * 
			 * } else { if (building.getTotalBuitUpArea().compareTo(BUILDUPAREA_150) >= 0 &&
			 * building.getTotalBuitUpArea() .compareTo(BUILDUPAREA_300) <= 0) { side2val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE); side1val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO); side2Meanval =
			 * side2val; side1Meanval = side1val; } else { subRule = RULE_54_3_II; side2val
			 * = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE); side1val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE); side2Meanval =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO); side1Meanval =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO); } } } else { subRule =
			 * RULE_54_3_II; if (building.getTotalBuitUpArea().compareTo(BUILDUPAREA_150) <
			 * 0) {
			 * 
			 * side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE); side1val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO); side2Meanval =
			 * side2val; side1Meanval = side1val; } else { if
			 * (building.getTotalBuitUpArea().compareTo(BUILDUPAREA_150) >= 0 &&
			 * building.getTotalBuitUpArea() .compareTo(BUILDUPAREA_300) <= 0) { side2val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE); side1val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE_TWO); side2Meanval =
			 * side2val; side1Meanval = side1val; } else { side2val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE); side1val =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE); side2Meanval =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO); side1Meanval =
			 * distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO); } }
			 * 
			 * }
			 */
			/*
			 * if (max >= side2val.doubleValue()) valid2 = true; if (min >=
			 * side1val.doubleValue()) valid1 = true;
			 */

		} else if (mostRestrictiveOccupancy.getType().getCode().equals(D)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D2)) {

			if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_200)) > 0
					&& building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) <= 0) {
				subRule = RULE_26_4_4A;
				side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
				side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
				side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
				side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);

			} else {
				if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) > 0
						&& building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_800)) <= 0) {
					subRule = RULE_26_4_4A;
					side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
					side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
					side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FOUR);
					side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FOUR);

				} else {
					subRule = RULE_26_4_4A;
					side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
					side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONEPOINTFIVE);
					side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
					side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
				}
			}
			/*
			 * if (max >= side2val.doubleValue()) valid2 = true; if (min >=
			 * side1val.doubleValue()) valid1 = true;
			 */
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(F1)) {
			subRule = RULE_26_4_4A;
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(F2)) {
			if (plot.getArea().compareTo(SITEAREA_125) <= 0) {
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
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(G1)) {
			if (smallIndustrialBuilding(pl, building)) {
				subRule = RULE_26_4_4A;
				side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
				side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
				side2Meanval = side2val;
				side1Meanval = side1val;
			} else {
				subRule = RULE_26_4_4A;
				side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
				side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
				side2Meanval = side2val;
				side1Meanval = side1val;
			}
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(G2)) {
			subRule = RULE_26_4_4A;
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(I1)) {
			subRule = RULE_26_4_4A;
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVEN_FIVE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVEN_FIVE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(I2)) {
			subRule = RULE_26_4_4A;
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVEN_FIVE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVEN_FIVE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(F3)) {
			subRule = RULE_26_4_4A;
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		}

		if (level >= 0 && building.getBuildingHeight().compareTo(BigDecimal.valueOf(16)) > 0) {
			if (side1val.compareTo(FIVE) <= 0) {
				side1val = FIVE;
				side1Meanval = FIVE;
			}
		}

		if (checkMinimum5mtsCondition) {
			// Checking maximum value of both sides and comparing whether that value less
			// than or equal to 5. If yes, then
			// expecting 5mt minimum.
			if (side1val.compareTo(side2val) > 0 && side1val.compareTo(FIVE) <= 0) {
				side1val = FIVE;
				side1Meanval = FIVE;

			} /*
				 * else { if( side2val.compareTo(FIVE) <= 0) { side2val =FIVE; } }
				 */
			/*
			 * side1val = side1val.compareTo(FIVE) <= 0 ? FIVE : side1val; side2val =
			 * side2val.compareTo(FIVE) <= 0 ? FIVE : side2val;
			 */
		}

		if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
			valid1 = true;
		if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
			valid2 = true;

		if (-1 == level)
			subRule = SUB_RULE_26_11;

		compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval,
				BigDecimal.valueOf(minMeanlength), mostRestrictiveOccupancy, sideYard2Result, valid2, subRule, rule,
				level);
		compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval,
				BigDecimal.valueOf(maxMeanLength), mostRestrictiveOccupancy, sideYard1Result, valid1, subRule, rule,
				level);
	}

	private Boolean smallIndustrialBuilding(Plan pl, Building building) {
		BigDecimal totalarea = building.getTotalExistingBuiltUpArea() != null
				? building.getTotalExistingBuiltUpArea().add(building.getTotalBuitUpArea())
				: building.getTotalBuitUpArea();
		if (building.getBuildingHeight().compareTo(BigDecimal.valueOf(10)) <= 0
				&& totalarea.compareTo(BigDecimal.valueOf(200)) <= 0) {
			return true;
		}
		return false;
	}

	/*
	 * Building height upto 10 meters
	 */
	private void checkSideYardLessThanTenOrEqualToMts(final Plan pl, SetBack setBack, Building building,
			BigDecimal buildingHeight, String blockName, Integer level, final Plot plot, final double min,
			final double max, double minMeanlength, double maxMeanLength,
			final OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard1Result,
			SideYardResult sideYard2Result) {
		String subRule;
		String rule = SIDE_YARD_DESC;
		Boolean valid2 = false;
		Boolean valid1 = false;
		BigDecimal side2val = SIDEVALUE_ONE;
		BigDecimal side1val = SIDEVALUE_ONE;
		BigDecimal side2Meanval = SIDEVALUE_ZERO;
		BigDecimal side1Meanval = SIDEVALUE_ZERO;
		BigDecimal rearyardMinDist = setBack.getRearYard() == null ? BigDecimal.ZERO
				: setBack.getRearYard().getMinimumDistance();
		final BigDecimal side1Distance = (setBack.getSideYard1() == null) ? BigDecimal.ZERO
				: setBack.getSideYard1().getMinimumDistance();
		final BigDecimal side2Distance = (setBack.getSideYard2() == null) ? BigDecimal.ZERO
				: setBack.getSideYard2().getMinimumDistance();
		if (mostRestrictiveOccupancy.getType().getCode().equals(A1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A4)
				|| mostRestrictiveOccupancy.getType().getCode().equals(A5)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(F3)) {

			// Plot area less than or equal to 125
			if (plot.getArea().compareTo(SITEAREA_125) <= 0) {

				if (mostRestrictiveOccupancy.getType().getCode().equals(A1)
						|| mostRestrictiveOccupancy.getType().getCode().equals(A4)
						|| mostRestrictiveOccupancy.getType().getCode().equals(A5)
						|| mostRestrictiveOccupancy.getType().getCode().equals(F)) {

					if (building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(3)) <= 0) {
						// yes
						subRule = RULE_26_4 + ", " + RULE_50_2;

						if (building.getTotalBuitUpArea().compareTo(BUILDUPAREA_200) <= 0) {
							if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc()
									.equalsIgnoreCase(DcrConstants.YES)
									|| pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(NA)) {
								side2val = SIDEVALUE_SIXTY_CM;
								side1val = SIDEVALUE_SIXTY_CM;
							} else {
								if (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc()
										.equalsIgnoreCase(DcrConstants.YES)
										|| pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc()
												.equalsIgnoreCase(NA)) {
									side2val = SIDEVALUE_SIXTY_CM;
									side1val = SIDEVALUE_SIXTY_CM;
								} else {
									if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) {
										if (pl.getPlanInformation().getNocToAbutSideDesc()
												.equalsIgnoreCase(DcrConstants.YES)) {
											subRule = RULE_26_4_PROVISO5 + ", " + RULE_50_2;
											side2val = SIDEVALUE_ZERO;
											side1val = SIDEVALUE_SIXTY_CM;
										} else {
											subRule = RULE_26_4_PROVISO2 + ", " + RULE_50_2;
											if (rearyardMinDist.compareTo(SIDEVALUE_SIXTY_CM) >= 0) {
												side2val = SIDEVALUE_FIFTY_CM;
												side1val = SIDEVALUE_SIXTY_CM;
											} else {
												side2val = SIDEVALUE_SIXTY_CM;
												side1val = SIDEVALUE_SIXTY_CM;
											}
										}
									} else {
										subRule = RULE_26_4_PROVISO2 + ", " + RULE_50_2;
										if (rearyardMinDist.compareTo(SIDEVALUE_SIXTY_CM) >= 0) {
											side2val = SIDEVALUE_FIFTY_CM;
											side1val = SIDEVALUE_SIXTY_CM;
										} else {
											side2val = SIDEVALUE_SIXTY_CM;
											side1val = SIDEVALUE_SIXTY_CM;
										}
									}
								}
							}
						} else {
							subRule = RULE_26_4 + ", " + RULE_26_4A;
							side2val = SIDEVALUE_ONE;
							side1val = SIDEVALUE_ONE;
						}

					} else {
						subRule = RULE_26_4 + ", " + RULE_26_4A;
						side2val = SIDEVALUE_ONE;
						side1val = SIDEVALUE_ONE;
					}
				} else {
					subRule = RULE_26_4 + ", " + RULE_26_4A;
					side2val = SIDEVALUE_ONE;
					side1val = SIDEVALUE_ONE;
				}
			} else {
				subRule = RULE_26_4;
				// Plot area greater than 125 mts
				if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(DcrConstants.YES)
						|| pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(NA)) {
					side2val = SIDEVALUE_ONE;
					side1val = SIDEVALUE_ONE;
				} else {
					if (pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(DcrConstants.YES)
							|| pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(NA)) {
						subRule = RULE_26_4 + ", " + RULE_26_10_PROVISO2;
						side2val = SIDEVALUE_SIXTY_CM;
						side1val = SIDEVALUE_ONE;
					} else {
						if (buildingHeight.compareTo(BigDecimal.valueOf(7)) <= 0) {
							if (pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(DcrConstants.YES)) {
								subRule = RULE_26_4_PROVISO5;
								side2val = SIDEVALUE_ZERO;
								side1val = SIDEVALUE_ONE;
							} else {
								//If no openings are provided for the Rear yard
						        boolean openingOnRearBelow2mts = pl.getPlanInformation().getOpeningOnRearBelow2mtsDesc().equalsIgnoreCase(DcrConstants.NO);
						        boolean openingOnRearAbove2mts = pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(DcrConstants.NO);
						        boolean nocToAbutRear = pl.getPlanInformation().getNocToAbutRearDesc().equalsIgnoreCase(DcrConstants.NO);
								subRule = RULE_26_4 + ", " + RULE_26_10_PROVISO2;
								if (openingOnRearBelow2mts && openingOnRearAbove2mts && nocToAbutRear) {
									if(side2Distance.compareTo(SIDEVALUE_FIFTY_CM) > 0)
										side2val = SIDEVALUE_FIFTY_CM;
									else
										side2val = SIDEVALUE_SIXTY_CM;
									
								} else if (rearyardMinDist.compareTo(SIDEVALUE_SIXTY_CM) >= 0) {
									side2val = SIDEVALUE_FIFTY_CM;
								} else
									side2val = SIDEVALUE_SIXTY_CM;
								
								side1val = SIDEVALUE_ONE;
							}
						} else {
							if (rearyardMinDist.compareTo(SIDEVALUE_ONE) >= 0) {
								subRule = RULE_26_4_PROVISO2;
								side2val = SIDEVALUE_FIFTY_CM;
								side1val = SIDEVALUE_ONE;
							} else {
								subRule = RULE_26_4;
								side2val = SIDEVALUE_ONE;
								side1val = SIDEVALUE_ONE;
							}
						}
					}
				}

				/*
				 * if (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(
				 * DcrConstants.NO) &&
				 * pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(
				 * DcrConstants.NO) &&
				 * pl.getPlanInformation().getNocToAbutSideDesc().equalsIgnoreCase(DcrConstants.
				 * YES) && building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(2)) <=
				 * 0) { side2val = SIDEVALUE_ZERO; side1val = SIDEVALUE_ONE; side2Meanval =
				 * side2val; side1Meanval = side1val; } else if
				 * (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(
				 * DcrConstants.NO) &&
				 * pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(
				 * DcrConstants.NO) &&
				 * building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(2)) > 0) {
				 * side2val = SIDEVALUE_FIFTY_CM; side1val = SIDEVALUE_ONE; side2Meanval =
				 * side2val; side1Meanval = side1val; } else if
				 * (pl.getPlanInformation().getOpeningOnRearAbove2mtsDesc().equalsIgnoreCase(
				 * DcrConstants.NO) &&
				 * pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(
				 * DcrConstants.NO) &&
				 * building.getFloorsAboveGround().compareTo(BigDecimal.valueOf(2)) > 0) {
				 * side2val = SIDEVALUE_ONE; // check this order side1val = SIDEVALUE_ONE;
				 * side2Meanval = side2val; side1Meanval = side1val; } else if
				 * (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(
				 * DcrConstants.NO) &&
				 * pl.getPlanInformation().getOpeningOnSideAbove2mtsDesc().equalsIgnoreCase(
				 * DcrConstants.NO)) { side2val = SIDEVALUE_FIFTY_CM; side1val = SIDEVALUE_ONE;
				 * side2Meanval = side2val; side1Meanval = side1val; } else if
				 * (pl.getPlanInformation().getOpeningOnSideBelow2mtsDesc().equalsIgnoreCase(NO)
				 * ) { side2val = SIDEVALUE_SIXTY_CM; side1val = SIDEVALUE_ONE; side2Meanval =
				 * side2val; side1Meanval = side1val; } else { side2val = SIDEVALUE_ONE;
				 * side1val = SIDEVALUE_ONE; side2Meanval = side2val; side1Meanval = side1val; }
				 */
			}
			side2Meanval = side2val;
			side1Meanval = side1val;
			if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
				valid1 = true;
			if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
				valid2 = true;

			if (-1 == level)
				subRule = SUB_RULE_26_11;

			compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval,
					BigDecimal.valueOf(minMeanlength), mostRestrictiveOccupancy, sideYard2Result, valid2, subRule, rule,
					level);
			compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval,
					BigDecimal.valueOf(maxMeanLength), mostRestrictiveOccupancy, sideYard1Result, valid1, subRule, rule,
					level);
		} else
			processSideYardForOccupanciesOtherThanA1A2F(pl, building, plot, blockName, level, min, max, minMeanlength,
					maxMeanLength, mostRestrictiveOccupancy, buildingHeight, side2val, side1val, BigDecimal.ZERO, false,
					sideYard1Result, sideYard2Result);
	}

	private void compareSideYard1Result(String blockName, BigDecimal exptDistance, BigDecimal actualDistance,
			BigDecimal expectedMeanDistance, BigDecimal actualMeanDistance,
			OccupancyTypeHelper mostRestrictiveOccupancy, SideYardResult sideYard1Result, Boolean valid, String subRule,
			String rule, Integer level) {
		if (exptDistance.compareTo(sideYard1Result.expectedDistance) >= 0) {
			if (exptDistance.compareTo(sideYard1Result.expectedDistance) == 0) {
				sideYard1Result.rule = sideYard1Result.rule != null ? sideYard1Result.rule + "," + rule : rule;
				sideYard1Result.occupancy = sideYard1Result.occupancy != null
						? sideYard1Result.occupancy + "," + mostRestrictiveOccupancy.getType().getName()
						: mostRestrictiveOccupancy.getType().getName();
				if (expectedMeanDistance.compareTo(sideYard1Result.expectedmeanDistance) >= 0) {
					sideYard1Result.expectedmeanDistance = expectedMeanDistance;
					sideYard1Result.actualMeanDistance = actualMeanDistance;
				}
			} else {
				sideYard1Result.rule = rule;
				sideYard1Result.occupancy = mostRestrictiveOccupancy.getType().getName();
				sideYard1Result.expectedmeanDistance = expectedMeanDistance;
				sideYard1Result.actualMeanDistance = actualMeanDistance;
			}

			sideYard1Result.subRule = subRule;
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
		if (exptDistance.compareTo(sideYard2Result.expectedDistance) >= 0) {
			if (exptDistance.compareTo(sideYard2Result.expectedDistance) == 0) {
				sideYard2Result.rule = sideYard2Result.rule != null ? sideYard2Result.rule + "," + rule : rule;
				sideYard2Result.occupancy = sideYard2Result.occupancy != null
						? sideYard2Result.occupancy + "," + mostRestrictiveOccupancy.getType().getName()
						: mostRestrictiveOccupancy.getType().getName();
				if (expectedMeanDistance.compareTo(sideYard2Result.expectedmeanDistance) >= 0) {
					sideYard2Result.expectedmeanDistance = expectedMeanDistance;
					sideYard2Result.actualMeanDistance = actualMeanDistance;
				}
			} else {
				sideYard2Result.rule = rule;
				sideYard2Result.occupancy = mostRestrictiveOccupancy.getType().getName();
				sideYard2Result.expectedmeanDistance = expectedMeanDistance;
				sideYard2Result.actualMeanDistance = actualMeanDistance;
			}

			sideYard2Result.subRule = subRule;
			sideYard2Result.level = level;
			sideYard2Result.actualDistance = actualDistance;
			sideYard2Result.expectedDistance = exptDistance;
			sideYard2Result.status = valid;
		}
	}

	private void validateSideYardRule(final Plan pl) {

		for (Block block : pl.getBlocks())
			if (!block.getCompletelyExisting()) {
				Boolean sideYardDefined = false;
				for (SetBack setback : block.getSetBacks())
					if (setback.getSideYard1() != null
							&& setback.getSideYard1().getMean().compareTo(BigDecimal.valueOf(0)) > 0)
						sideYardDefined = true;
					else if (setback.getSideYard2() != null
							&& setback.getSideYard2().getMean().compareTo(BigDecimal.valueOf(0)) > 0)
						sideYardDefined = true;
				if (!sideYardDefined) {
					HashMap<String, String> errors = new HashMap<>();
					errors.put(SIDE_YARD_DESC,
							prepareMessage(OBJECTNOTDEFINED, SIDE_YARD_DESC + " for Block " + block.getName()));
					pl.addErrors(errors);
				}
			}

	}

	private void processSideYardForGTTenBldgHghtOccupanciesOtherThanA1A2F(final Plan pl, Building building,
			final Plot plot, String blockName, Integer level, final double min, final double max, double minMeanlength,
			double maxMeanLength, final OccupancyTypeHelper mostRestrictiveOccupancy, final BigDecimal buildingHeight,
			BigDecimal side2val, BigDecimal side1val, final BigDecimal distanceIncrementBasedOnHeight,
			final Boolean checkMinimum5mtsCondition, SideYardResult sideYard1Result, SideYardResult sideYard2Result) {

		Boolean valid2 = false;
		Boolean valid1 = false;

		String subRule = RULE_26_4;
		String rule = SIDE_YARD_DESC;

		BigDecimal side2Meanval = SIDEVALUE_ZERO;
		BigDecimal side1Meanval = SIDEVALUE_ZERO;

		if (mostRestrictiveOccupancy.getType().getCode().equals(B1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(B2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(B3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(C3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(E)
				|| mostRestrictiveOccupancy.getType().getCode().equals(E1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(E2)) {
			side2val = SIDEVALUE_TWO;
			side1val = SIDEVALUE_TWO;
			side2Meanval = SIDEVALUE_TWO;
			side1Meanval = SIDEVALUE_TWO;
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(D)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(D4)) {

			if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_200)) > 0
					&& building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) <= 0) {
				side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
				side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
				side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
				side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);

			} else {
				if (building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_500)) > 0
						&& building.getTotalFloorArea().compareTo(BigDecimal.valueOf(FLOORAREA_800)) <= 0) {
					side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FOUR);
					side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FOUR);
					side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FOUR);
					side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FOUR);

				} else {
					side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
					side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
					side2Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
					side1Meanval = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
				}
			}
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(G1)
						|| mostRestrictiveOccupancy.getType().getCode().equals(G4)
						|| mostRestrictiveOccupancy.getType().getCode().equals(G5)) {
			BigDecimal totalarea = building.getTotalExistingBuiltUpArea() != null
					? building.getTotalExistingBuiltUpArea().add(building.getTotalBuitUpArea())
					: building.getTotalBuitUpArea();
			if (building.getBuildingHeight().compareTo(BigDecimal.valueOf(10)) <= 0
					&& totalarea.compareTo(BigDecimal.valueOf(200)) <= 0)
			{
				side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
				side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
				side2Meanval = side2val;
				side1Meanval = side1val;
			} else {
				side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
				side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
				side2Meanval = side2val;
				side1Meanval = side1val;
			}
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(G2)
				|| mostRestrictiveOccupancy.getType().getCode().equals(G3)) {
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(H)) {
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_TWO);
			side2Meanval = side2val;
			side1Meanval = side1val;
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(I)
				|| mostRestrictiveOccupancy.getType().getCode().equals(I3)
				|| mostRestrictiveOccupancy.getType().getCode().equals(I4)
				|| mostRestrictiveOccupancy.getType().getCode().equals(I5)) {
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVEN_FIVE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_SEVEN_FIVE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(I1)
				|| mostRestrictiveOccupancy.getType().getCode().equals(I2)) {
			subRule = SUB_RULE_47_3;
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_ONE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		}  else if (mostRestrictiveOccupancy.getType().getCode().equals(I6)) {
			subRule = SUB_RULE_47_2;
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_THREE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		} else if (mostRestrictiveOccupancy.getType().getCode().equals(J)) {
			side2val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
			side1val = distanceIncrementBasedOnHeight.add(SIDEVALUE_FIVE);
			side2Meanval = side2val;
			side1Meanval = side1val;
		}

		if (level >= 0 && building.getBuildingHeight().compareTo(BigDecimal.valueOf(16)) > 0) {
			if (side1val.compareTo(FIVE) <= 0) {
				side1val = FIVE;
				side1Meanval = FIVE;
			}
		}

		if (checkMinimum5mtsCondition) {
			// Checking maximum value of both sides and comparing whether that value less
			// than or equal to 5. If yes, then
			// expecting 5mt minimum.
			if (side1val.compareTo(side2val) > 0 && side1val.compareTo(FIVE) <= 0) {
				side1val = FIVE;
				side1Meanval = FIVE;

			} /*
				 * else { if( side2val.compareTo(FIVE) <= 0) { side2val =FIVE; } }
				 */
			/*
			 * side1val = side1val.compareTo(FIVE) <= 0 ? FIVE : side1val; side2val =
			 * side2val.compareTo(FIVE) <= 0 ? FIVE : side2val;
			 */
		}

		if (max >= side1val.doubleValue() && maxMeanLength >= side1Meanval.doubleValue())
			valid1 = true;
		if (min >= side2val.doubleValue() && minMeanlength >= side2Meanval.doubleValue())
			valid2 = true;

		if (-1 == level)
			subRule = SUB_RULE_26_11;

		compareSideYard2Result(blockName, side2val, BigDecimal.valueOf(min), side2Meanval,
				BigDecimal.valueOf(minMeanlength), mostRestrictiveOccupancy, sideYard2Result, valid2, subRule, rule,
				level);
		compareSideYard1Result(blockName, side1val, BigDecimal.valueOf(max), side1Meanval,
				BigDecimal.valueOf(maxMeanLength), mostRestrictiveOccupancy, sideYard1Result, valid1, subRule, rule,
				level);
	}

	@Override
	public Map<String, Date> getAmendments() {
		Map<String, Date> sideYardAmendments = new LinkedHashMap<>();
		sideYardAmendments.put(AMEND_NOV19, AMEND_DATE_081119);
		return sideYardAmendments;
	}

}
