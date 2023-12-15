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

import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PetrolFillingStation extends FeatureProcess {
	private static final String SUBRULE_47 = "47";
	private static final String SUBRULE_47_DESC = "The distance between kiosk/sales office, toilet block";
	private static final String SUBRULE_47_2 = "47(2)";
	private static final String SUBRULE_47_2_DESC = "Radius of Dispensing Unit";
	@Override
	public Plan validate(Plan pl) {
		HashMap<String, String> errors = new HashMap<>();
		if (pl.getCanopy().getKioskDistances().isEmpty()) {
			errors.put(SUBRULE_47_DESC, edcrMessageSource.getMessage(OBJECTNOTDEFINED,
					new String[] { SUBRULE_47_DESC }, LocaleContextHolder.getLocale()));
			pl.addErrors(errors);
		}
		
		if (pl.getCanopy().getDispensingUnits().isEmpty()) {
			errors.put(SUBRULE_47_2_DESC, edcrMessageSource.getMessage(OBJECTNOTDEFINED,
					new String[] { SUBRULE_47_2_DESC }, LocaleContextHolder.getLocale()));
			pl.addErrors(errors);
		}
		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		if (pl != null && !pl.getOccupancies().isEmpty()) {
			List<String> occupancyTpes = pl.getOccupancies().stream()
					.map(occ -> occ.getTypeHelper().getType().getCode()).collect(Collectors.toList());
			if(occupancyTpes.contains(I1) || occupancyTpes.contains(I2)) {
				validate(pl);
				scrutinyDetail = new ScrutinyDetail();
				scrutinyDetail.setKey("Common_Automobile Fuel Filling Station");
				scrutinyDetail.addColumnHeading(1, RULE_NO);
				scrutinyDetail.addColumnHeading(2, DESCRIPTION);
				scrutinyDetail.addColumnHeading(3, REQUIRED);
				scrutinyDetail.addColumnHeading(4, PROVIDED);
				scrutinyDetail.addColumnHeading(5, STATUS);
				if(pl.getCanopy() != null && !pl.getCanopy().getKioskDistances().isEmpty()) {
					int failedCount=0;
					for(BigDecimal dis : pl.getCanopy().getKioskDistances()) {
						if(dis.doubleValue() < 1)
							failedCount++;
					}
					if(failedCount > 0)
						setReportOutputDetails(pl, SUBRULE_47, SUBRULE_47_DESC, "Minimum Dimension >= 1", failedCount +" Out of "+pl.getCanopy().getKioskDistances().size()+" are not having minimum dimension", Result.Not_Accepted.getResultVal());
					else
						setReportOutputDetails(pl, SUBRULE_47, SUBRULE_47_DESC, "Minimum Dimension >= 1", pl.getCanopy().getKioskDistances().size()+" are having minimum dimension", Result.Not_Accepted.getResultVal());
				}
				
				if(pl.getCanopy() != null && !pl.getCanopy().getDispensingUnits().isEmpty()) {
					int failedCount=0;
					for(BigDecimal dis : pl.getCanopy().getDispensingUnits()) {
						if(dis.doubleValue() < 1)
							failedCount++;
					}
					if(failedCount > 0)
						setReportOutputDetails(pl, SUBRULE_47_2, SUBRULE_47_2_DESC, "Minimum Dimension >= 7.5", failedCount +" Out of "+pl.getCanopy().getDispensingUnits().size()+" are not having minimum dimension", Result.Not_Accepted.getResultVal());
					else
						setReportOutputDetails(pl, SUBRULE_47_2, SUBRULE_47_2_DESC, "Minimum Dimension >= 7.5", pl.getCanopy().getDispensingUnits().size()+" are having minimum dimension", Result.Not_Accepted.getResultVal());
				}
			}
			/*
			 * if (occupancyTpes.contains(F3) && occupancyTpes.contains(I2) &&
			 * pl.getCanopy() != null) { //BigDecimal minimumCanopyDistanceFromPlotBoundary
			 * = pl.getCanopyDistanceFromPlotBoundary().get(0); for (BigDecimal
			 * canopyDistanceFromPlotBoundary : pl.getCanopyDistanceFromPlotBoundary()) { if
			 * (canopyDistanceFromPlotBoundary.compareTo(
			 * minimumCanopyDistanceFromPlotBoundary) < 0) {
			 * minimumCanopyDistanceFromPlotBoundary = canopyDistanceFromPlotBoundary; } }
			 * minimumCanopyDistanceFromPlotBoundary = BigDecimal
			 * .valueOf(Math.round(minimumCanopyDistanceFromPlotBoundary.doubleValue() *
			 * Double.valueOf(100)) / Double.valueOf(100)); if
			 * (minimumCanopyDistanceFromPlotBoundary.compareTo(BigDecimal.valueOf(3)) >= 0)
			 * { valid = true; } if (valid) { setReportOutputDetails(pl, SUBRULE_59_10,
			 * SUBRULE_59_10_DESC, String.valueOf(3),
			 * minimumCanopyDistanceFromPlotBoundary.toString(),
			 * Result.Accepted.getResultVal()); } else { setReportOutputDetails(pl,
			 * SUBRULE_59_10, SUBRULE_59_10_DESC, String.valueOf(3),
			 * minimumCanopyDistanceFromPlotBoundary.toString(),
			 * Result.Not_Accepted.getResultVal()); } }
			 */
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
		return new LinkedHashMap<>();
	}
}
