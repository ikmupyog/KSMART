package org.egov.filemgmnt.web.controllers;

import javax.validation.Valid;

import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantSearchResponse;
import org.egov.filemgmnt.web.models.ApplicantServiceRequest;
import org.egov.filemgmnt.web.models.ApplicantServiceResponse;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchResponse;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.certificate.CertificateResponse;
import org.egov.tracer.model.ErrorRes;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "File Management")
@Hidden
@Validated
interface FileManagementBaseController {

    @Operation(summary = "Create applicant personal along with file service details.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = ApplicantServiceRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "File service details created successfully",
                                    content = @Content(mediaType = "application/json",
                                                       schema = @Schema(implementation = ApplicantServiceResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad file service request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ApplicantServiceResponse> create(@Valid ApplicantServiceRequest request);

    @Operation(summary = "Update applicant personal along with file service details.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = ApplicantServiceRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "File service details updated successfully",
                                    content = @Content(mediaType = "application/json",
                                                       schema = @Schema(implementation = ApplicantServiceResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ApplicantServiceResponse> update(@Valid ApplicantServiceRequest request);

    @Operation(summary = "Search applicant service details with the given query parameters.",
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
                                  name = "applicantId",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Applicant personal id",
                                  schema = @Schema(type = "string",
                                                   format = "uuid",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "fileCode",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "File code",
                                  schema = @Schema(type = "string",
                                                   example = "KL-FM-2022-10-25-000001",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "fromDate",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "File arising date, search from",
                                  schema = @Schema(type = "integer",
                                                   format = "int64",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "toDate",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "File arising date, search to",
                                  schema = @Schema(type = "integer",
                                                   format = "int64",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "aadhaarNumber",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Aadhaar number",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_AADHAAR,
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "offset",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Search offset",
                                  schema = @Schema(type = "integer",
                                                   format = "int32",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "limit",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Search limit",
                                  schema = @Schema(type = "integer",
                                                   format = "int32",
                                                   accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Applicant service details retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ApplicantServiceSearchResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad applicant service detail search request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ApplicantServiceSearchResponse> searchServices(@Valid RequestInfoWrapper request,
                                                                  @Valid ApplicantServiceSearchCriteria searchCriteria);

    @Operation(summary = "Search applicant details with the given query parameters.",
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
                                  name = "id",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Applicant personal id",
                                  schema = @Schema(type = "string",
                                                   format = "uuid",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "aadhaarNumber",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Aadhaar number",
                                  schema = @Schema(type = "string",
                                                   pattern = FMConstants.PATTERN_AADHAAR,
                                                   accessMode = Schema.AccessMode.READ_ONLY)) },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Applicant personals retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ApplicantSearchResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad applicant personal search request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<ApplicantSearchResponse> searchApplicants(@Valid RequestInfoWrapper request,
                                                             @Valid ApplicantSearchCriteria searchCriteria);

    @Operation(summary = "Download applicant service certificate with the given query parameters.",
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
                                  name = "serviceDetailId",
                                  required = true,
                                  allowEmptyValue = false,
                                  description = "Applicant service detail id",
                                  schema = @Schema(type = "string",
                                                   format = "uuid",
                                                   accessMode = Schema.AccessMode.READ_ONLY)),
                       @Parameter(in = ParameterIn.QUERY,
                                  name = "applicantId",
                                  required = false,
                                  allowEmptyValue = true,
                                  description = "Applicant personal id",
                                  schema = @Schema(type = "string",
                                                   format = "uuid",
                                                   accessMode = Schema.AccessMode.READ_ONLY)), },
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Applicant certificate retrieved successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = CertificateResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad applicant certificate download request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<CertificateResponse> downloadCertificate(@Valid RequestInfoWrapper request,
                                                            @Valid ApplicantServiceSearchCriteria searchCriteria);
}