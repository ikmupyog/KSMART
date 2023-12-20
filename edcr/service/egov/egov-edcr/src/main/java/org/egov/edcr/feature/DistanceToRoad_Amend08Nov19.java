package org.egov.edcr.feature;

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;
import static org.egov.edcr.constants.DxfFileConstants.I;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.constants.DxfFileConstants.I3;
import static org.egov.edcr.constants.DxfFileConstants.I4;
import static org.egov.edcr.constants.DxfFileConstants.I5;
import static org.egov.edcr.constants.DxfFileConstants.I6;
import static org.egov.edcr.utility.DcrConstants.CULDESAC_ROAD;
import static org.egov.edcr.utility.DcrConstants.CULD_SAC_SHORTESTDISTINCTTOROAD;
import static org.egov.edcr.utility.DcrConstants.LANE_ROAD;
import static org.egov.edcr.utility.DcrConstants.LANE_SHORTESTDISTINCTTOROAD;
import static org.egov.edcr.utility.DcrConstants.NONNOTIFIED_SHORTESTDISTINCTTOROAD;
import static org.egov.edcr.utility.DcrConstants.NOTIFIED_ROAD;
import static org.egov.edcr.utility.DcrConstants.NOTIFIED_SHORTESTDISTINCTTOROAD;
import static org.egov.edcr.utility.DcrConstants.UNNOTIFIED_ROAD;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.CulDeSacRoad;
import org.egov.common.entity.edcr.Lane;
import org.egov.common.entity.edcr.NonNotifiedRoad;
import org.egov.common.entity.edcr.NotifiedRoad;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class DistanceToRoad_Amend08Nov19 extends GeneralRule {
    private static final String SUB_RULE_23_2_PROVISIO_DESC = "Distance from building to street boundary";
    private static final String SUB_RULE_23_1_DESCRIPTION = "Prohibition for constructions abutting public roads.";
    private static final String SUB_RULE_62_1DESCRIPTION = "Minimum distance between plot boundary and abutting Street.";
    private static final String SUB_RULE_AMD19_23_2 = "23(2)";
    private static final String SUB_RULE_AMD19_23_2_PROVISIO = "23(2) Provisio";
    private static BigDecimal THREE = BigDecimal.valueOf(3);
    private static BigDecimal SEVEN = BigDecimal.valueOf(7);
    private static BigDecimal TWO = BigDecimal.valueOf(2);
    private static BigDecimal ONEPOINTFIVE = BigDecimal.valueOf(1.5);
    private static final String RULE_EXPECTED_KEY = "meanofaccess.expected";
    private static final String RULE_ACTUAL_KEY = "meanofaccess.actual";
    private static final String SUB_RULE_47_4 = "47(4)";

    @Override
    public Plan validate(Plan pl) {
        HashMap<String, String> errors = new HashMap<>();

        boolean shortestDistanceDefined = false;

        if ((pl.getNotifiedRoads().isEmpty() && pl.getCuldeSacRoads().isEmpty() && pl.getLaneRoads().isEmpty() &&
                pl.getNonNotifiedRoads().isEmpty())) {
            errors.put(DcrConstants.ROAD,
                    prepareMessage(DcrConstants.OBJECTNOTDEFINED, DcrConstants.ROAD));
            pl.addErrors(errors);
        }

        if (!pl.getNotifiedRoads().isEmpty())
            for (NotifiedRoad notifiedRoad : pl.getNotifiedRoads()) {
                for (BigDecimal shortestDistanceToRoad : notifiedRoad.getShortestDistanceToRoad()) {
                    if (shortestDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                        shortestDistanceDefined = true;
                        continue;
                    }
                }
            }
        if (!pl.getNonNotifiedRoads().isEmpty())
            for (NonNotifiedRoad nonNotifiedRoad : pl.getNonNotifiedRoads()) {
                for (BigDecimal shortestDistanceToRoad : nonNotifiedRoad.getShortestDistanceToRoad())
                    if (shortestDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                        shortestDistanceDefined = true;
                        continue;
                    }
            }
        if (!pl.getLaneRoads().isEmpty())
            for (Lane laneRoad : pl.getLaneRoads()) {
                for (BigDecimal shortestDistanceToRoad : laneRoad.getShortestDistanceToRoad())
                    if (shortestDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                        shortestDistanceDefined = true;
                        continue;
                    }
            }
        if (!pl.getCuldeSacRoads().isEmpty())
            for (CulDeSacRoad culdSac : pl.getCuldeSacRoads()) {
                for (BigDecimal shortestDistanceToRoad : culdSac.getShortestDistanceToRoad())
                    if (shortestDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                        shortestDistanceDefined = true;
                        continue;

                    }
            }

        if (!shortestDistanceDefined) {
            errors.put(DcrConstants.SHORTESTDISTINCTTOROAD, prepareMessage(DcrConstants.OBJECTNOTDEFINED,
                    DcrConstants.SHORTESTDISTINCTTOROAD));
            pl.addErrors(errors);
        }
        return pl;
    }

    @Override
    public Plan process(Plan pl) {

        validate(pl);
        BigDecimal exptectedDistance;

        scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.setKey("Common_Distance to Road");
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);

        BigDecimal minimumHeightOfBuilding = BigDecimal.ZERO;
        for (Block block : pl.getBlocks()) {
            if (minimumHeightOfBuilding.compareTo(BigDecimal.ZERO) == 0 ||
                    block.getBuilding().getBuildingHeight().compareTo(minimumHeightOfBuilding) < 0) {
                minimumHeightOfBuilding = block.getBuilding().getBuildingHeight();
            }
        }
        List<String> occupancyCodes = pl.getOccupancies().stream().map(occ -> occ.getTypeHelper().getType().getCode()).collect(Collectors.toList());
		if (!occupancyCodes.isEmpty() && occupancyCodes.contains(I) || occupancyCodes.contains(I1)
				|| occupancyCodes.contains(I2) || occupancyCodes.contains(I3) || occupancyCodes.contains(I4)
				|| occupancyCodes.contains(I5) || occupancyCodes.contains(I6)) {
			exptectedDistance = THREE;

			if (pl.getNotifiedRoads() != null && pl.getNotifiedRoads().get(0).getShortestDistanceToRoad() != null) {
				checkBuildingDistanceFromRoad(pl, exptectedDistance,
						pl.getNotifiedRoads().get(0).getShortestDistanceToRoad(), NOTIFIED_SHORTESTDISTINCTTOROAD,
						SUB_RULE_47_4, SUB_RULE_47_4, NOTIFIED_ROAD + SUB_RULE_23_1_DESCRIPTION);
			}

			if ((pl.getNonNotifiedRoads() != null
					&& pl.getNotifiedRoads().get(0).getShortestDistanceToRoad() != null)) {
				checkBuildingDistanceFromRoad(pl, exptectedDistance,
						pl.getNonNotifiedRoads().get(0).getShortestDistanceToRoad(), NONNOTIFIED_SHORTESTDISTINCTTOROAD,
						SUB_RULE_47_4, SUB_RULE_47_4, UNNOTIFIED_ROAD + SUB_RULE_23_2_PROVISIO_DESC);
			}

			if ((pl.getCuldeSacRoads() != null && pl.getCuldeSacRoads().get(0).getShortestDistanceToRoad() != null)
					|| (pl.getLaneRoads() != null && pl.getLaneRoads().get(0).getShortestDistanceToRoad() != null)) {
				checkBuildingDistanceFromRoad(pl, exptectedDistance,
						pl.getCuldeSacRoads().get(0).getShortestDistanceToRoad(), CULD_SAC_SHORTESTDISTINCTTOROAD,
						SUB_RULE_47_4, SUB_RULE_47_4, CULDESAC_ROAD + SUB_RULE_23_2_PROVISIO_DESC);
			}
			if ((pl.getLaneRoads() != null && pl.getLaneRoads().get(0).getShortestDistanceToRoad() != null)) {
				checkBuildingDistanceFromRoad(pl, exptectedDistance,
						pl.getLaneRoads().get(0).getShortestDistanceToRoad(), LANE_SHORTESTDISTINCTTOROAD,
						SUB_RULE_47_4, SUB_RULE_47_4, LANE_ROAD + SUB_RULE_23_2_PROVISIO_DESC);
			}
		} else {
			// validating minimum distance in notified roads minimum 3m
	        if (pl.getNotifiedRoads() != null && !pl.getNotifiedRoads().isEmpty()) {

	            exptectedDistance = THREE;

	            if (pl.getNotifiedRoads().get(0).getShortestDistanceToRoad() != null
	                    && !pl.getNotifiedRoads().get(0).getShortestDistanceToRoad().isEmpty()) {

	                checkBuildingDistanceFromRoad(pl, exptectedDistance,
	                        pl.getNotifiedRoads().get(0).getShortestDistanceToRoad(),
	                        NOTIFIED_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2, SUB_RULE_AMD19_23_2,
	                        NOTIFIED_ROAD + SUB_RULE_23_1_DESCRIPTION);

	            }
	        }
	        // validating minimum distance in non-notified roads minimum 2m
	        if (pl.getNonNotifiedRoads() != null && !pl.getNonNotifiedRoads().isEmpty()) {
	            exptectedDistance = TWO;

	            if (pl.getNonNotifiedRoads().get(0).getShortestDistanceToRoad() != null &&
	                    !pl.getNonNotifiedRoads().get(0).getShortestDistanceToRoad().isEmpty()) {

	                if (Util.isSmallPlot(pl)) {
	                    checkBuildingDistanceFromRoad(pl, exptectedDistance,
	                            pl.getNonNotifiedRoads().get(0).getShortestDistanceToRoad(),
	                            NONNOTIFIED_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2, SUB_RULE_AMD19_23_2,
	                            UNNOTIFIED_ROAD + SUB_RULE_23_2_PROVISIO_DESC);
	                } else
	                    checkBuildingDistanceFromRoad(pl, exptectedDistance,
	                            pl.getNonNotifiedRoads().get(0).getShortestDistanceToRoad(),
	                            NONNOTIFIED_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2, SUB_RULE_AMD19_23_2,
	                            UNNOTIFIED_ROAD + SUB_RULE_23_2_PROVISIO_DESC);

	            }
	        }
	        // validating minimum distance in culd_sac_road minimum 2 or 3 based on height of building
	        if (pl.getCuldeSacRoads() != null && !pl.getCuldeSacRoads().isEmpty()) {
	            if (Util.isSmallPlot(pl)) {
	            	if (minimumHeightOfBuilding.compareTo(SEVEN) <= 0)
	                    exptectedDistance = TWO;
	                else
	                    exptectedDistance = THREE; 
	            } else {
	                if (minimumHeightOfBuilding.compareTo(SEVEN) <= 0)
	                    exptectedDistance = TWO;
	                else
	                    exptectedDistance = THREE;
	            }
	            if (pl.getCuldeSacRoads().get(0).getShortestDistanceToRoad() != null
	                    && !pl.getCuldeSacRoads().get(0).getShortestDistanceToRoad().isEmpty())
	                checkBuildingDistanceFromRoad(pl, exptectedDistance,
	                        pl.getCuldeSacRoads().get(0).getShortestDistanceToRoad(),
	                        CULD_SAC_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2_PROVISIO, SUB_RULE_AMD19_23_2_PROVISIO,
	                        CULDESAC_ROAD + SUB_RULE_23_2_PROVISIO_DESC);

	        }

	        // validating minimum distance in culd_sac_road minimum 1.5 or 3 based on height of building
	        if (pl.getLaneRoads() != null && !pl.getLaneRoads().isEmpty()) {
	            if (Util.isSmallPlot(pl)) {
	            	 if (minimumHeightOfBuilding.compareTo(SEVEN) <= 0)
	                     exptectedDistance = ONEPOINTFIVE;
	                 else
	                     exptectedDistance = THREE; 
	            } else {
	                if (minimumHeightOfBuilding.compareTo(SEVEN) <= 0)
	                    exptectedDistance = ONEPOINTFIVE;
	                else
	                    exptectedDistance = THREE;
	            }
	            if (pl.getLaneRoads().get(0).getShortestDistanceToRoad() != null
	                    && !pl.getLaneRoads().get(0).getShortestDistanceToRoad().isEmpty())
	                checkBuildingDistanceFromRoad(pl, exptectedDistance,
	                        pl.getLaneRoads().get(0).getShortestDistanceToRoad(),
	                        LANE_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2_PROVISIO, SUB_RULE_AMD19_23_2_PROVISIO,
	                        LANE_ROAD + SUB_RULE_23_2_PROVISIO_DESC);

	        }
		}
        
        return pl;

    }

    private void checkBuildingDistanceFromRoad(Plan planDetail, BigDecimal exptectedDistance,
            List<BigDecimal> roadDistances, String fieldVerified, String subRule, String rule, String subRuleDesc) {

        for (BigDecimal minimumDistance : roadDistances) {
            String expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, exptectedDistance.toString());
            String actualResult = getLocaleMessage(RULE_ACTUAL_KEY, minimumDistance.toString());
            // compare minimum road distance with minimum expected value.
            if (exptectedDistance.compareTo(minimumDistance) > 0) {
                Map<String, String> details = new HashMap<>();
                details.put(RULE_NO, subRule);
                details.put(DESCRIPTION, subRuleDesc);
                details.put(REQUIRED, expectedResult);
                details.put(PROVIDED, actualResult);
                details.put(STATUS, Result.Not_Accepted.getResultVal());
                scrutinyDetail.getDetail().add(details);
                planDetail.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

            } else {
                Map<String, String> details = new HashMap<>();
                details.put(RULE_NO, subRule);
                details.put(DESCRIPTION, subRuleDesc);
                details.put(REQUIRED, expectedResult);
                details.put(PROVIDED, actualResult);
                details.put(STATUS, Result.Accepted.getResultVal());
                scrutinyDetail.getDetail().add(details);
                planDetail.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
            }

        }
    }

    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> meanofAccessAmendments = new ConcurrentHashMap<>();
        meanofAccessAmendments.put(AMEND_NOV19, AMEND_DATE_081119);
        return meanofAccessAmendments;
    }
}
