package org.egov.filemgmnt.web.controllers;

import javax.validation.Valid;

import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.enquiry.EnquiryRequest;
import org.egov.filemgmnt.web.models.enquiry.EnquiryResponse;
import org.egov.filemgmnt.web.models.enquiry.EnquirySearchCriteria;
import org.egov.filemgmnt.web.models.enquiry.EnquirySearchResponse;
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

@Tag(name = "Enquiry")
@Validated
interface EnquiriesBaseController {

    @Operation(summary = "Create enquiry.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = EnquiryRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Enquiry created successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = EnquiryResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad enquiry create request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<EnquiryResponse> create(@Valid EnquiryRequest request);

    @Operation(summary = "Search enquiries with the given query parameters.",
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
                                  name = "moduleName",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Module name",
                                  schema = @Schema(type = "string", accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "fileCode",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "File code",
                                  schema = @Schema(type = "string", accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "assigner",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Assigner",
                                  schema = @Schema(type = "string", accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "status",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Status",
                                  schema = @Schema(type = "string", accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "fromDate",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Enquiry date, search from",
                                  schema = @Schema(type = "integer",
                                                   format = "int64",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "toDate",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Enquiry date, search to",
                                  schema = @Schema(type = "integer",
                                                   format = "int64",
                                                   accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Enquiries(s) retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = EnquirySearchResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad enquiry search request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<EnquirySearchResponse> search(@Valid RequestInfoWrapper request,
                                                 @Valid EnquirySearchCriteria enquirySearchCriteria);

}