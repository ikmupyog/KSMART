FROM maven:3.9.4-amazoncorretto-17-al2023 AS build
ARG WORK_DIR
WORKDIR /app

# copy the project files

 

# Create runtime image

FROM egovio/wildfly:1-helm-fin-e6312078

COPY egov/egov-ear/target/*.ear /opt/jboss/wildfly/standalone/deployments/
USER jboss

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-Ddb.migration.enabled=true"]
