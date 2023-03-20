import React from "react"
import { useFetchCitizenBillsForBuissnessService } from "../payment"

const useDeathFetchBill = ({params, config}) => {
    return useFetchCitizenBillsForBuissnessService({ businessService: "CR", ...params },{
        ...config,
        select: (data) => {
            const {Bill: _data} = data
            return _data.map(i => ({
                TL_COMMON_BILL_NUMBER: i.billNumber,
                TL_COMMON_TOTAL_AMOUNT: i.totalAmount,
                TL_COMMON_PAYER_NAME: i.payerName,
                TL_COMMON_CONSUMER_CODE: i.consumerCode,
                raw: { ...i, DeathACKNo: i.consumerCode }
            }))
        }
    })
}

export default useDeathFetchBill