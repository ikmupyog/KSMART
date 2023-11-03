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
import static org.egov.edcr.utility.DcrConstants.IN_METER_SQR;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.Util;
import org.springframework.stereotype.Service;

@Service
public class SepticTank extends FeatureProcess {

    private static final String SUB_RULE_79_2_DESCRIPTION = "Minimum area of septic tank";
    private static final String SUB_RULE_79_2 = "79(2)";
    private static final BigDecimal HUNDRED = BigDecimal.valueOf(100);
    private static final BigDecimal ONE_POINTFIVE = BigDecimal.valueOf(1.5);
    private static final String OBJECT_NOT_DEFINED = "msg.error.mandatory.object1.not.defined";
    private static final String SEPTIC_TANK_AREA_DESC_MULTIPLE = " septic tanks are having minimum area 1.5 m2";
    private static final String SEPTIC_TANK_AREA_DESC_SINGLE = " septic tank is having minimum area 1.5 m2";

	@Override
	public Plan validate(Plan pl) {
		HashMap<String, String> errors = new HashMap<>();
        if (pl.getVirtualBuilding().getTotalBuitUpArea() != null
                && pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(HUNDRED) > 0
                && pl.getSepticTanks().isEmpty()) {
            errors.put(SUB_RULE_79_2, getLocaleMessage(OBJECT_NOT_DEFINED, "Septic tank"));
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
            List<BigDecimal> collect = pl.getSepticTanks().stream().filter(
                    septicTank -> Util.roundOffTwoDecimal(septicTank.getArea()).compareTo(ONE_POINTFIVE) >= 0)
                    .map(org.egov.common.entity.edcr.SepticTank::getArea).collect(Collectors.toList());

            if (!collect.isEmpty()) {
                setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc,
                        ONE_POINTFIVE.toString() + IN_METER_SQR,
                        collect.size() == 1 ? collect.size() + SEPTIC_TANK_AREA_DESC_SINGLE
                                : collect.size() + SEPTIC_TANK_AREA_DESC_MULTIPLE,
                        Result.Accepted.getResultVal());
            } else {
                setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc,
                        ONE_POINTFIVE.toString() + IN_METER_SQR, collect.size() + SEPTIC_TANK_AREA_DESC_SINGLE,
                        Result.Not_Accepted.getResultVal());
            }
        }
    

        return pl;
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
