package org.egov.edcr.constants;

import java.util.Date;

import org.egov.infra.utils.DateUtils;

public class AmendmentConstants {

    public static final Date AMEND_DATE_081119 = DateUtils.toDateUsingDefaultPattern("08/11/2019");

    public static final String AMEND_NOV19 = "amendment08Nov19";
    
    public static final Date AMEND_DATE_011020 = DateUtils.toDateUsingDefaultPattern("02/10/2020");

    public static final String AMEND_OCT20 = "amendment02Oct20";
    
    public static final Date AMEND_DATE_010923 = DateUtils.toDateUsingDefaultPattern("01/09/2023");

    public static final String AMEND_SEP23 = "amendment01Sep23";

    /*
     * In production, plans scrutiny submission allowed till 09/11/19, but rules amendment effective from 08/11/19
     * So on 8th and 9th which are all scrutinized but not submitted application for permit, those also we should not allow
     * for permit. They have to scrutinize with new rules and then need to submit for permit.
     * So during permit application submission validation we are using below date for the validation purpose.
     */
    public static final Date PREVENT_APPLNS_DATE = DateUtils.toDateUsingDefaultPattern("09/11/2019");
}
