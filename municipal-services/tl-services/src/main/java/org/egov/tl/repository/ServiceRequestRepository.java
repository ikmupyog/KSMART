package org.egov.tl.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.egov.tl.web.models.BuildingDet;
import org.egov.tl.web.models.BuildingOwner;
import org.egov.tracer.model.ServiceCallException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

@Repository
@Slf4j
public class ServiceRequestRepository {

	private ObjectMapper mapper;

	private RestTemplate restTemplate;

	@Autowired
	public ServiceRequestRepository(ObjectMapper mapper, RestTemplate restTemplate) {
		this.mapper = mapper;
		this.restTemplate = restTemplate;
	}

	public Object fetchResult(StringBuilder uri, Object request) {
		mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		Object response = null;
		log.info("URI: " + uri.toString());
		try {
			log.info("Request: " + mapper.writeValueAsString(request));
			response = restTemplate.postForObject(uri.toString(), request, Map.class);
		} catch (HttpClientErrorException e) {
			log.error("External Service threw an Exception: ", e);
			throw new ServiceCallException(e.getResponseBodyAsString());
		} catch (Exception e) {
			log.error("Exception while fetching from searcher: ", e);
		}

		return response;
	}

	public BuildingDet fetchResultPT(String uri, Map<String, Object> param)
			throws ClientProtocolException, IOException, ParserConfigurationException, SAXException {
		// {zonalId=5026401, lbId=264, doorNoSub=D, wardId=1026401017, doorNo=662}
		System.out.println(param);
		BuildingDet buildingDet = new BuildingDet();
		List<BuildingOwner> buildingownerlist = new ArrayList<>();
		RequestConfig.Builder requestBuilder = RequestConfig.custom();
		requestBuilder.setConnectTimeout(15000);
		requestBuilder.setSocketTimeout(15000);
		HttpClientBuilder builderclient = HttpClientBuilder.create();
		builderclient.setDefaultRequestConfig(requestBuilder.build());
		HttpClient client = builderclient.build();
		ArrayList<NameValuePair> paramspost = new ArrayList<NameValuePair>();
		paramspost.add(new BasicNameValuePair("lbid", String.valueOf(param.get("lbId"))));
		paramspost.add(new BasicNameValuePair("zonalid", String.valueOf(param.get("zonalId"))));
		paramspost.add(new BasicNameValuePair("wardid", String.valueOf(param.get("wardId"))));
		paramspost.add(new BasicNameValuePair("doorno1", String.valueOf(param.get("doorNo"))));
		paramspost.add(new BasicNameValuePair("doorno2", String.valueOf(param.get("doorNoSub"))));
		HttpPost httpPost = new HttpPost(uri);
		httpPost.setEntity(new UrlEncodedFormEntity(paramspost, "UTF-8"));
		HttpResponse response = client.execute(httpPost);
		StatusLine statusLine = response.getStatusLine();
		int statusCode = statusLine.getStatusCode();
		HttpEntity entity = response.getEntity();
		InputStream content = entity.getContent();
		String xml = new String(content.readAllBytes(), StandardCharsets.UTF_8);
		String XmlString = xml;
		System.out.println(XmlString);
		if (XmlString.contains("&lt;")) {
			XmlString = XmlString.replace("&lt;", "<");
		}
		if (XmlString.contains("&gt;")) {
			XmlString = XmlString.replace("&gt;", ">");
		}

		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setIgnoringComments(false);
		factory.setIgnoringElementContentWhitespace(false);
		factory.setExpandEntityReferences(false);
		factory.setNamespaceAware(false);
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(new InputSource(new StringReader(XmlString)));
		doc.getDocumentElement().normalize();
		NodeList nList = doc.getElementsByTagName("Rec");
		if (nList.getLength() > 0) {
			for (int temp = 0; temp < nList.getLength(); temp++) {
				Node nNode = nList.item(temp);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element basicnode = (Element) nNode;
					// NodeList basicnode = eElement.getElementsByTagName("z:row");
					// if (basicnode.getLength() > 0) {
					//	buildingDet.setLbId(Integer.parseInt(basicnode.getElementsByTagName("DoorNo").item(0).getTextContent()));		
					buildingDet.setBuildingId(basicnode.getElementsByTagName("BuildingID").item(0).getTextContent());
					buildingDet.setWardId(basicnode.getElementsByTagName("WardID").item(0).getTextContent());
					buildingDet.setDoorNo(
							Integer.parseInt(basicnode.getElementsByTagName("DoorNo").item(0).getTextContent()));
					buildingDet.setWardId(basicnode.getElementsByTagName("WardID").item(0).getTextContent());
					buildingDet.setDoorNoSub(basicnode.getElementsByTagName("DoorNOSub").item(0).getTextContent());
					buildingDet.setBuildingfunction(
							basicnode.getElementsByTagName("BuildingFunctionality").item(0).getTextContent());
					buildingDet.setBuildingFunctionId(Integer
							.parseInt(basicnode.getElementsByTagName("BuildingFunctionID").item(0).getTextContent()));
					BuildingOwner buildingowner = new BuildingOwner();
					buildingowner.setOwnerName(basicnode.getElementsByTagName("OwnerEng").item(0).getTextContent());
					buildingowner
							.setOwnerNameLocal(basicnode.getElementsByTagName("OwnerMal").item(0).getTextContent());
					buildingowner.setHouseName(basicnode.getElementsByTagName("HouseNameEng").item(0).getTextContent());
					buildingowner
							.setHouseNameLocal(basicnode.getElementsByTagName("HouseNameMal").item(0).getTextContent());
					buildingowner.setStreet(basicnode.getElementsByTagName("PlaceNameEng").item(0).getTextContent());
					buildingowner
							.setStreetLocal(basicnode.getElementsByTagName("PlaceNameMal").item(0).getTextContent());
					buildingowner.setPostOffice(basicnode.getElementsByTagName("PONameEng").item(0).getTextContent());
					buildingowner
							.setPostOfficeLocal(basicnode.getElementsByTagName("PONameMal").item(0).getTextContent());
					buildingowner.setPincode(basicnode.getElementsByTagName("Pincode").item(0).getTextContent());
					buildingowner.setMobileNumber(basicnode.getElementsByTagName("MobileNo").item(0).getTextContent());
					buildingowner.setContactNo(basicnode.getElementsByTagName("LandPhoneNo").item(0).getTextContent());
					buildingowner
							.setOwneraadhaarNo(basicnode.getElementsByTagName("AadharNo").item(0).getTextContent());
					buildingownerlist.add(buildingowner);
					// } else {

					// }
				}
			}
			buildingDet.setBuildingOwner(buildingownerlist);
		} else {

		}
		return buildingDet;
	}
}
