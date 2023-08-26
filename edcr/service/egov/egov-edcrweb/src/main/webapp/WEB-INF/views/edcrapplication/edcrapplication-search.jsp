<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/includes/taglibs.jsp"%>
<form:form role="form" action="search" modelAttribute="edcrApplication"
	id="edcrApplicationsearchform"
	cssClass="form-horizontal form-groups-bordered"
	enctype="multipart/form-data">
 
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">SearchEdcrApplication</div>
				</div>
				<div class="panel-body">
					<div class="form-group">
						<label class="col-sm-3 control-label text-right"><spring:message
								code="lbl.applicationnumber"
							/> </label>
						<div class="col-sm-3 add-margin">
							<form:input path="applicationNumber"
								class="form-control text-left patternvalidation"
								data-pattern="alphanumeric" maxlength="30"
							/>
							<form:errors path="applicationNumber" cssClass="error-msg" />
						</div>
						<input type="hidden" class="form-control text" id="applnType" name="applnType" value="PERMIT"/>
						<div class="col-sm-3 add-margin">
							<div class="form-group">
								<label class="col-sm-3 control-label text-right"><spring:message
										code="lbl.applicationdate"
									/> </label>
								<div class="col-sm-3 add-margin">
									<form:input path="applicationDate"
										class="form-control datepicker" data-date-end-date="0d"
										data-inputmask="'mask': 'd/m/y'"
									/>
									<form:errors path="applicationDate" cssClass="error-msg" />
								</div>
								<input type="hidden" id="mode" name="mode" value="${mode}" />
								<div class="form-group">
									<div class="text-center">
										<button type='button' class='btn btn-primary' id="btnsearch">
											<spring:message code='lbl.search' />
										</button>
										<a href='javascript:void(0)' class='btn btn-default'
											onclick='self.close()'
										><spring:message code='lbl.close' /></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
			</div>
			 
			

 

<div class="row display-hide report-section">
	<div class="col-md-12 table-header text-left">EdcrApplication
		Search Result</div>
	<div class="col-md-12 form-group report-table-container">
		<table class="table table-bordered table-hover multiheadertbl" id="resultTable1" >
			<thead>
				<tr>
					<th><spring:message code="lbl.applicationnumber" /></th>
					<th><spring:message code="lbl.dcrnumber" /></th>
					<th><spring:message code="lbl.applicationdate" /></th>
				</tr>
			</thead>
		</table>
	</div>
</div>
</form:form>

<link rel="stylesheet"
	href="<c:url value='/resources/global/css/bootstrap/bootstrap-datepicker.css' context='/edcr'/>"
/>
<script type="text/javascript"
	src="<c:url value='/resources/global/js/jquery/plugins/datatables/jquery.dataTables.min.js' context='/edcr'/>"
>
	
</script>
<script type="text/javascript"
	src="<c:url value='/resources/global/js/jquery/plugins/datatables/dataTables.bootstrap.js' context='/edcr'/>"
>
	
</script>
<script type="text/javascript"
	src="<c:url value='/resources/global/js/jquery/plugins/datatables/dataTables.tableTools.js' context='/edcr'/>"
>
	
</script>
<script type="text/javascript"
	src="<c:url value='/resources/global/js/jquery/plugins/datatables/TableTools.min.js' context='/edcr'/>"
>
	
</script>
<script type="text/javascript"
	src="<c:url value='/resources/global/js/bootstrap/typeahead.bundle.js' context='/edcr'/>"
>
	
</script>
<script
	src="<c:url value='/resources/global/js/jquery/plugins/jquery.inputmask.bundle.min.js' context='/edcr'/>"
>
	
</script>
<script type="text/javascript"
	src="<c:url value='/resources/global/js/jquery/plugins/jquery.validate.min.js' context='/edcr'/>" ></script>
<script 	src="<c:url value='/resources/global/js/bootstrap/bootstrap-datepicker.js' context='/edcr'/>" type="text/javascript" > </script>
<script type="text/javascript"
	src="<c:url value='/resources/app/js/edcr-search-Helper.js'/>"></script>
