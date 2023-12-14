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

import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.B1;
import static org.egov.edcr.constants.DxfFileConstants.B2;
import static org.egov.edcr.constants.DxfFileConstants.B3;
import static org.egov.edcr.constants.DxfFileConstants.D1;
import static org.egov.edcr.constants.DxfFileConstants.D4;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.G5;
import static org.egov.edcr.utility.DcrConstants.OBJECTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED_DESC;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class InBuiltSolutions extends FeatureProcess {

	private static final String RULE_41A = "41A";
	private static final String RULE_41A_DESC = " In-Building Solutions ";

	@Override
	public Plan validate(Plan pl) {
		for (Block block : pl.getBlocks()) {
			if (!checkExemption(pl, block))
				if (block != null && block.getInBuiltSolutuons().isEmpty()) {
					HashMap<String, String> errors = new HashMap<>();
					errors.put("Block_" + block.getNumber() + "_In-Building Solutions", edcrMessageSource.getMessage(OBJECTNOTDEFINED,
							new String[] { RULE_41A_DESC + "in the block " + block.getNumber() }, LocaleContextHolder.getLocale()));
					pl.addErrors(errors);
				}
		}
		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		validate(pl);
		for (Block block : pl.getBlocks()) {
			if (!checkExemption(pl, block)) {
				ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
				scrutinyDetail.setKey("Block_" + block.getNumber() + "_In-Building Solutions");
				scrutinyDetail.addColumnHeading(1, RULE_NO);
				scrutinyDetail.addColumnHeading(2, DESCRIPTION);
				scrutinyDetail.addColumnHeading(3, REQUIRED);
				scrutinyDetail.addColumnHeading(4, PROVIDED);
				scrutinyDetail.addColumnHeading(5, STATUS);
				processInbuiltSolutions(pl, block, scrutinyDetail);
			}
		}
		return pl;
	}

	private boolean checkExemption(Plan pl, Block block) {
		List<String> occupancies = block.getBuilding().getOccupancies().stream().map(occ -> occ.getTypeHelper().getType().getCode())
				.collect(Collectors.toList());
		double builtupArea = block.getBuilding().getTotalBuitUpArea().doubleValue();
		double flrCount = block.getBuilding().getFloorsAboveGround() == null ? 0 : block.getBuilding().getFloorsAboveGround().doubleValue();
		double bldgHght = block.getBuilding().getBuildingHeight().doubleValue();
		boolean exmpted = false;
		if (!occupancies.isEmpty()) {
			if ((occupancies.contains(A1) || occupancies.contains(A4))
					&& (builtupArea <= 300 || flrCount <= 2 || bldgHght < 7)) {
				exmpted = true;
			} else if ((occupancies.contains(A2) || occupancies.contains(B1) || occupancies.contains(B2)
					|| occupancies.contains(B3)) && builtupArea <= 200) {
				exmpted = true;
			} else if ((occupancies.contains(D1) || occupancies.contains(D4) || occupancies.contains(F)
					|| occupancies.contains(F1) || occupancies.contains(F2)|| occupancies.contains(G5)) && builtupArea <= 100) {
				exmpted = true;
			}
		}

		return exmpted;
	}
	
	private void processInbuiltSolutions(Plan pl, Block block, ScrutinyDetail scrutinyDetail ) {
		if (!block.getInBuiltSolutuons().isEmpty()) {
			setReportOutputDetails(pl, RULE_41A, RULE_41A_DESC, "Mandatory", OBJECTDEFINED_DESC, Result.Accepted.getResultVal(), scrutinyDetail);
			return;
		} else {
			setReportOutputDetails(pl, RULE_41A, RULE_41A_DESC, "Mandatory", OBJECTNOTDEFINED_DESC,
					Result.Not_Accepted.getResultVal(), scrutinyDetail);
			return;
		}
	}

    private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected, String actual,
            String status, ScrutinyDetail scrutinyDetail) {
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
		return new LinkedHashMap<>();
	}

}
