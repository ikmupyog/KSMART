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

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Ramp;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.Util;
import org.springframework.stereotype.Service;

@Service
public class CommonFeature extends FeatureProcess {

	private static final String FLOOR = "Floor";
	private static final String SUBRULE_48_3_DESC = "Minimum number of lifts";
	private static final String SUBRULE_48_3 = "48(3)";
	private static final String SUBRULE_40A_3 = "40A(3)";
	private static final String REMARKS = "Remarks";

	@Override
	public Plan validate(Plan pl) {
		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		if (pl != null && !pl.getBlocks().isEmpty())
			blk: for (Block block : pl.getBlocks()) {
				scrutinyDetail = new ScrutinyDetail();
				scrutinyDetail.addColumnHeading(1, RULE_NO);
				scrutinyDetail.addColumnHeading(2, FLOOR);
				scrutinyDetail.addColumnHeading(3, REQUIRED);
				scrutinyDetail.addColumnHeading(4, PROVIDED);
				scrutinyDetail.addColumnHeading(5, STATUS);
				scrutinyDetail.addColumnHeading(6, REMARKS);
				scrutinyDetail.setSubHeading(SUBRULE_48_3_DESC);
				scrutinyDetail.setKey("Block_" + block.getNumber() + "_" + "Ramp/Lift defined on each floor");
				if (block.getBuilding() != null && !block.getBuilding().getOccupancies().isEmpty()
						&& block.getBuilding().getFloorsAboveGround() != null
						&& block.getBuilding().getFloorsAboveGround().compareTo(BigDecimal.valueOf(1)) > 0) {
					if (Util.checkExemptionConditionForBuildingParts(block))
						continue blk;
					if (!block.getBuilding().getFloors().isEmpty())
						for (Floor floor : block.getBuilding().getFloors())
							if (!floor.getTerrace()) {
								boolean isTypicalRepititiveFloor = false;
								Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor,
										isTypicalRepititiveFloor);
								String value = typicalFloorValues.get("typicalFloors") != null
										? (String) typicalFloorValues.get("typicalFloors")
										: " floor " + floor.getNumber();
								List<OccupancyTypeHelper> occupancyTypeList = block.getBuilding().getOccupancies()
										.stream().map(occupancy -> occupancy.getTypeHelper())
										.collect(Collectors.toList());
								occ: for (OccupancyTypeHelper occupancyType : occupancyTypeList)
									if (occupancyType.getType().getCode().equals(A4) && block.getBuilding() != null
											&& block.getBuilding().getTotalBuitUpArea() != null && block.getBuilding()
													.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(2500)) > 0) {
										Boolean flagRampFloor = checkRampDefinedOrNot(floor);
										if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor"))
											if (flagRampFloor.equals(Boolean.FALSE) && !floor.getLifts().isEmpty()) {
												processRule48_3_Accepted(block, floor, pl, value);
												break occ;
											} else if (flagRampFloor.equals(Boolean.FALSE)
													&& floor.getLifts().isEmpty()) {
												processRule48_3_NotAccepted(block, floor, pl, value);
												break occ;
											}
									} else if ((occupancyType.getType().getCode().equals(A2)
											|| occupancyType.getType().getCode().equals(A3)
											|| occupancyType.getType().getCode().equals(B1)
											|| occupancyType.getType().getCode().equals(B2)
											|| occupancyType.getType().getCode().equals(B3)
											|| occupancyType.getType().getCode().equals(C)
											|| occupancyType.getType().getCode().equals(C1)
											|| occupancyType.getType().getCode().equals(C2)
											|| occupancyType.getType().getCode().equals(C3)
											|| occupancyType.getType().getCode().equals(D)
											|| occupancyType.getType().getCode().equals(D1)
											|| occupancyType.getType().getCode().equals(D2)
											|| occupancyType.getType().getCode().equals(E)
											|| occupancyType.getType().getCode().equals(F)
											|| occupancyType.getType().getCode().equals(F1)
											|| occupancyType.getType().getCode().equals(F2)
											|| occupancyType.getType().getCode().equals(F3))
											&& block.getBuilding() != null
											&& block.getBuilding().getTotalBuitUpArea() != null && block.getBuilding()
													.getTotalBuitUpArea().compareTo(BigDecimal.valueOf(1000)) > 0) {
										Boolean flagRampFloor = checkRampDefinedOrNot(floor);
										if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor"))
											if (flagRampFloor.equals(Boolean.FALSE) && !floor.getLifts().isEmpty()) {
												processRule48_3_Accepted(block, floor, pl, value);
												break occ;
											} else if (flagRampFloor.equals(Boolean.FALSE)
													&& floor.getLifts().isEmpty()) {
												processRule48_3_NotAccepted(block, floor, pl, value);
												break occ;
											}
									}
							}
				}
			}
		return pl;
	}

	private void processRule48_3_NotAccepted(Block block, Floor floor, Plan pl, String value) {
		setReportOutputDetails(pl, SUBRULE_48_3 + ", " + SUBRULE_40A_3, value, String.valueOf(1), String.valueOf(0),
				Result.Not_Accepted.getResultVal(),
				"Lift required as ramp with maximum slope of 0.1 not defined on this floor");
	}

	private void processRule48_3_Accepted(Block block, Floor floor, Plan pl, String value) {
		setReportOutputDetails(pl, SUBRULE_48_3 + ", " + SUBRULE_40A_3, value, String.valueOf(1),
				String.valueOf(floor.getLifts().size()), Result.Accepted.getResultVal(),
				"Lift required as ramp with maximum slope of 0.1 not defined on this floor");
	}

	private Boolean checkRampDefinedOrNot(Floor floor) {
		Boolean flagRampFloor = false;
		if (!floor.getRamps().isEmpty())
			for (Ramp ramp : floor.getRamps())
				if (ramp.getSlope() != null && ramp.getSlope().compareTo(BigDecimal.valueOf(0.1)) <= 0) {
					flagRampFloor = true;
					break;
				}
		return flagRampFloor;
	}

	private void setReportOutputDetails(Plan plan, String ruleNo, String floor, String expected, String actual,
			String status, String remarks) {
		Map<String, String> details = new HashMap<>();
		details.put(RULE_NO, ruleNo);
		details.put(FLOOR, floor);
		details.put(REQUIRED, expected);
		details.put(PROVIDED, actual);
		details.put(STATUS, status);
		details.put(REMARKS, remarks);
		scrutinyDetail.getDetail().add(details);
		plan.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
	}

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
}
