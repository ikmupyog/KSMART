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
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_SEPTICTANK_TO_PLOT_BNDRY;
import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.utility.DcrConstants.IN_METER_SQR;
import static org.egov.edcr.utility.DcrConstants.OBJECTDEFINED_DESC;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.RoadOutput;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class SepticTank extends FeatureProcess {

    private static final String SEPTIC_TANK = "Septic tank";
	private static final String SUB_RULE_79_2_DESCRIPTION = "Minimum area of septic tank";
    private static final String SUB_RULE_79_2 = "79(2)";
    private static final BigDecimal HUNDRED = BigDecimal.valueOf(100);
    private static final BigDecimal ONE_POINTFIVE = BigDecimal.valueOf(1.5);
    private static final String OBJECT_NOT_DEFINED = "msg.error.mandatory.object1.not.defined";
    private static final String SEPTIC_TANK_AREA_DESC_MULTIPLE = " septic tanks are having minimum area 1.5 m2";
    private static final String SEPTIC_TANK_AREA_DESC_SINGLE = "The area provided for the septic tank is insufficient";
    private static final String SUB_RULE_AMD19_75_2II = "75(2(ii))";
    private static final String SUB_RULE_AMD20_79_4 = "79(4)";
    private static final BigDecimal DIST_1_POINT_2 = BigDecimal.valueOf(1.2);
    private static final BigDecimal DIST_30_CM = BigDecimal.valueOf(0.3);
    private static final String SUB_RULE_75_2II_DESC_SEPTIC = "Minimum distance from %s septic tank to nearest point on the plot boundary";
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();


	@Override
	public Plan validate(Plan pl) {
		HashMap<String, String> errors = new HashMap<>();
        if (pl.getVirtualBuilding().getTotalBuitUpArea() != null
                && pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(HUNDRED) > 0
                && pl.getSepticTanks().isEmpty()) {
            errors.put(SUB_RULE_79_2, getLocaleMessage(OBJECT_NOT_DEFINED, SEPTIC_TANK));
            pl.addErrors(errors);
        }
        return pl;
    }

	@Override
	public Plan process(Plan pl) {
        validate(pl);
        scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);
        scrutinyDetail.setKey("Common_Septic Tank");
        String subRule = SUB_RULE_79_2;
        String subRuleDesc = SUB_RULE_79_2_DESCRIPTION;
        pl.getFeatureAmendments().put("Septic Tank", AMEND_DATE_081119.toString());
        if (pl.getVirtualBuilding().getTotalBuitUpArea() != null
                && pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(HUNDRED) > 0
                && !pl.getSepticTanks().isEmpty()) {
        	setReportOutputDetailsWithoutOccupancy(pl, subRule, SEPTIC_TANK, "", OBJECTDEFINED_DESC,
					Result.Accepted.getResultVal());
        	List<String> septicTankType = pl.getSepticTanks().stream().map(org.egov.common.entity.edcr.SepticTank::getType).collect(Collectors.toList());
            boolean proposedSeptic = false;
            if (!septicTankType.isEmpty() && septicTankType.get(0) != null) {
                proposedSeptic = septicTankType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.PROPOSED));
            }
        	if(proposedSeptic)
	            for (RoadOutput roadOutput : pl.getUtility().getWellDistance())
		            if (checkConditionForSepticTankToBoundary(roadOutput)) {
		                String ruleNo = SUB_RULE_AMD20_79_4;
		                BigDecimal minDistance = DIST_1_POINT_2;
						if (pl.getVirtualBuilding().getMostRestrictiveFarHelper().getType().getCode().equals(A1)
								&& pl.getVirtualBuilding().getSingleFamilyResidential())
	                        minDistance = DIST_30_CM;
		                String status;
		                if (roadOutput.distance != null &&
		                        roadOutput.distance.compareTo(BigDecimal.ZERO) > 0
		                        && roadOutput.distance.compareTo(minDistance) >= 0)
		                	status = Result.Accepted.getResultVal();
		                else 
		                	status = Result.Not_Accepted.getResultVal();
		                setReportOutputDetailsWithoutOccupancy(pl, ruleNo,
		                        String.format(SUB_RULE_75_2II_DESC_SEPTIC, DcrConstants.PROPOSED), String.valueOf(minDistance),
		                        String.valueOf(roadOutput.distance), status);
		            }
            List<BigDecimal> collect = pl.getSepticTanks().stream().filter(
                    septicTank -> Util.roundOffTwoDecimal(septicTank.getArea()).compareTo(ONE_POINTFIVE) >= 0)
                    .map(org.egov.common.entity.edcr.SepticTank::getArea).collect(Collectors.toList());

            if (collect.isEmpty()) {
            	setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc,
                        ONE_POINTFIVE.toString() + IN_METER_SQR, SEPTIC_TANK_AREA_DESC_SINGLE,
                        Result.Not_Accepted.getResultVal());
            }
        }
    

        return pl;
    }

	private boolean checkConditionForSepticTankToBoundary(RoadOutput roadOutput) {
		return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_SEPTICTANK_TO_PLOT_BNDRY);
	}
    private void setReportOutputDetailsWithoutOccupancy(Plan pl, String ruleNo, String ruleDesc, String expected,
            String actual, String status) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

	@Override
	public Map<String, Date> getAmendments() {
        Map<String, Date> septicTankAmend = new ConcurrentHashMap<>();
        return septicTankAmend;
    }

}
