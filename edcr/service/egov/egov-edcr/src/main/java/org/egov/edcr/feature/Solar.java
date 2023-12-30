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

import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.C;
import static org.egov.edcr.constants.DxfFileConstants.C1;
import static org.egov.edcr.constants.DxfFileConstants.C2;
import static org.egov.edcr.constants.DxfFileConstants.C3;
import static org.egov.edcr.constants.DxfFileConstants.D3;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.utility.DcrConstants.OBJECTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.SOLAR_SYSTEM;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.annotation.Scope;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class Solar extends FeatureProcess {
	private static final String SUB_RULE_AMD_77 = "77";
	private static final String SUB_RULE_AMD_78 = "78";
	private static final String SUB_RULE_AMD_77_78_DESCRIPTION = "Solar assisted water heating system and Solar Energy installations";
	private static final BigDecimal FOURHUNDRED = BigDecimal.valueOf(400);
	private static final BigDecimal FIVEHUNDRED = BigDecimal.valueOf(500);
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

	@Override
	public Plan validate(Plan pl) {
		HashMap<String, String> errors = new HashMap<>();
		if (pl != null && pl.getUtility() != null) {
			// solar water heating defined or not
			if (!pl.getOccupancies().isEmpty()) {
				for (Occupancy occupancy : pl.getOccupancies()) {
					String occCode = occupancy.getTypeHelper().getType().getCode();
					BigDecimal builtupArea = occupancy.getBuiltUpArea();
					if (pl.getVirtualBuilding().getSingleOrDualFamilyResidential()
							&& builtupArea != null && builtupArea.compareTo(FOURHUNDRED) > 0
							&& pl.getUtility().getSolar().isEmpty()) {
						errors.put(SOLAR_SYSTEM, edcrMessageSource.getMessage(OBJECTNOTDEFINED,
								new String[] { SOLAR_SYSTEM }, LocaleContextHolder.getLocale()));
						pl.addErrors(errors);
						break;
					} else if ((occCode.equals(A4) || occCode.equals(A2) || occCode.equals(F3) || occCode.equals(A3)
							|| occCode.equals(C) || occCode.equals(C1) || occCode.equals(C2) || occCode.equals(C3)
							|| occCode.equals(D3)) && builtupArea != null && builtupArea.compareTo(FIVEHUNDRED) > 0
							&& pl.getUtility().getSolar().isEmpty()) {
						errors.put(SOLAR_SYSTEM, edcrMessageSource.getMessage(OBJECTNOTDEFINED,
								new String[] { SOLAR_SYSTEM }, LocaleContextHolder.getLocale()));
						pl.addErrors(errors);
						break;
					}
				}
			}
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
		scrutinyDetail.setKey("Common_Solar");
		String subRule = SUB_RULE_AMD_77 + ", " + SUB_RULE_AMD_78;
		String subRuleDesc = SUB_RULE_AMD_77_78_DESCRIPTION;
		if (!pl.getOccupancies().isEmpty()) {
			for (Occupancy occupancy : pl.getOccupancies()) {
				String occCode = occupancy.getTypeHelper().getType().getCode();
				BigDecimal builtupArea = occupancy.getBuiltUpArea();
				if (pl.getVirtualBuilding().getSingleOrDualFamilyResidential() 
						&& pl.getVirtualBuilding().getTotalBuitUpArea() != null
						&& builtupArea.compareTo(FOURHUNDRED) > 0) {
					processSolar(pl, subRule, subRuleDesc);
					break;
				} else if ((occCode.equals(A4) || occCode.equals(A2) || occCode.equals(F3) || occCode.equals(A3)
						|| occCode.equals(C) || occCode.equals(C1) || occCode.equals(C2) || occCode.equals(C3)
						|| occCode.equals(D3)) && builtupArea != null && builtupArea.compareTo(FIVEHUNDRED) > 0) {
					processSolar(pl, subRule, subRuleDesc);
					break;
				}
			}
		}
		return pl;
	}

	private void processSolar(Plan pl, String subRule, String subRuleDesc) {
		processSloarArea(pl);
		if (!pl.getUtility().getSolar().isEmpty()) {
			setReportOutputDetails(pl, subRule, subRuleDesc, "", OBJECTDEFINED_DESC,
					Result.Accepted.getResultVal());
			return;
		} else {
			setReportOutputDetails(pl, subRule, subRuleDesc, "", OBJECTNOTDEFINED_DESC,
					Result.Not_Accepted.getResultVal());
			return;
		}
	}

	private void processSloarArea(Plan pl) {
		if(pl.getVirtualBuilding().getTotalCoverageArea() != null && !pl.getUtility().getSolar().isEmpty()) {
			String subRule = SUB_RULE_AMD_77 + ", " + SUB_RULE_AMD_78;
			String subRuleDesc = SUB_RULE_AMD_77_78_DESCRIPTION;
			BigDecimal solarArea = pl.getUtility().getSolar().stream().map(Measurement::getArea)
					.collect(Collectors.toList()).stream().reduce(BigDecimal.ZERO, (a, b) -> a.add(b));
			BigDecimal coveredArea = pl.getVirtualBuilding().getTotalCoverageArea();
			BigDecimal requiredArea = coveredArea.multiply(BigDecimal.valueOf(0.005)).setScale(2, RoundingMode.HALF_UP);
			if(solarArea.compareTo(requiredArea) >= 0) {
				setReportOutputDetails(pl, subRule, subRuleDesc, String.valueOf(requiredArea), String.valueOf(solarArea),
						Result.Accepted.getResultVal());
			} else {
				setReportOutputDetails(pl, subRule, subRuleDesc, String.valueOf(requiredArea), String.valueOf(solarArea),
						Result.Not_Accepted.getResultVal());
			}
		}
	}
	
	private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected,
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
		Map<String, Date> solarAmendments = new ConcurrentHashMap<>();
		return solarAmendments;
	}
}
