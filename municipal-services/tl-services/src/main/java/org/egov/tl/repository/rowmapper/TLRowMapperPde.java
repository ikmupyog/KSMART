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
public class TLRowMapperPde implements ResultSetExtractor<List<TradeLicense>> {

    @Autowired
    private ObjectMapper mapper;

    public List<TradeLicense> extractData(ResultSet rs) throws SQLException, DataAccessException {
        Map<String, TradeLicense> tradeLicenseMap = new LinkedHashMap<>();

        while (rs.next()) {
            String id = rs.getString("tl_id");
            TradeLicense currentTradeLicense = tradeLicenseMap.get(id);
            String tenantId = rs.getString("tl_tenantId");

            if (currentTradeLicense == null) {
                Long lastModifiedTime = rs.getLong("tl_lastModifiedTime");
                if (rs.wasNull()) {
                    lastModifiedTime = null;
                }

                Long validFrom = (Long) rs.getObject("validfrom");
                Long validTo = (Long) rs.getObject("validto");

                AuditDetails auditdetails = AuditDetails.builder()
                        .createdBy(rs.getString("tl_createdBy"))
                        .createdTime(rs.getLong("tl_createdTime"))
                        .lastModifiedBy(rs.getString("tl_lastModifiedBy"))
                        .lastModifiedTime(lastModifiedTime)
                        .build();

                currentTradeLicense = TradeLicense.builder().auditDetails(auditdetails)
                        .licenseType(TradeLicense.LicenseTypeEnum.fromValue(rs.getString("licensetype")))
                        .applicationType(TradeLicense.ApplicationTypeEnum.fromValue(rs.getString("applicationType")))
                        .workflowCode(rs.getString("workflowCode"))
                        .applicationNumber(rs.getString("applicationnumber"))
                        .financialYear(rs.getString("financialyear"))
                        .validFrom(validFrom)
                        .validTo(validTo)
                        .action(rs.getString("action"))
                        .status(rs.getString("status"))
                        .tenantId(tenantId)
                        .tradeName(rs.getString("tradeName"))
                        .businessService(rs.getString("businessservice"))
                        .id(id)
                        .build();

                tradeLicenseMap.put(id, currentTradeLicense);
            }
            addChildrenToProperty(rs, currentTradeLicense);

        }

        return new ArrayList<>(tradeLicenseMap.values());

    }

    private void addChildrenToProperty(ResultSet rs, TradeLicense tradeLicense) throws SQLException {

        String tenantId = tradeLicense.getTenantId();
        String tradeLicenseDetailId = rs.getString("tld_id");

        if (tradeLicense.getTradeLicenseDetail() == null) {

            Address address = Address.builder().addressId(rs.getString("addressId"))
                    .pincode(rs.getString("pincode"))
                    .doorNo(rs.getString("doorno"))
                    .street(rs.getString("street"))
                    .tenantId(tenantId)
                    .zonalId(rs.getString("zonalid") == null ? null : Long.parseLong(rs.getString("zonalid")))
                    .wardId(rs.getString("wardid") == null ? null : Long.parseLong(rs.getString("wardid")))
                    .wardNo(rs.getString("wardno") == null ? null : Integer.parseInt(rs.getString("wardno")))
                    .build();

            AuditDetails auditdetails = AuditDetails.builder()
                    .createdBy(rs.getString("tld_createdBy"))
                    .createdTime(rs.getLong("tld_createdTime"))
                    .lastModifiedBy(rs.getString("tld_lastModifiedBy"))
                    .lastModifiedTime(rs.getLong("tld_createdTime"))
                    .build();

            // try {
            TradeLicenseDetail tradeLicenseDetail = TradeLicenseDetail.builder()
                    .surveyNo(rs.getString("surveyno"))
                    .channel(TradeLicenseDetail.ChannelEnum.fromValue(rs.getString("channel")))
                    .subOwnerShipCategory(rs.getString("subownershipcategory"))
                    .id(tradeLicenseDetailId)
                    .address(address)
                    .auditDetails(auditdetails)
                    .structureType(rs.getString("structureType"))
                    .businessSector(rs.getString("businesssector"))
                    .capitalInvestment(rs.getDouble("capitalinvestment"))
                    .enterpriseType(rs.getString("enterprisetype"))
                    .licenseeType(rs.getString("licenseetype"))
                    .build();

            tradeLicense.setTradeLicenseDetail(tradeLicenseDetail);
            // } catch (IOException e) {
            // throw new CustomException("PARSING ERROR", "The additionalDetail json cannot
            // be parsed");
            // }
        }

        if (rs.getBoolean("useractive") && rs.getString("tlowner_id") != null) {
            OwnerPde owner = OwnerPde.builder()
                    .id(rs.getString("tlowner_id"))
                    .ownerType(rs.getString("ownerType"))
                    .active(rs.getBoolean("active"))
                    .name(rs.getString("ownername"))
                    .build();
            tradeLicense.getTradeLicenseDetail().addOwnersPdeItem(owner);
        }

        if (rs.getString("tlstructplace_id") != null && rs.getBoolean("tlstructplace_active")) {
            StructurePlace structurePlace = StructurePlace.builder()
                    .id(rs.getString("tlstructplace_id"))
                    .tenantId(tenantId)
                    .doorNo(rs.getInt("tlstructplace_doorno"))
                    .doorNoSub(rs.getString("doorsub"))
                    .stallNo(rs.getString("stallno"))
                    .active(rs.getBoolean("tlstructplace_active"))
                    .build();
            tradeLicense.getTradeLicenseDetail().addStructurePlaceItem(structurePlace);
        }

        if (rs.getString("tltax_id") != null && rs.getBoolean("tltax_active")) {
            TaxPde taxPde = TaxPde.builder()
                    .id(rs.getString("tltax_id"))
                    .tenantId(tenantId)
                    .service(rs.getString("service"))
                    .fromYear(rs.getString("fromyear"))
                    .fromPeriod(rs.getString("fromperiod"))
                    .toYear(rs.getString("toyear"))
                    .toPeriod(rs.getString("toperiod"))
                    .headCode(rs.getString("headcode"))
                    .amount(rs.getDouble("amount"))
                    .active(rs.getBoolean("tltax_active"))
                    .build();
            tradeLicense.getTradeLicenseDetail().addTaxPdeItem(taxPde);
        }
    }

}
