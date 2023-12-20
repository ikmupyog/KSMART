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

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.DcrConstants;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class DepthCuttingService extends FeatureProcess {
    private static final String SUBRULE_11_A_DESC = "Maximum depth of cutting from ground level";
    private static final String RULE_AMD19_10 = "10";
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

	@Override
	public Plan validate(Plan pl) {
		return pl;
	}

	@Override
    public Plan process(Plan pl) {
        boolean valid = false;
        scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.setKey("Common_Depth Cutting");
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);
		if (pl.getPlanInformation() != null && pl.getPlanInformation().getDepthHeightCutting() != null
				&& pl.getPlanInformation().getDepthHeightCutting().equals(DcrConstants.YES)) {
			scrutinyDetail.setRemarks("Documents as per KMBR rule 10, shall be submitted along with the application");
		}
		if (pl.getPlanInformation() != null && pl.getPlanInformation().getDepthCutting() != null
				&& pl.getPlanInformation().getDepthCuttingDesc().equals(DcrConstants.YES)) {
			String ruleNo = RULE_AMD19_10;
			if (!pl.getPlanInformation().getDepthCutting()) {
				valid = true;
			}
			if (valid) {
				setReportOutputDetails(pl, ruleNo, SUBRULE_11_A_DESC,
						BigDecimal.valueOf(1.5).toString() + DcrConstants.IN_METER,
						"Less Than Or Equal To 1.5" + DcrConstants.IN_METER, Result.Accepted.getResultVal());
			} else {
				setReportOutputDetails(pl, ruleNo, SUBRULE_11_A_DESC,
						BigDecimal.valueOf(1.5).toString() + DcrConstants.IN_METER,
						"More Than 1.5" + DcrConstants.IN_METER, Result.Verify.getResultVal());
			}
		}

        return pl;
    }

	private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDescription, String expected, String actual,
			String status) {
		Map<String, String> details = new HashMap<>();
		details.put(RULE_NO, ruleNo);
		details.put(DESCRIPTION, ruleDescription);
		details.put(REQUIRED, expected);
		details.put(PROVIDED, actual);
		details.put(STATUS, status);
		scrutinyDetail.getDetail().add(details);
		pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
	}

	@Override
	public Map<String, Date> getAmendments() {
        Map<String, Date> meanofAccessAmendments = new ConcurrentHashMap<>();
        return meanofAccessAmendments;
    }
}
