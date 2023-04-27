package org.egov.filemgmnt.web.controllers;

import javax.validation.Valid;

import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.dratfile.DraftFileRequest;
import org.egov.filemgmnt.web.models.dratfile.DraftFileResponse;
import org.egov.filemgmnt.web.models.dratfile.DraftFileSearchResponse;
import org.egov.tracer.model.ErrorRes;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Draft File ")
interface DraftingBaseController {
    @Operation(summary = "Create draft file.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = DraftFileRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Draft file created successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = DraftFileResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad draft file details request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<DraftFileResponse> create(@Valid DraftFileRequest request);

    @Operation(summary = "Update draft file details.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = DraftFileRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Draft file details updated successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = DraftFileResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad draft file details request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<DraftFileResponse> update(@Valid DraftFileRequest request);

    @Operation(summary = "Search draft file details with the given query parameters.",
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
                                  name = "uuid",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Draft file  id",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "businessService",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "business service",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "moduleName",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Module name",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "draftType",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Draft type",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "fileCode",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Fil code",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "status",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Draft status",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "assigner",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Draft assigner details",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_TENANT,
                                                   accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Draft file details retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = DraftFileSearchResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad draft file detail search request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<DraftFileSearchResponse> search(@Valid RequestInfoWrapper request,
                                                   @Valid DraftFileSearchResponse searchCriteria);
}
