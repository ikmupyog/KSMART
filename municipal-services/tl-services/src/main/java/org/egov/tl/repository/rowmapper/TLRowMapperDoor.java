package org.egov.tl.repository.rowmapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.egov.tl.web.models.*;
import org.egov.tracer.model.CustomException;
import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import static org.egov.tl.util.TLConstants.*;

@Component
public class TLRowMapperDoor implements ResultSetExtractor<List<TradeLicense>> {

    @Autowired
    private ObjectMapper mapper;

    public List<TradeLicense> extractData(ResultSet rs) throws SQLException, DataAccessException {
        Map<String, TradeLicense> tradeLicenseMap = new LinkedHashMap<>();
        while (rs.next()) {
            String id = rs.getString("tl_ad_id");
            TradeLicense currentTradeLicense = tradeLicenseMap.get(id);
            if (currentTradeLicense == null) {
                currentTradeLicense = TradeLicense.builder().id(id).build();
                Address address = Address.builder().pincode(rs.getString("pincode"))
                        .id(rs.getString("tl_ad_id"))
                        .doorNo(rs.getString("doorno"))
                        .street(rs.getString("street"))
                        .tenantId(rs.getString("tladdress_tenantid"))
                        .zonalId(rs.getString("zonalid") == null ? null : Long.parseLong(rs.getString("zonalid")))
                        .wardId(rs.getString("wardid") == null ? null : Long.parseLong(rs.getString("wardid")))
                        .wardNo(rs.getString("wardno") == null ? null : Integer.parseInt(rs.getString("wardno")))
                        .lbBuildingCode(rs.getString("lbbuildingcode"))
                        .lbBuildingName(rs.getString("lbbuildingname"))
                        .build();

                TradeLicenseDetail tradeLicenseDetail = TradeLicenseDetail.builder()
                        .address(address)
                        .build();

                currentTradeLicense.setTradeLicenseDetail(tradeLicenseDetail);

                StructurePlace structurePlace = StructurePlace.builder()
                        .id(rs.getString("tlstructplace_id"))
                        .tenantId(rs.getString("tlstructplace_tenantid"))
                        .blockNo(rs.getString("blockno"))
                        .surveyNo(rs.getString("surveyno"))
                        .subDivisionNo(rs.getString("subdivisionno"))
                        .partitionNo(rs.getString("partitionno"))
                        .doorNo(rs.getInt("tlstructplace_doorno"))
                        .doorNoSub(rs.getString("doorsub"))
                        .vehicleNo(rs.getString("vehicleno"))
                        .vesselNo(rs.getString("vesselno"))
                        .active(rs.getBoolean("tlstructplace_active"))
                        .isResurveyed(rs.getBoolean("isresurveyed"))
                        .stallNo(rs.getString("stallno"))
                        .build();

                currentTradeLicense.getTradeLicenseDetail().addStructurePlaceItem(structurePlace);
                tradeLicenseMap.put(id, currentTradeLicense);
            }

        }
        return new ArrayList<>(tradeLicenseMap.values());

    }

}