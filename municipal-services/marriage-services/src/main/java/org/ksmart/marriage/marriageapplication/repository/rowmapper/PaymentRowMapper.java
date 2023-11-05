package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriagecommon.model.common.CommonPay;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface PaymentRowMapper {
    default CommonPay getPaymentDetails (ResultSet rs) throws SQLException {

        return CommonPay.builder()
                .amount(rs.getBigDecimal("MD_amount"))
                .paymentTransactionId(rs.getString("MD_payment_transaction_id"))
                .build();
    }
    }
