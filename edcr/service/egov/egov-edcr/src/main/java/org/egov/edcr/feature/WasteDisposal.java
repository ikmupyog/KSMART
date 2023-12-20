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

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_011020;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY;
import static org.egov.edcr.utility.DcrConstants.IN_METER;
import static org.egov.edcr.utility.DcrConstants.OBJECTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.WASTE_DISPOSAL_DISTANCE_FROMBOUNDARY;
import static org.egov.edcr.utility.DcrConstants.WASTE_DISPOSAL_ERROR_COLOUR_CODE_DISTANCE_FROMBOUNDARY;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.RoadOutput;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.DcrConstants;
import org.springframework.context.annotation.Scope;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class WasteDisposal extends FeatureProcess {
	private static final String SUB_RULE_26A_DESCRIPTION = "Provisions for segregation of waste";
	private static final String RULE_AMD19_79_1_WD = "79(1)";
	private static final String WD_DISTANCE_RULE_AMD19_79_4 = "79(4)";
	private static final String SUB_RULE_104_4_PLOT_DESCRIPTION_WD = "Minimum distance from waste treatment facility like: leach pit,soak pit etc to nearest point on the plot boundary";
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

	@Override
	public Plan validate(Plan pl) {
		
		/*
		 * HashMap<String, String> errors = new HashMap<>(); // waste disposal defined
		 * or not if (pl != null && pl.getUtility() != null) { if
		 * (pl.getUtility().getLiquidWasteTreatementPlant().isEmpty()) { if
		 * (pl.getUtility().getWasteDisposalUnits().isEmpty()) {
		 * errors.put(SUB_RULE_26A_DESCRIPTION,
		 * edcrMessageSource.getMessage(OBJECTNOTDEFINED_DESC, new String[] {
		 * SUB_RULE_26A_DESCRIPTION }, LocaleContextHolder.getLocale()));q
		 * pl.addErrors(errors); } } }
		 */
		 
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
		scrutinyDetail.setKey("Common_Waste Disposal");
		String subRule = RULE_AMD19_79_1_WD;
		String description = SUB_RULE_26A_DESCRIPTION;
		if (pl.getUtility().getLiquidWasteTreatementPlant().isEmpty()) {
			if (!pl.getUtility().getWasteDisposalUnits().isEmpty()) {
				setReportOutputDetailsWithoutOccupancy(pl, subRule, description, "", OBJECTDEFINED_DESC,
						Result.Accepted.getResultVal());

				if (!pl.getUtility().getWasteDisposalUnits().isEmpty()) {
					boolean isProposed = pl.getUtility().getWasteDisposalUnits().stream()
							.anyMatch(wasteDisposal -> wasteDisposal.getType().equalsIgnoreCase(DcrConstants.PROPOSED));
					boolean isExisting = pl.getUtility().getWasteDisposalUnits().stream()
							.anyMatch(wasteDisposal -> wasteDisposal.getType().equalsIgnoreCase(DcrConstants.EXISTING));
					if (isProposed || isExisting) {
						printOutputForProposedWasteDisposal(pl);
					}
				}

			} else {
				setReportOutputDetailsWithoutOccupancy(pl, subRule, description, "", OBJECTNOTDEFINED_DESC,
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

	private void printOutputForProposedWasteDisposal(Plan pl) {
		String subRule;
		String subRuleDesc;
		boolean valid = false;
		List<RoadOutput> leachPitToBndryList = new ArrayList<>();
		BigDecimal minimumDistance;

		for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
			if (checkConditionForLeachPitToBoundary(roadOutput)) {
				leachPitToBndryList.add(roadOutput);
			}
		}

		if (!leachPitToBndryList.isEmpty()) {
			minimumDistance = BigDecimal.valueOf(1.2);
			subRule = WD_DISTANCE_RULE_AMD19_79_4;
			pl.getFeatureAmendments().put("Leach pit to boundary", AMEND_DATE_011020.toString());
			if (pl.getVirtualBuilding().getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0)
				minimumDistance = BigDecimal.valueOf(0.3);
			subRuleDesc = SUB_RULE_104_4_PLOT_DESCRIPTION_WD;

			RoadOutput roadOutput = leachPitToBndryList.stream()
					.min(Comparator.comparing(leachToBndry -> leachToBndry.distance)).orElse(null);

			printReportOutput(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
		} else {
			HashMap<String, String> errors = new HashMap<>();
			errors.put(WASTE_DISPOSAL_DISTANCE_FROMBOUNDARY + "not defined ",
					edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
							new String[] { "Distance from the plot boundary to waste disposal" },
							LocaleContextHolder.getLocale()));
			pl.addErrors(errors);
		}
	}

	private void printReportOutput(Plan pl, String subRule, String subRuleDesc, boolean valid, RoadOutput roadOutput,
			BigDecimal minimumDistance) {
		HashMap<String, String> errors = new HashMap<>();
		if (minimumDistance.compareTo(BigDecimal.ZERO) == 0) {
			errors.put(WASTE_DISPOSAL_DISTANCE_FROMBOUNDARY,
					getLocaleMessage(WASTE_DISPOSAL_ERROR_COLOUR_CODE_DISTANCE_FROMBOUNDARY,
							roadOutput.distance != null ? roadOutput.distance.toString() : ""));
			pl.addErrors(errors);
		} else {
			if (roadOutput.distance != null && roadOutput.distance.compareTo(BigDecimal.ZERO) > 0
					&& roadOutput.distance.compareTo(minimumDistance) >= 0)
				valid = true;
			if (valid) {
				setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc, minimumDistance.toString() + IN_METER,
						roadOutput.distance + IN_METER, Result.Accepted.getResultVal());
			} else {
				setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc, minimumDistance.toString() + IN_METER,
						roadOutput.distance + IN_METER, Result.Not_Accepted.getResultVal());
			}
		}

	}

	private boolean checkConditionForLeachPitToBoundary(RoadOutput roadOutput) {
		return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY);
	}

	@Override
	public Map<String, Date> getAmendments() {
		Map<String, Date> meanofAccessAmendments = new LinkedHashMap<>();
		return meanofAccessAmendments;
	}
}
