package org.egov.edcr.feature;

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;
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
import org.springframework.stereotype.Service;

@Service
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
    public Plan process(Plan planDetail) {

        validate(planDetail);
        BigDecimal exptectedDistance;

        scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.setKey("Common_Distance to Road");
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);

        BigDecimal minimumHeightOfBuilding = BigDecimal.ZERO;
        for (Block block : planDetail.getBlocks()) {
            if (minimumHeightOfBuilding.compareTo(BigDecimal.ZERO) == 0 ||
                    block.getBuilding().getBuildingHeight().compareTo(minimumHeightOfBuilding) < 0) {
                minimumHeightOfBuilding = block.getBuilding().getBuildingHeight();
            }
        }

        // validating minimum distance in notified roads minimum 3m
        if (planDetail.getNotifiedRoads() != null && !planDetail.getNotifiedRoads().isEmpty()) {

            exptectedDistance = THREE;

            if (planDetail.getNotifiedRoads().get(0).getShortestDistanceToRoad() != null
                    && !planDetail.getNotifiedRoads().get(0).getShortestDistanceToRoad().isEmpty()) {

                checkBuildingDistanceFromRoad(planDetail, exptectedDistance,
                        planDetail.getNotifiedRoads().get(0).getShortestDistanceToRoad(),
                        NOTIFIED_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2, SUB_RULE_AMD19_23_2,
                        NOTIFIED_ROAD + SUB_RULE_23_1_DESCRIPTION);

            }
        }
        // validating minimum distance in non-notified roads minimum 2m
        if (planDetail.getNonNotifiedRoads() != null && !planDetail.getNonNotifiedRoads().isEmpty()) {
            exptectedDistance = TWO;

            if (planDetail.getNonNotifiedRoads().get(0).getShortestDistanceToRoad() != null &&
                    !planDetail.getNonNotifiedRoads().get(0).getShortestDistanceToRoad().isEmpty()) {

                if (Util.isSmallPlot(planDetail)) {
                    checkBuildingDistanceFromRoad(planDetail, exptectedDistance,
                            planDetail.getNonNotifiedRoads().get(0).getShortestDistanceToRoad(),
                            NONNOTIFIED_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2, SUB_RULE_AMD19_23_2,
                            UNNOTIFIED_ROAD + SUB_RULE_23_2_PROVISIO_DESC);
                } else
                    checkBuildingDistanceFromRoad(planDetail, exptectedDistance,
                            planDetail.getNonNotifiedRoads().get(0).getShortestDistanceToRoad(),
                            NONNOTIFIED_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2, SUB_RULE_AMD19_23_2,
                            UNNOTIFIED_ROAD + SUB_RULE_23_2_PROVISIO_DESC);

            }
        }
        // validating minimum distance in culd_sac_road minimum 2 or 3 based on height of building
        if (planDetail.getCuldeSacRoads() != null && !planDetail.getCuldeSacRoads().isEmpty()) {
            if (Util.isSmallPlot(planDetail)) {
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
            if (planDetail.getCuldeSacRoads().get(0).getShortestDistanceToRoad() != null
                    && !planDetail.getCuldeSacRoads().get(0).getShortestDistanceToRoad().isEmpty())
                checkBuildingDistanceFromRoad(planDetail, exptectedDistance,
                        planDetail.getCuldeSacRoads().get(0).getShortestDistanceToRoad(),
                        CULD_SAC_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2_PROVISIO, SUB_RULE_AMD19_23_2_PROVISIO,
                        CULDESAC_ROAD + SUB_RULE_23_2_PROVISIO_DESC);

        }

        // validating minimum distance in culd_sac_road minimum 1.5 or 3 based on height of building
        if (planDetail.getLaneRoads() != null && !planDetail.getLaneRoads().isEmpty()) {
            if (Util.isSmallPlot(planDetail)) {
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
            if (planDetail.getLaneRoads().get(0).getShortestDistanceToRoad() != null
                    && !planDetail.getLaneRoads().get(0).getShortestDistanceToRoad().isEmpty())
                checkBuildingDistanceFromRoad(planDetail, exptectedDistance,
                        planDetail.getLaneRoads().get(0).getShortestDistanceToRoad(),
                        LANE_SHORTESTDISTINCTTOROAD, SUB_RULE_AMD19_23_2_PROVISIO, SUB_RULE_AMD19_23_2_PROVISIO,
                        LANE_ROAD + SUB_RULE_23_2_PROVISIO_DESC);

        }

        return planDetail;

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
