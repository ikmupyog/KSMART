package org.egov.filemgmnt.util;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

@Disabled
@SpringBootTest
@TestPropertySource(locations = { "classpath:test.properties" })
@SuppressWarnings({ "PMD.JUnitTestsShouldIncludeAssert" })
@Slf4j
public class MdmsUtilTests {

    @ParameterizedTest
    @MethodSource("mdmsData")
    void pathTests(String data) {
        String path = "$.MdmsRes.FileManagement.FileServiceSubtype[*].code";
        Object document = Configuration.defaultConfiguration()
                                       .jsonProvider()
                                       .parse(data);
        List<String> result = JsonPath.read(document, path);
        log.info("*** MDS Data: \npath {}, data {}", path, result);

        path = "$.MdmsRes.FileManagement.FileServiceSubtype[?(@.code)].code";
        result = JsonPath.read(document, path);
        log.info("*** MDS Data(2): \npath {}, data {}", path, result);

        path = "$.MdmsRes.FileManagement.FileServiceSubtype[?(@.code == 'PN001.MCP')].code";
        result = JsonPath.read(document, path);
        log.info("*** MDS Data(3): \npath {}, data {}", path, result);

    }

    @ParameterizedTest
    @MethodSource("mdmsData")
    void getRows(String data) {
        Object document = Configuration.defaultConfiguration()
                                       .jsonProvider()
                                       .parse(data);

        String basePath = "MdmsRes.FileManagement.FileServiceSubtype.*";
        List<Map<String, Object>> dataList = JsonPath.read(document, basePath);
        log.info("*** MDS Data: \npath {}, data {}", basePath, dataList);
    }

    @ParameterizedTest
    @MethodSource("mdmsData")
    void readAsMap(String data) {
        // replace
        Object document = Configuration.defaultConfiguration()
                                       .jsonProvider()
                                       .parse(data);
        String basePath = "MdmsRes.FileManagement";
        Map<String, Object> dataMap = JsonPath.read(document, basePath);
        log.info("*** MDS Data: \npath {}, data {}", basePath, dataMap);
    }

    static Stream<Arguments> mdmsData() {
        return Stream.of(Arguments.of(FMUtils.loadResourceAsString("MdmsData.json")));
    }
}
