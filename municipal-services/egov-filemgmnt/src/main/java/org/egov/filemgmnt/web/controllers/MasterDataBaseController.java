package org.egov.filemgmnt.web.controllers;

import javax.validation.Valid;

import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetailsResponse;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionSearchResponse;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetailsResponse;
import org.egov.filemgmnt.web.models.masterdata.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ModuleSearchResponse;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetailsResponse;
import org.egov.filemgmnt.web.models.masterdata.ServiceSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ServiceSearchResponse;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetailsResponse;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionSearchResponse;
import org.egov.tracer.model.ErrorRes;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Master Data")
@Validated
public interface MasterDataBaseController {

    // MODULES
    @Operation(summary = "Create module master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = ModuleDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Module master data created successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ModuleDetailsResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad module master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ModuleDetailsResponse> createModule(@Valid ModuleDetailsRequest request);

    @Operation(summary = "Update module master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = ModuleDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Module master data updated successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ModuleDetailsResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad module master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ModuleDetailsResponse> updateModule(@Valid ModuleDetailsRequest request);

    @Operation(summary = "Search module master data with the given query parameters.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = RequestInfoWrapper.class)),
                                          required = true),
               parameters = {
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "tenantId",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Tenant identification number",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "moduleCode",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Module code",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_MODULE_CODE,
                                                   accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Module master data retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ModuleSearchResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad module master data search request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ModuleSearchResponse> searchModules(@Valid RequestInfoWrapper request,
                                                       @Valid ModuleSearchCriteria searchCriteria);

    @Operation(summary = "Delete module master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = ModuleDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "204",
                                    description = "Module master data deleted successfully",
                                    content = @Content),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad module master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<Void> deleteModule(@Valid ModuleDetailsRequest request);

    // MAJOR FUNCTIONS
    @Operation(summary = "Create major function master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = MajorFunctionDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Major function master data created successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = MajorFunctionDetailsResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad major function master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<MajorFunctionDetailsResponse> createMajorFunction(@Valid MajorFunctionDetailsRequest request);

    @Operation(summary = "Update major function master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = MajorFunctionDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Major function master data updated successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = MajorFunctionDetailsResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad major function master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<MajorFunctionDetailsResponse> updateMajorFunction(@Valid MajorFunctionDetailsRequest request);

    @Operation(summary = "Search major function master data with the given query parameters.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = RequestInfoWrapper.class)),
                                          required = true),
               parameters = {
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "tenantId",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Tenant identification number",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "majorFunctionCode",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Major function code",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_MODULE_CODE,
                                                   accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Major function master data retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = MajorFunctionSearchResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad major function master data search request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<MajorFunctionSearchResponse> searchMajorFunctions(@Valid RequestInfoWrapper request,
                                                                     @Valid MajorFunctionSearchCriteria searchCriteria);

    @Operation(summary = "Delete major function master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = MajorFunctionDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "204",
                                    description = "Major function master data deleted successfully",
                                    content = @Content),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad major function master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<Void> deleteMajorFunction(@Valid MajorFunctionDetailsRequest request);

    // SUB FUNCTIONS
    @Operation(summary = "Create sub function master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = SubFunctionDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Sub function master data created successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = SubFunctionDetailsResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad sub function master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<SubFunctionDetailsResponse> createSubFunction(@Valid SubFunctionDetailsRequest request);

    @Operation(summary = "Update sub function master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = SubFunctionDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Sub function master data updated successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = SubFunctionDetailsResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad sub function master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<SubFunctionDetailsResponse> updateSubFunction(@Valid SubFunctionDetailsRequest request);

    @Operation(summary = "Search sub function master data with the given query parameters.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = RequestInfoWrapper.class)),
                                          required = true),
               parameters = {
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "tenantId",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Tenant identification number",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "subFunctionCode",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Sub function code",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_MODULE_CODE,
                                                   accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Sub function master data retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = SubFunctionSearchResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad sub function master data search request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<SubFunctionSearchResponse> searchSubFunctions(@Valid RequestInfoWrapper request,
                                                                 @Valid SubFunctionSearchCriteria searchCriteria);

    @Operation(summary = "Delete sub function master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = SubFunctionDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "204",
                                    description = "Sub function master data deleted successfully",
                                    content = @Content),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad sub function master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<Void> deleteSubFunction(@Valid SubFunctionDetailsRequest request);

    // SERVICES
    @Operation(summary = "Create service master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = ServiceDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Service master data created successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ServiceDetailsResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad service master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ServiceDetailsResponse> createService(@Valid ServiceDetailsRequest request);

    @Operation(summary = "Update service master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = ServiceDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Service master data updated successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ServiceDetailsResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad service master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ServiceDetailsResponse> updateService(@Valid ServiceDetailsRequest request);

    @Operation(summary = "Search service master data with the given query parameters.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = RequestInfoWrapper.class)),
                                          required = true),
               parameters = {
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "tenantId",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Tenant identification number",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "serviceCode",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Service code",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_MODULE_CODE,
                                                   accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Service master data retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ServiceSearchResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad service master data search request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ServiceSearchResponse> searchServices(@Valid RequestInfoWrapper request,
                                                         @Valid ServiceSearchCriteria searchCriteria);

    @Operation(summary = "Delete service master data.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = ServiceDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "204",
                                    description = "Service master data deleted successfully",
                                    content = @Content),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad module master data request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<Void> deleteService(@Valid ServiceDetailsRequest request);

}