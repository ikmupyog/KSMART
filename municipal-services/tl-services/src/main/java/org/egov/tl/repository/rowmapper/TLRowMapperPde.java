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
        Map<String, Object> taxpdetemp = new HashMap<>();
        Map<String, Object> tempid = new HashMap<>();
        tempid.put("tradedetailid", "0");
        tempid.put("prevlicenseid", "0");
        tempid.put("taxhead", "0");
        tempid.put("licenceid", "0");
        while (rs.next()) {

            tempid.put("prevlicenseid", tempid.get("licenceid"));
            String id = rs.getString("tl_id");
            tempid.put("licenceid", id);
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
            TradeLicense prevTradeLicense = tradeLicenseMap.get(String.valueOf(tempid.get("prevlicenseid")));
            addChildrenToProperty(rs, currentTradeLicense, taxpdetemp, tempid, prevTradeLicense);

        }
        TradeLicense currentTradeLicense = tradeLicenseMap.get(String.valueOf(tempid.get("licenceid")));
        if (taxpdetemp.size() > 0) {
            TaxPde taxPde = TaxPde.builder()
                    .id(String.valueOf(taxpdetemp.get("tltax_id")))
                    .tenantId(currentTradeLicense.getTenantId())
                    .service(String.valueOf(taxpdetemp.get("service")))
                    .fromYear(String.valueOf(taxpdetemp.get("fromyear")))
                    .fromPeriod(String.valueOf(taxpdetemp.get("fromperiod")))
                    .toYear(String.valueOf(taxpdetemp.get("toyear")))
                    .toPeriod(String.valueOf(taxpdetemp.get("toperiod")))
                    .arrear(Double.parseDouble(String
                            .valueOf(taxpdetemp.get("arrearamnt") == null ? 0
                                    : taxpdetemp.get("arrearamnt"))))
                    .current((String.valueOf(taxpdetemp.get("headcode")).equals("431190101")
                            || String.valueOf(taxpdetemp.get("headcode")).equals("431190102"))
                                    ? (Double.parseDouble(String.valueOf(
                                            taxpdetemp.get("current") == null ? 0 : taxpdetemp.get("current"))))
                                    : (Double.parseDouble(String.valueOf(
                                            taxpdetemp.get("currentamnt") == null ? 0
                                                    : taxpdetemp.get("currentamnt")))))
                    .active(true) // (Boolean) taxpdetemp.get("tltax_active")
                    .current2(Double.parseDouble(String
                            .valueOf(taxpdetemp.get("current2") == null ? 0
                                    : taxpdetemp.get("current2"))))
                    .build();
            currentTradeLicense.getTradeLicenseDetail().addTaxPdeItem(taxPde);
        }
        return new ArrayList<>(tradeLicenseMap.values());

    }

    private void addChildrenToProperty(ResultSet rs, TradeLicense tradeLicense, Map<String, Object> taxpdetemp,
            Map<String, Object> tempid, TradeLicense prevTradeLicense) throws SQLException {
        String tenantId = tradeLicense.getTenantId();
        String tradeLicenseDetailId = rs.getString("tld_id");
        if (tradeLicense.getTradeLicenseDetail() == null) {
            Address address = Address.builder().addressId(rs.getString("addressId"))
                    .pincode(rs.getString("pincode"))
                    .id(rs.getString("tl_ad_id"))
                    .doorNo(rs.getString("doorno"))
                    .street(rs.getString("street"))
                    .tenantId(tenantId)
                    .zonalId(rs.getString("zonalid") == null ? null : Long.parseLong(rs.getString("zonalid")))
                    .wardId(rs.getString("wardid") == null ? null : Long.parseLong(rs.getString("wardid")))
                    .wardNo(rs.getString("wardno") == null ? null : Integer.parseInt(rs.getString("wardno")))
                    .lbBuildingCode(rs.getString("lbbuildingcode"))
                    .lbBuildingName(rs.getString("lbbuildingname"))
                    .buildingType(rs.getString("buildingtype"))
                    .build();

            AuditDetails auditdetails = AuditDetails.builder()
                    .createdBy(rs.getString("tld_createdBy"))
                    .createdTime(rs.getLong("tld_createdTime"))
                    .lastModifiedBy(rs.getString("tld_lastModifiedBy"))
                    .lastModifiedTime(rs.getLong("tld_createdTime"))
                    .build();

            InstitutionMaster institutionMaster = InstitutionMaster.builder()
                    .id(rs.getString("inst_id"))
                    .tenantId(tenantId)
                    .institutionId(rs.getString("instmaster_instid"))
                    .institutionName(rs.getString("institutionname"))
                    .institutionNameLocal(rs.getString("institutionnamelocal"))
                    .gstNumber(rs.getString("gstnumber"))
                    .panNumber(rs.getString("pannumber"))
                    .address(rs.getString("address"))
                    .email(rs.getString("email"))
                    .contactno(rs.getString("contactno"))
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
                    .institutionId(rs.getString("tld_institutionid"))
                    .institutionMaster(institutionMaster)
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
            if (!tradeLicenseDetailId.equals(String.valueOf(tempid.get("tradedetailid")))) {
                if (taxpdetemp.size() > 0) {
                    TaxPde taxPde = TaxPde.builder()
                            .id(String.valueOf(taxpdetemp.get("tltax_id")))
                            .tenantId(tenantId)
                            .service(String.valueOf(taxpdetemp.get("service")))
                            .fromYear(String.valueOf(taxpdetemp.get("fromyear")))
                            .fromPeriod(String.valueOf(taxpdetemp.get("fromperiod")))
                            .toYear(String.valueOf(taxpdetemp.get("toyear")))
                            .toPeriod(String.valueOf(taxpdetemp.get("toperiod")))
                            .headCode(String.valueOf(taxpdetemp.get("headcode")))
                            .arrear(Double.parseDouble(String
                                    .valueOf(taxpdetemp.get("arrearamnt") == null ? 0 : taxpdetemp.get("arrearamnt"))))
                            .active(true)
                            .current((String.valueOf(taxpdetemp.get("headcode")).equals("431190101")
                                    || String.valueOf(taxpdetemp.get("headcode")).equals("431190102"))
                                            ? (Double.parseDouble(String.valueOf(
                                                    taxpdetemp.get("current") == null ? 0 : taxpdetemp.get("current"))))
                                            : (Double.parseDouble(String.valueOf(
                                                    taxpdetemp.get("currentamnt") == null ? 0
                                                            : taxpdetemp.get("currentamnt")))))
                            .current2(Double.parseDouble(String
                                    .valueOf(taxpdetemp.get("current2") == null ? 0
                                            : taxpdetemp.get("current2"))))
                            .build();
                    if (prevTradeLicense != null)
                        prevTradeLicense.getTradeLicenseDetail().addTaxPdeItem(taxPde);
                }
                taxpdetemp.clear();
                taxpdetemp.put("tltax_id", rs.getString("tltax_id"));
                taxpdetemp.put("service", rs.getString("service"));
                taxpdetemp.put("fromyear", rs.getString("fromyear"));
                taxpdetemp.put("fromperiod", rs.getString("fromperiod"));
                taxpdetemp.put("toyear", rs.getString("toyear"));
                taxpdetemp.put("toperiod", rs.getString("toperiod"));
                taxpdetemp.put("headcode", rs.getString("headcode"));
                if ("431190101".equals(rs.getString("headcode")) || "431300201".equals(rs.getString("headcode"))
                        || "431400101".equals(rs.getString("headcode"))) {
                    if ("431190101".equals(rs.getString("headcode"))) {
                        taxpdetemp.put("current", rs.getString("firsthalfcur"));
                        taxpdetemp.put("current2", rs.getString("secondhalfcur"));
                    } else {
                        taxpdetemp.put("currentamnt", rs.getString("amount"));
                    }
                } else {
                    taxpdetemp.put("arrearamnt", rs.getString("amount"));
                }

                taxpdetemp.put("tltax_active", rs.getString("tltax_active"));
            } else {
                if (!String.valueOf(tempid.get("taxhead")).equals(rs.getString("service"))) {
                    if (taxpdetemp.size() > 0) {
                        TaxPde taxPde = TaxPde.builder()
                                .id(String.valueOf(taxpdetemp.get("tltax_id")))
                                .tenantId(tenantId)
                                .service(String.valueOf(taxpdetemp.get("service")))
                                .fromYear(String.valueOf(taxpdetemp.get("fromyear")))
                                .fromPeriod(String.valueOf(taxpdetemp.get("fromperiod")))
                                .toYear(String.valueOf(taxpdetemp.get("toyear")))
                                .toPeriod(String.valueOf(taxpdetemp.get("toperiod")))
                                .arrear(Double.parseDouble(String
                                        .valueOf(taxpdetemp.get("arrearamnt") == null ? 0
                                                : taxpdetemp.get("arrearamnt"))))
                                .active(true) // (Boolean) taxpdetemp.get("tltax_active")431190102
                                .current((String.valueOf(taxpdetemp.get("headcode")).equals("431190101")
                                        || String.valueOf(taxpdetemp.get("headcode")).equals("431190102"))
                                                ? (Double.parseDouble(String.valueOf(
                                                        taxpdetemp.get("current") == null ? 0
                                                                : taxpdetemp.get("current"))))
                                                : (Double.parseDouble(String.valueOf(
                                                        taxpdetemp.get("currentamnt") == null ? 0
                                                                : taxpdetemp.get("currentamnt")))))
                                .current2(Double.parseDouble(String
                                        .valueOf(taxpdetemp.get("current2") == null ? 0
                                                : taxpdetemp.get("current2"))))
                                .build();
                        tradeLicense.getTradeLicenseDetail().addTaxPdeItem(taxPde);
                    }
                    taxpdetemp.clear();
                    taxpdetemp.put("tltax_id", rs.getString("tltax_id"));
                    taxpdetemp.put("service", rs.getString("service"));
                    taxpdetemp.put("fromyear", rs.getString("fromyear"));
                    taxpdetemp.put("fromperiod", rs.getString("fromperiod"));
                    taxpdetemp.put("toyear", rs.getString("toyear"));
                    taxpdetemp.put("toperiod", rs.getString("toperiod"));
                    taxpdetemp.put("headcode", rs.getString("headcode"));
                    if ("431190101".equals(rs.getString("headcode")) || "431300201".equals(rs.getString("headcode"))
                            || "431400101".equals(rs.getString("headcode"))) {
                        if ("431190101".equals(rs.getString("headcode"))) {
                            taxpdetemp.put("current", rs.getString("firsthalfcur"));
                            taxpdetemp.put("current2", rs.getString("secondhalfcur"));
                        } else {
                            taxpdetemp.put("currentamnt", rs.getString("amount"));
                        }
                    } else {
                        taxpdetemp.put("arrearamnt", rs.getString("amount"));
                    }
                    taxpdetemp.put("tltax_active", rs.getString("tltax_active"));
                } else {
                    if (taxpdetemp.containsKey(rs.getString("service"))) {
                        if ("431190101".equals(rs.getString("headcode")) || "431300201".equals(rs.getString("headcode"))
                                || "431400101".equals(rs.getString("headcode"))) {
                            if ("431190101".equals(rs.getString("headcode"))) {
                                taxpdetemp.put("current", rs.getString("firsthalfcur"));
                                taxpdetemp.put("current2", rs.getString("secondhalfcur"));
                            } else {
                                taxpdetemp.put("currentamnt", rs.getString("amount"));
                            }

                        } else {
                            taxpdetemp.put("arrearamnt", rs.getString("amount"));
                        }
                    } else {
                        taxpdetemp.put("tltax_id", rs.getString("tltax_id"));
                        taxpdetemp.put("service", rs.getString("service"));
                        taxpdetemp.put("fromyear", rs.getString("fromyear"));
                        taxpdetemp.put("fromperiod", rs.getString("fromperiod"));
                        taxpdetemp.put("toyear", rs.getString("toyear"));
                        taxpdetemp.put("toperiod", rs.getString("toperiod"));
                        taxpdetemp.put("headcode", rs.getString("headcode"));
                        if ("431190101".equals(rs.getString("headcode")) || "431300201".equals(rs.getString("headcode"))
                                || "431400101".equals(rs.getString("headcode"))) {
                            if ("431190101".equals(rs.getString("headcode"))) {
                                taxpdetemp.put("current", rs.getString("firsthalfcur"));
                                taxpdetemp.put("current2", rs.getString("secondhalfcur"));
                            } else {
                                taxpdetemp.put("currentamnt", rs.getString("amount"));
                            }
                        } else {
                            taxpdetemp.put("arrearamnt", rs.getString("amount"));
                        }
                        taxpdetemp.put("tltax_active", rs.getString("tltax_active"));
                    }

                }
            }
            tempid.put("tradedetailid", tradeLicenseDetailId);
            tempid.put("taxhead", rs.getString("service"));
            // TaxPde taxPde = TaxPde.builder()
            // .id(rs.getString("tltax_id"))
            // .tenantId(tenantId)
            // .service(rs.getString("service"))
            // .fromYear(rs.getString("fromyear"))
            // .fromPeriod(rs.getString("fromperiod"))
            // .toYear(rs.getString("toyear"))
            // .toPeriod(rs.getString("toperiod"))
            // .headCode(rs.getString("headcode"))
            // .amount(rs.getDouble("amount"))
            // .active(rs.getBoolean("tltax_active"))
            // .build();
            // tradeLicense.getTradeLicenseDetail().addTaxPdeItem(taxPde);
        }
    }

}