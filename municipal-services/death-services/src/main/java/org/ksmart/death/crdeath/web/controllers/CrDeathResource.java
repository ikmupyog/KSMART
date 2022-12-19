package org.ksmart.death.crdeath.web.controllers;

import javax.validation.Valid;

// import org.ksmart.death.crdeath.web.models.ApplicantPersonalRequest;
// import org.ksmart.death.crdeath.web.models.ApplicantPersonalResponse;
// import org.ksmart.death.crdeath.web.models.ApplicantPersonalSearchCriteria;
// import org.ksmart.death.crdeath.web.models.RequestInfoWrapper;
import org.egov.tracer.model.ErrorRes;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
import org.ksmart.death.crdeath.web.models.CrDeathDtlResponse;
import org.ksmart.death.crdeath.web.models.RequestInfoWrapper;
import org.ksmart.death.crdeath.web.models.CrDeathSearchCriteria;
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

@Tag(name = "Death Registration")
@Validated
interface CrDeathResource {

    @Operation(summary = "Create Death Registration along with details.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = CrDeathDtlRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Request for Death Registration created successfully",
                                    content = @Content(mediaType = "application/json",
                                                       schema = @Schema(implementation = CrDeathDtlResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })

    ResponseEntity<CrDeathDtlResponse> create(@Valid CrDeathDtlRequest request);

    @Operation(summary = "Update Request for Death Registration along with details.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = CrDeathDtlRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Death Registration request updated successfully",
                                    content = @Content(mediaType = "application/json",
                                                       schema = @Schema(implementation = CrDeathDtlResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<CrDeathDtlResponse> update(@Valid CrDeathDtlRequest request);

    @Operation(summary = "Search Death Registration request along with details.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = RequestInfoWrapper.class)),
                                          required = true),
               parameters = {
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "tenantId",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Tenant id",
                                  schema = @Schema(type = "string", accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "id",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "death registration application id",
                                  schema = @Schema(type = "string",
                                                   format = "uuid",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "registrationNo",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Reregistration No",
                                  schema = @Schema(type = "string",
                                                   example = "1/2022",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                //        @Parameter(in = ParameterIn.QUERY,
                //                   name = "fromDate",
                //                   required = false,
                //                   allowEmptyValue = true,
                //                   description = "File arising date, search from",
                //                   schema = @Schema(type = "integer",
                //                                    format = "int64",
                //                                    accessMode = Schema.AccessMode.READ_ONLY)),
                //        @Parameter(in = ParameterIn.QUERY,
                //                   name = "toDate",
                //                   required = false,
                //                   allowEmptyValue = true,
                //                   description = "File arising date, search to",
                //                   schema = @Schema(type = "integer",
                //                                    format = "int64",
                //                                    accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "aadhaarNo",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Aadhaar number",
                                  schema = @Schema(type = "string", accessMode = Schema.AccessMode.READ_ONLY)) },
                //        @Parameter(in = ParameterIn.QUERY,
                //                   name = "offset",
                //                   required = false,
                //                   allowEmptyValue = true,
                //                   description = "Search offset",
                //                   schema = @Schema(type = "integer",
                //                                    format = "int32",
                //                                    accessMode = Schema.AccessMode.READ_ONLY)),
                //        @Parameter(in = ParameterIn.QUERY,
                //                   name = "limit",
                //                   required = false,
                //                   allowEmptyValue = true,
                //                   description = "Search limit",
                //                   schema = @Schema(type = "integer",
                //                                    format = "int32",
                //                                    accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "application retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = CrDeathDtlResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<CrDeathDtlResponse> search(@Valid RequestInfoWrapper request,
                                                     @Valid CrDeathSearchCriteria criteria);

}