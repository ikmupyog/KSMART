package org.egov.edcr.feature;

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;
import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.utility.DcrConstants.*;
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
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.utility.Util;
import org.springframework.stereotype.Service;

@Service
public class BioGasService extends FeatureProcess {

	private static final String SUB_RULE_79_3_DESCRIPTION = "Minimum area of biogas";
	private static final String SUB_RULE_79_3 = "79(3)";
	private static final BigDecimal THREE_HUNDRED = BigDecimal.valueOf(300);
	private static final BigDecimal POINTFIVE = BigDecimal.valueOf(0.5);
	private static final String OBJECT_NOT_DEFINED = "msg.error.mandatory.object1.not.defined";
	private static final String BIO_GAS_AREA_DESC_MULTIPLE = " biogases are having minimum area 0.5 m2";
	private static final String BIO_GAS_AREA_DESC_SINGLE = " biogas is having minimum area 0.5 m2";

	@Override
	public Plan validate(Plan pl) {
		List<String> occupancyTypes = pl.getVirtualBuilding().getOccupancyTypes().stream()
				.map(occ -> occ.getType().getCode()).collect(Collectors.toList());
		if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate())) && occupancyTypes.size() == 1
				&& occupancyTypes.contains(A1)) {
			HashMap<String, String> errors = new HashMap<>();
			if (pl.getVirtualBuilding().getTotalBuitUpArea() != null
					&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(THREE_HUNDRED) > 0
					&& pl.getVirtualBuilding().getResidentialBuilding()) {
				if (pl.getUtility().getBioGases().isEmpty()) {
					errors.put(SUB_RULE_79_3, getLocaleMessage(OBJECT_NOT_DEFINED, "Biogas"));
					pl.addErrors(errors);
				}
			}
		}
		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		List<String> occupancyTypes = pl.getVirtualBuilding().getOccupancyTypes().stream()
				.map(occ -> occ.getType().getCode()).collect(Collectors.toList());
		if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate())) && occupancyTypes.size() == 1
				&& occupancyTypes.contains(A1)) {
			validate(pl);
			scrutinyDetail = new ScrutinyDetail();
			scrutinyDetail.addColumnHeading(1, RULE_NO);
			scrutinyDetail.addColumnHeading(2, DESCRIPTION);
			scrutinyDetail.addColumnHeading(3, REQUIRED);
			scrutinyDetail.addColumnHeading(4, PROVIDED);
			scrutinyDetail.addColumnHeading(5, STATUS);
			scrutinyDetail.setKey("Common_Biogas");
			String subRule = SUB_RULE_79_3;
			String subRuleDesc = SUB_RULE_79_3_DESCRIPTION;
			pl.getFeatureAmendments().put("Biogas", AMEND_DATE_081119.toString());
			if (pl.getVirtualBuilding().getTotalBuitUpArea() != null
					&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(THREE_HUNDRED) > 0
					&& pl.getVirtualBuilding().getResidentialBuilding()) {
				if (!pl.getUtility().getBioGases().isEmpty()) {
					List<BigDecimal> collect = pl.getUtility().getBioGases().stream()
							.filter(bioGas -> Util.roundOffTwoDecimal(bioGas.getArea()).compareTo(POINTFIVE) >= 0)
							.map(bioGas -> bioGas.getArea()).collect(Collectors.toList());

					if (!collect.isEmpty()) {
						setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc,
								POINTFIVE.toString() + IN_METER_SQR,
								collect.size() == 1 ? collect.size() + BIO_GAS_AREA_DESC_SINGLE
										: collect.size() + BIO_GAS_AREA_DESC_MULTIPLE,
								Result.Accepted.getResultVal());
					} else {
						setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc,
								POINTFIVE.toString() + IN_METER_SQR, collect.size() + BIO_GAS_AREA_DESC_SINGLE,
								Result.Not_Accepted.getResultVal());
					}
				}
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
		Map<String, Date> bioGasAmend = new ConcurrentHashMap<>();
		bioGasAmend.put(AMEND_NOV19, AMEND_DATE_081119);
		return bioGasAmend;
	}

}
