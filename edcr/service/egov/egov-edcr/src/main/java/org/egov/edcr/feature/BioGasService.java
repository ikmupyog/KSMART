package org.egov.edcr.feature;

import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.A5;
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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class BioGasService extends FeatureProcess {

	private static final String SUB_RULE_79_3_DESCRIPTION = "Minimum area of biogas";
	private static final String SUB_RULE_79_3 = "79(3)";
	private static final BigDecimal THREE_HUNDRED = BigDecimal.valueOf(300);
	private static final BigDecimal POINTFIVE = BigDecimal.valueOf(0.5);
	private static final String OBJECT_NOT_DEFINED = "msg.error.mandatory.object1.not.defined";
	private static final String BIO_GAS_AREA_DESC_MULTIPLE = " biogases are having minimum area 0.5 m2";
	private static final String BIO_GAS_AREA_DESC_SINGLE = " biogas is having minimum area 0.5 m2";

	private static final String BIO_DEG_WASTE_AREA_DESC_MULTIPLE = " In-situ Waste management system as stipulated by Pollution Control Board are having minimum area 0.5 m2";
	private static final String BIO_DEG_WASTE_AREA_DESC_SINGLE = " In-situ Waste management system as stipulated by Pollution Control Board is having minimum area 0.5 m2";
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
	@Override
	public Plan validate(Plan pl) {
		List<String> occupancyTypes = pl.getOccupancies().stream().map(occ -> occ.getTypeHelper().getType().getCode())
				.collect(Collectors.toList());
		HashMap<String, String> errors = new HashMap<>();
		if ((occupancyTypes.contains(A1) || occupancyTypes.contains(A4) || occupancyTypes.contains(A5))
				&& pl.getVirtualBuilding().getTotalBuitUpArea() != null
				&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(THREE_HUNDRED) > 0) {
			if (pl.getUtility().getBioGases().isEmpty() || (!pl.getUtility().getBioGases().isEmpty()
					&& pl.getUtility().getBioGases().get(0).getBiogas().isEmpty())) {
				errors.put(SUB_RULE_79_3, getLocaleMessage(OBJECT_NOT_DEFINED, "Biogas"));
				pl.addErrors(errors);
			}
		} else {
			if (pl.getUtility().getBioGases().isEmpty() || (!pl.getUtility().getBioGases().isEmpty()
					&& pl.getUtility().getBioGases().get(0).getBioDegWaste().isEmpty())) {
				errors.put(SUB_RULE_79_3, getLocaleMessage(OBJECT_NOT_DEFINED,
						"In-situ Waste management system as stipulated by Pollution Control Board"));
				pl.addErrors(errors);
			}
		}
		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		List<String> occupancyTypes = pl.getOccupancies().stream().map(occ -> occ.getTypeHelper().getType().getCode())
				.collect(Collectors.toList());
		boolean exempted = false;
		if ((occupancyTypes.contains(A1) || occupancyTypes.contains(A4) || occupancyTypes.contains(A5))
				&& pl.getVirtualBuilding().getTotalBuitUpArea() != null
				&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(THREE_HUNDRED) <= 0)
			exempted = true;
		if (!exempted) {
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
			if (occupancyTypes.contains(A1) || occupancyTypes.contains(A4) || occupancyTypes.contains(A5)) {
				if (!pl.getUtility().getBioGases().isEmpty() && !pl.getUtility().getBioGases().isEmpty()
						&& !pl.getUtility().getBioGases().get(0).getBiogas().isEmpty()) {
					List<BigDecimal> collect = pl.getUtility().getBioGases().get(0).getBiogas().stream()
							.filter(bioGas -> Util.roundOffTwoDecimal(bioGas.getArea()).compareTo(POINTFIVE) >= 0)
							.map(bioGas -> bioGas.getArea()).collect(Collectors.toList());

					if (!collect.isEmpty()) {
						setReportOutputDetails(pl, subRule, subRuleDesc, POINTFIVE.toString() + IN_METER_SQR,
								collect.size() == 1 ? collect.size() + BIO_GAS_AREA_DESC_SINGLE
										: collect.size() + BIO_GAS_AREA_DESC_MULTIPLE,
								Result.Accepted.getResultVal());
					} else {
						setReportOutputDetails(pl, subRule, subRuleDesc, POINTFIVE.toString() + IN_METER_SQR,
								collect.size() + BIO_GAS_AREA_DESC_SINGLE, Result.Not_Accepted.getResultVal());
					}
				}

			} else {
				if (!pl.getUtility().getBioGases().isEmpty() && !pl.getUtility().getBioGases().isEmpty()
						&& !pl.getUtility().getBioGases().get(0).getBioDegWaste().isEmpty()) {
					List<BigDecimal> collect = pl.getUtility().getBioGases().get(0).getBioDegWaste().stream()
							.filter(bioGas -> Util.roundOffTwoDecimal(bioGas.getArea()).compareTo(POINTFIVE) >= 0)
							.map(bioGas -> bioGas.getArea()).collect(Collectors.toList());

					if (!collect.isEmpty()) {
						setReportOutputDetails(pl, subRule, subRuleDesc, POINTFIVE.toString() + IN_METER_SQR,
								collect.size() == 1 ? collect.size() + BIO_DEG_WASTE_AREA_DESC_SINGLE
										: collect.size() + BIO_DEG_WASTE_AREA_DESC_MULTIPLE,
								Result.Accepted.getResultVal());
					} else {
						setReportOutputDetails(pl, subRule, subRuleDesc, POINTFIVE.toString() + IN_METER_SQR,
								collect.size() + BIO_DEG_WASTE_AREA_DESC_SINGLE, Result.Not_Accepted.getResultVal());
					}
				}
			}
		}
			
		return pl;
	}

	private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected, String actual,
			String status) {
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
		return bioGasAmend;
	}

}
