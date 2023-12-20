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

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.DcrConstants;
import org.springframework.context.annotation.Scope;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class AdditionalFeature extends FeatureProcess {
    private static final Logger LOG = LogManager.getLogger(AdditionalFeature.class);

    private static final String SUB_RULE_23_4 = "23(4)";
    private static final String SUB_RULE_23_4_DESCRIPTION = " Plot present in CRZ Zone";
    private static final String SUB_RULE_32_3 = "32(3)";
    private static final String RULE_61 = "61";
    private static final String RULE_50_2 = "50(2)";

    private static final String SUB_RULE_32_3_DESCRIPTION = "Security zone ";
    private static final BigDecimal ten = BigDecimal.valueOf(10);

    private static final String PLOT_BOUNDARY_AREA_GREATER = "Area of plot boundary %s m² defined in PLOT_BOUNDARY layer is greater than the plot area %s m² defined in the PLAN_INFO layer.";

	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();


    @Override
    public Plan validate(Plan pl) {
        HashMap<String, String> errors = new HashMap<>();

        List<Block> blocks = pl.getBlocks();

        for (Block block : blocks) {
            if (block.getBuilding() != null) {
                if (block.getBuilding().getBuildingHeight().compareTo(BigDecimal.ZERO) == 0) {
                    errors.put(String.format(DcrConstants.BLOCK_BUILDING_HEIGHT, block.getNumber()),
                            edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
                                    new String[] {
                                            String.format(DcrConstants.BLOCK_BUILDING_HEIGHT, block.getNumber()) },
                                    LocaleContextHolder.getLocale()));
                    pl.addErrors(errors);
                }
            }
        }

        /*
         * if (Plan.getPlot() != null && Plan.getPlot().getPlotBndryArea() != null && Plan.getPlanInformation().getPlotArea() !=
         * null){ BigDecimal plotBndryArea = Plan.getPlot().getPlotBndryArea().setScale(0, RoundingMode.UP); BigDecimal plotArea =
         * Plan.getPlanInformation().getPlotArea().setScale(0, RoundingMode.UP); if (plotBndryArea.compareTo(plotArea) > 0)
         * Plan.addError( "plot boundary greater", String.format(PLOT_BOUNDARY_AREA_GREATER, Plan.getPlot().getPlotBndryArea(),
         * Plan.getPlanInformation().getPlotArea())); }
         */
        return pl;
    }

    @Override
    public Plan process(Plan pl) {
        validate(pl);
        validateSmallPlot(pl);
        rule23_4(pl);

        rule32_3(pl);

        return pl;
    }

    private void rule32_3(Plan pl) {

        if (pl.getPlanInformation().getSecurityZone()) {

            List<Block> blocks = pl.getBlocks();

            for (Block block : blocks) {
                if (block.getBuilding().getBuildingHeight().compareTo(BigDecimal.ZERO) > 0) {
                    if (block.getBuilding().getBuildingHeight().compareTo(ten) <= 0) { // TODO: LATER CHECK MAXIMUM HEIGHT OF
                                                                                     // BUILDING
                        // FROM FLOOR
                    	//TODO: The scrutiny details need to add into scrutiny report
						/*
						 * pl.reportOutput.add(buildRuleOutputWithSubRule(DcrConstants.RULE32,
						 * SUB_RULE_32_3, (SUB_RULE_32_3_DESCRIPTION + " for block " +
						 * block.getNumber()), DcrConstants.SECURITY_ZONE, null, null, Result.Verify,
						 * DcrConstants.SECURITY_ZONE + DcrConstants.OBJECTDEFINED_DESC));
						 */
                    } else {
                        /*pl.reportOutput.add(buildRuleOutputWithSubRule(DcrConstants.RULE32, SUB_RULE_32_3,
                                (SUB_RULE_32_3_DESCRIPTION + " for block" + block.getNumber()),
                                DcrConstants.SECURITY_ZONE, ten.toString() + DcrConstants.IN_METER,
                                block.getBuilding().getBuildingHeight() + DcrConstants.IN_METER,
                                Result.Not_Accepted, null));*/
                    }
                }
            }
        }

    }

    private void rule23_4(Plan planDetail) {
		/*
		 * if (planDetail.getPlanInformation().getCrzZoneArea()) planDetail.reportOutput
		 * .add(buildRuleOutputWithSubRule(DcrConstants.RULE23, SUB_RULE_23_4,
		 * SUB_RULE_23_4_DESCRIPTION, DcrConstants.CRZZONE, null, null, Result.Verify,
		 * DcrConstants.CRZZONE + DcrConstants.OBJECTDEFINED_DESC));
		 */
    }

    private void validateSmallPlot(Plan pl) {
        for (Block block : pl.getBlocks()) {
            if (pl.getPlot() != null && pl.getPlot().getSmallPlot() && block != null && block.getBuilding() != null
                    && block.getResidentialOrCommercialBuilding()) {
                boolean isAccepted;
				ScrutinyDetail scrutinyDetail = getNewScrutinyDetail(
						"Block_" + block.getNumber() + "_" + "Number of Floors Allowed");
                if (block.getBuilding().getFloorsAboveGround().doubleValue() > 3)
                    isAccepted = false;
                else
                    isAccepted = true;
                String ruleNo;
                if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
					ruleNo = RULE_50_2;
					pl.getFeatureAmendments().put("Number of Floors Allowed", AMEND_DATE_081119.toString());
				}
                else
                    ruleNo = RULE_61;
                Map<String, String> details = new HashMap<>();
                details.put(RULE_NO, ruleNo);
                details.put(DESCRIPTION, DcrConstants.SMALL_PLOT_VIOLATION);
                details.put(REQUIRED, "<= 3");
                details.put(PROVIDED, String.valueOf(block.getBuilding().getFloorsAboveGround()));
                details.put(STATUS, isAccepted ? Result.Accepted.getResultVal() : Result.Not_Accepted.getResultVal());
                scrutinyDetail.getDetail().add(details);
                pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
            }
        }
    }

    private ScrutinyDetail getNewScrutinyDetail(String key) {
        ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);
        scrutinyDetail.setKey(key);
        return scrutinyDetail;
    }

    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> additionalFeatureAmendments = new ConcurrentHashMap<>();
        additionalFeatureAmendments.put(AMEND_NOV19, AMEND_DATE_081119);
        return additionalFeatureAmendments;
    }

}
